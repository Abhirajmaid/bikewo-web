import Link from "next/link";
import { SUBSIDIARIES } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";
import { ArrowRightIcon } from "@/components/brand/Icons";
import { cn, stagger } from "@/lib/utils";

/**
 * 5.5 — Subsidiaries, as premium interactive company cards rather than a row
 * of logos. Every card carries the endorsement, because that is the rule:
 * a subsidiary may hold its own name, but never without "A BikeWo Company".
 */

const ACCENT = {
  green: { bar: "bg-green-500", text: "text-green-700", glow: "bg-green-500/10" },
  cyan: { bar: "bg-cyan", text: "text-cyan-700", glow: "bg-cyan/10" },
  violet: { bar: "bg-violet", text: "text-violet", glow: "bg-violet/10" },
  muted: { bar: "bg-indigo-200", text: "text-slate", glow: "bg-indigo-100" },
} as const;

export function Subsidiaries() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Subsidiaries"
          title="A branded house, with endorsed companies."
          lede="The masterbrand always leads. Sub-brands earn distinction only where they serve a genuinely different customer."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {SUBSIDIARIES.map((sub, i) => {
            const accent = ACCENT[sub.accent];
            const isPlaceholder = sub.accent === "muted";

            return (
              <Reveal key={sub.name} as="li" delay={stagger(i)}>
                <Link
                  href={sub.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-lg border p-7 transition-shadow duration-300 hover:shadow-[0_12px_32px_rgb(36_31_93/0.12)]",
                    isPlaceholder
                      ? "border-dashed border-indigo-200 bg-cloud"
                      : "border-indigo-100 bg-white",
                  )}
                >
                  {/* Accent wash that resolves on hover */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                      accent.glow,
                    )}
                  />
                  <span aria-hidden className={cn("h-1 w-10 rounded-full", accent.bar)} />

                  <h3 className="mt-6 font-display text-xl font-semibold text-indigo-800">
                    {sub.name}
                  </h3>
                  <p className={cn("eyebrow mt-2", accent.text)}>{sub.kind}</p>

                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate">
                    {sub.copy}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {sub.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-[13.5px] text-indigo-800/75"
                      >
                        <span
                          aria-hidden
                          className={cn("size-1.5 shrink-0 rounded-full", accent.bar)}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-center justify-between border-t border-indigo-100 pt-5">
                    {isPlaceholder ? (
                      <span className="eyebrow text-slate">Future ventures</span>
                    ) : (
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
                        <Mark className="h-3 w-auto text-indigo-800" />
                        A BikeWo Company
                      </span>
                    )}
                    <ArrowRightIcon
                      size={18}
                      className="shrink-0 text-indigo-800 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
