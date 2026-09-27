```markdown
You are building feedback patterns for form and UI states.

Use design-tokens.md for all spacing, colors, and typography values.

## Feedback Pattern Specifications

### Loading State (Button)

**Primary button loading:**
```html
<button 
  type="submit" 
  disabled
  style="height: 40px; padding: 12px 24px; background: #4F46E5; color: white; border: none; border-radius: 6px; opacity: 0.6; cursor: not-allowed; display: inline-flex; align-items: center; justify-content: center; gap: 8px;"
>
  <svg class="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="8" cy="8" r="6" stroke-opacity="0.25"/>
    <path d="M8 2a6 6 0 0 1 6 6" stroke-linecap="round"/>
  </svg>
  Sending...
</button>
```

**Specifications:**
- Spinner: 16px, white color, positioned left of text
- Gap between spinner and text: 8px
- Button disabled during loading
- Opacity: 0.6
- Cursor: not-allowed
- Text changes from action to present progressive (e.g., "Sign in" → "Signing in...")

**Spinner animation (CSS):**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 0.6s linear infinite;
}
```

### Loading State (Input)

**Input with loading indicator:**
```html
<div class="input-wrapper" style="position: relative;">
  <input 
    type="text" 
    disabled
    style="height: 40px; padding: 12px 48px 12px 16px; border: 1px solid #D1D5DB; border-radius: 6px; opacity: 0.5;"
  >
  <svg class="spinner" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #6B7280;">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.25"/>
    <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
</div>
```

**Specifications:**
- Spinner right-aligned inside input: position absolute, right 12px
- Input disabled and opacity 0.5
- Spinner: 16px, neutral-500 color
- Use for: async validation (username availability), autocomplete loading

### Loading State (Full Form)

**Overlay with spinner:**
```html
<div class="form-container" style="position: relative;">
  <form style="opacity: 0.5; pointer-events: none;">
    <!-- Form fields -->
  </form>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <svg class="spinner" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#4F46E5" stroke-width="3">
      <circle cx="16" cy="16" r="12" stroke-opacity="0.25"/>
      <path d="M16 4a12 12 0 0 1 12 12" stroke-linecap="round"/>
    </svg>
  </div>
</div>
```

**Specifications:**
- Form opacity 0.5, pointer-events none (prevents interaction)
- Spinner centered: 32px, accent-600 color
- Use for: form submission, data loading

### Success Message (Inline)

**Success text below input:**
```html
<span style="display: flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 12px; font-weight: 500; color: #16A34A;">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M10 3L4.5 8.5L2 6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  Email verified successfully
</span>
```

**Specifications:**
- Font: 12px, weight 500, green-600 color
- Checkmark icon: 12px, left of text, 4px gap
- Margin-top: 8px from input
- Use for: successful validation, confirmation feedback

### Success Banner (Form Level)

**Banner at top of form:**
```html
<div style="padding: 12px 16px; background: #F0FDF4; border: 1px solid #16A34A; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: start; gap: 12px;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#16A34A" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
    <circle cx="10" cy="10" r="8"/>
    <path d="M14 7l-5 5-3-3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div>
    <p style="font-size: 14px; font-weight: 500; color: #15803D; margin: 0;">
      Account created successfully
    </p>
    <p style="font-size: 12px; color: #16A34A; margin: 4px 0 0 0;">
      Check your email for verification link
    </p>
  </div>
</div>
```

**Specifications:**
- Background: green-50
- Border: 1px green-600
- Padding: 12px 16px
- Icon: 20px checkmark circle, green-600, left-aligned
- Title: 14px medium, green-700
- Description: 12px regular, green-600, 4px margin-top
- Margin-bottom: 24px (from form content)

### Error Banner (Form Level)

**Banner at top of form:**
```html
<div style="padding: 12px 16px; background: #FEF2F2; border: 1px solid #DC2626; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: start; gap: 12px;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#DC2626" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
    <circle cx="10" cy="10" r="8"/>
    <path d="M10 6v4M10 14h.01" stroke-linecap="round"/>
  </svg>
  <div>
    <p style="font-size: 14px; font-weight: 500; color: #B91C1C; margin: 0;">
      Unable to submit form
    </p>
    <p style="font-size: 12px; color: #DC2626; margin: 4px 0 0 0;">
      Please fix the errors below and try again
    </p>
  </div>
</div>
```

