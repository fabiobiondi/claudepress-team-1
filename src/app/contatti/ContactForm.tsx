"use client";
// Client component: i campi, gli errori e la conferma sono stato locale, e il
// submit è un event handler — niente di tutto questo può stare su un server
// component.

import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

/**
 * Lo schema sta qui e non nel contratto: il contratto descrive i post e non si
 * modifica senza chiedere. La regola che conta resta rispettata — si valida con
 * zod, non con controlli scritti a mano.
 */
const contactSchema = z.object({
  name: z.string().trim().min(1, "Il nome non può essere vuoto"),
  email: z.email("L'indirizzo email non è valido"),
  message: z
    .string()
    .trim()
    .min(10, "Il messaggio deve avere almeno 10 caratteri"),
});

const EMPTY_VALUES = { name: "", email: "", message: "" };

type ContactValues = typeof EMPTY_VALUES;

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "_");
        if (!fields[key]) fields[key] = issue.message;
      }
      setErrors(fields);
      return;
    }

    setErrors({});
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mt-8 border-t-2 border-live py-8">
        <p className="font-serif text-xl">Messaggio inviato</p>
        <p className="mt-2 max-w-[52ch] text-ink-soft">
          Grazie {values.name}, ti rispondiamo all&apos;indirizzo {values.email}.
        </p>
      </div>
    );
  }

  return (
    // noValidate: la validazione è quella di zod, non i fumetti del browser.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 flex max-w-xl flex-col gap-5"
    >
      <Field label="Nome" htmlFor="name" error={errors.name}>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={(value) => update("name", value)}
          invalid={Boolean(errors.name)}
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={(value) => update("email", value)}
          invalid={Boolean(errors.email)}
        />
      </Field>

      <Field label="Messaggio" htmlFor="message" error={errors.message}>
        <Input
          id="message"
          name="message"
          value={values.message}
          onChange={(value) => update("message", value)}
          multiline
          invalid={Boolean(errors.message)}
        />
      </Field>

      <div>
        <Button type="submit">Invia il messaggio</Button>
      </div>
    </form>
  );
}
