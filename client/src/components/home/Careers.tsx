import Image from "next/image";
import Link from "next/link";
import { CAREERS } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, PinIcon } from "@/components/brand/Icons";

/** 5.11 — Careers. Mission-led and honest about the scale of the challenge. */
export function Careers() {
  return (
    <Section tone="cloud">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{CAREERS.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12]">
                {CAREERS.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate">
                {CAREERS.lede}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                  src="/assets/careers.png"
                  alt="BikeWo engineers and designers working together around a standing desk in an open-plan office."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Button href="/careers" className="mt-9" withArrow>
                See all openings
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-indigo-200/70 border-y border-indigo-200/70">
              {CAREERS.roles.map((role, i) => (
                <Reveal as="li" key={role.title} delay={stagger(i, 0.05)}>
                  <Link
                    href="/careers"
                    className="group flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold text-indigo-800 transition-colors group-hover:text-green-700">
                        {role.title}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-2 text-[14px] text-slate">
                        <PinIcon size={15} className="text-slate" />
                        {role.location}
                        <span aria-hidden className="text-indigo-200">
                          ·
                        </span>
                        {role.type}
                      </p>
                    </div>
                    <ArrowRightIcon
                      size={20}
                      className="shrink-0 text-indigo-800 transition-transform duration-200 group-hover:translate-x-1.5"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
