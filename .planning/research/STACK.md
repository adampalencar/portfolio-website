# Technology Stack

**Project:** Portfolio Website (Adam Palencar)
**Researched:** 2026-04-11
**Research mode:** Ecosystem — standard 2025/2026 Astro portfolio stack

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | 6.1.x (latest stable) | Static site framework | Ships zero JS by default. Built-in image optimization, Content Layer API, View Transitions (ClientRouter), and font API. v6.1.5 is the current stable as of April 2026. No SSR needed — static output is the right mode for this site. |
| Vite | 7.x (via Astro) | Dev server + bundler | Bundled with Astro 6. No separate configuration needed. |
| Node.js | 22.x | Build environment | Required by Astro 6 (dropped Node 18 and 20). |

**Confidence: HIGH** — Verified against official Astro GitHub releases (astro@6.1.5 as of April 8, 2026) and the upgrade-to-v6 docs.

---

### Content

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro Content Layer API | Built into Astro 6 | Case study content management | Type-safe markdown with Zod schema validation. glob() loader handles file-based .md files from src/content/. This replaced the legacy content collections API entirely in v6 — no workarounds needed. |
| Markdown (.md) | — | Case study authoring | Plain markdown with YAML frontmatter. No MDX needed — case studies are structured but not component-heavy. Simpler toolchain. |
| Zod 4 | Bundled with Astro 6 | Frontmatter schema validation | Astro 6 upgraded to Zod 4. Use z.string(), z.date(), etc. for case study frontmatter. Catches content errors at build time. |

