"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NewsMediaCard } from "@/components/media/NewsMediaCard";
import { PdfViewer } from "@/components/investors/PdfViewer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { NewsMediaItem } from "@/lib/cms/types";
import { MEDIA_PAGE } from "@/lib/media";
import { stagger } from "@/lib/utils";
import type { InvestorDoc } from "@/lib/investors";

function toViewerDoc(item: NewsMediaItem): InvestorDoc {
  return {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    type: "notice",
    typeLabel: item.typeLabel,
    topic: "shareholders",
    topicLabel: "Media",
    date: item.date,
    href: item.href,
    featured: item.featured,
  };
}

export function MediaDocsLibrary({ items }: { items: NewsMediaItem[] }) {
  const [active, setActive] = useState<InvestorDoc | null>(null);
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);
  const grid = featured.length ? rest : items;
  const featuredRow = featured.length ? featured : [];

  return (
    <Section>
      <Container>
        <SectionHeading
          title={MEDIA_PAGE.latestTitle}
          align="center"
          className="justify-center"
        />

        {featuredRow.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {featuredRow.map((item, i) => (
              <Reveal as="li" key={item.id} delay={stagger(i, 0.05)}>
                <NewsMediaCard
                  item={item}
                  variant="featured"
                  onOpen={() => setActive(toViewerDoc(item))}
                />
              </Reveal>
            ))}
          </ul>
        ) : null}

        {grid.length > 0 ? (
          <ul
            className={
              featuredRow.length > 0
                ? "mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3"
                : "mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
            }
          >
            {grid.map((item, i) => (
              <Reveal as="li" key={item.id} delay={stagger(i, 0.04)}>
                <NewsMediaCard
                  item={item}
                  onOpen={() => setActive(toViewerDoc(item))}
                />
              </Reveal>
            ))}
          </ul>
        ) : null}

        {items.length === 0 ? (
          <p className="mt-12 text-center text-slate">
            No press releases published yet.
          </p>
        ) : null}
      </Container>

      {active ? <PdfViewer doc={active} onClose={() => setActive(null)} /> : null}
    </Section>
  );
}
