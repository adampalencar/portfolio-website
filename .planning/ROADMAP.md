# Roadmap: Portfolio Website

## Overview

Six phases that take the site from nothing to a launchable portfolio. The first two phases establish the invisible foundation (design system, layout shell) that every subsequent phase depends on. Phases 3 and 4 build all the content and pages. Phase 5 adds the motion and visual texture that make the site feel like a designed artefact rather than a document. Phase 6 hardens everything for public eyes: accessibility audit, SEO metadata, and a clean Lighthouse score.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System** - CSS tokens, typography, grid, dark mode infrastructure, Astro project scaffolding
- [x] **Phase 2: Navigation Shell** - BaseLayout, sidebar nav, footer, responsive breakpoints (completed 2026-04-11)
- [x] **Phase 3: Content Infrastructure** - Case study schema, CaseStudyLayout, Orbital Concierge content (completed 2026-04-12)
- [ ] **Phase 4: Pages** - All site pages, project cards, tier layout, first Netlify deploy
- [ ] **Phase 5: Animations and Polish** - Scroll reveals, View Transitions, grain texture, motion preferences
- [ ] **Phase 6: QA and Pre-Launch** - Accessibility audit, SEO metadata, Lighthouse 90+, final deploy

## Phase Details

### Phase 1: Design System
**Goal**: A working Astro project exists with a complete design system that every subsequent phase can build on without revisiting fundamentals
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts a local Astro server and `npm run build` produces a static dist folder deployable to Netlify
  2. CSS custom properties for color, spacing, and typography are defined in a single tokens file and visually correct in the browser (off-white background, forest green accent, 8px grid)
  3. Inter Variable and JetBrains Mono Variable load from self-hosted Fontsource with no layout shift; both display in the correct hierarchy (display/body vs. metadata/labels)
  4. Toggling `[data-theme="dark"]` on `<html>` swaps the color tokens; the chosen theme persists in localStorage and does not flash on page load or after a View Transition navigation
**Plans**: 2 plans
Plans:
- [x] 01-01-PLAN.md — Scaffold Astro project, CSS architecture, tokens, fonts, dark mode, BaseLayout
- [x] 01-02-PLAN.md — Grain texture, /dev kitchen sink page, visual verification checkpoint
**UI hint**: yes

### Phase 2: Navigation Shell
**Goal**: Every page on the site has a consistent, accessible chrome (sidebar, footer, base layout) that works across all three breakpoints and persists cleanly across navigations
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, LAY-01, LAY-02, LAY-03
**Success Criteria** (what must be TRUE):
  1. On desktop (1440px+), the left sidebar is fixed at 220px with Pixelarticons nav items; on tablet (768-1199px) it collapses to a top bar; on mobile (<768px) it becomes a hamburger menu
  2. Navigating to a case study subpage expands a Work folder tree in the sidebar (Obsidian-style), with only one section open at a time
  3. The dark mode toggle in the sidebar bottom section fires a polished micro-interaction and the sidebar itself does not flicker or re-render on page change
  4. Tab key navigates all nav controls in a logical order; `aria-expanded`, `aria-current`, and focus-visible states are visible and correct
  5. The dense footer renders at all breakpoints with email, LinkedIn, resume link, location, and version number
**Plans**: 3 plans
Plans:
- [x] 02-01-PLAN.md — Icon setup, BaseLayout enhancement (ClientRouter, skip-link, site-layout grid), desktop Sidebar with accordion and ThemeToggle
- [x] 02-02-PLAN.md — TopBar (tablet), MobileDrawer (mobile), Footer component with responsive layout
- [x] 02-03-PLAN.md — Visual verification checkpoint at all three breakpoints
**UI hint**: yes

### Phase 3: Content Infrastructure
**Goal**: The case study system is fully wired: schema, layout template, and one complete case study (Orbital Concierge) that proves the pipeline end-to-end
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. A `content.config.ts` Zod schema exists; adding an MDX file with valid frontmatter makes it appear in `getCollection()` without manual registration
  2. The Orbital Concierge case study is accessible at its URL, follows the Minto Pyramid section order (result, problem, key decisions, process, final design, reflection, CTA), and all screenshot images are served as optimized formats via Astro's image pipeline
  3. Prev/next navigation at the bottom of each case study links to adjacent projects by tier order
