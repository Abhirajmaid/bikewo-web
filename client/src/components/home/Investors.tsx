"use client";

import { useState } from "react";
import { DocumentCard } from "@/components/investors/DocumentCard";
import { PdfViewer } from "@/components/investors/PdfViewer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INVESTORS } from "@/lib/content";
import {
  featuredInvestorDocs,
  sortInvestorDocs,
  type InvestorDoc,
} from "@/lib/investors";
import { stagger } from "@/lib/utils";

export function Investors({ docs }: { docs: InvestorDoc[] }) {
  const [active, setActive] = useState<InvestorDoc | null>(null);
  const preview = [
    ...featuredInvestorDocs(docs),
    ...sortInvestorDocs(docs).filter((doc) => !doc.featured),
  ].slice(0, 3);

  if (preview.length === 0) return null;

  return (
    <>
      <Section tone="cloud">
        <Container>
          <SectionHeading
            eyebrow={INVESTORS.eyebrow}
            title={INVESTORS.title}
            lede={INVESTORS.lede}
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {preview.map((doc, i) => (
              <Reveal as="li" key={doc.id} delay={stagger(i, 0.05)}>
                <DocumentCard doc={doc} onOpen={setActive} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15} className="mt-10 flex justify-center md:mt-12">
            <Button href="/investors" variant="primary" withArrow>
              View all documents
            </Button>
          </Reveal>
        </Container>
      </Section>

      {active && <PdfViewer doc={active} onClose={() => setActive(null)} />}
    </>
  );
}
