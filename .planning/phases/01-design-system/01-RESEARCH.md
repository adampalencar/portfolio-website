# Phase 1: Design System - Research

**Researched:** 2026-04-11
**Domain:** Astro 6 project scaffolding, CSS token architecture, self-hosted variable fonts, dark mode flash prevention
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Claude derives the dark mode palette from the locked light theme values. Warm dark charcoal tones (#1A1A1A range), not cool/blue-black or true black.
- **D-02:** Forest green accent (#1B7A3D) stays identical in both light and dark modes. No hue or lightness shift.
- **D-03:** Dark mode uses [data-theme="dark"] attribute on html element, not a CSS class. Theme persists in localStorage.
- **D-04:** Flash prevention requires an is:inline script in head that reads localStorage before first paint, PLUS astro:after-swap handler to reapply after View Transition navigation.
- **D-05:** Claude decides @layer order, BEM naming convention, and file structure. User will review the output but not pre-approve the plan.
- **D-06:** @layer + BEM from day one is required to prevent specificity debt at this project's complexity (11 components, dark mode, 3 breakpoints, animation states).
- **D-07:** Phase 1 must produce a visible "kitchen sink" test page at /dev showing: color swatches (light + dark), typography scale (all 3 layers: display, body, mono metadata), spacing scale, button states, and the grain texture. This page acts as a living reference during development.
- **D-08:** Use a small tiling PNG (~200x200px) with position:fixed, pointer-events:none, at 3-5% opacity. Not SVG filter and not CSS-only.

### Claude's Discretion

- CSS @layer order and naming (reset, tokens, base, components, utilities or similar)
- BEM naming depth and conventions
- File/folder structure for CSS partials
- Exact dark mode token values (within warm charcoal constraint)
- Grain texture PNG resolution and exact opacity
- Astro project configuration details (tsconfig, astro.config.mjs settings)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-01 | Site built with Astro 6 and vanilla CSS, deployed to Netlify free tier as static output | Astro 6.1.5 confirmed current; `output: 'static'` + no adapter is the correct Netlify setup; Node 24.13.1 exceeds the Node 22.x minimum |
| FOUN-02 | CSS design system using custom properties: warm off-white (#FAF9F6), forest green accent (#1B7A3D), 12-col grid, 8px base unit | Complete token set derived from Visual Direction spec; full light + dark palette with verified WCAG contrast ratios documented below |
| FOUN-03 | Three typography layers: Inter Variable + JetBrains Mono Variable, self-hosted via Fontsource | Astro Font API with `fontProviders.fontsource()` handles this; `<Font cssVariable="..." />` in layout head; exact config documented below |
| FOUN-04 | CSS cascade layers (@layer) and BEM naming convention from first component | @layer declaration order and BEM rules documented in Architecture Patterns; must be in place before any component is written |
| FOUN-05 | Dark mode infrastructure with [data-theme] attribute swap, localStorage persistence, and no flash on initial load or View Transition navigation | Two-script pattern: `is:inline` in `<head>` + `astro:after-swap` handler; full implementation pattern documented below |

</phase_requirements>

---

## Summary

Phase 1 is a greenfield scaffolding phase. No existing code exists to migrate or extend. Every pattern established here becomes the foundation every subsequent phase depends on, making correctness more important than speed.

The two highest-risk areas are font loading and dark mode flash prevention. Both are well-understood problems with verified solutions in the existing PITFALLS.md. The Astro Font API (with `fontProviders.fontsource()`) handles font optimization automatically when used correctly; the critical step is using the `<Font />` component in the layout head, not a bare CSS import. Dark mode flash is prevented by a two-part inline script pattern that must be in place before any component is built.

The CSS architecture decision (locked by D-05/D-06) is @layer + BEM. The layer declaration order and file split are Claude's discretion. A five-layer order (reset, tokens, base, components, utilities) maps cleanly to the file structure and prevents all specificity conflicts through architecture rather than selector weight.

**Primary recommendation:** Scaffold Astro, configure fonts via Font API, define the complete token set (light + dark), declare @layer order, drop the is:inline theme script, and produce the /dev kitchen sink page. Everything else in later phases imports from this foundation.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.1.5 | Static site framework, routing, image optimization, Font API | Current stable; zero-JS default; built-in everything this project needs |
| Node.js | 24.13.1 (installed) | Build environment | Exceeds Astro 6 minimum (Node 22.x); no upgrade needed |
| @fontsource-variable/inter | 5.2.8 | Self-hosted Inter Variable font files | Variable font, one file covers all weights; Fontsource integrates with Astro Font API |
| @fontsource-variable/jetbrains-mono | 5.2.8 | Self-hosted JetBrains Mono Variable font files | Same rationale; the monospace metadata layer is the site's primary visual differentiator |
| pixelarticons | 2.0.2 | SVG icon set (800 icons, 24x24 grid, MIT) | Verify integration path in this phase even though icons are not used until Phase 2 |
| astro-icon | 1.1.5 | Astro component wrapper for local SVGs | Auto-optimizes SVGs, provides Icon component interface; set up in Phase 1, used in Phase 2 |

**Version verification:** All versions above confirmed via `npm view [package] version` on 2026-04-11.

**Installation:**
```bash
npm create astro@latest . --template minimal
npm install @fontsource-variable/inter @fontsource-variable/jetbrains-mono
npm install pixelarticons astro-icon
```

### What NOT to Install

| Rejected | Why |
|----------|-----|
| @astrojs/netlify | Only needed for SSR. Static output needs no adapter. |
| Sass / Less | CSS nesting is baseline 2024. No preprocessor adds value. |
| Tailwind CSS | Fights a token-based custom design system. |
| AOS / ScrollReveal | 20 lines of vanilla JS replaces these entirely. |

---

## Architecture Patterns

### Recommended Project Structure

```
portfolio-website/
├── public/
│   ├── textures/
│   │   └── grain.png          # Tiling grain texture (~200x200px)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML shell; imports all CSS; Font components; theme script
│   ├── pages/
│   │   ├── index.astro        # Placeholder (Phase 1 stub only)
│   │   └── dev.astro          # Kitchen sink token test page (required by D-07)
│   └── styles/
│       ├── tokens.css         # ALL CSS custom properties (light + dark); single source of truth
│       ├── global.css         # @layer declaration, reset, body defaults, prefers-reduced-motion
│       ├── typography.css     # Type scale, font stacks, line heights
│       ├── layout.css         # 12-col grid, breakpoint helpers, spacing utilities
│       └── animations.css     # Keyframes; prefers-reduced-motion block (placeholder in Phase 1)
├── astro.config.mjs
├── tsconfig.json
└── netlify.toml
```

**Notes:**
- `public/textures/grain.png` is a static asset (no Astro optimization needed for a texture overlay).
- No `src/components/` in Phase 1. Components are Phase 2+ work.
- No `src/content/` in Phase 1. Content Layer schema is Phase 3 work.
- The `dev.astro` page is a Phase 1 deliverable, not optional.

### Pattern 1: CSS @layer Declaration Order

**What:** A single `@layer` declaration at the top of `global.css` that defines cascade order. Later `@layer` blocks anywhere in the codebase slot into this order regardless of import sequence.

**When to use:** Always. Declare once, use everywhere.

```css
/* src/styles/global.css — first rule in the file */

/* @layer reset: Normalize/reset only. No design decisions. */
/* @layer tokens: Consumed only by higher layers, never overrides. */
/* @layer base: Element defaults (body, a, p, h1-h6). No BEM yet. */
/* @layer components: BEM component blocks (.project-card, .sidebar, etc.). */
/* @layer utilities: Single-purpose overrides (.sr-only, .visually-hidden). */

@layer reset, tokens, base, components, utilities;
```

**Why this order:** Lower layers lose to higher layers. Reset is always lowest priority. Tokens slot in second so component rules can reference but not override them. Utilities always win (intentional overrides).

**Note on dark mode:** Dark mode overrides go inside `tokens.css` under `[data-theme="dark"]`. They are in the `tokens` layer, which means component rules in the `components` layer inherit the swapped values automatically. No need for high-specificity dark mode selectors in components.

### Pattern 2: Token File Structure

**What:** A single `tokens.css` file defines every design decision as a CSS custom property. No values are hardcoded in component files.

```css
/* src/styles/tokens.css */
@layer tokens {
  :root {
    /* --- Colors: Light Mode (default) --- */
    --bg-primary:    #FAF9F6;
    --bg-secondary:  #F1F0EE;
    --bg-card:       #FFFFFF;

    --text-primary:   #1A1A1A;
    --text-secondary: #666666;
    --text-tertiary:  #999999;

    --accent:         #1B7A3D;
    --accent-hover:   #145C2E;

    /* Tint scale (backgrounds, tags) */
    --accent-5:       #F0F7F2;
    --accent-15:      #D4EDDB;
    --accent-40:      #8CC49E;

    --border-subtle:  rgba(0, 0, 0, 0.06);
    --border-visible: #E5E5E5;

    /* --- Spacing (8px base) --- */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 16px;
    --space-4: 24px;
    --space-5: 32px;
    --space-6: 48px;
    --space-7: 64px;
    --space-8: 96px;
    --space-9: 128px;

    /* --- Typography --- */
    --font-body:    var(--font-inter);       /* Set by Astro Font API */
    --font-mono:    var(--font-jetbrains-mono); /* Set by Astro Font API */
    --font-fallback-sans: system-ui, -apple-system, sans-serif;
    --font-fallback-mono: 'Courier New', monospace;

    --size-xs:   11px;
    --size-sm:   13px;
    --size-base: 16px;
    --size-lg:   18px;
    --size-xl:   24px;
    --size-2xl:  32px;
    --size-3xl:  48px;
    --size-4xl:  64px;

    --leading-tight:  1.1;
    --leading-snug:   1.3;
    --leading-normal: 1.5;
    --leading-relaxed: 1.6;

    --tracking-tight:  -0.02em;
    --tracking-normal: 0em;
    --tracking-wide:   0.05em;
    --tracking-wider:  0.08em;

    /* --- Z-index scale --- */
    --z-base:    0;
    --z-raised:  10;
    --z-overlay: 100;
    --z-modal:   200;
    --z-toast:   300;

    /* --- Grid --- */
    --grid-cols:    12;
    --grid-gutter:  24px;
    --content-max:  1200px;
    --sidebar-width: 220px;
  }

  /* --- Dark Mode Token Overrides --- */
  /* Only swap what changes. Accent, spacing, typography tokens stay identical. */
  [data-theme="dark"] {
    --bg-primary:    #1C1B18;
    --bg-secondary:  #252420;
    --bg-card:       #2E2D2A;

    --text-primary:   #F0EDE6;
    --text-secondary: #A09C95;
    --text-tertiary:  #6A6660;

    --border-subtle:  rgba(255, 255, 255, 0.06);
    --border-visible: #3A3935;
    /* accent, accent-hover, accent tints, spacing, type — unchanged */
  }
}
```

### Pattern 3: Astro Font API Configuration

**What:** Configure both variable fonts in `astro.config.mjs` using `fontProviders.fontsource()`. Use the `<Font />` component in `BaseLayout.astro` to inject preload links and `@font-face` declarations.

**Source:** Astro official docs, verified 2026-04-11.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://your-site.netlify.app',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter Variable',
      cssVariable: '--font-inter',
      weights: ['100 900'],   /* Variable font: range, not discrete values */
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono Variable',
      cssVariable: '--font-jetbrains-mono',
      weights: ['100 800'],
      styles: ['normal'],
      fallbacks: ['Courier New', 'monospace'],
    },
  ],
});
```

```astro
---
// src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
---
<html lang="en">
  <head>
    <!-- Font API injects preload links + @font-face here -->
    <Font cssVariable="--font-inter" />
    <Font cssVariable="--font-jetbrains-mono" />
    <!-- then your CSS imports -->
  </head>
