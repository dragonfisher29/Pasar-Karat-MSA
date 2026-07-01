import { AdminPasswordResetForm } from "@/components/admin-password-reset-form";

export default function AdminPasswordResetPage() {
  return (
    <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
      <p className="section-kicker">Admin</p>
      <h1 className="page-title mt-3">Create a password reset link</h1>
      <p className="page-copy mt-4 max-w-3xl">
        Use this when a seller cannot access their account. The link can be used once and expires quickly.
      </p>

      <div className="mt-6">
        <AdminPasswordResetForm />
      </div>
    </section>
  );
}
