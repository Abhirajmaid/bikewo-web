"use client";

import { useEffect, useState } from "react";
import { CMS_ROLES, type CmsRole, type InternalMember } from "@/lib/admin/rbac";
import { TEAM_DEPARTMENTS } from "@/lib/about";
import { cn } from "@/lib/utils";

export type MemberForm = {
  name: string;
  email: string;
  cmsRole: CmsRole;
  department: string;
  password: string;
};

/** @deprecated use MemberForm */
export type NewMemberForm = MemberForm;

type AddMemberModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (member: MemberForm) => void;
  /** When set, modal edits this member (password optional). */
  member?: InternalMember | null;
  error?: string | null;
};

const ROLES = Object.keys(CMS_ROLES) as CmsRole[];
const DEFAULT_DEPARTMENT = TEAM_DEPARTMENTS[0];

const emptyForm = (): MemberForm => ({
  name: "",
  email: "",
  cmsRole: "editor",
  department: DEFAULT_DEPARTMENT,
  password: "",
});

export function AddMemberModal({
  open,
  onClose,
  onSubmit,
  member,
  error: externalError,
}: AddMemberModalProps) {
  const editing = Boolean(member);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const displayError = externalError || error;

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (member) {
      setForm({
        name: member.name,
        email: member.email,
        cmsRole: member.cmsRole,
        department: member.department || DEFAULT_DEPARTMENT,
        password: "",
      });
    } else {
      setForm(emptyForm());
    }
  }, [open, member]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing && form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (editing && form.password && form.password.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-member-title"
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-mist/60 bg-white shadow-deep"
      >
        <div className="shrink-0 border-b border-mist/60 px-6 py-4">
          <h2 id="add-member-title" className="font-display text-lg font-semibold text-ink">
            {editing ? "Edit member" : "Invite internal member"}
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {editing
              ? "Update profile, role, or set a new password."
              : "Add a BikeWo team member with CMS access and a role."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <Field label="Full name" required>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Priya Sharma"
                className={inputClass}
              />
            </Field>

            <Field label="Work email" required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="name@bikewo.com"
                className={inputClass}
              />
            </Field>

            <Field label={editing ? "New password" : "Temporary password"} required={!editing}>
              <input
                required={!editing}
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder={editing ? "Leave blank to keep current" : "Min. 8 characters"}
                minLength={editing ? undefined : 8}
                className={inputClass}
              />
              {editing ? (
                <span className="mt-1 block text-xs text-slate-400">
                  Leave blank to keep the current password.
                </span>
              ) : null}
            </Field>

            <Field label="Department">
              <select
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                className={inputClass}
              >
                {TEAM_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
                {form.department &&
                !(TEAM_DEPARTMENTS as readonly string[]).includes(form.department) ? (
                  <option value={form.department}>{form.department}</option>
                ) : null}
              </select>
            </Field>

            <Field label="CMS role" required>
              <div className="space-y-2">
                {ROLES.map((role) => (
                  <label
                    key={role}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      form.cmsRole === role
                        ? "border-indigo-300 bg-indigo-50/50"
                        : "border-mist/60 hover:border-mist",
                    )}
                  >
                    <input
                      type="radio"
                      name="cmsRole"
                      value={role}
                      checked={form.cmsRole === role}
                      onChange={() => setForm((f) => ({ ...f, cmsRole: role }))}
                      className="mt-0.5 accent-indigo-700"
                    />
                    <span>
                      <span className="block text-sm font-medium text-ink">
                        {CMS_ROLES[role].label}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {CMS_ROLES[role].description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            {displayError ? <p className="text-sm text-red-600">{displayError}</p> : null}
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-mist/60 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-mist/80 px-4 py-2 text-sm text-slate transition-colors hover:bg-cloud"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {editing ? "Save changes" : "Send invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-mist/80 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
