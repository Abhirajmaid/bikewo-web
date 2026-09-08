import type { Metadata } from "next";
import { MediaCategoryColumns } from "@/components/media/MediaCategoryColumns";
import { MediaFeatured } from "@/components/media/MediaFeatured";
import { MediaHero } from "@/components/media/MediaHero";
import { MediaLatestGrid } from "@/components/media/MediaLatestGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { MEDIA_PAGE } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & insights",
  description: MEDIA_PAGE.lede,
  alternates: { canonical: "/media" },
  openGraph: {
    title: `News & insights — ${SITE.name}`,
    description: MEDIA_PAGE.lede,
    url: "/media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `News & insights — ${SITE.name}`,
    description: MEDIA_PAGE.lede,
  },
};

export default function MediaPage() {
  return (
    <>
      <MediaHero />
      <MediaFeatured />
      <MediaCategoryColumns />
      <MediaLatestGrid />
      <ContactCTA />
    </>
  );
}
