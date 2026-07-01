"use client";

import { useMemo } from "react";
import { useFavorites } from "@/components/favorites-provider";
import { ListingCard } from "@/components/listing-card";
import type { Listing } from "@/lib/types";

type FavoriteListingsGridProps = {
  listings: Listing[];
};

export function FavoriteListingsGrid({ listings }: FavoriteListingsGridProps) {
  const { favoriteIds } = useFavorites();

  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteIds.includes(listing.id)),
    [favoriteIds, listings],
  );

  if (favoriteListings.length === 0) {
    return (
      <section className="glass-panel rounded-[1rem] px-6 py-12 text-center">
        <p className="section-kicker">No saved items yet</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Start saving your favorite finds</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Tap the save button on any listing card to keep a shortlist of items you want to revisit later.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {favoriteListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </section>
  );
}
