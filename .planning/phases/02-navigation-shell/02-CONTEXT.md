# Phase 2: Navigation Shell - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Every page on the site has a consistent, accessible chrome (sidebar, footer, base layout) that works across all three breakpoints and persists cleanly across navigations. This phase builds the structural shell that all content phases (3-6) slot into. No page content, no case studies, no animations beyond functional transitions.

</domain>

<decisions>
## Implementation Decisions

### Sidebar Responsive Behavior
- **D-01:** Desktop (1200px+): fixed left sidebar at 220px (per --sidebar-width token). Content area fills remaining width.
- **D-02:** Tablet (768-1199px): sidebar collapses to a horizontal top bar with nav items inline. No sidebar drawer.
- **D-03:** Mobile (<768px): hamburger icon in top bar. Sidebar slides in as an overlay from the left with a semi-transparent backdrop. Body scroll locked while open.
- **D-04:** Sidebar uses `transition:persist` (Astro View Transitions) so it does not re-render or flicker on page navigation.

### Dark Mode Toggle
- **D-05:** Toggle lives in the sidebar bottom section (desktop) and in the top bar (tablet/mobile).
- **D-06:** Icon-based toggle using Pixelarticons sun/moon icons via astro-icon. CSS transition on icon swap (opacity crossfade or rotation, Claude's discretion on exact animation).
- **D-07:** Toggle fires the same localStorage + data-theme logic already in BaseLayout. No new persistence mechanism.

### Obsidian-Style Folder Expansion
- **D-08:** Sidebar nav has top-level items (Home, Work, About, Contact). "Work" is the folder parent.
- **D-09:** When on a case study page, the Work section auto-expands to show child project links as a nested list. Only one folder section can be expanded at a time (accordion pattern).
- **D-10:** Expansion uses CSS height transition (max-height or grid-template-rows). No JS animation library.
- **D-11:** Current page highlighted with `aria-current="page"` and a visual indicator (left border accent or background tint, Claude's discretion).

### Footer
- **D-12:** Dense single-row footer on desktop: email (mailto link), LinkedIn (external link), resume (download link), location text ("Based in Toronto, ON"), version number (from package.json or hardcoded).
- **D-13:** Footer stacks vertically on mobile. Pipe or dot separators on desktop collapse to line breaks on mobile.
- **D-14:** Footer uses `.mono-label` styling from Phase 1 typography system. Subtle, informational, not decorative.

### BaseLayout Enhancement
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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Visual Direction (design spec)
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Visual Direction and References.md` -- Complete design spec: sidebar layout, nav items, footer content, breakpoints, spacing
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Light Portfolio Visual Research.md` -- Light theme research with sidebar/nav references

### Design (Pencil file)
- `C:\Users\mzbir\Downloads\portfolio design` -- Pencil file with homepage at 3 breakpoints showing sidebar layout, top bar tablet variant, and mobile hamburger. Contains exact component dimensions and spacing.

### Research from Phase 1
- `.planning/research/STACK.md` -- Astro 6.1.x stack: ClientRouter, View Transitions, transition:persist
- `.planning/research/ARCHITECTURE.md` -- File structure, component boundaries
- `.planning/research/PITFALLS.md` -- View Transitions script re-execution, dark mode flash fix

### Phase 1 Context
- `.planning/phases/01-design-system/01-CONTEXT.md` -- CSS architecture decisions, token conventions, dark mode implementation

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/BaseLayout.astro` -- HTML shell with Font API, theme script, grain overlay. Phase 2 enhances this with ClientRouter and sidebar/footer slots.
- `src/styles/tokens.css` -- All CSS custom properties including `--sidebar-width: 220px`, z-index scale, spacing scale, color tokens
- `src/styles/typography.css` -- `.mono-label` class for footer text styling
- `src/styles/layout.css` -- `.container` and `.grid` classes, breakpoint values documented as comments
- `src/styles/global.css` -- `@layer` declaration order, `.sr-only` utility for skip link
- `public/textures/grain.png` -- Grain overlay already in BaseLayout
- `astro-icon` + `pixelarticons` packages already installed in package.json

### Established Patterns
- CSS cascade layers: `@layer reset, tokens, base, components, utilities` -- new components go in `@layer components`
- BEM naming convention (FOUN-04)
- Dark mode via `[data-theme="dark"]` attribute swap + localStorage
- Font variables: `var(--font-body)` for Inter, `var(--font-mono)` for JetBrains Mono

### Integration Points
- BaseLayout.astro `<slot />` is where sidebar + content wrapper will be inserted
- Theme toggle needs to call same `localStorage.setItem('theme', ...)` + `document.documentElement.dataset.theme = ...` pattern
- `astro:after-swap` event already handled for theme; sidebar state may also need this handler
- Nav items will link to routes built in Phases 3-4; use placeholder hrefs for now

</code_context>

<specifics>
## Specific Ideas

- Sidebar nav items use Pixelarticons: home, briefcase (Work), user (About), mail (Contact)
- The "field manual" identity means the sidebar should feel utilitarian, not decorative. Think file system browser, not marketing nav.
- Footer version number pattern: "v1.0" or "2026.04" in mono-label style
- The Obsidian folder metaphor is key UX: designers/hiring managers who use Obsidian will recognize the pattern immediately

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 02-navigation-shell*
*Context gathered: 2026-04-11*
