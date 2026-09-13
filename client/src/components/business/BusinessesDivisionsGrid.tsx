import Image from "next/image";
import Link from "next/link";
import { BUSINESSES_DIVISIONS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/brand/Icons";
import { stagger } from "@/lib/utils";

/** Divisions grid — EMI stack businesses. */
export function BusinessesDivisionsGrid() {
  return (
    <Section id="divisions" tone="dark" className="relative overflow-hidden bg-indigo-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgb(42_183_124/0.12),transparent_45%)]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={BUSINESSES_DIVISIONS.eyebrow}
          title={BUSINESSES_DIVISIONS.title}
          lede={BUSINESSES_DIVISIONS.lede}
          tone="dark"
          align="center"
          className="justify-center"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {BUSINESSES_DIVISIONS.items.map((division, i) => {
            const Icon = division.icon;
            const comingSoon = division.href === "/coming-soon";

            return (
              <Reveal as="li" key={division.title} delay={stagger(i, 0.05)}>
                <Link
                  href={division.href}
                  className="group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-white/10"
                >
                  <Image
                    src={division.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-indigo-950 via-indigo-950/75 to-indigo-950/35"
                  />

                  <div className="relative z-10 flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                        <Icon size={28} tone="onDark" />
                      </span>
                      <span className="font-mono text-[11px] text-white/45">
                        {division.index}
                      </span>
                    </div>

                    <h3 className="mt-auto pt-8 font-display text-lg font-semibold text-white">
                      {division.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                      {division.copy}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-green-300">
                      {comingSoon ? "Coming soon" : "Explore"}
                      <ArrowRightIcon
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
