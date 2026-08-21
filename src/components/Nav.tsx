"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { SCROLL_OFFSET } from "@/lib/scroll";
import { ArrowUpRight, Close, Menu } from "./Icons";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section's top has most recently passed the same
  // offset the browser uses to land an anchor-scrolled section (SCROLL_OFFSET,
  // shared with each section's scroll-margin-top below). Using a different
  // number here than the CSS uses means the browser can land a section
  // "reached" before this loop agrees, leaving the previous link highlighted.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const onScroll = () => {
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - SCROLL_OFFSET <= 1) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
        <a
          href="#home"
          className="group -ml-1 flex min-h-11 min-w-11 items-center gap-2.5 rounded-full px-1 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-[13px] font-bold text-on-accent transition-transform duration-200 group-hover:scale-105">
            {profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {s.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03] md:inline-flex"
        >
          Resume
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

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

      <div id="mobile-menu" hidden={!open} className="border-t border-border bg-bg md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-3 text-base transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-fg hover:bg-surface"
                  }`}
                >
                  {s.label}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </a>
              </li>
            );
          })}
          <li className="pt-2 pb-1">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 text-base font-medium text-on-accent"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
