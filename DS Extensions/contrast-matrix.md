# Contrast Matrix — computed, not asserted

Every ratio below is **calculated by a script**, not estimated. Reproduce with:

```bash
cd "DS Extensions/tools"
node check-contrast.mjs                          # current tokens      -> exits 0
node check-contrast.mjs tokens-before-a11y.json  # pre-fix tokens      -> exits 1
```

**BEFORE the fix** (`tokens-before-a11y.json`): `25 pairs — 13 pass, 9 fail, 3 exempt` → **exit 1**
**AFTER the fix** (current `design-tokens.md`): `28 pairs — 24 pass, 0 fail, 4 exempt` → **exit 0**
The 28th pair, `focus-ring-vs-surface-legacy-neutral-100` (**4.79:1**), was added with the O6
application so the legacy ring's second surface is declared and gate-enforced.

## Status: APPLIED

Corrections were applied to `Design System/design-tokens.md` on **2026-09-25** with explicit
owner authorization. Earlier revisions of this file stated the base was strictly read-only;
that constraint was lifted **for this one file and only for the colour-role values in §3**.
Line endings, spacing, typography, radii and shadows were left untouched. A second
authorized edit the same date applied O5/O6: the opacity block in `design-tokens.md` was
rewritten (element opacity separated from M3 state-layer opacity; mute moved to a colour)
and focus rules were added to `design-tokens.md`, `interaction-motion-patterns.md` and
`layout-patterns.md`.

| Artefact | Purpose |
|---|---|
| `tools/design-tokens.before-a11y.md` | Pre-change file, byte-exact — rollback |
| `tools/tokens-before-a11y.json` | Pre-change token set — reproduces all 9 violations |
| `tools/tokens.json` | Current token set — exits 0 |

This is the point of the gate: **the failure is now a permanent regression test, not a memory.**

Generated: 2026-09-25 · Thresholds: WCAG 2.2 `1.4.3` (text 4.5:1, large 3:1) and `1.4.11` (UI 3:1).
Source values transcribed from `Design System/design-tokens.md`, `input.md`, `button.md`,
`feedback-patterns.md`. The base was read-only when this matrix was first generated; the §3
colour-role corrections were afterwards applied **with explicit owner authorization** — the
one sanctioned exception, recorded in `provenance-ledger.md`. No other base file was touched.

---

## 1. Headline

The token layer **shipped with 9 non-exempt AA violations**. All nine are now fixed and verified.

This is more than a manual review found. A hand audit identified 3; systematic computation
found 9. The extra six are the muted-text/background combinations, the stronger error tint,
and the secondary button border — exactly the pairs a person does not think to check by hand.
That gap is the argument for a gate rather than a review.

| Severity | Count | What |
|---|---|---|
| Hard failure (text unreadable at AA) | 7 | 3 muted-text surfaces, 2 error-tint surfaces, 2 success surfaces |
| Hard failure (UI boundary) | 2 | input default border and secondary button border, both 1.47:1 |
| Legitimate exemptions | 3 | disabled label, decorative hairline, surface tint |

---

## 2. Full matrix — BEFORE the fix

Reproduce this exact table with `node check-contrast.mjs tokens-before-a11y.json`.
It is retained deliberately: a standard with no record of what it fixed cannot prove progress.

