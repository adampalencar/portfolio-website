# Phase 3: Content Infrastructure - Research

**Researched:** 2026-04-11
**Domain:** Astro 6 Content Layer API, MDX, image optimization, case study layout patterns
**Confidence:** HIGH

---

## Summary

Phase 3 wires together three interlocking systems: a type-safe content schema (CONT-01), a CaseStudyLayout template following the Minto Pyramid structure (CONT-02), and one complete case study (Orbital Concierge, CONT-04) that proves the pipeline end-to-end. Prev/next navigation (CONT-03) and MDX-based image optimization (CONT-05) are built alongside the first case study, not deferred.

The Astro 6 Content Layer API is fully documented and the patterns are well-established. The single complexity spike is the MDX integration requirement: `@astrojs/mdx` must be added as an integration, and images inside MDX must be imported explicitly or referenced from `src/` (not `public/`) to go through Astro's optimizer. Screenshot assets for Orbital Concierge already exist on disk and need only to be moved into `src/assets/` before the build can process them.

**Key contradiction resolved:** The project STACK.md lists MDX as "not recommended," but STATE.md records a locked decision overriding that — MDX is required by CONT-05 so images pass through Sharp. The planner must NOT treat the STACK.md entry as a constraint. The locked decision in STATE.md governs.

**Primary recommendation:** Install `@astrojs/mdx`, define `src/content.config.ts` with a Zod schema using the `image()` helper for the thumbnail field, build `CaseStudyLayout.astro` against existing design tokens, write Orbital Concierge as an MDX file with inline Image imports, and wire prev/next from a sorted `getCollection()` call. Plan in 3 atomic waves: schema + integration, layout template, Orbital Concierge content.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Content Layer API with Zod schema for case studies (MDX format) including title, role, timeline, tools, category, tier, thumbnail, one-liner, tags array | Astro 6 `defineCollection()` + `glob()` loader + Zod schema with `image()` helper covers all fields. Schema lives in `src/content.config.ts`. |
| CONT-02 | Case study page template following Minto Pyramid: hero, result, problem, key decisions, process evidence, final design, reflection, CTA | Implemented as `src/layouts/CaseStudyLayout.astro` wrapping `BaseLayout`. MDX `<Content />` slot renders body. Structural sections are MDX headings — layout provides hero and prev/next frame. |
| CONT-03 | Prev/next project navigation on case study pages | Built into `CaseStudyLayout` using a sorted `getCollection('case-studies')` call. Sort by `tier` then `id`. Find current index, link previous and next. |
| CONT-04 | Orbital Concierge case study fully built with optimized screenshot assets | MDX file at `src/content/case-studies/orbital-concierge.mdx`. Screenshots copied to `src/assets/case-studies/orbital-concierge/`. Imported per-file in MDX using `import` statements. |
| CONT-05 | Images optimized via Astro's built-in image processing pipeline (MDX, not plain Markdown) | Requires `@astrojs/mdx` integration. Images imported with `import imgName from '../path'` in MDX body, rendered with `<Image src={imgName} alt="..." />` from `astro:assets`. Frontmatter thumbnail uses `image()` Zod helper. |
</phase_requirements>

---

## Project Constraints (from CLAUDE.md)

**Enforced constraints that affect this phase:**

- **No frameworks:** Zero React/Vue/Svelte. All Astro components only.
- **No GSAP:** Motion is CSS + IntersectionObserver. Not relevant to this phase.
- **Images:** All optimized via Astro's built-in image processing. `<Image>` and `<Picture>` from `astro:assets` only.
- **Fonts:** Already self-hosted via Fontsource. CaseStudyLayout inherits from BaseLayout — no new font setup.
- **Hosting:** Netlify free tier, static output only. No SSR.
- **`output: 'static'`:** Already set in `astro.config.mjs`. All routes generated at build time via `getStaticPaths()`.
- **CSS:** BEM naming, `@layer components` wrapping, existing design tokens from `src/styles/tokens.css`.
- **Icons:** Pixelarticons via astro-icon. Already installed.
- **`astro:page-load` for scripts:** Any interactive JS in CaseStudyLayout must use `astro:page-load`, not `DOMContentLoaded`.

