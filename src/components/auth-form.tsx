"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, signUp } from "@/app/auth/actions";
import type { AuthActionState } from "@/lib/types";

const initialState: AuthActionState = {
  status: "idle",
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="cta-button rounded-xl px-5 py-3 font-semibold" disabled={pending} type="submit">
      {pending ? "Please wait..." : label}
    </button>
  );
}

type AuthFormProps = {
  nextPath?: string;
};

export function AuthForm({ nextPath = "/dashboard" }: AuthFormProps) {
  const [signInState, signInAction] = useActionState(signIn, initialState);
  const [signUpState, signUpAction] = useActionState(signUp, initialState);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form action={signInAction} className="glass-panel grid gap-4 rounded-[1rem] p-6">
        <div>
          <p className="section-kicker">Sign in</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Welcome back</h2>
        </div>
        <input name="next" type="hidden" value={nextPath} />
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="signInPhone">
            Phone number
          </label>
          <input className="field" id="signInPhone" name="phoneNumber" placeholder="+60 12-345 6789" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="signInPassword">
            Password
          </label>
          <input className="field" id="signInPassword" name="password" required type="password" />
        </div>
        {signInState.message ? <p className="text-sm font-medium text-rose-600">{signInState.message}</p> : null}
        <SubmitButton label="Sign in" />
      </form>

      <form action={signUpAction} className="glass-panel grid gap-4 rounded-[1rem] p-6">
        <div>
          <p className="section-kicker">Create account</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Start selling</h2>
        </div>
        <input name="next" type="hidden" value={nextPath} />
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="displayName">
            Display name
          </label>
          <input className="field" id="displayName" name="displayName" placeholder="Aisyah" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="signUpPhone">
            Phone number
          </label>
          <input className="field" id="signUpPhone" name="phoneNumber" placeholder="+60 12-345 6789" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="signUpPassword">
            Password
          </label>
          <input className="field" id="signUpPassword" name="password" required type="password" />
        </div>
        {signUpState.message ? <p className="text-sm font-medium text-rose-600">{signUpState.message}</p> : null}
        <SubmitButton label="Create account" />
      </form>
    </div>
  );
}
