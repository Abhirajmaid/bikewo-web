import { ABOUT_STRATEGY } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Upstream core + downstream diversification strategy. */
export function AboutStrategy() {
  const { upstream, downstream, operatingModel } = ABOUT_STRATEGY;

  return (
    <Section id="strategy" tone="cloud" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_STRATEGY.eyebrow}
          title={ABOUT_STRATEGY.title}
          lede={ABOUT_STRATEGY.lede}
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col bg-indigo-950 p-7 text-white sm:p-9">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-400">
                {upstream.label}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                {upstream.title}
              </h3>
              <ul className="mt-8 flex-1 space-y-3">
                {upstream.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 pb-3 text-[15px] leading-relaxed text-white/70 last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {upstream.flow.map((step) => (
                  <span
                    key={step}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="flex h-full flex-col bg-white p-7 shadow-card sm:p-9">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                {downstream.label}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-indigo-800">
                {downstream.title}
              </h3>
              <ul className="mt-8 flex-1 space-y-3">
                {downstream.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-indigo-100 pb-3 text-[15px] leading-relaxed text-slate last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="mt-10 lg:mt-12">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-400">
            {operatingModel.title}
          </p>
          <ol className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            {operatingModel.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center rounded-full bg-indigo-800 px-4 py-2 font-display text-sm font-semibold text-white">
                  {step}
                </span>
                {i < operatingModel.steps.length - 1 && (
                  <span aria-hidden className="text-green-600">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
