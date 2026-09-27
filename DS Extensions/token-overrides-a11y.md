# Token Overrides — Accessibility

**Declaration type:** Layer 2 · `[overrides base: design-tokens.md]` — **APPLIED**
**Scope:** colour VALUES for text, error, success and control-boundary roles. Nothing else.
**Status:** O1–O6 applied — O1–O4 to `Design System/design-tokens.md` on **2026-09-25**
with explicit owner authorization; O5 and O6 applied the same date under the same
authorization (three base files touched — see the application record at the end).

**Verification:** every replacement value below was tested, not chosen by eye.

```
node tools/check-contrast.mjs                          → 0 non-exempt failures (exit 0)
node tools/check-contrast.mjs tokens-before-a11y.json  → 9 violations          (exit 1)
```

Rollback available: `tools/design-tokens.before-a11y.md` (byte-exact pre-change copy).

Measured evidence for the defects is in `contrast-matrix.md`. Rules cited are in
`rules-wcag-2.2.md`.

---

## Summary of overrides

| # | Role | Current | Override | Measured before → after |
|---|---|---|---|---|
| O1 | text muted | `neutral-400` `#9CA3AF` | **new `neutral-500` `#636B78`** | 2.54 → **5.38** (white) |
| O1b | text muted on tint | — | same | 2.31 → **4.89** (neutral-100) |
| O2 | error text on error tint | `red-600` `#DC2626` | **`red-700` `#B91C1C`** | 4.41 → **5.91** (red-50) |
| O2b | error text on stronger tint | — | same | 3.95 → **5.30** (red-100) |
| O3 | success text | `green-600` `#16A34A` | **`green-700` `#15803D`** | 3.30 → **5.02** (white) |
| O3b | success text on tint | — | same | 3.15 → **4.79** (green-50) |
| O4 | control boundary (input **and** secondary button) | `neutral-300` `#D1D5DB` | **`neutral-500` `#636B78`** | 1.47 → **5.38** (white) |
| O5 | opacity semantics | element opacity only | **separate state-layer opacity** | see §6 |
| O6 | focus indicator | unstated | **must contrast against two surfaces** | see §7 |

**Applied: O1, O1b, O2, O2b, O3, O3b, O4** (the colour-role fixes), then **O5** and
**O6** — nothing pending. Application record at the end of this file.

---

## O1 — `neutral-400` must not be a text role

**Rule broken:** WCAG 1.4.3 (text 4.5:1).
**Measured:** 2.54 on white · 2.43 on `neutral-50` · 2.31 on `neutral-100`.
It fails **even the 3:1 large-text threshold**. The token's *stated role* — *"text muted"* —
is invalid on every surface in the system.

**Two-part override:**

1. **Introduce `neutral-500: #636B78`** as the value for the "text muted" role.
   Verified: **5.38** on white · **5.15** on `neutral-50` · **4.89** on `neutral-100`.
2. **Restrict `neutral-400` to non-text use only:** disabled states (WCAG *Incidental*
   exemption) and decoration. It is **never** a text colour, and never a meaningful
   icon colour either — 2.54 also fails 1.4.11's 3:1 for non-text content.

**Why `#636B78` and not `#6B7280`:** `#6B7280` was the first candidate and it **failed** —
4.39:1 on `neutral-100`, missing by 0.11. Measured alternatives:

| Candidate | white | neutral-50 | neutral-100 |
|---|---|---|---|
| `#6B7280` | 4.83 | 4.63 | **4.39 ✗** |
| `#667085` | 4.97 | 4.76 | 4.52 ✓ (thin) |
| **`#636B78`** | **5.38** | **5.15** | **4.89 ✓** |
| `#4B5563` (= existing `neutral-600`) | 7.56 | 7.23 | 6.87 ✓ |

**Design cost, stated honestly:** muted text becomes visibly darker. The 4.89 margin on
`neutral-100` is deliberate headroom — a value with 4.52 scrapes through and breaks the
next time a surface shifts by a shade. If the muted/secondary distinction now looks too
subtle, the correct fix is to **lighten the surface**, not to lighten the text.

---

## O2 — Error text must move to `red-700` on error tints

**Rule broken:** WCAG 1.4.3. `red-600` passes on white (4.83) but fails once the error
state supplies its own tinted background.

| Surface | `red-600` | `red-700` |
|---|---|---|
| white | 4.83 ✓ | **6.47** ✓ |
| red-50 | **4.41 ✗** | **5.91** ✓ |
| red-100 | **3.95 ✗** | **5.30** ✓ |

**Override:** error/supporting text uses `red-700`. `red-600` remains valid for
**borders and icons** (3:1 satisfied on white) and for **large** error headings.

**The underlying defect worth naming:** the system gets *less readable* as it signals the
error *more strongly*. Any future "error tint" must be measured against the error text
before it ships — the pattern of darkening a background while keeping the foreground
fixed is what produced this.

