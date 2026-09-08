import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "BikeWo VZN and Ignesium Energy are on their way. Explore the rest of the EMI ecosystem or get in touch.",
  alternates: { canonical: "/coming-soon" },
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <Image
        src="/assets/coming_soon_2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-indigo-950/50 via-indigo-950/35 to-indigo-950/65"
      />

      <Container className="relative z-10 flex w-full flex-col items-center py-32 text-center md:py-40">
        <Reveal>
          <p className="eyebrow text-green-300">Stay tuned</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,1.4rem+6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            Coming Soon
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/80">
            This division is still being built. Explore the rest of the BikeWo
            ecosystem, or talk to us about what&apos;s next.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="onDark">
              Home
            </Button>
            <Button href="/contact" variant="primary" withArrow>
              Contact
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
