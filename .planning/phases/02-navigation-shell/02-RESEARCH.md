# Phase 2: Navigation Shell - Research

**Researched:** 2026-04-11
**Domain:** Astro layout components, responsive sidebar navigation, CSS accordion, View Transitions persistence, accessibility
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Desktop (1200px+): fixed left sidebar at 220px (per --sidebar-width token). Content area fills remaining width.
- **D-02:** Tablet (768-1199px): sidebar collapses to a horizontal top bar with nav items inline. No sidebar drawer.
- **D-03:** Mobile (<768px): hamburger icon in top bar. Sidebar slides in as an overlay from the left with a semi-transparent backdrop. Body scroll locked while open.
- **D-04:** Sidebar uses `transition:persist` (Astro View Transitions) so it does not re-render or flicker on page navigation.
- **D-05:** Toggle lives in the sidebar bottom section (desktop) and in the top bar (tablet/mobile).
- **D-06:** Icon-based toggle using Pixelarticons sun/moon icons via astro-icon. CSS transition on icon swap (opacity crossfade or rotation, Claude's discretion on exact animation).
- **D-07:** Toggle fires the same localStorage + data-theme logic already in BaseLayout. No new persistence mechanism.
- **D-08:** Sidebar nav has top-level items (Home, Work, About, Contact). "Work" is the folder parent.
- **D-09:** When on a case study page, the Work section auto-expands to show child project links as a nested list. Only one folder section can be expanded at a time (accordion pattern).
- **D-10:** Expansion uses CSS height transition (max-height or grid-template-rows). No JS animation library.
- **D-11:** Current page highlighted with `aria-current="page"` and a visual indicator (left border accent or background tint, Claude's discretion).
- **D-12:** Dense single-row footer on desktop: email (mailto link), LinkedIn (external link), resume (download link), location text ("Based in Toronto, ON"), version number (from package.json or hardcoded).
- **D-13:** Footer stacks vertically on mobile. Pipe or dot separators on desktop collapse to line breaks on mobile.
- **D-14:** Footer uses `.mono-label` styling from Phase 1 typography system. Subtle, informational, not decorative.
- **D-15:** BaseLayout gets Astro ClientRouter (View Transitions) added in this phase. The `is:inline` theme script and `astro:after-swap` handler from Phase 1 remain untouched.
- **D-16:** All scroll/interaction scripts must use `astro:page-load`, not `DOMContentLoaded` (per STATE.md init decision).
- **D-17:** Skip-to-content link added to BaseLayout for accessibility (A11Y-04 requirement, but structurally belongs here).

### Claude's Discretion

- Exact CSS for sidebar slide-in animation (transform, transition timing)
- Hamburger icon animation (two-bar to X, three-bar to X, etc.)
- Footer separator character (pipe, dot, bullet)
- Sidebar active state visual treatment (border, background, both)
- Component file organization (Sidebar.astro, Footer.astro, NavItem.astro, etc.)
- Whether to use CSS grid or flexbox for sidebar + content layout

### Deferred Ideas (OUT OF SCOPE)

None

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Left sidebar navigation fixed on desktop (220px), collapsing to top bar on tablet (768-1199px), hamburger menu on mobile (<768px) | Three-breakpoint responsive pattern with CSS grid layout, media queries at 768px and 1200px; `--sidebar-width: 220px` token exists |
| NAV-02 | Sidebar expands like Obsidian folders on case study subpages (Work > child projects), one section expanded at a time | CSS `grid-template-rows: 0fr/1fr` transition for accordion; JS accordion logic via `astro:page-load`; auto-expand based on `Astro.url.pathname` |
| NAV-03 | Dark mode toggle in sidebar bottom section with polished micro-interaction | Moon/cloud-sun icons from pixelarticons; opacity crossfade transition; same localStorage logic from Phase 1 |
| NAV-04 | Sidebar persists across page navigations via transition:persist (no flicker) | Astro `transition:persist` directive on sidebar component; requires `<ClientRouter />` in head |
| NAV-05 | Full keyboard navigation and ARIA attributes on all nav controls (aria-expanded, aria-current, focus-visible) | Documented ARIA pattern for accordion nav, hamburger toggle, focus management |
| NAV-06 | Pixelarticons (24x24 SVG) for nav items and UI elements via astro-icon | astro-icon integration with local SVGs copied from pixelarticons/svg/; `fill="currentColor"` verified |
| LAY-01 | BaseLayout wrapping all pages with ClientRouter for View Transitions | `<ClientRouter />` from `astro:transitions` added to BaseLayout head |
| LAY-02 | Dense informational footer with email, LinkedIn, resume link, location, version number | Footer.astro component using `.mono-label` class, responsive stacking |
| LAY-03 | Responsive at 3 breakpoints: desktop (1440px+), tablet (768-1199px), mobile (<768px) | Media queries at 768px and 1200px; mobile-first approach; breakpoints already documented in layout.css |

</phase_requirements>

---

## Summary

Phase 2 transforms the bare BaseLayout shell from Phase 1 into a complete navigation chrome. The sidebar, top bar, hamburger menu, footer, and dark mode toggle are all new Astro components that slot into the existing layout. The most complex technical challenge is the responsive sidebar that must work across three breakpoints, persist across View Transitions, and contain an Obsidian-style accordion for case study child links.

The foundation from Phase 1 is solid: all CSS tokens exist, the layer architecture is established, BEM naming is in place, dark mode infrastructure works, and the `.mono-label` typography class is ready for the footer. Phase 2 adds `<ClientRouter />` for View Transitions and the `astro-icon` integration (currently installed but not configured as an Astro integration).

There are two significant technical nuances. First, `transition:persist` on the sidebar means sidebar state (expanded folders, scroll position) survives page navigations, but the sidebar component must detect route changes to update `aria-current` and auto-expand the correct folder. Second, the astro-icon package requires adding it as an Astro integration in `astro.config.mjs` and copying the needed pixelarticons SVGs into `src/icons/`. Pixelarticons does not have a dedicated "sun" icon; the closest options are `cloud-sun` or `lightbulb` for the light theme indicator, paired with `moon` for dark. Alternatively, a simple custom sun SVG (a circle with rays) in the pixel art style can be created at 24x24.

**Primary recommendation:** Build from the inside out. Start with astro-icon integration setup + ClientRouter. Then build the sidebar desktop version with accordion, add footer, add responsive variants (top bar, hamburger), wire up dark mode toggle, and finish with skip-to-content and keyboard testing.

---

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.1.5 | Framework, ClientRouter, View Transitions | Already installed from Phase 1 |
| astro-icon | 1.1.5 | SVG icon component, auto-optimizes with svgo | Already in package.json but NOT configured as integration |
| pixelarticons | 2.0.2 | 800 SVG icons, 24x24 grid, `fill="currentColor"` | Already in package.json |

### No New Dependencies

Phase 2 requires zero new npm packages. Everything needed is already installed. The only configuration change is adding `astro-icon` as an Astro integration in `astro.config.mjs`.

### What NOT to Install

| Rejected | Why |
|----------|-----|
| @iconify-json/pixelarticons | Not needed; copy SVGs directly from pixelarticons/svg/ to src/icons/ |
| Any hamburger menu library | 15 lines of vanilla JS + CSS handles this |
| focus-trap library | Manual focus management with `focusin`/`focusout` is simpler for a single menu |

---

## Architecture Patterns

### Component File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.astro           # Desktop sidebar: nav items, folder accordion, theme toggle
│   │   ├── TopBar.astro            # Tablet/mobile: horizontal nav bar + hamburger trigger
│   │   ├── MobileDrawer.astro      # Mobile slide-in overlay with backdrop
│   │   ├── Footer.astro            # Dense informational footer
│   │   └── SkipLink.astro          # Skip-to-content accessibility link
│   └── ui/
│       └── ThemeToggle.astro       # Dark mode toggle button (shared between sidebar and top bar)
├── icons/                          # Local SVGs for astro-icon (copied from pixelarticons)
│   ├── home.svg
│   ├── briefcase.svg
│   ├── user.svg
│   ├── mail.svg
│   ├── moon.svg
│   ├── cloud-sun.svg               # Or custom sun.svg
│   ├── chevron-down.svg
│   ├── menu.svg
│   ├── close.svg                   # Will need to find or create (pixelarticons has x-mark or similar)
│   ├── download.svg
│   └── link.svg                    # For LinkedIn external link icon
├── layouts/
│   └── BaseLayout.astro            # Enhanced: adds ClientRouter, sidebar, footer, skip link
└── styles/
    └── (existing files, no new CSS files needed; component styles go in <style> blocks)
```

**Rationale:** Sidebar, TopBar, and MobileDrawer are separate components because they have fundamentally different DOM structures and behaviors. They share the same nav link data but render it differently. A shared `navItems` array in each component (or a data file) keeps them in sync.

### Pattern 1: CSS Grid Page Layout (Desktop)

**What:** The sidebar + content split uses CSS grid on the body or a wrapper div, not flexbox. Grid makes the fixed sidebar trivial with `grid-template-columns: var(--sidebar-width) 1fr`.

**When to use:** Desktop breakpoint (1200px+).

```css
@layer components {
  .site-layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
  }

  .site-layout__sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-subtle);
    z-index: var(--z-raised);
  }

  .site-layout__main {
    grid-column: 2;
    min-width: 0; /* prevent grid blowout */
  }

  .site-layout__footer {
    grid-column: 2;
  }

  @media (max-width: 1199px) {
    .site-layout {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }

    .site-layout__sidebar {
      display: none; /* Hidden; TopBar takes over */
    }

    .site-layout__main {
      grid-column: 1;
    }

    .site-layout__footer {
      grid-column: 1;
    }
  }
}
```

### Pattern 2: Obsidian-Style Folder Accordion (CSS grid-template-rows)

**What:** Expand/collapse child nav items using `grid-template-rows: 0fr` to `1fr` transition. This is the modern, broadly-supported technique for animating to/from auto height.

**Browser support:** All modern browsers (Chrome 105+, Firefox 66+, Safari 16+). Confirmed baseline 2024.

```css
@layer components {
  .nav-folder__children {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 250ms ease;
  }

  .nav-folder__children[aria-hidden="false"] {
    grid-template-rows: 1fr;
  }

  .nav-folder__children-inner {
    overflow: hidden;
  }
}
```

```html
<li class="nav-folder">
  <button
    class="nav-folder__trigger"
    aria-expanded="false"
    aria-controls="work-children"
  >
    <Icon name="briefcase" />
    <span>WORK</span>
    <Icon name="chevron-down" class="nav-folder__chevron" />
  </button>
  <div id="work-children" class="nav-folder__children" aria-hidden="true">
    <ul class="nav-folder__children-inner">
      <li><a href="/work/orbital-concierge" class="nav-folder__child">Orbital Concierge</a></li>
      <!-- more children -->
    </ul>
  </div>
