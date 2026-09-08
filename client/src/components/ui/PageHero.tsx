import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { EnergyArc } from "@/components/brand/EnergyArc";
import { Reveal } from "@/components/ui/Reveal";

type Crumb = {
  label: string;
  href?: string;
};

/** Shared dark page header — breadcrumb, title, optional lede. */
export function PageHero({
  crumbs,
  title,
  lede,
  children,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-indigo-950 pb-20 pt-36 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="rider-pattern pointer-events-none absolute inset-0 opacity-[0.06] invert"
      />
      <EnergyArc
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full opacity-40"
        color="#35D68F"
      />

      <Container className="relative">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="eyebrow flex flex-wrap items-center gap-2 text-white/60"
          >
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-green-400" : undefined}>{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-7 max-w-3xl font-display text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/60">
              {lede}
            </p>
          </Reveal>
        )}

        {children}
      </Container>
    </section>
  );
}
