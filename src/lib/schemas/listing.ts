import { z } from "zod";

const imageArraySchema = z.array(z.url("Each image must be a valid URL.")).min(1, "Upload at least one image.");

export const listingSchema = z.object({
  name: z.string().trim().min(3, "Item name must be at least 3 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must be 500 characters or less."),
  price: z.coerce.number().positive("Price must be greater than 0."),
  condition: z.string().trim().min(2, "Condition is required."),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating must be at most 5."),
  category: z.string().trim().min(2, "Category is required."),
  location: z.string().trim().min(2, "Location is required."),
  paymentMethod: z.string().trim().min(2, "Payment method is required."),
  galleryImageUrls: z.preprocess((value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }

    return value;
  }, imageArraySchema),
});

export const listingInsertSchema = listingSchema.transform((values) => ({
  name: values.name,
  description: values.description,
  price: values.price,
  condition: values.condition,
  rating: values.rating,
  category: values.category,
  location: values.location,
  payment_method: values.paymentMethod,
  image_url: values.galleryImageUrls[0],
  gallery_image_urls: values.galleryImageUrls,
  status: "available" as const,
  moderation_status: "approved" as const,
}));

export type ListingFormValues = z.input<typeof listingSchema>;
export type ListingInsert = z.output<typeof listingInsertSchema>;