</li>
```

**Key detail:** The trigger MUST be a `<button>` element (not a `<div>` or `<a>`), as it is an interactive control that toggles visibility. The chevron icon rotates 180deg when expanded via CSS transform.

### Pattern 3: transition:persist for Sidebar

**What:** Astro's `transition:persist` directive tells the ClientRouter to keep the sidebar DOM node across page navigations instead of replacing it.

```astro
<!-- In BaseLayout.astro -->
<Sidebar transition:persist />
```

**Critical integration:** When the sidebar persists, its internal state (expanded folders, active item highlight) also persists. But the *route has changed*, so the sidebar must detect the new URL and update accordingly. Use `astro:page-load` to re-check `window.location.pathname` and update `aria-current` and folder expansion state.

```js
document.addEventListener('astro:page-load', () => {
  const currentPath = window.location.pathname;
  // Update aria-current on all nav links
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const isActive = link.getAttribute('href') === currentPath;
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  // Auto-expand Work folder if on a case study page
  if (currentPath.startsWith('/work/')) {
    expandFolder('work');
  }
});
```

### Pattern 4: Mobile Drawer with Body Scroll Lock

**What:** On mobile (<768px), the hamburger opens a sidebar overlay from the left with a semi-transparent backdrop. Body scroll must be locked while the drawer is open.

```css
@layer components {
  .mobile-drawer {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    pointer-events: none;
    visibility: hidden;
  }

  .mobile-drawer[data-open="true"] {
    pointer-events: auto;
    visibility: visible;
  }

  .mobile-drawer__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 250ms ease;
  }

  .mobile-drawer[data-open="true"] .mobile-drawer__backdrop {
    opacity: 1;
  }

  .mobile-drawer__panel {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--sidebar-width);
    background: var(--bg-secondary);
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }

  .mobile-drawer[data-open="true"] .mobile-drawer__panel {
    transform: translateX(0);
  }
}
```

**Scroll lock:** Set `document.body.style.overflow = 'hidden'` when open, restore on close. Also handle `Escape` key to close.

### Pattern 5: ClientRouter Integration

**What:** Add `<ClientRouter />` to BaseLayout head. This enables View Transitions for all pages.

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
  <!-- existing Font, meta, theme script -->
</head>
```

