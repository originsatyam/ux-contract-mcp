# Form Architecture and Validation Contract

## Input Specifications and Zero Reflow Geometry
Form inputs maintain identical box dimensions across all states to prevent layout shift.

### Default State
- Height: 40px (desktop) or 44px (touch viewports)
- Padding: 12px 16px
- Border: 1px solid `#D1D5DB` (`neutral-300` — light, visible gray shade); hover `#9CA3AF`
- Border Radius: 6px
- Font Size: 14px (desktop) or 16px minimum (compact viewports to prevent iOS viewport auto-zoom)
- Background: `#FFFFFF`

### Focus State
- Border: 1px solid `#4F46E5` (`var(--color-primary-600)`)
- Focus Ring Offset: Derived focus radius `focusRadius = elementRadius + 2px` (8px radius for 6px input)
- Focus Ring Shadow: `box-shadow: 0 0 0 2px var(--color-primary-500);` (single crisp accent ring, offset 2px from bounding box, no double outline bloat)
- Padding: 12px 16px (zero reflow compensation)

### Filled State
- Border: 1px solid `#636B78` (`neutral-500`)
- Background: `#F9FAFB` or `#FFFFFF`
- Content: Value populated; indicates completion to user

### Error State
- Border: 2px solid `#DC2626`
- Padding: 11px 15px (compensated for border thickness)
- Error Message: 12px font size, `#B91C1C` (`red-700`), 8px margin above

---

## Validation Lifecycle

### Trigger Timing
- Primary Trigger: Validate on `blur` when user leaves a field.
- Submission Trigger: Validate all fields on form `submit`.
- Recovery Trigger: Clear errors on `input` as user types correction.
- Prohibited: Never validate on initial `focus` or on keystrokes before first blur.

### Error Focus Jump
Upon submission failure:
1. Prevent submission event.
2. Mark fields with `aria-invalid="true"`.
3. Move programmatic focus immediately to the first invalid field:
   `form.querySelector('[aria-invalid="true"]').focus();`
4. Smoothly scroll the invalid input into view.

---

## Action Button State Dependency Lifecycle

### State Synchronization Rule
Submission and verification action buttons must dynamically reflect input completion:
- **Empty / Incomplete Input:**
  - Action button MUST be in a `disabled` state (`disabled` attribute, `opacity: 0.4`, `cursor: not-allowed`).
  - Button styling remains secondary or muted to indicate unavailable action.
- **Filled / Valid Input:**
  - As soon as all required criteria are satisfied (e.g., all 6 PIN digits entered, or required form inputs valid), the button dynamically enables (`disabled = false`, `opacity: 1`).
  - Button promotes to full primary action styling (`#4F46E5`).
- **Real-Time Input Listening:**
  - Verification state must update synchronously across `input`, `keydown` (especially Backspace clearing), and `paste` events.

---

## Specialized Input Controls

### Password Field with Visibility Toggle
- Wrapper: relative container.
- Input Right Padding: 44px (accommodates toggle button without text overlap).
- Toggle Button: 16px icon, `#636B78`, right 12px, vertically centered.
- Interaction: Toggles input type between `password` and `text`, updates `aria-label`.

### PIN and Verification Input
- Anatomy: 4 or 6 discrete input cells.
- Cell Dimensions: Minimum 44px width, 48px height, 8px gap.
- Behavior:
  - Typing a digit fills cell and auto-advances focus to next cell.
  - Backspace on an empty cell deletes previous digit and moves focus back.
  - Pasting a full code distributes digits across cells.
- Attributes: `inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength="1"`.

### Segmented Control
- Usage: 2 to 5 options on compact viewports; up to 7 on expanded views.
- Structure: Container with `#F3F4F6` background, 4px padding, 6px border radius.
- Accessibility: Container has `role="radiogroup"`; segments have `role="radio"`.
- Keyboard Model: Roving `tabindex="0"` on selected item, `tabindex="-1"` on others. Arrow keys move selection.

### Native vs Custom Picker Rule
- Use native `<input type="date">` and `<input type="time">` for standard inputs.
- Native pickers eliminate bundle size, respect device localization, and provide accessible OS wheels.
- Custom calendar pickers are permitted only when range selection or custom day annotations are mandatory.

---

## Selection Controls and Curvature Geometry

