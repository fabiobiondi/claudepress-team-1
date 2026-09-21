// Niente "use client": senza direttiva il componente segue chi lo importa.
// Da un server component onClick resta undefined, come dice il contratto;
// dentro un client component finisce nel bundle e l'handler funziona.

import type { ButtonProps } from "@/contracts/blog";

const VARIANT_STYLES = {
  primary: "bg-ink text-paper hover:bg-ink-soft",
  secondary: "border border-rule bg-sheet text-ink hover:border-ink",
  danger: "bg-alarm text-paper hover:bg-alarm/90",
} as const;

export function Button({
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-sm px-4 py-2 font-sans text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </button>
  );
}
