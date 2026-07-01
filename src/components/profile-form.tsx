"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "@/app/user/actions";
import type { MarketplaceUser, ProfileActionState } from "@/lib/types";

const initialState: ProfileActionState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="cta-button rounded-xl px-5 py-3 font-semibold" disabled={pending} type="submit">
      {pending ? "Saving..." : "Save profile"}
    </button>
  );
}

type ProfileFormProps = {
  user: MarketplaceUser;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="glass-panel grid gap-5 rounded-[1rem] p-6">
      <div>
        <p className="section-kicker">Edit profile</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Update your seller details</h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Changes to your name and WhatsApp number also update the contact details shown on your listings.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="displayName">
          Display name
        </label>
        <input
          className="field"
          defaultValue={user.display_name}
          id="displayName"
          name="displayName"
          placeholder="Aisyah"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="phoneNumber">
          WhatsApp number
        </label>
        <input
          className="field"
          defaultValue={user.phone_number}
          id="phoneNumber"
          name="phoneNumber"
          placeholder="+60 12-345 6789"
          required
        />
      </div>

      {state.message ? (
        <p className={state.status === "error" ? "text-sm font-medium text-rose-600" : "text-sm font-medium text-cyan-700"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Keep this info current so buyers always see the right seller details.</p>
        <SubmitButton />
      </div>
    </form>
  );
}
