```markdown
You are building interaction and motion patterns for UI components.

Use design-tokens.md for all spacing, colors, and sizing values.

## Interaction & Motion Pattern Specifications

### Transition Timing Standards

**Duration values (use only these):**
- **Fast: 150ms** — hover states, simple color changes, focus rings
- **Standard: 200ms** — dropdowns, tooltips, button states, card hover
- **Medium: 300ms** — modals, toasts, drawers, page transitions
- **Slow: 400ms** — complex animations, multi-step transitions

**Never use:**
- < 100ms (too fast to perceive, feels instant)
- > 500ms (feels sluggish, user waits)

**Timing by interaction type:**
- Hover: 150ms
- Click/Active: 100ms or instant
- Focus: instant (0ms, accessibility requirement)
- Dropdown open: 200ms
- Modal open: 300ms
- Toast enter/exit: 300ms
- Loading spinner: 600ms (rotation speed)
- Skeleton shimmer: 1500ms

### Easing Functions

**Standard easing:**
- **ease-out** — user-triggered actions (clicks, hovers, dismissals)
  - CSS: `cubic-bezier(0, 0, 0.2, 1)`
  - Use for: buttons, dropdowns, tooltips opening
  - Feels responsive (fast start, smooth end)

- **ease-in-out** — default for most transitions
  - CSS: `cubic-bezier(0.4, 0, 0.2, 1)`
  - Use for: modals, color changes, size changes
  - Feels smooth both directions

- **ease-in** — system-triggered or closing actions
  - CSS: `cubic-bezier(0.4, 0, 1, 1)`
  - Use for: auto-dismiss, timeouts, closing animations
  - Feels natural for exit

- **linear** — continuous animations only
  - CSS: `linear`
  - Use for: spinners, progress bars, loading animations
  - Constant speed, no acceleration

**Default choice:** ease-out for interactions, ease-in-out for states

### Button Interactions

**Hover state:**
```css
transition: all 150ms ease-out;
```

**Primary button hover:**
- Background: darken by 10% (accent-600 → accent-700)
- Shadow: increase from sm to md (optional)
- Cursor: pointer
- Transition: 150ms ease-out

**Secondary button hover:**
- Background: neutral-50
- Border: neutral-400 (from neutral-300)
- Transition: 150ms ease-out

**Ghost button hover:**
- Background: neutral-100
- Transition: 150ms ease-out

**Active/Pressed state:**
```css
transform: scale(0.98);
transition: transform 100ms ease-out;
```

**All buttons on click:**
- Scale: 0.98 (slight shrink)
- Background: darken by additional 10%
- Transition: 100ms ease-out (faster than hover)
- Return to hover state on release

**Focus state (keyboard):**
```css
outline: 2px solid #4F46E5;
outline-offset: 2px;
transition: none; /* Instant, accessibility requirement */
```

**Specifications:**
- Two-surface contrast (required): the focus indicator must reach 3:1 against BOTH the
  control background and the adjacent surface behind it (WCAG 1.4.11) — a ring that
  shares a colour with either is invisible. Measured: 6.29 on white, 5.71 on
  neutral-100. Re-measure if surfaces change.
- Focus not obscured (required): sticky headers/footers, modal overlays and toasts must
  never entirely hide a focused element (WCAG 2.4.11) — scroll the focused element
  into view instead.

**Disabled state:**
```css
opacity: 0.4;
cursor: not-allowed;
transition: opacity 200ms ease-in-out;
/* No hover or active effects */
```

**Loading state:**
```css
opacity: 0.6;
cursor: not-allowed;
/* Spinner rotation: 360deg in 600ms linear infinite */
```

This 0.6 is element opacity for a loading/busy element — it is NOT a general "muted"
value. Text de-emphasis must be a colour role (text muted, design-tokens.md), never an
opacity.

### Input Field Interactions

**Focus state:**
```css
border: 2px solid #4F46E5;
transition: border-color 150ms ease-out, padding 150ms ease-out;
/* Padding adjusts from 12px/16px to 11px/15px to prevent layout shift */
```

**Specifications:**
- Border color change: 150ms ease-out
- No shadow or glow (clean focus)
- Padding compensation: 150ms ease-out (smooth shift)

**Error state:**
```css
border: 2px solid #DC2626;
transition: border-color 150ms ease-out;
/* Optional: shake animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
animation: shake 300ms ease-in-out;
```

**Specifications:**
- Border color: 150ms ease-out
- Shake (optional): 300ms, 4px horizontal movement
- Use shake sparingly (form submit errors, not every blur validation)

**Placeholder fade:**
```css
::placeholder {
  opacity: 1;
  transition: opacity 150ms ease-out;
}
input:focus::placeholder {
  opacity: 0.5;
}
```

**Password toggle interaction:**
```css
.password-toggle {
  color: #6B7280;
  transition: color 150ms ease-out;
}
.password-toggle:hover {
  color: #374151;
}
```

**Specifications:**
- Icon color change: 150ms ease-out
- No transform or scale (keep icon stable)

### Card Interactions

**Hover state (interactive cards):**
```css
transition: box-shadow 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out;
```

**On hover:**
- Border: neutral-300 (from neutral-200)
- Shadow: md (from sm or none)
- Transform: translateY(-2px) (subtle lift, optional)
- Transition: 200ms ease-out

**Click/Active state:**
```css
transform: translateY(0) scale(0.99);
transition: transform 100ms ease-out;
```

**Non-interactive cards:**
- No hover state
- No cursor change
- No transitions

### Modal/Dialog Animations

**Modal open sequence:**

**Step 1 - Backdrop (overlay):**
```css
/* Initial state */
opacity: 0;