**Stack contradiction to resolve:**
The STACK.md / CLAUDE.md What-Not-To-Use table lists MDX as rejected. STATE.md Decisions overrides this with a locked decision: "Case studies must be MDX (not plain Markdown) so images go through Astro's optimizer. Locked in CONT-05." The planner must follow STATE.md, not STACK.md.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro Content Layer API | Built into Astro 6.1.5 | Type-safe collection schema and querying | Native to Astro 6, replaced legacy collections. `defineCollection()` + `glob()` + Zod schema validation at build time. |
| `@astrojs/mdx` | 5.0.3 (latest) | MDX support in Astro | Required to author `.mdx` files that embed `<Image>` components. Without it, Astro only processes `.md` files and images stay unoptimized. |
| Zod 4 | Bundled with Astro 6 | Frontmatter schema validation | Astro 6 ships with Zod 4. Use `z` from `astro/zod`. The `image()` helper validates frontmatter image paths and resolves them for Sharp processing. |
| Astro `<Image>` component | Built into Astro 6 | Per-image optimization in MDX body | Sharp-powered. Outputs WebP, generates srcset, prevents layout shift. Import from `astro:assets`. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro `<Picture>` component | Built into Astro 6 | AVIF + WebP fallback for hero images | Use for the case study hero/thumbnail where maximum compression matters. |
| `render()` from `astro:content` | Built into Astro 6 | Compile MDX entry to HTML | Call in the dynamic route page (`[...id].astro`) to get `{ Content }` component. |
| `getCollection()` | Built into Astro 6 | Query all case study entries | Used in `getStaticPaths()` for route generation and in CaseStudyLayout for prev/next logic. |
| `getEntry()` | Built into Astro 6 | Query a single entry by id | Alternative to passing entry as prop. Use `getCollection()` + filter for prev/next. |

### Installation
```bash
npx astro add mdx
```
This auto-adds `@astrojs/mdx` to `package.json` and updates `astro.config.mjs` with `mdx()` in the integrations array. No manual config needed.

**Version verification:**
- `@astrojs/mdx`: `npm view @astrojs/mdx version` confirmed `5.0.3` on 2026-04-11.
- Astro: `6.1.5` already installed, confirmed in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure (additions for Phase 3)
```
src/
├── content/
│   └── case-studies/
│       └── orbital-concierge.mdx     # First case study
├── content.config.ts                 # Collection schema definition
├── assets/
│   └── case-studies/
│       └── orbital-concierge/        # Screenshots (10 PNG files)
│           ├── hero.png
│           ├── gameplay.png
│           └── ... (8 more)
├── layouts/
│   ├── BaseLayout.astro              # Already exists
│   └── CaseStudyLayout.astro         # New: wraps BaseLayout
├── pages/
│   └── work/
│       └── [...id].astro             # Dynamic route replacing orbital-concierge.astro
```

**Important:** The existing `src/pages/work/orbital-concierge.astro` is a static placeholder. Phase 3 replaces it with a dynamic route at `src/pages/work/[...id].astro` (or `[id].astro`). The placeholder can be deleted once the dynamic route is live.

### Pattern 1: Content Schema Definition
**What:** Define the case study collection in `src/content.config.ts`.
**When to use:** Once, before authoring any MDX content.

```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z, image } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    oneliner: z.string(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()),
    category: z.enum(['Personal', 'Professional', 'Academic']),
    tier: z.number().int().min(1).max(3),
    thumbnail: image(),
    tags: z.array(z.string()),
  }),
});

export const collections = { 'case-studies': caseStudies };
```

**Key detail:** `schema: ({ image }) => z.object(...)` — the `image()` helper is destructured from the schema callback argument, not imported at the top. This is the Astro 6 pattern for frontmatter image validation.

### Pattern 2: Dynamic Route Generation
**What:** Generate one page per case study entry with `getStaticPaths()`.
**When to use:** In `src/pages/work/[...id].astro` (or `[id].astro`).

```typescript
// src/pages/work/[...id].astro
// Source: https://docs.astro.build/en/guides/content-collections/
import { getCollection, render } from 'astro:content';
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';

export async function getStaticPaths() {
  const studies = await getCollection('case-studies');
  return studies.map(entry => ({
    params: { id: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const allStudies = await getCollection('case-studies');
// sort by tier, then id for stable order
const sorted = allStudies.sort((a, b) =>
  a.data.tier !== b.data.tier ? a.data.tier - b.data.tier : a.id.localeCompare(b.id)
);
const idx = sorted.findIndex(s => s.id === entry.id);
const prev = idx > 0 ? sorted[idx - 1] : null;
const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;
---
<CaseStudyLayout entry={entry} prev={prev} next={next}>
  <Content />
</CaseStudyLayout>
```

