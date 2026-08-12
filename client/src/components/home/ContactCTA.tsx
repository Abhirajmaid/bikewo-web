import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EnergyArc } from "@/components/brand/EnergyArc";

/** 5.12 — Contact CTA. One clear ask, in the brand's own words. */
export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-indigo-800">
      <div
        aria-hidden
        className="rider-pattern pointer-events-none absolute inset-0 opacity-[0.07] invert"
      />
      <EnergyArc
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-50"
        color="#35D68F"
      />

      <Container className="relative py-20 md:py-24 lg:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="dark">Get in touch</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(1.875rem,1.1rem+2.8vw,3.25rem)] leading-[1.1] text-white">
                Whatever you need to electrify,
                <br className="hidden sm:block" /> we already run that part.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
                Buying a vehicle, leasing a fleet, hosting a charge point or joining
                the channel — tell us which, and we will route you to the team that
                owns it.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex flex-wrap gap-3">
            <Button href="/contact" withArrow>
              Talk to our team
            </Button>
            <Button href="/shram-sainik/apply" variant="onDark">
              Become a driver-partner
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
