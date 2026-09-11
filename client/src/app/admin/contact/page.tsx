"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import type { CmsContactInquiry } from "@/lib/cms/types";
import type { InquiryStatus } from "@/lib/admin/types";

export default function ContactAdminPage() {
  const [items, setItems] = useState<CmsContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/contact");
    if (res.ok) {
      const data = (await res.json()) as { items: CmsContactInquiry[] };
      setItems(data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function setStatus(id: string, status: InquiryStatus) {
    await fetch(`/api/cms/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/cms/contact/${id}`, { method: "DELETE" });
    await load();
  }

  const newCount = items.filter((c) => c.status === "new").length;
  const inProgress = items.filter((c) => c.status === "in_progress").length;
  const resolved = items.filter((c) => c.status === "resolved").length;

  return (
    <ContentPage
      title="Contact"
      description="Inquiries submitted through the contact form"
      addLabel="Export CSV"
      stats={[
        { label: "Total inquiries", value: items.length },
        { label: "New", value: newCount },
        { label: "In progress", value: inProgress },
        { label: "Resolved", value: resolved },
      ]}
      toolbarExtra={<ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>}
    >
      {loading ? (
        <p className="text-sm text-slate">Loading…</p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-mist bg-white px-4 py-10 text-center text-sm text-slate">
          No contact submissions yet. New form posts from the website appear here.
        </p>
      ) : (
        <DataTable<CmsContactInquiry>
          data={items}
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
            {
              key: "actions",
              header: "",
              cell: (row) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void setStatus(row.id, "in_progress")}
                    className="text-xs font-medium text-indigo-700 hover:underline"
                  >
                    In progress
                  </button>
                  <button
                    type="button"
                    onClick={() => void setStatus(row.id, "resolved")}
                    className="text-xs font-medium text-green-700 hover:underline"
                  >
                    Resolve
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(row.id)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
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
