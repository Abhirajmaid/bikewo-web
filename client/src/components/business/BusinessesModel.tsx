import { BUSINESSES_MODEL } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** EMI target operating model — Source → Connect. */
export function BusinessesModel() {
  return (
    <Section id="model" tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(42_183_124/0.16),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={BUSINESSES_MODEL.eyebrow}
          title={BUSINESSES_MODEL.title}
          lede={BUSINESSES_MODEL.lede}
          tone="dark"
          align="center"
          className="justify-center"
        />

        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-3">
          {BUSINESSES_MODEL.steps.map((step, i) => (
            <Reveal as="li" key={step.label} delay={stagger(i, 0.05)}>
              <article className="relative flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] px-4 py-5">
                <span className="font-mono text-[11px] text-green-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                  {step.label}
                </h3>
                <p className="mt-1 text-sm text-white/55">{step.detail}</p>
                {i < BUSINESSES_MODEL.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-green-400 lg:block"
                  >
                    →
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
