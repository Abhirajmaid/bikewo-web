"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isComingSoon = pathname === "/coming-soon";

  if (isAdmin || isComingSoon) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div id="main">{children}</div>
      <Footer />
    </>
  );
}