| Pair | Ratio | Need | Kind | Verdict |
|---|---|---|---|---|
| `text-primary` (neutral-900 on white) | **17.74** | 4.5 | text | PASS |
| `text-secondary` (neutral-600 on white) | **7.56** | 4.5 | text | PASS |
| `text-muted-on-white` (neutral-400 on white) | **2.54** | 4.5 | text | **FAIL** |
| `text-muted-on-neutral-50` | **2.43** | 4.5 | text | **FAIL** |
| `text-muted-on-neutral-100` | **2.31** | 4.5 | text | **FAIL** |
| `accent-text-on-white` (accent-600) | **6.29** | 4.5 | text | PASS |
| `accent-text-on-accent-50` | **5.62** | 4.5 | text | PASS |
| `accent-text-hover-on-accent-50` (accent-700) | **7.07** | 4.5 | text | PASS |
| `button-primary-label` (white on accent-600) | **6.29** | 4.5 | text | PASS |
| `button-primary-label-hover` (white on accent-700) | **7.90** | 4.5 | text | PASS |
| `button-primary-label-active` (white on accent-800) | **9.93** | 4.5 | text | PASS |
| `error-text-on-white` (red-600) | **4.83** | 4.5 | text | PASS |
| `error-text-on-red-50` | **4.41** | 4.5 | text | **FAIL** — misses by 0.09 |
| `error-text-on-red-100` | **3.95** | 4.5 | text | **FAIL** |
| `success-text-on-white` (green-600) | **3.30** | 4.5 | text | **FAIL** |
| `success-text-on-green-50` | **3.15** | 4.5 | text | **FAIL** |
| `success-text-hover-on-green-50` (green-700) | **4.79** | 4.5 | text | PASS |
| `input-border-default` (neutral-300 on white) | **1.47** | 3.0 | ui | **FAIL** |
| `secondary-button-border` (neutral-300 on white) | **1.47** | 3.0 | ui | **FAIL** |
| `input-focus-border-accent` (accent-600) | **6.29** | 3.0 | ui | PASS |
| `input-focus-border-legacy` (#0A5CFF) | **5.27** | 3.0 | ui | PASS |
| `focus-ring-vs-surface-neutral-100` | **5.71** | 3.0 | ui | PASS |
| `disabled-label-40pct` (neutral-400 @ 0.4 → #D7DADF) | 1.40 | 4.5 | text | FAIL **(exempt)** |
| `border-subtle-hairline` (neutral-200) | 1.24 | 3.0 | ui | FAIL **(exempt)** |
| `bg-subtle-vs-page` (neutral-50 on white) | 1.05 | 3.0 | ui | FAIL **(exempt)** |

---

## 2b. AFTER the fix — the nine former failures

| Pair | Before | After |
|---|---|---|
| `text-muted-on-white` | 2.54 ✗ | **5.38** ✓ |
| `text-muted-on-neutral-50` | 2.43 ✗ | **5.15** ✓ |
| `text-muted-on-neutral-100` | 2.31 ✗ | **4.89** ✓ |
| `error-text-on-red-50` | 4.41 ✗ | **5.91** ✓ |
| `error-text-on-red-100` | 3.95 ✗ | **5.30** ✓ |
| `success-text-on-white` | 3.30 ✗ | **5.02** ✓ |
| `success-text-on-green-50` | 3.15 ✗ | **4.79** ✓ |
| `input-border-default` | 1.47 ✗ | **5.38** ✓ |
| `secondary-button-border` | 1.47 ✗ | **5.38** ✓ |

Two additional checks were added in the applied set, confirming the **restricted** roles are
still legitimate rather than merely banned:

| Pair | Kind | Ratio | Meaning |
|---|---|---|---|
| `error-accent-on-white-large` (`red-600`) | large text | 4.83 ✓ | `red-600` still valid for large text / non-text |
| `success-accent-on-white-large` (`green-600`) | large text | 3.30 ✓ | `green-600` still valid as border, icon, large text |
| `divider-neutral-300` | exempt | 1.47 | `neutral-300` still valid as a divider |
| `disabled-label-40pct` | exempt | 1.40 | `neutral-400` still valid when disabled |

The system did not lose five tokens. It **narrowed each to the role it can actually serve** —
which is the difference between an accessible system and a blander one.

## 3. The failures, in plain language

### 3.1 `neutral-400` is labelled "text muted" and cannot be used as text

`design-tokens.md` assigns `neutral-400: #9CA3AF` the role *"text muted"*. Measured:

| Surface | Ratio | AA text (4.5) | AA large (3.0) |
|---|---|---|---|
| white | 2.54 | fail | **fail** |
| neutral-50 | 2.43 | fail | **fail** |
| neutral-100 | 2.31 | fail | **fail** |

It fails **even the large-text threshold**, on every surface in the system. This is not a
marginal case — it is a token whose *stated role* is invalid at every size.

**This is a role defect, not a value defect.** `#9CA3AF` is a legitimate tone; the error is
declaring it usable for text. Two valid resolutions, and only one is cheap:
(a) reassign the role to a compliant value, or (b) restrict `neutral-400` to decorative and
disabled use and never as text. `token-overrides-a11y.md` takes (a) and permits (b) as a
secondary constraint.

### 3.2 Error text on its own error background misses AA

| Surface | Ratio | Verdict |
|---|---|---|
| white | 4.83 | pass |
| red-50 | **4.41** | fail by 0.09 |
| red-100 | **3.95** | fail by 0.55 |

`red-600` is compliant on white. It becomes non-compliant the moment the field or banner
gives the error an *error-tinted background* — which is the standard way error states are
presented, and therefore one of the highest-traffic combinations in the system.

Note the inversion this creates: the *more clearly* an error state is signalled (stronger
tint), the *less readable* the message becomes. `red-100` is 0.55 below the floor.

### 3.3 Success text fails on white and on its own tint

`green-600: #16A34A` is labelled *"text, border"* in `design-tokens.md`.

| Surface | Ratio | Verdict |
|---|---|---|
| white | **3.30** | fails AA text; passes only as large text or as a non-text boundary |
| green-50 | **3.15** | fails AA text |

So `green-600` is valid as an **icon or border colour** (3:1) and as **large text** (3:1),
but not for 12–14px success messages — which is what the 12px "helper/caption" tier in
`design-tokens.md` is for.

### 3.4 `neutral-300` fails as a control boundary — in two roles, not one

`neutral-300: #D1D5DB` on white = **1.47:1**. WCAG 1.4.11 requires 3:1 where the border is
the only thing identifying the control. This value is used as a boundary in **two** places:

| Role | Ratio | Verdict |
|---|---|---|
| Input default border | 1.47 | FAIL |
| Secondary / outline button border | 1.47 | FAIL |

This is the failure most likely to be dismissed as pedantry, so the scope is stated
precisely: it applies **because `neutral-300` is the control's boundary**. The same value
used as a decorative divider is legitimate, and `border-subtle-hairline` (`neutral-200`,
1.24:1) is exempt for that reason.

It is also the failure most easily missed, because an outline button "looks" fine — its
label passes (7.56:1 on white) while the shape that makes it a button does not.

### 3.5 Focus indicators must be checked against two surfaces

A focus ring is seen against **both** the control it surrounds and the surface behind it.
A ring sharing a colour with either is invisible. `accent-600` on white measures 6.29
(pass) and on `neutral-100` measures 5.71 (pass) — so the accent ring is safe on both
current surfaces. If the surface palette gains a dark tint, this pair must be re-run:
the script measures both neighbours only if both pairs are declared.

The legacy `#0A5CFF` from `input.md` measures 5.27 on white and also passes. Measured
against `neutral-100` it is **4.79:1** — the second surface was declared 2026-09-25 with the
O6 application, so both candidates now satisfy the two-surface rule on both surfaces.
**Both candidates are accessible** — so the `#0A5CFF` vs `accent-600` conflict logged in
`universal-vs-platform.md` is a *consistency* problem, not an accessibility one. Worth
stating plainly, because it is easy to assume a stray hex is also a compliance risk.

---

## 4. The three legitimate exemptions

Exemptions are declared in `tools/tokens.json` and must carry a written reason. An
exemption without a reason fails the script on purpose.

| Pair | Ratio | Exemption |
|---|---|---|
| `disabled-label-40pct` | 1.40 | WCAG 1.4.3 **Incidental**: *"Text … that is part of an inactive user interface component … [has] no contrast requirement."* |
| `border-subtle-hairline` | 1.24 | Not a component boundary — 1.4.11 governs "visual information required to identify user interface components", not decoration. |
| `bg-subtle-vs-page` | 1.05 | Surface tint indicates separation, not identity. |

**Why the disabled exemption is not a loophole:** it applies only while the control is
actually `disabled`. The O5 application (2026-09-25) removed the old `0.6 → Muted elements`
opacity from `design-tokens.md`: de-emphasis is now the `neutral-500` colour role, and the
remaining `0.6` uses are loading states — a busy but present element whose text is exempt
only if the element is genuinely inactive.

---

## 5. Boundary conditions

- Ratios are computed in sRGB with the WCAG 2.x relative-luminance formula. Opacity is
  composited in sRGB before measuring, matching how browsers rasterise over sRGB content.
  **This is a design-time gate, not a conformance audit** — it does not test rendered
  output, antialiasing, gradients, images of text, or non-opaque backgrounds.
- Only pairs **declared in `tools/tokens.json`** are checked. An undeclared pair is not
  "passing"; it is **untested**. Coverage grows by adding pairs, not by trusting absence.
- The matrix covers colour contrast only. It says nothing about SC 2.5.8 target size,
  2.4.11 focus visibility under overlays, or 1.4.12 text-spacing robustness — those are
  covered as rules in `rules-wcag-2.2.md` and cannot be checked from a token file.
- Font-size-dependent thresholds: the `large` kind (3:1) applies at ≥18.5px or ≥14pt bold
  per W3C's own conversion. No pair in this matrix is currently declared `large`, so every
  text pair is held to 4.5:1 — deliberately conservative.

---

**Fallback clause:** if a colour combination is used that is not in this matrix, it is
unverified. Add it to `tools/tokens.json` and re-run. Do not infer a ratio from a similar row.
