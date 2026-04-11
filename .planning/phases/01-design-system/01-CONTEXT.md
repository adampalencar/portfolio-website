# Phase 1: Design System - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

A working Astro 6 project with a complete CSS design system that every subsequent phase can build on without revisiting fundamentals. This includes: project scaffolding, CSS custom properties (tokens), self-hosted fonts, cascade layer architecture, dark mode infrastructure with flash prevention, and a grain texture overlay. No page layouts, components, or content in this phase.

</domain>

<decisions>
## Implementation Decisions

### Dark Mode Palette
- **D-01:** Claude derives the dark mode palette from the locked light theme values. Warm dark charcoal tones (#1A1A1A range), not cool/blue-black or true black.
- **D-02:** Forest green accent (#1B7A3D) stays identical in both light and dark modes. No hue or lightness shift.
- **D-03:** Dark mode uses [data-theme="dark"] attribute on html element, not a CSS class. Theme persists in localStorage.
- **D-04:** Flash prevention requires an is:inline script in head that reads localStorage before first paint, PLUS astro:after-swap handler to reapply after View Transition navigation.

### CSS Architecture
- **D-05:** Claude decides @layer order, BEM naming convention, and file structure. User will review the output but not pre-approve the plan.
- **D-06:** Research confirmed @layer + BEM from day one is required to prevent specificity debt at this project's complexity (11 components, dark mode, 3 breakpoints, animation states).

### Token Test Page
- **D-07:** Phase 1 must produce a visible "kitchen sink" test page at /dev showing: color swatches (light + dark), typography scale (all 3 layers: display, body, mono metadata), spacing scale, button states, and the grain texture. This page acts as a living reference during development.

### Grain Texture
- **D-08:** Use a small tiling PNG (~200x200px) with position:fixed, pointer-events:none, at 3-5% opacity. Not SVG filter (inconsistent across browsers) or CSS-only (less control). The PNG approach is heavier but predictable for scroll performance.

### Claude's Discretion
- CSS @layer order and naming (reset, tokens, base, components, utilities or similar)
- BEM naming depth and conventions
- File/folder structure for CSS partials
- Exact dark mode token values (within warm charcoal constraint)
- Grain texture PNG resolution and exact opacity
- Astro project configuration details (tsconfig, astro.config.mjs settings)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Visual Direction (design spec)
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Visual Direction and References.md` — Complete design spec: colors (hex codes), typography (font families, weights, sizes, line heights), spacing scale, accent usage rules, border/shadow treatment, motion principles, CSS custom properties starter
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Light Portfolio Visual Research.md` — Light theme research with specific portfolio references

### Research
- `.planning/research/STACK.md` — Astro 6.1.x stack decisions, Font API, Content Layer API, Netlify deploy
- `.planning/research/ARCHITECTURE.md` — File structure, CSS architecture, component boundaries
- `.planning/research/PITFALLS.md` — Dark mode FOWT fix, font loading, @layer requirements, View Transitions script re-execution

### Design (Pencil file)
- `C:\Users\mzbir\Downloads\portfolio design` — Pencil file with design system frame (tokens, 11 components) and homepage at 3 breakpoints. Contains exact color values, spacing, and typography hierarchy.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (greenfield project, empty directory)

### Established Patterns
- None (this phase establishes all patterns)

### Integration Points
- This phase's tokens.css and layer architecture will be imported by every subsequent phase
- The dark mode script and data-theme attribute convention will be used by all components
- The grain texture overlay will be applied at the BaseLayout level in Phase 2

</code_context>

<specifics>
## Specific Ideas

- The CSS custom properties starter in Visual Direction and References.md has the exact variable names and values to use as a starting point
- Fonts: Inter Variable (display/body) and JetBrains Mono Variable (metadata), both via @fontsource-variable packages and Astro Font API
- Icons: pixelarticons via astro-icon (24x24 grid, pure SVG) — verify integration path in this phase even though icons aren't used until Phase 2
- The grain texture should feel like paper texture, not digital noise (reference: Gerren Lamson's site for intensity calibration)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-design-system*
*Context gathered: 2026-04-11*
