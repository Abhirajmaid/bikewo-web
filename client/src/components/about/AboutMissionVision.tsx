import Image from "next/image";
import { ABOUT_MISSION_VISION } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/Reveal";

const RIBBON_TEXT = `${ABOUT_MISSION_VISION.ribbon} · ${ABOUT_MISSION_VISION.ribbon} · `;

/** Decorative eight-point asterisk frame with logo at centre. */
function AsteriskLogo() {
  const arms = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="relative size-48 sm:size-56 md:size-64 lg:size-72">
      {arms.map((deg) => (
        <div
          key={deg}
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[130%] w-[30%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-indigo-900/50"
          style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
        >
          <div className="size-full bg-linear-to-b from-white/10 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-[22%] flex items-center justify-center rounded-full bg-white shadow-[0_16px_48px_rgb(0_0_0/0.35)]">
        <Logo variant="primary" height={32} className="sm:h-9! md:h-10! lg:h-11!" priority />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-[18%] rounded-full border border-green-400/30"
      />
    </div>
  );
}

/** Mission & vision — editorial composition with asterisk logo focal point. */
export function AboutMissionVision() {
  return (
    <Section id="mission-vision" className="relative overflow-hidden bg-[#063024] py-20 md:py-28 lg:py-32">
      <Container>
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-semibold leading-[1.12] text-white">
            {ABOUT_MISSION_VISION.title}
          </h2>
        </Reveal>

        {/* Mobile / tablet — stacked layout */}
        <div className="mt-12 space-y-8 lg:hidden">
          <Reveal delay={0.05}>
            <div className="flex max-w-md items-stretch overflow-hidden rounded-full">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center bg-green-400 font-mono text-lg text-indigo-950"
              >
                *
              </span>
              <p className="flex items-center bg-indigo-950/70 px-4 py-2.5 text-[13px] leading-snug text-white/75">
                {ABOUT_MISSION_VISION.badge}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex justify-center py-4">
            <AsteriskLogo />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="-mx-5 overflow-hidden bg-green-400 py-3.5 sm:-mx-0 sm:rounded-lg">
              <div className="flex overflow-hidden">
                <div className="flex shrink-0 [animation:bw-marquee_28s_linear_infinite] motion-reduce:[animation:none]">
                  {[RIBBON_TEXT, RIBBON_TEXT].map((text, i) => (
                    <span
                      key={i}
                      className="whitespace-nowrap px-4 font-display text-sm font-semibold text-indigo-950"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[15px] leading-relaxed text-white/60">{ABOUT_MISSION_VISION.quote}</p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="bg-white p-5 sm:p-6">
              <span
                aria-hidden
                className="inline-flex size-7 items-center justify-center font-mono text-sm text-green-600"
              >
                *
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-ink sm:text-[15px]">
                {ABOUT_MISSION_VISION.card.copy}
              </p>
              <Button
                href={ABOUT_MISSION_VISION.cta.href}
                variant="ghost"
                withArrow
                className="mt-5 h-10 px-5 text-sm"
              >
                {ABOUT_MISSION_VISION.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Desktop — editorial absolute composition */}
        <div className="relative mt-14 hidden min-h-[34rem] lg:block xl:min-h-[38rem]">
          <Reveal delay={0.05} className="absolute left-0 top-4 z-20">
            <div className="flex max-w-sm items-stretch overflow-hidden rounded-full">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center bg-green-400 font-mono text-lg text-indigo-950"
              >
                *
              </span>
              <p className="flex items-center bg-indigo-950/70 px-5 py-2.5 text-sm leading-snug text-white/75">
                {ABOUT_MISSION_VISION.badge}
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="pointer-events-none absolute left-6 top-[38%] z-10 select-none"
            aria-hidden
          >
            <span className="bg-linear-to-b from-green-400 to-green-600 bg-clip-text font-serif text-[9rem] leading-none text-transparent">
              &ldquo;
            </span>
          </Reveal>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-8%] top-[46%] z-0 -translate-y-1/2 overflow-hidden"
          >
            <div className="relative -rotate-[4deg] bg-green-400 py-4 shadow-[0_8px_32px_rgb(42_183_124/0.25)]">
              <div className="flex overflow-hidden">
                <div className="flex shrink-0 [animation:bw-marquee_28s_linear_infinite] motion-reduce:[animation:none]">
                  {[RIBBON_TEXT, RIBBON_TEXT].map((text, i) => (
                    <span
                      key={i}
                      className="whitespace-nowrap px-4 font-display text-base font-semibold text-indigo-950"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Reveal
            delay={0.1}
            className="absolute left-1/2 top-[50%] z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <AsteriskLogo />
          </Reveal>

          <Reveal delay={0.14} className="absolute bottom-0 right-0 z-20 max-w-sm bg-white p-6 shadow-[0_12px_40px_rgb(0_0_0/0.2)]">
            <span
              aria-hidden
              className="inline-flex size-7 items-center justify-center font-mono text-sm text-green-600"
            >
              *
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              {ABOUT_MISSION_VISION.card.copy}
            </p>
            <Button
              href={ABOUT_MISSION_VISION.cta.href}
              variant="ghost"
              withArrow
              className="mt-5 h-10 px-5 text-sm"
            >
              {ABOUT_MISSION_VISION.cta.label}
            </Button>
          </Reveal>

          <Reveal delay={0.12} className="absolute bottom-4 left-0 z-10 max-w-sm">
            <p className="text-[15px] leading-relaxed text-white/60">
              {ABOUT_MISSION_VISION.quote}
            </p>
          </Reveal>
        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
      >
        <Image src="/brand/mark.svg" alt="" width={480} height={450} className="text-white" />
      </div>
    </Section>
  );
}