**Plans**: 2 plans
Plans:
- [x] 03-01-PLAN.md — MDX integration, content schema, CaseStudyLayout template, dynamic route
- [x] 03-02-PLAN.md — Orbital Concierge MDX content, asset pipeline, visual verification
**UI hint**: yes

### Phase 4: Pages
**Goal**: All site pages are built, the tiered project index is navigable, and the site is live on Netlify for the first time
**Depends on**: Phase 3
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, CARD-01, CARD-02, CARD-03
**Success Criteria** (what must be TRUE):
  1. The homepage loads with a hero (name, role, statement, CTA), three Tier 1 project cards, an intro section, and a contact strip
  2. The Work page shows project cards in three distinct tier sizes (T1 large, T2 standard, T3 small thumbnail); hovering a card with a video asset plays the video inline with a static fallback when video is absent
  3. The About, Contact anchor, Accessibility Statement, and 404 pages all exist with correct content and navigation
  4. A visitor can reach the site via a live Netlify URL; the build succeeds with zero errors
**Plans**: 4 plans
Plans:
- [x] 04-01-PLAN.md — ProjectCard component and Krom/Pipeline MDX stubs with placeholder thumbnails
- [ ] 04-02-PLAN.md — Homepage (hero, featured cards, intro, contact strip) and Work page (tiered grid)
- [ ] 04-03-PLAN.md — About page (bio, experience timeline, tools grid, personality)
- [ ] 04-04-PLAN.md — 404 page, accessibility statement, Netlify config, and visual verification checkpoint
**UI hint**: yes

### Phase 5: Animations and Polish
**Goal**: The site feels like a crafted artefact: motion, texture, and the monospace metadata layer are all present, and all motion is accessible
**Depends on**: Phase 4
**Requirements**: VISL-01, VISL-02, VISL-03, VISL-04, VISL-05
**Success Criteria** (what must be TRUE):
  1. Scrolling down any content-heavy page reveals sections with fade-up animations; text blocks animate line by line; the effect triggers once via IntersectionObserver and re-runs correctly after View Transition navigation
  2. Navigating between pages plays a View Transition with at least one shared element (e.g., project card thumbnail expanding to case study hero)
  3. A subtle grain texture is visible on backgrounds at 3-5% opacity without causing perceptible performance degradation
  4. Section numbers, project codes, and JetBrains Mono timestamps appear consistently as metadata labels throughout the site
  5. With `prefers-reduced-motion: reduce` set in the OS, all animations and transitions are suppressed; the site remains fully usable
**Plans**: TBD
**UI hint**: yes

### Phase 6: QA and Pre-Launch
**Goal**: The site passes a full accessibility and SEO audit and is ready to share with hiring managers
**Depends on**: Phase 5
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, SEO-01, SEO-02, SEO-03, SEO-04
**Success Criteria** (what must be TRUE):
  1. All pages use correct semantic HTML landmarks (header, nav, main, footer) and a logical heading hierarchy with no skipped levels
  2. A skip-to-content link is visible on focus from the keyboard; all interactive elements are reachable by Tab in a logical order with visible focus states; no element fails WCAG 2.2 AA contrast (4.5:1 body, 3:1 large text)
  3. Lighthouse accessibility score is 90 or above across all pages; no critical axe-core violations
  4. Every page has a unique meta description and correct Open Graph tags; case study pages have pre-generated static OG images; a sitemap.xml and canonical URLs are present in the build output
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System | 0/2 | Planning complete | - |
| 2. Navigation Shell | 3/3 | Complete   | 2026-04-11 |
| 3. Content Infrastructure | 2/2 | Complete   | 2026-04-12 |
| 4. Pages | 1/4 | In Progress|  |
| 5. Animations and Polish | 0/TBD | Not started | - |
| 6. QA and Pre-Launch | 0/TBD | Not started | - |
