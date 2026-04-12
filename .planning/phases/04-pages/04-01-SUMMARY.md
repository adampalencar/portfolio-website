---
phase: 04-pages
plan: "01"
subsystem: components/content
tags: [project-card, content-collection, mdx, astro-image]
dependency_graph:
  requires: []
  provides:
    - src/components/ui/ProjectCard.astro
    - src/content/case-studies/krom.mdx
    - src/content/case-studies/pipeline.mdx
    - src/assets/case-studies/krom/hero.png
    - src/assets/case-studies/pipeline/hero.png
  affects:
    - Homepage (featured cards)
    - Work page (tiered grid)
tech_stack:
  added: []
  patterns:
    - Astro Image component with responsive widths/sizes
    - BEM naming in scoped @layer components CSS
    - CollectionEntry<'case-studies'> typed props
    - sharp one-liner for placeholder PNG generation
key_files:
  created:
    - src/components/ui/ProjectCard.astro
    - src/content/case-studies/krom.mdx
    - src/content/case-studies/pipeline.mdx
    - src/assets/case-studies/krom/hero.png
    - src/assets/case-studies/pipeline/hero.png
  modified: []
decisions:
  - "16:9 aspect ratio for project cards (CARD-03): widescreen/cinematic matches game screenshots"
  - "data-tier attribute on article element enables tier-based CSS sizing in parent layout"
  - "Placeholder PNGs use dark card background (#2E2D2A) to match dark mode bg-card token"
metrics:
  duration: "2 minutes"
  completed_date: "2026-04-12"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 04 Plan 01: ProjectCard + Krom/Pipeline Stubs Summary

**One-liner:** ProjectCard component with 16:9 aspect ratio and tier data attribute, plus Krom and Pipeline MDX stubs that bring all three Tier 1 case studies into getCollection.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | ProjectCard component with tier-based sizing | f3e19f7 | src/components/ui/ProjectCard.astro |
| 2 | Krom and Pipeline MDX stubs with placeholder thumbnails | 96f7244 | krom.mdx, pipeline.mdx, krom/hero.png, pipeline/hero.png |

## What Was Built

**ProjectCard.astro** is the shared building block for both the homepage (featured cards) and the work page (tiered grid). It accepts a `CollectionEntry<'case-studies'>` prop, renders thumbnail via Astro's `<Image>` component with responsive `widths` and `sizes`, and exposes a `data-tier` attribute for parent layout CSS to drive tier-based sizing. The `data-featured` attribute is set when `featured={true}`, enabling feature-flag-style CSS differentiation. BEM naming throughout. Scoped CSS in `@layer components`.

**Krom and Pipeline MDX stubs** are minimal but schema-valid: all required frontmatter fields populated (title, oneliner, role, timeline, tools, category, tier, thumbnail, tags). Both are tier 1. Krom is `Professional`, Pipeline is `Personal`. Placeholder thumbnails are 1920x1080 solid-color PNGs at `#2E2D2A` (dark card `bg-card` token), generated via sharp. The build now outputs 7 pages (up from 5), confirming both case study routes are live.

## Decisions Made

- **16:9 aspect ratio** (CARD-03): Widescreen/cinematic ratio chosen over 4:3 or square. Matches game screenshot dimensions and reinforces the "field manual" identity.
- **data-tier on article**: Tier attribute lives on the outermost element so parent grid layouts can use `[data-tier="1"]` selectors for Tier 1 large card sizing without the component knowing about its container.
- **Placeholder color #2E2D2A**: Matches the dark mode `--bg-card` token so placeholders look intentional in both light and dark mode rather than jarring white boxes.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `src/content/case-studies/krom.mdx`: Body is `Full case study coming soon.` Placeholder only. No case study content.
- `src/content/case-studies/pipeline.mdx`: Body is `Full case study coming soon.` Placeholder only. No case study content.
- `src/assets/case-studies/krom/hero.png`: Solid-color placeholder PNG. No real screenshot.
- `src/assets/case-studies/pipeline/hero.png`: Solid-color placeholder PNG. No real screenshot.

These stubs are intentional per plan scope. The goal of this plan was infrastructure (component + content collection entries), not case study authoring. Full content is out of scope for Phase 04.

## Self-Check: PASSED

Files verified:
- FOUND: src/components/ui/ProjectCard.astro
- FOUND: src/content/case-studies/krom.mdx
- FOUND: src/content/case-studies/pipeline.mdx
- FOUND: src/assets/case-studies/krom/hero.png
- FOUND: src/assets/case-studies/pipeline/hero.png

Commits verified:
- FOUND: f3e19f7 (feat(04-pages-01): ProjectCard component)
- FOUND: 96f7244 (feat(04-pages-01): Krom and Pipeline MDX stubs)

Build: 7 pages built, 0 errors.
