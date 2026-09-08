import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutBelief } from "@/components/about/AboutBelief";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { AboutNews } from "@/components/about/AboutNews";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/about"];

export const metadata: Metadata = {
  title: entry?.title ?? "About BikeWo",
  description: entry?.blurb ?? SITE.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${entry?.title ?? "About BikeWo"} — ${SITE.name}`,
    description: entry?.blurb ?? SITE.description,
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutTimeline />
      <AboutImpact />
      <AboutBelief />
      <AboutMissionVision />
      <AboutTeam />
      <AboutFAQ />
      <AboutNews />
      <ContactCTA />
    </>
  );
}