/* Animate to */
opacity: 1;
transition: opacity 200ms ease-out;
```

**Step 2 - Modal content (stagger 50ms after backdrop):**
```css
/* Initial state */
opacity: 0;
transform: scale(0.95) translateY(-20px);

/* Animate to */
opacity: 1;
transform: scale(1) translateY(0);
transition: opacity 200ms ease-out 50ms, transform 200ms ease-out 50ms;
```

**Specifications:**
- Backdrop: fade in, 200ms
- Content: scale + fade + slide up, 200ms, 50ms delay
- Total duration: 250ms

**Modal close:**
- Reverse animation
- Duration: 200ms (slightly faster than open)
- Ease-in (feels natural for closing)

**Focus trap:**
- On open: focus first interactive element (instant)
- On close: return focus to trigger element (instant)
- Tab loops within modal

**Dismiss triggers:**
- Escape key: close with animation
- Backdrop click: close with animation
- Close button: close with animation
- No transition interruption (let animation complete)

### Dropdown/Popover Animations

**Dropdown open:**
```css
/* Initial state */
opacity: 0;
transform: translateY(-8px);

/* Animate to */
opacity: 1;
transform: translateY(0);
transition: opacity 200ms ease-out, transform 200ms ease-out;
```

**Specifications:**
- Fade in + slide down 8px
- Duration: 200ms
- Easing: ease-out
- Origin: top (appears below trigger)

**Dropdown close:**
```css
opacity: 0;
transform: translateY(-8px);
transition: opacity 150ms ease-in, transform 150ms ease-in;
```

**Specifications:**
- Faster close (150ms vs 200ms open)
- Ease-in (feels natural)

**Positioning:**
- Appears instantly at correct position
- Animation is opacity + transform only
- No layout shift

### Toast/Notification Animations

**Toast enter (from right):**
```css
/* Initial state */
opacity: 0;
transform: translateX(100%);

/* Animate to */
opacity: 1;
transform: translateX(0);
transition: opacity 300ms ease-out, transform 300ms ease-out;
```

**Specifications:**
- Slide in from right edge
- Fade in simultaneously
- Duration: 300ms
- Position: fixed, bottom-right

**Toast exit:**
```css
opacity: 0;
transform: translateX(100%);
transition: opacity 250ms ease-in, transform 250ms ease-in;
```

**Specifications:**
- Slide out to right
- Fade out simultaneously
- Faster than enter (250ms)

**Auto-dismiss:**
- Visible duration: 3000ms - 5000ms
- Pause timer on hover
- Resume on mouse leave

**Stacking:**
- Multiple toasts stack vertically
- Gap: 8px
- New toasts push existing ones up
- Transition: transform 300ms ease-out

### Loading Animations

**Spinner rotation:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 600ms linear infinite;
}
```

