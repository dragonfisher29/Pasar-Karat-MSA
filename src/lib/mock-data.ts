import type { Listing } from "@/lib/types";

export const mockListings: Listing[] = [
  {
    id: "film-camera",
    created_at: "2026-06-01T08:00:00.000Z",
    user_id: "mock-user-1",
    seller_name: "Aisyah",
    whatsapp_number: "0123456789",
    name: "Canon AE-1 Film Camera",
    description:
      "Well-kept vintage camera with strap, working meter, and a clean lens. Great for beginners who want to start shooting film.",
    price: 650,
    condition: "Gently used",
    rating: 5,
    category: "Electronics",
    location: "Subang Jaya",
    payment_method: "Bank transfer or cash on meetup",
    image_url:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=80",
    ],
    status: "available",
    moderation_status: "approved",
    sold_at: null,
  },
  {
    id: "study-desk",
    created_at: "2026-06-12T10:30:00.000Z",
    user_id: "mock-user-2",
    seller_name: "Farid",
    whatsapp_number: "0172234567",
    name: "Minimalist Study Desk",
    description:
      "Solid wooden desk with metal legs. Fits small apartments and still has enough surface area for a laptop plus monitor setup.",
    price: 280,
    condition: "Good",
    rating: 4,
    category: "Furniture",
    location: "Shah Alam",
    payment_method: "Cash only",
    image_url:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    status: "available",
    moderation_status: "approved",
    sold_at: null,
  },
  {
    id: "sneakers",
    created_at: "2026-06-18T14:45:00.000Z",
    user_id: "mock-user-3",
    seller_name: "Nadia",
    whatsapp_number: "0189988776",
    name: "Nike Everyday Sneakers",
    description:
      "Comfortable daily sneakers with light wear on the sole. Still clean, supportive, and ready for regular use.",
    price: 120,
    condition: "Lightly worn",
    rating: 4,
    category: "Fashion",
    location: "Petaling Jaya",
    payment_method: "DuitNow preferred",
    image_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    ],
    status: "available",
    moderation_status: "approved",
    sold_at: null,
  },
];
