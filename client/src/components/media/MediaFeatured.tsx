import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/media/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedPost, getSecondaryFeatured } from "@/lib/media";

/** Primary feature + three secondary headlines — editorial hero band. */
export function MediaFeatured() {
  const featured = getFeaturedPost();
  const secondary = getSecondaryFeatured(3);

  if (!featured) return null;

  return (
    <Section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <BlogCard post={featured} variant="featured" />
          </Reveal>

          <div className="lg:col-span-4 lg:border-l lg:border-indigo-100 lg:pl-10">
            {secondary.map((post, i) => (
              <Reveal key={post.id} delay={0.05 * (i + 1)}>
                <BlogCard post={post} variant="compact" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
