# Universal vs Platform: Extension Layering Contract

You are extending an existing design system without modifying it. This file is the
contract that governs every extension file in `DS Extensions/`. Read it before
writing or consuming any extension file.

## Layer Precedence (binding)

Layer 0 — Evidence: the rules files in this folder (`rules-apple-hig.md`,
`rules-material-3.md`, `rules-uber-base.md`, `rules-wcag-2.2.md`), plus
`provenance-ledger.md` (what each claim rests on) and
`reconciliation-breakpoints-density.md` (where sources disagree, and who wins).
Nothing in Layer 1 or Layer 2 may cite a rule that is not registered here. A rule
with no source URL and fetch date does not exist.

Layer 1 — Base: `design-tokens.md`, `button.md`, `input.md`, `label.md`,
`form-field-group.md`, `validation-logic.md`, `feedback-patterns.md`,
`layout-patterns.md`, `card-patterns.md`, `navigation-patterns.md`,
`data-display-patterns.md`, `interaction-motion-patterns.md`,
`design-psychology-patterns.md`.

Layer 2a — Accessibility overrides: `token-overrides-a11y.md` (+ its evidence in
`contrast-matrix.md`). Declared colour-role corrections, each verified by
`tools/check-contrast.mjs`. These override Layer 1 VALUES within a stated scope.

Layer 2b — Platform deltas: `modal-dialog-patterns.md`, `advanced-form-widgets.md`,
`mobile-touch-patterns.md`. These may EXTEND base behavior or OVERRIDE base
behavior within a declared scope.

Layer 3 — Project tokens-override: per-project brand file that reassigns token
VALUES only. It may never change token names, spacing scale, type scale, state
logic, or behavioral rules.

Rules:
- Never redefine Layer 1 from Layer 2. Layer 2 may add cases, then must defer.
- Never redefine Layers 1–2 from Layer 3. Projects swap values, not logic.
- If two files disagree, the LOWER layer wins unless the higher layer section is
  explicitly tagged `[overrides base]` with a scope statement.
- Every extension section MUST carry exactly one tag: `[extends base: <file>]`
  or `[overrides base: <file>]` with one line of scope.

## Semantic Role Reconciliation

Four vocabularies exist across the corpus. They describe the same roles with
different names. Map, do not merge.

**PROVENANCE WARNING** (see `provenance-ledger.md` §6): the **iOS kit** and **M3 role**
columns below were read from the `DS /` pages inside Figma copies you own, and those
pages mirror your own vocabulary. They are therefore `USER-DERIVED`, not industry
vocabulary, and **may not be cited as external support**. The **Base (Uber)** column is
different — those names came from Uber's own `Light tokens` frame and are `INDEPENDENT`.
For verified M3 vocabulary, use `rules-material-3.md`.

