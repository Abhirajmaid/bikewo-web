"use client";

import { useState } from "react";
import { ABOUT_FAQ } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-indigo-100">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full min-h-11 items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-[15px] font-semibold text-indigo-800">
          {question}
        </span>
        <span
          aria-hidden
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border border-indigo-200 font-mono text-lg leading-none text-indigo-800 transition-transform duration-200",
            open && "rotate-45 bg-indigo-100",
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[15px] leading-relaxed text-slate">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/** Two-column FAQ — heading left, accordion right. */
export function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section tone="cloud">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
              {ABOUT_FAQ.title}
            </h2>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="border-t border-indigo-100">
              {ABOUT_FAQ.items.map((item, i) => (
                <Reveal key={item.question} delay={i * 0.04}>
                  <FaqItem
                    question={item.question}
                    answer={item.answer}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
