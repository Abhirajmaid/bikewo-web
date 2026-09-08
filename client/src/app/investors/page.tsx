import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { InvestorsHero } from "@/components/investors/InvestorsHero";
import { InvestorsLibrary } from "@/components/investors/InvestorsLibrary";
import { INVESTOR_PAGE } from "@/lib/investors";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/investors"];

export const metadata: Metadata = {
  title: entry?.title ?? "Investors",
  description: INVESTOR_PAGE.lede,
  alternates: { canonical: "/investors" },
  openGraph: {
    title: `${entry?.title ?? "Investors"} | ${SITE.name}`,
    description: INVESTOR_PAGE.lede,
    url: "/investors",
    type: "website",
  },
};

export default function InvestorsPage() {
  return (
    <>
      <InvestorsHero />
      <InvestorsLibrary />
      <ContactCTA />
    </>
  );
}
