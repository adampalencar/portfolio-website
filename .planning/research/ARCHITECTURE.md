# Architecture Patterns: Astro v5 Portfolio Site

**Project:** Portfolio Website (Adam Palencar / "The Field Manual")
**Researched:** 2026-04-11
**Confidence:** HIGH (official Astro docs + verified patterns)

---

## Recommended Architecture

A static Astro v5 site with:
- File-based routing in `src/pages/`
- Content Layer API for case studies (type-safe Markdown via `src/content.config.ts`)
- Layout components as the structural backbone (BaseLayout wraps all pages)
- Vanilla CSS global design system in `src/styles/`
- Zero client-side framework components (pure Astro components throughout)
- One interactive island: the dark mode toggle (inline `<script>` in BaseLayout, no framework needed)
- Astro's built-in `<Image>` / `<Picture>` for all image optimization
- `<ClientRouter>` from `astro:transitions` for View Transitions
- Static output to `dist/`, deployed to Netlify via Git push

---

## File Structure

```
portfolio-website/
├── public/
│   ├── fonts/              # Self-hosted Inter + JetBrains Mono WOFF2
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.astro          # Left nav: tree, dark mode toggle
│   │   │   ├── Footer.astro           # Dense info footer
│   │   │   └── MobileNav.astro        # Hamburger, tablet collapsed bar
│   │   ├── ui/
│   │   │   ├── ProjectCard.astro      # Tier 1 / 2 / 3 variants via props
│   │   │   ├── Icon.astro             # Pixelarticons wrapper (inline SVG)
│   │   │   ├── Tag.astro              # Monospace metadata chip
│   │   │   └── DarkModeToggle.astro   # Button + inline script (no framework)
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   └── ContactStrip.astro
│   │   └── case-study/
│   │       ├── CaseStudyHeader.astro  # Title, metadata, cover image
│   │       ├── CaseStudyNav.astro     # Prev/next project links
│   │       └── ContentSection.astro   # Section with optional number label
│   ├── content/
│   │   └── case-studies/             # Markdown files (one per project)
│   │       └── orbital-concierge.md
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML shell, head, ClientRouter, fonts
│   │   └── CaseStudyLayout.astro     # BaseLayout + case study shell
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── work.astro                # Project index (all tiers)
│   │   ├── about.astro               # Bio, experience, tools
│   │   ├── 404.astro                 # Custom 404
│   │   ├── accessibility.astro       # WCAG statement
│   │   └── work/
│   │       └── [slug].astro          # Dynamic case study route
│   ├── styles/
│   │   ├── global.css                # @layer base: reset, font-face, body defaults
│   │   ├── tokens.css                # All CSS custom properties (design tokens)
│   │   ├── typography.css            # Type scale, line heights, font stacks
│   │   ├── layout.css                # 12-col grid, spacing, breakpoint utilities
│   │   └── animations.css            # Keyframes, prefers-reduced-motion block
│   └── content.config.ts             # Content Layer API schema definition
├── astro.config.mjs
├── netlify.toml
└── tsconfig.json
```

**Rationale for key decisions:**
- `fonts/` in `public/` not `src/`: fonts are static assets that don't need processing
- `content/case-studies/` uses glob loader; adding a new case study is a new `.md` file only
- `components/layout/`, `components/ui/`, etc.: grouped by concern, not by framework type
- `components/home/` and `components/case-study/`: page-scoped components that aren't shared globally

---

## Component Boundaries

