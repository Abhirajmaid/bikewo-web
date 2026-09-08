import Image from "next/image";
import Link from "next/link";
import { ABOUT_HERO } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** About hero — headline, image card, stats and four pillars. */
export function AboutHero() {
  return (
    <Section className="border-b border-indigo-100 pt-32 pb-20 md:pt-40 md:pb-28 lg:pb-32">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="eyebrow flex flex-wrap items-center gap-2 text-slate">
            <li>
              <Link href="/" className="transition-colors hover:text-indigo-800">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-indigo-800">About BikeWo</li>
          </ol>
        </nav>

        <Reveal className="mt-8 text-center md:mt-10">
          <Eyebrow>{ABOUT_HERO.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-indigo-800">
            {ABOUT_HERO.title}
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={ABOUT_HERO.imageCard.src}
                alt={ABOUT_HERO.imageCard.alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-indigo-950/80 via-indigo-950/20 to-transparent"
              />
              <p className="absolute bottom-0 left-0 max-w-md p-6 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug text-white md:p-8">
                {ABOUT_HERO.imageCard.overlay}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center rounded-lg bg-green-50 p-8 md:p-10">
              <dl className="space-y-8">
                {ABOUT_HERO.stats.map((stat, i) => (
                  <div key={stat.label}>
                    <dd className="font-display text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-none tracking-tight text-indigo-800">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-3 font-display text-[15px] font-semibold text-indigo-800">
                      {stat.label}
                    </dt>
                    {i < ABOUT_HERO.stats.length - 1 && (
                      <div aria-hidden className="mt-8 border-b border-indigo-100" />
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {ABOUT_HERO.pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal as="li" key={pillar.title} delay={stagger(i)}>
                <div className="flex size-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">
                  <Icon size={44} />
                </div>
                <h2 className="mt-5 font-display text-lg font-semibold text-indigo-800">
                  {pillar.title}
                </h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate">
                  {pillar.copy}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