**Specifications:**
- Duration: 600ms (full rotation)
- Easing: linear (constant speed)
- Infinite loop

**Skeleton shimmer:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1500ms ease-in-out infinite;
}
```

**Specifications:**
- Duration: 1500ms
- Easing: ease-in-out (smooth)
- Gradient moves left to right
- Infinite loop

**Progress bar fill:**
```css
.progress-fill {
  width: 0%;
  transition: width 300ms ease-out;
}
/* Update width via JavaScript */
```

**Specifications:**
- Width transition: 300ms ease-out
- Smooth fill from left to right
- No interruption on rapid updates

**Button loading state:**
```css
.button-loading {
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 200ms ease-out;
}
```

**Specifications:**
- Opacity fade: 200ms
- Disable interaction (pointer-events: none)
- Spinner appears with fade in: 150ms

### Micro-Interactions

**Checkbox check animation:**
```css
@keyframes check-draw {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
.checkbox-icon {
  stroke-dasharray: 16;
  animation: check-draw 200ms ease-out;
}
```

**Specifications:**
- Checkmark draws in from left to right
- Duration: 200ms
- Easing: ease-out

**Toggle switch slide:**
```css
.toggle-circle {
  transform: translateX(0);
  transition: transform 200ms ease-out, background-color 200ms ease-out;
}
.toggle-active .toggle-circle {
  transform: translateX(20px);
}
.toggle-track {
  background: #E5E7EB;
  transition: background-color 200ms ease-out;
}
.toggle-active .toggle-track {
  background: #4F46E5;
}
```

**Specifications:**
- Circle slide: 200ms ease-out
- Track color change: 200ms ease-out (simultaneous)
- Distance: 20px (adjusts based on toggle width)

**Copy button feedback:**
```css
/* Icon swap: copy → checkmark */
.copy-icon, .check-icon {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.copied .copy-icon {
  opacity: 0;
  transform: scale(0.8);
}
.copied .check-icon {
  opacity: 1;
  transform: scale(1);
}
```

**Specifications:**
- Icon fade + scale: 200ms
- Checkmark shows for 2000ms
- Returns to copy icon: 200ms transition

**Ripple effect (optional, Material-style):**
```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.ripple {
  animation: ripple 400ms ease-out;
}
```

**Specifications:**
- Origin: click position
- Duration: 400ms
- Expands and fades out
- Use sparingly (primary actions only)

### Navigation Interactions

**Nav link hover:**
```css
.nav-link {
  color: #6B7280;
  transition: color 150ms ease-out;
}
.nav-link:hover {
  color: #111827;
}
```

**Specifications:**
- Color change: 150ms ease-out
- No underline by default
- Optional underline: border-bottom with 150ms transition

**Active nav indicator (underline/bar):**
```css
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4F46E5;
  transform: scaleX(0);
  transition: transform 200ms ease-out;
}
.nav-link.active::after {
  transform: scaleX(1);
}
```

**Specifications:**
- Underline grows from left to right
- Duration: 200ms ease-out
- Active state: full width

**Tab switch:**
```css
.tab-content {
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}
.tab-content.active {
  opacity: 1;
}
```

**Specifications:**
- Fade out old content: 200ms
- Fade in new content: 200ms
- No slide (just opacity)
- Total: 400ms (sequential)

**Sidebar collapse:**
```css
.sidebar {
  width: 256px;
  transition: width 300ms ease-out;
}
.sidebar.collapsed {
  width: 72px;
}
```

**Specifications:**
- Width transition: 300ms ease-out
- Text fades out: 150ms (faster)
- Icons remain visible
- Smooth width change pushes main content

### Scroll Behaviors

**Smooth scroll:**
```css
html {
  scroll-behavior: smooth;
}
```

**Scroll to element:**
```javascript
element.scrollIntoView({ behavior: 'smooth', block: 'center' });
```

**Sticky header shadow on scroll:**
```css
.header {
  box-shadow: none;
  transition: box-shadow 200ms ease-out;
}
.header.scrolled {
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
```

**Specifications:**
- Shadow appears after 10px scroll
- Transition: 200ms ease-out
- Subtle shadow (sm)

**Back to top button:**
```css
.back-to-top {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

**Specifications:**
- Appears after 300px scroll
- Fade + slide up: 300ms
- Click scrolls to top: smooth behavior

### Link Interactions

**Standard link:**
```css
a {
  color: #4F46E5;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 150ms ease-out;
}
a:hover {
  color: #4338CA;
}
```

**Specifications:**
- Color shift: 150ms ease-out
- Underline always visible (accessibility)
- Offset: 2px (breathing room)

**Link with underline animation:**
```css
a {
  color: #4F46E5;
  text-decoration: none;
  position: relative;
}
a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 200ms ease-out;
}
a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

**Specifications:**
- Underline draws from left on hover
- Duration: 200ms ease-out
- Use for: navigation, less critical links

### List & Table Interactions

**Table row hover:**
```css
tbody tr {
  transition: background-color 150ms ease-out;
}
tbody tr:hover {
  background-color: #F9FAFB;
}
```

**Specifications:**
- Background fade: 150ms ease-out
- Subtle neutral-50 background
- Cursor: default (unless entire row is clickable)

**List item hover:**
```css
.list-item {
  transition: background-color 150ms ease-out;
}
.list-item:hover {
  background-color: #F9FAFB;
}
```

**Clickable row/item:**
```css
.list-item.clickable {
  cursor: pointer;
  transition: background-color 150ms ease-out, transform 100ms ease-out;
}
.list-item.clickable:hover {
  background-color: #F3F4F6;
}
.list-item.clickable:active {
  transform: scale(0.99);
}
```

### Accordion/Collapse Interactions

**Accordion expand:**
```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-out;
}
.accordion-content.open {
  max-height: 1000px; /* Large enough for content */
}
```

**Chevron rotate:**
```css
.accordion-icon {
  transform: rotate(0deg);
  transition: transform 200ms ease-out;
}
.accordion.open .accordion-icon {
  transform: rotate(180deg);
}
```

**Specifications:**
- Content expand: 300ms ease-out
- Icon rotate: 200ms ease-out (slightly faster)
- Use max-height (not height: auto, can't transition)

### Form Submission Flow

**Submit button sequence:**
1. Click: scale(0.98), 100ms
2. Loading state: opacity 0.6, spinner fade in, 200ms
3. Success: checkmark icon swap, 200ms
4. Reset or redirect: 1000ms delay

**Form disable on submit:**
```css
form.submitting {
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 200ms ease-out;
}
```

**Success banner slide in:**
```css
.success-banner {
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}
.success-banner.show {
  transform: translateY(0);
  opacity: 1;
}
```

### Usage Rules

**Transition speeds:**
- Instant (0ms): Focus states, keyboard interactions
- Fast (150ms): Hovers, simple color changes
- Standard (200ms): Most interactions, dropdowns, cards
- Medium (300ms): Modals, toasts, page transitions
- Never exceed 400ms for user-triggered actions

**Easing:**
- Default: ease-out (responsive feel)
- State changes: ease-in-out (smooth)
- Exits/closes: ease-in (natural)
- Continuous: linear (spinners, progress)

**Performance:**
- Animate transform and opacity only (GPU-accelerated)
- Avoid animating: width, height, top, left, margin (causes reflow)
- Use transform: translateX/Y instead of left/right
- Use transform: scale instead of width/height
- Use opacity instead of visibility transitions

**Accessibility:**
- Respect prefers-reduced-motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- Focus states: always instant (no transition)
- Keyboard interactions: no delays
- Screen reader announcements: no animation dependencies

**Interaction feedback:**
- Every click/tap must have visual feedback (scale, color change, or ripple)
- Hover states required for interactive elements (except touch-only)
- Focus indicators: 3:1 against two surfaces — control background AND adjacent surface
  (WCAG 1.4.11); see design-tokens.md → Focus Indicators
- Focus not obscured: never entirely hide a focused element under sticky bars, overlays
  or toasts (WCAG 2.4.11)
- Loading states required for actions > 300ms
- Success confirmation required for destructive actions

**State transitions:**
- Disabled → Enabled: 200ms opacity
- Error → Valid: 150ms border color
- Empty → Loading: 200ms skeleton fade in
- Loading → Success: 200ms content fade in

Generate interactions and animations using these patterns with proper timing, easing, and performance.
```