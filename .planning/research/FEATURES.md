# Feature Landscape

**Domain:** Game UI/UX designer portfolio website
**Researched:** 2026-04-11
**Confidence:** HIGH (verified against multiple current sources)

---

## Table Stakes

Features users (hiring managers, design leads) expect. Missing any of these creates an impression of incompleteness or unprofessionalism.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| 3-5 curated case studies visible from homepage | Hiring managers spend 3-5 min max; they expect immediate access to best work | Low | Adam has 3 Tier 1 studies ready. One at launch is acceptable if quality is high. |
| Case study with problem / role / process / outcome | This is the standard structure every hiring manager scans for | Medium | Minto Pyramid order: result first, then arguments, then evidence |
| Readable at a skim | Hiring managers spend ~60s per case study; short paragraphs, subheadings, bullets | Low | No walls of text. 60-80% text, 20-40% media |
| Contact information visible without hunting | Direct email + LinkedIn is all that's needed | Low | Anchor from nav is fine. No form backend required. |
| About page with role definition and positioning | "Who is this person and what do they do" must be answerable in under 10s | Low | Strong opener matters more than length |
| Consistent visual identity | Site itself should demonstrate design craft | Medium | Adam's design system is locked; consistency is a build discipline issue |
| Mobile-optimised layout | Many hiring managers review on phones; broken mobile = immediate disqualification | High | Three breakpoints: 1440px+, 768-1199px, <375px |
| Keyboard navigable and focus states | Expected baseline for any professional design site | Medium | WCAG 2.2 AA target. Focus Not Obscured (2.4.11) and Focus Appearance (2.4.13) are new in 2.2 |
| Fast load (LCP under 2.5s) | Slow portfolio reads as poor craft judgment | Low | Astro ships zero JS by default; Netlify CDN handles delivery. Astro image optimization handles assets. |
| Page titles and meta descriptions | Basic SEO hygiene; hiring managers also Google candidates | Low | Each case study page needs a keyword-rich H1 and 150-160 char meta description |
| Semantic HTML | Screen readers and search crawlers both need it | Low | Correct heading hierarchy, landmark regions (nav, main, aside) |
| Custom 404 | Professional signal; broken 404 = careless | Low | One template, reuses site layout |

---

## Differentiators

Features that actively set the portfolio apart from the field. Not universally expected, but create memorable impressions when done well.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Site as UX artifact | The portfolio navigation and layout IS the design proof | High | The "field manual" identity, sidebar structure, and metadata layer are all live demonstrations of Adam's thinking. No other portfolio candidate can fake this. |
| Left sidebar with Obsidian-style expansion | Signals file-system literacy, creates a distinctive navigational identity, shows hierarchy thinking | High | Desktop-only; collapses on tablet/mobile. Work > child project nesting on case study pages. |
| Monospace metadata layer (JetBrains Mono) | Precise, industrial, game-aware without looking like a game UI | Low | Section numbers, project codes, timestamps. Distinguishes from Figma/Notion export aesthetic. |
| Hover-to-video on project cards | Immediately communicates motion capability; Orbital Concierge has video assets | Medium | Must respect prefers-reduced-motion. Pause on mouse leave. Should not autoplay with sound. |
| Minto Pyramid case study structure | Respects the 60s skim time. Result-first ordering matches how senior reviewers actually read | Medium | Lead with knockout metric, support with 2-3 key decisions, substantiate with evidence below |
| Game-specific framing in case studies | Player psychology, onboarding, feedback loops, retention metrics are language game studios speak | Medium | Generic UX framing ("user flows", "pain points") reads as not-games-native |
| prev/next case study navigation | Keeps hiring manager in the site; reduces pogo-back to the work index | Low | Depends on case study template and content collection ordering |
| Warm light-mode default | Contrarian for game UI portfolio; signals design thinking beyond dark game screens | Low | Most game UI portfolios default dark. Light default is a conversation-starter. Dark toggle still available. |
| Dense informational footer | Version number, location, role-as-text; signals builder culture without cosplaying terminal | Low | Reuses monospace layer; does not require additional work |
| View Transitions between pages | Continuity cues reduce orientation cost; signals Astro-native thinking | Medium | Built-in Astro feature. Respect prefers-reduced-motion. |
| Scroll-triggered reveals | Adds polish; communicates motion design awareness without overwhelming | Medium | fade-up, staggered content, line-by-line text. Must degrade gracefully with reduced-motion. |
| Accessibility statement page | Explicitly signals awareness of a11y as a professional value, not just a compliance box | Low | One static page. References WCAG 2.2 AA target. |
| Self-hosted fonts | Performance and privacy. No Google Fonts CDN dependency or FOUT flash | Low | Inter + JetBrains Mono via @font-face. Already planned. |
| Grain texture overlay | Tactile, paper-like quality reinforces the field manual identity | Low | CSS pseudo-element or SVG filter at 3-5% opacity. No JS. |
| Open Graph image per case study | Correct OG preview when link is shared in Slack or LinkedIn DM | Medium | Astro can generate per-page OG images. Matters for warm referrals. |
| Tiered project index (T1/T2/T3) | Communicates editorial judgment; signals Adam knows what his best work is | Medium | Large cards for T1, standard for T2, compact for T3. Filtering by type is optional at launch. |

---

## Anti-Features

