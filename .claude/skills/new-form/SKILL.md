---
name: new-form
description: Crea un form che valida con gli schemi zod del contratto e mostra gli errori dentro il campo sbagliato. Trigger: nuovo form, il form di creazione, il modulo del post.
---

# Nuovo form

Ricevi il form da creare, per esempio quello del post.

1. `"use client"` in cima con **una riga di commento** che dice perché: il form
   ha stato ed event handler, non può essere un server component.
2. Stato: i valori (da `initialValues?: Partial<PostInput>`, così lo stesso form
   serve creazione e modifica), `errors: Record<string, string>`, `submitting`.
3. Ogni campo è un `<Field>` di `@/components/ui/Field` che avvolge un `<Input>`
   di `@/components/ui/Input`, con `error={errors.x}` e `invalid`. **Mai** un
   `<input>` o una `<textarea>` a mano: resterebbero fuori dall'identità visiva.
4. Al submit `event.preventDefault()`, poi `postInputSchema.safeParse(values)`
   dal contratto. **Mai** controlli scritti a mano (niente `if (!title)`).
5. Se fallisce: mappa campo → messaggio da `parsed.error.issues`, chiave
   `String(issue.path[0])`, vince il primo. Mettila in `errors` e fermati: gli
   errori si vedono **dentro il Field del campo**, mai in cima alla pagina.
6. Se passa: `submitting` a `true`, e il `<Button>` va `disabled` finché dura
   (niente doppio invio). Poi `fetch`: `POST` su `API_ROUTES.posts` se non c'è
   un id, `PATCH` su `API_ROUTES.post(id)` se c'è. Mai un URL a mano.
7. Se `!res.ok`, leggi il body come `ApiError`: con `code === "validation_error"`
   metti `error.fields` in `errors` — stessa forma del passo 5, stessi Field;
   altrimenti `error.message`. `submitting` torna `false` sempre, anche se lancia.
8. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Tocca solo il file del form. Se ti accorgi che servirebbe altro, dillo.
