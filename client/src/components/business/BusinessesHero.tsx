import Image from "next/image";
import { BUSINESSES_HERO } from "@/lib/businesses";
import { EnergyFlowLines } from "@/components/brand/EnergyFlowLines";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Businesses hero — intro, visual, and three stack pillars. */
export function BusinessesHero() {
  return (
    <Section className="relative overflow-hidden border-b border-indigo-100 pt-32 pb-20 md:pt-40 md:pb-28">
      <EnergyFlowLines className="bottom-auto h-112 mask-[linear-gradient(to_bottom,black_62%,transparent)] md:h-136" />
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

        <div className="mt-12 flex flex-wrap gap-3">
          {BUSINESSES_HERO.ctas.map((cta, i) => (
            <Reveal key={cta.href} delay={stagger(i, 0.04)}>
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

        <Reveal delay={0.08} className="mt-14 lg:mt-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[21/9] lg:min-h-[22rem] lg:aspect-auto">
            <Image
              src={BUSINESSES_HERO.image.src}
              alt={BUSINESSES_HERO.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-indigo-950/85 via-indigo-950/25 to-transparent"
            />
            <p className="absolute bottom-0 left-0 max-w-lg p-6 font-display text-[clamp(1.25rem,1rem+1.2vw,1.85rem)] font-semibold leading-snug text-white md:p-10">
              {BUSINESSES_HERO.image.overlay}
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {BUSINESSES_HERO.pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal as="li" key={pillar.title} delay={0.1 + stagger(i, 0.05)}>
                <article className="flex h-full gap-4 border-t-2 border-green-500 bg-cloud px-5 py-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">
                    <Icon size={28} />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-indigo-800">
                      {pillar.title}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate">
                      {pillar.copy}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
