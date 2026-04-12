# Phase 4: Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 04-pages
**Areas discussed:** Homepage layout, Project cards + Work index, About page structure, 404 + utility pages

---

## Homepage Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Follow Pencil mockup exactly | Agents read the .pen file to match the design | ✓ |
| Follow mockup with adjustments | Mostly match but with specific changes | |
| Describe layout fresh | Skip mockup, describe from scratch | |

**User's choice:** Follow Pencil mockup exactly

---

| Option | Description | Selected |
|--------|-------------|----------|
| Link to Work page section | Cards link to Work index (scrolled to position) | ✓ |
| Dead cards with 'Coming Soon' | Visible but not clickable | |
| Only show Orbital Concierge | Show 1 card until others are ready | |

**User's choice:** Link to Work page section (for Krom and Pipeline, since case studies aren't built yet)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Homepage strip is the anchor target | Nav 'Contact' scrolls to homepage bottom strip | ✓ |
| Repeated on every page | Contact strip on every page | |

**User's choice:** Homepage strip is the anchor target

---

## Project Cards + Work Index

| Option | Description | Selected |
|--------|-------------|----------|
| Grouped by tier | Tier sections with labels | |
| Mixed grid, size by tier | Continuous grid, card size varies by tier | ✓ |
| You decide | Claude picks | |

**User's choice:** Mixed grid, size by tier

---

| Option | Description | Selected |
|--------|-------------|----------|
| Link if exists, otherwise nothing | Static cards for missing case studies | |
| All cards link somewhere | External links as fallback | |
| Placeholder pages | Minimal page with thumbnail + oneliner + coming soon | ✓ |

**User's choice:** Placeholder pages for projects without case studies

---

| Option | Description | Selected |
|--------|-------------|----------|
| Build mechanism, no videos yet | Wire hover-to-video with static fallbacks | |
| Skip video entirely for Phase 4 | Static thumbnails only, defer to polish | ✓ |

**User's choice:** Skip video entirely for Phase 4

---

| Option | Description | Selected |
|--------|-------------|----------|
| Thumbnail + title + oneliner + category tag | Clean and scannable | ✓ |
| Thumbnail + title + oneliner + tools list | Tech-focused | |
| Thumbnail + title + oneliner + category + tools | Most info, busiest | |

**User's choice:** Thumbnail + title + oneliner + category tag

---

## About Page Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Vertical timeline | Dots/lines connecting entries chronologically | ✓ |
| Stacked cards | Distinct card blocks per role | |
| Compact list | Dense minimal formatting | |

**User's choice:** Vertical timeline

---

| Option | Description | Selected |
|--------|-------------|----------|
| Tag pills grouped by category | Styled pill elements | |
| Icon grid | Tool logos/icons in a grid | ✓ |
| Plain text list | Comma-separated, monospace | |

**User's choice:** Icon grid

---

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder for now | Styled placeholder block | ✓ |
| I have a photo ready | Will provide file path | |

**User's choice:** Placeholder for now

---

## 404 + Utility Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Dry/witty | Field manual voice with personality | ✓ |
| Minimal/functional | Plain 404 with nav links | |
| You decide | Claude picks tone | |

**User's choice:** Dry/witty

---

| Option | Description | Selected |
|--------|-------------|----------|
| Standard template | WCAG 2.2 AA conformance, known limitations, contact | ✓ |
| Detailed with specifics | Template plus implementation techniques | |
| You decide | Based on what was implemented | |

**User's choice:** Standard template

---

| Option | Description | Selected |
|--------|-------------|----------|
| Set up from scratch | Create netlify.toml, connect repo, first deploy | ✓ |
| Already configured | Just needs a build push | |

**User's choice:** Set up from scratch

---

## Claude's Discretion

- Card aspect ratio (16:9 vs 4:3)
- Mixed grid column layout and responsive behavior
- Exact 404 copy
- Placeholder page layout
- Timeline CSS details
- Tool icon sourcing approach
- Netlify config details
- Accessibility statement wording

## Deferred Ideas

- Hover-to-video on cards (deferred to polish phase)
- Scroll-triggered animations (Phase 5/6)
- View Transitions (animation phase)
