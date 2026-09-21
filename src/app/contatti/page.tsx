import type { Metadata } from "next";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contatti — ClaudePress",
};

export default function ContactPage() {
  return (
    <>
      <h1 className="font-serif text-4xl leading-tight font-semibold">
        Scrivici
      </h1>
      <p className="mt-4 max-w-[60ch] font-serif text-lg leading-relaxed text-ink-soft">
        Correzioni, proposte di articoli, o una domanda su quello che hai letto:
        compila i tre campi qui sotto.
      </p>

      <ContactForm />
    </>
  );
}
