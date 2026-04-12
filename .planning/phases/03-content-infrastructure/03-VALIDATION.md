---
phase: 3
slug: content-infrastructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Zod schema validation at build time + visual verification |
| **Config file** | none |
| **Quick run command** | `npm run dev` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run dev` — visual inspection in browser
- **After every plan wave:** Run `npm run build` — zero errors required
- **Before `/gsd:verify-work`:** Full build must be green + visual verification at desktop, tablet, mobile breakpoints
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CONT-01 | smoke | `npm run build` (Zod throws on schema error) | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | CONT-05 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | CONT-02 | manual visual | `npm run dev` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 2 | CONT-03 | manual visual | `npm run dev` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 3 | CONT-04 | build artifact | `npm run build && ls dist/_astro/*.webp` | ❌ W0 | ⬜ pending |
| 03-03-02 | 03 | 3 | CONT-05 | build artifact | `npm run build && ls dist/_astro/*.webp` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No test framework needed — `npm run build` is the automated gate
- [ ] No test files needed — schema validation is handled by Zod at build time

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Minto Pyramid section order renders correctly | CONT-02 | Visual layout order cannot be validated by build | Open `/work/orbital-concierge`, verify sections appear: result, problem, key decisions, process, final design, reflection, CTA |
| Prev/next nav absent with single case study | CONT-03 | Conditional rendering requires browser verification | Open `/work/orbital-concierge` with only one case study, confirm no prev/next links |
| Screenshots display at correct sizes, responsive | CONT-04 | Image rendering quality requires visual check | View case study at desktop (1440px), tablet (768px), mobile (375px) breakpoints |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
