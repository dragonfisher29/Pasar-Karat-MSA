import Link from "next/link";

export default function NotFound() {
  return (
    <section className="glass-panel mx-auto max-w-2xl rounded-[1rem] px-6 py-14 text-center">
      <p className="section-kicker">Listing not found</p>
      <h2 className="page-title mt-4">This item is no longer available here</h2>
      <p className="page-copy mt-4">
        The listing may have been removed, sold, or the link may be incorrect.
      </p>
      <Link className="cta-button mt-6 inline-flex rounded-xl px-5 py-3 font-semibold" href="/listings">
        Return to listings
      </Link>
    </section>
  );
}
