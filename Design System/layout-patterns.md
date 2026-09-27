```markdown
You are building page layouts and structural patterns for prototypes.

Use design-tokens.md for all spacing, colors, typography, and sizing values.

## Layout Pattern Specifications

### Container Widths

**Page container (outer boundary):**
- Max-width options based on content type:
  - **Narrow (prose, forms):** 640px
  - **Standard (general content):** 1024px
  - **Wide (dashboards, tables):** 1280px
  - **Full (data-heavy, analytics):** 1536px
  - **Fluid:** 100% with horizontal padding

**Horizontal padding:**
- Desktop (≥1024px): 48px left/right
- Tablet (640-1023px): 32px left/right
- Mobile (<640px): 16px left/right

**Card/Section containers:**
- Small card: max-width 400px (login, small forms)
- Medium card: max-width 600px (detailed forms, content)
- Large card: max-width 800px (wide forms, content blocks)
- Full-width card: 100% within page container

### Vertical Spacing Rhythm

**Page-level spacing:**
- Page top padding: 48px (desktop), 32px (tablet), 24px (mobile)
- Page bottom padding: 48px (desktop), 32px (tablet), 24px (mobile)
- Between major sections: 48px
- Between subsections: 32px
- Between related groups: 24px

**Section-level spacing:**
- Section header to content: 24px
- Between content blocks: 24px
- Between list items: 16px
- Between inline elements: 8px

**Component-level spacing (reference):**
- Label to input: 8px (from input.md)
- Input to helper: 8px (from input.md)
- Form groups: 24px (from form-field-group.md)
- Button groups: 16px horizontal (from button.md)

### Grid System

**Column layouts:**

**Two-column (50/50):**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
  <div>Left column</div>
  <div>Right column</div>
</div>
```
- Gap: 24px
- Responsive: stack to single column below 768px

**Two-column (sidebar + main, 1/3 + 2/3):**
```html
<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
  <aside>Sidebar (33%)</aside>
  <main>Main content (67%)</main>
</div>
```
- Gap: 32px
- Responsive: stack below 1024px, sidebar on top

**Two-column (sidebar + main, 1/4 + 3/4):**
```html
<div style="display: grid; grid-template-columns: 1fr 3fr; gap: 32px;">
  <aside>Sidebar (25%)</aside>
  <main>Main content (75%)</main>
</div>
```
- Gap: 32px
- Typical for: navigation sidebar + dashboard content
- Responsive: sidebar collapses to hamburger menu below 1024px

**Three-column (equal):**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```
- Gap: 24px
- Responsive: 2 columns at 768px, 1 column below 640px

**Four-column (cards/tiles):**
```html
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>
```
- Gap: 24px
- Responsive: 3 cols at 1024px, 2 cols at 768px, 1 col below 640px

**Auto-fit grid (responsive cards):**
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
  <!-- Cards auto-wrap based on available space -->
</div>
```
- Min card width: 280px
- Gap: 24px
- Auto-responsive without media queries

### Responsive Breakpoints

**Standard breakpoints:**
- **Mobile:** < 640px
- **Tablet:** 640px - 1023px
- **Desktop:** ≥ 1024px
- **Large desktop:** ≥ 1280px

**Behavior changes at breakpoints:**

**Mobile (<640px):**
- All multi-column layouts stack to single column
- Horizontal padding: 16px
- Font sizes can scale down slightly (optional: title 20px instead of 24px)
- Tables scroll horizontally or transform to card view
- Navigation collapses to hamburger menu

**Tablet (640-1023px):**
- Two-column layouts maintained
- Three+ column layouts reduce to two columns
- Horizontal padding: 32px
- Sidebar layouts may stack or persist

**Desktop (≥1024px):**
- All column layouts as designed
- Horizontal padding: 48px
- Sidebar + main layouts side-by-side
- Maximum container widths enforced

### Page Layout Structures

**Centered content (auth, marketing, forms):**
```html
<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #F9FAFB;">
  <div style="width: 100%; max-width: 400px; background: white; padding: 32px; border-radius: 8px; border: 1px solid #E5E7EB;">
    <!-- Content -->
  </div>
</div>
```
- Full viewport height
- Vertically and horizontally centered
- Max-width constraint on content
- Background typically neutral-50 or neutral-100

**Full-page with header (dashboard, app):**
```html
<div style="min-height: 100vh; display: flex; flex-direction: column;">
  <header style="height: 64px; border-bottom: 1px solid #E5E7EB; padding: 0 48px; display: flex; align-items: center; background: white;">
    <!-- Header content -->
  </header>
  <main style="flex: 1; padding: 48px; background: #F9FAFB;">
    <div style="max-width: 1280px; margin: 0 auto;">
      <!-- Page content -->
    </div>
  </main>
</div>
```
- Header: fixed height 64px, white background, bottom border
- Main: flex-grow, neutral background, contains max-width container
- Container: centered, max-width per content needs

**Sidebar + main (admin, settings):**
```html
<div style="min-height: 100vh; display: flex;">
  <aside style="width: 256px; background: white; border-right: 1px solid #E5E7EB; padding: 24px;">
    <!-- Sidebar navigation -->
  </aside>
  <main style="flex: 1; padding: 48px; background: #F9FAFB;">
    <div style="max-width: 1024px;">
      <!-- Main content -->
    </div>
  </main>
</div>
```
- Sidebar: fixed width 256px (or 240px/280px), white, right border
- Main: flex-grow, neutral background, contains content
- Responsive: sidebar collapses below 1024px

