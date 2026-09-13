"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { RowActions } from "@/components/admin/RowActions";
import { ToolbarButton } from "@/components/admin/Toolbar";
import {
  INVESTOR_TYPES,
  slugifyInvestorTitle,
  type InvestorDoc,
  type InvestorType,
} from "@/lib/investors";

const emptyForm = {
  title: "",
  excerpt: "",
  docType: "policy" as InvestorType,
  date: new Date().toISOString().slice(0, 10),
  href: "",
  featured: false,
  slug: "",
};

export default function InvestorsAdminPage() {
  const [items, setItems] = useState<InvestorDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<InvestorDoc | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/investors");
    if (res.ok) {
      const data = (await res.json()) as { items: InvestorDoc[] };
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

  function openEdit(item: InvestorDoc) {
    setEditing(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      docType: item.type,
      date: item.date,
      href: item.href,
      featured: Boolean(item.featured),
      slug: item.id,
    });
    setError(null);
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      docType: form.docType,
      date: form.date,
      href: form.href,
      featured: form.featured,
      slug: form.slug.trim() || slugifyInvestorTitle(form.title),
    };
    const res = await fetch(
      editing?.documentId
        ? `/api/cms/investors/${editing.documentId}`
        : "/api/cms/investors",
      {
        method: editing?.documentId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = (await res.json()) as { error?: string };
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed. Is Strapi running with STRAPI_URL / STRAPI_API_TOKEN?");
      return;
    }
    setModalOpen(false);
    await load();
  }

  async function remove(item: InvestorDoc) {
    if (!item.documentId) return;
    if (!confirm("Delete this investor document?")) return;
    await fetch(`/api/cms/investors/${item.documentId}`, { method: "DELETE" });
    await load();
  }

  const withPdf = items.filter((i) => i.href).length;

  return (
    <>
      <ContentPage
        title="Investors"
        description="IR documents stored in Railway Postgres (Strapi). Upload PDFs to the Railway bucket."
        addLabel="Add document"
        onAdd={openCreate}
        stats={[
          { label: "Total", value: items.length },
          { label: "With PDF", value: withPdf },
          { label: "Missing PDF", value: items.length - withPdf },
          { label: "Featured", value: items.filter((i) => i.featured).length },
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
          <DataTable<InvestorDoc>
            data={items}
            searchPlaceholder="Search documents…"
            getSearchText={(row) => `${row.title} ${row.excerpt} ${row.typeLabel}`}
            filters={[
              {
                key: "type",
                label: "All types",
                getValue: (row) => row.type,
                options: INVESTOR_TYPES.filter((t) => t.slug !== "all").map((t) => ({
                  value: t.slug,
                  label: t.label,
                })),
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
              {
                key: "pdf",
                label: "PDF status",
                getValue: (row) => (row.href ? "ready" : "missing"),
                options: [
                  { value: "ready", label: "With PDF" },
                  { value: "missing", label: "Missing PDF" },
                ],
              },
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
                  <div className="max-w-sm">
                    <p className="font-medium text-ink">{row.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {row.typeLabel} · {row.href ? "PDF ready" : "PDF missing"}
                    </p>
                  </div>
                ),
              },
              {
                key: "date",
                header: "Date",
                cell: (row) =>
                  new Date(row.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
              },
              {
                key: "featured",
                header: "Featured",
                cell: (row) => (row.featured ? "Yes" : "—"),
              },
              {
                key: "actions",
                header: "",
                cell: (row) => (
                  <RowActions
                    actions={[
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

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-lift">
            <h2 className="shrink-0 px-6 pt-6 font-display text-lg font-semibold text-ink">
              {editing ? "Edit document" : "Add document"}
            </h2>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Title</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Excerpt</span>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Type</span>
                <select
                  value={form.docType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, docType: e.target.value as InvestorType }))
                  }
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  {INVESTOR_TYPES.filter((t) => t.slug !== "all").map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Date</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <MediaUploadField
                label="PDF file"
                folder="investors"
                accept="application/pdf"
                value={form.href}
                onChange={(url) => setForm((f) => ({ ...f, href: url }))}
                allowUrl
                hint="Upload to the Railway bucket. You can save without a PDF and add it later."
              />
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Featured on investors page
              </label>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
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
