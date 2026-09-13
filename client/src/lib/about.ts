/**
 * About BikeWo page content.
 *
 * Copy aligned to BikeWo Green Tech Limited Investor Presentation (Aug 2026).
 * Figures that are market estimates cite Mordor Intelligence / BikeWo estimates.
 */

import {
  BoltIcon,
  BuildingIcon,
  LeafIcon,
  PeopleIcon,
} from "@/components/brand/Icons";

/* ------------------------------------------------------------------ Hero */

type AboutStoryCard =
  | {
      kind: "solid";
      logo?: boolean;
      title: string;
      body: string[];
      cta: { label: string; href: string };
    }
  | {
      kind: "photo";
      title: string;
      image: { src: string; alt: string };
      cta: { label: string; href: string };
    };

export const ABOUT_HERO = {
  eyebrow: "About BikeWo",
  title: "Dedicated to electrifying India.",
  story: [
    {
      kind: "solid",
      logo: true,
      title: "Energy & mobility infrastructure",
      body: [
        "We aim to own and operate the full-stack infrastructure enabling electric mobility at scale — across vehicles, energy, financing support, lifecycle services and intelligence.",
        "EMI is how we build an integrated platform for electric mobility.",
      ],
      cta: { label: "Learn more", href: "/businesses" },
    },
    {
      kind: "photo",
      title: "Logistics is our core. EMI is our differentiator.",
      image: {
        src: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
        alt: "BikeWo charge hub at dusk, with electric scooters and cars at dedicated charging bays.",
      },
      cta: { label: "Learn more", href: "/businesses/energy-infrastructure" },
    },
    {
      kind: "solid",
      title: "Moving goods. Moving India forward.",
      body: [
        "A focused transition from last-mile delivery to a scalable Energy & Mobility Infrastructure platform.",
        "Building the governance, operating scale and capital base for a Mainboard pathway.",
      ],
      cta: { label: "Our journey", href: "/about#timeline" },
    },
  ] satisfies AboutStoryCard[],
  pillars: [
    {
      icon: PeopleIcon,
      title: "People centric",
      copy: "We put drivers, dealers and customers at the heart of everything we build.",
    },
    {
      icon: LeafIcon,
      title: "Planet positive",
      copy: "Enabling cleaner mobility through energy and fleet infrastructure for last-mile logistics.",
    },
    {
      icon: BuildingIcon,
      title: "Partner powered",
      copy: "We grow with dealers, operators, OEMs and technology partners.",
    },
    {
      icon: BoltIcon,
      title: "EMI differentiator",
      copy: "An integrated platform for electric mobility — not vehicle sales alone.",
    },
  ],
};

/* ------------------------------------------------------------- Timeline */

export const ABOUT_TIMELINE = {
  eyebrow: "Our journey",
  title: "Roadmap toward potential Mainboard migration",
  lede: "A focused transition from last-mile delivery to a scalable Energy & Mobility Infrastructure platform.",
  note: "Timelines are indicative management objectives and forward-looking. Actual eligibility and migration depend on applicable criteria, approvals and market conditions.",
  cta: { label: "Talk to investor relations", href: "/investors" },
  milestones: [
    {
      date: "Sep 2024",
      title: "Listed on NSE SME",
      copy: "Public-market foundation established — NSE Symbol: BIKEWO.",
    },
    {
      date: "Aug 2025",
      title: "Pivot to last-mile delivery",
      copy: "Operating focus sharpened around logistics as the core engine.",
    },
    {
      date: "Aug 2026",
      title: "Capital deployment begins",
      copy: "Energy, mobility and EV logistics — transformation underway.",
    },
    {
      date: "Dec 2026",
      title: "Growth phase",
      copy: "Growth capital deployment across the EMI platform.",
    },
    {
      date: "Sep 2027",
      title: "Mainboard pathway",
      copy: "Expected eligibility assessment — migration targeted thereafter, subject to approvals.",
    },
  ],
};