### Checkboxes and Radios
- **Touch Footprint:** Minimum 44x44px hit wrapper (`.checkbox-wrap`) enclosing the visual control.
- **Visual Box:** 18x18px with `border-radius: var(--radius-sm)` (4px-6px).
- **Resting State:** `border: 1px solid #D1D5DB; background: #FFFFFF;`.
- **Selected State Mandate:**
  - Must activate primary brand fill (`background-color: #4F46E5; border-color: #4F46E5;`).
  - **MANDATORY CHECKMARK GLYPH:** MUST display an explicit white vector checkmark (`✓`) centered within the box (via SVG data-URI `background-image` or embedded vector element).
  - **PROHIBITION:** Never render a selected checkbox as an empty solid color block without a checkmark glyph.

### Button Curvature Continuity
- **Universal Radius Inheritance:** Every button tier—Primary, Secondary, Subtle/Ghost, Danger, and Inline Action links—must inherit the interface curvature token:
  - Standard buttons and actions: `border-radius: var(--radius-md)` (8px).
  - Compact tags, badges, and micro-actions: `border-radius: var(--radius-sm)` (6px) or `var(--radius-full)` (9999px).
- **Prohibition:** Sub-action buttons (such as "Remove", "Dismiss", or "Cancel") must NEVER revert to default 0px sharp rectangular corners on resting, hover, or focus states.

---

## Inline Button State Transitions and Micro-Feedback Standard

### The Inline Micro-Feedback Principle
Direct micro-interactions must never dispatch detached floating toasts that force eye movement across the screen or obscure navigation headers. Feedback must be contained directly on the button trigger itself.

### Protocol for Common Actions
1. **Copy Action Trigger:**
   - **Transition:** On click, replace copy icon with green checkmark (`✓`), change text to `Copied!`, and apply subtle success tint (`color: #15803D; background: #F0FDF4; border-color: #BBF7D0;`).
   - **Reversion:** Automatically resets smoothly to resting state after 1.8 seconds.
   - **Toast Prohibition:** No floating toast notification permitted.
2. **Sync / Refresh Action Trigger:**
   - **Transition:** On click, button becomes temporarily `disabled`, icon starts spinning (`animation: spin 0.75s linear infinite`), and label updates to `Syncing...`.
   - **Completion:** Swaps to green checkmark (`✓`) with label `Synced!` and green tint for 1.6 seconds.
   - **Reversion:** Resets to active `Sync Events` state.
   - **Toast Prohibition:** No floating toast notification permitted.
3. **Mask / Reveal Action Trigger:**
   - Direct inline text unmasking with semantic button swap between `Reveal` (Eye icon) and `Hide` (Eye-Off icon).
   - Self-evident state change; zero toasts permitted.

---

## Button Icon-to-Text Spatial Separation and Layout Invariant

### The Zero-Collision Standard
An icon placed alongside text inside any interactive element (buttons, chips, badges, tabs) must NEVER collide, crowd, or visually fuse with typography.

### Root Cause of the "AI Slop" Collision
1. **Flexbox Whitespace Stripping:** In flexbox layouts (`display: inline-flex` or `display: flex`), browsers strip out all whitespace text nodes between child elements. Without an explicit `gap`, the vector bounding box sits directly flush against the typography glyphs (0.0px spatial separation).
2. **Fragmented Variant Declarations:** When developers create specialized button classes (`.btn-subtle`, `.btn-ghost`, `.btn-danger-subtle`) separately from `.btn`, they frequently omit `gap` and `border-radius`, causing instant visual defects.

### Mandatory Implementation Invariants
1. **Shared Foundation Architecture:**
   All button classes and variants MUST be grouped together in CSS under a single base rule to guarantee geometric invariants across every variant:
   ```css
   .btn,
   .btn-primary,
   .btn-secondary,
   .btn-subtle,
   .btn-danger-subtle {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     gap: 8px; /* Strict optical separation between icon and label */
     font-family: inherit;
     border-radius: var(--radius-md);
     cursor: pointer;
     transition: all 0.15s ease-in-out;
     outline: none;
     user-select: none;
   }

   .btn svg,
   .btn-subtle svg,
   .btn-danger-subtle svg {
     flex-shrink: 0; /* Prevents icon squashing */
   }
   ```