**URL output:** An entry with id `orbital-concierge` generates `/work/orbital-concierge` matching the existing nav href.

### Pattern 3: Image Imports in MDX
**What:** Import and render screenshots through Astro's image pipeline inside MDX.
**When to use:** For every screenshot in `orbital-concierge.mdx`.

```mdx
---
title: Orbital Concierge
thumbnail: ../../assets/case-studies/orbital-concierge/hero.png
# ... other frontmatter
---

import { Image } from 'astro:assets';
import heroImg from '../../assets/case-studies/orbital-concierge/hero.png';
import gameplayImg from '../../assets/case-studies/orbital-concierge/gameplay.png';

## Most Playtesters Couldn't Tell Why They Earned Their Score

<Image src={heroImg} alt="Level 22 (Orbital Suite), one stop in, all four systems active" />

...body content...

<Image src={gameplayImg} alt="Level 17 (Cross Traffic), all four passenger types on the board" />
```

**Key detail:** Images are imported individually at the top of the MDX file using relative paths from the MDX file's location to `src/assets/`. Path: `../../assets/case-studies/orbital-concierge/hero.png` (from `src/content/case-studies/`).

### Pattern 4: CaseStudyLayout Hero from Frontmatter
**What:** Render the thumbnail image (validated by `image()` helper) in the layout hero.

```typescript
// src/layouts/CaseStudyLayout.astro (excerpt)
import { Image } from 'astro:assets';

interface Props {
  entry: CollectionEntry<'case-studies'>;
  prev: CollectionEntry<'case-studies'> | null;
  next: CollectionEntry<'case-studies'> | null;
}

const { entry, prev, next } = Astro.props;
const { title, role, timeline, tools, thumbnail, oneliner } = entry.data;
---
<BaseLayout title={`${title} - Adam Palencar`}>
  <article class="case-study">
    <header class="case-study__hero">
      <Image src={thumbnail} alt={`${title} hero`} />
      <h1>{title}</h1>
      <p class="case-study__oneliner">{oneliner}</p>
      <dl class="case-study__meta">
        <dt>Role</dt><dd>{role}</dd>
        <dt>Timeline</dt><dd>{timeline}</dd>
        <dt>Tools</dt><dd>{tools.join(', ')}</dd>
      </dl>
    </header>
    <div class="case-study__body">
      <slot />
    </div>
    <!-- Prev/next nav -->
    {(prev || next) && (
      <nav class="case-study__nav" aria-label="Case study navigation">
        {prev && <a href={`/work/${prev.id}`} class="case-study__nav-prev">← {prev.data.title}</a>}
        {next && <a href={`/work/${next.id}`} class="case-study__nav-next">{next.data.title} →</a>}
      </nav>
    )}
  </article>
</BaseLayout>
```

### Minto Pyramid Section Order (locked)
The vault CLAUDE.md and case study content both define this order. CaseStudyLayout slot content must follow:
1. **Hero** — title, role, timeline, tools, one-line outcome (in layout frame, not MDX body)
2. **The Result** — quantified impact, or "how I would measure it"
3. **The Problem** — context, who it affected
4. **Key Decisions** — 2-3 pivotal choices with rationale and tradeoffs
5. **Process Evidence** — visual-heavy, light on text
6. **Final Design** — key screens described
7. **Reflection** — honest constraints, what was learned
8. **CTA** — next project link / contact strip

The existing Orbital Concierge vault note already follows this order and is ready to be transcribed to MDX. The section headers in the vault use descriptive custom headings (not generic "Key Decisions") per case study writing rules.

### Anti-Patterns to Avoid
- **Putting images in `public/`:** Images in `public/` bypass Sharp and are served unoptimized. All case study screenshots must be in `src/assets/`.
- **Using plain Markdown (`.md`) for case studies:** Markdown does not support `<Image>` component imports. MDX is required for image optimization.
- **Hardcoding case study pages in `src/pages/work/`:** Static `.astro` files per project don't scale. Use `[...id].astro` dynamic route from day one.
- **Calling `getCollection()` in `CaseStudyLayout`:** The layout receives sorted neighbors as props. Avoid calling `getCollection()` inside a layout — keep data fetching in the page (route file).
- **Using `DOMContentLoaded` instead of `astro:page-load`:** All interactive scripts in case study pages must use `astro:page-load` for View Transitions compatibility (locked decision from Phase 1).
- **Forgetting `is:inline` and `astro:after-swap` on any new theme-related scripts:** The dark mode flash fix is already in BaseLayout; don't duplicate.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom Sharp pipeline, resize scripts | Astro `<Image>` / `<Picture>` from `astro:assets` | Automatic WebP, srcset, lazy load, LCP optimization, layout shift prevention — all for free |
| Schema validation | Manual frontmatter parsing | Zod schema in `defineCollection()` | Build-time error if a field is missing or wrong type; TypeScript inference for free |
| Content file registration | Manual import array | `glob()` loader | Any `.mdx` file dropped in `src/content/case-studies/` auto-appears in `getCollection()` |
| Prev/next navigation sorting | Custom sort logic per page | `getCollection()` sort in route file, pass as props | Single source of truth; reusable across all future case studies |

