import Link from "next/link";
import { SellerDashboardPanel } from "@/components/seller-dashboard-panel";
import { getCurrentUser } from "@/lib/auth";
import { getSellerDashboardListings } from "@/lib/listings";
import { hasSupabaseAdminEnv } from "@/lib/supabase";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const supabaseReady = hasSupabaseAdminEnv();

  if (!user) {
    return (
      <section className="glass-panel mx-auto max-w-3xl rounded-[2rem] px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Sign in required</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Access your seller dashboard</h2>
        <p className="mt-4 text-zinc-400">
          Sign in with your phone number and password to manage your own listings and mark items as sold.
        </p>
        <Link className="cta-button mt-6 inline-flex rounded-full px-5 py-3 font-medium" href="/auth?next=/dashboard">
          Sign in
        </Link>
      </section>
    );
  }

  const listings = await getSellerDashboardListings(user.id);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Seller dashboard</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">Manage your listings</h2>
        <p className="mt-4 max-w-3xl text-zinc-400">
          Signed in as {user.display_name}. Your published listings are tied directly to your account, so you can
          manage them here without one-time codes.
        </p>

        {!supabaseReady ? (
          <p className="mt-4 text-sm text-zinc-500">
            Dashboard actions need Supabase environment variables and RPC setup before they can work live.
          </p>
        ) : null}
      </section>

      {listings.length > 0 ? (
        <SellerDashboardPanel listings={listings} />
      ) : (
        <section className="glass-panel rounded-[2rem] px-6 py-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">No listings yet</p>
          <p className="mt-4 text-zinc-400">Create your first listing to start managing it here.</p>
        </section>
      )}
    </div>
  );
}
