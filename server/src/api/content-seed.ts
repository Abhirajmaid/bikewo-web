/** News & Media seed — PDFs can stay as NSE links until re-uploaded to the bucket. */
const NSE = "https://nsearchives.nseindia.com/corporate";

export const NEWS_SEED = [
  {
    slug: "pr-2026-09-07",
    title:
      "BikeWo Renews Focus on Commerce Forever Partnership Under Broader Energy & Mobility Infrastructure Strategy",
    excerpt: "Press release filed with the National Stock Exchange on 7 September 2026.",
    typeLabel: "Press release",
    date: "2026-09-07",
    href: `${NSE}/BIKEWO2016_07092026094207_Pressrelease.pdf`,
    featured: true,
  },
  {
    slug: "pr-2026-08-26",
    title: "BikeWo Announces Expansion into Warehousing and Integrated Logistics Infrastructure",
    excerpt: "Press release filed with the National Stock Exchange on 26 August 2026.",
    typeLabel: "Press release",
    date: "2026-08-26",
    href: `${NSE}/BIKEWO2016_26082026085232_Pressrelease.pdf`,
    featured: true,
  },
  {
    slug: "pr-2026-08-19",
    title: "BikeWo and Evify Sign Strategic MoU to Build AI-Led Logistics Technology Platform",
    excerpt: "Press release filed with the National Stock Exchange on 19 August 2026.",
    typeLabel: "Press release",
    date: "2026-08-19",
    href: `${NSE}/BIKEWO2016_19082026085627_Pressrelease19082026.pdf`,
  },
  {
    slug: "pr-2026-08-13",
    title: "BikeWo Announces Strategic Partnership with Hala Mobility to Deploy EV Fleets",
    excerpt: "Press release filed with the National Stock Exchange on 13 August 2026.",
    typeLabel: "Press release",
    date: "2026-08-13",
    href: `${NSE}/BIKEWO2016_13082026093934_Pressrelease13082026.pdf`,
  },
  {
    slug: "pr-2026-08-04",
    title: "BikeWo Signs MoU to Acquire Majority Stake in Enlite EV Care",
    excerpt: "Press release filed with the National Stock Exchange on 4 August 2026.",
    typeLabel: "Press release",
    date: "2026-08-04",
    href: `${NSE}/BIKEWO2016_04082026091840_Pressrelease.pdf`,
  },
  {
    slug: "pr-2026-07-28",
    title: "BikeWo Signs MoU to Acquire 51% Stake in Ignitium Services",
    excerpt: "Press release filed with the National Stock Exchange on 28 July 2026.",
    typeLabel: "Press release",
    date: "2026-07-28",
    href: `${NSE}/BIKEWO2016_28072026084651_Press_release_Final.pdf`,
  },
  {
    slug: "pr-2026-07-23",
    title: "BikeWo Unveils Long-Term Strategy to Build Full-Stack Mobility and Logistics Platform",
    excerpt: "Press release filed with the National Stock Exchange on 23 July 2026.",
    typeLabel: "Press release",
    date: "2026-07-23",
    href: `${NSE}/BIKEWO2016_23072026090744_Pressrelease.pdf`,
  },
  {
    slug: "pr-2026-07-17",
    title: "BikeWo Partners with Yubhas Renewables for Solar-Assisted E-3W Pilot",
    excerpt: "Press release filed with the National Stock Exchange on 17 July 2026.",
    typeLabel: "Press release",
    date: "2026-07-17",
    href: `${NSE}/BIKEWO2016_17072026102956_Press_release_NSE.pdf`,
  },
  {
    slug: "pr-2026-07-02",
    title: "BikeWo Signs MoU to Acquire Majority Stake in PositiEV Mobility",
    excerpt:
      "Press release / disclosure filed with the National Stock Exchange on 2 July 2026.",
    typeLabel: "Press release",
    date: "2026-07-02",
    href: `${NSE}/BIKEWO2016_02072026181446_Press_release_Disclosure.pdf`,
  },
];

export const TESTIMONIAL_SEED = [
  {
    quote:
      "We needed mobility capacity, not more vehicles on the books. Leasing from BikeWo made cost per kilometre something I could forecast.",
    name: "Placeholder — fleet operator",
    role: "Last-mile fleet operator, Hyderabad",
    avatarUrl: "/assets/story-1.png",
    sortOrder: 1,
  },
  {
    quote:
      "Service used to be the reason customers hesitated. Now Enlite handles it and the conversation is about utilisation, not repairs.",
    name: "Placeholder — dealer principal",
    role: "Dealer principal, Jaipur",
    avatarUrl: "/assets/story-2.png",
    sortOrder: 2,
  },
  {
    quote:
      "Zero joining fee meant I could start the same week. The weekly payout is what keeps my household running.",
    name: "Placeholder — driver-partner",
    role: "Driver-partner, Lucknow",
    avatarUrl: "/assets/story-3.png",
    sortOrder: 3,
  },
];

export const CAREER_SEED = [
  {
    title: "Charging Network Engineer",
    location: "Pune",
    jobType: "Full-time" as const,
    department: "Energy infrastructure",
    postedAt: "2026-08-01",
    jobStatus: "open" as const,
  },
  {
    title: "Fleet Data Scientist — VZN",
    location: "Bengaluru",
    jobType: "Full-time" as const,
    department: "BikeWo VZN",
    postedAt: "2026-08-01",
    jobStatus: "open" as const,
  },
  {
    title: "Regional Service Manager",
    location: "Lucknow",
    jobType: "Full-time" as const,
    department: "Lifecycle services",
    postedAt: "2026-08-01",
    jobStatus: "open" as const,
  },
  {
    title: "Channel Development Lead",
    location: "Ahmedabad",
    jobType: "Full-time" as const,
    department: "Mobility distribution",
    postedAt: "2026-08-01",
    jobStatus: "open" as const,
  },
];
