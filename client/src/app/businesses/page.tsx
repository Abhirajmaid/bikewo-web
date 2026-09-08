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
    "Six divisions operating as one accountable system — mobility, energy, service, sourcing and intelligence.",
  alternates: { canonical: "/businesses" },
  openGraph: {
    title: `${entry?.title ?? "Businesses"} — ${SITE.name}`,
    description:
      entry?.blurb ??
      "Six divisions operating as one accountable system — mobility, energy, service, sourcing and intelligence.",
    url: "/businesses",
    type: "website",
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
