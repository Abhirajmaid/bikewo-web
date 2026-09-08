"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
  cta?: { label: string; href: string };
};

export type FaqSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lede: string;
  cta: { label: string; href: string };
  items: FaqItem[];
};

function FaqRow({
  item,
  index,
  open,
  onToggle,
  panelId,
  buttonId,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "rounded-xl px-4 transition-[background-color] duration-200 ease-out-expo sm:px-5",
        open ? "bg-green-50" : "hover:bg-white",
      )}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full min-h-11 items-center gap-4 py-5 text-left sm:gap-5"
      >
        <span
          aria-hidden
          className={cn(
            "w-8 shrink-0 font-mono text-[13px] tabular-nums transition-colors duration-200 ease-out-expo",
            open ? "text-green-700" : "text-slate-400",
          )}
        >
          {n}
        </span>
        <span className="flex-1 font-display text-[15px] font-semibold leading-snug text-indigo-800 sm:text-base">
          {item.question}
        </span>
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-lg leading-none transition-[transform,background-color,border-color,color] duration-200 ease-out-expo active:scale-[0.97]",
            open
              ? "rotate-45 border-green-500 bg-green-500 text-indigo-800"
              : "border-indigo-200 bg-white text-indigo-800 group-hover:border-green-500",
          )}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out-expo motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex gap-4 pb-5 sm:gap-5">
            <span aria-hidden className="hidden w-8 shrink-0 sm:block" />
            <div className="min-w-0 flex-1 pr-12">
              <p className="text-[15px] leading-relaxed text-slate">{item.answer}</p>
              {item.cta && (
                <Link
                  href={item.cta.href}
                  className="group/cta mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-green-700"
                >
                  {item.cta.label}
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-200 ease-out-expo group-hover/cta:translate-x-1"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Two-column FAQ — heading left, numbered accordion right. */
export function FaqSection({
  id = "faq",
  eyebrow,
  title,
  lede,
  cta,
  items,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();

  return (
    <Section id={id}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-slate">
                {lede}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 hidden lg:block">
              <Button href={cta.href} variant="ghost" withArrow>
                {cta.label}
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-indigo-100 bg-cloud/60 p-1.5 sm:p-2">
              {items.map((item, i) => (
                <Reveal key={item.question} delay={i * 0.04}>
                  <FaqRow
                    item={item}
                    index={i}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    buttonId={`${uid}-q-${i}`}
                    panelId={`${uid}-a-${i}`}
                  />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-8 lg:hidden">
              <Button href={cta.href} variant="ghost" withArrow>
                {cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
