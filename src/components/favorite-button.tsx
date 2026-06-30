"use client";

import { useFavorites } from "@/components/favorites-provider";

type FavoriteButtonProps = {
  listingId: string;
};

export function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(listingId);

  return (
    <button
      className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
        active
          ? "border-orange-400/40 bg-orange-500/15 text-orange-200"
          : "border-white/10 bg-black/30 text-zinc-200 hover:border-orange-400/30 hover:text-orange-200"
      }`}
      onClick={() => toggleFavorite(listingId)}
      type="button"
    >
      {active ? "Saved" : "Save"}
    </button>
  );
}
