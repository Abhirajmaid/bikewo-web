import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LovedBy } from "@/components/home/LovedBy";
import { Glance } from "@/components/home/Glance";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Divisions } from "@/components/home/Divisions";
import { Sustainability } from "@/components/home/Sustainability";
import { Stories } from "@/components/home/Stories";
import { Investors } from "@/components/home/Investors";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
  keywords: [...SITE.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.corporateTagline}`,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.corporateTagline}`,
    description: SITE.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LovedBy />
      <Glance />
      <Ecosystem />
      <Divisions />
      {/* <ShramSainik /> */}
      <Sustainability />
      <Stories />
      <Investors />
      {/* <News /> */}
      {/* <Careers /> */}
      <ContactCTA />
    </>
  );
}
