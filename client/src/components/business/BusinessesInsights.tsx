import { BUSINESSES_INSIGHTS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Operating-model insight band — single focused narrative card. */
export function BusinessesInsights() {
  const { card } = BUSINESSES_INSIGHTS;

  return (
    <Section className="border-b border-indigo-100">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{BUSINESSES_INSIGHTS.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.75rem,1.15rem+2vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
              {BUSINESSES_INSIGHTS.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <article className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-card">
              <div className="flex items-center gap-2.5 bg-indigo-950 px-5 py-3.5 md:px-6">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-green-400"
                />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80">
                  {card.kicker}
                </span>
              </div>

              <div className="p-7 md:p-8">
                <p className="text-[15px] leading-relaxed text-indigo-800">
                  {card.lede}
                </p>

                <ul className="mt-6 space-y-3">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[14px] leading-relaxed text-slate"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-green-500"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  {card.actions.map((action) => (
                    <Button
                      key={action.href}
                      href={action.href}
                      variant={action.variant}
                      withArrow={action.variant === "primary"}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
