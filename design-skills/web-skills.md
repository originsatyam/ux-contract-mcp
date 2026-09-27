# Web UI Design Skills — Extracted Logic & Patterns

> Distilled from a production-grade **web/enterprise design system's public foundations docs** (scraped via Firecrawl).
> Companion to `skills.md` (mobile). Same method: extract logic, not brands. Semantic, tool-agnostic naming.
> Every value below traces to the source docs (see Provenance). Nothing invented.

---

## 1. Spacing System

**Base unit: 8px.** Every token is a multiplier of the base; the suffix encodes the percentage (`space.200` = 200% of 8px = 16px).

| Token | Multiplier | px | rem |
|---|---|---|---|
| `space/0` | 0× | 0 | 0 |
| `space/025` | 0.25× | 2 | 0.125 |
| `space/050` | 0.5× | 4 | 0.25 |
| `space/075` | 0.75× | 6 | 0.375 |
| `space/100` | 1× | 8 | 0.5 |
| `space/150` | 1.5× | 12 | 0.75 |
| `space/200` | 2× | 16 | 1 |
| `space/250` | 2.5× | 20 | 1.25 |
| `space/300` | 3× | 24 | 1.5 |
| `space/400` | 4× | 32 | 2 |
| `space/500` | 5× | 40 | 2.5 |
| `space/600` | 6× | 48 | 3 |
| `space/800` | 8× | 64 | 4 |
| `space/1000` | 10× | 80 | 5 |

**Usage bands (three ranges, explicit):**
- **0–8px (small):** icon↔text gaps, padding of small components (badges, icon buttons, table cells, inputs), gaps in button groups, trigger↔dropdown gap.
- **12–24px (medium):** padding of larger components (buttons), avatar/large-icon↔content gaps, card inner spacing, less-dense components.
- **32–80px (large):** page-level layout, top-of-page↔header spacing, alignment inside large containers.

**Layout logic rules (grouping laws applied to spacing):**
1. **Group by similarity** — same semantic group = same spacing, always.
2. **Group by proximity** — related elements closer, unrelated farther. Distance itself carries meaning.
3. **Order and hierarchy** — bigger + more whitespace = more important.
4. **Visual rhythm** — repeating consistent spacing creates predictable scanning; deliberate variation creates attention points.
5. **Optical adjustment** — deviate from the scale only with scale values + visual intuition, to correct imbalance.

**Negative spacing:** exists (−2 to −32px) but is a last resort — prefer a dedicated "bleed" mechanism for intentional overflow.

---

## 2. Typography Scale

rem-based (accessibility: text scales with browser/user settings). 1rem = 16px.

### Headings (all Bold)
| Token | Size | Line-height | Context rule |
|---|---|---|---|
| `type/heading-xxl` | 32px (2rem) | 36px (2.25rem) | Brand/marketing |
| `type/heading-xl` | 28px (1.75rem) | 32px (2rem) | Marketing + app page titles (form titles) |
| `type/heading-l` | 24px (1.5rem) | 28px (1.75rem) | App page titles |
| `type/heading-m` | 20px (1.25rem) | 24px (1.5rem) | Large components (modals) — pairs with body-m |
| `type/heading-s` | 16px (1rem) | 20px (1.25rem) | Small-component titles (space-limited) |
| `type/heading-xs` | 14px (0.875rem) | 20px (1.25rem) | Small-component titles |
| `type/heading-xxs` | 12px (0.75rem) | 16px (1rem) | Fine print, pairs with body-s; use sparingly |

### Body (Regular)
| Token | Size | Line-height | Paragraph spacing | Context rule |
|---|---|---|---|---|
| `type/body-l` | 16px (1rem) | 24px (1.5rem) | 16px | Long-form reading (blogs) |
| `type/body-m` | 14px (0.875rem) | 20px (1.25rem) | 12px | **Default in components** |
| `type/body-s` | 12px (0.75rem) | 16px (1rem) | 8px | Fine print, semantic messaging; sparing |

### Metric (numbers emphasis, Bold)
`metric/l` 28/32 · `metric/m` 24/28 · `metric/s` 16/20 — dedicated style for emphasizing numbers (dashboards, stats).

### Code
`type/code`: 12px / 20px, monospace. Inline code inherits container size; line-height = font-size.

