"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { TEAM } from "@/lib/admin/data";
import type { TeamMember } from "@/lib/admin/types";

export default function TeamPage() {
  const active = TEAM.filter((m) => m.status === "active").length;

  return (
    <ContentPage
      title="Team"
      description="Leadership and team members shown on the website"
      addLabel="Add member"
      stats={[
        { label: "Total members", value: TEAM.length },
        { label: "Active", value: active, change: `${TEAM.length - active} inactive`, changeType: "neutral" },
        { label: "Departments", value: new Set(TEAM.map((m) => m.department)).size },
        { label: "Added this month", value: 0, change: "No new entries", changeType: "neutral" },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
        </>
      }
    >
      <DataTable<TeamMember>
        data={TEAM}
        columns={[
          {
            key: "name",
            header: "Name",
            cell: (row) => (
              <div>
                <p className="font-medium text-ink">{row.name}</p>
                <p className="text-xs text-slate-400">{row.email}</p>
              </div>
            ),
          },
          { key: "role", header: "Role", cell: (row) => row.role },
          { key: "department", header: "Department", cell: (row) => row.department },
          {
            key: "joined",
            header: "Date joined",
            cell: (row) => formatDate(row.joinedAt),
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
