---
name: new-component
description: Crea un componente condiviso in src/components/ui/ partendo dalla firma dei props dichiarata nel contratto. Trigger: nuovo componente, crea PostCard, mi serve il Button, scrivi StatusBadge, aggiungi il componente.
---

# Nuovo componente condiviso

Ricevi il nome di un componente, per esempio `PostCard`.

1. Apri `src/contracts/blog.ts` e trova il tipo `<Nome>Props`.
   **Se non c'è, fermati e dillo**: il componente non è nel contratto, e il
   contratto non si modifica.
2. Crea `src/components/ui/<Nome>.tsx`.
3. Tipizza le props **con quel tipo**, importato dal contratto:
   `export function PostCard({ ... }: PostCardProps)`.
   Non aggiungere props che il contratto non ha, non toglierne.
4. Server component: **niente `"use client"`**, niente `useState`, niente
   `useEffect`, nessuna fetch, nessuna chiamata alle API.
5. Solo classi Tailwind. Nessuna libreria nuova, nessun file CSS.
6. I testi visibili all'utente in **italiano**; nomi di variabili e file in
   inglese.
7. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Tocca **solo** il file del componente. Se ti accorgi che servirebbe cambiare
altro, dillo invece di farlo.