/* ---------------------------------------------------------------- Impact */

export const ABOUT_IMPACT = {
  stats: [
    { value: "₹65,000+ Cr", label: "TAM — India last-mile delivery" },
    { value: "₹2,500–3,000 Cr", label: "SOM — BikeWo estimate" },
    { value: "12.7%", label: "Market CAGR 2026–31" },
    { value: "5", label: "EMI platform layers" },
  ],
  heading: "Building the infrastructure last-mile logistics runs on",
  cta: { label: "Explore our businesses", href: "/businesses" },
  body: [
    "India’s last-mile market is expanding as e-commerce, faster delivery expectations and urban density reshape fleet demand.",
    "As delivery demand becomes faster and more variable, asset-light fleet capacity becomes essential infrastructure — that is the gap EMI is built to close.",
  ],
  partners: [
    "PositiEV Mobility",
    "Enlite EV Care",
    "Ignesium Energy",
    "BikeWo VZN",
    "PositiEV",
  ],
  source:
    "Market sizing: Mordor Intelligence, India Last Mile Delivery Market (Aug 2026). SAM and SOM are BikeWo strategic estimates.",
};

/* --------------------------------------------------------------- Belief */

export const ABOUT_BELIEF = {
  eyebrow: "Who we are",
  title:
    "We aim to own and operate the full-stack infrastructure enabling electric mobility at scale — across vehicles, energy, financing support, lifecycle services and intelligence.",
  cards: [
    {
      tag: "Vision",
      title: "EMI that moves India — and scales globally",
      cta: "Explore More",
      href: "/about#mission-vision",
      image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
      dot: "#2AB77C",
    },
    {
      tag: "Mission",
      title: "Smarter, more scalable logistics ecosystems",
      cta: "Explore More",
      href: "/businesses",
      image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
      dot: "#FFFFFF",
    },
  ],
};

/* ------------------------------------------------------- Mission & vision */

export const ABOUT_MISSION_VISION = {
  title: "Vision & mission",
  eyebrow: "Why BikeWo exists",
  vision: {
    label: "Our vision",
    copy: "Build the energy and mobility infrastructure that moves India — and scales globally.",
    tag: "EMI · Energy & Mobility Infrastructure",
  },
  mission: {
    label: "Our mission",
    copy: "Connect mobility, energy and technology to create smarter, more scalable logistics ecosystems.",
    tag: "Logistics → our core",
  },
  pillars: [
    {
      label: "Logistics",
      title: "Our core",
      copy: "Moving goods. Moving India forward.",
    },
    {
      label: "EMI",
      title: "Our differentiator",
      copy: "Integrated platform for electric mobility.",
    },
  ],
  ribbon: "Seamless energy. Smarter mobility.",
  cta: { label: "Get in touch", href: "/contact" },
};

/* -------------------------------------------------------------- Platform */

export const ABOUT_PLATFORM = {
  eyebrow: "Full-stack platform",
  title: "Building an integrated platform for electric mobility",
  lede: "Five layers — one EMI stack — designed to turn vehicle ownership into managed, on-demand fleet capacity.",
  layers: [
    {
      index: "01",
      title: "Mobility assets",
      short: "Vehicles & leasing",
      copy: "Source, distribute and lease EVs so fleets get capacity without locking capital into ownership.",
    },
    {
      index: "02",
      title: "Energy",
      short: "Charging & power",
      copy: "Charging and swapping infrastructure that keeps electric fleets energised and available.",
    },
    {
      index: "03",
      title: "Financing support",
      short: "Asset enablement",
      copy: "Access and financing support that helps operators scale fleets affordably.",
    },
    {
      index: "04",
      title: "Lifecycle services",
      short: "Maintenance & support",
      copy: "Maintenance, spares and support so uptime stays high across the asset life.",
    },
    {
      index: "05",
      title: "VZN intelligence",
      short: "Connected optimisation",
      copy: "Connected data and optimisation that make capacity reliable and fleets smarter.",
    },
  ],
};

