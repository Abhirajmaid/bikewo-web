"use client";

import { useEffect, useState } from "react";
import { AddMemberModal, type MemberForm } from "@/components/admin/AddMemberModal";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { PermissionsMatrix } from "@/components/admin/PermissionsMatrix";
import { RoleBadge } from "@/components/admin/RoleBadge";
import { StatCards } from "@/components/admin/StatCards";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { CMS_ROLES, type InternalMember } from "@/lib/admin/rbac";

export default function MembersPage() {
  const [members, setMembers] = useState<InternalMember[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<InternalMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cms/members");
    if (res.ok) {
      const data = (await res.json()) as { items: InternalMember[] };
      setMembers(data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditing(null);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(member: InternalMember) {
    setEditing(member);
    setError(null);
    setModalOpen(true);
  }

  async function saveMember(form: MemberForm) {
    setError(null);
    const payload: Record<string, string> = {
      name: form.name,
      email: form.email,
      cmsRole: form.cmsRole,
      department: form.department || "—",
    };
    if (form.password) payload.password = form.password;

    const res = await fetch(
      editing ? `/api/cms/members/${editing.id}` : "/api/cms/members",
      {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editing
            ? payload
            : { ...payload, password: form.password },
        ),
      },
    );
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error || "Save failed.");
      return;
    }
    setModalOpen(false);
    setEditing(null);
    await load();
  }

  async function remove(member: InternalMember) {
    if (!confirm(`Delete ${member.name}? This cannot be undone.`)) return;
    setError(null);
    const res = await fetch(`/api/cms/members/${member.id}`, { method: "DELETE" });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error || "Delete failed.");
      return;
    }
    await load();
  }

  async function toggleActive(member: InternalMember) {
    const nextStatus = member.status === "suspended" ? "active" : "suspended";
    const label = nextStatus === "suspended" ? "Deactivate" : "Reactivate";
    if (!confirm(`${label} ${member.name}?`)) return;
    setError(null);
    const res = await fetch(`/api/cms/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error || `${label} failed.`);
      return;
    }
    await load();
  }

  const active = members.filter((m) => m.status === "active").length;
  const invited = members.filter((m) => m.status === "invited").length;

  return (
    <>
      <PageHeader
        title="Members"
        description="Internal BikeWo users with CMS access and role-based permissions"
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <span aria-hidden>+</span> Invite member
          </button>
        }
      />

      <div className="space-y-5 p-6">
        <StatCards
          stats={[
            { label: "Total members", value: members.length },
            { label: "Active", value: active },
            { label: "Pending invites", value: invited },
            {
              label: "Roles in use",
              value: new Set(members.map((m) => m.cmsRole)).size,
            },
          ]}
        />

        <div className="flex flex-wrap gap-2">
          <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {loading ? (
          <p className="text-sm text-slate">Loading…</p>
        ) : (
          <DataTable<InternalMember>
            data={members}
            searchPlaceholder="Search members…"
            getSearchText={(row) => `${row.name} ${row.email} ${row.department}`}
            filters={[
              {
                key: "status",
                label: "All statuses",
                getValue: (row) => row.status,
                options: [
                  { value: "active", label: "Active" },
                  { value: "invited", label: "Invited" },
                  { value: "suspended", label: "Suspended" },
                ],
              },
              {
                key: "role",
                label: "All roles",
                getValue: (row) => row.cmsRole,
                options: (Object.keys(CMS_ROLES) as Array<keyof typeof CMS_ROLES>).map(
                  (role) => ({ value: role, label: CMS_ROLES[role].label }),
                ),
              },
              { key: "department", label: "All departments", getValue: (row) => row.department },
            ]}
            sorts={[
              {
                key: "invited-desc",
                label: "Newest invited",
                compare: (a, b) => cmpDate(b.invitedAt, a.invitedAt),
              },
              {
                key: "name",
                label: "Name A–Z",
                compare: (a, b) => cmpStr(a.name, b.name),
              },
              {
                key: "active-desc",
                label: "Recently active",
                compare: (a, b) =>
                  cmpDate(b.lastActiveAt ?? "", a.lastActiveAt ?? ""),
              },
            ]}
            defaultSortKey="invited-desc"
            columns={[
              {
                key: "name",
                header: "Member",
                cell: (row) => (
                  <div>
                    <p className="font-medium text-ink">{row.name}</p>
                    <p className="text-xs text-slate-400">{row.email}</p>
                  </div>
                ),
              },
              {
                key: "role",
                header: "CMS role",
                cell: (row) => <RoleBadge role={row.cmsRole} />,
              },
              { key: "department", header: "Department", cell: (row) => row.department },
              {
                key: "invited",
                header: "Invited",
                cell: (row) => formatDate(row.invitedAt),
              },
              {
                key: "lastActive",
                header: "Last active",
                cell: (row) =>
                  row.lastActiveAt ? formatDateTime(row.lastActiveAt) : "—",
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
                      onClick={() => openEdit(row)}
                      className="text-xs font-medium text-green-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void toggleActive(row)}
                      className="text-xs font-medium text-amber-700 hover:underline"
                    >
                      {row.status === "suspended" ? "Activate" : "Deactivate"}
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

        <PermissionsMatrix />
      </div>

      <AddMemberModal
        open={modalOpen}
        member={editing}
        error={error}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
          setError(null);
        }}
        onSubmit={(form) => {
          void saveMember(form);
        }}
      />
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

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
