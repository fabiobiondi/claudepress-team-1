import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

/**
 * Il pallino è la distinzione che regge il prodotto: pieno se il testo è
 * fuori nel mondo, vuoto se è ancora sulla scrivania.
 */
const STATUS_STYLES: Record<
  PostStatus,
  { label: string; dot: string; text: string }
> = {
  draft: {
    label: "Bozza",
    dot: "border-2 border-pending",
    text: "text-pending",
  },
  published: {
    label: "Pubblicato",
    dot: "border-2 border-live bg-live",
    text: "text-live",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dot, text } = STATUS_STYLES[status];

  return (
    <span className={`inline-flex items-center gap-2 font-sans text-sm ${text}`}>
      <span aria-hidden="true" className={`size-2.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