/* ---------------------------------------------------- Problem & solution */

export const ABOUT_SOLUTION = {
  eyebrow: "The problem we solve",
  title: "Vehicle ownership can make last-mile capacity expensive, complex and inflexible",
  lede: "Fleet operators need to scale with demand — but ownership-led models lock capital into assets and operating complexity.",
  problems: [
    {
      group: "Capital constrained",
      items: [
        {
          index: "01",
          title: "High upfront capex",
          copy: "Vehicle purchases tie up working capital and limit fleet expansion.",
        },
        {
          index: "02",
          title: "Financing gap",
          copy: "Smaller operators struggle to secure competitive asset financing.",
        },
      ],
    },
    {
      group: "Operationally fragmented",
      items: [
        {
          index: "03",
          title: "Fragmented fleet ownership",
          copy: "Vehicles, drivers, maintenance and replacements are managed independently.",
        },
        {
          index: "04",
          title: "EV transition complexity",
          copy: "Financing, charging, swapping and new technology must change at once.",
        },
      ],
    },
    {
      group: "Capacity mismatched",
      items: [
        {
          index: "05",
          title: "Low asset utilisation",
          copy: "Demand fluctuations and downtime leave vehicles idle and returns diluted.",
        },
        {
          index: "06",
          title: "Unreliable availability",
          copy: "Conventional supply models struggle to deploy vehicles quickly when demand peaks.",
        },
      ],
    },
  ],
  gap: "Traditional models primarily sell vehicles. Logistics operators increasingly need reliable mobility capacity as a service.",
  model: {
    title: "How BikeWo plans to solve it",
    lede: "Turn vehicle ownership into managed, on-demand fleet capacity — source vehicles, enable financing, electrify and manage operations.",
    steps: [
      {
        index: "01",
        title: "Access & financing support",
        copy: "Vehicle sourcing · Asset leasing",
        tag: "Access · Affordable",
      },
      {
        index: "02",
        title: "Manage & energise",
        copy: "Maintenance · Charging & swapping",
        tag: "Managed · Energised",
      },
      {
        index: "03",
        title: "Deploy & optimise",
        copy: "Reliable capacity · Lifecycle intelligence",
        tag: "Reliable · Intelligent",
      },
    ],
    outcomes: [
      "Lower TCO",
      "Higher utilisation",
      "Scalable fleets",
      "Better margins",
    ],
  },
};

/* -------------------------------------------------------------- Strategy */

export const ABOUT_STRATEGY = {
  eyebrow: "Strategy",
  title: "Deepen the core, expand with discipline",
  lede: "3PL is the heart of the business — delivering scale, efficiency and lasting value. Adjacent businesses grow from that core.",
  upstream: {
    label: "Upstream → Integration",
    title: "Build deeper control across the 3PL value chain",
    items: [
      "Vehicle sourcing & distribution",
      "Financing support & asset leasing",
      "Fleet operations & driver ecosystem",
      "Maintenance, lifecycle & telematics",
      "Energy & charging for own use",
    ],
    flow: ["Scale", "Integrate (Hub)", "Improve margins", "Strengthen retention"],
  },
  downstream: {
    label: "Downstream → Diversification",
    title: "Use core capabilities to build adjacent businesses",
    items: [
      "Open energy infrastructure to third parties",
      "Aviation logistics",
      "Global sourcing & supply chain",
      "Connected intelligence / VZN",
      "New mobility & infrastructure opportunities",
    ],
  },
  operatingModel: {
    title: "Target operating model",
    steps: ["Source", "Distribute", "Enable", "Charge", "Service", "Connect"],
  },
};

/* ---------------------------------------------------------------- Market */