---

## O3 — Success text must move to `green-700`

**Rule broken:** WCAG 1.4.3.

| Surface | `green-600` | `green-700` |
|---|---|---|
| white | **3.30 ✗** | **5.02** ✓ |
| green-50 | **3.15 ✗** | **4.79** ✓ |

**Override:** success **text** uses `green-700`. `green-600` remains valid as an
**icon or border** colour and for **large** success text.

Note the asymmetry: `green-700` currently appears in `design-tokens.md` labelled only as
*"hover"*. It is being promoted from a hover state to the **base text** colour, with
`green-600` demoted to hover/border duty. That inverts the current roles, so the label
text in `design-tokens.md` is wrong in both directions and needs rewriting by its owner.

`green-800` (`#166534`) was also verified at **6.81** on `green-50` and is recorded as a
fallback if a darker success tone is ever wanted.

---

## O4 — Input boundaries must reach 3:1

**Rule broken:** WCAG 1.4.11 (non-text contrast 3:1).

`neutral-300: #D1D5DB` on white = **1.47:1**. The exemption does **not** apply here:
the border is the only thing identifying the input.

**Override:** control boundaries use `neutral-500` (`#636B78`) → **5.38** on white,
**5.15** on `neutral-50`. This covers **two** roles that share the failing value:

| Role | Current | Ratio | Verdict |
|---|---|---|---|
| Input default border | `neutral-300` | 1.47 | FAIL |
| Secondary / outline button border | `neutral-300` | 1.47 | FAIL |

The button case is the quieter of the two: the outline button's **label** passes at
7.56:1, so the control reads as accessible while the shape that identifies it as a button
does not. An audit that checks text and not boundaries will pass it.

**Scope — read this before over-applying it:**

| Role | Value | Subject to 1.4.11? |
|---|---|---|
| Input / control boundary | `neutral-500` | **Yes** — required |
| Secondary / outline button boundary | `neutral-500` | **Yes** — required |
| Card and section dividers | `neutral-200` / `neutral-300` | **No** — decoration |
| Table row separators | `neutral-200` | **No** — decoration |
| Disabled control boundary | `neutral-300` | No — inactivity exemption |

Overshooting this is a real risk of accessibility work: darkening every hairline to 5:1
would flatten the visual hierarchy of the entire system to fix **one** role.

---

## O5 — Opacity: two different mechanisms share one token name

`design-tokens.md` publishes opacity as **element** opacity:

```
0.4 disabled · 0.5 disabled secondary · 0.6 muted · 0.8 hover overlays
```

M3 (`INDEPENDENT`, verbatim) publishes **state-layer** opacity — a translucent layer
painted over a component while it is in a state:

```
Enabled 0% · Hover 8% · Focused 12% · Pressed 12% · Dragged 12% · Disabled 38%
```

These are not the same concept and cannot share values. Your hover overlay is **80%**;
M3's hover state layer is **8%** — off by an order of magnitude.

**Override:** split the tokens.

| Token | Meaning | Value guidance |
|---|---|---|
| `element-opacity-*` | element drawn at reduced opacity (disabling, de-emphasis) | keep `0.4` for disabled |
| `state-layer-*` | overlay painted on a component in a state | adopt M3: hover `0.08`, focus `0.12`, pressed `0.12`, disabled `0.38` |

**Rationale for adopting M3's numbers rather than inventing:** they are `INDEPENDENT`,
verbatim, and come with the requirement *"States have two visual indicators to ensure
accessibility"* — which your base does not state. **Constraint this creates:** your 0.4
disabled element opacity and M3's 0.38 disabled state layer must not be applied together,
or disabled elements will fail by double-dimming. Pick one mechanism per component.

`0.6 muted` should be **replaced by a colour token** (O1), not an opacity — opacity over an
unknown background produces an unknown ratio and cannot be checked by the gate.

---

## O6 — Focus indicators need a two-surface rule

Not a value change; a **missing rule**. A focus ring sits between the control and the
surface behind it, so it must contrast with **both**.

**Override (new rule):** every focus indicator declares its contrast against
(a) the control background and (b) the adjacent surface, and both must reach 3:1
(1.4.11). A ring that shares a colour with either is invisible.

Verified current candidates on the two existing surfaces:

| Ring | vs white | vs `neutral-100` |
|---|---|---|
| `accent-600` | 6.29 ✓ | 5.71 ✓ |
| legacy `#0A5CFF` | 5.27 ✓ | **4.79 ✓** (measured 2026-09-25; pair `focus-ring-vs-surface-legacy-neutral-100` added to the gate) |

**Consequence for a known conflict:** `universal-vs-platform.md` logs `input.md` using
`#0A5CFF` where other base files use `accent-600`. **Both pass accessibility.** The conflict
is a consistency defect, not a compliance one — and it should be resolved by choosing one,
not by treating both as risky.

