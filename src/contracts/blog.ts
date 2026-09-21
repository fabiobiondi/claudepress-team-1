// src/contracts/blog.ts
//
// Il contratto condiviso fra le tre persone del team.
// Si legge e si importa, non si modifica.

import type { ReactNode } from "react";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Il dato — serve a tutti e tre                                              */
/* -------------------------------------------------------------------------- */

export const POST_STATUSES = ["draft", "published"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export type Post = {
  id: string;
  slug: string; // generato dal server dal titolo, unico
  title: string;
  excerpt: string;
  content: string;
  author: string;
  status: PostStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
};

/* -------------------------------------------------------------------------- */
/* L'input — serve a T3 per il form, e alle API per validare                  */
/* -------------------------------------------------------------------------- */

export const postInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Il titolo deve avere almeno 3 caratteri")
    .max(120, "Il titolo non può superare i 120 caratteri"),
  excerpt: z
    .string()
    .trim()
    .max(200, "Il sommario non può superare i 200 caratteri"),
  content: z.string().trim().min(1, "Il contenuto non può essere vuoto"),
  author: z.string().trim().min(1, "L'autore non può essere vuoto"),
  status: z.enum(POST_STATUSES),
});

export type PostInput = z.infer<typeof postInputSchema>;

/** La modifica manda solo i campi cambiati. */
export const postPatchSchema = postInputSchema.partial();
export type PostPatch = z.infer<typeof postPatchSchema>;

/* -------------------------------------------------------------------------- */
/* L'errore — stessa forma su tutti gli endpoint, 404 compresi                */
/* -------------------------------------------------------------------------- */

export const API_ERROR_CODES = [
  "not_found",
  "validation_error",
  "internal_error",
] as const;
export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export type ApiError = {
  error: {
    code: ApiErrorCode;
    message: string;
    /** C'è solo quando code è "validation_error": campo → messaggio. */
    fields?: Record<string, string>;
  };
};

/* -------------------------------------------------------------------------- */
/* Le rotte — nessuno scrive URL a mano                                       */
/* -------------------------------------------------------------------------- */

export const API_ROUTES = {
  posts: "/api/posts",
  publishedPosts: "/api/posts?status=published",
  post: (id: string) => `/api/posts/${id}`,
  postBySlug: (slug: string) => `/api/posts/by-slug/${slug}`,
} as const;

/**
 * Un server component non può fare fetch di un path relativo: gli serve
 * l'URL assoluto. Le pagine passano da qui, i client component no (nel
 * browser il path relativo va bene).
 */
export const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000";
export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const ROUTES = {
  home: "/",
  post: (slug: string) => `/posts/${slug}`,
  adminPosts: "/admin/posts",
  adminPostNew: "/admin/posts/new",
  adminPost: (id: string) => `/admin/posts/${id}`,
} as const;

/* -------------------------------------------------------------------------- */
/* I componenti condivisi — scritti da tutti e tre all'inizio                  */
/*                                                                            */
/* Le firme stanno qui apposta: chi scrive il componente e chi lo usa non      */
/* devono mettersi d'accordo, il contratto ha già deciso per loro.             */
/* -------------------------------------------------------------------------- */

export type PostCardProps = {
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO 8601
  href: string;
};

export type StatusBadgeProps = {
  status: PostStatus;
};

export type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  /** Solo dentro un client component: un server component non può passarlo. */
  onClick?: () => void;
  children: ReactNode;
};

export type FieldProps = {
  label: string;
  /** L'id del controllo che avvolge, per collegare la label. */
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

/**
 * Il controllo di testo, condiviso: sta qui e non dentro il form perché è
 * l'unico modo perché riceva lo stesso trattamento visivo del resto.
 * multiline lo rende una textarea.
 */
export type InputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  invalid?: boolean;
};

export type EmptyStateProps = {
  title: string;
  description?: string;
};
