# Work Page Research

**Researched:** 2026-04-12
**Domain:** Portfolio work/projects page design, card interactions, progressive disclosure
**Confidence:** HIGH (patterns verified across multiple sources and existing codebase)

## Summary

This research covers five areas: (1) how award-winning portfolio work pages structure their project listings, (2) progressive disclosure patterns for revealing extra info on hover without hiding essentials, (3) mobile-first interaction patterns that work without hover, (4) CSS/minimal-JS card interaction techniques that fit the "no GSAP, no React" constraint, and (5) how to handle "coming soon" projects without looking incomplete.

The existing work page (`src/pages/work/index.astro`) already has a solid foundation: a featured hero card for the top project, a two-column grid for the rest, monospace metadata codes, and a "Coming soon" badge. The research below focuses on elevating this from functional to impressive while staying within the vanilla CSS + IntersectionObserver constraint.

**Primary recommendation:** Keep the hero + grid layout but upgrade card interactions with a layered hover system (image zoom + overlay content reveal + accent border), use `@media(hover: hover) and (pointer: fine)` to scope hover enhancements to capable devices, show all critical info by default on every breakpoint, and treat "coming soon" cards as intentional design elements rather than apologies.

---

## 1. Work Page Layout Patterns from Top Portfolios

**Confidence: HIGH** (verified across Awwwards winners, Muzli top-100 lists, and existing project research notes)

### The Hero + Grid Pattern

The strongest portfolio work pages use a **hierarchy of emphasis**, not a flat grid. The dominant pattern across Awwwards SOTD winners and Muzli's top-100 list (2025/2026) is:

1. **One featured project at full or near-full width** (the "hero card")
2. **Remaining projects in a 2-column grid below** (or 3-column on very wide screens)
3. **Optional: tier-3 items as a compact list or smaller cards at the bottom**

This is exactly what the current `work/index.astro` already implements. The layout is correct. What separates award-winning versions from basic ones is the **quality of the card interactions and the information density visible before any interaction**.

### What Top UX Portfolios Show Before Any Interaction

Every strong portfolio work page shows these elements without requiring hover or tap:

| Always visible | Why |
|---|---|
| Project title | Identification |
| Category/discipline label | Lets viewers filter mentally ("is this game UI or product?") |
| Thumbnail image | Visual hook, proves the work exists |
| One-liner description | Sets expectation for what they will read |
| Status indicator (if not all complete) | Prevents dead-end frustration |

The existing cards already show: code, title, oneliner, category/discipline tag, and thumbnail. This is solid. The "Coming soon" badge on incomplete cards is also already present.

### What Gets Revealed on Hover (Desktop Only)

Top portfolios use hover to surface **secondary information** that rewards exploration:

- CTA text ("Read case study" or arrow indicator)
- Tools/tech stack pills
- A subtle visual shift (image zoom, border glow, shadow lift)
- On some sites: a short animation on the thumbnail (parallax shift, slight scale)

**Key principle:** Hover reveals MORE, never hides the basics. The card should be fully comprehensible at rest.

### Specific Reference Sites and Their Patterns

