"use client";

import { ABOUT_MISSION_VISION } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";
import { stagger } from "@/lib/utils";

/** Mission & vision — modern split composition (Investor Presentation Aug 2026). */
export function AboutMissionVision() {
  const { vision, mission, pillars, cta, title, eyebrow, ribbon } =
    ABOUT_MISSION_VISION;

  return (
    <Section
      id="mission-vision"
      className="relative overflow-hidden bg-indigo-950 py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(42_183_124/0.18),transparent_55%),radial-gradient(ellipse_at_90%_80%,rgb(123_92_214/0.14),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 size-[20rem] -translate-y-1/2 rounded-full border border-green-400/15"
      />

      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-semibold leading-[1.12] text-white">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex items-center gap-3 text-white/50">
            <Mark className="size-8 text-green-400" />
            <span className="font-display text-sm font-medium tracking-wide">
              {ribbon}
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={0.1}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-green-400/30 hover:bg-white/[0.06] sm:p-9">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green-400/60 to-transparent"
              />
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-green-400">
                {vision.label}
              </p>
              <p className="mt-6 font-display text-[clamp(1.35rem,1.1rem+1.2vw,1.85rem)] font-semibold leading-[1.25] tracking-tight text-white">
                {vision.copy}
              </p>
              <p className="mt-auto pt-10 text-sm text-white/45">{vision.tag}</p>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white p-7 sm:p-9">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-800">
                {mission.label}
              </p>
              <p className="mt-6 font-display text-[clamp(1.35rem,1.1rem+1.2vw,1.85rem)] font-semibold leading-[1.25] tracking-tight text-indigo-800">
                {mission.copy}
              </p>
              <p className="mt-auto pt-10 text-sm text-slate">{mission.tag}</p>
            </article>
          </Reveal>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-6">
          {pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.label} delay={0.2 + stagger(i, 0.08)}>
              <div className="flex h-full gap-5 rounded-xl border border-white/10 bg-indigo-900/40 px-6 py-5">
                <span className="font-mono text-sm font-medium text-green-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {pillar.label}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                    {pillar.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.28} className="mt-12 flex flex-wrap items-center gap-4 lg:mt-14">
          <Button href={cta.href} variant="onDark" withArrow>
            {cta.label}
          </Button>
          <p className="text-sm text-white/45">
            Logistics is our core. EMI is our differentiator.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
