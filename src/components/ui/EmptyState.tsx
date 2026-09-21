import type { EmptyStateProps } from "@/contracts/blog";

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border-t-2 border-ink py-10">
      <p className="font-serif text-xl">{title}</p>
      {description ? (
        <p className="mt-2 max-w-[52ch] text-ink-soft">{description}</p>
      ) : null}
    </div>
  );
}
