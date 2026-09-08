"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClockIcon, MailIcon, PinIcon } from "@/components/brand/Icons";
import {
  CONTACT_MAP,
  CONTACT_OFFICE_NOTE,
  CONTACT_OFFICES,
  CONTACT_PAGE_WIDTH,
  type OfficeLocation,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactOffices() {
  const [selected, setSelected] = useState<OfficeLocation>(CONTACT_OFFICES[0]);

  return (
    <section className="border-t border-[#e8ebe9] bg-white py-16 md:py-24">
      <Container className={CONTACT_PAGE_WIDTH}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Location list */}
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-[#052016] md:text-[1.75rem]">
              Visit Our Office
            </h2>
            <ul className="mt-8 space-y-1">
              {CONTACT_OFFICES.map((office) => (
                <li key={office.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(office)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                      selected.id === office.id
                        ? "bg-[#052016] text-white"
                        : "text-[#052016]/70 hover:bg-[#f3f4f6]",
                    )}
                  >
                    {office.name}
                    <ChevronRightIcon />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* India map */}
          <Reveal delay={0.05} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f3f4f6]">
              <Image
                src={CONTACT_MAP.src}
                alt={CONTACT_MAP.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          </Reveal>

          {/* Address card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_16px_rgb(5_32_22/0.06)] md:p-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#9ca3af]">
                {selected.label === "Headquarters" ? "Headquarter" : selected.label}
              </p>

              <ul className="mt-6 space-y-5">
                <li>
                  <p className="mb-1.5 text-xs font-medium text-[#052016]/50">Headquarter</p>
                  <div className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[#052016]/60">
                    <PinIcon size={48} />
                  </span>
                  <span className="text-sm leading-relaxed text-[#052016]/80">{selected.address}</span>
                  </div>
                </li>
                <li>
                  <p className="mb-1.5 text-xs font-medium text-[#052016]/50">Write us</p>
                  <div className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[#052016]/60">
                    <MailIcon size={48} />
                  </span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-[#052016]/80 transition-colors hover:text-[#14603f]"
                  >
                    {selected.email}
                  </a>
                  </div>
                </li>
                <li>
                  <p className="mb-1.5 text-xs font-medium text-[#052016]/50">Appointment</p>
                  <div className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[#052016]/60">
                    <ClockIcon size={48} />
                  </span>
                  <span className="text-sm text-[#052016]/80">{selected.hours}</span>
                  </div>
                </li>
              </ul>

              <p className="mt-8 border-t border-[#e5e7eb] pt-6 text-xs leading-relaxed text-[#9ca3af]">
                {CONTACT_OFFICE_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
