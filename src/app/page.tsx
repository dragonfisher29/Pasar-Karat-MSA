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

const dashboardStats = [
  { label: "Searchable fields", value: "11", tone: "primary" },
  { label: "Saved for later", value: "1 tap", tone: "secondary" },
  { label: "WhatsApp handoff", value: "Instant", tone: "tertiary" },
] as const;

export default async function Home() {
  const listings = await getFeaturedListings();

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel overflow-hidden rounded-[1rem] p-6 sm:p-8">
          <span className="surface-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            Vibrant marketplace
          </span>
          <h2 className="page-title mt-6 max-w-4xl">Turn your WhatsApp resale group into a daylight-ready storefront.</h2>
          <p className="page-copy mt-5 max-w-2xl">
            Pasar Karat brings structure, search, and account-based seller management to the community flow your
            members already know, with a bold dashboard UI that keeps every action obvious.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="cta-button rounded-xl px-5 py-3 font-semibold" href="/sell">
              Start selling
            </Link>
            <Link className="secondary-button rounded-xl px-5 py-3 font-semibold" href="/listings">
              Browse listings
            </Link>
            <Link className="secondary-button rounded-xl px-5 py-3 font-semibold" href="/dashboard">
              Seller dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="metric-tile">
                <p className="metric-label">{stat.label}</p>
                <p className={`metric-value ${stat.tone} mt-3`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel rounded-[1rem] p-6">
          <p className="section-kicker">Listing template</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">Structured for fast posting</h3>
          <div className="mt-6 space-y-3">
            {templateFields.map((field, index) => (
              <div key={field} className="soft-card flex items-center justify-between px-4 py-3 text-sm text-slate-700">
                <span className="font-medium">{field}</span>
                <span className={index % 3 === 0 ? "surface-pill rounded-full px-3 py-1 text-xs font-semibold" : index % 3 === 1 ? "accent-pill rounded-full px-3 py-1 text-xs font-semibold" : "tertiary-pill rounded-full px-3 py-1 text-xs font-semibold"}>
                  Required
                </span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-panel rounded-[1rem] p-6">
          <p className="section-kicker">Why it works</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">Modern dashboard clarity with a familiar selling flow</h3>
          <div className="mt-6 space-y-4 text-slate-600">
            <div className="info-card p-4">
              <p className="font-semibold text-slate-900">Structured listings</p>
              <p className="mt-2 text-sm leading-6">Members keep the same resale details they already post in chat, now with searchable fields and stronger presentation.</p>
            </div>
            <div className="info-card p-4">
              <p className="font-semibold text-slate-900">Fast buyer actions</p>
              <p className="mt-2 text-sm leading-6">Buyers can filter categories, save favorites, and jump to WhatsApp once they are ready to close the deal.</p>
            </div>
            <div className="info-card p-4">
              <p className="font-semibold text-slate-900">Account-linked control</p>
              <p className="mt-2 text-sm leading-6">Sellers sign in with phone number and password so every listing stays manageable from one dashboard.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[1rem] p-6">
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