</html>
```

```css
/* Reference in CSS — tokens.css binds the Font API variable to the semantic name */
--font-body: var(--font-inter), system-ui, sans-serif;
--font-mono: var(--font-jetbrains-mono), 'Courier New', monospace;
```

**Critical note:** `font-display` is not configurable through the Astro Font API (docs do not expose this property). The API manages `@font-face` generation internally. If `font-display: optional` is needed for JetBrains Mono (to suppress layout shift on cold load), it must be applied via a manual `@font-face` override in a low-specificity layer after the API's declarations.

### Pattern 4: Dark Mode Flash Prevention (Two-Part)

**What:** A two-part script that prevents flash of wrong theme on both initial load and on every View Transitions navigation.

**Part 1 — Initial load (in BaseLayout.astro `<head>`):**

```astro
<!-- MUST be is:inline to prevent Astro from deferring it -->
<script is:inline>
  (function() {
    const saved = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    document.documentElement.dataset.theme = saved ?? system;
  })();
</script>
```

**Part 2 — View Transitions re-application (in BaseLayout.astro `<script>`):**

```js
// This script can be bundled (not is:inline) — it registers the listener once
document.addEventListener('astro:after-swap', () => {
  const saved = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  document.documentElement.dataset.theme = saved ?? system;
});
```

**Why two parts:** Astro's ClientRouter replaces `document.documentElement` during page swaps. The `data-theme` attribute is wiped on every navigation. `astro:after-swap` fires before the new page paints, so reapplying the attribute there prevents the flash on navigation.

### Pattern 5: Grain Texture Overlay

**What:** A fixed-position PNG overlay that sits above all content but below all interactive elements.

**Where it lives:** Injected in `BaseLayout.astro` directly after `<body>`, styled globally.

```astro
<!-- src/layouts/BaseLayout.astro — inside <body>, before <slot /> -->
<div class="grain-overlay" aria-hidden="true"></div>
```

```css
/* src/styles/global.css — @layer base */
.grain-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('/textures/grain.png');
  background-repeat: repeat;
  background-size: 200px 200px;  /* match PNG dimensions */
  opacity: 0.04;                 /* 3-5% range; tune visually */
  pointer-events: none;
  z-index: var(--z-overlay);
  /* Does not scroll with content — position:fixed is intentional */
}
```

**PNG requirements:** ~200x200px, seamlessly tiling noise texture. Source: generate via any noise generator (GIMP, Photoshop Filter Gallery, or online tools). Aim for "paper texture, not digital noise" — low-frequency Perlin noise, not high-contrast static. File size should be under 15KB.

### Anti-Patterns to Avoid

- **Hardcoded values in component files:** Every color, spacing value, or font reference must use a CSS custom property. Never write `color: #1A1A1A` in a component file; write `color: var(--text-primary)`.
- **Dark mode via class selector:** Using `.dark` instead of `[data-theme="dark"]` risks Astro's scoped class hashing breaking the global selector.
- **SVG icons with hardcoded fill:** Any pixelarticons SVG must use `fill="currentColor"`, not hardcoded hex values. Hardcoded fills break dark mode theming.
- **Font imports in CSS `@import`:** Do not `@import` Fontsource CSS directly. Let the Astro Font API manage all `@font-face` declarations.
- **Bundled theme detection script:** Never put the localStorage-reading theme script outside `is:inline`. If Astro bundles it, execution is deferred until after first paint, guaranteeing FOWT.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Variable font loading + preload | Manual @font-face + link rel=preload in HTML | Astro Font API (`fontProviders.fontsource()` + `<Font />`) | API auto-generates optimal preload, handles WOFF2 subset selection, manages caching headers |
| CSS specificity management | Nested selectors, !important overrides | CSS @layer declaration | Layer order wins regardless of selector weight; no specificity wars ever |
| Dark mode token management | Per-component dark overrides | Single [data-theme="dark"] block in tokens.css | Token swap propagates to all consumers automatically |
| SVG icon optimization | Hand-optimizing SVG paths, managing inline SVG | astro-icon component | Auto-runs svgo, provides a clean `<Icon name="..." />` interface |

