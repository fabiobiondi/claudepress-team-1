# ClaudePress — istruzioni per Claude

Blog con backoffice editoriale. Next.js 16 (App Router), TypeScript, Tailwind 4.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Architettura

Non c'è un database. I dati vivono in memoria (`src/server/store.ts`) e partono
da un seed JSON: il processo Next è l'unica sorgente di verità, e un riavvio
riporta tutto allo stato iniziale. È una scelta, non una mancanza — non
introdurre un DB.

```
src/contracts/     tipi, schemi zod, rotte, firme dei componenti
src/server/        store in memoria, slug, helper HTTP
src/data/          seed JSON
src/app/api/       route handler
src/app/           sito pubblico
src/app/admin/     backoffice
src/components/ui/ componenti condivisi fra sito e backoffice
```

Prima di creare un file nuovo, controlla se esiste già il posto giusto.

## Il contratto

`src/contracts/blog.ts` è importato da ogni parte del progetto: tipi, schemi di
validazione, rotte API e firme dei componenti condivisi.

**Non modificarlo senza chiedere.** Cambiare un nome lì dentro rompe codice che
non stai guardando. Se ti serve qualcosa che non c'è, dillo invece di
aggiungerlo di tua iniziativa.

Stessa cosa per `src/components/ui/` e `src/app/layout.tsx`: sono condivisi fra
sito e backoffice, si usano e non si modificano di passaggio.

## Convenzioni

- **Import**: sempre alias `@/`, mai path relativi che risalgono (`../../`).
- **URL delle API**: sempre da `API_ROUTES` del contratto, mai scritti a mano.
  Nelle pagine server la fetch usa `apiUrl(API_ROUTES.x)`: un path relativo
  in un server component fallisce con "Failed to parse URL".
- **Fetch nelle pagine**: sempre `cache: "no-store"`. Senza, un post appena
  creato non compare e sembra un bug delle API.
- **Server component di default.** `"use client"` solo se servono davvero stato,
  effetti o event handler, e con una riga di commento che dice perché.
- **Componenti UI**: ricevono props e rendono markup. Nessuna fetch, nessuna
  logica di dominio dentro.
- **Validazione**: sempre con gli schemi zod del contratto, mai con controlli
  scritti a mano. Gli errori delle API hanno la forma `ApiError`, sempre, anche
  i 404.
- **Niente `any`.** Se non sai tipizzare qualcosa, dillo invece di zittire il
  compilatore. Nessun `@ts-ignore` e nessun `eslint-disable` senza chiedere.
- **Italiano** per i testi visibili all'utente, **inglese** per nomi di
  variabili, funzioni e file.

## Aree di proprietà

Il repo è diviso in aree, e ognuna ha un responsabile. Tocca solo l'area su cui
stai lavorando: se ti serve un file di un'altra, fermati e segnalalo.

<!-- TODO: scrivere il responsabile di ogni area prima di cominciare. -->

| Area | Responsabile | File |
|---|---|---|
| Condivisa | tutti | `src/contracts/**` · `src/components/ui/**` · `src/app/layout.tsx` · `src/app/globals.css` · `CLAUDE.md` |
| Sito pubblico | **TODO** | `src/app/page.tsx` · `src/app/posts/**` · nuove rotte pubbliche (`src/app/<nuova>/**`) |
| Backoffice, elenco | **TODO** | `src/app/admin/page.tsx` · `src/app/admin/posts/page.tsx` · `src/app/admin/posts/_list/**` |
| Backoffice, editor | **TODO** | `src/app/admin/posts/new/**` · `src/app/admin/posts/[id]/**` · `src/app/admin/_components/**` |
| Piattaforma | nessuno: non si tocca | `src/app/api/**` · `src/server/**` · `src/data/**` |

L'area **condivisa** si discute finché il progetto è in piedi da poco. Una volta
che le altre aree hanno cominciato a importarla, è congelata.

## Comandi

```bash
npm run dev          # dev server su :3000
npm run check        # typecheck + lint  ← esegui SEMPRE prima di committare
npm run build        # build di produzione
```

`npm run check` deve passare prima di ogni commit. Se non passa, non committare.
Commit piccoli, messaggi in inglese in formato conventional commit.

## Cosa non fare

- Non aggiungere dipendenze senza chiedere.
- Non introdurre un database.
- Non riformattare file che non stai modificando.

## Decisioni di progetto

<!-- TODO: tre scelte aperte. Decidetele prima di scrivere codice, perché
     toccano più di un'area. Sostituite "da decidere" con la risposta. -->

- **formato di `content`**: da decidere — testo semplice o markdown
- **ordinamento in `/admin/posts`**: da decidere — data di modifica o titolo
- **conferma prima di cancellare**: da decidere — sì o no

## Skill di design

<!-- TODO: il nome della skill usata per i componenti condivisi, così chi
     arriva dopo sa con cosa sono stati fatti e non ne usa un'altra. -->

- **nome**: da compilare

## Regole aggiunte dal team

<!-- TODO: si riempie strada facendo, non adesso.

     Ci va quello che hai dovuto spiegare a Claude due volte. Una regola
     scritta prima di sbagliare è un'opinione; scritta dopo un problema vero è
     una regola, e si riconosce perché dice anche cosa succede se la ignori.

     Esempio della forma giusta:
       Le pagine del sito fanno fetch con cache "no-store". Senza, un post
       appena creato non compare in home e sembra un bug delle API.

     Esempio della forma inutile:
       Attenzione alla cache. -->
