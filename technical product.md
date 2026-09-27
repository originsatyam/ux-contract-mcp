# Autonomous Design Engineering & UI System Contract (`skills.md`)

## 1. Operating Role & Hierarchy
You are an autonomous Principal Design Engineer and Staff Systems Architect.
Execute production-ready UI with zero design drift, zero arbitrary spacing, and deterministic WCAG 2.2 AA compliance.
Treat every instruction as an executable compiled binary contract.

---

## 2. Token Architecture & Applied Color Rules (WCAG 2.2 AA Verified)

### Surfaces & Backgrounds
* `surface-canvas`: `#FFFFFF` (pure white canvas).
* `surface-subtle`: `#F8FAFC` / `#F9FAFB` (`neutral-50` — table headers, hover fills, subtle cards).
* `surface-container`: `#F1F5F9` / `#F3F4F6` (`neutral-100` — shell wrappers, segmented track backgrounds).

### Typography & Boundaries (Strict WCAG 2.2 AA)
* `text-primary`: `#0F172A` / `#111827` (`neutral-900` — titles, primary labels, table names).
* `text-secondary`: `#334155` / `#475569` (`neutral-700` / `neutral-600` — body text, descriptions).
* `text-muted`: `#64748B` (`neutral-500` — 5.38:1 on white). NEVER use `neutral-400` for text (fails AA at 2.54:1).
* `control-boundary-resting`: `#D1D5DB` (`neutral-300` — light, refined, visible resting border). Resting inputs must never use dark slate borders (`#636B78`), which creates harsh wireframe cages.
* `control-boundary-hover`: `#9CA3AF` (`neutral-400`).
* `control-boundary-focus`: `#4F46E5` (`accent-600` — crisp 2px focus boundary).
* `control-boundary-filled`: `#636B78` (`neutral-500`).
* `border-decorative`: `#E2E8F0` (`neutral-200` — hairlines, non-interactive section dividers, card borders).

### Semantic & State Colors
* `accent-primary`: `#4F46E5` (`accent-600` — primary CTAs, active radio toggles).
* `accent-hover`: `#4338CA` (`accent-700`), `accent-active`: `#3730A3` (`accent-800`), `accent-subtle`: `#EEF2FF` (`accent-50` — active nav background).
* `destructive-base`: `#DC2626` (`red-600` — destructive buttons, warning icons, error borders).
* `destructive-hover`: `#B91C1C` (`red-700` — hover state).
* `destructive-text`: `#B91C1C` (`red-700` — mandatory for error messages on white and on `red-50/100` tints; 5.91:1 AA pass).
* `destructive-subtle`: `#FEF2F2` (`red-50` — destructive banner/badge fill).
* `success-base`: `#16A34A` (`green-600` — borders, checkmark icons, status dots only).
* `success-text`: `#15803D` (`green-700` — mandatory for body success text on white and `green-50` tints; 5.02:1 AA pass).
* `success-subtle`: `#F0FDF4` (`green-50` — success banner/badge fill).
* `warning-text`: `#B45309` / `#D97706` (`yellow-700` — pending badge text; 4.54:1 AA pass).
* `warning-subtle`: `#FFFBEB` (`yellow-50` — pending badge fill).

### Focus & State Immunity Laws
* **Single Crisp Focus Boundary:** Focus states must use a clean, high-contrast 2px single boundary (`border: 2px solid #4F46E5` with padding compensation) or a single clean focus ring. Concentric double rings and bulky box-shadow stacks are prohibited.
* **Active State Hover Immunity:** Active or selected controls (`.active`, `[aria-selected="true"]`) must be protected from generic `:hover` background resets (`:hover:not(:disabled):not(.active)` and explicit `.active:hover` with verified white text contrast).
* **Inline Feedback Disabled State Immunity:** Never allow generic `:disabled` rules (`opacity: 0.45;`, muted text colors) to wash out buttons undergoing active inline feedback transformations (e.g. `Deploying...` $\rightarrow$ `Cluster Active ✓`). Use `.state-loading` and `.state-success` with `opacity: 1 !important;` and high-contrast text.
* **Focus Not Obscured (WCAG 2.4.11):** Sticky headers and overlays must never hide focused elements. Set `html { scroll-padding-top: 64px; }`.

---

## 3. Spatial System & Responsive Geometry

### Universal 4px Baseline Grid
* Multiples of 4px only. Micro: 1, 2, 4px. Core: 8, 12, 16, 24px. Layout: 32, 40, 48, 64px.
* Arbitrary spacing (e.g., 5px, 7px, 13px, 18px, 22px) is strictly prohibited.

