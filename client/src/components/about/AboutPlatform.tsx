import { ABOUT_PLATFORM } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Full-stack EMI platform layers from the investor presentation. */
export function AboutPlatform() {
  return (
    <Section id="platform" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_PLATFORM.eyebrow}
          title={ABOUT_PLATFORM.title}
          lede={ABOUT_PLATFORM.lede}
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-5">
          {ABOUT_PLATFORM.layers.map((layer, i) => (
            <Reveal as="li" key={layer.index} delay={stagger(i, 0.06)}>
              <article className="flex h-full flex-col border-t-2 border-green-500 bg-cloud px-5 py-6">
                <span className="font-mono text-xs font-medium text-green-700">
                  {layer.index}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-indigo-800">
                  {layer.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate">{layer.short}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-slate">
                  {layer.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
