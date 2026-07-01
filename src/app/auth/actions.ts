"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { clearUserSession, createUserSession, hashPassword, verifyPassword } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { AuthActionState } from "@/lib/types";
import { normalizeWhatsappNumber } from "@/lib/utils";

const defaultError = "Authentication is unavailable. Check your Supabase server configuration.";
const nextPathFallback = "/dashboard";

type AuthAttemptState = {
  failures: number;
  firstFailureAt: number;
  lockedUntil: number;
};

declare global {
  var __pasarKaratAuthAttempts: Map<string, AuthAttemptState> | undefined;
}

const authAttemptWindowMs = 10 * 60 * 1000;
const authAttemptLockMs = 15 * 60 * 1000;
const authAttemptMaxFailures = 8;

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

async function assertSameOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");

  if (!origin || !host) {
    return;
  }

  if (origin === "null") {
    throw new Error("Invalid origin.");
  }

  const originHost = new URL(origin).host;

  if (originHost !== host) {
    throw new Error("Invalid origin.");
  }
}

function sanitizeNextPath(value: unknown) {
  if (typeof value !== "string") {
    return nextPathFallback;
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/")) {
    return nextPathFallback;
  }

  if (trimmed.startsWith("//")) {
    return nextPathFallback;
  }

  if (trimmed.includes("\\") || trimmed.includes("://")) {
    return nextPathFallback;
  }

  return trimmed;
}

function getAuthAttemptStore() {
  if (!globalThis.__pasarKaratAuthAttempts) {
    globalThis.__pasarKaratAuthAttempts = new Map<string, AuthAttemptState>();
  }

  return globalThis.__pasarKaratAuthAttempts;
}

async function authAttemptKey(identifier: string) {
  return `${await getRequestIp()}|${identifier}`;
}

function cleanupAuthAttempts(now: number) {
  const store = getAuthAttemptStore();

  for (const [key, value] of store.entries()) {
    const windowExpired = now - value.firstFailureAt > authAttemptWindowMs;
    const lockExpired = value.lockedUntil > 0 && value.lockedUntil <= now;

    if (windowExpired && (value.lockedUntil === 0 || lockExpired)) {
      store.delete(key);
    } else if (lockExpired) {
      store.set(key, { failures: 0, firstFailureAt: now, lockedUntil: 0 });
    }
  }
}

function getAuthAttemptState(key: string, now: number) {
  const store = getAuthAttemptStore();
  const current = store.get(key);

  if (!current) {
    const fresh: AuthAttemptState = { failures: 0, firstFailureAt: now, lockedUntil: 0 };
    store.set(key, fresh);
    return fresh;
  }

  if (now - current.firstFailureAt > authAttemptWindowMs && current.lockedUntil === 0) {
    const reset: AuthAttemptState = { failures: 0, firstFailureAt: now, lockedUntil: 0 };
    store.set(key, reset);
    return reset;
  }

  return current;
}

function recordAuthFailure(key: string, now: number) {
  const store = getAuthAttemptStore();
  const current = getAuthAttemptState(key, now);
  const failures = current.failures + 1;
  const lockedUntil = failures >= authAttemptMaxFailures ? now + authAttemptLockMs : current.lockedUntil;
  const nextState: AuthAttemptState = {
    failures,
    firstFailureAt: current.failures === 0 ? now : current.firstFailureAt,
    lockedUntil,
  };
  store.set(key, nextState);
  return nextState;
}

function resetAuthFailures(key: string) {
  const store = getAuthAttemptStore();
  store.delete(key);
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayForFailures(failures: number) {
  if (failures <= 0) {
    return;
  }

  const capped = Math.min(failures, 6);
  const baseDelayMs = 250 * 2 ** (capped - 1);
  const jitterMs = Math.floor(Math.random() * 150);
  await sleep(Math.min(baseDelayMs + jitterMs, 5000));
}

export async function signUp(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    await assertSameOrigin();
  } catch {
    return { status: "error", message: "Invalid request origin." };
  }

  const parsed = signUpSchema.safeParse({
    displayName: formData.get("displayName"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
  });
  const nextPath = sanitizeNextPath(formData.get("next"));

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your sign-up details.",
    };
  }

  const now = Date.now();
  cleanupAuthAttempts(now);
  const key = await authAttemptKey(normalizeWhatsappNumber(parsed.data.phoneNumber));
  const currentAttempt = getAuthAttemptState(key, now);

  if (currentAttempt.lockedUntil > now) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a bit and try again.",
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
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
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
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
    return {
      status: "error",
      message: "We could not create your account right now. Please try again.",
    };
  }

  const sessionCreated = await createUserSession(newUser.id);

  if (!sessionCreated) {
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
    return {
      status: "error",
      message: "Your account was created, but we could not sign you in automatically.",
    };
  }

  resetAuthFailures(key);
  redirect(nextPath);
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    await assertSameOrigin();
  } catch {
    return { status: "error", message: "Invalid request origin." };
  }

  const parsed = signInSchema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
  });
  const nextPath = sanitizeNextPath(formData.get("next"));

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review your login details.",
    };
  }

  const now = Date.now();
  cleanupAuthAttempts(now);
  const identifier = normalizeWhatsappNumber(parsed.data.phoneNumber);
  const key = await authAttemptKey(identifier);
  const currentAttempt = getAuthAttemptState(key, now);

  if (currentAttempt.lockedUntil > now) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a bit and try again.",
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "error",
      message: defaultError,
    };
  }

  const { data: user } = await supabase
    .from("marketplace_users")
    .select("id, password_hash")
    .eq("phone_number", identifier)
    .maybeSingle();

  if (!user) {
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
    return {
      status: "error",
      message: "Invalid phone number or password.",
    };
  }

  const validPassword = await verifyPassword(parsed.data.password, user.password_hash);

  if (!validPassword) {
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
    return {
      status: "error",
      message: "Invalid phone number or password.",
    };
  }

  const sessionCreated = await createUserSession(user.id);

  if (!sessionCreated) {
    const attemptState = recordAuthFailure(key, now);
    await delayForFailures(attemptState.failures);
    return {
      status: "error",
      message: "We could not start your session right now. Please try again.",
    };
  }

  resetAuthFailures(key);
  redirect(nextPath);
}

export async function signOut() {
  try {
    await assertSameOrigin();
  } catch {
    redirect("/");
  }

  await clearUserSession();
  redirect("/");
}
