import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { InvestorsLibrary } from "@/components/investors/InvestorsLibrary";
import { PageHero } from "@/components/ui/PageHero";
import { INVESTOR_PAGE } from "@/lib/investors";
import { SITE } from "@/lib/site";
import { listInvestorDocuments } from "@/lib/strapi";

const PATH = "/investor-relations/AnnualReports";
const TITLE = "Annual reports";
const LEDE =
  "Statutory annual reports for BikeWo Green Tech Limited — operations, financials and governance by financial year.";

export const metadata: Metadata = {
  title: TITLE,
  description: LEDE,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | ${SITE.name}`,
    description: LEDE,
    url: PATH,
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

export default async function AnnualReportsPage() {
  const docs = await loadDocs();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: INVESTOR_PAGE.title, href: "/investors" },
          { label: TITLE },
        ]}
        title={TITLE}
        lede={LEDE}
      />
      <InvestorsLibrary docs={docs} initialType="annual-report" />
      <ContactCTA />
    </>
  );
}
