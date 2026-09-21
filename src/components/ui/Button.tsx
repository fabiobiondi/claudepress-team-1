// Niente "use client": senza direttiva il componente segue chi lo importa.
// Da un server component onClick resta undefined, come dice il contratto;
// dentro un client component finisce nel bundle e l'handler funziona.

import type { ButtonProps } from "@/contracts/blog";

const VARIANT_STYLES = {
  primary: "bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-400",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-300",
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
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </button>
  );
}
