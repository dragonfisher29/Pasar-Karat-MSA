import Link from "next/link";
import { SellForm } from "@/components/sell-form";
import { getCurrentUser } from "@/lib/auth";
import { hasSupabaseAdminEnv } from "@/lib/supabase";

export default async function SellPage() {
  const user = await getCurrentUser();
  const supabaseReady = hasSupabaseAdminEnv();

  if (!user) {
    return (
      <section className="glass-panel mx-auto max-w-3xl rounded-[2rem] px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Sign in required</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Create an account before posting items</h2>
        <p className="mt-4 text-zinc-400">
          Sellers now use a simple phone number and password login, so your listings stay tied to your account
          instead of a one-time manage code.
        </p>
        <Link className="cta-button mt-6 inline-flex rounded-full px-5 py-3 font-medium" href="/auth?next=/sell">
          Sign in or create account
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Sell an item</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">Post a listing in the same format your community already uses</h2>
        <p className="mt-5 text-zinc-400">
          Keep the familiar details from WhatsApp, but make them searchable, cleaner, and easier to browse on
          the web.
        </p>

        <div className="mt-8 space-y-4 text-sm text-zinc-300">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="font-medium text-white">Included fields</p>
            <p className="mt-2 text-zinc-400">
              Seller identity, WhatsApp number, category, location, richer images, item details, and payment method.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="font-medium text-white">Deployment target</p>
            <p className="mt-2 text-zinc-400">Built for Vercel with Supabase as the backing database.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="font-medium text-white">Account-based dashboard</p>
            <p className="mt-2 text-zinc-400">
              Your published listings are linked directly to your logged-in account for later management.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <p className="font-medium text-white">Current mode</p>
            <p className="mt-2 text-zinc-400">
              {supabaseReady
                ? "Live submission is enabled."
                : "Preview mode is active until Supabase server environment variables are added."}
            </p>
          </div>
        </div>
      </section>

      <SellForm user={user} />
    </div>
  );
}
