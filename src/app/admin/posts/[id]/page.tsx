// Server component: carica il post e lo passa a PostForm, che è il client.

import { notFound } from "next/navigation";

import { PostForm } from "@/app/admin/_components/PostForm";
import { API_ROUTES, apiUrl, type Post } from "@/contracts/blog";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // no-store: il post appena modificato deve rileggersi aggiornato.
  const res = await fetch(apiUrl(API_ROUTES.post(id)), { cache: "no-store" });

  if (res.status === 404) notFound();
  if (!res.ok) {
    throw new Error(`Impossibile caricare il post ${id}: ${res.status}`);
  }

  const post = (await res.json()) as Post;

  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-rule pb-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Modifica post
        </h1>
        <p className="mt-2 font-sans text-sm text-ink-soft">{post.title}</p>
      </header>

      <PostForm
        id={post.id}
        initialValues={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          status: post.status,
        }}
      />
    </div>
  );
}
