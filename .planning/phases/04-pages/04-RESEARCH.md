# Phase 4: Pages - Research

**Researched:** 2026-04-12
**Domain:** Astro 6 static pages, CSS grid, Netlify deployment
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Follow the Pencil mockup exactly at all 3 breakpoints (desktop 1440px, tablet 768px, mobile 375px). The .pen file is the design spec.
- **D-02:** Featured Tier 1 cards (Isles of Krom, Pipeline, Orbital Concierge) all appear on homepage. Krom and Pipeline link to the Work page section (scrolled to their position) since their case studies aren't built yet. Orbital Concierge links to its case study.
- **D-03:** Contact strip at bottom of homepage is the #contact nav anchor target. No separate contact page. Nav "Contact" scrolls to this strip on the homepage.
- **D-04:** Homepage copy comes from `Homepage Copy.md` in the vault. Use verbatim.
- **D-05:** Work page uses a mixed continuous grid (no section breaks between tiers). Card size varies by tier: T1 large, T2 standard, T3 small thumbnail. Cards flow together without tier labels.
- **D-06:** Card content: thumbnail + title + oneliner + category tag. No tools list on cards.
- **D-07:** Projects without built case studies get minimal placeholder pages (thumbnail + oneliner + "Full case study coming soon"). All cards link somewhere.
- **D-08:** Skip hover-to-video entirely for Phase 4. Static thumbnail cards only. Video hover mechanism deferred to a polish phase.
- **D-09:** Card aspect ratios: 16:9 or 4:3 consistent across the grid (CARD-03). Claude decides which fits best with the field manual identity.
- **D-10:** About page copy comes from `About Page Copy.md` in the vault. Use verbatim.
- **D-11:** Experience section uses a vertical timeline layout with dots/lines connecting entries chronologically.
- **D-12:** Tools section uses an icon grid with tool logos/icons. Icons need to be sourced for each tool (Figma, Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Pro Tools, FL Studio, FMOD, HTML, CSS, Python, Godot, Unreal Engine 5, Miro, FigJam).
- **D-13:** Photo placeholder for About hero (styled block with initials or silhouette). Real photo added later.
- **D-14:** 404 page uses dry/witty tone matching the field manual identity. Something like "The elevator doesn't stop at this floor." with navigation back to Home and Work.
- **D-15:** Accessibility statement is a standard WCAG 2.2 AA conformance template: conformance level, known limitations, contact for accessibility issues. One page, straightforward.
- **D-16:** Netlify deploy set up from scratch in this phase: create netlify.toml, connect repo, push first successful build to a live URL.

### Claude's Discretion

- Card aspect ratio choice (16:9 vs 4:3)
- Mixed grid column layout and responsive behavior
- Exact 404 copy (within dry/witty constraint)
- Placeholder page layout for projects without case studies
- Timeline CSS implementation (dots, lines, spacing)
- Tool icon sourcing approach (SVG icons, Devicon, Simple Icons, or similar)
- Netlify configuration details (build command, publish directory, redirects)
- Accessibility statement exact wording

### Deferred Ideas (OUT OF SCOPE)

- Hover-to-video on project cards (CARD-02) -- deferred to a polish phase when video assets are recorded
- Scroll-triggered animations (fade-up reveals, staggered content) -- belongs in Phase 5 or 6
- View Transitions between pages -- belongs in animation/polish phase
- Additional case studies beyond Orbital Concierge -- content added incrementally
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PAGE-01 | Homepage with hero (name, role, statement, CTA), 3 featured Tier 1 project cards, intro section, contact strip | Copy locked in vault. Cards query getCollection. Anchor #contact on contact strip. |
| PAGE-02 | Work page with Tier 1 (large), Tier 2 (standard), Tier 3 (small) project index | getCollection + tier sort. Single CSS grid, card sizes controlled by data-tier attribute. |
| PAGE-03 | About page with bio, experience, education, tools, personality section | Copy locked in vault. Timeline via CSS + semantic dl/time elements. Tool icons via Devicon CDN or Simple Icons SVG. |
| PAGE-04 | Contact section as anchor from nav (not separate page) with email, LinkedIn, resume download | #contact id on homepage strip. Nav href="/#contact" already in Sidebar navItems. |
| PAGE-05 | Accessibility statement page targeting WCAG 2.2 AA | New static page at /accessibility. Standard conformance template, no dynamic content. |
| PAGE-06 | Custom 404 page with personality and navigation back to homepage/work | src/pages/404.astro + public/_redirects for Netlify catch-all. |
| CARD-01 | Project cards with tier-based sizing: T1 large, T2 standard, T3 small thumbnail + description | Reusable ProjectCard.astro component. data-tier drives grid span and visual scale. |
| CARD-02 | Hover-to-video (DEFERRED per D-08) | Out of scope this phase. |
| CARD-03 | Consistent aspect ratios across project grid (16:9 or 4:3) | CSS aspect-ratio property on card image wrapper. Recommendation: 16:9 (see Architecture Patterns). |
</phase_requirements>

