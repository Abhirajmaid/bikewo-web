import Link from "next/link";
import Image from "next/image";
import { BUSINESSES_PARTNERS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/brand/Icons";
import { stagger } from "@/lib/utils";

/** Subsidiaries — BikeWo Mobility Group. */
export function BusinessesPartners() {
  return (
    <Section tone="cloud" className="border-y border-indigo-100">
      <Container>
        <SectionHeading
          eyebrow={BUSINESSES_PARTNERS.eyebrow}
          title={BUSINESSES_PARTNERS.title}
          lede={BUSINESSES_PARTNERS.lede}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {BUSINESSES_PARTNERS.items.map((partner, i) => {
            const external = partner.href.startsWith("http");
            const body = (
              <>
                {partner.logo ? (
                  <span className="relative mb-5 block h-8 w-28">
                    <Image
                      src={partner.logo}
                      alt=""
                      fill
                      className="object-contain object-left"
                      sizes="112px"
                    />
                  </span>
                ) : (
                  <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
                    {partner.kind}
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-indigo-800 transition-colors group-hover:text-green-700">
                  {partner.name}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate">
                  {partner.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-indigo-800">
                  Explore
                  <ArrowUpRightIcon
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </>
            );

            const className =
              "group flex h-full flex-col rounded-xl border border-indigo-100 bg-white p-6 transition-shadow duration-300 hover:shadow-lift";

            return (
              <Reveal as="li" key={partner.name} delay={stagger(i, 0.05)}>
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
