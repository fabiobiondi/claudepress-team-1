// TODO(sito): la home non è ancora implementata.
// Deve elencare i post pubblicati usando API_ROUTES.publishedPosts.

export default function HomePlaceholder() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8">
      <h1 className="text-xl font-semibold">La home non è ancora implementata</h1>
      <p className="mt-2 text-slate-600">
        Deve elencare i post pubblicati, dal più recente. Le API funzionano già:
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-slate-900 p-4 text-sm text-slate-100">
curl -s &quot;localhost:3000/api/posts?status=published&quot;
      </pre>
    </div>
  );
}
