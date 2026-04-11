# Domain Pitfalls

**Domain:** Astro portfolio site (vanilla CSS, View Transitions, Netlify free tier)
**Researched:** 2026-04-11

---

## Critical Pitfalls

Mistakes that cause visible regressions, accessibility failures, or full rewrites.

---

### Pitfall 1: Dark Mode Flash of Wrong Theme (FOWT) — Compounded by View Transitions

**What goes wrong:** On page load (and on every view transition navigation), the page briefly renders in the wrong theme before the correct one applies. Two separate failure modes stack:

1. **Initial load flash:** The browser renders the HTML before the inline script reads localStorage. If the script is bundled (Astro's default), it's deferred — the FOWT is guaranteed.
2. **View Transitions flash:** Astro's ClientRouter replaces `document.documentElement` during each page swap. Any `.dark` class or `data-theme` attribute applied by your script gets wiped. The theme must be reapplied in the `astro:after-swap` lifecycle event, or it drops on every navigation.

**Why it happens:** Astro bundles scripts into external files by default, which defer execution. The `data-theme` attribute swap has to happen before the browser paints — that requires an inline, non-deferred script in `<head>`.

**Consequences:** Every page load shows a white flash even in dark mode. Every internal navigation re-flashes. This is immediately noticeable to hiring managers.

**Prevention:**
- Put the theme-reading script in the layout `<head>` with `is:inline` to prevent Astro from bundling and deferring it.
- Listen to `astro:after-swap` and reapply the theme class/attribute there before the new page renders.
- Use a `data-theme` attribute on `<html>` rather than a `.dark` class — attributes survive some swap scenarios more predictably.
- Test with throttled CPU + cold cache, not fast dev server.

**Warning signs:** Any flash visible in the browser during Lighthouse or throttled testing. Theme state not persisting across navigated pages.

**Phase:** Address in the design system/layout shell phase, before building any components. This is foundational — everything else depends on it working.

---

### Pitfall 2: View Transitions Script Re-execution Mismatch

**What goes wrong:** Bundled module scripts (Astro's default) run exactly once on the first full page load. When the user navigates to another page via View Transitions (soft navigation), scripts on the new page are silently skipped. Scroll-triggered animations, IntersectionObservers, hover-to-video initializers, and any event listeners set up in scripts will not run on subsequent pages.

**Why it happens:** Soft navigation does not trigger a new page load. Astro intentionally avoids re-running module scripts to prevent duplicate side effects. The tradeoff is that anything relying on "script runs on page load" breaks after the first page.

**Consequences:**
- Fade-up reveal animations never fire on pages reached via internal links.
- Hover-to-video doesn't work on project cards unless the user lands directly on that URL.
- IntersectionObservers are never registered, so no animations trigger.
- Event listeners accumulate if re-registered without cleanup, causing lag after several navigations.

**Prevention:**
- Wrap all page-level initializers (IntersectionObserver setup, hover-to-video, staggered animation setup) inside a `document.addEventListener('astro:page-load', ...)` handler. This fires on both initial load and every soft navigation.
- Clean up listeners in `astro:before-preparation` to prevent accumulation.
- Use `data-astro-rerun` on inline scripts that must re-execute, but prefer lifecycle events for anything stateful.
- Treat `astro:page-load` as the equivalent of `DOMContentLoaded` for this project.

**Warning signs:** Animations work when navigating directly to a URL but not when using internal nav links. Works in dev but not in production (different script bundling behavior).

**Phase:** Address during the animations/interactions phase. All scroll-triggered and hover effects must be wired through `astro:page-load` from the start — retrofitting this is painful.

---

### Pitfall 3: View Transitions Conflicting with CSS Transitions on Themed Elements

**What goes wrong:** Elements that have CSS `transition` properties (e.g., background-color on dark mode toggle, color transitions on links) flicker visibly during view transitions because the old page's transition and the new page's swap animation run simultaneously at different rates.

There is a confirmed GitHub issue (#8711) showing this flickering specifically when View Transitions, dark mode, and CSS transitions interact. The mechanism: the outgoing page's elements are still mid-transition when the incoming page's elements begin their entrance animation.

**Consequences:** Visible color flicker on navigation. Particularly bad on elements with long transition durations (300ms+).

**Prevention:**
- Limit CSS `transition` duration on elements that are likely to be part of view transition animations (sidebar, nav, page background).
- Temporarily disable CSS transitions during the swap phase using `astro:before-preparation` to add a no-transitions class, then remove it in `astro:after-swap`.
- Keep view transition animations and CSS hover/theme transitions in separate layers with explicit `view-transition-name` values to prevent accidental overlap.

**Warning signs:** Any flicker visible when clicking nav links while in dark mode.

**Phase:** Address during the View Transitions implementation phase, after dark mode is working. Do not layer animations on top of unresolved theme switching.

---

### Pitfall 4: Scroll Position Not Restored Correctly After Back Navigation

**What goes wrong:** Users navigate to a case study, scroll down to read it, click the browser back button, and return to the Work page at the top instead of their previous scroll position.

**Why it happens:** Astro's ClientRouter stores scroll position in browser history state, but the `astro:after-swap` event is the correct hook for overriding scroll restoration — if any code in that handler inadvertently calls `window.scrollTo(0, 0)` or re-triggers layout shift, the stored position is discarded.

**Consequences:** Back button behavior feels broken. Frustrating UX for hiring managers browsing multiple case studies.

**Prevention:**
- Do not call `scrollTo` or set `scrollTop` inside `astro:after-swap` unless explicitly required for a specific page type.
- Test back navigation explicitly during QA, not just forward navigation.
- If implementing scroll-to-top on forward navigation (common for page transitions), scope it to `astro:before-preparation` and only for forward navigations, not back/forward history traversal.

**Warning signs:** Works on fresh load but breaks scroll context on back button.

**Phase:** QA phase, but the architecture decision (where scroll resets happen) must be locked in during the View Transitions implementation phase.

---

## Moderate Pitfalls

---

### Pitfall 5: Flash of Invisible/Unstyled Text (FOIT/FOUT) with Self-Hosted Fonts

**What goes wrong:** Inter and JetBrains Mono are specified as self-hosted fonts. Without explicit loading strategy, browsers either hide text until fonts load (FOIT) or show fallback text that reflows when the correct font loads (FOUT). The monospace metadata layer (JetBrains Mono) is the site's primary visual differentiator — a layout shift here is particularly damaging to the design-craft impression.

**Why it happens:** `font-display` defaults to `auto` in most configurations, which behaves like `block` (FOIT) in most browsers. Astro 6 has a built-in Fonts API that handles this, but only if used — if fonts are manually declared in CSS `@font-face` blocks without `font-display: swap`, you get default behavior.

**Consequences:** Text-heavy sections (case study body copy, metadata labels) appear invisible for 100-300ms, then pop in. JetBrains Mono labels shift layout on load.

**Prevention:**
- Use Astro 6's built-in Font API if the project targets Astro 6+. It generates optimized fallbacks and preload links automatically.
- If using manual `@font-face`, always specify `font-display: swap` and provide a metric-matched fallback font (e.g., `font-family: 'Inter', 'Helvetica Neue', sans-serif`) to minimize reflow distance.
- Add `<link rel="preload" as="font" crossorigin>` in the layout `<head>` for the WOFF2 files of Inter Regular and JetBrains Mono Regular/Bold (the most critical weights).
- Subset fonts to the character ranges actually used (Latin subset covers this project).
- WOFF2 only — no TTF or OTF in the build.

**Warning signs:** Cumulative Layout Shift (CLS) above 0.1 in Lighthouse. Text visible in Lighthouse filmstrip as invisible/wrong-size.

**Phase:** Foundation phase, alongside design system. Font loading is load-critical infrastructure.

---

### Pitfall 6: Astro Image Component Bypassed with Raw `<img>` Tags in Markdown

**What goes wrong:** Case study content is stored as Markdown files. Images in Markdown use raw `<img>` syntax or standard Markdown `![]()` syntax. These bypass Astro's image optimization pipeline entirely — they are copied to the build as-is, no WebP conversion, no responsive `srcset`, no lazy loading, no explicit dimensions.

**Why it happens:** Astro's `<Image>` component is a `.astro` component. It cannot be used directly inside Markdown content. Standard Markdown image syntax falls through to plain `<img>` unless a remark/rehype plugin or MDX is used.

**Consequences:** Case study screenshot assets (the largest images on the site) are served at full PNG resolution. The Orbital Concierge case study has "final screenshot assets ready" — these are likely high-resolution PNGs. Page weight could be 5-10x what it should be. No CLS protection from missing dimensions.

**Prevention:**
- Use MDX (`.mdx`) instead of plain Markdown (`.md`) for case study pages. This allows importing and using the Astro `<Image>` component inline.
- Alternatively, configure the `@astrojs/mdx` + `rehype-astro-image` approach to auto-optimize Markdown images.
- For any image that must be a plain `<img>`, always add explicit `width` and `height` attributes to prevent CLS.
- Always specify the `quality` parameter (85 is a safe default) to avoid visibly blurry output from Astro's aggressive default compression.

**Warning signs:** Lighthouse Performance score drops below 90 on case study pages. Network tab shows PNG files above 200KB.

**Phase:** Address in the case study template phase, before populating any image content. The format decision (MDX vs MD) must be made before writing case study markup.

---

### Pitfall 7: Vanilla CSS Specificity Creep

**What goes wrong:** Starting with low-specificity selectors (element and class selectors) is correct, but as the site grows — responsive overrides, dark mode variations, component state variants, animation states — specificity climbs unevenly. Developers compensate with more specific selectors or `!important`, which cascades into a specificity war by the case study phase.

This project uses a design system with 11 components and a 12-column grid. That is enough surface area for specificity debt to compound.

**Why it happens:** Vanilla CSS has no inherent scoping. Without a methodology, every developer (or every context switch) applies selectors at arbitrary specificity levels.

**Consequences:** Dark mode overrides require increasingly specific selectors to win. Responsive breakpoints fight with component defaults. Adding a new component risks unexpected style inheritance.

**Prevention:**
- Adopt a flat BEM-style naming convention from the start: `.component`, `.component__element`, `.component--modifier`. Avoid nesting selectors more than 2 levels deep.
- Use CSS Cascade Layers (`@layer reset, base, components, utilities`) to enforce specificity ordering without relying on source order. Dark mode overrides live in a higher layer; they win by architecture, not by specificity.
- Keep design tokens as CSS custom properties on `:root`. Never hardcode values in component rules — always reference tokens. This makes dark mode a token-swap, not a selector war.
- Keep a single `tokens.css` file for all custom properties. Never define `--color-*` values inside component files.

**Warning signs:** Any `!important` appearing in source. Any selector with more than one class chained (`.sidebar.is-open .nav-link`). Dark mode rules needing a parent class (`.dark .component`) instead of a token swap.

**Phase:** Design system / foundation phase. BEM naming and cascade layer architecture must be established before any component is written. Retrofitting is a full rewrite.

---

### Pitfall 8: Netlify Free Tier 404 and Redirect Handling

**What goes wrong:** Three distinct failure modes:

1. **Custom 404 page not served:** Astro generates a `404.html`, but Netlify only serves it automatically if it is named `404.html` at the root of the publish directory. If the output structure places it elsewhere, Netlify falls back to its own generic 404 page.
2. **Redirect rules not applied:** Redirects configured in `astro.config.mjs` are translated to meta-refresh tags for static output (not real HTTP redirects). Hiring managers clicking old links get a delay and no SEO benefit.
3. **Rule ordering in `_redirects`:** If both a `_redirects` file (from `public/`) and Astro-generated redirects exist, the combined file may have ordering conflicts. Netlify processes rules top-to-bottom and stops at first match — rules out of order silently route incorrectly.

**Prevention:**
- Confirm `404.astro` builds to `dist/404.html` in the output. Test by visiting a nonexistent URL on the Netlify preview deployment, not just locally.
- Put all redirect rules in `public/_redirects` directly, not in `astro.config.mjs`. This produces real Netlify HTTP redirects.
- If a `netlify.toml` is used for headers, keep redirects in `_redirects` (not both places) to avoid conflict.
- For purely static output (no adapter), no `@astrojs/netlify` adapter is needed — do not install it unnecessarily, as it switches the output mode.

**Warning signs:** Direct URL visits work but refresh on sub-routes 404. Preview deploy shows Netlify's own 404 page instead of the custom one.

**Phase:** Deployment/infrastructure phase. Set up `_redirects` and test the 404 page on the first Netlify deploy, before building the full site.

---

## Minor Pitfalls

---

### Pitfall 9: Sidebar Navigation Accessibility Gaps

**What goes wrong:** The collapsible sidebar (fixed desktop, collapsible tablet, hamburger mobile) has multiple accessibility failure points that are easy to overlook:

- Hamburger toggle button has no accessible name (icon-only button with no `aria-label`).
- Menu open/close state not communicated to screen readers (`aria-expanded` missing).
- When menu opens, focus is not moved into the menu — keyboard users have to Tab through all preceding content to reach nav items.
- When menu closes, focus is not returned to the toggle button.
- Obsidian-style folder expansion (Work > child projects) uses a custom control that may not announce its expand/collapse state.

**Prevention:**
- Toggle button must have `aria-label="Open navigation"` (or equivalent) and `aria-controls="[menu-id]"`.
- Toggle button must have `aria-expanded="true|false"` updated on state change.
- On open: move focus to first nav item (`navItem.focus()`).
- On close: return focus to the toggle button.
- Folder expansion controls must be `<button>` elements (not `<div>`) with `aria-expanded`.
- The `<nav>` element must have `aria-label="Main navigation"` to distinguish it from any footer nav.
- Test with keyboard-only navigation before calling any phase done.

**Warning signs:** Tab key cannot reach nav items without opening the menu first. Screen reader announces "button" with no label for the hamburger icon. VoiceOver/NVDA reads the folder toggle as static text.

**Phase:** Navigation/layout phase. Accessibility is not a QA afterthought — build correct ARIA into the initial component, not in a post-build pass.

---

### Pitfall 10: `prefers-reduced-motion` Applied Inconsistently

**What goes wrong:** The spec lists `prefers-reduced-motion` as a requirement. Astro's ClientRouter does disable its built-in transition animations when this preference is set. However, custom CSS animations (fade-up reveals, staggered content, line-by-line text), IntersectionObserver-triggered animations, and hover-to-video effects are not automatically disabled — they must each be explicitly wrapped.

**Consequences:** Users with vestibular disorders or motion sensitivity experience full animation despite having the OS-level preference set. WCAG 2.2 AA failure (2.3.3 Animation from Interactions, AAA — but 2.3.3 is good practice regardless).

**Prevention:**
- Add a single global rule at the top of the base stylesheet:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- In IntersectionObserver setup, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip registering observers if true.
- Hover-to-video: check the same media query before attaching the mouseenter listener. Or use `<video>` with `prefers-reduced-motion` media queries on the `autoplay` attribute.

**Warning signs:** Any animation that fires even with the OS "Reduce Motion" setting active.

**Phase:** Foundation phase. The global CSS rule goes in the base stylesheet on day one. The JS checks go in during the animations phase.

---

### Pitfall 11: CSS Custom Properties Not Inheriting Correctly in Shadow DOM or Nested Iframes

**Note:** This project uses no shadow DOM or iframes, so this pitfall is low-risk. However: if Pixelarticons SVGs are inlined, ensure `fill: currentColor` is used rather than hardcoded colors so icons inherit the theme token correctly. Hardcoded `fill="#1B7A3D"` in SVG markup will not respond to dark mode token swaps.

**Prevention:**
- When inlining SVG icons, replace all hardcoded `fill` and `stroke` values with `currentColor`.
- Define icon color via CSS custom properties, not in the SVG directly.

**Phase:** Design system phase, when icon integration is first set up.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Design system / CSS foundation | Specificity creep from start | Establish `@layer` + BEM naming before first component |
| Layout shell / dark mode toggle | FOWT on page load | `is:inline` script in `<head>` before body renders |
| Font integration | FOUT on JetBrains Mono labels | `font-display: swap` + `<link rel="preload">` in layout head |
| Navigation component | Sidebar accessibility gaps | ARIA from the start, keyboard test before merging |
| View Transitions setup | Dark mode class reset on every navigation | `astro:after-swap` handler to reapply theme |
| Scroll-triggered animations | IntersectionObserver never fires on navigated pages | All observers initialized inside `astro:page-load` |
| Case study template | Markdown images bypassing optimization | Decide MDX vs MD before writing case study markup |
| Animations + transitions | CSS transition flicker during page swap | Scope transition properties, consider no-transitions class during swap |
| Netlify deployment | 404 and redirect misconfigurations | Test custom 404 + `_redirects` on first preview deploy |
| QA pass | `prefers-reduced-motion` not respected in custom animations | Global CSS rule + JS media query checks |

---

## Sources

- [Astro View Transitions — Official Docs](https://docs.astro.build/en/guides/view-transitions/)
- [Updating State after Transitions — Bag of Tricks](https://events-3bg.pages.dev/jotter/astro/scripts/)
- [ViewTransitions loses scroll position — GitHub #8083](https://github.com/withastro/astro/issues/8083)
- [Flicker issue with ViewTransition, darkMode, CSS Transition — GitHub #8711](https://github.com/withastro/astro/issues/8711)
- [View Transition resets html attributes — GitHub #7765](https://github.com/withastro/astro/issues/7765)
- [Flashless Dark Mode with Astro](https://www.vbesse.com/en/blog/flashless-dark-mode/)
- [Astro Dark Mode flickering — Medium](https://medium.com/@maiowebdesign/astro-dark-mode-flickering-62da94d08ce6)
- [Prevent dark mode flicker in Astro](https://axellarsson.com/blog/astrojs-prevent-dark-mode-flicker/)
- [Using custom fonts — Astro Docs](https://docs.astro.build/en/guides/fonts/)
- [Astro Self-Hosted Fonts Workflow — Rodney Lab](https://rodneylab.com/astro-self-hosted-fonts/)
- [Images — Astro Docs](https://docs.astro.build/en/guides/images/)
- [Overcoming CSS Cascade Issues in Large Projects](https://blog.pixelfreestudio.com/overcoming-css-cascade-issues-in-large-projects/)
- [CSS Cascade Layers Guide — CSS-Tricks](https://css-tricks.com/css-cascade-layers/)
- [Astro Netlify Deployment Docs](https://docs.astro.build/en/guides/deploy/netlify/)
- [Setting up Netlify Redirects with Astro — DEV Community](https://dev.to/cassidoo/setting-up-netlify-redirects-with-astro-426g)
- [Accessible Mobile Navigation — A11y Matters](https://a11ymatters.com/pattern/mobile-nav/)
- [Accessibility for Hamburger Menu — Medium](https://medium.com/@linlinghao/accessibility-for-hamburger-menu-a37fa9617a89)
- [Astro Global Flow & Events — Bag of Tricks](https://events-3bg.pages.dev/jotter/astro/flow-events/)
