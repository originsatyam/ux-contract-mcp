# Technical Insights and System Corrections

## 1. Mistakes Identified and Root Cause Analysis

### Mistake A: Artificial Double Outline on Focus
- **Symptom:** Focused inputs and PIN cells displayed an unnatural, bulky double outline (an inner border, a white separator gap, and an outer box shadow ring).
- **Root Cause:** A rigid, theoretical interpretation of the WCAG two-surface focus contrast rule that layered both a solid `2px` border and a dual-offset `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #4F46E5` onto the same small control.
- **Real-World Reality:** Production user interfaces use clean, crisp single-boundary focus states (`border: 2px solid #4F46E5` with zero-reflow padding adjustment). Double concentric borders create visual clutter and look unpolished.

### Mistake B: Missing Action Button State Lifecycle
- **Symptom:** Action buttons (such as "Verify Token") were rendered in an active/interactive state even when the input was completely empty.
- **Root Cause:** Treating buttons as static elements disconnected from the input completion lifecycle.
- **Real-World Reality:** Critical form and verification actions must dynamically reflect input completion:
  - **Empty / Incomplete State:** The trigger button is in a disabled state (`disabled`, `opacity: 0.4`, `cursor: not-allowed`).
  - **Filled / Valid State:** The button transitions dynamically into the active filled state (`opacity: 1`, interactive, primary styling).
  - **Input Cells State:** Individual input cells must visually reflect empty vs filled states (`#F9FAFB` fill and `#636B78` boundary on fill).

### Mistake C: Over Darkened Resting Input Boundaries
- **Symptom:** Empty PIN cells and form inputs had dark slate borders (`#636B78`), making resting boxes look visually heavy, harsh, and wireframe-like.
- **Root Cause:** Over-indexing on WCAG non-text contrast rules without recognizing that resting default boundaries in real-world interfaces need to be light, refined, and inviting.
- **Real-World Reality:** In production applications (Apple, Linear, Stripe, GitHub), resting inputs use a light, clean, and visible gray shade (`#D1D5DB` / `neutral-300`). They darken to `#9CA3AF` on hover, elevate to high-contrast `#4F46E5` on focus, and deepen to `#636B78` when filled. Resting boundaries should never look like dark cages.

### Mistake D: Checkbox Rendered as Solid Blob Without Checkmark Glyph
- **Symptom:** Selecting a checkbox turned the box into a solid purple square without an inner checkmark (`✓`) icon.
- **Root Cause:** Incomplete CSS styling that changed `background-color` and `border-color` upon `:checked`, but omitted the checkmark SVG data-URI or vector glyph.
- **Real-World Reality:** Universal visual conventions and accessibility require that a selected checkbox displays a distinct checkmark icon. A filled solid block is ambiguous (often perceived as an indeterminate state, a color swatch, or a broken icon render). Checkboxes must always pair background fill with a crisp white checkmark vector.

### Mistake E: Curvature Leak & Sharp Rectangles on Sub-Actions
- **Symptom:** Sub-action buttons ("Remove", "Dismiss", "Remove File to Unblock") displayed sharp 90-degree rectangular corners on hover, clashing harshly with the rounded design system.
- **Root Cause:** Creating specialized button classes (`.btn-danger-subtle`) without inheriting the foundational curvature token (`border-radius: var(--radius-md)`) or relying on raw inline text styles.
- **Real-World Reality:** Curvature consistency is a core pillar of visual polish. If a design language establishes rounded geometry (`6px` / `8px` / `12px`), every interactive element—including ghost actions, danger links, and alert action triggers—must inherit that exact curvature. Sharp corners leaking through secondary elements immediately signal haphazard, unpolished development.

### Mistake F: Table Header Line-Break Gap & Baseline Inconsistency
- **Symptom:** In `image-7.png` and `image-9.png`, the `AMOUNT (USD)` header broke into two lines (`AMOUNT` / `(USD)`), creating an uneven double-height gap line while adjacent headers remained strictly on one line.
- **Root Cause:** Missing `white-space: nowrap;` on table header cells (`<th>`).
- **Real-World Reality:** Table headers define the horizontal structural rhythm of tabular data. When a single column header wraps unexpectedly into two lines, it introduces asymmetrical vertical padding, breaks the baseline alignment of the entire row, and creates visual friction. All tabular header cells and financial figures must enforce `white-space: nowrap`.

### Mistake G: Action Column Semantic Pollution & Misalignment
- **Symptom:** In `image-8.png`, the Action column mixed interactive buttons (`Dispute`) with raw static status text (`Frozen`, `Closed`), causing severe vertical/horizontal misalignment and visual disorder.
- **Root Cause:** Injecting naked text spans into an action column instead of maintaining a uniform interactive control type across every row.
- **Real-World Reality:** In design systems (Stripe, Linear, GitHub), an "Action" column has a strict single responsibility: providing interactive triggers. Status information belongs strictly in the Status column. Furthermore, mixing a 36px rounded button with a 20px naked text span ruins the column's vertical rhythm and right-alignment baseline. Every row in an Action column must render a consistent, uniform control—either a contextual secondary action (e.g. `Review Case`, `Receipt`) or a disabled button (`disabled` with an explanatory title/tooltip).

