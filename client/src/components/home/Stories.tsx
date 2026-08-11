import Image from "next/image";
import { STORIES } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/**
 * 5.8 — Customer success stories.
 *
 * PLACEHOLDER CONTENT. The portraits are AI-generated and the attributions are
 * illustrative. Brand policy: AI-generated people must never be presented as
 * real individuals. Swap in real, consenting subjects with signed model
 * releases before launch.
 */
export function Stories() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Customer success"
          title="The proof is in the uptime."
          lede="Fleet operators, dealers and driver-partners on what changed when the whole chain came from one company."
        />

        <ul className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {STORIES.map((story, i) => (
            <Reveal as="li" key={story.role} delay={stagger(i)}>
              <figure className="flex h-full flex-col rounded-lg border border-indigo-100 bg-white p-8">
                <span aria-hidden className="h-1 w-10 rounded-full bg-green-500" />
                <blockquote className="mt-6 flex-1 font-display text-[1.0625rem] font-medium leading-relaxed text-indigo-800">
                  “{story.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-indigo-100 pt-6">
                  <Image
                    src={story.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-indigo-800">{story.name}</p>
                    <p className="mt-0.5 text-[13px] text-slate">{story.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
