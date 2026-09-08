import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleBody, BlogArticleHero } from "@/components/media/BlogArticle";
import { RelatedPosts } from "@/components/media/RelatedPosts";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPostBySlug, getPublishedPosts, postHref } from "@/lib/media";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postHref(slug) },
    openGraph: {
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      url: postHref(slug),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <BlogArticleHero post={post} />
      <BlogArticleBody post={post} />
      <RelatedPosts post={post} />
      <ContactCTA />
    </>
  );
}
