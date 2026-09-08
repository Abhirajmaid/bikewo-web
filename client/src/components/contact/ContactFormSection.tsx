"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  CONTACT_PAGE_WIDTH,
  CONTACT_RESOURCE,
  CONTACT_STAT,
  CONTACT_TESTIMONIAL,
  CONTACT_TOPICS,
  type ContactTopic,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0a2e1f] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-[border-color,box-shadow] focus:border-[#89FF00]/50 focus:ring-2 focus:ring-[#89FF00]/20";

export function ContactFormSection() {
  const [topic, setTopic] = useState<ContactTopic>("Fleet Pricing");

  return (
    <section id="form" className="bg-white py-10 md:py-14">
      <Container className={CONTACT_PAGE_WIDTH}>
        <Reveal>
          <div className="overflow-hidden rounded-[20px] bg-[#052016] p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Form */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-white md:text-[1.75rem]">
                  Get in Touch
                </h2>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/80">First Name</span>
                      <input type="text" name="firstName" required className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/80">Last Name</span>
                      <input type="text" name="lastName" required className={inputClass} />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm text-white/80">Email Address</span>
                    <input type="email" name="email" required className={inputClass} />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-white/80">Phone no.</span>
                    <input type="tel" name="phone" className={inputClass} />
                  </label>

                  <fieldset>
                    <legend className="mb-3 text-sm text-white/80">Topic</legend>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_TOPICS.map((t) => (
                        <label
                          key={t}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                            topic === t
                              ? "border-[#89FF00] bg-[#89FF00]/15 text-[#89FF00]"
                              : "border-white/20 text-white/70 hover:border-white/40",
                          )}
                        >
                          <input
                            type="radio"
                            name="topic"
                            value={t}
                            checked={topic === t}
                            onChange={() => setTopic(t)}
                            className="sr-only"
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="block">
                    <span className="mb-2 block text-sm text-white/80">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className={cn(inputClass, "resize-none")}
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-white py-4 font-display text-[15px] font-semibold text-[#052016] transition-opacity hover:opacity-90"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Stats & testimonial */}
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <p className="font-display text-[clamp(3rem,2rem+4vw,4.5rem)] font-bold leading-none text-[#89FF00]">
                    {CONTACT_STAT.value}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold text-white">
                    {CONTACT_STAT.label}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                    {CONTACT_STAT.copy}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-stretch">
                  <div className="rounded-2xl bg-[#c8d4cc]/90 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative mx-auto h-16 w-16 shrink-0 overflow-hidden rounded-full sm:mx-0">
                        <Image
                          src={CONTACT_TESTIMONIAL.avatar}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-sm leading-relaxed text-[#052016]/80">
                          &ldquo;{CONTACT_TESTIMONIAL.quote}&rdquo;
                        </p>
                        <p className="mt-3 text-sm font-semibold text-[#052016]">
                          {CONTACT_TESTIMONIAL.name}
                        </p>
                        <p className="text-xs text-[#052016]/60">{CONTACT_TESTIMONIAL.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a2e1f] px-5 py-6 sm:min-w-[155px]">
                    <div>
                      <p className="font-display text-3xl font-bold text-[#89FF00]">
                        {CONTACT_RESOURCE.value}
                      </p>
                      <p className="mt-1 text-sm text-white/70">{CONTACT_RESOURCE.label}</p>
                    </div>
                    <div className="mt-4 space-y-1">
                      {CONTACT_RESOURCE.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block text-xs text-[#89FF00] underline-offset-2 hover:underline"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
