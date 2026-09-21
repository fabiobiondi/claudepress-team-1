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
    "block w-full rounded-sm border bg-sheet px-3 py-2 text-ink",
    "placeholder:text-ink-faint focus:outline-none focus:ring-2",
    invalid
      ? "border-alarm focus:border-alarm focus:ring-alarm/20"
      : "border-rule focus:border-ink focus:ring-ink/15",
    // Il testo lungo si scrive nella faccia in cui verrà letto.
    multiline
      ? "min-h-56 resize-y font-serif text-lg leading-relaxed"
      : "font-sans text-sm",
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
