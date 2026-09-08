"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { TESTIMONIALS } from "@/lib/admin/data";
import type { Testimonial } from "@/lib/admin/types";

export default function TestimonialsPage() {
  const published = TESTIMONIALS.filter((t) => t.status === "published").length;

  return (
    <ContentPage
      title="Testimonials"
      description="Customer stories shown on the homepage"
      addLabel="Add testimonial"
      stats={[
        { label: "Total stories", value: TESTIMONIALS.length },
        { label: "Published", value: published },
        { label: "Drafts", value: TESTIMONIALS.length - published },
        { label: "On homepage", value: published },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
        </>
      }
    >
      <DataTable<Testimonial>
        data={TESTIMONIALS}
        columns={[
          {
            key: "quote",
            header: "Quote",
            cell: (row) => (
              <p className="max-w-sm truncate text-ink">{row.quote}</p>
            ),
          },
          {
            key: "name",
            header: "Name",
            cell: (row) => (
              <div>
                <p className="font-medium text-ink">{row.name}</p>
                <p className="text-xs text-slate-400">{row.role}</p>
              </div>
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
