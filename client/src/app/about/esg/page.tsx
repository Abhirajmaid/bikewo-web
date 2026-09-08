import type { Metadata } from "next";
import Image from "next/image";
import { AboutSubHero } from "@/components/about/AboutSubHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ABOUT_ESG } from "@/lib/about";
import { ROUTE_INDEX, SITE } from "@/lib/site";
import { stagger } from "@/lib/utils";

const entry = ROUTE_INDEX["/about/esg"];

export const metadata: Metadata = {
  title: entry?.title ?? "ESG",
  description:
    "Planet-positive mobility through clean energy and responsible operations. 2027 aspirations: 100M+ kilometres electrified, 10,000+ partners, 2.5 Mn+ tonnes CO₂ avoided p.a.",
  alternates: { canonical: "/about/esg" },
  openGraph: {
    title: `${entry?.title ?? "ESG"} — ${SITE.name}`,
    description:
      "Planet-positive mobility through clean energy and responsible operations — every published figure is a 2027 aspiration we will report against.",
    url: "/about/esg",
    type: "website",
  },
};

export default function EsgPage() {
  return (
    <>
      <AboutSubHero title={entry?.title ?? "ESG"} blurb={ABOUT_ESG.lede} />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={ABOUT_ESG.eyebrow}
            title={ABOUT_ESG.title}
            lede={ABOUT_ESG.lede}
            action={
              <Button href={ABOUT_ESG.cta.href} variant="ghost" withArrow>
                {ABOUT_ESG.cta.label}
              </Button>
            }
          />

          <ul className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-0 lg:mt-20">
            {ABOUT_ESG.metrics.map((metric, i) => (
              <Reveal
                as="li"
                key={metric.label}
                delay={stagger(i, 0.08)}
                className="md:border-indigo-100 md:px-10 md:first:pl-0 md:last:pr-0 md:not-first:border-l"
              >
                <p className="text-[13px] text-slate">{metric.label}</p>
                <p className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-bold leading-none tracking-tight text-indigo-800">
                  {metric.value}
                </p>
                <p className="mt-5 text-[14px] leading-relaxed text-slate">
                  {metric.detail}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cloud">
        <Container>
          <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
            {ABOUT_ESG.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={stagger(i)}>
                <h2 className="font-display text-lg font-semibold text-indigo-800">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">
                  {pillar.copy}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-[#063024] pb-0 pt-16 text-white md:pb-0 md:pt-20 lg:pb-0 lg:pt-24">
        <Container>
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-semibold leading-snug tracking-tight text-white">
              Pan-India footprint, measured impact — every kilometre electrified
              and every pack recovered is counted.
            </p>
          </Reveal>
        </Container>
        <Reveal delay={0.1} className="relative mt-14 w-full md:mt-16 lg:mt-20">
          <Image
            src={ABOUT_ESG.map.src}
            alt={ABOUT_ESG.map.alt}
            width={2000}
            height={900}
            sizes="100vw"
            className="block h-auto w-full"
          />
        </Reveal>
      </Section>

      <ContactCTA />
    </>
  );
}