---

## Common Pitfalls

### Pitfall 1: MDX Not Installed
**What goes wrong:** Astro silently ignores `.mdx` files or throws a build error about unrecognized file type.
**Why it happens:** `@astrojs/mdx` is not in Astro's core by default; it requires explicit installation.
**How to avoid:** Run `npx astro add mdx` before authoring any `.mdx` files. Verify `mdx()` appears in `astro.config.mjs` integrations array before the first build.
**Warning signs:** `getCollection('case-studies')` returns an empty array; build warning about `.mdx` extension.

### Pitfall 2: Image Helper Signature Confusion
**What goes wrong:** `image()` is imported from `astro/zod` at the top of the file and the schema function is written as `schema: z.object(...)` without a callback. This causes a type error because `image()` must be accessed from the schema callback argument.
**Why it happens:** The schema callback `({ image }) => z.object(...)` is the Astro-specific wrapper pattern — it provides an `image()` function that knows the content collection's base directory for path resolution.
**How to avoid:** Always write `schema: ({ image }) => z.object({ thumbnail: image(), ... })` — `image` comes from the destructured argument, not from a separate import.
**Warning signs:** TypeScript error on `image()` call; `thumbnail` value is a raw string instead of a resolved `ImageMetadata` object at runtime.

### Pitfall 3: Wrong Image Path in MDX Imports
**What goes wrong:** Images fail to import or are served from `public/` without optimization.
**Why it happens:** Relative paths in MDX are relative to the `.mdx` file's location. From `src/content/case-studies/orbital-concierge.mdx`, the path to `src/assets/` is `../../assets/...`.
**How to avoid:** Test one image import with `import` + `<Image>` before writing all ten. Confirm the file appears optimized in `dist/` (as `.webp`).
**Warning signs:** 404 on image in dev; image present but served as `.png` not `.webp` in production.

### Pitfall 4: Static Page Conflict
**What goes wrong:** Both `src/pages/work/orbital-concierge.astro` AND `src/pages/work/[...id].astro` exist, causing a route conflict.
**Why it happens:** Static routes take priority over dynamic routes in Astro, so the placeholder page silently wins.
**How to avoid:** Delete or rename `orbital-concierge.astro` before adding the `[...id].astro` dynamic route.
**Warning signs:** Case study renders the placeholder ("Case study placeholder.") instead of the MDX content.

### Pitfall 5: GIF Asset Missing
**What goes wrong:** The asset checklist in the vault notes the gameplay GIF is not yet exported (`[ ] GIF: core gameplay loop`).
**Why it happens:** The GIF requires a screen recording from the Godot project — it cannot be generated automatically.
**How to avoid:** Either (a) omit the GIF section from the MDX and add it in a later patch, or (b) flag it as a `TODO` comment in the MDX file. Do not use a broken `<Image>` import for a missing file. The planner should not block Phase 3 completion on the GIF.
**Warning signs:** Build error on a missing file import in MDX.

### Pitfall 6: `getCollection()` Inside a Layout
**What goes wrong:** `CaseStudyLayout` calls `getCollection()` to compute prev/next, but the call runs on every render and the sorted order is computed redundantly.
**Why it happens:** Natural reflex to put all case study logic in the layout.
**How to avoid:** Compute `prev` and `next` in the route file (`[...id].astro`) using the already-fetched `getCollection()` result from `getStaticPaths()`, and pass them as props to `CaseStudyLayout`.

---

## Code Examples

### `src/content.config.ts` — Full Schema
```typescript
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    oneliner: z.string(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()),
    category: z.enum(['Personal', 'Professional', 'Academic']),
    tier: z.number().int().min(1).max(3),
    thumbnail: image(),
    tags: z.array(z.string()),
  }),
});

export const collections = { 'case-studies': caseStudies };
```

