import Image from "next/image";
import Link from "next/link";
import { ABOUT_HERO } from "@/lib/about";
import { ArrowUpRightIcon } from "@/components/brand/Icons";
import { Mark } from "@/components/brand/Mark";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { cn, stagger } from "@/lib/utils";

/** About hero — dark page header, then story cards and four pillars. */
export function AboutHero() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About BikeWo" },
        ]}
        title="About BikeWo"
        lede={ABOUT_HERO.title}
      />

      <Section className="border-b border-indigo-100">
        <Container>
          <ul className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {ABOUT_HERO.story.map((card, i) => (
              <Reveal as="li" key={card.title} delay={stagger(i, 0.08)} className="h-full">
                <Link
                  href={card.cta.href}
                  aria-label={`${card.title}. ${card.cta.label}`}
                  className={cn(
                    "group relative flex h-full min-h-88 flex-col overflow-hidden rounded-lg p-8 md:min-h-104 md:p-9 lg:min-h-112 lg:p-10",
                    "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "active:scale-[0.985]",
                    card.kind === "solid" && "bg-indigo-950",
                  )}
                >
                  {card.kind === "photo" && (
                    <>
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-indigo-950/85 via-indigo-950/25 to-transparent"
                      />
                    </>
                  )}

                  <div className="relative flex h-full min-h-0 flex-col">
                    {card.kind === "solid" && card.logo && (
                      <div aria-hidden className="mb-10 flex items-center gap-2">
                        <Mark className="size-6 text-green-500" />
                        <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                          BikeWo
                        </span>
                      </div>
                    )}

                    <div className={cn(card.kind === "photo" && "mt-auto")}>
                      <h2
                        className={cn(
                          "font-display font-semibold leading-snug tracking-tight text-white",
                          card.kind === "photo"
                            ? "text-[clamp(1.25rem,1rem+0.9vw,1.625rem)]"
                            : "text-[clamp(1.375rem,1.1rem+0.8vw,1.75rem)]",
                        )}
                      >
                        {card.title}
                      </h2>

                      {card.kind === "solid" && (
                        <div className="mt-5 space-y-4">
                          {card.body.map((paragraph) => (
                            <p
                              key={paragraph.slice(0, 40)}
                              className="text-[15px] leading-relaxed text-white/75"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 pt-8 font-display text-[15px] font-semibold",
                        card.kind === "solid" && "mt-auto",
                        card.kind === "photo" ? "text-white" : "text-green-400",
                      )}
                    >
                      {card.cta.label}
                      <ArrowUpRightIcon
                        size={16}
                        className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

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
    </>
  );
}
