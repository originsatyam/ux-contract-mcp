# Carbon Design System (IBM) — Knowledge Base

Source: `carbondesignsystem.com` (live site, Gatsby 5.16.1). Extracted 2026-09-27 via Firecrawl (`formats:["markdown"]`, `onlyMainContent:true`), 8 pages. Semantic, tool-agnostic. Provenance ledger at the end.

Carbon's signature ideas vs. the other KBs: **layer-based color** (depth via background layers, not shadow), **productive/expressive duality** (motion *and* type), **2x-grid** (8px "mini unit" as the only primitive), and **status indicators as a pattern** (shape+color+symbol taxonomy with WCAG math).

---

## §1 Color — the layer model

Carbon creates visual depth with stacked background **layers**, not shadows. There are 4 UI layers: base (`$background`) + layer-01 + layer-02 + layer-03. Each nested container steps one layer up.

Two implementation paths, same visual result:

**(a) Layering tokens (designer-facing, explicit):**
- Tokens carry a number suffix = which layer they belong to: `$layer-01`, `$field-02`, `$border-strong-03`.
- **Field tokens** = "a field on top of its background": an input on `$layer-02` bg uses `$field-03` (field number = layer + 1).
- **Borders pair with the same number** as their surface: field on layer-02 → `$field-03` fill ↔ `$border-strong-03` border.
- Consequence: **each layer a component lives on requires a separate variant** of its tokens.
- Text and icon tokens are designed to work across all layers — no per-layer variants.

**(b) Contextual tokens (code-facing, auto):**
- No number suffix (`$layer`, `$field`, `$border-strong`); resolved automatically by wrapping components in `<Layer>` (nest up to 3 levels, default level 01).
- One variant per component; designers spec layer-set tokens and **drop the suffix in redlines**.

**Inline theming:** wrap a section in `<Theme theme="g100">` for a *major* contrast shift — UI shell, side panels within light products. Not for subtle transitions (that's layering's job). Inverse components (tooltip etc.) stay high-contrast across modes.

**Light/dark mode logic:**
- Theme setting = user choice (White / Gray 10 = light; Gray 90 / Gray 100 = dark).
- Never hard-code hex values — they break mode switching.
- Illustrations must swap per mode (token-based SVG, or transparent backgrounds, are acceptable).

## §2 Themes & token architecture

- **Theme** = a set of values assigned to tokens. **Token** = role-based identifier, universal, never changes across themes. **Role** = the systematic usage of a token; roles cannot change between themes. **Value** = the actual style (hex) per theme.
- 4 themes: **White** (default), **Gray 10**, **Gray 90**, **Gray 100**. Cross-theme mapping example:

| Token | Role | White | Gray 100 |
|---|---|---|---|
| `$background` | page background | White | Gray 100 |
| `$field-01` | field color | Gray 10 | Gray 90 |
| `$text-primary` | primary text | Gray 100 | Gray 10 |
| `$text-secondary` | label color | Gray 70 | Gray 30 |
| `$border-strong` | border bottom | Gray 50 | Gray 60 |
| `$icon-primary` | primary icon | Gray 100 | Gray 10 |

- Token categories: **Color, Spacing, Typography, Global** (global = layer usage, border width, component-specific).
- Tokens nest: `$interactive` resolves to palette token `$blue-60` in the default theme.
- Customizing a theme = overriding one/some/all token values (Sass `@use ... with ($theme: ...)`); custom tokens may be added. Values live in `@carbon/themes` per theme (white/g10/g90/g100 source files).

## §3 Spacing

13 tokens, multiples of 2/4/8 px (rem-based):

| Token | rem | px |
|---|---|---|
| `$spacing-01` | 0.125 | 2 |
| `$spacing-02` | 0.25 | 4 |
| `$spacing-03` | 0.5 | 8 |
| `$spacing-04` | 0.75 | 12 |
| `$spacing-05` | 1 | 16 |
| `$spacing-06` | 1.5 | 24 |
| `$spacing-07` | 2 | 32 |
| `$spacing-08` | 2.5 | 40 |
| `$spacing-09` | 3 | 48 |
| `$spacing-10` | 4 | 64 |
| `$spacing-11` | 5 | 80 |
| `$spacing-12` | 6 | 96 |
| `$spacing-13` | 10 | 160 |

