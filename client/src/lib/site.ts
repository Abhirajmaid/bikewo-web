/**
 * Site structure — WRS v3.0 §4 Website Sitemap.
 *
 * This is the single source of truth for routing, the header mega-menu, the
 * footer and the placeholder pages. Adding a route here does not create the
 * page file; keep `src/app/**` in step when the sitemap changes.
 */

export type NavNode = {
  title: string;
  href: string;
  /** One-line summary shown in the mega-menu and on the placeholder page. */
  blurb?: string;
  children?: NavNode[];
};

export const SITE = {
  name: "BikeWo",
  legalName: "BikeWo Green Tech Limited",
  tagline: "Electrifying India",
  corporateTagline: "Seamless Energy. Smarter Mobility.",
  campaignTagline: "The Mobility India Deserves.",
  url: "https://www.bikewo.in",
  brandEmail: "brand@bikewo.in",
  description:
    "BikeWo Green Tech Limited is building India's integrated energy & mobility infrastructure — from the vehicle you buy to the charge you take and the service you rely on.",
} as const;

export const NAV: NavNode[] = [
  {
    title: "About BikeWo",
    href: "/about",
    blurb: "Who we are, what we stand for and how we govern ourselves.",
    children: [
      { title: "Our Story", href: "/about/our-story" },
      { title: "Leadership Letter", href: "/about/leadership-letter" },
      { title: "Leadership Team", href: "/about/leadership-team" },
      { title: "Vision, Mission & Values", href: "/about/vision-mission-values" },
      { title: "Why BikeWo", href: "/about/why-bikewo" },
      { title: "Corporate Governance", href: "/about/corporate-governance" },
      { title: "ESG", href: "/about/esg" },
      { title: "Awards & Recognition", href: "/about/awards" },
      { title: "Global Presence", href: "/about/global-presence" },
      { title: "Timeline", href: "/about/timeline" },
    ],
  },
  {
    title: "Businesses",
    href: "/businesses",
    blurb: "Seven divisions operating as one accountable system.",
    children: [
      { title: "Mobility Distribution", href: "/businesses/mobility-distribution" },
      { title: "Mobility Asset Leasing", href: "/businesses/mobility-asset-leasing" },
      { title: "Energy Infrastructure", href: "/businesses/energy-infrastructure" },
      { title: "Lifecycle Services", href: "/businesses/lifecycle-services" },
      { title: "Aviation Services", href: "/businesses/aviation-services" },
      {
        title: "Global Sourcing & Supply Chain",
        href: "/businesses/global-sourcing-supply-chain",
      },
      { title: "BikeWo VZN — Connected Intelligence", href: "/businesses/bikewo-vzn" },
    ],
  },
  {
    title: "Subsidiaries",
    href: "/subsidiaries",
    blurb: "Endorsed companies that carry the masterbrand forward.",
    children: [
      { title: "PositiEV Mobility", href: "/subsidiaries/positiev-mobility" },
      { title: "Enlite EV Care", href: "/subsidiaries/enlite-ev-care" },
      { title: "BikeWo VZN", href: "/subsidiaries/bikewo-vzn" },
      { title: "Future Companies", href: "/subsidiaries/future-companies" },
    ],
  },
  {
    title: "Shram Sainik",
    href: "/shram-sainik",
    blurb: "Our driver-partner programme — income with dignity.",
    children: [
      { title: "Driver Partner Program", href: "/shram-sainik/driver-partner-program" },
      { title: "Benefits", href: "/shram-sainik/benefits" },
      { title: "Training Academy", href: "/shram-sainik/training-academy" },
      { title: "Uniform & Safety", href: "/shram-sainik/uniform-safety" },
      { title: "Community", href: "/shram-sainik/community" },
      { title: "Apply Now", href: "/shram-sainik/apply" },
    ],
  },
  {
    title: "Sustainability",
    href: "/sustainability",
    blurb: "Net-zero is a commitment we measure, not a claim we make.",
  },
  {
    title: "Investors",
    href: "/investors",
    blurb: "Financial highlights, reports, governance and growth milestones.",
  },
  { title: "Media", href: "/media", blurb: "Newsroom, announcements and press resources." },
  { title: "Careers", href: "/careers", blurb: "Build the infrastructure India runs on." },
  { title: "Contact", href: "/contact", blurb: "Talk to the right team, first time." },
];

/** Primary nav shown in the header — the rest live in the footer. */
export const PRIMARY_NAV = NAV.filter((n) =>
  ["About BikeWo", "Businesses", "Subsidiaries", "Shram Sainik", "Sustainability", "Investors"].includes(
    n.title,
  ),
);

/** Legal routes — linked from the footer, outside the main sitemap. */
export const LEGAL: NavNode[] = [
  { title: "Privacy Policy", href: "/privacy", blurb: "How we collect, use and protect your data." },
  { title: "Terms of Use", href: "/terms", blurb: "The terms that govern the use of this site." },
];

/** Flattened lookup so a placeholder page can describe itself from its path. */
export const ROUTE_INDEX: Record<string, { title: string; parent?: string; blurb?: string }> =
  [...NAV, ...LEGAL].reduce(
    (acc, node) => {
      acc[node.href] = { title: node.title, blurb: node.blurb };
      node.children?.forEach((child) => {
        acc[child.href] = { title: child.title, parent: node.title, blurb: child.blurb };
      });
      return acc;
    },
    {} as Record<string, { title: string; parent?: string; blurb?: string }>,
  );

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bikewo" },
  { label: "YouTube", href: "https://www.youtube.com/@bikewo" },
  { label: "Instagram", href: "https://www.instagram.com/bikewo" },
  { label: "X", href: "https://x.com/bikewo" },
];