**Key insight:** Every "hand-rolled" version of the above exists in the codebase of every abandoned portfolio. The Font API eliminates the most common source of CLS. The @layer declaration eliminates the most common reason portfolio CSS becomes unmaintainable.

---

## Common Pitfalls

### Pitfall 1: Flash of Wrong Theme on View Transitions Navigation (Critical)

**What goes wrong:** Even with `is:inline` correctly preventing the initial load flash, every ClientRouter page swap wipes `data-theme` from `document.documentElement`. The page re-renders briefly in the wrong theme after each navigation.

**Why it happens:** Astro's ClientRouter replaces the `<html>` element's attributes during the swap. This is documented behavior, not a bug.

**How to avoid:** Register an `astro:after-swap` listener that re-reads localStorage and reapplies `data-theme`. This runs before the new page renders. See Pattern 4 above.

**Warning signs:** Theme persists on initial load but resets to the default after clicking any internal link.

### Pitfall 2: Font API CSS Variable Name Mismatch

**What goes wrong:** The `cssVariable` specified in `astro.config.mjs` (e.g., `--font-inter`) must exactly match the variable name used in `<Font cssVariable="--font-inter" />` in the layout. A mismatch silently produces no preload link and no `@font-face` declaration.

**How to avoid:** Use the exact same string in both places. Bind the API variable to a semantic token in `tokens.css` (`--font-body: var(--font-inter)`) so components always use the semantic name.