export const ABOUT_MARKET = {
  eyebrow: "Market opportunity",
  title: "A ₹2,500–3,000 crore addressable market within a rapidly scaling sector",
  lede: "India’s last-mile market is expanding as e-commerce, faster delivery expectations and urban density reshape fleet demand.",
  sizing: [
    {
      label: "TAM",
      value: "₹65,000+ Cr",
      detail: "India last-mile delivery",
    },
    {
      label: "SAM",
      value: "₹25,000–30,000 Cr",
      detail: "Tech-enabled urban & peri-urban last mile",
    },
    {
      label: "SOM",
      value: "₹2,500–3,000 Cr",
      detail: "Estimated serviceable obtainable market",
    },
  ],
  signals: [
    { value: "12.7%", label: "Market CAGR 2026–31" },
    { value: "69.9%", label: "B2C share 2025" },
    { value: "54.3%", label: "E-commerce share 2025" },
    { value: "14.3%", label: "Same-day delivery CAGR through 2031" },
  ],
  takeaway:
    "As delivery demand becomes faster and more variable, asset-light fleet capacity becomes essential infrastructure.",
  source:
    "Source: Mordor Intelligence, India Last Mile Delivery Market, updated Aug 2026. TAM rounded; SAM and SOM are BikeWo strategic estimates.",
};

/* ------------------------------------------------------------------- FAQ */

export const ABOUT_FAQ = {
  eyebrow: "FAQ",
  title: "Questions we get asked most.",
  lede: "Who we are, how the EMI platform works, and how to partner with us.",
  cta: { label: "Still have a question?", href: "/contact" },
  items: [
    {
      question: "What does BikeWo do?",
      answer:
        "BikeWo Green Tech Limited is building Energy & Mobility Infrastructure (EMI) — an integrated platform spanning mobility assets, energy, financing support, lifecycle services and connected intelligence — so logistics operators can scale electric fleets without owning every vehicle.",
    },
    {
      question: "How is BikeWo different from a typical logistics company?",
      answer:
        "Logistics is our core; EMI is our differentiator. We operate at the infrastructure layer — sourcing, financing, powering and managing mobility assets — so operators get reliable capacity as a service, not just another vehicle purchase.",
    },
    {
      question: "Where does BikeWo operate?",
      answer:
        "Registered office in Madhapur, Hyderabad, with a pan-India build-out through distribution, leasing, energy and service partners focused on urban and peri-urban last-mile markets.",
    },
    {
      question: "How can I partner with BikeWo?",
      answer:
        "Dealers, fleet operators, charge-point hosts, OEMs and technology partners can reach us through the contact page. We route every enquiry to the business that owns it.",
      cta: { label: "Get in touch", href: "/contact" },
    },
    {
      question: "What is the Mainboard pathway?",
      answer:
        "Listed on NSE SME (Symbol: BIKEWO) since September 2024, we are building governance, operating scale and capital toward expected Mainboard eligibility assessment around September 2027 — subject to criteria, approvals and market conditions.",
      cta: { label: "Investor centre", href: "/investors" },
    },
    {
      question: "What is the Shram Sainik programme?",
      answer:
        "Shram Sainik is our driver-partner programme — zero joining fee, weekly payouts, insurance, training and 24×7 support. It makes the driver a stakeholder, not a line item.",
      cta: { label: "Explore the programme", href: "/shram-sainik" },
    },
  ],
};

/* ------------------------------------------------------------------- News */

export const ABOUT_NEWS = [
  {
    tag: "Investors",
    title: "Investor Presentation — August 2026 filed with NSE",
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    href: "/investors",
  },
  {
    tag: "EMI Platform",
    title: "Capital deployment begins across energy, mobility and EV logistics",
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
    href: "/businesses",
  },
  {
    tag: "Strategy",
    title: "Deepen the 3PL core, expand adjacent EMI businesses with discipline",
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    href: "/about#strategy",
  },
];

/* -------------------------------------------------------- Leadership team */

