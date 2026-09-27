# shadcn/ui Design Skills — Extracted Logic & Patterns

> Distilled from the shadcn/ui docs (theming, typeset, dark-mode, button, component taxonomy) via Firecrawl.
> Third knowledge base alongside `skills.md` (mobile) and `web-skills.md` (enterprise web).
> This one documents a **code-first token architecture** — how a token system is wired into CSS/Tailwind rather than Figma variables.
> Code values (default theme hexes, generated CSS) are client-rendered in the docs and did not survive scraping — flagged in the ledger. All structural logic below is from the published text.

---

## 1. Token Architecture (the core idea)

Semantic CSS variables, one flat namespace, theme-swapped by selector.

- Tokens live in `:root` (light) and are **overridden wholesale inside a `.dark` selector** — same token names, new values. No `prose-invert`-style parallel palettes; dark mode is a value swap, not an API change.
- Tokens map to utilities (`bg-background`, `text-foreground`, `border-border`, `ring-ring`) — every token is usable as spacing-style-free utility classes.
- Components reference **only semantic tokens** — they never hardcode hex or raw Tailwind palette classes. Changing the look of an app = editing token values, zero component rewrites.

**Token convention — background/foreground pairs:**
- Every surface token pairs with a `-foreground` token: `primary` ↔ `primary-foreground`, `card` ↔ `card-foreground`.
- The background suffix is **omitted** on the surface token itself (not `primary-bg`).
- Rule: a component's `background` = `var(--surface-token)`, its `foreground` = `var(--surface-token-foreground)`. Contrast is guaranteed by the pair, never left to the consumer.

## 2. Semantic Token Set (surface taxonomy)

The token set *is* an elevation-and-intent taxonomy:

| Token pair | Role | Used by |
|---|---|---|
| `background` / `foreground` | Default app canvas + default text | Page shell |
| `card` / `card-foreground` | Elevated static surfaces | Cards, dashboard panels |
| `popover` / `popover-foreground` | Floating surfaces | Popovers, dropdowns, context menus |
| `primary` / `primary-foreground` | High-emphasis actions, brand | Default buttons, selected states, badges |
| `secondary` / `secondary-foreground` | Lower-emphasis filled actions | Secondary buttons/badges |
| `muted` / `muted-foreground` | Subtle surfaces + de-emphasized text | Descriptions, placeholders, helper text, empty states |
| `accent` / `accent-foreground` | **Interactive state surfaces** — hover/focus/active | Ghost buttons, menu highlights, hovered/selected rows |
| `destructive` | Destructive actions, error emphasis | Destructive buttons, invalid states |
| `border` | Default borders/separators | Cards, menus, tables, dividers |
| `input` | Form-control borders | Inputs, textareas, selects |
| `ring` | Focus rings/outlines | All focusable controls |
| `chart-1..5` | Data-viz palette | Charts |
| `sidebar*` (5 pairs) | Sidebar-scoped surface set | Sidebar container, its accents, borders, rings |
| `radius` | Base corner radius | Derived radius scale |

**Structural logic:**
1. **Surfaces are classified, not colored:** canvas < card < popover mirrors elevation; `accent` is defined as *the interaction-state surface* — hover/focus/active states re-point background to `accent`, they don't derive new colors.
2. **Context scoping:** the sidebar gets its own complete token set (surface, accent, border, ring) — a region can re-theme without touching globals.
3. **`muted` does double duty** (subtle surface + de-emphasized text via `-foreground`) — one intent token, two surfaces.
4. **Single `destructive` token** (no pair listed by default) — errors are an intent, not a surface family.

## 3. Radius System (derived scale)

One source of truth: `--radius`. The scale is **computed from it**, not enumerated:

- `radius-lg` = the base value (`--radius`).
- Smaller radii (md/sm) scale *down* from `--radius`; larger (xl) scale *up*.
- Changing `--radius` retunes every component's corners simultaneously.

**Logic:** components reference the derived steps, not raw values — theming radius is a one-variable change. This is the "derive, don't enumerate" principle (cf. the +2px focus-ring formula in `web-skills.md`) applied to the whole scale.

## 4. Content Typography ("rhythm" system — 3 controls)

A dedicated content-typesetting system (`typeset`) with a deliberately tiny API:

| Control | Sets | Everything else derives from it |
|---|---|---|
| `--typeset-size` | Base text size (`1em` follows container; auto-bumps on small screens) | Heading sizes |
| `--typeset-leading` | Line height | — |
| `--typeset-flow` | Space between blocks | Heading gaps, list indents, rule spacing |

