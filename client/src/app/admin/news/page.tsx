"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { RowActions } from "@/components/admin/RowActions";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { NewsMediaCard } from "@/components/media/NewsMediaCard";
import type { PublishStatus } from "@/lib/admin/types";
import type { NewsMediaDoc } from "@/lib/strapi";

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
  const [items, setItems] = useState<NewsMediaDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NewsMediaDoc | null>(null);
  const [previewing, setPreviewing] = useState<NewsMediaDoc | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/cms/news");
    const data = (await res.json().catch(() => null)) as {
      items?: NewsMediaDoc[];
      error?: string;
    } | null;
    if (res.status === 401) {
      window.location.href = "/admin/login?next=/admin/news";
      return;
    }
    if (!res.ok) {
      setError(data?.error || "Failed to load news from Strapi.");
      setItems([]);
    } else {
      setItems(data?.items ?? []);
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

  function openEdit(item: NewsMediaDoc) {
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
    const res = await fetch(
      editing?.documentId ? `/api/cms/news/${editing.documentId}` : "/api/cms/news",
      {
        method: editing?.documentId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  async function remove(item: NewsMediaDoc) {
    if (!confirm("Delete this News & Media item?")) return;
    await fetch(`/api/cms/news/${item.documentId}`, { method: "DELETE" });
    await load();
  }

  const published = items.filter((b) => b.status === "published").length;
  const drafts = items.filter((b) => b.status === "draft").length;

  const previewItem: Pick<
    NewsMediaDoc,
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
        description="Press releases in Strapi (Railway Postgres). Upload PDFs/covers to the Railway bucket, or paste an external link."
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
        {error && !modalOpen ? (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<NewsMediaDoc>
            data={items}
            searchPlaceholder="Search news…"
            getSearchText={(row) => `${row.title} ${row.excerpt} ${row.typeLabel} ${row.href}`}
            filters={[
              {
                key: "status",
                label: "All statuses",
                getValue: (row) => row.status,
                options: [
                  { value: "published", label: "Published" },
                  { value: "draft", label: "Draft" },
                  { value: "archived", label: "Archived" },
                ],
              },
              {
                key: "featured",
                label: "Featured",
                getValue: (row) => (row.featured ? "yes" : "no"),
                options: [
                  { value: "yes", label: "Featured" },
                  { value: "no", label: "Not featured" },
                ],
              },
              { key: "type", label: "All types", getValue: (row) => row.typeLabel },
            ]}
            sorts={[
              {
                key: "date-desc",
                label: "Newest first",
                compare: (a, b) => cmpDate(b.date, a.date),
              },
              {
                key: "date-asc",
                label: "Oldest first",
                compare: (a, b) => cmpDate(a.date, b.date),
              },
              {
                key: "title",
                label: "Title A–Z",
                compare: (a, b) => cmpStr(a.title, b.title),
              },
            ]}
            defaultSortKey="date-desc"
            columns={[
              {
                key: "title",
                header: "Title",
                cell: (row) => (
                  <div className="max-w-md">
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
                  <RowActions
                    actions={[
                      { label: "Preview", variant: "preview", onClick: () => setPreviewing(row) },
                      { label: "Edit", variant: "edit", onClick: () => openEdit(row) },
                      { label: "Delete", variant: "delete", onClick: () => void remove(row) },
                    ]}
                  />
                ),
              },
            ]}
          />
        )}
      </ContentPage>

      {previewing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={() => setPreviewing(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Card preview</h2>
              <button
                type="button"
                onClick={() => setPreviewing(null)}
                className="text-sm text-slate hover:text-ink"
              >
                Close
              </button>
            </div>
            <NewsMediaCard item={previewing} />
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lift">
            <div className="flex shrink-0 items-center justify-between border-b border-mist/60 px-6 py-4">
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

            <div className="min-h-0 flex-1 overflow-y-auto">
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
                    hint="Upload to the Railway bucket. External NSE links are available under “Or paste an external link”."
                  />
                  <MediaUploadField
                    label="Card preview image (optional)"
                    folder="media/covers"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    value={form.image}
                    onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                    allowUrl
                    hint="Upload a cover image, or leave empty for the default PDF preview."
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

            <div className="flex shrink-0 justify-end gap-2 border-t border-mist/60 px-6 py-4">
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
                className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saving…" : editing ? "Save changes" : "Create"}
              </button>
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
