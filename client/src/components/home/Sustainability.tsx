"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SUSTAINABILITY } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * 5.7 — Sustainability & ESG, told through interactive storytelling rather
 * than a static metric wall. Night-and-energy is the only context where
 * Charge Green appears against photography, so the plate sits under a
 * Midnight scrim and the bars carry the green instead.
 */
export function Sustainability() {
  const reduced = useReducedMotion();

  return (
    <Section tone="dark" className="relative overflow-hidden">
      {/* Aerial solar plate, heavily scrimmed so it reads as texture */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/assets/sustainability.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-indigo-950/85 to-indigo-950" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow={SUSTAINABILITY.eyebrow}
          tone="dark"
          title={SUSTAINABILITY.title}
          lede={SUSTAINABILITY.lede}
          action={
            <Button href="/sustainability" variant="onDark" withArrow>
              Read the ESG report
            </Button>
          }
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-20">
          {/* Metrics */}
          <ul className="space-y-9 lg:col-span-7">
            {SUSTAINABILITY.metrics.map((metric, i) => (
              <Reveal as="li" key={metric.label} delay={stagger(i, 0.08)}>
                <div className="flex items-baseline justify-between gap-6">
                  <p className="text-[15px] text-white/70">{metric.label}</p>
                  <p className="font-display text-2xl font-bold tracking-tight text-white">
                    {metric.value}
                  </p>
                </div>
                <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-600 to-charge"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.1 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ width: `${metric.progress}%`, transformOrigin: "left" }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Commitments */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-white/10">
              {SUSTAINABILITY.commitments.map((commitment, i) => (
                <Reveal as="li" key={commitment.title} delay={stagger(i, 0.06)}>
                  <div className="py-5 first:pt-0">
                    <h3 className="font-display text-[15px] font-semibold text-white">
                      {commitment.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">
                      {commitment.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
