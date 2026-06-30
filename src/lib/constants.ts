export const categories = [
  "Electronics",
  "Furniture",
  "Fashion",
  "Books",
  "Home Goods",
  "Sports",
  "Collectibles",
  "Other",
] as const;

export const conditions = [
  "Like new",
  "Gently used",
  "Good",
  "Lightly worn",
  "Well loved",
] as const;

export const moderationStatuses = ["approved", "pending", "hidden"] as const;

export const listingStatuses = ["available", "sold"] as const;

export const storageBucketName =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "listing-media";