| Component | Responsibility | Receives | Communicates With |
|-----------|---------------|----------|-------------------|
| `BaseLayout.astro` | HTML shell, `<head>`, `<ClientRouter>`, font imports, grain overlay, dark mode class init | `title`, `description`, `ogImage` props | All pages (wraps everything) |
| `CaseStudyLayout.astro` | Extends BaseLayout with case study shell structure | Case study frontmatter | `BaseLayout`, `CaseStudyHeader`, `CaseStudyNav` |
| `Sidebar.astro` | Fixed left nav: logo, page links with Obsidian-style expand, dark mode toggle | Active route (from `Astro.url`) | `Icon.astro`, `DarkModeToggle.astro` |
| `MobileNav.astro` | Collapsed top bar (tablet) and hamburger drawer (mobile) | Same active route prop | `Icon.astro` |
| `Footer.astro` | Dense info strip: email, LinkedIn, resume, location, version | Static — no dynamic data | None |
| `ProjectCard.astro` | Card for work index and homepage. Three visual tiers | `tier`, `title`, `description`, `slug`, `coverImage`, `videoSrc` props | `<Image>` for cover, inline `<video>` for hover |
| `Icon.astro` | Renders a Pixelarticon by name as inline SVG | `name`, `size`, `label` | None (leaf node) |
| `DarkModeToggle.astro` | Button + inline `<script>` that toggles `.dark` class and writes localStorage | None | `localStorage`, `document.documentElement` |
| `Hero.astro` | Homepage hero section | Static copy props or hardcoded | None |
| `CaseStudyHeader.astro` | Project title, metadata row, cover image | Case study entry data | `<Image>`, `Tag.astro` |
| `CaseStudyNav.astro` | Prev/next navigation between case studies | Two adjacent entry slugs + titles | None |

**No component has two-way data flow.** Data flows down via props only. Interactivity (dark mode, sidebar expand) lives in inline `<script>` blocks within the component file, touching DOM directly. No shared state management layer is needed.

---

## Data Flow

```
content.config.ts
  └── defines CaseStudy collection (Zod schema)
        └── glob() loader reads src/content/case-studies/*.md

[slug].astro (page)
  ├── getCollection('case-studies')     → all entries (for prev/next)
  ├── getEntry('case-studies', slug)    → current entry (for content)
  └── entry.render()                   → compiled HTML body

work.astro (page)
  └── getCollection('case-studies')    → all entries (sorted, filtered by tier)

index.astro (page)
  └── getCollection('case-studies')    → top 3 featured entries
```

**Dark mode data flow:**
```
User clicks DarkModeToggle
  → inline script toggles document.documentElement.classList('dark')
  → writes 'theme' to localStorage
  → CSS var overrides activate via [data-theme="dark"] or .dark selector

BaseLayout <script> (runs on every page load)
  → reads localStorage('theme')
  → sets class before first paint (no flash)
```

**View Transitions flow:**
```
User clicks any <a> link
  → ClientRouter intercepts
  → fetches next page HTML
  → document.startViewTransition fires
  → elements with matching transition:name animate as shared elements
  → DOM swaps, new scripts run
  → Sidebar persists via transition:persist (no nav flicker)
```

---

## CSS Architecture

### Layer Structure

```css
/* tokens.css — imported first in BaseLayout */
:root {
  --color-bg:        #FAF9F6;
  --color-accent:    #1B7A3D;
  --color-text:      #1A1A1A;
  --font-display:    'Inter', sans-serif;
  --font-mono:       'JetBrains Mono', monospace;
  --space-base:      8px;
  --grid-cols:       12;
  /* ... full token set */
}

.dark {
  --color-bg:   #161614;
  --color-text: #E8E6E1;
  /* accent stays green — only bg/text invert */
}
```

```css
/* global.css — @layer base */
@layer reset, tokens, typography, layout, components, utilities;
/* Cascade layers prevent specificity wars across files */
```

### Responsive Strategy: Media Queries over Container Queries

**Use media queries** for the three defined breakpoints. The sidebar/content split is a page-level layout concern, not a component-level one. Container queries are valuable when a component is reused in multiple layout contexts with different widths — but `ProjectCard` at this scale only appears in two defined contexts (homepage 3-up, work index grid), so media queries are simpler and equally effective.

```css
/* layout.css breakpoints */
/* Mobile-first base, then enhance */
/* Desktop 1440px+: sidebar fixed left, content in remaining space */
/* Tablet 768-1199px: sidebar collapsed to top bar */
/* Mobile <375px: hamburger drawer */

@media (min-width: 768px) { ... }
@media (min-width: 1200px) { ... }
```

