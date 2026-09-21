import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { postInputSchema, type Post } from "@/contracts/blog";
import { store } from "@/server/store";
import { uniqueSlug } from "@/server/slug";
import { validationError } from "@/server/http";

/**
 * GET  /api/posts                     → Post[], dal più recente
 * GET  /api/posts?status=published    → solo i pubblicati
 * POST /api/posts                     → Post, 201
 *
 * Già implementato: nessuno dei tre track lo scrive.
 */

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  return NextResponse.json(status === "published" ? store.listPublished() : store.list());
}

export async function POST(request: Request) {
  const parsed = postInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const now = new Date().toISOString();
  const post: Post = {
    id: store.nextId(),
    slug: uniqueSlug(parsed.data.title, store.takenSlugs()),
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  };

  return NextResponse.json(store.insert(post), { status: 201 });
}
