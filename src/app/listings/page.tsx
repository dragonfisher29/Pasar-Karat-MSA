import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { ListingCard } from "@/components/listing-card";
import { ListingFilters } from "@/components/listing-filters";
import { getListings } from "@/lib/listings";
import { hasSupabaseEnv } from "@/lib/supabase";

type ListingsPageProps = {
  searchParams?: Promise<{
    posted?: string;
    query?: string;
    category?: string;
    condition?: string;
    maxPrice?: string;
  }>;
};

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const listings = await getListings({
    query: params?.query,
    category: params?.category,
    condition: params?.condition,
    maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
  });
  const usingLiveData = hasSupabaseEnv();

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Listings</p>
            <h2 className="page-title mt-3">Browse pre-loved items</h2>
            <p className="page-copy mt-4 max-w-2xl">
              Searchable listings replace chat clutter and help buyers compare price, condition, and payment
              preference in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="accent-pill inline-flex rounded-full px-3 py-2 text-sm font-medium">
              {usingLiveData ? "Supabase connected" : "Using preview data"}
            </span>
            <Link className="cta-button rounded-xl px-5 py-3 font-semibold" href="/sell">
              Post your item
            </Link>
          </div>
        </div>

        {params?.posted === "1" ? (
          <p className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700">
            Your listing was published successfully.
          </p>
        ) : null}
      </section>

      <ListingFilters
        category={params?.category}
        condition={params?.condition}
        maxPrice={params?.maxPrice}
        query={params?.query}
      />

      {listings.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      )}
    </div>
  );
}
