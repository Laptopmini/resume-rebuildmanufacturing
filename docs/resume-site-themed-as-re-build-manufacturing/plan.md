## Implementation Plan: Resume Site Themed As Re Build Manufacturing

### Assumptions
- Target is a static React single-page application built with Vite, deployed to GitHub Pages from a workflow on push to `main`.
- Repository is hosted at `https://github.com/Laptopmini/resume-rebuildmanufacturing`; production URL is `https://laptopmini.github.io/rebuildmanufacturing/` and Vite `base` is `/rebuildmanufacturing/`.
- `resume.md` and `profile.png` at the repo root are the canonical content sources; their data is hand-transcribed into a TypeScript content module rather than parsed at runtime.
- The site is single-page, scroll-anchored — no client-side router needed.
- Tailwind v3 (not v4) is used for stable PostCSS pipeline; CSS variables hold theme tokens and Tailwind theme keys reference them.
- Jest runs in `jsdom` for component tests; `@testing-library/react` is the assertion API; `.css` imports are stubbed via `moduleNameMapper`.
- `tsc --noEmit` must pass, so `tsconfig.json` is migrated from `module: NodeNext` to `module: ESNext` + `moduleResolution: Bundler` and gains `jsx: react-jsx` and a `types/css.d.ts` ambient declaration.
- The existing placeholder `src/index.ts` is deleted; the site's runtime entry is `src/main.tsx`.
- The existing `tests/unit/setup.test.ts` and `tests/e2e/setup.spec.ts` placeholder tests are removed so backpressure-generated tests are the only test suite.

### Design Intent

The visual target is a faithful reinterpretation of `rebuildmanufacturing.com`: a dark, industrial, IBM-Plex-Sans-driven editorial layout with massive uppercase headlines, an amber/gold accent that calls out key phrases, sharp (zero-radius) cards and dividers, and an oversized full-bleed wordmark at the page foot. Voice is terse, technical, third-person.

**Color tokens** (CSS custom properties on `:root`, exposed as Tailwind theme colors of the same name):
- `--bg: #1e2124` (page background — rgb(30,33,36) from the source)
- `--bg-elevated: #26292d` (cards, footer surface)
- `--bg-sunken: #16181a` (footer baseline strip behind the wordmark)
- `--ink: #ffffff` (primary text)
- `--ink-muted: #abb8c3` (secondary text, captions — `cyan-bluish-gray` from source)
- `--accent: #d4a017` (highlight underline + stat numbers — warm gold)
- `--accent-bright: #fcb900` (hover/active accent — `luminous-vivid-amber` from source)
- `--rule: #2f3338` (1px hairline dividers)

**Typography:**
- Family: `"IBM Plex Sans", Arial, sans-serif` loaded via `@fontsource/ibm-plex-sans` weights 300, 400, 500, 600, 700.
- Type scale (`--fs-*` CSS vars + Tailwind `fontSize`): `xs: 13px`, `sm: 15px`, `base: 17px`, `md: 20px`, `lg: 28px`, `xl: 42px`, `2xl: 64px`, `display: clamp(56px, 8vw, 112px)`, `wordmark: clamp(80px, 22vw, 320px)`.
- Headline rule: `font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; line-height: 0.95`.
- Wordmark rule: `font-weight: 700; letter-spacing: -0.04em; text-transform: uppercase; line-height: 0.85`.

**Layout rhythm:**
- `--wide: 1200px` (Tailwind `max-w-wide`), `--content: 800px` (Tailwind `max-w-content`).
- Vertical section padding `py-24` (6rem top/bottom) on every top-level `<section>`.
- Horizontal page padding `px-6 md:px-10`.
- Section dividers: a single `<Hairline />` component (1px `--rule` line spanning `--wide`) is inserted between every adjacent pair of top-level sections in `App.tsx`.
- Block gap inside sections: `gap-6` (24px, mirrors `--wp--style--block-gap`).
- Zero border-radius globally; all cards/buttons square. Tailwind `borderRadius` is reset so `rounded` utilities are no-ops.

**Motifs:**
- **Highlight phrase** — key phrases inline-marked with class `accent-highlight`, which paints text in `--accent` and renders a 3px solid `--accent` underline offset 6px below the baseline. Used for one phrase per section maximum.
- **Stat block** — four-column row of numbers in `--accent`, weight 700, `font-size: var(--fs-2xl)`, with a `--ink-muted`, `--fs-xs` uppercase caption below.
- **Role card** — `bg-elevated` square card; opens with an `--fs-xs` uppercase company eyebrow in `--accent`, an `--fs-md` role title in `--ink`, a `--fs-xs` `--ink-muted` dates+location line, an unstyled `<ul>` of bullets in `--fs-sm`, and a closing italic `--fs-xs` `--ink-muted` stack line; on hover, the card translates `-2px` and shows a 1px `--accent` outline (the `cardHover` motion preset supplies the duration and easing).
- **Wordmark footer** — `<Wordmark text="PVMINI" />` (or `RE:BUILD`-style) sits as the final element, full bleed, baseline-aligned, clipping below the viewport edge.
- **Section eyebrow** — every section opens with the shared `<Eyebrow text="..." />` component (defined in foundation): a flex row with a 1px `--rule` line on each side and a centered uppercase label in `--ink-muted` `--fs-xs` `tracking-[0.2em]`. Section components must use `<Eyebrow />` and never re-implement the flanking lines.

