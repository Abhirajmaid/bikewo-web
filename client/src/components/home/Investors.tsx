import Image from "next/image";
import Link from "next/link";
import { INVESTORS } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/brand/Icons";

/** 5.9 — Investors. Measured, evidence-led: structure and numbers first. */
export function Investors() {
  return (
    <Section tone="cloud">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{INVESTORS.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12]">
                {INVESTORS.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate">
                {INVESTORS.lede}
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
              {INVESTORS.highlights.map((item, i) => (
                <Reveal key={item.label} delay={stagger(i, 0.05)}>
                  <div className="border-t border-indigo-200 pt-4">
                    <dd className="font-display text-3xl font-bold tracking-tight text-indigo-800">
                      {item.value}
                    </dd>
                    <dt className="eyebrow mt-2 text-slate">{item.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-1">
                {INVESTORS.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex min-h-11 items-center justify-between gap-4 border-b border-indigo-200/70 py-2 font-display text-[15px] font-medium text-indigo-800"
                    >
                      {link.label}
                      <ArrowUpRightIcon
                        size={17}
                        className="text-slate transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-700"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <Button href="/investors" variant="secondary" className="mt-10" withArrow>
                Investor relations
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/assets/investors.png"
                alt="The BikeWo corporate headquarters at dusk, a contemporary glass and stone facade reflected in a still pool."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
