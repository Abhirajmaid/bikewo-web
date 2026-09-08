import { ABOUT_IMPACT } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Impact stats, narrative split and partner strip. */
export function AboutImpact() {
  return (
    <Section tone="cloud">
      <Container>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          {ABOUT_IMPACT.stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={stagger(i)}>
              <p className="font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-bold leading-none tracking-tight text-indigo-800">
                {stat.value}
              </p>
              <p className="mt-4 font-display text-[15px] font-semibold text-indigo-800">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
              {ABOUT_IMPACT.heading}
            </h2>
            <Button href={ABOUT_IMPACT.cta.href} withArrow className="mt-8">
              {ABOUT_IMPACT.cta.label}
            </Button>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5">
              {ABOUT_IMPACT.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[1.0625rem] leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 border-t border-indigo-200 pt-12 lg:mt-20">
          <p className="eyebrow text-center text-slate">Trusted across the ecosystem</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {ABOUT_IMPACT.partners.map((name) => (
              <li
                key={name}
                className="font-display text-sm font-semibold tracking-wide text-indigo-800/40 uppercase"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