### Mistake H: Card Overflow Clipping & Missing Table Scroll Container
- **Symptom:** In `image-10.png`, the right edge of the ledger table was horizontally cut off (`ACT`, `Dispu`, `Review Cas`, `Recei`) with no bottom scrollbar, rendering actions partially invisible.
- **Root Cause:** Enforcing `white-space: nowrap;` expanded the table's minimum content width. Because the table was placed directly inside `.card { overflow: hidden; }` without an intermediate horizontal scroll container, the card's boundary clipped the table.
- **Real-World Reality:** In production applications, card containers provide outer rounded shells (`border-radius: var(--radius-lg)`), but any embedded table MUST be wrapped in a dedicated scroll container (`.table-scroll-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }`) paired with an explicit table `min-width: 860px`. This guarantees that when viewports or containers shrink, a smooth, styled horizontal scrollbar appears at the bottom, ensuring zero clipping and 100% column discoverability.

### Mistake I: Intrusive Toast Notification Overuse & Header Obscuration
- **Symptom:** In `image-11.png`, clicking "Sync Events", "Copy Token", and "Reveal" triggered stacked floating toast popups in the top-right corner, obscuring the primary `+ Generate New Key` button and creating eye-tracking disconnect.
- **Root Cause:** Treating all button interactions as global toast triggers rather than providing direct, inline micro-feedback on the clicked element.
- **Real-World Reality:** In production design systems (Linear, GitHub, Stripe), direct user micro-interactions (Copy, Reveal, Sync/Refresh) must NEVER trigger detached floating toasts. Instead, the button itself must transform inline:
  - **Copy Action:** Button icon changes to a green checkmark (`✓`), text changes to "Copied!", and borders tint green, smoothly reverting after 1.8s.
  - **Sync/Refresh Action:** Button spins its icon, text updates to "Syncing...", transitions to "Synced!" with a checkmark, then resets.
  - **Reveal/Mask Action:** Toggles text in-place between masked bullets and plain text while swapping the button between "Reveal" and "Hide" (with eye/eye-off icon).
  - **Toast Placement:** Toasts are strictly reserved for asynchronous background events and must dock at the bottom-right/bottom-center to avoid colliding with top navigation headers.

### Mistake J: Icon-to-Text Spatial Collision & Missing Button Gap
- **Symptom:** In `image-12.png`, icons in subtle buttons ("Reveal", "Copy Token") were mashed directly against their text labels with ~0px-2px separation, looking visually glued and amateur.
- **Root Cause & Technical Mechanics:**
  1. *Flexbox Whitespace Stripping:* In standard inline text flow, HTML whitespace between tags creates a natural ~3px-4px typographic space. However, as soon as `display: inline-flex` or `display: flex` is applied to align icons vertically with text, the browser's CSS Flexbox formatting engine strips all whitespace text nodes between child elements. Without an explicit `gap`, the SVG element's bounding box is placed flush (at exactly 0.0px) against the typography glyphs.
  2. *Class Specialization Fragmentation:* A base `.btn` class had `gap: 8px;`, but specialized variant buttons (`.btn-subtle`, `.btn-danger-subtle`) were declared as standalone classes rather than sharing the foundation rule. When elements in the markup used `<button class="btn-subtle">` instead of combining classes, the base `gap` rule was completely bypassed.
### Mistake K: Native OS Select Menu Leak & Curvature Break
- **Symptom:** In `image-13.png`, clicking the active role selector opened an unstyled, 0px sharp rectangular Windows OS popup with a 1px solid black border and harsh default blue highlight (`#1967d2`), severely breaking design system curvature continuity and aesthetic polish.
- **Root Cause & Technical Mechanics:** Native HTML `<select>` elements delegate their options list popup to the host operating system's window manager (Win32 on Windows, Cocoa on macOS). Standard CSS styling applied to `<select>` (such as `border-radius: var(--radius-md)` or `appearance: none`) only customizes the closed resting trigger; browsers strictly prohibit author CSS from styling the native `<option>` list popup.
- **Real-World Reality & Engineering Standard:** In production design systems (Linear, Stripe, GitHub, Radix UI), native `<select>` tags are strictly prohibited for branded enterprise interfaces. Select menus MUST be implemented as accessible Custom Listbox Popovers (`role="listbox"`, `aria-expanded`, custom popover menu with `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-lg)`, smooth hover states, and embedded checkmark glyphs on the selected item).

### Mistake L: Blind Masked Credential Input (Missing Visibility Toggle)
- **Symptom:** In `image-14.png`, the Security CVC input was strictly masked (`type="password"`, `•••`) without an interactive visibility reveal toggle, forcing the user to type blindly without the ability to inspect or verify the 3-4 digit code.
- **Root Cause & Technical Mechanics:** Setting `type="password"` on an input without wrapping it in a composite component with an integrated `btn-input-toggle` and suffix padding compensation (`padding-right: 44px`).
- **Real-World Reality & Engineering Standard:** In modern checkout and credential flows (Stripe, Apple Pay, 1Password, GitHub), blind input fields are a recognized usability failure. All password, CVC, PIN, and sensitive credential fields must provide an accessible visibility toggle button (`aria-label="Show CVC" / "Hide CVC"`), swapping seamlessly between `type="password"` and `type="text"` with open/slashed eye vector icons and zero layout shift.

