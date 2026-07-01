import { ResetPasswordForm } from "@/components/reset-password-form";

type ResetPasswordPageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = typeof params?.token === "string" ? params.token : "";

  return (
    <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
      <p className="section-kicker">Password reset</p>
      <h1 className="page-title mt-3">Set a new password</h1>
      <p className="page-copy mt-4 max-w-3xl">Enter a new password for your seller account.</p>

      <div className="mt-6">
        <ResetPasswordForm token={token} />
      </div>
    </section>
  );
}
