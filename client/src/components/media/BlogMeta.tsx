import { formatMediaDate, type MediaPost } from "@/lib/media";

/** Shared author · date · category line for cards and articles. */
export function BlogMeta({
  post,
  className = "",
}: {
  post: Pick<MediaPost, "author" | "publishedAt" | "categoryLabel">;
  className?: string;
}) {
  return (
    <p className={`font-mono text-[11px] text-slate ${className}`}>
      <span>By {post.author}</span>
      <span aria-hidden className="mx-2 text-indigo-200">
        |
      </span>
      <time dateTime={post.publishedAt}>{formatMediaDate(post.publishedAt)}</time>
      <span aria-hidden className="mx-2 text-indigo-200">
        |
      </span>
      <span>{post.categoryLabel}</span>
    </p>
  );
}
