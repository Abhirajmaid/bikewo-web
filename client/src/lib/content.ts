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
    "Aviation Services",
    "Global Sourcing",
    "Connected Intelligence",
  ],
};

/* --------------------------------------------------- 5.2 BikeWo at a Glance */

export const GLANCE = [
  { value: 7, suffix: "", label: "Business divisions" },
  { value: 100, suffix: "M+", label: "Kilometres electrified" },
  { value: 10000, suffix: "+", label: "Partners & innovators" },
  { value: 2.5, suffix: "Mn+", label: "Tonnes CO₂ avoided p.a." },
];

/* ------------------------------------------ 5.3 Interactive EMI Ecosystem */

export type EcosystemNode = {
  id: string;
  index: string;
  title: string;
  short: string;
  detail: string;
  stat: { value: string; label: string };
  href: string;
  /** Position on the orbit, in degrees clockwise from 12 o'clock. */
  angle: number;
};

export const ECOSYSTEM: EcosystemNode[] = [
  {
    id: "distribution",
    index: "01",
    title: "Mobility Distribution",
    short: "Vehicles, dealers and channel",
    detail:
      "Electric two- and three-wheelers sold through the PositiEV dealer network, with demand planning that keeps stock where riders actually are.",
    stat: { value: "10,000+", label: "Channel partners" },
    href: "/businesses/mobility-distribution",
    angle: 0,
  },
  {
    id: "leasing",
    index: "02",
    title: "Mobility Asset Leasing",
    short: "Fleet finance and rentals",
    detail:
      "Asset leasing and fleet rentals that move the vehicle off the operator's balance sheet and put the cost per kilometre under control.",
    stat: { value: "₹0", label: "Down payment options" },
    href: "/businesses/mobility-asset-leasing",
    angle: 51.4,
  },
  {
    id: "energy",
    index: "03",
    title: "Energy Infrastructure",
    short: "Charging networks",
    detail:
      "Fast-charging networks across highways, housing societies and commercial hubs — built to grid standards, monitored around the clock.",
    stat: { value: "45 min", label: "Typical fast charge" },
    href: "/businesses/energy-infrastructure",
    angle: 102.8,
  },
  {
    id: "lifecycle",
    index: "04",
    title: "Lifecycle Services",
    short: "Service and after-sales",
    detail:
      "Enlite EV Care handles maintenance, spare parts, roadside assistance and battery health for the full life of the vehicle.",
    stat: { value: "400+", label: "Trained technicians" },
    href: "/businesses/lifecycle-services",
    angle: 154.3,
  },
  {
    id: "aviation",
    index: "05",
    title: "Aviation Services",
    short: "Drone and air logistics",
    detail:
      "Unmanned cargo and survey aviation for terrain where road logistics stop being economical.",
    stat: { value: "3", label: "Operating corridors" },
    href: "/businesses/aviation-services",
    angle: 205.7,
  },
  {
    id: "sourcing",
    index: "06",
    title: "Global Sourcing & Supply Chain",
    short: "Components and logistics",
    detail:
      "Component sourcing, cell procurement and warehousing that keep the rest of the value chain supplied and priced predictably.",
    stat: { value: "12", label: "Sourcing geographies" },
    href: "/businesses/global-sourcing-supply-chain",
    angle: 257.1,
  },
  {
    id: "vzn",
    index: "07",
    title: "BikeWo VZN",
    short: "Connected intelligence",
    detail:
      "Telematics, wearables and fleet intelligence — the data layer that tells an operator what every vehicle and battery is doing right now.",
    stat: { value: "24×7", label: "Fleet telemetry" },
    href: "/businesses/bikewo-vzn",
    angle: 308.6,
  },
];

/* ------------------------------------------------- 5.4 Business Divisions */

