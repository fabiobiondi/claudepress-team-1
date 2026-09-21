/** Titolo → slug. "Il mio primo post!" → "il-mio-primo-post" */
export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Aggiunge -2, -3, … se lo slug è già preso. */
export function uniqueSlug(title: string, taken: string[]): string {
  const base = slugify(title) || "post";
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
