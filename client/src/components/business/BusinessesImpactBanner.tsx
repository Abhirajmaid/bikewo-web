import Image from "next/image";
import Link from "next/link";
import { BUSINESSES_IMPACT } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PlayIcon, ArrowRightIcon } from "@/components/brand/Icons";

/** Full-bleed ecosystem banner with subsidiary callouts. */
export function BusinessesImpactBanner() {
  return (
    <section
      id="impact"
      className="relative min-h-[30rem] overflow-hidden md:min-h-[34rem] lg:min-h-[38rem]"
    >
      <Image
        src={BUSINESSES_IMPACT.image.src}
        alt={BUSINESSES_IMPACT.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-indigo-950/90 via-indigo-950/55 to-indigo-950/30"
      />

      <Container className="relative flex min-h-[30rem] flex-col justify-between gap-12 py-16 md:min-h-[34rem] md:py-20 lg:min-h-[38rem] lg:py-24">
        <Reveal className="max-w-xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-400">
            {BUSINESSES_IMPACT.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,1.3rem+2.2vw,3.25rem)] font-semibold leading-[1.1] text-white">
            {BUSINESSES_IMPACT.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/65">
            {BUSINESSES_IMPACT.lede}
          </p>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {BUSINESSES_IMPACT.cards.map((card, i) => (
            <Reveal as="li" key={i} delay={0.08 + i * 0.06}>
              {card.type === "video" ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[9.5rem] flex-col items-start justify-between rounded-xl border border-white/15 bg-white/8 p-5 backdrop-blur-md transition-colors hover:bg-white/12"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-transform group-hover:scale-105">
                    <PlayIcon size={18} />
                  </span>
                  <span className="font-display text-sm font-semibold text-white">
                    {card.label}
                  </span>
                </a>
              ) : card.href.startsWith("http") ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[9.5rem] flex-col justify-between rounded-xl border border-white/15 bg-white/8 p-5 backdrop-blur-md transition-colors hover:bg-white/12"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-green-300">
                    {card.subtitle}
                  </p>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                      {card.copy}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-300">
                      Visit
                      <ArrowRightIcon
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
              ) : (
                <Link
                  href={card.href}
                  className="group flex min-h-[9.5rem] flex-col justify-between rounded-xl border border-white/15 bg-white/8 p-5 backdrop-blur-md transition-colors hover:bg-white/12"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-green-300">
                    {card.subtitle}
                  </p>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                      {card.copy}
                    </p>
                  </div>
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
