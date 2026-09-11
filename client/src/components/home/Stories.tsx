"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { STORIES } from "@/lib/content";
import type { TestimonialDoc } from "@/lib/strapi";

type Story = { quote: string; name: string; role: string; avatar: string };

/**
 * Customer success stories — prefers Strapi testimonials, falls back to static placeholders.
 */
export function Stories({ initial }: { initial?: Story[] }) {
  const [stories, setStories] = useState<Story[]>(
    initial?.length
      ? initial
      : STORIES.map((s) => ({
          quote: s.quote,
          name: s.name,
          role: s.role,
          avatar: s.avatar,
        })),
  );

  useEffect(() => {
    if (initial?.length) return;
    void fetch("/api/public/cms?resource=testimonials")
      .then((r) => r.json())
      .then((data: { items?: TestimonialDoc[] }) => {
        const items = data.items ?? [];
        if (!items.length) return;
        setStories(
          items.map((t) => ({
            quote: t.quote,
            name: t.name,
            role: t.role,
            avatar: t.avatarUrl || "/assets/story-1.png",
          })),
        );
      })
      .catch(() => undefined);
  }, [initial]);

  if (!stories.length) return null;

  const half = [...stories, ...stories, ...stories];

  return (
    <Section tone="cloud">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Client stories</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12]">
              What our global partners say worldwide today
            </h2>
          </div>
        </Reveal>
      </Container>

      <div className="mt-14 overflow-hidden lg:mt-16">
        <div className="flex w-max shrink-0 [animation:bw-marquee_48s_linear_infinite] motion-reduce:[animation:none]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex gap-9 pr-9"
              aria-hidden={copy === 1 || undefined}
              aria-label={copy === 0 ? "Customer success stories" : undefined}
            >
              {half.map((story, i) => (
                <li
                  key={`${copy}-${story.role}-${i}`}
                  className="w-[min(85vw,33.75rem)] shrink-0"
                >
                  <figure className="flex h-full flex-col bg-white p-12 shadow-card">
                    <span
                      aria-hidden
                      className="font-display text-[4.125rem] leading-none text-indigo-800"
                    >
                      “
                    </span>
                    <blockquote className="mt-8 flex-1 text-[1.59375rem] leading-relaxed text-indigo-800">
                      {story.quote}
                    </blockquote>
                    <figcaption className="mt-12 flex items-center gap-[1.125rem]">
                      {story.avatar.startsWith("/api/media/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={story.avatar}
                          alt=""
                          className="size-[4.5rem] shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <Image
                          src={story.avatar}
                          alt=""
                          width={72}
                          height={72}
                          className="size-[4.5rem] shrink-0 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-[21px] font-semibold text-indigo-800">
                          {story.name}
                        </p>
                        <p className="mt-[3px] text-[19.5px] text-slate">
                          {story.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
