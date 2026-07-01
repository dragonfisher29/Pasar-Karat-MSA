import Link from "next/link";
import { SellForm } from "@/components/sell-form";
import { getCurrentUser } from "@/lib/auth";
import { hasSupabaseAdminEnv } from "@/lib/supabase";

export default async function SellPage() {
  const user = await getCurrentUser();
  const supabaseReady = hasSupabaseAdminEnv();

  if (!user) {
    return (
      <section className="glass-panel mx-auto max-w-3xl rounded-[1rem] px-6 py-14 text-center">
        <p className="section-kicker">Sign in required</p>
        <h2 className="page-title mt-4">Create an account before posting items</h2>
        <p className="page-copy mt-4">
          Sellers now use a simple phone number and password login, so your listings stay tied to your account
          instead of a one-time manage code.
        </p>
        <Link className="cta-button mt-6 inline-flex rounded-xl px-5 py-3 font-semibold" href="/auth?next=/sell">
          Sign in or create account
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">Sell an item</p>
        <h2 className="page-title mt-4">Post a listing in the same format your community already uses</h2>
        <p className="page-copy mt-5">
          Keep the familiar details from WhatsApp, but make them searchable, cleaner, and easier to browse on
          the web.
        </p>

        <div className="mt-8 space-y-4 text-sm text-slate-600">
          <div className="info-card p-4">
            <p className="font-semibold text-slate-900">Included fields</p>
            <p className="mt-2 leading-6 text-slate-600">
              Seller identity, WhatsApp number, category, location, richer images, item details, and payment method.
            </p>
          </div>
          <div className="info-card p-4">
            <p className="font-semibold text-slate-900">Deployment target</p>
            <p className="mt-2 leading-6 text-slate-600">Built for Vercel with Supabase as the backing database.</p>
          </div>
          <div className="info-card p-4">
            <p className="font-semibold text-slate-900">Account-based dashboard</p>
            <p className="mt-2 leading-6 text-slate-600">
              Your published listings are linked directly to your logged-in account for later management.
            </p>
          </div>
          <div className="info-card p-4">
            <p className="font-semibold text-slate-900">Current mode</p>
            <p className="mt-2 leading-6 text-slate-600">
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
