"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { SellerDashboardState } from "@/lib/types";

export async function markListingAsSold(
  _previousState: SellerDashboardState,
  formData: FormData,
): Promise<SellerDashboardState> {
  const user = await getCurrentUser();
  const listingId = formData.get("listingId");

  if (!user || typeof listingId !== "string") {
    return {
      status: "error",
      message: "Please sign in again before managing listings.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: "Supabase server environment variables are missing. Seller actions are unavailable.",
    };
  }

  const { error } = await supabase
    .from("listings")
    .update({
      status: "sold",
      sold_at: new Date().toISOString(),
    })
    .eq("id", listingId)
    .eq("user_id", user.id);

  if (error) {
    return {
      status: "error",
      message: "We could not mark this listing as sold right now. Please try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Listing marked as sold.",
  };
}
