# Input Field Component

## Base Specifications

**Dimensions:**
- Height: 40px
- Padding horizontal: 16px
- Padding vertical: 12px (derived from height)
- Border radius: 6px

**Typography:**
- Font size: 14px
- Font weight: 400 (regular)
- Line height: 1.5
- Text color: neutral-900 (#111827)
- Placeholder color: neutral-400 (#9CA3AF)

**Layout:**
- Display: block
- Width: 100% (of parent container)

---

## States & Border Widths

**Default state:**
- Background: white
- Border: 1px solid neutral-300 (#D1D5DB)
- Text color: neutral-900
- Placeholder: neutral-400

**Focus state:**
- Border: 2px solid custom accent `#0A5CFF` — all four sides
- Outline: none (no browser default outline)
- Background: white (maintained)

**Error state:**
- Border: 2px solid red-600 (#DC2626) — all four sides
- Background: white
- Text color: neutral-900 (maintained)

**Disabled state:**
- Background: neutral-50 (#F9FAFB)
- Border: 1px solid neutral-200 (#E5E7EB)
- Text color: neutral-400
- Opacity: 0.5
- Cursor: not-allowed

**Read-only state:**
- Background: neutral-50
- Border: 1px solid neutral-200
- Cursor: default
- Text color: neutral-700

---

## Associated Elements

### Label (above input)
- Font size: 14px
- Font weight: 500 (medium)
- Text color: neutral-700 (#374151)
- Spacing: 8px below label (gap to input)
- Display: block

**Required indicator:**
- Add asterisk (*) after label text
- Color: red-600
- No additional spacing

### Helper Text (below input)
- Font size: 12px
- Font weight: 400 (regular)
- Text color: neutral-600 (#4B5563)
- Spacing: 8px above helper text (gap from input)
- Display: block

### Error Text (below input)
- Font size: 12px
- Font weight: 500 (medium)
- Text color: red-600 (#DC2626)
- Spacing: 8px above error text (gap from input)
- Display: block
- Icon optional: warning/error icon 12px, 4px gap before text
- **Note:** Error text replaces helper text (not shown simultaneously)

---

## Input Types

### Text Input
- Type: `text`
- Validation: on blur
- Placeholder: e.g., "Enter text"

### Email Input
- Type: `email`
- Validation: on blur
- Pattern: standard email regex
- Placeholder: e.g., "you@example.com"
- Error message: "Please enter a valid email address"

### Password Input
- Type: `password`
- Validation: on blur
- Min length: 8 characters
- Placeholder: e.g., "••••••••" (Added to prevent missing label states)
- Toggle visibility option: show/hide icon

**Password toggle icon specs:**
- Position: absolute right 12px, vertically centered
- Icon size: 16px
- Color: neutral-400
- Hover color: neutral-600
- Padding adjustment: input right padding becomes 44px (to prevent text overlap)

---

## Spacing Context

### Vertical spacing (in form groups)
- Label to input: 8px
- Input to helper/error text: 8px
- Between form groups: 24px

### Horizontal spacing
- In multi-column layouts: 16px gap between inputs
- Full-width default (single column forms)

---

## Accessibility Requirements
- `id` on input matches label `for` attribute
- `name` attribute included for form submission
- `type` attribute explicitly defined
- `aria-invalid="true"` when in error state
- `aria-describedby` pointing to helper/error text ID