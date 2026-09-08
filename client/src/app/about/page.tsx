import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutBelief } from "@/components/about/AboutBelief";
import { AboutMissionVision } from "@/components/about/AboutMissionVision";
import { AboutTeam } from "@/components/about/AboutTeam";
import { Stories } from "@/components/home/Stories";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { AboutNews } from "@/components/about/AboutNews";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/about"];

export const metadata: Metadata = {
  title: entry?.title ?? "About BikeWo",
  description:
    entry?.blurb ??
    "BikeWo is building Energy & Mobility Infrastructure (EMI) to power the future of EV logistics. Logistics is our core. EMI is our differentiator.",
  keywords: [...SITE.keywords],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${entry?.title ?? "About BikeWo"} — ${SITE.name}`,
    description: entry?.blurb ?? SITE.description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${entry?.title ?? "About BikeWo"} — ${SITE.name}`,
    description: entry?.blurb ?? SITE.description,
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
      <Stories />
      <AboutFAQ />
      <AboutNews />
      <ContactCTA />
    </>
  );
}
