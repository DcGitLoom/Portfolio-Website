# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Next.js portfolio for job and freelance hunting, with a bold cobalt-and-amber identity, and push it to `DcGitLoom/Portfolio-Website`.

**Architecture:** One App Router route composing seven presentational components. All copy lives in one typed content module so real content is a single-file swap. Server components by default; only the spine and mobile nav are client components because they read scroll position and hold open/closed state.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next/font (Bricolage Grotesque, Inter, JetBrains Mono). No animation library, no test runner.

## Global Constraints

- Node on this machine is **18.18.0**. Next.js 16 requires Node 20.9+, so the Next major is **pinned to 15**. Do not run `create-next-app@latest`.
- The project directory is `C:\Users\16399\Desktop\Portfolio Website`. The space and capitals make it an invalid npm package name, so `create-next-app` must scaffold into a temp directory named `portfolio-website` and the result moved in.
- Tailwind v4: configure through `@theme` in `src/app/globals.css`. There is no `tailwind.config.ts`.
- Palette, verbatim: `--ink: #0A0E27`, `--ink-raised: #121838`, `--paper: #F0EDE6`, `--slate: #7C85AB`, `--cobalt: #2B4BFF`, `--amber: #FFB627`.
- Typefaces, verbatim: display Bricolage Grotesque, body Inter, utility JetBrains Mono.
- Project rows are keyed by **year**, never by a `01 / 02 / 03` index.
- No copy is inlined in JSX. Everything reads from `src/lib/content.ts`.
- All motion must be disabled under `prefers-reduced-motion: reduce`, and no content may depend on motion to become visible.
- Quality floor: responsive from 375px with no horizontal overflow, visible keyboard focus on every interactive element.

## File Structure

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Font loading, metadata, `<body>` shell |
| `src/app/globals.css` | Tailwind import, `@theme` tokens, keyframes, reduced-motion block |
| `src/app/page.tsx` | Section order only, no markup of its own |
| `src/lib/content.ts` | All copy and data, typed |
| `src/components/Spine.tsx` | Fixed left rail nav + scroll progress (client) |
| `src/components/MobileBar.tsx` | Top bar below `lg` (client) |
| `src/components/Hero.tsx` | Knocked-out slab masthead |
| `src/components/StatusBar.tsx` | Full-bleed cobalt ticker |
| `src/components/About.tsx` | Statement + grouped skills |
| `src/components/Projects.tsx` | Editorial row list |
| `src/components/Contact.tsx` | Oversized mailto + links |
| `src/components/Footer.tsx` | Colophon line |

---

### Task 1: Scaffold and connect the repo

**Files:**
- Create: whole Next.js scaffold at project root
- Create: `.gitignore` (written by `create-next-app`)

**Interfaces:**
- Consumes: nothing
- Produces: a working `npm run dev` / `npm run build`, `origin` pointing at the GitHub repo

- [ ] **Step 1: Init git and add the remote**

```bash
git init -b main
git remote add origin https://github.com/DcGitLoom/Portfolio-Website.git
```

- [ ] **Step 2: Scaffold into a temp dir with a valid npm name**

```bash
cd "$SCRATCH"
npx --yes create-next-app@15 portfolio-website --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

- [ ] **Step 3: Move the scaffold into the project root**

Move every entry including dotfiles and `node_modules`, but do not overwrite `CLAUDE.md`, `.git`, or `docs/`.

- [ ] **Step 4: Verify the scaffold builds**

Run: `npm run build`
Expected: build completes, `/` listed as a static route.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with TypeScript and Tailwind v4"
```

---

### Task 2: Design tokens and fonts

**Files:**
- Modify: `src/app/globals.css` (replace scaffold contents)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS variables `--color-ink`, `--color-ink-raised`, `--color-paper`, `--color-slate`, `--color-cobalt`, `--color-amber`; font variables `--font-display`, `--font-body`, `--font-mono`; Tailwind utilities `bg-ink`, `text-paper`, `font-display`, etc.; keyframes `slab-wipe`, `rise`, `fade-up`, `ticker`.

- [ ] **Step 1: Load fonts in `layout.tsx`**

```tsx
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
```

Apply `${display.variable} ${body.variable} ${mono.variable}` to `<html>` and set `<body className="bg-ink text-paper font-body antialiased">`.

- [ ] **Step 2: Write `globals.css` tokens**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0e27;
  --color-ink-raised: #121838;
  --color-paper: #f0ede6;
  --color-slate: #7c85ab;
  --color-cobalt: #2b4bff;
  --color-amber: #ffb627;

  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}