---

## Summary

Phase 4 converts three placeholder `.astro` pages into fully built pages, adds three new pages (404, accessibility statement, placeholder case study stubs), and performs the first Netlify deploy. The codebase is already well-established: `BaseLayout.astro` provides the shell, `tokens.css` has all design tokens, `getCollection('case-studies')` is the typed content API, and `[id].astro` provides the case study routing pattern.

The primary implementation challenges are: (1) the mixed-tier project grid on the Work page, where card size must vary within a single CSS grid without tier section breaks; (2) the tool icon grid on the About page, where real brand logos must be sourced and rendered consistently; and (3) the Netlify first-deploy configuration, which requires a `netlify.toml` and a `public/_redirects` file for the 404 fallback route.

All page copy is locked in vault files and must be used verbatim. The Pencil mockup is the design spec for the homepage. No new npm packages are required for this phase beyond what is already installed.

**Primary recommendation:** Build pages in dependency order -- ProjectCard component first (used by both homepage and work page), then homepage, then work page, then about, then utility pages (404, accessibility, placeholder stubs), then Netlify config and deploy verification.

---

## Standard Stack

### Core (already installed, no new installs needed)

| Library | Version | Purpose | Why |
|---------|---------|---------|------|
| Astro | 6.1.5 | Static page generation, Content Layer API | Already installed. `getCollection`, `render`, `<Image>` all available. |
| @astrojs/mdx | 5.0.3 | MDX support for case studies | Already installed. Required for `.mdx` content files. |
| astro-icon | 1.1.5 | SVG icon rendering via pixelarticons | Already installed. Used in Sidebar, pattern established. |
| pixelarticons | 2.0.2 | UI icons (nav, decorative) | Already installed. Do NOT use for tool logos -- use Devicon for brand icons. |

### Tool Icon Sourcing (Claude's Discretion)

**Recommendation: Simple Icons SVG files (self-hosted)**

Simple Icons (simpleicons.org) provides brand-accurate SVG icons for every tool in the About page list: Figma, Adobe suite, Pro Tools, FL Studio, HTML5, CSS3, Python, Godot, Unreal Engine, Miro. They are SVG files, MIT-licensed, and can be downloaded and placed in `src/assets/icons/tools/` for processing through Astro's asset pipeline.

**Devicon** (devicon.dev) is an alternative -- icon font or SVG, excellent for code/dev tools (HTML, CSS, Python, Godot) but weaker on creative/audio tools (Pro Tools, FL Studio, FMOD). Simple Icons covers the full list.

**FMOD caveat:** FMOD is a niche audio middleware. Simple Icons does not have a FMOD icon. Use the official FMOD logo SVG from fmod.com/assets, or render "FMOD" as a text label with monospace styling matching the field manual identity. This is acceptable for a "working knowledge" tool.

**Installation:** No npm package needed. Download SVGs manually into `src/assets/icons/tools/`. Import via `<img>` with Astro's `<Image>` for optimization, or inline as raw SVG.

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Devicon | CDN or npm | Dev-tool brand icons | Alternative to Simple Icons if tool coverage is better for a specific icon |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Simple Icons (self-hosted SVG) | Devicon CDN | Devicon loads from CDN (third-party request, conflicts with privacy constraint). Self-hosted SVG preferred. |
| Simple Icons (self-hosted SVG) | astro-icon with local SVGs | Both work. astro-icon with local SVGs in `src/assets/icons/tools/` is the cleaner pattern matching project conventions. |

**Installation:** No new packages. All required libraries are already installed.

---

## Architecture Patterns

### Recommended Project Structure (Phase 4 additions)

```
src/
├── pages/
│   ├── index.astro              # Homepage (replace placeholder)
│   ├── about.astro              # About page (replace placeholder)
│   ├── 404.astro                # Custom 404 (new)
│   ├── accessibility.astro      # Accessibility statement (new)
│   └── work/
│       ├── index.astro          # Work index with tiered grid (replace placeholder)
│       ├── [id].astro           # Already exists, handles case studies
│       └── [stub pages]        # Placeholder pages for Krom, Pipeline (new)
├── components/
│   ├── layout/                  # Existing (Sidebar, TopBar, etc.)
│   └── ui/
│       ├── ThemeToggle.astro    # Existing
│       └── ProjectCard.astro    # NEW -- reusable card component
├── assets/
│   ├── case-studies/            # Existing
│   │   ├── orbital-concierge/   # Existing
│   │   ├── krom/                # NEW (thumbnail placeholder for Krom card)
│   │   └── pipeline/            # NEW (thumbnail placeholder for Pipeline card)
│   └── icons/
│       └── tools/               # NEW -- Simple Icons SVGs for About page
└── styles/
    ├── tokens.css               # Existing
    ├── global.css               # Existing
    └── pages/                   # NEW css files per page (or inline per page)
        ├── home.css
        ├── work.css
        └── about.css
public/
├── textures/                    # Existing (grain.png)
├── _redirects                   # NEW -- Netlify 404 catch-all
└── resume/                      # NEW (or link to hosted PDF for resume download)
netlify.toml                     # NEW -- Netlify build config
```