**Motion presets** (exported from `src/lib/motion.ts`, consumed by name from components):
- `sectionEntrance`: `{ duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", offsetY: 24 }` — every top-level section component imports the preset and applies an inline `style` setting `--entrance-duration: ${duration}ms` and `--entrance-easing: ${easing}` on the `data-in-view="true"` wrapper, which the `globals.css` `@keyframes section-entrance` rule consumes via `animation: section-entrance var(--entrance-duration) var(--entrance-easing) both;`. No section may inline the duration or easing directly.
- `cardHover`: `{ duration: 250, easing: "cubic-bezier(0.22, 1, 0.36, 1)", translateY: -2 }` — `Experience.tsx` imports the preset and applies an inline `style` setting `--card-hover-duration` / `--card-hover-easing` / `--card-hover-translate-y` on each card, and the `globals.css` `.hover-card` rule consumes those CSS variables (`transition-duration: var(--card-hover-duration); transition-timing-function: var(--card-hover-easing);` and `:hover { transform: translateY(var(--card-hover-translate-y)); }`).
- `wordmarkBreathe`: `{ keyframes: "wordmark-breathe", duration: 8000, easing: "ease-in-out", iterations: "infinite", scaleRange: [1, 1.01] }` — a barely-perceptible scale loop on the footer wordmark.
- `statCountUp`: `{ duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }` — values animate from 0 to target on first intersection.

**Copy voice — exemplar strings** (exported by stable key from `src/lib/content.ts`; every component imports by key, never re-types):
- `HERO_HEADLINE: "ENGINEERING MODERN INTERFACES"`
- `HERO_LEAD_PREFIX: "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through"`
- `HERO_LEAD_HIGHLIGHT: "react architecture, design systems, and applied AI."` (rendered with `accent-highlight`)
- `SUBHEAD_PARTNER: "Your Partner For Cross-Platform Frontend Engineering"`
- `STATS: [{ value: 10, suffix: "+", label: "YEARS BUILDING UI" }, { value: 5, suffix: "", label: "PRODUCTION PLATFORMS" }, { value: 1, suffix: "M+", label: "DEVICES SHIPPED" }, { value: 4, suffix: "", label: "PATENTED PRODUCTS" }]`
- `EYEBROW_EXPERIENCE: "FEATURED ROLES"`
- `EYEBROW_SKILLS: "TOP SKILLS"`
- `EYEBROW_EDU: "EDUCATION & CERTIFICATIONS"`
- `AI_FOOTER_EYEBROW: "TELL US HOW THIS WAS BUILT"`
- `AI_FOOTER_HEADLINE: "HOW THIS SITE WAS BUILT"`
- `AI_FOOTER_BODY: "This site was generated end-to-end by ralph-node, an autonomous Node.js implementation of the Ralph loop. A blueprint architect agent decomposed the prompt into parallelizable tickets; a backpressure agent generated unit and end-to-end tests from each ticket; a junior implementer agent wrote code until the tests passed; every level ships behind a human PR review."`
- `AI_FOOTER_REPO_LABEL: "VIEW ON GITHUB"`
- `AI_FOOTER_REPO_URL: "https://github.com/Laptopmini/resume-rebuildmanufacturing"`
- `AI_FOOTER_RALPH_URL: "https://github.com/Laptopmini/ralph-node"`
- `WORDMARK_TEXT: "PVMINI"`

### 1. Tech Stack & Architecture Notes
**Detected stack:** Node 24, TypeScript 6 (`module: NodeNext`), Jest 30 + @swc/jest, Playwright 1.58, Biome 2.4, no React/build framework yet. `src/index.ts` is a placeholder. `tests/unit/setup.test.ts` and `tests/e2e/setup.spec.ts` are placeholder tests. `.github/workflows/auto-rebase.yml` exists; there is no deploy workflow.

**Relevant existing patterns:** Jest `testMatch` is `tests/unit/**/*.test.{ts,tsx}` (already supports `.tsx`). Playwright `baseURL` is `http://localhost:3000`. Biome enforces double-quote JSX, semicolons, 2-space indent, 100-char width.

