import type { Metadata } from "next";
import { MediaHero } from "@/components/media/MediaHero";
import { MediaDocsLibrary } from "@/components/media/MediaDocsLibrary";
import { ContactCTA } from "@/components/home/ContactCTA";
import { listPublishedNews } from "@/lib/cms/db";
import { MEDIA_PAGE } from "@/lib/media";
import { SITE } from "@/lib/site";

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

export default function MediaPage() {
  const items = listPublishedNews();

  return (
    <>
      <MediaHero />
      <MediaDocsLibrary items={items} />
      <ContactCTA />
    </>
  );
}