**Exception:** If `ProjectCard` ever appears in sidebar or panel contexts with unpredictable widths, migrate to container queries at that point. Add `container-type: inline-size` to the card's parent and use `@container` — but do not over-engineer now.

### Scoping

Astro component `<style>` blocks are locally scoped by default. Use these for component-specific overrides. Import `tokens.css` and `global.css` globally via `BaseLayout`. Never use `is:global` unless applying resets or third-party overrides.

---

## Content Collections: Case Study Schema

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title:        z.string(),
    description:  z.string(),
    tier:         z.enum(['1', '2', '3']),
    projectCode:  z.string(),          // e.g. "OC-001" for monospace metadata layer
    date:         z.coerce.date(),
    coverImage:   image(),             // astro:assets image reference — type-safe
    videoSrc:     z.string().optional(),
    tags:         z.array(z.string()),
    featured:     z.boolean().default(false),
  }),
});

export const collections = { caseStudies };
```

`image()` helper (from `schema: ({ image }) =>`) integrates with `astro:assets` — the cover image path is validated at build time and produces an optimized `ImageMetadata` object ready for `<Image>`.

---

## Image Pipeline

All case study images and project covers live in `src/` (not `public/`) to enable Astro's build-time optimization.

```astro
---
// In CaseStudyHeader.astro
import { Image, Picture } from 'astro:assets';
---

<!-- Cover image: single optimized format, fixed dimensions -->
<Image src={entry.data.coverImage} alt={entry.data.title} width={1200} height={675} />

<!-- Screenshots needing format fallback -->
<Picture
  src={screenshotImport}
  formats={['avif', 'webp']}
  alt="..."
/>
```

**Rules:**
- `src/assets/` for all images that go through the optimizer
- `public/` for favicons and files that must keep their exact filename/path
- Never put case study screenshots in `public/` — they won't be optimized
- `loading="lazy"` is Astro's default for non-hero images; set `loading="eager"` on the hero above the fold

---

## Component Islands Strategy

This project uses **zero UI framework islands** (no React, Vue, Svelte). Every interactive piece is handled with inline Astro `<script>` blocks, which Astro bundles and deduplicates automatically.

| Interactive Feature | Approach | Why Not an Island |
|--------------------|----------|-------------------|
| Dark mode toggle | Inline `<script>` in `DarkModeToggle.astro` | Reads/writes localStorage + one class toggle — no framework needed |
| Sidebar expand (Obsidian tree) | Inline `<script>` with `querySelectorAll` + classList | Pure DOM manipulation |
| Mobile hamburger menu | Inline `<script>` | Toggle visibility + aria-expanded |
| Hover-to-video on cards | CSS `video { opacity: 0 }` + `video:hover, :focus-within video { opacity: 1 }` | CSS handles it entirely — no JS needed at all |
| Scroll animations (fade-up) | CSS `@keyframes` + `IntersectionObserver` in a shared `animations.ts` | Standard Web API, no framework |

**If a true island becomes necessary** (e.g., a filterable project grid with complex state), add it as a plain `.astro` component with a `<script>` block before reaching for a framework. Only introduce `client:load` if vanilla JS becomes genuinely unmanageable.

---

## View Transitions Integration

`<ClientRouter>` lives in `BaseLayout.astro`. Key directives used:

```astro
<!-- Sidebar persists across navigations — no flicker -->
<Sidebar transition:persist />

<!-- Hero heading animates as shared element to case study title -->
<h1 transition:name={`project-title-${slug}`}>...</h1>
```

Fallback: Astro's View Transitions degrade gracefully in browsers without the View Transitions API (Firefox pre-130) — they fall back to an instant page swap. No polyfill needed.

---

## Build and Deploy Pipeline

```
astro.config.mjs:
  output: 'static'           (default — no adapter needed)
  image: { service: 'sharp' } (built-in, produces WebP/AVIF at build time)

