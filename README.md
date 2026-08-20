# Portfolio Website

A multi-page computer science student portfolio built with Next.js 16 (App Router),
React 19, TypeScript, and Tailwind CSS v4.

## Pages

| Route         | Contents                                                        |
|---------------|-----------------------------------------------------------------|
| `/`           | Hero, stats, "what I do" grid, featured projects                 |
| `/about`      | Background, tech list, education, working principles             |
| `/experience` | Timeline of internships, research, and teaching                  |
| `/projects`   | Featured and secondary project write-ups                         |
| `/contact`    | Email, copy-to-clipboard, social links                           |

## Editing your details

All copy lives in **`src/lib/content.ts`** — name, intro, experience, projects,
and social links. Edit that one file and every page updates.

Content reflects Dhruv Chaudhari's résumé and LinkedIn profile as of August 2026.

## Design system

Colors follow the 60-30-10 rule and are defined as tokens in `src/app/globals.css`:

- **60%** `--bg` `#0a0f0d` — page ground
- **30%** `--fg` / `--surface` — body text, cards, borders
- **10%** `--accent` `#22c55e` — pills, active nav, arrows, one focal point per view

Reference the tokens (`bg-surface`, `text-accent`, …) rather than hardcoding hex.
All nine text/background pairings pass WCAG AA at 4.5:1 or better.

Typography is Archivo (body) and Space Grotesk (display), loaded via `next/font`.

## Motion

Scroll reveals use a single `IntersectionObserver` in `src/components/Reveal.tsx`.
Every animation collapses to its final state under `prefers-reduced-motion: reduce`
— content stays visible rather than merely animating faster.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build
npm run start    # serve the production build
npx tsc --noEmit # typecheck
npx eslint .     # lint
```
