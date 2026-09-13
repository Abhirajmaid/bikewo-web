import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutPlatform } from "@/components/about/AboutPlatform";
import { AboutMarket } from "@/components/about/AboutMarket";
import { AboutSolution } from "@/components/about/AboutSolution";
import { AboutStrategy } from "@/components/about/AboutStrategy";
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
    "BikeWo builds Energy & Mobility Infrastructure (EMI) for electric last-mile logistics. Logistics is our core. EMI is our differentiator.",
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
      <AboutPlatform />
      <AboutMarket />
      <AboutSolution />
      <AboutStrategy />
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
