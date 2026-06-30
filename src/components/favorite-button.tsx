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
          ? "border-rose-200/20 bg-rose-300/20 text-rose-50"
          : "surface-pill hover:border-rose-200/25 hover:text-rose-50"
      }`}
      onClick={() => toggleFavorite(listingId)}
      type="button"
    >
      {active ? "Saved" : "Save"}
    </button>
  );
}
