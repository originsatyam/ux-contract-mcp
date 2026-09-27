# Advanced Form Widgets

You are building specialized form inputs for prototypes: date picker, time
picker, stepper, PIN input, select, field group, and file drop.

Use design-tokens.md, input.md, label.md, form-field-group.md, and
validation-logic.md. This file adds widget logic; it does not redefine base
input states or validation.

## Scope

`[extends base: input.md, form-field-group.md, validation-logic.md]`
`[overrides base: design-tokens.md — text colours and control-boundary colours inside
widgets, per token-overrides-a11y.md O1 and O4]`

## Cited Rules

Every widget rule below is traceable. Sources: `rules-apple-hig.md` §6 (text fields) and
§9 (segmented controls); `rules-uber-base.md` §5 (the `Input - *` family);
`rules-wcag-2.2.md`.

| Rule | Source |
|---|---|
| "Use a text field to request a small amount of information, such as a name or an email address." | Apple T1 |
| "Show a hint in a text field to help communicate its purpose." | Apple T2 |
| "Always use a secure text field when your app asks for sensitive data, such as a password." | Apple T3 |
| "To the extent possible, match the size of a text field to the quantity of anticipated text." | Apple T4 |
| "Evenly space multiple text fields." | Apple T5 |
| "Ensure that tabbing between multiple fields flows as people expect." | Apple T6 |
| "Validate fields when it makes sense." | Apple T7 |
| Minimum target **24×24 CSS px** is the AA floor | WCAG 2.5.8 |
| Uber Base ships ten input types (`Text field`, `Select`, `Search`, `Stepper`, `Field group`, `Country`, `Password field`, `PIN code`, `Text area`, `File drop`) | Uber C4 |

**Gap this closes:** base `input.md` defines one text-field type. Nine of Uber's ten had no
rule anywhere in the system before this file. This file does **not** cover `Country` or
`Text area` — those remain uncovered and are marked as such rather than implied.

## Native vs Custom Decision Table (decide first)

| Condition | Use |
|---|---|
| Desktop-only form, no format constraint | Native `<input type="date">` / `<input type="time">` |
| Mobile web | Native inputs (triggers OS picker; less code, familiar) |
| Range needed, or custom format, or design-critical | Custom widget per this file |
| Any count/quantity field with +/− affordance | Stepper per this file |
| Fixed-length secret (PIN, OTP) | PIN input per this file |

NEVER build a custom calendar UI when a native input satisfies the constraint.

## Shared Widget Wrapper (all widgets inherit this)

Identical to base form-field-group.md: label 14px medium neutral-700, 8px gap to
control, helper text 12px neutral-600 at 8px below, error replaces helper on
validation failure, form-group margin-bottom 24px.

Widget chrome: height 40px, 1px **neutral-500** border, radius 6px. All 8 canonical
(`neutral-300` measures 1.47:1 and fails WCAG 1.4.11 as a control boundary — declared
override O4 in `token-overrides-a11y.md`; it stays valid for decorative dividers only.)
states apply per base input.md (default, hover, focus-visible, active, disabled,
loading, error, read-only). Focus is border 2px accent-600 with padding
compensation per base. Error is border 2px red-600 with aria-invalid.

NEVER invent new border colors, heights, or radii for widgets.

## Date Picker

**Anatomy:** trigger input (readonly, shows selected value) + dropdown calendar
panel (width 320px, radius 8px, shadow md, z-index 20).

**Panel structure (use only these):**
- Header row: prev arrow, "Month YYYY" label (14px semibold), next arrow
- Weekday row: 7 columns, 12px medium neutral-600
- Day grid: 7 columns; day cell 40x40px, radius 6px
- Selected day: accent-600 background, white text
- Today: 1px accent-600 border, base text color
- Out-of-month days: **neutral-500** text, and only if genuinely non-interactive
  (`neutral-400` measures 2.54:1 and is not a text colour — `token-overrides-a11y.md` O1)
- Range selection: start/end accent-600; between-days accent-50 background

**Behavior table:**

| Trigger | Action |
|---|---|
| Trigger click / Enter | Open panel, focus selected or today |
| Arrow keys | Move day focus by 1 day (7 with up/down) |
| Enter/Space | Select focused day, close, return focus to trigger |
| Escape | Close, no change, focus returns to trigger |
| Prev/next arrows | Switch month; never lose selected value |
| Disabled date (min/max out of range) | Not focusable, not selectable |

**Validation:** on selection commit (not blur). Out-of-range selection is
prevented, not errored. Helper text states the allowed range.

NEVER allow typing free text into the trigger. NEVER leave the panel open on
outside click — outside click closes it.

## Time Picker

**Anatomy:** trigger input + panel with two scroll columns (hour, minute) or
`<input type="time">` when native is chosen.

**Rules (use only these):**
- Column item height 40px; selected item accent-50 background, accent-600 text
- Minute step: 5 minutes unless the use case requires 1
- Selection commits on item click; panel closes on outside click or Enter
- 12h vs 24h format: match the project locale; helper text shows the format

NEVER mix custom columns with free-text entry in the same control.

## Stepper (quantity)

**Anatomy:** [− button] [value display] [+ button] in one 40px-high row.

