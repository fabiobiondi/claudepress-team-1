import Link from "next/link";
import { notFound } from "next/navigation";

import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type LoadResult =
  | { kind: "ok"; post: Post }
  | { kind: "missing" }
  | { kind: "error" };

async function loadPost(slug: string): Promise<LoadResult> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.postBySlug(slug)), {
      cache: "no-store",
    });
    if (res.status === 404) return { kind: "missing" };
    if (!res.ok) return { kind: "error" };
    return { kind: "ok", post: (await res.json()) as Post };
  } catch {
    return { kind: "error" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await loadPost(slug);

  if (result.kind === "error") {
    return (
      <div className="border-t-2 border-alarm py-10">
        <p className="font-serif text-xl">Non riesco a caricare il post</p>
        <p className="mt-2 max-w-[52ch] text-ink-soft">
          Le API non hanno risposto. Ricarica la pagina fra qualche istante.
        </p>
      </div>
    );
  }

  // Una bozza non è pubblica: per chi arriva dal sito non esiste ancora.
  if (result.kind === "missing" || result.post.status !== "published") {
    notFound();
  }

  const { post } = result;

  return (
    <article>
      <header className="border-b border-rule pb-8">
        <h1 className="max-w-[24ch] font-serif text-4xl leading-tight font-semibold">
          {post.title}
        </h1>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-sans text-sm text-ink-faint">
          <span>{post.author}</span>
          <time dateTime={post.createdAt}>
            {dateFormatter.format(new Date(post.createdAt))}
          </time>
        </p>
      </header>

      <div className="mt-8 max-w-[64ch] font-serif text-lg leading-relaxed">
        {post.content.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index} className="mt-5 whitespace-pre-line first:mt-0">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="mt-12 border-t border-rule pt-6 font-sans text-sm">
        <Link href={ROUTES.home} className="text-ink-soft hover:text-ink">
          Tutti gli articoli
        </Link>
      </p>
    </article>
  );
}