| Canonical role        | Base file name      | iOS kit name (USER-DERIVED) | M3 role (USER-DERIVED) | Base (Uber) role (INDEPENDENT) |
|-----------------------|---------------------|------------------|------------|------------------|
| surface               | (white bg)          | Surface          | surface    | background       |
| surface-subtle        | neutral-50/100 bg   | Surface subtle   | surface-variant | background-subtle |
| text-primary          | neutral-900         | Text             | on-surface | text-primary     |
| text-secondary        | neutral-600         | Text secondary   | on-surface-variant | text-secondary |
| text-disabled         | neutral-400         | (disabled state) | —          | text-disabled    |
| border                | neutral-200/300     | Border           | outline    | border           |
| accent (interactive)  | accent-600          | Accent           | primary    | accent           |
| destructive           | red-600             | Destructive      | error      | negative         |
| positive              | green-600           | (success green)  | —          | positive         |
| warning               | yellow-600 (#F59E0B)| (system yellow)  | —          | warning          |

Rules:
- Extension files reference BASE token names (`accent-600`, `neutral-600`).
  The table above is for translation when reading other systems, not for
  introducing new token names.
- New semantic tokens may only be introduced in Layer 3 (project overrides).

## Canonical State Matrix

Every interactive component in extension files defines exactly these states.
If a state does not apply, the file states "not applicable" — silence is banned.

1. default
2. hover (desktop pointer only; not applicable on touch-only surfaces)
3. focus-visible (keyboard focus; always instant, no transition — per base motion rules)
4. active/pressed
5. disabled
6. loading (async only)
7. error (form-connected components only)
8. read-only (view/edit components only)

## Extension Authoring Standard (anti-hallucination rules)

Every extension file must satisfy all of the following:

1. Closed-world enumerations. Each spec states the complete allowed set
   ("use only these...") followed by an explicit NEVER list. No open-ended
   examples that invite interpolation.
2. Deterministic decision tables. Any choice (overlay type, widget, gesture)
   is an if/then table, never prose preference.
3. Total state coverage. The 8 canonical states, with "not applicable" where
   irrelevant.
4. Fallback clause. Each file ends with: "If a case is not covered here, use
   <named base behavior>. Do not invent a new pattern."
5. Reference, never redeclare. Values are token names (`accent-600`), never
   re-declared hex or px values. `design-tokens.md` remains the only source
   of values.
6. One canonical example per pattern, exactly consistent with the spec.
7. Tables over prose. Compact, high signal density. Context budget is finite;
   bloat degrades compliance.
8. Contradiction ban. Before shipping, each file is checked against the base
   files section by section. If base and extension conflict, the extension
   either defers or declares `[overrides base]` with scope.

## Known Base-Internal Conflicts (logged, NOT resolved here)

The base files contain three internal contradictions discovered during audit.
Base files were read-only during the audit, so they are logged and extension files follow
the stated resolution until the base owner resolves them. **These three remain open** — the
one authorized base edit covered accessibility values only, not these conflicts:

| Conflict | Files | Extension resolution rule |
|---|---|---|
| Input focus border color | input.md says `#0A5CFF`; interaction-motion-patterns.md and validation-logic.md use accent-600 (`#4F46E5`) | Follow accent-600 (majority across base files) |
| Password toggle icon/padding | form-field-group.md says 20px icon / 48px padding; input.md says 16px icon / 44px padding | Follow the component-authority file (input.md): 16px / 44px |
| Card radius | design-tokens.md note says 6px "standard (cards)"; card-patterns.md uses 8px | Follow the component-authority file (card-patterns.md): 8px for cards, 6px for inputs/buttons |

### Accessibility defects in base (measured, not opinion)

These are not conflicts between base files — they are violations of WCAG 2.2 AA
measured in the token layer itself. Full evidence in `contrast-matrix.md`; fixes in
`token-overrides-a11y.md`.

**Nine non-exempt violations were found. All nine are now RESOLVED** — applied to the base
on 2026-09-25 with explicit owner authorization, the single sanctioned exception to the
read-only rule. `node tools/check-contrast.mjs` now exits **0**; `tokens-before-a11y.json`
still exits **1** and reproduces the original nine on demand.

| Defect | Role | Measured | Fix declared |
|---|---|---|---|
| `neutral-400` is labelled "text muted" | text on 3 surfaces | 2.54 / 2.43 / 2.31 | new `neutral-500` `#636B78` |
| `red-600` on error tints | error message | 4.41 / 3.95 | `red-700` |
| `green-600` as text | success message | 3.30 / 3.15 | `green-700` |
| `neutral-300` as control boundary | input **and** secondary button | 1.47 | `neutral-500` |

General principle encoded: when two base files conflict, the component-specific
file wins over the generic token note, and the majority convention wins for
cross-component states. Resolving a *conflict* still happens only by the base owner editing
base files; extensions never quietly "fix" base.

The accessibility corrections were the one sanctioned exception, and the order they followed
is the part worth repeating: **declared as overrides → measured → authorised → applied →
re-verified.** The owner's approval was obtained before the edit, not assumed from it, and
the pre-change file was copied first.

## File register and reading order

| Order | File | What it answers |
|---|---|---|
| 1 | `provenance-ledger.md` | Can I trust this claim, and what was retracted? |
| 2 | `reconciliation-breakpoints-density.md` | Who wins when sources disagree? |
| 3 | `rules-apple-hig.md` · `rules-material-3.md` · `rules-uber-base.md` · `rules-wcag-2.2.md` | What rule, from where, verbatim |
| 4 | `contrast-matrix.md` | Which token pairs fail, measured |
| 5 | `token-overrides-a11y.md` | What the corrected values are, verified |
| 6 | `modal-dialog-patterns.md` · `advanced-form-widgets.md` · `mobile-touch-patterns.md` | The patterns themselves |
| 7 | `test-protocol.md` | Did any of this reduce correction work? |
| — | `tools/` | Re-run everything: `extract.sh`, `check-contrast.mjs` |
