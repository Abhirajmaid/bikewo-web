import Image from "next/image";
import Link from "next/link";
import { BUSINESSES_DIVISIONS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/brand/Icons";
import { stagger } from "@/lib/utils";

/** Dark divisions grid — all six business divisions. */
export function BusinessesDivisionsGrid() {
  return (
    <Section id="divisions" tone="dark" className="bg-indigo-900">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark">{BUSINESSES_DIVISIONS.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-semibold leading-[1.12] text-white">
            {BUSINESSES_DIVISIONS.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/65">
            {BUSINESSES_DIVISIONS.lede}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {BUSINESSES_DIVISIONS.items.map((division, i) => {
            const Icon = division.icon;
            const hasImage = i % 2 === 1;

            return (
              <Reveal as="li" key={division.title} delay={stagger(i, 0.05)}>
                <Link
                  href={division.href}
                  className="group relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-lg border border-white/10 transition-transform duration-300 hover:-translate-y-1"
                >
                  {hasImage ? (
                    <>
                      <Image
                        src={division.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 400px, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-indigo-950 via-indigo-950/70 to-indigo-950/30"
                      />
                    </>
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-indigo-800"
                    />
                  )}

                  <div className="relative z-10 flex flex-1 flex-col p-6 md:p-7">
                    <span className="flex size-16 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                      <Icon size={40} tone="onDark" />
                    </span>
                    <span className="mt-4 font-mono text-[11px] text-white/50">
                      {division.index}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      {division.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/70">
                      {division.copy}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-green-300">
                      Explore
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
