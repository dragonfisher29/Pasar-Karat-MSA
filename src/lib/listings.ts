import { mockListings } from "@/lib/mock-data";
import { getSupabaseAdminClient, getSupabaseClient } from "@/lib/supabase";
import type { Listing, ListingFilters, SellerDashboardListing } from "@/lib/types";

const sortListings = (items: Listing[]) =>
  [...items].sort(
    (left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );

function applyFilters(items: Listing[], filters?: ListingFilters) {
  return items.filter((item) => {
    const matchesQuery =
      !filters?.query ||
      `${item.name} ${item.description} ${item.seller_name}`
        .toLowerCase()
        .includes(filters.query.toLowerCase());
    const matchesCategory = !filters?.category || item.category === filters.category;
    const matchesCondition = !filters?.condition || item.condition === filters.condition;
    const matchesPrice = !filters?.maxPrice || item.price <= filters.maxPrice;

    return (
      item.status === "available" &&
      item.moderation_status === "approved" &&
      matchesQuery &&
      matchesCategory &&
      matchesCondition &&
      matchesPrice
    );
  });
}

export async function getListings(filters?: ListingFilters): Promise<Listing[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return sortListings(applyFilters(mockListings, filters));
  }

  let query = supabase
    .from("listings")
    .select("*")
    .eq("status", "available")
    .eq("moderation_status", "approved")
    .order("created_at", { ascending: false });

  if (filters?.query) {
    query = query.or(
      `name.ilike.%${filters.query}%,description.ilike.%${filters.query}%,seller_name.ilike.%${filters.query}%`,
    );
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.condition) {
    query = query.eq("condition", filters.condition);
  }

  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice);
  }

  const { data, error } = await query;

  if (error || !data) {
    return sortListings(applyFilters(mockListings, filters));
  }

  return data;
}

export async function getFeaturedListings() {
  const listings = await getListings();
  return listings.slice(0, 3);
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return mockListings.find((listing) => listing.id === id) ?? null;
  }

  const { data } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();

  if (!data) {
    return mockListings.find((listing) => listing.id === id) ?? null;
  }

  return data;
}

export async function getListingsByIds(ids: string[]) {
  if (ids.length === 0) {
    return [];
  }

  const listings = await getListings();
  return listings.filter((listing) => ids.includes(listing.id));
}

export async function getSellerDashboardListings(
  userId: string,
): Promise<SellerDashboardListing[]> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return sortListings(mockListings.filter((listing) => listing.user_id === userId));
  }

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
}
