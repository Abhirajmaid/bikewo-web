import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogMeta } from "@/components/media/BlogMeta";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRelatedPosts, postHref, type MediaPost } from "@/lib/media";
import { stagger } from "@/lib/utils";

export function RelatedPosts({ post }: { post: MediaPost }) {
  const related = getRelatedPosts(post, 3);

  if (related.length === 0) return null;

  return (
    <Section tone="cloud">
      <Container>
        <SectionHeading
          eyebrow="Keep reading"
          title="Related updates"
          action={
            <Button href="/media" variant="ghost" withArrow>
              All news
            </Button>
          }
        />

        <ul className="mt-12 divide-y divide-indigo-100 border-y border-indigo-100 lg:mt-16">
          {related.map((item, i) => (
            <Reveal as="li" key={item.id} delay={stagger(i, 0.05)}>
              <Link
                href={postHref(item.slug)}
                className="group block py-7 md:py-8"
              >
                <h3 className="font-display text-xl font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
                  {item.title}
                </h3>
                <BlogMeta post={item} className="mt-3" />
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
                  {item.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
