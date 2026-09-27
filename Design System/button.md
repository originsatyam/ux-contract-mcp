# Button Component

## Base Specifications

**Dimensions:**
- Height: 40px
- Padding horizontal: 24px
- Padding vertical: 12px (derived from height)
- Border radius: 6px
- Border width: 1px (variants may differ)

**Typography:**
- Font size: 16px
- Font weight: 500 (medium)
- Line height: 1.5
- Text alignment: center

**Layout:**
- Display: inline-flex
- Align items: center
- Justify content: center
- Gap between icon and text: 8px (if icon present)

---

## Variant: Primary

**Purpose:** Main call-to-action, highest emphasis

**Default state:**
- Background: accent-600 (#4F46E5)
- Text color: white
- Border: none
- Shadow: sm (0 1px 2px rgba(0,0,0,0.05))

**Hover state:**
- Background: accent-700 (#4338CA)
- Shadow: sm (maintained)
- Cursor: pointer

**Active/Pressed state:**
- Background: accent-800 (#3730A3)
- Shadow: none

**Disabled state:**
- Background: accent-600 (#4F46E5)
- Opacity: 0.4
- Cursor: not-allowed
- No hover effects

**Focus state:**
- Outline: 2px solid accent-600
- Outline offset: 2px

---

## Variant: Secondary

**Purpose:** Secondary actions, medium emphasis

**Default state:**
- Background: white
- Text color: neutral-700 (#374151)
- Border: 1px solid neutral-300 (#D1D5DB)
- Shadow: sm

**Hover state:**
- Background: neutral-50 (#F9FAFB)
- Border: 1px solid neutral-400 (#9CA3AF)

**Active/Pressed state:**
- Background: neutral-100 (#F3F4F6)
- Border: 1px solid neutral-400

**Disabled state:**
- Background: white
- Text color: neutral-400
- Border: 1px solid neutral-200
- Opacity: 0.5
- Cursor: not-allowed

**Focus state:**
- Outline: 2px solid accent-600
- Outline offset: 2px

---

## Variant: Ghost

**Purpose:** Tertiary actions, low emphasis, inline actions

**Default state:**
- Background: transparent
- Text color: neutral-700 (#374151)
- Border: none
- Shadow: none

**Hover state:**
- Background: neutral-100 (#F3F4F6)

**Active/Pressed state:**
- Background: neutral-200 (#E5E7EB)

**Disabled state:**
- Background: transparent
- Text color: neutral-400
- Opacity: 0.5
- Cursor: not-allowed

**Focus state:**
- Outline: 2px solid accent-600
- Outline offset: 2px

---

## Variant: Danger

**Purpose:** Destructive actions (delete, remove, cancel)

**Default state:**
- Background: red-600 (#DC2626)
- Text color: white
- Border: none
- Shadow: sm

**Hover state:**
- Background: red-700 (#B91C1C)

**Active/Pressed state:**
- Background: red-700 (darker if possible, or maintain)

**Disabled state:**
- Background: red-600
- Opacity: 0.4
- Cursor: not-allowed

**Focus state:**
- Outline: 2px solid red-600
- Outline offset: 2px

---

## Width Options

**Default:** Auto width (fits content with 24px horizontal padding)

**Full width:** Width 100% (for mobile forms, modals)
- Use when: Form submissions, mobile layouts, single prominent action

---

## Icon Placement

**Left icon:**
- Icon size: 16px
- Gap after icon: 8px
- Align vertically centered

**Right icon:**
- Icon size: 16px
- Gap before icon: 8px
- Align vertically centered

**Icon only:**
- Width: 40px (square)
- Padding: 12px
- Icon size: 16px
- Icon centered

---

## Usage Rules

**Primary button:**
- Use once per screen/section
- Reserve for main conversion action
- Examples: "Sign in", "Save", "Submit", "Continue"

**Secondary button:**
- Use for alternate paths
- Can appear multiple times
- Examples: "Cancel", "Back", "Learn more"

**Ghost button:**
- Use for low-priority actions
- Table actions, inline edits
- Examples: "Edit", "View details", "Dismiss"

**Danger button:**
- Use only for destructive actions
- Require confirmation for critical operations
- Examples: "Delete account", "Remove user", "Clear data"

---

## Spacing Context

**Between buttons (horizontal):**
- Primary + Secondary: 16px gap
- Multiple secondary: 16px gap

**Between buttons (vertical stack):**
- 16px gap (mobile, modals)

**Below form fields:**
- 24px gap from last input to button

**In button groups:**
- No gap (buttons touch, use border to separate)