export const LEADERSHIP_DIVISION_FILTERS = [
  { slug: "all", label: "All" },
  { slug: "executive", label: "Executive" },
  { slug: "mobility-distribution", label: "Mobility distribution" },
  { slug: "mobility-asset-leasing", label: "Mobility asset leasing" },
  { slug: "energy-infrastructure", label: "Energy infrastructure" },
  { slug: "lifecycle-services", label: "Lifecycle services" },
  { slug: "global-sourcing-supply-chain", label: "Global sourcing" },
  { slug: "bikewo-vzn", label: "BikeWo VZN" },
] as const;

/** Department options for CMS team members (admin form dropdown). */
export const TEAM_DEPARTMENTS = [
  "Executive",
  "Mobility distribution",
  "Mobility asset leasing",
  "Energy infrastructure",
  "Lifecycle services",
  "Global sourcing",
  "BikeWo VZN",
  "Technology",
  "Operations",
  "People & culture",
] as const;

export type LeadershipDivisionFilter =
  (typeof LEADERSHIP_DIVISION_FILTERS)[number]["slug"];

export const LEADERSHIP = {
  eyebrow: "Our team",
  title: "Meet our expert team",
  lede: "Operators building the EMI platform — from last-mile logistics at the core to energy, leasing, service and intelligence.",
};

/* ------------------------------------------------------------------- ESG */

export const ABOUT_ESG = {
  eyebrow: "Environmental, social & governance",
  title: "Planet-positive mobility through clean energy and responsible operations.",
  lede: "Listed on NSE SME, we are building governance and operating discipline alongside cleaner last-mile capacity.",
  metrics: [
    {
      label: "NSE listing",
      value: "BIKEWO",
      detail: "Listed on NSE SME since September 2024 — public-market foundation established.",
    },
    {
      label: "Platform layers",
      value: "5",
      detail: "Mobility assets, energy, financing support, lifecycle services and VZN intelligence.",
    },
    {
      label: "Addressable SOM",
      value: "₹2,500–3,000 Cr",
      detail: "BikeWo estimate of serviceable obtainable market in tech-enabled last mile.",
    },
  ],
  pillars: [
    {
      title: "Environmental",
      copy: "Electrified last-mile capacity, charging and swapping infrastructure, and cleaner fleet operations.",
    },
    {
      title: "Social",
      copy: "People-centric operations — drivers, dealers and customers at the heart of the ecosystem, including Shram Sainik.",
    },
    {
      title: "Governance",
      copy: "Board oversight and a Mainboard migration pathway built on scale, capital and regulatory readiness.",
    },
  ],
  map: {
    src: "/assets/69708ceedce86767b4924849_map-p-2000.png",
    alt: "Stylized world map showing BikeWo's clean energy footprint.",
  },
  cta: { label: "Read the sustainability overview", href: "/sustainability" },
};

/* ----------------------------------------------------------------- Awards */

export const ABOUT_AWARDS = {
  eyebrow: "Recognition",
  title: "Awards & recognition",
  lede: "Industry acknowledgement for infrastructure built to last — not campaigns built to trend.",
  items: [
    {
      year: "2025",
      title: "EV Infrastructure Company of the Year",
      issuer: "India Mobility Awards",
      copy: "Recognised for pan-India charge corridor build-out and network reliability.",
    },
    {
      year: "2024",
      title: "Best Integrated Mobility Ecosystem",
      issuer: "Green Tech Summit",
      copy: "Awarded for integrating vehicle, charge, service and intelligence under one platform.",
    },
    {
      year: "2024",
      title: "Employer of Choice — Operations",
      issuer: "Workforce India",
      copy: "Shram Sainik programme cited for weekly payouts, training and driver welfare standards.",
    },
    {
      year: "2023",
      title: "Sustainability Reporting Excellence",
      issuer: "ESG India Forum",
      copy: "Annual report recognised for transparent emissions and lifecycle recovery metrics.",
    },
  ],
};
