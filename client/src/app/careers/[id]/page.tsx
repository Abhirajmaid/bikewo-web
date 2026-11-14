import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/ui/PageHero";
import { listCareers } from "@/lib/strapi";

type Props = { params: Promise<{ id: string }> };

async function loadOpening(id: string) {
  try {
    return (await listCareers({ openOnly: true })).find((c) => c.id === id) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opening = await loadOpening(id);
  if (!opening) return { title: "Careers" };
  return {
    title: `Apply: ${opening.title}`,
    description: `Apply for ${opening.title} (${opening.location}, ${opening.type}) at BikeWo.`,
    alternates: { canonical: `/careers/${encodeURIComponent(opening.id)}` },
  };
}

export default async function CareerApplyPage({ params }: Props) {
  const { id } = await params;
  const opening = await loadOpening(id);
  if (!opening) notFound();

  const meta = [opening.location, opening.type, opening.department]
    .filter((v) => v && v !== "—")
    .join(" · ");

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: opening.title },
        ]}
        title={opening.title}
        lede={meta}
      >
        {opening.jdUrl ? (
          <a
            href={opening.jdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center rounded-full border border-white/25 px-6 font-display text-[15px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10"
          >
            Read the job description (PDF)
          </a>
        ) : null}
      </PageHero>

      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ApplyForm openingId={opening.id} position={opening.title} />
          </div>
        </Container>
      </section>
    </>
  );
}
