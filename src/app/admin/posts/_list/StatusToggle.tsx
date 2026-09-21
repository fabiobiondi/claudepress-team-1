"use client";
// "use client": il cambio di stato parte da un click e aggiorna la lista dopo
// la risposta dell'API — servono event handler e stato.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, type PostStatus } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

type StatusToggleProps = {
  id: string;
  status: PostStatus;
  /** Solo per l'etichetta accessibile: in tabella il verbo da solo è ambiguo. */
  title: string;
};

const NEXT_STATUS: Record<PostStatus, { status: PostStatus; label: string }> = {
  draft: { status: "published", label: "Pubblica" },
  published: { status: "draft", label: "Riporta in bozza" },
};

export function StatusToggle({ id, status, title }: StatusToggleProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, startTransition] = useTransition();
  const [hasFailed, setHasFailed] = useState(false);

  const next = NEXT_STATUS[status];

  async function handleToggle() {
    setIsSaving(true);
    setHasFailed(false);

    // Solo il campo cambiato: postPatchSchema accetta un input parziale.
    const response = await fetch(API_ROUTES.post(id), {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next.status }),
    });

    if (!response.ok) {
      setHasFailed(true);
      setIsSaving(false);
      return;
    }

    startTransition(() => router.refresh());
    setIsSaving(false);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="secondary" disabled={isSaving || isRefreshing} onClick={handleToggle}>
        {next.label}
        <span className="sr-only"> il post {title}</span>
      </Button>
      {hasFailed ? (
        <p role="status" className="text-sm text-alarm">
          Lo stato non è cambiato. Riprova.
        </p>
      ) : null}
    </div>
  );
}