**Recommendations:** Use **Vite 5 + React 18 + TypeScript** for the SPA. Vite's `base` config makes the `/rebuildmanufacturing/` GH Pages prefix one-line. Use **Tailwind v3** (not v4) with PostCSS for theme-driven utility classes that read from CSS variables. Use **@fontsource/ibm-plex-sans** for self-hosted fonts (no external font CDN at runtime). All asset URLs (images, icons) flow through `src/lib/basePath.ts#withBasePath`. Update `tsconfig.json` to `module: ESNext` + `moduleResolution: Bundler` + `jsx: react-jsx`. Update Jest to `testEnvironment: "jsdom"` with `moduleNameMapper` stubbing `\\.css$` → `identity-obj-proxy`. Dev server runs on `5173` (Vite default); update Playwright `baseURL` accordingly so existing config aligns.

### 2. File & Code Structure
**New files:**
- `vite.config.ts`
- `postcss.config.cjs`
- `tailwind.config.js`
- `index.html` (repo root, Vite entrypoint)
- `src/main.tsx`
- `src/App.tsx`
- `src/styles/globals.css`
- `src/types/css.d.ts`
- `src/lib/basePath.ts`
- `src/lib/motion.ts`
- `src/lib/content.ts`
- `src/components/Hairline.tsx`
- `src/components/Eyebrow.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Stats.tsx`
- `src/components/Experience.tsx`
- `src/components/Skills.tsx`
- `src/components/Education.tsx`
- `src/components/AIDisclosure.tsx`
- `src/components/Wordmark.tsx`
- `public/profile.png` (copy of root `profile.png`)
- `.github/workflows/deploy.yml`

**Modified files:**
- `package.json` (add deps + `dev` / `build` / `preview` scripts)
- `tsconfig.json` (module, moduleResolution, jsx, lib, include)
- `jest.config.mjs` (jsdom, moduleNameMapper, setupFilesAfterEach)
- `playwright.config.ts` (baseURL → 5173)
- `.gitignore` (already excludes `dist/` and `.maestro.*`; no change needed)

**Deleted files:**
- `src/index.ts` (placeholder)

**Conflicting test files to remove:**
- `tests/unit/setup.test.ts`
- `tests/e2e/setup.spec.ts`

### 3. Tickets

> Tickets are workstreams. No two tickets touch the same file. A ticket is workable once all tickets in its `depends_on` list are complete. Siblings under the same parent run in parallel.

#### Ticket 1: Foundation — Toolchain, Tokens, Content & Helpers

> Establish the entire build foundation: install Vite/React/Tailwind/jsdom dependencies, migrate TypeScript and Jest configs, encode every Design Intent token as a concrete artifact (CSS variables, Tailwind theme, motion presets, content strings, basePath helper), copy `profile.png` into the public asset directory, and create the shared `<Hairline />` divider primitive. Downstream tickets consume these artifacts by name and never re-decide tokens, copy, or motion timings.

**Tasks:**

1. [infra, install-dependencies] Install runtime and dev dependencies by running `npm install react@18 react-dom@18 @fontsource/ibm-plex-sans` and `npm install -D vite@5 @vitejs/plugin-react @types/react @types/react-dom tailwindcss@3 postcss autoprefixer jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy`. Then in `package.json` add scripts `"dev": "vite"`, `"build": "vite build"`, `"preview": "vite preview --port 5173"`, and update `"test:unit"` to keep `jest` (no change). Do not touch the existing `maestro`, `backpressure`, `ralph`, `lint`, `check-types` scripts.

2. [infra, update-tsconfig] Update `tsconfig.json`: change `module` to `"ESNext"`, change `moduleResolution` to `"Bundler"`, add `"jsx": "react-jsx"`, add `"lib": ["ES2022", "DOM", "DOM.Iterable"]`, add `"allowSyntheticDefaultImports": true`, add `"noEmit": true`, remove `"outDir"` and `"rootDir"`, and update `include` to `["src/**/*.ts", "src/**/*.tsx"]` and `exclude` to `["dist", "node_modules", "tests"]`.

3. [infra, update-jest-config] Update `jest.config.mjs` to set `testEnvironment: "jsdom"`, add `moduleNameMapper: { "\\.(css|less|scss|sass)$": "identity-obj-proxy" }`, and add `setupFilesAfterEach: ["@testing-library/jest-dom"]`. Preserve the existing `transform` and `testMatch`.

4. [infra, update-playwright-config] Update `playwright.config.ts` to set `baseURL: "http://localhost:5173"` (Vite default) instead of `:3000`. Preserve `testDir`, `testMatch`, `timeout`, and the `chromium` project.

5. [infra, create-vite-config] Create `vite.config.ts` exporting a `defineConfig` object with `plugins: [react()]`, `base: "/rebuildmanufacturing/"`, and `build: { outDir: "dist" }`. Import `react` from `@vitejs/plugin-react`.