### Pattern 1: ProjectCard Component

**What:** A reusable `ProjectCard.astro` component that renders a single project card. Accepts a case study `CollectionEntry` plus an optional `href` override for projects without built case studies.

**When to use:** Both the homepage featured cards and the Work page grid use this component. The tier controls visual size via a `data-tier` attribute on the card root element; CSS then applies different grid-column spans and image heights per tier.

```astro
---
// src/components/ui/ProjectCard.astro
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

interface Props {
  entry: CollectionEntry<'case-studies'>;
  href?: string; // Override link target (for placeholder pages)
  featured?: boolean; // Larger treatment on homepage
}

const { entry, href, featured = false } = Astro.props;
const { title, oneliner, thumbnail, category, tier } = entry.data;
const linkTarget = href ?? `/work/${entry.id}`;
---
<article class="project-card" data-tier={tier} data-featured={featured}>
  <a href={linkTarget} class="project-card__link">
    <div class="project-card__image-wrap">
      <Image
        src={thumbnail}
        alt={title}
        widths={[400, 800, 1200]}
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
      />
    </div>
    <div class="project-card__body">
      <span class="project-card__tag mono-label">{category}</span>
      <h3 class="project-card__title">{title}</h3>
      <p class="project-card__oneliner">{oneliner}</p>
    </div>
  </a>
</article>
```

**CSS for tier sizing (in work.css or scoped):**

```css
@layer components {
  /* Base card */
  .project-card__image-wrap {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--bg-secondary);
  }

  /* Work page grid: tier controls column span */
  .work-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-4);
  }

  .work-grid .project-card[data-tier="1"] { grid-column: span 8; }
  .work-grid .project-card[data-tier="2"] { grid-column: span 6; }
  .work-grid .project-card[data-tier="3"] { grid-column: span 4; }

  @media (max-width: 1199px) {
    .work-grid .project-card[data-tier="1"] { grid-column: span 12; }
    .work-grid .project-card[data-tier="2"] { grid-column: span 6; }
    .work-grid .project-card[data-tier="3"] { grid-column: span 6; }
  }

  @media (max-width: 767px) {
    .work-grid .project-card { grid-column: span 12; }
  }
}
```

### Pattern 2: Homepage with getCollection for Featured Cards

**What:** The homepage queries only Tier 1 entries from the content collection to render the featured cards. Order matches D-02: Krom, Pipeline, Orbital Concierge.

```astro
---
// src/pages/index.astro (excerpt)
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ui/ProjectCard.astro';

const allStudies = await getCollection('case-studies');
// Krom and Pipeline MDX stubs will be added in this phase
// Sort by tier then by explicit order (Krom=1, Pipeline=2, OC=3 via tags or sort key)
const tier1 = allStudies
  .filter(s => s.data.tier === 1)
  .sort((a, b) => a.id.localeCompare(b.id)); // or explicit order array
---
```

**Note:** Krom and Pipeline do not have MDX files yet. Two minimal MDX stubs must be created in `src/content/case-studies/` (krom.mdx, pipeline.mdx) with frontmatter only and a "coming soon" body. Their card links point to `src/pages/work/krom.astro` and `src/pages/work/pipeline.astro` (placeholder pages per D-07), NOT to the dynamic `[id].astro` route -- those pages render the full MDX, which would show an empty case study. Use the `href` prop override on ProjectCard.

**Alternative for ordering:** Add an `order` field to the content schema (optional: `z.number().optional()`) and sort by it. This avoids alphabetical brittleness as more projects are added. LOW priority for Phase 4 -- alphabetical works for three projects.

### Pattern 3: Work Page Tiered Grid (no section breaks)

**What:** A single CSS grid where all project cards render in tier order (T1 first, then T2, then T3) and card visual size is controlled by `data-tier` attribute CSS rules. No visible section labels between tiers (D-05).

```astro
---
const allStudies = await getCollection('case-studies');
const sorted = allStudies.sort((a, b) =>
  a.data.tier !== b.data.tier
    ? a.data.tier - b.data.tier
    : a.id.localeCompare(b.id)
);
---
<div class="work-grid">
  {sorted.map(entry => <ProjectCard entry={entry} />)}
</div>
```

