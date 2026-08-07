# Portfolio Website — Design Spec

**Date:** 2026-08-06
**Owner:** Dhruv Chaudhari (`DcGitLoom`)
**Repo:** https://github.com/DcGitLoom/Portfolio-Website.git

## Goal

A single-page personal portfolio whose one job is to convince a hiring manager or
freelance client, in about thirty seconds of skimming, that this person builds
real things and is worth replying to.

**Audience:** hiring managers and prospective freelance clients. They skim. They
do not read paragraphs. They look for: what does this person build, what do they
build it with, and how do I contact them.

**Success criteria:**
- Name, role, and availability are legible within one screen, before any scroll.
- Every project states its stack and links out.
- A contact method is reachable from any scroll position.
- Production build succeeds and the page renders correctly from 375px to 1920px.

## Scope

In scope: one scrolling page with four sections (Hero, About, Projects,
Contact), placeholder content, dark visual identity, deploy-ready Next.js app
pushed to GitHub.

Out of scope for this spec: blog, CMS, contact form backend, analytics,
light/dark toggle, real content, Vercel deployment (a manual dashboard step the
owner performs afterward).

## Stack

- **Next.js 15, App Router, TypeScript.** Node on this machine is 18.18.0.
  Next.js 16 requires Node 20.9+, so the Next major is pinned to 15.
- **Tailwind CSS v4**, configured through CSS (`@theme`), not a JS config file.
- **next/font** for self-hosted Google fonts — no external font requests, no CLS.
- No animation library. Motion is CSS only; the scope does not justify a
  dependency.
- No test runner. There is no logic to test — this is a static presentational
  page. Verification is the production build plus a browser check. Adding Jest
  or Playwright here would be ceremony, not coverage.

## Visual direction

The brief asked for "bold and modern." The default answer to that brief is a
near-black page with one acid-green accent, and that is what this design
deliberately is not.

### Color

The ground is ink — a navy so deep it reads as black but carries visible blue,
which keeps the page from feeling like a terminal. The accent pair is electric
cobalt against warm amber: complementary, loud, and not the vermilion-or-lime
default.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A0E27` | page ground |
| `--ink-raised` | `#121838` | raised surfaces, row hover |
| `--paper` | `#F0EDE6` | primary type, knocked-out type |
| `--slate` | `#7C85AB` | secondary type, rules, metadata |
| `--cobalt` | `#2B4BFF` | primary accent — slabs, marquee, focus |
| `--amber` | `#FFB627` | secondary accent — emphasis, hover states |

Body text is `--paper` on `--ink` (contrast ~16:1). `--slate` on `--ink` is
~6.2:1 and is used only for supporting text at 14px and up. `--amber` on
`--ink` is ~9:1. `--paper` on `--cobalt` is ~6.4:1.

### Type

| Role | Face | Use |
|---|---|---|
| Display | Bricolage Grotesque | masthead, section headings, project titles |
| Body | Inter | paragraphs, descriptions |
| Utility | JetBrains Mono | eyebrows, labels, years, stack tags, marquee |

Bricolage Grotesque is a variable grotesque with a slightly industrial, uneven
personality — it carries the page's character without the neutrality of the
usual grotesque picks. Inter stays invisible and does its job. The mono face is
the developer's own vernacular and is used for anything that is data rather than
prose: years, stack names, section indices, status.

Display sizes are fluid via `clamp()`. The masthead runs up to roughly 15vw so
it is genuinely oversized on desktop and still fits on a 375px phone.

### Layout

Asymmetric, with a fixed vertical spine on the left at `lg` and above. The spine
carries the section list and a scroll-linked hairline that fills in cobalt. It
is structure that encodes real information — where you are in the page — not
decoration. Below `lg` the spine collapses and a compact top bar takes over.

Projects are a full-bleed editorial row list, not a card grid. Each row is
title, one-line description, stack, and year. Rows are keyed by **year**, not by
`01 / 02 / 03` — projects are not a sequence, and a fake index would assert an
order the content does not have. Year is true metadata and does the same
structural work honestly.

### Signature

The masthead: the name set enormous in Bricolage, knocked out of a solid cobalt
slab, with the surname filled amber. On load the slab wipes in from the left and
the lines rise in sequence. Directly beneath it, a full-bleed cobalt status bar
scrolls a mono ticker of availability facts. That pairing — a slab masthead over
a live status bar — is the thing the page is remembered by.

Everything else stays quiet: flat surfaces, hairline rules, generous space, one
hover treatment reused throughout.

### Motion

- Page-load sequence: slab wipe, then masthead lines rise, then the status bar
  fades in. One orchestrated moment rather than scattered effects.
- Scroll reveals on section headings, subtle and once only.
- Hover: project rows flood `--ink-raised` and their title shifts to amber.
- `prefers-reduced-motion: reduce` disables all of the above and pauses the
  ticker. Content is fully visible without motion; nothing depends on animation
  to become readable.

## Content model

All copy lives in `src/lib/content.ts` as typed exports. No copy is inlined in
JSX. Swapping placeholder content for real content is then a single-file edit
rather than a hunt through components.

Placeholder content is written to read as real — plausible project names,
concrete descriptions, real-looking stacks — so the layout is tested against
realistic string lengths rather than lorem ipsum.

## Architecture

One route (`/`). `page.tsx` composes section components and holds no markup of
its own beyond the section order. Each section is a separate component with one
responsibility, reading its data from `content.ts`.

Components are server components by default. Only components needing browser
APIs are marked `"use client"` — in this build that is the spine (scroll
position) and the mobile nav (open/closed state).

## Error handling

There is no data fetching, no user input, and no network I/O, so there are no
runtime failure modes to handle. The one real risk is a missing or malformed
entry in `content.ts`, which TypeScript catches at build time. Adding runtime
guards for impossible states would be dead code.

## Verification

1. `npm run build` completes with no errors and no type errors.
2. `npm run dev`, then load the page in a browser and confirm: all four sections
   render, the load sequence plays, spine highlights the active section, project
   rows respond to hover, and the console is clean.
3. Resize to 375px and confirm no horizontal overflow and that the spine has
   collapsed to the mobile bar.

## Deployment

Out of scope for the build. Vercel import from the GitHub repo is a dashboard
step requiring the owner's Vercel login. No config is needed — the default
Next.js preset builds this app as-is.
