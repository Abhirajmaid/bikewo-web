/**
 * Homepage content — WRS v3.0 §5 Homepage Flow.
 *
 * Copy follows the brand tone of voice: specific numbers, short sentences,
 * benefit first, active voice. No buzzwords, no hype stacking, no superlatives.
 *
 * NOTE ON FIGURES: every published number must be traceable to a source
 * (Brand Guidelines 01.4, Claims discipline). The figures below are carried
 * over from the brand book; performance claims still need their qualifying
 * footnote before this page goes live. See `STATS_FOOTNOTE`.
 */

export const STATS_FOOTNOTE =
  "Market figures cite Mordor Intelligence (India Last Mile Delivery Market, Aug 2026) and BikeWo strategic estimates. They are not current BikeWo operating results.";

/* -------------------------------------------------------------- 5.1 Hero */

export const HERO = {
  titleLines: ["Seamless Energy.", "Smarter Mobility."],
  lede: "Building the energy and mobility infrastructure that moves India — and scales globally.",
  primaryCta: { label: "Explore Ecosystem", href: "#ecosystem" },
  secondaryCta: { label: "About us", href: "/about" },
  marquee: [
    "Mobility Distribution",
    "Asset Leasing",
    "Energy Infrastructure",
    "Lifecycle Services",
    "Global Sourcing",
    "Connected Intelligence",
  ],
};

/* --------------------------------------------------- 5.2 BikeWo at a Glance */

export const GLANCE = {
  badge: "About us",
  lead: "BikeWo aims to own and operate the fullstack infrastructure enabling electric mobility at scale",
  rest: "across vehicles, energy, financing support, lifecycle services and intelligence. Logistics is our core. EMI is our differentiator.",
  cta: { label: "Read more about us", href: "/about" },
  image: {
    src: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    alt: "Fleet of BikeWo electric three-wheelers parked at a branded facility with EV charging stations.",
  },
  stats: [
    {
      value: 5,
      suffix: "",
      label: "EMI platform layers",
      detail:
        "Mobility assets, energy, financing support, lifecycle services and VZN intelligence.",
    },
    {
      value: 2500,
      suffix: "–3,000 Cr",
      label: "SOM estimate",
      detail:
        "BikeWo estimate of serviceable obtainable market in tech-enabled last mile.",
    },
    {
      value: 12.7,
      suffix: "%",
      label: "Market CAGR 2026–31",
      detail:
        "India last-mile delivery market growth outlook (Mordor Intelligence).",
    },
    {
      value: 14.3,
      suffix: "%",
      label: "Same-day delivery CAGR",
      detail:
        "Through 2031 — demand that needs reliable, asset-light EV capacity.",
    },
  ],
};

/* ------------------------------------------ 5.3 Interactive EMI Ecosystem */

export type EcosystemNode = {
  id: string;
  title: string;
  short: string;
  detail: string;
  href: string;
  /** Position on the orbit, in degrees clockwise from 12 o'clock. */
  angle: number;
};

export const ECOSYSTEM: EcosystemNode[] = [
  {
    id: "distribution",
    title: "Mobility Distribution",
    short: "Vehicles",
    detail:
      "Vehicle sourcing and distribution through PositiEV — a technology-led EV channel for dealers and fleets.",
    href: "/businesses/mobility-distribution",
    angle: 0,
  },
  {
    id: "leasing",
    title: "Mobility Asset Leasing",
    short: "Leasing",
    detail:
      "Flexible asset leasing that turns vehicle ownership into managed, on-demand fleet capacity.",
    href: "/businesses/mobility-asset-leasing",
    angle: 60,
  },
  {
    id: "energy",
    title: "Energy Infrastructure",
    short: "Charging",
    detail:
      "Charging and battery swapping infrastructure that keeps electric fleets energised and available.",
    href: "/businesses/energy-infrastructure",
    angle: 120,
  },
  {
    id: "lifecycle",
    title: "Lifecycle Services",
    short: "Service",
    detail:
      "Through Enlite EV Care — maintenance, spare parts, roadside assistance and battery care for uptime.",
    href: "/businesses/lifecycle-services",
    angle: 180,
  },
  {
    id: "sourcing",
    title: "Global Sourcing",
    short: "Supply",
    detail:
      "Global partnerships and supply-chain capability that support quality, scale and cost leadership.",
    href: "/businesses/global-sourcing-supply-chain",
    angle: 240,
  },
  {
    id: "vzn",
    title: "Connected Intelligence",
    short: "VZN",
    detail:
      "VZN — connected optimisation for safety, efficiency and smarter fleet decisions.",
    href: "/coming-soon",
    angle: 300,
  },
];

