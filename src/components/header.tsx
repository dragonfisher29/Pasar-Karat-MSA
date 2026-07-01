import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/favorites", label: "Favorites" },
  { href: "/sell", label: "Sell an Item" },
  { href: "/dashboard", label: "Dashboard" },
];

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="glass-panel sticky top-4 z-20 mb-8 rounded-[1rem] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl">
            <Logo className="h-11 w-11" />
          </div>
          <div>
            <p className="section-kicker">Community resale</p>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">Pasar Karat</h1>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="rounded-full px-4 py-2 font-medium transition hover:bg-violet-50 hover:text-violet-700"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link className="surface-pill rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5" href="/user">
                {user.display_name}
              </Link>
              <form action={signOut}>
                <button className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700" type="submit">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700" href="/auth">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
