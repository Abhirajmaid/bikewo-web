import type { Metadata } from "next";
import Link from "next/link";
import { NAV, ROUTE_INDEX } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowRightIcon } from "@/components/brand/Icons";

/**
 * Shared shell for every route that is scaffolded but not yet built.
 *
 * Each page owns its real route, metadata and place in the nav, so the
 * information architecture is testable today and the section can be filled in
 * later without touching routing.
 */

export function placeholderMetadata(href: string): Metadata {
  const entry = ROUTE_INDEX[href];
  const title = entry?.title ?? "BikeWo";
  const description = entry?.blurb ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: href },
    openGraph: {
      title,
      description,
      url: href,
      type: "website",
    },
    twitter: {
      title,
      description,
    },
    // Nothing here is worth indexing until the section has real content.
    robots: { index: false, follow: true, nocache: true },
  };
}

export function PlaceholderPage({ href }: { href: string }) {
  const entry = ROUTE_INDEX[href];
  const title = entry?.title ?? "Coming soon";

  // Sibling links help the client walk the IA during review.
  const parentNode = NAV.find(
    (n) => n.href === href || n.children?.some((c) => c.href === href),
  );
  const siblings = parentNode?.children?.filter((c) => c.href !== href) ?? [];

  const crumbs = [
    { label: "Home", href: "/" },
    ...(entry?.parent && parentNode
      ? [{ label: entry.parent, href: parentNode.href }]
      : []),
    { label: title },
  ];

  return (
    <>
      <PageHero crumbs={crumbs} title={title} lede={entry?.blurb}>
        <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-2.5">
          <span aria-hidden className="size-1.5 rounded-full bg-green-400" />
          <span className="eyebrow text-white/70">This section is in production</span>
        </p>
      </PageHero>

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-2xl leading-snug">Not built yet — by design.</h2>
              <p className="mt-4 leading-relaxed text-slate">
                The route, navigation and metadata for this page are live so the
                structure can be reviewed end to end. The content, layout and motion
                for this section come next.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/" variant="ghost" withArrow>
                  Back to home
                </Button>
                <Button href="/contact" withArrow>
                  Get in Touch
                </Button>
              </div>
            </div>

            {siblings.length > 0 && (
              <div className="lg:col-span-7">
                <p className="eyebrow text-slate">
                  Elsewhere in {entry?.parent ?? parentNode?.title}
                </p>
                <ul className="mt-6 divide-y divide-indigo-100 border-y border-indigo-100">
                  {siblings.map((sibling) => (
                    <li key={sibling.href}>
                      <Link
                        href={sibling.href}
                        className="group flex min-h-11 items-center justify-between gap-4 py-4 font-display text-[15px] font-medium text-indigo-800"
                      >
                        {sibling.title}
                        <ArrowRightIcon
                          size={17}
                          className="text-slate transition-all duration-200 group-hover:translate-x-1 group-hover:text-green-700"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
