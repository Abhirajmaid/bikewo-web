"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { BLOGS } from "@/lib/admin/data";
import type { BlogPost } from "@/lib/admin/types";

export default function BlogsPage() {
  const published = BLOGS.filter((b) => b.status === "published").length;
  const drafts = BLOGS.filter((b) => b.status === "draft").length;

  return (
    <ContentPage
      title="Blogs"
      description="News and insights published on the media section"
      addLabel="Add blog post"
      stats={[
        { label: "Total posts", value: BLOGS.length },
        { label: "Published", value: published, change: "+1 this month", changeType: "up" },
        { label: "Drafts", value: drafts },
        { label: "Categories", value: new Set(BLOGS.map((b) => b.category)).size },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
          <ToolbarButton>Export</ToolbarButton>
        </>
      }
    >
      <DataTable<BlogPost>
        data={BLOGS}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (row) => (
              <div className="max-w-xs">
                <p className="font-medium text-ink">{row.title}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{row.excerpt}</p>
              </div>
            ),
          },
          { key: "category", header: "Category", cell: (row) => row.category },
          { key: "author", header: "Author", cell: (row) => row.author },
          {
            key: "published",
            header: "Date published",
            cell: (row) =>
              row.publishedAt ? formatDate(row.publishedAt) : "—",
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
