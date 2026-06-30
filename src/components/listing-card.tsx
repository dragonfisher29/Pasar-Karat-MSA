import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="glass-panel overflow-hidden rounded-[1.75rem]">
      <div className="listing-image relative aspect-[4/3] overflow-hidden">
        <Image
          alt={listing.name}
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          src={listing.image_url}
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
          <div className="flex flex-wrap gap-2">
            <span className="accent-pill rounded-full px-3 py-1 text-xs font-medium">{listing.condition}</span>
            <span className="surface-pill rounded-full px-3 py-1 text-xs font-medium">{listing.category}</span>
          </div>
          <FavoriteButton listingId={listing.id} />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">{listing.name}</h2>
            <p className="mt-2 text-sm text-zinc-300">
              {listing.seller_name} · {listing.location}
            </p>
            <p className="mt-2 line-clamp-2 text-sm text-zinc-200/90">{listing.description}</p>
          </div>
          <p className="text-lg font-semibold text-rose-200">{formatPrice(listing.price)}</p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-zinc-200/85">
          <span>
            {listing.rating}/5 · {listing.payment_method}
          </span>
          <Link className="accent-link text-sm font-medium" href={`/listings/${listing.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
