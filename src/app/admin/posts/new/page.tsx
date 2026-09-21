// Server component: la pagina rende solo l'intestazione, l'interattività
// vive dentro PostForm.

import { PostForm } from "@/app/admin/_components/PostForm";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-rule pb-6">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Nuovo post</h1>
        <p className="mt-2 font-sans text-sm text-ink-soft">
          Compila i campi e scegli se salvarlo come bozza o pubblicarlo subito.
        </p>
      </header>

      <PostForm />
    </div>
  );
}
