"use client";

import { useMemo, useState } from "react";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  LEADERSHIP,
  LEADERSHIP_DIVISION_FILTERS,
  type LeadershipDivisionFilter,
} from "@/lib/about";
import { cn, stagger } from "@/lib/utils";

export function TeamGrid() {
  const [activeDivision, setActiveDivision] =
    useState<LeadershipDivisionFilter>("all");

  const filtered = useMemo(() => {
    if (activeDivision === "all") return LEADERSHIP.members;
    return LEADERSHIP.members.filter(
      (member) => member.division === activeDivision,
    );
  }, [activeDivision]);

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

      <ul
        key={activeDivision}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
      >
        {filtered.map((member, i) => (
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
    </>
  );
}