**Config file location:** `src/content.config.ts` (NOT `src/content/config.ts` — that was v5's path)

**Confidence: HIGH** — Verified against Astro content collections docs for v6.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vanilla CSS | Browser-native | All styling | Design system is precise (8px base, 12-col grid, two named typefaces, exact color tokens). Custom properties map 1:1 to design tokens. Tailwind would add noise and fight the specificity of a custom design system. |
| CSS Custom Properties | Browser-native | Design token layer | Define all tokens in :root — colors, spacing, typography scales, z-index layers. Override a subset under [data-theme="dark"] for dark mode. No runtime cost. |
| CSS Container Queries | Browser-native | Component-level responsiveness | Use for cards, sidebar, and any component that appears in multiple layout contexts. container-type: inline-size on parent wrappers. Support is baseline across all modern browsers (Chrome 105+, Firefox 110+, Safari 16+). |
| CSS Nesting | Browser-native | Style organization | Baseline 2024 — supported in all modern browsers without a preprocessor. Group component states and modifiers without repeating selectors. |
| CSS Layers (@layer) | Browser-native | Specificity management | Define explicit cascade layers: @layer reset, base, tokens, layout, components, utilities. Prevents specificity wars as the codebase grows. |

**What NOT to use:** Sass/SCSS — unnecessary complexity now that CSS has nesting. Tailwind — fights a custom design system. CSS-in-JS — no component framework to pair with it.

**Confidence: HIGH** — CSS features verified as baseline-supported via MDN/browser compatibility data.

---

### Typography

| Technology | Package | Purpose | Why |
|------------|---------|---------|-----|
| Inter Variable | @fontsource-variable/inter (v5.2.x) | Display and body typeface | Variable font means one file covers all weights. Fontsource serves from your own domain — no Google Fonts CDN, no third-party requests, no privacy leakage. Self-hosted via Astro's built-in Font API. |
| JetBrains Mono Variable | @fontsource-variable/jetbrains-mono | Metadata/labels/monospace layer | Same rationale as Inter. The key visual differentiator of the design — used for section numbers, timestamps, project codes. |
| Astro Font API | Built into Astro 5+ | Font configuration | Handles preload link generation, CSS variable output, and caching automatically. Configure in astro.config.mjs under the fonts key. Both Fontsource packages are auto-detected from package.json. |

**Self-hosting rationale:** Google Fonts CDN introduces a third-party DNS lookup, is blocked by some privacy-focused browsers, and gives Google visibility into visitor IPs. Fontsource eliminates all three problems with a one-line npm install.

**font-display strategy:** Use font-display: swap for body text (Inter). Consider font-display: optional for JetBrains Mono since it's a decorative layer — no layout shift if it loads late.

**Confidence: HIGH** — Astro Font API docs verified. Fontsource package versions verified on npm (last modified 2025-09-10 for @fontsource-variable/inter).

---

### Icons

| Technology | Package | Purpose | Why |
|------------|---------|---------|-----|
| Pixelarticons | pixelarticons (npm, MIT) | Nav, UI, and decorative icons | 800 icons on a strict 24x24 grid, pure SVG path elements, fill="currentColor". Zero anti-aliasing matches the Swiss/industrial aesthetic. MIT licensed. |
| astro-icon | astro-icon (npm) | SVG icon component wrapper | Wraps local SVG files as Astro components with automatic svgo optimization. Import pixelarticons SVG files from the pixelarticons/svg/ directory and reference them through astro-icon. Avoids writing raw SVG inline throughout templates. |

**Workflow:** Copy needed pixelarticons from node_modules/pixelarticons/svg/ into src/icons/ (or configure astro-icon to resolve from node_modules path). astro-icon handles optimization and the Icon component interface.

**What NOT to do:** Do not use a webfont version of pixelarticons — SVG inline gives you currentColor theming and individual icon treeshaking.

**Confidence: MEDIUM** — astro-icon's ability to resolve pixelarticons SVGs verified via npm package docs. Pixelarticons SVG directory structure verified via GitHub. Integration pattern based on astro-icon's local SVG support.

---

### Images

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro Image (built-in) | Astro 6 built-in | All project screenshots and photos | Sharp-powered. Automatic WebP output, srcset generation, prevents layout shift via explicit dimensions, lazy loading by default. No external dependency needed. |
| `<Image />` component | Built-in | Standard image display | Use for single images with known dimensions. Outputs WebP by default. |
| `<Picture />` component | Built-in | Art-directed and responsive images | Use for project hero images where AVIF + WebP fallback is worth it, and for responsive images that need different crops at breakpoints. |
| layout="responsive" on Image | Astro 5.10+, stable in v6 | Responsive srcset generation | Set layout="responsive" to auto-generate srcset and sizes. Eliminates manual srcset authoring. |

**v6 image change to know:** Images now crop by default in the default image service. If you relied on no-crop behavior, pass fit="contain" explicitly.

**Confidence: HIGH** — Verified against Astro image docs.

---

### Animations and Transitions

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro ClientRouter (View Transitions) | Built into Astro 6 | Page-to-page navigation transitions | Formerly called `<ViewTransitions />`, renamed to `<ClientRouter />` in Astro 5. Add to the Layout component head. Handles fade/slide between pages with zero JS overhead for the fallback path. Cross-document View Transitions are supported in Chrome 126+ and Firefox 144+ (Oct 2025). |
| CSS `@keyframes` + Intersection Observer | Browser-native + ~20 lines JS | Scroll-triggered reveal animations | Fade-up, staggered content reveals. Pattern: add .is-visible class via IntersectionObserver callback, define @keyframes animation on that class. GPU-accelerated (opacity + transform only). Wrap in @supports for progressive enhancement. |
| CSS `animation-timeline: scroll()` | Browser-native (Chrome/Edge only, 2026) | Scroll-linked animations | NOT recommended as primary technique — Firefox support requires a flag as of mid-2025, Safari not implemented. Use as progressive enhancement only, wrapped in @supports (animation-timeline). For core reveals, use Intersection Observer instead. |
| `prefers-reduced-motion` | Browser-native | Accessibility | Wrap all animations in @media (prefers-reduced-motion: no-preference) or set animation: none !important when prefers-reduced-motion: reduce. This is a hard requirement, not optional. |

**What NOT to use:** GSAP — explicitly excluded in PROJECT.md. AOS library — adds a JS dependency for something achievable with 20 lines of vanilla JS + CSS. Motion (Framer Motion) — requires React. Anime.js — unnecessary weight.

**Confidence: HIGH for ClientRouter and Intersection Observer patterns. MEDIUM for CSS scroll-driven animations browser support** (Firefox flag status may have changed since research date — verify before using as primary technique).

---

### Dark Mode

| Technology | Purpose | Implementation |
|------------|---------|----------------|
| CSS Custom Properties + `[data-theme]` attribute | Theme switching | Define light tokens in :root. Override with [data-theme="dark"] { --color-bg: ...; etc. }. Avoid relying solely on @media (prefers-color-scheme) since the site needs a manual toggle. |
| JavaScript (inline script, ~15 lines) | Prevent flash of wrong theme | Place a `<script>` immediately after `<body>` (before any rendering) that reads localStorage and sets document.documentElement.dataset.theme. This runs before CSS paints, eliminating the white flash on dark-mode reload. |
| localStorage | Persist user preference | Key: "theme", values: "light" or "dark". Fall back to system preference (matchMedia) if no localStorage value exists. |

**Pattern:**
```js
// In <head> or immediately after <body>, NOT deferred
const saved = localStorage.getItem('theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.dataset.theme = saved ?? system;
```

**Why data attribute over class:** `[data-theme="dark"]` is more semantic than `.dark` and is the standard pattern in 2025/2026. It also avoids Astro's class scoping interfering with global theme selectors.

**Confidence: HIGH** — Pattern verified across multiple official and community sources. localStorage + data attribute is the consensus approach.

---

### Deployment

| Technology | Purpose | Why |
|------------|---------|-----|
| Netlify (free tier) | Hosting and CDN | Zero-config static deploy. Automatic Astro detection — no adapter required for output: 'static'. Free tier includes 100GB bandwidth and 300 build minutes/month, ample for a portfolio site. |
| Netlify CLI (optional) | Local preview of build | `netlify dev` mirrors the production environment locally. Useful for testing redirects and _headers. |
| `output: 'static'` in astro.config.mjs | Build mode | Correct mode for a portfolio with no server-side rendering. All pages pre-rendered at build time. Optimal for Netlify CDN caching. |
| `_redirects` file | Custom 404 routing | Netlify uses a `_redirects` file in the `public/` directory. Add `/* /404 404` to catch all unmatched routes and serve the custom 404 page. |

**No adapter needed** for static output. The @astrojs/netlify adapter is only required if using SSR, edge functions, or Netlify Image CDN. For this project: skip the adapter, keep the build lean.

**Confidence: HIGH** — Verified against Netlify's Astro deployment docs and the Astro deploy guide for Netlify.

---

### Build Tooling

| Tool | Purpose | Notes |
|------|---------|-------|
| `astro.config.mjs` | Project configuration | ESM format. Configure output: 'static', fonts, site URL, integrations. |
| TypeScript | Type checking | Astro projects include tsconfig.json by default. Use `strict: true`. Content Layer API benefits from typed collections. |
| Sharp | Image processing | Installed automatically with Astro. No separate install needed. |

---

## Project Initialization

```bash
# Create new Astro 6 project
npm create astro@latest portfolio --template minimal

# Install font packages
npm install @fontsource-variable/inter @fontsource-variable/jetbrains-mono

# Install icons
npm install pixelarticons astro-icon

# Confirm Astro version
npx astro --version
# Should output: astro v6.1.x
```

---

## What NOT to Use (and Why)

| Rejected | Category | Reason |
|----------|----------|--------|
| React / Vue / Svelte | UI framework | No interactive components require a framework. Astro components cover all static rendering needs. Adding a framework adds JS payload. |
| Tailwind CSS | Styling | Design system is custom and precise. Utility classes fight a token-based system. Custom properties map better to the design than Tailwind's scale. |
| GSAP | Animation | Explicitly excluded in PROJECT.md. ClientRouter + CSS animations + Intersection Observer cover all motion needs. |
| MDX | Content format | Case studies are structured but not component-heavy. Plain markdown is simpler. If interactive components are needed in case studies later, MDX can be added — but start without it. |
| @astrojs/netlify adapter | Deployment | Only needed for SSR. Static output deploys to Netlify without it. |
| Google Fonts CDN | Typography | Third-party DNS lookup, privacy exposure, potential blocking in privacy-hardened browsers. Fontsource self-hosting eliminates all three issues. |
| AOS / ScrollReveal | Scroll animations | External JS dependencies for something achievable with ~20 lines of vanilla JS + CSS. |
| CSS preprocessors (Sass, Less) | Styling | CSS nesting is baseline 2024. Custom properties replace variables. No preprocessor adds value here. |
| Legacy content collections API | Content | Removed in Astro v6. All collections must use the Content Layer API with a loader. |

---

## astro.config.mjs Skeleton

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://your-netlify-url.netlify.app',
  fonts: [
    {
      provider: 'fontsource',
      name: 'Inter Variable',
      cssVariable: '--font-inter',
    },
    {
      provider: 'fontsource',
      name: 'JetBrains Mono Variable',
      cssVariable: '--font-mono',
    },
  ],
});
```

---

## src/content.config.ts Skeleton

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tier: z.enum(['1', '2', '3']),
    projectCode: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { caseStudies };
```

