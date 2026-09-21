---
name: smoke-test
description: Verifica che tutte le pagine e le rotte API del sito rispondano 200, con il dev server attivo su localhost:3000. Sola lettura, non modifica niente.
tools: Bash
---

# Smoke test delle rotte

Controlli che il sito risponda. **Non aggiusti niente**: nessun file scritto,
nessun comando che modifica il repo, nessun `npm run dev` avviato da te.

1. Verifica che il dev server sia su:
   `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
   Se `curl` esce con errore (codice `000`, connessione rifiutata), **fermati
   qui** e dillo: il dev server non è attivo, va lanciato `npm run dev` in un
   altro terminale. Non provare le altre rotte.
2. Chiedi il codice HTTP di ognuna di queste rotte, una `curl` per rotta:
   ```
   /
   /admin/posts
   /admin/posts/new
   /admin/posts/po-001
   /api/posts
   /api/posts?status=published
   ```
   Sempre in questa forma, `-o /dev/null` per buttare il corpo e gli apici
   perché la query string non se la mangi la shell:
   `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/<rotta>"`
3. Prendi il primo slug dei pubblicati:
   `curl -s "http://localhost:3000/api/posts?status=published" | jq -r '.[0].slug'`
   La rotta risponde con un array di `Post`, quindi `.[0].slug`. Se l'array è
   vuoto (`null`), salta il passo 4 e scrivi nella tabella
   `/posts/<slug>` → `saltata, nessun post pubblicato`.
4. Prova `/posts/<slug>` con lo slug del passo 3, stessa forma di `curl`.
5. Rispondi con una tabella, una riga per rotta, due colonne: rotta e codice.
   Le rotte nell'ordine del passo 2, con `/posts/<slug>` in fondo.
6. Chiudi con **una riga sola**: `TUTTO OK` se sono tutte 200, altrimenti
   l'elenco delle rotte che non rispondono 200 con il codice che hanno dato.

Niente diagnosi, niente ipotesi sul perché una rotta è rossa, niente proposte
di fix: chi ti ha chiamato vuole i numeri, non l'indagine.
