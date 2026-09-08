/**
 * About BikeWo page content.
 *
 * Copy follows brand tone: specific numbers, short sentences, benefit first.
 * Figures mirror homepage estimates — see STATS_FOOTNOTE in content.ts.
 */

import {
  BoltIcon,
  BuildingIcon,
  LeafIcon,
  PeopleIcon,
} from "@/components/brand/Icons";

/* ------------------------------------------------------------------ Hero */

export const ABOUT_HERO = {
  eyebrow: "About BikeWo",
  title: "Dedicated to electrifying India.",
  imageCard: {
    src: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    alt: "Fleet of BikeWo electric three-wheelers at a branded facility with EV charging stations.",
    overlay: "Empowering every rider through integrated infrastructure.",
  },
  stats: [
    { value: 6, suffix: "", label: "Business divisions" },
    { value: 100, suffix: "M+", label: "Kilometres electrified" },
    { value: 10000, suffix: "+", label: "Partners nationwide" },
  ],
  pillars: [
    {
      icon: BuildingIcon,
      title: "Our mission",
      copy: "Build the energy and mobility infrastructure India runs on — vehicle, charge and service under one roof.",
    },
    {
      icon: BoltIcon,
      title: "Integrated ecosystem",
      copy: "Six divisions hand off without the customer noticing a seam. One company, one accountable chain.",
    },
    {
      icon: LeafIcon,
      title: "Measured impact",
      copy: "Every emissions figure we publish is traceable to a source. Net zero is a commitment we report against.",
    },
    {
      icon: PeopleIcon,
      title: "People first",
      copy: "From driver-partners to fleet operators — we design for the person who depends on the vehicle every day.",
    },
  ],
};

/* ------------------------------------------------------------- Timeline */

export const ABOUT_TIMELINE = {
  eyebrow: "Our journey",
  title: "Timeline & history",
  cta: { label: "Join the movement", href: "/contact" },
  milestones: [
    {
      year: "2018",
      title: "BikeWo founded",
      copy: "Started with a single conviction: going electric should be the easy choice for every rider in India.",
    },
    {
      year: "2020",
      title: "First charge corridor",
      copy: "Highway fast-charging went live between three states — the first link in a pan-India energy network.",
    },
    {
      year: "2022",
      title: "Six divisions integrated",
      copy: "Distribution, leasing, energy, service, sourcing and intelligence merged under one masterbrand.",
    },
    {
      year: "2026",
      title: "100M+ km electrified",
      copy: "Clean kilometres delivered across fleets, riders and city routes under the integrated ecosystem.",
    },
  ],
};

/* ---------------------------------------------------------------- Impact */

export const ABOUT_IMPACT = {
  stats: [
    { value: "2.5 Mn+", label: "Tonnes CO₂ avoided p.a." },
    { value: "10,000+", label: "Channel partners" },
    { value: "18,400", label: "Battery packs into second life" },
    { value: "6", label: "Operating divisions" },
  ],
  heading: "Boosting every rider's future opportunities",
  cta: { label: "Read our ESG report", href: "/about/esg" },
  body: [
    "BikeWo delivers energy and mobility infrastructure, helping riders, fleets and cities transition to clean, reliable power with an integrated ecosystem and expert support nationwide.",
    "We run the full value chain — from the vehicle you buy to the charge you take and the service you rely on. That integration is what makes electrification practical at scale.",
  ],
  partners: [
    "PositiEV Mobility",
    "Enlite EV Care",
    "BikeWo VZN",
    "PositiEV",
    "Enlite",
    "VZN",
  ],
};

/* --------------------------------------------------------------- Belief */

export const ABOUT_BELIEF = {
  eyebrow: "We believe sustainable energy",
  title:
    "At BikeWo, we believe sustainable energy powers a better future. We make clean power accessible and help communities choose greener, smarter solutions.",
  cards: [
    {
      tag: "Shaping a sustainable future",
      title: "Our Vision for Tomorrow",
      cta: "Explore More",
      href: "/about/esg",
      image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
      dot: "#2AB77C",
    },
    {
      tag: "Greener tomorrow",
      title: "Our Mission in Action",
      cta: "Explore More",
      href: "/businesses",
      image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
      dot: "#FFFFFF",
    },
  ],
};

/* ------------------------------------------------------- Mission & vision */

export const ABOUT_MISSION_VISION = {
  title: "Mission & vision",
  ribbon: "Seamless energy. Smarter mobility.",
  badge: "One company — from the vehicle you buy to the charge you take and the service you rely on.",
  quote:
    "Going electric should be the easy choice. We build everything it takes to make it easy — vehicle, charge and service under one accountable roof.",
  card: {
    copy: "Our mission is to build India's integrated energy and mobility infrastructure. Our vision is a country where clean power and reliable mobility are the default, not the exception.",
  },
  cta: { label: "Get in touch", href: "/contact" },
};

/* ------------------------------------------------------------------- FAQ */

export const ABOUT_FAQ = {
  title: "General frequently asked questions",
  items: [
    {
      question: "What does BikeWo do?",
      answer:
        "BikeWo Green Tech Limited builds India's integrated energy and mobility infrastructure — electric vehicles, charging networks, fleet leasing, lifecycle services, supply chain and connected intelligence under one masterbrand.",
    },
    {
      question: "How is BikeWo different from a typical EV company?",
      answer:
        "We run six divisions as one accountable system. A rider or fleet operator gets the vehicle, the charge, the service and the data layer from the same company — no hand-offs between unrelated vendors.",
    },
    {
      question: "Where does BikeWo operate?",
      answer:
        "We operate pan-India through our dealer network, charge hubs, service centres and driver-partner programme.",
    },
    {
      question: "How can I partner with BikeWo?",
      answer:
        "Dealers, fleet operators, charge-point hosts and technology partners can reach us through the contact page. We route every enquiry to the division that owns it.",
    },
    {
      question: "What is the Shram Sainik programme?",
      answer:
        "Shram Sainik is our driver-partner programme — zero joining fee, weekly payouts, insurance, training and 24×7 support. It makes the driver a stakeholder, not a line item.",
    },
    {
      question: "How does BikeWo report on sustainability?",
      answer:
        "We publish annual ESG reporting with traceable figures. Every emissions and impact number on this site links back to a documented source — see our ESG section for the latest report.",
    },
  ],
};

