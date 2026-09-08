import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_HERO, CONTACT_PAGE_WIDTH } from "@/lib/contact";

export function ContactHero() {
  return (
    <section className="border-b border-[#e8ebe9] bg-white pt-32 pb-12 md:pt-40 md:pb-16">
      <Container className={CONTACT_PAGE_WIDTH}>
        <Reveal>
          <h1 className="text-center font-display text-[clamp(1.875rem,1.1rem+2.8vw,3rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#052016]">
            {CONTACT_HERO.title}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <nav aria-label="Breadcrumb" className="mt-5 text-center">
            <ol className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-[#6b7280]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#052016]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[#9ca3af]">
                &gt;
              </li>
              <li className="text-[#052016]">{CONTACT_HERO.breadcrumb}</li>
            </ol>
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
