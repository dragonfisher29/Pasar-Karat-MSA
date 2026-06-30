"use client";

import { useActionState } from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createListing } from "@/app/sell/actions";
import { ImageUploader } from "@/components/image-uploader";
import { categories, conditions } from "@/lib/constants";
import type { MarketplaceUser, SellActionState } from "@/lib/types";

const initialState: SellActionState = {
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="cta-button rounded-full px-5 py-3 font-medium" disabled={pending} type="submit">
      {pending ? "Publishing..." : "Publish listing"}
    </button>
  );
}

type SellFormProps = {
  user: MarketplaceUser;
};

export function SellForm({ user }: SellFormProps) {
  const [state, formAction] = useActionState(createListing, initialState);
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>([]);

  return (
    <form action={formAction} className="glass-panel grid gap-5 rounded-[2rem] p-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="sellerNamePreview">
          Seller name
        </label>
        <input className="field" defaultValue={user.display_name} id="sellerNamePreview" readOnly />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="whatsappPreview">
          WhatsApp number
        </label>
        <input className="field" defaultValue={user.phone_number} id="whatsappPreview" readOnly />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="name">
          Item name
        </label>
        <input className="field" id="name" name="name" placeholder="Vintage armchair" required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="price">
          Price
        </label>
        <input className="field" id="price" min="1" name="price" placeholder="120" required step="0.01" type="number" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="condition">
          Condition
        </label>
        <select className="field" defaultValue="" id="condition" name="condition" required>
          <option disabled value="">
            Select condition
          </option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="rating">
          Rating
        </label>
        <input className="field" id="rating" max="5" min="1" name="rating" placeholder="4" required type="number" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="category">
          Category
        </label>
        <select className="field" defaultValue="" id="category" name="category" required>
          <option disabled value="">
            Select category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="location">
          Meetup location
        </label>
        <input className="field" id="location" name="location" placeholder="Address" required />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="paymentMethod">
          Payment method
        </label>
        <input
          className="field"
          id="paymentMethod"
          name="paymentMethod"
          placeholder="bank transfer, cash on meetup"
          required
        />
      </div>

      <div className="sm:col-span-2">
        <ImageUploader onChange={setGalleryImageUrls} />
        <input name="galleryImageUrls" type="hidden" value={JSON.stringify(galleryImageUrls)} />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="description">
          Description
        </label>
        <textarea
          className="field min-h-36 resize-y"
          id="description"
          name="description"
          placeholder="Describe the item, its history, and anything buyers should know."
          required
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            Template fields mirror the original WhatsApp group format, with richer media and account-based seller management.
          </p>
          {state.message ? (
            <p className={state.status === "error" ? "mt-2 text-sm text-red-300" : "mt-2 text-sm text-emerald-300"}>
              {state.message}
            </p>
          ) : null}
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}
