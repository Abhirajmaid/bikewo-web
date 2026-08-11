import Image from "next/image";
import Link from "next/link";
import { DIVISIONS } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/brand/Icons";

/** 5.4 — Business Divisions. */
export function Divisions() {
  return (
    <Section tone="cloud">
      <Container>
        <SectionHeading
          eyebrow="Businesses"
          title="Seven divisions. One accountable system."
          lede="Each division runs its own P&L and its own standards — and hands off to the next without the customer noticing a seam."
          action={
            <Button href="/businesses" variant="ghost" withArrow>
              All businesses
            </Button>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {DIVISIONS.map((division, i) => (
            <Reveal
              key={division.title}
              as="li"
              delay={stagger(i, 0.05)}
              /* The seventh card fills the trailing gap on 3-up. */
              className={i === 6 ? "lg:col-span-1 sm:col-span-2 lg:col-start-3" : undefined}
            >
              <Link
                href={division.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-indigo-100 bg-white transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_12px_32px_rgb(36_31_93/0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={division.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-green-500 font-mono text-xs font-medium text-indigo-800">
                    {division.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-indigo-800">
                    {division.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate">
                    {division.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-green-700">
                    Explore
                    <ArrowRightIcon
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
