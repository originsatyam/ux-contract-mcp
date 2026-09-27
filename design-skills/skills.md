# UI Design Skills — Extracted Logic & Patterns

> Distilled from a production-grade mobile UI kit's **foundations, patterns, and component measurements** (source: Figma file `sGwh6gbtPpTkHilbJ3YR1w`, pages "DS / Foundations", "DS / Patterns", "DS / Components", "Text styles and dynamic type", "Lists", "Tab bars", "Navigation bars", "Toggles (Switches)", "Buttons").
> Every value below traces to actual design data (nodes listed in `## Provenance`). Nothing is invented.
> Naming is semantic and tool-agnostic: usable in Tailwind, CSS variables, React Native, Flutter, Swift, or any design tool.

---

## 1. Spacing System

**Base unit: 8px** (with a 4px half-step for tight optical adjustments).

| Token | Value | Usage rule |
|---|---|---|
| `space/1` | 1px | Hairline offsets, divider nudges |
| `space/2` | 2px | Icon optical alignment, micro-tweaks |
| `space/4` | 4px | Icon↔label gap inside controls, tight clusters |
| `space/8` | 8px | Default gap between related elements (8px rhythm) |
| `space/12` | 12px | Between list sections, relaxed item groups |
| `space/16` | 16px | Screen-edge inset, card padding, section breaks |
| `space/20` | 20px | Large-control inner padding |
| `space/24` | 24px | Block separation, modal inner margins |
| `space/32` | 32px | Section separation |
| `space/40` | 40px | Hero spacing, page-level breathing room |
| `space/48` | 48px | Maximum rhythm — page titles to content |

**Rhythm rule (from source patterns page):** default to 8px rhythm; escalate to 12/16/24/32 only when hierarchy demands it. Never use arbitrary values (no 13px, 17px).

**Observed application of the scale:**
- Screen-edge inset: **16px** (list rows, search field, nav-bar title)
- Icon ↔ label inside a control: **4–6px** (buttons use 4, nav-bar buttons use 6–10)
- Control vertical padding: derives from `(target-height − text-height) / 2`, rounded to the scale — e.g. a 44px row with 22px text → 11px padding (half-step, acceptable for centering)

---

## 2. Radius System

| Token | Value | Usage rule |
|---|---|---|
| `radius/0` | 0 | Full-bleed rows, table cells |
| `radius/4` | 4 | Minimal rounding, small chips |
| `radius/8` | 8 | Default: buttons, inputs, cards, small modals |
| `radius/12` | 12 | Large buttons, prominent cards |
| `radius/16` | 16 | Sheets, large cards |
| `radius/24` | 24 | Floating panels, prominent containers |
| `radius/pill` | 999 | Icon-only buttons, toggles, fully-round controls |

**Rule:** radius scales with element size. Small control → 8; large container → 16–24; explicitly-round control (toggle, circular icon button) → pill.

**Observed application:**
- Text input: 8
- Medium pill-style button: 40 (visually pill for its height)
- Large bordered button: 12
- Toggle: pill (51×31 track, fully round)
- Search field: 10 (one-off optical value between 8 and 12)

---

## 3. Typography Scale

11-step scale. Sizes in px, line-height in px, letter-spacing in px. Body is the anchor: **17/22**.

| Token | Size | Line-height | Tracking | Weight usage |
|---|---|---|---|---|
| `type/caption-2` | 11 | 13 | +0.06 | Smallest metadata, timestamps |
| `type/caption-1` | 12 | 16 | 0 | Tab labels, secondary metadata |
| `type/footnote` | 13 | 18 | −0.08 | Fine print, helper text |
| `type/subhead` | 15 | 20 | −0.23 | Secondary content, subtitles |
| `type/callout` | 16 | 21 | −0.31 | Emphasized secondary, links |
| `type/body` | 17 | 22 | −0.43 | Default reading text (Regular) |
| `type/headline` | 17 | 22 | −0.43 | Same size as body but **Semibold** — inline emphasis |
| `type/title-3` | 20 | 25 | −0.45 | Section headers, modal titles |
| `type/title-2` | 22 | 28 | −0.26 | Screen titles (regular weight) |
| `type/title-1` | 28 | 34 | +0.38 | Large section titles |
| `type/large-title` | 34 | 41 | +0.40 | Page-level hero titles |