/* ------------------------------------------------------------------- News */

export const ABOUT_NEWS = [
  {
    tag: "Energy Infrastructure",
    title: "Charge hub network crosses its next corridor milestone",
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    href: "/media/charge-hub-corridor-milestone",
  },
  {
    tag: "Shram Sainik",
    title: "Training academy expands to five new cities",
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
    href: "/media/training-academy-expansion",
  },
  {
    tag: "BikeWo VZN",
    title: "Predictive maintenance moves from pilot to fleet-wide",
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    href: "/media/predictive-maintenance-fleet-wide",
  },
];

/* -------------------------------------------------------- Leadership team */

const LEADERSHIP_SOCIAL = {
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
} as const;

export const LEADERSHIP_DIVISION_FILTERS = [
  { slug: "all", label: "All" },
  { slug: "mobility-distribution", label: "Mobility distribution" },
  { slug: "mobility-asset-leasing", label: "Mobility asset leasing" },
  { slug: "energy-infrastructure", label: "Energy infrastructure" },
  { slug: "lifecycle-services", label: "Lifecycle services" },
  { slug: "global-sourcing-supply-chain", label: "Global sourcing" },
  { slug: "bikewo-vzn", label: "BikeWo VZN" },
] as const;

export type LeadershipDivisionFilter =
  (typeof LEADERSHIP_DIVISION_FILTERS)[number]["slug"];

export const LEADERSHIP = {
  eyebrow: "Our team",
  title: "Meet our expert team",
  lede: "Six divisions, one integrated value chain — each led by operators who report against measurable outcomes, not slogans.",
  members: [
    {
      name: "Rajesh Mehta",
      role: "Chief Executive Officer",
      department: "Executive",
      division: "executive",
      bio: "Sets company direction across all six divisions and holds the masterbrand to a single net-zero pathway.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Priya Sharma",
      role: "Chief Operating Officer",
      department: "Operations",
      division: "operations",
      bio: "Runs pan-India operations — dealer network, charge hubs and service centres as one accountable system.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Sneha Reddy",
      role: "VP, Shram Sainik",
      department: "Mobility",
      division: "mobility-distribution",
      bio: "Owns the driver-partner programme — recruitment, training, payouts and welfare across five regions.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Vikram Joshi",
      role: "Head of Asset Leasing",
      department: "Leasing",
      division: "mobility-asset-leasing",
      bio: "Runs fleet rentals and lease programmes — cost per kilometre under the operator's control.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Arun Patel",
      role: "Head of Energy Infrastructure",
      department: "Energy",
      division: "energy-infrastructure",
      bio: "Leads the charge network build-out — corridor planning, uptime standards and grid integration.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Meera Nair",
      role: "Head of Lifecycle Services",
      department: "Lifecycle",
      division: "lifecycle-services",
      bio: "Owns maintenance, spares, roadside assistance and battery health across the service network.",
      image:
        "https://images.unsplash.com/photo-1594744803329-e58b31de8db5?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Karan Singh",
      role: "Head of Global Sourcing",
      department: "Sourcing",
      division: "global-sourcing-supply-chain",
      bio: "Leads component sourcing, cell procurement and warehousing across the supply chain.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
    {
      name: "Ananya Iyer",
      role: "Head of BikeWo VZN",
      department: "Intelligence",
      division: "bikewo-vzn",
      bio: "Runs telematics, wearables and fleet intelligence — the data layer under the ecosystem.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop&crop=face",
      social: LEADERSHIP_SOCIAL,
    },
  ],
};

/* ------------------------------------------------------------------- ESG */

export const ABOUT_ESG = {
  eyebrow: "Environmental, social & governance",
  title: "Net zero is a commitment we measure, not a claim we make.",
  lede: "Every number we publish is traceable to a source. We report annually against emissions, recovery and governance standards.",
  metrics: [
    {
      label: "Tonnes CO₂ avoided p.a.",
      value: "2.5 Mn+",
      detail: "Emissions avoided annually through electrified kilometres across BikeWo's mobility network.",
    },
    {
      label: "Kilometres electrified",
      value: "100 Mn+",
      detail: "Clean kilometres delivered on India's roads through lease, charge and service.",
    },
    {
      label: "Battery packs into second life",
      value: "18,400",
      detail: "Packs recovered into second-life and end-of-life pathways through Enlite.",
    },
  ],
  pillars: [
    {
      title: "Environmental",
      copy: "Electrified kilometres, charge-hub efficiency and battery recovery — measured and published every year.",
    },
    {
      title: "Social",
      copy: "Shram Sainik driver-partners, dealer livelihoods and training academies in regional languages.",
    },
    {
      title: "Governance",
      copy: "Board oversight, divisional P&L accountability and annual reporting aligned with investor standards.",
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
      copy: "Recognised for pan-India charge corridor build-out and 99.2% network uptime.",
    },
    {
      year: "2024",
      title: "Best Integrated Mobility Ecosystem",
      issuer: "Green Tech Summit",
      copy: "Awarded for six-division integration — vehicle, charge, service and intelligence under one roof.",
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
      copy: "Annual report recognised for traceable emissions data and second-life battery recovery metrics.",
    },
  ],
};