### Pitfall 3: font-display Not Exposed by Font API

**What goes wrong:** The Astro Font API does not expose `font-display` as a configuration option. If left unaddressed, the default `font-display: auto` behavior may produce invisible text flash (FOIT) on slow connections.

**How to avoid:** After the Font API injects its `@font-face` blocks, add a manual `@font-face` override in the `reset` layer specifying `font-display: swap` for Inter and `font-display: optional` for JetBrains Mono. The `reset` layer is the lowest; this is purely an additive declaration, not an override fight. Alternatively, accept the Font API's default and verify visually on throttled network before shipping.

**Warning signs:** CLS above 0.1 in Lighthouse. Filmstrip shows text invisible then snapping in.

### Pitfall 4: Grain Overlay Blocking Clicks

**What goes wrong:** The `grain-overlay` div sits above all content in z-index. Without `pointer-events: none`, it intercepts all mouse/touch events, making the entire site unclickable.

**How to avoid:** `pointer-events: none` is mandatory on the overlay. It is included in Pattern 5 above.

### Pitfall 5: @layer Not Declared Before First Use

**What goes wrong:** If a CSS file with `@layer components { ... }` is loaded before `global.css` declares the layer order, the browser falls back to source-order cascade for that layer. Layer priority becomes unpredictable.

