"use client";

import { useEffect, useMemo, useState } from "react";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  LEADERSHIP_DIVISION_FILTERS,
  type LeadershipDivisionFilter,
} from "@/lib/about";
import type { CmsTeamMember } from "@/lib/cms/types";
import { cn, stagger } from "@/lib/utils";

export function TeamGrid() {
  const [members, setMembers] = useState<CmsTeamMember[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeDivision, setActiveDivision] =
    useState<LeadershipDivisionFilter>("all");

  useEffect(() => {
    void fetch("/api/public/cms?resource=team")
      .then((r) => r.json())
      .then((data: { items: CmsTeamMember[] }) => {
        setMembers(data.items ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const filtered = useMemo(() => {
    if (activeDivision === "all") return members;
    return members.filter((member) => member.division === activeDivision);
  }, [activeDivision, members]);

  return (
    <>
      <Reveal delay={0.12}>
        <div
          role="tablist"
          aria-label="Filter team by division"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
        >
          {LEADERSHIP_DIVISION_FILTERS.map((filter) => {
            const active = activeDivision === filter.slug;
            return (
              <button
                key={filter.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDivision(filter.slug)}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-[13px] font-semibold transition-[background-color,color,border-color] duration-200",
                  active
                    ? "bg-indigo-800 text-white"
                    : "border border-indigo-200 text-indigo-800 hover:border-indigo-800 hover:bg-indigo-100/60",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {!loaded ? (
        <p className="mt-12 text-center text-slate">Loading team…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-12 text-center text-slate">
          Leadership profiles will appear here once published in the CMS.
        </p>
      ) : (
        <ul
          key={activeDivision}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
        >
          {filtered.map((member, i) => (
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
      )}
    </>
  );
}
