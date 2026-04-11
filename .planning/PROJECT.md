# Portfolio Website

## What This Is

A custom-coded portfolio site for Adam Palencar, a UI/UX designer targeting hiring managers and design leads in the games industry. Replaces a previous Framer site. Built with Astro, styled with vanilla CSS, hosted on Netlify free tier. The site's identity is "The Field Manual": Swiss/industrial minimalism with a monospace metadata layer that signals precision and craft without cosplaying as a tech dashboard.

## Core Value

A portfolio that earns interviews by demonstrating design craft through the site itself. The site IS the proof. Every layout decision, transition, and detail should reinforce that Adam is a designer who thinks about the full experience.

## Requirements

### Validated

- [x] Astro v5+ project with vanilla CSS, deployed to Netlify free tier — Validated in Phase 1: Design System (static output, Font API, netlify.toml)
- [x] Design system in CSS: warm off-white (#FAF9F6), forest green accent (#1B7A3D), 12-col grid, 8px base — Validated in Phase 1: Design System
- [x] Three typography layers: Inter (display/body), JetBrains Mono (metadata/labels), self-hosted — Validated in Phase 1: Design System
- [x] Dark mode toggle with localStorage persistence — Validated in Phase 1: Design System (flash prevention via is:inline + astro:after-swap)
- [x] Subtle grain texture overlay (3-5% opacity, paper feel) — Validated in Phase 1: Design System
- [x] Left sidebar navigation (fixed on desktop, collapsible top bar on tablet, hamburger on mobile) — Validated in Phase 2: Navigation Shell
- [x] Sidebar expands like Obsidian folders on case study subpages (Work > child projects) — Validated in Phase 2: Navigation Shell
- [x] Pixelarticons (24x24 SVG) for nav and UI elements — Validated in Phase 2: Navigation Shell
- [x] Dense informational footer with email, LinkedIn, resume, location, version number — Validated in Phase 2: Navigation Shell
- [x] Responsive at 3 breakpoints: desktop (1440px+), tablet (768-1199px), mobile (<375px) — Validated in Phase 2: Navigation Shell (nav shell only, content pages Phase 4)

### Active

- [ ] Astro v5+ project with vanilla CSS, deployed to Netlify free tier
- [ ] Homepage with hero, 3 featured project cards, intro section, contact strip
- [ ] Work page with Tier 1 (large cards), Tier 2 (standard cards), Tier 3 (small cards) project index
- [ ] Case study page template following Minto Pyramid structure with prev/next navigation
- [ ] Orbital Concierge case study fully built as the launch case study
- [ ] About page with bio, experience, education, tools, and personality section
- [ ] Contact section (anchor from nav, not a separate page) with email, LinkedIn, resume download
- [ ] Accessibility statement page (WCAG 2.2 AA target)
- [ ] Custom 404 page
- [ ] Dark mode toggle with localStorage persistence
- [ ] Design system in CSS: warm off-white (#FAF9F6), forest green accent (#1B7A3D), 12-col grid, 8px base
- [ ] Three typography layers: Inter (display/body), JetBrains Mono (metadata/labels), self-hosted
- [ ] Pixelarticons (24x24 SVG) for nav and UI elements
- [ ] Subtle grain texture overlay (3-5% opacity, paper feel)
- [ ] View Transitions (Astro built-in) for page navigation
- [ ] Scroll-triggered animations: fade-up reveals, staggered content, line-by-line text
- [ ] Hover-to-video on project cards where video assets exist
- [ ] Responsive at 3 breakpoints: desktop (1440px+), tablet (768-1199px), mobile (<375px)
- [ ] Dense informational footer with email, LinkedIn, resume, location, version number
- [ ] Section numbering, project codes, monospace timestamps as metadata layer
- [ ] prefers-reduced-motion respected throughout
- [ ] Semantic HTML, keyboard navigable, focus states, contrast ratios meet AA

### Out of Scope

- CMS or admin panel — static content, case studies are markdown files
- Blog — portfolio only, no thought leadership section
- Analytics dashboard — Plausible/GSC added post-launch, not part of the build
- Contact form backend — link to email and LinkedIn is sufficient for now
- Case studies beyond Orbital Concierge — infrastructure built, content populated later
- Custom domain — using Netlify default URL initially, domain added later
- GSAP — using Astro View Transitions + CSS animations to keep dependencies minimal

## Context

Adam is a UI/UX designer with a cross-disciplinary background in sound production and video editing. He positions himself as a "block-shaped generalist" who bridges gaps between teams. His unique angle is game UI/UX with research depth.

The visual direction is fully locked: Swiss/industrial "field manual" identity. A homepage mockup exists in Pencil (.pen) at all three breakpoints with 11 reusable components and a design system (tokens, colors, typography, spacing). The design uses warm off-white backgrounds, forest green accent deployed surgically, and a monospace metadata layer (JetBrains Mono) that is the key differentiator from generic portfolio sites.

Homepage copy, About page copy, and Tier 1 case study content (Isles of Krom, Pipeline, Orbital Concierge) are written and stored in the vault at `C:\Users\mzbir\Desktop\Brain\Personal\02 - Projects\Portfolio Website\`. Orbital Concierge has final screenshot assets ready.

The Pencil design file lives at `C:\Users\mzbir\Downloads\portfolio design` and contains the design system + homepage at desktop (sidebar + content split), tablet (768px), and mobile (375px).

## Constraints

- **Hosting**: Netlify free tier (no server-side rendering, static output only)
- **Dependencies**: Minimal. Astro + vanilla CSS. No component frameworks (React, Vue). No GSAP. CSS animations and Astro View Transitions only.
- **Fonts**: Self-hosted (Inter, JetBrains Mono). No Google Fonts CDN.
- **Icons**: Pixelarticons (MIT, npm: pixelarticons, 24x24 grid, pure SVG)
- **Images**: Optimized via Astro's built-in image processing
- **Privacy**: No tracking scripts in the build. Analytics added post-launch.
- **Browser support**: Modern browsers (last 2 versions). No IE11.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro over Next.js/Gatsby | Static portfolio with no dynamic data. Astro ships zero JS by default. | — Pending |
| Vanilla CSS over Tailwind | Design system is precise enough that utility classes add noise. Custom properties map 1:1 to design tokens. | — Pending |
| Netlify over Cloudflare Pages | Free tier with simpler setup. Can migrate later. | — Pending |
| No GSAP | View Transitions + CSS animations cover the motion needs without adding a dependency. | — Pending |
| Light theme default | Contrarian for game UI portfolio. Signals design thinking beyond game screens. | — Pending |
| One case study at launch | Orbital Concierge is the most polished. Ship quality over quantity, add others into existing infrastructure. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? Move to Out of Scope with reason
2. Requirements validated? Move to Validated with phase reference
3. New requirements emerged? Add to Active
4. Decisions to log? Add to Key Decisions
5. "What This Is" still accurate? Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-11 after Phase 2 completion*
