"use client";
// Client component: il contratto impone onChange, e un event handler non può
// vivere in un server component.

import type { InputProps } from "@/contracts/blog";

export function Input({
  id,
  name,
  value,
  onChange,
  multiline,
  placeholder,
  invalid,
}: InputProps) {
  const className = [
    "block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2",
    invalid
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-slate-300 focus:border-slate-400 focus:ring-slate-200",
    multiline ? "min-h-40 resize-y leading-relaxed" : "",
  ].join(" ");

  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={className}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={className}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
