/**
 * Contact page content — layout mirrors the Amporia reference design,
 * adapted for BikeWo copy and India office locations.
 */

export const CONTACT_HERO = {
  title: "Connect with us for energy & mobility solutions",
  breadcrumb: "Contact",
};

export const CONTACT_TOPICS = [
  "Fleet Pricing",
  "Charging",
  "Maintenance",
  "Partnerships",
  "Other",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_STAT = {
  kicker: "Queries Answered",
  value: "891",
  suffix: "K",
  label: "Quick Query Solutions",
  copy: "We are dedicated to addressing your inquiries efficiently. Our team provides clear, effective solutions that meet your needs, ensuring a smooth experience.",
};

export const CONTACT_TESTIMONIALS = [
  {
    quote:
      "This service exceeded all my expectations. The team was professional, prompt, and incredibly skilled. Highly recommended!",
    name: "Rajesh Kumar",
    role: "Fleet Operator, Hyderabad",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=1100&fit=crop&crop=face",
  },
  {
    quote:
      "BikeWo routed us to the right division on the first call. No hand-offs, no runaround — just the team that could actually help.",
    name: "Priya Nair",
    role: "Operations Lead, Pune",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1100&fit=crop&crop=face",
  },
] as const;

export const CONTACT_MISSION = {
  eyebrow: "We believe in a sustainable future.",
  textBefore: "At BikeWo, we truly believe clean mobility ",
  highlight: "powers a better future. Energy & mobility infrastructure is",
  textAfter:
    " what connects mobility, energy and technology into smarter, more scalable logistics ecosystems.",
};

export const CONTACT_QUICK = [
  { label: "Call Now", href: "tel:+914012345678", icon: "phone" as const },
  { label: "Chat Now", href: "/contact#form", icon: "chat" as const },
  { label: "Mail us", href: "mailto:brand@bikewo.in", icon: "mail" as const },
];

/**
 * FAQ category bento — layout mirrors the 5-column Amporia ref,
 * with BikeWo mobility / energy categories and assets.
 */
export const CONTACT_HELP = [
  {
    id: "featured",
    title: "Choose Your FAQ Category Here",
    href: "/contact#form",
    area: "featured",
    variant: "featured" as const,
    image: "/assets/hf_20260806_145122_f7847d04-e4a6-488e-9f6b-3d0507bdc52a.png",
  },
  {
    id: "pricing",
    title: "Pricing & Plans",
    href: "/businesses/mobility-asset-leasing",
    area: "pricing",
    variant: "darkTile" as const,
    icon: "bolt" as const,
  },
  {
    id: "maintenance",
    title: "Maintenance",
    href: "/businesses/lifecycle-services",
    area: "maintenance",
    variant: "image" as const,
    image: "/assets/hf_20260806_143951_b9e268b4-988c-4f03-8c76-7fddced07800.png",
    icon: "recycle" as const,
  },
  {
    id: "technology",
    title: "Technology",
    href: "/coming-soon",
    area: "technology",
    variant: "darkTile" as const,
    icon: "monitor" as const,
  },
  {
    id: "charging",
    title: "Charging",
    href: "/businesses/energy-infrastructure",
    area: "charging",
    variant: "play" as const,
    playLabel: "Watch the power in action",
    icon: "bolt" as const,
  },
  {
    id: "fleet",
    title: "Fleet Leasing",
    href: "/businesses/mobility-asset-leasing",
    area: "fleet",
    variant: "image" as const,
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    icon: "vehicle" as const,
  },
  {
    id: "subsidies",
    title: "Gov. Subsidies",
    href: "/media",
    area: "subsidies",
    variant: "darkTile" as const,
    icon: "wallet" as const,
  },
  {
    id: "support",
    title: "Support",
    href: "/contact#form",
    area: "support",
    variant: "support" as const,
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    cta: "Explore More",
    icon: "headset" as const,
  },
] as const;

/** Shared width for every Contact page section (~90% of the viewport). */
export const CONTACT_PAGE_WIDTH = "w-[90%] !max-w-none px-0";

export const CONTACT_OFFICE_HEADING = {
  eyebrow: "Location",
  title: "Visit our office",
  lede: "Headquarters in Gachibowli, Hyderabad — drop in, or write ahead and we’ll have the right team ready.",
} as const;

export const CONTACT_OFFICE = {
  label: "Headquarters",
  city: "Gachibowli",
  address: "Hyderabad, Telangana 500032",
  email: "brand@bikewo.in",
  hours: "Available 24/7",
} as const;

const OFFICE_MAP_QUERY = "Gachibowli, Hyderabad, Telangana 500032";

export const CONTACT_MAP = {
  embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_MAP_QUERY)}&z=15&hl=en&output=embed`,
  directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_MAP_QUERY)}`,
  title: "Map of BikeWo headquarters in Gachibowli, Hyderabad",
};

export const CONTACT_OFFICE_NOTE =
  "Closed on major national holidays and weekends.";
