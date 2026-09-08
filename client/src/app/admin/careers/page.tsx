"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { CAREERS } from "@/lib/admin/data";
import type { CareerOpening } from "@/lib/admin/types";

export default function CareersPage() {
  const open = CAREERS.filter((c) => c.status === "open").length;
  const totalApps = CAREERS.reduce((sum, c) => sum + c.applications, 0);

  return (
    <ContentPage
      title="Careers"
      description="Job openings listed on the careers page"
      addLabel="Add opening"
      stats={[
        { label: "Total openings", value: CAREERS.length },
        { label: "Open positions", value: open },
        { label: "Total applications", value: totalApps, change: "+12 this week", changeType: "up" },
        { label: "Locations", value: new Set(CAREERS.map((c) => c.location)).size },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
        </>
      }
    >
      <DataTable<CareerOpening>
        data={CAREERS}
        columns={[
          {
            key: "title",
            header: "Position",
            cell: (row) => (
              <div>
                <p className="font-medium text-ink">{row.title}</p>
                <p className="text-xs text-slate-400">{row.department}</p>
              </div>
            ),
          },
          { key: "location", header: "Location", cell: (row) => row.location },
          { key: "type", header: "Type", cell: (row) => row.type },
          {
            key: "applications",
            header: "Applications",
            cell: (row) => row.applications,
          },
          {
            key: "posted",
            header: "Posted",
            cell: (row) => formatDate(row.postedAt),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <StatusBadge label={row.status} variant={publishVariant(row.status)} />
            ),
          },
        ]}
      />
    </ContentPage>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