**Structural logic:**
1. **Line-height ratio tightens as size grows** (body-s 1.33 → body-l 1.5 → headings ~1.12). Headings are set tight.
2. **Weight ladder is 3-step:** Regular (paragraphs) → Medium (component labels, anything beside line icons — optical weight matching) → Bold (rare emphasis). Bold body text is not the emphasis mechanism; heading styles are.
3. **Heading levels are structural, not visual:** h1–h6 descending, one h1 per page, never skip levels (screen-reader navigation depends on it).
4. **Paragraph spacing is a token, not blank lines** — and in code, paragraphs are separate components with managed spacing, not styled whitespace.

---

## 3. Color System (Role × Emphasis × State)

Three-axis system. Token anatomy: `color.{property}.{role}.{emphasis}.{state}` — e.g. background + danger + bold + hovered.

### Color roles (meaning layer)
| Role | Use for |
|---|---|
| `neutral` | Default text, secondary UI, secondary buttons, navigation |
| `brand` | Primary actions and brand-carrying elements only |
| `information` | Informative UI, in-progress states |
| `success` | Favorable outcomes |
| `warning` | Caution — prevent mistakes |
| `danger` | Danger, serious errors |
| `discovery` | New things — onboarding, new features |
| `accent` | Color **with no semantic meaning**; must be swappable (exchangeable without changing the experience) |
| `inverse` | Content sitting on bold backgrounds |
| `input` | Form fields |

**Hard rule:** never use accent where color carries meaning. Accent = decoration/variety, swappable.

### Emphasis levels (contrast layer)
`subtlest → subtle → default → bold` — bold = high contrast against surface = more attention. Inverse tokens exist for text/icons/borders on bold backgrounds; special inverse pairs for yellow warning backgrounds to pass contrast.

### Interaction states (state layer)
`default / hovered / pressed / selected / focused / disabled` — encoded in the token, not restyled manually.
Icon-specific rule: no dedicated hover/pressed color for icons — express state via a **subtle neutral background** behind the icon instead.

### Palette structure
- **Saturated ramps:** blue, teal, green, lime, yellow, orange, red, magenta, purple.
- **Neutrals:** separate ramps for light and dark mode (not shared).
- **Alpha colors:** transparency-based tokens so UI adapts to varying backgrounds/elevations.

### Contrast requirements (WCAG AA, hard rules)
- **3:1** — UI essential to understanding; text ≥24px.
- **4.5:1** — text <24px.

### Theming
Light + dark only. Every token has a per-theme value; consumers never hand-map dark values.

### Ramp structure & dark-mode mapping (from palette page)
- **Saturated ramps:** 10 steps per hue (100→1000, with half-steps 250/850 and alpha variants like `200A40`).
- **Neutral ramps:** light `Neutral0–1200` + alpha `100A–500A`; dark `DarkNeutral-100–1200` + alpha `100A–500A`. Separate ramps, never shared.
- **Neutral mapping rule: number-mirror.** `Neutral100` (light) ↔ `DarkNeutral100` (dark) — same suffix = same intent.
- **Saturated mapping rule: symmetry.** Divide the 10-step ramp in half; the halves mirror. Examples from source: a button at **700 (light) → 400 (dark)**; a tinted background at **100 (light) → 1000 (dark)**. Start with symmetry, adjust only where a specific use case breaks.
- **Implementation rule:** tokens perform this mapping automatically — consumers pick a token, never a raw swatch, and never compute their own dark values.

---

## 4. Radius System

| Token | Value | Element class |
|---|---|---|
| `radius/xs` | 2px | Micro-details: badges, checkboxes, kbd shortcuts |
| `radius/s` | 4px | Labels, lozenges, tags, timestamps, tooltips, compact buttons |
| `radius/m` | 6px | **Interactive elements: buttons, inputs, selects, nav items** |
| `radius/l` | 8px | Containers: cards, floating UI, dropdown menus |
| `radius/xl` | 12px | Page-level containers: modals, tables, columns |
| `radius/xxl` | 16px | Media players |
| `radius/full` | 999px | People-related circles: avatars, mentions, reactions |
| `radius/tile` | 25% | Tile components only |

**Structural logic — radius encodes element class, not aesthetics:**
1. interactive < container < page-level. Micro-details get almost none.
2. **Focus ring is derived, not chosen: `focusRadius = elementRadius + 2px`, offset 2px from the bounding box.** The pairing is mandatory (every element radius has a matching focus radius).
3. Circles are reserved for people/identity — not general decoration.

---

## 5. Border System

Width × color pairing (width = prominence, color = meaning).

| Token | Value | Use |
|---|---|---|
| `border/width` | 1px | All default borders and dividers |
| `border/width-selected` | 2px | Selected element (active tab, chosen item) |
| `border/width-focused` | 2px | Focus ring |

