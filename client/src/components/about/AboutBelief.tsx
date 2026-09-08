import Image from "next/image";
import Link from "next/link";
import { ABOUT_BELIEF } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/brand/Icons";
import { stagger } from "@/lib/utils";

/** Belief — centered statement with vision & mission image cards. */
export function AboutBelief() {
  return (
    <Section className="border-b border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={ABOUT_BELIEF.eyebrow}
          title={ABOUT_BELIEF.title}
          align="center"
          className="justify-center"
        />

        <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {ABOUT_BELIEF.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={stagger(i, 0.08)}>
              <Link
                href={card.href}
                className="group relative block aspect-4/5 overflow-hidden rounded-2xl sm:aspect-5/4 md:min-h-104 md:aspect-auto lg:min-h-120"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-indigo-950/80 via-indigo-950/25 to-indigo-950/20"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <p className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: card.dot }}
                    />
                    {card.tag}
                  </p>

                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold leading-tight text-white">
                      {card.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-white/90">
                      {card.cta}
                      <ArrowUpRightIcon
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
