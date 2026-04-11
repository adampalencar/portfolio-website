# Phase 1: Design System - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-11
**Phase:** 01-design-system
**Areas discussed:** Dark mode palette, CSS layer strategy, Token test page, Grain texture

---

## Dark Mode Palette

| Option | Description | Selected |
|--------|-------------|----------|
| Claude derives it | Invert the light palette intelligently: dark neutral bg, muted text, adjusted green accent for dark contrast | ✓ |
| Match Pencil design | Extract exact values from Pencil dark variant | |
| Let me specify | User provides specific dark mode colors | |

**User's choice:** Claude derives it
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Warm dark | Dark charcoal with warm undertones (#1A1A1A range). Matches warm off-white light theme. | ✓ |
| Cool dark | Blue-black tones (#0D1117 range, like GitHub dark). | |
| True black | Near-black (#000000-#111). Maximum contrast, OLED-friendly. | |

**User's choice:** Warm dark
**Notes:** Consistent with field manual identity

| Option | Description | Selected |
|--------|-------------|----------|
| Same green | Keep #1B7A3D. Already passes AA on dark backgrounds. | ✓ |
| Lighten slightly | Bump to lighter green (~#2E9E55) for more pop on dark surfaces. | |
| You decide | Claude picks based on contrast testing. | |

**User's choice:** Same green (#1B7A3D in both modes)
**Notes:** None

---

## CSS Layer Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Claude decides | Set up @layer order, BEM naming, file structure. User reviews output. | ✓ |
| Show me the plan first | Present proposed architecture before implementing. | |
| I have preferences | User specifies CSS architecture approach. | |

**User's choice:** Claude decides
**Notes:** None

---

## Token Test Page

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, kitchen sink | A /dev page showing colors, type scale, spacing, buttons, states in both modes. | ✓ |
| Minimal test only | Basic page confirming tokens work. | |
| No test page | Just CSS files, verify with real pages later. | |

**User's choice:** Full kitchen sink page
**Notes:** None

---

## Grain Texture

| Option | Description | Selected |
|--------|-------------|----------|
| PNG overlay | Small tiling PNG (~200x200px) with position:fixed, pointer-events:none. Predictable. | ✓ |
| SVG filter | CSS filter using feTurbulence. Lighter but inconsistent. | |
| CSS only | Base64-encoded noise pattern. Simplest but less control. | |
| You decide | Claude picks best approach. | |

**User's choice:** PNG overlay
**Notes:** None

## Claude's Discretion

- CSS @layer order and naming
- BEM naming conventions
- File/folder structure for CSS
- Exact dark mode token values (within warm charcoal constraint)
- Grain PNG resolution and exact opacity
- Astro project config details

## Deferred Ideas

None
