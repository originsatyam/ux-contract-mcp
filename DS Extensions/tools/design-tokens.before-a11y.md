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
- neutral-300: #D1D5DB (border default)
- neutral-400: #9CA3AF (text muted)
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
- red-600: #DC2626 (text, border)
- red-700: #B91C1C (hover)

### Success (confirmation, positive)
- green-50:  #F0FDF4 (background)
- green-600: #16A34A (text, border)
- green-700: #15803D (hover)

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
- 0.4 → Disabled state
- 0.5 → Disabled secondary
- 0.6 → Muted elements
- 0.8 → Hover overlays