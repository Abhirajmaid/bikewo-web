import { ABOUT_TIMELINE } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { EnergyArc } from "@/components/brand/EnergyArc";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Dark timeline — Mainboard pathway milestones from investor presentation. */
export function AboutTimeline() {
  return (
    <Section id="timeline" tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="rider-pattern pointer-events-none absolute inset-0 opacity-[0.06] invert"
      />
      <EnergyArc
        className="pointer-events-none absolute inset-x-0 top-0 h-44 w-full opacity-30"
        color="#35D68F"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={ABOUT_TIMELINE.eyebrow}
          tone="dark"
          align="center"
          title={ABOUT_TIMELINE.title}
          lede={ABOUT_TIMELINE.lede}
          className="justify-center"
        />

        <div className="relative mt-16 lg:mt-20">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-5 hidden h-px bg-white/20 lg:block"
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {ABOUT_TIMELINE.milestones.map((item, i) => (
              <Reveal as="li" key={item.date} delay={stagger(i, 0.08)} className="relative">
                <div className="mb-6 flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <span className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-indigo-950 font-mono text-[11px] font-medium text-green-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold tracking-tight text-white lg:mt-6">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-white lg:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60 lg:text-[15px]">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.25} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-white/40">
            {ABOUT_TIMELINE.note}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex justify-center lg:mt-12">
          <Button href={ABOUT_TIMELINE.cta.href} variant="onDark" withArrow>
            {ABOUT_TIMELINE.cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
