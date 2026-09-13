import { ABOUT_MARKET } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Market opportunity — TAM / SAM / SOM and demand signals. */
export function AboutMarket() {
  return (
    <Section id="market" tone="cloud" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_MARKET.eyebrow}
          title={ABOUT_MARKET.title}
          lede={ABOUT_MARKET.lede}
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
          {ABOUT_MARKET.sizing.map((item, i) => (
            <Reveal as="li" key={item.label} delay={stagger(i, 0.08)}>
              <article className="h-full bg-white px-6 py-7 shadow-card">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                  {item.label}
                </p>
                <p className="mt-4 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-bold leading-none tracking-tight text-indigo-800">
                  {item.value}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate">
                  {item.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-10 grid grid-cols-2 gap-6 lg:mt-12 lg:grid-cols-4 lg:gap-8">
          {ABOUT_MARKET.signals.map((signal, i) => (
            <Reveal as="li" key={signal.label} delay={0.15 + stagger(i, 0.06)}>
              <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold leading-none text-indigo-800">
                {signal.value}
              </p>
              <p className="mt-3 text-sm leading-snug text-slate">{signal.label}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-12 max-w-3xl border-l-2 border-green-500 pl-5 lg:mt-14">
          <p className="text-[1.0625rem] leading-relaxed text-indigo-800">
            {ABOUT_MARKET.takeaway}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            {ABOUT_MARKET.source}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
