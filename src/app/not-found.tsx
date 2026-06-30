import Link from "next/link";

export default function NotFound() {
  return (
    <section className="glass-panel mx-auto max-w-2xl rounded-[2rem] px-6 py-14 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Listing not found</p>
      <h2 className="mt-4 text-4xl font-semibold text-white">This item is no longer available here</h2>
      <p className="mt-4 text-zinc-400">
        The listing may have been removed, sold, or the link may be incorrect.
      </p>
      <Link className="cta-button mt-6 inline-flex rounded-full px-5 py-3 font-medium" href="/listings">
        Return to listings
      </Link>
    </section>
  );
}