**Placement:** Must be in `<head>`, after meta tags, before the closing `</head>`. The existing `is:inline` theme script and `astro:after-swap` handler remain untouched.

### Pattern 6: astro-icon Integration Setup

**What:** astro-icon must be registered as an Astro integration and configured for local SVGs.

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  site: 'https://adampalencar.netlify.app',
  integrations: [icon()],
  fonts: [
    // ... existing font config
  ],
});
```

**Usage in components:**
```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="home" size={24} />
```

The `name` prop maps to `src/icons/{name}.svg`. All SVGs must use `fill="currentColor"` (pixelarticons already does this).

### Anti-Patterns to Avoid

- **Conditional rendering for responsive nav:** Do NOT use Astro's server-side `if` to render different nav structures per breakpoint. Render all three variants (sidebar, top bar, drawer) and use CSS `display: none` / media queries. SSR cannot detect viewport width.
- **JS-based media queries for layout:** Use CSS media queries for layout switching. JS `matchMedia` should only be used for behavior (e.g., closing drawer on resize to desktop).
- **Inline SVG without astro-icon:** Do not paste raw SVG markup into components. Use the `<Icon>` component for consistency, optimization, and `currentColor` theming.
- **`DOMContentLoaded` for any script:** Use `astro:page-load` exclusively. This is a locked decision from STATE.md.
- **Animating `height` or `max-height` directly:** Use `grid-template-rows: 0fr/1fr` for the accordion. `max-height` with a large fixed value causes noticeable easing artifacts.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG icon management | Inline SVG markup in each component | astro-icon `<Icon>` component | Auto svgo optimization, consistent interface, currentColor theming |
| Height animation to/from auto | max-height hack or requestAnimationFrame loop | CSS `grid-template-rows: 0fr/1fr` | Browser-native, GPU composited, no JS animation frame needed |
| Sidebar persistence across navigations | Custom DOM preservation logic | Astro `transition:persist` directive | Built into ClientRouter; handles DOM diffing automatically |
| Focus trap in mobile drawer | Custom focus trap implementation | Sequence: focus first item on open, return focus on close, close on Escape | Full focus-trap libraries are overkill for a single drawer; 10 lines handles this |

**Key insight:** The hardest part of this phase is not any individual component but the coordination between three responsive states and View Transitions persistence. Every script must account for `astro:page-load` re-execution and the sidebar persisting with stale route data.

---

## Common Pitfalls

### Pitfall 1: transition:persist Sidebar Shows Stale Active State

**What goes wrong:** The sidebar persists across navigations (good, no flicker), but `aria-current="page"` still points to the previous page. The Work folder may be collapsed when it should be expanded, or expanded when it should not be.

**Why it happens:** `transition:persist` keeps the entire DOM subtree. It does not re-render the component with new props. The sidebar's server-rendered `Astro.url.pathname` check becomes stale after the first navigation.

**How to avoid:** Register an `astro:page-load` handler that reads `window.location.pathname` and updates all `aria-current` attributes and folder expansion states. This runs on every navigation including the initial load.

**Warning signs:** Clicking a nav link highlights the destination page but the sidebar still shows the previous page as active.

### Pitfall 2: Mobile Drawer Stays Open After Navigation

**What goes wrong:** User opens hamburger menu, clicks a nav link. The page changes via View Transitions but the mobile drawer remains visible because its open state is preserved by `transition:persist` on a parent element.

**How to avoid:** In the `astro:page-load` handler, explicitly close the mobile drawer: set `data-open="false"`, restore body scroll, return focus to the hamburger button.

### Pitfall 3: Body Scroll Lock Not Removed

**What goes wrong:** Mobile drawer sets `overflow: hidden` on body. If the drawer is open during a View Transition navigation, the scroll lock persists on the new page.

**How to avoid:** The `astro:before-preparation` or `astro:page-load` event handler must always reset `document.body.style.overflow = ''` to ensure clean state on every navigation.

### Pitfall 4: astro-icon Not Registered as Integration

**What goes wrong:** `astro-icon` is installed in `package.json` but not added to the `integrations` array in `astro.config.mjs`. The `<Icon>` component imports fine but SVGs are not resolved at build time, producing empty elements or build errors.

**How to avoid:** Add `import icon from 'astro-icon'` and `integrations: [icon()]` to `astro.config.mjs` as the first task in Phase 2.

### Pitfall 5: Pixelarticons Missing "Sun" Icon

**What goes wrong:** D-06 specifies "sun/moon icons" for the dark mode toggle, but pixelarticons does not have a dedicated `sun.svg` icon. Available alternatives are `cloud-sun.svg` (sun partially behind cloud) and `lightbulb.svg`.

**How to avoid:** Two options. (1) Use `cloud-sun` for light mode and `moon` for dark mode. (2) Create a custom `sun.svg` in the pixelarticons style (24x24 grid, `fill="currentColor"`, pixel-aligned paths). Option 2 is better for visual consistency with the toggle metaphor but requires manual SVG creation.

### Pitfall 6: Grain Overlay Z-Index Blocks Sidebar

**What goes wrong:** The grain overlay uses `z-index: var(--z-overlay)` (100). If the sidebar also uses a z-index in the same range, the grain may render on top of the sidebar, making it look "grainy" in a distracting way, or worse, the grain's `pointer-events: none` may not propagate correctly in stacking context edge cases.

**How to avoid:** The sidebar should use `z-index: var(--z-raised)` (10), which is below the grain overlay. The mobile drawer should use `z-index: var(--z-modal)` (200), which is above the grain. This means the grain texture is visible over the sidebar (intentional, subtle paper feel) but the mobile drawer overlay sits above the grain.

### Pitfall 7: Skip-to-Content Link Target Missing

**What goes wrong:** The skip link points to `#main-content` but no element has that ID. Screen reader users activate the link and nothing happens.

