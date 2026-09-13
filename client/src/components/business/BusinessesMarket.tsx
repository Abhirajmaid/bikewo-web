import { BUSINESSES_MARKET } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Market sizing + demand signals for the businesses narrative. */
export function BusinessesMarket() {
  return (
    <Section id="market" tone="cloud" className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={BUSINESSES_MARKET.eyebrow}
          title={BUSINESSES_MARKET.title}
          lede={BUSINESSES_MARKET.lede}
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {BUSINESSES_MARKET.sizing.map((item, i) => (
            <Reveal as="li" key={item.label} delay={stagger(i, 0.07)}>
              <article className="h-full bg-white px-6 py-7 shadow-card">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                  {item.label}
                </p>
                <p className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.35rem)] font-bold leading-none tracking-tight text-indigo-800">
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
          {BUSINESSES_MARKET.signals.map((signal, i) => (
            <Reveal as="li" key={signal.label} delay={0.12 + stagger(i, 0.05)}>
              <p className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-bold leading-none text-indigo-800">
                <Counter value={signal.value} suffix={signal.suffix} />
              </p>
              <p className="mt-3 font-display text-sm font-semibold text-indigo-800">
                {signal.label}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-slate">
                {signal.detail}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.22} className="mt-12 max-w-3xl border-l-2 border-green-500 pl-5">
          <p className="text-[1.0625rem] leading-relaxed text-indigo-800">
            {BUSINESSES_MARKET.takeaway}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {BUSINESSES_MARKET.source}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
