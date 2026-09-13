import Image from "next/image";
import { BUSINESSES_PLANET } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Closing sustainability banner. */
export function BusinessesPlanetBanner() {
  return (
    <section className="relative min-h-[22rem] overflow-hidden md:min-h-[26rem]">
      <Image
        src={BUSINESSES_PLANET.image.src}
        alt={BUSINESSES_PLANET.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-indigo-950/92 via-indigo-950/70 to-indigo-950/45"
      />

      <Container className="relative flex min-h-[22rem] items-center py-16 md:min-h-[26rem] md:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,1.6rem+2.8vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {BUSINESSES_PLANET.title}
              <br />
              <span className="text-green-400">{BUSINESSES_PLANET.accent}</span>
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
              {BUSINESSES_PLANET.lede}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <Button href={BUSINESSES_PLANET.cta.href} variant="onDark" withArrow>
              {BUSINESSES_PLANET.cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
