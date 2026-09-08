/**
 * Public newsroom content — listing, filters and article pages.
 * Admin CMS data lives in lib/admin/data.ts; this is the visitor-facing copy.
 */

export type MediaCategory =
  | "infrastructure"
  | "mobility"
  | "shram-sainik"
  | "sustainability"
  | "vzn";

export type MediaPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: MediaCategory;
  categoryLabel: string;
  image: string;
  featured?: boolean;
  /** Article body — one string per paragraph. */
  body: string[];
};

export const MEDIA_FILTERS: { slug: MediaCategory | "all"; label: string }[] = [
  { slug: "all", label: "All" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "mobility", label: "Mobility" },
  { slug: "shram-sainik", label: "Shram Sainik" },
  { slug: "sustainability", label: "Sustainability" },
  { slug: "vzn", label: "VZN" },
];

export const MEDIA_CATEGORY_COLUMNS: {
  title: string;
  icon: "infrastructure" | "people" | "sustainability";
  category: MediaCategory;
}[] = [
  { title: "Infrastructure", icon: "infrastructure", category: "infrastructure" },
  { title: "People & programmes", icon: "people", category: "shram-sainik" },
  { title: "Sustainability", icon: "sustainability", category: "sustainability" },
];

export const MEDIA_POSTS: MediaPost[] = [
  {
    id: "b1",
    slug: "charge-hub-corridor-milestone",
    title: "Charge hub network crosses its next corridor milestone",
    excerpt:
      "The highway corridor build-out adds fast-charging capacity between three states — closing a gap fleet operators have flagged for two years.",
    author: "Communications Team",
    publishedAt: "2026-07-22",
    category: "infrastructure",
    categoryLabel: "Energy Infrastructure",
    image: "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png",
    featured: true,
    body: [
      "The latest phase of BikeWo's highway corridor programme adds fast-charging capacity across a 420-kilometre stretch linking Maharashtra, Gujarat and Madhya Pradesh. For fleet operators running long-haul routes, the milestone removes one of the last practical barriers to electrifying inter-city logistics.",
      "Each new hub is designed for simultaneous charging of eight vehicles, with load management that prioritises turn-around time over peak demand. The sites sit within existing highway amenity zones so drivers do not lose productive hours off-route.",
      "Construction followed a modular playbook developed during the pilot phase: prefabricated power modules, standardised canopy structures and a single commissioning checklist applied at every location. That consistency is what let the team move from ground-break to live charging in under eleven weeks per site.",
      "The corridor is part of a wider network plan that targets 200 operational charge hubs by 2028. Progress is reported quarterly in the sustainability section of our investor materials.",
    ],
  },
  {
    id: "b2",
    slug: "training-academy-expansion",
    title: "Training academy expands to five new cities",
    excerpt:
      "Road safety, battery handling and customer service — delivered in regional languages, with zero joining fee for new driver-partners.",
    author: "HR Team",
    publishedAt: "2026-06-30",
    category: "shram-sainik",
    categoryLabel: "Shram Sainik",
    image: "/assets/hf_20260806_145121_57e54b4f-5e29-4c50-9620-8bbfdc06eac5.png",
    body: [
      "BikeWo's Shram Sainik Training Academy is opening centres in Indore, Bhopal, Nagpur, Coimbatore and Visakhapatnam — bringing the total footprint to fourteen cities across India.",
      "Every programme covers road safety, high-voltage battery handling, defensive driving in mixed traffic and customer-facing communication. Modules are delivered in Hindi, Marathi, Tamil and Telugu depending on the centre.",
      "The expansion responds directly to driver-partner feedback: operators wanted training closer to home, not a week away in a central hub. Each new centre runs cohorts of forty, with practical assessments on real vehicles before certification.",
      "Graduates receive a Shram Sainik ID, uniform kit and access to the weekly payout programme from day one of active service. There is no joining fee.",
    ],
  },
  {
    id: "b3",
    slug: "predictive-maintenance-fleet-wide",
    title: "Predictive maintenance moves from pilot to fleet-wide",
    excerpt:
      "Telemetry now flags battery degradation before it becomes an unplanned workshop visit — across the full PositiEV fleet.",
    author: "Product Team",
    publishedAt: "2026-06-11",
    category: "vzn",
    categoryLabel: "BikeWo VZN",
    image: "/assets/hf_20260806_143951_30c91bb1-6891-40a3-8985-0e68a4501e54.png",
    body: [
      "After eighteen months in pilot, BikeWo VZN's predictive maintenance module is now active across the entire PositiEV fleet — more than 12,000 connected vehicles.",
      "The system monitors cell-level voltage drift, thermal patterns and charge-cycle efficiency. When a threshold is crossed, a work order is raised automatically at the nearest Enlite service centre, often before the driver notices any performance change.",
      "Early results from the pilot showed a 34% reduction in unplanned breakdowns and a measurable improvement in battery residual value at end-of-lease. Both numbers matter to fleet operators who model total cost of ownership over three to five years.",
      "The rollout includes a driver-facing app update that explains scheduled maintenance in plain language — no engineering jargon, just what is happening and when.",
    ],
  },
  {
    id: "b4",
    slug: "dealer-network-rajasthan-expansion",
    title: "Dealer network adds twelve Rajasthan locations",
    excerpt:
      "Mobility distribution reaches deeper into tier-two cities — with bundled charging and service from day one.",
    author: "Mobility Team",
    publishedAt: "2026-05-28",
    category: "mobility",
    categoryLabel: "Mobility Distribution",
    image: "/assets/hf_20260806_145121_78a71faf-e9a4-4f69-aed6-06b239e1ae81.png",
    body: [
      "BikeWo Mobility Distribution has signed twelve new dealer partners across Rajasthan, covering Jodhpur, Udaipur, Kota, Ajmer and eight additional tier-two cities.",
      "Every new outlet launches with a bundled offer: vehicle sales, home-charger installation and the first year of Enlite lifecycle service included in the purchase price. Dealers report that the bundle removes the three most common objections from first-time EV buyers.",
      "Each location undergoes a four-week onboarding programme covering product knowledge, financing options and after-sales handover standards. Regional managers conduct monthly audits against a published scorecard.",
      "The expansion brings BikeWo's retail footprint to 340 active outlets nationwide, with a stated target of 500 by end of fiscal year.",
    ],
  },
  {
    id: "b5",
    slug: "second-life-battery-pathway",
    title: "Second-life battery pathway enters commercial trial",
    excerpt:
      "Retired fleet packs are being redeployed for stationary storage at charge hubs — closing the loop on circular economy commitments.",
    author: "ESG Team",
    publishedAt: "2026-05-14",
    category: "sustainability",
    categoryLabel: "Sustainability",
    image: "/assets/hf_20260806_143951_b9e268b4-988c-4f03-8c76-7fddced07800.png",
    body: [
      "BikeWo has begun a commercial trial redeploying retired fleet battery packs as stationary storage units at three charge hub locations in Karnataka.",
      "Packs that no longer meet mobility-grade performance thresholds retain 70–80% of their original capacity — more than sufficient for peak-shaving and overnight grid balancing at charging sites.",
      "The trial is being run in partnership with a specialist refurbisher and will inform the company's published second-life battery policy, due in the next annual sustainability report.",
      "If results hold, the pathway could defer recycling costs, reduce hub energy bills and provide a measurable addition to BikeWo's avoided-emissions accounting.",
    ],
  },
  {
    id: "b6",
    slug: "fleet-leasing-milestone",
    title: "Fleet leasing portfolio crosses 5,000 vehicles",
    excerpt:
      "Asset leasing now covers two-wheelers, three-wheelers and light commercial EVs — with predictable cost per kilometre.",
    author: "Leasing Team",
    publishedAt: "2026-04-22",
    category: "mobility",
    categoryLabel: "Mobility Asset Leasing",
    image: "/assets/hf_20260806_145121_cf738266-67bb-4612-bc89-1e82a78c44ba.png",
    body: [
      "BikeWo Mobility Asset Leasing has surpassed 5,000 vehicles under management across logistics, last-mile delivery and ride-hailing segments.",
      "The milestone reflects growing demand from operators who want to electrify without capital outlay. Leasing contracts include maintenance, insurance and battery health monitoring through BikeWo VZN.",
      "Average cost per kilometre has stabilised at a level competitive with diesel equivalents on routes above 80 kilometres per day — the threshold where total cost of ownership typically favours electric.",
      "The leasing team is onboarding fifteen new fleet accounts this quarter, with a focus on three-wheeler last-mile operators in tier-two cities.",
    ],
  },
  {
    id: "b7",
    slug: "solar-canopy-charge-hubs",
    title: "Solar canopies go live at four charge hub sites",
    excerpt:
      "On-site generation now offsets a meaningful share of hub electricity — with surplus fed back to the grid.",
    author: "Energy Team",
    publishedAt: "2026-04-08",
    category: "infrastructure",
    categoryLabel: "Energy Infrastructure",
    image: "/assets/hf_20260806_143951_492dc5ac-38af-41b3-b418-67846f1d2d55.png",
    body: [
      "Four BikeWo charge hubs now operate with integrated solar canopies, generating on-site power that offsets 30–45% of daily electricity consumption depending on location and season.",
      "The canopy design doubles as weather protection for charging vehicles — a practical benefit that drivers notice immediately during monsoon season.",
      "Surplus generation is fed back to the grid under state-level net-metering agreements. Revenue from feed-in tariffs is reinvested into hub maintenance and expansion.",
      "The company plans to retrofit solar canopies at twelve additional sites by year-end, prioritising locations with high daytime utilisation and strong solar irradiance.",
    ],
  },
  {
    id: "b8",
    slug: "driver-partner-income-report",
    title: "Driver-partner income report shows steady weekly growth",
    excerpt:
      "Shram Sainik partners in active service report consistent weekly earnings — with transparent payout tracking in the partner app.",
    author: "Shram Sainik Team",
    publishedAt: "2026-03-19",
    category: "shram-sainik",
    categoryLabel: "Shram Sainik",
    image: "/assets/hf_20260806_145121_2972ef2c-9b19-47a0-b51c-d26f17f45cd1.png",
    body: [
      "The latest Shram Sainik quarterly income report shows active driver-partners earning a median weekly payout that has grown 12% year-on-year, adjusted for route mix and vehicle type.",
      "Transparency is central to the programme: every partner can see earnings breakdowns, trip counts and incentive tiers in the Shram Sainik app, updated every Monday morning.",
      "The report also highlights retention — 78% of partners who completed training twelve months ago remain in active service, a figure the team attributes to predictable income and accessible support channels.",
      "New cohorts in the five recently opened academy cities will be included in the next quarterly release.",
    ],
  },
  {
    id: "b9",
    slug: "vzn-open-api-partners",
    title: "BikeWo VZN opens API access to fleet software partners",
    excerpt:
      "Third-party fleet management platforms can now integrate live telemetry — without custom engineering per account.",
    author: "Product Team",
    publishedAt: "2026-03-05",
    category: "vzn",
    categoryLabel: "BikeWo VZN",
    image: "/assets/hf_20260806_145122_f7847d04-e4a6-489e-9f6b-3d0507bdc52a.png",
    body: [
      "BikeWo VZN has launched a public API that lets fleet management software partners pull live vehicle telemetry, charge status and maintenance alerts without bespoke integrations.",
      "The first three certified partners — covering logistics, ride-hailing and municipal fleet segments — went live this month. Documentation and a sandbox environment are available to qualified developers.",
      "The move reflects feedback from large fleet operators who run mixed-vendor software stacks and need a single telemetry feed rather than portal-hopping across OEM dashboards.",
      "API access is included in standard VZN fleet subscriptions; rate limits and data scopes are published in the developer documentation.",
    ],
  },
  {
    id: "b10",
    slug: "annual-emissions-avoided-update",
    title: "Annual emissions avoided passes 180,000 tonnes CO₂e",
    excerpt:
      "Measured displacement from electrified kilometres — reported using a published methodology, not estimates.",
    author: "ESG Team",
    publishedAt: "2026-02-18",
    category: "sustainability",
    categoryLabel: "Sustainability",
    image: "/assets/hf_20260806_145121_7f0cb101-4dc9-4cad-8dd9-bf8a9232986c.png",
    body: [
      "BikeWo has published an updated figure for annual emissions avoided: 180,000 tonnes of CO₂e, measured from electrified kilometres across the fleet, charge network and leased assets.",
      "The number uses a published methodology aligned with GHG Protocol Scope 3 guidance, with diesel-equivalent baselines set per vehicle class. It is audited annually and disclosed in the sustainability report.",
      "Growth in the figure tracks both fleet expansion and grid decarbonisation — as India's electricity mix shifts toward renewables, the same kilometre avoids incrementally more emissions over time.",
      "The full methodology document and quarterly updates are available in the ESG section of the site.",
    ],
  },
];

export const MEDIA_PAGE = {
  title: "News & insights",
  lede: "Announcements, milestones and the work behind India's integrated energy and mobility infrastructure.",
  latestTitle: "Latest updates",
} as const;

export const POSTS_PER_PAGE = 6;

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatMediaDate(iso: string) {
  return DATE_FORMAT.format(new Date(iso));
}

export function getPublishedPosts() {
  return [...MEDIA_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string) {
  return MEDIA_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedPost() {
  return getPublishedPosts().find((p) => p.featured) ?? getPublishedPosts()[0];
}

export function getSecondaryFeatured(limit = 3) {
  const featured = getFeaturedPost();
  return getPublishedPosts()
    .filter((p) => p.id !== featured?.id)
    .slice(0, limit);
}

export function getPostsForCategory(category: MediaCategory, limit = 3) {
  return getPublishedPosts().filter((p) => p.category === category).slice(0, limit);
}

export function getRelatedPosts(post: MediaPost, limit = 3) {
  return getPublishedPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
}

export function postHref(slug: string) {
  return `/media/${slug}`;
}
