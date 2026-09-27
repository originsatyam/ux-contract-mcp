```markdown
You are building data display patterns for tables, lists, badges, tags, and key-value pairs.

Use design-tokens.md for all spacing, colors, typography, and sizing values.

## Data Display Pattern Specifications

### Table Pattern

**Standard table:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
        <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">
          Name
        </th>
        <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">
          Email
        </th>
        <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">
          Status
        </th>
        <th style="padding: 12px 16px; text-align: right; font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #E5E7EB;">
        <td style="padding: 16px; font-size: 14px; color: #111827; font-weight: 500;">
          John Doe
        </td>
        <td style="padding: 16px; font-size: 14px; color: #6B7280;">
          john@example.com
        </td>
        <td style="padding: 16px;">
          <span style="display: inline-flex; align-items: center; padding: 4px 8px; background: #F0FDF4; color: #15803D; font-size: 12px; font-weight: 500; border-radius: 4px;">
            Active
          </span>
        </td>
        <td style="padding: 16px; text-align: right;">
          <button style="background: none; border: none; color: #4F46E5; font-size: 14px; font-weight: 500; cursor: pointer;">
            Edit
          </button>
        </td>
      </tr>
      <!-- More rows -->
    </tbody>
  </table>
</div>
```

**Specifications:**
- Table container: white background, 1px neutral-200 border, 8px radius, overflow hidden
- Border-collapse: collapse
- Header background: neutral-50
- Header border-bottom: 1px neutral-200
- Header cell padding: 12px 16px
- Header text: 12px medium, neutral-600, uppercase, 0.05em letter-spacing
- Body row border-bottom: 1px neutral-200
- Body cell padding: 16px
- Primary cell (name, title): 14px medium, neutral-900
- Secondary cell (email, description): 14px regular, neutral-600
- Last row: no border-bottom
- Actions column: text-align right
- Hover row: background neutral-50 (optional)

**Compact table (dense data):**
```html
<!-- Same structure, adjusted padding -->
<th style="padding: 8px 12px; ...">Header</th>
<td style="padding: 12px; ...">Cell</td>
```

**Specifications:**
- Header padding: 8px 12px
- Body cell padding: 12px

**Striped table:**
```html
<tbody>
  <tr style="background: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
    <!-- Odd row -->
  </tr>
  <tr style="background: white; border-bottom: 1px solid #E5E7EB;">
    <!-- Even row -->
  </tr>
</tbody>
```

**Specifications:**
- Odd rows: neutral-50 background
- Even rows: white background

**Table with checkbox selection:**
```html
<th style="padding: 12px 16px; width: 48px;">
  <input type="checkbox" style="width: 16px; height: 16px; cursor: pointer;">
</th>
<td style="padding: 16px; width: 48px;">
  <input type="checkbox" style="width: 16px; height: 16px; cursor: pointer;">
</td>
```

**Specifications:**
- Checkbox column width: 48px
- Checkbox size: 16px × 16px
- Centered in cell

**Sortable table headers:**
```html
<th style="padding: 12px 16px; cursor: pointer; user-select: none;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <span>Name</span>
    <svg width="12" height="12" fill="none" stroke="#9CA3AF" stroke-width="2">
      <path d="M6 3v6M3 6l3-3 3 3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</th>
```

**Specifications:**
- Header cursor: pointer
- Sort icon: 12px, neutral-400, right of text
- Active sort icon: accent-600
- Gap between text and icon: 8px

### List Pattern

**Standard list:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
  <div style="padding: 16px 20px; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 40px; height: 40px; background: #EEF2FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; color: #4F46E5;">
        JD
      </div>
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #111827;">
          John Doe
        </div>
        <div style="font-size: 12px; color: #6B7280;">
          john@example.com
        </div>
      </div>
    </div>
    <button style="background: none; border: none; color: #4F46E5; font-size: 14px; font-weight: 500; cursor: pointer;">
      View
    </button>
  </div>
  <!-- More items -->
</div>
```

**Specifications:**
- List container: white background, 1px neutral-200 border, 8px radius
- Item padding: 16px 20px
- Item border-bottom: 1px neutral-200 (except last)
- Avatar: 40px circle, accent-50 background, accent-600 text
- Avatar to content gap: 12px
- Primary text: 14px medium, neutral-900
- Secondary text: 12px regular, neutral-600, 4px margin-top
- Action button: ghost style, right-aligned
- Hover background: neutral-50 (optional)

**Compact list:**
```html
<div style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB;">
  <div style="font-size: 14px; font-weight: 500; color: #111827;">
    Item title
  </div>