6. [infra, create-postcss-config] Create `postcss.config.cjs` exporting `{ plugins: { tailwindcss: {}, autoprefixer: {} } }`.

7. [infra, create-tailwind-config] Create `tailwind.config.js` (CommonJS — `module.exports = { ... }`) so Tailwind v3 can load it without `ts-node`. Set `content: ["./index.html", "./src/**/*.{ts,tsx}"]`, `theme.extend.colors` mapping `bg`, `bgElevated`, `bgSunken`, `ink`, `inkMuted`, `accent`, `accentBright`, `rule` to their corresponding `var(--bg)`, `var(--bg-elevated)`, `var(--bg-sunken)`, `var(--ink)`, `var(--ink-muted)`, `var(--accent)`, `var(--accent-bright)`, `var(--rule)` CSS variables, `theme.extend.fontFamily.sans` to `["IBM Plex Sans", "Arial", "sans-serif"]`, `theme.extend.maxWidth.wide` to `"var(--wide)"` and `theme.extend.maxWidth.content` to `"var(--content)"`, `theme.extend.fontSize` overriding the scale by reading every value from CSS variables — `xs: "var(--fs-xs)"`, `sm: "var(--fs-sm)"`, `base: "var(--fs-base)"`, `md: "var(--fs-md)"`, `lg: "var(--fs-lg)"`, `xl: "var(--fs-xl)"`, `"2xl": "var(--fs-2xl)"`, `display: "var(--fs-display)"`, `wordmark: "var(--fs-wordmark)"` — so the `--fs-*` tokens declared in `globals.css` are the single source of truth. Set every `borderRadius` key (`none`, `sm`, `DEFAULT`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`) to `"0"` so radius utilities are no-ops. Plugins array empty.

8. [infra, create-css-ambient-types] Create `src/types/css.d.ts` declaring `declare module "*.css";` so `tsc --noEmit` accepts `import "./styles/globals.css"`.

9. [infra, create-globals-css] Create `src/styles/globals.css` containing: `@tailwind base; @tailwind components; @tailwind utilities;` followed by a `:root` block defining every CSS custom property listed in Design Intent — colors (`--bg: #1e2124; --bg-elevated: #26292d; --bg-sunken: #16181a; --ink: #ffffff; --ink-muted: #abb8c3; --accent: #d4a017; --accent-bright: #fcb900; --rule: #2f3338;`), layout (`--wide: 1200px; --content: 800px;`), and the type scale (`--fs-xs: 13px; --fs-sm: 15px; --fs-base: 17px; --fs-md: 20px; --fs-lg: 28px; --fs-xl: 42px; --fs-2xl: 64px; --fs-display: clamp(56px, 8vw, 112px); --fs-wordmark: clamp(80px, 22vw, 320px);`). Then a `body` rule setting `background: var(--bg)`, `color: var(--ink)`, `font-family: "IBM Plex Sans", Arial, sans-serif`, `font-size: var(--fs-base)`, `line-height: 1.55`. Add an `.accent-highlight` class (`color: var(--accent); text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 6px; transition: color 200ms;`) plus `.accent-highlight:hover { color: var(--accent-bright); text-decoration-color: var(--accent-bright); }` so the `--accent-bright` token is consumed. Add a `.hover-card` class that reads CSS variables set by the consuming component: `transition: transform var(--card-hover-duration, 250ms) var(--card-hover-easing, ease-out), outline-color 200ms; outline: 1px solid transparent;` plus `.hover-card:hover { transform: translateY(var(--card-hover-translate-y, -2px)); outline-color: var(--accent); }`. Add `@keyframes section-entrance { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`, `@keyframes wordmark-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.01); } }`, and a `[data-in-view="true"]` selector applying `animation: section-entrance var(--entrance-duration, 600ms) var(--entrance-easing, ease-out) both;` so each section's inline style wins. Reduce-motion guard: `@media (prefers-reduced-motion: reduce) { [data-in-view], .hover-card, .accent-highlight { animation: none !important; transition: none !important; } }`.

10. [code, create-basepath-helper, ts] Create `src/lib/basePath.ts` exporting `export const BASE_PATH = "/rebuildmanufacturing";` and `export function withBasePath(path: string): string` that returns `BASE_PATH + (path.startsWith("/") ? path : "/" + path)`. Add `data-testid` is not applicable; the test will assert `withBasePath("/profile.png") === "/rebuildmanufacturing/profile.png"` and `withBasePath("foo.png") === "/rebuildmanufacturing/foo.png"` and `BASE_PATH === "/rebuildmanufacturing"`.

11. [code, create-motion-module, ts] Create `src/lib/motion.ts` exporting four named const presets exactly: `sectionEntrance` (`{ duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", offsetY: 24 }`), `cardHover` (`{ duration: 250, easing: "cubic-bezier(0.22, 1, 0.36, 1)", translateY: -2 }`), `wordmarkBreathe` (`{ duration: 8000, easing: "ease-in-out", scaleMin: 1, scaleMax: 1.01 }`), `statCountUp` (`{ duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }`). Each preset is `as const`. The test asserts each preset has the exact numeric duration and easing string above.

12. [code, create-content-module, ts] Create `src/lib/content.ts` exporting these named consts (all `as const` where applicable): `HERO_HEADLINE = "ENGINEERING MODERN INTERFACES"`, `HERO_LEAD_PREFIX = "Paul-Valentin Mini builds frontend platforms from concept to full-rate production through"`, `HERO_LEAD_HIGHLIGHT = "react architecture, design systems, and applied AI."`, `SUBHEAD_PARTNER = "Your Partner For Cross-Platform Frontend Engineering"`, `SUBHEAD_BODY` (a 2-sentence paragraph paraphrasing the resume Profile section), `STATS` (an array of four `{ value: number; suffix: string; label: string }` matching the Design Intent stats verbatim), `EYEBROW_EXPERIENCE = "FEATURED ROLES"`, `EYEBROW_SKILLS = "TOP SKILLS"`, `EYEBROW_EDU = "EDUCATION & CERTIFICATIONS"`, `EXPERIENCES` (an array of 5 entries — SmartThings, Samsung Research America, Samsung Strategy & Innovation Center, Prism, Imprivata — each `{ company, location, role, dates, bullets: string[], stack: string }` transcribed from `resume.md`), `SKILLS` (an array of `{ category, items: string[] }` for the four skill categories from `resume.md`), `EDUCATION` (an array of three entries from `resume.md` shaped `{ title, detail }`: B.A. CS UCSC, Practical Prompt Engineering, AI Agents Fundamentals v2), `CONTACT = { name: "Paul-Valentin Mini", location: "San Francisco, CA", phone: "(415) 694-3616", email: "paul@emini.com", linkedin: "https://www.linkedin.com/in/pvmini", github: "https://github.com/Laptopmini" }`, `AI_FOOTER_EYEBROW = "TELL US HOW THIS WAS BUILT"`, `AI_FOOTER_HEADLINE = "HOW THIS SITE WAS BUILT"`, `AI_FOOTER_BODY` (the multi-sentence paragraph from Design Intent verbatim), `AI_FOOTER_WORKFLOW` (a paragraph enumerating the four ralph-node phases: blueprint architect, backpressure test generation, junior implementer until tests pass, human PR-gated promotion between levels), `AI_FOOTER_REPO_LABEL = "VIEW ON GITHUB"`, `AI_FOOTER_REPO_URL = "https://github.com/Laptopmini/resume-rebuildmanufacturing"`, `AI_FOOTER_RALPH_URL = "https://github.com/Laptopmini/ralph-node"`, `WORDMARK_TEXT = "PVMINI"`.

13. [code, create-hairline-component, tsx] Create `src/components/Hairline.tsx` exporting a default React component that renders `<div role="separator" data-testid="hairline" className="mx-auto w-full max-w-wide h-px bg-rule" />`. No props. Used between sections in `App.tsx`.

14. [code, create-eyebrow-component, tsx] Create `src/components/Eyebrow.tsx` exporting a default React component `Eyebrow` that takes `{ text: string; testId?: string }`. Render `<div data-testid={testId ?? "eyebrow"} className="flex items-center gap-4 mb-12"><span className="flex-1 h-px bg-rule" /><span className="text-xs uppercase tracking-[0.2em] text-inkMuted whitespace-nowrap">{text}</span><span className="flex-1 h-px bg-rule" /></div>`. This is the single source for the section-eyebrow motif; every section in Tickets 3 and 4 imports it and never re-implements the flanking lines.

15. [infra, copy-profile-asset] Copy the root `profile.png` to `public/profile.png` by running `mkdir -p public && cp profile.png public/profile.png`. Vite serves files in `public/` at the configured `base`, so this image becomes available at `/rebuildmanufacturing/profile.png` via `withBasePath("/profile.png")`.

16. [infra, remove-placeholder-files] Delete the placeholder source and placeholder tests by running `rm -f src/index.ts tests/unit/setup.test.ts tests/e2e/setup.spec.ts`.

#### Ticket 2: Header & Hero

**depends_on:** [Ticket 1]

> Build the top-of-page experience: a fixed top navigation header with the wordmark mark on the left and three anchor links on the right, and a full-height hero block that shows the oversized headline (`HERO_HEADLINE`) plus the lead paragraph with the highlighted clause. Both sit on `bg` and consume tokens and copy from the foundation.

**Tasks:**

1. [code, create-header-component, tsx] Create `src/components/Header.tsx` rendering `<header data-testid="site-header" className="fixed top-0 inset-x-0 z-50 bg-bg/90 backdrop-blur border-b border-rule">` with an inner `<div className="mx-auto max-w-wide flex items-center justify-between px-6 md:px-10 h-16">`. Left side: a `<span data-testid="header-mark" className="font-sans font-bold tracking-tight text-ink text-md uppercase">PV·MINI</span>`. Right side: a `<nav>` with three `<a>` elements each `className="text-inkMuted hover:text-accentBright text-xs uppercase tracking-[0.2em] mx-3 transition-colors"` (the `accentBright` Tailwind color is consumed here so the foundation `--accent-bright` token is wired through), with `data-testid="nav-experience"` href `#experience` text `"Experience"`, `data-testid="nav-skills"` href `#skills` text `"Skills"`, `data-testid="nav-contact"` href `#contact` text `"Contact"`. Component takes no props.

2. [code, create-hero-component, tsx] Create `src/components/Hero.tsx`. Import `HERO_HEADLINE`, `HERO_LEAD_PREFIX`, `HERO_LEAD_HIGHLIGHT` from `../lib/content`, `withBasePath` from `../lib/basePath`, and `sectionEntrance` from `../lib/motion`. Render `<section id="hero" data-testid="hero-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="relative min-h-screen pt-32 pb-24 px-6 md:px-10 bg-bg">` containing a `<div className="mx-auto max-w-wide grid md:grid-cols-12 gap-6">`. Left column (`md:col-span-7`): `<h1 data-testid="hero-headline" className="font-sans font-bold uppercase text-display leading-[0.95] tracking-[-0.02em] text-ink">` rendering `HERO_HEADLINE`, then a `<p data-testid="hero-lead" className="mt-12 text-md text-ink max-w-content">` containing the literal `HERO_LEAD_PREFIX`, a single space, and a `<span className="accent-highlight">{HERO_LEAD_HIGHLIGHT}</span>`. Right column (`md:col-span-5`): an `<img data-testid="hero-portrait" src={withBasePath("/profile.png")} alt="Paul-Valentin Mini" className="w-full aspect-[3/4] object-cover" />`. The `sectionEntrance` preset duration and easing are consumed by name — never inline. Component takes no props.

#### Ticket 3: About, Stats & Experience

**depends_on:** [Ticket 1]

> Build the three editorial midsections: a short "About" / partner-style subhead block, a four-column animated stats row, and the experience cards that render the five roles from `resume.md` in the Re:Build "Featured Projects" card grid style.

**Tasks:**

1. [code, create-about-component, tsx] Create `src/components/About.tsx` importing `SUBHEAD_PARTNER` and `SUBHEAD_BODY` from `../lib/content` and `sectionEntrance` from `../lib/motion`. Render `<section id="about" data-testid="about-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg">` with an inner `<div className="mx-auto max-w-wide grid md:grid-cols-2 gap-10">`. Left column: `<h2 data-testid="about-headline" className="font-sans font-bold uppercase text-xl leading-[1.05] tracking-[-0.02em] text-ink">` rendering `SUBHEAD_PARTNER`. Right column: `<p data-testid="about-body" className="text-base text-inkMuted">` rendering `SUBHEAD_BODY`. The `sectionEntrance` preset duration and easing are consumed by name.

2. [code, create-stats-component, tsx] Create `src/components/Stats.tsx` importing `STATS` from `../lib/content` and `sectionEntrance`, `statCountUp` from `../lib/motion`. Render `<section data-testid="stats-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg border-y border-rule">` with `<div className="mx-auto max-w-wide grid grid-cols-2 md:grid-cols-4 gap-10">` mapping over `STATS`. Each item is `<div data-testid={"stat-" + index} className="flex flex-col items-start" style={{ "--count-duration": statCountUp.duration + "ms", "--count-easing": statCountUp.easing } as React.CSSProperties}><span className="text-2xl font-bold text-accent">{value}{suffix}</span><span className="mt-3 text-xs uppercase tracking-[0.2em] text-inkMuted">{label}</span></div>`. Both motion presets are consumed by name.

3. [code, create-experience-component, tsx] Create `src/components/Experience.tsx` importing `EXPERIENCES` and `EYEBROW_EXPERIENCE` from `../lib/content`, `sectionEntrance` and `cardHover` from `../lib/motion`, and the default-exported `Eyebrow` from `./Eyebrow`. Render `<section id="experience" data-testid="experience-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg">` containing a `<div className="mx-auto max-w-wide">` with: `<Eyebrow text={EYEBROW_EXPERIENCE} testId="experience-eyebrow" />`, then a `<ul className="grid md:grid-cols-2 gap-6">` mapping `EXPERIENCES` to `<li data-testid={"exp-card-" + index} className="hover-card bg-bgElevated p-8 flex flex-col gap-3" style={{ "--card-hover-duration": cardHover.duration + "ms", "--card-hover-easing": cardHover.easing, "--card-hover-translate-y": cardHover.translateY + "px" } as React.CSSProperties}><span className="text-xs uppercase tracking-[0.2em] text-accent">{company}</span><span className="text-md font-bold text-ink">{role}</span><span className="text-xs text-inkMuted">{dates} · {location}</span><ul className="mt-3 list-none space-y-2">{bullets.map((b, i) => <li key={i} className="text-sm text-ink">{b}</li>)}</ul><span className="mt-3 text-xs italic text-inkMuted">{stack}</span></li>`. The `hover-card` CSS class reads the `--card-hover-*` variables set inline, so the `cardHover` preset is consumed by name without re-deriving timings.

#### Ticket 4: Skills, Education, AI Disclosure & Wordmark

**depends_on:** [Ticket 1]

> Build the foot-of-page sections: a skills grid, an education/certifications list, the AI generation disclosure block (per the human's explicit request), and the oversized `<Wordmark />` component that anchors the page bottom with the breathing scale loop.

**Tasks:**

1. [code, create-skills-component, tsx] Create `src/components/Skills.tsx` importing `SKILLS` and `EYEBROW_SKILLS` from `../lib/content`, `sectionEntrance` from `../lib/motion`, and the default-exported `Eyebrow` from `./Eyebrow`. Render `<section id="skills" data-testid="skills-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg border-t border-rule">` with `<div className="mx-auto max-w-wide">` containing `<Eyebrow text={EYEBROW_SKILLS} testId="skills-eyebrow" />` and a `<dl className="grid md:grid-cols-2 gap-x-10 gap-y-8">` mapping over `SKILLS` to produce `<div data-testid={"skill-cat-" + index}><dt className="text-md font-bold text-ink mb-3">{category}</dt><dd className="text-sm text-inkMuted">{items.join(", ")}</dd></div>`.

2. [code, create-education-component, tsx] Create `src/components/Education.tsx` importing `EDUCATION` and `EYEBROW_EDU` from `../lib/content`, `sectionEntrance` from `../lib/motion`, and the default-exported `Eyebrow` from `./Eyebrow`. Render `<section data-testid="education-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bg border-t border-rule">` with `<div className="mx-auto max-w-wide">` containing `<Eyebrow text={EYEBROW_EDU} testId="education-eyebrow" />` and a `<ul className="space-y-6">` mapping `EDUCATION` to `<li data-testid={"edu-" + index} className="flex flex-col gap-1"><span className="text-md font-bold text-ink">{title}</span><span className="text-sm text-inkMuted">{detail}</span></li>`.

3. [code, create-ai-disclosure-component, tsx] Create `src/components/AIDisclosure.tsx` importing `AI_FOOTER_EYEBROW`, `AI_FOOTER_HEADLINE`, `AI_FOOTER_BODY`, `AI_FOOTER_WORKFLOW`, `AI_FOOTER_REPO_LABEL`, `AI_FOOTER_REPO_URL`, `AI_FOOTER_RALPH_URL`, `CONTACT` from `../lib/content`, `sectionEntrance` from `../lib/motion`, and the default-exported `Eyebrow` from `./Eyebrow`. Render `<section id="contact" data-testid="ai-disclosure-section" data-in-view="true" style={{ "--entrance-duration": sectionEntrance.duration + "ms", "--entrance-easing": sectionEntrance.easing } as React.CSSProperties} className="py-24 px-6 md:px-10 bg-bgElevated border-t border-rule">` with an inner `<div className="mx-auto max-w-wide">`. First, render `<Eyebrow text={AI_FOOTER_EYEBROW} testId="ai-eyebrow" />`. Then a `<div className="grid md:grid-cols-12 gap-10">`. Left column (`md:col-span-5`): `<h2 data-testid="ai-headline" className="text-xl font-bold uppercase tracking-[-0.02em] text-ink leading-[1.05]">{AI_FOOTER_HEADLINE}</h2>`. Right column (`md:col-span-7`): a `<p data-testid="ai-body" className="text-base text-ink">` rendering `AI_FOOTER_BODY` exactly, then `<p data-testid="ai-workflow" className="mt-6 text-base text-inkMuted">` rendering `AI_FOOTER_WORKFLOW` exactly, followed by a `<div className="mt-10 flex flex-wrap gap-6">` containing `<a data-testid="ai-repo-link" href={AI_FOOTER_REPO_URL} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">{AI_FOOTER_REPO_LABEL}</a>`, an `<a data-testid="ai-ralph-link" href={AI_FOOTER_RALPH_URL} className="text-xs uppercase tracking-[0.2em] text-accent hover:text-accentBright underline">RALPH-NODE</a>`, an `<a data-testid="contact-email" href={"mailto:" + CONTACT.email} className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline">{CONTACT.email}</a>`, an `<a data-testid="contact-linkedin" href={CONTACT.linkedin} className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline">LINKEDIN</a>`, and an `<a data-testid="contact-github" href={CONTACT.github} className="text-xs uppercase tracking-[0.2em] text-inkMuted hover:text-accent underline">GITHUB</a>`. The headline string MUST be the imported `AI_FOOTER_HEADLINE` constant — never an inline literal.

4. [code, create-wordmark-component, tsx] Create `src/components/Wordmark.tsx` importing `WORDMARK_TEXT` from `../lib/content` and `wordmarkBreathe` from `../lib/motion`. Render `<div data-testid="wordmark" className="bg-bgSunken overflow-hidden" style={{ animation: "wordmark-breathe " + wordmarkBreathe.duration + "ms " + wordmarkBreathe.easing + " infinite" }}><span className="block text-wordmark font-bold uppercase tracking-[-0.04em] leading-[0.85] text-ink whitespace-nowrap text-center select-none">{WORDMARK_TEXT}</span></div>`. The component reads `wordmarkBreathe.duration`, `wordmarkBreathe.easing` from the motion preset by name — no inline magic numbers.

#### Ticket 5: App Composition & Entry

**depends_on:** [Ticket 2, Ticket 3, Ticket 4]

> Compose every section in document order with `<Hairline />` dividers between adjacent sections, mount the React tree, and create the Vite HTML entrypoint. Imports the foundation `globals.css` for the side-effectful style cascade.

**Tasks:**

1. [code, create-app-root, tsx] Create `src/App.tsx` importing `Header` from `./components/Header`, `Hero` from `./components/Hero`, `About` from `./components/About`, `Stats` from `./components/Stats`, `Experience` from `./components/Experience`, `Skills` from `./components/Skills`, `Education` from `./components/Education`, `AIDisclosure` from `./components/AIDisclosure`, `Wordmark` from `./components/Wordmark`, `Hairline` from `./components/Hairline`. Default-export a function component `App` rendering `<div data-testid="app-root" className="bg-bg text-ink min-h-screen"><Header /><main><Hero /><Hairline /><About /><Hairline /><Stats /><Hairline /><Experience /><Hairline /><Skills /><Hairline /><Education /><Hairline /><AIDisclosure /><Hairline /></main><Wordmark /></div>`. The `<Hairline />` insertions — including the trailing one between `<AIDisclosure />` and `<Wordmark />` — enforce the Design Intent layout rhythm rule that every adjacent pair of top-level sections is separated by a 1px `--rule` line.

2. [code, create-main-entry, tsx] Create `src/main.tsx` that imports `React`, `ReactDOM` from `react-dom/client`, `App` from `./App`, and `./styles/globals.css` for side effects. Also import each IBM Plex Sans weight CSS file for side effects so all five weights load: `import "@fontsource/ibm-plex-sans/300.css";`, `import "@fontsource/ibm-plex-sans/400.css";`, `import "@fontsource/ibm-plex-sans/500.css";`, `import "@fontsource/ibm-plex-sans/600.css";`, `import "@fontsource/ibm-plex-sans/700.css";`. Mount with `ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);`.

3. [infra, create-index-html] Create `index.html` at the repo root containing `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Paul-Valentin Mini — Lead Frontend Engineer</title><meta name="description" content="Lead Frontend Engineer with 10+ years building React platforms at Samsung SmartThings. Now applying generative AI to developer workflows." /></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`. Vite injects the correct `base` prefix at build time.

#### Ticket 6: GitHub Pages Deploy Workflow

**depends_on:** [Ticket 1]

> Add the `push: main` workflow that builds the Vite SPA and deploys `dist/` to GitHub Pages. This ticket owns only `.github/workflows/deploy.yml` — no other files.

**Tasks:**

1. [infra, create-deploy-workflow] Create `.github/workflows/deploy.yml` defining a workflow named `Deploy to GitHub Pages` triggered on `push` to `main` and on `workflow_dispatch`. Set top-level `permissions: { contents: read, pages: write, id-token: write }` and `concurrency: { group: "pages", cancel-in-progress: false }`. Define a single job `build-and-deploy` running on `ubuntu-latest` with two steps before deploy: `actions/checkout@v4`, `actions/setup-node@v4` with `node-version: 24` and `cache: npm`, `npm ci`, `npm run build`. Then upload-and-deploy via `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` with `path: dist`, and `actions/deploy-pages@v4`. Set the job `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }` and tag the deploy step with `id: deployment`.