**Structural logic of the scale:**
1. **Two parallel tracks share sizes:** `body` vs `headline` (identical metrics, weight is the differentiator) — do not create a new size for emphasis; change weight.
2. **Tracking inverts with size:** small sizes get positive tracking (readability), large sizes get positive tracking again (display), mid sizes go slightly negative (optical tightening). Copy the sign, not just the number.
3. **Line-height ratio is tight** (~1.22–1.3), not web-typical 1.5. This is a UI scale, not a document scale.

### Accessibility type ladder (AX1–AX5, measured)
Each user text-size setting scales the entire 11-style ladder. Sizes in px (line-height in parens).

| Style | AX1 | AX2 | AX3 | AX4 | AX5 |
|---|---|---|---|---|---|
| Caption 2 | 20 (25) | 24 (30) | 29 (35) | 34 (41) | 40 (48) |
| Caption 1 | 22 (28) | 26 (32) | 32 (39) | 37 (44) | 43 (51) |
| Footnote | 23 (29) | 27 (33) | 33 (40) | 38 (46) | 44 (52) |
| Subhead | 25 (31) | 30 (37) | 36 (43) | 42 (50) | 49 (58) |
| Callout | 26 (32) | 32 (39) | 38 (46) | 44 (52) | 51 (60) |
| Body / Headline | 28 (34) | 33 (40) | 40 (48) | 47 (56) | 53 (62) |
| Title 3 | 31 (38) | 37 (44) | 43 (51) | 43 (51) | 55 (65) |
| Title 2 | 34 (41) | 43 (51) | 44 (52) | 50 (59) | 56 (66) |
| Title 1 | 38 (46) | 43 (51) | 48 (57) | 53 (62) | 58 (68) |
| Large Title | 44 (52) | 48 (57) | 52 (61) | 56 (66) | 60 (70) |

**Ladder logic:**
1. Smallest styles grow fastest (Caption 2: 11→40, ×3.6) while largest grow slowest (Large Title: 34→60, ×1.8) — the ladder compresses hierarchy at accessibility sizes so body text remains dominant.
2. Some inversions occur at AX3+ (Title 3 stops growing at AX4, Title 1/Title 2 converge at AX2) — hierarchy is deliberately flattened rather than letting titles dominate the screen.
3. Line-height ratio stays ~1.1–1.25 throughout — the tight UI ratio is preserved at every size.

**Full scale summary:** 12 settings total — xSmall (11 styles at reduced sizes), Small, Medium, Large (default, the primary table above), xLarge, xxLarge, xxxLarge, then AX1–AX5.

### Dark-Theme Values (measured, System Colors collection)
The kit's production color collection carries three modes: Light / Dark / Dark Elevated. Key role mappings:

| Role | Light | Dark | Dark Elevated |
|---|---|---|---|
| Surface (base background) | `#FFFFFF` | `#000000` | `#1C1C1E` |
| Surface secondary | `#F2F2F7` | `#1C1C1E` | `#2C2C2E` |
| Surface grouped-base | `#F2F2F7` | `#000000` | `#1C1C1E` |
| Surface grouped-card | `#FFFFFF` | `#1C1C1E` | `#2C2C2E` |
| Text primary | `#000000` | `#FFFFFF` | `#FFFFFF` |
| Text secondary | `#3C3C43` @60% | `#EBEBF5` @60% | `#EBEBF5` @60% |
| Separator | `#545456` @34% | `#545456` @60% | `#545456` @60% |
| Accent blue | `#007AFF` | `#0A84FF` | `#0A84FF` |
| Destructive red | `#FF3B30` | `#FF453A` | `#FF453A` |

**Dark-theme logic:**
1. **Elevated ≠ base:** dark-elevated mode lifts every surface one step lighter (`#000→#1C1C1E→#2C2C2E`) — the same lighter-with-height principle the web system uses, here as an explicit third mode rather than per-elevation tokens.
2. **Saturated colors brighten in dark mode** (`#007AFF→#0A84FF`, `#FF3B30→#FF453A`) to preserve contrast against dark surfaces.
3. **Secondary text and separators are alpha colors, not solid grays** — the same color at different opacities adapts to any elevation; opacity rises in dark mode (34%→60%) because hairlines need more contrast on dark.
4. Note: the semantic roles in section 4 come from the kit's authored "DS / Foundations" collection (single-mode). The values above are the kit's production "System Colors" collection — the closest measured mapping for the same roles.