netlify.toml:
  [build]
  command = "npm run build"
  publish = "dist"

  [[headers]]
  for = "/fonts/*"
  [headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
```

**Build output:** `dist/` contains fully static HTML/CSS/JS. Netlify serves it from CDN edge. Zero server-side runtime.

**Deploy trigger:** Git push to `main` → Netlify auto-builds. Preview deploys on PRs via Netlify's Git integration.

**No `@astrojs/netlify` adapter** is needed because output is static. The adapter is only required for SSR (server functions).

---

## Suggested Build Order (Dependency Chain)

Build from the bottom up — foundational layers must exist before components that consume them.

```
1. Design system (tokens.css, global.css, typography.css, layout.css)
   └── Everything else inherits from this. No components work without tokens.

2. BaseLayout.astro
   └── All pages depend on this shell.

3. Icon.astro + Tag.astro (leaf UI components)
   └── Used by Sidebar, ProjectCard, CaseStudyHeader — build before them.

4. Sidebar.astro + MobileNav.astro + Footer.astro
   └── BaseLayout slots these. Navigation must work before any page is testable.

5. content.config.ts (schema definition)
   └── [slug].astro and work.astro require this before they can query data.

6. CaseStudyLayout.astro + CaseStudyHeader.astro + CaseStudyNav.astro
   └── Required before the orbital-concierge.md content is renderable.

7. Case study Markdown content (orbital-concierge.md)
   └── Depends on schema + layout being correct.

8. ProjectCard.astro
   └── Used on homepage and work index — build once card data shape is known.

9. Homepage sections (Hero, FeaturedProjects, ContactStrip)
   └── Depend on ProjectCard and design system.

10. work.astro, about.astro, 404.astro, accessibility.astro
    └── Final pages — all infrastructure exists at this point.

11. DarkModeToggle + animations (inline scripts, keyframes)
    └── Polish layer — add after core structure is verified.

12. View Transitions, hover-to-video, scroll animations
    └── Progressive enhancement — applied last, tested for prefers-reduced-motion.
```

---

## Scalability Considerations

| Concern | Now (1 case study) | Later (5+ case studies) |
|---------|-------------------|------------------------|
| Content management | Single MD file, edit directly | Still single MD files — no CMS needed up to ~20 entries |
| Build time | Negligible | Astro v5 Content Layer builds 5x faster than v4 for Markdown |
| Image volume | ~10 screenshots per case study | `src/assets/case-studies/[slug]/` subfolder pattern scales without changes |
| Routing | Static `[slug].astro` with `getStaticPaths` | Same pattern — each new MD file generates a new static route automatically |
| Filtering/sorting work index | Client-side array sort (fast enough) | Still fine up to ~50 projects; add search only if needed |

---

## Gaps and Open Questions

- **Sidebar Obsidian-tree expand behavior**: The inline script approach for this is straightforward, but exact animation (slide-down vs. instant reveal) needs decision during Phase 2 implementation. Recommend CSS `grid-template-rows: 0fr → 1fr` transition, which is now broadly supported.
- **Grain texture implementation**: SVG filter vs. PNG overlay. SVG filter (`feTurbulence`) is pure CSS and scales infinitely but can cause repaint on scroll. A fixed-position PNG overlay with `pointer-events: none` is simpler and performs better. Recommend PNG overlay.
- **Hover-to-video**: Whether video autoplay works without sound on mobile Safari in 2026 needs testing during implementation. Provide a static cover image fallback for cases where video cannot autoplay.

---

## Sources

- [Astro v5 Project Structure](https://docs.astro.build/en/basics/project-structure/) — HIGH confidence
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence
- [Astro View Transitions / ClientRouter](https://docs.astro.build/en/guides/view-transitions/) — HIGH confidence
- [Astro Images](https://docs.astro.build/en/guides/images/) — HIGH confidence
- [Deploy to Netlify](https://docs.astro.build/en/guides/deploy/netlify/) — HIGH confidence
- [Astro Styles and CSS](https://docs.astro.build/en/guides/styling/) — HIGH confidence
- [Astro 5.0 Release Notes](https://astro.build/blog/astro-5/) — HIGH confidence
