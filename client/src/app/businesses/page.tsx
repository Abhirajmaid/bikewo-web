import type { Metadata } from "next";
import { BusinessesAdjacent } from "@/components/business/BusinessesAdjacent";
import { BusinessesDivisionsGrid } from "@/components/business/BusinessesDivisionsGrid";
import { BusinessesFAQ } from "@/components/business/BusinessesFAQ";
import { BusinessesHero } from "@/components/business/BusinessesHero";
import { BusinessesImpactBanner } from "@/components/business/BusinessesImpactBanner";
import { BusinessesInsights } from "@/components/business/BusinessesInsights";
import { BusinessesMarket } from "@/components/business/BusinessesMarket";
import { BusinessesModel } from "@/components/business/BusinessesModel";
import { BusinessesPartners } from "@/components/business/BusinessesPartners";
import { BusinessesPlanetBanner } from "@/components/business/BusinessesPlanetBanner";
import { BusinessesSolution } from "@/components/business/BusinessesSolution";
import { BusinessesTestimonials } from "@/components/business/BusinessesTestimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/businesses"];

export const metadata: Metadata = {
  title: entry?.title ?? "Businesses",
  description:
    entry?.blurb ??
    "One EMI operating model — source, distribute, enable, charge, service and connect for electric last-mile logistics.",
  keywords: [...SITE.keywords],
  alternates: { canonical: "/businesses" },
  openGraph: {
    title: `${entry?.title ?? "Businesses"} — ${SITE.name}`,
    description:
      entry?.blurb ??
      "One EMI operating model — source, distribute, enable, charge, service and connect for electric last-mile logistics.",
    url: "/businesses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${entry?.title ?? "Businesses"} — ${SITE.name}`,
    description:
      entry?.blurb ??
      "One EMI operating model — source, distribute, enable, charge, service and connect for electric last-mile logistics.",
  },
};

export default function BusinessesPage() {
  return (
    <>
      <BusinessesHero />
      <BusinessesModel />
      <BusinessesDivisionsGrid />
      <BusinessesSolution />
      <BusinessesMarket />
      <BusinessesInsights />
      <BusinessesAdjacent />
      <BusinessesPartners />
      <BusinessesImpactBanner />
      <BusinessesTestimonials />
      <BusinessesPlanetBanner />
      <BusinessesFAQ />
      <ContactCTA />
    </>
  );
}
