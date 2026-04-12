---
phase: 03-content-infrastructure
plan: 01
subsystem: ui
tags: [astro, mdx, zod, content-collections, css]

requires:
  - phase: 02-navigation-shell
    provides: BaseLayout.astro wrapper pattern and design token CSS variables

provides:
  - MDX integration (@astrojs/mdx) configured in astro.config.mjs
  - Zod-validated case-studies content collection schema (src/content.config.ts)
  - CaseStudyLayout.astro template with hero, body slot, CTA, and prev/next nav
  - Dynamic route src/pages/work/[id].astro generating pages from content collection
  - BEM CSS layer for case study components (src/styles/case-study.css)
  - Empty src/content/case-studies/ and src/assets/case-studies/orbital-concierge/ directories ready for Plan 02

affects: [03-02-orbital-concierge-case-study, 04-work-index, 05-homepage]

tech-stack:
  added: ["@astrojs/mdx@5.0.3"]
  patterns:
    - "Content Layer API with glob() loader for file-based MDX collections"
    - "schema: ({ image }) callback pattern for Astro 6 image() helper in Zod schema"
    - "Dynamic route passes entry + sorted prev/next as props; layout does not call getCollection"
    - "BEM CSS in @layer components using only design tokens from tokens.css"

key-files:
  created:
    - src/content.config.ts
    - src/layouts/CaseStudyLayout.astro
    - src/pages/work/[id].astro
    - src/styles/case-study.css
  modified:
    - astro.config.mjs
    - package.json

key-decisions:
  - "image() helper destructured from schema callback ({ image }), not imported from astro/zod — Astro 6 content layer API pattern"
  - "Static orbital-concierge.astro deleted to prevent route conflict (static routes silently win over dynamic in Astro)"
  - "CTA section lives in layout, not MDX body — structural element same on every case study"
  - "Prev/next sorted by tier ascending then id alphabetical for stable ordering"

patterns-established:
  - "Case study route pattern: [id].astro calls getStaticPaths + getCollection, computes prev/next, passes to layout as props"
  - "Layout pattern: CaseStudyLayout accepts entry/prev/next props, renders hero/body-slot/cta/nav"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-05]

duration: 12min
completed: 2026-04-11
---

# Phase 03 Plan 01: Content Infrastructure Summary

**MDX integration, Zod-validated case-studies collection schema, CaseStudyLayout template with hero/CTA/prev-next, and dynamic [id].astro routing — full content pipeline for MDX-driven case study pages**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-11T20:52:13Z
- **Completed:** 2026-04-11T20:54:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Installed @astrojs/mdx and wired mdx() into astro.config.mjs integrations array
- Created src/content.config.ts with full 10-field Zod schema including image() helper for thumbnail
- Built CaseStudyLayout.astro wrapping BaseLayout with hero image, title, oneliner, metadata, MDX body slot, CTA section, and prev/next navigation
- Created dynamic src/pages/work/[id].astro route with getStaticPaths, sorted prev/next computation, and render(entry) for MDX compilation
- Deleted conflicting static orbital-concierge.astro placeholder
- Build passes with zero errors; empty collection produces no pages (expected, Plan 02 adds content)

## Task Commits

1. **Task 1: Install MDX integration and create content schema** - `b91a7ae` (feat)
2. **Task 2: Create CaseStudyLayout and case study CSS** - `bd4d8bb` (feat)
3. **Task 3: Create dynamic route and delete static placeholder** - `aed2fac` (feat)

## Files Created/Modified

- `astro.config.mjs` - Added mdx() integration and @astrojs/mdx import
- `package.json` - Added @astrojs/mdx@5.0.3 dependency
- `src/content.config.ts` - Case studies collection with Zod schema (title, oneliner, role, timeline, tools, category, tier, thumbnail, tags)
- `src/layouts/CaseStudyLayout.astro` - Minto Pyramid case study template wrapping BaseLayout
- `src/styles/case-study.css` - BEM styles in @layer components using design tokens
- `src/pages/work/[id].astro` - Dynamic route generating one page per MDX file
- `src/pages/work/orbital-concierge.astro` - Deleted (static placeholder conflicted with dynamic route)

## Decisions Made

- image() helper uses Astro 6 content layer pattern: destructured from schema({ image }) callback, not imported from astro/zod
- Static orbital-concierge.astro deleted because Astro static routes silently take priority over dynamic routes, causing the placeholder to win
- CTA ("Want to work together?") lives in CaseStudyLayout, not in MDX body — structural element identical across all case studies
- Prev/next sorted by tier ascending then id alphabetical for stable, predictable ordering

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. All files are infrastructure/template code with no hardcoded placeholder data flowing to UI. Content (MDX + screenshots) is added in Plan 02.

## Issues Encountered

None. Build succeeded first attempt. The "No files found matching *.mdx" warning is expected with an empty collection.

## Next Phase Readiness

- Content pipeline is fully wired: dropping an MDX file into src/content/case-studies/ automatically generates a styled, routed case study page
- src/content/case-studies/ ready for Plan 02 MDX file
- src/assets/case-studies/orbital-concierge/ ready for Plan 02 screenshots
- No blockers

---
*Phase: 03-content-infrastructure*
*Completed: 2026-04-11*
