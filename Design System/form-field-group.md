Use design-tokens.md, input.md, and label.md specifications.

## Form Field Group Specifications

### Standard Text Input Group

**Structure:**
```html
<div class="form-group">
  <label for="input-id">Label text</label>
  <input type="text" id="input-id" name="...">
  <span class="helper-text">Helper text (optional)</span>
</div>
```

**Spacing:**
- Label margin-bottom: 8px
- Input to helper text: 8px (margin-top on helper)
- Form group margin-bottom: 24px

**Specifications:**
- Label: 14px medium, neutral-700, block
- Input: 40px height, full width, 14px text, default state
- Helper text: 12px regular, neutral-600, optional

### Email Input Group

**Structure:**
```html
<div class="form-group">
  <label for="email-id">Email address<span class="required">*</span></label>
  <input 
    type="email" 
    id="email-id" 
    name="email"
    required
    autocomplete="email"
    placeholder="you@example.com"
    aria-describedby="email-helper"
  >
  <span id="email-helper" class="helper-text">We'll never share your email</span>
</div>
```

**Validation:**
- Trigger: on blur
- Error message: "Please enter a valid email address"
- Error replaces helper text

**Required attributes:**
- type="email"
- autocomplete="email"
- required (if mandatory)

### Password Input Group

**Structure:**
```html
<div class="form-group">
  <label for="password-id">Password<span class="required">*</span></label>
  <div class="input-wrapper" style="position: relative;">
    <input 
      type="password" 
      id="password-id" 
      name="password"
      required
      minlength="8"
      autocomplete="new-password"
      aria-describedby="password-helper"
      style="padding-right: 48px;"
    >
    <button 
      type="button" 
      id="toggle-password"
      class="password-toggle"
      aria-label="Show password"
      style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%);"
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  </div>
  <span id="password-helper" class="helper-text">Use 8+ characters with letters and numbers</span>
</div>
```

**Specifications:**
- Visibility toggle: 20px icon, neutral-500, right-aligned inside input
- Input right padding: 48px (to accommodate toggle button)
- Min length: 8 characters (default)
- autocomplete: "new-password" (signup/change) or "current-password" (login)

**JavaScript requirement:**
- Toggle input type between "password" and "text"
- Swap eye icon to eye-off icon
- Update aria-label

### Telephone Input Group

**Structure:**
```html
<div class="form-group">
  <label for="phone-id">Phone number</label>
  <input 
    type="tel" 
    id="phone-id" 
    name="phone"
    autocomplete="tel"
    placeholder="(555) 123-4567"
    pattern="[\(]?[0-9]{3}[\)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}"
  >
  <span class="helper-text">Format: (555) 123-4567</span>
</div>
```

**Specifications:**
- type="tel" (shows numeric keyboard on mobile)
- Pattern validates US phone format (adjust for region)
- Placeholder shows expected format

### Number Input Group

**Structure:**
```html
<div class="form-group">
  <label for="age-id">Age<span class="required">*</span></label>
  <input 
    type="number" 
    id="age-id" 
    name="age"
    required
    min="18"
    max="120"
    step="1"
    style="max-width: 200px;"
  >
</div>
```

