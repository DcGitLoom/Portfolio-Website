"use client";

import { useState } from "react";
import { profile, sections } from "@/lib/content";

/** Takes over from the spine below lg. */
export default function MobileBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-paper/10 bg-ink/90 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-[0.7rem] tracking-[0.25em] text-paper uppercase"
        >
          {profile.first} {profile.last}
        </a>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="font-mono text-[0.7rem] tracking-[0.25em] text-amber uppercase"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <ul className="border-t border-paper/10 px-6 pb-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-xs tracking-[0.25em] text-slate uppercase"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