2. **Spatial Scale:**
   - Standard buttons (height >= 40px): `gap: 8px;`
   - Compact controls and badges (height < 40px): `gap: 6px;` to `8px;`
   - **Absolute Floor:** An icon-to-text gap must NEVER drop below 6px. Under no circumstances may 0px-2px collision be permitted.

---

## Custom Select & Combobox Standard (Anti-Native Select Leak)

### The Native Select Trap
Native HTML `<select>` elements delegate their dropdown option list to the host operating system's window manager (Win32 on Windows, Cocoa on macOS). 
- **The Visual Break:** CSS styling on `<select>` (such as `appearance: none; border-radius: var(--radius-md)`) only applies to the trigger box. When clicked, the OS renders a rigid, unstyled popup window featuring:
  - 0px sharp rectangular corners (violating Rule 18 Curvature Continuity).
  - Harsh default OS blue highlight (`#0060df`).
  - Zero control over padding, shadows, item height, or typography.
  - Complete disruption of the application's polished aesthetic.

### Mandatory Implementation Invariants
For any branded web application or enterprise configuration interface, dropdown selectors must be implemented as **accessible Custom Listbox Components**:
1. **Semantic HTML & ARIA:**
   - Container: `class="custom-select-wrap"` (positioned relative).
   - Trigger: `<button type="button" class="custom-select-trigger" aria-haspopup="listbox" aria-expanded="false">` displaying the current selected label and an SVG chevron that rotates 180° when open.
   - Menu: `<ul class="custom-select-menu" role="listbox">` with `border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--color-neutral-200);`.
   - Options: `<li class="custom-select-option" role="option" aria-selected="true|false">` containing the label and an explicit vector checkmark glyph (`✓`) that renders on the active item.
2. **Behavioral Protocol:**
   - **Click Toggle:** Toggles open/close with CSS micro-fade (`selectMenuFade 0.15s ease`).
   - **Click Outside:** Automatically dismisses when clicking anywhere outside `.custom-select-wrap`.
   - **Keyboard Navigation:** Pressing `Escape` closes the menu and returns focus to trigger; pressing `Enter` or `Space` selects the option.
   - **Zero Native Menus:** Never permit raw `<select>` elements to leak native OS rectangular comboboxes into a custom design system.

---

## Masked Input & Password Visibility Toggle Standard (Zero Blind Fields)

### The Blind Masking Trap
Forcing users to type into masked fields (`type="password"`, CVC, PINs, secret keys) without a visibility reveal toggle causes extreme user frustration:
- Users cannot verify what they typed or catch subtle typos.
- Short codes (such as 3-4 digit card security CVCs) are frequently mistyped when looking back and forth at a physical card or password manager.
- Blind masking increases checkout failure rates and authentication abandonment.

### Mandatory Implementation Invariants
Every password, CVC, PIN, or masked credential field MUST offer an accessible, interactive visibility toggle button:
1. **Container & Suffix Padding Compensation:**
   - The field must be housed in `.input-wrapper { position: relative; display: flex; align-items: center; }`.
   - The input element MUST declare `padding-right: 44px;` (via `.has-suffix` or `.has-suffix-toggle`).
   - Text or bullets typed into the input must NEVER collide with, scroll underneath, or obscure the visibility toggle button.
2. **Toggle Button Specifications:**
   - Rendered as `<button type="button" class="btn-input-toggle" aria-label="Show password / Show CVC">`.
   - Sized at `34px x 34px` with `border-radius: var(--radius-sm)` and centered within the 42px input height (`position: absolute; right: 4px; top: 50%; transform: translateY(-50%);`).
   - Contrast: `color: var(--color-neutral-400);` transitioning to `var(--color-neutral-800)` on hover, with a crisp 2px focus outline.
3. **State Transition Protocol:**
   - Toggling changes `input.type` between `'password'` and `'text'`.
   - Swaps SVG vector seamlessly between open Eye (`👁`) and slashed Eye-Off (`👁‍🗨`).
   - Updates `aria-label` dynamically (`Show CVC` $\leftrightarrow$ `Hide CVC`).
   - Causes zero layout shift, zero vertical reflow, and preserves input focus.

---

## Active Control State Specificity and Hover Contrast Immunity Standard