**Header + sidebar + main (full app shell):**
```html
<div style="min-height: 100vh; display: flex; flex-direction: column;">
  <header style="height: 64px; border-bottom: 1px solid #E5E7EB; padding: 0 48px; background: white;">
    <!-- Header -->
  </header>
  <div style="flex: 1; display: flex;">
    <aside style="width: 256px; background: white; border-right: 1px solid #E5E7EB; padding: 24px;">
      <!-- Sidebar -->
    </aside>
    <main style="flex: 1; padding: 48px; background: #F9FAFB;">
      <!-- Main content -->
    </main>
  </div>
</div>
```
- Header: 64px height, full width, bottom border
- Sidebar: 256px width, right border
- Main: flex-grow, neutral background

### Section Structure

**Page section with header:**
```html
<section style="margin-bottom: 48px;">
  <div style="margin-bottom: 24px;">
    <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">
      Section Title
    </h2>
    <p style="font-size: 14px; color: #6B7280; margin: 0;">
      Section description or context
    </p>
  </div>
  <div>
    <!-- Section content -->
  </div>
</section>
```
- Section margin-bottom: 48px
- Header to content: 24px
- Title: 20px semibold, neutral-900
- Description: 14px regular, neutral-600, 8px below title

**Content block (within section):**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
  <!-- Block content -->
</div>
```
- Background: white
- Border: 1px neutral-200
- Border-radius: 8px (medium container size)
- Padding: 24px
- Margin-bottom: 24px (between blocks)

### Z-Index Layers

**Layering system:**
- Base content: z-index 0 (default)
- Sticky header: z-index 10
- Dropdown menus: z-index 20
- Modal overlay: z-index 30
- Modal content: z-index 40
- Toast notifications: z-index 50

**Usage:**
- Never use arbitrary z-index values
- Maintain consistent layering
- Modal overlay prevents interaction with content below
- Focus not obscured (WCAG 2.4.11): these layers must never entirely hide a focused
  element — scroll the focused element into view above any fixed layer
  (see design-tokens.md → Focus Indicators)

### Spacing Decision Tree

**When to use each spacing value:**

**4px:** Never use for layout (too tight, only for icon adjustments)

**8px:**
- Label to input
- Input to helper/error text
- Icon to text (inline)
- Tight inline spacing

**16px:**
- Between related items in a list
- Between buttons in a group (horizontal)
- Between form fields in dense layouts
- Card content padding (small cards)

**24px:**
- Between form groups
- Between content blocks in a section
- Between section header and content
- Card content padding (standard)
- Grid gap (standard)
- Page horizontal padding (mobile)

**32px:**
- Between subsections
- Sidebar/main gap
- Large grid gap
- Page horizontal padding (tablet)
- Page vertical padding (tablet)
- Card content padding (large cards)

**48px:**
- Between major page sections
- Page horizontal padding (desktop)
- Page vertical padding (desktop)
- Large section breaks

### Responsive Patterns

**Stack on mobile:**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
  <!-- Desktop: side by side -->
</div>

<!-- Mobile (<640px): -->
<div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
  <!-- Mobile: stacked -->
</div>
```

**Reduce columns on tablet:**
```html
<!-- Desktop (≥1024px): 4 columns -->
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;"></div>

<!-- Tablet (640-1023px): 2 columns -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;"></div>

<!-- Mobile (<640px): 1 column -->
<div style="display: grid; grid-template-columns: 1fr; gap: 24px;"></div>
```

**Hide sidebar on mobile:**
```html
<!-- Desktop: sidebar visible -->
<aside style="width: 256px; display: block;"></aside>

<!-- Mobile: sidebar hidden, hamburger menu shown -->
<aside style="display: none;"></aside>
```

**Adjust padding:**
```html
<!-- Desktop -->
<div style="padding: 48px;"></div>

<!-- Tablet -->
<div style="padding: 32px;"></div>

<!-- Mobile -->
<div style="padding: 16px;"></div>
```

### Common Layout Patterns

**Dashboard grid:**
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
  <div>Stat card 1</div>
  <div>Stat card 2</div>
  <div>Stat card 3</div>
  <div>Stat card 4</div>
</div>
```

**Form + preview (two-column):**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
  <div>
    <h2>Edit Profile</h2>
    <form><!-- Form fields --></form>
  </div>
  <div>
    <h2>Preview</h2>
    <div><!-- Live preview --></div>
  </div>
</div>
```

**Content + sidebar:**
```html
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
  <article><!-- Main content --></article>
  <aside><!-- Related links, TOC, ads --></aside>
</div>
```

### Usage Rules

**Container widths:**
- Use narrow (640px) for: forms, auth pages, focused content
- Use standard (1024px) for: general pages, articles, settings
- Use wide (1280px) for: dashboards, data tables
- Use full (1536px) for: analytics, complex dashboards
- Use fluid for: full-width designs, landing pages

**Grid gaps:**
- Use 24px for: standard spacing between cards, columns
- Use 32px for: larger separation (sidebar + main)
- Use 16px for: tight spacing (related items, dense layouts)

**Vertical rhythm:**
- Maintain consistent spacing (8/16/24/32/48)
- Larger spacing between unrelated sections
- Smaller spacing within related groups
- Never use arbitrary values (13px, 27px, etc.)

**Responsive:**
- Always stack multi-column layouts on mobile
- Reduce padding on smaller screens
- Hide or collapse navigation on mobile
- Test at 375px (iPhone SE), 768px (iPad), 1440px (laptop)

**Accessibility:**
- Maintain logical reading order when stacking
- Ensure touch targets ≥44px on mobile
- Don't rely on color alone for layout structure
- Test keyboard navigation through layout

Generate page layouts using these patterns with proper HTML structure and responsive behavior.
```