**Mandatory pairings:** selected width ↔ selected border color; focused width ↔ focused border color. 1px is the universal hairline; 2px is reserved for selection/focus semantics only. Subtle backgrounds may need an accent border to hit 3:1 contrast.

---

## 6. Elevation System

4 levels + 1 special. Surface + shadow are paired; never mix pairs.

| Level | Surface | Shadow | Use |
|---|---|---|---|
| `elevation/sunken` | solid, darkens in both themes | none | Backdrop "wells" content sits in (board columns). Only on default surface, never nested on raised/overlay |
| `elevation/default` | baseline surface | none | Flat page UI. Flat cards = surface + border |
| `elevation/raised` | + shadow.raised | paired | Movable cards (drag). Sparing emphasis, one focal point max |
| `elevation/overlay` | + shadow.overlay | paired | UI above UI: modals, dropdowns, floating toolbars. May stack |
| `elevation/overflow` | n/a (shadow only) | paired spread/perimeter | Scroll indicator at content cut-off — border is the default alternative |

**Rules:**
1. **Surface/shadow pairing is atomic** — never combine one level's surface with another's shadow.
2. **Dark mode = lighter-with-height, not bigger shadows:** higher elevation → lighter surface (imagined front lighting). Shadows alone can't carry depth in dark mode.
3. **Hover/press on containers:** use dedicated hovered/pressed surface tokens; elevation *transition* (default→overlay on hover, →raised on press) is an alternative for default/raised only — never for overlays, never combined with color-state tokens, never on small UI.
4. **Dragging = overlay elevation**, returns on drop.
5. **Scrolled-content affordance:** border (default) or overflow shadow (when a border is missable — small UI, cell-bordered tables).

### Z-index ladder (stacking order, global)
| Z | Element |
|---|---|
| 200 | App navigation |
| 300 | Inline dialog |
| 400 | Popup |
| 500 | Blanket (dimmer) |
| 510 | Modal |
| 600 | Flag/toast |
| 700 | Spotlight/onboarding |
| 800 | Tooltip |

Rule: same elevation style ≠ same z-index — each layer type gets its own rung. Learn the ladder; don't invent values.

---

## 7. Grid & Layout

12-column grid for the main content area. Three parts: **columns / gutters / margins**.

### Breakpoints (viewport-based, not content-area-based)
| Device | Breakpoint | Viewport | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `xxs` | 320–479 | 2 | 12 | 16 |
| Tablet | `xs` | 480–767 | 6 | 12 | 16 |
| Tablet | `s` | 768–1023 | 6 | 12 | 16 |
| Desktop | `m` | 1024–1439 | 12 | 16 | 32 |
| Desktop | `l` | 1440–1767 | 12 | 16 | 32 |
| Desktop | `xl` | 1768+ | 12 | 16 | 32 |

Design for ≥2 device sizes; always include mobile. Responsive behavior is built with auto-layout-equivalents, never absolute positioning.

### Grid types
| Type | Max width | Use when |
|---|---|---|
| **Fixed-wide** (default) | 1296px incl. margins | Structured content: dashboards, directories, search results |
| **Fixed-narrow** | 864px incl. margins | Long-form reading: blogs, docs (limits line length) |
| **Fluid** | none | Content with no natural width: boards, whiteboards — sparingly |

### Alignment rules
1. **Top-level containers align to columns** (cards, images, text blocks, tables, forms).
2. **Small elements never align to the grid** — buttons, icons use space tokens inside containers.
3. **One grid layer per area:** content inside a container uses space tokens, not a nested column grid (nested grids possible but token-driven spacing is the default).
4. **Overlays sit outside the grid** (modals, tooltips, dropdowns float above).
5. **Never overflow into gutters/margins** — breaks visual alignment.
6. Breakpoint is chosen by **viewport width**, unaffected by nav/panel visibility.

---

## 8. Cross-Cutting Rules

1. **Token anatomy = grammar:** `property.role.emphasis.state` for color; multiplier-suffix for space; class-based for radius. Names encode decisions.
2. **8px base everywhere; rem for all text.** Pixels for borders (hairline), rem for type (scalability), px-scale for space.
3. **Contrast is non-negotiable:** 3:1 UI/text≥24, 4.5:1 text<24. Verified per theme, especially dark mode.
4. **States are tokenized** (hover/press/focus/selected/disabled) — never hand-restyled; state changes never alter geometry.
5. **Focus ring is derived math:** +2px radius, 2px offset, 2px width, mandatory color pairing.
6. **Elevation pairs are atomic; dark mode lifts with lightness.**
7. **Grid for containers, tokens for everything inside them.**
8. **Semantic meaning is role-locked:** accent is meaningless by definition (must be swappable); warning/danger/success/information carry locked meanings.
9. **Icons get background-based states, not color-swapped glyphs.**

