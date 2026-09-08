"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ECOSYSTEM } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Logo } from "@/components/brand/Logo";
import { ArrowRightIcon, DIVISION_ICONS } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

const ORBIT = 36; // % of the square — leaves room for node labels

function pos(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + ORBIT * Math.cos(rad),
    y: 50 + ORBIT * Math.sin(rad),
  };
}

/** Interactive ecosystem — BikeWo at the centre, six businesses on the orbit. */
export function Ecosystem() {
  const [activeId, setActiveId] = useState(ECOSYSTEM[0].id);
  const reduced = useReducedMotion();
  const active = ECOSYSTEM.find((n) => n.id === activeId)!;
  const ActiveIcon = DIVISION_ICONS[active.id as keyof typeof DIVISION_ICONS];

  return (
    <Section id="ecosystem" tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rider-pattern opacity-[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] size-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(42_183_124/0.18)_0%,transparent_68%)]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="The integrated ecosystem"
          tone="dark"
          align="center"
          title={
            <>
              Logistics is our core.
              <br className="hidden sm:block" /> EMI is our differentiator.
            </>
          }
          lede="We connect mobility, energy and technology to create smarter, more scalable logistics ecosystems."
        />

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Orbit */}
          <div className="lg:col-span-8">
            <div className="relative mx-auto aspect-square w-full max-w-[640px] lg:max-w-none xl:max-w-[720px]">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r={ORBIT}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="0.2"
                  strokeDasharray="0.8 1.6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={ORBIT * 0.55}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.06)"
                  strokeWidth="0.2"
                />
                {ECOSYSTEM.map((node) => {
                  const p = pos(node.angle);
                  const on = node.id === activeId;
                  return (
                    <line
                      key={node.id}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={on ? "#2AB77C" : "rgb(255 255 255 / 0.12)"}
                      strokeWidth={on ? "0.45" : "0.2"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Centre — bikeWo wordmark (wide hub so the logo breathes) */}
              <div className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2 sm:w-[40%]">
                <div className="relative flex aspect-[5/3] w-full items-center justify-center rounded-[2rem] border border-green-500/35 bg-indigo-950/90 px-5 shadow-[0_0_56px_rgb(42_183_124/0.22)] sm:rounded-[2.75rem] sm:px-6">
                  {!reduced && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] border border-green-500/25 [animation:bw-pulse-ring_3.2s_ease-out_infinite]"
                    />
                  )}
                  <Logo variant="white" height={36} className="relative sm:hidden" />
                  <Logo variant="white" height={44} className="relative hidden sm:block lg:hidden" />
                  <Logo variant="white" height={52} className="relative hidden lg:block" />
                </div>
              </div>

              {ECOSYSTEM.map((node) => {
                const p = pos(node.angle);
                const on = node.id === activeId;
                const Icon = DIVISION_ICONS[node.id as keyof typeof DIVISION_ICONS];

                return (
                  <button
                    key={node.id}
                    type="button"
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                    aria-pressed={on}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span
                      className={cn(
                        "flex size-20 items-center justify-center rounded-full border transition-all duration-300 md:size-24 lg:size-28",
                        on
                          ? "scale-110 border-green-500 bg-green-500 text-indigo-950 shadow-[0_0_28px_rgb(42_183_124/0.5)]"
                          : "border-white/20 bg-indigo-950/90 text-white/65 hover:border-white/40 hover:text-white",
                      )}
                    >
                      <Icon size={52} tone="onDark" />
                    </span>
                    <span
                      className={cn(
                        "max-w-[6.5rem] text-center text-xs font-medium leading-tight transition-colors md:text-sm",
                        on ? "text-green-300" : "text-white/45",
                      )}
                    >
                      {node.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active detail */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="relative border-l-2 border-green-500 pl-6 sm:pl-8"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                  <ActiveIcon size={44} tone="onDark" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white lg:text-[1.85rem]">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/60">
                  {active.detail}
                </p>
                <Link
                  href={active.href}
                  className="group mt-7 inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-green-400 transition-colors hover:text-green-300"
                >
                  {active.href === "/coming-soon" ? "Coming Soon" : "Explore"}
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Compact switcher — mobile / keyboard fallback */}
            <ul className="mt-10 flex flex-wrap gap-2 lg:hidden">
              {ECOSYSTEM.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={cn(
                      "min-h-10 rounded-md border px-3 text-xs font-medium transition-colors",
                      node.id === activeId
                        ? "border-green-500/50 bg-green-500/15 text-green-300"
                        : "border-white/15 text-white/50",
                    )}
                  >
                    {node.short}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
