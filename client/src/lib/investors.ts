/**
 * Investor relations library — documents hosted on the live BikeWo IR archive.
 */

const PDF = "https://bikewo.in/wp-content/uploads";

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

const TYPE: Record<
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

function doc(
  partial: Omit<InvestorDoc, "typeLabel" | "topic" | "topicLabel"> & {
    type: InvestorType;
  },
): InvestorDoc {
  return { ...TYPE[partial.type], ...partial };
}

export const INVESTOR_DOCS: InvestorDoc[] = [
  doc({
    id: "annual-report-2025-26",
    title: "Annual report 2025–26",
    excerpt:
      "The latest statutory annual report for BikeWo Green Tech Limited, covering operations, financials and governance for FY 2025–26.",
    type: "annual-report",
    date: "2026-09-01",
    href: `${PDF}/2026/09/Bikewo-Annual-Report-2025-26.pdf`,
    featured: true,
  }),
  doc({
    id: "prospectus",
    title: "Prospectus",
    excerpt:
      "The company’s prospectus — the offer document setting out the business, risk factors and use of proceeds.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/prospectus.pdf`,
    featured: true,
  }),
  doc({
    id: "board-committee",
    title: "Board and Committee structure",
    excerpt: "Composition of the Board and its committees, including roles and membership.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Board-and-Committee-structure.pdf`,
  }),
  doc({
    id: "insider-trading",
    title: "Code of Conduct for Insider Trading",
    excerpt: "Rules governing trading in company securities by insiders and connected persons.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Code-of-Conduct-for-Insider-Trading.pdf`,
  }),
  doc({
    id: "csr-policy",
    title: "Corporate Social Responsibility Policy",
    excerpt: "CSR framework, focus areas and oversight under the Companies Act.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Corporate-Social-Responsibility-Policy.pdf`,
  }),
  doc({
    id: "investor-services",
    title: "Investor Services Contact Details",
    excerpt: "Registrar, compliance officer and channels for investor queries and grievances.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Investor-Services-Contact-Details.pdf`,
  }),
  doc({
    id: "nomination-remuneration",
    title: "Nomination and Remuneration Policy",
    excerpt: "How directors and key managerial personnel are nominated, evaluated and paid.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Nomination-and-Remuneration-Policy.pdf`,
  }),
  doc({
    id: "preservation-documents",
    title: "Policy for Preservation of Documents",
    excerpt: "Retention periods and handling of statutory, financial and secretarial records.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Policy-for-Preservation-of-Documents.pdf`,
  }),
  doc({
    id: "related-party",
    title: "Related Party Transaction Policy",
    excerpt: "Identification, approval and disclosure of related-party transactions.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Related-Party-Transaction-Policy.pdf`,
  }),
  doc({
    id: "materiality-events",
    title: "Policy for Determining Materiality of Events",
    excerpt: "Thresholds and process for disclosing material events to the stock exchanges.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Policy-for-Determining-Materiality-of-Events.pdf`,
  }),
  doc({
    id: "independent-directors",
    title: "Code for Independent Directors",
    excerpt: "Duties, professional conduct and role of independent directors on the Board.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Code-For-Independent-Directors.pdf`,
  }),
  doc({
    id: "senior-management-code",
    title: "Code of Conduct for Senior Management Personnel",
    excerpt: "Ethical standards and conduct expected of senior management.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Code-of-Conduct-for-Sr-Mgmt-Personnel.pdf`,
  }),
  doc({
    id: "familiarization",
    title: "Familiarization Programme",
    excerpt: "Induction and ongoing briefing programme for independent directors.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Familiarization-Programme.pdf`,
  }),
  doc({
    id: "kmp",
    title: "Key Managerial Personnel",
    excerpt: "Particulars of key managerial personnel as disclosed to investors.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Key-Managerial-Personnel.pdf`,
  }),
  doc({
    id: "whistle-blower",
    title: "Whistle Blower Policy",
    excerpt: "Protected disclosure mechanism for employees and stakeholders to raise concerns.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Whistle-Blower-Policy.pdf`,
  }),
  doc({
    id: "posh",
    title: "Prevention of Sexual Harassment Policy",
    excerpt: "POSH policy, Internal Committee and the process for raising a complaint.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Prevention-of-Sexual-Harressment-policy-POSH.pdf`,
  }),
  doc({
    id: "risk-management",
    title: "Risk Management Policy",
    excerpt: "How material risks are identified, owned and reviewed across the business.",
    type: "policy",
    date: "2024-03-01",
    href: `${PDF}/2024/03/Risk-Management-Policy.pdf`,
  }),
  doc({
    id: "addendum-drhp",
    title: "Addendum to DRHP",
    excerpt: "Addendum issued to the Draft Red Herring Prospectus.",
    type: "offer",
    date: "2024-07-01",
    href: `${PDF}/2024/07/drhp.pdf`,
  }),
  doc({
    id: "rhp-paper-advt",
    title: "RHP paper advertisement",
    excerpt: "Statutory newspaper advertisement issued with the Red Herring Prospectus.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/RHP-Paper-ADVT.pdf`,
  }),
  doc({
    id: "corrigendum-rhp-2",
    title: "Corrigendum to RHP-2",
    excerpt: "Second corrigendum issued to the Red Herring Prospectus.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/Corrigendum-to-RHP_2.pdf`,
  }),
  doc({
    id: "egm-notice-2025",
    title: "EGM notice 2025",
    excerpt: "Notice convening the Extraordinary General Meeting held in 2025.",
    type: "notice",
    date: "2025-11-01",
    href: `${PDF}/2025/11/EGM-Notice-2025.pdf`,
  }),
  doc({
    id: "drhp",
    title: "Draft Red Herring Prospectus",
    excerpt: "The Draft Red Herring Prospectus filed with SEBI in 2024.",
    type: "offer",
    date: "2024-05-01",
    href: `${PDF}/2024/05/DRHP-on-2024_compressed.pdf`,
  }),
  doc({
    id: "rhp-v4",
    title: "Red Herring Prospectus V4",
    excerpt: "Version 4 of the Red Herring Prospectus issued for the public offer.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/rhp.pdf`,
  }),
  doc({
    id: "corrigendum-rhp-1",
    title: "Corrigendum to RHP-1",
    excerpt: "First corrigendum issued to the Red Herring Prospectus.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/Corrigendum.pdf`,
  }),
  doc({
    id: "corrigendum-rhp-3",
    title: "Corrigendum to RHP-3",
    excerpt: "Third corrigendum issued to the Red Herring Prospectus.",
    type: "offer",
    date: "2024-09-01",
    href: `${PDF}/2024/09/Corrigendum-to-RHP_3.pdf`,
  }),
  doc({
    id: "postal-ballot-2025",
    title: "Postal ballot notice",
    excerpt: "Notice of postal ballot seeking shareholder approval in 2025.",
    type: "notice",
    date: "2025-02-01",
    href: `${PDF}/2025/02/Postal-Ballot-Notice-2025.pdf`,
  }),
  doc({
    id: "annual-report-2016-17",
    title: "Annual report 2016–17",
    excerpt: "Statutory annual report for FY 2016–17.",
    type: "annual-report",
    date: "2017-09-01",
    href: `${PDF}/2024/05/Annual-Report_-2016-17.pdf`,
  }),
  doc({
    id: "annual-report-2017-18",
    title: "Annual report 2017–18",
    excerpt: "Statutory annual report for FY 2017–18.",
    type: "annual-report",
    date: "2018-09-01",
    href: `${PDF}/2024/05/Annual-Report_2017-18.pdf`,
  }),
  doc({
    id: "annual-report-2018-19",
    title: "Annual report 2018–19",
    excerpt: "Statutory annual report for FY 2018–19.",
    type: "annual-report",
    date: "2019-09-01",
    href: `${PDF}/2024/05/Annual-Report_2018-19.pdf`,
  }),
  doc({
    id: "annual-report-2019-20",
    title: "Annual report 2019–20",
    excerpt: "Statutory annual report for FY 2019–20.",
    type: "annual-report",
    date: "2020-09-01",
    href: `${PDF}/2024/05/Annual-Report_2019-20.pdf`,
  }),
  doc({
    id: "annual-report-2020-21",
    title: "Annual report 2020–21",
    excerpt: "Statutory annual report for FY 2020–21.",
    type: "annual-report",
    date: "2021-09-01",
    href: `${PDF}/2024/05/Annual-report_2020-21.pdf`,
  }),
  doc({
    id: "annual-report-2021-22",
    title: "Annual report 2021–22",
    excerpt: "Statutory annual report for FY 2021–22.",
    type: "annual-report",
    date: "2022-09-01",
    href: `${PDF}/2024/05/Annual-Report_2021-22.pdf`,
  }),
  doc({
    id: "annual-report-2022-23",
    title: "Annual report 2022–23",
    excerpt: "Statutory annual report for FY 2022–23.",
    type: "annual-report",
    date: "2023-09-01",
    href: `${PDF}/2024/05/Annual-Report_2022-23.pdf`,
  }),
  doc({
    id: "annual-report-2023-24",
    title: "Annual report 2023–24",
    excerpt: "Statutory annual report for FY 2023–24.",
    type: "annual-report",
    date: "2024-09-01",
    href: `${PDF}/2024/09/Bikewo-Annual-Report-23-24.pdf`,
  }),
  doc({
    id: "annual-report-2024-25",
    title: "Annual report 2024–25",
    excerpt: "Statutory annual report for FY 2024–25.",
    type: "annual-report",
    date: "2025-09-01",
    href: `${PDF}/2025/09/annual_report_2024-25.pdf`,
  }),
  doc({
    id: "annual-return-2020-21",
    title: "Annual return 2020–21",
    excerpt: "Annual return filed for FY 2020–21.",
    type: "annual-return",
    date: "2021-11-01",
    href: `${PDF}/2024/05/2020-21.pdf`,
  }),
  doc({
    id: "annual-return-2021-22",
    title: "Annual return 2021–22",
    excerpt: "Annual return filed for FY 2021–22.",
    type: "annual-return",
    date: "2022-11-01",
    href: `${PDF}/2024/05/2021-22.pdf`,
  }),
  doc({
    id: "annual-return-2022-23",
    title: "Annual return 2022–23",
    excerpt: "Annual return filed for FY 2022–23.",
    type: "annual-return",
    date: "2023-11-01",
    href: `${PDF}/2024/05/2022-23.pdf`,
  }),
  doc({
    id: "egm-notice-2026",
    title: "EGM notice",
    excerpt: "Notice convening the Extraordinary General Meeting.",
    type: "egm",
    date: "2026-06-01",
    href: `${PDF}/2026/06/EGM-Notice.pdf`,
  }),
  doc({
    id: "valuation-report",
    title: "Valuation report",
    excerpt: "Independent valuation report circulated with the EGM papers.",
    type: "egm",
    date: "2026-06-01",
    href: `${PDF}/2026/06/valuation-report.pdf`,
  }),
  doc({
    id: "pcs-certificate",
    title: "PCS certificate",
    excerpt: "Practising Company Secretary certificate issued with the EGM papers.",
    type: "egm",
    date: "2026-06-01",
    href: `${PDF}/2026/06/pcs-certificate.pdf`,
  }),
];

export const INVESTOR_STATS = (
  [
    { slug: "policy", label: "Policies", icon: "shield" },
    { slug: "offer", label: "Offer documents", icon: "box" },
    { slug: "annual-report", label: "Annual reports", icon: "building" },
    { slug: "annual-return", label: "Annual returns", icon: "wallet" },
    { slug: "egm", label: "EGM", icon: "people" },
    { slug: "notice", label: "Notices", icon: "mail" },
  ] as const
).map((item) => ({
  ...item,
  count: INVESTOR_DOCS.filter((d) => d.type === item.slug).length,
}));

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatInvestorDate(iso: string) {
  return DATE_FORMAT.format(new Date(iso));
}

export const FEATURED_DOCS = INVESTOR_DOCS.filter((d) => d.featured);

export const SORTED_DOCS = [...INVESTOR_DOCS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
