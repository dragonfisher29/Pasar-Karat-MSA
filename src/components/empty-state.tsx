import Link from "next/link";

export function EmptyState() {
  return (
    <section className="glass-panel rounded-[2rem] px-6 py-12 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">No listings yet</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Be the first seller in the community</h2>
      <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
        Your WhatsApp posting format is ready to go here. Add the first pre-loved item and turn this
        marketplace into the community&apos;s main resale board.
      </p>
      <Link className="cta-button mt-6 inline-flex rounded-full px-5 py-3 font-medium" href="/sell">
        Post an item
      </Link>
    </section>
  );
}
