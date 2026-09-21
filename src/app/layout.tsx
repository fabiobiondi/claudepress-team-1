import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClaudePress",
  description: "Un blog con il suo CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              ClaudePress
            </Link>
            <nav className="flex gap-5 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Blog
              </Link>
              <Link href="/admin/posts" className="hover:text-slate-900">
                Backoffice
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