Also bind `rules-wcag-2.2.md` §1.4 (SC 2.4.11): overlays, sticky headers and toasts can
obscure a focused element *entirely*, which is a different failure from a low-contrast ring.
Your system has all three layers and currently states no rule for it.

---

## Before → after, measured

| Pair | Before | After | Delta |
|---|---|---|---|
| muted text on white | 2.54 ✗ | **5.38** ✓ | +2.84 |
| muted text on neutral-50 | 2.43 ✗ | **5.15** ✓ | +2.72 |
| muted text on neutral-100 | 2.31 ✗ | **4.89** ✓ | +2.58 |
| error text on red-50 | 4.41 ✗ | **5.91** ✓ | +1.50 |
| error text on red-100 | 3.95 ✗ | **5.30** ✓ | +1.35 |
| success text on white | 3.30 ✗ | **5.02** ✓ | +1.72 |
| success text on green-50 | 3.15 ✗ | **4.79** ✓ | +1.64 |
| input boundary | 1.47 ✗ | **5.38** ✓ | +3.91 |
| secondary button boundary | 1.47 ✗ | **5.38** ✓ | +3.91 |
| **gate result** | **9 failures, exit 1** | **12/12 pass, exit 0** | — |

---

## Unchanged — deliberately

| Token | Why it is left alone |
|---|---|
| `neutral-900`, `neutral-600`, `neutral-700` | 17.74 / 7.56 / 10.31 — comfortably compliant |
| `accent-600`, `accent-700`, `accent-800` | 6.29 / 7.90 / 9.93 with white labels; 5.62 as accent text on tint |
| `white` on `accent-600` | 6.29 — primary button is compliant as built |
| `red-600` on white | 4.83 — passes; restricting it further would be over-correction |
| `neutral-200` / `neutral-300` as dividers | exempt; darkening them would flatten hierarchy (see O4) |
| The whole type scale, spacing scale, radii, shadows | out of scope for this file |

---

## How these were applied

Option 1 was taken: the base owner authorized a direct edit, so there is one source of truth
and every consumer of `design-tokens.md` inherits correct values without reading this file.

Every change made to the base — and there were no others:

| Line | Before | After |
|---|---|---|
| `neutral-400` role | "text muted" | "disabled + decorative ONLY — 2.54:1, never a text colour" |
| `neutral-300` role | "border default" | "divider / decorative border ONLY — never a control boundary" |
| **new** `neutral-500` | — | `#636B78` — "text muted; and control boundaries — inputs, secondary buttons" |
| `red-600` role | "text, border" | "border, icon, large text ONLY" |
| `red-700` role | "hover" | "error text — required on red-50 and red-100" |
| `green-600` role | "text, border" | "border, icon, large text ONLY" |
| `green-700` role | "hover" | "success text for 12–14px messages" |

Verified afterwards: `node check-contrast.mjs` → **exit 0** (23 pass, 0 fail, 4 exempt).

### O5 and O6 — applied 2026-09-25 (same owner authorization)

| # | Base change | File |
|---|---|---|
| O5 | Opacity block split into **element opacity** (`0.4`, `0.5`) and **state-layer opacity** (hover `0.08`, focus `0.12`, pressed `0.12`, disabled `0.38` — verbatim M3 values), with the double-dimming constraint stated | `design-tokens.md` |
| O5 | `0.6 → Muted elements` removed — de-emphasis is now the `neutral-500` colour role, never an opacity | `design-tokens.md` |
| O5 | The remaining `0.6` uses in the base annotated as loading/busy element opacity, not mute (they were the only consumers; `0.8` had none) | `interaction-motion-patterns.md` |
| O6 | New **Focus Indicators** section: two-surface rule (3:1 vs control background AND adjacent surface) with the measured table, plus focus-not-obscured (WCAG 2.4.11) binding sticky headers/footers, overlays and toasts | `design-tokens.md` |
| O6 | Two-surface + not-obscured rules bound at the point of use: the focus-state specs, and the z-index layer list that owns the obscuring layers | `interaction-motion-patterns.md`, `layout-patterns.md` |

Verification: the legacy ring's second surface — listed as *"not yet declared"* in §6 —
was measured **4.79:1** vs `neutral-100` (pass); the pair
`focus-ring-vs-surface-legacy-neutral-100` was added to `tools/tokens.json` so the gate now
enforces it. Gate: **28 pairs — 24 pass, 0 fail, 4 exempt, exit 0.** Measured values in
`contrast-matrix.md`; the authorization is recorded in `provenance-ledger.md`.

---

**Fallback clause:** if a colour role is needed that is not listed here, measure it with the
gate first. Do not assume a colour is accessible because a similar one is, and do not apply
a value from this table to a role it was not measured against.
