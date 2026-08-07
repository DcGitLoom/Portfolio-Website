"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/content";

/**
 * Fixed left rail from lg up. The hairline before each label grows and turns
 * amber for the section currently crossing the middle of the viewport, so the
 * rail reports scroll position rather than just listing links.
 */
export default function Spine() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    // Track the whole intersecting set, not just the last entry to fire —
    // otherwise scrolling back up to the hero leaves the previous section lit.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sections.find((section) => visible.has(section.id));
        setActive(current ? current.id : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-screen w-44 flex-col justify-center gap-6 pl-10 lg:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group pointer-events-auto flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.25em] uppercase"
          >
            <span
              className={`h-px transition-all duration-300 ${
                isActive
                  ? "w-8 bg-amber"
                  : "w-4 bg-slate group-hover:w-8 group-hover:bg-paper"
              }`}
            />
            <span
              className={`transition-colors duration-300 ${
                isActive ? "text-amber" : "text-slate group-hover:text-paper"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