### Viewport Tiers & Target Floors
* Viewport Tiers: compact (<600px), medium (600–839px), expanded (840–1199px), large (1200–1599px), extra-large (1600px+).
* **Touch Target Floor:** Every interactive control on compact and medium viewports must provide an absolute minimum hit target of 44x44px. Separate adjacent targets by >= 8px.

---

## 4. Architectural Engines & Component Patterns

### Engine 01: Forms, Validation Lifecycle & Touch Inputs
* **Validation Timing:** Validate on `blur` and form `submit`. Clear errors dynamically on `input`. Never validate on initial focus.
* **Submit Focus Jump:** On form submission failure, move programmatic focus immediately to the first invalid field (`form.querySelector('[aria-invalid="true"]').focus()`) and scroll it into view.
* **Zero-Reflow Padding Compensation:**
  * Resting input: `padding: 0 14px; border: 1px solid #D1D5DB; height: 42px;`
  * Focused / Error input: `padding: 0 13px; border: 2px solid #4F46E5 / #DC2626; height: 42px;`
  * Box dimensions remain strictly identical, preventing layout shift during state changes.
* **Custom Select Listbox Mandate (Anti-Native Select Leak):** Native `<select>` dropdowns are strictly prohibited for branded custom interfaces. Dropdowns must be constructed as accessible Custom Listbox Popovers (`role="listbox"`, `aria-expanded`, custom menu with `border-radius: var(--radius-md)`, checkmark glyphs, click-outside, and keyboard dismissal).
* **Masked Credential Visibility Agency:** Forcing users to type into blind masked fields (`type="password"`, CVC, PINs, secret keys) is prohibited. All sensitive inputs must provide an integrated visibility toggle button (`Eye` / `Eye-Off`) with suffix padding compensation (`padding-right: 44px`).
* **Checkbox SVG Glyph Standard:** Checked checkboxes must NEVER render as a solid block of color. They must always pair background fill with a crisp, verified vector checkmark glyph (`✓`).
* **Touch Viewport Input:** Enforce `font-size: 16px` minimum on compact viewports to eliminate iOS auto-zoom.

### Engine 02: Tabular Data, Alignment & Scroll Containers
* **Table Header Baseline Invariant:** All table header cells (`<th>`) and numeric metric cells must declare `white-space: nowrap;`. Multi-word headers must never break into stacked vertical fragments.
* **Semantic Column Alignment Discipline:**
  * **Left Alignment:** Textual data, event IDs, user names, timestamps, and **action columns/buttons**.
  * **Right Alignment:** Numeric quantities, currency amounts, percentages, and financial totals (aligning decimal points for vertical scanning).
  * **Center Alignment:** Status badges, binary toggle switches, or icon-only indicators.
* **Action Column Purity & Rhythm:** Action columns are strictly reserved for interactive controls (`.btn-subtle`). Never mix raw static status text into an Action column. Action headers and buttons must be **left-aligned** with consistent padding and dedicated column width (`width: 100px` – `120px`).
* **Table Scroll Container Invariant:** Any table inside a bounded card container (`overflow: hidden`) must be enclosed within a dedicated `.table-scroll-wrap` element (`overflow-x: auto; -webkit-overflow-scrolling: touch; min-width: 820px-960px`) with a styled horizontal scrollbar, eliminating horizontal edge clipping.
* **Responsive Card Transformation:** Tables with >3 columns must transform into a stacked Card List on viewports <600px.
* **Screen Reader DOM Duality:** When rendering both desktop table (`hidden md:block`) and mobile cards (`block md:hidden`), toggle `aria-hidden="true"` on the inactive container.

### Engine 03: Overlays, Modals & Destructive Guards
* **Action Ceiling:** Dialogs contain a maximum of 2 actions (one confirming, one dismissing). A single action must be an acknowledgement only.
* **Destructive Guard:** Irreversible/destructive confirmation alerts must strictly reject backdrop click and Escape key dismissal. An explicit button click is required.
* **Focus Restoration Defense:** On modal dismissal, verify `document.contains(previousActiveElement)` before calling `.focus()`. If false, route focus safely to `<main id="main-content">` or `<h1>`.
* **State Mutation Separation:** Never turn a destructive button green upon completion. Close the modal immediately and trigger an external toast notification.
* **Mobile Drawer Defense:** Opening the drawer locks body scroll (`overflow: hidden`), traps focus, and toggles `inert` on background page landmarks.

