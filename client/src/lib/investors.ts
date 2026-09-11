/**
 * Investor relations library — types, filters, and helpers.
 * Document records come from Strapi (Railway Postgres).
 */

export type InvestorType =
  | "policy"
  | "offer"
  | "annual-report"
  | "annual-return"
  | "egm"
  | "notice";

export type InvestorTopic = "governance" | "financials" | "ipo" | "shareholders";

export type InvestorDoc = {
  id: string;
  /** Strapi documentId — used by CMS admin updates */
  documentId?: string;
  title: string;
  excerpt: string;
  type: InvestorType;
  typeLabel: string;
  topic: InvestorTopic;
  topicLabel: string;
  date: string;
  href: string;
  featured?: boolean;
};

export const INVESTOR_PAGE = {
  title: "Investors",
  lede: "Financial reports, governance policies and offer documents — the same archive we file, in a form you can search.",
  featuredTitle: "Featured documents",
  libraryTitle: "All documents",
  libraryCta: "Browse the full document library",
};

export const INVESTOR_TYPES: { slug: InvestorType | "all"; label: string }[] = [
  { slug: "all", label: "All types" },
  { slug: "policy", label: "Policies" },
  { slug: "offer", label: "Offer documents" },
  { slug: "annual-report", label: "Annual reports" },
  { slug: "annual-return", label: "Annual returns" },
  { slug: "egm", label: "EGM" },
  { slug: "notice", label: "Notices" },
];

export const INVESTOR_TOPICS: { slug: InvestorTopic | "all"; label: string }[] = [
  { slug: "all", label: "All topics" },
  { slug: "governance", label: "Governance" },
  { slug: "financials", label: "Financials" },
  { slug: "ipo", label: "IPO" },
  { slug: "shareholders", label: "Shareholders" },
];

export const DOCS_PER_PAGE = 9;

export const TYPE_META: Record<
  InvestorType,
  { typeLabel: string; topic: InvestorTopic; topicLabel: string }
> = {
  policy: { typeLabel: "Policy", topic: "governance", topicLabel: "Governance" },
  offer: { typeLabel: "Offer document", topic: "ipo", topicLabel: "IPO" },
  "annual-report": {
    typeLabel: "Annual report",
    topic: "financials",
    topicLabel: "Financials",
  },
  "annual-return": {
    typeLabel: "Annual return",
    topic: "financials",
    topicLabel: "Financials",
  },
  egm: { typeLabel: "EGM", topic: "shareholders", topicLabel: "Shareholders" },
  notice: { typeLabel: "Notice", topic: "shareholders", topicLabel: "Shareholders" },
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatInvestorDate(iso: string) {
  return DATE_FORMAT.format(new Date(iso));
}

export function sortInvestorDocs(docs: InvestorDoc[]) {
  return [...docs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function featuredInvestorDocs(docs: InvestorDoc[]) {
  return docs.filter((d) => d.featured);
}

export function investorStats(docs: InvestorDoc[]) {
  return (
    [
      { slug: "policy" as const, label: "Policies", icon: "shield" as const },
      { slug: "offer" as const, label: "Offer documents", icon: "box" as const },
      { slug: "annual-report" as const, label: "Annual reports", icon: "building" as const },
      { slug: "annual-return" as const, label: "Annual returns", icon: "wallet" as const },
      { slug: "egm" as const, label: "EGM", icon: "people" as const },
      { slug: "notice" as const, label: "Notices", icon: "mail" as const },
    ] as const
  ).map((item) => ({
    ...item,
    count: docs.filter((d) => d.type === item.slug).length,
  }));
}

export function slugifyInvestorTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
