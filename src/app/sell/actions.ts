"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { listingInsertSchema, listingSchema } from "@/lib/schemas/listing";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { SellActionState } from "@/lib/types";

export async function createListing(
  _previousState: SellActionState,
  formData: FormData,
): Promise<SellActionState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "error",
      message: "Please sign in before publishing a listing.",
    };
  }

  const rawValues = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    condition: formData.get("condition"),
    rating: formData.get("rating"),
    category: formData.get("category"),
    location: formData.get("location"),
    paymentMethod: formData.get("paymentMethod"),
    galleryImageUrls: formData.get("galleryImageUrls"),
  };

  const parsed = listingSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your listing details.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: "Supabase server environment variables are missing. Add them to enable live submissions.",
    };
  }

  const payload = listingInsertSchema.parse(parsed.data);
  const { error } = await supabase
    .from("listings")
    .insert({
      ...payload,
      user_id: user.id,
      seller_name: user.display_name,
      whatsapp_number: user.phone_number,
    });

  if (error) {
    return {
      status: "error",
      message: "We could not publish your item right now. Please try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Your listing has been published and is now linked to your account.",
  };
}
