import Image from "next/image";
import Link from "next/link";
import { BUSINESSES_IMPACT } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PlayIcon } from "@/components/brand/Icons";

/** Full-bleed impact banner with frosted-glass overlay cards. */
export function BusinessesImpactBanner() {
  return (
    <section id="impact" className="relative min-h-[32rem] overflow-hidden md:min-h-[36rem] lg:min-h-[40rem]">
      <Image
        src={BUSINESSES_IMPACT.image.src}
        alt={BUSINESSES_IMPACT.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-indigo-950/60 via-indigo-950/30 to-transparent"
      />

      <Container className="relative flex min-h-[32rem] flex-col justify-between py-16 md:min-h-[36rem] md:py-20 lg:min-h-[40rem] lg:py-24">
        <Reveal className="ml-auto max-w-md text-right">
          <p className="eyebrow text-white/70">{BUSINESSES_IMPACT.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.4rem+2.5vw,3.5rem)] font-semibold leading-[1.1] text-white">
            {BUSINESSES_IMPACT.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-5">
          {BUSINESSES_IMPACT.cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.06}>
              {card.type === "video" ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[10rem] flex-col items-center justify-center rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  <span className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-transform group-hover:scale-105">
                    <PlayIcon size={24} />
                  </span>
                  <span className="mt-4 font-display text-sm font-semibold text-white">
                    {card.label}
                  </span>
                </a>
              ) : card.href.startsWith("http") ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[10rem] flex-col justify-end rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-green-300">
                    {card.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    {card.copy}
                  </p>
                </a>
              ) : (
                <Link
                  href={card.href}
                  className="group flex min-h-[10rem] flex-col justify-end rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-green-300">
                    {card.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    {card.copy}
                  </p>
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
