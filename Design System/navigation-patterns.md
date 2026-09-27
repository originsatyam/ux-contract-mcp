```markdown
You are building navigation patterns for application headers, sidebars, tabs, and breadcrumbs.

Use design-tokens.md for all spacing, colors, typography, and sizing values.

## Navigation Pattern Specifications

### Header Navigation (Top Bar)

**Standard header:**
```html
<header style="height: 64px; background: white; border-bottom: 1px solid #E5E7EB; padding: 0 48px; display: flex; align-items: center; justify-content: space-between;">
  <div style="display: flex; align-items: center; gap: 32px;">
    <!-- Logo -->
    <div style="font-size: 20px; font-weight: 600; color: #111827;">
      Brand
    </div>
    <!-- Nav items -->
    <nav style="display: flex; gap: 24px;">
      <a href="#" style="font-size: 14px; font-weight: 500; color: #111827; text-decoration: none;">
        Dashboard
      </a>
      <a href="#" style="font-size: 14px; font-weight: 500; color: #6B7280; text-decoration: none;">
        Projects
      </a>
      <a href="#" style="font-size: 14px; font-weight: 500; color: #6B7280; text-decoration: none;">
        Team
      </a>
    </nav>
  </div>
  <div style="display: flex; align-items: center; gap: 16px;">
    <!-- User menu, notifications, etc -->
  </div>
</header>
```

**Specifications:**
- Height: 64px (fixed)
- Background: white
- Border-bottom: 1px neutral-200
- Horizontal padding: 48px (desktop), 24px (tablet), 16px (mobile)
- Logo to nav items: 32px gap
- Between nav items: 24px gap
- Active nav item: neutral-900, font-weight 500
- Inactive nav item: neutral-600, font-weight 500
- Right section items: 16px gap

**Header with search:**
```html
<header style="height: 64px; background: white; border-bottom: 1px solid #E5E7EB; padding: 0 48px; display: flex; align-items: center; gap: 32px;">
  <div style="font-size: 20px; font-weight: 600; color: #111827; flex-shrink: 0;">
    Brand
  </div>
  <div style="flex: 1; max-width: 480px;">
    <div style="position: relative;">
      <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #6B7280; pointer-events: none;">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12l3 3" stroke="currentColor" stroke-width="2"/>
      </svg>
      <input type="search" placeholder="Search..." style="width: 100%; height: 40px; padding: 12px 16px 12px 40px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;">
    </div>
  </div>
  <div style="display: flex; align-items: center; gap: 16px;">
    <!-- Right section -->
  </div>
</header>
```

**Specifications:**
- Search input: max-width 480px, flex-grow
- Search icon: 16px, neutral-500, left 12px
- Input padding-left: 40px (accommodates icon)

### Sidebar Navigation (Vertical)

**Standard sidebar:**
```html
<aside style="width: 256px; height: 100vh; background: white; border-right: 1px solid #E5E7EB; padding: 24px 0; display: flex; flex-direction: column;">
  <!-- Logo/Brand -->
  <div style="padding: 0 24px 24px; font-size: 20px; font-weight: 600; color: #111827;">
    Brand
  </div>
  
  <!-- Navigation -->
  <nav style="flex: 1; padding: 0 16px;">
    <!-- Active item -->
    <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 6px; background: #EEF2FF; color: #4F46E5; font-size: 14px; font-weight: 500; text-decoration: none; margin-bottom: 4px;">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Icon -->
      </svg>
      Dashboard
    </a>
    
    <!-- Inactive item -->
    <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 6px; color: #6B7280; font-size: 14px; font-weight: 500; text-decoration: none; margin-bottom: 4px;">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Icon -->
      </svg>
      Projects
    </a>
    
    <!-- Section divider -->
    <div style="height: 1px; background: #E5E7EB; margin: 16px 0;"></div>
    
    <!-- Section header -->
    <div style="padding: 8px 16px; font-size: 12px; font-weight: 500; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">
      Settings
    </div>
  </nav>
  
  <!-- Footer (optional) -->
  <div style="padding: 16px 24px; border-top: 1px solid #E5E7EB;">
    <!-- User profile, logout, etc -->
  </div>
