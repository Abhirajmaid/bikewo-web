import { BUSINESSES_ADJACENT } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Downstream diversification opportunities from the 3PL core. */
export function BusinessesAdjacent() {
  return (
    <Section id="adjacent" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={BUSINESSES_ADJACENT.eyebrow}
          title={BUSINESSES_ADJACENT.title}
          lede={BUSINESSES_ADJACENT.lede}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {BUSINESSES_ADJACENT.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={stagger(i, 0.06)}>
              <article className="flex h-full flex-col border border-indigo-100 bg-white p-6 transition-shadow duration-300 hover:shadow-card">
                <span className="font-mono text-xs text-green-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-indigo-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
