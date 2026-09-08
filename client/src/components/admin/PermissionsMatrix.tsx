import {
  CMS_ROLES,
  PERMISSION_LABELS,
  ROLE_PERMISSIONS,
  type CmsRole,
  type Permission,
} from "@/lib/admin/rbac";
import { cn } from "@/lib/utils";

const ROLES: CmsRole[] = ["super_admin", "admin", "editor", "reviewer", "viewer"];
const PERMISSIONS: Permission[] = Object.keys(PERMISSION_LABELS) as Permission[];

export function PermissionsMatrix() {
  return (
    <section className="rounded-xl border border-mist/60 bg-white p-5">
      <h2 className="font-display text-sm font-semibold text-ink">Role permissions</h2>
      <p className="mt-1 text-xs text-slate-400">
        What each CMS role can access across the dashboard.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead>
            <tr className="border-b border-mist/60 text-slate-400">
              <th className="py-2 pr-4 font-medium">Permission</th>
              {ROLES.map((role) => (
                <th key={role} className="px-2 py-2 text-center font-medium">
                  {CMS_ROLES[role].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((permission) => (
              <tr key={permission} className="border-b border-mist/40 last:border-0">
                <td className="py-2.5 pr-4 text-slate">{PERMISSION_LABELS[permission]}</td>
                {ROLES.map((role) => {
                  const allowed = ROLE_PERMISSIONS[role].includes(permission);
                  return (
                    <td key={role} className="px-2 py-2.5 text-center">
                      <span
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                          allowed
                            ? "bg-green-100 text-green-700"
                            : "bg-cloud text-mist",
                        )}
                        aria-label={allowed ? "Allowed" : "Not allowed"}
                      >
                        {allowed ? "✓" : "—"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