</aside>
```

**Specifications:**
- Width: 256px (or 240px/280px variants)
- Background: white
- Border-right: 1px neutral-200
- Padding vertical: 24px top, 0 bottom
- Logo padding: 0 24px, 24px bottom
- Nav items padding: 0 16px (container)
- Nav item height: auto (padding-based)
- Nav item padding: 12px 16px
- Nav item border-radius: 6px
- Icon size: 20px
- Icon to text gap: 12px
- Between nav items: 4px margin-bottom
- Active item background: accent-50
- Active item text: accent-600
- Inactive item text: neutral-600
- Hover background: neutral-50
- Section header: 12px medium, uppercase, neutral-600, 0.05em letter-spacing
- Section divider: 1px neutral-200, 16px vertical margin

**Collapsed sidebar (icon-only):**
```html
<aside style="width: 72px; height: 100vh; background: white; border-right: 1px solid #E5E7EB; padding: 24px 0;">
  <nav style="padding: 0 16px;">
    <a href="#" title="Dashboard" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 6px; background: #EEF2FF; color: #4F46E5; margin-bottom: 8px;">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <!-- Icon -->
      </svg>
    </a>
  </nav>
</aside>
```

**Specifications:**
- Width: 72px
- Item width: 40px
- Item height: 40px
- Icon centered
- Tooltip on hover (show label)
- Between items: 8px margin-bottom

### Tabs Navigation (Horizontal)

**Standard tabs:**
```html
<div style="border-bottom: 1px solid #E5E7EB;">
  <nav style="display: flex; gap: 32px; padding: 0 0 0 0;">
    <!-- Active tab -->
    <a href="#" style="position: relative; padding: 12px 0; font-size: 14px; font-weight: 500; color: #4F46E5; text-decoration: none; white-space: nowrap;">
      Overview
      <span style="position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #4F46E5;"></span>
    </a>
    
    <!-- Inactive tab -->
    <a href="#" style="padding: 12px 0; font-size: 14px; font-weight: 500; color: #6B7280; text-decoration: none; white-space: nowrap;">
      Analytics
    </a>
    
    <a href="#" style="padding: 12px 0; font-size: 14px; font-weight: 500; color: #6B7280; text-decoration: none; white-space: nowrap;">
      Settings
    </a>
  </nav>
</div>
```

**Specifications:**
- Container border-bottom: 1px neutral-200
- Between tabs: 32px gap
- Tab padding vertical: 12px
- Active tab text: accent-600, font-weight 500
- Active tab indicator: 2px height, accent-600, bottom border
- Inactive tab text: neutral-600, font-weight 500
- Hover text: neutral-900
- Font-size: 14px
- White-space: nowrap (prevents wrapping)

**Pill tabs (alternative style):**
```html
<nav style="display: inline-flex; gap: 4px; padding: 4px; background: #F3F4F6; border-radius: 6px;">
  <!-- Active tab -->
  <a href="#" style="padding: 8px 16px; background: white; border-radius: 4px; font-size: 14px; font-weight: 500; color: #111827; text-decoration: none; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
    Overview
  </a>
  
  <!-- Inactive tab -->
  <a href="#" style="padding: 8px 16px; font-size: 14px; font-weight: 500; color: #6B7280; text-decoration: none;">
    Analytics
  </a>
