"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { NewsMediaCard } from "@/components/media/NewsMediaCard";
import type { NewsMediaItem } from "@/lib/cms/types";
import type { PublishStatus } from "@/lib/admin/types";

const emptyForm = {
  title: "",
  excerpt: "",
  typeLabel: "Press release",
  date: new Date().toISOString().slice(0, 10),
  href: "",
  image: "",
  status: "published" as PublishStatus,
  featured: false,
};

export default function NewsMediaAdminPage() {
  const [items, setItems] = useState<NewsMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NewsMediaItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/news");
    if (res.ok) {
      const data = (await res.json()) as { items: NewsMediaItem[] };
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

  function openEdit(item: NewsMediaItem) {
    setEditing(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      typeLabel: item.typeLabel,
      date: item.date,
      href: item.href,
      image: item.image ?? "",
      status: item.status,
      featured: Boolean(item.featured),
    });
    setError(null);
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      image: form.image.trim() || null,
    };
    const res = await fetch(editing ? `/api/cms/news/${editing.id}` : "/api/cms/news", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { error?: string };
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed.");
      return;
    }
    setModalOpen(false);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this News & Media item?")) return;
    await fetch(`/api/cms/news/${id}`, { method: "DELETE" });
    await load();
  }

  const published = items.filter((b) => b.status === "published").length;
  const drafts = items.filter((b) => b.status === "draft").length;

  const previewItem: Pick<
    NewsMediaItem,
    "title" | "excerpt" | "typeLabel" | "date" | "image"
  > = {
    title: form.title || "Document title",
    excerpt: form.excerpt || "Short summary for the card preview.",
    typeLabel: form.typeLabel || "Press release",
    date: form.date,
    image: form.image.trim() || null,
  };

  return (
    <>
      <ContentPage
        title="News and Media"
        description="NSE press releases and media documents shown on the public News & Media page"
        addLabel="Add document"
        onAdd={openCreate}
        stats={[
          { label: "Total items", value: items.length },
          { label: "Published", value: published },
          { label: "Drafts", value: drafts },
          { label: "With custom image", value: items.filter((i) => i.image).length },
        ]}
        toolbarExtra={
          <>
            <ToolbarButton onClick={openCreate}>Add document</ToolbarButton>
            <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
          </>
        }
      >
        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<NewsMediaItem>
            data={items}
            columns={[
              {
                key: "preview",
                header: "Card preview",
                cell: (row) => (
                  <div className="w-44">
                    <NewsMediaCard item={row} className="pointer-events-none scale-[0.92] origin-left" />
                  </div>
                ),
              },
              {
                key: "title",
                header: "Title",
                cell: (row) => (
                  <div className="max-w-xs">
                    <p className="font-medium text-ink">{row.title}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{row.href}</p>
                  </div>
                ),
              },
              {
                key: "date",
                header: "Date",
                cell: (row) => formatDate(row.date),
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

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-mist/60 px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                {editing ? "Edit document" : "Add document"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-sm text-slate hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Field label="Title">
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Excerpt">
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                    className={inputClass}
                    rows={3}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Type label">
                    <input
                      value={form.typeLabel}
                      onChange={(e) => setForm((f) => ({ ...f, typeLabel: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Date">
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <MediaUploadField
                  label="Document PDF"
                  folder="media"
                  accept="application/pdf"
                  value={form.href}
                  onChange={(url) => setForm((f) => ({ ...f, href: url }))}
                  allowUrl
                  urlPlaceholder="Paste PDF URL (e.g. NSE) or upload below"
                  hint="Use an external link or upload a PDF to the Railway bucket."
                />
                <MediaUploadField
                  label="Card preview image (optional)"
                  folder="media/covers"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  value={form.image}
                  onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                  allowUrl
                  urlPlaceholder="Paste image URL or upload below"
                  hint="Leave empty for the default indigo PDF preview."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Status">
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, status: e.target.value as PublishStatus }))
                      }
                      className={inputClass}
                    >
                      <option value="published">published</option>
                      <option value="draft">draft</option>
                      <option value="archived">archived</option>
                    </select>
                  </Field>
                  <label className="mt-7 flex items-center gap-2 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                    />
                    Featured
                  </label>
                </div>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void save()}
                  className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? "Saving…" : editing ? "Save changes" : "Create"}
                </button>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Card preview
                </p>
                <NewsMediaCard item={previewItem} />
                <p className="mt-3 text-xs text-slate-400">
                  Blank image uses the same default indigo PDF preview as Investors cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-mist bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
