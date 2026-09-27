# Mobile and Touch Patterns

You are adapting base patterns for touch screens and small viewports in
prototypes.

Use design-tokens.md, layout-patterns.md, navigation-patterns.md,
data-display-patterns.md, and button.md. This file adds touch-device rules; it
does not redefine desktop behavior.

## Scope

`[overrides base: button.md, input.md, data-display-patterns.md — on touch devices only]`
`[extends base: layout-patterns.md, navigation-patterns.md]`

Override specifics: 44px hit-area rule (vs base 40px heights), 48px primary
button height on mobile forms (vs base 40px), 16px minimum input font size on
touch (vs base input.md 14px — prevents iOS zoom-on-focus). All three apply
ONLY on touch devices; desktop behavior remains the base.

Touch device = primary input is touch (coarse pointer). Detect intent, not just
width: a small window with a mouse is NOT a touch device.

## Touch Targets (override rule, touch devices only)

**Two different minimums exist and both must be stated, or a generator will satisfy one
and violate the other** (`rules-wcag-2.2.md` §1.5):

| Floor | Value | Source | Meaning |
|---|---|---|---|
| Legal minimum | **24×24 CSS px** | WCAG 2.2 AA, SC 2.5.8 | The floor for passing an audit |
| Practice minimum | **44×44 px** | Apple HIG; Uber nav bar 44 iOS / 48 Android | What the rules below require |

Rules:

- Minimum hit area: **44x44px** for every interactive element
- If the visual element is smaller (16px icon, 12px text link), expand the hit
  area with padding to 44x44px; the visual stays the same
- Between adjacent targets: minimum 8px separation
- Primary thumb-reachable actions sit in the bottom third of the screen

NEVER treat 24×24 as sufficient just because it passes the criterion. WCAG itself notes
that "using larger target sizes will help many people use targets more easily".
NEVER shrink a button below its base size on touch. NEVER place two destructive
targets adjacent without 8px+ separation.

## Component Transform Table

| Desktop base | Touch device becomes |
|---|---|
| Hover-revealed row actions (data-display-patterns.md) | Always-visible icon buttons or swipe actions; hover does not exist |
| Dropdown menu (navigation-patterns.md) | Bottom sheet (see modal-dialog-patterns.md) |
| Side drawer | Bottom sheet or full-screen overlay |
| Data table > 3 columns | Card list: primary cell becomes card title, secondary cells become label/value rows |
| Table row hover highlight | 8px vertical padding, 16px gap rows; active/pressed background neutral-100 |
| Tooltip | Tap reveals popover; tap outside dismisses. NEVER rely on hover |
| Inline text link | Underlined, padded to 44px hit area |
| Sidebar + main (layout-patterns.md) | Single column; navigation collapses per navigation-patterns.md mobile rules |
| Button 40px height | 48px height on primary mobile actions (forms, checkout); others stay 40px |

## Gesture Rules (use only these)

| Gesture | Meaning | Where allowed |
|---|---|---|
| Swipe row horizontally | Reveal row actions (edit/delete) | List items with ≥2 actions |
| Swipe down from top | Refresh list | Feeds and dashboards only |
| Drag sheet handle down | Dismiss bottom sheet | Sheets with visible handle |
| Edge swipe from left | Navigate back | Stacked navigation only |
| Long press | Context menu / selection mode | List items and cards, if the app uses it |

NEVER make a gesture the ONLY path to an action; every gesture-backed action
must also exist as a visible button. NEVER use pinch-zoom on app UI.

## Platform Navigation Rules (Apple HIG, cited)

These govern the navigation layer on touch devices. Quotes in `rules-apple-hig.md` §8.

| Rule | Source |
|---|---|
| "Use a tab bar to support navigation, not to provide actions." | TB1 |
| "Make sure the tab bar is visible when people navigate to different sections" — hiding it loses orientation | TB2 |
| "Don't disable or hide tab bar buttons, even when their content is unavailable." If a section is empty, say why | TB3 |
| "Include tab labels to help with navigation." Use single words | TB4 |
| Use a badge for critical new information | TB5 |
| "Avoid applying a similar color to tab labels and content layer backgrounds" | TB6 |
| "Avoid displaying popovers in compact views" — use full screen instead | P7 |

