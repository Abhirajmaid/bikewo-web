import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MEDIA_PAGE } from "@/lib/media";

/** Light, centred hero for the newsroom listing — matches editorial reference layout. */
export function MediaHero() {
  return (
    <section className="border-b border-indigo-100 bg-white pb-12 pt-32 md:pb-16 md:pt-40">
      <Container>
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="eyebrow flex flex-wrap items-center justify-center gap-2 text-slate"
          >
            <Link href="/" className="transition-colors hover:text-indigo-800">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-green-700">News & insights</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-7 max-w-3xl text-center font-display text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-indigo-800">
            {MEDIA_PAGE.title}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[1.0625rem] leading-relaxed text-slate">
            {MEDIA_PAGE.lede}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
