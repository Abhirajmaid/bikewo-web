import Image from "next/image";
import Link from "next/link";
import { SUBSIDIARIES } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/brand/Icons";
import { cn, stagger } from "@/lib/utils";

/**
 * 5.5 — Subsidiaries as notched company cards. Whole card is the hit target;
 * the corner disc is the visual affordance only.
 */

const NOTCH =
  "[mask-image:radial-gradient(circle_30px_at_calc(100%-22px)_calc(100%-22px),transparent_30px,#000_30.5px)] [-webkit-mask-image:radial-gradient(circle_30px_at_calc(100%-22px)_calc(100%-22px),transparent_30px,#000_30.5px)]";

const VARIANT = {
  dark: {
    shell: "bg-indigo-800",
    index: "text-white/55",
    rule: "bg-white/25",
    title: "text-white",
    copy: "text-white/70",
    cta: "text-white/85 decoration-white/40",
    align: "justify-end",
  },
  accent: {
    shell: "bg-green-500",
    index: "text-indigo-800/55",
    rule: "bg-indigo-800/20",
    title: "text-indigo-800",
    copy: "text-indigo-800/75",
    cta: "text-indigo-800 decoration-indigo-800/35",
    align: "justify-start",
  },
  photo: {
    shell: "bg-indigo-950",
    index: "text-white/55",
    rule: "bg-white/25",
    title: "text-white",
    copy: "text-white/70",
    cta: "text-white/85 decoration-white/40",
    align: "justify-end",
  },
  muted: {
    shell: "bg-cloud",
    index: "text-slate",
    rule: "bg-indigo-200",
    title: "text-indigo-800",
    copy: "text-slate",
    cta: "text-indigo-800 decoration-indigo-300",
    align: "justify-end",
  },
} as const;

export function Subsidiaries() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Subsidiaries"
          title="A branded house, with endorsed companies."
          lede="The masterbrand always leads. Sub-brands earn distinction only where they serve a genuinely different customer."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {SUBSIDIARIES.map((sub, i) => {
            const v = VARIANT[sub.variant];
            const hasImage = "image" in sub && !!sub.image;
            const external = "external" in sub && !!sub.external;
            const cardClass =
              "group relative block h-full min-h-100 lg:min-h-108";

            const inner = (
              <>
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 pb-14",
                    NOTCH,
                    v.shell,
                    v.align,
                  )}
                >
                  {sub.variant === "photo" && hasImage ? (
                    <Image
                      src={sub.image!}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-[center_30%]"
                    />
                  ) : null}
                  {sub.variant === "photo" ? (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-indigo-950/25"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[65%] bg-linear-to-t from-indigo-950 via-indigo-950/85 to-transparent"
                      />
                    </>
                  ) : null}

                  {sub.variant === "accent" && hasImage ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
                      <Image
                        src={sub.image!}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-b from-green-500 via-green-500/45 to-green-500/10"
                      />
                    </div>
                  ) : null}

                  <div className="relative z-10 flex flex-col">
                    <span
                      className={cn(
                        "font-mono text-[11px] tracking-[0.08em]",
                        v.index,
                      )}
                    >
                      {sub.index}.
                    </span>
                    <span
                      aria-hidden
                      className={cn("mt-3 h-px w-full", v.rule)}
                    />

                    {"logo" in sub && sub.logo ? (
                      <div className="mt-6 flex h-12 w-fit items-center rounded-lg bg-white px-3 py-1.5">
                        <Image
                          src={sub.logo}
                          alt=""
                          width={160}
                          height={48}
                          className="h-9 w-auto max-w-40 object-contain object-left"
                        />
                      </div>
                    ) : null}

                    <h3
                      className={cn(
                        "font-display text-[1.35rem] font-semibold leading-snug",
                        "logo" in sub && sub.logo ? "mt-4" : "mt-6",
                        v.title,
                      )}
                    >
                      {sub.name}
                    </h3>
                    <p
                      className={cn("mt-3 text-[14px] leading-relaxed", v.copy)}
                    >
                      {sub.copy}
                    </p>
                    <span
                      className={cn(
                        "mt-5 inline-block text-[13px] font-medium underline underline-offset-[5px] transition-opacity duration-200 group-hover:opacity-80",
                        v.cta,
                      )}
                    >
                      {sub.cta}
                    </span>
                  </div>
                </article>

                <span
                  aria-hidden
                  className="absolute bottom-0 right-0 flex size-11 items-center justify-center rounded-full bg-green-500 text-indigo-800 shadow-[0_4px_12px_rgb(36_31_93/0.18)] transition-transform duration-300 ease-out-expo group-hover:scale-105"
                >
                  <ArrowUpRightIcon
                    size={18}
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </>
            );

            return (
              <Reveal key={sub.name} as="li" delay={stagger(i)}>
                {external ? (
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={sub.href} className={cardClass}>
                    {inner}
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
