import Link from "next/link";

import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/contracts/blog";

export default function PostNotFound() {
  return (
    <>
      <EmptyState
        title="Questo post non esiste"
        description="L'indirizzo è sbagliato, oppure il post non è più pubblicato."
      />
      <p className="mt-6 font-sans text-sm">
        <Link href={ROUTES.home} className="text-ink-soft hover:text-ink">
          Tutti gli articoli
        </Link>
      </p>
    </>
  );
}
