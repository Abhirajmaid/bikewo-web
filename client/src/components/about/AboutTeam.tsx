import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LEADERSHIP } from "@/lib/about";
import { stagger } from "@/lib/utils";

const PREVIEW_COUNT = 3;

/** Leadership preview — three cards with link to the full team page. */
export function AboutTeam() {
  const preview = LEADERSHIP.members.slice(0, PREVIEW_COUNT);

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
            <Reveal as="li" key={member.name} delay={stagger(i, 0.06)}>
              <TeamMemberCard
                name={member.name}
                role={member.role}
                image={member.image}
                social={member.social}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
