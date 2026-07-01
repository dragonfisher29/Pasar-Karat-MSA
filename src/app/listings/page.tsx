import { EmptyState } from "@/components/empty-state";
import { ListingCard } from "@/components/listing-card";
import { ListingFilters } from "@/components/listing-filters";
import { getListings } from "@/lib/listings";

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

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">Listings</p>
        <h2 className="page-title mt-3">Browse pre-loved items</h2>

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
