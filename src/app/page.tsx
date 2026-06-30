import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { categories } from "@/lib/constants";
import { getFeaturedListings } from "@/lib/listings";

const templateFields = [
  "Images from device",
  "Seller identity",
  "WhatsApp contact",
  "Item name",
  "Description",
  "Price",
  "Condition",
  "Rating",
  "Category",
  "Location",
  "Payment method",
];

export default async function Home() {
  const listings = await getFeaturedListings();

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <span className="accent-pill inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.3em]">
            Community marketplace
          </span>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Turn your WhatsApp resale group into a polished web storefront.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Pasar Karat gives your members a simple place to post pre-loved items, browse listings, and
            keep everything searchable instead of buried in chat history.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="cta-button rounded-full px-5 py-3 font-medium" href="/sell">
              Start selling
            </Link>
            <Link className="secondary-button rounded-full px-5 py-3 font-medium text-zinc-200" href="/listings">
              Browse listings
            </Link>
            <Link className="secondary-button rounded-full px-5 py-3 font-medium text-zinc-200" href="/dashboard">
              Seller dashboard
            </Link>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Listing template</p>
          <div className="mt-6 space-y-3">
            {templateFields.map((field) => (
              <div
                key={field}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-zinc-300"
              >
                <span>{field}</span>
                <span className="text-zinc-500">Required</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Why it works</p>
          <div className="mt-5 space-y-4 text-zinc-300">
            <p>Members keep the same selling flow they already know from WhatsApp, now with structured seller info.</p>
            <p>Buyers can save favorites, search categories, and contact sellers through WhatsApp in one tap.</p>
            <p>Sellers can sign in with phone number and password to manage listings and mark items as sold without admin help.</p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Featured items</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Fresh finds from the community</h3>
            </div>
            <Link className="accent-link text-sm font-medium" href="/listings">
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Categories</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Browse the kinds of items your community sells most</h3>
          </div>
          <Link className="accent-link text-sm font-medium" href="/favorites">
            View favorites
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              className="surface-pill rounded-full px-4 py-2 text-sm transition hover:border-rose-200/25 hover:text-rose-50"
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
