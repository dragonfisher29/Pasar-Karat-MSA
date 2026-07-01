export type Listing = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  condition: string;
  rating: number;
  payment_method: string;
  category: string;
  location: string;
  seller_name: string;
  whatsapp_number: string;
  image_url: string;
  gallery_image_urls: string[];
  status: string;
  moderation_status: string;
  sold_at: string | null;
};

export type SellActionState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export type ListingFilters = {
  query?: string;
  category?: string;
  condition?: string;
  maxPrice?: number;
};

export type SellerDashboardListing = Omit<Listing, never>;

export type SellerDashboardState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export type MarketplaceUser = {
  id: string;
  display_name: string;
  phone_number: string;
};

export type AuthActionState = {
  status: "idle" | "error";
  message?: string;
};

export type ProfileActionState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export type ResetPasswordState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export type AdminPasswordResetState = {
  status: "idle" | "error" | "success";
  message?: string;
  resetLink?: string;
};
