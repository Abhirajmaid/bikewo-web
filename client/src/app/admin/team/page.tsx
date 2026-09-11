"use client";

import { useEffect, useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { DataTable } from "@/components/admin/DataTable";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import {
  LEADERSHIP_DIVISION_FILTERS,
  TEAM_DEPARTMENTS,
} from "@/lib/about";
import type { CmsTeamMember } from "@/lib/cms/types";
import type { ActiveStatus } from "@/lib/admin/types";

const DIVISION_OPTIONS = LEADERSHIP_DIVISION_FILTERS.filter((f) => f.slug !== "all");

const emptyForm = {
  name: "",
  role: "",
  department: TEAM_DEPARTMENTS[0] as string,
  email: "",
  division: "executive",
  image: "",
  joinedAt: new Date().toISOString().slice(0, 10),
  status: "active" as ActiveStatus,
  linkedin: "",
  twitter: "",
  facebook: "",
  instagram: "",
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
      image: item.image,
      joinedAt: item.joinedAt,
      status: item.status,
      linkedin: item.linkedin ?? "",
      twitter: item.twitter ?? "",
      facebook: item.facebook ?? "",
      instagram: item.instagram ?? "",
    });
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    await fetch(editing ? `/api/cms/team/${editing.id}` : "/api/cms/team", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, bio: "" }),
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
  const departmentOptions = Array.from(
    new Set([...TEAM_DEPARTMENTS, ...items.map((m) => m.department).filter(Boolean)]),
  );

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
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Role</span>
                <input
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="Shown under the name on the website"
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Department</span>
                <select
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Email</span>
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Division</span>
                <select
                  value={form.division}
                  onChange={(e) => setForm((f) => ({ ...f, division: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm"
                >
                  {DIVISION_OPTIONS.map((opt) => (
                    <option key={opt.slug} value={opt.slug}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="mt-1 block text-xs text-slate-400">
                  Controls which filter tab this person appears under on the leadership page.
                </span>
              </label>
              <MediaUploadField
                label="Photo"
                folder="team"
                accept="image/jpeg,image/png,image/webp,image/gif"
                value={form.image}
                onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                hint="Uploaded to the Railway bucket. Leave empty to use no photo."
              />
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Joined (YYYY-MM-DD)</span>
                <input
                  value={form.joinedAt}
                  onChange={(e) => setForm((f) => ({ ...f, joinedAt: e.target.value }))}
                  className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </label>

              <div className="border-t border-mist pt-3">
                <p className="mb-2 text-sm font-medium text-ink">Social profiles</p>
                <p className="mb-3 text-xs text-slate-400">
                  Icons appear on the member card when a URL is set.
                </p>
                {(
                  [
                    ["linkedin", "LinkedIn"],
                    ["twitter", "X / Twitter"],
                    ["facebook", "Facebook"],
                    ["instagram", "Instagram"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="mb-3 block last:mb-0">
                    <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
                    <input
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder="https://"
                      className="w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </label>
                ))}
              </div>

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
