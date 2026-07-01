"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { profileSchema } from "@/lib/schemas/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ProfileActionState } from "@/lib/types";
import { normalizeWhatsappNumber } from "@/lib/utils";

const unavailableMessage = "Profile updates are unavailable until Supabase server configuration is added.";

export async function updateProfile(
  _previousState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "error",
      message: "Please sign in again before editing your profile.",
    };
  }

  const parsed = profileSchema.safeParse({
    displayName: formData.get("displayName"),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your profile details.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: unavailableMessage,
    };
  }

  const nextDisplayName = parsed.data.displayName;
  const nextPhoneNumber = normalizeWhatsappNumber(parsed.data.phoneNumber);

  const { data: existingUser } = await supabase
    .from("marketplace_users")
    .select("id")
    .eq("phone_number", nextPhoneNumber)
    .neq("id", user.id)
    .maybeSingle();

  if (existingUser) {
    return {
      status: "error",
      message: "Another account already uses this phone number.",
    };
  }

  const { error: userError } = await supabase
    .from("marketplace_users")
    .update({
      display_name: nextDisplayName,
      phone_number: nextPhoneNumber,
    })
    .eq("id", user.id);

  if (userError) {
    return {
      status: "error",
      message: "We could not save your profile right now. Please try again.",
    };
  }

  const { error: listingsError } = await supabase
    .from("listings")
    .update({
      seller_name: nextDisplayName,
      whatsapp_number: nextPhoneNumber,
    })
    .eq("user_id", user.id);

  if (listingsError) {
    return {
      status: "error",
      message: "Your profile changed, but we could not sync your listings yet.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/favorites");
  revalidatePath("/listings");
  revalidatePath("/sell");
  revalidatePath("/user");

  return {
    status: "success",
    message: "Profile updated successfully.",
  };
}
