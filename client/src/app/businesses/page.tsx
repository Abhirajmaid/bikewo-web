import type { Metadata } from "next";
import { BusinessesDivisionsGrid } from "@/components/business/BusinessesDivisionsGrid";
import { BusinessesFAQ } from "@/components/business/BusinessesFAQ";
import { BusinessesHero } from "@/components/business/BusinessesHero";
import { BusinessesImpactBanner } from "@/components/business/BusinessesImpactBanner";
import { BusinessesInsights } from "@/components/business/BusinessesInsights";
import { BusinessesPartners } from "@/components/business/BusinessesPartners";
import { BusinessesPlanetBanner } from "@/components/business/BusinessesPlanetBanner";
import { BusinessesTestimonials } from "@/components/business/BusinessesTestimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/businesses"];

export const metadata: Metadata = {
  title: entry?.title ?? "Businesses",
  description:
    entry?.blurb ??
    "Six businesses operating as one EMI platform — vehicles, energy, financing, service, sourcing and intelligence.",
  keywords: [...SITE.keywords],
  alternates: { canonical: "/businesses" },
  openGraph: {
    title: `${entry?.title ?? "Businesses"} — ${SITE.name}`,
    description:
      entry?.blurb ??
      "Six businesses operating as one EMI platform — vehicles, energy, financing, service, sourcing and intelligence.",
    url: "/businesses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${entry?.title ?? "Businesses"} — ${SITE.name}`,
    description:
      entry?.blurb ??
      "Six businesses operating as one EMI platform — vehicles, energy, financing, service, sourcing and intelligence.",
  },
};

export default function BusinessesPage() {
  return (
    <>
      <BusinessesHero />
      <BusinessesPartners />
      <BusinessesImpactBanner />
      <BusinessesInsights />
      <BusinessesDivisionsGrid />
      <BusinessesTestimonials />
      <BusinessesPlanetBanner />
      <BusinessesFAQ />
      <ContactCTA />
    </>
  );
}
