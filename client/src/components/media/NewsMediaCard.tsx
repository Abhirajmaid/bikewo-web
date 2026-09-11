"use client";

import Image from "next/image";
import { ArrowRightIcon, FileTextIcon } from "@/components/brand/Icons";
import type { NewsMediaItem } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Investor-style document card used on the public media page and CMS preview. */
export function NewsMediaCard({
  item,
  variant = "grid",
  onOpen,
  className,
}: {
  item: Pick<NewsMediaItem, "title" | "excerpt" | "typeLabel" | "date" | "image">;
  variant?: "featured" | "grid";
  onOpen?: () => void;
  className?: string;
}) {
  const featured = variant === "featured";
  const classNames = cn(
    "group flex h-full w-full flex-col overflow-hidden rounded-lg border border-indigo-100 bg-white text-left transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
    onOpen && "hover:shadow-lift",
    className,
  );

  const body = (
    <>
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10]" : "aspect-[16/9]",
        )}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover"
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          />
        ) : (
          <div className="absolute inset-0 bg-indigo-950">
            <div aria-hidden className="rider-pattern absolute inset-0 opacity-[0.08] invert" />
            <FileTextIcon
              size={featured ? 56 : 40}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80"
            />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 font-display text-[11px] font-semibold text-indigo-800">
          {item.typeLabel}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-6 md:p-7" : "p-5")}>
        <h3
          className={cn(
            "font-display font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700",
            featured ? "text-[clamp(1.25rem,1rem+0.8vw,1.5rem)]" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 line-clamp-3 text-slate",
            featured ? "text-[15px] leading-relaxed" : "text-sm leading-relaxed",
          )}
        >
          {item.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-indigo-100 pt-4">
          <time dateTime={item.date} className="text-[13px] text-slate">
            {DATE_FORMAT.format(new Date(item.date))}
          </time>
          <span className="inline-flex h-10 items-center gap-2 rounded-full bg-green-500 px-4 font-display text-[13px] font-semibold text-indigo-800">
            View PDF
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={classNames}>
        {body}
      </button>
    );
  }

  return <div className={classNames}>{body}</div>;
}
