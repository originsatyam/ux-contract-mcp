# Rules — Material 3

**Source:** `https://m3.material.io`
**Extraction route:** Firecrawl rendered scrape (`formats:["query"]`, `onlyMainContent:true`).
Plain HTTP extraction fails — the site returns *"This website requires JavaScript"*
(61 visible characters from 61KB). Wayback fails identically: it archived the SPA shell.
**Fetched:** 2026-09-25 · **Provenance:** `INDEPENDENT`

**Documentation structure (OBSERVED):** every M3 component publishes four layers —
`Overview` · `Specs` · `Guidelines` · `Accessibility`. Rules below are drawn from
`Guidelines` and `Accessibility`, which is where behavioural law lives.

---

## 1. Dialogs — the primary rule set for the modal gap

Source: `https://m3.material.io/components/dialogs/guidelines`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| R1 | Basic dialog: "Use for alerts, quick selection, and confirmation. They appear as interrupts with urgent information, details, or actions." | ext `modal-dialog-patterns` |
| R2 | Full-screen dialog: "Use for content or tasks that require a series of tasks to complete, include components that require keyboard input (like form fields), when changes aren't saved instantly, or when components within the dialog open additional dialogs." | ext `modal-dialog-patterns` |
| R3 | Full-screen dialogs "are for compact breakpoints only (mobile devices)." | ext `modal-dialog-patterns` |
| R4 | **"Dialogs should contain a maximum of two actions."** | ext `modal-dialog-patterns` — **conflicts with Apple A5** |
| R5 | "If a single action is provided, it must be an acknowledgement action." | ext `modal-dialog-patterns` |
| R6 | "If two actions are provided, one must be a confirming action, and the other a dismissing action." | ext `modal-dialog-patterns` |
| R7 | "Dialogs retain focus until dismissed or an action has been taken." | ext `modal-dialog-patterns`, WCAG 2.4.11 |
| R8 | "They shouldn't be obscured by other elements or appear partially on screen, with the exception of full-screen dialogs." | ext `modal-dialog-patterns` |
| R9 | "In full-screen dialogs, the close 'X' icon button should be the only navigation option in the app bar." | ext `modal-dialog-patterns` |

> **Direct conflict with Apple.** M3: **maximum two** actions. Apple (A5): **up to three**
> buttons. Resolution is stated in `reconciliation-breakpoints-density.md` §4. This is
> the single most consequential contradiction in the corpus and the earlier
> `modal-dialog-patterns.md` silently adopted Apple's ceiling without recording it.

---

## 2. Breakpoints

Source: `https://m3.material.io/foundations/layout/breakpoints`

| # | Tier | Range (verbatim) |
|---|---|---|
| BP1 | Compact | "Under 600dp" |
| BP2 | Medium | "600–839dp" |
| BP3 | Expanded | "840–1199dp" |
| BP4 | Large | "1200–1599dp" |
| BP5 | Extra-large | "1600dp+" |

**M3 defines five tiers.** Your `layout-patterns.md` defines three. See
`reconciliation-breakpoints-density.md` §2.

### Expanded-tier grid (from `…/breakpoints/expanded`)

| # | Rule (verbatim) | Value |
|---|---|---|
| BP6 | "Expanded layouts have a leading and trailing margin of 24dp." | margin **24dp** |
| BP7 | "The spacer between panes is 24dp." | gutter **24dp** |

`UNVERIFIED`: column counts and margin/gutter for the compact, medium, large and
extra-large tiers were not extracted. `grids-spacing/overview` states only that
"Grids create a consistent foundation and adapt across breakpoints" and that
"As screen size increases, additional columns allow for a richer layout."

---

## 3. Spacing tokens

Source: `https://m3.material.io/styles/spacing/tokens`

M3 publishes spacing as **named tokens**, not fixed pixel values (verbatim list):

```
Space 0    Space 25   Space 50   Space 75   Space 100  Space 125
Space 150  Space 175  Space 200  Space 250  Space 300  Space 400
Space 450  Space 500  Space 600  Space 700  Space 800  Space 900
```

| # | Finding | Binds to |
|---|---|---|
| SP1 | M3 exposes **18** spacing tokens. | base `design-tokens` — yours exposes **7** |
| SP2 | The scale is **irregular**: no `Space 350`, no `Space 850`. | base `design-tokens` |
| SP3 | `UNVERIFIED`: the dp value behind each token name was not extracted. | — |

Note the naming philosophy: M3 separates *token name* from *token value*. Your
`design-tokens.md` hardcodes px directly into the token (`24px → 3 units`), which is
the architectural difference discussed in `reconciliation-breakpoints-density.md` §3.