</div>
```

**Specifications:**
- Item padding: 12px 16px
- No avatar, single-line text

**List with icon:**
```html
<div style="padding: 16px 20px; border-bottom: 1px solid #E5E7EB; display: flex; align-items: center; gap: 12px;">
  <svg width="20" height="20" fill="none" stroke="#6B7280" stroke-width="2">
    <!-- Icon -->
  </svg>
  <div style="flex: 1;">
    <div style="font-size: 14px; font-weight: 500; color: #111827;">
      Item title
    </div>
  </div>
  <span style="font-size: 12px; color: #6B7280;">
    2 hours ago
  </span>
</div>
```

**Specifications:**
- Icon: 20px, neutral-600, left-aligned
- Icon to content gap: 12px
- Timestamp: 12px, neutral-600, right-aligned

**Empty list state:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 48px 24px; text-align: center;">
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#9CA3AF" stroke-width="2" style="margin: 0 auto 16px;">
    <!-- Empty icon -->
  </svg>
  <div style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">
    No items found
  </div>
  <div style="font-size: 14px; color: #6B7280;">
    Get started by adding your first item
  </div>
</div>
```

**Specifications:**
- Padding: 48px 24px
- Icon: 48px, neutral-400, centered, 16px margin-bottom
- Title: 14px medium, neutral-700, 8px margin-bottom
- Description: 14px regular, neutral-600

### Badge Pattern

**Status badge:**
```html
<!-- Success/Active -->
<span style="display: inline-flex; align-items: center; padding: 4px 8px; background: #F0FDF4; color: #15803D; font-size: 12px; font-weight: 500; border-radius: 4px;">
  Active
</span>

<!-- Warning -->
<span style="display: inline-flex; align-items: center; padding: 4px 8px; background: #FFFBEB; color: #D97706; font-size: 12px; font-weight: 500; border-radius: 4px;">
  Pending
</span>

<!-- Error/Inactive -->
<span style="display: inline-flex; align-items: center; padding: 4px 8px; background: #FEF2F2; color: #B91C1C; font-size: 12px; font-weight: 500; border-radius: 4px;">
  Inactive
</span>

<!-- Info/Neutral -->
<span style="display: inline-flex; align-items: center; padding: 4px 8px; background: #F3F4F6; color: #374151; font-size: 12px; font-weight: 500; border-radius: 4px;">
  Draft
</span>
```

**Specifications:**
- Display: inline-flex
- Padding: 4px 8px
- Font-size: 12px
- Font-weight: 500
- Border-radius: 4px
- Success: green-50 background, green-700 text
- Warning: yellow-50 background, yellow-700 text
- Error: red-50 background, red-700 text
- Neutral: neutral-100 background, neutral-700 text
- Info: accent-50 background, accent-700 text

**Badge with dot indicator:**
```html
<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #F0FDF4; color: #15803D; font-size: 12px; font-weight: 500; border-radius: 4px;">
  <span style="width: 6px; height: 6px; background: #16A34A; border-radius: 50%;"></span>
  Active
</span>
```

**Specifications:**
- Dot size: 6px circle
- Dot to text gap: 4px
- Dot color: green-600 (matches semantic color)

**Count badge:**
```html
<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; background: #DC2626; color: white; font-size: 12px; font-weight: 500; border-radius: 10px;">
  5
</span>
```

**Specifications:**
- Min-width: 20px (for single digits)
- Height: 20px
- Padding horizontal: 6px (for multi-digit)
- Border-radius: 10px (pill shape)
- Background: red-600, accent-600, or neutral-600
- Text: white, 12px medium

### Tag Pattern (Removable Labels)

**Standard tag:**
```html
<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #EEF2FF; color: #4F46E5; font-size: 12px; font-weight: 500; border-radius: 4px;">
  Design
  <button style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; color: #4F46E5;">
    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 3L3 9M3 3l6 6" stroke-linecap="round"/>
    </svg>
  </button>
</span>
```

**Specifications:**
- Padding: 4px 8px
- Background: accent-50
- Text: 12px medium, accent-600
- Border-radius: 4px
- Remove button: 12px X icon, accent-600, 4px gap from text
- Gap between text and button: 4px

**Tag group:**
```html
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>
```

**Specifications:**
- Display: flex, flex-wrap
- Gap: 8px (between tags)

### Key-Value Pair Pattern

