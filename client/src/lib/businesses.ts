/**
 * Businesses landing page — content for /businesses.
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
  title: "Powering India's mobility with integrated energy infrastructure.",
  lede:
    "Six divisions operating as one accountable system — from the vehicle you buy to the charge you take and the service you rely on.",
  image: {
    src: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    alt: "Electric vehicle charging station at a BikeWo energy hub.",
    overlay: "Six divisions. One accountable energy system.",
  },
  pillars: [
    {
      icon: VehicleIcon,
      title: "Mobility at scale",
      copy: "Electric two- and three-wheelers through a pan-India dealer and fleet network.",
    },
    {
      icon: BoltIcon,
      title: "Energy where it matters",
      copy: "Fast-charging across highways, societies and commercial hubs — monitored around the clock.",
    },
    {
      icon: BatteryIcon,
      title: "Lifecycle accountability",
      copy: "Maintenance, spares, roadside assistance and battery health for the life of every asset.",
    },
  ],
  ctas: [
    { label: "Explore our divisions", href: "#divisions" },
    { label: "Discover our impact", href: "#impact" },
  ],
};

/** Subsidiaries shown in the trusted-partners band — mirrors ref layout. */
export const BUSINESSES_PARTNERS = {
  eyebrow: "Trusted partners",
  title: "Endorsed companies carrying the masterbrand forward.",
  items: SUBSIDIARIES.map((sub) => ({
    name: sub.name,
    kind: sub.kind,
    copy: sub.copy,
    href: sub.href,
  })),
};

export const BUSINESSES_IMPACT = {
  eyebrow: "One ecosystem",
  title: "One goal, one grid.",
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
      copy: "Dealer network, fleet rentals and channel partners across India.",
      href: "https://positievmobility.com/",
    },
    {
      type: "highlight" as const,
      title: "Enlite EV Care",
      subtitle: "Lifecycle services",
      copy: "Maintenance, spares and battery health — the service layer riders trust.",
      href: "https://enliteev.com/",
    },
  ],
};

export const BUSINESSES_INSIGHTS = {
  title: "Impactful insights for a sustainable tomorrow.",
  card: {
    kicker: "For your future",
    lede:
      "Our integrated mobility and energy solutions are built to deliver lasting environmental benefits, helping fleets, riders and cities transition sustainably. With accountable operations and dependable service, we are driving change across India's energy landscape.",
    bullets: [
      "Advanced electric mobility and charging infrastructure.",
      "Affordable lease and distribution options for every sector.",
      "Exceptional lifecycle support through Enlite EV Care.",
      "Commitment to measurable carbon reduction at scale.",
    ],
    actions: [
      { label: "Get started", href: "#divisions", variant: "primary" as const },
      { label: "Contact us", href: "/contact", variant: "ghost" as const },
    ],
  },
  stats: [
    {
      value: 98,
      suffix: "%",
      detail:
        "Delivering energy efficiency and optimal performance in every solution.",
      icon: "bolt" as const,
      size: "lg" as const,
      position: "top-left" as const,
    },
    {
      value: 65,
      suffix: "%",
      detail: "Delivering reliable green energy solutions.",
      icon: "leaf" as const,
      size: "sm" as const,
      position: "bottom-center" as const,
    },
    {
      value: 1.5,
      suffix: "MW",
      detail:
        "Powering communities with fast-charging capacity on highway corridors, making a significant environmental impact.",
      icon: "battery" as const,
      size: "md" as const,
      position: "top-right" as const,
    },
  ],
};

export const BUSINESSES_DIVISIONS = {
  eyebrow: "Our divisions",
  title: "Sharing a sustainable future with energy.",
  lede: "Each division runs its own P&L and its own standards — and hands off to the next without the customer noticing a seam.",
  items: DIVISIONS.map((d, i) => {
    const ids = ["distribution", "leasing", "energy", "lifecycle", "sourcing", "vzn"] as const;
    const imageOverrides: Record<string, string> = {
      "/businesses/global-sourcing-supply-chain":
        "/assets/hf_20260806_143951_b9e268b4-988c-4f03-8c76-7fddced07800.png",
      "/businesses/bikewo-vzn":
        "/assets/hf_20260806_145121_78a71faf-e9a4-4f69-aed6-06b239e1ae81.png",
    };
    return {
      ...d,
      image: imageOverrides[d.href] ?? d.image,
      icon: DIVISION_ICONS[ids[i]],
    };
  }),
};

