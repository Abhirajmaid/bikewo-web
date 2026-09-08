import Link from "next/link";
import { BoltIcon, LeafIcon, PeopleIcon } from "@/components/brand/Icons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BlogMeta } from "@/components/media/BlogMeta";
import { Reveal } from "@/components/ui/Reveal";
import {
  MEDIA_CATEGORY_COLUMNS,
  getPostsForCategory,
  postHref,
} from "@/lib/media";
import { stagger } from "@/lib/utils";

const COLUMN_ICONS = {
  infrastructure: BoltIcon,
  people: PeopleIcon,
  sustainability: LeafIcon,
} as const;

/** Three category columns on a mint-tinted band — quick-scan by topic. */
export function MediaCategoryColumns() {
  return (
    <Section tone="cloud" className="bg-green-50 py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
          {MEDIA_CATEGORY_COLUMNS.map((column, colIndex) => {
            const Icon = COLUMN_ICONS[column.icon];
            const posts = getPostsForCategory(column.category, 3);

            return (
              <Reveal key={column.category} delay={stagger(colIndex, 0.08)}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-16 items-center justify-center rounded-full bg-white text-indigo-800 shadow-card">
                      <Icon size={40} />
                    </span>
                    <h2 className="font-display text-lg font-semibold text-indigo-800">
                      {column.title}
                    </h2>
                  </div>

                  <ul className="mt-8 divide-y divide-indigo-100/80">
                    {posts.map((post) => (
                      <li key={post.id}>
                        <Link href={postHref(post.slug)} className="group block py-5">
                          <h3 className="font-display text-[15px] font-semibold leading-snug text-indigo-800 transition-colors group-hover:text-green-700">
                            {post.title}
                          </h3>
                          <BlogMeta post={post} className="mt-2" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