### `astro.config.mjs` — After `npx astro add mdx`
```javascript
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://adampalencar.netlify.app',
  integrations: [icon(), mdx()],
  fonts: [
    // ... fonts unchanged
  ],
});
```

### `orbital-concierge.mdx` Frontmatter Structure
```mdx
---
title: Orbital Concierge
oneliner: "I put four competing systems on one screen with no scrolling, no tabs, and no hidden panels."
role: UI/UX Designer, Developer
timeline: 2025 to 2026
tools:
  - Godot 4.5
  - GDScript
  - Figma
category: Personal
tier: 1
thumbnail: ../../assets/case-studies/orbital-concierge/hero.png
tags:
  - game-ui
  - godot
  - puzzle
---
```

### Prev/Next Navigation Sort (in `[...id].astro`)
```typescript
const allStudies = await getCollection('case-studies');
const sorted = allStudies.sort((a, b) =>
  a.data.tier !== b.data.tier
    ? a.data.tier - b.data.tier
    : a.id.localeCompare(b.id)
);
const idx = sorted.findIndex(s => s.id === entry.id);
const prev = idx > 0 ? sorted[idx - 1] : undefined;
const next = idx < sorted.length - 1 ? sorted[idx + 1] : undefined;
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Legacy `content/config.ts` with `defineCollection` and type-only schema | Content Layer API with `loader: glob()` in `content.config.ts` | Astro v5 (Dec 2024), enforced in v6 | All collections MUST use a loader. The old API throws errors in v6. |
| `import.meta.glob()` for manual content loading | `getCollection()` from `astro:content` | Astro v2+ | Type-safe, schema-validated, no manual indexing. |
| `<ViewTransitions />` component | `<ClientRouter />` from `astro:transitions` | Astro v5 (Dec 2024) | Already implemented in Phase 2. No action needed. |

**Deprecated / outdated in this project context:**
- `content/config.ts` path (old): Must use `src/content.config.ts` (note: at `src/` level, not inside a `content/` folder) — Astro 6 requirement.
- `Astro.glob()`: Removed in Astro v5. Do not use.

---

## Asset Inventory

### Screenshots Ready to Copy
All 10 production screenshots exist at:
`C:/Users/mzbir/Desktop/Brain/Personal/02 - Projects/Portfolio Website/Case Studies/Assets/Orbital Concierge/final/`

Files confirmed present:
- `hero.png` — Level 22, all four systems active
- `gameplay.png` — Level 17, all four passenger types
- `spotlight-1-status-manifest.png` — Left panel callout
- `spotlight-2-elevator-shaft.png` — Center shaft callout
- `spotlight-3-game-board.png` — Right side callout
- `design-system-card.png` — Typography and palette system
- `critical-state.png` — Red border + warning triangle state
- `results-screen.png` — Delivery breakdown, 2 stars
- `scoring-guide-comparison.png` — Before/after scoring guide
- `cross-highlighting.png` — Manifest hover state

**GIF missing:** The gameplay loop GIF is not yet exported (requires screen recording from the Godot project). The MDX body should include a `{/* TODO: GIF — core gameplay loop, 5-10s */}` comment placeholder. Phase 3 must not block on it.

**Action required:** Copy all PNG files into `src/assets/case-studies/orbital-concierge/` during plan execution. Do not link from the vault path — assets must be inside the Astro project.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | Yes | v24.13.1 | |
| `@astrojs/mdx` | CONT-05 | Not installed (needs `npx astro add mdx`) | 5.0.3 available | None — required |
| Screenshot assets | CONT-04 | Yes (in vault, need copying) | | |
| Gameplay GIF | CONT-04 | No | | Placeholder comment in MDX, ship without it |

**Missing with no fallback:**
- `@astrojs/mdx` must be installed before any MDX files are authored. First task in Wave 1.

**Missing with fallback:**
- Gameplay GIF: not a blocker. Omit from MDX with a `{/* TODO */}` comment.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — visual verification only (matching prior phases) |
| Config file | None |
| Quick run command | `npm run dev` — browser inspection |
| Full suite command | `npm run build` — zero build errors is the gate |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | Exists? |
|--------|----------|-----------|-------------------|---------|
| CONT-01 | `getCollection('case-studies')` returns Orbital Concierge with correct typed fields | smoke | `npm run build` (Zod throws on schema error) | Wave 0 setup |
| CONT-02 | `/work/orbital-concierge` renders Minto Pyramid sections in order | manual visual | `npm run dev` | Wave 0 setup |
| CONT-03 | Prev/next nav absent when only one case study, present when two exist | manual visual | `npm run dev` | Wave 0 setup |
| CONT-04 | All 10 screenshots load as WebP, alt text present | manual visual + build | `npm run build` | Wave 0 setup |
| CONT-05 | Screenshot in `dist/` output has `.webp` extension, not `.png` | build artifact check | `npm run build && ls dist/_astro/*.webp` | Wave 0 setup |

### Sampling Rate
- **Per task:** `npm run dev` — visual inspection in browser
- **Per wave:** `npm run build` — zero errors required
- **Phase gate:** `npm run build` green + visual verification at desktop, tablet, mobile breakpoints

### Wave 0 Gaps
- [ ] No test framework needed — `npm run build` is the automated gate
- [ ] No test files needed for this phase — schema validation is handled by Zod at build time

---

## Open Questions

1. **CTA section pattern**
   - What we know: Minto Pyramid requires a CTA at the bottom of each case study. The vault case study ends with "Next: another playtest round..." which is internal project status, not a portfolio CTA.
   - What's unclear: Should the CTA be hardcoded in `CaseStudyLayout.astro` (e.g., "View next project" + contact strip) or authored in the MDX body?
   - Recommendation: Put the CTA in `CaseStudyLayout` as a structural element after the `<slot />` — it's the same on every case study. The MDX body ends at Reflection. This gives the planner a clean boundary: layout owns the frame (hero + meta + prev/next + CTA), MDX owns the body copy (sections 2-7).

2. **Dynamic route file name: `[id].astro` vs `[...id].astro`**
   - What we know: Astro `glob()` loader generates entry IDs from the filename (e.g., `orbital-concierge.mdx` becomes `orbital-concierge`). Both route patterns generate `/work/orbital-concierge`.
   - What's unclear: No nested folder structure planned for case studies in v1.
   - Recommendation: Use `[id].astro` (not rest spread) since case study slugs are flat. Simpler URL parameter access: `Astro.params.id`.

3. **Sidebar `navItems` update**
   - What we know: Sidebar.astro currently has `children` hardcoded with `{ label: 'Orbital Concierge', href: '/work/orbital-concierge' }`. As more case studies are added, this becomes a maintenance problem.
   - What's unclear: Phase 4 (Pages) will build the full Work page and project cards. Should the sidebar pull from `getCollection()` in Phase 3 to be future-proof?
   - Recommendation: Keep the sidebar hardcoded for Phase 3 — it already has the correct entry. Dynamic sidebar population from `getCollection()` can be deferred to Phase 4 when all projects are added. Avoid scope creep.

---

## Sources

### Primary (HIGH confidence)
- [Astro Content Layer API docs](https://docs.astro.build/en/guides/content-collections/) — `defineCollection`, `glob()`, schema with `image()` helper, `getCollection()`, `render()`, `getStaticPaths()` patterns verified
- [Astro images docs](https://docs.astro.build/en/guides/images/) — MDX image imports, `<Image>` component, `image()` Zod helper pattern verified
- [Astro MDX integration docs](https://docs.astro.build/en/guides/integrations-guide/mdx/) — install command, integration config, MDX + content collections verified
- Project `package.json` — Astro 6.1.5 confirmed installed
- `npm view @astrojs/mdx version` — 5.0.3 confirmed 2026-04-11
- `src/content.config.ts` — does NOT exist yet (confirmed by filesystem scan)
- Orbital Concierge screenshot assets — all 10 PNGs confirmed present in vault at `Brain/Personal/02 - Projects/Portfolio Website/Case Studies/Assets/Orbital Concierge/final/`
- Vault case study note (`Brain/Personal/02 - Projects/Portfolio Website/Case Studies/Orbital Concierge.md`) — full content read, all 7 Minto sections confirmed present

### Secondary (MEDIUM confidence)
- STATE.md locked decisions — MDX over plain Markdown locked; `astro:page-load` script pattern locked

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Astro 6 docs verified, package versions confirmed against npm registry
- Architecture patterns: HIGH — official Astro docs patterns, cross-referenced with existing project structure
- Pitfalls: HIGH — pitfalls are either confirmed from official docs or directly observable from current codebase state
- Asset inventory: HIGH — filesystem confirmed

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (Astro 6.x is stable; Content Layer API unlikely to change in 30 days)
