# Rules — Uber Base

**Source:** `https://base.uber.com` (hosted on **Zeroheight**, which is why plain HTTP
extraction returns an empty SPA shell — the content is CMS-delivered)
**Extraction routes:** Firecrawl rendered scrape for written rules;
Figma REST `/v1/files/BmT0dBndlDWQljvd43irn3/nodes` for structure.
**Fetched:** 2026-09-25 · **Provenance:** `INDEPENDENT` (rules) / `OBSERVED` (structure)

Disclaimer surfaced by Uber's own site copy: *"Baseline includes components and guidance
originally designed for powering Uber's internal products… Please consider whether
[there] are components or guidance that make sense for your own products."* Treat Base
as a peer input, not an authority.

---

## 1. Dimensions — the most consequential finding in this file

Source: `https://base.uber.com/6d2425e9f/p/598458-dimensions`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| D1 | **"Baseline grid: Use multiples of 4 when defining measurements, spacing, and positioning elements."** | base `design-tokens` — **contradicts your 8px base unit** |
| D2 | "Spacing interval: incremental spacing scale with a root of 4 based on a modular scale with a major second ratio (1.125)." | base `design-tokens` |
| D3 | "Core sizes: designers will use a set of five archetype sizes." | base `layout-patterns` |
| D4 | Phone layout — "Nav bar height: iOS 44, Android 48" | ext `mobile-touch-patterns` |
| D5 | Phone layout — "Left & right margin: 16" | base `layout-patterns` |
| D6 | Phone layout — "Artwork column (centered in): 64" | base `layout-patterns` |

### Why D1 matters more than it looks

Your `design-tokens.md` states: *"Base unit: 8px — Values (use only these): 4, 8, 16,
24, 32, 40, 48."* Uber's written rule is a **4px** baseline grid.

This is not a rounding difference. It explains an otherwise bizarre number:
Uber's Large-breakpoint grid uses a **36px gutter** (§3). Under your 8px law, 36 is
illegal — 8 × 4.5. Under Uber's 4px law, 36 is valid — 4 × 9. **Uber's system is
internally consistent; the conflict is entirely created by your base unit.**

Three systems, three foundations:

| System | Stated foundation | Provenance |
|---|---|---|
| Yours | "Base unit: 8px", closed set of 7 values | `USER-DERIVED` |
| Uber Base | "Use multiples of 4", modular scale ratio 1.125, root 4 | `INDEPENDENT` |
| M3 | 18 named `Space` tokens | `INDEPENDENT` |

**No convergence exists.** "8px is the industry standard" is unsupported by every
source fetched. See `reconciliation-breakpoints-density.md` §3.

---

## 2. Timing — durations and easing

Source: `https://base.uber.com/6d2425e9f/v/0/p/77fcaf-timing`

| # | Curve | cubic-bezier | Default duration |
|---|---|---|---|
| M1 | Quintic EaseInOut | `cubic-bezier(0.83, 0, 0.17, 1)` | **500 ms** |
| M2 | Quintic EaseOut | `cubic-bezier(0.22, 1, 0.36, 1)` | **500 ms** |
| M3 | Quintic EaseIn | `cubic-bezier(0.64, 0, 0.78, 0)` | **400 ms** |
| M4 | Quadratic EaseIn | `cubic-bezier(0.11, 0, 0.5, 0)` | **200 ms** |
| M5 | Linear (no easing) | `cubic-bezier(0, 0, 1, 1)` | **200 ms** |

**Comparison to base `interaction-motion-patterns.md` (150 / 200 / 300 / 400 ms):**

| Duration | Yours | Uber Base |
|---|---|---|
| 150 ms | yes | **absent** |
| 200 ms | yes | yes |
| 300 ms | yes | **absent** |
| 400 ms | yes | yes |
| 500 ms | **absent** | yes |

Two systems, and they share exactly two values (200, 400). Uber also ships **five named
easing curves**; your system uses one shared easing. Neither choice is wrong — but
"universal motion bands" is not a claim the evidence supports.

`UNVERIFIED`: Uber's `motion` page returned nothing usable on three attempts. Motion
*principles* (when to animate, what may animate) were not obtained — only timing.

---

## 3. Grid — three tiers, plus a density axis

Source: Figma `Layout / Normal` and `Layout / Compact` frames (`OBSERVED`).
**Important:** the density axis is absent from Uber's written guidance pages we could
reach; it exists as a structural fact in the Figma file.

### Normal density

| Tier | Range | Columns | Margin | Gutter |
|---|---|---|---|---|
| Small | 320–599 px | 4 | 16 | 16 |
| Medium | 600–1135 px | 8 | 36 | 36 |
| Large | 1136 px+ | 12 | 64 | 36 |