export const DIVISIONS = [
  {
    index: "01",
    title: "Mobility Distribution",
    copy: "Electric two- and three-wheelers, sold and delivered through a pan-India dealer network.",
    image: "/assets/div-distribution.png",
    href: "/businesses/mobility-distribution",
  },
  {
    index: "02",
    title: "Mobility Asset Leasing",
    copy: "Fleet rentals and asset leasing that put cost per kilometre under the operator's control.",
    image: "/assets/div-leasing.png",
    href: "/businesses/mobility-asset-leasing",
  },
  {
    index: "03",
    title: "Energy Infrastructure",
    copy: "Fast-charging networks across highways, societies and commercial hubs.",
    image: "/assets/div-energy.png",
    href: "/businesses/energy-infrastructure",
  },
  {
    index: "04",
    title: "Lifecycle Services",
    copy: "Maintenance, spare parts, roadside assistance and battery health, for the life of the vehicle.",
    image: "/assets/div-lifecycle.png",
    href: "/businesses/lifecycle-services",
  },
  {
    index: "05",
    title: "Aviation Services",
    copy: "Unmanned cargo and survey aviation where road logistics stop being economical.",
    image: "/assets/div-aviation.png",
    href: "/businesses/aviation-services",
  },
  {
    index: "06",
    title: "Global Sourcing & Supply Chain",
    copy: "Component sourcing, cell procurement and warehousing that keep the chain supplied.",
    image: "/assets/div-sourcing.png",
    href: "/businesses/global-sourcing-supply-chain",
  },
  {
    index: "07",
    title: "BikeWo VZN",
    copy: "Telematics, wearables and fleet intelligence — the data layer under the whole ecosystem.",
    image: "/assets/div-vzn.png",
    href: "/businesses/bikewo-vzn",
  },
];

/* ------------------------------------------------------- 5.5 Subsidiaries */

export const SUBSIDIARIES = [
  {
    name: "PositiEV Mobility",
    kind: "Subsidiary",
    copy: "Distribution and leasing platform — dealer network, fleet rentals and channel partners.",
    points: ["Dealer & channel network", "Fleet rentals", "Demand planning"],
    href: "/subsidiaries/positiev-mobility",
    accent: "green" as const,
  },
  {
    name: "Enlite EV Care",
    kind: "Subsidiary",
    copy: "Service and after-sales network — maintenance, spares, roadside assistance and battery health.",
    points: ["400+ technicians", "Roadside assistance", "Battery second-life"],
    href: "/subsidiaries/enlite-ev-care",
    accent: "cyan" as const,
  },
  {
    name: "BikeWo VZN",
    kind: "Subsidiary",
    copy: "AI, wearables and connected intelligence for fleets that need to know everything, now.",
    points: ["Fleet telematics", "Rider wearables", "Predictive maintenance"],
    href: "/subsidiaries/bikewo-vzn",
    accent: "violet" as const,
  },
  {
    name: "Future Companies",
    kind: "Expandable",
    copy: "New ventures join under the same endorsement rule: the masterbrand always leads.",
    points: ["Branded house", "Endorsed marks", "One accountable system"],
    href: "/subsidiaries/future-companies",
    accent: "muted" as const,
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
  eyebrow: "Sustainability & ESG",
  title: "Net zero is a commitment we measure, not a claim we make.",
  lede: "Every number we publish is traceable to a source. Here is where we are today.",
  metrics: [
    { label: "Tonnes CO₂ avoided p.a.", value: "2.5 Mn+", progress: 72 },
    { label: "Kilometres electrified", value: "100 Mn+", progress: 64 },
    { label: "Battery packs into second life", value: "18,400", progress: 41 },
    { label: "Renewable share of charge energy", value: "38%", progress: 38 },
  ],
  commitments: [
    { title: "Net Zero", copy: "Operational net-zero pathway with annual public ESG reporting." },
    { title: "Circularity", copy: "Battery second-life and end-of-life recovery through Enlite." },
    { title: "Livelihoods", copy: "Driver-partner income with dignity, at national scale." },
    { title: "Transparency", copy: "No estimates presented as facts. Ever." },
  ],
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
  lede: "Seven divisions, one integrated value chain, and a net-zero pathway we report against every year.",
  highlights: [
    { label: "Business divisions", value: "7" },
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
  lede: "We are honest about the scale of the challenge. Seven divisions, pan-India, and a grid that has to work every single day.",
  roles: [
    { title: "Charging Network Engineer", location: "Pune", type: "Full-time" },
    { title: "Fleet Data Scientist — VZN", location: "Bengaluru", type: "Full-time" },
    { title: "Regional Service Manager", location: "Lucknow", type: "Full-time" },
    { title: "Channel Development Lead", location: "Ahmedabad", type: "Full-time" },
  ],
};