### Pattern 4: About Page Timeline

**What:** A vertical timeline for the Experience section using semantic HTML and CSS pseudo-elements for the dot/line decorations.

```css
@layer components {
  .timeline {
    position: relative;
    padding-left: var(--space-6);
  }

  /* Vertical line */
  .timeline::before {
    content: '';
    position: absolute;
    left: 7px; /* center of dot */
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--border-visible);
  }

  .timeline__entry {
    position: relative;
    margin-bottom: var(--space-6);
  }

  /* Dot */
  .timeline__entry::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--space-6) + 3px);
    top: 6px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg-primary);
  }
}
```

**Semantic HTML:**

```html
<ol class="timeline" role="list">
  <li class="timeline__entry">
    <time class="mono-label" datetime="2025-06">2025.06 - 2025.12</time>
    <h3 class="timeline__role">UI/UX Designer</h3>
    <p class="timeline__company">Floppy Goat Inc. (Montreal, Remote)</p>
    <p class="timeline__description">...</p>
  </li>
</ol>
```

### Pattern 5: Netlify Configuration

**What:** `netlify.toml` at project root defines build command, publish directory. `public/_redirects` handles the 404 catch-all.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

```
# public/_redirects
/* /404 404
```

**Important:** The `site` URL in `astro.config.mjs` is already set to `https://adampalencar.netlify.app`. If the Netlify site is given a different subdomain on first connect, update `astro.config.mjs` to match. This affects canonical URLs and OG tags.

### Pattern 6: Contact Strip as Anchor (PAGE-04)

**What:** The homepage contact strip gets `id="contact"` on its section element. The Nav "Contact" link already has `href="/#contact"` in Sidebar.astro's navItems. No new nav changes needed for the contact anchor.

```html
<section id="contact" class="contact-strip">
  ...
</section>
```

**Cross-page anchor behavior:** When a user clicks "Contact" from the Work or About page, the browser navigates to `/#contact`. With Astro ClientRouter (View Transitions) active, this should work, but there is a known nuance: View Transitions + same-page hash navigation can behave unexpectedly. The contact link navigates to a DIFFERENT page (homepage) with a hash, so the browser will load the homepage and scroll to the anchor. This is standard behavior and will work correctly.

### Pattern 7: 404 Page

**What:** `src/pages/404.astro` is automatically recognized by Astro as the 404 template for static builds. Netlify serves it on unmatched routes when `public/_redirects` contains `/* /404 404`.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="404 - Page Not Found">
  <section class="error-page">
    <span class="mono-label">ERROR 404</span>
    <h1>The elevator doesn't stop at this floor.</h1>
    <p>Whatever you were looking for, it's not between these walls.</p>
    <nav>
      <a href="/">Return to Lobby</a>
      <a href="/work">View the Work</a>
    </nav>
  </section>