**How to avoid:** Add `id="main-content"` to the `<main>` element in BaseLayout. The skip link target must exist on every page.

---

## Code Examples

### BaseLayout.astro Enhanced Structure

```astro
---
import { Font } from 'astro:assets';
import { ClientRouter } from 'astro:transitions';
import '../styles/global.css';
import '../styles/tokens.css';
import '../styles/typography.css';
import '../styles/layout.css';
import '../styles/animations.css';
import Sidebar from '../components/layout/Sidebar.astro';
import TopBar from '../components/layout/TopBar.astro';
import MobileDrawer from '../components/layout/MobileDrawer.astro';
import Footer from '../components/layout/Footer.astro';
import SkipLink from '../components/layout/SkipLink.astro';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Portfolio of Adam Palencar, UI/UX Designer' } = Astro.props;
const currentPath = Astro.url.pathname;
---
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <ClientRouter />
    <Font cssVariable="--font-inter" />
    <Font cssVariable="--font-jetbrains-mono" />
    <script is:inline>
      (function() {
        const saved = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = saved ?? system;
      })();
    </script>
  </head>
  <body>
    <div class="grain-overlay" aria-hidden="true"></div>
    <SkipLink />
    <div class="site-layout">
      <Sidebar currentPath={currentPath} transition:persist />
      <TopBar currentPath={currentPath} />
      <MobileDrawer currentPath={currentPath} />
      <main id="main-content" class="site-layout__main">
        <slot />
      </main>
      <Footer />
    </div>
  </body>
</html>
```

