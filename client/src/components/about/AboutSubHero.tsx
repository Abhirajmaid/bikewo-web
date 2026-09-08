import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { EnergyArc } from "@/components/brand/EnergyArc";
import { Reveal } from "@/components/ui/Reveal";

/** Shared dark hero for About sub-pages. */
export function AboutSubHero({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-indigo-950 pb-16 pt-32 md:pb-20 md:pt-40">
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
          <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-2 text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/about" className="transition-colors hover:text-white">
              About BikeWo
            </Link>
            <span aria-hidden>/</span>
            <span className="text-green-400">{title}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-7 max-w-3xl font-display text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {title}
          </h1>
        </Reveal>

        {blurb && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/60">
              {blurb}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
