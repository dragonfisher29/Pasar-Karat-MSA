"use client";

import Image from "next/image";
import { useActionState } from "react";
import { markListingAsSold } from "@/app/dashboard/actions";
import type { SellerDashboardListing, SellerDashboardState } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const initialState: SellerDashboardState = {
  status: "idle",
};

type SellerDashboardPanelProps = {
  listings: SellerDashboardListing[];
};

function SoldButton({ listingId }: { listingId: string }) {
  const [state, formAction, pending] = useActionState(markListingAsSold, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <input name="listingId" type="hidden" value={listingId} />
      <button className="secondary-button rounded-xl px-4 py-2 text-sm font-semibold" disabled={pending} type="submit">
        {pending ? "Updating..." : "Mark as sold"}
      </button>
      {state.message ? <p className="text-xs text-slate-500">{state.message}</p> : null}
    </form>
  );
}

export function SellerDashboardPanel({ listings }: SellerDashboardPanelProps) {
  return (
    <div className="grid gap-5">
      {listings.map((listing) => (
        <article key={listing.id} className="glass-panel grid gap-5 rounded-[1rem] p-5 lg:grid-cols-[180px_1fr_auto]">
          <div className="overflow-hidden rounded-[1rem] border border-slate-200">
            <Image
              alt={listing.name}
              className="aspect-[4/3] w-full object-cover"
              height={180}
              src={listing.image_url}
              unoptimized
              width={240}
            />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="accent-pill rounded-full px-3 py-1 text-xs font-medium">{listing.category}</span>
              <span className="surface-pill rounded-full px-3 py-1 text-xs">
                {listing.status}
              </span>
              <span className="surface-pill rounded-full px-3 py-1 text-xs">
                {listing.moderation_status}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{listing.name}</h3>
            <p className="text-sm leading-6 text-slate-600">{listing.description}</p>
            <p className="text-sm text-slate-500">
              {listing.location} · {listing.payment_method}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-bold text-violet-700">{formatPrice(listing.price)}</p>
            {listing.status === "available" ? (
              <SoldButton listingId={listing.id} />
            ) : (
              <p className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700">
                Sold
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