**How to avoid:** `global.css` must be imported first in `BaseLayout.astro`. The `@layer reset, tokens, base, components, utilities;` declaration must appear as the first rule in that file.

---

## Code Examples

### BaseLayout.astro Shell

```astro
---
// src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
import '../styles/global.css';
import '../styles/tokens.css';
import '../styles/typography.css';
import '../styles/layout.css';
import '../styles/animations.css';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Portfolio of Adam Palencar, UI/UX Designer' } = Astro.props;
---
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}

    <!-- Astro Font API: injects @font-face + preload links -->
    <Font cssVariable="--font-inter" />
    <Font cssVariable="--font-jetbrains-mono" />

    <!-- Theme: must be is:inline to run before first paint -->
    <script is:inline>
      (function() {
        const saved = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark' : 'light';
        document.documentElement.dataset.theme = saved ?? system;
      })();
    </script>
  </head>
  <body>
    <!-- Grain texture: position:fixed, pointer-events:none -->
    <div class="grain-overlay" aria-hidden="true"></div>
    <slot />
  </body>
</html>

<script>
  // Re-apply theme after each View Transitions page swap
  document.addEventListener('astro:after-swap', () => {
    const saved = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved ?? system;
  });
</script>
```

### /dev Kitchen Sink Page Structure

The `/dev` page must demonstrate every token visually. Sections to include:

1. **Colors (Light + Dark):** A grid of swatches using each `--bg-*`, `--text-*`, `--accent-*`, and `--border-*` token. Include hex value and variable name as labels using JetBrains Mono.
2. **Typography Scale:** Show every `--size-*` value with the corresponding type. Three-row layout: display (Inter Bold), body (Inter Regular), mono metadata (JetBrains Mono, all-caps, tracked).
3. **Spacing Scale:** Visual bars using each `--space-*` value with pixel label.
4. **Button States:** Rest, hover, focus, disabled using accent color. Both filled and ghost variants.
5. **Grain Texture:** A large swatch showing the overlay clearly over `--bg-primary` and `--bg-secondary`.
6. **Dark Mode Toggle:** A button that switches `[data-theme]` to verify the swap works live.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | Yes | 24.13.1 | None needed |
| npm | Package install | Yes | 11.7.0 | None needed |
| Astro CLI | Project scaffold | Will install | 6.1.5 (latest) | None needed |
| Git | Version control | Yes (repo exists) | Not checked | None needed |

**Missing dependencies with no fallback:** None.

**Note:** This is a greenfield phase. The Astro project does not yet exist; scaffolding it is a Phase 1 task, not a prerequisite.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (visual/manual validation for Phase 1) |
| Config file | none |
| Quick run command | `npm run dev` + visual browser check at localhost:4321 |
| Full suite command | `npm run build` (must succeed with zero errors) |

