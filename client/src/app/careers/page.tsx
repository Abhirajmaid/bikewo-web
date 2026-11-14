import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, PinIcon } from "@/components/brand/Icons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CAREERS } from "@/lib/content";
import { ROUTE_INDEX, SITE } from "@/lib/site";
import { listCareers, type CareerDoc } from "@/lib/strapi";
import { stagger } from "@/lib/utils";

const HREF = "/careers";
const entry = ROUTE_INDEX[HREF];
const title = entry?.title ?? "Careers";
const description = entry?.blurb ?? CAREERS.lede;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: HREF },
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: HREF,
    type: "website",
  },
};

async function loadOpenings(): Promise<CareerDoc[]> {
  try {
    return await listCareers({ openOnly: true });
  } catch {
    return [];
  }
}

function formatPosted(date: string) {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function CareersPage() {
  const openings = await loadOpenings();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        title={title}
        lede={description}
      />

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow text-slate">Open roles</p>
              <h2 className="mt-4 text-2xl leading-snug">{CAREERS.title}</h2>
              <p className="mt-4 leading-relaxed text-slate">{CAREERS.lede}</p>
            </div>

            <div className="lg:col-span-8">
              {openings.length === 0 ? (
                <div className="rounded-lg border border-dashed border-indigo-200 px-6 py-12 text-center">
                  <p className="font-display text-lg font-semibold text-indigo-800">
                    No open positions right now.
                  </p>
                  <p className="mt-2 text-slate">
                    New roles are posted here first. You can also reach us through the contact page.
                  </p>
                  <Button href="/contact" variant="ghost" className="mt-6" withArrow>
                    Get in Touch
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-indigo-200/70 border-y border-indigo-200/70">
                  {openings.map((role, i) => (
                    <Reveal as="li" key={role.id} delay={stagger(i, 0.05)}>
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6">
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-semibold text-indigo-800">
                            {role.title}
                          </h3>
                          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-slate">
                            <PinIcon size={30} className="-ml-2 text-slate" />
                            {role.location}
                            <span aria-hidden className="text-indigo-200">·</span>
                            {role.type}
                            {role.department && role.department !== "—" ? (
                              <>
                                <span aria-hidden className="text-indigo-200">·</span>
                                {role.department}
                              </>
                            ) : null}
                            <span aria-hidden className="text-indigo-200">·</span>
                            Posted {formatPosted(role.postedAt)}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {role.jdUrl ? (
                            <a
                              href={role.jdUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center px-2 font-display text-[15px] font-medium text-indigo-800 underline-offset-4 hover:text-green-700 hover:underline"
                            >
                              Job description (PDF)
                            </a>
                          ) : null}
                          <Link
                            href={`/careers/${encodeURIComponent(role.id)}`}
                            className="group inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-6 font-display text-[15px] font-semibold text-indigo-800 transition-[background-color] duration-200 hover:bg-charge"
                          >
                            Apply
                            <ArrowRightIcon
                              size={18}
                              className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
