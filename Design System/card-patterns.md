```markdown
You are building card component patterns for displaying grouped content.

Use design-tokens.md for all spacing, colors, typography, and sizing values.

## Card Pattern Specifications

### Base Card Structure

**Default card:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <!-- Card content -->
</div>
```

**Specifications:**
- Background: white
- Border: 1px solid neutral-200 (#E5E7EB)
- Border-radius: 8px (medium container)
- Padding: 24px (standard)
- Box-shadow: none (default), optional sm or md for elevation

**Card with shadow (elevated):**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
  <!-- Card content -->
</div>
```

**Card with hover state (interactive):**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; cursor: pointer; transition: all 150ms ease;">
  <!-- Hover: border-color: #D1D5DB, box-shadow: 0 4px 6px rgba(0,0,0,0.07) -->
</div>
```

### Card Padding Variants

**Compact (dense layouts):**
- Padding: 16px
- Use for: small cards, dashboard widgets, tight grids

**Standard (default):**
- Padding: 24px
- Use for: most cards, general content blocks

**Spacious (featured content):**
- Padding: 32px
- Use for: hero cards, important sections, pricing cards

**No padding (image cards):**
- Padding: 0
- Content has internal padding
- Use for: cards with full-bleed images

### Card Content Structure

**Card with header:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="margin-bottom: 16px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">
      Card Title
    </h3>
  </div>
  <div>
    <!-- Card body content -->
  </div>
</div>
```

**Specifications:**
- Header margin-bottom: 16px
- Title: 16px semibold, neutral-900
- Body: default text styling (14px regular)

**Card with header and description:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="margin-bottom: 16px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">
      Card Title
    </h3>
    <p style="font-size: 14px; color: #6B7280; margin: 0;">
      Brief description of card content
    </p>
  </div>
  <div>
    <!-- Card body content -->
  </div>
</div>
```

**Specifications:**
- Title to description: 4px gap
- Description: 14px regular, neutral-600

**Card with header and actions:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">
      Card Title
    </h3>
    <button style="background: none; border: none; color: #4F46E5; font-size: 14px; font-weight: 500; cursor: pointer;">
      View all
    </button>
  </div>
  <div>
    <!-- Card body content -->
  </div>
</div>
```

**Specifications:**
- Header: flexbox, space-between alignment
- Action button: ghost style, accent-600 text
- Action position: right-aligned

**Card with footer:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="margin-bottom: 16px;">
    <!-- Card header/body -->
  </div>
  <div style="padding-top: 16px; border-top: 1px solid #E5E7EB;">
    <!-- Footer content (actions, metadata) -->
  </div>
</div>
```

**Specifications:**
- Footer padding-top: 16px
- Footer border-top: 1px neutral-200
- Use for: action buttons, timestamps, metadata

**Card with image:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
  <img src="..." alt="..." style="width: 100%; height: 200px; object-fit: cover;">
  <div style="padding: 24px;">
    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">
      Card Title
    </h3>
    <p style="font-size: 14px; color: #6B7280; margin: 0;">
      Card description text
    </p>
  </div>
</div>
```

**Specifications:**
- Image: full-width, fixed height or aspect-ratio
- Overflow: hidden (clips image to border-radius)
- Content padding: 24px below image
- No top border (image serves as visual top)

### Card Variants by Use Case

**Stat card (dashboard metric):**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
    Total Revenue
  </div>
  <div style="font-size: 32px; font-weight: 600; color: #111827; margin-bottom: 4px;">
    $45,231
  </div>
  <div style="font-size: 14px; color: #16A34A; display: flex; align-items: center; gap: 4px;">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 12V4M4 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    12% from last month
  </div>
</div>
```

**Specifications:**
- Label: 12px medium, neutral-600, uppercase, 0.05em letter-spacing
- Value: 32px semibold, neutral-900
- Change indicator: 14px, green-600 (positive) or red-600 (negative), with icon

**List card:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">
    Recent Activity
  </h3>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 6px; background: #F9FAFB;">
      <div style="width: 8px; height: 8px; background: #16A34A; border-radius: 50%;"></div>
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: 500; color: #111827;">Item title</div>
        <div style="font-size: 12px; color: #6B7280;">2 hours ago</div>
      </div>
    </div>
    <!-- More items -->
  </div>
</div>
```

**Specifications:**
- Item gap: 12px
- Item padding: 12px
- Item background: neutral-50 (optional)
- Status indicator: 8px circle, left-aligned
- Item title: 14px medium
- Item metadata: 12px regular, neutral-600

**Feature card (marketing, pricing):**
```html
<div style="background: white; border: 2px solid #E5E7EB; border-radius: 8px; padding: 32px; text-align: center;">
  <div style="width: 48px; height: 48px; background: #EEF2FF; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
    <svg width="24" height="24" stroke="#4F46E5" fill="none" stroke-width="2">
      <!-- Icon -->
    </svg>
  </div>
  <h3 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">
    Feature Name
  </h3>
  <p style="font-size: 14px; color: #6B7280; margin: 0 0 24px 0;">
    Feature description highlighting key benefits
  </p>
  <button style="width: 100%; height: 40px; padding: 12px 24px; background: #4F46E5; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;">
    Learn more
  </button>
</div>
```

**Specifications:**
- Border: 2px (thicker for emphasis)
- Padding: 32px (spacious)
- Text-align: center
- Icon container: 48px, accent-50 background, 8px radius
- Icon: 24px, accent-600
- Title: 20px semibold
- Description: 14px, 24px margin-bottom
- CTA: primary button, full width

**Profile card:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; text-align: center;">
  <img src="..." alt="..." style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px; display: block; border: 2px solid #E5E7EB;">
  <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">
    John Doe
  </h3>
  <p style="font-size: 14px; color: #6B7280; margin: 0 0 16px 0;">
    Product Designer
  </p>
  <div style="display: flex; gap: 8px; justify-content: center;">
    <button style="flex: 1; height: 40px; padding: 12px 24px; background: #4F46E5; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
      Message
    </button>
    <button style="flex: 1; height: 40px; padding: 12px 24px; background: white; color: #374151; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; font-weight: 500;">
      Follow
    </button>
  </div>
</div>
```

**Specifications:**
- Avatar: 80px circle, 2px neutral-200 border, centered
- Name: 16px semibold, 4px margin-bottom
- Role: 14px regular, neutral-600
- Buttons: flex layout, 8px gap, equal width

### Card States

**Default:**
- Border: 1px neutral-200
- Background: white
- No shadow (or sm shadow if elevated)

**Hover (interactive cards):**
- Border: 1px neutral-300
- Box-shadow: 0 4px 6px rgba(0,0,0,0.07)
- Cursor: pointer
- Transition: all 150ms ease

**Active/Selected:**
- Border: 2px accent-600
- Optional: accent-50 background tint

**Disabled:**
- Opacity: 0.5
- Cursor: not-allowed
- No hover effects

**Loading:**
- Overlay with spinner (see feedback-patterns.md)
- Or skeleton placeholder matching card content structure

### Card Spacing

**Between cards in grid:**
- Standard gap: 24px
- Compact gap: 16px
- Loose gap: 32px

**Internal spacing (within card):**
- Header to body: 16px
- Body to footer: 16px
- Between list items: 12px
- Between paragraphs: 16px

**Card to page edge:**
- Follow layout-patterns.md container padding
- Desktop: 48px minimum
- Tablet: 32px minimum
- Mobile: 16px minimum

### Responsive Card Behavior

**Grid stacking:**
```html
<!-- Desktop: 3 columns -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
  <!-- Cards -->
</div>

<!-- Tablet: 2 columns -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
  <!-- Cards -->
</div>

<!-- Mobile: 1 column -->
<div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
  <!-- Cards -->
</div>
```

**Padding adjustment:**
- Desktop: 24-32px padding
- Tablet: 24px padding
- Mobile: 16px padding (compact cards acceptable)

### Usage Rules

**When to use cards:**
- Grouping related content (profile info, product details, settings sections)
- Dashboard widgets (stats, charts, activity feeds)
- Lists of items (product catalog, user directory, blog posts)
- Feature highlights (marketing pages, product tours)
- Interactive elements (clickable items leading to detail pages)

**When NOT to use cards:**
- Single primary content (use page layout instead)
- Dense data tables (use table pattern instead)
- Navigation menus (use nav pattern instead)
- Form fields (already grouped in form-field-group.md)

**Card hierarchy:**
- One primary card per section (larger, more prominent)
- Supporting cards smaller or less emphasized
- Avoid equal visual weight if importance differs

**Accessibility:**
- Use semantic HTML (article, section) when appropriate
- Interactive cards need hover/focus states
- Clickable cards should have aria-label if purpose unclear from content
- Maintain adequate color contrast (all text meets WCAG AA)

**Content guidelines:**
- Keep card titles concise (1-5 words)
- Limit body text (2-3 sentences max for small cards)
- Use clear CTAs ("View details" not "Click here")
- Include visual hierarchy (title > description > metadata)

Generate card components using these patterns with proper structure and spacing.
```