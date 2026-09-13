import { ABOUT_SOLUTION } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Problem framing + BikeWo operating model. */
export function AboutSolution() {
  const { model } = ABOUT_SOLUTION;

  return (
    <Section id="solution" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_SOLUTION.eyebrow}
          title={ABOUT_SOLUTION.title}
          lede={ABOUT_SOLUTION.lede}
        />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {ABOUT_SOLUTION.problems.map((group, gi) => (
            <Reveal key={group.group} delay={stagger(gi, 0.08)}>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                {group.group}
              </p>
              <ul className="mt-5 space-y-5">
                {group.items.map((item) => (
                  <li key={item.index} className="flex gap-4">
                    <span className="font-mono text-sm text-indigo-300">
                      {item.index}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-indigo-800">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
                        {item.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-12 rounded-xl bg-indigo-950 px-6 py-6 sm:px-8 sm:py-7">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-400">
            The core gap
          </p>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-white/80">
            {ABOUT_SOLUTION.gap}
          </p>
        </Reveal>

        <div className="mt-16 lg:mt-20">
          <Reveal>
            <p className="eyebrow text-indigo-800">{model.title}</p>
            <h3 className="mt-4 max-w-2xl font-display text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] font-semibold leading-tight text-indigo-800">
              {model.lede}
            </h3>
          </Reveal>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {model.steps.map((step, i) => (
              <Reveal as="li" key={step.index} delay={stagger(i, 0.08)}>
                <article className="relative h-full overflow-hidden rounded-xl bg-cloud p-6">
                  <span className="font-mono text-sm text-green-700">{step.index}</span>
                  <h4 className="mt-4 font-display text-lg font-semibold text-indigo-800">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate">
                    {step.copy}
                  </p>
                  <p className="mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-400">
                    {step.tag}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
            {model.outcomes.map((outcome) => (
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
        </div>
      </Container>
    </Section>
  );
}