/* ------------------------------------------------- 5.4 Business Divisions */

export const DIVISIONS = [
  {
    index: "01",
    title: "Mobility Distribution",
    copy: "Vehicle sourcing and distribution through PositiEV — India’s technology-led EV channel network.",
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    href: "/businesses/mobility-distribution",
  },
  {
    index: "02",
    title: "Mobility Asset Leasing",
    copy: "Flexible leasing that turns ownership into managed, on-demand fleet capacity for logistics operators.",
    image: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    href: "/businesses/mobility-asset-leasing",
  },
  {
    index: "03",
    title: "Energy Infrastructure",
    copy: "Charging and battery swapping infrastructure that keeps electric fleets energised and available.",
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    href: "/businesses/energy-infrastructure",
  },
  {
    index: "04",
    title: "Lifecycle Services",
    copy: "Through Enlite EV Care — maintenance, spare parts, roadside assistance and battery care.",
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
    href: "/businesses/lifecycle-services",
  },
  {
    index: "05",
    title: "Global Sourcing & Supply Chain",
    copy: "Global partnerships and supply-chain capability that support quality, scale and cost leadership.",
    image: "/assets/div-sourcing.png",
    href: "/businesses/global-sourcing-supply-chain",
  },
  {
    index: "06",
    title: "Connected Intelligence",
    copy: "VZN — connected optimisation for fleet safety, efficiency and smarter operating decisions.",
    image: "/assets/div-vzn.png",
    href: "/coming-soon",
  },
];

/* ------------------------------------------------------- 5.5 Subsidiaries */

export const SUBSIDIARIES = [
  {
    index: "01",
    name: "PositiEV Mobility",
    kind: "Subsidiary",
    copy: "EV distribution, financing support and leasing — access to mobility assets for fleets and operators.",
    cta: "Explore",
    href: "https://positievmobility.com/",
    external: true,
    logo: "/assets/positievlogo.webp",
    variant: "dark" as const,
  },
  {
    index: "02",
    name: "Enlite EV Care",
    kind: "Subsidiary",
    copy: "Lifecycle services — maintenance, spares and battery care that protect uptime and performance.",
    cta: "Explore",
    href: "https://enliteev.com/",
    external: true,
    logo: "/assets/enliteev_logo-removebg-preview.png",
    variant: "accent" as const,
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
  },
  {
    index: "03",
    name: "Ignesium Energy",
    kind: "Subsidiary",
    copy: "Energy infrastructure — charging and power solutions for electric mobility at scale.",
    cta: "Explore",
    href: "/coming-soon",
    variant: "accent" as const,
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
  },
  {
    index: "04",
    name: "BikeWo VZN",
    kind: "Subsidiary",
    copy: "Connected intelligence — telematics and operational analytics for safer, smarter fleets.",
    cta: "Explore",
    href: "/coming-soon",
    logo: "/assets/bikewo_vzn.png",
    variant: "photo" as const,
    image: "/assets/div-vzn.png",
  },
];

/* ------------------------------------------------------- 5.6 Shram Sainik */

export const SHRAM_SAINIK = {
  eyebrow: "Driver-Partner Programme",
  title: "Be your own boss. Drive your success.",
  lede: "Shram Sainik makes the driver-partner a stakeholder, not a line item. Zero joining fee, weekly payouts and a uniform built for Indian roads.",
  benefits: [
    { title: "Zero joining fee", copy: "Start earning without putting money down first." },
    { title: "Weekly payouts", copy: "Earnings settle every week, not every month." },
    { title: "Insurance & welfare", copy: "Accident and health cover for you and your family." },
    { title: "Training academy", copy: "Road safety, battery handling and customer service." },
    {
      title: "Uniform & safety",
      copy: "Lightweight mesh safety jacket and peak cap, designed for the heat.",
    },
    { title: "24×7 support", copy: "A real person on the line, in your language." },
  ],
  cta: { label: "Apply to the programme", href: "/shram-sainik/apply" },
};

