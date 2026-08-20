"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/content";
import { Close, Menu } from "./Icons";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile sheet is open. Closing on
  // navigation is handled by the links' own onClick, not an effect.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group -ml-1 flex min-h-11 min-w-11 items-center gap-2.5 rounded-full px-1 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-[13px] font-bold text-on-accent transition-transform duration-200 group-hover:scale-105">
            {profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03] md:inline-flex"
        >
          Hire me
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border text-fg transition-colors duration-200 hover:border-border-strong md:hidden"
        >
          {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-bg md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-3 text-base transition-colors duration-200 ${
                    active ? "text-accent" : "text-fg hover:bg-surface"
                  }`}
                >
                  {item.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 pb-1">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-base font-medium text-on-accent"
            >
              Hire me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