**Principles extracted:**
1. **Condense the API ruthlessly.** Scale ratios, tracking, measure, leading were all considered and rejected — three controls total. A dozen variables is a failed API.
2. **Container-relative sizing.** Content scales to its context (chat bubble = small, article = large) instead of fixed rem presets. Max width belongs to the layout, not the stylesheet.
3. **Presets, not cascading overrides:** multiple preset classes (`docs` roomy, `chat` tight, a roomier "larger type" accessibility preset) — accessibility is a preset, not a hack.
4. **Dark mode needs no extra work** — tokens flip; optionally loosen leading in `.dark` if text feels tight on dark surfaces.

### Streaming-stability rules (rare, valuable)
The content styles are written so appended content never restyles existing content:
- **No forward-looking selectors:** `:last-child`, `:has()`, `:empty` are banned from layout rules (their matches change as content arrives).
- **One-directional spacing:** only `margin-block-start` — each block owns its own space-above.
- **Separators ride the new element:** table separators live on the cells being added, so a new row never restyles the row above.

**Override discipline:** base styles use zero-specificity `:where()` guards in a lower layer — plain utilities win without `!important`; an explicit opt-out class (`not-typeset`) exempts a subtree.

## 5. Component API Patterns (Button as reference)

**Variant axis (intent):** `default | outline | ghost | destructive | secondary | link`
**Size axis (dimension):** `default | xs | sm | lg` + icon-parity set: `icon | icon-xs | icon-sm | icon-lg`

**Extracted rules:**
1. **Variant = color/weight intent, size = geometry.** Two independent axes, never a variant that also changes size.
2. **Icon sizes mirror text sizes** (`icon-xs/sm/lg` parallel `xs/sm/lg`) — a `size="sm"` button with an `icon-sm` stays optically aligned.
3. **Ghost is a first-class variant** — the no-fill, `accent`-on-hover pattern from section 2, codified.
4. **Loading is a child, not a state prop:** a spinner is rendered inside with explicit start/end icon-slot markers so spacing stays correct — extension points instead of hardcoded states.
5. **Links that look like buttons use the same variant helper on a real `<a>`** — visual reuse without corrupting semantics (never force a button role onto a link).
6. **Full roundness is a modifier (`rounded-full`)** on top of the derived radius scale — special cases are additive, not separate tokens.

## 6. Component Taxonomy (functional groups)

From the full registry index — the classification itself is the pattern:

- **Form & Input:** field (label+error wrapper), button + button-group, input (+ group with prefix/suffix addons), OTP, textarea, checkbox, radio, select, native-select, switch, slider, calendar, date-picker, combobox, label
- **Layout & Navigation:** accordion, breadcrumb, navigation-menu, sidebar, tabs, separator, scroll-area, resizable
- **Overlays & Dialogs:** dialog, alert-dialog (confirmation), sheet (side panel), drawer (mobile), popover, tooltip, hover-card, context-menu, dropdown-menu, menubar, command (palette)
- **Feedback & Status:** alert, toast, progress, spinner, skeleton, badge, empty
- **Display & Media:** avatar, card, table, data-table, chart, carousel, aspect-ratio, typography, item, kbd

**Logic:** every interactive need maps to one composable unit; distinct intents get distinct components (dialog ≠ alert-dialog; sheet ≠ drawer; tooltip ≠ hover-card) rather than one configurable mega-component. Addons (input prefix/suffix), empty states, and skeletons are first-class components — not afterthoughts.

## 7. Cross-Cutting Rules

1. **Token names are the API; values are the theme.** Components break if they reference raw colors.
2. **Contrast travels in pairs** (`surface` + `surface-foreground`) — never mix a surface with an unrelated text token.
3. **Dark mode = value override in one selector**, never a second component set.
4. **Scales derive from single roots** (`--radius` → whole radius scale) — one knob per visual dimension.
5. **Hover/focus/active re-point to the `accent` surface** rather than inventing state colors.
6. **Variant and size are orthogonal axes** on every control.
7. **Content rhythm = 3 controls** (size/leading/flow); accessibility = an alternate preset.
8. **Streaming-safe styling:** no forward-looking selectors, one-directional margins, separators on incoming elements.
9. **Own the file, own the code:** components and style systems ship as editable source, not installed black boxes.

## 8. Provenance & Honesty Ledger

**Source:** ui.shadcn.com — `/docs/theming`, `/docs/typeset`, `/docs/dark-mode`, `/docs/components/base/button`, `/llms.txt`. Scraped 2026-09-27 via Firecrawl.

**Not extracted (exists in source but not in the text layer):**
- **Default theme CSS values** — the actual hex values in `:root`/`.dark` blocks and generated Tailwind CSS are client-rendered; code blocks were empty in the scrape. The token *names*, *convention*, and *derivation rules* are complete; only the literal values are missing (they're one `Copy` away on the theming page).
- The CLI/registry system (distribution mechanics — out of scope for design logic).
- Per-component specs beyond Button (60+ components exist; taxonomy captured, individual specs not).
- Chart token details (chart-1..5 referenced; values and usage doc not pulled).
