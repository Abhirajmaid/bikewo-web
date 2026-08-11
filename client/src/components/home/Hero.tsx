"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { EnergyArc } from "@/components/brand/EnergyArc";
import { ChevronDownIcon } from "@/components/brand/Icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * 5.1 — Hero Experience.
 *
 * A cinematic full-screen plate: connected smart city, EVs, charging canopies,
 * renewable assets, drones and logistics. Headline bottom-left over a Midnight
 * scrim, logo clear space respected by the fixed header above.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Entrance: the headline resolves line by line from behind a mask.
      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-hero-line] > span", {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.09,
            delay: 0.15,
          })
          .from(
            "[data-hero-fade]",
            { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
            "-=0.65",
          );
      }

      // Parallax: the plate drifts slower than the copy, so the frame gains
      // depth as the page moves off it.
      if (!reduced) {
        gsap.to("[data-hero-plate]", {
          yPercent: 14,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-copy]", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "40% top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-neutral-950">
      {/* Plate */}
      <div data-hero-plate className="absolute inset-0 will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Flat gray/black scrim for headline legibility */}
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      {/* The Energy Arc, entering lower-left and exiting upper-right */}
      <EnergyArc className="absolute inset-x-0 bottom-[18%] h-64 w-full opacity-45" />

      {/* Copy — bottom-left corner, outside container */}
      <div
        data-hero-copy
        className="absolute bottom-20 left-5 z-10 w-[min(92vw,56rem)] will-change-transform md:bottom-24 md:left-8 lg:bottom-28 lg:left-12"
      >
        <h1 className="font-display text-[clamp(1.45rem,0.7rem+2.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          {HERO.titleLines.map((line, i) => (
            <span key={line} data-hero-line className="block overflow-hidden pb-[0.08em]">
              <span className="block">
                {i === HERO.titleLines.length - 1 ? (
                  <>
                    {line.replace(".", "")}
                    <span className="text-green-400">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-4 text-[1.0625rem] leading-relaxed text-white/70 md:whitespace-nowrap"
        >
          {HERO.lede}
        </p>

        <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3">
          <Button href={HERO.primaryCta.href} withArrow>
            {HERO.primaryCta.label}
          </Button>
          <Button href={HERO.secondaryCta.href} variant="onDark">
            {HERO.secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Division marquee */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-indigo-950/40 backdrop-blur-md">
        <div className="flex h-14 items-center overflow-hidden">
          <div
            className="flex shrink-0 items-center gap-10 pr-10 [animation:bw-marquee_38s_linear_infinite] motion-reduce:[animation:none]"
            aria-hidden
          >
            {[...HERO.marquee, ...HERO.marquee].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="eyebrow flex shrink-0 items-center gap-10 whitespace-nowrap text-white/60"
              >
                {item}
                <span className="size-1 rounded-full bg-green-400/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 text-white/50 lg:block"
      >
        <ChevronDownIcon
          size={22}
          className="[animation:bw-scroll-cue_2.2s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
}
