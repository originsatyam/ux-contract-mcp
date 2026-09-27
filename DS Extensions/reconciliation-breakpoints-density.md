# Reconciliation — Breakpoints, Spacing, Density, Motion, Modals

Where independent sources disagree, this file states a **winner**, names the **loser**,
and gives the **reasoning**. Nothing here is averaged. Averages are how standards rot.

**Date:** 2026-09-25 · Sources: see `provenance-ledger.md` §4. All quotes verbatim.

---

## 1. Resolution method (fixed, applied to every conflict below)

1. **Convergence wins.** A value two or more `INDEPENDENT` sources state is universal.
2. **Singleton loses.** A value only one source states — including yours — is a brand
   or platform variable, not a standard, however widely assumed.
3. **Normative force breaks ties.** An explicit prohibition ("must not", "maximum",
   "never") outranks a capacity statement ("up to", "can include").
4. **`USER-DERIVED` sources are excluded entirely.** They cannot break a tie.
5. **No winner ⇒ say so.** Where sources genuinely diverge and none is authoritative,
   the dimension is declared **brand-variable** and left unresolved rather than fudged.

---

## 2. Breakpoints

### The three positions

| Boundary | Yours (`USER-DERIVED`) | Uber Base (`INDEPENDENT`, Figma structure) | M3 (`INDEPENDENT`, written) |
|---|---|---|---|
| Small → Medium | **640 px** | **600 px** | **under 600dp / 600dp+** |
| Medium → Large | **1024 px** | 1136 px | 840dp |
| Further tiers | none | none | 1200dp, 1600dp |
| Tier count | 3 | 3 | 5 |

### Resolution: Small → Medium = 600

**Winner: 600.** Uber Base's layout frames place the boundary at 600; M3's written
breakpoint guidance states "Under 600dp / 600–839dp". Two independent sources converge
on 600. Your 640 appears in neither, and matches Tailwind's default `sm` breakpoint —
a framework convention, not a design-system consensus.

**Loser: 640.** No independent support found in this corpus.

*Blast radius if adopted:* your `layout-patterns.md` stacks two-column layouts "below
768px" and three-column at "768px / 640px". Those are **interior** thresholds, not tier
boundaries, and are unaffected by this change. Only the 640 tier boundary moves.

### Resolution: Medium → Large = **brand-variable, declared unresolved**

840 (M3) · 1024 (yours) · 1136 (Uber Base) — **three sources, three values, no
convergence.** No winner is declared. Per method rule 5, this is recorded as
brand-variable.

**What is nevertheless adopted:** M3's **five-tier model as the universal superset**,
because it is the only fully published ladder in the corpus and a superset can host the
others. Tier *names* (`compact / medium / expanded / large / extra-large`) are adopted as
universal vocabulary; tier *boundaries* stay project-configurable.

| Adopted tier name | Universal meaning | Boundary |
|---|---|---|
| compact | phone, single column | < 600 |
| medium | tablet portrait | 600+ → *brand-variable upper bound* |
| expanded | tablet landscape / small desktop | *brand-variable* |
| large | desktop | *brand-variable* |
| extra-large | wide desktop | *brand-variable* |

**Loser: 1024 as a *universal* boundary.** It survives as your project's chosen
medium→expanded boundary, which is legitimate — it is simply not universal.

### Ripple: `mobile-touch-patterns.md`

Its 44px hit-area override was scoped to "touch devices only" with no width condition.
With tier names adopted, the scope becomes **`compact` and `medium` tiers**, which is
testable rather than inferred.

---

## 3. Spacing foundation — the 8px claim is withdrawn

### The three positions

| System | Stated foundation (verbatim) | Label |
|---|---|---|
| Yours | *"Base unit: 8px"* — *"Values (use only these): 4, 8, 16, 24, 32, 40, 48"* | `USER-DERIVED` |
| Uber Base | *"Baseline grid: Use multiples of **4** when defining measurements, spacing, and positioning elements."* + *"incremental spacing scale with a root of **4** based on a modular scale with a major second ratio (**1.125**)"* | `INDEPENDENT` |
| M3 | 18 named tokens, `Space 0 … Space 900`, irregular (no 350, no 850) | `INDEPENDENT` |

### Resolution: baseline becomes **4px**; the 8px "law" is withdrawn

**Winner: 4px baseline.** Reasoning, in order of weight:

1. **Backward compatible.** Every value in your current set (4, 8, 16, 24, 32, 40, 48)
   is already a multiple of 4. Adopting a 4px baseline **changes no existing token**.
