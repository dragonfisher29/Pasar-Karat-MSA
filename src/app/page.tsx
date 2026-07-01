import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { categories } from "@/lib/constants";
import { getFeaturedListings } from "@/lib/listings";

export default async function Home() {
  const listings = await getFeaturedListings();

  return (
    <div className="space-y-10">
      <section className="glass-panel rounded-[1rem] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="section-kicker">Featured items</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Fresh finds from the community</h3>
          </div>
          <Link className="accent-link text-sm font-semibold" href="/listings">
            View all
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[1rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Categories</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Browse the items your community sells most</h3>
          </div>
          <Link className="accent-link text-sm font-semibold" href="/favorites">
            View favorites
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <Link
              key={category}
              className={index % 3 === 0 ? "surface-pill rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5" : index % 3 === 1 ? "accent-pill rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5" : "tertiary-pill rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"}
              href={`/listings?category=${encodeURIComponent(category)}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
