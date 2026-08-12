import Image from "next/image";
import { SUSTAINABILITY } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** 5.7 — Sustainability & ESG as a global impact band. */
export function Sustainability() {
  return (
    <Section className="relative overflow-hidden bg-[#063024] pb-0 pt-16 text-white md:pb-0 md:pt-20 lg:pb-0 lg:pt-24">
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Reveal>
            <Eyebrow tone="dark" className="text-[#063024]">
              {SUSTAINABILITY.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05} className="max-w-3xl lg:pt-1">
            <p className="text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-semibold leading-snug tracking-tight text-white">
              {SUSTAINABILITY.title}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-0 lg:mt-20">
          {SUSTAINABILITY.metrics.map((metric, i) => (
            <Reveal
              as="li"
              key={metric.label}
              delay={stagger(i, 0.08)}
              className="md:border-white/15 md:px-10 md:first:pl-0 md:last:pr-0 md:not-first:border-l"
            >
              <p className="text-[13px] text-white/60">{metric.label}</p>
              <p className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-bold leading-none tracking-tight text-white">
                {metric.value}
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-white/55">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Reveal delay={0.15} className="relative mt-14 w-full md:mt-16 lg:mt-20">
        <Image
          src={SUSTAINABILITY.map.src}
          alt={SUSTAINABILITY.map.alt}
          width={2000}
          height={900}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </Reveal>
    </Section>
  );
}
