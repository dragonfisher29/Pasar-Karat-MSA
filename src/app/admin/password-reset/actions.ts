"use server";

import { createHash, randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { adminPasswordResetCreateSchema } from "@/lib/schemas/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { AdminPasswordResetState } from "@/lib/types";
import { normalizeWhatsappNumber } from "@/lib/utils";

const unavailableMessage = "Password resets are unavailable until Supabase server configuration is added.";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function getRequestIp() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");

  if (forwarded) {
    const [first] = forwarded.split(",");
    return first?.trim() || "unknown";
  }

  return realIp?.trim() || "unknown";
}

async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return "";
  }

  return `${proto}://${host}`;
}

export async function createPasswordResetLink(
  _previousState: AdminPasswordResetState,
  formData: FormData,
): Promise<AdminPasswordResetState> {
  const parsed = adminPasswordResetCreateSchema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
    secret: formData.get("secret"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review the reset request details.",
    };
  }

  const configuredSecret = process.env.PASAR_KARAT_ADMIN_RESET_SECRET;

  if (!configuredSecret) {
    return {
      status: "error",
      message: "Admin reset secret is not configured on the server.",
    };
  }

  if (parsed.data.secret !== configuredSecret) {
    return {
      status: "error",
      message: "Invalid admin secret.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: unavailableMessage,
    };
  }

  const normalizedPhone = normalizeWhatsappNumber(parsed.data.phoneNumber);
  const { data: user, error: userError } = await supabase
    .from("marketplace_users")
    .select("id")
    .eq("phone_number", normalizedPhone)
    .maybeSingle();

  if (userError) {
    return {
      status: "error",
      message: "We could not look up this account right now. Please try again.",
    };
  }

  if (!user) {
    return {
      status: "error",
      message: "No account found for this phone number.",
    };
  }

  await supabase.from("marketplace_password_resets").delete().eq("user_id", user.id).is("used_at", null);

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();
  const createdIp = await getRequestIp();

  const { error: insertError } = await supabase.from("marketplace_password_resets").insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
    created_ip: createdIp,
  });

  if (insertError) {
    return {
      status: "error",
      message: "We could not create a reset link right now. Please try again.",
    };
  }

  const baseUrl = await getBaseUrl();
  const resetLink = baseUrl ? `${baseUrl}/reset-password?token=${rawToken}` : `/reset-password?token=${rawToken}`;

  return {
    status: "success",
    message: "Share this link with the user. It expires in 20 minutes and can be used once.",
    resetLink,
  };
}
