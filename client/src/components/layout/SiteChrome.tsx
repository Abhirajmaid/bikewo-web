"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function SiteChrome({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isComingSoon = pathname === "/coming-soon";

  if (isAdmin || isComingSoon) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <div id="main">{children}</div>
      {footer}
    </>
  );
}