**Specifications:**
- Background: red-50
- Border: 1px red-600
- Padding: 12px 16px
- Icon: 20px alert circle, red-600, left-aligned
- Title: 14px medium, red-700
- Description: 12px regular, red-600, 4px margin-top
- Margin-bottom: 24px

### Info Banner

**Informational message:**
```html
<div style="padding: 12px 16px; background: #EEF2FF; border: 1px solid #4F46E5; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: start; gap: 12px;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4F46E5" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
    <circle cx="10" cy="10" r="8"/>
    <path d="M10 10v4M10 6h.01" stroke-linecap="round"/>
  </svg>
  <div>
    <p style="font-size: 14px; font-weight: 500; color: #4338CA; margin: 0;">
      Your session will expire in 5 minutes
    </p>
    <p style="font-size: 12px; color: #4F46E5; margin: 4px 0 0 0;">
      Save your work to avoid losing changes
    </p>
  </div>
</div>
```

**Specifications:**
- Background: accent-50
- Border: 1px accent-600
- Icon: 20px info circle, accent-600
- Same structure as success/error banners

### Warning Banner

**Warning message:**
```html
<div style="padding: 12px 16px; background: #FFFBEB; border: 1px solid #F59E0B; border-radius: 6px; margin-bottom: 24px; display: flex; align-items: start; gap: 12px;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#F59E0B" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
    <path d="M10 2L2 17h16L10 2z"/>
    <path d="M10 8v4M10 16h.01" stroke-linecap="round"/>
  </svg>
  <div>
    <p style="font-size: 14px; font-weight: 500; color: #D97706; margin: 0;">
      Password will expire soon
    </p>
    <p style="font-size: 12px; color: #F59E0B; margin: 4px 0 0 0;">
      Update your password in the next 7 days
    </p>
  </div>
</div>
```

