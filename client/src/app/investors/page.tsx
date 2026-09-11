import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { InvestorsHero } from "@/components/investors/InvestorsHero";
import { InvestorsLibrary } from "@/components/investors/InvestorsLibrary";
import { INVESTOR_PAGE } from "@/lib/investors";
import { ROUTE_INDEX, SITE } from "@/lib/site";
import { listInvestorDocuments } from "@/lib/strapi";

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

async function loadDocs() {
  try {
    return await listInvestorDocuments();
  } catch {
    return [];
  }
}

export default async function InvestorsPage() {
  const docs = await loadDocs();

  return (
    <>
      <InvestorsHero docs={docs} />
      <InvestorsLibrary docs={docs} />
      <ContactCTA />
    </>
  );
}
