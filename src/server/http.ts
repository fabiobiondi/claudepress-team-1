import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import type { ApiError, ApiErrorCode } from "@/contracts/blog";

/**
 * Tutti gli errori delle API hanno la forma ApiError del contratto,
 * 404 compresi. Queste due funzioni servono a non dimenticarsene.
 */

export function apiError(
  code: ApiErrorCode,
  message: string,
  status: number,
  fields?: Record<string, string>,
) {
  const body: ApiError = { error: { code, message, ...(fields ? { fields } : {}) } };
  return NextResponse.json(body, { status });
}

export function notFound(message = "Post non trovato") {
  return apiError("not_found", message, 404);
}

/** Da uno ZodError alla mappa campo → messaggio che si aspetta il form. */
export function validationError(error: ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!fields[key]) fields[key] = issue.message;
  }
  return apiError("validation_error", "Alcuni campi non sono validi", 422, fields);
}
