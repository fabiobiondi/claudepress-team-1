import { EmptyState } from "@/components/ui/EmptyState";
import { PostCard } from "@/components/ui/PostCard";
import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";

/** null quando le API non rispondono o rispondono male. */
async function loadPublishedPosts(): Promise<Post[] | null> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.publishedPosts), {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Post[];
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const posts = await loadPublishedPosts();

  if (!posts) {
    return (
      <div className="border-t-2 border-alarm py-10">
        <p className="font-serif text-xl">Non riesco a caricare i post</p>
        <p className="mt-2 max-w-[52ch] text-ink-soft">
          Le API non hanno risposto. Ricarica la pagina fra qualche istante.
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="Non c'è ancora niente da leggere"
        description="I post compaiono qui appena vengono pubblicati, dal più recente."
      />
    );
  }

  return (
    <>
      <h1 className="sr-only">Articoli pubblicati</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
          date={post.createdAt}
          href={ROUTES.post(post.slug)}
        />
      ))}
    </>
  );
}