/* -------------------------------------------------- 5.7 Sustainability/ESG */

export const SUSTAINABILITY = {
  eyebrow: "Planet positive",
  title:
    "Enabling cleaner last-mile mobility through energy infrastructure, electrified fleets and responsible operations.",
  metrics: [
    {
      label: "Addressable SOM",
      value: "₹2,500–3,000 Cr",
      detail:
        "BikeWo estimate of serviceable obtainable market in tech-enabled urban last mile.",
      icon: "leaf" as const,
    },
    {
      label: "Market CAGR 2026–31",
      value: "12.7%",
      detail:
        "India last-mile delivery market outlook (Mordor Intelligence, Aug 2026).",
      icon: "bolt" as const,
    },
    {
      label: "EMI platform layers",
      value: "5",
      detail:
        "Mobility assets, energy, financing support, lifecycle services and connected intelligence.",
      icon: "recycle" as const,
    },
  ],
  map: {
    src: "/assets/69708ceedce86767b4924849_map-p-2000.png",
    alt: "Stylized world map showing BikeWo's global clean energy footprint.",
  },
};

/* ------------------------------------------------ 5.8 Customer Success */

/**
 * PLACEHOLDER PEOPLE — the portraits referenced here are AI-generated and the
 * names are illustrative. Per the brand kit, AI-generated people must not be
 * presented as real individuals. Replace with real, consenting subjects and
 * signed model releases before this page is published.
 */
export const STORIES = [
  {
    quote:
      "We needed mobility capacity, not more vehicles on the books. Leasing from BikeWo made cost per kilometre something I could forecast.",
    name: "Placeholder — fleet operator",
    role: "Last-mile fleet operator, Hyderabad",
    avatar: "/assets/story-1.png",
  },
  {
    quote:
      "Service used to be the reason customers hesitated. Now Enlite handles it and the conversation is about utilisation, not repairs.",
    name: "Placeholder — dealer principal",
    role: "Dealer principal, Jaipur",
    avatar: "/assets/story-2.png",
  },
  {
    quote:
      "Zero joining fee meant I could start the same week. The weekly payout is what keeps my household running.",
    name: "Placeholder — driver-partner",
    role: "Driver-partner, Lucknow",
    avatar: "/assets/story-3.png",
  },
];

/* ----------------------------------------------------------- 5.9 Investors */

export const INVESTORS = {
  eyebrow: "Investors",
  title: "NSE SME listed. Building toward Mainboard.",
  lede: "One EMI platform — logistics at the core — with public disclosures on NSE Symbol BIKEWO.",
};

/* --------------------------------------------------- 5.10 News & Insights */

export const NEWS = [
  {
    tag: "Energy Infrastructure",
    date: "2026-07-22",
    title: "Charge hub network crosses its next corridor milestone",
    copy: "The highway corridor build-out adds fast-charging capacity between three states.",
    href: "/media/charge-hub-corridor-milestone",
  },
  {
    tag: "Shram Sainik",
    date: "2026-06-30",
    title: "Training academy expands to five new cities",
    copy: "Road safety, battery handling and customer service, delivered in regional languages.",
    href: "/media/training-academy-expansion",
  },
  {
    tag: "BikeWo VZN",
    date: "2026-06-11",
    title: "Predictive maintenance moves from pilot to fleet-wide",
    copy: "Telemetry now flags battery degradation before it becomes an unplanned workshop visit.",
    href: "/media/predictive-maintenance-fleet-wide",
  },
];

/* ------------------------------------------------------------ 5.11 Careers */

export const CAREERS = {
  eyebrow: "Careers",
  title: "Build the infrastructure that moves India.",
  lede: "Last-mile logistics at the core. An EMI platform across vehicles, energy, financing, service and intelligence — built to work every day.",
  roles: [
    { title: "Charging Network Engineer", location: "Hyderabad", type: "Full-time" },
    { title: "Fleet Data Scientist — VZN", location: "Hyderabad", type: "Full-time" },
    { title: "Regional Service Manager", location: "Hyderabad", type: "Full-time" },
    { title: "Channel Development Lead", location: "Hyderabad", type: "Full-time" },
  ],
};
