/**
 * Businesses landing page — content for /businesses.
 * Aligned to BikeWo Investor Presentation (Aug 2026).
 */

import {
  BatteryIcon,
  BoltIcon,
  DIVISION_ICONS,
  VehicleIcon,
} from "@/components/brand/Icons";
import { DIVISIONS, GLANCE, SUBSIDIARIES } from "@/lib/content";

export const BUSINESSES_HERO = {
  eyebrow: "Our businesses",
  title: "Building an integrated mobility and logistics platform.",
  lede:
    "Source, distribute, enable, charge, service and connect — one EMI operating model for electric last-mile capacity.",
  image: {
    src: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    alt: "Electric vehicle charging station at a BikeWo energy hub.",
    overlay: "Logistics is our core. EMI is our differentiator.",
  },
  pillars: [
    {
      icon: VehicleIcon,
      title: "Mobility at scale",
      copy: "Distribution and leasing through PositiEV — capacity when fleets need it, without ownership lock-in.",
    },
    {
      icon: BoltIcon,
      title: "Energy where it matters",
      copy: "Charging and battery swapping that keep electric fleets energised and available.",
    },
    {
      icon: BatteryIcon,
      title: "Lifecycle accountability",
      copy: "Maintenance, spares and battery care through Enlite EV Care — uptime as the product.",
    },
  ],
  ctas: [
    { label: "Explore divisions", href: "#divisions" },
    { label: "See how it works", href: "#model" },
  ],
};

/* ------------------------------------------------------- Operating model */

export const BUSINESSES_MODEL = {
  eyebrow: "Target operating model",
  title: "One chain. Six handoffs. Zero seams.",
  lede: "The EMI stack is designed so every step feeds the next — from global partners to connected fleet data.",
  steps: [
    { label: "Source", detail: "Global partners" },
    { label: "Distribute", detail: "PositiEV network" },
    { label: "Enable", detail: "Flexible leasing" },
    { label: "Charge", detail: "Energy network" },
    { label: "Service", detail: "EV Care" },
    { label: "Connect", detail: "Data · VZN" },
  ],
};

/* ------------------------------------------------ Problem → solution */

export const BUSINESSES_SOLUTION = {
  eyebrow: "How BikeWo plans to solve it",
  title: "Turn vehicle ownership into managed, on-demand fleet capacity",
  lede: "Source vehicles, enable financing, electrify and manage operations — so logistics companies scale without owning their fleets.",
  steps: [
    {
      index: "01",
      title: "Access & financing support",
      copy: "Vehicle sourcing and asset leasing that make fleet capacity affordable to open.",
      tag: "Access · Affordable",
    },
    {
      index: "02",
      title: "Manage & energise",
      copy: "Maintenance with charging and swapping so assets stay ready on demand.",
      tag: "Managed · Energised",
    },
    {
      index: "03",
      title: "Deploy & optimise",
      copy: "Reliable capacity backed by lifecycle intelligence across the network.",
      tag: "Reliable · Intelligent",
    },
  ],
  outcomes: [
    "Lower TCO",
    "Higher utilisation",
    "Scalable fleets",
    "Better margins",
  ],
  gap: "Traditional models primarily sell vehicles. Logistics operators increasingly need reliable mobility capacity as a service.",
};

/* ------------------------------------------------ Market opportunity */

export const BUSINESSES_MARKET = {
  eyebrow: "Market opportunity",
  title: "A ₹2,500–3,000 crore addressable market in a scaling sector",
  lede: "India’s last-mile market is expanding as e-commerce, faster delivery and urban density reshape fleet demand.",
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
      detail: "BikeWo serviceable obtainable estimate",
    },
  ],
  signals: [
    {
      value: 12.7,
      suffix: "%",
      label: "Market CAGR",
      detail: "India last-mile delivery, 2026–31",
    },
    {
      value: 69.9,
      suffix: "%",
      label: "B2C share",
      detail: "Of India’s last-mile market in 2025",
    },
    {
      value: 54.3,
      suffix: "%",
      label: "E-commerce share",
      detail: "Of last-mile demand in 2025",
    },
    {
      value: 14.3,
      suffix: "%",
      label: "Same-day CAGR",
      detail: "Through 2031 — capacity must flex with peaks",
    },
  ],
  takeaway:
    "As delivery demand becomes faster and more variable, asset-light fleet capacity becomes essential infrastructure.",
  source:
    "Mordor Intelligence, India Last Mile Delivery Market (Aug 2026). SAM and SOM are BikeWo strategic estimates.",
};