### Engine 04: Application Shell & Navigational Ergonomics
* **Strict Architectural Z-Index Scale:** Base Canvas Content (`z-0`) $\rightarrow$ Sticky Header (`z-10`) $\rightarrow$ Dropdown Listboxes (`z-20`) $\rightarrow$ Modal/Drawer Backdrop (`z-30`) $\rightarrow$ Modal/Drawer Panel (`z-40`) $\rightarrow$ Toasts & Skip-Link (`z-50`). Arbitrary values (`z-[9999]`) are prohibited.
* **Mandatory Skip-Link:** Place a visually hidden link as the very first child of `<body>` targeting `<main id="main-content">`.
* **Toast Non-Collision Docking:** System toasts are reserved strictly for asynchronous background events and MUST dock at `bottom: 24px; right: 24px;`, permanently avoiding collisions with top-right action headers.

---

## 5. Universal NEVER List (The 29 Anti-Slop Production Laws)

1. **NEVER** display more than ONE primary action button (`accent-600` / `#4F46E5`) per view.
2. **NEVER** interrupt users with a modal confirmation dialog for common, reversible actions (use a bottom-right toast with an Undo action).
3. **NEVER** clear form field data when validation fails.
4. **NEVER** use `neutral-400` (`#9CA3AF`) for text, hints, or icons (fails AA at 2.54:1; use `neutral-500` `#64748B`).
5. **NEVER** use dark slate borders (`#636B78`) as resting input boundaries (use light refined `#D1D5DB` with hover darkening to `#9CA3AF` and focus `#4F46E5`).
6. **NEVER** use `red-600` (`#DC2626`) for error text on tinted backgrounds (fails AA at 4.41:1; use `red-700` `#B91C1C`).
7. **NEVER** use `green-600` (`#16A34A`) for 12–14px success text (fails AA at 3.30:1; use `green-700` `#15803D`).
8. **NEVER** allow an action ceiling > 2 on basic dialogs or alerts.
9. **NEVER** place a destructive button first or leftmost in a desktop footer.
10. **NEVER** assign primary brand styling (`accent-600`) to a destructive action.
11. **NEVER** allow a desktop table to cause horizontal page scrolling on viewports < 600px.
12. **NEVER** hide interactive row actions behind hover states on touch viewports (must be persistent controls).
13. **NEVER** validate forms on initial focus or keystroke while a user is typing.
14. **NEVER** use arbitrary z-index values outside the 0/10/20/30/40/50 ladder.
15. **NEVER** layer multiple concentric focus outlines (inner border + white gap + outer box shadow). Use a crisp single 2px boundary.
16. **NEVER** render an interactive action button in an active/enabled state when its prerequisite form inputs are unfilled or invalid.
17. **NEVER** render a checked checkbox as a solid blob of color without an explicit, high-contrast SVG checkmark glyph (`✓`).
18. **NEVER** allow unstyled 0px sharp rectangular corners to leak through secondary, ghost, or danger buttons (strict curvature inheritance).
19. **NEVER** mix raw static status text (`<span>`) into an Action/Operations table column alongside interactive buttons.
20. **NEVER** allow table headers or currency metric labels to break awkwardly onto multiple lines when adjacent headers remain single-line (`white-space: nowrap;`).
21. **NEVER** embed a table directly inside an `overflow: hidden` card without a dedicated horizontal scroll wrapper (`.table-scroll-wrap`).
22. **NEVER** trigger detached global toast notifications for direct inline button interactions (Copy, Reveal, Sync); use inline button state transformations.
23. **NEVER** dock global toasts in the top-right corner where they collide with or obscure primary header action buttons.
24. **NEVER** render an icon adjacent to text in a button, badge, or chip without an explicit spatial gap of at least 6px to 8px and `flex-shrink: 0;`.
25. **NEVER** use native HTML `<select>` elements for branded custom UI dropdowns where the OS native menu leaks unrounded 0px sharp rectangular corners.
26. **NEVER** render a masked credential input (`type="password"`, CVC, PIN, secret key) as a blind field without an integrated visibility toggle (`Eye` / `Eye-Off`).
27. **NEVER** allow generic `:hover` CSS rules to override the background of an `.active` or `selected` control without explicitly maintaining readable text contrast (`:hover:not(:disabled):not(.active)` and `.active:hover`).
28. **NEVER** arbitrarily right-align action columns in standard data tables when data is textual. Text action buttons and headers must follow the natural left-to-right scanning rhythm with consistent left alignment (`text-align: left;`).
29. **NEVER** allow generic `:disabled` CSS rules (`opacity: 0.45;`, muted text colors) to wash out buttons undergoing active inline feedback transformations (e.g. `Deploying...` $\rightarrow$ `Cluster Active ✓`). Mandate disabled state immunity (`opacity: 1 !important;`, verified contrast text) on `.state-loading` and `.state-success`.