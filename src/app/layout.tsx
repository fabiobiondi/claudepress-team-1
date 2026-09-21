import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClaudePress",
  description: "Un blog con il suo CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`h-full antialiased ${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <header className="border-b-2 border-ink">
          <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 py-5">
            <Link href="/" className="font-serif text-2xl font-semibold tracking-tight">
              ClaudePress
            </Link>
            <nav className="flex gap-6 text-sm text-ink-soft">
              <Link href="/" className="hover:text-ink">
                Blog
              </Link>
              <Link href="/admin/posts" className="hover:text-ink">
                Backoffice
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
