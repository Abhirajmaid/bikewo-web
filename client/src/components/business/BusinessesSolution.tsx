import { BUSINESSES_SOLUTION } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Three-step solution model + intended customer outcomes. */
export function BusinessesSolution() {
  return (
    <Section id="solution" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={BUSINESSES_SOLUTION.eyebrow}
          title={BUSINESSES_SOLUTION.title}
          lede={BUSINESSES_SOLUTION.lede}
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
          {BUSINESSES_SOLUTION.steps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={stagger(i, 0.08)}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-cloud p-6 sm:p-7">
                <span className="font-mono text-sm text-green-700">{step.index}</span>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-indigo-800">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">
                  {step.copy}
                </p>
                <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-400">
                  {step.tag}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
          {BUSINESSES_SOLUTION.outcomes.map((outcome) => (
            <span
              key={outcome}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-800"
            >
              <span aria-hidden className="text-green-600">
                ✓
              </span>
              {outcome}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.24} className="mt-10 rounded-xl bg-indigo-950 px-6 py-6 sm:px-8">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-400">
            The core gap
          </p>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-white/80">
            {BUSINESSES_SOLUTION.gap}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
