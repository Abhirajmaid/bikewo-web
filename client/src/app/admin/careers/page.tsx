"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import type { JobStatus } from "@/lib/admin/types";
import type { CareerDoc } from "@/lib/strapi";

const emptyForm = {
  title: "",
  location: "",
  type: "Full-time" as CareerDoc["type"],
  department: "",
  postedAt: new Date().toISOString().slice(0, 10),
  status: "open" as JobStatus,
  jdUrl: "",
};

export default function CareersPage() {
  const [items, setItems] = useState<CareerDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CareerDoc | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/careers");
    if (res.ok) {
      const data = (await res.json()) as { items: CareerDoc[] };
      setItems(data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(item: CareerDoc) {
    setEditing(item);
    setForm({
      title: item.title,
      location: item.location,
      type: item.type,
      department: item.department,
      postedAt: item.postedAt,
      status: item.status,
      jdUrl: item.jdUrl,
    });
    setError(null);
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch(
      editing?.documentId ? `/api/cms/careers/${editing.documentId}` : "/api/cms/careers",
      {
        method: editing?.documentId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const data = (await res.json()) as { error?: string };
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed. Check STRAPI_URL / STRAPI_API_TOKEN.");
      return;
    }
    setModalOpen(false);
    await load();
  }

  async function remove(item: CareerDoc) {
    if (!confirm("Delete this opening?")) return;
    await fetch(`/api/cms/careers/${item.documentId}`, { method: "DELETE" });
    await load();
  }

  const open = items.filter((c) => c.status === "open").length;

  return (
    <>
      <ContentPage
        title="Careers"
        description="Job openings in Strapi. Optional JD PDF uploads to the Railway bucket."
        addLabel="Add opening"
        onAdd={openCreate}
        stats={[
          { label: "Total openings", value: items.length },
          { label: "Open positions", value: open },
          { label: "Closed", value: items.length - open },
          { label: "Locations", value: new Set(items.map((c) => c.location)).size },
        ]}
        toolbarExtra={
          <>
            <ToolbarButton onClick={openCreate}>Add opening</ToolbarButton>
            <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
          </>
        }
      >
        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<CareerDoc>
            data={items}
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
                key: "posted",
                header: "Posted",
                cell: (row) =>
                  new Date(row.postedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
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
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="text-xs font-medium text-green-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(row)}
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

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift">
            <h2 className="font-display text-lg font-semibold text-ink">
              {editing ? "Edit opening" : "Add opening"}
            </h2>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Title</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Location</span>
                <input
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Department</span>
                <input
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Type</span>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: e.target.value as CareerDoc["type"],
                    }))
                  }
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Posted</span>
                <input
                  type="date"
                  value={form.postedAt}
                  onChange={(e) => setForm((f) => ({ ...f, postedAt: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Status</span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value as JobStatus }))
                  }
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  <option value="open">open</option>
                  <option value="closed">closed</option>
                </select>
              </label>
              <MediaUploadField
                label="Job description PDF (optional)"
                folder="careers"
                accept="application/pdf"
                value={form.jdUrl}
                onChange={(url) => setForm((f) => ({ ...f, jdUrl: url }))}
                allowUrl
                hint="Upload a JD to the Railway bucket, or paste an external link."
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm text-slate hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void save()}
                className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
