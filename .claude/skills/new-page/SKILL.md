---
name: new-page
description: Crea una pagina del sito pubblico che carica i dati dalle rotte API del contratto. Trigger: nuova pagina, crea la home, la pagina del post.
---

# Nuova pagina del sito pubblico

Ricevi la pagina da creare, per esempio la home o la pagina di un post.

1. Apri `src/contracts/blog.ts`: la rotta in `API_ROUTES`, il path in `ROUTES`,
   il tipo `Post`. **Se la rotta non c'è, fermati e dillo**: il contratto non
   si modifica.
2. Crea `src/app/<segmento>/page.tsx`. Un segmento dinamico riceve
   `params: Promise<{ slug: string }>` e si legge con `await params`.
3. Server component: **niente `"use client"`**, niente `useState`, niente
   `useEffect`. La funzione è `async`.
4. Carica i dati con `await fetch(apiUrl(API_ROUTES.x), { cache: "no-store" })`:
   mai un path relativo, mai un URL scritto a mano.
5. Gestisci tutti e tre i casi:
   - **dati presenti**: rendi i componenti di `src/components/ui/`;
   - **elenco vuoto**: `<EmptyState />` con un testo in italiano;
   - **fetch fallita** (`!res.ok`, o eccezione): messaggio d'errore in
     italiano, mai una pagina bianca.
6. Risorsa singola che non esiste (404 dalle API): chiama `notFound()` da
   `next/navigation`. **Non ritornare `null`.**
7. Solo classi Tailwind. Testi visibili in italiano, nomi in inglese.
8. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Tocca **solo** il file della pagina. Se ti accorgi che servirebbe cambiare
altro, dillo invece di farlo.
