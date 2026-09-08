import type { Metadata } from "next";
import { AboutSubHero } from "@/components/about/AboutSubHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ABOUT_AWARDS } from "@/lib/about";
import { ROUTE_INDEX, SITE } from "@/lib/site";
import { stagger } from "@/lib/utils";

const entry = ROUTE_INDEX["/about/awards"];

export const metadata: Metadata = {
  title: entry?.title ?? "Awards & Recognition",
  description:
    "Industry recognition for BikeWo Green Tech Limited — integrated energy and mobility infrastructure built to last.",
  alternates: { canonical: "/about/awards" },
  openGraph: {
    title: `${entry?.title ?? "Awards & Recognition"} — ${SITE.name}`,
    description:
      "Industry recognition for BikeWo’s energy and mobility infrastructure.",
    url: "/about/awards",
    type: "website",
  },
};

export default function AwardsPage() {
  return (
    <>
      <AboutSubHero
        title={entry?.title ?? "Awards & Recognition"}
        blurb={ABOUT_AWARDS.lede}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={ABOUT_AWARDS.eyebrow}
            title={ABOUT_AWARDS.title}
            lede={ABOUT_AWARDS.lede}
          />

          <ul className="mt-14 divide-y divide-indigo-100 border-y border-indigo-100 lg:mt-16">
            {ABOUT_AWARDS.items.map((award, i) => (
              <Reveal as="li" key={award.title} delay={stagger(i, 0.05)}>
                <article className="grid gap-4 py-8 md:grid-cols-[6rem_1fr] md:gap-10 md:py-10">
                  <p className="font-display text-2xl font-bold tracking-tight text-green-700">
                    {award.year}
                  </p>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-indigo-800">
                      {award.title}
                    </h2>
                    <p className="mt-2 font-display text-sm font-semibold text-slate">
                      {award.issuer}
                    </p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
                      {award.copy}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
