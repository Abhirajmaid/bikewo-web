import Image from "next/image";
import { GLANCE } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** 5.2 — BikeWo at a Glance. */
export function Glance() {
  return (
    <Section className="border-b border-indigo-100">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-lg sm:aspect-4/3 lg:aspect-square">
              <Image
                src={GLANCE.image.src}
                alt={GLANCE.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{GLANCE.badge}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-[1.35] tracking-tight">
                <span className="text-indigo-800">{GLANCE.lead} </span>
                <span className="font-medium text-slate">{GLANCE.rest}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Button href={GLANCE.cta.href} variant="ghost" className="mt-8">
                {GLANCE.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-10">
          {GLANCE.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={stagger(i)}>
              <div>
                <dd className="font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-bold leading-none tracking-tight text-indigo-800">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-4 font-display text-[15px] font-semibold text-indigo-800">
                  {stat.label}
                </dt>
                <p className="mt-2 text-[14px] leading-relaxed text-slate">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
