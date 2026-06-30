import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

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
    <header className="glass-panel sticky top-4 z-20 mb-8 rounded-full px-4 py-3 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="brand-mark flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold">
            PK
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Community resale</p>
            <h1 className="text-lg font-semibold">Pasar Karat</h1>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="rounded-full border border-white/10 px-4 py-2 text-zinc-200">{user.display_name}</span>
              <form action={signOut}>
                <button className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white" type="submit">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white" href="/auth">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
