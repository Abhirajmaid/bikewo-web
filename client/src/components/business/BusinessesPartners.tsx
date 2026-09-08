import Link from "next/link";
import { BUSINESSES_PARTNERS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Trusted partners band — subsidiaries in multi-column list layout. */
export function BusinessesPartners() {
  return (
    <Section tone="cloud" className="border-y border-indigo-100">
      <Container>
        <Reveal>
          <Eyebrow>{BUSINESSES_PARTNERS.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] font-semibold leading-snug text-indigo-800">
            {BUSINESSES_PARTNERS.title}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {BUSINESSES_PARTNERS.items.map((partner, i) => {
            const external = partner.href.startsWith("http");
            const className = "group block";
            const body = (
              <>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate">
                  {partner.kind}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-indigo-800 transition-colors group-hover:text-green-700">
                  {partner.name}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">
                  {partner.copy}
                </p>
              </>
            );

            return (
              <Reveal as="li" key={partner.name} delay={stagger(i)}>
                {external ? (
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={partner.href} className={className}>
                    {body}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
