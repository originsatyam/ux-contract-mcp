# Pre Flight Quality and Verification Audit Gate

Before delivering any user interface code or design layout, run this deterministic verification checklist. Every failure must be corrected before output.

## Contrast Verification Gate
- [ ] Text Muted Check: Verify that no text uses `neutral-400` (`#9CA3AF`). Confirm captions and muted labels use `#636B78` (`neutral-500`).
- [ ] Control Boundary Check: Verify that resting input boundaries use a light, visible, refined gray shade (`#D1D5DB`, `neutral-300`) with hover darkening to `#9CA3AF`. Confirm active focus uses `#4F46E5` and secondary buttons/filled cells use `#636B78`.
- [ ] Error Text Check: Verify that error text on white or red tints uses `#B91C1C` (`red-700`). Confirm `#DC2626` is restricted to borders and icons.
- [ ] Success Text Check: Verify that success messages use `#15803D` (`green-700`). Confirm `#16A34A` is restricted to icons and status dots.
- [ ] Focus Cleanliness Check: Verify that inputs use clean, crisp single-boundary focus (`border: 2px solid #4F46E5` with padding compensation). Confirm absence of bulky, concentric box-shadow double outlines.

## Spatial Geometry Gate
- [ ] Baseline Grid Check: Verify that all margins, paddings, heights, and gaps are exact multiples of 4px.
- [ ] Arbitrary Value Check: Confirm total absence of 5px, 7px, 13px, 18px, or 22px spacing.
- [ ] Touch Floor Check: Confirm that all interactive touch targets on compact viewports provide at least 44x44px bounding area with at least 8px separation.
- [ ] Mobile Typography Check: Verify that text inputs enforce `font-size: 16px` minimum on viewports under 600px to eliminate iOS zoom on focus.

## Cognitive UX and Behavioral Gate
- [ ] Primary Action Check: Confirm there is strictly ONE primary action button (`#4F46E5`) in the view.
- [ ] Action Button State Check: Verify that action buttons start in a disabled state when inputs are unfilled or incomplete, and dynamically enable into active primary state upon completion.
- [ ] Dialog Ceiling Check: Verify that basic dialogs contain at most two actions (one confirming, one dismissing).
- [ ] Destructive Confirmation Check: Verify that irreversible destructive dialogs reject Escape and backdrop dismissal. Confirm the destructive button is not placed first or leftmost.
- [ ] Forgiveness Check: Confirm common reversible actions trigger an external toast with an Undo action rather than a blocking modal dialog.
- [ ] Zero Reflow Check: Confirm input validation states compensate padding (`12px 16px` at 1px border vs `11px 15px` at 2px border) to maintain a zero-jitter DOM.