/* ---------------------------------------------------------- Partners */

export const BUSINESSES_PARTNERS = {
  eyebrow: "The BikeWo Mobility Group",
  title: "Subsidiaries carrying the masterbrand forward.",
  lede: "Each company owns a layer of the stack — distribution, service, energy or intelligence — under one EMI platform.",
  items: SUBSIDIARIES.map((sub) => ({
    name: sub.name,
    kind: sub.kind,
    copy: sub.copy,
    href: sub.href,
    logo: "logo" in sub ? sub.logo : undefined,
  })),
};

export const BUSINESSES_IMPACT = {
  eyebrow: "One ecosystem",
  title: "Capacity as infrastructure — not another vehicle sale.",
  lede: "Own the asset path, finance it, power it and keep it running. That is how last-mile fleets scale.",
  image: {
    src: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
    alt: "Fleet of BikeWo electric three-wheelers at a branded facility.",
  },
  cards: [
    {
      type: "video" as const,
      label: "Watch our story",
      href: "https://www.youtube.com/@bikewo",
    },
    {
      type: "highlight" as const,
      title: "PositiEV Mobility",
      subtitle: "Distribution & leasing",
      copy: "Vehicle sourcing, channel partners and flexible fleet leasing across India.",
      href: "https://positievmobility.com/",
    },
    {
      type: "highlight" as const,
      title: "Enlite EV Care",
      subtitle: "Lifecycle services",
      copy: "Maintenance, spares and battery health — the service layer fleets trust.",
      href: "https://enliteev.com/",
    },
  ],
};

export const BUSINESSES_INSIGHTS = {
  eyebrow: "Why this matters",
  title: "Delivery is getting faster. Fleets need capacity that flexes.",
  card: {
    kicker: "The operating model",
    lede:
      "BikeWo aims to source vehicles, enable financing, electrify and manage operations — helping logistics companies scale without owning their fleets.",
    bullets: [
      "Access & financing support — vehicle sourcing and asset leasing.",
      "Manage & energise — maintenance with charging and swapping.",
      "Deploy & optimise — reliable capacity with lifecycle intelligence.",
      "Intended impact — lower TCO, higher utilisation, scalable fleets, better margins.",
    ],
    actions: [
      { label: "Explore divisions", href: "#divisions", variant: "primary" as const },
      { label: "Contact us", href: "/contact", variant: "ghost" as const },
    ],
  },
};

export const BUSINESSES_DIVISIONS = {
  eyebrow: "What we do",
  title: "Businesses across the EMI stack.",
  lede: "Distribution, leasing, energy, lifecycle, sourcing and connected intelligence — with adjacent opportunities like aviation logistics as the 3PL core deepens.",
  items: DIVISIONS.map((d, i) => {
    const ids = ["distribution", "leasing", "energy", "lifecycle", "sourcing", "vzn"] as const;
    const imageOverrides: Record<string, string> = {
      "/businesses/global-sourcing-supply-chain":
        "/assets/hf_20260806_143951_b9e268b4-988c-4f03-8c76-7fddced07800.png",
      "/coming-soon":
        "/assets/hf_20260806_145121_78a71faf-e9a4-4f69-aed6-06b239e1ae81.png",
    };
    return {
      ...d,
      image: imageOverrides[d.href] ?? d.image,
      icon: DIVISION_ICONS[ids[i]],
    };
  }),
};

export const BUSINESSES_ADJACENT = {
  eyebrow: "Downstream diversification",
  title: "Expand with discipline from the 3PL core.",
  lede: "Use the capabilities, customers and infrastructure of the core to build adjacent businesses.",
  items: [
    {
      title: "Open energy infrastructure",
      copy: "Charge and swap capacity opened to third parties beyond own fleets.",
    },
    {
      title: "Aviation logistics",
      copy: "Adjacent logistics opportunity built from core operating muscle.",
    },
    {
      title: "Global sourcing",
      copy: "Supply-chain partnerships that support quality, scale and cost leadership.",
    },
    {
      title: "Connected intelligence / VZN",
      copy: "Telematics and optimisation layered across the asset network.",
    },
  ],
};

