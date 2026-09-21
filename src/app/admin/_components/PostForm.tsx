"use client";
// Client component: il form tiene i valori in stato, valida al submit e
// naviga dopo il salvataggio. Stato ed event handler non stanno in un
// server component.

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  API_ROUTES,
  POST_STATUSES,
  ROUTES,
  postInputSchema,
  type ApiError,
  type PostInput,
  type PostStatus,
} from "@/contracts/blog";

const STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Bozza",
  published: "Pubblicato",
};

const EMPTY_VALUES: PostInput = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  status: "draft",
};

export type PostFormProps = {
  /** Senza id è una creazione, con id una modifica. */
  id?: string;
  initialValues?: Partial<PostInput>;
};

export function PostForm({ id, initialValues }: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostInput>({
    ...EMPTY_VALUES,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setValue = <K extends keyof PostInput>(key: K, value: PostInput[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = postInputSchema.safeParse(values);
    if (!parsed.success) {
      // Campo → messaggio: il primo errore di ogni campo è quello che si legge.
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        if (!(field in fieldErrors)) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch(id ? API_ROUTES.post(id) : API_ROUTES.posts, {
        method: id ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const { error } = (await res.json()) as ApiError;
        if (error.code === "validation_error" && error.fields) {
          setErrors(error.fields);
        } else {
          setFormError(error.message);
        }
        return;
      }

      // refresh: l'elenco legge dalle API, senza questo torna la copia in cache.
      router.push(ROUTES.adminPosts);
      router.refresh();
    } catch {
      setFormError("Non è stato possibile salvare il post. Riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Titolo" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          name="title"
          value={values.title}
          onChange={(value) => setValue("title", value)}
          placeholder="Il titolo del post"
          invalid={Boolean(errors.title)}
        />
      </Field>

      <Field label="Sommario" htmlFor="excerpt" error={errors.excerpt}>
        <Input
          id="excerpt"
          name="excerpt"
          value={values.excerpt}
          onChange={(value) => setValue("excerpt", value)}
          placeholder="Una riga che invoglia a leggere"
          invalid={Boolean(errors.excerpt)}
        />
      </Field>

      <Field label="Contenuto" htmlFor="content" error={errors.content}>
        <Input
          id="content"
          name="content"
          value={values.content}
          onChange={(value) => setValue("content", value)}
          multiline
          placeholder="Il testo del post"
          invalid={Boolean(errors.content)}
        />
      </Field>

      <Field label="Autore" htmlFor="author" error={errors.author}>
        <Input
          id="author"
          name="author"
          value={values.author}
          onChange={(value) => setValue("author", value)}
          placeholder="Chi lo firma"
          invalid={Boolean(errors.author)}
        />
      </Field>

      {/* Due valori soli: due bottoni dicono più di un select a due voci. */}
      <fieldset className="flex flex-col gap-1.5">
        <legend className="mb-1.5 font-sans text-sm font-medium text-ink-soft">
          Stato
        </legend>
        <div className="flex gap-2">
          {POST_STATUSES.map((status) => (
            <Button
              key={status}
              variant={values.status === status ? "primary" : "secondary"}
              onClick={() => setValue("status", status)}
            >
              {STATUS_LABELS[status]}
            </Button>
          ))}
        </div>
        {errors.status ? (
          <p role="alert" className="font-sans text-sm text-alarm">
            {errors.status}
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-rule pt-6">
        {formError ? (
          <p role="alert" className="font-sans text-sm text-alarm">
            {formError}
          </p>
        ) : null}
        <div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Salvataggio…" : id ? "Salva le modifiche" : "Crea il post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
