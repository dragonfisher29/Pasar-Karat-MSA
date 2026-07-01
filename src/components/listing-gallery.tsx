"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ListingGalleryProps = {
  images: string[];
  name: string;
};

export function ListingGallery({ images, name }: ListingGalleryProps) {
  const gallery = useMemo(
    () =>
      images.length > 0
        ? images
        : ["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23f4f4f5' font-size='48'%3ENo image%3C/text%3E%3C/svg%3E"],
    [images],
  );
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <section className="glass-panel overflow-hidden rounded-[1rem]">
      <div className="listing-image relative aspect-[5/4]">
        <Image
          alt={name}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          src={activeImage}
          unoptimized
        />
      </div>

      <div className="grid grid-cols-3 gap-3 p-4">
        {gallery.map((image, index) => (
          <button
            key={`${image}-${index}`}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl border ${
              activeImage === image ? "border-violet-400 shadow-[0_10px_30px_rgba(107,56,212,0.15)]" : "border-slate-200"
            }`}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image alt={`${name} preview ${index + 1}`} className="object-cover" fill sizes="25vw" src={image} unoptimized />
          </button>
        ))}
      </div>
    </section>
  );
}
