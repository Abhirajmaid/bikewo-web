import Image from "next/image";
import { BUSINESSES_HERO } from "@/lib/businesses";
import { EnergyFlowLines } from "@/components/brand/EnergyFlowLines";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

/** Businesses page header — shared intro + image, pillars and CTAs. */
export function BusinessesHero() {
  return (
    <Section className="relative overflow-hidden border-b border-indigo-100 pt-32 pb-20 md:pt-40 md:pb-28 lg:pb-32">
      <EnergyFlowLines className="bottom-auto h-112 md:h-136 lg:h-144 mask-[linear-gradient(to_bottom,black_62%,transparent)]" />
      <Container className="relative">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Businesses" },
          ]}
          eyebrow={BUSINESSES_HERO.eyebrow}
          title={BUSINESSES_HERO.title}
          lede={BUSINESSES_HERO.lede}
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={BUSINESSES_HERO.image.src}
                alt={BUSINESSES_HERO.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-indigo-950/80 via-indigo-950/20 to-transparent"
              />
              <p className="absolute bottom-0 left-0 max-w-md p-6 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug text-white md:p-8">
                {BUSINESSES_HERO.image.overlay}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-8 rounded-lg bg-green-50 p-8 md:p-10">
              {BUSINESSES_HERO.pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">
                      <Icon size={40} />
                    </div>
                    <div>
                      <h2 className="font-display text-base font-semibold text-indigo-800">
                        {pillar.title}
                      </h2>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
                        {pillar.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 md:mt-12">
          {BUSINESSES_HERO.ctas.map((cta, i) => (
            <Reveal key={cta.href} delay={0.12 + i * 0.04}>
              <Button
                href={cta.href}
                variant={i === 0 ? "primary" : "ghost"}
                withArrow={i === 0}
              >
                {cta.label}
              </Button>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