### Available Pixelarticons for This Phase

| Icon File | Purpose | Verified |
|-----------|---------|----------|
| `home.svg` | Home nav item | Yes |
| `briefcase.svg` | Work nav item | Yes |
| `user.svg` | About nav item | Yes |
| `mail.svg` | Contact nav item + footer email | Yes |
| `moon.svg` | Dark mode (dark state) | Yes |
| `cloud-sun.svg` | Light mode indicator (no pure sun icon exists) | Yes |
| `chevron-down.svg` | Folder expand indicator | Yes |
| `menu.svg` | Hamburger menu trigger | Yes |
| `download.svg` | Resume download in footer | Yes |
| `link.svg` | LinkedIn external link in footer | Yes |
| `map-pin.svg` | Location in footer (optional) | Yes |

**Missing:** A dedicated `sun.svg` and a `close.svg` / `x.svg` for the mobile drawer close button. Check `node_modules/pixelarticons/svg/` for `x.svg`, `x-circle.svg`, or similar. If not found, create minimal custom SVGs or use the hamburger icon rotated.

### Nav Items Data Structure

```typescript
// Shared nav items definition (used by Sidebar, TopBar, MobileDrawer)
const navItems = [
  { label: 'Home', href: '/', icon: 'home' },
  {
    label: 'Work',
    href: '/work',
    icon: 'briefcase',
    children: [
      { label: 'Orbital Concierge', href: '/work/orbital-concierge' },
      // Future case studies added here
    ],
  },
  { label: 'About', href: '/about', icon: 'user' },
  { label: 'Contact', href: '/#contact', icon: 'mail' },
];
```

