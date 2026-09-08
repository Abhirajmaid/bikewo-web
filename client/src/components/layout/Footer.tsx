import Link from "next/link";
import { NAV, SITE, SOCIALS, type NavNode } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";
import { ArrowUpRightIcon } from "@/components/brand/Icons";
import { Container } from "@/components/layout/Container";
import { STATS_FOOTNOTE } from "@/lib/content";
import { INVESTOR_TOPICS } from "@/lib/investors";

/** Titles removed from the header stay out of the footer too. */
const HIDDEN = new Set(["Subsidiaries", "Shram Sainik", "Sustainability"]);

const FOOTER_NAV: NavNode[] = NAV.map((n) =>
  n.title === "Investors"
    ? {
        ...n,
        children: INVESTOR_TOPICS.filter((t) => t.slug !== "all").map((t) => ({
          title: t.label,
          href: `/investors?topic=${t.slug}#library`,
        })),
      }
    : n,
);

/** 5.13 — Premium footer. Header sitemap plus Careers / Contact. */
export function Footer() {
  const columns = FOOTER_NAV.filter((n) => n.children?.length && !HIDDEN.has(n.title));
  const singles = FOOTER_NAV.filter((n) => !n.children?.length && !HIDDEN.has(n.title));

  return (
    <footer className="relative overflow-hidden bg-indigo-950 text-white">
      {/* Rider Pattern at 8% — packaging, endpapers and empty states. */}
      {/* <div
        aria-hidden
        className="rider-pattern pointer-events-none absolute inset-0 opacity-[0.08] invert"
      /> */}

      <Container className="relative py-20 lg:py-24">
        <div className="flex flex-col gap-12 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Logo variant="reversed" height={40} />
            <p className="mt-6 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-[1.2] tracking-tight text-white">
              We move goods. We move{" "}
              <span className="text-green-400">India</span>.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-white/60">
              Logistics is our core. EMI is our differentiator — we build the
              energy and mobility infrastructure behind every movement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-display text-sm font-medium text-white/85 transition-colors hover:border-white/45 hover:text-white"
              >
                {s.label}
                <ArrowUpRightIcon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 lg:grid-cols-4"
        >
          {columns.map((col) => (
            <div key={col.href}>
              <Link
                href={col.href}
                className="eyebrow inline-block text-green-400 transition-opacity hover:opacity-80"
              >
                {col.title}
              </Link>
              <ul className="mt-5 space-y-3">
                {col.children!.map((child) => (
                  <li key={child.href}>
                    {child.external ? (
                      <a
                        href={child.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex min-h-6 items-center text-[14.5px] leading-snug text-white/60 transition-colors hover:text-white"
                      >
                        {child.title}
                      </a>
                    ) : (
                      <Link
                        href={child.href}
                        className="flex min-h-6 items-center text-[14.5px] leading-snug text-white/60 transition-colors hover:text-white"
                      >
                        {child.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow text-green-400">More</p>
            <ul className="mt-5 space-y-3">
              {singles.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14.5px] leading-snug text-white/60 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Claims discipline: figures on this site carry their qualification. */}
        <p className="max-w-3xl border-t border-white/10 pt-8 text-xs leading-relaxed text-white/60">
          {STATS_FOOTNOTE}
        </p>

        <div className="mt-8 flex flex-col gap-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Mark className="h-5 w-auto text-green-400" />
            <p>
              © {new Date().getFullYear()} {SITE.legalName}. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <a
              href={`mailto:${SITE.brandEmail}`}
              className="transition-colors hover:text-white"
            >
              {SITE.brandEmail}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
