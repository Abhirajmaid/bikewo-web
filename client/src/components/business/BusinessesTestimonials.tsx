"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BUSINESSES_TESTIMONIALS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Customer voices — brand-aligned testimonial switcher. */
export function BusinessesTestimonials() {
  const [active, setActive] = useState(0);
  const item = BUSINESSES_TESTIMONIALS.items[active];

  return (
    <Section className="border-b border-indigo-100">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-widest text-slate">
              <span aria-hidden className="size-1.5 rounded-full bg-green-500" />
              {BUSINESSES_TESTIMONIALS.kicker}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.1rem+2.4vw,2.75rem)] font-semibold leading-[1.12] text-indigo-800">
              {BUSINESSES_TESTIMONIALS.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-slate lg:text-right">
              {BUSINESSES_TESTIMONIALS.lede}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12 lg:mt-14">
          <div className="grid gap-6 rounded-2xl border border-indigo-100 bg-cloud p-5 sm:p-6 md:grid-cols-[7rem_1fr] md:gap-8 md:p-8 lg:grid-cols-[8rem_1fr] lg:p-10">
            <ul className="flex flex-row gap-3 md:flex-col md:gap-3">
              {BUSINESSES_TESTIMONIALS.items.map((story, i) => (
                <li key={story.role} className="min-w-0 flex-1 md:flex-none">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={active === i ? "true" : undefined}
                    aria-label={`Show testimonial from ${story.name}`}
                    className={cn(
                      "block w-full overflow-hidden rounded-lg border-2 transition-all duration-300",
                      active === i
                        ? "border-indigo-800 opacity-100"
                        : "border-transparent opacity-40 hover:opacity-70",
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

            <div className="min-w-0">
              <blockquote className="font-display text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-semibold leading-snug text-indigo-800">
                “{item.heroQuote}”
              </blockquote>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate">
                {item.detail}
              </p>

              <footer className="mt-6 text-[14px] font-medium text-indigo-800">
                {item.name}
                <span className="font-normal text-slate"> · {item.role}</span>
              </footer>

              <ul className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-indigo-100 bg-white px-3.5 py-1.5 text-[13px] text-indigo-800"
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
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-6 py-3 font-display text-sm font-semibold text-indigo-800 transition-colors hover:border-indigo-400"
          >
            {BUSINESSES_TESTIMONIALS.cta.label}
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
