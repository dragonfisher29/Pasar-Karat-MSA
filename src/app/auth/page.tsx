import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

type AuthPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const nextPath = params?.next || "/dashboard";

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[1rem] p-6 sm:p-8">
        <p className="section-kicker">Account access</p>
        <h1 className="page-title mt-3">Sign in with phone number and password</h1>
        <p className="page-copy mt-4 max-w-3xl">
          Create a simple seller account to publish items, manage your dashboard, and mark listings as sold
          without relying on one-time codes.
        </p>
      </section>

      <AuthForm nextPath={nextPath} />
    </div>
  );
}