---

## 4. Color System (Role-Based)

7 semantic roles. Hex values are one theme; roles must be re-mapped per theme, never hardcoded.

| Token | Light value | Role rule |
|---|---|---|
| `color/surface` | `#FFFFFF` | Page background |
| `color/surface-subtle` | `#F6F6F7` | Grouped/inset background, subtle fill |
| `color/text` | `#14141A` | Primary text — near-black, not pure black |
| `color/text-secondary` | `#61616B` | Secondary labels, placeholders |
| `color/border` | `#D1D1D6` | Separators, input outlines (often rendered at reduced opacity) |
| `color/accent` | `#0A5CFF` | Interactive elements: links, selected states, primary actions |
| `color/destructive` | `#E51F26` | Delete/destroy actions only — never decorative |

**Rules extracted from usage:**
- Primary text is never `#000`; secondary text is never a light gray that fails contrast — secondary sits around 40% perceived lightness of primary.
- Accent is reserved for **interactive** semantics. Static imagery must not use it.
- Destructive is reserved for **irreversible actions**. It may appear as text-only (no fill) in list rows.
- Disabled controls drop to a neutral gray fill (observed `#D9D9DE` on buttons) — not reduced-opacity accent.
- Borders on inputs observed at `#C7C7CF`, 1px — the border token ±1 lightness step; treat 1px as the only hairline weight.
- The source kit supports full theme modes (light / dark / dark-elevated) via the same role names: **token names are the API; hex values are per-theme.**

---

## 5. Motion

| Token | Value | Usage rule |
|---|---|---|
| `motion/fast` | 150ms | Micro-feedback: hover, press, small state changes |
| `motion/normal` | 250ms | Standard transitions: expand, fade, slide-ins |
| `motion/slow` | 400ms | Large surface changes: sheet presentations, page shifts |

**Rule:** duration scales with the size of the moving surface. Nothing animates longer than 400ms.

---

## 6. Component Patterns (Behavioral Rules)

Measured from the source kit's real components. Describe structure + behavior, not brand names.

### 6.1 List Row
- Heights: **44px (regular)**, **60px (tall)**. 44 is the minimum touch target baseline.
- Structure: `[optional leading edit control] [optional leading image] [title + detail stack] [trailing accessories]`
- Leading inset: **16px**; image-to-title gap: **8px**; title-to-detail gap: tight (−4 overlap for optical kerning).
- Title uses `type/body`; detail uses `type/footnote` or `subhead`.
- Trailing accessory (chevron, value, toggle) hugs right with no fixed width; row fills container width.
- Button-style row variant: text gets **11px vertical padding** inside the 44px row — content is vertically centered, never top-aligned.

### 6.2 Tab Bar (phone)
- Total height **83px** = 40px content + 43px bottom safe-area chrome. **Never hardcode 83 — compute `content + safe-area-inset`.**
- Tab item: **80×40**, evenly distributed (`space-between` across full width).
- Item structure: icon above 2px, label below (`type/caption-1` 12px).
- States: selected = accent color, unselected = `#999999`-range secondary gray. Color-only selection (no fills/badges required).

### 6.3 Navigation Bar (phone, compact width class)
- Heights: **default 150**, **large-title 202**, **modal +11px** each (extra grabber/status chrome).
- Structure (vertical): status bar (54 incl. 21 top inset) → 44px title/controls bar → optional 52px large-title row → optional 52px search row.
- Title/controls bar: leading button inset **8px** from edge; trailing buttons **16px** from edge; controls vertically centered (11px padding around 22px text).
- Search field inside bar: **36px tall**, radius 10, 8px inner padding, inset 16px from screen edges.
- Large-title row: title text bottom-aligned, 8px bottom padding, uses `type/large-title`.
- The bar sits on a translucent material, not opaque fill — content scrolls behind it.

### 6.4 Button (3 sizes)
| Size | Height | Padding (V/H) | Radius | Gap (icon↔label) |
|---|---|---|---|---|
| Small/medium | 34 | 7 / 14 | pill-range (40) | 4 |
| Default | 38 | 10 / 16 | 8 | 8 |
| Large | 50 | 14 / 20 | 12 | 4 |

