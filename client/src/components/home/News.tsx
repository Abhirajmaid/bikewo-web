import Link from "next/link";
import { NEWS } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/brand/Icons";

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** 5.10 — News & Insights, laid out like a digital magazine. */
export function News() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="News & insights"
          title="What we're building, as we build it."
          action={
            <Button href="/media" variant="ghost" withArrow>
              Visit the newsroom
            </Button>
          }
        />

        <ul className="mt-14 grid gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-3">
          {NEWS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={stagger(i)}>
              <Link href={item.href} className="group flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="eyebrow rounded-full bg-green-50 px-3 py-1.5 text-green-800">
                    {item.tag}
                  </span>
                  <time
                    dateTime={item.date}
                    className="font-mono text-[11px] text-slate"
                  >
                    {DATE_FORMAT.format(new Date(item.date))}
                  </time>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">
                  {item.copy}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 border-t border-indigo-100 pt-5 font-display text-sm font-semibold text-indigo-800">
                  Read more
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
