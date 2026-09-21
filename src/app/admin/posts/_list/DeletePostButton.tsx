"use client";
// "use client": l'eliminazione parte da un click e aggiorna la lista dopo la
// risposta dell'API — servono event handler e stato.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

type DeletePostButtonProps = {
  id: string;
  /** Solo per l'etichetta accessibile: in tabella "Elimina" da solo è ambiguo. */
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, startTransition] = useTransition();
  const [hasFailed, setHasFailed] = useState(false);

  // Niente conferma: è una decisione di progetto.
  async function handleDelete() {
    setIsDeleting(true);
    setHasFailed(false);

    const response = await fetch(API_ROUTES.post(id), { method: "DELETE" });

    if (!response.ok) {
      setHasFailed(true);
      setIsDeleting(false);
      return;
    }

    startTransition(() => router.refresh());
    setIsDeleting(false);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="danger" disabled={isDeleting || isRefreshing} onClick={handleDelete}>
        Elimina<span className="sr-only"> il post {title}</span>
      </Button>
      {hasFailed ? (
        <p role="status" className="text-sm text-alarm">
          Il post non è stato eliminato. Riprova.
        </p>
      ) : null}
    </div>
  );
}
