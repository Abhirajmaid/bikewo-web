import Image from "next/image";
import { SHRAM_SAINIK } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  AcademyIcon,
  ClockIcon,
  HeadsetIcon,
  PeopleIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/brand/Icons";

const ICONS = [WalletIcon, ClockIcon, ShieldIcon, AcademyIcon, PeopleIcon, HeadsetIcon];

/**
 * 5.6 — Shram Sainik driver-partner programme.
 *
 * Tone here is respectful and aspirational; dignity is the theme, not charity.
 * The programme carries Solar Amber as its division colour — never a new
 * brand colour, and never in place of the masterbrand palette.
 */
export function ShramSainik() {
  return (
    <Section tone="cloud" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Portrait */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[3/2] lg:aspect-[4/5]">
              <Image
                src="/assets/shram-sainik.png"
                alt="A BikeWo driver-partner beside an electric scooter on an Indian street, wearing the programme's navy mesh safety jacket and peak cap."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Scrim weighted to the lower third so the caption clears AA
                  against the photograph, not just against the gradient. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/45 to-transparent to-70%"
              />
              <div className="absolute inset-x-6 bottom-6">
                <p className="font-display text-lg font-semibold text-white">
                  Zero joining fee. Weekly payouts. 24×7 support.
                </p>
              </div>
            </div>

            {/* Programme accent — Solar Amber */}
            <span
              aria-hidden
              className="absolute -left-3 top-8 hidden h-24 w-1.5 rounded-full bg-amber lg:block"
            />
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>{SHRAM_SAINIK.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12]">
                {SHRAM_SAINIK.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate">
                {SHRAM_SAINIK.lede}
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {SHRAM_SAINIK.benefits.map((benefit, i) => {
                const BenefitIcon = ICONS[i];
                return (
                  <Reveal as="li" key={benefit.title} delay={stagger(i, 0.05)}>
                    <BenefitIcon size={56} />
                    <h3 className="mt-3 font-display text-[15px] font-semibold text-indigo-800">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate">
                      {benefit.copy}
                    </p>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.2}>
              <Button href={SHRAM_SAINIK.cta.href} className="mt-10" withArrow>
                {SHRAM_SAINIK.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
