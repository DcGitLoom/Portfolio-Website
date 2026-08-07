# Portfolio Website

A single-page personal portfolio — hero, about, work, contact — built with
Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> **Node version:** this machine runs Node 18.18.0, so Tailwind is pinned to
> `~4.1.18` — Tailwind 4.2+ ships native bindings that require Node 20 and npm
> silently skips them on 18, which fails the build with "Cannot find native
> binding". Node 18 reached end-of-life in April 2025. After upgrading to Node
> 20 or 22 you can drop the pin with `npm i -D tailwindcss@latest
> @tailwindcss/postcss@latest`.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Editing the content

**All copy lives in [`src/lib/content.ts`](src/lib/content.ts).** Name, role,
tagline, ticker items, about text, skills, projects, and links are typed
exports there. You should not need to touch a component to make the site yours.

The content that ships is placeholder, written to read like the real thing so
the layout is tested against realistic string lengths. Replace it.

## Structure

```
src/
  app/
    layout.tsx     fonts, metadata, nav shell
    globals.css    palette + type tokens, keyframes
    page.tsx       section order
  components/      one file per section
  lib/content.ts   all copy and data
```

## Design notes

- Palette: ink `#0A0E27`, paper `#F0EDE6`, cobalt `#2B4BFF`, amber `#FFB627`,
  slate `#7C85AB`. Tokens are defined in the `@theme` block in `globals.css`;
  Tailwind generates `bg-ink`, `text-amber`, and friends from them.
- Type: Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels,
  years, stack tags). Self-hosted via `next/font` — no external requests.
- All motion is disabled under `prefers-reduced-motion: reduce`, and nothing
  depends on animation to become readable.

## Deploying

Import the repo at [vercel.com/new](https://vercel.com/new). No configuration
is needed — the default Next.js preset builds this as-is.
