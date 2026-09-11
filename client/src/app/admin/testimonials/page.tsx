"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import type { TestimonialDoc } from "@/lib/strapi";

const emptyForm = {
  quote: "",
  name: "",
  role: "",
  avatarUrl: "",
  sortOrder: 0,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<TestimonialDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialDoc | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/testimonials");
    if (res.ok) {
      const data = (await res.json()) as { items: TestimonialDoc[] };
      setItems(data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, sortOrder: items.length + 1 });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(item: TestimonialDoc) {
    setEditing(item);
    setForm({
      quote: item.quote,
      name: item.name,
      role: item.role,
      avatarUrl: item.avatarUrl,
      sortOrder: item.sortOrder,
    });
    setError(null);
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch(
      editing?.documentId
        ? `/api/cms/testimonials/${editing.documentId}`
        : "/api/cms/testimonials",
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

  async function remove(item: TestimonialDoc) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/cms/testimonials/${item.documentId}`, { method: "DELETE" });
    await load();
  }

  return (
    <>
      <ContentPage
        title="Testimonials"
        description="Customer stories in Strapi. Avatars upload to the Railway bucket."
        addLabel="Add testimonial"
        onAdd={openCreate}
        stats={[
          { label: "Total stories", value: items.length },
          { label: "With photo", value: items.filter((t) => t.avatarUrl).length },
          { label: "On homepage", value: items.length },
        ]}
        toolbarExtra={
          <>
            <ToolbarButton onClick={openCreate}>Add testimonial</ToolbarButton>
            <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
          </>
        }
      >
        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<TestimonialDoc>
            data={items}
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
              {editing ? "Edit testimonial" : "Add testimonial"}
            </h2>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Quote</span>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Role / attribution</span>
                <input
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <MediaUploadField
                label="Avatar photo"
                folder="testimonials"
                accept="image/jpeg,image/png,image/webp,image/gif"
                value={form.avatarUrl}
                onChange={(url) => setForm((f) => ({ ...f, avatarUrl: url }))}
                allowUrl
                hint="Upload to the Railway bucket, or use a site asset path."
              />
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Sort order</span>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sortOrder: Number(e.target.value) || 0 }))
                  }
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
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