export const BUSINESSES_TESTIMONIALS = {
  kicker: "Testimonials — Trustpilot",
  title: "Client testimonials on green energy solutions.",
  lede:
    "Discover efficient and sustainable mobility solutions that help reduce costs and benefit the environment.",
  items: [
    {
      heroQuote:
        "Partnering with BikeWo was a key moment for our company. Their integrated mobility model cut costs and boosted impact.",
      detail:
        "They delivered customised lease and charging solutions that made our transition to electric fleets seamless and cost-effective.",
      name: "Placeholder — fleet operator",
      role: "Operations Manager, Pune",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&crop=face",
      tags: ["Mobility Leasing", "Energy Infrastructure", "Lifecycle Services"],
    },
    {
      heroQuote:
        "Service used to be the reason customers hesitated. Now Enlite handles it and the conversation is about range, not repairs.",
      detail:
        "The after-sales network gave our dealer channel the confidence to sell electric without worrying about what happens after delivery.",
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
        "Shram Sainik gave me training, a uniform built for Indian roads, and a support line that answers in my language.",
      name: "Placeholder — driver-partner",
      role: "Driver-Partner, Lucknow",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=700&fit=crop&crop=face",
      tags: ["Shram Sainik", "Driver Partners", "Weekly Payouts"],
    },
  ],
  cta: {
    label: "Join the green energy movement and start saving now.",
    href: "/contact",
  },
};

export const BUSINESSES_PLANET = {
  title: "One planet.",
  accent: "One chance.",
  image: {
    src: "/assets/hf_20260806_143951_c22f30b8-a28d-42e6-b1e8-774b0a19ba7b.png",
    alt: "Wind turbine and clean energy landscape at dusk.",
  },
  cta: { label: "Read our ESG report", href: "/about/esg" },
};

export const BUSINESSES_FAQ = {
  title: "Everything you need to know about our businesses.",
  items: [
    {
      question: "How do the six divisions work together?",
      answer:
        "Each division operates independently with its own P&L, but they share infrastructure, data and service standards. A fleet customer might lease from Mobility Asset Leasing, charge through Energy Infrastructure, and service through Lifecycle Services — all under one contract framework.",
    },
    {
      question: "What is the relationship between BikeWo and its subsidiaries?",
      answer:
        "Subsidiaries like PositiEV Mobility, Enlite EV Care and BikeWo VZN are endorsed companies that carry the masterbrand forward. The parent brand always leads; sub-brands earn distinction only where they serve a genuinely different customer.",
    },
    {
      question: "Can I work with just one division?",
      answer:
        "Yes. Dealers work with Mobility Distribution. Fleet operators often start with leasing. Property managers engage Energy Infrastructure for charge points. Each division has its own sales and support team.",
    },
    {
      question: "Where is BikeWo VZN used?",
      answer:
        "VZN is the connected intelligence layer — telematics, wearables and fleet data that feeds predictive maintenance, route optimisation and battery health monitoring across the ecosystem.",
    },
    {
      question: "How does Global Sourcing support the other divisions?",
      answer:
        "It procures components, battery cells and spare parts at scale, warehouses inventory predictably, and keeps the value chain supplied so distribution and service never stall for parts.",
    },
    {
      question: "How do I become a channel partner?",
      answer:
        "Contact our Mobility Distribution team through the contact page. We onboard dealers, fleet operators and charge-point hosts with training, marketing support and access to the full ecosystem.",
    },
  ],
};

/** Re-export glance stats for hero sidebar if needed. */
export const BUSINESSES_GLANCE_STATS = GLANCE.stats;
