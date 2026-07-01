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
          ? "border-pink-200 bg-pink-50 text-pink-700"
          : "border-slate-200 bg-white/90 text-slate-600 hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700"
      }`}
      onClick={() => toggleFavorite(listingId)}
      type="button"
    >
      {active ? "Saved" : "Save"}
    </button>
  );
}
