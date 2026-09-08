"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/media/BlogCard";
import { ButtonEl } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  MEDIA_FILTERS,
  MEDIA_PAGE,
  POSTS_PER_PAGE,
  getPublishedPosts,
  type MediaCategory,
} from "@/lib/media";
import { cn, stagger } from "@/lib/utils";

/** Filterable grid with pagination — client-side for now. */
export function MediaLatestGrid() {
  const [activeFilter, setActiveFilter] = useState<MediaCategory | "all">("all");
  const [page, setPage] = useState(1);

  const allPosts = getPublishedPosts();

  const filtered = useMemo(() => {
    if (activeFilter === "all") return allPosts;
    return allPosts.filter((p) => p.category === activeFilter);
  }, [activeFilter, allPosts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagePosts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const selectFilter = (slug: MediaCategory | "all") => {
    setActiveFilter(slug);
    setPage(1);
  };

  return (
    <Section>
      <Container>
        <SectionHeading
          title={MEDIA_PAGE.latestTitle}
          align="center"
          className="justify-center"
        />

        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Filter articles by category"
            className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
          >
            {MEDIA_FILTERS.map((filter) => {
              const active = activeFilter === filter.slug;
              return (
                <button
                  key={filter.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectFilter(filter.slug)}
                  className={cn(
                    "rounded-full px-4 py-2 font-display text-[13px] font-semibold transition-[background-color,color,border-color] duration-200",
                    active
                      ? "bg-indigo-800 text-white"
                      : "border border-indigo-200 text-indigo-800 hover:border-indigo-800 hover:bg-indigo-100/60",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {pagePosts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={stagger(i, 0.04)}>
              <BlogCard post={post} variant="grid" />
            </Reveal>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate">No articles in this category yet.</p>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-14 flex items-center justify-center gap-2 md:mt-16"
          >
            <ButtonEl
              variant="ghost"
              className="h-10 px-4 text-[13px]"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </ButtonEl>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-current={n === currentPage ? "page" : undefined}
                onClick={() => setPage(n)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full font-display text-[13px] font-semibold transition-colors",
                  n === currentPage
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-800 hover:bg-indigo-100",
                )}
              >
                {n}
              </button>
            ))}

            <ButtonEl
              variant="ghost"
              className="h-10 px-4 text-[13px]"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </ButtonEl>
          </nav>
        )}
      </Container>
    </Section>
  );
}
