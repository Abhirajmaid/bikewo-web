"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRIMARY_NAV } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* The homepage hero is a dark plate, so the header sits on it reversed
     until the user scrolls. Every other route starts on white. */
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        overHero
          ? "bg-transparent"
          : "border-b border-indigo-100 bg-white/85 backdrop-blur-xl backdrop-saturate-150",
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <Container className="flex h-20 items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="BikeWo home"
          className="flex min-h-11 shrink-0 items-center"
        >
          <Logo variant={overHero ? "reversed" : "primary"} height={32} priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
          {PRIMARY_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            const hasChildren = Boolean(item.children?.length);

            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setOpenMenu(hasChildren ? item.href : null)}
                  onFocus={() => setOpenMenu(hasChildren ? item.href : null)}
                  aria-expanded={hasChildren ? openMenu === item.href : undefined}
                  className={cn(
                    "flex h-11 items-center gap-1.5 rounded-full px-3.5 font-display text-[14.5px] font-medium transition-colors duration-200",
                    overHero
                      ? "text-white/85 hover:text-white"
                      : "text-indigo-800/80 hover:text-indigo-800",
                    active && (overHero ? "text-white" : "text-indigo-800"),
                  )}
                >
                  {item.title}
                  {hasChildren && (
                    <ChevronDownIcon
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        openMenu === item.href && "rotate-180",
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {hasChildren && openMenu === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-lg border border-indigo-100 bg-white p-2 shadow-[0_12px_32px_rgb(36_31_93/0.12)]">
                        {item.blurb && (
                          <p className="px-3 pb-2 pt-2 text-[13px] leading-relaxed text-slate">
                            {item.blurb}
                          </p>
                        )}
                        <ul>
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex min-h-11 items-center rounded-md px-3 text-[14px] text-indigo-800/85 transition-colors hover:bg-cloud hover:text-indigo-800"
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/contact"
            variant={overHero ? "onDark" : "primary"}
            className="hidden h-11 px-5 sm:inline-flex"
            withArrow
          >
            Get in Touch
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              overHero ? "text-white hover:bg-white/10" : "text-indigo-800 hover:bg-cloud",
            )}
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white lg:hidden"
        >
          <Container className="flex h-20 items-center justify-between">
            <Logo variant="primary" height={32} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-full text-indigo-800 hover:bg-cloud"
            >
              <CloseIcon />
            </button>
          </Container>

          <nav aria-label="Mobile">
            <Container className="h-[calc(100dvh-5rem)] overflow-y-auto pb-16">
              <ul className="divide-y divide-indigo-100">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href} className="py-4">
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center font-display text-lg font-semibold text-indigo-800"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <ul className="mt-1 space-y-0.5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex min-h-11 items-center text-[15px] text-slate"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <Button href="/contact" className="mt-8 w-full" withArrow>
                Get in Touch
              </Button>
            </Container>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
