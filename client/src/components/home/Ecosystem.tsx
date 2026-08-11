"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ECOSYSTEM } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mark } from "@/components/brand/Mark";
import { ArrowRightIcon, DIVISION_ICONS } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

/* The particle shell is decorative, so it never blocks first paint. */
const EcosystemField = dynamic(() => import("./EcosystemField"), { ssr: false });

const ORBIT_RADIUS = 40; // % of the square container

function nodePosition(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + ORBIT_RADIUS * Math.cos(rad),
    y: 50 + ORBIT_RADIUS * Math.sin(rad),
  };
}

/**
 * 5.3 — Interactive EMI Ecosystem.
 *
 * BikeWo sits at the centre, surrounded by animated nodes for each division.
 * Hovering or tapping a node expands its detail and highlights its connection
 * back to the masterbrand.
 */
export function Ecosystem() {
  const [activeId, setActiveId] = useState(ECOSYSTEM[0].id);
  const reduced = useReducedMotion();
  const active = ECOSYSTEM.find((n) => n.id === activeId)!;

  return (
    <Section id="ecosystem" tone="dark" className="relative overflow-hidden">
      {/* Ambient 3D field */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden size-[820px] -translate-x-1/2 -translate-y-1/2 opacity-40 lg:block"
      >
        <EcosystemField />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-indigo-950)_78%)]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="The integrated ecosystem"
          tone="dark"
          title={
            <>
              One company, from vehicle
              <br className="hidden sm:block" /> to charge to service.
            </>
          }
          lede="Competitors sell a vehicle or a charger. We operate the full value chain, so the customer never falls between providers."
        />

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Orbit graph */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              {/* Orbit rings */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r={ORBIT_RADIUS}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.12)"
                  strokeWidth="0.25"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={ORBIT_RADIUS * 0.62}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.07)"
                  strokeWidth="0.25"
                  strokeDasharray="1 2"
                />

                {/* Spokes — the active connection is the only green one */}
                {ECOSYSTEM.map((node) => {
                  const pos = nodePosition(node.angle);
                  const isActive = node.id === activeId;
                  return (
                    <line
                      key={node.id}
                      x1="50"
                      y1="50"
                      x2={pos.x}
                      y2={pos.y}
                      stroke={isActive ? "#2AB77C" : "rgb(255 255 255 / 0.14)"}
                      strokeWidth={isActive ? "0.5" : "0.25"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Centre — the masterbrand */}
              <div className="absolute left-1/2 top-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="relative flex size-full items-center justify-center rounded-full border border-green-500/40 bg-indigo-900">
                  {!reduced && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-green-500/40 [animation:bw-pulse-ring_3.2s_ease-out_infinite]"
                    />
                  )}
                  <Mark className="w-[44%] text-green-400" title="BikeWo" />
                </div>
              </div>

              {/* Division nodes */}
              {ECOSYSTEM.map((node) => {
                const pos = nodePosition(node.angle);
                const isActive = node.id === activeId;
                const NodeIcon =
                  DIVISION_ICONS[node.id as keyof typeof DIVISION_ICONS];

                return (
                  <button
                    key={node.id}
                    type="button"
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                    aria-pressed={isActive}
                    className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 md:size-16"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <span className="sr-only">{node.title}</span>
                    <span
                      className={cn(
                        "flex size-full items-center justify-center rounded-full border transition-colors duration-300",
                        isActive
                          ? "border-green-500 bg-green-500 text-indigo-800"
                          : "border-white/20 bg-indigo-900/80 text-white/70 backdrop-blur-sm",
                      )}
                    >
                      <NodeIcon size={22} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="glass-dark rounded-lg p-8 lg:p-10"
              >
                <p className="eyebrow text-green-400">Pillar {active.index}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-white lg:text-[1.75rem]">
                  {active.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/65">{active.detail}</p>

                <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="font-display text-3xl font-bold tracking-tight text-white">
                      {active.stat.value}
                    </p>
                    <p className="eyebrow mt-2 text-white/60">{active.stat.label}</p>
                  </div>
                  <Link
                    href={active.href}
                    className="group inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-green-400 transition-colors hover:text-green-300"
                  >
                    Explore
                    <ArrowRightIcon
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Text list doubles as the mobile control and the a11y fallback */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {ECOSYSTEM.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    onMouseEnter={() => setActiveId(node.id)}
                    className={cn(
                      "min-h-11 rounded-full border px-4 text-[13px] font-medium transition-colors",
                      node.id === activeId
                        ? "border-green-500/60 bg-green-500/15 text-green-300"
                        : "border-white/15 text-white/55 hover:border-white/30 hover:text-white/80",
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
