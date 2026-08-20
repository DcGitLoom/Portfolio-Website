import { profile, socials } from "@/lib/content";
import { glyphMap } from "./Icons";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-[13px] font-bold text-on-accent">
                {profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.role} at the University of Saskatchewan, building full-stack web applications.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-xs uppercase tracking-[0.18em] text-muted">Pages</h2>
            <ul className="mt-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-11 items-center py-1 text-sm text-fg/80 transition-colors duration-200 hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xs uppercase tracking-[0.18em] text-muted">Elsewhere</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((s) => {
                const Glyph = glyphMap[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent"
                    >
                      <Glyph className="h-[18px] w-[18px]" aria-hidden="true" />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