### The Contrast Inversion Anti-Pattern
When styling interactive control groups (pagination buttons, segment tabs, filter pills, pill toggles), a devastating CSS cascade trap occurs when hover styles are declared broadly:
```css
/* BROKEN IMPLEMENTATION: Causes White-on-White Text Disappearance */
.page-btn:hover:not(:disabled) {
  background-color: var(--color-neutral-100); /* #F1F5F9 (light gray) */
}
.page-btn.active {
  background-color: var(--color-primary-600); /* #4F46E5 (indigo) */
  color: #FFFFFF;
}
```
**Mechanism of Failure:**
1. When `.active` is hovered, `.page-btn:hover:not(:disabled)` matches with equal or higher specificity.
2. The browser overrides `background-color` to light gray (`#F1F5F9`).
3. Because the hover rule does not declare a text `color`, the text remains white (`#FFFFFF`) inherited from `.page-btn.active`.
4. Result: White text on light gray background (1.1:1 contrast ratio). The active page number or tab label becomes completely invisible to the user.

### Mandatory Implementation Invariants
1. **Scope Hover Away from Active Controls:**
   Generic hover rules must explicitly exclude the active/selected state using the `:not(.active)` pseudo-class selector:
   ```css
   .page-btn:hover:not(:disabled):not(.active) {
     background-color: var(--color-neutral-100);
     border-color: var(--color-neutral-400);
   }
   ```
2. **Explicit Active Hover Rule:**
   Active controls must have a dedicated hover rule that deepens or preserves the accent background and explicitly reaffirms white text contrast:
   ```css
   .page-btn.active {
     background-color: var(--color-primary-600);
     border-color: var(--color-primary-600);
     color: #FFFFFF;
     cursor: default;
   }

   .page-btn.active:hover {
     background-color: var(--color-primary-700);
     border-color: var(--color-primary-700);
     color: #FFFFFF;
   }
   ```
3. **Cursor Semantics:**
   Controls that are already selected and active should display `cursor: default;` rather than `cursor: pointer;` unless clicking the active item triggers a specific secondary action (e.g., sorting inversion or deselection).

---

## Inline Button Feedback Disabled State Immunity Standard

### The Disabled Opacity Washout Trap
When implementing inline button micro-feedback (e.g. `Deploying...` $\rightarrow$ `Cluster Active ✓`, or `Copy` $\rightarrow$ `Copied!`), developers routinely set `btn.disabled = true;` to prevent duplicate clicks during the transition.
However, stylesheets commonly declare:
```css
/* BROKEN: Hijacks inline state transitions with opacity washout */
.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  background-color: var(--color-neutral-200);
  color: var(--color-neutral-500);
}
```
**Mechanism of Failure:**
1. Setting `btn.disabled = true` triggers the `:disabled` pseudo-class.
2. The entire button element dims to `opacity: 0.45`.
3. Typography and icons are forced to `#64748B` (`neutral-500`).
4. Any inline or state-driven green/primary background fill becomes a faded, washed-out, translucent smudge with illegible text (severe contrast violation).

### Mandatory Implementation Invariants
1. **Explicit Feedback State Classes:**
   Transitions must be driven by explicit semantic state classes rather than raw JavaScript style mutations:
   - In-flight progress: `.state-loading`
   - Confirmed success: `.state-success`
2. **Disabled Selector Negative Exclusions:**
   Generic `:disabled` rules MUST exclude active feedback states:
   ```css
   .btn-primary:disabled:not(.state-success):not(.state-loading) {
     opacity: 0.45;
     cursor: not-allowed;
     background-color: var(--color-neutral-200);
     color: var(--color-neutral-500);
   }
   ```
3. **Guaranteed 100% Opacity and Contrast on Feedback:**
   The `.state-success` class must explicitly mandate:
   ```css
   .btn.state-success,
   .btn-primary.state-success {
     background-color: var(--color-success-600) !important;
     border-color: var(--color-success-600) !important;
     color: #FFFFFF !important;
     opacity: 1 !important;
     cursor: default !important;
   }
   .btn.state-success svg,
   .btn-primary.state-success svg {
     color: #FFFFFF !important;
     stroke: #FFFFFF !important;
   }
   ```
   This guarantees that success feedback badges remain completely solid, opaque, and crisp with >4.5:1 WCAG contrast throughout the confirmation window.






