---
phase: 4
slug: pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro static site, no test runner configured |
| **Config file** | None |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` + manual browser check at 3 breakpoints
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | CARD-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | CARD-03 | build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | PAGE-01 | build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | PAGE-04 | manual | Browser check | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 2 | PAGE-02 | build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 04-04-01 | 04 | 2 | PAGE-03 | build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 04-05-01 | 05 | 3 | PAGE-05 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 04-05-02 | 05 | 3 | PAGE-06 | build + Netlify | `npm run build` | ❌ W0 | ⬜ pending |
| 04-06-01 | 06 | 3 | — | deploy | Netlify build log | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/ui/ProjectCard.astro` — new component, must exist before homepage and work page tasks
- [ ] `src/assets/case-studies/krom/hero.png` — placeholder thumbnail (blocks krom.mdx creation)
- [ ] `src/assets/case-studies/pipeline/hero.png` — placeholder thumbnail (blocks pipeline.mdx creation)
- [ ] `netlify.toml` — required for first Netlify deploy
- [ ] `public/_redirects` — required for 404 catch-all on Netlify

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| #contact anchor scrolls from other pages | PAGE-04 | Requires browser navigation + View Transitions | Click "Contact" nav from Work page, verify scroll to contact strip |
| Card tier sizing visual hierarchy | CARD-01, CARD-03 | Visual layout check | View Work page at 1440px, 768px, 375px; verify T1 > T2 > T3 sizing |
| 404 page displays on unmatched routes | PAGE-06 | Requires Netlify deploy | Visit /nonexistent-page on live Netlify URL |
| Homepage hero matches Pencil mockup | PAGE-01 | Visual comparison | Compare deployed homepage to .pen file at all 3 breakpoints |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
