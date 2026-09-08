"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRIMARY_NAV, type NavNode } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openItem = PRIMARY_NAV.find((item) => item.href === openMenu);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  const toggleMenu = (href: string) => {
    setOpenMenu((current) => (current === href ? null : href));
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <Container className="pointer-events-auto">
        <div ref={navRef} className="relative">
          <div
            className={cn(
              "relative z-10 flex items-center gap-3 rounded-full border border-indigo-100/70 bg-white px-3 py-2 transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:gap-4 sm:px-4 sm:py-2.5",
              scrolled || openMenu
                ? "shadow-[0_8px_32px_rgb(36_31_93/0.14)]"
                : "shadow-[0_4px_24px_rgb(36_31_93/0.08)]",
            )}
          >
            <Link
              href="/"
              aria-label="BikeWo home"
              className="flex min-h-10 shrink-0 items-center pl-1"
              onClick={() => setOpenMenu(null)}
            >
              <Logo variant="primary" height={28} priority className="sm:h-7.5!" />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
            >
              {PRIMARY_NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const hasChildren = Boolean(item.children?.length);
                const menuOpen = openMenu === item.href;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex h-9 items-center rounded-full px-3 font-display text-[13.5px] font-medium text-indigo-800/75 transition-colors duration-200 hover:text-indigo-800",
                        active && "bg-green-100 text-indigo-800",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.href}
                    type="button"
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    onClick={() => toggleMenu(item.href)}
                    className={cn(
                      "flex h-9 items-center gap-1 rounded-full px-3 font-display text-[13.5px] font-medium text-indigo-800/75 transition-colors duration-200 hover:text-indigo-800",
                      (active || menuOpen) && "bg-green-100 text-indigo-800",
                    )}
                  >
                    {item.title}
                    <ChevronDownIcon
                      size={13}
                      className={cn(
                        "opacity-60 transition-transform duration-200",
                        menuOpen && "rotate-180",
                      )}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <NavCta className="hidden sm:inline-flex" onNavigate={() => setOpenMenu(null)} />

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex size-10 items-center justify-center rounded-full text-indigo-800 transition-colors hover:bg-cloud lg:hidden"
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {openItem?.children && (
              <MegaMenuPanel item={openItem} onClose={() => setOpenMenu(null)} />
            )}
          </AnimatePresence>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MegaMenuPanel({ item, onClose }: { item: NavNode; onClose: () => void }) {
  if (item.href === "/subsidiaries") {
    return <SubsidiariesMegaMenu item={item} onClose={onClose} />;
  }

  if (item.href === "/businesses") {
    return <BusinessesMegaMenu item={item} onClose={onClose} />;
  }

  const children = item.children ?? [];
  const midpoint = Math.ceil(children.length / 2);
  const primaryLinks = children.slice(0, midpoint);
  const secondaryLinks = children.slice(midpoint);

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full z-0 mt-2.5"
    >
      <div className="overflow-hidden rounded-[28px] border border-indigo-100/70 bg-white px-6 pb-8 pt-6 shadow-[0_16px_40px_rgb(36_31_93/0.12)] sm:px-8 sm:pb-10 sm:pt-7">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-sm">
            <h3 className="font-display text-xl font-semibold tracking-tight text-indigo-800">
              {item.title}
            </h3>
            {item.blurb && (
              <p className="mt-3 text-[14px] leading-relaxed text-slate">{item.blurb}</p>
            )}
            <ExploreCta href={item.href} onNavigate={onClose} className="mt-6" />
          </div>

          <div>
            <p className="mb-1 font-display text-base font-semibold text-indigo-800">What we do</p>
            <ul className="divide-y divide-indigo-100">
              {primaryLinks.map((child) => (
                <li key={child.href}>
                  <MegaMenuLink child={child} parentTitle={item.title} onClose={onClose} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-1 font-display text-base font-semibold text-indigo-800">
              {secondaryLinks.length > 0 ? "More to explore" : "Quick link"}
            </p>
            {secondaryLinks.length > 0 ? (
              <ul className="divide-y divide-indigo-100">
                {secondaryLinks.map((child) => (
                  <li key={child.href}>
                    <MegaMenuLink child={child} parentTitle={item.title} onClose={onClose} />
                  </li>
                ))}
              </ul>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-indigo-200 px-4 py-3.5 transition-colors hover:border-indigo-300 hover:bg-cloud/50"
              >
                <span className="font-display text-[15px] font-semibold text-indigo-800">
                  View all
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-800 text-white transition-transform duration-200 group-hover:scale-105">
                  <ArrowUpRightIcon size={14} strokeWidth={2.5} />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BusinessesMegaMenu({ item, onClose }: { item: NavNode; onClose: () => void }) {
  const children = item.children ?? [];
  const midpoint = Math.ceil(children.length / 2);
  const rows = Array.from({ length: midpoint }, (_, i) =>
    [children[i], children[i + midpoint]].filter(Boolean),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full z-0 mt-2.5"
    >
      <div className="overflow-hidden rounded-[28px] border border-indigo-100/70 bg-white px-6 pb-8 pt-6 shadow-[0_16px_40px_rgb(36_31_93/0.12)] sm:px-8 sm:pb-10 sm:pt-7">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-14">
          <div className="max-w-sm">
            <h3 className="font-display text-xl font-semibold tracking-tight text-indigo-800">
              {item.title}
            </h3>
            {item.blurb && (
              <p className="mt-3 text-[14px] leading-relaxed text-slate">{item.blurb}</p>
            )}
            <ExploreCta href={item.href} onNavigate={onClose} className="mt-6" />
          </div>

          <div>
            <p className="mb-1 font-display text-base font-semibold text-indigo-800">
              Solutions we Provide
            </p>
            <ul className="divide-y divide-indigo-100">
              {rows.map((row) => (
                <li key={row.map((c) => c.href).join("-")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                    {row.map((child) => (
                      <MegaMenuLink
                        key={child.href}
                        child={child}
                        parentTitle={item.title}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SubsidiariesMegaMenu({ item, onClose }: { item: NavNode; onClose: () => void }) {
  const companies = item.children ?? [];
  const [selectedHref, setSelectedHref] = useState(companies[0]?.href ?? "");
  const selected = companies.find((c) => c.href === selectedHref) ?? companies[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full z-0 mt-2.5"
    >
      <div className="overflow-hidden rounded-[28px] border border-indigo-100/70 bg-white px-6 pb-8 pt-6 shadow-[0_16px_40px_rgb(36_31_93/0.12)] sm:px-8 sm:pb-10 sm:pt-7">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-sm">
            <h3 className="font-display text-xl font-semibold tracking-tight text-indigo-800">
              {item.title}
            </h3>
            {item.blurb && (
              <p className="mt-3 text-[14px] leading-relaxed text-slate">{item.blurb}</p>
            )}
          </div>

          <div>
            <p className="mb-1 font-display text-base font-semibold text-indigo-800">
              Our Companies
            </p>
            <ul className="divide-y divide-indigo-100">
              {companies.map((child) => {
                const active = child.href === selected?.href;
                return (
                  <li key={child.href}>
                    <button
                      type="button"
                      onClick={() => setSelectedHref(child.href)}
                      className="group flex w-full items-start justify-between gap-4 py-4 text-left transition-colors"
                    >
                      <span>
                        <span
                          className={cn(
                            "block font-display text-[15px] font-semibold transition-colors",
                            active
                              ? "text-indigo-800"
                              : "text-indigo-800/80 group-hover:text-indigo-800",
                          )}
                        >
                          {child.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-slate">{item.title}</span>
                      </span>
                      <ArrowUpRightIcon
                        size={16}
                        className={cn(
                          "mt-0.5 shrink-0 transition-colors",
                          active ? "text-indigo-800" : "text-slate-400",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-start lg:pt-7">
            {selected && (
              <>
                {selected.logo ? (
                  <div className="mb-4 flex h-14 items-center">
                    <Image
                      src={selected.logo}
                      alt=""
                      width={140}
                      height={44}
                      className="h-10 w-auto max-w-40 object-contain object-left"
                    />
                  </div>
                ) : null}
                <h4 className="font-display text-lg font-semibold tracking-tight text-indigo-800">
                  {selected.title}
                </h4>
                {selected.blurb && (
                  <p className="mt-3 text-[14px] leading-relaxed text-slate">{selected.blurb}</p>
                )}
                <ExploreCta
                  href={selected.href}
                  external={selected.external}
                  onNavigate={onClose}
                  className="mt-6 self-start"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExploreCta({
  href,
  external,
  onNavigate,
  className,
}: {
  href: string;
  external?: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex h-11 items-center gap-2.5 rounded-full bg-green-500 pl-5 pr-1.5 font-display text-sm font-semibold text-indigo-800 transition-colors hover:bg-charge",
    className,
  );
  const icon = (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-indigo-800 transition-transform duration-200 group-hover:scale-105">
      <ArrowUpRightIcon size={14} strokeWidth={2.5} />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onNavigate}
        className={classes}
      >
        Explore
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={classes}>
      Explore
      {icon}
    </Link>
  );
}

function MegaMenuLink({
  child,
  parentTitle,
  onClose,
}: {
  child: NavNode;
  parentTitle: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={child.href}
      onClick={onClose}
      className="group flex items-start justify-between gap-4 py-4 transition-colors"
    >
      <span>
        <span className="block font-display text-[15px] font-semibold text-indigo-800 transition-colors group-hover:text-indigo-700">
          {child.title}
        </span>
        <span className="mt-0.5 block text-[13px] text-slate">{parentTitle}</span>
      </span>
      <ArrowUpRightIcon
        size={16}
        className="mt-0.5 shrink-0 text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-800"
      />
    </Link>
  );
}

function NavCta({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link
      href="/contact"
      onClick={onNavigate}
      className={cn(
        "group inline-flex h-10 items-center gap-2.5 rounded-full bg-indigo-800 pl-4 pr-1.5 font-display text-[13.5px] font-semibold text-white transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-indigo-700 active:scale-[0.98]",
        className,
      )}
    >
      Get in Touch
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-charge text-indigo-800 transition-transform duration-200 group-hover:scale-105">
        <ArrowUpRightIcon size={14} strokeWidth={2.5} />
      </span>
    </Link>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto fixed inset-0 z-50 bg-white lg:hidden"
        >
          <div className="px-4 pt-4 sm:px-6 sm:pt-5">
            <Container>
              <div className="flex items-center justify-between rounded-full border border-indigo-100/70 bg-white px-3 py-2 shadow-[0_4px_24px_rgb(36_31_93/0.08)]">
                <Logo variant="primary" height={28} />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full text-indigo-800 hover:bg-cloud"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
            </Container>
          </div>

          <nav aria-label="Mobile">
            <Container className="h-[calc(100dvh-5.5rem)] overflow-y-auto pb-16 pt-6">
              <ul className="divide-y divide-indigo-100">
                {PRIMARY_NAV.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const isExpanded = expanded === item.href;

                  return (
                    <li key={item.href} className="py-1">
                      {hasChildren ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpanded((current) => (current === item.href ? null : item.href))
                            }
                            className="flex min-h-12 w-full items-center justify-between font-display text-lg font-semibold text-indigo-800"
                          >
                            {item.title}
                            <ChevronDownIcon
                              size={18}
                              className={cn(
                                "text-slate transition-transform duration-200",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pb-2"
                              >
                                {item.children!.map((child) => (
                                  <li key={child.href}>
                                    {child.external ? (
                                      <a
                                        href={child.href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        onClick={onClose}
                                        className="flex min-h-11 items-center justify-between pl-2 text-[15px] text-slate"
                                      >
                                        {child.title}
                                        <ArrowUpRightIcon size={14} />
                                      </a>
                                    ) : (
                                      <Link
                                        href={child.href}
                                        className="flex min-h-11 items-center justify-between pl-2 text-[15px] text-slate"
                                      >
                                        {child.title}
                                        <ArrowUpRightIcon size={14} />
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex min-h-12 items-center font-display text-lg font-semibold text-indigo-800"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <NavCta className="mt-8 w-full justify-center" onNavigate={onClose} />
            </Container>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