NEVER hide a tab bar to make room for content. NEVER swap a popover in on a compact tier —
that is the pattern P7 forbids and the reason the Component Transform Table sends dropdowns
to bottom sheets.

## Bottom Sheet (mobile modal)

Structure and states follow modal-dialog-patterns.md with these touch deltas:
- Full-width, radius 12px top corners only, grab handle 32x4px neutral-300
  centered 8px from top
- Open: translateY 100%→0 at 300ms ease-out; close: 250ms ease-in
- Dismiss: handle drag, backdrop click, close button
- Content max-height 85vh, scrollable body
- Primary action: full-width button at bottom, safe-area padding below

## Safe Areas and Keyboard

- Respect OS safe areas: no interactive element or critical text inside
  notch/home-indicator zones; add safe-area padding to fixed footers
- Safe-area padding is also a WCAG issue, not only an aesthetic one: a fixed footer that
  covers the focused field violates SC 2.4.11 · Focus Not Obscured (Minimum)
- Keyboard opens: scroll the focused input above the keyboard; never cover the
  focused field; submit button stays reachable or moves into the keyboard
  accessory position
- Input font size: 16px minimum on touch devices (prevents iOS zoom-on-focus)

## Spacing and Density (touch)

- List row minimum height: 48px
- Card padding: 16px on mobile per card-patterns.md
- Vertical rhythm follows the **4px baseline** (`reconciliation-breakpoints-density.md`
  §3): every value is a multiple of 4. The Core tier (8, 12, 16, 24) is where most touch
  spacing lands; the earlier "8px scale, do not invent new values" wording is withdrawn
  because 8px is a preferred rhythm, not a law — Uber Base's own rule is multiples of 4,
  and its 36px gutter is illegal under an 8px unit.
- **Tier names replace hard numbers** (§2 of `reconciliation-breakpoints-density.md`):
  `compact` < 600 · `medium` 600+ · `expanded` / `large` / `extra-large`. This file's
  rules apply on **`compact` and `medium`**. The upper boundary of `medium` is
  brand-variable — 840 (M3), 1024 (base) and 1136 (Uber Base) all exist and none wins.
- The 640 figure previously used here is **withdrawn**: two independent sources place the
  Small→Medium boundary at **600**, and 640 matches a framework default rather than any
design system in the corpus.

## State Matrix (canonical 8, touch-specific notes)

| State | Rule |
|---|---|
| default | Per base component spec |
| hover | Not applicable — never define hover-only affordances on touch |
| focus-visible | Per base; required for external keyboards |
| active/pressed | Background neutral-100 or scale 0.99 at 100ms per base |
| disabled | Per base; disabled targets still occupy space |
| loading | Per base; skeletons preferred over spinners for lists |
| error | Per base; error text must not be hover-revealed |
| read-only | Per base |

## Canonical Example (table → card transform)

```html
<!-- Mobile: 3+ column table becomes a card list -->
<div style="display:flex; flex-direction:column; gap:16px;">
  <div style="background:white; border:1px solid #E5E7EB; border-radius:8px; padding:16px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:14px; font-weight:500; color:#111827;">John Doe</span>
      <span style="padding:4px 8px; background:#F0FDF4; color:#15803D; font-size:12px;
            font-weight:500; border-radius:4px;">Active</span>
    </div>
    <div style="margin-top:8px; font-size:12px; color:#6B7280;">john@example.com</div>
    <div style="margin-top:16px; display:flex; gap:8px;">
      <button style="height:44px; padding:0 16px; background:white; border:1px solid #D1D5DB;
              border-radius:6px; font-size:14px; font-weight:500; color:#374151;">Edit</button>
      <button style="height:44px; padding:0 16px; background:white; border:1px solid #D1D5DB;
              border-radius:6px; font-size:14px; font-weight:500; color:#374151;">View</button>
    </div>
  </div>
</div>
```

Inline hex values restate base tokens (neutral-900, neutral-600, neutral-200,
green-50, green-700, neutral-300, neutral-700) for a self-contained example;
the binding source remains design-tokens.md.

## If a case is not covered here

Use the base desktop pattern without hover-only behavior and ensure a 44px hit
area. Do not invent new gestures or breakpoints.