---

## 10. Iconography System

**Grid & sizes:** icons drawn in a 16×16 bounding box. Two sizes only:
- **Medium 16px — default.** Balances with body text and app density.
- **Small 12px — sparing, six defined uses:** chevrons (always 12px, even in buttons/dropdowns), field-validation status icons, icons inside compact elements (tags/badges/statuses), app-affiliation marks, secondary actions (hierarchy vs wayfinding), supporting-role actions.

**Style spec:** 1.5px stroke; rounded outer corners + **sharp interior corners**; **square line caps** (cap style "none" so paths align to pixel edges — never "round"/"square" cap styles). Keyline shapes guarantee optical balance across aspect ratios. No 3D/diagonal perspectives — straight-on 90° profiles only (cognitive accessibility). Icon color = icon-specific or text color tokens (contrast pre-engineered); spacing via a Box primitive with space tokens, never bare offsets.

**Usage logic:**
1. **Reuse before creation** — existing metaphor wins; audit before adding a new icon.
2. **Minimum detail for legibility** — icons optimize for quick recognition at small size; excess detail fails.
3. **Universal metaphors only** — no culture- or language-specific symbols.
4. **Icons are signifiers, not decoration** — pair with text labels wherever possible; question whether an icon is needed at all.
5. Larger decorative needs → colored icon *tile* (accessible icon/background pairings pre-built), not a scaled-up icon.

## 11. Component Behavioral Rules (Usage docs, distilled)

### 11.1 Button
- **One primary CTA per page or container area** — primaries compete for attention; everything else is secondary/outline/ghost.
- **Buttons = actions on current state; links = navigation that changes URL.** Never swap the elements — assistive tech announces them differently.
- **Avoid disabled form buttons entirely:** keep the button pressable; use validation text to explain what's missing. Disabled buttons are unreachable in tab order, receive no events, and explain nothing.
- **Never put tooltips on disabled elements** (unreachable). Tooltip test before use: is the info essential? actionable? If essential, it must not be hidden in a tooltip — use helper text instead.
- **Alignment follows content density:** right-align for focused tasks/modals/low-copy flows (Z-pattern ends on the primary); left-align for full-page forms and content-heavy views (F-pattern reads importance left-to-right). Primary button sits at the group's leading edge of emphasis.
- **Label rules:** sentence case only; short, no punctuation, drop articles; **start with the verb + object** ("Delete unpublished page", never "Yes/No"); labels must echo the surrounding UI's language (dialog says "Discard?" → button says "Discard", not "Delete").

### 11.2 Modal dialog
- **One task per modal.** No multi-step flows, no tabs, no large tables, no horizontal scrolling; minimize vertical scrolling.
- **Never nest modals** — dialog-triggering-dialog is inaccessible and confusing; open in a new tab or dismiss first.
- **Anatomy:** header (title is always `h1`) + header close button + body + footer (primary + cancel).
- **Footer buttons right-aligned, primary rightmost** (last position = the scanning terminus).
- **Primary button label mirrors the modal title** ("Fork repo-name" title → "Fork repository" button).
- **Multiple dismissal paths required:** header close button (mandatory, near-always), `Esc`, outside/blanket click, footer cancel (optional).
- **Focus order contract:** close button (or title/container fallback) → first focusable in body → secondary button → primary button → **return focus to the trigger** on close.
- **Severity needs more than color** — icon + accessible label.

### 11.3 Component taxonomy (function groups)
Forms/inputs (button, calendar, checkbox, comment, date-time-picker, dropdown-menu, focus-ring, form, radio, range, select, textarea, text-field, toggle) · images/icons (avatar, avatar-group, icon, image, logo, object, tile) · labels (badge, date-label, lozenge, tag, tag-group) · layout (page, page-header, panel) · loading (progress-bar, skeleton, spinner) · messaging (banner, empty-state, flag, inline-message, modal, spotlight, section-message) · navigation (breadcrumbs, link, menu, navigation-system, pagination, tabs) · overlays (blanket, drawer, inline-dialog, popup, tooltip) · status (progress-indicator, progress-tracker) · text/data (code, dynamic-table, heading, inline-edit, table, table-tree, visually-hidden).