### Mistake M: Hover Contrast Inversion on Active/Selected Pagination Controls
- **Symptom:** In `image-15.png`, pagination page button `1` is active/selected (`.page-btn.active`) with purple background (`#4F46E5`) and crisp white text (`#FFFFFF`). In `image-16.png`, hovering over the active button causes the digit `1` to vanish completely into thin air, leaving an empty-looking light gray square.
- **Root Cause & Technical Mechanics:** CSS Specificity and cascade leak. The rule `.page-btn:hover:not(:disabled)` declared `background-color: var(--color-neutral-100);` (#F1F5F9 - light off-white) without scoping out `:not(.active)` and without re-declaring text `color`. Because `:hover:not(:disabled)` matched the active button when hovered, the background switched to light gray `#F1F5F9` while the text color remained `#FFFFFF` inherited from `.page-btn.active`. This created an unreadable 1.1:1 contrast ratio that completely washed out the label.
- **Real-World Reality & Engineering Standard:** In enterprise design systems, active/selected controls must have **active-state hover immunity**. Hovering over an already selected tab, pagination button, or toggle pill must NEVER invert its contrast or downgrade its background to unselected hover gray. It must either:
  1. Maintain its active filled background and white text, optionally deepening slightly (e.g., `#4F46E5` -> `#4338CA`) with `cursor: default;`, OR
  2. Scope unselected hover styling strictly with `:not(.active)`.

### Mistake N: Table Action Column Alignment Disconnect & Scan-Rhythm Disruption
- **Symptom:** In `image-17.png` and `image-18.png`, the table's "Action" column header and its "Inspect" buttons were aligned to the far right edge (`text-align: right; width: 120px;`), creating an awkward floating gap and severe visual disconnect from the rest of the left-aligned table data columns (Event, Actor, Severity, Timestamp).
- **Root Cause & Technical Mechanics:** A common frontend anti-pattern where developers blindly apply `text-align: right` to the terminal table column under the false assumption that all "final columns" should be right-aligned. In reality, right-alignment in data tables is reserved exclusively for numeric, financial, and currency data so decimal points vertically align. Text-based labels and interactive action buttons ("Inspect", "Edit", "View") belong to horizontal reading flow. Pushing them to the far right creates an orphaned action column separated by excessive empty whitespace from the data it operates on.
- **Real-World Reality & Engineering Standard:** In leading enterprise data table standards (Salesforce Lightning Design System, GitHub Tables, Stripe Dashboard, Linear, Vercel), table action columns containing text buttons or button groups are **left-aligned** with consistent cell padding matching preceding columns, with dedicated compact column width (`width: 100px` - `120px`) under a left-aligned "Action" header. This keeps the action trigger in direct visual proximity and scanning rhythm with the row data.

### Mistake O: Disabled Opacity & Contrast Washout on Inline Feedback Buttons
- **Symptom:** In `image.png`, after clicking "Deploy Cluster", the primary button transitioned into its success confirmation state ("Cluster Active ✓") with a green background. However, the button was dimmed to 45% translucent opacity, and the typography/icon rendered in washed-out, illegible gray-purple text with severe contrast failure.
- **Root Cause & Technical Mechanics:** When implementing inline micro-feedback or asynchronous button transitions, frontend developers routinely set `btn.disabled = true;` to guard against duplicate submissions while updating text/colors via JavaScript or inline styles (`btn.style.backgroundColor = 'var(--color-success-600)'`). However, the global CSS stylesheet defined:
  ```css
  .btn-primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background-color: var(--color-neutral-200);
    color: var(--color-neutral-500);
  }
  ```
  Because the button remained in `:disabled` state, the browser's CSS cascade enforced `opacity: 0.45` across the entire button element and applied `color: var(--color-neutral-500)` (muted slate gray). This produced a ghosted, washed-out green button with unreadable gray text that violates WCAG contrast requirements.
- **Real-World Reality & Engineering Standard:** In enterprise design systems (Stripe, GitHub, Linear), buttons undergoing inline state transformations (e.g. `Loading...`, `Copied!`, `Cluster Active ✓`) must possess **Disabled State Immunity**:
  1. Temporary loading or confirmation states must be declared via explicit state classes (`.state-loading`, `.state-success`).
  2. Generic `:disabled` styles must strictly exclude active feedback states: `.btn-primary:disabled:not(.state-success):not(.state-loading)`.
  3. The `.state-success` class must explicitly mandate `opacity: 1 !important;`, `color: #FFFFFF !important;`, `background-color: var(--color-success-600) !important;`, and `cursor: default;`, guaranteeing 100% legibility and high contrast during the entire confirmation window.

### Mistake P: Horizontal Tab Bar Overflow & Hidden Navigation Items
- **Symptom:** In `demo/image-1.png` and `demo/image-2.png`, the 5-module horizontal tab bar overflowed the viewport width. The rightmost tab ("5. Split Settlement Gateway") was clipped off-screen, and a horizontal scrollbar appeared — breaking discoverability and creating a cramped, cluttered appearance.
- **Root Cause & Technical Mechanics:** The `.nav-inner` container used `display: flex; overflow-x: auto;` with all tabs arranged horizontally. Each tab included an SVG icon, full text label, and a badge span. With 5 modules, the combined intrinsic width (~1100px+) exceeded typical viewports. The horizontal scrollbar was subtle and easy to miss, meaning users could never discover the 5th module without intentionally scrolling.
- **Real-World Reality & Engineering Standard:** In enterprise console design systems (AWS Console, GCP Cloud Console, Vercel Dashboard, Linear), when primary navigation exceeds 3–4 items or risks horizontal overflow, it must be converted to a **persistent vertical sidebar**. Sidebar navigation:
  1. **Full visibility** — all items are visible without scrolling at any viewport width.
  2. **Scalability** — adding future modules doesn't break layout or require a redesign.
  3. **Spatial hierarchy** — sidebar creates a clear left-to-right separation between navigation (structure) and content (substance).
  4. **Reduced cognitive load** — vertically stacked items follow natural top-to-bottom scanning patterns.

### Mistake Q: Asymmetric Border Slop & Decorative Tag Crowding (The `...` Ellipsis Cliché)
- **Symptom:** In `demo/image-3.png`, a harsh 3px vertical colored line indicator was affixed to the left margin of the active nav item (`border-left: 3px solid #4F46E5; border-radius: 0 6px 6px 0;`), producing asymmetric unrounded flat left corners and destroying Curvature Continuity. Concurrently, a redundant decorative tag ("Wizard") occupied ~65px of width, forcing the nav title into premature text truncation (`1. Cluster Provi...`).
- **Root Cause & Technical Mechanics:** AI models habitually reproduce an outdated early-2010s "left-edge accent stick" trope that breaks border-radius symmetry (`border-radius: 0 var(--radius-md) var(--radius-md) 0`). Additionally, AI models frequently decorate every nav item with redundant type-tags ("Wizard", "Live Grid", "Tri-State", "Multi-Currency") that cannibalize container width, triggering `text-overflow: ellipsis` on titles that would otherwise fit effortlessly without truncation.
- **Real-World Reality & Engineering Standard:** Modern tier-1 enterprise consoles (Linear, Stripe Dashboard, GitHub, Vercel, Notion) enforce:
  1. **Flawless 4-Corner Curvature Continuity:** Nav buttons maintain uniform rounded corners on all four sides (`border-radius: var(--radius-md)`). Zero vertical edge-line sticks on the margin.
  2. **Cohesive Tinted Pill Active State:** Active state is communicated via soft, high-contrast container fills (`var(--color-primary-50)`) with deep brand typography (`var(--color-primary-700)`), keeping geometry clean and balanced.
  3. **Tag-Free Nav Item Purity:** Navigation items are clean, readable links. They do NOT contain decorative category tags labeling what type of UI component they open.
  4. **Unabbreviated Title Visibility:** Without redundant decorative tags, titles ("Cluster Provisioning", "Audit Ledger & Events", "Permissions Matrix", "Settlement Gateway") render completely without clumsy dot-dot-dot (`...`) truncation.
  5. **Functional Counter Discipline:** Badges are strictly reserved for functional alerts or notification counters (e.g. `1` pending issue), which cleanly auto-hide when resolved.

---






## 2. Key Learnings Extracted

1. **Focus Cleanliness over Box-Shadow Bloat:**
   - Accessibility contrast does not require stacking multiple concentric outlines. A single high-contrast `2px` border in `#4F46E5` (6.29:1 contrast ratio against white) satisfies WCAG compliance cleanly without artificial double rings.

2. **Strict State Synchronization:**
   - No interactive submission button should be actionable when its prerequisite inputs are unfilled. State is not an afterthought; it is a foundational component of design engineering.

3. **Resting Light Gray vs Interactive Contrast:**
   - Default resting input boxes must feel light, natural, and visible (`#D1D5DB`). Darkening resting borders to dark slate creates an aggressive, heavy aesthetic. Contrast belongs on the interactive states (hover `#9CA3AF`, focus `#4F46E5`, filled `#636B78`, error `#DC2626`).

4. **Multi-Stage State Pipeline:**
   - Every input system must handle four distinct chronological states:
     - `Empty`: Light visible gray boundary (`#D1D5DB`), disabled trigger button.
     - `Active Focus`: Single clean accent boundary (`#4F46E5`).
     - `Filled`: High-contrast filled state (`#636B78`), enabled trigger button.
     - `Error`: High-contrast error boundary (`#DC2626`) with zero reflow.

5. **Universal Glyph Verification for Selection Controls:**
   - Checkboxes and radios cannot rely solely on color or fill changes. A checked checkbox MUST render an unambiguous, high-contrast checkmark vector (`✓`), ensuring immediate recognition regardless of color perception.

6. **Strict Curvature Continuity (Anti-Leak Rule):**
   - Curvature is not a per-element decoration; it is a global geometric invariant. Every interactive trigger—including ghost buttons, danger actions, and embedded alert actions—must inherit the system's curvature token (`var(--radius-md)` / `var(--radius-sm)`). Unstyled 0px rectangles breaking into a rounded layout are strictly prohibited.

7. **Table Header Baseline Uniformity (Zero Gap-Line Rule):**
   - Multi-word column headers must never break into stacked vertical fragments while neighboring columns remain single-line. Mandate `white-space: nowrap;` across all table headers (`<th>`) and tabular data cells (`<td>`) to protect the structural grid baseline.

8. **Action Column Purity and Uniform Affordance:**
   - Mixing naked static text ("Frozen", "Closed") into an Action/Operations column violates single responsibility, confuses the user, and shatters the vertical alignment rhythm. Every cell in an Action column must offer a consistent interactive control—either a contextual secondary button (`Review Case`, `Receipt`) or a disabled button (`disabled` with title), maintaining 100% geometric alignment.

9. **The Table Scroll Container Mandate (Zero Overflow Clipping):**
   - Applying `white-space: nowrap;` preserves text baseline integrity, but inherently increases table intrinsic width. When a table sits directly inside an `overflow: hidden` card, the table edges get clipped without recourse. Tables must ALWAYS be wrapped in a dedicated `.table-scroll-wrap` (`overflow-x: auto; -webkit-overflow-scrolling: touch;`) paired with a defined table `min-width: 860px` and styled scrollbar, ensuring smooth left-to-right discovery on any screen size.

10. **The Inline Micro-Feedback Principle (Zero Floating Toast Pollution):**
   - Direct interactive operations (Copy, Reveal, Sync/Refresh) must NEVER trigger floating toasts that jump across the screen or obscure navigation headers.
   - Feedback must occur **inline directly on the trigger itself**:
     - Copy buttons transition to a green checkmark (`✓`) and "Copied!" for 1.8s.
     - Refresh/Sync buttons spin their icon, show "Syncing...", and briefly display "Synced!" before resetting.
     - Mask toggles switch between "Reveal" and "Hide" with direct visual text unmasking.
   - Toasts are restricted strictly to asynchronous background events and must dock at `bottom: 24px; right: 24px;` so they never cover top-right primary actions.

11. **Icon-to-Text Spatial Separation (Zero Collision Invariant):**
    - An icon placed next to text inside any interactive element (buttons, chips, badges, tabs) must ALWAYS declare a mandatory `gap` property (`gap: 6px` for compact/subtle controls, `gap: 8px` for standard/large controls) along with `svg { flex-shrink: 0; }`. Never allow icons to touch, smash, or crowd typography.

12. **The Custom Listbox Mandate (Anti-Native Select Leak):**
    - Native HTML `<select>` elements are forbidden in polished design systems because the `<option>` menu is delegated to the operating system's window manager, producing unrounded 0px sharp rectangular popups with arbitrary system blue highlights. Dropdowns must be constructed as accessible Custom Listbox Popovers (`role="listbox"`, `aria-expanded`, `border-radius: var(--radius-md)`, custom hover/active checkmarks) to preserve 100% design system continuity.

13. **Zero Blind Masking & Credential Visibility Agency:**
    - Forcing users to type into masked fields (`type="password"`, CVC, PINs, secret keys) without a visibility reveal toggle is a critical usability failure. Users must always have the agency to reveal and verify what they typed. All masked credential fields must provide an integrated, accessible visibility toggle button (`Eye` / `Eye-Off`) paired with suffix padding compensation (`padding-right: 44px`) so text never collides with the button.

14. **Active State Contrast Immunity (Specificity Leak Prevention):**
    - Active/selected interactive controls (`.active`, `aria-selected="true"`) must be shielded from generic `:hover` background resets. When designing hover states on button lists, tabs, or pagination controls, ALWAYS exclude active elements (`:hover:not(:disabled):not(.active)`) and explicitly specify `.active:hover { background-color: var(--color-primary-700); color: #FFFFFF; }`. Never allow a hover rule to change background to light gray while preserving white text, which destroys legibility.

15. **Table Column Alignment Discipline & Semantic Scan-Rhythm:**
    - Alignment in data tables must follow semantic data types:
      - **Left Alignment:** Text data, event codes, user identifiers, timestamps, and **action buttons/triggers**.
      - **Right Alignment:** Numeric quantities, currency amounts, percentages, and financial totals (to align decimals and digits for vertical scanning).
      - **Center Alignment:** Status badges, binary toggle switches, or icon-only indicators.
    - Never blindly apply `text-align: right` to an Action column. Action headers and buttons must be left-aligned in harmonious rhythm with the preceding row data, avoiding orphaned right-edge floating buttons.

16. **Inline Feedback Disabled State Immunity (The Anti-Disabled Washout Principle):**
    - Never allow a button's temporary disabled lock to subject inline progress or success feedback to generic `:disabled` opacity degradation (`opacity: 0.45`) or muted text coloring (`#64748B`).
    - An in-flight or confirmed action is NOT an inactive disabled element; it is an active state notification anchored inside an interactive trigger.
    - Always protect inline feedback states with explicit state classes (`.state-loading`, `.state-success`) that enforce `opacity: 1 !important;` and crisp, verified contrast (`#FFFFFF` text on green/primary fill).

---

## 3. Improvements Applied Across the Contract

1. **Fixed in Live Prototype (`demo/index.html`):**
    - Scoped `.btn-primary:disabled:not(.state-success):not(.state-loading)` and added explicit `.state-success` / `.state-loading` immunity classes enforcing `opacity: 1 !important;`, `color: #FFFFFF !important;`, and `background-color: var(--color-success-600) !important;`. The "Cluster Active ✓" state now maintains 100% solid opacity with verified white contrast.
    - Refactored `handleDeployCluster()`, `handleSaveDraft()`, and `handleVerifyDns()` to toggle `.state-loading` and `.state-success` instead of un-scoped inline style mutations.
    - Added `:not(.active)` exclusion to `.page-btn:hover:not(:disabled)` and explicit `.page-btn.active:hover { background-color: var(--color-primary-700); color: #FFFFFF; cursor: default; }`, permanently eliminating hover contrast washout on active pagination controls.
    - Changed Action column header (`<th>`) and cells (`<td>`) from `text-align: right;` to `text-align: left; width: 110px;`, ensuring unified left-to-right eye tracking and eliminating the awkward floating gap on the table's right edge.
    - Added `white-space: nowrap;` to `.ledger-table th` and `.ledger-table td`, eliminating the gap-line wrapping on `AMOUNT (USD)`.
    - Replaced naked status text in Row 3 and Row 4 with uniform 36px action buttons (`Review Case`, `Receipt`), ensuring perfect horizontal and vertical baseline alignment.
    - Synchronized dynamic dispute submission to preserve uniform action buttons upon status change.
    - Wrapped `table#ledgerTable` in `.table-scroll-wrap` with custom styled horizontal scrollbar and `min-width: 860px` to permanently eliminate right-edge clipping.
    - Eliminated intrusive floating toasts on Sync, Copy, and Reveal buttons in favor of rich inline button state micro-feedback (animated spin, checkmark swap, and green success tint).
    - Relocated legitimate system toasts to bottom-right (`bottom: 24px; right: 24px`) with `slideUp` animation to permanently prevent header button obscuration.
    - Unified `.btn`, `.btn-subtle`, and `.btn-danger-subtle` under a single shared foundation selector enforcing `gap: 8px;`, `border-radius: var(--radius-md);`, and `svg { flex-shrink: 0; }`, permanently eliminating icon-text collision and optical cramping.
    - Replaced native `<select>` dropdown with an accessible Custom Select Listbox (`role="listbox"`, `border-radius: var(--radius-md)`, smooth fade-in popover, checkmark glyphs, click-outside, and keyboard navigation), permanently eliminating the unstyled 0px sharp OS combobox leak.
    - Wrapped Security CVC input in `.input-wrapper` with integrated `.btn-input-toggle` (`padding-right: 44px`), providing seamless Eye / Eye-Off toggling between password masking and plaintext verification without layout shift.

2. **Upgraded in `contract/core.md`:**
    - Added Rule 19 to Universal Never List: NEVER mix raw static status text into an Action/Operations table column alongside interactive buttons.
    - Added Rule 20 to Universal Never List: NEVER allow table headers or currency metric labels to break awkwardly onto multiple lines when adjacent headers remain single-line.
    - Added Rule 21 to Universal Never List: NEVER embed a table directly inside an `overflow: hidden` card without a dedicated horizontal scroll wrapper (`overflow-x: auto`).
    - Added Rule 22 to Universal Never List: NEVER trigger detached global toasts for direct inline button interactions (Copy, Reveal, Sync); use inline state transformations directly on the button trigger.
    - Added Rule 23 to Universal Never List: NEVER dock global toasts in the top-right corner where they can collide with or obscure primary header action buttons.
    - Added Rule 24 to Universal Never List: NEVER render an icon adjacent to text in a button, badge, or chip without an explicit spatial gap of at least 6px to 8px (Zero Icon-Text Collision Rule).
    - Added Rule 25 to Universal Never List: NEVER use native HTML `<select>` elements for branded, custom UI dropdowns where the OS native menu leaks unrounded 0px sharp rectangular corners, arbitrary OS blue selection highlights, and unstyled system typography (Anti-Native Select Leak Rule).
    - Added Rule 26 to Universal Never List: NEVER render a masked credential input (`type="password"`, CVC, PIN, secret key) as a blind field without an integrated visibility toggle (`Eye` / `Eye-Off` icon button) (Password & Secret Visibility Toggle Rule).
    - Added Rule 27 to Universal Never List: NEVER allow generic `:hover` CSS rules to override the background of an `.active` or `selected` control without explicitly maintaining readable text contrast (`:hover:not(:disabled):not(.active)` and `.active:hover`) (Active State Hover Immunity Rule).
    - Added Rule 28 to Universal Never List: NEVER arbitrarily right-align action columns in standard data tables when data is textual. Text action buttons and their headers must follow the natural left-to-right scanning rhythm with consistent left alignment (`text-align: left;`) (Table Action Alignment & Scan-Rhythm Rule).
    - Added Rule 29 to Universal Never List: NEVER allow generic `:disabled` CSS rules (`opacity: 0.45;`, muted text colors) to wash out buttons undergoing active inline feedback transformations (e.g. `Deploying...` $\rightarrow$ `Cluster Active ✓`). Mandate disabled state immunity (`opacity: 1 !important;`, verified contrast text) on `.state-loading` and `.state-success` (Inline Feedback State Immunity Rule).

3. **Upgraded in `contract/forms.md`:**
    - Codified the Inline Button State Transitions & Micro-Feedback Standard.
    - Codified the Icon-to-Text Button Gap Standard (`gap: 6px` - `8px`, `flex-shrink: 0`).
    - Codified the Custom Select & Combobox Standard (Anti-Native Select Leak).
    - Codified the Masked Input & Password Visibility Toggle Standard (Zero Blind Fields).
    - Codified the Active Control State Specificity & Hover Contrast Immunity Standard.
    - Codified the Inline Button Feedback Disabled State Immunity Standard (Anti-Disabled Washout).

4. **Upgraded in `contract/data.md`:**
    - Codified the Table Header Baseline Invariant (`white-space: nowrap;`).
    - Codified the Action Column Purity Standard and Left-Aligned Rhythm Invariant.
    - Codified the Table Scroll Container Invariant (`.table-scroll-wrap` with `overflow-x: auto;` and table `min-width`).

5. **Upgraded in `contract/audit.md`:**
    - Added Checkpoint 21: Table Header Baseline Uniformity Audit.
    - Added Checkpoint 22: Action Column Uniformity & Purity Audit.
    - Added Checkpoint 23: Table Scroll Container & Anti-Clipping Audit.
    - Added Checkpoint 24: Inline Button Micro-Feedback Audit.
    - Added Checkpoint 25: Toast Non-Collision & Bottom-Dock Audit.
    - Added Checkpoint 26: Icon-to-Text Spatial Gap Audit.
    - Added Checkpoint 27: Custom Select & Anti-OS-Leak Audit.
    - Added Checkpoint 28: Masked Credential Visibility Toggle Audit.
    - Added Checkpoint 29: Active State Hover Contrast Immunity Audit.
    - Added Checkpoint 30: Table Column Alignment Discipline & Scan-Rhythm Audit.
    - Added Checkpoint 31: Inline Feedback Button Contrast & Anti-Washout Audit.

---

## 4. Edge Case 4: Batch Document Import & Conflict Resolver
- **Covered Scenarios:**
  - Multi-file status diversity: Queued (`Ready`), In-Flight (`Uploading` with live percentage meter), Server Conflict (`employee-roster.csv` with inline strategy selector), and Policy Blocker (`raw-footage-october.mov` exceeding file limit).
  - Floating Bulk Action Toolbar: Appears contextually when items are checked, strictly honoring the 2-action ceiling (`Deselect All` + `Remove Selected`).
  - Strict Action Button Dependency: Header button remains disabled (`Fix 1 Error to Enable`) until conflicts and errors are resolved, at which point it dynamically transitions into active primary mode.
  - Multi-Signal Status Badges: Implemented with distinct icons, color tints, and explicit text labels.

---

## 5. Edge Case 5: Financial Ledger & Transaction Dispute Engine
- **Covered Scenarios:**
  - **Slide-out Filter Drawer with Multi-Select & Currency Bounds:** Focus trap, body scroll lock, Escape dismissal, and 2-action ceiling (`Reset` vs `Apply Filters`).
  - **Active Filter Chip Bar:** Dynamic pills above table that allow individual or bulk removal with immediate table state recalculation.
  - **Accordion Data Ledger:** Expandable detail rows displaying subtotal breakdown, processing fees, and trace IDs without layout shift.
  - **Dispute Modal with Dynamic Button Synchronization:** Reason textarea requires minimum 20 characters before unlocking the primary `Submit Dispute` button, complete with live character count countdown.
  - **Strict Contract Enforcement:** Light visible gray boundaries (`#D1D5DB`), crisp single-border focus (`#4F46E5`), embedded vector checkmarks (`✓`) on drawer checkboxes, and universal curvature continuity across all secondary and ghost buttons.

---

## 6. Edge Case 6: API Keys & Webhook Delivery Console
- **Covered Scenarios:**
  - **Secret Key Reveal Modal with State Dependency:** Generating a new API key displays a one-time secret token. The primary "Done" button begins disabled and strictly requires the user to acknowledge a confirmation checkbox ("I have saved this secret key in a secure vault") before unlocking.
  - **Table Scroll Container with Anti-Clipping:** The webhook deliveries table is enclosed in `.table-scroll-wrap` (`min-width: 880px`) with a styled horizontal scrollbar, ensuring complete column discoverability without edge cuts.
  - **Single-Line Header Baseline:** All table headers declare `white-space: nowrap;` so no multi-word labels fragment into stacked lines.
  - **Action Column Uniformity:** Every row renders a uniform 36px `.btn-subtle` "Inspect" button right-aligned on an identical baseline.
  - **Sliding Payload Inspector Drawer:** Slide-out drawer with formatted JSON code blocks, status codes, latency badges, and a 2-action ceiling (`Close` secondary vs `Resend Event` primary).

---

## 7. Edge Case 7: RBAC & Tri-State Indeterminate Permissions Matrix
- **Covered Scenarios:**
  - **Tri-State Indeterminate Checkboxes:** Parent module checkboxes dynamically transition between unchecked, checked (`✓` checkmark glyph), and indeterminate (`−` minus bar glyph) based on child permissions state.
  - **Action Button Dirty-State Synchronization:** "Save Role Changes" begins `disabled` and dynamically enables only when permissions differ from the snapshot, returning to disabled once saved or reverted.
  - **Shared Foundation Button Architecture:** `.btn`, `.btn-subtle`, and `.btn-danger-subtle` share a single base rule declaring `gap: 8px;`, `border-radius: var(--radius-md);`, and `svg { flex-shrink: 0; }`.
  - **Table Scroll Container with Anti-Clipping:** Dedicated `.table-scroll-wrap` (`overflow-x: auto; min-width: 900px`) ensuring complete matrix visibility on all screen widths.
  - **Inline Micro-Feedback Operations:** "Clone Template" and "Export Policy JSON" perform inline transitions (`Copied!` / `Template Cloned!` with green tint) without firing detached floating toasts.
  - **Destructive Deletion Modal with 2-Action Ceiling:** "Delete Role" modal requires typing `DELETE` into a focused input before unlocking the destructive action button.
  - **Administrative Audit Drawer:** Slide-out panel with grant/revoke diff tags, actor attribution, Escape key listener, and body scroll lock.

---

## 8. Edge Case 8: Multi-Currency Split Payment Gateway & Real-Time Card Detection
- **Covered Scenarios:**
  - **Custom Currency Select Listbox (Rule 25 Enforced):** Multi-currency switcher (USD, EUR, GBP) strictly implemented as an accessible custom popover (`role="listbox"`, `border-radius: var(--radius-md)`, checkmark glyphs) with zero native `<select>` combobox leaks.
  - **Real-Time Dynamic Card Brand Detection:** Automatically groups 16 digits into 4-digit blocks and dynamically transitions between generic CARD, VISA (`#1E3A8A`), MC (`#EA580C`), and AMEX (`#0284C7`) brand pills based on prefixes.
  - **Multi-Card Split Payment Slider & Zero Drift:** Interactive slider calculating proportional balances across primary and secondary cards with zero mathematical rounding drift.
  - **Strict Action Button Synchronization:** "Authorize Settlement" button remains locked disabled (`opacity: 0.45; cursor: not-allowed;`) until cardholder name, 16-digit card number, MM/YY expiry, and 3-4 digit CVC are fully validated.
  - **Shared Button Foundation & Zero Collision:** Unified base declaration enforcing `gap: 8px;`, `border-radius: var(--radius-md);`, and `svg { flex-shrink: 0; }` across all button tiers.
  - **Inline Micro-Feedback for Voucher & Copy:** "Apply" promo code button and "Copy ID" button provide immediate inline micro-transitions (`Applied!` / `Copied!` with green success tint) with zero detached floating toasts.
  - **Tax & Regulatory Breakdown Drawer:** Slide-out panel detailing state excise, fee waivers, and exchange rate guarantees with Escape listener and body scroll lock.

---

## 9. Edge Case 9: Enterprise Data Grid, Tri-State Sorting & Dynamic Pagination
- **Covered Scenarios:**
  - **Tri-State Column Sorting:** Columns toggle seamlessly across `none` $\rightarrow$ `asc` (▲) $\rightarrow$ `desc` (▼) $\rightarrow$ `none` (⇅) with zero layout shift or column width collapse.
  - **Dynamic Ellipsis Pagination:** Responsive page navigator displaying bounded ellipsis (`1 ... 4 [5] 6 ... 25`), correctly disabling previous/next boundary controls, and maintaining min 36x36px touch targets.
  - **Zero-State Search Recovery:** Filter queries yielding 0 matches replace table rows with an explicit empty state box containing an illustrative icon, contextual explanation, and a "Clear Search Filter" recovery button.
  - **Custom Rows-Per-Page Listbox (Rule 25):** Page size dropdown (5, 10, 25 rows) implemented as a custom listbox popover with active vector checkmarks (`✓`) and zero OS combobox leaks.
  - **Inline Micro-Feedback (Rule 22):** "Export CSV" button transitions inline to "CSV Generated!" with green tint and zero floating toast pollution.
  - **Record Payload Inspector Drawer:** Slide-out panel displaying formatted JSON context envelope, status badges, actor metadata, Escape listener, and body scroll lock.

---

## 10. Edge Case 10: Enterprise Cloud Cluster Provisioning & Deployment Wizard
- **Covered Scenarios:**
  - **Multi-Step Progress Stepper with Contrast Immunity (Rules 27 & 28):** Stepper tracks completed steps with green badges and SVG checkmarks (`✓`), active step with purple badge and crisp white text, and locked future steps. Stepper hover states are protected from contrast inversion.
  - **Inline DNS Verification Micro-Feedback (Rule 22):** "Verify DNS" button transitions inline from "Verify DNS" $\rightarrow$ "Resolving..." $\rightarrow$ "Resolved ✓" with green success tint and zero floating toast noise.
  - **Custom Region Select Listbox (Rule 25):** Dropdown menu implemented with custom listbox architecture (`role="listbox"`, `border-radius: var(--radius-md)`, checkmark glyphs) eliminating native Windows OS combobox leaks.
  - **Zero-Reflow Input Architecture:** Focus state compensation (`padding: 0 13px` at 2px border vs `0 14px` at 1px border) prevents layout jitter.
  - **Masked Token Visibility Agency (Rule 26):** Bootstrap root secret input features an accessible visibility toggle (`Eye` / `Eye-Off`) with suffix compensation (`padding-right: 44px`), allowing inspection without layout shift.
  - **Strict State Dependency & Synchronization (Rule 18):** Step 1 and Step 3 progression buttons and final "Deploy Cluster" CTA dynamically lock and unlock based on prerequisite field validation and HSM vault acknowledgment.
  - **Semantic Table Alignment Discipline (Rule 28):** Review ledger in `.table-scroll-wrap` applies left-alignment to component names, parameters, and the Action column ("Inspect"), and right-alignment strictly to numeric currency figures ($144.00, $3,686.00).
  - **Sliding Component Inspector Drawer:** Slide-out panel with declarative Kubernetes YAML/JSON envelope, unit pricing run-rate, Escape key listener, and body scroll lock.
  - **Bottom-Right System Toast (Rule 23):** Deployment completion notifications anchor at `bottom: 24px; right: 24px`, permanently avoiding header CTA collisions.

---

## 11. Section 11: Built for Mars UX & Behavioral Psychology Architecture Verification
- **Covered Scenarios:**
  - **Progressive Disclosure Ceiling (Rule 34a):** All complex provisioning and settings views limit top-level input fields to $\le 7$ elements, routing secondary options into progressive disclosure drawers or collapsible accordions.
  - **Instant Interaction Feedback (<100ms) (Rule 34b):** Interactive controls trigger active state visual changes immediately on click, eliminating perceived lag.
  - **Optimistic State Management & Graceful Revert (Rule 34c):** Local UI states reflect state updates instantly; failed requests show inline error messaging with single-click auto-fix/retry options.
  - **Celebration Calibration (Rule 34d):** Confetti and badge splashes trigger ONLY upon major milestone deployment, never on routine form saves.
  - **Zero Dark Patterns & Action Symmetrical Flow (Rule 34e):** Cancellation, rollback, and reset paths match the step depth and visual clarity of creation flows.





