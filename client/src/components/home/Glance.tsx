import { GLANCE } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** 5.2 — BikeWo at a Glance. */
export function Glance() {
  return (
    <Section className="border-b border-indigo-100 py-16 md:py-20 lg:py-24">
      <Container>
        <Reveal>
          <Eyebrow>BikeWo at a glance</Eyebrow>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {GLANCE.map((stat, i) => (
            <Reveal key={stat.label} delay={stagger(i)}>
              <div className="border-t-2 border-green-500 pt-5">
                <dd className="font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-bold leading-none tracking-tight text-indigo-800">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="eyebrow mt-3 text-slate">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