Phase 1 has no automated unit tests. Validation is build-time (TypeScript, Astro schema) plus visual browser verification.

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Command | Notes |
|--------|----------|-----------|---------|-------|
| FOUN-01 | `npm run dev` and `npm run build` succeed | Build smoke | `npm run build` | Static output in dist/ |
| FOUN-01 | Output is Netlify-deployable (no adapter, output:static) | Manual | Inspect astro.config.mjs | Configuration check |
| FOUN-02 | All CSS custom properties are visually correct in browser | Visual | Browser: localhost:4321/dev | Kitchen sink page |
| FOUN-02 | Color tokens match spec hex values exactly | Visual | Browser: /dev color swatches | Compare swatches to spec |
| FOUN-03 | Inter Variable and JetBrains Mono Variable load | Visual | Browser: /dev typography section | No fallback font rendering |
| FOUN-03 | No layout shift on font load (CLS < 0.1) | Lighthouse | `npx unlighthouse` or DevTools | Target: CLS = 0 |
| FOUN-04 | @layer declaration exists and layers are named correctly | Code review | Inspect global.css | Manual check |
| FOUN-04 | BEM naming applied to all /dev page elements | Code review | Inspect dev.astro source | Manual check |
| FOUN-05 | No flash on initial dark mode load | Visual | Browser: reload in dark mode | No white flash visible |
| FOUN-05 | Theme persists after hard reload | Manual | Set dark, reload, verify | localStorage check |
| FOUN-05 | Theme persists across View Transitions navigation | Manual | Navigate between / and /dev in dark mode | Requires ClientRouter in BaseLayout |

### Sampling Rate

- **Per task commit:** `npm run build` must pass
- **Phase gate:** All FOUN-0X checks in the table above must pass before moving to Phase 2

### Wave 0 Gaps

None. Phase 1 establishes infrastructure; there are no pre-existing tests to write. The `npm run build` success check is the automated gate.

---

## Dark Mode Palette (Derived)

The following palette was derived from the locked light theme values. All WCAG contrast ratios computed and verified on 2026-04-11.

### Light Mode (Locked by Design Spec)

| Token | Value | Notes |
|-------|-------|-------|
| `--bg-primary` | `#FAF9F6` | Warm off-white |
| `--bg-secondary` | `#F1F0EE` | Section alternation, 3-5% darker |
| `--bg-card` | `#FFFFFF` | Card surfaces |
| `--text-primary` | `#1A1A1A` | Body text |
| `--text-secondary` | `#666666` | Supporting text |
| `--text-tertiary` | `#999999` | Metadata labels (JetBrains Mono) |
| `--accent` | `#1B7A3D` | Forest green; AA contrast on bg-primary: 5.12:1 |
| `--accent-hover` | `#145C2E` | Hover state |
| `--border-subtle` | `rgba(0,0,0,0.06)` | Hairlines |
| `--border-visible` | `#E5E5E5` | Section borders |

### Dark Mode (Claude-Derived)

Warm charcoal range per D-01. Accent identical per D-02.

| Token | Value | Contrast on bg-primary | WCAG |
|-------|-------|------------------------|------|
| `--bg-primary` | `#1C1B18` | N/A (background) | Pass |
| `--bg-secondary` | `#252420` | N/A (background) | Pass |
| `--bg-card` | `#2E2D2A` | N/A (elevated surface) | Pass |
| `--text-primary` | `#F0EDE6` | 14.73:1 | AA |
| `--text-secondary` | `#A09C95` | 6.30:1 | AA |
| `--text-tertiary` | `#6A6660` | 3.02:1 | AA (large text / UI only) |
| `--accent` | `#1B7A3D` | 3.20:1 (on bg-primary) | AA (large text / UI components) |
| `--accent-hover` | `#145C2E` | Darker, passes as button fill | Pass |
| `--border-subtle` | `rgba(255,255,255,0.06)` | N/A (decorative) | N/A |
| `--border-visible` | `#3A3935` | N/A (decorative) | N/A |

