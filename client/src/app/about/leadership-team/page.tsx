import type { Metadata } from "next";
import { AboutSubHero } from "@/components/about/AboutSubHero";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { LEADERSHIP } from "@/lib/about";
import { ROUTE_INDEX } from "@/lib/site";

const entry = ROUTE_INDEX["/about/leadership-team"];

export const metadata: Metadata = {
  title: entry?.title ?? "Leadership Team",
  description:
    "Meet the leadership team accountable for BikeWo's integrated energy and mobility infrastructure.",
  alternates: { canonical: "/about/leadership-team" },
};

export default function LeadershipTeamPage() {
  return (
    <>
      <AboutSubHero
        title={entry?.title ?? "Leadership Team"}
        blurb={LEADERSHIP.lede}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={LEADERSHIP.eyebrow}
            title={LEADERSHIP.title}
            lede={LEADERSHIP.lede}
            align="center"
            className="justify-center"
          />

          <TeamGrid />
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
