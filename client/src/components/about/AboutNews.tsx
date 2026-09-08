import Image from "next/image";
import Link from "next/link";
import { ABOUT_NEWS } from "@/lib/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** News & updates — three-card grid with imagery. */
export function AboutNews() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="News & updates"
          title="What we're building, as we build it."
          align="center"
          className="justify-center"
          action={
            <Button href="/media" variant="ghost" withArrow>
              Visit the newsroom
            </Button>
          }
        />

        <ul className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {ABOUT_NEWS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={stagger(i)}>
              <Link href={item.href} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <span className="eyebrow mt-5 inline-flex w-fit rounded-full bg-green-50 px-3 py-1.5 text-green-800">
                  {item.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
                  {item.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