### Compact density

| Tier | Range | Columns | Margin | Gutter |
|---|---|---|---|---|
| Small | 320–599 px | 4 | 16 | 16 |
| Medium | 600–1135 px | 8 | **24** | **16** |
| Large | 1136 px+ | 12 | **24** | **16** |

Each tier also has a "no margin" (full-bleed) variant.

| # | Finding | Binds to |
|---|---|---|
| G1 | Small→Medium boundary is **600**. | `reconciliation-breakpoints-density.md` §2 |
| G2 | Medium→Large boundary is **1136**. | Same — no other system uses this number |
| G3 | Gutters are **16 or 36** — neither is 24 or 32 (your base's values). | base `layout-patterns` |
| G4 | Density changes **only** margin and gutter, never tiers or columns. | New concept — absent from your base |
| G5 | All margin/gutter values satisfy "multiples of 4". | See D1 |

---

## 4. Token architecture (OBSERVED from Figma `Light tokens`)

Tier labels read directly from the frame structure:

```
01 Primitives  →  _ Primitive Scale - NEW
02 Core        →  Colors
03 Semantic    →  Background · Content tokens · Border
03 Semantic Extensions
05 Programs
```

| # | Finding | Binds to |
|---|---|---|
| TA1 | Base separates **Primitives → Core → Semantic**, three tiers minimum. Your `design-tokens.md` is one flat layer. | base `design-tokens` |
| TA2 | Semantic tokens group as **Background / Content tokens / Border**. Note: *Content*, not *Text* — content can be an icon. | base `design-tokens` |
| TA3 | Components are stamped **"Signed by Base (Typography / Display / Medium)"** — token references carry provenance and version. | base `design-tokens` |
| TA4 | Typography exists as **two parallel generations** (`Typography 1.0` and `Typography 2.0`), as does `Color 2.0`. Base runs migrations in parallel rather than breaking consumers. | Future-proofing pattern |

TA3 and TA4 are the most transferable ideas here and are **absent from your system**.
TA4 in particular is the mechanism that lets a standard change without forcing a
rewrite — relevant to what you are building.

---

## 5. Component taxonomy (OBSERVED, for gap analysis)

Read from the Figma section list:

**Inputs (10):** Text field · Select · Search · Stepper · Field group · Country ·
Password field · PIN code · Text area · File drop

**Feedback:** System banner (warning / negative / accent / positive × Android / iOS /
iOS X / Web × "High Priority" × "1 line") · Snackbar · Banner · Docked · Empty state

**Navigation:** Bottom Navigation · Breadcrumbs · Menu · Tabs · Headers · Navigation ·
Pagination · Page control

**Data:** List / Core · List / Control · List heading · Tile · Card · Chart ·
Progress · Progress - Steps · Progress - Listed · Star Rating · Badge · Tag ·
Avatars · Indicators · Tooltip

**Type roles:** Display · Mono Display · Heading · Mono Heading · Label · Mono Lable
(sic) · Paragraph · Mono Paragraph

| # | Finding | Binds to |
|---|---|---|
| C1 | Base pairs every type role with a **Mono** variant. Your system has **no mono role** at all. | base `design-tokens` |
| C2 | Base treats **density** as a layout axis, not a spacing value. | See §3 |
| C3 | System banner covers 4 semantic variants × 4 platforms × 2 priorities — far richer than your `feedback-patterns.md` banner set. | base `feedback-patterns` |
| C4 | Nine of Base's ten input types are absent from your base (§ "Input — Text field" is the only overlap). | ext `advanced-form-widgets` |
| C5 | Base names a `Sheet` component. | gaps to ext `modal-dialog-patterns` |

---

## 6. Not extracted

| Topic | Status |
|---|---|
| Base `Sheet` anatomy and button count | **`UNVERIFIED`** — page failed to render content across three attempts. A search-index description mentions the header "can include a title, a description, two buttons" — **this is a snippet, not fetched page content. Do not cite it as a rule.** |
| Base `Motion` principles | **`UNVERIFIED`** — see §2 |
| Base density guidance in prose | **`UNVERIFIED`** — density confirmed structurally from Figma only |
| Base grid breakpoints in prose | **`UNVERIFIED`** — the boundaries in §3 are observed from layout frames, not stated as written rules |
| Base `Color 2.0`, `Typography 2.0`, `Charts`, `System principles`, `Transitions` | **Not fetched.** `UNVERIFIED`. |

---

**Fallback clause:** if a case is not covered by D1–C5, use the base system's rule.
Do not invent a Base rule. Do not treat §3 as written guidance — it is observed
structure, and structure can be a one-off.
