import type { FieldProps } from "@/contracts/blog";

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {label}
      </label>

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
