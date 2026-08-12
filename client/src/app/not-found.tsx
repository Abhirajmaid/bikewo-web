import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EnergyArc } from "@/components/brand/EnergyArc";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-indigo-950 pt-20">
      <div
        aria-hidden
        className="rider-pattern pointer-events-none absolute inset-0 opacity-[0.06] invert"
      />
      <EnergyArc
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full opacity-40"
        color="#35D68F"
      />

      <Container className="relative py-20">
        <p className="eyebrow text-green-400">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          This route isn&rsquo;t on the network yet.
        </h1>
        <p className="mt-5 max-w-lg leading-relaxed text-white/60">
          The page you asked for either moved or was never built. Let&rsquo;s get you
          back to somewhere useful.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" withArrow>
            Back to home
          </Button>
          <Button href="/contact" variant="onDark">
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
