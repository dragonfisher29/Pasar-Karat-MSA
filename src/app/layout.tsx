import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pasar Karat",
  description: "A community marketplace for pre-loved items built for simple local selling.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-10">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="mt-8 rounded-[1rem] border border-slate-200 bg-white/80 px-6 py-4 text-center text-sm text-slate-600 shadow-[0_12px_30px_rgba(107,56,212,0.06)]">
              To report a problem, contact admin on WhatsApp at{" "}
              <a className="accent-link font-semibold" href="https://wa.me/447733529901" rel="noreferrer" target="_blank">
                44 7733529901
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
