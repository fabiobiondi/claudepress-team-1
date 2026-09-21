import Link from "next/link";
import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePostButton } from "@/app/admin/posts/_list/DeletePostButton";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

async function loadPosts(): Promise<Post[]> {
  const response = await fetch(apiUrl(API_ROUTES.posts), { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`GET ${API_ROUTES.posts} ha risposto ${response.status}`);
  }

  return response.json();
}

export default async function AdminPostsPage() {
  const posts = await loadPosts();
  // Ordinamento deciso dal team: data di modifica, dal più recente.
  // Le date sono ISO 8601, quindi l'ordine alfabetico è già quello cronologico.
  const ordered = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Post</h1>
        <Link
          href={ROUTES.adminPostNew}
          className="inline-flex items-center justify-center rounded-sm bg-ink px-4 py-2 font-sans text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Nuovo post
        </Link>
      </div>

      {ordered.length === 0 ? (
        <EmptyState
          title="Nessun post"
          description="Qui compariranno tutti i post, bozze comprese. Comincia con «Nuovo post»."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule text-sm text-ink-faint">
                <th scope="col" className="py-3 pr-6 font-medium">
                  Titolo
                </th>
                <th scope="col" className="py-3 pr-6 font-medium">
                  Autore
                </th>
                <th scope="col" className="py-3 pr-6 font-medium">
                  Modificato
                </th>
                <th scope="col" className="py-3 pr-6 font-medium">
                  Stato
                </th>
                <th scope="col" className="py-3 text-right font-medium">
                  <span className="sr-only">Azioni</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ordered.map((post) => (
                <tr key={post.id} className="border-b border-rule align-baseline">
                  <td className="py-5 pr-6 font-serif text-lg">{post.title}</td>
                  <td className="py-5 pr-6 text-ink-soft">{post.author}</td>
                  <td className="py-5 pr-6 text-ink-soft">
                    <time dateTime={post.updatedAt}>
                      {dateFormatter.format(new Date(post.updatedAt))}
                    </time>
                  </td>
                  <td className="py-5 pr-6">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="py-5">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={ROUTES.adminPost(post.id)}
                        className="text-sm underline decoration-rule underline-offset-4 hover:decoration-ink"
                      >
                        Modifica<span className="sr-only"> il post {post.title}</span>
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
