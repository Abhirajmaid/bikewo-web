"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  CONTACT_PAGE_WIDTH,
  CONTACT_STAT,
  CONTACT_TESTIMONIALS,
  CONTACT_TOPICS,
  type ContactTopic,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0a2e1f] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-[border-color,box-shadow] focus:border-[#89FF00]/50 focus:ring-2 focus:ring-[#89FF00]/20";

export function ContactFormSection() {
  const [topic, setTopic] = useState<ContactTopic>("Fleet Pricing");
  const [slide, setSlide] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="form" className="bg-white py-10 md:py-14">
      <Container className={CONTACT_PAGE_WIDTH}>
        <Reveal>
          <div className="overflow-hidden rounded-[20px] bg-[#052016] p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
              {/* Form */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-white md:text-[1.75rem]">
                  Get in Touch
                </h2>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    setStatus("sending");
                    setError(null);
                    void fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        firstName: String(data.get("firstName") || ""),
                        lastName: String(data.get("lastName") || ""),
                        email: String(data.get("email") || ""),
                        phone: String(data.get("phone") || ""),
                        topic,
                        message: String(data.get("message") || ""),
                      }),
                    })
                      .then(async (res) => {
                        const body = (await res.json()) as { error?: string };
                        if (!res.ok) {
                          setStatus("error");
                          setError(body.error || "Something went wrong.");
                          return;
                        }
                        setStatus("ok");
                        form.reset();
                      })
                      .catch(() => {
                        setStatus("error");
                        setError("Unable to submit right now.");
                      });
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
                    disabled={status === "sending"}
                    className="mt-2 w-full rounded-xl bg-white py-4 font-display text-[15px] font-semibold text-[#052016] transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "sending" ? "Submitting…" : "Submit"}
                  </button>
                  {status === "ok" ? (
                    <p className="text-sm text-[#89FF00]">Thanks — we received your message.</p>
                  ) : null}
                  {status === "error" && error ? (
                    <p className="text-sm text-red-300">{error}</p>
                  ) : null}
                </form>
              </div>

              {/* Stats & testimonial slider */}
              <div className="grid min-h-full grid-rows-[auto_1fr_auto]">
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                    <span aria-hidden className="size-1.5 rounded-full bg-white" />
                    {CONTACT_STAT.kicker}
                  </p>
                  <p className="mt-3 font-display text-[clamp(4.25rem,2.4rem+8vw,7.25rem)] font-bold leading-[0.85] tracking-tight text-white">
                    {CONTACT_STAT.value}
                    <span className="bg-linear-to-br from-[#89FF00] to-[#e8ff6a] bg-clip-text text-transparent">
                      {CONTACT_STAT.suffix}
                    </span>
                    <span className="align-super text-[0.28em] text-[#89FF00]">*</span>
                  </p>
                  <p className="mt-5 font-display text-2xl font-semibold text-white md:text-[1.75rem]">
                    {CONTACT_STAT.label}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                    {CONTACT_STAT.copy}
                  </p>
                </div>

                <div className="relative mt-5 min-h-72">
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="flex h-full gap-3 transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(calc(${-slide} * 87%))` }}
                    >
                      {CONTACT_TESTIMONIALS.map((item) => (
                        <article
                          key={item.name}
                          className="relative h-full w-[82%] shrink-0 overflow-hidden rounded-2xl"
                        >
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 32vw, 80vw"
                            className="object-cover object-top saturate-[0.85]"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#052016]/90 via-[#052016]/25 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                            <p className="text-sm leading-relaxed text-white md:text-[15px]">
                              &ldquo;{item.quote}&rdquo;
                            </p>
                            <p className="mt-3 text-sm font-semibold text-white">
                              {item.name}, {item.role}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
                  {CONTACT_TESTIMONIALS.map((item, i) => (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={slide === i}
                      aria-label={`Show testimonial ${i + 1}`}
                      onClick={() => setSlide(i)}
                      className={cn(
                        "size-2 rounded-full transition-colors",
                        slide === i ? "bg-white" : "bg-white/30 hover:bg-white/50",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
