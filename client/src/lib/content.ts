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
  "Figures are company estimates for FY25-26 and are pending audit. Range, charge time and savings figures are stated under test conditions.";

/* -------------------------------------------------------------- 5.1 Hero */

export const HERO = {
  titleLines: ["Building India's Energy &", "Mobility Infrastructure."],
  lede: "One company — from the vehicle you buy to the charge you take and the service you rely on.",
  primaryCta: { label: "Explore Ecosystem", href: "#ecosystem" },
  secondaryCta: { label: "Watch Our Story", href: "/about/our-story" },
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
  lead: "BikeWo delivers energy and mobility infrastructure, helping riders, fleets and cities transition to",
  rest: "clean, reliable power with an integrated ecosystem and expert support nationwide.",
  cta: { label: "Read more about us", href: "/about/our-story" },
  image: {
    src: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    alt: "Fleet of BikeWo electric three-wheelers parked at a branded facility with EV charging stations.",
  },
  stats: [
    {
      value: 6,
      suffix: "",
      label: "Business divisions",
      detail:
        "Operating arms spanning vehicles, leasing, energy, service, sourcing and intelligence.",
    },
    {
      value: 100,
      suffix: "M+",
      label: "Kilometres electrified",
      detail:
        "Clean mobility delivered across fleets, riders and city routes under one ecosystem.",
    },
    {
      value: 10000,
      suffix: "+",
      label: "Partners & innovators",
      detail:
        "Dealers, operators and technology partners building the channel together.",
    },
    {
      value: 2.5,
      suffix: "Mn+",
      label: "Tonnes CO₂ avoided p.a.",
      detail:
        "Estimated annual emissions avoided through electrified kilometres on Indian roads.",
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
      "Electric two- and three-wheelers through the bikeWo dealer network — stock where riders actually are.",
    href: "/businesses/mobility-distribution",
    angle: 0,
  },
  {
    id: "leasing",
    title: "Mobility Asset Leasing",
    short: "Leasing",
    detail:
      "Fleet rentals and asset leasing that put cost per kilometre under the operator's control.",
    href: "/businesses/mobility-asset-leasing",
    angle: 60,
  },
  {
    id: "energy",
    title: "Energy Infrastructure",
    short: "Charging",
    detail:
      "Fast-charging across highways, societies and commercial hubs — monitored around the clock.",
    href: "/businesses/energy-infrastructure",
    angle: 120,
  },
  {
    id: "lifecycle",
    title: "Lifecycle Services",
    short: "Service",
    detail:
      "Maintenance, spare parts, roadside assistance and battery health for the life of the vehicle.",
    href: "/businesses/lifecycle-services",
    angle: 180,
  },
  {
    id: "sourcing",
    title: "Global Sourcing",
    short: "Supply",
    detail:
      "Component sourcing and warehousing that keep the value chain supplied and priced predictably.",
    href: "/businesses/global-sourcing-supply-chain",
    angle: 240,
  },
  {
    id: "vzn",
    title: "BikeWo VZN",
    short: "Intelligence",
    detail:
      "Telematics and fleet intelligence — what every vehicle and battery is doing, right now.",
    href: "/businesses/bikewo-vzn",
    angle: 300,
  },
];

/* ------------------------------------------------- 5.4 Business Divisions */

export const DIVISIONS = [
  {
    index: "01",
    title: "Mobility Distribution",
    copy: "Electric two- and three-wheelers, sold and delivered through a pan-India dealer network.",
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    href: "/businesses/mobility-distribution",
  },
  {
    index: "02",
    title: "Mobility Asset Leasing",
    copy: "Fleet rentals and asset leasing that put cost per kilometre under the operator's control.",
    image: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    href: "/businesses/mobility-asset-leasing",
  },
  {
    index: "03",
    title: "Energy Infrastructure",
    copy: "Fast-charging networks across highways, societies and commercial hubs.",
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    href: "/businesses/energy-infrastructure",
  },
  {
    index: "04",
    title: "Lifecycle Services",
    copy: "Maintenance, spare parts, roadside assistance and battery health, for the life of the vehicle.",
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
    href: "/businesses/lifecycle-services",
  },
  {
    index: "05",
    title: "Global Sourcing & Supply Chain",
    copy: "Component sourcing, cell procurement and warehousing that keep the chain supplied.",
    image: "/assets/div-sourcing.png",
    href: "/businesses/global-sourcing-supply-chain",
  },
  {
    index: "06",
    title: "BikeWo VZN",
    copy: "Telematics, wearables and fleet intelligence — the data layer under the whole ecosystem.",
    image: "/assets/div-vzn.png",
    href: "/businesses/bikewo-vzn",
  },
];

/* ------------------------------------------------------- 5.5 Subsidiaries */

export const SUBSIDIARIES = [
  {
    index: "01",
    name: "PositiEV Mobility",
    kind: "Subsidiary",
    copy: "Distribution and leasing platform — dealer network, fleet rentals and channel partners.",
    cta: "Explore",
    href: "/subsidiaries/positiev-mobility",
    variant: "dark" as const,
  },
  {
    index: "02",
    name: "Enlite EV Care",
    kind: "Subsidiary",
    copy: "Service and after-sales network maintenance, spares, roadside assistance and battery health.",
    cta: "Explore",
    href: "/subsidiaries/enlite-ev-care",
    variant: "accent" as const,
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
  },
  {
    index: "03",
    name: "BikeWo VZN",
    kind: "Subsidiary",
    copy: "AI, wearables and connected intelligence for fleets that need to know everything, now.",
    cta: "Explore",
    href: "/subsidiaries/bikewo-vzn",
    variant: "photo" as const,
    image: "/assets/div-vzn.png",
  },
  {
    index: "04",
    name: "Future Companies",
    kind: "Expandable",
    copy: "New ventures join under the same endorsement rule: the masterbrand always leads.",
    cta: "Learn more",
    href: "/subsidiaries/future-companies",
    variant: "muted" as const,
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
  eyebrow: "Global Impact",
  title:
    "Net zero is a commitment we measure, not a claim we make — every number we publish is traceable to a source.",
  metrics: [
    {
      label: "Tonnes CO₂ avoided p.a.",
      value: "2.5 Mn+",
      detail:
        "Emissions avoided annually through electrified kilometres across BikeWo’s mobility network.",
    },
    {
      label: "Kilometres electrified",
      value: "100 Mn+",
      detail:
        "Clean kilometres delivered on India’s roads through lease, charge and service.",
    },
    {
      label: "Battery packs into second life",
      value: "18,400",
      detail:
        "Packs recovered into second-life and end-of-life pathways through Enlite.",
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
      "We moved 60 vehicles onto lease and the cost per kilometre finally became something I could forecast.",
    name: "Placeholder — fleet operator",
    role: "Fleet operator, Pune",
    avatar: "/assets/story-1.png",
  },
  {
    quote:
      "Service used to be the reason customers hesitated. Now Enlite handles it and the conversation is about range, not repairs.",
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
  title: "An infrastructure business, reported like one.",
  lede: "Six divisions, one integrated value chain, and a net-zero pathway we report against every year.",
  highlights: [
    { label: "Business divisions", value: "6" },
    { label: "Subsidiaries", value: "3" },
    { label: "Channel partners", value: "10,000+" },
    { label: "ESG reporting", value: "Annual" },
  ],
  links: [
    { label: "Annual reports", href: "/investors" },
    { label: "Quarterly presentations", href: "/investors" },
    { label: "Corporate governance", href: "/about/corporate-governance" },
  ],
};

/* --------------------------------------------------- 5.10 News & Insights */

export const NEWS = [
  {
    tag: "Energy Infrastructure",
    date: "2026-07-22",
    title: "Charge hub network crosses its next corridor milestone",
    copy: "The highway corridor build-out adds fast-charging capacity between three states.",
    href: "/media",
  },
  {
    tag: "Shram Sainik",
    date: "2026-06-30",
    title: "Training academy expands to five new cities",
    copy: "Road safety, battery handling and customer service, delivered in regional languages.",
    href: "/media",
  },
  {
    tag: "BikeWo VZN",
    date: "2026-06-11",
    title: "Predictive maintenance moves from pilot to fleet-wide",
    copy: "Telemetry now flags battery degradation before it becomes an unplanned workshop visit.",
    href: "/media",
  },
];

/* ------------------------------------------------------------ 5.11 Careers */

export const CAREERS = {
  eyebrow: "Careers",
  title: "Build the infrastructure India runs on.",
  lede: "We are honest about the scale of the challenge. Six divisions, pan-India, and a grid that has to work every single day.",
  roles: [
    { title: "Charging Network Engineer", location: "Pune", type: "Full-time" },
    { title: "Fleet Data Scientist — VZN", location: "Bengaluru", type: "Full-time" },
    { title: "Regional Service Manager", location: "Lucknow", type: "Full-time" },
    { title: "Channel Development Lead", location: "Ahmedabad", type: "Full-time" },
  ],
};
