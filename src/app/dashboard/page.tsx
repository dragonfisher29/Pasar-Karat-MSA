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
      <section className="glass-panel mx-auto max-w-3xl rounded-[1rem] px-6 py-14 text-center">
        <p className="section-kicker">Sign in required</p>
        <h2 className="page-title mt-4">Access your seller dashboard</h2>
        <p className="page-copy mt-4">
          Sign in with your phone number and password to manage your own listings and mark items as sold.
        </p>
        <Link className="cta-button mt-6 inline-flex rounded-xl px-5 py-3 font-semibold" href="/auth?next=/dashboard">
          Sign in
        </Link>
      </section>
    );
  }

  const listings = await getSellerDashboardListings(user.id);

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">Seller dashboard</p>
        <h2 className="page-title mt-3">Manage your listings</h2>
        <p className="page-copy mt-4 max-w-3xl">
          Signed in as {user.display_name}. Your published listings are tied directly to your account, so you can
          manage them here without one-time codes.
        </p>

        {!supabaseReady ? (
          <p className="mt-4 text-sm font-medium text-slate-500">
            Dashboard actions need Supabase environment variables and RPC setup before they can work live.
          </p>
        ) : null}
      </section>

      {listings.length > 0 ? (
        <SellerDashboardPanel listings={listings} />
      ) : (
        <section className="glass-panel rounded-[1rem] px-6 py-12 text-center">
          <p className="section-kicker">No listings yet</p>
          <p className="mt-4 text-slate-600">Create your first listing to start managing it here.</p>
        </section>
      )}
    </div>
  );
}
