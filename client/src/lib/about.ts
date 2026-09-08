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
        "BikeWo is building Energy & Mobility Infrastructure (EMI) to power the future of EV logistics.",
        "We own and operate the full-stack infrastructure that enables electric mobility at scale — across vehicles, energy, financing, service and intelligence.",
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
      title: "We move goods. We move India.",
      body: [
        "We create and operate the infrastructure that makes electric mobility seamless, affordable and intelligent.",
        "By 2027 we aspire to 100 million electrified kilometres, 10,000+ partners, and 2.5 million tonnes of CO₂ avoided each year.",
      ],
      cta: { label: "Learn more", href: "/about/esg" },
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
      copy: "Enabling net-zero mobility through clean energy and responsible operations.",
    },
    {
      icon: BuildingIcon,
      title: "Partner powered",
      copy: "We grow with our partners and succeed together.",
    },
    {
      icon: BoltIcon,
      title: "EMI differentiator",
      copy: "We build the energy & mobility infrastructure behind every movement.",
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
      copy: "Started with a single conviction: going electric should be the easy choice for every rider and fleet in India.",
    },
    {
      year: "Core",
      title: "Last-mile logistics",
      copy: "3PL is the heart of the business — delivering scale, efficiency and lasting value.",
    },
    {
      year: "EMI",
      title: "Full-stack infrastructure",
      copy: "Distribution, leasing, energy, service, sourcing and intelligence integrated as one EMI platform.",
    },
    {
      year: "2027",
      title: "Growth aspirations",
      copy: "100M+ km electrified, 10,000+ partners and 2.5 Mn+ tonnes of CO₂ avoided p.a. — long-term targets on our roadmap.",
    },
  ],
};

/* ---------------------------------------------------------------- Impact */

export const ABOUT_IMPACT = {
  stats: [
    { value: "2.5 Mn+", label: "Tonnes CO₂ avoided p.a. (2027)" },
    { value: "10,000+", label: "Partners & innovators (2027)" },
    { value: "100 Mn+", label: "Kilometres electrified (2027)" },
    { value: "6", label: "Business verticals" },
  ],
  heading: "Boosting every rider's future opportunities",
  cta: { label: "Read our ESG report", href: "/about/esg" },
  body: [
    "BikeWo is building Energy & Mobility Infrastructure (EMI) to power the future of EV logistics — helping fleets, riders and cities transition to clean, reliable mobility.",
    "We run the full value chain: source, distribute, finance, charge, service and connect. That integration is what makes electrification practical at last-mile scale.",
  ],
  partners: [
    "PositiEV Mobility",
    "Enlite EV Care",
    "Ignesium Energy",
    "BikeWo VZN",
    "PositiEV",
  ],
};

/* --------------------------------------------------------------- Belief */

export const ABOUT_BELIEF = {
  eyebrow: "We believe sustainable energy",
  title:
    "At BikeWo, we believe sustainable energy powers a better future. We make clean mobility accessible and help logistics networks choose greener, smarter solutions.",
  cards: [
    {
      tag: "Vision",
      title: "To build the EMI that moves the world",
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
  ribbon: "Seamless energy. Smarter mobility.",
  badge: "Logistics is our core. EMI is our differentiator.",
  quote:
    "To build the energy & mobility infrastructure (EMI) that moves the world.",
  card: {
    copy: "To connect mobility, energy and technology to create smarter, more scalable logistics ecosystems. We move goods. We move India.",
  },
  cta: { label: "Get in touch", href: "/contact" },
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
        "BikeWo Green Tech Limited builds Energy & Mobility Infrastructure (EMI) to power the future of EV logistics — electric vehicles, charging and swapping, fleet leasing, lifecycle services, global sourcing and connected intelligence under one masterbrand.",
    },
    {
      question: "How is BikeWo different from a typical logistics company?",
      answer:
        "We operate at the infrastructure layer, not just the logistics execution layer. While others focus on delivery services, BikeWo owns, finances, powers and manages the mobility assets that make last-mile logistics possible. Logistics companies need mobility capacity — not vehicle ownership.",
    },
    {
      question: "Where does BikeWo operate?",
      answer:
        "Pan-India — through our dealer network, charge and swap infrastructure, service centres and driver ecosystem, with an initial 3PL focus in Hyderabad and expansion across urban last-mile markets.",
    },
    {
      question: "How can I partner with BikeWo?",
      answer:
        "Dealers, fleet operators, charge-point hosts, OEMs and technology partners can reach us through the contact page. We route every enquiry to the business that owns it.",
      cta: { label: "Get in touch", href: "/contact" },
    },
    {
      question: "What is the Shram Sainik programme?",
      answer:
        "Shram Sainik is our driver-partner programme — zero joining fee, weekly payouts, insurance, training and 24×7 support. It makes the driver a stakeholder, not a line item.",
      cta: { label: "Explore the programme", href: "/shram-sainik" },
    },
    {
      question: "How does BikeWo report on sustainability?",
      answer:
        "We publish annual ESG reporting with traceable figures. Growth targets on this site — including 2027 aspirations for electrified kilometres and CO₂ avoided — are labelled as such and will be reported against.",
      cta: { label: "Read the ESG overview", href: "/about/esg" },
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
  title: "Planet-positive mobility through clean energy and responsible operations.",
  lede: "2027 impact figures on this site are growth aspirations. We will report annually against emissions, partners and electrified kilometres.",
  metrics: [
    {
      label: "Tonnes CO₂ avoided p.a.",
      value: "2.5 Mn+",
      detail: "2027 aspiration — emissions avoided through electrified last-mile logistics across BikeWo's network.",
    },
    {
      label: "Kilometres electrified",
      value: "100 Mn+",
      detail: "2027 aspiration — clean kilometres delivered through lease, charge, service and fleet operations.",
    },
    {
      label: "Partners & innovators",
      value: "10,000+",
      detail: "2027 aspiration — dealers, fleet operators, OEMs and technology partners in the ecosystem.",
    },
  ],
  pillars: [
    {
      title: "Environmental",
      copy: "Electrified last-mile kilometres, charging and swapping efficiency, and a pathway to net-zero mobility.",
    },
    {
      title: "Social",
      copy: "People-centric operations — drivers, dealers and customers at the heart of the ecosystem, including Shram Sainik.",
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
