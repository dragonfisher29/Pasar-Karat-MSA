"use server";

import { createHash } from "node:crypto";
import { clearUserSession, hashPassword } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/schemas/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ResetPasswordState } from "@/lib/types";

const unavailableMessage = "Password resets are unavailable until Supabase server configuration is added.";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function resetPassword(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your reset details.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: unavailableMessage,
    };
  }

  const tokenHash = hashToken(parsed.data.token);
  const nowIso = new Date().toISOString();
  const { data: resetRow, error: resetError } = await supabase
    .from("marketplace_password_resets")
    .select("id, user_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (resetError) {
    return {
      status: "error",
      message: "We could not validate this reset link right now. Please try again.",
    };
  }

  if (!resetRow || resetRow.used_at || resetRow.expires_at <= nowIso) {
    return {
      status: "error",
      message: "This reset link has expired. Please contact admin for a new reset link.",
    };
  }

  const nextPasswordHash = await hashPassword(parsed.data.password);
  const { error: updateError } = await supabase
    .from("marketplace_users")
    .update({ password_hash: nextPasswordHash })
    .eq("id", resetRow.user_id);

  if (updateError) {
    return {
      status: "error",
      message: "We could not reset your password right now. Please try again.",
    };
  }

  await supabase.from("marketplace_password_resets").update({ used_at: nowIso }).eq("id", resetRow.id);
  await supabase.from("marketplace_sessions").delete().eq("user_id", resetRow.user_id);
  await clearUserSession();

  return {
    status: "success",
    message: "Password updated successfully. You can now sign in with your new password.",
  };
}