- Icon-only variant: **square** (e.g. 50×50) and **fully circular**.
- State model (mandatory, from source): `default / hover / pressed / disabled`. Variants change state visuals only — **never redefine layout between states**.
- Disabled: neutral gray fill + reduced-contrast label, identical geometry.

### 6.5 Text Input
- **280×48 default** desktop/tablet probe; phone-equivalent 36–48 depending on context (search field is 36).
- Padding: **14px horizontal**; radius **8**; border **1px**.
- State model: `default / focus / error`. Geometry identical across states; only border/accent color and helper text change.
- Helper/error text sits below the input in `type/footnote`, following the form hierarchy: **Label → Input → Supporting/Error → Action**.

### 6.6 Toggle (Switch)
- Track: **51×31, pill**. Knob: **27×27 circle** (2px inset all sides).
- Knob inset = `(31−27)/2 = 2px` on all sides — derive, don't magic-number.
- Binary state; color signals on/off, geometry never changes.

### 6.7 Form Hierarchy (source pattern page, verbatim logic)
`Label → Input → Supporting/Error text → Action` — never reorder, never omit the supporting line when an error is present.

### 6.8 Interaction-State Contract (source pattern page)
Every interactive component exposes a predictable state model: `default, focus/hover, pressed, disabled, error (when relevant)`.

### 6.9 Responsive Rule (source pattern page)
Prefer intrinsic sizing + constraints. Avoid fixed widths unless there is a hard product requirement. (Evidence in kit: rows/bars fill 402px probe width via fill-constraints, not fixed frames; only the compact probe itself is fixed.)

---

## 7. Cross-Cutting Rules (Distilled)

1. **44px minimum touch target** for anything tappable (rows, bar items, controls).
2. **16px screen-edge inset** for all primary content; 8px for tight leading controls inside bars.
3. **Half-steps are allowed only for vertical centering math**, not for gaps between distinct elements.
4. **State changes alter color/opacity only** — layout must be identical across states.
5. **Compute chrome, don't hardcode it:** bar heights = fixed content + dynamic safe-area insets.
6. **Color = meaning.** Accent = interactive. Destructive = irreversible. Gray = inactive. Never decorative.
7. **Typography has exactly 11 tokens + 1 weight-differentiated twin.** No ad-hoc sizes.
8. **Spacing/radius/motion are closed scales.** Any value not in the scale is a design error unless justified as optical correction.
9. **Semantic tokens over raw values** in all code: components reference `space/16`, never `16px` inline.
10. **Text scales with user settings**; layout must tolerate the type ladder without breaking.

---

## 8. Provenance

| Section | Source |
|---|---|
| Spacing, radius, motion, semantic colors | File variable collection "DS / Foundations" (28 variables, resolved values pulled via Variables API) |
| Type scale (7 settings × 11 styles) | Page "Text styles and dynamic type", default + 6 larger settings measured from text nodes |
| Patterns (form hierarchy, rhythm, states, responsive) | Page "DS / Patterns" (authored text, extracted verbatim as logic) |
| Button/Input measurements | Page "DS / Components" (auto-layout values from components) |
| List rows, tab bar, nav bar, toggle | Pages "Lists", "Tab bars", "Navigation bars", "Toggles (Switches)" (variant + child auto-layout measurement) |
| Raw hex observations (#999999, #007aff, #C7C7CF, #D9D9DE) | Fill inspection of live kit components |

**Known gaps (honesty ledger):**
- ~~Accessibility type ladder~~ **CLOSED 2026-09-27** — AX1–AX5 measured and added above.
- ~~Dark-mode hex values~~ **CLOSED 2026-09-27** — System Colors collection extracted across Light/Dark/Dark Elevated (key roles above; full 59-variable set remains in source).
- Materials page (blur/translucency system) not decomposed into tokens.
- Search field radius (10) is a one-off between scale values — flagged, kept as observed.
- "DS / Foundations" semantic collection is single-mode; its dark values were mapped from the production "System Colors" collection rather than re-authored — treat section 4 hexes as light-theme, and the dark table above as the authoritative dark reference.