</nav>
```

**Specifications:**
- Container background: neutral-100
- Container border-radius: 6px
- Container padding: 4px
- Between tabs: 4px gap
- Active tab: white background, shadow sm, neutral-900 text
- Active tab border-radius: 4px
- Inactive tab: transparent, neutral-600 text
- Tab padding: 8px 16px

### Breadcrumbs

**Standard breadcrumbs:**
```html
<nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 24px;">
  <a href="#" style="color: #6B7280; text-decoration: none;">
    Home
  </a>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9CA3AF" stroke-width="2">
    <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <a href="#" style="color: #6B7280; text-decoration: none;">
    Projects
  </a>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9CA3AF" stroke-width="2">
    <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span style="color: #111827; font-weight: 500;">
    Project Alpha
  </span>
</nav>
```

**Specifications:**
- Font-size: 14px
- Gap between items: 8px
- Separator icon: chevron-right, 16px, neutral-400
- Link color: neutral-600
- Link hover: neutral-900
- Current page: neutral-900, font-weight 500, no link
- Margin-bottom: 24px (from page content)

### Dropdown Menu (User Menu, Actions)

**User dropdown:**
```html
<div style="position: relative;">
  <!-- Trigger button -->
  <button style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: white; border: 1px solid #D1D5DB; border-radius: 6px; cursor: pointer;">
    <img src="..." alt="User" style="width: 32px; height: 32px; border-radius: 50%;">
    <span style="font-size: 14px; font-weight: 500; color: #111827;">John Doe</span>
    <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2">
      <path d="M4 6l4 4 4-4" stroke-linecap="round"/>
    </svg>
  </button>
  
  <!-- Dropdown (hidden by default, shown on click) -->
  <div style="position: absolute; top: calc(100% + 8px); right: 0; width: 200px; background: white; border: 1px solid #E5E7EB; border-radius: 6px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); padding: 8px; z-index: 20;">
    <a href="#" style="display: block; padding: 8px 12px; border-radius: 4px; font-size: 14px; color: #374151; text-decoration: none;">
      Profile
    </a>
    <a href="#" style="display: block; padding: 8px 12px; border-radius: 4px; font-size: 14px; color: #374151; text-decoration: none;">
      Settings
    </a>
    <div style="height: 1px; background: #E5E7EB; margin: 8px 0;"></div>
    <a href="#" style="display: block; padding: 8px 12px; border-radius: 4px; font-size: 14px; color: #DC2626; text-decoration: none;">
      Sign out
    </a>
  </div>
</div>
```

**Specifications:**
- Dropdown positioning: absolute, top 100% + 8px
- Dropdown width: 200px (or min-width based on content)
- Dropdown background: white
- Dropdown border: 1px neutral-200
- Dropdown border-radius: 6px
- Dropdown shadow: lg (0 10px 15px rgba(0,0,0,0.1))
- Dropdown padding: 8px
- Dropdown z-index: 20
- Menu item padding: 8px 12px
- Menu item border-radius: 4px
- Menu item font-size: 14px
- Menu item hover: neutral-50 background
- Divider: 1px neutral-200, 8px vertical margin
- Destructive item: red-600 text

### Mobile Navigation (Hamburger Menu)

**Mobile header with hamburger:**
```html
<header style="height: 64px; background: white; border-bottom: 1px solid #E5E7EB; padding: 0 16px; display: flex; align-items: center; justify-content: space-between;">
  <div style="font-size: 20px; font-weight: 600; color: #111827;">
    Brand
  </div>
  <button style="width: 40px; height: 40px; background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
    <span style="width: 20px; height: 2px; background: #111827; border-radius: 2px;"></span>
    <span style="width: 20px; height: 2px; background: #111827; border-radius: 2px;"></span>
    <span style="width: 20px; height: 2px; background: #111827; border-radius: 2px;"></span>
  </button>
</header>

