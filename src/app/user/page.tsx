import { ProfileForm } from "@/components/profile-form";
import { requireCurrentUser } from "@/lib/auth";

export default async function UserPage() {
  const user = await requireCurrentUser("/user");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">User page</p>
        <h1 className="page-title mt-3">Manage your profile</h1>
        <p className="page-copy mt-4">
          Update the account details used across your seller profile, listings, and WhatsApp contact entry points.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Current name</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user.display_name}</p>
          </div>
          <div className="info-card p-4">
            <p className="text-sm font-semibold text-slate-500">Current WhatsApp</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{user.phone_number}</p>
          </div>
        </div>
      </section>

      <ProfileForm user={user} />
    </div>
  );
}