- Buttons: 40x40px, secondary button style per button.md; icons 16px
- Value display: min-width 48px, 14px medium, centered, read-only text
- Step logic: value ± step (default 1), clamped to [min, max]
- At min: − disabled. At max: + disabled. (Disabled per button.md, opacity 0.4)
- Label sits above the whole stepper per shared wrapper
- Helper text may show the range: "Between 1 and 10"

NEVER allow manual typing unless you also provide a real input in the display
position; then validation applies on blur per validation-logic.md.

## PIN Input

**Anatomy:** N single-character boxes (default 6; allowed 4 or 6), 40x48px
each, 8px gap, centered 16px semibold text.

**Behavior table:**

| Trigger | Action |
|---|---|
| Type digit | Fill current box, auto-advance to next |
| Backspace on empty box | Move to previous box and clear it |
| Paste full code | Distribute digits across boxes |
| Last box filled | Fire complete event; auto-submit ONLY if the flow states it |
| Invalid on submit | Error per shared wrapper; boxes shake 300ms (base shake rule), focus first box |

**States:** focus ring on the active box only (2px accent-600). Error state:
all boxes 2px red-600 + error text below. Disabled: opacity 0.5, no cursor.
Loading (verifying): boxes read-only, spinner right of the last box.

NEVER use type="password" masking for PIN; use inputmode="numeric",
autocomplete="one-time-code", maxlength 1 per box.

## Select (custom dropdown)

**Anatomy:** trigger (base input chrome, chevron 16px neutral-600 right 12px) +
menu panel (min-width = trigger width, max-height 320px, scroll, radius 6px,
shadow md, z-index 20).

**Rules:**
- Option: height 40px, padding 8px 12px, 14px text; hover neutral-50; selected:
  accent-50 background, accent-600 text, checkmark 16px right-aligned
- Keyboard: Enter/Space opens; arrows move; Enter selects; Escape closes;
  Tab closes and moves on
- Placeholder option reads "Select..." in **neutral-500**, is never a valid value
  (`neutral-400` is not a text colour: 2.54:1, measured)
- Error state per shared wrapper

NEVER put destructive actions inside a select. NEVER nest selects.

## Field Group (related inputs, one error surface)

**Anatomy:** 2–4 inputs sharing one label row and one helper/error row.

- Inputs use base chrome; 8px gap between inputs (16px when unrelated)
- Error on ANY member shows the group-level error text; individual fields also
  get aria-invalid
- Use for: phone parts, card expiry, name parts. NEVER mix unrelated fields
  into a group just to save vertical space

## File Drop

**Anatomy:** dashed 1px **neutral-500** border (control boundary — see O4), radius 6px, padding 48px 24px,
centered 14px text + "Browse" link styled per base links (accent-600).

**Rules:**
- Dragover: border 2px accent-600, accent-50 background
- Selected: file list per base list pattern; each row shows name (14px
  neutral-900) + size (12px neutral-600) + remove ghost button
- Loading: per-row spinner; error: red-600 text below the failing row
- Max size and allowed types belong in helper text BEFORE error happens

NEVER start upload automatically without a visible progress state.

## Segmented Control (2–5 segments)

`[extends base: button.md, form-field-group.md]` — closes a gap Apple covers (S1–S6) and
the base system does not.

Use for closely related choices that affect an object, state, or view. Not for navigation.

- Segments: **2–5 on `compact` tiers**, up to 7 on wide interfaces. NEVER exceed (S3).
- All segments equal width; content similar in size across segments (S4)
- Use **text or icons, never a mix** in one control (S5)
- Labels are nouns or noun phrases (S6)
- One control type only: it either represents selection state or performs actions —
  NEVER both (S2)
- Height 40px desktop / 44px touch; active segment: accent-50 background, accent-600 text
- Keyboard: arrows move between segments, Space/Enter selects, single tab stop (roving tabindex)

NEVER exceed 5 segments on compact — a 6th option means the pattern is wrong; use a select.

## Canonical Example (Stepper)

```html
<div class="form-group">
  <label for="qty">Quantity</label>
  <div role="group" aria-labelledby="qty" style="display:inline-flex; align-items:center; gap:0;">
    <button type="button" aria-label="Decrease quantity" style="width:40px; height:40px;
            background:white; border:1px solid #636B78; border-radius:6px 0 0 6px;">−</button>
    <span aria-live="polite" style="min-width:48px; height:40px; display:flex; align-items:center;
          justify-content:center; border-top:1px solid #636B78; border-bottom:1px solid #636B78;
          font-size:14px; font-weight:500; color:#111827;">1</span>
    <button type="button" aria-label="Increase quantity" style="width:40px; height:40px;
            background:white; border:1px solid #636B78; border-radius:0 6px 6px 0;">+</button>
  </div>
  <span class="helper-text">Between 1 and 10</span>
</div>
```

Inline hex values restate base tokens with the declared override applied: `#636B78` is
proposed `neutral-500` for control boundaries (O4), `#111827` is `neutral-900`. The binding
source remains design-tokens.md; the boundary value is the one override this example needs.
Verified: 5.38:1 against white, passing WCAG 1.4.11.

## If a case is not covered here

Use the base input for the closest field type with standard validation. Do not
invent a new widget.
