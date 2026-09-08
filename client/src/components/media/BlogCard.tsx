import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/brand/Icons";
import { BlogMeta } from "@/components/media/BlogMeta";
import { postHref, type MediaPost } from "@/lib/media";
import { cn } from "@/lib/utils";

type Variant = "featured" | "compact" | "grid";

export function BlogCard({
  post,
  variant = "grid",
  className,
}: {
  post: MediaPost;
  variant?: Variant;
  className?: string;
}) {
  const href = postHref(post.slug);

  if (variant === "featured") {
    return (
      <Link href={href} className={cn("group flex h-full flex-col", className)}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover grayscale transition-[transform,filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </div>
        <h2 className="mt-6 font-display text-[clamp(1.375rem,1rem+1.2vw,1.875rem)] font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
          {post.title}
        </h2>
        <BlogMeta post={post} className="mt-4" />
        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-indigo-800">
          Read article
          <ArrowRightIcon
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex gap-4 border-b border-indigo-100 py-5 last:border-b-0 lg:py-6",
          className,
        )}
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md sm:size-24">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="96px"
            className="object-cover grayscale transition-[transform,filter] duration-500 group-hover:grayscale-0"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700 sm:text-lg">
            {post.title}
          </h3>
          <BlogMeta post={post} className="mt-2" />
        </div>
        <ArrowRightIcon
          size={16}
          className="mt-1 shrink-0 self-start text-slate transition-all duration-200 group-hover:translate-x-1 group-hover:text-green-700"
        />
      </Link>
    );
  }

  return (
    <Link href={href} className={cn("group flex h-full flex-col", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover grayscale transition-[transform,filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02] group-hover:grayscale-0"
        />
      </div>
      <BlogMeta post={post} className="mt-5" />
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
        {post.title}
      </h3>
    </Link>
  );
}
