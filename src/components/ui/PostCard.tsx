import Link from "next/link";

import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="grid gap-x-8 gap-y-1 border-b border-rule py-8 sm:grid-cols-[7rem_1fr]">
      <time
        dateTime={date}
        className="font-sans text-sm leading-6 text-ink-faint sm:text-right"
      >
        {dateFormatter.format(new Date(date))}
      </time>

      <div className="max-w-[60ch]">
        <h2 className="font-serif text-2xl leading-snug font-semibold">
          <Link
            href={href}
            className="decoration-rule decoration-2 underline-offset-4 hover:underline"
          >
            {title}
          </Link>
        </h2>

        {excerpt ? (
          <p className="mt-2 font-serif text-lg leading-relaxed text-ink-soft">
            {excerpt}
          </p>
        ) : null}

        <p className="mt-3 font-sans text-sm text-ink-faint">{author}</p>
      </div>
    </article>
  );
}