Design logic: **proximity = relationship; more space = more importance; white space lets the eye rest** (sections may be dense; the page shouldn't be). Applies to margin/padding on both axes. Non-token methods: center, auto (fluid/asymmetrical), gutter. The **Stack** component delegates spacing to the parent — components don't own their outer spacing.

FAQ rules: spacing tokens are **not responsive** (jumping scale steps at breakpoints is allowed); percentages OK for page division and max-widths; the grid is preferred for horizontal layout.

## §4 2x grid

- **8px "mini unit" is the base geometry** of everything. Rhythm = divide or multiply by 2.
- **Fluid grids are built by division**: 1 → 2 → 4 → 8 → 16 columns.
- **Fixed sizes by multiplication**: sizing scale 8/16/24/32/48/64/80px = 1×–10× mini units.
- **Hybrid boxes** are common and legitimate: one dimension fixed, the other fluid. Typical product UI: table header/toolbar = fluid-width + fixed-height; side panel = fixed-width; data table = fluid both.

Breakpoints:

| Name | Min width | Columns | Margin |
|---|---|---|---|
| Small | 320 | 4 | 0 |
| Medium | 672 | 8 | 16 |
| Large | 1056 | 16 | 16 |
| X-Large | 1312 | 16 | 16 |
| Max | 1584 | 16 | 24 |

Column size as % is constant per breakpoint (25 / 12.5 / 6.25%); padding always 16px.

- Aspect ratios constrained to: 1:1, 2:1, 2:3, 3:2, 4:3, 16:9.
- **Keylines are mandatory** (visible vertical + horizontal alignment lines).
- Grid influencers = screen regions: header / global-sidenav / local-sidenav / dropdown / content / footer / dialog; plus 3 panel behaviors: **flexible** (hover-expand), **fixed** (outside grid), **floating** (overlays, dismissible).
- **Gutterless grid** for closely-related content (gutter total 32px = padding×2, removed in gutterless mode).
- Type aligns to the padding edge — never sits on padding.

## §5 Motion

**Two motion styles** mirroring the type sets: **productive** (efficient, subtle — microinteractions, buttons, dropdowns, data tables) vs **expressive** (vibrant, reserved for occasional significant moments — page opens, primary action, alerts).

3 easing families × 2 styles (exact cubic-bezier):

| Family | Productive | Expressive | Use |
|---|---|---|---|
| Standard | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` | Element visible throughout the motion |
| Entrance | `cubic-bezier(0, 0, 0.38, 0.9)` | `cubic-bezier(0, 0, 0.3, 1)` | Element appearing (modal, toaster, dropdown open) |
| Exit | `cubic-bezier(0.2, 0, 1, 0.9)` | `cubic-bezier(0.4, 0.14, 1, 1)` | Element permanently removed |

**Exit exception:** element leaving but *recallable nearby* (e.g. side panel) uses **standard** easing instead of exit easing — it's still perceptually present.

No bounce, no stretch, no sudden stops. Duration is **dynamic by size** (larger distance/scale = longer). Static duration tokens:

| Token | ms | Examples |
|---|---|---|
| fast-01 | 70 | button, toggle |
| fast-02 | 110 | fade |
| moderate-01 | 150 | — |
| moderate-02 | 240 | toast |
| slow-01 | 400 | large expansion |
| slow-02 | 700 | background dim |

Micro-interactions: 90–120ms with ease-out. A Motion Generator tool exists for custom durations.

Evaluation checklist (4 questions): purposeful / responsive / meticulous / unobtrusive. **Reduced-motion alternatives are mandatory** (accessibility + device capability).

## §6 Typography — two type sets

Same productive/expressive duality as motion:

- **Productive** (`01` suffix): for product UI. Drivers: users doing a specific job, active interaction (inputs/forms/controls), embedded on one page, KPI = task time & abandonment. Space-efficient, condensed. **Productive headings are fixed.**
- **Expressive** (`02` suffix): for editorial/web. Drivers: scanning/reading, passive interaction (imagery, long-form), multi-page sessions, KPI = CTR & purchases. Larger sizes; two fixed headings **plus fluid headings** that scale with breakpoints.

Line-height pairings (mandatory for consistency): `body-compact-01`↔`heading-compact-01`, `body-01`↔`heading-01` (and the `02` equivalents).

**Blending ("moments"):** use the *other* type set where it better serves the task — but only spanning a full page/banner **without containers**. Examples: productive type inside web mega menu/search/commerce/filter panels (functional elements recede, user-interest content stays foreground); expressive moments in product home pages/page headers/banners (content not restricted to container, card, or data table).

Rule: **keep one type set within a discrete task, component, or region** — mixing inside a component jumbles the size-based hierarchy signal.

## §7 Component rules — Buttons

Variants (each has a fixed semantic, must be consistent product-wide):

| Variant | Purpose |
|---|---|
| Primary | Principal CTA. **Once per screen** (exceptions: app header, modal, side panel; plus temporary flows — see below). |
| Secondary | Only ever paired with a primary; performs the **negative action** of the set ("Cancel", "Back"). Never in isolation, never for a positive action. |
| Tertiary | Less prominent, can be independent or paired. Sub-tasks, page headers, empty states. |
| Ghost | Least prominent; supplementary actions. In a flow: primary = forward, secondary = "Back", ghost = "Cancel". |
| Danger | Destructive effects; 3 styles (primary/tertiary/ghost) chosen by how much emphasis the destructive step deserves. |

- **Temporary double-primary is allowed** in exactly one case: user-triggered flow (e.g. data-table row opens side panel with its own primary).
- Not every page needs a primary — content-presenting pages use tertiary/ghost.
- Page header button: use **tertiary** (header placement alone gives prominence); only make it primary if nothing below the header can be primary.
- 7 sizes: xs, sm, md, lg-productive (most common, pairs 14px body), lg-expressive (pairs 16px body, website banners), xl (bleeds to edge of modal/side panel/narrow tearsheet), 2xl (full-screen tearsheet). Don't mix sizes in a group.
- **Label always left-aligned**, never centered; icon right-aligned (centered only in icon-only buttons). RTL mirrors the entire button.
- Label content: **{verb} + {noun}** formula, sentence case; exceptions allowed for common actions (Done, Close, Cancel, Add, Delete). Overflow = wrap to second line, **never truncate**.
- Buttons trigger actions, not navigation — use links for navigation.
- Keyboard: `Enter` or `Space`; dialogs give focus to primary; on forms, `Enter` on a non-actionable field activates primary. Loading = inline-loading spinner, button disabled while in progress.
- Icons: 16px in buttons (20px in lg-expressive); always **right of label**; must match label color; only universal actions get icons (Add, Edit, Copy, Trash can, Subtract alt, Export, Upload, Download, Play, Pause, Stop outline, Restart) — never repurpose a defined icon for another action; filled variants avoided (status icons excepted).
- **Icon-only buttons**: sparing; only if icon is standardized/recognizable or space forces a toolbar. **Tooltip always required.** Danger may never be icon-only. Don't recolor ghost icon buttons.
- Alignment by context: left-justified (banner CTAs, in-page forms, tiles) / right-justified (inline notifications, data tables, wizards, single-button dialogs) / full-span (dialogs, side panel, small tiles; code max 320px without override). Full-page → primary on the **left**; wizards → primary bottom **right**. (Position revised: primary sits left-of-secondary on left-aligned full pages.)
- Fixed button = 16px left + 64px right padding; **fluid width preferred**; related buttons in a group share one width (set by longest label); fluid buttons never left-aligned. Fluid buttons separated by 1px `$button-separator` border (3:1 non-text contrast, recommended for a11y).
- Button groups: 2–3 related actions; >3 → menu button or toolbar. Recommended combinations exist (e.g. primary+secondary, primary+ghost, primary+2 tertiary…); forbidden: two high-emphasis, secondary with non-primary, tertiary+danger-tertiary together, primary+danger-ghost together.

## §8 Patterns — Status indicators

Five variants, chosen by space & attention needed:

| Variant | When | Anatomy |
|---|---|---|
| Icon indicator | Ample space, max attention | icon (shape+color+symbol) + inline label |
| Shape indicator | Small spaces, scanning large data | shape+color + label (no symbol) |
| Badge (numbered) | Count matters | shape + number, on 48px header icon buttons only |
| Badge (dot) | Count unknown/irrelevant | dot over icon button |
| Differential | Deltas in stats/dashboards | symbol (+/−/caret/arrow) + optional color + label |

- **Icon vs shape:** icons = system health (feedback on overall state); shapes = secondary, product-defined semantics (priority, lifecycle phase) — not always urgency.
- Severity levels: **high** (immediate action: errors, alerts) / **medium** (feedback, progress) / **low** (ready-to-view, changed-since-last).
- Consolidated statuses take the **highest-attention color** of the group.
- Cognitive load: don't indicate when no action is required; >5–6 indicators overwhelms — use plain text.
- Four communicating elements: **symbols, shapes, colors, type**. For WCAG compliance **at least three must be present**; indicators must rely on ≥2 of {color, shape, symbol}. 3:1 contrast between indicator colors and against the page background.
- Status palette (light-theme values, from text layer): Red 60 `#da1e28`, Green 50 `#24a148`, Orange 40 `#ff832b` (+ outline `#ba4e00`), Yellow 30 `#f1c21b` (+ outline `#8e6a00`), Blue 70 `#0043ce`, Purple 60 `#8a3ffc`, Gray 60 `#6f6f6f`. Semantic map: red=danger/error, orange=serious warning, yellow=regular warning, green=success/normal, blue=passive/info+progress, gray=not-started/drafts, purple=outliers/undefined. Extended Yellow/Orange 10–100 ramps exist **only** for contrast a11y in dataviz/status — never in other contexts.
- Canonical status-name → token mapping (icon set): Failed=`$status-red`; Caution major=`$status-orange`; Caution minor=`$status-yellow`; Undefined=`$status-purple`; Succeeded=`$status-green`; Normal/In progress/Incomplete/Informative=`$status-blue`; Not started/Pending/Unknown=`$status-gray`. Shape set adds Critical/High=`$status-red`, Medium=`$status-orange(-outline)`, Low/Cautious=`$status-yellow(-outline)`, Stable=`$status-green`, Draft=`$status-gray`.
- Size pairings: icon indicator 20px icon + 16pt type, or 16px + 14pt; shape indicator 16px + 14pt or 12pt.
- Alignment: icons left-aligned with text in lists/tables; shapes go **before** labels (after only if label length is constant). Avoid the same shape in different colors within one experience.
- Outlines: icon indicators don't need them (symbol gives contrast); **shape indicators require outlines** + text, especially orange/yellow in light themes.
- Differential: color optional if "+"/"−"/arrow present; positive=green spectrum, negative=red (except temperature data).

---

## Provenance & honesty ledger

Extracted 2026-09-27, Firecrawl markdown, `onlyMainContent:true`, carbondesignsystem.com (live/v11 site; v10.carbondesignsystem.com avoided as legacy).

Pages scraped (8):
1. `/elements/color/usage` — layering + contextual tokens, inline theming, mode logic
2. `/elements/spacing/overview` — scale, design logic, Stack, FAQ
3. `/elements/motion/overview` — styles, easings, durations, checklist
4. `/elements/2x-grid/overview` — mini unit, breakpoints, hybrid boxes, influencers
5. `/elements/typography/style-strategies` — productive/expressive, blending
6. `/elements/themes/overview` — theme terms, 4 themes, cross-theme token table, token categories
7. `/components/button/usage` — variants, sizes, groups, content, icons
8. `/patterns/status-indicator-pattern` — variants, severity, palette (incl. hex from text layer), a11y

Known gaps / not extracted:
- **Full type-scale tables** (`/elements/typography/type-sets`): exact font sizes/weights/line-heights per style are rendered in interactive tables/code blocks — not in markdown. Only pairing rules and set logic captured.
- **Theme hex values** for the 4 themes: the themes page values are color-swatch chips (White/Gray 100 mapping above is by *name*, e.g. "Gray 70"); authoritative hexes live in `@carbon/themes` GitHub sources (white.js/g10.js/g90.js/g100.js) — linked, not scraped.
- **Interactive-token page** (`/elements/color/tokens`): skip-listed as client-rendered; token names captured here come from usage pages instead.
- **Component style tabs** (button/style etc.): heights, exact paddings, and state colors not scraped; only usage-level logic captured (button fixed-padding 16/64px is the exception, from usage text).
- Fluid/hanging button guidance flagged by Carbon itself as **not production-released**.
- Figma kit guidance (`/designing/kits/figma`) not scraped; v10 pictograms/elements content avoided as legacy.
