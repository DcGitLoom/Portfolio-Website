import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, glyphMap, type GlyphName } from "./Icons";

/** Pill action with a filled accent disc — the hero's primary affordance. */
export function PillLink({
  href, icon, children, external = false,
}: {
  href: string;
  icon: GlyphName;
  children: ReactNode;
  external?: boolean;
}) {
  const Glyph = glyphMap[icon];
  const inner = (
    <>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-200 group-hover:scale-110">
        <Glyph className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </>
  );
  const cls =
    "group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-1.5 pr-5 text-sm font-medium text-fg backdrop-blur transition-all duration-200 hover:border-accent/50 hover:bg-surface-2";

  return external ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer noopener">{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function SectionHeading({
  eyebrow, title, lead, id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-accent" />
        <span className="font-display text-xs uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </span>
      </div>
      <h2
        id={id}
        className="font-display text-3xl leading-[1.15] font-light tracking-tight text-balance sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-display text-[11px] tracking-wide text-muted">
      {children}
    </span>
  );
}

/** Card used by the home "what I do" grid. */
export function DisciplineCard({
  title, blurb, tags, glyph, href = "/projects",
}: {
  title: string;
  blurb: string;
  tags: readonly string[];
  glyph: GlyphName;
  href?: string;
}) {
  const Glyph = glyphMap[glyph];
  return (
    <Link
      href={href}
      aria-label={`${title} — see related projects`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      {/* Accent wash appears only on hover, keeping the accent share small at rest. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
          <Glyph className="h-5 w-5" aria-hidden="true" />
        </span>
        {/*
          Always rendered, never hover-only: on touch there is no hover state,
          so a hover-revealed affordance is invisible to half the audience.
          Hover only strengthens it.
        */}
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/85 text-on-accent transition-all duration-300 group-hover:bg-accent group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <h3 className="relative mt-4 font-display text-lg font-medium tracking-tight">{title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{blurb}</p>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </Link>
  );
}

export function ProjectCard({
  name, tagline, stack, year, highlights, href,
}: {
  name: string;
  tagline: string;
  stack: readonly string[];
  year: string;
  highlights: readonly string[];
  /** Selects which projects the home page shows; not rendered. */
  featured?: boolean;
  href?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-medium tracking-tight">{name}</h3>
        <span className="shrink-0 font-display text-xs text-muted">{year}</span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted">{tagline}</p>

      <ul className="mt-4 flex-1 space-y-2">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-fg/85">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
        {stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-accent"
        >
          View source
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">for {name} (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}

/** Full-width CTA band closing every page. */
export function CtaBand({
  title, body, href, label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-60"
          style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(34,197,94,0.16), transparent 70%)" }}
          aria-hidden="true"
        />
        <h2 className="relative font-display text-2xl font-light tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">{body}</p>
        <Link
          href={href}
          className="group relative mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03]"
        >
          {label}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/** Page header shared by the four interior routes. */
export function PageHeader({
  eyebrow, title, lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 120% at 15% 0%, rgba(34,197,94,0.10), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-20">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-accent" />
          <span className="font-display text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</span>
        </div>
        <h1 className="font-display text-4xl leading-[1.08] font-light tracking-tight text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{lead}</p>
      </div>
    </header>
  );
}
