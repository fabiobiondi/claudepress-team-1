import type { Post } from "@/contracts/blog";
import postsSeed from "@/data/posts.seed.json";

/**
 * Store in memoria. Niente database: i dati partono dal seed JSON e vivono
 * finché il processo Next è vivo. Un riavvio del dev server rimette tutto
 * com'era.
 *
 * globalThis serve perché in dev Next ricarica i moduli a ogni salvataggio:
 * senza questo trucco lo store si azzererebbe a ogni hot reload.
 */

declare global {
  var __blogStore: Post[] | undefined;
}

function fresh(): Post[] {
  return structuredClone(postsSeed) as Post[];
}

function load(): Post[] {
  if (!globalThis.__blogStore) {
    globalThis.__blogStore = fresh();
  }
  return globalThis.__blogStore;
}

/** Dal più recente al più vecchio. */
function byNewest(a: Post, b: Post): number {
  return b.createdAt.localeCompare(a.createdAt);
}

export const store = {
  list(): Post[] {
    return [...load()].sort(byNewest);
  },

  listPublished(): Post[] {
    return load().filter((p) => p.status === "published").sort(byNewest);
  },

  find(id: string): Post | undefined {
    return load().find((p) => p.id === id);
  },

  findBySlug(slug: string): Post | undefined {
    return load().find((p) => p.slug === slug);
  },

  insert(post: Post): Post {
    load().unshift(post);
    return post;
  },

  update(id: string, patch: Partial<Post>): Post | undefined {
    const items = load();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    items[index] = { ...items[index], ...patch };
    return items[index];
  },

  remove(id: string): boolean {
    const items = load();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  },

  takenSlugs(exceptId?: string): string[] {
    return load().filter((p) => p.id !== exceptId).map((p) => p.slug);
  },

  /** Genera l'id successivo: "po-001", "po-002", … */
  nextId(): string {
    const max = load()
      .map((p) => Number.parseInt(p.id.replace("po-", ""), 10))
      .filter((n) => !Number.isNaN(n))
      .reduce((a, b) => Math.max(a, b), 0);
    return `po-${String(max + 1).padStart(3, "0")}`;
  },

  /** Riporta lo store allo stato del seed. */
  reset(): void {
    globalThis.__blogStore = fresh();
  },
};
