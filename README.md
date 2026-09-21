# ClaudePress

Blog con backoffice editoriale. Next.js 16 (App Router), TypeScript, Tailwind 4.

```bash
npm install
npm run dev      # http://localhost:3000
```

| | |
|---|---|
| `/` | il blog: elenco dei post pubblicati |
| `/posts/[slug]` | la pagina di un post |
| `/admin/posts` | il backoffice: tutti i post, bozze comprese |

## Come è fatto

Niente database: i dati stanno in memoria e partono da `src/data/posts.seed.json`.
Un riavvio del dev server riporta tutto allo stato iniziale.

`src/contracts/blog.ts` è il contratto condiviso: tipi, schemi zod, rotte API e
firme dei componenti. Lo importano sia il sito sia il backoffice.

## API

| | |
|---|---|
| `GET /api/posts` | tutti i post, dal più recente |
| `GET /api/posts?status=published` | solo i pubblicati |
| `POST /api/posts` | crea, 201 |
| `GET /api/posts/:id` | uno, 404 se non c'è |
| `GET /api/posts/by-slug/:slug` | uno per slug |
| `PATCH /api/posts/:id` | modifica |
| `DELETE /api/posts/:id` | elimina, 204 |

Gli errori hanno tutti la forma `ApiError` del contratto, 404 compresi.

```bash
npm run check    # typecheck + lint
npm run build
```
