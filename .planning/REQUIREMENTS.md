# Requirements: Portfolio Website

**Defined:** 2026-04-11
**Core Value:** A portfolio that earns interviews by demonstrating design craft through the site itself.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUN-01**: Site built with Astro 6 and vanilla CSS, deployed to Netlify free tier as static output
- [x] **FOUN-02**: CSS design system using custom properties: warm off-white (#FAF9F6), forest green accent (#1B7A3D), 12-col grid, 8px base unit
- [x] **FOUN-03**: Three typography layers: Inter Variable (display/body), JetBrains Mono Variable (metadata/labels), self-hosted via Fontsource
- [x] **FOUN-04**: CSS cascade layers (@layer) and BEM naming convention from first component
- [x] **FOUN-05**: Dark mode infrastructure with [data-theme] attribute swap, localStorage persistence, and no flash on initial load or View Transition navigation

### Navigation

- [x] **NAV-01**: Left sidebar navigation fixed on desktop (220px), collapsing to top bar on tablet (768-1199px), hamburger menu on mobile (<768px)
- [x] **NAV-02**: Sidebar expands like Obsidian folders on case study subpages (Work > child projects), one section expanded at a time
- [x] **NAV-03**: Dark mode toggle in sidebar bottom section with polished micro-interaction
- [x] **NAV-04**: Sidebar persists across page navigations via transition:persist (no flicker)
- [x] **NAV-05**: Full keyboard navigation and ARIA attributes on all nav controls (aria-expanded, aria-current, focus-visible)
- [x] **NAV-06**: Pixelarticons (24x24 SVG) for nav items and UI elements via astro-icon

### Layout

- [x] **LAY-01**: BaseLayout wrapping all pages with ClientRouter for View Transitions
- [x] **LAY-02**: Dense informational footer with email, LinkedIn, resume link, location, version number
- [x] **LAY-03**: Responsive at 3 breakpoints: desktop (1440px+), tablet (768-1199px), mobile (<375px)

### Content

- [x] **CONT-01**: Content Layer API with Zod schema for case studies (MDX format) including title, role, timeline, tools, category, tier, thumbnail, one-liner, and tags array
- [x] **CONT-02**: Case study page template following Minto Pyramid structure: hero, result, problem, key decisions, process evidence, final design, reflection, CTA
- [x] **CONT-03**: Prev/next project navigation on case study pages
- [ ] **CONT-04**: Orbital Concierge case study fully built with optimized screenshot assets as launch case study
- [x] **CONT-05**: Images optimized via Astro's built-in image processing pipeline (MDX, not plain Markdown)

### Pages

- [ ] **PAGE-01**: Homepage with hero (name, role, statement, CTA), 3 featured Tier 1 project cards, intro section, contact strip
- [ ] **PAGE-02**: Work page with Tier 1 (large cards), Tier 2 (standard cards), Tier 3 (small cards) project index
- [ ] **PAGE-03**: About page with bio, experience, education, tools, personality section
- [ ] **PAGE-04**: Contact section as anchor from nav (not separate page) with email, LinkedIn, resume download
- [ ] **PAGE-05**: Accessibility statement page targeting WCAG 2.2 AA
- [ ] **PAGE-06**: Custom 404 page with personality and navigation back to homepage/work

### Project Cards

- [ ] **CARD-01**: Project cards with tier-based sizing: T1 large, T2 standard, T3 small thumbnail + description
- [ ] **CARD-02**: Hover-to-video on project cards where video assets exist (CSS-only, muted, with static fallback)
- [ ] **CARD-03**: Consistent aspect ratios across project grid (16:9 or 4:3)

### Visual Polish

- [ ] **VISL-01**: Section numbering, project codes, monospace timestamps as metadata layer throughout the site
- [ ] **VISL-02**: Subtle grain texture overlay (3-5% opacity, paper feel) on backgrounds
- [ ] **VISL-03**: Scroll-triggered animations: fade-up reveals, staggered content, line-by-line text via IntersectionObserver + astro:page-load
- [ ] **VISL-04**: View Transitions (Astro ClientRouter) for page navigation with shared element transitions
- [ ] **VISL-05**: prefers-reduced-motion respected throughout (CSS rule + JS media query checks)

### Accessibility

- [ ] **A11Y-01**: Semantic HTML throughout (landmarks, headings hierarchy, lists)
- [ ] **A11Y-02**: Keyboard navigable with visible focus states meeting WCAG 2.2 AA (2.4.11 Focus Not Obscured, 2.4.13 Focus Appearance)
- [ ] **A11Y-03**: Color contrast ratios meet AA standards (4.5:1 body text, 3:1 large text)
- [ ] **A11Y-04**: Skip-to-content link

### SEO and Meta

- [ ] **SEO-01**: Meta descriptions and Open Graph tags on all pages
- [ ] **SEO-02**: Static OG images per case study (pre-generated at build time)
- [ ] **SEO-03**: Sitemap generation
- [ ] **SEO-04**: Canonical URLs

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Additional Case Studies

- **CASE-01**: Isles of Krom case study (Tier 1)
- **CASE-02**: Pipeline case study (Tier 1)
- **CASE-03**: Packwyrm case study (Tier 2)
- **CASE-04**: Truly Bangalore case study (Tier 2)
- **CASE-05**: Crate Digging case study (Tier 2)
- **CASE-06**: Loblaws case study (Tier 2)
- **CASE-07**: Tier 3 project entries (Feature Creep, Tamagotchi, Zelda Redesign, Madras Kaapi, LA Fitness, Krom Heuristic Eval, Crackle Calculator)

### Analytics

- **ANAL-01**: Plausible analytics integration
- **ANAL-02**: Google Search Console verification

### Domain

- **DOMN-01**: Custom domain configuration

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or admin panel | Static site, case studies are MDX files |
| Blog | Portfolio only, abandonment signal unless maintained |
| Contact form backend | Email link and LinkedIn sufficient, form adds complexity |
| GSAP or heavy animation library | View Transitions + CSS animations + IntersectionObserver cover all needs |
| React/Vue/Svelte islands | Zero interactive components require a framework |
| Password-protected case studies | Huge friction for cold outreach from hiring managers |
| Project filtering/tags UI | Not needed until 10+ projects, tiered layout communicates editorial judgment |
| Testimonials section | No client testimonials available, empty section worse than none |
| 3D/WebGL effects | Conflicts with field manual identity, adds bundle weight |
| CSS scroll-driven animations as primary | Firefox support requires flag, use as progressive enhancement only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| FOUN-05 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| NAV-05 | Phase 2 | Complete |
| NAV-06 | Phase 2 | Complete |
| LAY-01 | Phase 2 | Complete |
| LAY-02 | Phase 2 | Complete |
| LAY-03 | Phase 2 | Complete |
| CONT-01 | Phase 3 | Complete |
| CONT-02 | Phase 3 | Complete |
| CONT-03 | Phase 3 | Complete |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Complete |
| PAGE-01 | Phase 4 | Pending |
| PAGE-02 | Phase 4 | Pending |
| PAGE-03 | Phase 4 | Pending |
| PAGE-04 | Phase 4 | Pending |
| PAGE-05 | Phase 4 | Pending |
| PAGE-06 | Phase 4 | Pending |
| CARD-01 | Phase 4 | Pending |
| CARD-02 | Phase 4 | Pending |
| CARD-03 | Phase 4 | Pending |
| VISL-01 | Phase 5 | Pending |
| VISL-02 | Phase 5 | Pending |
| VISL-03 | Phase 5 | Pending |
| VISL-04 | Phase 5 | Pending |
| VISL-05 | Phase 5 | Pending |
| A11Y-01 | Phase 6 | Pending |
| A11Y-02 | Phase 6 | Pending |
| A11Y-03 | Phase 6 | Pending |
| A11Y-04 | Phase 6 | Pending |
| SEO-01 | Phase 6 | Pending |
| SEO-02 | Phase 6 | Pending |
| SEO-03 | Phase 6 | Pending |
| SEO-04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0

---
*Requirements defined: 2026-04-11*
*Last updated: 2026-04-11 — A11Y-01 through A11Y-04 moved to Phase 6 (QA and Pre-Launch) to be verified holistically after all content and animations are in place*
