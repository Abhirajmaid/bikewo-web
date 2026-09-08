"use client";

import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { CONTACT_INQUIRIES } from "@/lib/admin/data";
import type { ContactInquiry } from "@/lib/admin/types";

export default function ContactPage() {
  const newCount = CONTACT_INQUIRIES.filter((c) => c.status === "new").length;
  const inProgress = CONTACT_INQUIRIES.filter((c) => c.status === "in_progress").length;
  const resolved = CONTACT_INQUIRIES.filter((c) => c.status === "resolved").length;

  return (
    <ContentPage
      title="Contact"
      description="Inquiries submitted through the contact form"
      addLabel="Export CSV"
      stats={[
        { label: "Total inquiries", value: CONTACT_INQUIRIES.length },
        { label: "New", value: newCount, change: "Needs response", changeType: "up" },
        { label: "In progress", value: inProgress },
        { label: "Resolved", value: resolved },
      ]}
      toolbarExtra={
        <>
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
          <ToolbarButton>Export</ToolbarButton>
        </>
      }
    >
      <DataTable<ContactInquiry>
        data={CONTACT_INQUIRIES}
        selectionActions={[
          { label: "Mark in progress" },
          { label: "Mark resolved" },
          { label: "Delete", variant: "danger" },
        ]}
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
          { key: "company", header: "Company", cell: (row) => row.company || "—" },
          { key: "topic", header: "Topic", cell: (row) => row.topic },
          {
            key: "message",
            header: "Message",
            cell: (row) => (
              <p className="max-w-xs truncate text-slate">{row.message}</p>
            ),
          },
          {
            key: "submitted",
            header: "Submitted",
            cell: (row) => formatDateTime(row.submittedAt),
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

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