export const BUSINESSES_TESTIMONIALS = {
  kicker: "Customer voices",
  title: "Built for operators who need capacity, not capex.",
  lede: "Fleet operators, dealers and driver-partners — the people the EMI stack is designed to serve.",
  items: [
    {
      heroQuote:
        "We needed mobility capacity, not more vehicles on the books. Leasing made cost per kilometre something we could forecast.",
      detail:
        "Custom lease and charging solutions made the electric fleet transition measurable — utilisation first, ownership second.",
      name: "Placeholder — fleet operator",
      role: "Operations Manager, Hyderabad",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&crop=face",
      tags: ["Mobility Leasing", "Energy Infrastructure", "Lifecycle Services"],
    },
    {
      heroQuote:
        "Service used to be the reason customers hesitated. Now Enlite handles it and the conversation is about utilisation.",
      detail:
        "The after-sales network gave the dealer channel confidence to sell electric without worrying about what happens after delivery.",
      name: "Placeholder — dealer principal",
      role: "Dealer Principal, Jaipur",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=face",
      tags: ["Mobility Distribution", "Enlite EV Care", "Channel Partners"],
    },
    {
      heroQuote:
        "Zero joining fee meant I could start the same week. The weekly payout is what keeps my household running.",
      detail:
        "Shram Sainik gave training, a uniform built for Indian roads, and a support line that answers in regional languages.",
      name: "Placeholder — driver-partner",
      role: "Driver-Partner, Lucknow",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&crop=face",
      tags: ["Shram Sainik", "Driver Partners", "Weekly Payouts"],
    },
  ],
  cta: {
    label: "Talk to the team that owns your use case",
    href: "/contact",
  },
};

export const BUSINESSES_PLANET = {
  title: "Cleaner capacity.",
  accent: "Smarter fleets.",
  lede: "Electrified last-mile infrastructure — charging, leasing and lifecycle — built to move goods with less waste.",
  image: {
    src: "/assets/hf_20260806_143951_c22f30b8-a28d-42e6-b1e8-774b0a19ba7b.png",
    alt: "Wind turbine and clean energy landscape at dusk.",
  },
  cta: { label: "Read our ESG overview", href: "/about/esg" },
};

export const BUSINESSES_FAQ = {
  eyebrow: "FAQ",
  title: "Everything you need to know about our businesses.",
  lede: "How the EMI businesses work, where to start, and how to partner with us.",
  cta: { label: "Still have a question?", href: "/contact" },
  items: [
    {
      question: "How do the businesses work together?",
      answer:
        "They share one operating model — source, distribute, enable, charge, service and connect. A fleet customer might lease through Mobility Asset Leasing, charge through Energy Infrastructure, and service through Enlite EV Care under one EMI platform.",
    },
    {
      question: "What is the relationship between BikeWo and its subsidiaries?",
      answer:
        "The BikeWo Mobility Group includes PositiEV Mobility, Enlite EV Care, Ignesium Energy and BikeWo VZN. The parent brand leads; sub-brands serve distinct customer journeys within the stack.",
    },
    {
      question: "Can I work with just one business?",
      answer:
        "Yes. Dealers work with Mobility Distribution through PositiEV. Fleet operators often start with leasing. Property managers engage Energy Infrastructure for charge points. Each business has its own sales and support path.",
    },
    {
      question: "Where does aviation logistics fit?",
      answer:
        "Aviation logistics is a downstream diversification opportunity — built from the capabilities, customers and infrastructure of the 3PL core, expanded with discipline alongside energy, sourcing and VZN.",
    },
    {
      question: "How does BikeWo sit in the logistics value chain?",
      answer:
        "We don’t compete in logistics execution. We build the mobility infrastructure that powers delivery — access, energise and optimise assets so operators get lower TCO, higher utilisation, scalable fleets and better margins.",
    },
    {
      question: "How do I become a channel partner?",
      answer:
        "Contact our Mobility Distribution team through the contact page. We onboard dealers, fleet operators and charge-point hosts with training and access across the EMI platform.",
      cta: { label: "Get in touch", href: "/contact" },
    },
  ],
};

/** Re-export glance stats for hero sidebar if needed. */
export const BUSINESSES_GLANCE_STATS = GLANCE.stats;
