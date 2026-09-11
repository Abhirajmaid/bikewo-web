import type { Metadata } from "next";
import { MediaHero } from "@/components/media/MediaHero";
import { MediaDocsLibrary } from "@/components/media/MediaDocsLibrary";
import { ContactCTA } from "@/components/home/ContactCTA";
import { MEDIA_PAGE } from "@/lib/media";
import { SITE } from "@/lib/site";
import { listNewsMedia } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "News and Media",
  description: MEDIA_PAGE.lede,
  alternates: { canonical: "/media" },
  openGraph: {
    title: `News and Media — ${SITE.name}`,
    description: MEDIA_PAGE.lede,
    url: "/media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `News and Media — ${SITE.name}`,
    description: MEDIA_PAGE.lede,
  },
};

export const dynamic = "force-dynamic";

async function loadNews() {
  try {
    return await listNewsMedia();
  } catch {
    return [];
  }
}

export default async function MediaPage() {
  const items = await loadNews();

  return (
    <>
      <MediaHero />
      <MediaDocsLibrary items={items} />
      <ContactCTA />
    </>
  );
}
