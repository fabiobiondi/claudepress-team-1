import Link from "next/link";
import {
  API_ROUTES,
  ROUTES,
  apiUrl,
  postInputSchema,
  type Post,
  type PostStatus,
} from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePostButton } from "@/app/admin/posts/_list/DeletePostButton";
import { StatusToggle } from "@/app/admin/posts/_list/StatusToggle";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const FILTERS: { label: string; href: string; status: PostStatus | null }[] = [
  { label: "Tutti", href: ROUTES.adminPosts, status: null },
  { label: "Bozze", href: `${ROUTES.adminPosts}?status=draft`, status: "draft" },
  { label: "Pubblicati", href: `${ROUTES.adminPosts}?status=published`, status: "published" },
];

const EMPTY_STATES: Record<string, { title: string; description: string }> = {
  all: {
    title: "Nessun post",
    description: "Qui compariranno tutti i post, bozze comprese. Comincia con «Nuovo post».",
  },
  draft: {
    title: "Nessuna bozza",
    description: "Ogni post è già pubblicato.",
  },
  published: {
    title: "Nessun post pubblicato",
    description: "Una bozza diventa pubblica con «Pubblica», dalla riga del post.",
  },
};

/** Qualsiasi altro valore di ?status= vale come nessun filtro. */
function parseStatus(raw: string | string[] | undefined): PostStatus | null {
  const parsed = postInputSchema.shape.status.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

async function loadPosts(): Promise<Post[]> {
  const response = await fetch(apiUrl(API_ROUTES.posts), { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`GET ${API_ROUTES.posts} ha risposto ${response.status}`);
  }

  return response.json();
}

type AdminPostsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  const status = parseStatus((await searchParams).status);
  const posts = await loadPosts();

  // Ordinamento deciso dal team: data di modifica, dal più recente.
  // Le date sono ISO 8601, quindi l'ordine alfabetico è già quello cronologico.
  const listed = posts
    .filter((post) => status === null || post.status === status)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const emptyState = EMPTY_STATES[status ?? "all"];

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pb-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Post</h1>
        <Link
          href={ROUTES.adminPostNew}
          className="inline-flex items-center justify-center rounded-sm bg-ink px-4 py-2 font-sans text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Nuovo post
        </Link>
      </div>

      <nav aria-label="Filtra per stato" className="flex gap-6 border-b-2 border-ink text-sm">
        {FILTERS.map((filter) => {
          const isActive = filter.status === status;

          return (
            <Link
              key={filter.label}
              href={filter.href}
              aria-current={isActive ? "page" : undefined}
              className={`-mb-0.5 border-b-2 pb-2 ${
                isActive
                  ? "border-ink font-medium text-ink"
                  : "border-transparent text-ink-faint hover:text-ink"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>

      {listed.length === 0 ? (
        <EmptyState title={emptyState.title} description={emptyState.description} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left">
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
              {listed.map((post) => (
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
                      <StatusToggle id={post.id} status={post.status} title={post.title} />
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
