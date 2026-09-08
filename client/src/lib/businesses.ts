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
  title: "Powering India's last-mile with integrated energy & mobility infrastructure.",
  lede:
    "Six businesses operating as one EMI platform — vehicles, energy, financing, service, sourcing and intelligence.",
  image: {
    src: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    alt: "Electric vehicle charging station at a BikeWo energy hub.",
    overlay: "Logistics is our core. EMI is our differentiator.",
  },
  pillars: [
    {
      icon: VehicleIcon,
      title: "Mobility at scale",
      copy: "2W, 3W and LCV EVs through PositiEV — distribution and leasing, ready when fleets need them.",
    },
    {
      icon: BoltIcon,
      title: "Energy where it matters",
      copy: "Charging and battery swapping across key logistics locations — the energy behind every movement.",
    },
    {
      icon: BatteryIcon,
      title: "Lifecycle accountability",
      copy: "Maintenance, spare parts, roadside assistance and battery care through Enlite EV Care.",
    },
  ],
  ctas: [
    { label: "Explore our divisions", href: "#divisions" },
    { label: "Discover our impact", href: "#impact" },
  ],
};

/** Subsidiaries shown in the trusted-partners band — mirrors ref layout. */
export const BUSINESSES_PARTNERS = {
  eyebrow: "The BikeWo Mobility Group",
  title: "Subsidiaries carrying the masterbrand forward.",
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
      "Our integrated mobility and energy solutions are built to deliver lasting environmental benefits, helping last-mile fleets, riders and cities transition sustainably. We own, finance, power and manage the assets that make logistics possible.",
    bullets: [
      "Wide range of 2W, 3W and LCV EVs — ready when you need them.",
      "Asset-light leasing models and competitive financing.",
      "Charging and swapping access across key logistics locations.",
      "Lifecycle support through Enlite EV Care to maximise uptime.",
    ],
    actions: [
      { label: "Get started", href: "#divisions", variant: "primary" as const },
      { label: "Contact us", href: "/contact", variant: "ghost" as const },
    ],
  },
  stats: [
    {
      value: 12.7,
      suffix: "%",
      detail:
        "India last-mile delivery market CAGR, 2026–31 (Mordor Intelligence).",
      icon: "bolt" as const,
      size: "lg" as const,
      position: "top-left" as const,
    },
    {
      value: 70,
      suffix: "%",
      detail: "B2C share of India’s last-mile market in 2025.",
      icon: "leaf" as const,
      size: "sm" as const,
      position: "bottom-center" as const,
    },
    {
      value: 14.3,
      suffix: "%",
      detail:
        "Same-day delivery CAGR, 2026–31 — demand that needs reliable EV capacity.",
      icon: "battery" as const,
      size: "md" as const,
      position: "top-right" as const,
    },
  ],
};

export const BUSINESSES_DIVISIONS = {
  eyebrow: "Our divisions",
  title: "Sharing a sustainable future with energy.",
  lede: "Each business runs its own P&L and its own standards — and hands off to the next without the customer noticing a seam.",
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

export const BUSINESSES_TESTIMONIALS = {
  kicker: "Testimonials — Trustpilot",
  title: "Client testimonials on green energy solutions.",
  lede:
    "Discover efficient and sustainable mobility solutions that help reduce costs and benefit the environment.",
  items: [
    {
      heroQuote:
        "Partnering with BikeWo was a key moment for our company. Their EMI model cut costs and boosted last-mile impact.",
      detail:
        "They delivered customised lease and charging solutions that made our transition to electric fleets seamless and cost-effective.",
      name: "Placeholder — fleet operator",
      role: "Operations Manager, Hyderabad",
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
  eyebrow: "FAQ",
  title: "Everything you need to know about our businesses.",
  lede: "How the six businesses work, where to start, and how to partner with us.",
  cta: { label: "Still have a question?", href: "/contact" },
  items: [
    {
      question: "How do the six businesses work together?",
      answer:
        "Each business operates independently with its own P&L, but they share infrastructure, data and service standards. A fleet customer might lease from Mobility Asset Leasing, charge through Energy Infrastructure, and service through Enlite EV Care — all under one EMI platform.",
    },
    {
      question: "What is the relationship between BikeWo and its subsidiaries?",
      answer:
        "The BikeWo Mobility Group includes PositiEV Mobility, Enlite EV Care, Ignesium Energy and BikeWo VZN. The parent brand always leads; sub-brands earn distinction where they serve a genuinely different customer.",
    },
    {
      question: "Can I work with just one business?",
      answer:
        "Yes. Dealers work with Mobility Distribution through PositiEV. Fleet operators often start with leasing. Property managers engage Energy Infrastructure for charge points. Each business has its own sales and support team.",
    },
    {
      question: "Where is BikeWo VZN used?",
      answer:
        "VZN is the connected intelligence layer — a proprietary telematics and data platform for IoT, fleet intelligence and operational analytics that feed safety, efficiency and smarter decisions across the ecosystem.",
    },
    {
      question: "How does BikeWo sit in the logistics value chain?",
      answer:
        "We don’t compete in logistics execution. We build the mobility infrastructure that powers every delivery — own the asset, finance the asset, manage the asset, power the asset. The outcome is lower TCO, higher utilisation, scalable fleets and better margins.",
    },
    {
      question: "How do I become a channel partner?",
      answer:
        "Contact our Mobility Distribution team through the contact page. We onboard dealers, fleet operators and charge-point hosts with training, marketing support and access to the full EMI platform.",
      cta: { label: "Get in touch", href: "/contact" },
    },
  ],
};

/** Re-export glance stats for hero sidebar if needed. */
export const BUSINESSES_GLANCE_STATS = GLANCE.stats;