**Eduard Bodak** (eduardbodak.com) / Awwwards SOTD
- Light background (#F8F8F8), orange accent, Inter Tight
- Project cards show title + category label at rest
- Scroll-triggered card flip animation (GSAP-driven, too heavy for this project)
- **Takeaway for this project:** The metadata density (code, category, discipline) in monospace is already a stronger information hierarchy than Bodak uses. Lean into it.

**Olha Lazarieva** (olhalazarieva.com)
- Extremely generous whitespace between cards
- Large thumbnails carry the visual weight; typography stays neutral
- Hover effect is minimal: slight opacity shift
- **Takeaway:** Whitespace between cards matters more than hover complexity. The current `gap: var(--space-4)` (24px) could be increased to `var(--space-5)` (32px) for more breathing room.

**Luca Volino** (lucavolino.com)
- Pure restraint. White background, charcoal type, cards carry everything
- No hover animations at all on the work page
- **Takeaway:** If the information design is strong enough, hover effects are a bonus, not a requirement. The monospace metadata layer already does heavy lifting.

**Anna Parmentier** (annaparmentier.com) / Game UI/UX
- Category navigation (Video Games / UI/UX / Illustration) for filtering
- Case study cards show role + tools prominently
- **Takeaway:** For a game UI portfolio specifically, showing tools (Figma, Unreal Engine 5) on the card helps hiring managers pattern-match instantly.

---

## 2. Progressive Disclosure Patterns for Project Cards

**Confidence: HIGH** (CSS patterns verified against MDN, Smashing Magazine, and production codebases)

### The Layered Reveal Pattern

The strongest approach for project cards uses three visual layers, each activated progressively:

**Layer 1: At Rest (always visible)**
- Thumbnail image
- Project code (monospace, accent color)
- Title
- One-liner description
- Category / Discipline tag

**Layer 2: On Hover (desktop only, via `@media(hover: hover)`)**
- Image zooms slightly (scale 1.02 to 1.04, not more)
- A subtle accent-colored top or left border fades in
- CTA text appears or becomes more prominent
- Optional: description text gets slightly more contrast

**Layer 3: On Focus/Active (keyboard + click)**
- Focus ring follows the design system (accent color outline)
- Same visual treatment as hover for accessibility parity

### Production CSS Pattern: Image Zoom + Content Shift

This is the most reliable hover pattern for portfolio cards. It works with pure CSS, is GPU-accelerated (transform + opacity only), and degrades gracefully:

```css
/* Container clips the zoom */
.card__image-wrap {
  overflow: hidden;
  border-radius: var(--space-2);
}

/* Image zooms on card hover */
.card__image-wrap img {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__image-wrap img {
    transform: scale(1.03);
  }
}
```

**Why `cubic-bezier(0.25, 0.46, 0.45, 0.94)`:** This is a gentle ease-out that feels editorial and deliberate, matching the "slow, editorial motion" directive from the visual direction doc. Standard `ease` is fine too, but this has a slightly more intentional feel.

### Production CSS Pattern: Accent Border Reveal

Instead of box-shadow (which can feel generic), a border-top or border-left that transitions from transparent to the accent color is distinctive and fits the Field Manual identity:

```css
.card {
  border-top: 2px solid transparent;
  transition: border-color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    border-top: 2px solid var(--accent);
  }
}
```

This is more distinctive than the current `opacity: 0.85` hover (which actually dims the card, the opposite of drawing attention).

### Production CSS Pattern: CTA Reveal

The CTA text ("View case study") can exist in the DOM but be visually hidden until hover:

```css
.card__cta {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-family: var(--font-mono);
  font-size: var(--size-xs);
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__cta {
    opacity: 1;
    transform: translateY(0);
  }
}

/* On mobile, CTA is always visible */
@media (hover: none) {
  .card__cta {
    opacity: 1;
    transform: none;
  }
}
```

### Anti-Pattern: Opacity Dim on Hover

The current implementation dims cards to `opacity: 0.85` on hover. This is a common shortcut but works against the goal of drawing attention TO the hovered card. Better alternatives:

- Raise the card (subtle `translateY(-2px)` + shadow)
- Add an accent border
- Zoom the image
- Any combination that adds visual energy rather than removing it

---

## 3. Mobile-First Interaction Patterns (No Hover Dependency)

**Confidence: HIGH** (media query approach verified via Smashing Magazine, MDN, and CSS-Tricks)

### The `@media(hover: hover)` Strategy

The correct approach is NOT to detect mobile vs. desktop by viewport width. Instead, use interaction capability media queries:

```css
/* Base styles: touch-friendly, no hover dependency */
.card__cta {
  opacity: 1;  /* Always visible on touch devices */
}

.card__image-wrap img {
  /* No transform at rest */
}

/* Enhancement layer: only for devices that can hover with a fine pointer */
@media (hover: hover) and (pointer: fine) {
  .card__cta {
    opacity: 0;  /* Hidden until hover on desktop */
  }

  .card:hover .card__cta {
    opacity: 1;
  }

  .card:hover .card__image-wrap img {
    transform: scale(1.03);
  }
}
```

**Why `(pointer: fine)` matters:** Without it, some Samsung devices and tablets with stylus support incorrectly report hover capability. The `(pointer: fine)` guard prevents hover-dependent content from being hidden on touch devices that technically support hover but where users never use it.

**Known issue:** Samsung Internet on some Galaxy devices reports `(hover: hover)` as true for touchscreens. Adding `(pointer: fine)` catches most of these edge cases (source: ctrl.blog research on Samsung CSS media queries).

### Mobile Card Layout Adjustments

On mobile, the card needs to work harder since there is no hover to reveal extra info:

1. **CTA is always visible** (the `@media (hover: none)` rule above)
2. **Touch targets are minimum 48x48px** (WCAG 2.2 requirement, up from 44px in older specs)
3. **The entire card is the tap target** (already implemented with `<a>` wrapping)
4. **No content is hidden** that would require a second tap to reveal

### Tap Feedback for Mobile

On touch devices, add active-state feedback since there is no hover preview:

```css
@media (hover: none) {
  .card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
```

This gives instant tactile feedback that the tap registered, which is important for cards that are entire clickable regions.

---

## 4. CSS/Minimal-JS Card Interaction Techniques

**Confidence: HIGH** (code patterns verified and tested against browser compatibility)

### Technique 1: Scroll-Triggered Stagger Reveal (IntersectionObserver)

This is the most impactful "wow factor" technique that fits within the constraints. Cards fade in and slide up as they enter the viewport, with a stagger delay based on their position in the grid.

**JavaScript (~25 lines):**

```javascript
function initScrollReveal() {
  const cards = document.querySelectorAll('[data-reveal]');
  if (!cards.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  cards.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
```

**CSS:**

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger via CSS custom property set in markup */
[data-reveal] {
  transition-delay: calc(var(--reveal-delay, 0) * 100ms);
}

/* Respect prefers-reduced-motion (global.css already handles this) */
```

**HTML usage in Astro:**

```html
<div class="work-grid">
  {rest.map((entry, i) => (
    <article data-reveal style={`--reveal-delay: ${i}`}>
      <!-- card content -->
    </article>
  ))}
</div>
```

The stagger delay is set via a CSS custom property directly in the markup. Each card delays by `i * 100ms`. For a 2-column grid, cards 0 and 1 appear nearly together (0ms and 100ms), then cards 2 and 3, creating a natural left-to-right, top-to-bottom reveal.

### Technique 2: Subtle Image Zoom + Accent Border (Pure CSS)

This combines the two hover patterns from Section 2 into one cohesive card interaction:

```css
.work-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;
  border-top: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.work-card__image-wrap {
  overflow: hidden;
  border-radius: var(--space-2);
  background: var(--bg-secondary);
  aspect-ratio: 16 / 9;
}

.work-card__image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (hover: hover) and (pointer: fine) {
  .work-card:hover {
    border-top-color: var(--accent);
  }

  .work-card:hover .work-card__image-wrap img {
    transform: scale(1.03);
  }

  .work-card:hover .work-card__cta {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Why this works for the Field Manual identity:** The accent border appearing on hover echoes the "precise, technical" feel of a selected document. It is a more intentional interaction than dimming or glowing.

### Technique 3: Mouse-Tracking Glow (Optional Enhancement, ~15 lines JS)

If an extra layer of polish is desired on the hero card specifically, a radial gradient that follows the cursor creates a subtle light effect. This is the technique Frontend Masters documented:

**JavaScript:**

```javascript
function initCardGlow() {
  const hero = document.querySelector('.work-hero');
  if (!hero || window.matchMedia('(hover: none)').matches) return;

  const overlay = hero.querySelector('.work-hero__glow');
  if (!overlay) return;

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlay.style.setProperty('--glow-x', `${x}px`);
    overlay.style.setProperty('--glow-y', `${y}px`);
    overlay.style.setProperty('--glow-opacity', '1');
  });

  hero.addEventListener('pointerleave', () => {
    overlay.style.setProperty('--glow-opacity', '0');
  });
}
```

**CSS:**

```css
.work-hero__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: var(--space-2);
  opacity: var(--glow-opacity, 0);
  background: radial-gradient(
    400px circle at var(--glow-x, 50%) var(--glow-y, 50%),
    var(--accent-5) 0%,
    transparent 70%
  );
  transition: opacity 0.4s ease;
  z-index: var(--z-raised);
}
```

This is subtle: a very faint green-tinted glow (using `--accent-5: #F0F7F2`) that follows the cursor over the hero card. It signals interactivity and adds a premium feel without being gimmicky. It should only be applied to the hero card, not every card in the grid.

### Technique 4: Card Elevation on Hover (Pure CSS)

A more restrained alternative to the glow, fitting the Swiss ethos of "less is more":

```css
@media (hover: hover) and (pointer: fine) {
  .work-card {
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  .work-card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.04),
      0 4px 8px rgba(0, 0, 0, 0.04),
      0 8px 16px rgba(0, 0, 0, 0.02);
  }
}
```

The multi-layer shadow at low opacity follows the Josh Comeau technique mentioned in the visual direction doc. It creates a soft, realistic elevation without feeling like a Material Design card lift.

### Techniques to Avoid

| Technique | Why to Skip |
|---|---|
| Card flip on hover | Hides content that was visible, violates the "hover reveals, never hides" rule |
| 3D tilt / vanilla-tilt.js | Adds dependency (or 40+ lines of JS). Reads as "tech demo" not "design portfolio". Conflicts with Swiss restraint |
| Clip-path shape reveals | Impressive but distracting on a page with 3 to 6 cards. Saves better for a single hero moment |
| Blur/glassmorphism overlays | Trendy but fights the Swiss/industrial clarity. Grain texture already provides tactile quality |
| Hover-to-video | Good technique in theory, but requires video assets for every project and adds significant page weight. Consider for a future enhancement if gameplay videos become available for Orbital Concierge |

---

## 5. Handling "Coming Soon" and Placeholder Projects

**Confidence: HIGH** (pattern derived from analysis of top portfolio behaviors and existing project context)

### The Problem

The site currently has 3 case studies in the content collection (orbital-concierge, krom, pipeline). Krom and Pipeline both say "Full case study coming soon" in their body. The work page needs to display these plus future Tier 2 and Tier 3 projects without looking incomplete.

### Pattern: Confident Placeholders, Not Apologies

The worst thing a portfolio can do is apologize for being incomplete. "Coming soon" with a sad empty state signals to a hiring manager that the portfolio is not ready. Instead, treat in-progress projects as **intentional teasers**.

**Recommended approach for each tier:**

**Tier 1 projects with incomplete case studies (Krom, Pipeline):**
- Show the full card with thumbnail, code, title, one-liner, category
- Replace the "Read case study" CTA with "Case study in progress" in a muted style
- Keep the thumbnail at full saturation (the project IS real, the writeup is just pending)
- Make the card non-clickable OR link to a stub page that shows the hero info + "Full case study dropping soon. Here's a preview." with 2 to 3 key screenshots

**Tier 2 projects (future additions):**
- Same card layout but with a `data-status="upcoming"` attribute
- Monospace status label: "CASE STUDY IN PROGRESS" in `--text-tertiary` color
- Image at full quality (still shows real work)
- Card links to `#` with `pointer-events: none` or to a minimal stub

**Tier 3 projects (no dedicated page):**
- Smaller cards in a compact grid (3-column on desktop, 2-column on tablet, 1-column on mobile)
- Thumbnail + title + one-liner + category tag
- No CTA, no link (these are portfolio breadth indicators, not deep dives)
- Can use a slightly reduced visual weight: smaller image, tighter spacing

### CSS for "In Progress" State

```css
/* Card with no completed case study */
.work-card[data-status="upcoming"] {
  cursor: default;
}

.work-card[data-status="upcoming"] .work-card__image-wrap {
  /* No desaturation: the work is real, the writeup is pending */
}

.work-card__status {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-top: 8px;
}

/* No hover enhancement on upcoming cards (nothing to click through to) */
@media (hover: hover) and (pointer: fine) {
  .work-card[data-status="upcoming"]:hover {
    border-top-color: transparent;
  }

  .work-card[data-status="upcoming"]:hover .work-card__image-wrap img {
    transform: none;
  }
}
```

### The "Coming Soon" Badge: Replace with Status Line

The current implementation uses a positioned badge over the thumbnail:

```html
<span class="work-card__badge">Coming soon</span>
```

This reads as a warning label. Better: move it to the metadata area below the image and rephrase it:

```html
<span class="work-card__status">CASE STUDY IN PROGRESS</span>
```

This reads as a status update, not an apology. It sits in the monospace metadata layer alongside the project code and category, making it feel like part of the information architecture rather than a bandage.

### Why Not Grayscale/Muted Thumbnails

Grayscale treatment signals "this project is lesser" or "this is archived." But these are real projects with real work; the only thing missing is the writeup. Keeping the thumbnails at full saturation maintains the impression of a strong body of work. The status text alone communicates what is and is not clickable.

### When the Portfolio Has Only 1 Complete Case Study

This is the current state (only Orbital Concierge is fully written). The strategy:

1. **Lead with Orbital Concierge as the hero card** (already implemented)
2. **Show Krom and Pipeline as full-quality cards** with "Case study in progress" status
3. **Do not add Tier 2/3 projects until their thumbnails are ready**. Three strong cards beat six cards where half look empty.
4. **The page should feel like "three projects, one deep dive" not "six projects, five broken links"**

---

## 6. Recommended Card Component Architecture

Based on all findings, here is the recommended card structure that handles all states:

### Data Model Addition

The content schema (`content.config.ts`) could benefit from a `status` field, but since the current detection is already done via checking the case study body content, a simpler approach works: check whether a case study has meaningful content (more than just the "coming soon" placeholder).

Alternatively, the work page Astro component can determine status from the `tier` and content body:

```typescript
// In work/index.astro frontmatter
const hasFullStudy = (entry) => {
  // Check if the MDX body has more than a placeholder
  return entry.body && entry.body.trim().length > 50;
};
```

### Recommended HTML Structure

```html
<article
  class="work-card"
  data-reveal
  data-status={hasFullStudy(entry) ? 'ready' : 'upcoming'}
  style={`--reveal-delay: ${index}`}
>
  <a
    href={hasFullStudy(entry) ? `/work/${entry.id}` : undefined}
    class="work-card__link"
    aria-label={`${entry.data.title} - ${hasFullStudy(entry) ? 'Read case study' : 'Case study in progress'}`}
  >
    <div class="work-card__image-wrap">
      <Image ... />
    </div>
    <div class="work-card__body">
      <span class="work-card__code">{entry.data.code}</span>
      <h3 class="work-card__title">{entry.data.title}</h3>
      <p class="work-card__oneliner">{entry.data.oneliner}</p>
      <div class="work-card__footer">
        <span class="work-card__tag">{tagLabel}</span>
        {hasFullStudy(entry)
          ? <span class="work-card__cta">View case study &rarr;</span>
          : <span class="work-card__status">CASE STUDY IN PROGRESS</span>
        }
      </div>
    </div>
  </a>
</article>
```

### Key CSS Custom Properties for the Card System

```css
:root {
  /* Card interaction tokens */
  --card-border-width: 2px;
  --card-zoom-scale: 1.03;
  --card-transition-duration: 0.4s;
  --card-transition-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --card-reveal-distance: 20px;
  --card-reveal-duration: 0.6s;
  --card-stagger-interval: 100ms;
}
```

---

## 7. Stagger and Reveal Animation Timing

**Confidence: HIGH** (matches visual direction "slow, editorial" motion requirement)

### Recommended Timing Values

| Element | Duration | Ease | Delay |
|---|---|---|---|
| Hero card reveal | 0.7s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0ms (first element) |
| Grid card reveal | 0.6s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | index * 100ms |
| Image zoom (hover) | 0.5s | cubic-bezier(0.25, 0.46, 0.45, 0.94) | 0ms |
| Border color (hover) | 0.3s | ease | 0ms |
| CTA reveal (hover) | 0.3s | ease | 50ms (after border) |

### Why These Durations

The visual direction specifies "slow, editorial" motion. 0.6s for reveals is in the sweet spot: fast enough to not feel sluggish, slow enough to feel intentional. The stagger interval of 100ms creates a visible wave without making users wait. At 6 cards (3 rows of 2), the last card appears at 500ms after the first, which is within the 1-second attention window.

### Reduced Motion Handling

The existing `global.css` already has a blanket reduced-motion override that sets all animation and transition durations to 0.01ms. This is correct and sufficient. The IntersectionObserver script should also check the preference and skip adding reveal classes, showing all content immediately (as shown in the script above).

---

## 8. Dark Mode Considerations for Card Interactions

The existing token overrides in `tokens.css` handle most of the dark mode work automatically. Specific card interaction elements to verify:

| Element | Light Mode | Dark Mode |
|---|---|---|
| Accent border on hover | `--accent` (#1B7A3D) | Same (accent tokens don't change) |
| Card shadow on hover | `rgba(0,0,0,0.04)` | Should use `rgba(0,0,0,0.2)` or similar to be visible on dark bg |
| "In progress" status text | `--text-tertiary` (#999999) | `--text-tertiary` (#6A6660) auto-adapts |
| Glow overlay (if used) | `--accent-5` (#F0F7F2) | Needs override: a darker tinted green |

**Shadow adjustment for dark mode:**

```css
[data-theme="dark"] .work-card:hover {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1);
}
```

---

## 9. Accessibility Checklist for Card Interactions

| Requirement | Implementation |
|---|---|
| Keyboard navigable | Cards are `<a>` elements, tabbable by default |
| Focus visible | Use `outline: 2px solid var(--accent); outline-offset: 4px;` matching the hover border |
| Focus parity with hover | Apply the same visual enhancements on `:focus-visible` as on `:hover` |
| Touch target size | Entire card is the tap target (already correct). Min 48x48px satisfied |
| Screen reader context | `aria-label` with project title + status |
| Reduced motion | Global override in place + JS check in scroll reveal |
| Color contrast | All text meets AA. Accent on `--bg-primary` is 4.84:1 |
| Non-clickable cards | `[data-status="upcoming"]` cards: use `<div>` instead of `<a>`, or `<a>` without `href` |

**Focus-visible CSS:**

```css
.work-card__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: var(--space-2);
}

/* Match hover visual treatment */
.work-card__link:focus-visible .work-card__image-wrap img {
  transform: scale(1.03);
}

.work-card__link:focus-visible ~ .work-card__cta {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 10. Implementation Priority

Ordered by impact-to-effort ratio:

| Priority | Change | Effort | Impact |
|---|---|---|---|
| 1 | Replace `opacity: 0.85` hover with accent border + image zoom | Low (CSS only) | High |
| 2 | Add scroll-triggered stagger reveal | Low (25 lines JS + CSS) | High |
| 3 | Add CTA reveal on hover, always-visible on mobile | Low (CSS only) | Medium |
| 4 | Replace "Coming soon" badge with "CASE STUDY IN PROGRESS" status line | Low (HTML + CSS) | Medium |
| 5 | Add `@media(hover: hover) and (pointer: fine)` guards | Low (CSS refactor) | Medium |
| 6 | Add `:focus-visible` parity with hover | Low (CSS only) | Medium (accessibility) |
| 7 | Add dark mode shadow override | Trivial | Low |
| 8 | Mouse-tracking glow on hero card | Medium (15 lines JS) | Low (nice-to-have) |

---

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/pages/work/index.astro`, `src/components/ui/ProjectCard.astro`, `src/styles/tokens.css`, `src/styles/global.css`
- Vault: `Visual Direction and References.md` (locked design decisions)
- Vault: `Portfolio Deep Dive Research.md` (110+ source research compilation)
- Vault: `Page List.md` (page structure and tier definitions)
- [Smashing Magazine: Guide to Hover and Pointer Media Queries](https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/)
- [CSS-Tricks: Scroll-Triggered Animation with Vanilla JavaScript](https://css-tricks.com/scroll-triggered-animation-vanilla-javascript/)
- [Frontend Masters: Glowing Hover Effect that Follows the Pointer](https://frontendmasters.com/blog/glowing-hover-effect/)
- [MDN: @media hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [MDN: @media pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)

### Secondary (MEDIUM confidence)
- [Awwwards: Best Portfolio Websites](https://www.awwwards.com/websites/portfolio/)
- [Muzli: 100 Best Designer Portfolio Websites of 2026](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Ctrl.blog: Samsung CSS hover media query inconsistencies](https://www.ctrl.blog/entry/css-media-hover-samsung.html)
- [Codrops: Eduard Bodak Animation Analysis](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/)
- [W3Schools: Image Hover Overlay Effects](https://www.w3schools.com/howto/howto_css_image_overlay.asp)

### Tertiary (used for pattern validation, not as primary source)
- [FreeFrontend: CSS Card Hover Effects collection](https://freefrontend.com/css-card-hover-effects/)
- [CSS Author: CSS Hover Effects](https://cssauthor.com/css-hover-effects/)
- [Prismic: CSS Hover Effects Guide](https://prismic.io/blog/css-hover-effects)
