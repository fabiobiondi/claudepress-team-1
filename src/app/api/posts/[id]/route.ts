import { NextResponse } from "next/server";
import { postPatchSchema } from "@/contracts/blog";
import { store } from "@/server/store";
import { uniqueSlug } from "@/server/slug";
import { notFound, validationError } from "@/server/http";

/**
 * GET    /api/posts/:id → Post, 404 se non c'è
 * PATCH  /api/posts/:id → Post, 404 se non c'è
 * DELETE /api/posts/:id → 204, 404 se non c'è
 */

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const post = store.find(id);
  return post ? NextResponse.json(post) : notFound();
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  if (!store.find(id)) return notFound();

  const parsed = postPatchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error);

  const patch: Record<string, unknown> = { ...parsed.data, updatedAt: new Date().toISOString() };
  if (parsed.data.title) {
    patch.slug = uniqueSlug(parsed.data.title, store.takenSlugs(id));
  }

  return NextResponse.json(store.update(id, patch));
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  return store.remove(id) ? new NextResponse(null, { status: 204 }) : notFound();
}
