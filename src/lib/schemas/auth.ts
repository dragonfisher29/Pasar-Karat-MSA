import { z } from "zod";

const displayNameSchema = z.string().trim().min(2, "Display name is required.");
const phoneNumberSchema = z
  .string()
  .trim()
  .min(8, "Phone number is required.")
  .regex(/^[+\d\s-]+$/, "Phone number can contain only digits, spaces, +, and -.");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.")
  .max(72, "Password must be 72 characters or less.");

export const profileSchema = z.object({
  displayName: displayNameSchema,
  phoneNumber: phoneNumberSchema,
});

export const signUpSchema = profileSchema.extend({
  password: passwordSchema,
});

export const signInSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: z.string().min(1, "Password is required."),
});

export const adminPasswordResetCreateSchema = z.object({
  phoneNumber: phoneNumberSchema,
  secret: z.string().min(1, "Admin secret is required."),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().regex(/^[a-f0-9]{64}$/i, "Reset link is invalid."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
