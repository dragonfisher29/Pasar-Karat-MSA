import { FavoriteListingsGrid } from "@/components/favorite-listings-grid";
import { getListings } from "@/lib/listings";

export default async function FavoritesPage() {
  const listings = await getListings();

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">Favorites</p>
        <h2 className="page-title mt-3">Saved items from the community</h2>
        <p className="page-copy mt-4 max-w-2xl">
          Keep a shortlist of items you want to revisit later, then jump back in when you are ready to contact
          the seller on WhatsApp.
        </p>
      </section>

      <FavoriteListingsGrid listings={listings} />
    </div>
  );
}
