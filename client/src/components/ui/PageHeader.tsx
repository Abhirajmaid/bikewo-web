import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  href?: string;
};

/**
 * Shared light page header — breadcrumb, optional eyebrow, title, optional lede.
 * Matches About / Media / Businesses intro rhythm.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={className}>
      <Reveal>
        <nav
          aria-label="Breadcrumb"
          className={cn(
            "eyebrow flex flex-wrap items-center gap-2 text-slate",
            centered && "justify-center",
          )}
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-indigo-800"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-green-700" : undefined}>
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </Reveal>

      {eyebrow && (
        <Reveal delay={0.04} className={cn("mt-8 md:mt-10", centered && "text-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal delay={eyebrow ? 0.08 : 0.05}>
        <h1
          className={cn(
            "mt-6 max-w-4xl font-display text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-indigo-800",
            centered && "mx-auto text-center",
            !eyebrow && "mt-7",
          )}
        >
          {title}
        </h1>
      </Reveal>

      {lede && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-slate",
              centered && "mx-auto text-center",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
