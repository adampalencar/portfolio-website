# Phase 4: Pages - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning

<domain>
## Phase Boundary

All site pages built and first Netlify deploy. Includes: homepage (hero, featured cards, intro, contact strip), work index (tiered project cards in a mixed grid), about page (bio, vertical timeline, icon grid tools, personality), contact anchor, accessibility statement, custom 404, and netlify.toml setup for first live deploy.

</domain>

<decisions>
## Implementation Decisions

### Homepage Layout
- **D-01:** Follow the Pencil mockup exactly at all 3 breakpoints (desktop 1440px, tablet 768px, mobile 375px). The .pen file is the design spec.
- **D-02:** Featured Tier 1 cards (Isles of Krom, Pipeline, Orbital Concierge) all appear on homepage. Krom and Pipeline link to the Work page section (scrolled to their position) since their case studies aren't built yet. Orbital Concierge links to its case study.
- **D-03:** Contact strip at bottom of homepage is the #contact nav anchor target. No separate contact page. Nav "Contact" scrolls to this strip on the homepage.
- **D-04:** Homepage copy comes from `Homepage Copy.md` in the vault. Use verbatim.

### Project Cards + Work Index
- **D-05:** Work page uses a mixed continuous grid (no section breaks between tiers). Card size varies by tier: T1 large, T2 standard, T3 small thumbnail. Cards flow together without tier labels.
- **D-06:** Card content: thumbnail + title + oneliner + category tag. No tools list on cards.
- **D-07:** Projects without built case studies get minimal placeholder pages (thumbnail + oneliner + "Full case study coming soon"). All cards link somewhere.
- **D-08:** Skip hover-to-video entirely for Phase 4. Static thumbnail cards only. Video hover mechanism deferred to a polish phase.
- **D-09:** Card aspect ratios: 16:9 or 4:3 consistent across the grid (CARD-03). Claude decides which fits best with the field manual identity.

### About Page
- **D-10:** About page copy comes from `About Page Copy.md` in the vault. Use verbatim.
- **D-11:** Experience section uses a vertical timeline layout with dots/lines connecting entries chronologically.
- **D-12:** Tools section uses an icon grid with tool logos/icons. Icons need to be sourced for each tool (Figma, Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Pro Tools, FL Studio, FMOD, HTML, CSS, Python, Godot, Unreal Engine 5, Miro, FigJam).
- **D-13:** Photo placeholder for About hero (styled block with initials or silhouette). Real photo added later.

### 404 + Utility Pages
- **D-14:** 404 page uses dry/witty tone matching the field manual identity. Something like "The elevator doesn't stop at this floor." with navigation back to Home and Work.
- **D-15:** Accessibility statement is a standard WCAG 2.2 AA conformance template: conformance level, known limitations, contact for accessibility issues. One page, straightforward.
- **D-16:** Netlify deploy set up from scratch in this phase: create netlify.toml, connect repo, push first successful build to a live URL.

### Claude's Discretion
- Card aspect ratio choice (16:9 vs 4:3)
- Mixed grid column layout and responsive behavior
- Exact 404 copy (within dry/witty constraint)
- Placeholder page layout for projects without case studies
- Timeline CSS implementation (dots, lines, spacing)
- Tool icon sourcing approach (SVG icons, Devicon, Simple Icons, or similar)
- Netlify configuration details (build command, publish directory, redirects)
- Accessibility statement exact wording

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Homepage Design (Pencil mockup)
- `C:\Users\mzbir\Downloads\portfolio design\Portfolio Design System + Homepage.pen` -- Design system + homepage at 3 breakpoints (desktop, tablet, mobile). Use Pencil MCP tools to read.

### Page Copy (vault)
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Homepage Copy.md` -- Finalized homepage copy (hero, cards, intro, contact strip)
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\About Page Copy.md` -- Finalized about page copy (bio, experience, education, tools, personality)

### Visual Direction
- `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\Visual Direction and References.md` -- Locked design spec (colors, type, grid, motion)

### Project CLAUDE.md
- `./CLAUDE.md` -- Project-specific rules, tech stack, case study writing standards, design direction

### Content Schema (from Phase 3)
- `src/content.config.ts` -- Zod schema for case studies (frontmatter fields)
- `src/content/case-studies/orbital-concierge.mdx` -- Reference case study for card data

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/BaseLayout.astro` -- Site shell with sidebar, topbar, footer, grain overlay. All pages wrap in this.
- `src/layouts/CaseStudyLayout.astro` -- Case study template (hero, body, CTA, prev/next). Reference for new page patterns.
- `src/components/ui/ThemeToggle.astro` -- Dark mode toggle, event delegation pattern.
- `src/components/layout/Sidebar.astro` -- Nav with folder expansion. navItems array needs updating when new pages are added.
- `src/styles/tokens.css` -- All design tokens (colors, spacing, typography, breakpoints).

### Established Patterns
- CSS: BEM naming, `@layer components`, design tokens only (no raw values)
- Scripts: `astro:page-load` for navigation-aware JS, event delegation for click handlers (NOT per-element addEventListener)
- Images: `<Image>` from `astro:assets` with explicit width/height. In regular CSS files, use `img` selector (NOT `:global(img)` which is Astro-scoped-only)
- Content: `getCollection('case-studies')` for typed content queries

### Integration Points
- `src/pages/index.astro` -- Currently a placeholder, needs full homepage build
- `src/pages/about.astro` -- Currently a placeholder, needs full about page
- `src/pages/work/index.astro` -- Currently a placeholder, needs tiered card grid
- Sidebar navItems array needs updating if new nav targets are added

</code_context>

<specifics>
## Specific Ideas

- Homepage follows the Pencil mockup pixel-for-pixel at all 3 breakpoints
- Krom and Pipeline cards link to Work page (anchor scroll) until their case studies exist
- About page timeline should feel resume-like but with the field manual aesthetic
- Tool icons should be real logos, not pixelarticons (those are for nav/UI only)
- 404 should reference Orbital Concierge's elevator theme if it fits naturally

</specifics>

<deferred>
## Deferred Ideas

- Hover-to-video on project cards (CARD-02) -- deferred to a polish phase when video assets are recorded
- Scroll-triggered animations (fade-up reveals, staggered content) -- belongs in Phase 5 or 6
- View Transitions between pages -- belongs in animation/polish phase
- Additional case studies beyond Orbital Concierge -- content added incrementally

</deferred>

---

*Phase: 04-pages*
*Context gathered: 2026-04-12*
