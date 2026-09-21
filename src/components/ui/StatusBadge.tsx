import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

const STATUS_STYLES: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Bozza",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  published: {
    label: "Pubblicato",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}