**Standard key-value list:**
```html
<div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
  <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 16px 24px;">
    <div style="font-size: 14px; font-weight: 500; color: #6B7280;">
      Name
    </div>
    <div style="font-size: 14px; color: #111827;">
      John Doe
    </div>
    
    <div style="font-size: 14px; font-weight: 500; color: #6B7280;">
      Email
    </div>
    <div style="font-size: 14px; color: #111827;">
      john@example.com
    </div>
    
    <div style="font-size: 14px; font-weight: 500; color: #6B7280;">
      Role
    </div>
    <div style="font-size: 14px; color: #111827;">
      Administrator
    </div>
  </div>
</div>
```

**Specifications:**
- Grid: 1fr (key) 2fr (value) columns
- Gap: 16px vertical, 24px horizontal
- Key: 14px medium, neutral-600
- Value: 14px regular, neutral-900
- Container padding: 24px

**Stacked key-value (mobile-friendly):**
```html
<div style="margin-bottom: 16px;">
  <div style="font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
    Name
  </div>
  <div style="font-size: 14px; color: #111827;">
    John Doe
  </div>
</div>
```

**Specifications:**
- Key: 12px medium, neutral-600, uppercase, 0.05em letter-spacing, 4px margin-bottom
- Value: 14px regular, neutral-900
- Between pairs: 16px margin-bottom

**Key-value with dividers:**
```html
<div style="padding: 16px 0; border-bottom: 1px solid #E5E7EB;">
  <div style="font-size: 12px; font-weight: 500; color: #6B7280; margin-bottom: 4px;">
    Name
  </div>
  <div style="font-size: 14px; color: #111827;">
    John Doe
  </div>
</div>
```

**Specifications:**
- Padding vertical: 16px
- Border-bottom: 1px neutral-200 (except last)
- Last item: no border-bottom

### Avatar Pattern

**Single avatar:**
```html
<img src="..." alt="John Doe" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #E5E7EB;">
```

**Specifications:**
- Size options: 24px (small), 32px (medium), 40px (default), 48px (large), 64px (extra large)
- Border-radius: 50% (circle)
- Border: 2px neutral-200 (optional)

**Avatar with initials (no image):**
```html
<div style="width: 40px; height: 40px; background: #EEF2FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; color: #4F46E5;">
  JD
</div>
```

**Specifications:**
- Background: accent-50
- Text: accent-600, 16px semibold (scale with avatar size)

**Avatar group (stacked):**
```html
<div style="display: flex; align-items: center;">
  <img src="..." alt="User 1" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; margin-left: -8px;">
  <img src="..." alt="User 2" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; margin-left: -8px;">
  <img src="..." alt="User 3" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; margin-left: -8px;">
  <div style="width: 40px; height: 40px; background: #F3F4F6; border-radius: 50%; border: 2px solid white; margin-left: -8px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: #6B7280;">
    +5
  </div>
</div>
```

**Specifications:**
- Overlap: -8px margin-left (except first)
- Border: 2px white (creates separation)
- Overflow count: neutral-100 background, neutral-600 text

### Usage Rules

**Tables:**
- Use for: structured data, comparisons, bulk actions
- Max 6-8 columns visible (more = horizontal scroll or hide columns)
- Primary column (name, title) left-aligned, bold
- Numeric columns right-aligned
- Actions column always right-aligned
- Hover row for better scannability
- Sticky header for long tables (optional)

**Lists:**
- Use for: activity feeds, notifications, simple item browsing
- More flexible than tables (varying content per item)
- Include visual hierarchy (primary/secondary text)
- Use avatars or icons for recognition

**Badges:**
- Use for: status indicators, categories, counts
- Keep text short (1-2 words)
- Use semantic colors (green = success, red = error, yellow = warning)
- Don't overuse (max 1-2 per row/item)

**Tags:**
- Use for: user-added labels, filters, categories
- Allow removal (X button)
- Wrap to multiple lines if needed
- Max 5-7 visible tags (show "+3 more" if exceeds)

**Key-value:**
- Use for: detail pages, settings, read-only data
- Consistent key width (grid layout)
- Stack on mobile (single column)
- Group related pairs with spacing/dividers

**Avatars:**
- Use for: user identification, attribution
- Always include alt text (name)
- Fallback to initials if no image
- Use avatar groups for teams/collaborators (max 4-5 visible)

**Accessibility:**
- Tables: use thead, tbody, th, td semantic elements
- Tables: scope="col" on headers
- Lists: use semantic list elements (ul, li) or role="list"
- Badges: don't rely on color alone (include text/icon)
- Avatar groups: include sr-only text with all names

Generate data display components using these patterns with proper structure and spacing.
```