"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { resetPassword } from "@/app/reset-password/actions";
import type { ResetPasswordState } from "@/lib/types";

const initialState: ResetPasswordState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="cta-button rounded-xl px-5 py-3 font-semibold" disabled={pending} type="submit">
      {pending ? "Updating..." : "Update password"}
    </button>
  );
}

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction] = useActionState(resetPassword, initialState);

  if (!token) {
    return <p className="text-sm font-medium text-rose-600">Reset link is missing or invalid.</p>;
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input name="token" type="hidden" value={token} />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
          New password
        </label>
        <input className="field" id="password" name="password" required type="password" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input className="field" id="confirmPassword" name="confirmPassword" required type="password" />
      </div>

      {state.message ? (
        <p className={state.status === "error" ? "text-sm font-medium text-rose-600" : "text-sm font-medium text-cyan-700"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">After updating, sign in again using your new password.</p>
        <SubmitButton />
      </div>
    </form>
  );
}
