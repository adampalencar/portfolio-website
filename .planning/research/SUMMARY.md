# Research Summary: Portfolio Website

## Executive Summary

Custom-coded, statically-generated portfolio site targeting game UI/UX hiring managers. The consensus stack for this domain in 2025/2026 is Astro 6 with static output, vanilla CSS, and no client-side framework. The site must function as a UX artifact itself: the Swiss/industrial design system, left sidebar navigation, monospace metadata layer, and hover-to-video on project cards are differentiators that competitors cannot easily replicate.

The main risk cluster is the interaction between Astro's View Transitions (ClientRouter), dark mode persistence, and script re-execution across soft navigations. All three must be architecturally addressed in the foundation phase.

## Stack Decision

- **Astro 6.1.x** (not v5) with static output, zero JS by default, Content Layer API, ClientRouter, Font API, built-in image optimization
- **Vanilla CSS** with `@layer` + custom properties. CSS nesting is baseline 2024. No Tailwind, no preprocessors
- **Content Layer API** with Zod schema via `src/content.config.ts` (not the old v4 path)
- **Inter Variable + JetBrains Mono Variable** via Fontsource, self-hosted through Astro Font API
- **Pixelarticons + astro-icon** for SVG inline icons with currentColor
- **Netlify free tier** static deploy, no adapter needed

## Feature Scope

**Table stakes (covered by PROJECT.md):** 3-5 curated case studies, Minto Pyramid structure, responsive across 3 breakpoints, visible contact, about page, LCP under 2.5s, WCAG 2.2 AA, custom 404.

**Differentiators:** Left sidebar with Obsidian-style tree expansion, monospace metadata layer, hover-to-video, warm light-mode default (contrarian for game portfolios), View Transitions, tiered T1/T2/T3 project index, grain texture.

**Anti-features:** Blog, contact form backend, CMS, 3D/WebGL, parallax, loading screen, password-protected studies, project filtering (not until 10+ projects).

## Architecture

Static Astro site, file-based routing, zero framework islands. BaseLayout wraps everything. Data flows down via props only. All interactivity via inline `<script>` blocks (deduped by Astro). Content Layer API feeds `[slug].astro` via `getCollection()` / `entry.render()`. Dark mode is a `[data-theme]` attribute swap on `<html>`. Sidebar persists via `transition:persist`.

## Critical Pitfalls

1. **Dark mode flash (FOWT)** compounded by View Transitions. Theme script needs `is:inline` in `<head>` AND `astro:after-swap` reapplication. Address in foundation phase.
2. **Script re-execution mismatch.** All observers and event listeners must use `astro:page-load`, not `DOMContentLoaded`. Address from day one.
3. **Markdown images bypass optimizer.** Use MDX for case studies so screenshots go through astro:assets pipeline.
4. **CSS specificity creep.** `@layer` + BEM naming from first component. Full rewrite if not.
5. **View Transitions + CSS transition flicker** (confirmed issue #8711). Mitigate with no-transitions class during swap via `astro:before-preparation`.

## Suggested Build Order (6 phases)

1. Foundation: Design system, tokens, cascade layers, typography, grid, dark mode infrastructure, font loading
2. Navigation Shell: BaseLayout with ClientRouter, Sidebar with transition:persist, MobileNav, Footer, DarkModeToggle with astro:after-swap
3. Content Infrastructure: content.config.ts schema (MDX), CaseStudyLayout, Orbital Concierge case study with optimized images
4. Pages: ProjectCard with tier variants, hover-to-video, Work index, Homepage, About, 404, accessibility statement, first Netlify deploy
5. Animations: Scroll-triggered reveals via IntersectionObserver + astro:page-load, View Transition shared elements, grain texture, prefers-reduced-motion
6. QA and Pre-Launch: Lighthouse 90+, keyboard audit, screen reader test, dark mode persistence, meta/OG tags, final deploy

## Confidence

Overall: **HIGH**. All critical recommendations verified against official Astro v6 docs and confirmed community issues.

Gaps requiring runtime verification: astro-icon + Pixelarticons integration path, grain texture opacity, hover-to-video on mobile Safari, CSS scroll-driven animations Firefox support.

---
*Synthesized: 2026-04-11 from STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md*