**Specifications:**
- Use max-width constraint (numbers are short, don't need full width)
- Define min, max, step based on use case
- Validate range on blur

### Search Input Group

**Structure:**
```html
<div class="form-group">
  <label for="search-id" class="sr-only">Search</label>
  <div class="input-wrapper" style="position: relative;">
    <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #6B7280; pointer-events: none;">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M12 12l3 3" stroke="currentColor" stroke-width="2"/>
    </svg>
    <input 
      type="search" 
      id="search-id" 
      name="q"
      placeholder="Search..."
      autocomplete="off"
      aria-label="Search"
      style="padding-left: 40px;"
    >
  </div>
</div>
```

**Specifications:**
- Left icon: magnifying glass, 16px, neutral-500
- Input left padding: 40px
- Label: visually hidden (sr-only) but present for accessibility
- autocomplete="off"

### Textarea Group

**Structure:**
```html
<div class="form-group">
  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
    <label for="message-id">Message<span class="required">*</span></label>
    <span id="char-display" style="font-size: 12px; color: #4B5563;">0 / 500</span>
  </div>
  <textarea 
    id="message-id" 
    name="message"
    required
    maxlength="500"
    style="min-height: 80px; resize: vertical; width: 100%; padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 6px;"
    placeholder="Tell us more..."
    aria-describedby="message-counter"
  ></textarea>
  <span id="message-counter" class="sr-only" aria-live="polite">0 of 500 characters</span>
</div>
```

**Specifications:**
- Character counter in label row (right-aligned)
- Min-height: 80px
- Resize: vertical only
- Real-time counter update via JavaScript

### Select Dropdown Group

**Structure:**
```html
<div class="form-group">
  <label for="country-id">Country<span class="required">*</span></label>
  <select 
    id="country-id" 
    name="country"
    required
    autocomplete="country"
    style="height: 40px; padding: 12px 16px; border: 1px solid #D1D5DB; border-radius: 6px; width: 100%; font-size: 14px;"
  >
    <option value="">Select a country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
  </select>
</div>
```

**Specifications:**
- Same height, padding, border styling as text inputs
- First option is placeholder/prompt

### Checkbox Group

**Structure:**
```html
<div class="form-group">
  <div style="display: flex; align-items: start; gap: 8px;">
    <input 
      type="checkbox" 
      id="terms-id" 
      name="terms"
      required
      style="margin-top: 2px; width: 16px; height: 16px; flex-shrink: 0;"
    >
    <label for="terms-id" style="margin-bottom: 0; font-size: 14px; font-weight: 400; color: #374151;">
      I agree to the <a href="/terms" style="color: #4F46E5; text-decoration: underline;">Terms and Conditions</a>
    </label>
  </div>
</div>
```

**Specifications:**
- Checkbox: 16px × 16px, margin-top 2px
- Label: font-weight 400, margin-bottom 0
- Gap: 8px

### Radio Group

**Structure:**
```html
<div class="form-group">
  <fieldset style="border: none; padding: 0; margin: 0;">
    <legend style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">
      Delivery method<span class="required">*</span>
    </legend>
    <div style="display: flex; align-items: start; gap: 8px; margin-bottom: 12px;">
      <input 
        type="radio" 
        id="standard-id" 
        name="delivery"
        value="standard"
        required
        style="margin-top: 2px; width: 16px; height: 16px; flex-shrink: 0;"
      >
      <label for="standard-id" style="margin-bottom: 0; font-size: 14px; font-weight: 400;">
        Standard shipping (5-7 days)
      </label>
    </div>
    <div style="display: flex; align-items: start; gap: 8px;">
      <input 
        type="radio" 
        id="express-id" 
        name="delivery"
        value="express"
        style="margin-top: 2px; width: 16px; height: 16px; flex-shrink: 0;"
      >
      <label for="express-id" style="margin-bottom: 0; font-size: 14px; font-weight: 400;">
        Express shipping (2-3 days)
      </label>
    </div>
  </fieldset>
</div>
```

**Specifications:**
- Use fieldset + legend
- Radio buttons: 16px × 16px, same name
- Gap between options: 12px

### Error State Pattern

**When validation fails:**
```html
<div class="form-group">
  <label for="email-id">Email address<span class="required">*</span></label>
  <input 
    type="email" 
    id="email-id"
    aria-invalid="true"
    aria-describedby="email-error"
    style="border: 2px solid #DC2626; padding: 11px 15px;"
  >
  <span id="email-error" style="display: block; margin-top: 8px; font-size: 12px; font-weight: 500; color: #DC2626;">
    Please enter a valid email address
  </span>
</div>
```

**Error state changes:**
- Border: 2px solid red-600
- Padding: 11px 15px
- aria-invalid="true"
- Helper text hidden, error text shown

### Multi-Column Layout

**Two-column:**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
  <div class="form-group" style="margin-bottom: 0;">
    <label for="first-name">First name<span class="required">*</span></label>
    <input type="text" id="first-name" name="firstName" required autocomplete="given-name">
  </div>
  <div class="form-group" style="margin-bottom: 0;">
    <label for="last-name">Last name<span class="required">*</span></label>
    <input type="text" id="last-name" name="lastName" required autocomplete="family-name">
  </div>
</div>
```

**Three-column (city, state, zip):**
```html
<div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
  <div class="form-group" style="margin-bottom: 0;">
    <label for="city">City</label>
    <input type="text" id="city" name="city" autocomplete="address-level2">
  </div>
  <div class="form-group" style="margin-bottom: 0;">
    <label for="state">State</label>
    <input type="text" id="state" name="state" autocomplete="address-level1">
  </div>
  <div class="form-group" style="margin-bottom: 0;">
    <label for="zip">Zip</label>
    <input type="text" id="zip" name="zip" autocomplete="postal-code">
  </div>
</div>
```

### Usage Rules

**Always:**
- Include label with for attribute
- Use form-group wrapper with 24px margin-bottom
- Maintain 8px label-to-input and input-to-helper gaps
- Use appropriate autocomplete attributes
- Validate on blur, not while typing

**Accessibility:**
- aria-invalid on error state
- aria-describedby for helper/error text
- Fieldset/legend for radio/checkbox groups
- Required attribute for mandatory fields

Generate form field groups using these patterns with proper HTML structure and styling.
```