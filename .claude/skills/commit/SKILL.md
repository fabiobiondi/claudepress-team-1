---
name: commit
description: Lancia check, lint o test del progetto e si ferma se falliscono, poi scrive il messaggio di commit leggendo il diff e committa. Usala quando hai finito un pezzo di lavoro e vuoi salvarlo. Trigger:committa, fai un commit, salva il lavoro, commit di questo, scrivi il messaggio di commit.
allowed-tools: Read, Grep, Bash(git:*), Bash(npm run:*)
---

# Un commit fatto bene

Funziona in qualunque repo: non sa niente del progetto, lo scopre.

## Passo 1 — check, lint e test passano?

Guarda gli script in `package.json` e lancia il primo che trovi fra `check`,
`lint` e `test`. Se non ce n'è nessuno, salta questo passo e dillo.

**Se falliscono ti fermi qui.** Non committare, non "sistemare al volo": riporta
l'errore così com'è e lascia decidere a chi ha scritto il codice.

## Passo 2 — guarda cosa è cambiato

```bash
git status --short
git diff
```

Se ci sono modifiche già in staging, lavora su quelle e non aggiungere il
resto: qualcuno le ha messe lì apposta.

## Passo 3 — il messaggio

Una riga sola, in inglese, in formato conventional commit:

```
feat: add Divider component to the library
```

I prefissi: `feat:` per una funzionalità, `fix:` per un bug, `docs:`,
`refactor:`, `test:`, `chore:`.

Il messaggio dice **cosa cambia per chi usa il progetto**, non quali file hai
toccato: quelli si vedono dal diff.

Se il diff contiene due cose scollegate, **dillo e proponi due commit**, invece
di scrivere un messaggio con dentro una "e".

## Cosa non fare

- Non usare `git add -A` senza aver guardato `git status`: ci finiscono file
  che non c'entrano.
- Non committare se il passo 1 fallisce.
- Non aggiungere in coda al messaggio note su chi l'ha scritto, se il repo non
  lo fa già di suo.

## Output

Il messaggio che hai usato e l'esito di `git status --short` dopo il commit.
Se ti sei fermato al passo 1, l'errore così com'è e nient'altro.
