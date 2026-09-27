# Provenance Ledger

Every structural claim in this folder carries a source and a confidence label.
This file is the audit trail. Read it before trusting any other file here.

**Ledger date:** 2026-09-25
**Base system path:** `F:\Antigravity\solving AI SLOP\Design System\`
**Base modification record:** held read-only for this entire project **except two
authorized edits on 2026-09-25**, both with explicit owner approval obtained *before*
the edit, not assumed from it.

1. The colour-role values in `design-tokens.md` were corrected for WCAG 2.2 AA. Exactly
   three hunks changed; spacing, typography, radii, shadows and the opacity block were
   untouched, and line endings were preserved. Pre-change copy:
   `tools/design-tokens.before-a11y.md`.
2. O5/O6 applied: the opacity block in `design-tokens.md` was rewritten (element opacity
   separated from M3 state-layer opacity; "muted" moved from an opacity to the
   `neutral-500` colour role) and focus rules were added to `design-tokens.md`
   (Focus Indicators section: two-surface contrast + WCAG 2.4.11 not-obscured),
   `interaction-motion-patterns.md` (bound at the focus-state specs and feedback rules)
   and `layout-patterns.md` (bound at the z-index layer list). Three base files
   modified; line endings preserved; measured evidence in `contrast-matrix.md`.

---

## 1. Confidence scale (closed set — use only these four labels)

| Label | Meaning |
|---|---|
| `INDEPENDENT` | Stated by a third party whose own materials we fetched. Verbatim quote + URL exists. |
| `OBSERVED` | Read directly from a file's structure (node tree, JSON, API). No third-party opinion, but factual. |
| `USER-DERIVED` | Traced to your own system or to a document inside a copy you own. **Not evidence of convergence.** |
| `UNVERIFIED` | Attempted, not obtained. Treat as unknown. |

Rule: `UNVERIFIED` items are never used to justify a rule. `USER-DERIVED` items
may describe your system, but may never be cited as Industry support.

---

## 2. Corpus provenance — the finding that invalidated earlier work

All three Figma files were queried via authenticated REST `GET /v1/files/:key`.

| Figma file | Key | `role` | Verdict |
|---|---|---|---|
| iOS 18 and iPadOS 18 (Community) | `sGwh6gbtPpTkHilbJ3YR1w` | **owner** | Your copy |
| Material 3 Design Kit (Community) | `i882phg1RSXuXMHnQ0bZrq` | **owner** | Your copy |
| ❖ Base Gallery (Community) | `BmT0dBndlDWQljvd43irn3` | **owner** | Your copy |

`OBSERVED`. These are **not** the upstream community originals. They are copies in
your account. Consequence: any guidance page that exists *inside* these copies is
not third-party evidence.

### Quarantine list

These pages are inside copies you own and their vocabulary mirrors your own
`form-field-group.md` (the "Label → Input → Supporting/Error → Action" pipeline,
"8px default rhythm", hover-as-a-button-state). They are quarantined.

| Quarantined page | Location | Reason |
|---|---|---|
| `DS / Foundations` | iOS 18 kit copy | Contents mirror your own system |
| `DS / Components` | iOS 18 kit copy | Same |
| `DS / Patterns` | iOS 18 kit copy | Same |
| Any semantic role names sourced from the above | Various | May be back-projection |

**Quarantine rule:** nothing from these pages may be cited as Industry support in
any file in this folder.

---

## 3. Retractions

Two claims made in the earlier session are withdrawn. Both were stated confidently
and both were wrong.

### Retraction 1 — circular corroboration of the 8px scale

**Claimed:** the iOS kit's `DS / Foundations` pages independently corroborated your
8px spacing rhythm and 150/200/300/400ms motion bands, proving they were industry
convention.

**Why it is withdrawn:** those pages live inside a copy you own, and their wording
tracks your own files. Validating a standard against a document derived from that
standard is circular. **Evidentiary weight: zero.**

**What replaced it (INDEPENDENT, and it contradicts the claim):**
- Uber Base, `Dimensions`: *"Baseline grid: Use multiples of 4 when defining
  measurements, spacing, and positioning elements."* → not 8.
- Uber Base, Figma grid specs: gutter **36px** at the Large breakpoint → not a
  multiple of 8.
- Uber Base, `Timing`: default durations are **200 / 400 / 500 ms** → no 150, no 300.

### Retraction 2 — "M3 and Uber Base guidance is unreachable"

**Claimed:** m3.material.io and base.uber.com were blocked (JS-rendered SPA /
CMS-driven), so their written rules could not be extracted; only implementation-level
substitutes were available.

**Why it is withdrawn:** that was a limitation of `read_url` alone, not of the
available toolset. Using the Firecrawl connector, **both render fully.** Every rule
in `rules-material-3.md` and `rules-uber-base.md` was obtained this way.

### Correction 3 — Apple HIG route

An initial JSON path guess returned 404. The working route is
`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`
(note: **no** `/documentation/` segment). Verified 200, ~36KB per page.

---

## 4. Source register

Every rule in this folder traces to one of these. Fetch date: **2026-09-25**.

| Source | Route used | Status |
|---|---|---|
| Apple HIG | `developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json` | `INDEPENDENT` — 10 pages, ~36KB each |
| Material 3 | Firecrawl rendered markdown + `formats:["query"]` | `INDEPENDENT` — dialogs, breakpoints, spacing, states |
| Uber Base | Firecrawl rendered (Zeroheight-hosted) | `INDEPENDENT` — dimensions, timing |
| W3C WCAG 2.2 | `w3.org/WAI/WCAG22/Understanding/<sc>.html` | `INDEPENDENT` — 1.4.3, 1.4.11, 1.4.12, 2.4.11, 2.5.8 |
| Figma node trees | REST `/v1/files/:key/nodes` | `OBSERVED` — structure only |

### Per-source limitations (recorded, not hidden)

| Source | Limitation |
|---|---|
| Apple HIG | `navigation-bars` returns **404**; Apple restructured that slug. Not extracted. |
| Uber Base `sheet` | **`UNVERIFIED`** — three Firecrawl attempts returned "content not on page". No sheet rules are asserted in `rules-uber-base.md`. |
| Uber Base `motion` | **`UNVERIFIED`** — query mode returned nothing usable. `timing` succeeded, so durations are covered but motion principles are not. |
| M3 `grids-spacing` | Page links onward to subpages; column/margin/gutter values come from the **breakpoint subpages** and the `expanded` tier, not the overview. |
| M3 spacing values | Token **names** extracted (`Space 0 … Space 900`). Their dp equivalents were **not** extracted → `UNVERIFIED`. |

---

## 5. Claim ledger — what in this folder rests on what

| Claim | Label | Source |
|---|---|---|
| Apple: alerts carry a title, optional informative text, and up to **three** buttons | `INDEPENDENT` | HIG `alerts` |
| Apple: avoid showing an alert when the app starts | `INDEPENDENT` | HIG `alerts` |
| Apple: never assign the primary role to a destructive button | `INDEPENDENT` | HIG `buttons` |
| Apple: action sheet — not an alert — for choices related to an intentional action | `INDEPENDENT` | HIG `action-sheets` |
| Apple: never chain sheet → sheet | `INDEPENDENT` | HIG `sheets` |
| Apple: never cascade popovers; never overlay a popover except with an alert | `INDEPENDENT` | HIG `popovers` |
| M3: dialogs contain a **maximum of two actions** | `INDEPENDENT` | m3 dialogs guidelines |
| M3: one action ⇒ must be acknowledgement; two ⇒ one confirming + one dismissing | `INDEPENDENT` | m3 dialogs guidelines |
| M3: dialogs retain focus until dismissed | `INDEPENDENT` | m3 dialogs guidelines |
| M3: breakpoints 600 / 840 / 1200 / 1600 | `INDEPENDENT` | m3 breakpoints |
| M3: state layer opacities 8 / 12 / 38% | `INDEPENDENT` | m3 states |
| M3: spacing token names `Space 0…900` (18 values) | `INDEPENDENT` | m3 spacing tokens |
| M3: spacing token **values in dp** | `UNVERIFIED` | Not extracted |
| Uber: baseline grid is **multiples of 4**, modular scale ratio 1.125, root 4 | `INDEPENDENT` | Base `Dimensions` |
| Uber: grid 320–599 / 600–1135 / 1136+; gutters 16 / 36; margins 16 / 36 / 64 | `OBSERVED` | Base Figma layout grids |
| Uber: density axis `Layout / Normal` vs `Layout / Compact` | `OBSERVED` | Base Figma node names |
| Uber: durations 200 / 400 / 500 ms with named quintic/quadratic easings | `INDEPENDENT` | Base `Timing` |
| Uber: nav bar height iOS 44 / Android 48; phone margin 16 | `INDEPENDENT` | Base `Dimensions` |
| WCAG 1.4.3: 4.5:1 text, 3:1 large | `INDEPENDENT` | W3C |
| WCAG 2.5.8: 24×24 CSS px minimum target | `INDEPENDENT` | W3C |
| WCAG 2.4.11: focus target not entirely hidden by author content | `INDEPENDENT` | W3C |
| WCAG 1.4.12: 1.5 / 2 / 0.12 / 0.16 spacing override tolerances | `INDEPENDENT` | W3C |
| The four semantic-role vocabularies reconcile as mapped | `USER-DERIVED` | Earlier session; partly rested on quarantined pages — see §6 |
| Canonical 8-state matrix | `USER-DERIVED` | Authored convention, **not** an industry standard. M3 defines 6, this folder defines 8. |

---

## 6. Correction applied to `universal-vs-platform.md`

The role-reconciliation table in that file listed `iOS kit` and `M3 role` column
values (e.g. `Surface`, `Surface subtle`, `Text secondary`, `Accent`, `Destructive`).
Those names were read from the **quarantined `DS /` pages**. They are therefore
`USER-DERIVED`, not industry vocabulary.

The carried-over copy in this folder marks those columns accordingly. Uber's column
is retained as `INDEPENDENT`, because Uber's semantic groups (`Background`,
`Content tokens`, `Border`) were read directly from its Figma `Light tokens` frame.

---

## 7. Standing rules for anything added later

1. A new rule must arrive with a URL and a fetch date, or it is not added.
2. A rule sourced from a file you own is labelled `USER-DERIVED` and may never be
   described as Industry practice.
3. When two `INDEPENDENT` sources disagree, the disagreement is recorded in
   `reconciliation-breakpoints-density.md` with a stated resolution and the losing
   option named — never silently averaged.
4. Nothing in this folder edits the base system. Conflicts with base are declared as
   `[overrides base: <file>]` with a scope statement.

**Fallback clause:** if a rule is needed and no source in §4 covers it, mark it
`UNVERIFIED` and stop. Do not invent a rule.
