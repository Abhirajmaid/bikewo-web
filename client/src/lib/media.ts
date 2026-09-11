/**
 * Public News & Media page copy.
 * Document cards are loaded from the CMS database (lib/cms).
 */

export const MEDIA_PAGE = {
  title: "News and Media",
  lede: "Official press releases and disclosures filed with the National Stock Exchange — the same archive we publish, in a form you can browse.",
  latestTitle: "Press releases",
} as const;

export const POSTS_PER_PAGE = 9;

/** @deprecated Blog article model — retained for unused legacy components. */
export type MediaCategory =
  | "infrastructure"
  | "mobility"
  | "shram-sainik"
  | "sustainability"
  | "vzn";

/** @deprecated */
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
  body: string[];
};

export const MEDIA_FILTERS: { slug: MediaCategory | "all"; label: string }[] = [
  { slug: "all", label: "All" },
];

export const MEDIA_CATEGORY_COLUMNS: {
  title: string;
  icon: "infrastructure" | "people" | "sustainability";
  category: MediaCategory;
}[] = [];

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatMediaDate(iso: string) {
  return DATE_FORMAT.format(new Date(iso));
}

export function getPublishedPosts(): MediaPost[] {
  return [];
}

export function getPostBySlug(_slug: string): MediaPost | null {
  return null;
}

export function getFeaturedPost(): MediaPost | undefined {
  return undefined;
}

export function getSecondaryFeatured(_limit = 3): MediaPost[] {
  return [];
}

export function getPostsForCategory(_category: MediaCategory, _limit = 3): MediaPost[] {
  return [];
}

export function getRelatedPosts(_post: MediaPost, _limit = 3): MediaPost[] {
  return [];
}

export function postHref(slug: string) {
  return `/media/${slug}`;
}
