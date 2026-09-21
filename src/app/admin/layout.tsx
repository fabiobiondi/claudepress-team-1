export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-6 text-xs font-medium uppercase tracking-wider text-slate-500">
        Backoffice
      </p>
      {children}
    </section>
  );
}