**Note:** Contact links to `/#contact` (anchor scroll), not a separate page. This is per PAGE-04 requirement.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `<ViewTransitions />` | `<ClientRouter />` from `astro:transitions` | Naming change in Astro 5+; same functionality |
| `max-height` hack for accordion | `grid-template-rows: 0fr/1fr` | Baseline 2024; smooth easing, no fixed max value needed |
| Manual `@font-face` for icons | astro-icon integration with local SVGs | Auto svgo, component interface, tree-shakeable |
| `DOMContentLoaded` | `astro:page-load` | Required for View Transitions compatibility; runs on every soft navigation |
| `position: fixed` sidebar | `position: sticky` + CSS grid | Sticky within grid column avoids content overlap issues |

---

## Open Questions

1. **Sun icon for theme toggle**
   - What we know: Pixelarticons has no `sun.svg`. `cloud-sun.svg` exists but is a sun-behind-cloud, not a pure sun.
   - What's unclear: Whether `cloud-sun` reads well at 24x24 in the toggle context.
   - Recommendation: Create a custom `sun.svg` (circle + 4 or 8 rays) in the pixelarticons style (pixel-aligned paths, `fill="currentColor"`, 24x24 viewBox). This is a 5-minute task for someone who can draw SVG paths. Alternatively, use `lightbulb` for light mode if the sun metaphor is not critical.

2. **Close icon for mobile drawer**
   - What we know: Need an X/close icon for the drawer close button.
   - Recommendation: Check pixelarticons for `x.svg` or similar. If not available, the hamburger menu icon animation (three bars to X via CSS transform) eliminates the need for a separate close icon entirely.

3. **Footer version number source**
   - What we know: D-12 says "from package.json or hardcoded."
   - Recommendation: Hardcode as `v0.1` for Phase 2. Dynamic reading from package.json at build time can be done via `import { version } from '../../package.json'` in the Footer component, but this adds a build-time import that may need Astro config adjustment. Defer to implementation discretion.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Astro | Framework | Yes | 6.1.5 | None needed |
| astro-icon | Icon component | Yes (installed, not configured) | 1.1.5 | None needed; must add to integrations |
| pixelarticons | SVG icon source | Yes | 2.0.2 | None needed |
| Node.js | Build | Yes | 24.13.1 | None needed |

**Missing dependencies with no fallback:** None.

