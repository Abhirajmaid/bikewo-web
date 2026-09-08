"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BUSINESSES_TESTIMONIALS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function StarRow() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-amber-400"
          aria-hidden
        >
          <path d="M12 2l2.9 6.9H22l-5.5 4.5 2.1 6.9L12 16.8l-6.6 3.5 2.1-6.9L2 8.9h7.1L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

/** Client testimonials — ref layout with thumbnail nav, cream card, footer CTA. */
export function BusinessesTestimonials() {
  const [active, setActive] = useState(0);
  const item = BUSINESSES_TESTIMONIALS.items[active];

  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-widest text-slate">
              <span aria-hidden className="size-1.5 rounded-full bg-green-500" />
              {BUSINESSES_TESTIMONIALS.kicker}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
              {BUSINESSES_TESTIMONIALS.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-5 lg:pt-7">
            <p className="text-[15px] leading-relaxed text-slate lg:text-right">
              {BUSINESSES_TESTIMONIALS.lede}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12 lg:mt-14">
          <div className="flex flex-col gap-6 rounded-2xl bg-[#fdf8f2] p-5 sm:p-6 md:flex-row md:gap-8 md:p-8 lg:p-10">
            <ul className="flex shrink-0 flex-row gap-3 md:w-28 md:flex-col md:gap-4 lg:w-32">
              {BUSINESSES_TESTIMONIALS.items.map((story, i) => (
                <li key={story.role}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={active === i ? "true" : undefined}
                    aria-label={`Show testimonial from ${story.name}`}
                    className={cn(
                      "block w-full overflow-hidden rounded-lg border-2 transition-all duration-300",
                      active === i
                        ? "border-indigo-800 opacity-100"
                        : "border-transparent opacity-35 hover:opacity-55",
                    )}
                  >
                    <Image
                      src={story.avatar}
                      alt=""
                      width={128}
                      height={160}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex min-w-0 flex-1 flex-col">
              <StarRow />

              <blockquote className="mt-6 font-display text-[clamp(1.25rem,1rem+1.2vw,1.875rem)] font-semibold leading-snug text-green-800">
                {item.heroQuote}
              </blockquote>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate">
                {item.detail}
              </p>

              <footer className="mt-6 text-[14px] text-slate">
                — {item.name}, {item.role}
              </footer>

              <ul className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#ebe4d8] px-4 py-1.5 text-[13px] text-indigo-800"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 flex justify-center md:mt-10">
          <Link
            href={BUSINESSES_TESTIMONIALS.cta.href}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-6 py-3 text-[13px] text-slate transition-colors hover:border-indigo-300 hover:text-indigo-800"
          >
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-full border border-indigo-200 text-[11px] font-semibold text-indigo-800"
            >
              i
            </span>
            {BUSINESSES_TESTIMONIALS.cta.label}
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
