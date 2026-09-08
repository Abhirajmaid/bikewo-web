import Image from "next/image";
import { BUSINESSES_PLANET } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Full-width planet banner — dark gradient with hero image. */
export function BusinessesPlanetBanner() {
  return (
    <section className="relative min-h-[24rem] overflow-hidden md:min-h-[28rem]">
      <Image
        src={BUSINESSES_PLANET.image.src}
        alt={BUSINESSES_PLANET.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-indigo-950/90 via-indigo-950/60 to-indigo-950/40"
      />

      <Container className="relative flex min-h-[24rem] items-center py-16 md:min-h-[28rem] md:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              {BUSINESSES_PLANET.title}
              <br />
              <span className="text-green-400">{BUSINESSES_PLANET.accent}</span>
            </h2>
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
