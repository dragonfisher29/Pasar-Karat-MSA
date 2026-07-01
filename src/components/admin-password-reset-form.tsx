"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPasswordResetLink } from "@/app/admin/password-reset/actions";
import type { AdminPasswordResetState } from "@/lib/types";

const initialState: AdminPasswordResetState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="cta-button rounded-xl px-5 py-3 font-semibold" disabled={pending} type="submit">
      {pending ? "Generating..." : "Generate link"}
    </button>
  );
}

export function AdminPasswordResetForm() {
  const [state, formAction] = useActionState(createPasswordResetLink, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="secret">
          Admin secret
        </label>
        <input className="field" id="secret" name="secret" required type="password" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="phoneNumber">
          Seller phone number
        </label>
        <input className="field" id="phoneNumber" name="phoneNumber" placeholder="+60 12-345 6789" required />
      </div>

      {state.message ? (
        <p className={state.status === "error" ? "text-sm font-medium text-rose-600" : "text-sm font-medium text-cyan-700"}>
          {state.message}
        </p>
      ) : null}

      {state.resetLink ? (
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
          <p className="text-sm font-semibold text-slate-800">Reset link</p>
          <a className="mt-2 block break-all text-sm font-semibold text-violet-700 hover:text-violet-800" href={state.resetLink}>
            {state.resetLink}
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Share the link via WhatsApp with the seller.</p>
        <SubmitButton />
      </div>
    </form>
  );
}
