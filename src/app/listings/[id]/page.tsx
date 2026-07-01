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

      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="accent-pill inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.3em]">
            {listing.category}
          </span>
          <span className="tertiary-pill rounded-full px-3 py-1 text-xs font-medium">{listing.condition}</span>
          <FavoriteButton listingId={listing.id} />
        </div>
        <h2 className="page-title mt-5">{listing.name}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{listing.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Price</p>
            <p className="mt-2 text-2xl font-extrabold text-violet-700">{formatPrice(listing.price)}</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Condition</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{listing.condition}</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Rating</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{listing.rating}/5</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Payment method</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{listing.payment_method}</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Seller</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{listing.seller_name}</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Location</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{listing.location}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="cta-button rounded-xl px-5 py-3 font-semibold"
            href={buildWhatsAppUrl(listing.whatsapp_number, listing.name)}
            rel="noreferrer"
            target="_blank"
          >
            Contact seller on WhatsApp
          </Link>
          <Link className="secondary-button rounded-xl px-5 py-3 font-semibold" href="/sell">
            Post similar item
          </Link>
          <Link className="secondary-button rounded-xl px-5 py-3 font-semibold" href="/listings">
            Back to listings
          </Link>
        </div>
      </section>
    </div>
  );
}
