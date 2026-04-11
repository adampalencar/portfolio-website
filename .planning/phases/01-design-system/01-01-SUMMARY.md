---
phase: 01-design-system
plan: 01
subsystem: ui
tags: [astro, css-custom-properties, design-tokens, dark-mode, variable-fonts, fontsource, css-layers]

# Dependency graph
requires: []
provides:
  - "Astro 6 project scaffold with static output and Netlify config"
  - "Complete CSS token set (light + dark) in tokens.css"
  - "Typography scale with 3 layers (display, body, mono-label)"
  - "12-col grid system with responsive breakpoints"
  - "@layer cascade architecture (reset, tokens, base, components, utilities)"
  - "BaseLayout shell with Font API, dark mode flash prevention, grain overlay"
affects: [02-navigation, 03-content-system, 04-homepage, 05-animations, 06-polish]

# Tech tracking
tech-stack:
  added: [astro@6, @fontsource-variable/inter, @fontsource-variable/jetbrains-mono, astro-icon, pixelarticons]
  patterns: [css-layers, data-theme-attribute, is-inline-theme-script, font-api-cssVariable, grain-overlay]

key-files:
  created:
    - astro.config.mjs
    - tsconfig.json
    - netlify.toml
    - package.json
    - src/styles/global.css
    - src/styles/tokens.css
    - src/styles/typography.css
    - src/styles/layout.css
    - src/styles/animations.css
    - src/layouts/BaseLayout.astro
    - src/pages/index.astro
    - public/textures/grain.png
    - .gitignore
  modified: []

key-decisions:
  - "Font names use 'Inter' and 'JetBrains Mono' (not 'Variable' suffix) for Fontsource provider compatibility"
  - "Grain texture generated as 200x200 Perlin noise PNG via sharp at build, ~34KB"
  - "@layer order: reset, tokens, base, components, utilities"

patterns-established:
  - "All color/spacing/type values via CSS custom properties in tokens.css"
  - "Dark mode via [data-theme='dark'] attribute on html, overriding only color tokens"
  - "Two-part theme persistence: is:inline script in head + astro:after-swap listener"
  - "Global CSS import order: global.css first (declares layers), then tokens, typography, layout, animations"
  - "Semantic font tokens: --font-body wraps --font-inter, --font-mono wraps --font-jetbrains-mono"

requirements-completed: [FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05]

# Metrics
duration: 5min
completed: 2026-04-11
---

# Phase 1 Plan 1: Astro Scaffold + CSS Design System Summary

**Astro 6 project with complete CSS token architecture (light/dark), self-hosted variable fonts via Font API, @layer cascade, and BaseLayout with flash-free dark mode**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T19:12:45Z
- **Completed:** 2026-04-11T19:17:28Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Astro 6 project scaffolded with static output, Font API, and Netlify deploy config
- Complete CSS design system: tokens (colors, spacing, typography, z-index, grid) with dark mode overrides
- BaseLayout shell with self-hosted Inter + JetBrains Mono via Font API, two-part dark mode flash prevention, and grain texture overlay
- @layer cascade architecture preventing specificity conflicts from day one

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro project and configure Font API** - `2197f41` (feat)
2. **Task 2: Create CSS architecture and BaseLayout with dark mode** - `de8d642` (feat)
3. **Chore: Add .gitignore** - `f797276` (chore)

## Files Created/Modified
- `astro.config.mjs` - Astro 6 config with static output, Font API for Inter + JetBrains Mono
- `tsconfig.json` - Strict TypeScript config extending Astro defaults
- `netlify.toml` - Build config and 404 redirect
- `package.json` - Project manifest with all dependencies
- `src/styles/global.css` - @layer declaration, reset, body defaults, grain overlay, reduced-motion
- `src/styles/tokens.css` - All CSS custom properties for light and dark modes
- `src/styles/typography.css` - Type scale (h1-h6, p, code, .mono-label)
- `src/styles/layout.css` - 12-col grid, container, responsive breakpoint
- `src/styles/animations.css` - Placeholder for Phase 5 keyframes
- `src/layouts/BaseLayout.astro` - HTML shell with Font components, theme scripts, grain overlay
- `src/pages/index.astro` - Minimal stub using BaseLayout
- `public/textures/grain.png` - 200x200 tiling noise texture for paper feel
- `.gitignore` - Excludes node_modules, dist, .astro

## Decisions Made
- Fontsource provider requires bare font family names ("Inter", "JetBrains Mono") not the "Variable" suffixed names. Fixed during Task 1 after build warnings.
- Grain texture generated programmatically via sharp (200x200px, subtle Perlin noise, ~34KB). Acceptable size for a single cached static asset.
- @layer order chosen as reset > tokens > base > components > utilities per research recommendation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected Fontsource font family names**
- **Found during:** Task 1 (Font API configuration)
- **Issue:** Plan specified 'Inter Variable' and 'JetBrains Mono Variable' but Fontsource provider expects 'Inter' and 'JetBrains Mono' (verified via package metadata.json)
- **Fix:** Changed `name` field in astro.config.mjs fonts array to use correct names
- **Files modified:** astro.config.mjs
- **Verification:** Build succeeds with "Copying fonts (2 files)" and zero warnings
- **Committed in:** 2197f41 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for font loading. No scope creep.

## Issues Encountered
- Astro CLI `npm create astro@latest .` refuses non-empty directories. Worked around by manually creating package.json and installing dependencies directly, which is functionally equivalent.

## Known Stubs
None. All tokens, typography rules, layout grid, and BaseLayout are fully wired with real values from the design spec.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All CSS tokens, typography, layout, and dark mode infrastructure ready for component development
- BaseLayout available as the shared HTML shell for all pages
- The /dev kitchen sink page (D-07) is not in this plan; it is in plan 01-02
- Font API variables (--font-inter, --font-jetbrains-mono) are injected and bound to semantic tokens

## Self-Check: PASSED

All 13 files verified present. All 3 commits verified in git log.

---
*Phase: 01-design-system*
*Completed: 2026-04-11*
