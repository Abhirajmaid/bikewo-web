"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
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
              {editing ? "Edit document" : "Add document"}
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