2. **It removes a real defect.** Your Large-layout neighbour, Uber Base, uses a 36px
   gutter. 8 × 4.5 = 36 — illegal under 8px, legal under 4px. Your system could not
   express a value a shipped system uses.
3. **It is what the evidence says.** The only explicit written baseline rule in the
   corpus says 4.
4. **False precision costs more than it saves.** "Use only these 7 values" forces a
   generator to either violate the rule or distort the design; that is a direct cause
   of the correction-loop problem this project exists to solve.

**Loser: "Base unit: 8px" stated as a universal law.** 8px survives as a **preferred
rhythm** (most spacing will still land on multiples of 8), not as a constraint.

### Resolution: the closed set of 7 is replaced by a tiered scale

| Tier | Values | Use |
|---|---|---|
| Micro | 1, 2, 4 | icons, hairline offsets, optical correction |
| Core | 8, 12, 16, 24 | component internals (unchanged from your set) |
| Layout | 32, 40, 48, 64 | section and page rhythm |
| Grid | 16, 24, 36 | gutters only, per density |

All values are multiples of 4. Your existing 7 all survive; the additions are 12 (needed
for 36/2 symmetry and Base's modular scale), 64 (Uber margin), and 36 (Uber gutter).

### Resolution: separate token NAME from token VALUE

M3 names tokens (`Space 200`); Uber Base stamps references (`Signed by Base`);
your system encodes px into the token itself (`24px → 3 units`).

**Adopt name/value indirection.** This is the change that makes the system
*universally reusable* rather than reusable-by-editing-every-file, and it is the
precondition for the Layer-3 project override in `universal-vs-platform.md`.

```
space-compact-md: 16px      ← name is stable across projects
space-core-lg:    24px      ← value is a project variable
```

**Loser: px-in-name.** Reasons: it blocks per-project theming, it makes a scale change a
corpus-wide rewrite, and it is the one thing all three systems agree is wrong — none of
them put raw values in token names.

---

## 4. Modal action ceiling — Apple vs M3

### The two positions

| Source | Rule (verbatim) | Normative force |
|---|---|---|
| Apple HIG, `alerts` (A5) | *"alerts display a title, optional informative text, and **up to three buttons**."* | **Capacity statement** — appears in an anatomy section describing layout |
| M3, dialogs guidelines (R4–R6) | *"Dialogs should contain a **maximum of two actions**."* + *"If a single action is provided, it must be an acknowledgement action."* + *"If two actions are provided, one must be a confirming action, and the other a dismissing action."* | **Explicit ceiling plus a pairing law** |
| Uber Base, `Sheet` | header *"can include a title, a description, two buttons"* | `UNVERIFIED` — search-index snippet, not fetched page body. **Weighted at zero.** |

### Resolution: universal maximum = 2 actions

**Winner: 2.** By method rule 3, M3's explicit maximum with a required pairing
(one confirming + one dismissing) carries more normative force than Apple's "up to
three", which describes how many the system *can* render rather than how many a designer
*should* use.

**Loser: 3 as the universal default.** Apple's three-button layout remains a **declared
platform delta** for iOS alerts specifically — the `3 Stacked` component exists and its
use is legitimate. It must be tagged, not assumed.

**Consequence for the earlier `modal-dialog-patterns.md`:** it adopted Apple's 3-button
matrix as the general rule and did not record the conflict. That was an unrecorded
editorial choice. The retrofitted copy declares it as an override with a scope statement.

### Derived decision table (replaces prose preference)

| Situation | Pattern | Actions |
|---|---|---|
| Informational only | **no dialog** — M3 R1 / Apple A2: "Avoid using an alert merely to provide information" | 0 |
| Acknowledge a fact | basic dialog | 1, acknowledgement only |
| Confirm or reject an action | basic dialog | 2 — one confirming, one dismissing |
| Choose among related actions | action sheet / bottom sheet | 1..n, Cancel last (Apple AS5) |
| Multi-step task, or needs keyboard input | full-screen dialog (**compact only**, M3 R2/R3) | per step |
| Destructive action | basic dialog, destructive style on the destructive button only (Apple A15) | 2, Cancel required (A16) |
| Needs a third action in a dialog | **the pattern is wrong** — escalate to an action sheet | — |

---

## 5. Density — adopt as a first-class axis

Uber Base ships `Layout / Normal` and `Layout / Compact` (`OBSERVED`). No other source in
the corpus expresses density. Under method rule 2 this is a **singleton**, so it cannot
be called universal — but it is adopted anyway, for a different reason: it closes a
**capability gap** rather than resolving a conflict. Your base has one spacing scale and
therefore cannot express a compact table view at all.

| Adopted | Normal | Compact |
|---|---|---|
| Tier boundaries | unchanged | unchanged |
| Margin (medium/large) | 36 / 64 | 24 / 24 |
| Gutter | 36 | 16 |

**Rule encoded:** density changes **margins and gutters only**. It never changes tier
boundaries, column counts, or the spacing scale itself.

---

## 6. Motion durations and easing

| Duration | Yours (`USER-DERIVED`) | Uber Base (`INDEPENDENT`, verbatim) |
|---|---|---|
| 150 ms | yes | absent |
| 200 ms | yes | yes |
| 300 ms | yes | absent |
| 400 ms | yes | yes |
| 500 ms | absent | yes |

**Convergence: 200 and 400** → universal conforming values.
**Singletons: 150, 300 (yours) and 500 (Uber)** → neither is universal.

### Resolution: keep 150, add 500, demote 300

| Band | Value | Status | Scope |
|---|---|---|---|
| instant | 100 ms | yours | feedback that must feel immediate (state change on press) |
| fast | 150 ms | **yours, kept** | micro-feedback; Uber's absence is not a prohibition |
| base | 200 ms | **universal** | small transitions, state changes |
| moderate | 300 ms | **yours, demoted** | not universal; keep only for medium surfaces |
| slow | 400 ms | **universal** | panels, larger surfaces |
| large | **500 ms** | **added** | full-surface and overlay transitions (Uber's M1/M2) |

**Easing:** Uber names five curves with explicit `cubic-bezier` values. Your system uses
one shared easing. Adopt Uber's set as an **optional vocabulary** for large transitions,
and keep your single curve as the default. Reasoning: a single curve is a defensible
simplification and is *not* contradicted by any source; Uber's set is additive.

---

## 7. State model

| System | States defined | Label |
|---|---|---|
| M3 (`INDEPENDENT`) | 6: enabled, disabled, hover, focused, pressed, dragged | verbatim |
| ext `universal-vs-platform.md` | 8: default, hover, focus-visible, active, disabled, loading, error, read-only | `USER-DERIVED` |

**No conflict exists** — these are different scopes. M3's six cover *interaction* states;
the eight add *data* states (loading, error, read-only). Adopted as:

- **Interaction core (universal):** default · hover · focus-visible · active/pressed ·
  disabled — with M3's state-layer opacities (`token-overrides-a11y.md` §4).
- **Added by extension (`USER-DERIVED`, tagged in the file):** loading · error · read-only.
- `hover` remains **not applicable** on touch-only surfaces, as the extension already states.

---

## 8. Summary of verdicts

| # | Dimension | Winner | Loser | Basis |
|---|---|---|---|---|
| 1 | Small→Medium boundary | **600** | 640 | Two-source convergence (Uber, M3) |
| 2 | Medium→Large boundary | *brand-variable* | — | Three sources, three values, no convergence |
| 3 | Tier count / names | **5-tier names from M3** | 3-tier | M3 is the only published full ladder |
| 4 | Spacing baseline | **4px** | 8px as law | Backward compatible + explicit written rule |
| 5 | Spacing scale | **tiered, open** | closed set of 7 | Closed sets cause violations; two sources use larger scales |
| 6 | Token naming | **name/value indirection** | px-in-name | All three systems separate name from value |
| 7 | Modal action ceiling | **2** | 3 as default | Normative force (M3 maximum vs Apple capacity) |
| 8 | Density | **first-class axis** | absent | Closes a capability gap; scope-limited to margin/gutter |
| 9 | Motion | 200/400 universal; **150 kept, 500 added** | 300 as universal | Two-source convergence on 200/400 |
| 10 | State model | 5 interaction (M3) + 3 data (ext) | 8-as-universal | Different scopes, not competitors |

### What this file deliberately does NOT do

- It does not average conflicting values.
- It does not declare 1024, 1136 or 840 the winner — that would be invention.
- It does not treat Uber's density axis as universal; it adopts it as a gap fix.
- It does not modify `Design System/`. Every change above lands as an
  `[overrides base]` declaration in this folder.

---

**Fallback clause:** if a dimension is not listed in §8, no resolution exists. Use the
base system's value and mark the divergence `UNRESOLVED` in `provenance-ledger.md`.
Do not pick a winner without two independent sources or an explicit normative rule.
