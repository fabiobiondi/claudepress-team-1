import { NextResponse } from "next/server";
import { store } from "@/server/store";
import { notFound } from "@/server/http";

/** GET /api/posts/by-slug/:slug → Post, 404 se non c'è. Lo usa il sito pubblico. */

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = store.findBySlug(slug);
  return post ? NextResponse.json(post) : notFound();
}
