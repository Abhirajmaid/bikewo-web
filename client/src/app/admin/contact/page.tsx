"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { useConfirm } from "@/components/admin/ConfirmModal";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { RowActions } from "@/components/admin/RowActions";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import type { CmsContactInquiry } from "@/lib/cms/types";
import type { InquiryStatus } from "@/lib/admin/types";

export default function ContactAdminPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState<CmsContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<CmsContactInquiry | null>(null);

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
    setViewing((current) =>
      current?.id === id ? { ...current, status } : current,
    );
    await load();
  }

  async function remove(id: string) {
    if (
      !(await confirm({
        title: "Delete inquiry",
        message: "Delete this inquiry? This action cannot be undone.",
      }))
    )
      return;
    await fetch(`/api/cms/contact/${id}`, { method: "DELETE" });
    setViewing((current) => (current?.id === id ? null : current));
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
      toolbarExtra={
        <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
      }
    >
      {loading ? (
        <p className="text-sm text-slate">Loading…</p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-mist bg-white px-4 py-10 text-center text-sm text-slate">
          No contact submissions yet. New form posts from the website appear
          here.
        </p>
      ) : (
        <DataTable<CmsContactInquiry>
          data={items}
          searchPlaceholder="Search inquiries…"
          getSearchText={(row) =>
            `${row.name} ${row.email} ${row.company} ${row.topic} ${row.message}`
          }
          filters={[
            {
              key: "status",
              label: "All statuses",
              getValue: (row) => row.status,
              options: [
                { value: "new", label: "New" },
                { value: "in_progress", label: "In progress" },
                { value: "resolved", label: "Resolved" },
              ],
            },
            {
              key: "topic",
              label: "All topics",
              getValue: (row) => row.topic,
            },
          ]}
          sorts={[
            {
              key: "submitted-desc",
              label: "Newest first",
              compare: (a, b) => cmpDate(b.submittedAt, a.submittedAt),
            },
            {
              key: "submitted-asc",
              label: "Oldest first",
              compare: (a, b) => cmpDate(a.submittedAt, b.submittedAt),
            },
            {
              key: "name",
              label: "Name A–Z",
              compare: (a, b) => cmpStr(a.name, b.name),
            },
          ]}
          defaultSortKey="submitted-desc"
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
            {
              key: "company",
              header: "Company",
              cell: (row) => row.company || "—",
            },
            { key: "topic", header: "Topic", cell: (row) => row.topic },
            {
              key: "message",
              header: "Message",
              cell: (row) => (
                <button
                  type="button"
                  onClick={() => setViewing(row)}
                  title="Open full message"
                  className="block max-w-xs truncate text-left text-slate hover:text-ink hover:underline"
                >
                  {row.message || "—"}
                </button>
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
                <StatusBadge
                  label={row.status}
                  variant={publishVariant(row.status)}
                />
              ),
            },
            {
              key: "actions",
              header: "",
              cell: (row) => (
                <RowActions
                  actions={[
                    {
                      label: "View message",
                      variant: "preview",
                      onClick: () => setViewing(row),
                    },
                    {
                      label: "In progress",
                      variant: "progress",
                      onClick: () => void setStatus(row.id, "in_progress"),
                    },
                    {
                      label: "Resolve",
                      variant: "resolve",
                      onClick: () => void setStatus(row.id, "resolved"),
                    },
                    {
                      label: "Delete",
                      variant: "delete",
                      onClick: () => void remove(row.id),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      )}

      {viewing ? (
        <InquiryDetailModal
          inquiry={viewing}
          onClose={() => setViewing(null)}
          onSetStatus={(status) => void setStatus(viewing.id, status)}
        />
      ) : null}
    </ContentPage>
  );
}

function InquiryDetailModal({
  inquiry,
  onClose,
  onSetStatus,
}: {
  inquiry: CmsContactInquiry;
  onClose: () => void;
  onSetStatus: (status: InquiryStatus) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const details: { label: string; value: ReactNode }[] = [
    {
      label: "Email",
      value: inquiry.email ? (
        <a
          href={`mailto:${inquiry.email}`}
          className="text-indigo-600 hover:underline"
        >
          {inquiry.email}
        </a>
      ) : (
        "—"
      ),
    },
    {
      label: "Phone",
      value: inquiry.phone ? (
        <a
          href={`tel:${inquiry.phone}`}
          className="text-indigo-600 hover:underline"
        >
          {inquiry.phone}
        </a>
      ) : (
        "—"
      ),
    },
    { label: "Company", value: inquiry.company || "—" },
    { label: "Topic", value: inquiry.topic || "—" },
    { label: "Submitted", value: formatDateTime(inquiry.submittedAt) },
    {
      label: "Status",
      value: (
        <StatusBadge
          label={inquiry.status}
          variant={publishVariant(inquiry.status)}
        />
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-mist/60 px-6 py-4">
          <div className="min-w-0">
            <h2
              id="inquiry-title"
              className="truncate font-display text-lg font-semibold text-ink"
            >
              {inquiry.name || "Inquiry"}
            </h2>
            <p className="text-xs text-slate-400">Contact form inquiry</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-sm text-slate hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="min-w-0">
                <dt className="text-xs font-medium text-slate-400">
                  {d.label}
                </dt>
                <dd className="mt-0.5 break-words text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <p className="text-xs font-medium text-slate-400">Message</p>
            <p className="mt-1 whitespace-pre-wrap break-words rounded-lg border border-mist/60 bg-cloud px-4 py-3 text-sm leading-relaxed text-ink">
              {inquiry.message || "No message provided."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-mist/60 px-6 py-4">
          {inquiry.status !== "in_progress" ? (
            <button
              type="button"
              onClick={() => onSetStatus("in_progress")}
              className="rounded-lg border border-mist/80 px-4 py-2 text-sm font-medium text-slate hover:bg-cloud hover:text-ink"
            >
              Mark in progress
            </button>
          ) : null}
          {inquiry.status !== "resolved" ? (
            <button
              type="button"
              onClick={() => onSetStatus("resolved")}
              className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Mark resolved
            </button>
          ) : null}
        </div>
      </div>
    </div>
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
