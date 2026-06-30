import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/favorite-button";
import { ListingGallery } from "@/components/listing-gallery";
import { getListingById } from "@/lib/listings";
import { buildWhatsAppUrl, formatPrice } from "@/lib/utils";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <ListingGallery images={listing.gallery_image_urls} name={listing.name} />

      <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="accent-pill inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.3em]">
            {listing.category}
          </span>
          <span className="surface-pill rounded-full px-3 py-1 text-xs">{listing.condition}</span>
          <FavoriteButton listingId={listing.id} />
        </div>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">{listing.name}</h2>
        <p className="mt-4 text-lg leading-8 text-zinc-400">{listing.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Price</p>
            <p className="mt-2 text-2xl font-semibold text-rose-200">{formatPrice(listing.price)}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Condition</p>
            <p className="mt-2 text-xl font-semibold text-white">{listing.condition}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Rating</p>
            <p className="mt-2 text-xl font-semibold text-white">{listing.rating}/5</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Payment method</p>
            <p className="mt-2 text-xl font-semibold text-white">{listing.payment_method}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Seller</p>
            <p className="mt-2 text-xl font-semibold text-white">{listing.seller_name}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-zinc-500">Location</p>
            <p className="mt-2 text-xl font-semibold text-white">{listing.location}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="cta-button rounded-full px-5 py-3 font-medium"
            href={buildWhatsAppUrl(listing.whatsapp_number, listing.name)}
            rel="noreferrer"
            target="_blank"
          >
            Contact seller on WhatsApp
          </Link>
          <Link className="secondary-button rounded-full px-5 py-3 font-medium text-zinc-200" href="/sell">
            Post similar item
          </Link>
          <Link className="secondary-button rounded-full px-5 py-3 font-medium text-zinc-200" href="/listings">
            Back to listings
          </Link>
        </div>
      </section>
    </div>
  );
}
