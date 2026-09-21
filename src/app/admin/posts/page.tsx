// TODO(backoffice/elenco): la tabella dei post non è ancora implementata.
// Deve mostrare tutti i post, bozze comprese, con StatusBadge ed eliminazione.

import Link from "next/link";

export default function AdminPostsPlaceholder() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8">
      <h1 className="text-xl font-semibold">L&apos;elenco non è ancora implementato</h1>
      <p className="mt-2 text-slate-600">
        Deve mostrare <em>tutti</em> i post, bozze comprese — a differenza della home,
        che mostra solo i pubblicati:
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100">
curl -s localhost:3000/api/posts
      </pre>
      <p className="mt-4 text-sm text-slate-500">
        <Link href="/admin/posts/new" className="underline">
          Nuovo post
        </Link>
      </p>
    </div>
  );
}
