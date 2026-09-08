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
  campaignTagline: "We move goods. We move India.",
  url: "https://www.bikewo.in",
  brandEmail: "brand@bikewo.in",
  locale: "en_IN",
  description:
    "Seamless Energy. Smarter Mobility. BikeWo Green Tech Limited is building Energy & Mobility Infrastructure (EMI) to power the future of EV logistics — owning and operating the full stack across vehicles, energy, financing, service and intelligence.",
  keywords: [
    "BikeWo",
    "BikeWo Green Tech Limited",
    "Electrifying India",
    "Seamless Energy. Smarter Mobility.",
    "Energy & Mobility Infrastructure",
    "EMI",
    "EV logistics India",
    "last-mile logistics",
    "last-mile delivery India",
    "electric mobility India",
    "3PL EV fleet",
    "EV asset leasing",
    "EV distribution India",
    "EV charging infrastructure",
    "battery swapping India",
    "fleet management",
    "telematics",
    "PositiEV",
    "Enlite EV Care",
    "Ignesium Energy",
    "BikeWo VZN",
    "connected intelligence",
  ],
} as const;

export const NAV: NavNode[] = [
  {
    title: "About BikeWo",
    href: "/about",
    blurb:
      "BikeWo is building Energy & Mobility Infrastructure (EMI) to power the future of EV logistics.",
    children: [
      {
        title: "About us",
        href: "/about",
        blurb:
          "Logistics is our core. EMI is our differentiator — we move goods, we move India.",
      },
      { title: "Leadership Team", href: "/about/leadership-team" },
      {
        title: "Vision, Mission & Values",
        href: "/about#mission-vision",
        blurb:
          "To build the energy & mobility infrastructure (EMI) that moves the world.",
      },
      // { title: "ESG", href: "/about/esg" },
      { title: "Awards & Recognition", href: "/about/awards" },
      // { title: "News & media", href: "/media", blurb: "Newsroom, announcements and press resources." },
    ],
  },
  {
    title: "Businesses",
    href: "/businesses",
    blurb:
      "SiX businesses operating as one EMI platform : vehicles, energy, financing, service and sourcing.",
    children: [
      {
        title: "Mobility Distribution",
        href: "https://positievmobility.com/",
        external: true,
        blurb:
          "Through PositiEV — India’s technology-led EV distribution platform with a strong dealer and channel network.",
      },
      {
        title: "Mobility Asset Leasing",
        href: "/businesses/mobility-asset-leasing",
        blurb:
          "We own and lease EVs to gig workers, SMEs and enterprises with flexible, affordable solutions.",
      },
      {
        title: "Energy Infrastructure",
        href: "/businesses/energy-infrastructure",
        blurb:
          "Building and operating pan-India charging and battery swapping infrastructure for today and tomorrow.",
      },
      {
        title: "Lifecycle Services",
        href: "/businesses/lifecycle-services",
        blurb:
          "Through Enlite EV Care — end-to-end maintenance, spare parts, roadside assistance and battery care.",
      },
      {
        title: "Global Sourcing & Supply Chain",
        href: "/businesses/global-sourcing-supply-chain",
        blurb:
          "Global partnerships and supply chain excellence that deliver quality, scale and cost leadership.",
      },
    ],
  },
  {
    title: "Subsidiaries",
    href: "/subsidiaries",
    blurb: "The BikeWo Mobility Group — companies that carry the masterbrand forward.",
    children: [
      {
        title: "PositiEV Mobility",
        href: "https://positievmobility.com/",
        external: true,
        logo: "/assets/positievlogo.webp",
        blurb:
          "EV asset distribution, financing and leasing solutions for businesses and fleet operators.",
      },
      {
        title: "Enlite EV Care",
        href: "https://enliteev.com/",
        external: true,
        logo: "/assets/enliteev_logo-removebg-preview.png",
        blurb:
          "End-to-end EV lifecycle and maintenance services to ensure uptime, performance and safety.",
      },
      {
        title: "Ignesium Energy",
        href: "/coming-soon",
        blurb:
          "Energy infrastructure and solutions powering clean mobility at scale.",
      },
      {
        title: "BikeWo VZN",
        href: "/coming-soon",
        logo: "/assets/bikewo_vzn.png",
        blurb:
          "Connected intelligence platform for IoT, fleet and operational analytics.",
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
    blurb: "Planet-positive mobility through clean energy and responsible operations.",
  },
  {
    title: "Investors",
    href: "/investors",
    blurb: "Financial highlights, reports, governance and growth milestones.",
  },
  {
    title: "News & media",
    href: "/media",
    blurb: "Newsroom, announcements and press resources from BikeWo Green Tech Limited.",
  },
  {
    title: "Careers",
    href: "/careers",
    blurb: "Build the energy and mobility infrastructure that moves India.",
  },
  {
    title: "Contact",
    href: "/contact",
    blurb:
      "Talk to the team that owns distribution, leasing, energy, service, sourcing or intelligence.",
  },
];

/** Primary nav shown in the header — the rest live in the footer. */
export const PRIMARY_NAV: NavNode[] = [
  { title: "Home", href: "/" },
  ...NAV.filter((n) =>
    [
      "About BikeWo",
      "Businesses",
      // "Subsidiaries",
      // "Shram Sainik",
      // "Sustainability",
      "Investors",
      "News & media",
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
