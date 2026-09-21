import type { FieldProps } from "@/contracts/blog";

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-sans text-sm font-medium text-ink-soft">
        {label}
      </label>

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="font-sans text-sm text-alarm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