```

- [ ] **Step 3: Add keyframes and the reduced-motion block**

```css
@keyframes slab-wipe { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes rise { from { opacity: 0; transform: translateY(0.5em); } to { opacity: 1; transform: none; } }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Every animated element must set its final visual state as its resting state so the reduced-motion override leaves it visible.

- [ ] **Step 4: Set focus-visible styling**

```css
:focus-visible { outline: 2px solid var(--color-amber); outline-offset: 3px; }
```

- [ ] **Step 5: Verify and commit**

Run: `npm run build`
Expected: PASS.

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add cobalt/amber design tokens and font stack"
```

---

### Task 3: Content module

**Files:**
- Create: `src/lib/content.ts`

**Interfaces:**
- Produces: `profile` (`{ name, first, last, role, tagline, location, status, email, statusLine: string[] }`), `about` (`{ statement, paragraphs: string[], skills: { group: string; items: string[] }[] }`), `projects` (`Project[]` where `Project = { title, year, blurb, stack: string[], href, repo }`), `links` (`{ label, href }[]`).

- [ ] **Step 1: Write the module with placeholder copy**

Copy must read as real, with plausible names, concrete one-line blurbs, and real stack strings, so the layout is exercised against realistic string lengths. Include a header comment marking it as the single place to swap in real content.

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add content module with placeholder portfolio copy"
```

---

### Task 4: Hero and status bar

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/StatusBar.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile` from `src/lib/content.ts`
- Produces: `<Hero />`, `<StatusBar />`, both default exports taking no props

- [ ] **Step 1: Build the slab masthead**

The surname sits inside a cobalt slab as knocked-out `--paper` type, with the given name above it in plain `--paper`, one word filled `--amber`. Size with `clamp()` topping out near `15vw`. The slab uses `animation: slab-wipe 0.7s ease-out both` with `transform-origin: left`.

- [ ] **Step 2: Build the ticker**

Render the `statusLine` items twice inside a flex row and animate the row with `ticker 30s linear infinite`. Mark the duplicate copy `aria-hidden="true"` so screen readers hear the list once. Full-bleed `bg-cobalt`, `text-paper`, `font-mono`, uppercase, tracked out.

- [ ] **Step 3: Compose into the page**

- [ ] **Step 4: Verify**

Run: `npm run build`, then `npm run dev` and load the page.
Expected: masthead renders at full width with no horizontal overflow at 375px; the ticker scrolls.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/StatusBar.tsx src/app/page.tsx
git commit -m "feat: add slab masthead hero and status ticker"
```

---

### Task 5: About, Projects, Contact, Footer

**Files:**
- Create: `src/components/About.tsx`, `src/components/Projects.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `about`, `projects`, `links`, `profile` from `src/lib/content.ts`
- Produces: four default-export components taking no props

- [ ] **Step 1: About**

Asymmetric two-column at `md`: the statement set large in the display face on the left, supporting paragraphs and mono-set skill groups on the right. Single column below `md`.

- [ ] **Step 2: Projects**

A row list, not a grid. Each row is an `<a>` spanning the full width with a top hairline rule, containing title (display), blurb (body), stack tags (mono), and year (mono, right-aligned at `md`). Hover and focus-visible flood the row `bg-ink-raised` and shift the title to `--amber`. **Year is the only numeric marker; no `01 / 02 / 03` index.**

- [ ] **Step 3: Contact**

One oversized `mailto:` link in the display face that fills `--amber` on hover, plus the mono link list.

- [ ] **Step 4: Footer**

A single mono colophon line with the year and the stack.

- [ ] **Step 5: Verify**

Run: `npm run build`, then load in a browser.
Expected: all sections render, rows respond to hover and to keyboard focus, console is clean.

- [ ] **Step 6: Commit**

```bash
git add src/components src/app/page.tsx
git commit -m "feat: add about, projects, contact, and footer sections"
```

---

### Task 6: Spine and mobile bar

**Files:**
- Create: `src/components/Spine.tsx`, `src/components/MobileBar.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: nothing from content beyond a local section list `[{ id: "about", label: "About" }, ...]` matching the `id` attributes set on each `<section>` in Task 4 and Task 5
- Produces: `<Spine />`, `<MobileBar />`

- [ ] **Step 1: Build the spine as a client component**

`"use client"`. Fixed left rail, `hidden lg:flex`. An `IntersectionObserver` over the section elements sets the active id; the active label goes `--amber` and its hairline fills `--cobalt`. Clean the observer up on unmount.

- [ ] **Step 2: Build the mobile bar**

`"use client"`, `lg:hidden`. Sticky top bar with the name and a disclosure button toggling a section list. Set `aria-expanded` on the button and close the panel on link click.

- [ ] **Step 3: Verify**

Run: `npm run dev`, scroll the page at desktop width and confirm the active section tracks; resize to 375px and confirm the spine is gone and the bar works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Spine.tsx src/components/MobileBar.tsx src/app/layout.tsx
git commit -m "feat: add scroll-tracking spine nav and mobile bar"
```

---

### Task 7: Metadata, final verification, push

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: `profile` from `src/lib/content.ts`

- [ ] **Step 1: Set page metadata**

Title, description, `openGraph`, and `themeColor` `#0a0e27`, all derived from `profile`.

- [ ] **Step 2: Replace the scaffold README**

State what the project is, how to run it, and that `src/lib/content.ts` is the one file to edit to swap in real content.

- [ ] **Step 3: Full verification**

Run: `npm run lint`, then `npm run build`.
Expected: both PASS.

Then load in a browser at 1280px and 375px: all four sections render, no horizontal overflow, console clean, tab order reaches every link with a visible focus ring.

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "docs: add metadata and project README"
git push -u origin main
```

Expected: `main` published to `DcGitLoom/Portfolio-Website`. If the push prompts for credentials, stop and report — do not attempt to store credentials.
