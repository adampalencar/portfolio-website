---
phase: 04-pages
plan: "02"
subsystem: pages
tags: [homepage, work-page, project-cards, contact-strip, tiered-grid]
dependency_graph:
  requires:
    - src/components/ui/ProjectCard.astro
    - src/content/case-studies/krom.mdx
    - src/content/case-studies/pipeline.mdx
    - src/content/case-studies/orbital-concierge.mdx
  provides:
    - src/pages/index.astro
    - src/pages/work/index.astro
    - public/resume/adam-palencar-resume.pdf
  affects:
    - Sidebar Contact nav anchor (verified /#contact)
    - /work#krom and /work#pipeline anchor targets
tech_stack:
  added: []
  patterns:
    - getCollection filter + sort for tier-based card selection
    - CSS class-based tier spans (work-grid__item--tier-N) for clean grid control
    - id={entry.id} wrapper divs for homepage-to-work-page anchor linking
    - Placeholder PDF via Node one-liner (valid minimal PDF header)
key_files:
  created:
    - public/resume/adam-palencar-resume.pdf
  modified:
    - src/pages/index.astro
    - src/pages/work/index.astro
decisions:
  - "CSS class approach for tier spans (work-grid__item--tier-N) over :has() selector: cleaner template, explicit tier mapping, no CSS specificity surprises"
  - "Krom and Pipeline link to /work#krom and /work#pipeline (not case study pages) per D-02: case study pages not yet built for these two"
  - "Intro section max-width: 720px (narrower than content-max 1200px): comfortable reading line length for body copy"
metrics:
  duration: "3 minutes"
  completed_date: "2026-04-12"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 2
---

# Phase 04 Plan 02: Homepage and Work Page Summary

**One-liner:** Homepage with hero, 3 featured Tier 1 cards, intro, and contact strip anchor; work page with 12-col mixed continuous grid, tier-based card sizing, and anchor IDs for cross-page linking.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Homepage (hero, featured cards, intro, contact strip) + placeholder resume PDF | 4e1ea03 | src/pages/index.astro, public/resume/adam-palencar-resume.pdf |
| 2 | Work page with mixed continuous tiered grid | f314f41 | src/pages/work/index.astro |

## What Was Built

**index.astro** is the full homepage with 4 sections: hero (name, role, statement, CTA), featured-work (3 Tier 1 ProjectCards in a 3-col responsive grid), intro (abbreviated bio with ghost-style secondary CTA), and contact-strip (id="contact" anchor satisfying PAGE-04, email/LinkedIn/resume links). All copy is verbatim from Homepage Copy.md per D-04. Krom and Pipeline cards use href overrides to `/work#krom` and `/work#pipeline` since their case study pages are not built yet. Orbital Concierge uses the default href from ProjectCard (links to its case study).

**work/index.astro** is the full project index with a 12-column grid that uses CSS class-based tier spans: T1 cards span all 12 columns (full-width), T2 cards span 6 (two-up), T3 cards span 4 (three-up). Cards are sorted by tier then alphabetically. No tier section labels between cards. Each card wrapper has `id={entry.id}` enabling the homepage `/work#krom` and `/work#pipeline` anchor links to scroll to the correct card.

**public/resume/adam-palencar-resume.pdf** is a valid minimal placeholder PDF so the resume download link in the contact strip does not 404 on first Netlify deploy. A TODO comment marks it for replacement before the portfolio goes live.

**Sidebar Contact nav** was verified as already correct: `href: '/#contact'` (PAGE-04). No change required.

## Decisions Made

- **CSS class tier spans over `:has()`**: Both approaches were equivalent for this case. CSS classes (`work-grid__item--tier-N`) were chosen over the `:has([data-tier="N"])` selector because it keeps the relationship between component data and layout class explicit in the template, avoids a CSS specificity layer, and is more readable for maintenance. The plan noted both were acceptable.
- **Krom/Pipeline href overrides**: These two Tier 1 case studies have stub MDX files but no authored content. Linking to `/work#krom` and `/work#pipeline` anchors avoids sending hiring managers to empty pages while still making the cards clickable and visually complete.
- **Intro section 720px max-width**: The intro body copy is 2 short paragraphs. Setting `max-width: 720px` on the section itself (narrower than the 1200px content-max used elsewhere) gives a comfortable 65-75 character line length for the reading flow.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `public/resume/adam-palencar-resume.pdf`: Minimal placeholder PDF (316 bytes). Download link resolves but file is not a real resume. TODO comment added in index.astro near the link. Requires replacement before portfolio is shared with employers.
- `src/pages/index.astro` Krom/Pipeline cards: Both link to `/work#krom` and `/work#pipeline` rather than case study pages, because Krom and Pipeline are stub MDX files with placeholder content only. This is intentional per plan scope and D-02.

## Self-Check: PASSED

Files verified:
- FOUND: src/pages/index.astro
- FOUND: src/pages/work/index.astro
- FOUND: public/resume/adam-palencar-resume.pdf

Commits verified:
- FOUND: 4e1ea03 (feat(04-pages-02): homepage with hero, featured cards, intro, contact strip)
- FOUND: f314f41 (feat(04-pages-02): work page with tiered 12-col continuous grid)

Build: 7 pages built, 0 errors.
