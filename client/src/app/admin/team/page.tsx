"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import type { CmsTeamMember } from "@/lib/cms/types";
import type { ActiveStatus } from "@/lib/admin/types";

const emptyForm = {
  name: "",
  role: "",
  department: "",
  email: "",
  division: "executive",
  bio: "",
  image: "",
  joinedAt: new Date().toISOString().slice(0, 10),
  status: "active" as ActiveStatus,
};

export default function TeamPage() {
  const [items, setItems] = useState<CmsTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CmsTeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/team");
    if (res.ok) {
      const data = (await res.json()) as { items: CmsTeamMember[] };
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
    setModalOpen(true);
  }

  function openEdit(item: CmsTeamMember) {
    setEditing(item);
    setForm({
      name: item.name,
      role: item.role,
      department: item.department,
      email: item.email,
      division: item.division,
      bio: item.bio,
      image: item.image,
      joinedAt: item.joinedAt,
      status: item.status,
    });
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    await fetch(editing ? `/api/cms/team/${editing.id}` : "/api/cms/team", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setModalOpen(false);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/cms/team/${id}`, { method: "DELETE" });
    await load();
  }

  const active = items.filter((m) => m.status === "active").length;

  return (
    <>
      <ContentPage
        title="Team"
        description="Leadership and team members shown on the website"
        addLabel="Add member"
        onAdd={openCreate}
        stats={[
          { label: "Total members", value: items.length },
          { label: "Active", value: active },
          { label: "Departments", value: new Set(items.map((m) => m.department)).size },
          { label: "Inactive", value: items.length - active },
        ]}
        toolbarExtra={<ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>}
      >
        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<CmsTeamMember>
            data={items}
            columns={[
              {
                key: "name",
                header: "Name",
                cell: (row) => (
                  <div>
                    <p className="font-medium text-ink">{row.name}</p>
                    <p className="text-xs text-slate-400">{row.email || "—"}</p>
                  </div>
                ),
              },
              { key: "role", header: "Role", cell: (row) => row.role },
              { key: "department", header: "Department", cell: (row) => row.department },
              {
                key: "joined",
                header: "Date joined",
                cell: (row) => formatDate(row.joinedAt),
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
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift">
            <h2 className="font-display text-lg font-semibold text-ink">
              {editing ? "Edit team member" : "Add team member"}
            </h2>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["name", "Name"],
                  ["role", "Role"],
                  ["department", "Department"],
                  ["email", "Email"],
                  ["division", "Division slug"],
                  ["image", "Image URL"],
                  ["joinedAt", "Joined (YYYY-MM-DD)"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Bio</span>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Status</span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value as ActiveStatus }))
                  }
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
