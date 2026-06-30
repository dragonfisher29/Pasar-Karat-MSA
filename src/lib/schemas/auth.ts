import { z } from "zod";

export const signUpSchema = z.object({
  displayName: z.string().trim().min(2, "Display name is required."),
  phoneNumber: z
    .string()
    .trim()
    .min(8, "Phone number is required.")
    .regex(/^[+\d\s-]+$/, "Phone number can contain only digits, spaces, +, and -."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(72, "Password must be 72 characters or less."),
});

export const signInSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(8, "Phone number is required.")
    .regex(/^[+\d\s-]+$/, "Phone number can contain only digits, spaces, +, and -."),
  password: z.string().min(1, "Password is required."),
});
