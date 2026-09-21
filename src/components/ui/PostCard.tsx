import Link from "next/link";

import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h2>

      {excerpt ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{excerpt}</p>
      ) : null}

      <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>di {author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      </p>
    </article>
  );
}
