// TODO(backoffice/editor): il form non è ancora implementato.
// Deve validare con postInputSchema e mostrare gli errori dentro Field.

export default function NewPostPlaceholder() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8">
      <h1 className="text-xl font-semibold">Il form non è ancora implementato</h1>
      <p className="mt-2 text-slate-600">
        Deve validare con <code>postInputSchema</code> e mostrare ogni errore sotto al
        campo giusto. Ecco cosa risponde l&apos;API a un input non valido:
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100">
{`curl -s -X POST localhost:3000/api/posts \\
  -H 'content-type: application/json' \\
  -d '{"title":"ab","excerpt":"","content":"x","author":"io","status":"draft"}'`}
      </pre>
      <p className="mt-4 text-sm text-slate-500">
        Dentro <code>error.fields</code> c&apos;è la mappa campo → messaggio.
      </p>
    </div>
  );
}
