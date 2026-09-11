/** Investor document metadata seed — PDFs left empty for manual upload. */
export type InvestorSeed = {
  slug: string;
  title: string;
  excerpt: string;
  docType:
    | "policy"
    | "offer"
    | "annual-report"
    | "annual-return"
    | "egm"
    | "notice";
  date: string;
  featured?: boolean;
};

export const INVESTOR_SEED: InvestorSeed[] = [
  {
    slug: "annual-report-2025-26",
    title: "Annual report 2025–26",
    excerpt:
      "The latest statutory annual report for BikeWo Green Tech Limited, covering operations, financials and governance for FY 2025–26.",
    docType: "annual-report",
    date: "2026-09-01",
    featured: true,
  },
  {
    slug: "prospectus",
    title: "Prospectus",
    excerpt:
      "The company's prospectus — the offer document setting out the business, risk factors and use of proceeds.",
    docType: "offer",
    date: "2024-09-01",
    featured: true,
  },
  {
    slug: "board-committee",
    title: "Board and Committee structure",
    excerpt: "Composition of the Board and its committees, including roles and membership.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "insider-trading",
    title: "Code of Conduct for Insider Trading",
    excerpt: "Rules governing trading in company securities by insiders and connected persons.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "csr-policy",
    title: "Corporate Social Responsibility Policy",
    excerpt: "CSR framework, focus areas and oversight under the Companies Act.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "investor-services",
    title: "Investor Services Contact Details",
    excerpt: "Registrar, compliance officer and channels for investor queries and grievances.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "nomination-remuneration",
    title: "Nomination and Remuneration Policy",
    excerpt: "How directors and key managerial personnel are nominated, evaluated and paid.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "preservation-documents",
    title: "Policy for Preservation of Documents",
    excerpt: "Retention periods and handling of statutory, financial and secretarial records.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "related-party",
    title: "Related Party Transaction Policy",
    excerpt: "Identification, approval and disclosure of related-party transactions.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "materiality-events",
    title: "Policy for Determining Materiality of Events",
    excerpt: "Thresholds and process for disclosing material events to the stock exchanges.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "independent-directors",
    title: "Code for Independent Directors",
    excerpt: "Duties, professional conduct and role of independent directors on the Board.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "senior-management-code",
    title: "Code of Conduct for Senior Management Personnel",
    excerpt: "Ethical standards and conduct expected of senior management.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "familiarization",
    title: "Familiarization Programme",
    excerpt: "Induction and ongoing briefing programme for independent directors.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "kmp",
    title: "Key Managerial Personnel",
    excerpt: "Particulars of key managerial personnel as disclosed to investors.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "whistle-blower",
    title: "Whistle Blower Policy",
    excerpt: "Protected disclosure mechanism for employees and stakeholders to raise concerns.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "posh",
    title: "Prevention of Sexual Harassment Policy",
    excerpt: "POSH policy, Internal Committee and the process for raising a complaint.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "risk-management",
    title: "Risk Management Policy",
    excerpt: "How material risks are identified, owned and reviewed across the business.",
    docType: "policy",
    date: "2024-03-01",
  },
  {
    slug: "addendum-drhp",
    title: "Addendum to DRHP",
    excerpt: "Addendum issued to the Draft Red Herring Prospectus.",
    docType: "offer",
    date: "2024-07-01",
  },
  {
    slug: "rhp-paper-advt",
    title: "RHP paper advertisement",
    excerpt: "Statutory newspaper advertisement issued with the Red Herring Prospectus.",
    docType: "offer",
    date: "2024-09-01",
  },
  {
    slug: "corrigendum-rhp-2",
    title: "Corrigendum to RHP-2",
    excerpt: "Second corrigendum issued to the Red Herring Prospectus.",
    docType: "offer",
    date: "2024-09-01",
  },
  {
    slug: "egm-notice-2025",
    title: "EGM notice 2025",
    excerpt: "Notice convening the Extraordinary General Meeting held in 2025.",
    docType: "notice",
    date: "2025-11-01",
  },
  {
    slug: "drhp",
    title: "Draft Red Herring Prospectus",
    excerpt: "The Draft Red Herring Prospectus filed with SEBI in 2024.",
    docType: "offer",
    date: "2024-05-01",
  },
  {
    slug: "rhp-v4",
    title: "Red Herring Prospectus V4",
    excerpt: "Version 4 of the Red Herring Prospectus issued for the public offer.",
    docType: "offer",
    date: "2024-09-01",
  },
  {
    slug: "corrigendum-rhp-1",
    title: "Corrigendum to RHP-1",
    excerpt: "First corrigendum issued to the Red Herring Prospectus.",
    docType: "offer",
    date: "2024-09-01",
  },
  {
    slug: "corrigendum-rhp-3",
    title: "Corrigendum to RHP-3",
    excerpt: "Third corrigendum issued to the Red Herring Prospectus.",
    docType: "offer",
    date: "2024-09-01",
  },
  {
    slug: "postal-ballot-2025",
    title: "Postal ballot notice",
    excerpt: "Notice of postal ballot seeking shareholder approval in 2025.",
    docType: "notice",
    date: "2025-02-01",
  },
  {
    slug: "annual-report-2016-17",
    title: "Annual report 2016–17",
    excerpt: "Statutory annual report for FY 2016–17.",
    docType: "annual-report",
    date: "2017-09-01",
  },
  {
    slug: "annual-report-2017-18",
    title: "Annual report 2017–18",
    excerpt: "Statutory annual report for FY 2017–18.",
    docType: "annual-report",
    date: "2018-09-01",
  },
  {
    slug: "annual-report-2018-19",
    title: "Annual report 2018–19",
    excerpt: "Statutory annual report for FY 2018–19.",
    docType: "annual-report",
    date: "2019-09-01",
  },
  {
    slug: "annual-report-2019-20",
    title: "Annual report 2019–20",
    excerpt: "Statutory annual report for FY 2019–20.",
    docType: "annual-report",
    date: "2020-09-01",
  },
  {
    slug: "annual-report-2020-21",
    title: "Annual report 2020–21",
    excerpt: "Statutory annual report for FY 2020–21.",
    docType: "annual-report",
    date: "2021-09-01",
  },
  {
    slug: "annual-report-2021-22",
    title: "Annual report 2021–22",
    excerpt: "Statutory annual report for FY 2021–22.",
    docType: "annual-report",
    date: "2022-09-01",
  },
  {
    slug: "annual-report-2022-23",
    title: "Annual report 2022–23",
    excerpt: "Statutory annual report for FY 2022–23.",
    docType: "annual-report",
    date: "2023-09-01",
  },
  {
    slug: "annual-report-2023-24",
    title: "Annual report 2023–24",
    excerpt: "Statutory annual report for FY 2023–24.",
    docType: "annual-report",
    date: "2024-09-01",
  },
  {
    slug: "annual-report-2024-25",
    title: "Annual report 2024–25",
    excerpt: "Statutory annual report for FY 2024–25.",
    docType: "annual-report",
    date: "2025-09-01",
  },
  {
    slug: "annual-return-2020-21",
    title: "Annual return 2020–21",
    excerpt: "Annual return filed for FY 2020–21.",
    docType: "annual-return",
    date: "2021-11-01",
  },
  {
    slug: "annual-return-2021-22",
    title: "Annual return 2021–22",
    excerpt: "Annual return filed for FY 2021–22.",
    docType: "annual-return",
    date: "2022-11-01",
  },
  {
    slug: "annual-return-2022-23",
    title: "Annual return 2022–23",
    excerpt: "Annual return filed for FY 2022–23.",
    docType: "annual-return",
    date: "2023-11-01",
  },
  {
    slug: "egm-notice-2026",
    title: "EGM notice",
    excerpt: "Notice convening the Extraordinary General Meeting.",
    docType: "egm",
    date: "2026-06-01",
  },
  {
    slug: "valuation-report",
    title: "Valuation report",
    excerpt: "Independent valuation report circulated with the EGM papers.",
    docType: "egm",
    date: "2026-06-01",
  },
  {
    slug: "pcs-certificate",
    title: "PCS certificate",
    excerpt: "Practising Company Secretary certificate issued with the EGM papers.",
    docType: "egm",
    date: "2026-06-01",
  },
];