**Specifications:**
- Background: yellow-50 (#FFFBEB)
- Border: 1px yellow-600 (#F59E0B)
- Icon: 20px warning triangle
- Title: yellow-700 (#D97706)
- Description: yellow-600

### Empty State

**No results or initial state:**
```html
<div style="text-align: center; padding: 48px 24px;">
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#9CA3AF" stroke-width="2" style="margin: 0 auto 16px;">
    <rect x="8" y="8" width="32" height="32" rx="4"/>
    <path d="M16 24h16M24 16v16" stroke-linecap="round"/>
  </svg>
  <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin: 0 0 8px 0;">
    No messages yet
  </h3>
  <p style="font-size: 14px; color: #6B7280; margin: 0 0 24px 0; max-width: 320px; margin-left: auto; margin-right: auto;">
    When you receive messages, they'll appear here
  </p>
  <button style="height: 40px; padding: 12px 24px; background: #4F46E5; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;">
    Compose message
  </button>
</div>
```

**Specifications:**
- Centered text alignment
- Padding: 48px vertical, 24px horizontal
- Icon: 48px, neutral-400, centered, 16px margin-bottom
- Heading: 16px semibold, neutral-700, 8px margin-bottom
- Description: 14px regular, neutral-600, max-width 320px, 24px margin-bottom
- CTA button: primary style (optional, depends on context)

### Skeleton Loading State

**Input skeleton:**
```html
<div style="height: 40px; background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%); background-size: 200% 100%; border-radius: 6px; animation: skeleton 1.5s ease-in-out infinite;">
</div>
```

**CSS animation:**
```css
@keyframes skeleton {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Form skeleton:**
```html
<div class="form-skeleton">
  <!-- Label skeleton -->
  <div style="width: 120px; height: 14px; background: #E5E7EB; border-radius: 4px; margin-bottom: 8px;"></div>
  <!-- Input skeleton -->
  <div style="height: 40px; background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%); background-size: 200% 100%; border-radius: 6px; margin-bottom: 24px; animation: skeleton 1.5s ease-in-out infinite;"></div>
  
  <!-- Repeat for multiple fields -->
</div>
```

**Specifications:**
- Label skeleton: width varies (80-150px), height 14px, neutral-200
- Input skeleton: full width, height 40px, animated gradient
- Use neutral-100 and neutral-200 for gradient
- Animation: 1.5s ease-in-out infinite

### Toast Notification (Optional Enhancement)

**Success toast:**
```html
<div style="position: fixed; bottom: 24px; right: 24px; padding: 12px 16px; background: white; border: 1px solid #E5E7EB; border-radius: 6px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px; min-width: 300px; max-width: 400px; z-index: 1000;">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#16A34A" stroke-width="2">
    <circle cx="10" cy="10" r="8"/>
    <path d="M14 7l-5 5-3-3" stroke-linecap="round"/>
  </svg>
  <div style="flex: 1;">
    <p style="font-size: 14px; font-weight: 500; color: #111827; margin: 0;">
      Changes saved
    </p>
  </div>
  <button style="background: none; border: none; color: #6B7280; cursor: pointer; padding: 4px;">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 4L4 12M4 4l8 8" stroke-linecap="round"/>
    </svg>
  </button>
</div>
```

**Specifications:**
- Position: fixed, bottom-right (24px from edges)
- Background: white, 1px neutral-200 border
- Shadow: lg (0 10px 15px rgba(0,0,0,0.1))
- Padding: 12px 16px
- Icon: 20px, green-600 for success, red-600 for error
- Auto-dismiss after 3-5 seconds
- Close button: 16px X icon, neutral-600

### Disabled State (Form)

**Entire form disabled:**
```html
<form style="opacity: 0.5; pointer-events: none;">
  <!-- All form fields inherit disabled appearance -->
</form>
```

**Individual disabled input (already covered in input.md):**
- Background: neutral-50
- Border: neutral-200
- Text: neutral-400
- Opacity: 0.5
- Cursor: not-allowed

### Progress Indicator (Multi-Step Form)

**Step indicator:**
```html
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 32px;">
  <!-- Step 1: Complete -->
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #16A34A; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500;">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 4L6 11L3 8" stroke-linecap="round"/>
      </svg>
    </div>
    <span style="font-size: 14px; color: #16A34A; font-weight: 500;">Account</span>
  </div>
  
  <!-- Connector -->
  <div style="flex: 1; height: 2px; background: #16A34A;"></div>
  
  <!-- Step 2: Current -->
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #4F46E5; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500;">
      2
    </div>
    <span style="font-size: 14px; color: #4F46E5; font-weight: 500;">Profile</span>
  </div>
  
  <!-- Connector -->
  <div style="flex: 1; height: 2px; background: #E5E7EB;"></div>
  
  <!-- Step 3: Upcoming -->
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 32px; height: 32px; border-radius: 50%; background: #F3F4F6; color: #6B7280; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; border: 2px solid #E5E7EB;">
      3
    </div>
    <span style="font-size: 14px; color: #6B7280;">Confirm</span>
  </div>
</div>
```

**Specifications:**
- Circle size: 32px diameter
- Complete step: green-600 background, white checkmark
- Current step: accent-600 background, white number
- Upcoming step: neutral-100 background, 2px neutral-200 border, neutral-600 number
- Connector line: 2px height, green-600 (complete), neutral-200 (incomplete)
- Step label: 14px medium, matches circle color

### Usage Rules

**Loading states:**
- Show spinner immediately on action (button click, form submit)
- Disable interaction during loading (opacity 0.5-0.6, pointer-events none)
- Change button text to progressive form ("Signing in...")

**Success/Error banners:**
- Position at top of form or relevant section
- Margin-bottom: 24px from content
- Include icon for quick visual recognition
- Dismissible for non-critical messages (close button)
- Auto-dismiss success after 5 seconds (optional)

**Empty states:**
- Center-aligned content
- Descriptive but concise messaging
- Optional CTA to guide next action
- Use illustrations or icons (48px) for visual interest

**Skeleton loaders:**
- Use when loading time > 300ms
- Match skeleton dimensions to actual content
- Animate gradient for perceived progress

**Toasts:**
- Bottom-right positioning (standard)
- Auto-dismiss after 3-5 seconds
- Stack multiple toasts vertically (8px gap)
- Include close button for user control

Generate feedback patterns using these specifications with proper HTML structure and inline styles or CSS.
```