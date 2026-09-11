"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "@/components/brand/Icons";
import { DocumentCard } from "@/components/investors/DocumentCard";
import { PdfViewer } from "@/components/investors/PdfViewer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button, ButtonEl } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  DOCS_PER_PAGE,
  featuredInvestorDocs,
  INVESTOR_PAGE,
  INVESTOR_TOPICS,
  INVESTOR_TYPES,
  sortInvestorDocs,
  type InvestorDoc,
  type InvestorTopic,
  type InvestorType,
} from "@/lib/investors";
import { cn, stagger } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-full border border-indigo-200 bg-white px-4 font-display text-[13px] font-semibold text-indigo-800 outline-none transition-[border-color] duration-200 focus:border-indigo-800";

export function InvestorsLibrary({ docs }: { docs: InvestorDoc[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<InvestorType | "all">("all");
  const [topic, setTopic] = useState<InvestorTopic | "all">("all");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<InvestorDoc | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("topic");
    if (
      slug &&
      INVESTOR_TOPICS.some((t) => t.slug === slug && t.slug !== "all")
    ) {
      setTopic(slug as InvestorTopic);
    }
  }, []);

  const featured = featuredInvestorDocs(docs);
  const all = sortInvestorDocs(docs);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((doc) => {
      if (type !== "all" && doc.type !== type) return false;
      if (topic !== "all" && doc.topic !== topic) return false;
      if (!q) return true;
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.excerpt.toLowerCase().includes(q) ||
        doc.typeLabel.toLowerCase().includes(q)
      );
    });
  }, [all, query, type, topic]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / DOCS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageDocs = filtered.slice(
    (currentPage - 1) * DOCS_PER_PAGE,
    currentPage * DOCS_PER_PAGE,
  );

  const applyType = (next: InvestorType | "all") => {
    setType(next);
    setPage(1);
  };

  const applyTopic = (next: InvestorTopic | "all") => {
    setTopic(next);
    setPage(1);
  };

  return (
    <>
      {featured.length > 0 ? (
        <Section>
          <Container>
            <SectionHeading title={INVESTOR_PAGE.featuredTitle} />

            <ul className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
              {featured.map((doc, i) => (
                <Reveal as="li" key={doc.id} delay={stagger(i, 0.06)}>
                  <DocumentCard doc={doc} variant="featured" onOpen={setActive} />
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1} className="mt-10 flex justify-center md:mt-12">
              <Button href="#library" variant="primary" withArrow>
                {INVESTOR_PAGE.libraryCta}
              </Button>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section id="library" tone="cloud">
        <Container>
          <SectionHeading title={INVESTOR_PAGE.libraryTitle} />

          <Reveal delay={0.05}>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[1fr_14rem_14rem]">
              <label className="relative block">
                <span className="sr-only">Search documents</span>
                <SearchIcon
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search documents"
                  className={cn(fieldClass, "pl-10 font-sans font-normal")}
                />
              </label>

              <label className="block">
                <span className="sr-only">Select type</span>
                <select
                  value={type}
                  onChange={(e) =>
                    applyType(e.target.value as InvestorType | "all")
                  }
                  className={fieldClass}
                >
                  {INVESTOR_TYPES.map((option) => (
                    <option key={option.slug} value={option.slug}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="sr-only">Select topic</span>
                <select
                  value={topic}
                  onChange={(e) =>
                    applyTopic(e.target.value as InvestorTopic | "all")
                  }
                  className={fieldClass}
                >
                  {INVESTOR_TOPICS.map((option) => (
                    <option key={option.slug} value={option.slug}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {pageDocs.map((doc, i) => (
              <Reveal as="li" key={doc.id} delay={stagger(i, 0.04)}>
                <DocumentCard doc={doc} onOpen={setActive} />
              </Reveal>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-slate">
              No documents match those filters.
            </p>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Document pagination"
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

      {active && <PdfViewer doc={active} onClose={() => setActive(null)} />}
    </>
  );
}
