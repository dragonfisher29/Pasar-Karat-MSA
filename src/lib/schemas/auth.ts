import { z } from "zod";

const displayNameSchema = z.string().trim().min(2, "Display name is required.");
const phoneNumberSchema = z
  .string()
  .trim()
  .min(8, "Phone number is required.")
  .regex(/^[+\d\s-]+$/, "Phone number can contain only digits, spaces, +, and -.");

export const profileSchema = z.object({
  displayName: displayNameSchema,
  phoneNumber: phoneNumberSchema,
});

export const signUpSchema = profileSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(72, "Password must be 72 characters or less."),
});

export const signInSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: z.string().min(1, "Password is required."),
});
