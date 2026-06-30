import { FavoriteListingsGrid } from "@/components/favorite-listings-grid";
import { getListings } from "@/lib/listings";

export default async function FavoritesPage() {
  const listings = await getListings();

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Favorites</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Saved items from the community</h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Keep a shortlist of items you want to revisit later, then jump back in when you are ready to contact
          the seller on WhatsApp.
        </p>
      </section>

      <FavoriteListingsGrid listings={listings} />
    </div>
  );
}