**Configuration needed:** astro-icon must be added to `integrations` array in `astro.config.mjs`.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual visual + build verification (no unit test framework for Phase 2) |
| Config file | none |
| Quick run command | `npm run dev` + browser check at localhost:4321 |
| Full suite command | `npm run build` (must succeed with zero errors) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Command | File Exists? |
|--------|----------|-----------|---------|-------------|
| NAV-01 | Desktop sidebar at 220px, tablet top bar, mobile hamburger | Visual | Resize browser at 1440px, 900px, 375px | N/A (visual) |
| NAV-02 | Work folder expands on case study pages, accordion behavior | Visual + keyboard | Navigate to /work/orbital-concierge, verify expansion | N/A |
| NAV-03 | Dark mode toggle in sidebar with micro-interaction | Visual | Click toggle, verify icon swap + theme change | N/A |
| NAV-04 | Sidebar persists across navigation (no flicker) | Visual | Click nav links, watch for sidebar re-render | N/A |
| NAV-05 | Keyboard nav: Tab through all controls, aria-expanded, aria-current, focus-visible | Manual a11y | Tab through entire nav in each breakpoint | N/A |
| NAV-06 | Pixelarticons render via astro-icon at 24x24 | Visual | Inspect icon elements in DevTools | N/A |
| LAY-01 | ClientRouter in BaseLayout, View Transitions active | Visual | Navigate between pages, verify transition animation | N/A |
| LAY-02 | Footer with all 5 items, responsive stacking | Visual | Check footer at 1440px and 375px | N/A |
| LAY-03 | Responsive layout at all 3 breakpoints | Visual | Resize browser through breakpoints | N/A |

### Sampling Rate

- **Per task commit:** `npm run build` must pass
- **Per wave merge:** Visual check at all 3 breakpoints
- **Phase gate:** All NAV-0X and LAY-0X checks pass before Phase 3

### Wave 0 Gaps

- [ ] `src/icons/` directory with all needed pixelarticons SVGs copied in
- [ ] astro-icon integration added to `astro.config.mjs`
- [ ] `src/components/layout/` directory created
- [ ] Placeholder pages at `/work` and `/work/orbital-concierge` (can be minimal stubs) to test sidebar accordion and `aria-current` behavior

---

## Project Constraints (from CLAUDE.md)

| Directive | Constraint |
|-----------|------------|
| No component frameworks | Sidebar interactivity via inline `<script>` blocks, not React/Vue islands |
| Static output only | `output: 'static'` remains; no SSR for responsive detection |
| No GSAP | All sidebar/drawer animations via CSS transitions only |
| BEM naming | All new component classes follow BEM: `.sidebar`, `.sidebar__nav`, `.sidebar--open` |
| CSS @layer components | All new component styles go in `@layer components { }` |
| `astro:page-load` not `DOMContentLoaded` | Every script in every component must use this event |
| Dark mode via `[data-theme="dark"]` | Theme toggle updates this attribute + localStorage; no new mechanism |
| Self-hosted fonts only | No CDN icon fonts; SVG inline via astro-icon |

---

## Sources

### Primary (HIGH confidence)

- Astro View Transitions docs (https://docs.astro.build/en/guides/view-transitions/) - `transition:persist`, `<ClientRouter />`, lifecycle events
- astro-icon README (node_modules/astro-icon/README.md) - Integration setup, local SVG usage, `<Icon>` component API
- pixelarticons package (node_modules/pixelarticons/svg/) - Verified available icons: home, briefcase, user, mail, moon, cloud-sun, chevron-down, menu, download, link, map-pin
- CSS-Tricks Grid Height Transitions (https://css-tricks.com/css-grid-can-do-auto-height-transitions/) - `grid-template-rows: 0fr/1fr` technique
- Phase 1 codebase - tokens.css, global.css, layout.css, typography.css, BaseLayout.astro (all verified)
- PITFALLS.md (project research) - Sidebar accessibility pattern (Pitfall 9), View Transitions script re-execution (Pitfall 2)

### Secondary (MEDIUM confidence)

- Dev.to CSS height 0 to auto guide (https://dev.to/francescovetere/css-trick-transition-from-height-0-to-auto-21de) - Confirmed `grid-template-rows` browser support
- Astro persistent state blog post (https://astro.build/blog/astro-2100/) - Original `transition:persist` announcement and behavior documentation

### Tertiary (LOW confidence)

- Sun icon availability: verified by directory listing, but user may prefer a different visual metaphor; flagged as open question

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all packages already installed and verified in node_modules
- Architecture: HIGH - patterns verified against Astro docs and existing Phase 1 codebase
- Responsive behavior: HIGH - media query breakpoints match existing layout.css comments
- Accordion pattern: HIGH - `grid-template-rows` technique confirmed baseline 2024
- Icon availability: MEDIUM - most icons confirmed but sun/close icons need resolution
- Pitfalls: HIGH - drawn from existing PITFALLS.md + direct codebase inspection

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (stable patterns, no fast-moving dependencies)
