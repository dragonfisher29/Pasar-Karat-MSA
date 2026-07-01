import { createHash, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { MarketplaceUser } from "@/lib/types";

const scrypt = promisify(nodeScrypt);
const sessionCookieName = "pasar_karat_session";
const sessionDurationMs = 1000 * 60 * 60 * 24 * 30;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const storedKeyBuffer = Buffer.from(key, "hex");

  if (storedKeyBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKeyBuffer, derivedKey);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createUserSession(userId: string) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return false;
  }

  await supabase.from("marketplace_sessions").delete().eq("user_id", userId);

  const rawToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionDurationMs).toISOString();

  const { error } = await supabase.from("marketplace_sessions").insert({
    user_id: userId,
    token_hash: hashToken(rawToken),
    expires_at: expiresAt,
  });

  if (error) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(sessionDurationMs / 1000),
    expires: new Date(expiresAt),
  });

  return true;
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  const currentToken = cookieStore.get(sessionCookieName)?.value;
  const supabase = getSupabaseAdminClient();

  if (currentToken && supabase) {
    await supabase.from("marketplace_sessions").delete().eq("token_hash", hashToken(currentToken));
  }

  cookieStore.delete(sessionCookieName);
}

export const getCurrentUser = cache(async (): Promise<MarketplaceUser | null> => {
  const cookieStore = await cookies();
  const currentToken = cookieStore.get(sessionCookieName)?.value;
  const supabase = getSupabaseAdminClient();

  if (!currentToken || !supabase) {
    return null;
  }

  const { data: session } = await supabase
    .from("marketplace_sessions")
    .select("user_id")
    .eq("token_hash", hashToken(currentToken))
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (!session?.user_id) {
    return null;
  }

  const { data: user } = await supabase
    .from("marketplace_users")
    .select("id, display_name, phone_number")
    .eq("id", session.user_id)
    .maybeSingle();

  return user as MarketplaceUser | null;
});

export async function requireCurrentUser(nextPath = "/dashboard") {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  }

  return user;
}
