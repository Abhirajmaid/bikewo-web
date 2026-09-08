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
  /** Open href in a new tab (external subsidiary sites, etc.). */
  external?: boolean;
  /** Optional brand mark shown in mega-menus (e.g. subsidiaries). */
  logo?: string;
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
  locale: "en_IN",
  description:
    "BikeWo Green Tech Limited is building India's integrated energy & mobility infrastructure — from the vehicle you buy to the charge you take and the service you rely on.",
  keywords: [
    "BikeWo",
    "BikeWo Green Tech",
    "electric mobility India",
    "EV infrastructure",
    "energy and mobility",
    "EV charging",
    "mobility distribution",
    "Shram Sainik",
    "PositiEV",
    "Enlite EV Care",
  ],
} as const;

export const NAV: NavNode[] = [
  {
    title: "About BikeWo",
    href: "/about",
    blurb: "Who we are, what we stand for and how we govern ourselves.",
    children: [
      { title: "About us", href: "/about", blurb: "Who we are and what we stand for." },
      { title: "Leadership Team", href: "/about/leadership-team" },
      { title: "Vision, Mission & Values", href: "/about#mission-vision" },
      { title: "ESG", href: "/about/esg" },
      { title: "Awards & Recognition", href: "/about/awards" },
      { title: "News & media", href: "/media", blurb: "Newsroom, announcements and press resources." },
    ],
  },
  {
    title: "Businesses",
    href: "/businesses",
    blurb: "Six divisions operating as one accountable system.",
    children: [
      { title: "Mobility Distribution", href: "/businesses/mobility-distribution" },
      { title: "Mobility Asset Leasing", href: "/businesses/mobility-asset-leasing" },
      { title: "Energy Infrastructure", href: "/businesses/energy-infrastructure" },
      { title: "Lifecycle Services", href: "/businesses/lifecycle-services" },
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
      {
        title: "PositiEV Mobility",
        href: "https://positievmobility.com/",
        external: true,
        logo: "/assets/positievlogo.webp",
        blurb:
          "Distribution and leasing platform — dealer network, fleet rentals and channel partners across India.",
      },
      {
        title: "Enlite EV Care",
        href: "https://enliteev.com/",
        external: true,
        logo: "/assets/enliteev_logo-removebg-preview.png",
        blurb:
          "Service and after-sales network — maintenance, spares, roadside assistance and battery health.",
      },
      {
        title: "BikeWo VZN",
        href: "/",
        logo: "/assets/bikewo_vzn.png",
        blurb:
          "AI, wearables and connected intelligence for fleets that need to know everything, now.",
      },
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
export const PRIMARY_NAV: NavNode[] = [
  { title: "Home", href: "/" },
  ...NAV.filter((n) =>
    [
      "About BikeWo",
      "Businesses",
      "Subsidiaries",
      "Shram Sainik",
      "Sustainability",
      "Investors",
    ].includes(n.title),
  ),
];

/** Legal routes — linked from the footer, outside the main sitemap. */
export const LEGAL: NavNode[] = [
  { title: "Privacy Policy", href: "/privacy", blurb: "How we collect, use and protect your data." },
  { title: "Terms of Use", href: "/terms", blurb: "The terms that govern the use of this site." },
];

/** Flattened lookup so a placeholder page can describe itself from its path. */
export const ROUTE_INDEX: Record<string, { title: string; parent?: string; blurb?: string }> =
  [...NAV, ...LEGAL].reduce(
    (acc, node) => {
      // Hub-only entries (no dedicated page) stay out of the route index.
      if (!node.href.startsWith("http") && node.href !== "/subsidiaries") {
        acc[node.href] = { title: node.title, blurb: node.blurb };
      }
      node.children?.forEach((child) => {
        if (child.href.startsWith("http")) return;
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
