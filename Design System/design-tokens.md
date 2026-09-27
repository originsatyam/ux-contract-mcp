# Design System Tokens

## Spacing Scale
Base unit: 8px

Values (use only these):
- 4px  → 0.5 unit (tight internal spacing)
- 8px  → 1 unit (minimum gap)
- 16px → 2 units (comfortable internal padding)
- 24px → 3 units (section separation)
- 32px → 4 units (major section breaks)
- 40px → 5 units (page-level spacing)
- 48px → 6 units (hero sections)

## Typography Scale

Font family: System sans-serif stack
(Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)

Sizes (use only these):
- 12px → Small text (captions, helper text, error messages)
- 14px → Base text (labels, body, input text)
- 16px → Emphasis (button text, links, subheadings)
- 20px → Section headers
- 24px → Page titles
- 32px → Hero headings

Weights:
- 400 → Regular (body text)
- 500 → Medium (labels, button text)
- 600 → Semibold (headings, emphasis)

Line heights:
- 1.0 → Tight (large headings)
- 1.2 → Headings
- 1.5 → Body text, inputs, buttons

## Color System

### Neutral (grays)
- neutral-50:  #F9FAFB (background subtle)
- neutral-100: #F3F4F6 (background)
- neutral-200: #E5E7EB (border subtle)
- neutral-300: #D1D5DB (divider / decorative border ONLY — never a control boundary)
- neutral-400: #9CA3AF (disabled + decorative ONLY — 2.54:1, never a text colour)
- neutral-500: #636B78 (text muted; and control boundaries — inputs, secondary buttons)
- neutral-600: #4B5563 (text secondary)
- neutral-700: #374151 (text primary)
- neutral-900: #111827 (text high emphasis)

### Accent (primary brand)
- accent-50:  #EEF2FF (background tint)
- accent-100: #E0E7FF (background light)
- accent-600: #4F46E5 (default state)
- accent-700: #4338CA (hover state)
- accent-800: #3730A3 (active/pressed state)

### Error (validation, destructive)
- red-50:  #FEF2F2 (background)
- red-100: #FEE2E2 (subtle background)
- red-600: #DC2626 (border, icon, large text ONLY — fails AA as normal text on red-50/red-100)
- red-700: #B91C1C (error text — required on red-50 and red-100; also hover)

### Success (confirmation, positive)
- green-50:  #F0FDF4 (background)
- green-600: #16A34A (border, icon, large text ONLY — 3.30:1 on white, fails AA as normal text)
- green-700: #15803D (success text for 12–14px messages; also hover)

## Border Radius
- 4px  → Tight (small elements, badges)
- 6px  → Standard (inputs, buttons, cards)
- 8px  → Medium (larger cards)
- 12px → Loose (modals, containers)

## Shadows (use sparingly)
- sm: 0 1px 2px rgba(0,0,0,0.05) → Subtle lift
- md: 0 4px 6px rgba(0,0,0,0.07) → Cards, dropdowns
- lg: 0 10px 15px rgba(0,0,0,0.1) → Modals, overlays

## Opacity Values

Two separate mechanisms. Never substitute one for the other, and never apply both to
the same component in the same state (double-dimming).

### Element opacity — the element itself is drawn translucent
- 0.4 → Disabled state
- 0.5 → Disabled secondary
- Text de-emphasis is NOT opacity: use the text-muted colour (neutral-500). Opacity
  over an uncontrolled background produces an unverifiable contrast ratio.

### State-layer opacity — translucent overlay painted over a component in a state
- 0.08 → Hover
- 0.12 → Focused
- 0.12 → Pressed
- 0.38 → Disabled (state-layer mechanism; do not combine with element opacity 0.4)

Adopted from Material 3 state layers (fetched 2026-09-25). A state must carry TWO
visual indicators; a state layer alone is not sufficient.

## Focus Indicators

**Two-surface rule:** a focus ring sits between the control and the surface behind it,
so it must reach 3:1 against BOTH — (a) the control's own background and (b) the
adjacent surface behind the ring. A ring that shares a colour with either neighbour is
invisible. Re-measure whenever a surface or control background changes.

Declared indicators, measured on the two standard surfaces:

| Focus indicator | vs white | vs neutral-100 |
|---|---|---|
| accent-600 (default ring) | 6.29 ✓ | 5.71 ✓ |
| #0A5CFF (input.md legacy) | 5.27 ✓ | 4.79 ✓ |

**Focus not obscured:** a focused element must never be entirely hidden by
author-created content — sticky headers, sticky footers, modal overlays or toasts
(see the z-index layers in layout-patterns.md). Scroll the focused element into view
above any fixed layer instead of letting it hide.

Ring geometry and colour remain as specified per component (button.md, input.md,
interaction-motion-patterns.md); this section governs contrast and obscuring only.