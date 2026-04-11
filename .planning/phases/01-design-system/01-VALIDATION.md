---
phase: 1
slug: design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (visual/manual validation for Phase 1) |
| **Config file** | none |
| **Quick run command** | `npm run dev` + visual browser check at localhost:4321 |
| **Full suite command** | `npm run build` (must succeed with zero errors) |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` — must pass
- **Phase gate:** All FOUN-0X checks below must pass before moving to Phase 2

---

## Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Command | Notes |
|--------|----------|-----------|---------|-------|
| FOUN-01 | `npm run dev` and `npm run build` succeed | Build smoke | `npm run build` | Static output in dist/ |
| FOUN-01 | Output is Netlify-deployable (no adapter, output:static) | Manual | Inspect astro.config.mjs | Configuration check |
| FOUN-02 | All CSS custom properties are visually correct in browser | Visual | Browser: localhost:4321/dev | Kitchen sink page |
| FOUN-02 | Color tokens match spec hex values exactly | Visual | Browser: /dev color swatches | Compare swatches to spec |
| FOUN-03 | Inter Variable and JetBrains Mono Variable load | Visual | Browser: /dev typography section | No fallback font rendering |
| FOUN-03 | No layout shift on font load (CLS < 0.1) | Lighthouse | DevTools Performance | Target: CLS = 0 |
| FOUN-04 | @layer declaration exists and layers are named correctly | Code review | Inspect global.css | Manual check |
| FOUN-04 | BEM naming applied to all /dev page elements | Code review | Inspect dev.astro source | Manual check |
| FOUN-05 | No flash on initial dark mode load | Visual | Browser: reload in dark mode | No white flash visible |
| FOUN-05 | Theme persists after hard reload | Manual | Set dark, reload, verify | localStorage check |
| FOUN-05 | Theme persists across View Transitions navigation | Manual | Navigate between / and /dev in dark mode | Requires ClientRouter |

---

## Wave 0 Gaps

None. Phase 1 establishes infrastructure; there are no pre-existing tests to write. The `npm run build` success check is the automated gate.