## Accessibility and Navigation Shell Gate
- [ ] Skip Link Check: Confirm visually hidden skip link exists as the very first child of `<body>` targeting `<main id="main-content">`.
- [ ] Form Associativity Check: Confirm all inputs have programmatic labels via matching `id` and `for` attributes.
- [ ] Focus Jump Check: Confirm form submission failure automatically focuses the first field with `aria-invalid="true"`.
- [ ] Overlay Inert Check: Confirm modal overlays apply `overflow: hidden` to body and toggle `inert` on background landmarks.
- [ ] Multi Signal Badge Check: Confirm status indicators combine background tint, verified text, and a distinct icon/status dot.
- [ ] Checkbox Glyph Verification: Confirm that every checked checkbox renders an explicit high-contrast vector checkmark glyph (`✓`), never an unadorned solid color square.
- [ ] Curvature Harmony & Anti-Leak Check: Verify that all interactive buttons, ghost actions (e.g., "Remove", "Dismiss", "Cancel"), tags, and badges inherit system curvature tokens (`var(--radius-md)` / `var(--radius-sm)`). Confirm total absence of 0px sharp rectangular corners on resting, hover, or focus.
- [ ] Table Header Baseline Uniformity Check: Confirm all table header cells (`<th>`) and numeric columns declare `white-space: nowrap;` to prevent asymmetrical double-height gap lines.
- [ ] Action Column Purity & Alignment Check: Confirm that Action/Operations columns never contain raw static status text (`<span>`). Confirm all rows share uniform interactive controls (`.btn-subtle`) with identical 36px height, consistent left-alignment under a left-aligned Action header, and dedicated column width (`width: 100px` - `120px`).
- [ ] Table Scroll Container & Anti-Clipping Check: Confirm any table within a bounded card is nested inside a `.table-scroll-wrap` element with `overflow-x: auto;` and explicit table `min-width` (>=820px), preventing right-side column clipping and providing a smooth horizontal scrollbar.
- [ ] Inline Micro-Feedback Check: Confirm that direct micro-interactions (Copy, Reveal, Sync/Refresh) use inline button state transformations (checkmark icon, spinner, color tint, label change) rather than firing detached floating toasts.
- [ ] Toast Non-Collision & Bottom-Dock Check: Confirm any legitimate system toasts are docked at the bottom-right or bottom-center (`bottom: 24px`), preventing collisions or obscuration of top navigation headers.
- [ ] Icon-to-Text Spatial Gap Check: Confirm every interactive element or compound containing an icon and typography (buttons, chips, badges, tabs) enforces `gap: 8px;` (minimum 6px) and `flex-shrink: 0;` on the icon, preventing 0px-2px glyph-to-path collision.
- [ ] Custom Select & Anti-OS-Leak Audit: Confirm all dropdown select menus use custom listbox popovers (`role="listbox"`, `border-radius: var(--radius-md)`, custom option hover/selection styling) and never open unstyled 0px sharp OS native combobox menus.
- [ ] Masked Credential Visibility Toggle Audit: Confirm all password, PIN, CVC, and sensitive secret inputs provide an interactive visibility toggle button with proper padding compensation (`padding-right: 44px`) so users never experience blind typing.
- [ ] Active State Hover Contrast Immunity Check: Confirm that active/selected controls (pagination page buttons, segmented tabs, filter pills) cannot have their background overridden to light gray while text stays white. Confirm presence of `:hover:not(:disabled):not(.active)` and explicit `.active:hover` styling preserving high contrast.
- [ ] Table Column Alignment Discipline Check: Confirm that column text alignment strictly reflects semantic content: left-aligned for textual data, event IDs, timestamps, and Action buttons; right-aligned strictly for numeric quantities and currency amounts to align decimal points.
- [ ] Inline Feedback Button Contrast & Anti-Washout Check: Confirm that buttons undergoing active inline feedback transformations (`.state-loading`, `.state-success`) cannot be dimmed or washed out by `:disabled` CSS rules (`opacity: 0.45;`, muted text colors). Verify that `:disabled` excludes feedback states and that `.state-success` enforces `opacity: 1 !important;` and high-contrast text (`#FFFFFF` on solid green/primary).
- [ ] Sidebar Navigation & Uniform Curvature Check (Rules 30 & 31): Confirm primary navigation with >3 items uses a sticky vertical sidebar. Confirm all nav item buttons maintain uniform 4-corner curvature (`border-radius: var(--radius-md)`) without asymmetric 0px left border lines, and titles render in full without redundant decorative component tags or dot-dot-dot (`...`) truncation.
- [ ] Radii Hierarchy & Derived Focus Ring Check (Rule 32): Verify border-radius complies with element scale (`micro` 2px $\rightarrow$ `controls` 6px $\rightarrow$ `cards` 8px $\rightarrow$ `containers` 12px $\rightarrow$ `avatars` 9999px). Confirm focus rings maintain derived pairing `focusRadius = elementRadius + 2px` (`box-shadow: 0 0 0 2px var(--color-primary-500)`).
- [ ] Actionable Empty State Check (Rule 33): Confirm data tables, logs, and query views render a structured Empty State (Icon + Title + Subtitle + Primary "Reset Search & Filters" CTA) when 0 records match search/filter inputs, avoiding dead zero-height containers or unstyled text.

## Built for Mars UX & Psychology Gate (Rule 34)
- [ ] Progressive Disclosure Ceiling: Confirm no single form section or view renders >7 primary inputs at once without collapsible drawers or progressive disclosure steps.
- [ ] Instant Interaction Acknowledgment: Confirm all clicks acknowledge visual feedback within 100ms.
- [ ] Optimistic UI & Revert Protocol: Confirm async updates reflect immediately in UI and revert gracefully with inline error notifications if server fails.
- [ ] Celebration Animation Calibration: Confirm confetti, modal popups, and badges trigger ONLY on major milestone completion, never on routine settings saves.
- [ ] Inline Auto-Fix & Error Recovery: Confirm form validation errors display inline below the affected field with single-click auto-fix suggestions where applicable.
- [ ] Ethical UX & Action Symmetrical Flow: Confirm cancellation, deletion, and unsubscribe flows require the exact same number of steps as opt-in/creation flows.






