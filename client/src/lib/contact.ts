/**
 * Contact page content — layout mirrors the Amporia reference design,
 * adapted for BikeWo copy and India office locations.
 */

export const CONTACT_HERO = {
  title: "Connect with Us for Sustainable Solutions",
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
  value: "891K",
  label: "Quick Query Solutions",
  copy: "Our support team resolves most enquiries within one business day — from fleet pricing to charge-point installation.",
};

export const CONTACT_TESTIMONIAL = {
  quote:
    "BikeWo routed us to the right division on the first call. No hand-offs, no runaround — just the team that could actually help.",
  name: "Rajesh Kumar",
  role: "Fleet Operator, Hyderabad",
  avatar: "/assets/hf_20260806_145121_78a71faf-e9a4-4f69-aed6-06b239e1ae81.png",
};

export const CONTACT_RESOURCE = {
  value: "100+",
  label: "Energy saving tips",
  links: [
    { label: "Study more", href: "/sustainability" },
    { label: "Resources center", href: "/media" },
  ],
};

export const CONTACT_MISSION = {
  eyebrow: "We believe in a sustainable future.",
  textBefore: "At BikeWo, we truly believe clean power ",
  highlight: "powers a better future. Sustainable energy is",
  textAfter:
    " accessible and helps communities choose smarter, greener solutions.",
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
    href: "/businesses/bikewo-vzn",
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

export type OfficeLocation = {
  id: string;
  name: string;
  label: string;
  address: string;
  email: string;
  hours: string;
};

export const CONTACT_OFFICES: OfficeLocation[] = [
  {
    id: "telangana",
    name: "Telangana",
    label: "Headquarters",
    address: "Hyderabad, Gachibowli, Telangana 500032",
    email: "brand@bikewo.in",
    hours: "Available 24/7",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    label: "Regional Office",
    address: "Bengaluru, Koramangala, Karnataka 560034",
    email: "brand@bikewo.in",
    hours: "Mon–Sat, 9 AM – 6 PM",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    label: "Regional Office",
    address: "Mumbai, Andheri East, Maharashtra 400069",
    email: "brand@bikewo.in",
    hours: "Mon–Sat, 9 AM – 6 PM",
  },
  {
    id: "delhi",
    name: "Delhi NCR",
    label: "Regional Office",
    address: "New Delhi, Connaught Place, Delhi 110001",
    email: "brand@bikewo.in",
    hours: "Mon–Sat, 9 AM – 6 PM",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    label: "Regional Office",
    address: "Chennai, T Nagar, Tamil Nadu 600017",
    email: "brand@bikewo.in",
    hours: "Mon–Sat, 9 AM – 6 PM",
  },
];

export const CONTACT_MAP = {
  src: "/assets/india_map.png",
  alt: "Map of India showing BikeWo office locations, with Telangana highlighted.",
};

export const CONTACT_OFFICE_NOTE =
  "Our office remains closed on all major national holidays and weekends.";
