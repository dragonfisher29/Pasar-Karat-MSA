"use server";

import { redirect } from "next/navigation";
import { clearUserSession, createUserSession, hashPassword, verifyPassword } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { AuthActionState } from "@/lib/types";
import { normalizeWhatsappNumber } from "@/lib/utils";

const defaultError = "Authentication is unavailable. Check your Supabase server configuration.";

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    displayName: formData.get("displayName"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
  });
  const nextPath = typeof formData.get("next") === "string" ? (formData.get("next") as string) : "/dashboard";

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your sign-up details.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: defaultError,
    };
  }

  const phoneNumber = normalizeWhatsappNumber(parsed.data.phoneNumber);
  const { data: existingUser } = await supabase
    .from("marketplace_users")
    .select("id")
    .eq("phone_number", phoneNumber)
    .maybeSingle();

  if (existingUser) {
    return {
      status: "error",
      message: "An account with this phone number already exists.",
    };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const { data: newUser, error } = await supabase
    .from("marketplace_users")
    .insert({
      display_name: parsed.data.displayName,
      phone_number: phoneNumber,
      password_hash: passwordHash,
    })
    .select("id")
    .single();

  if (error || !newUser) {
    return {
      status: "error",
      message: "We could not create your account right now. Please try again.",
    };
  }

  const sessionCreated = await createUserSession(newUser.id);

  if (!sessionCreated) {
    return {
      status: "error",
      message: "Your account was created, but we could not sign you in automatically.",
    };
  }

  redirect(nextPath);
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
  });
  const nextPath = typeof formData.get("next") === "string" ? (formData.get("next") as string) : "/dashboard";

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your login details.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: defaultError,
    };
  }

  const phoneNumber = normalizeWhatsappNumber(parsed.data.phoneNumber);
  const { data: user } = await supabase
    .from("marketplace_users")
    .select("id, password_hash")
    .eq("phone_number", phoneNumber)
    .maybeSingle();

  if (!user) {
    return {
      status: "error",
      message: "Invalid phone number or password.",
    };
  }

  const validPassword = await verifyPassword(parsed.data.password, user.password_hash);

  if (!validPassword) {
    return {
      status: "error",
      message: "Invalid phone number or password.",
    };
  }

  const sessionCreated = await createUserSession(user.id);

  if (!sessionCreated) {
    return {
      status: "error",
      message: "We could not start your session right now. Please try again.",
    };
  }

  redirect(nextPath);
}

export async function signOut() {
  await clearUserSession();
  redirect("/");
}
