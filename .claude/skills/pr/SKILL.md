---
name: pr
description: Porta il lavoro da locale a pull request aperta: controllo, commit, push e PR in draft con una descrizione scritta leggendo il diff. Usala quando vuoi far vedere agli altri quello che hai fatto. Trigger:apri la PR, fai la pull request, pusha e apri la PR, mandiamo in review, apri una draft.
allowed-tools: Read, Grep, Bash(git:*), Bash(gh:*), Bash(npm run:*)
---

# Dal lavoro locale alla PR aperta

Una PR aperta è visibile a tutti. Un branch sul tuo portatile, per gli altri,
non esiste. Quindi si apre **presto**, anche in draft, anche incompleta.

## Passo 1 — check, lint e test passano?

Come nella skill `commit`: lancia il primo script disponibile fra `check`,
`lint` e `test`. **Se fallisce ti fermi.**

## Passo 2 — sei sul branch giusto?

```bash
git branch --show-current
```

Se sei su `main` o `master`, **fermati e chiedi** come chiamare il branch prima
di creare qualsiasi cosa. Non sceglierlo tu.

## Passo 3 — commit e push

Committa quello che manca, con lo stesso criterio della skill `commit`, poi:

```bash
git push -u origin <branch>
```

Se il push viene rifiutato per `non-fast-forward`, non forzare: riferisci e
fermati.

## Passo 4 — la descrizione, leggendo il diff

È la parte che vale. Quattro sezioni, sempre queste:

```markdown
## Cosa fa
Una o due righe. Cosa cambia per chi usa il progetto.

## Come provarla
I passi veri, numerati, che chi rivede può eseguire.

## Decisioni che ho preso
Le scelte non ovvie, e perché. Anche una sola riga.

## Cosa manca / TODO
Quello che non è finito, e i finti lasciati nel codice.
```

L'ultima sezione è la più utile di tutte: dice a chi mergia cosa aspettarsi.
Cercala nel diff con `grep -rn "TODO" <i file cambiati>` e non inventarla.

## Passo 5 — apri

```bash
gh pr create --draft --title "<titolo>" --body "<la descrizione>"
```

Se `gh` non è installato o non è autenticato, dillo e stampa la descrizione a
schermo, così si può incollare a mano.

## Cosa non fare

- Non aprire la PR se il passo 1 fallisce.
- Non usare `--fill`: prende i messaggi di commit e salta le quattro sezioni,
  che sono il motivo per cui esiste questa skill.
- Non togliere il draft: lo fa una persona, con `gh pr ready`, quando decide.

## Output

L'URL della PR, e sotto le quattro sezioni così come le hai scritte.