---

## 4. Interaction states

Source: `https://m3.material.io/foundations/interaction/states`

State-layer opacity, verbatim:

| State | Opacity |
|---|---|
| Enabled | **0%** |
| Disabled | **38%** |
| Hover | **8%** |
| Focused | **12%** |
| Pressed | **12%** |
| Dragged | **12%** |

| # | Rule (verbatim) | Binds to |
|---|---|---|
| ST1 | "States have two visual indicators to ensure accessibility." | base `interaction-motion-patterns` |
| ST2 | "States can be combined, such as selection and hover." | base `design-psychology-patterns` |
| ST3 | "Apply states consistently across components." | base `interaction-motion-patterns` |
| ST4 | **M3 defines 6 states.** (ext `universal-vs-platform` defines 8 — an authored convention, not industry.) | ext `universal-vs-platform` |

> **Conflict with base.** Your `design-tokens.md` publishes opacity as *element*
> opacity: `0.4 disabled`, `0.5 disabled secondary`, `0.6 muted`, `0.8 hover overlays`.
> M3's values are **state-layer overlay** opacities applied *on top of* a component —
> a different mechanism. Your "0.8 hover overlay" is **80%**; M3's hover layer is **8%**.
> Same word, an order of magnitude apart. See `token-overrides-a11y.md` §4.

---

## 5. Component accessibility pattern (worked example: FAB menu)

Source: `https://m3.material.io/components/fab-menu/accessibility`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| F1 | "FAB menu elements meet the minimum target size of 48dp." | base `button` — see also WCAG 24×24 floor |
| F2 | "When the FAB is selected, the FAB menu opens, and initial focus remains on the close button, which takes the place of the original FAB." | ext `modal-dialog-patterns` focus rules |
| F3 | "Then the focus moves from the top menu item to the bottom." | ext `modal-dialog-patterns` |
| F4 | Keyboard: **Tab** — "Navigate to the next interactive element"; **Space** or **Enter** — "Activate the focused button or item". | base `interaction-motion-patterns` |
| F5 | Close button labelling: "Label: Toggle menu", "Role: Button", "State: Expanded or collapsed". | base `button` |
| F6 | Menu item labelling: "Label: Match the item's UI text", "Role: Button". | base `button` |
| F7 | "Don't obstruct the close button in short screens like horizontal orientation." | ext `modal-dialog-patterns` |

**Pattern worth copying into the base system:** M3 specifies accessibility as
**Label / Role / State** triples. That is a machine-checkable format — a generator
either produced all three or it did not. Your base files specify `aria-label` in prose
without the role/state pair.

---

## 6. Component taxonomy (OBSERVED, for gap analysis only)

M3's published component set, captured 2026-09-25:

App bars · Badges · Buttons (All buttons, Button groups, Buttons, Extended FABs,
FAB menu, FABs, Icon buttons, Segmented buttons, Split button) · Cards · Carousel ·
Checkbox · Chips · Date pickers · Time pickers · Dialogs · Divider · Lists ·
Loading indicator · Progress indicators · Menus · Navigation bar · Navigation drawer ·
Navigation rail · Radio button · Search · Bottom sheets · Side sheets · Sliders ·
Snackbar · Switch · Tabs · Text fields · Toolbars · Tooltips

| # | Note |
|---|---|
| TX1 | M3 separates **Bottom sheets** from **Side sheets**, and both have standard vs modal variants. Your base has no sheet concept. |
| TX2 | M3 documents **Split button** and **Button groups** — neither exists in your base. |
| TX3 | Chips have 4 variants: "assist, filter, input, and suggestion"; "Chip elevation defaults to 0". |
| TX4 | An `Aug 2024` change softened chip stroke "from outline to outline variant" — proof M3 evolves; rules need fetch dates. |
| TX5 | **"M3 Expressive"** exists and deprecates segmented buttons in favour of nav rail. Anything citing M3 should pin a date. |

---

## 7. Not extracted

| Topic | Status |
|---|---|
| M3 motion durations / easing | `UNVERIFIED` — not fetched. Do **not** compare M3 timing to your 150/200/300/400ms bands until it is. |
| M3 spacing dp values | `UNVERIFIED` — token names only. |
| M3 column counts per tier | `UNVERIFIED` — only the expanded margin/gutter (24/24) is confirmed. |
| M3 typography role scale | `UNVERIFIED` — not fetched this pass. |

---

**Fallback clause:** if a case is not covered by R1–TX5, use the base system's rule.
Do not invent an M3 rule, and do not treat the four documentation layers as covered —
only the pages listed in this file were read.
