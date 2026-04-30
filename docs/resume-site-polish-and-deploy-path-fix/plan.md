## Implementation Plan: Resume Site Polish And Deploy Path Fix

### Assumptions
- The site is the existing Vite + React 18 + Tailwind 3 single-page app under `src/`. No new framework is being adopted.
- The deployed URL is `https://laptopmini.github.io/resume-rebuildmanufacturing/` (repo name is `resume-rebuildmanufacturing`). The current Vite `base` of `/rebuildmanufacturing/` is the root cause of the 404s on GitHub Pages and must be replaced with `/resume-rebuildmanufacturing/`. The same string must propagate to `src/lib/basePath.ts` so `withBasePath()` in components stays consistent.
- The Vimeo background URL provided by the human (`player.vimeo.com/video/1168134399?muted=1&autoplay=1&loop=1&background=1&app_id=122963`) is final and is loaded as an `<iframe>` (Vimeo's `background=1` mode is delivered via the iframe player, not as a raw `<video>` source).
- `1,474` is the static GitHub-contributions value the human supplied; it does not need to be fetched from the GitHub API.
- "Total unique skills" is derived from `SKILLS.flatMap(s => s.items).length` in `src/lib/content.ts`. After this plan's content edits the count is `5 (Frontend) + 6 (AI) + 7 (Infra) + 5 (Backend & Mobile) = 23`.
- "Positions held" is derived from `EXPERIENCES.length`, which is `5`.
- Tests in `tests/unit/**` are added by a downstream backpressure phase; this blueprint creates only source files.
- jsdom is already configured in `jest.config.mjs`; no new test infrastructure is required.

### Design Intent

**Marker highlight (replaces underline accent):**
- Class name: `.accent-highlight`
- Text color: `var(--ink)` (white) — unchanged from body text
- Highlight: `background-color: var(--accent)` (#d4a017), `padding: 0 0.25rem`, `box-decoration-break: clone` so multi-line wraps highlight each line, no underline.
- Hover state: `background-color: var(--accent-bright)` (#fcb900), text stays `var(--ink)`.

**Hero video background:**
- Vimeo embed URL constant `HERO_VIDEO_URL = "https://player.vimeo.com/video/1168134399?muted=1&autoplay=1&loop=1&background=1&app_id=122963"` exported from `src/lib/content.ts`.
- Container is `min-h-screen` (full viewport on initial load), `relative`, with three stacked layers:
  1. Iframe layer (`absolute inset-0 w-full h-full pointer-events-none`), `aria-hidden="true"`, `title="Background video"`, `allow="autoplay; fullscreen"`.
  2. Dim overlay (`absolute inset-0 pointer-events-none`) using CSS variable `--hero-overlay: rgba(20, 22, 25, 0.65);` defined in `globals.css`.
  3. Foreground content (`relative z-10`) — headline + lead, NO portrait.
- Iframe sizing: covers the section regardless of aspect ratio using `transform: translate(-50%, -50%); top: 50%; left: 50%; min-width: 100vw; min-height: 100vh; width: 177.78vh; height: 56.25vw;` encapsulated in CSS class `.hero-video-frame` in `globals.css`.

**Stats data (replaces three of four entries):**
The new STATS array, in order:
```
{ value: 10,    suffix: "+",  label: "YEARS BUILDING UI" }
{ value: <EXPERIENCES.length>,            suffix: "",   label: "POSITIONS HELD" }
{ value: 1474,  suffix: "+",  label: "GITHUB CONTRIBUTIONS / YEAR", format: "comma" }
{ value: <SKILLS.flatMap(s=>s.items).length>, suffix: "", label: "UNIQUE SKILLS" }
```
The two derived values are computed inline in `content.ts` via `EXPERIENCES.length` and the flat-map; they are NOT hard-coded numbers. A `format: "comma"` field on stat objects toggles thousands separator rendering in the Stats component (`new Intl.NumberFormat('en-US').format(value)` when `format === "comma"`, otherwise `String(value)`).

**Skills (AI & Machine Learning row replacement):**
The `items` array for the `"AI & Machine Learning"` category becomes exactly:
```
["Applied Prompt Engineering", "LLM Integration", "Computer Vision (OpenCV, Tesseract)", "Test-Driven Development", "Ralph Loop", "Agent Orchestration"]
```

**Experience bullets:**
The inner `<ul>` in `Experience.tsx` switches from `list-none` to `list-disc list-outside pl-5 marker:text-accent` so each bullet renders a visible disc in the accent gold. Bullet text remains `text-sm text-ink`. The wording of each bullet is unchanged from `EXPERIENCES[*].bullets`.

**Contact section (new, between Education and AI disclosure):**
- Eyebrow text constant: `EYEBROW_CONTACT = "CONTACT"`.
- Layout: a 12-col grid; left 5 columns hold the portrait `<img>` (`withBasePath("/profile.png")`, `aspect-[3/4]`, `object-cover`, `data-testid="contact-portrait"`); right 7 columns hold a stacked list of links (`paul@emini.com`, `LINKEDIN`, `GITHUB`) plus the `CONTACT.location` and `CONTACT.phone` strings.
- Same `data-testid` link names as today (`contact-email`, `contact-linkedin`, `contact-github`) so existing assertions migrate cleanly.

**AI disclosure (slimmed down, no contact links, no portrait):**
- New copy constants in `content.ts`:
  - `AI_FOOTER_EYEBROW = "BUILT BY RALPH-NODE"`
  - `AI_FOOTER_HEADLINE = "AN ORCHESTRATED AI PIPELINE"`
  - `AI_FOOTER_BODY = "Ralph-node is an orchestrated, test-gated AI development pipeline for Node.js. A Ralph loop turns a single paragraph into a planned, tested, reviewed, fully working implementation across PR-gated phases. Engineered entirely by me."`
  - `AI_FOOTER_CTA_LABEL = "EXPLORE THE PIPELINE"` (links to `AI_FOOTER_RALPH_URL`).
  - `AI_FOOTER_REPO_LABEL = "VIEW THIS REPO"` (unchanged URL).
- `AI_FOOTER_WORKFLOW` is removed from the section's rendered output (delete the constant and its usage; do not leave a placeholder).

**Wordmark (full-width PVMINI):**
- The text `"PVMINI"` is rendered as one `<span>` per character inside a flex container.
- Container class on the wrapping `<div>`: `flex justify-between items-center w-full px-0 leading-[0.85] select-none`.
- Each character span has class `font-bold uppercase text-wordmark text-ink`.
- The first character span has `data-testid="wordmark-char-0"` and the last `data-testid="wordmark-char-5"` so layout assertions can verify alignment to viewport edges.
- The `wordmark-breathe` animation continues to apply to the parent `<div>` (transform-only, does not affect flex distribution).

**Deploy path:**
- `BASE_PATH` in `src/lib/basePath.ts` becomes the literal string `"/resume-rebuildmanufacturing"`.
- `vite.config.ts` `base` becomes the literal string `"/resume-rebuildmanufacturing/"` (trailing slash, matching Vite convention).

### 1. Tech Stack & Architecture Notes
**Detected stack:** Vite 5 + React 18 + TypeScript 6 (strict, `jsx: react-jsx`, bundler resolution); Tailwind 3 with CSS-variable-driven theme tokens; PostCSS via `postcss.config.cjs`; Jest 30 + `@swc/jest` + jsdom for unit tests; Playwright for e2e; Biome for lint/format. `package.json` has `"type": "commonjs"`, so `.mjs`/`.cjs` extensions distinguish ESM/CJS configs.

**Relevant existing patterns:**
- All copy and tabular data live in `src/lib/content.ts` and are imported by components — never hard-coded in JSX.
- Animation/timing primitives live in `src/lib/motion.ts` and are spread into CSS variables via inline `style={...}` — components do not redefine durations/easings.
- Static assets are served from `public/` and referenced through `withBasePath()` from `src/lib/basePath.ts`.
- Sections each render their own `<section>` with a `data-testid` and `data-in-view="true"` for entrance animation.
- An ambient `src/types/css.d.ts` already exists for `.css` imports — no `tsc` shim needed.

**Recommendations:** Keep all changes consistent with the conventions above. Do not introduce new state libraries, hooks, or runtime data fetching. The Vimeo background is a static iframe — no client SDK needed.

### 2. File & Code Structure
**New files:**
- `src/components/Contact.tsx` — the new CONTACT section (portrait + links).

**Modified files:**
- `vite.config.ts` — change `base`.
- `src/lib/basePath.ts` — change `BASE_PATH` constant.
- `src/lib/content.ts` — STATS replacement, SKILLS update, AI_FOOTER_* rewrite, new HERO_VIDEO_URL, new EYEBROW_CONTACT, removal of `AI_FOOTER_WORKFLOW`.
- `src/styles/globals.css` — rewrite `.accent-highlight` as marker; add `.hero-video-frame` class and `--hero-overlay` variable.
- `src/components/Hero.tsx` — replace portrait with Vimeo iframe + dim overlay; full viewport height; foreground text only.
- `src/components/Stats.tsx` — render the new STATS shape including `format: "comma"` thousands separator.
- `src/components/Experience.tsx` — switch `<ul>` classes to `list-disc list-outside pl-5 marker:text-accent`.
- `src/components/AIDisclosure.tsx` — slim copy, remove embedded contact links, add `EXPLORE THE PIPELINE` CTA, remove workflow paragraph.
- `src/components/Wordmark.tsx` — render per-character spans inside a `flex justify-between` container.
- `src/App.tsx` — insert `<Contact />` between `<Education />` and `<AIDisclosure />` (with the surrounding `<Hairline />` separators preserved).

**Deleted files:** None.

**Conflicting test files to remove:** None.

### 3. Tickets

#### Ticket 1: Foundation — Content, Tokens, Deploy Path

> Establish every Design Intent decision as a concrete artifact before any consuming component is touched: the corrected base path, the rewritten content/data module (stats, skills, hero video URL, contact eyebrow, slimmed AI footer copy), the marker-style highlight CSS, the Vimeo iframe sizing class, and the dim-overlay variable. All downstream tickets import or reference these by name and never re-decide.

**Tasks:**
1. [infra, fix-deploy-base-path] Edit `vite.config.ts` and set the `base` option to the exact literal `"/resume-rebuildmanufacturing/"` (with trailing slash). Do not modify any other field in the file. The current value `"/rebuildmanufacturing/"` is the cause of the GitHub Pages 404 errors at `https://laptopmini.github.io/resume-rebuildmanufacturing/` and must be replaced exactly.
2. [code, update-basepath-constant, ts] Edit `src/lib/basePath.ts` so the exported `BASE_PATH` constant equals the exact literal string `"/resume-rebuildmanufacturing"` (no trailing slash; the existing `withBasePath` function already prepends `/`). Keep the `withBasePath` function signature and behavior unchanged.
3. [code, update-content-module, ts] Rewrite `src/lib/content.ts` with the following changes, leaving all unrelated exports (`HERO_HEADLINE`, `HERO_LEAD_PREFIX`, `HERO_LEAD_HIGHLIGHT`, `SUBHEAD_PARTNER`, `SUBHEAD_BODY`, `EYEBROW_EXPERIENCE`, `EYEBROW_SKILLS`, `EYEBROW_EDU`, `EXPERIENCES`, `EDUCATION`, `CONTACT`, `WORDMARK_TEXT`, `AI_FOOTER_REPO_URL`, `AI_FOOTER_RALPH_URL`) byte-for-byte intact. Add `export const HERO_VIDEO_URL = "https://player.vimeo.com/video/1168134399?muted=1&autoplay=1&loop=1&background=1&app_id=122963";`. Add `export const EYEBROW_CONTACT = "CONTACT";`. Replace the `SKILLS` constant so the `"AI & Machine Learning"` category's `items` array is exactly `["Applied Prompt Engineering", "LLM Integration", "Computer Vision (OpenCV, Tesseract)", "Test-Driven Development", "Ralph Loop", "Agent Orchestration"]`; keep the other three categories (`Frontend & Web`, `Infrastructure & DevOps`, `Backend & Mobile`) and their items unchanged. Replace `STATS` with a `STATS` array containing exactly four entries in this order, with these exact `label` strings and these exact `value` expressions: `{ value: 10, suffix: "+", label: "YEARS BUILDING UI" }`, `{ value: EXPERIENCES.length, suffix: "", label: "POSITIONS HELD" }`, `{ value: 1474, suffix: "+", label: "GITHUB CONTRIBUTIONS / YEAR", format: "comma" }`, `{ value: SKILLS.flatMap((s) => s.items as readonly string[]).length, suffix: "", label: "UNIQUE SKILLS" }`; the `STATS` constant must be declared *after* `EXPERIENCES` and `SKILLS` in source order so the derived values resolve; drop the `as const` on STATS (use a typed `Array<{ value: number; suffix: string; label: string; format?: "comma" }>` instead) so the optional `format` field is permitted. Replace `AI_FOOTER_EYEBROW` with the exact string `"BUILT BY RALPH-NODE"`. Replace `AI_FOOTER_HEADLINE` with the exact string `"AN ORCHESTRATED AI PIPELINE"`. Replace `AI_FOOTER_BODY` with the exact string `"Ralph-node is an orchestrated, test-gated AI development pipeline for Node.js. A Ralph loop turns a single paragraph into a planned, tested, reviewed, fully working implementation across PR-gated phases. Engineered entirely by me."`. Replace `AI_FOOTER_REPO_LABEL` with the exact string `"VIEW THIS REPO"`. Add `export const AI_FOOTER_CTA_LABEL = "EXPLORE THE PIPELINE";`. Delete the `AI_FOOTER_WORKFLOW` export entirely (this constant is removed; downstream components must not reference it).
4. [infra, rewrite-globals-css] Rewrite `src/styles/globals.css` as follows: keep the `@tailwind base/components/utilities` lines, the `:root` token block, the `body` block, the `.hover-card` rules, the two `@keyframes` blocks, the `[data-in-view="true"]` rule, and the `prefers-reduced-motion` block exactly as they currently are. Add `--hero-overlay: rgba(20, 22, 25, 0.65);` to the `:root` block. Replace the `.accent-highlight` and `.accent-highlight:hover` rules with the marker-highlight implementation: `.accent-highlight { color: var(--ink); background-color: var(--accent); padding: 0 0.25rem; box-decoration-break: clone; -webkit-box-decoration-break: clone; text-decoration: none; transition: background-color 200ms; }` and `.accent-highlight:hover { background-color: var(--accent-bright); color: var(--ink); }`. Add a new `.hero-video-frame` rule directly after the `.accent-highlight:hover` rule with the following declarations: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100vw; min-height: 100vh; width: 177.78vh; height: 56.25vw; border: 0; pointer-events: none;`. Add a `.hero-overlay` rule after `.hero-video-frame` with: `position: absolute; inset: 0; background-color: var(--hero-overlay); pointer-events: none;`. Remove the `.accent-highlight` entry from the `prefers-reduced-motion` selector list (since the new highlight has no motion to suppress); leave `[data-in-view]` and `.hover-card` in that selector.

#### Ticket 2: Hero Section With Vimeo Background
**depends_on:** [Ticket 1]

> Replace the hero's portrait+text grid with a full-viewport-height section that plays the Vimeo background loop behind a dim overlay. Foreground content (headline + lead) sits above the overlay; the `.accent-highlight` span now renders as a marker-style fill thanks to the foundation CSS rewrite, with no JSX changes needed for that. The portrait is removed entirely from this section.

**Tasks:**
1. [code, rewrite-hero-section, tsx] Rewrite `src/components/Hero.tsx` so it imports `HERO_HEADLINE`, `HERO_LEAD_HIGHLIGHT`, `HERO_LEAD_PREFIX`, and `HERO_VIDEO_URL` from `../lib/content` and `sectionEntrance` from `../lib/motion`. Do NOT import `withBasePath` and do NOT render the profile portrait. The component returns a single `<section id="hero" data-testid="hero-section" data-in-view="true">` whose className is `"relative min-h-screen overflow-hidden bg-bg flex items-end pt-32 pb-24 px-6 md:px-10"` and whose `style` sets `--entrance-duration` and `--entrance-easing` from `sectionEntrance` (same pattern as today). Inside the section, render in this order: (a) an `<iframe data-testid="hero-video" src={HERO_VIDEO_URL} className="hero-video-frame" title="Background video" aria-hidden="true" allow="autoplay; fullscreen" frameBorder={0} />`, (b) a `<div data-testid="hero-overlay" className="hero-overlay" aria-hidden="true" />`, and (c) a foreground content wrapper `<div className="relative z-10 mx-auto max-w-wide w-full">` containing an `<h1 data-testid="hero-headline" className="font-sans font-bold uppercase text-display leading-[0.95] tracking-[-0.02em] text-ink">{HERO_HEADLINE}</h1>` and a `<p data-testid="hero-lead" className="mt-12 text-md text-ink max-w-content">{HERO_LEAD_PREFIX} <span className="accent-highlight">{HERO_LEAD_HIGHLIGHT}</span></p>`. The 12-col grid and `<img data-testid="hero-portrait">` from the previous implementation must be deleted; no `hero-portrait` element should exist in the new file.

#### Ticket 3: Stats Section With New Metrics
**depends_on:** [Ticket 1]

> Render the rewritten `STATS` array, including thousands-separator formatting for the GitHub-contributions entry, using the foundation-defined data shape. No content decisions are made here — values and labels come entirely from `src/lib/content.ts`.

**Tasks:**
1. [code, rewrite-stats-section, tsx] Rewrite `src/components/Stats.tsx` so its data import is `import { STATS } from "../lib/content"` and motion imports are unchanged. For each `stat` in `STATS.map((stat, index) => ...)`, render the value as `{stat.format === "comma" ? new Intl.NumberFormat("en-US").format(stat.value) : String(stat.value)}{stat.suffix}` inside the existing `<span className="text-2xl font-bold text-accent">`. Keep the wrapper `<section data-testid="stats-section">`, the `data-in-view`, the entrance-style block, the outer `mx-auto max-w-wide grid grid-cols-2 md:grid-cols-4 gap-10` container, the per-stat `data-testid={`stat-${index}`}` attribute, and the label `<span className="mt-3 text-xs uppercase tracking-[0.2em] text-inkMuted">{stat.label}</span>` exactly as today. The component must compile against the new `STATS` typing (value: number, suffix: string, label: string, optional format: "comma"). Do not hard-code any of the four labels or values in this file — they all come from the imported constant.

#### Ticket 4: Experience Card Bullet Styling
**depends_on:** [Ticket 1]

> Make experience-card bullet lists visually scannable by using disc bullets in the accent color, without changing any bullet text or any other card metadata.

**Tasks:**
1. [code, restyle-experience-bullets, tsx] Edit `src/components/Experience.tsx` so the inner bullet `<ul>` (the one rendering `exp.bullets`) uses className `"mt-3 list-disc list-outside pl-5 space-y-2 marker:text-accent"` instead of the current `"mt-3 list-none space-y-2"`. Each child `<li>` keeps its className `"text-sm text-ink"` and its `key={b}`. Do not change the surrounding `<section>`, the outer `<ul className="grid md:grid-cols-2 gap-6">`, the `data-testid={`exp-card-${index}`}` attribute, the company/role/dates/stack spans, or any imports.

#### Ticket 5: Contact Section And Slimmed AI Disclosure
**depends_on:** [Ticket 1]

> Split the existing AI-disclosure section into two distinct sections: a new `Contact` component carrying the portrait, location, phone, email, LinkedIn, and GitHub; and a slimmed `AIDisclosure` that only teases the ralph-node pipeline with a short body and one CTA. Wire both into `App.tsx` between `Education` and `Wordmark`.

**Tasks:**
1. [code, create-contact-section, tsx] Create `src/components/Contact.tsx` exporting a default React component named `Contact`. It imports `CONTACT` and `EYEBROW_CONTACT` from `../lib/content`, `withBasePath` from `../lib/basePath`, `sectionEntrance` from `../lib/motion`, and `Eyebrow` from `./Eyebrow`. It returns `<section id="contact" data-testid="contact-section" data-in-view="true" style={{"--entrance-duration": `${sectionEntrance.duration}ms`, "--entrance-easing": sectionEntrance.easing} as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg border-t border-rule">` containing `<div className="mx-auto max-w-wide">` with first an `<Eyebrow text={EYEBROW_CONTACT} testId="contact-eyebrow" />`, then a `<div className="grid md:grid-cols-12 gap-10 items-start">`. The left column (`<div className="md:col-span-5">`) renders `<img data-testid="contact-portrait" src={withBasePath("/profile.png")} alt={CONTACT.name} className="w-full aspect-[3/4] object-cover" />`. The right column (`<div className="md:col-span-7 flex flex-col gap-4">`) renders, in order: `<span data-testid="contact-name" className="text-md font-bold text-ink">{CONTACT.name}</span>`, `<span data-testid="contact-location" className="text-sm text-inkMuted">{CONTACT.location}</span>`, `<span data-testid="contact-phone" className="text-sm text-inkMuted">{CONTACT.phone}</span>`, then a `<div className="mt-4 flex flex-wrap gap-6">` containing three `<a>` tags in this order — `<a data-testid="contact-email" href={`mailto:${CONTACT.email}`} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">{CONTACT.email}</a>`, `<a data-testid="contact-linkedin" href={CONTACT.linkedin} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">LINKEDIN</a>`, `<a data-testid="contact-github" href={CONTACT.github} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">GITHUB</a>`. The portrait is referenced through `withBasePath` so the GitHub Pages base prefix from Ticket 1 applies automatically.
2. [code, slim-ai-disclosure, tsx] Rewrite `src/components/AIDisclosure.tsx` to drop all contact links and the workflow paragraph. It imports only `AI_FOOTER_BODY`, `AI_FOOTER_CTA_LABEL`, `AI_FOOTER_EYEBROW`, `AI_FOOTER_HEADLINE`, `AI_FOOTER_RALPH_URL`, `AI_FOOTER_REPO_LABEL`, and `AI_FOOTER_REPO_URL` from `../lib/content`, plus `sectionEntrance` from `../lib/motion` and `Eyebrow` from `./Eyebrow`. It must NOT import `CONTACT` and must NOT import or reference `AI_FOOTER_WORKFLOW`. The returned `<section>` keeps `id="ai-disclosure"` (changed from `"contact"` since the contact role now lives in `Contact.tsx`), `data-testid="ai-disclosure-section"`, `data-in-view="true"`, the same entrance-style block, and className `"py-24 px-6 md:px-10 bg-bgElevated border-t border-rule"`. Inside, render `<Eyebrow text={AI_FOOTER_EYEBROW} testId="ai-eyebrow" />`, then a `<div className="grid md:grid-cols-12 gap-10">` with a left column `<div className="md:col-span-5"><h2 data-testid="ai-headline" className="text-xl font-bold uppercase tracking-[-0.02em] text-ink leading-[1.05]">{AI_FOOTER_HEADLINE}</h2></div>` and a right column `<div className="md:col-span-7"><p data-testid="ai-body" className="text-base text-ink">{AI_FOOTER_BODY}</p><div className="mt-10 flex flex-wrap gap-6"><a data-testid="ai-ralph-link" href={AI_FOOTER_RALPH_URL} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">{AI_FOOTER_CTA_LABEL}</a><a data-testid="ai-repo-link" href={AI_FOOTER_REPO_URL} className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline">{AI_FOOTER_REPO_LABEL}</a></div></div>`. The `ai-workflow`, `contact-email`, `contact-linkedin`, and `contact-github` testids must NOT appear in this file (they now live in `Contact.tsx`).
3. [code, compose-app-with-contact, tsx] Edit `src/App.tsx` to import the new `Contact` component (`import Contact from "./components/Contact";`) and to insert `<Contact />` (preceded by `<Hairline />`) between the existing `<Education />` and `<AIDisclosure />` blocks. The final ordering inside `<main>` must be: `Hero, Hairline, About, Hairline, Stats, Hairline, Experience, Hairline, Skills, Hairline, Education, Hairline, Contact, Hairline, AIDisclosure, Hairline`. Do not change any other imports, the wrapping `<div data-testid="app-root" className="bg-bg text-ink min-h-screen">`, the `<Header />`, or the trailing `<Wordmark />`.

#### Ticket 6: Wordmark Spans Full Viewport Width
**depends_on:** [Ticket 1]

> Distribute the six characters of `PVMINI` across the full width of the viewport with the `P` flush-left and the trailing `I` flush-right, using a flex layout so spacing scales naturally with width while preserving the breathing animation.

**Tasks:**
1. [code, distribute-wordmark-letters, tsx] Rewrite `src/components/Wordmark.tsx` so the outer `<div data-testid="wordmark">` keeps its className `"bg-bgSunken overflow-hidden"` and its existing inline `style` driving the `wordmark-breathe` animation from `wordmarkBreathe` (do not alter the animation timing). Replace the single inner `<span>` with `<div className="flex justify-between items-center w-full leading-[0.85] select-none px-0">` containing one child `<span>` per character of `WORDMARK_TEXT.split("")`, each with className `"font-bold uppercase text-wordmark text-ink"` and `data-testid={`wordmark-char-${index}`}` (so the file emits `wordmark-char-0` through `wordmark-char-5` for the string `"PVMINI"`). The flex container's `justify-between` plus the absence of horizontal padding guarantees the first character sits at the left edge of the viewport and the last character sits at the right edge. Do not introduce `tracking-*` classes — letter distribution is handled entirely by flex, not letter-spacing. Keep the `WORDMARK_TEXT` and `wordmarkBreathe` imports.
