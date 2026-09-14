"use client";

import { AdminSidebar } from "./AdminSidebar";
import { ConfirmProvider } from "./ConfirmModal";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <div className="flex h-screen overflow-hidden bg-cloud">
        <AdminSidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
    </ConfirmProvider>
  );
}
