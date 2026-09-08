import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BlogMeta } from "@/components/media/BlogMeta";
import { Reveal } from "@/components/ui/Reveal";
import { formatMediaDate, type MediaPost } from "@/lib/media";

/** Article hero — breadcrumb, title, meta and lead image. */
export function BlogArticleHero({ post }: { post: MediaPost }) {
  return (
    <>
      <section className="border-b border-indigo-100 bg-white pb-10 pt-32 md:pb-14 md:pt-40">
        <Container className="max-w-3xl">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="eyebrow flex flex-wrap items-center gap-2 text-slate"
            >
              <Link href="/" className="transition-colors hover:text-indigo-800">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/media" className="transition-colors hover:text-indigo-800">
                News & insights
              </Link>
              <span aria-hidden>/</span>
              <span className="line-clamp-1 text-green-700">{post.categoryLabel}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="eyebrow mt-7 inline-flex rounded-full bg-green-50 px-3 py-1.5 text-green-800">
              {post.categoryLabel}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-[clamp(1.875rem,1.1rem+2.8vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-indigo-800">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <BlogMeta post={post} className="mt-6" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white pb-12 md:pb-16">
        <Container>
          <Reveal delay={0.12}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/** Article body copy. */
export function BlogArticleBody({ post }: { post: MediaPost }) {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-[1.125rem] font-medium leading-relaxed text-indigo-800">
            {post.excerpt}
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {post.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.04 * (i + 1)}>
              <p className="text-[1.0625rem] leading-relaxed text-slate">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <footer className="mt-12 border-t border-indigo-100 pt-8">
            <p className="font-mono text-[11px] text-slate">
              Published{" "}
              <time dateTime={post.publishedAt}>{formatMediaDate(post.publishedAt)}</time>
              {" · "}
              {post.author}
            </p>
          </footer>
        </Reveal>
      </Container>
    </section>
  );
}
