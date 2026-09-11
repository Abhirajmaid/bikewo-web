"use client";

import { useEffect, useState } from "react";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LEADERSHIP } from "@/lib/about";
import type { CmsTeamMember } from "@/lib/cms/types";
import { stagger } from "@/lib/utils";

const PREVIEW_COUNT = 3;

/** Leadership preview — cards from CMS with link to the full team page. */
export function AboutTeam() {
  const [preview, setPreview] = useState<CmsTeamMember[]>([]);

  useEffect(() => {
    void fetch("/api/public/cms?resource=team")
      .then((r) => r.json())
      .then((data: { items: CmsTeamMember[] }) => {
        setPreview((data.items ?? []).slice(0, PREVIEW_COUNT));
      })
      .catch(() => undefined);
  }, []);

  if (preview.length === 0) return null;

  return (
    <Section tone="cloud">
      <Container>
        <SectionHeading
          eyebrow={LEADERSHIP.eyebrow}
          title={LEADERSHIP.title}
          lede={LEADERSHIP.lede}
          align="center"
          className="justify-center"
          action={
            <Button href="/about/leadership-team" variant="ghost" withArrow>
              View all
            </Button>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {preview.map((member, i) => (
            <Reveal as="li" key={member.id} delay={stagger(i, 0.06)}>
              <TeamMemberCard
                name={member.name}
                role={member.role}
                image={
                  member.image ||
                  "/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png"
                }
                social={{
                  linkedin: member.linkedin,
                  twitter: member.twitter,
                  facebook: member.facebook,
                  instagram: member.instagram,
                }}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
