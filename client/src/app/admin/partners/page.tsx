"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { PARTNERS } from "@/lib/admin/data";
import type { Partner } from "@/lib/admin/types";

export default function PartnersPage() {
  const published = PARTNERS.filter((p) => p.status === "published").length;

  return (
    <ContentPage
      title="Partners"
      description="Partner logos displayed in the Loved By section"
      addLabel="Add partner"
      stats={[
        { label: "Total partners", value: PARTNERS.length },
        { label: "Published", value: published },
        { label: "Drafts", value: PARTNERS.length - published },
        { label: "On homepage", value: published },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
        </>
      }
    >
      <DataTable<Partner>
        data={PARTNERS}
        columns={[
          {
            key: "name",
            header: "Partner name",
            cell: (row) => <span className="font-medium text-ink">{row.name}</span>,
          },
          {
            key: "website",
            header: "Website",
            cell: (row) =>
              row.website ? (
                <a
                  href={row.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  {row.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                "—"
              ),
          },
          { key: "order", header: "Order", cell: (row) => row.sortOrder },
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