<!-- Mobile menu (overlay, hidden by default) -->
<div style="position: fixed; top: 64px; left: 0; right: 0; bottom: 0; background: white; padding: 24px 16px; z-index: 30; overflow-y: auto;">
  <nav style="display: flex; flex-direction: column; gap: 4px;">
    <a href="#" style="padding: 12px 16px; border-radius: 6px; background: #EEF2FF; color: #4F46E5; font-size: 16px; font-weight: 500; text-decoration: none;">
      Dashboard
    </a>
    <a href="#" style="padding: 12px 16px; border-radius: 6px; color: #6B7280; font-size: 16px; font-weight: 500; text-decoration: none;">
      Projects
    </a>
  </nav>
</div>
```

**Specifications:**
- Hamburger button: 40px × 40px, centered
- Hamburger lines: 20px width, 2px height, 4px gap, neutral-900
- Mobile menu: fixed position, top 64px (below header), full width/height
- Mobile menu background: white
- Mobile menu padding: 24px 16px
- Mobile menu z-index: 30
- Nav items font-size: 16px (larger for touch)
- Nav items padding: 12px 16px
- Between nav items: 4px gap

### Pagination

**Standard pagination:**
```html
<nav aria-label="Pagination" style="display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 32px;">
  <!-- Previous button -->
  <button style="width: 40px; height: 40px; background: white; border: 1px solid #D1D5DB; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
    <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2">
      <path d="M10 4l-4 4 4 4" stroke-linecap="round"/>
    </svg>
  </button>
  
  <!-- Page numbers -->
  <button style="width: 40px; height: 40px; background: #4F46E5; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">
    1
  </button>
  <button style="width: 40px; height: 40px; background: white; color: #374151; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">
    2
  </button>
  <button style="width: 40px; height: 40px; background: white; color: #374151; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">
    3
  </button>
  <span style="padding: 0 8px; color: #9CA3AF;">...</span>
  <button style="width: 40px; height: 40px; background: white; color: #374151; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">
    10
  </button>
  
  <!-- Next button -->
  <button style="width: 40px; height: 40px; background: white; border: 1px solid #D1D5DB; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
    <svg width="16" height="16" fill="none" stroke="#6B7280" stroke-width="2">
      <path d="M6 4l4 4-4 4" stroke-linecap="round"/>
    </svg>
  </button>
</nav>
```

**Specifications:**
- Button size: 40px × 40px
- Border-radius: 6px
- Gap between buttons: 8px
- Active page: accent-600 background, white text, no border
- Inactive page: white background, neutral-700 text, 1px neutral-300 border
- Hover: neutral-50 background (inactive pages)
- Disabled (first/last page): neutral-200 background, neutral-400 icon
- Ellipsis: neutral-400 text, 8px horizontal padding

### Usage Rules

**Header navigation:**
- Use for: global app navigation, primary actions
- Max 5-7 top-level items (more = dropdown or secondary nav)
- Active state clearly visible
- Sticky on scroll (optional)

**Sidebar navigation:**
- Use for: app sections, multi-level navigation, dashboards
- Group related items with dividers/headers
- Collapsible on desktop (icon-only mode)
- Hide on mobile (hamburger menu)

**Tabs:**
- Use for: switching views within same context (not navigation to new pages)
- Max 5-7 tabs visible (more = scrollable or dropdown)
- Active tab always visible
- Content changes below tabs

**Breadcrumbs:**
- Use for: showing current location in hierarchy
- Max 4-5 levels visible (truncate middle if more)
- Last item (current page) not clickable
- Margin-bottom from content: 24px

**Dropdowns:**
- Close on outside click
- Close on item select
- Keyboard accessible (arrow keys, Enter, Escape)
- Max 10 items before scroll

**Mobile:**
- Hamburger menu for navigation on screens < 1024px
- Full-screen overlay menu (easier to tap)
- Larger touch targets (min 44px)
- Close button visible

**Accessibility:**
- Use semantic nav elements
- aria-label for navigation landmarks
- aria-current="page" for active items
- Keyboard navigation support (Tab, Arrow keys)
- Focus visible on all interactive elements

Generate navigation components using these patterns with proper structure and interactivity.
```