</BaseLayout>
```

### Pattern 8: Placeholder Case Study Pages (D-07)

**What:** For Krom and Pipeline (no full case studies yet), two approaches exist:

**Option A (recommended):** Create minimal MDX stubs in `src/content/case-studies/` (krom.mdx, pipeline.mdx) with full frontmatter (so they appear in `getCollection` queries) and a minimal body ("Full case study coming soon"). Their cards on the Work page use the standard `[id].astro` route. The CaseStudyLayout renders the hero and coming-soon message.

**Option B:** Separate static placeholder pages at `src/pages/work/krom.astro` and `src/pages/work/pipeline.astro`, with a custom layout. ProjectCard `href` prop overrides the link target.

**Option A is preferred** because: (a) it uses the existing content infrastructure without creating parallel routing; (b) the CaseStudyLayout already renders the hero/thumbnail correctly; (c) adding the full case study later requires only editing the MDX file, not migrating a static page.

**Krom thumbnail:** No thumbnail asset exists yet for Krom or Pipeline. A placeholder image (solid color PNG, correct aspect ratio) or a project screenshot must be placed in `src/assets/case-studies/krom/` and `src/assets/case-studies/pipeline/`. The content schema requires `thumbnail: image()` -- omitting it will fail the build.

### Anti-Patterns to Avoid

- **Querying getCollection in layout files:** Only query in page files, pass data as props to components. Layouts should not contain content queries.
- **Using `:global()` in page-level CSS for images:** The established pattern (from STATE.md) is to use the `img` selector directly in regular CSS files, not `:global(img)` which is scoped-only in Astro.
- **addEventListener per element for cards:** Use event delegation (one listener on a parent). Already established in Sidebar.astro and ThemeToggle.astro.
- **Hardcoded copy in .astro files:** All copy comes from vault files. Implement verbatim -- no paraphrasing or "improving" the copy.
- **Inline styles or raw values:** All visual properties must use design tokens from `tokens.css`. No raw hex codes or pixel values in component styles.
- **Separate section headings for tiers on Work page:** D-05 explicitly prohibits tier labels or section breaks. Cards flow continuously.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Card image lazy loading | Custom IntersectionObserver scroll loader | `<Image>` from `astro:assets` (loading="lazy" is default) | Astro handles lazy loading, WebP conversion, srcset automatically |
| Tool icon rendering | Custom SVG embed system | Simple Icons SVGs imported via `<Image>` or `astro-icon` with local files | Already have an icon rendering pattern in the project |
| Content queries | Custom file system reading | `getCollection('case-studies')` | Already established, typed, validated by Zod schema |
| 404 routing on Netlify | Custom redirect middleware | `public/_redirects` with `/* /404 404` | Netlify's native static redirect syntax, zero config |
| Aspect ratio enforcement | Padding-top hack (legacy) | `aspect-ratio` CSS property | Baseline 2021 browser support, all modern browsers |
| Timeline decorations | SVG timeline component | CSS `::before` pseudo-elements on `<ol>` list items | No JS needed, simpler, more maintainable |
| Dark mode on new pages | Re-implementing theme detection | Inherit from `BaseLayout.astro` (already handles data-theme swap) | All pages use BaseLayout, dark mode works for free |

**Key insight:** This phase is almost entirely content and layout work on top of a complete infrastructure. The hardest decisions are layout/design (handled by the Pencil mockup) and content sourcing (handled by vault copy files). The implementation complexity is LOW once the ProjectCard component is built.

---

## Common Pitfalls

### Pitfall 1: Missing Thumbnails for Krom and Pipeline

**What goes wrong:** Build fails with "Image not found" or schema validation error when `thumbnail: image()` field is missing or points to a non-existent file in krom.mdx and pipeline.mdx.

**Why it happens:** The content schema requires `thumbnail` as a non-optional `image()` field. Creating the MDX stubs without placing a thumbnail asset in `src/assets/` will fail `astro build`.

**How to avoid:** Before creating krom.mdx and pipeline.mdx, create placeholder thumbnail directories and drop a placeholder PNG (even a 1x1 solid color) at the expected paths. Use a consistent naming convention: `src/assets/case-studies/krom/hero.png` and `src/assets/case-studies/pipeline/hero.png`.

**Warning signs:** `Error: Could not find image` during `astro build` or `astro dev`.

### Pitfall 2: Contact Anchor Scroll on Netlify (SPA Navigation)

**What goes wrong:** Clicking "Contact" from Work or About page navigates to `/#contact` but the page does not scroll to the contact strip -- it lands at the top of the homepage.

**Why it happens:** Astro ClientRouter (View Transitions) intercepts navigation. Hash-based anchor scrolling after a page transition can be missed if the browser completes the transition before the DOM is ready to scroll.

**How to avoid:** After the homepage is built, test the `/#contact` anchor from all other pages. If scrolling fails, add a small `astro:page-load` handler that checks `window.location.hash` and manually calls `document.querySelector(hash)?.scrollIntoView()`. This pattern is already established in the codebase (scripts use `astro:page-load`).

**Warning signs:** Contact strip does not scroll into view when navigating from non-home pages.

### Pitfall 3: Work Page Grid Breaks at Irregular Tile Combinations

**What goes wrong:** The mixed-tier 12-column grid produces orphaned large cards or awkward whitespace when Tier 1 cards (span 8) are followed immediately by Tier 2 cards (span 6), leaving a 4-column gap that no card fills.

**Why it happens:** CSS grid auto-placement fills left-to-right. A span-8 card followed by a span-6 card won't fit in the remaining 4 columns of that row, so the span-6 card moves to the next row, leaving a visible hole.

**How to avoid:** Use `grid-auto-flow: dense` on the `.work-grid` to allow the grid to backfill holes. Or structure the content so T1 cards use `span 12` (full width) and T2 uses `span 6` (2-up), and T3 uses `span 4` (3-up). Full-width T1 cards also look more premium and match the "large cards for Tier 1" intent better than a partial-width split.

**Recommended grid sizes:**
- T1: `grid-column: span 12` (full width, large hero treatment)
- T2: `grid-column: span 6` (two-up)
- T3: `grid-column: span 4` (three-up)

This avoids all orphan/hole problems without `grid-auto-flow: dense`.

**Warning signs:** Unexpected blank areas in the grid on desktop at specific project counts.

### Pitfall 4: Netlify Build Node Version Mismatch

**What goes wrong:** Netlify uses Node 18 by default, which is dropped by Astro 6. Build fails with a Node version error.

**Why it happens:** Netlify's default build image does not match Astro 6's minimum (Node 22).

**How to avoid:** Set `NODE_VERSION = "22"` in `netlify.toml` under `[build.environment]`. This is included in Pattern 5 above.

**Warning signs:** Build log shows "Astro requires Node.js 22 or higher" on Netlify.

### Pitfall 5: `site` URL in astro.config.mjs Must Match Netlify Subdomain

**What goes wrong:** Canonical URLs and OG `og:url` tags reference the wrong domain if `site` in `astro.config.mjs` does not match the actual Netlify subdomain assigned at deploy.

**Why it happens:** The current `site` value is `https://adampalencar.netlify.app`. If the Netlify site is created with a different name, this will be wrong.

**How to avoid:** After creating the Netlify site, verify the subdomain matches what's in `astro.config.mjs`. Update if different. This affects SEO (Phase 6) but should be correct from first deploy.

### Pitfall 6: Sidebar navItems Not Updated for New Pages

**What goes wrong:** New pages (accessibility, 404) are reachable by URL but not listed in sidebar nav. The accessibility page should probably be reachable from the footer rather than the sidebar.

**Why it happens:** `Sidebar.astro` hardcodes the navItems array. New pages must be explicitly added, or deliberately excluded.

**How to avoid:** Decide routing for each new page upfront:
- `/accessibility` -- link from Footer (already has the right area for utility links), not sidebar nav
- `/404` -- never linked directly, only shown on unmatched routes
- Placeholder stub pages (`/work/krom`, `/work/pipeline`) -- these ARE rendered by `[id].astro` if MDX stubs exist, so they appear under Work in the sidebar automatically when the Work folder is expanded (add to sidebar children array)

### Pitfall 7: Card Aspect Ratio on Images Without Correct Dimensions

**What goes wrong:** `<Image>` from `astro:assets` requires explicit `width` and `height` props OR the source must be a local import with known dimensions. Omitting these causes layout shift warnings or build errors.

**Why it happens:** Astro's `<Image>` component needs dimensions to pre-calculate space and prevent CLS. Local imports (already the pattern in this project) automatically provide dimensions via Vite's image import. Remote images require explicit dimensions.

**How to avoid:** Always import thumbnails from `astro:assets` as local imports (the pattern established in `orbital-concierge.mdx`). Never use remote image URLs for thumbnails. The `thumbnail: image()` schema field handles this correctly.

---

## Card Aspect Ratio Decision (Claude's Discretion)

**Recommendation: 16:9**

Rationale:
- Game UI screenshots (Orbital Concierge, Isles of Krom) are designed for widescreen game resolutions (16:9 native). Forcing them into 4:3 would crop critical UI elements or add letterboxing.
- The "field manual" identity is horizontal and wide -- wide cards read more like a document spread than a portrait tile.
- 16:9 allows T1 cards (full-width on desktop) to be generous in height without becoming disproportionately tall.
- 4:3 is more common for apps/product design (Pipeline) but 16:9 works at any content category -- the game work should set the ratio, since it's the differentiating content.

Apply `aspect-ratio: 16 / 9` to the `.project-card__image-wrap` element. Object-fit: cover ensures no letterboxing regardless of source image dimensions.

---

## Code Examples

### Homepage Hero Structure

```astro
<!-- src/pages/index.astro (hero section) -->
<section class="hero">
  <p class="hero__eyebrow mono-label">UI/UX Designer, Toronto</p>
  <h1 class="hero__name">
    <span class="hero__name-first">Adam</span>
    <span class="hero__name-last">Palencar</span>
  </h1>
  <p class="hero__statement">
    I design interfaces that earn their complexity. Games, tools, and interactive
    products where clarity and craft have to coexist.
  </p>
  <a href="/work" class="hero__cta btn">View my work</a>
</section>
```

Note: "Adam" should render in `--accent` green per Visual Direction spec ("Adam" in hero name). Apply via `.hero__name-first { color: var(--accent); }`.

### getCollection Query for Work Page (Sorted by Tier)

```astro
---
import { getCollection } from 'astro:content';
const allStudies = await getCollection('case-studies');
const sorted = allStudies.sort((a, b) =>
  a.data.tier !== b.data.tier
    ? a.data.tier - b.data.tier
    : a.id.localeCompare(b.id)
);
---
```

### Netlify _redirects (Catch-All 404)

```
/* /404 404
```

Place this file at `public/_redirects`. Netlify processes `public/` as static assets.

### Accessibility Statement Page Structure

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Accessibility Statement - Adam Palencar"
  description="Accessibility conformance statement for adampalencar.com"
>
  <article class="prose-page">
    <header>
      <span class="mono-label">ACCESSIBILITY</span>
      <h1>Accessibility Statement</h1>
    </header>
    <section>
      <h2>Conformance Status</h2>
      <p>
        This site aims to conform to the Web Content Accessibility Guidelines
        (WCAG) 2.2 at Level AA. Partial conformance applies where some content
        does not yet fully meet all criteria.
      </p>
    </section>
    <section>
      <h2>Known Limitations</h2>
      <ul>
        <li>Some project thumbnail images may have incomplete alt text.</li>
        <li>Video assets (planned for a future phase) are not yet present.</li>
      </ul>
    </section>
    <section>
      <h2>Feedback and Contact</h2>
      <p>
        To report accessibility issues or request alternative formats, contact
        <a href="mailto:adampalencar25@gmail.com">adampalencar25@gmail.com</a>.
      </p>
    </section>
  </article>
</BaseLayout>
```

---

## Runtime State Inventory

Step 2.5: SKIPPED. This is a greenfield page-building phase, not a rename/refactor/migration.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js 22 | Astro 6 build | Yes | v24.13.1 | N/A |
| Netlify CLI | Local preview | No | -- | Use `astro preview` locally; deploy via git push + Netlify dashboard |
| Simple Icons SVGs | Tool icon grid | N/A (manual download) | 14.x | Text labels with monospace styling |
| Krom/Pipeline thumbnail assets | Card images | No (must be created) | -- | Create solid-color placeholder PNGs during Wave 0 |

**Missing dependencies with no fallback:**
- Krom and Pipeline thumbnail images -- the content schema requires `thumbnail: image()`. Placeholder PNGs must be created before case study stubs can be built.

**Missing dependencies with fallback:**
- Netlify CLI: not required. Local development uses `astro dev` and `astro preview`. First deploy can be done via Netlify dashboard git integration.
- FMOD icon: Simple Icons does not have FMOD. Use text label fallback.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None -- Astro static site, no test runner configured |
| Config file | None |
| Quick run command | `npm run build` (verifies all pages compile) |
| Full suite command | `npm run build && npm run preview` (then manual browser check) |

No automated test infrastructure exists in this project. Validation is build-success plus manual browser verification. This is appropriate for a static portfolio site where the primary failure modes are: build errors (caught by `astro build`), broken links (caught by visual inspection), and layout regressions (caught by browser checks at 3 breakpoints).

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PAGE-01 | Homepage renders with all sections | Build + manual | `npm run build` | ❌ Wave 0 (replace placeholder) |
| PAGE-02 | Work page shows all tiers | Build + manual | `npm run build` | ❌ Wave 0 (replace placeholder) |
| PAGE-03 | About page renders with all sections | Build + manual | `npm run build` | ❌ Wave 0 (replace placeholder) |
| PAGE-04 | #contact anchor scrolls correctly | Manual | Browser check | ❌ Wave 0 (homepage needed first) |
| PAGE-05 | Accessibility statement page loads | Build + manual | `npm run build` | ❌ Wave 0 (new page) |
| PAGE-06 | 404 page renders on unmatched routes | Build + Netlify | Deploy + manual | ❌ Wave 0 (new page) |
| CARD-01 | Cards show thumbnail, title, oneliner, tag | Build + manual | `npm run build` | ❌ Wave 0 (ProjectCard component) |
| CARD-02 | Deferred | N/A | N/A | N/A |
| CARD-03 | All thumbnails use 16:9 ratio | Manual | Browser check | ❌ Wave 0 (CSS on card component) |

### Sampling Rate

- **Per task commit:** `npm run build` (catches TypeScript errors, broken imports, schema mismatches)
- **Per wave merge:** `npm run build && npm run preview` + manual browser check at 3 breakpoints
- **Phase gate:** First Netlify deploy succeeds with zero build errors before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/components/ui/ProjectCard.astro` -- new component, must exist before homepage and work page tasks
- [ ] `src/assets/case-studies/krom/hero.png` -- placeholder thumbnail (blocks krom.mdx creation)
- [ ] `src/assets/case-studies/pipeline/hero.png` -- placeholder thumbnail (blocks pipeline.mdx creation)
- [ ] `netlify.toml` -- required for first Netlify deploy
- [ ] `public/_redirects` -- required for 404 catch-all on Netlify

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `padding-top: 56.25%` hack for 16:9 | `aspect-ratio: 16 / 9` | CSS 2021 (baseline) | Use `aspect-ratio`. No workaround needed. |
| `<ViewTransitions />` component name | `<ClientRouter />` | Astro 5 | Already used correctly in BaseLayout.astro |
| Legacy content collections API | Content Layer API with `glob()` loader | Astro 6 | Already used correctly in content.config.ts |
| MDX not required for case studies | Case studies are MDX (CONT-05 locked) | Phase 3 decision | `@astrojs/mdx` already installed and configured |

**Deprecated/outdated:**
- `<ViewTransitions />`: renamed to `<ClientRouter />` in Astro 5. Already handled correctly.
- `astro:content` with `defineCollection` using `type: 'content'`: replaced by loader-based API. Already handled correctly.

---

## Open Questions

1. **Pencil mockup access during implementation**
   - What we know: The .pen file is at `C:\Users\mzbir\Downloads\portfolio design\Portfolio Design System + Homepage.pen` and requires Pencil MCP tools to read.
   - What's unclear: The planner generating PLAN tasks cannot read the .pen file directly -- the executor agent will need Pencil MCP access to extract specific measurements (padding values, font sizes, exact column widths).
   - Recommendation: Plan tasks should explicitly instruct the executor to read the Pencil file using `batch_get` before implementing each section. The CONTEXT.md canonical refs already document this path.

2. **Tool icon licensing and visual consistency**
   - What we know: Simple Icons are MIT-licensed and cover most tools. FMOD has no entry.
   - What's unclear: Whether monochrome Simple Icons match the field manual aesthetic well, or if colored icons would be better given the project's warm palette.
   - Recommendation: Use monochrome (single-color) SVGs tinted with `currentColor` or a fixed neutral color (`--text-secondary`). This keeps the tool grid clean and consistent with the Swiss identity. Avoid full-color brand icons which would introduce uncontrolled color noise.

3. **Resume PDF asset**
   - What we know: Homepage copy and About page copy both reference "[Resume Download]" links. No resume PDF is present in the project assets.
   - What's unclear: Where the PDF will be hosted and what the URL should be.
   - Recommendation: Place a PDF at `public/resume/adam-palencar-resume.pdf` for self-hosting. If no PDF is ready during Phase 4, use a `#` placeholder with a `TODO` comment and document it as a known gap. The footer and contact strip should link there.

---

## Project Constraints (from CLAUDE.md)

Directives the planner must enforce:

| Directive | Impact on Phase 4 |
|-----------|-------------------|
| No React/Vue/Svelte | All components are `.astro` files only. No islands. |
| No GSAP | Animations deferred to Phase 5. Phase 4 is static layout only. |
| Vanilla CSS only | All styles in `.css` files or `<style>` blocks using BEM + `@layer`. No utility classes. |
| Design tokens only | No raw hex, px, or em values in component styles. Use `--space-*`, `--size-*`, etc. |
| `<Image>` for all images | Use Astro's built-in `<Image>` component, never bare `<img>` tags (except for SVG icons inlined). |
| `astro:page-load` for scripts | Any JS added this phase must listen on `document.addEventListener('astro:page-load', ...)`, not `DOMContentLoaded`. |
| Event delegation | No per-element `addEventListener`. Bind once on a parent container. |
| BEM naming | Component class names follow BEM: `.project-card`, `.project-card__image-wrap`, `.project-card--featured`. |
| `@layer components` | All component CSS goes inside `@layer components { }`. |
| No MDX for plain content pages | About, homepage, 404, accessibility are `.astro` files with inline content. Only case studies use MDX. |
| Self-hosted fonts only | No CDN font requests. Fonts already configured in `astro.config.mjs`. |
| No tracking scripts | No analytics in Phase 4 build. |

---

## Sources

### Primary (HIGH confidence)

- Direct file reads: `src/layouts/BaseLayout.astro`, `src/content.config.ts`, `src/components/layout/Sidebar.astro`, `src/styles/tokens.css` -- all patterns confirmed from actual project code
- `astro.config.mjs` -- confirmed `output: 'static'`, `site` URL, installed integrations
- `package.json` -- confirmed installed dependencies and versions
- Vault copy files: `Homepage Copy.md`, `About Page Copy.md` -- finalized content read directly
- `Visual Direction and References.md` -- locked design spec read directly
- `04-CONTEXT.md` -- locked decisions read directly

### Secondary (MEDIUM confidence)

- Astro static pages 404 pattern: Astro docs specify `src/pages/404.astro` is recognized automatically for static builds
- Netlify `_redirects` for 404: Netlify official docs define `/* /404 404` as the catch-all pattern
- Simple Icons availability: simpleicons.org covers all tools in D-12 except FMOD (verified by memory of library coverage as of 2025)

### Tertiary (LOW confidence)

- FMOD icon absence from Simple Icons: based on knowledge of the library's focus on software tools (not audio middleware). Should be verified at simpleicons.org before implementation.
- ClientRouter + hash anchor scrolling behavior: behavior described is consistent with how Astro View Transitions handles cross-page hash navigation, but should be tested on first deploy.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries confirmed from package.json and existing code
- Architecture patterns: HIGH -- patterns derived from existing project code (Sidebar, CaseStudyLayout, [id].astro)
- Pitfalls: HIGH for build-related (thumbnail schema, Node version), MEDIUM for runtime behavior (anchor scroll, grid layout)
- Copy content: HIGH -- read verbatim from vault source files

**Research date:** 2026-04-12
**Valid until:** 2026-05-12 (stable stack, 30-day window)