Features to explicitly NOT build. Including these would actively harm the portfolio's goals or waste build time.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Blog / thought leadership section | Dilutes portfolio focus. If it's not updated frequently it signals abandonment. | Write about design thinking inside case studies. |
| Contact form with backend | Netlify free tier + static site; adds complexity, spam risk, and maintenance for no gain over a mailto link | Email link + LinkedIn. That's it. |
| CMS or admin panel | One designer's portfolio with ~3 case studies does not need runtime content editing | Markdown files in the repo. Deploy on push. |
| Analytics visible in the build | Tracking scripts hurt performance and privacy signal. Hiring managers aren't a volume traffic audience. | Add Plausible post-launch. Zero impact on interviews. |
| 3D / WebGL / canvas effects | Performance cost is high, accessibility is poor, it reads as tech-flex not design-flex for a UX role | Motion via CSS transitions and View Transitions. Hover-to-video covers the interactive media angle. |
| Parallax scroll effects | Performance hit on mobile, vestibular triggers for motion-sensitive users, reads as dated by 2025 | Scroll-triggered fade-in is the correct level of restraint |
| Project filter / tag search (at launch) | With 3-4 T1 studies and a tiered layout, a filter adds complexity without solving a real navigation problem | Tier layout communicates hierarchy. Add filtering if project count exceeds 10. |
| Password-protected case studies | Significant friction for cold inbound hiring managers; creates the impression of something half-finished | Ship publicly. If NDA is an issue, describe the project and omit proprietary assets. |
| Testimonials / endorsement section | Reads as self-promotional fluff in a UX context; hiring managers trust work over quotes | Quantified metrics inside case studies are the credible version of "it worked" |
| Loading screen / intro animation | Hiring managers have low patience. Every second of forced delay is a departure risk | Fast first paint. Let content speak immediately. |
| GSAP or animation library | Dependency cost is not justified given Astro View Transitions + CSS animation covers all motion needs | Vanilla CSS transitions. Already decided in PROJECT.md. |

---

## Feature Dependencies

```
Dark mode toggle
  -> CSS custom properties design system (required foundation)
  -> localStorage persistence (small JS island)

Hover-to-video on project cards
  -> Video assets per project (only Orbital Concierge has these at launch)
  -> prefers-reduced-motion check (must come first)

View Transitions
  -> Astro 3+ (already specified)
  -> Scroll-triggered animations (both respect prefers-reduced-motion together)

Tiered project index (T1/T2/T3)
  -> Content collection schema with tier field
  -> Before: filter/tag system (not needed until 10+ projects)

Case study prev/next navigation
  -> Content collection ordering
  -> Case study template

Sidebar Obsidian-style expansion
  -> Case study page template (child link nesting)
  -> Mobile collapse behavior (separate tablet/hamburger pattern)

Open Graph images per case study
  -> Case study content collection
  -> Astro OG image generation (built-in or @astrojs/og)

Accessibility statement page
  -> WCAG 2.2 AA audit of the build (must happen before publishing statement)
```

---

## MVP Recommendation

Prioritize for launch (Orbital Concierge single-case-study build):

1. Homepage with hero, 3 featured cards, contact strip
2. Work index with tiered layout (T1 prominent, infrastructure ready for T2/T3)
3. Orbital Concierge case study in Minto Pyramid structure with prev/next
4. About page with bio, positioning, tools
5. Left sidebar navigation with Obsidian-style expansion on case study pages
6. Dark mode toggle with localStorage persistence
7. Hover-to-video on Orbital Concierge card (video assets exist)
8. prefers-reduced-motion respected throughout
9. Semantic HTML + WCAG 2.2 AA focus states + contrast
10. Custom 404 + accessibility statement

Defer to post-launch:
- Project tag filtering (not enough projects to justify it yet)
- Open Graph images per case study (nice-to-have, not interview-blocking)
- Additional case studies (infrastructure ships now, content added later)
- Analytics (Plausible added post-launch per PROJECT.md)
- Custom domain (Netlify default URL at launch per PROJECT.md)

---

## Sources

- [6 UX Portfolio Rules That Actually Get You Hired in 2026](https://uxplaybook.org/articles/6-ux-portfolio-rules-get-hired-2026) — HIGH confidence, direct professional advice
- [How to Write UX Case Studies That Land You a Job (Minto Pyramid)](https://uxplaybook.org/articles/ux-case-study-minto-pyramid-structure-guide) — HIGH confidence, matches project spec
- [Stop the Generic Portfolio Trap: Game UX — IxDF](https://ixdf.org/literature/article/design-a-stand-out-game-ux-portfolio) — HIGH confidence, game-specific
- [Dark Mode in Web Design: Best Practices 2025](https://natebal.com/best-practices-for-dark-mode/) — MEDIUM confidence
- [Core Web Vitals 2026](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/) — HIGH confidence, official Google benchmarks
- [WCAG 2.2 Compliance Checklist 2026](https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/) — HIGH confidence, official standard
- [Portfolio SEO Step-by-Step](https://www.wix.com/blog/portfolio-seo) — MEDIUM confidence (Wix source, but SEO fundamentals are stable)
- [Interactive Portfolio Elements for Creatives 2025](https://www.getvsble.com/blog/interactive-portfolio-elements-for-creatives-2025-en) — MEDIUM confidence
- [Sidebar Navigation Design Examples 2026](https://www.navbar.gallery/blog/best-side-bar-navigation-menu-design-examples) — MEDIUM confidence