---

## Sources

- [Astro v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) — HIGH confidence
- [Astro GitHub releases](https://github.com/withastro/astro/releases) — astro@6.1.5 confirmed April 8, 2026 — HIGH confidence
- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence
- [Astro image docs](https://docs.astro.build/en/guides/images/) — HIGH confidence
- [Astro fonts docs](https://docs.astro.build/en/guides/fonts/) — HIGH confidence
- [Astro View Transitions docs](https://docs.astro.build/en/guides/view-transitions/) — HIGH confidence
- [Deploy Astro to Netlify](https://docs.astro.build/en/guides/deploy/netlify/) — HIGH confidence
- [Netlify Astro 6 support announcement](https://www.netlify.com/changelog/2026-03-10-astro-6/) — HIGH confidence
- [Pixelarticons GitHub](https://github.com/halfmage/pixelarticons) — HIGH confidence
- [astro-icon npm](https://www.npmjs.com/package/astro-icon) — MEDIUM confidence
- [CSS container queries MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries) — HIGH confidence
- [@fontsource-variable/inter npm](https://www.npmjs.com/package/@fontsource-variable/inter) — HIGH confidence
- [Astro 2025 year in review](https://astro.build/blog/year-in-review-2025/) — HIGH confidence
- [View Transitions cross-browser support tracker](https://events-3bg.pages.dev/jotter/in-all-major-browsers/) — MEDIUM confidence
