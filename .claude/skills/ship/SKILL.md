---
name: ship
description: Lancia il check del progetto e si ferma se fallisce, poi committa leggendo il diff e pusha sul branch corrente. Usala quando un pezzo è finito e deve arrivare agli altri. Trigger:manda su, pusha il lavoro, chiudi il pezzo.
allowed-tools: Read, Grep, Bash(git:*), Bash(npm run:*)
---

# Dal locale al remoto, in un colpo

1. **`npm run check`.** Se fallisce **ti fermi qui**: riporta l'errore così
   com'è, non committare e non sistemare al volo.
2. **Guarda cosa è cambiato**, con `git status --short` e `git diff`. Se c'è
   già qualcosa in staging lavora su quello e non aggiungere il resto:
   qualcuno ce l'ha messo apposta.
3. **Scrivi il messaggio leggendo il diff**: una riga, in inglese, conventional
   commit (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`). Dice cosa
   cambia per chi usa il progetto, non quali file hai toccato. Se il diff
   contiene due cose scollegate, dillo e proponi due commit invece di una "e".
4. **Committa.** Mai `git add -A` senza aver guardato `git status`. Niente note
   in coda su chi ha scritto il messaggio, se il repo non lo fa già di suo.
5. **Pusha sul branch corrente**, quello di `git branch --show-current`, con
   `git push` — o `git push -u origin <branch>` se non ha ancora un upstream.
6. **Se il push viene rifiutato non forzare.** Niente `--force`, niente
   `--force-with-lease`, nessun pull o rebase per sbloccarlo: riporta l'errore
   così com'è e fermati.

## Output

Il messaggio di commit che hai usato e il branch su cui hai pushato.
Se ti sei fermato al passo 1 o al 6, l'errore così com'è e nient'altro.
