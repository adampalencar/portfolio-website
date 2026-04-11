---
phase: 02
slug: navigation-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual visual + build verification (no unit test framework for Phase 2) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` + visual check at 3 breakpoints |
| **Estimated runtime** | ~2 seconds (build) + manual visual |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Visual check at all 3 breakpoints (1440px, 900px, 375px)
- **Before `/gsd:verify-work`:** Full suite must be green + human visual verification
- **Max feedback latency:** 2 seconds (build time)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | NAV-06 | file check | `ls src/icons/*.svg` | N/A W0 | pending |
| 02-01-02 | 01 | 1 | NAV-01, LAY-01 | build | `npm run build` | N/A | pending |
| 02-01-03 | 01 | 1 | NAV-03 | build + visual | `npm run build` | N/A | pending |
| 02-01-04 | 01 | 1 | NAV-02 | build + visual | `npm run build` | N/A | pending |
| 02-01-05 | 01 | 1 | NAV-05 | keyboard + a11y | Manual Tab test | N/A | pending |
| 02-02-01 | 02 | 2 | LAY-02 | build + visual | `npm run build` | N/A | pending |
| 02-02-02 | 02 | 2 | LAY-03 | build + visual | `npm run build` | N/A | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `src/icons/` directory with all needed pixelarticons SVGs (home, briefcase, user, mail, moon, sun, menu, close, chevron-down)
- [ ] astro-icon integration added to `astro.config.mjs`
- [ ] `src/components/layout/` directory created
- [ ] Placeholder pages at `/work` and `/work/orbital-concierge` for sidebar accordion testing

*Wave 0 tasks can be bundled into Plan 01 Task 1.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Desktop sidebar at 220px | NAV-01 | Visual layout | Resize browser to 1440px+, verify sidebar width |
| Tablet top bar | NAV-01 | Visual layout | Resize to 900px, verify top bar |
| Mobile hamburger + drawer | NAV-01 | Visual + interaction | Resize to 375px, tap hamburger, verify slide-in |
| Work folder accordion | NAV-02 | Visual + interaction | Navigate to case study, verify folder expansion |
| Dark mode toggle animation | NAV-03 | Visual | Click toggle, observe icon swap animation |
| No sidebar flicker on navigate | NAV-04 | Visual | Click nav links rapidly, watch for re-render |
| Keyboard navigation order | NAV-05 | Keyboard | Tab through all nav controls at each breakpoint |
| Footer responsive stacking | LAY-02 | Visual | Check footer at 1440px and 375px |
| Breakpoint transitions | LAY-03 | Visual | Drag browser width through all 3 breakpoints |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
