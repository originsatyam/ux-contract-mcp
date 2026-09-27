# Data Display and Responsive Transformation Contract

## Responsive Data Displays

### Table to Card Transformation
- Viewports under 600px must never force horizontal scrolling on tables with more than three columns.
- On compact screens, tabular data transforms into a vertical list of stacked cards.
- Primary table column (identifier or name) becomes the card header.
- Secondary columns convert into key-value pairs inside the card body.

### Screen Reader DOM Duality
When rendering both desktop table and mobile card markup for responsive swapping:
- Desktop Container: `hidden md:block`
- Mobile Container: `block md:hidden`
- Dynamically toggle `aria-hidden="true"` on the inactive container to prevent screen readers from encountering duplicate rows, labels, and action targets.

### Touch Row Actions
- Desktop hover-revealed action icons are strictly prohibited on touch viewports.
- All row actions on compact and medium viewports must remain persistently visible or accessible via an explicit action trigger button with at least 44x44px hit target.

---

## Status Badges and Visual Indicators

### Multi Signal Indicator Rule
Never communicate status through color alone. Every status badge must combine three distinct signals:
1. Semantic tinted fill
2. High-contrast verified text
3. A 6px circular indicator dot or icon

### Verified Status Badge Tokens
- Active Status:
  - Background: `#F0FDF4` (`green-50`)
  - Text: `#15803D` (`green-700`, contrast ratio 5.02 on white)
  - Dot: 6px diameter, `#16A34A` (`green-600`)
- Pending Status:
  - Background: `#FFFBEB` (`yellow-50`)
  - Text: `#D97706` (`yellow-700`, contrast ratio 4.54 on tint)
  - Dot: 6px diameter, `#D97706` (`yellow-700`)
- Inactive or Error Status:
  - Background: `#FEF2F2` (`red-50`)
  - Text: `#B91C1C` (`red-700`, contrast ratio 5.91 on tint)
  - Dot: 6px diameter, `#DC2626` (`red-600`)

---

## Key Value and Information Pairs

### Desktop Layout
- Two-column grid layout with `1fr` label and `2fr` value.
- Labels use 14px medium, `#4B5563` (`neutral-600`).
- Values use 14px regular, `#111827` (`neutral-900`).
- Vertical gap 16px; horizontal gap 24px.

### Compact Stacking
- On viewports under 600px, pairs stack vertically.
- Label sits directly above value with 4px gap.
- Between consecutive pairs, maintain 16px vertical gap.

---

## Empty States and Actionable Recovery Standards
- **Mandatory Trigger:** Data containers (tables, cards, search grids) MUST never render zero-height blank boxes or unstyled strings ("No data found") when filters or search inputs yield 0 matching records.
- **Visual Anchor:** 48px neutral icon circle (`width: 48px; height: 48px; border-radius: 50%; background-color: var(--color-neutral-100); color: var(--color-neutral-500);`), centered with 16px bottom margin.
- **Heading:** 16px semibold (`var(--font-sans)`), color `#0F172A`, 6px bottom margin.
- **Description:** 13.5px regular, color `#64748B`, max-width 360px, 20px bottom margin.
- **Primary Recovery CTA:** Exactly ONE primary action button (`.btn-primary`, e.g. "Reset Search & Filters") that clears all search inputs and active filter chips to instantly restore data visibility.

---

## Metric Emphasis Tokens (Dashboards & Financial Metrics)
Dedicated typography tokens for emphasizing numbers, statistics, and financial metrics with strictly tabular figure spacing:
- **`metric/l`**: 28px size / 32px line-height, Bold (700), `font-variant-numeric: tabular-nums; font-family: var(--font-mono); letter-spacing: -0.02em;` (Hero dashboard KPIs, total settlement metrics).
- **`metric/m`**: 24px size / 28px line-height, Bold (700), `font-variant-numeric: tabular-nums; font-family: var(--font-mono); letter-spacing: -0.01em;` (Card-level balance metrics).
- **`metric/s`**: 16px size / 20px line-height, Bold (600), `font-variant-numeric: tabular-nums; font-family: var(--font-mono);` (Inline key performance indicators).

---


## Tabular Grid Alignment and Action Column Standards

### Table Header Baseline Invariant
- Every table header cell (`<th>`) and tabular numeric/currency metric cell must declare `white-space: nowrap;`.
- Prohibit multi-word column labels (e.g., `AMOUNT (USD)`) from breaking into stacked vertical fragments while neighboring columns remain on a single line. All column headers must share a clean, single-line horizontal baseline.

### Action Column Purity and Alignment Standards
- **Single Responsibility:** The Action column is strictly reserved for interactive affordances (buttons, menus, links). Never inject raw static status labels ("Frozen", "Closed") into an Action cell. Status information belongs strictly in the designated Status column.
- **Semantic Column Alignment Discipline:**
  - **Numeric & Financial Data:** Strictly right-aligned (`text-align: right;`) to ensure decimal points and unit values stack cleanly for vertical numerical scanning.
  - **Textual Data & Action Columns:** Left-aligned (`text-align: left;`) to match the natural left-to-right eye-tracking path of the reader.
- **Action Column Rhythm & Baseline Alignment:**
  - Every row in the Action column must render a uniform interactive control type: standard 36px height subtle button (`.btn-subtle`) with `var(--radius-md)`.
  - Action column headers (`<th>`) and action buttons (`<td>`) must be **left-aligned** with consistent padding and dedicated column width (`width: 100px` - `120px`).
  - Prohibit arbitrary right-alignment of action buttons in text-driven tables; right-aligning pushes actions into an orphaned floating island on the right edge, creating an artificial white-space void and causing scanning fatigue.
- **State Handling for Ineligible Actions:**
  - If a primary action is unavailable, either provide a contextual secondary action (e.g., `Review Case`, `Receipt`) or render a gracefully disabled button (`disabled` with an explanatory `title` tooltip).
  - Never allow naked `<span>` text to break the vertical rhythm and horizontal alignment of the Action column.

### Table Scroll Container Invariant
- **Anti-Clipping Shell Architecture:** Any data table embedded within a card or bounded layout container (`overflow: hidden`) must be enclosed within a dedicated `.table-scroll-wrap` element:
  - Container CSS: `width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin;`.
  - Table Minimum Width: Table must specify an explicit `min-width` (typically 820px to 960px) to guarantee that all columns, badges, and action buttons maintain full legibility and touch padding without being crushed.
  - Scroll Affordance: Provide a styled, subtle horizontal scrollbar (`scrollbar-color: var(--color-neutral-300) transparent;`) so users can smoothly navigate horizontally when viewing on viewports narrower than the table width.