**Accent contrast note:** The `#1B7A3D` green at 3.20:1 on dark backgrounds passes WCAG AA for large text (3:1 threshold) and UI components. It does NOT pass 4.5:1 for small body text. This is acceptable because the accent is only used for CTAs, active nav, project codes, and category tags; none of these appear as small body text. White text on the accent (#FFFFFF on #1B7A3D) = 5.39:1, which passes AA for all text sizes.

---

## State of the Art

| Old Approach | Current Approach | Impact for This Phase |
|--------------|------------------|----------------------|
| `<ViewTransitions />` component | `<ClientRouter />` from `astro:transitions` | Naming change only; function identical |
| Manual `@font-face` + Google Fonts CDN | Astro Font API + `fontProviders.fontsource()` + `<Font />` component | Eliminates manual preload, auto-handles WOFF2 subsetting |
| `src/content/config.ts` (Astro v5) | `src/content.config.ts` (Astro v6) | Path changed; wrong path silently breaks content collections |
| Legacy content collections API | Content Layer API with `glob()` loader | No collections in Phase 1; relevant from Phase 3 |
| CSS `@import` for fonts | Font API component | Never use `@import` for Fontsource packages in this project |

---

## Open Questions

1. **font-display via Font API**
   - What we know: Astro Font API does not expose `font-display` in its config schema (verified via docs).
   - What's unclear: Whether the API defaults to `swap`, `optional`, or `auto` internally.
   - Recommendation: During Phase 1 execution, check the generated `@font-face` in the browser DevTools. If not `swap`, add a manual override `@font-face` block in `global.css` with `font-display: swap` for Inter and `font-display: optional` for JetBrains Mono.

2. **Grain PNG source**
   - What we know: The spec calls for a ~200x200px tiling noise texture with "paper feel, not digital noise."
   - What's unclear: Whether a suitable PNG exists in the project's assets, or whether it needs to be generated.
   - Recommendation: Generate a Perlin noise texture at build time using any online grain generator or GIMP. Target file size under 15KB. Tune opacity visually against the /dev kitchen sink page.

---

## Project Constraints (from CLAUDE.md)

These directives apply to the portfolio-website project and must be followed:

| Directive | Source | Constraint |
|-----------|--------|------------|
| Static output only | CLAUDE.md | `output: 'static'` in astro.config.mjs; no SSR; no @astrojs/netlify adapter |
| Netlify free tier | CLAUDE.md | All pages pre-rendered at build time; no edge functions |
| No React/Vue/Svelte | CLAUDE.md | Zero component framework islands |
| Self-hosted fonts | CLAUDE.md | Inter + JetBrains Mono via Fontsource; no Google Fonts CDN |
| No GSAP | CLAUDE.md | View Transitions + CSS animations + IntersectionObserver only |
| No tracking scripts | CLAUDE.md | No analytics in the build (added post-launch) |
| Modern browsers only | CLAUDE.md | Last 2 versions; no IE11 polyfills |
| Pixelarticons for icons | CLAUDE.md | MIT, npm: pixelarticons, 24x24 grid, pure SVG |

---

## Sources

### Primary (HIGH confidence)

- Astro official docs (fonts.astro.build/en/guides/fonts/) — Font API config syntax, `<Font />` component usage
- Astro official docs (docs.astro.build/en/guides/view-transitions/) — ClientRouter, `astro:after-swap` lifecycle
- PITFALLS.md (project research, 2026-04-11) — FOWT fix pattern, @layer rationale, font-display strategy
- STACK.md (project research, 2026-04-11) — Package versions, Astro 6.1.5 confirmation
- ARCHITECTURE.md (project research, 2026-04-11) — File structure, layer order, component boundaries
- Visual Direction and References.md (design spec, 2026-04-11) — All light token values, accent tint scale, typography rules
- npm registry (verified 2026-04-11) — astro@6.1.5, @fontsource-variable/inter@5.2.8, @fontsource-variable/jetbrains-mono@5.2.8, astro-icon@1.1.5, pixelarticons@2.0.2
- Node.js environment check (2026-04-11) — Node 24.13.1 installed, npm 11.7.0

### Secondary (MEDIUM confidence)

- WCAG contrast ratio calculations computed in-session (2026-04-11) against proposed dark palette values

### Tertiary (LOW confidence)

- font-display default behavior of Astro Font API — not documented; verify in DevTools during implementation

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all versions verified against npm registry on 2026-04-11
- Dark mode palette: HIGH — all contrast ratios computed and verified in-session
- Architecture: HIGH — based on official Astro docs and pre-existing project research
- Font API configuration: HIGH for config structure; LOW for font-display default (undocumented)
- Pitfalls: HIGH — drawn from existing PITFALLS.md which cites specific GitHub issues and official docs

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (Astro moves fast; re-verify font API if more than 30 days pass)
