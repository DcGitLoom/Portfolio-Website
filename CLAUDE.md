# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 0. Project Overview

<!-- Fill this in as the project takes shape. A few sentences here saves Claude from
     re-guessing your stack and conventions every session. -->
- **What this is:** Personal portfolio site — a multi-page computer science student portfolio.
- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Run locally:** `npm run dev` (dev server) or `npm run build && npm run start` (production).
- **Tests:** No test suite yet. Verify with `npm run build`, `npx tsc --noEmit`, and `npx eslint .`.
- **Content:** All editable copy lives in `src/lib/content.ts` — change it there, not in the pages.
- **Design:** Colors follow the 60-30-10 rule (60% ground, 30% content/surfaces,
  10% accent) as tokens in `src/app/globals.css`. Reference the tokens
  (`bg-surface`, `text-accent`, ...) — do not hardcode hex in components.

> Note: `create-next-app` overwrites this file with a bare `@AGENTS.md` reference.
> If that happens again, restore it with `git checkout -- CLAUDE.md`.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Verify Before Claiming Done

**"I made the edit" is not the same as "it works."**

- After changing code, actually run it (script, test suite, build, linter — whatever applies).
- Don't say "this should work now" — run it and confirm, or say plainly that you couldn't verify.
- For UI changes, load the page and check it, don't just trust the diff.
- If verification isn't possible in this environment, say so explicitly instead of assuming success.

## 6. Secrets & Security

**Never let credentials end up in git history.**

- Never commit API keys, passwords, tokens, or `.env`/`secrets.*` files. Check `.gitignore` covers them *before* the first commit that could include them — not after.
- If a secret is ever committed, deleting the file isn't enough — it's still in history. Treat it as leaked: rotate/revoke it, then clean history if needed.
- Don't invent fake fallback secrets or hardcode credentials "just to get it working."
- Validate and sanitize anything that touches user input, file paths, or shell commands.

## 7. Git Discipline

- Don't commit, push, or force-push unless explicitly asked.
- Write commit messages that explain *why*, not just what changed.
- Before any destructive git command (`reset --hard`, `checkout --`, force-push), stop and confirm — these can lose work permanently.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