**Taxonomy logic:** distinct intents get distinct components — dialog vs inline-dialog vs popup vs tooltip are separated by *interaction weight* (blocking → contextual → brief → non-actionable); message family separated by *reach* (banner=screen, section-message=region, inline-message=local, flag=transient toast); label family separated by *content type* (badge=numeric, lozenge=status, tag=object, date-label=date). Visibility states are first-class (`visually-hidden` utility). Status/journey components separate position (indicator) from structure (tracker).

### 11.4 Primitives layer (composition system)
- **Box** — generic container, managed token access. **Stack/Inline/Flex/Grid** — layout with spacing semantics. **Bleed** — the sanctioned way to escape container padding (replaces negative space tokens). **Pressable/Anchor/Focusable** — custom interactive bases with focus-ring handling built in. **Text/MetricText** — token-backed typography. **XCSS** — tokens-only styling escape hatch. **Responsive** — breakpoint helpers.
- **Rule:** custom UI composes primitives rather than raw divs+CSS — tokens and focus behavior arrive automatically; bypassing primitives forfeits theming and a11y guarantees.

## 12. Accessibility Principles (foundation-level)

**Seven principles:** consistent experiences (same components/patterns everywhere — reduces cognitive load) · simple language (reading level ~ages 12–14) · inclusive content (no jargon, metaphors, idioms) · user control (reflow at all sizes; adjustable scale/contrast; respect reduced-motion; warn before high-impact changes) · text alternatives (labels, alt text, transcripts) · color never alone (contrast 4.5:1 text / 3:1 large text+graphics) · semantic HTML (`header/nav/footer`, never meaningless divs).

**Impairment-aware design matrix** (design for permanent, temporary, and situational forms simultaneously):
- Visual → alt text, semantic HTML, contrast, color-independence.
- Auditory → captions, transcripts.
- Mobility → keyboard support, large targets, semantics.
- Cognitive → plain language, chunked text, headings, simple navigation.

**Rule:** components ship with built-in keyboard/ARIA, but pattern-level accessibility is still the author's job — end-to-end review is mandatory.

## 13. Content & Voice System (UI writing rules)

**Reading level:** ~ages 12–14. Plain, concise, localizable. No metaphors or idioms (machine-translation hostile).

**Voice = fixed personality: bold, optimistic, practical (with occasional, earned delight).**
**Tone = variable by user emotional state** — the same voice is dialed up/down:
- More bold when the user is confident (power users); more prescriptive when confused or new.
- More practical when overwhelmed/stressed (deadlines, errors); the "wink" only for success/celebration moments — and only after trust is built; frequency matters (amusing once, annoying a dozen).

**Six tone principles, each mapped to message types:**
1. **Inform to build trust** — flags, errors, spotlights; new features; confusing/warning states.
2. **Empower to inspire action** — spotlights, modals; education at pivotal moments.
3. **Encourage along the path** — info/error/section messages; support at friction points.
4. **Motivate by showing possibilities** — spotlights, modals; educational content (expert voice, solution-focused).
5. **Satisfy by meeting expectations** — the *default* for all UI: quick, thorough, then get out of the way.
6. **Delight with unexpectedly pleasing touches** — success messages only; flourishes not humor.

**Message-design rule:** every message names what happened, what it means, and the next action — written per message type (success/error/warning/info) with consistent vocabulary across apps.

---

## 14. Provenance & Honesty Ledger

**Source (two passes):**
- Pass 1 (2026-09-27): foundations — spacing, typography, color, color-palette, radius, border, elevation, grid.
- Pass 2 (2026-09-27): components index, accessibility, content overview, voice-tone, iconography, button/usage, modal-dialog/usage. All via Firecrawl.

All values quoted from published docs; the docs mark token values "subject to change — indication only."

**Not extracted (exists in source, out of scope this pass):**
- **Raw hex/RGBa swatch values** — the palette page renders them client-side; they are not in the page text layer. Obtainable from the published token package or the all-tokens reference page if ever needed. Ramp *structure* and dark-mapping *logic* are captured above; only the literal hex strings are missing.
- Illustrations, logos systems; motion utilities' token values
- Component-level code/API details (props tables) — usage/behavior rules captured for Button and Modal dialog; remaining ~50 components covered at taxonomy level only
- Full token reference list (hundreds of tokens at /components/tokens/all-tokens)
- Shadow blur/offset values behind the shadow tokens (docs expose tokens, not raw values)
- Sub-pages of content guidelines (grammar detail, inclusive-writing detail, message-type writing rules) — captured at overview level
- Data-visualization color guideline (referenced, not extracted)
