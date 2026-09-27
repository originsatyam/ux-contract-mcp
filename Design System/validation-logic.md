```markdown
You are building form validation logic for prototypes.

Use design-tokens.md, input.md, and form-field-group.md specifications.

## Validation Logic Specifications

### When to Trigger Validation

**On blur (primary trigger):**
- User leaves the input field (focus moves away)
- Validates immediately if field has been touched
- Most common and least intrusive method

**On form submit:**
- User clicks submit button
- Validate all fields in the form
- Prevent submission if any field is invalid
- Focus first invalid field
- Show all errors or first error (design choice)

**Do NOT validate:**
- On focus (when user first enters field)
- On every keystroke while typing
- Before user has interacted with field

**Exception - Real-time feedback (optional, use sparingly):**
- Character counter (positive/neutral feedback, not error)
- Password strength meter (positive feedback)
- Username availability check (after debounce, async)
- Format assistance (auto-format phone, credit card as user types)

### Validation Flow

**Step 1: User enters field (focus)**
- No validation triggered
- Input shows focus state (2px accent-600 border)
- Placeholder disappears when typing begins

**Step 2: User fills field and leaves (blur)**
- Trigger validation
- Check if value is valid against rules

**Step 3a: If valid**
- Input returns to default state (1px neutral-300 border)
- No error message shown
- Field passes validation

**Step 3b: If invalid**
- Input shows error state (2px red-600 border)
- Error text appears below input (8px margin-top)
- Helper text hidden (replaced by error text)
- aria-invalid="true" added to input
- aria-describedby updated to point to error text ID

**Step 4: User refocuses invalid field to correct**
- Error state maintained (red border stays)
- Error text remains visible (user can see what to fix)
- User can read error while correcting

**Step 5: User corrects value**
- Validate on each input change (to clear error quickly)
- When value becomes valid:
  - Remove error border
  - Remove error text
  - Remove aria-invalid
  - Return to focus state if still focused
  - Return to default state if blurred

**Step 6: Form submission**
- Validate all fields
- If any invalid: prevent submission, show errors, focus first invalid field
- If all valid: allow form submission

### Error State Implementation

**Visual changes:**
```html
<input 
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
  style="border: 2px solid #DC2626; padding: 11px 15px;"
>
```

**Border:**
- Change from 1px neutral-300 to 2px red-600
- Apply to all four sides

**Padding:**
- Adjust from 12px/16px to 11px/15px
- Compensates for thicker border to prevent layout shift

**Error text:**
```html
<span id="email-error" style="display: block; margin-top: 8px; font-size: 12px; font-weight: 500; color: #DC2626;">
  Please enter a valid email address
</span>
```

**Attributes:**
- aria-invalid="true" on input
- aria-describedby="email-error" on input
- Error text has unique ID matching aria-describedby

### Validation Rules by Input Type

**Email validation:**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Email address is required' };
  }
  if (!emailRegex.test(value)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  return { valid: true };
}
```

**Password validation:**
```javascript
function validatePassword(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Password is required' };
  }
  if (value.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  // Optional: check for mix of letters, numbers, symbols
  return { valid: true };
}
```

**Required text field:**
```javascript
function validateRequired(value, fieldName) {
  if (value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true };
}
```

**Phone number validation (US format):**
```javascript
const phoneRegex = /^[\(]?[0-9]{3}[\)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

function validatePhone(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Phone number is required' };
  }
  if (!phoneRegex.test(value)) {
    return { valid: false, message: 'Please use format (555) 123-4567' };
  }
  return { valid: true };
}
```

**Number validation with range:**
```javascript
function validateNumber(value, min, max, fieldName) {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { valid: false, message: `${fieldName} must be a number` };
  }
  if (min !== undefined && num < min) {
    return { valid: false, message: `${fieldName} must be at least ${min}` };
  }
  if (max !== undefined && num > max) {
    return { valid: false, message: `${fieldName} must be no more than ${max}` };
  }
  return { valid: true };
}
```

**URL validation:**
```javascript
const urlRegex = /^https?:\/\/.+\..+$/;

function validateURL(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'URL is required' };
  }
  if (!urlRegex.test(value)) {
    return { valid: false, message: 'Please enter a valid URL starting with http:// or https://' };
  }
  return { valid: true };
}
```

### JavaScript Implementation Pattern

**Basic validation setup:**
```javascript
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

// Validate on blur
emailInput.addEventListener('blur', () => {
  const result = validateEmail(emailInput.value);
  if (!result.valid) {
    showError(emailInput, emailError, result.message);
  } else {
    clearError(emailInput, emailError);
  }
});

// Clear error as user types (only if error is currently shown)
emailInput.addEventListener('input', () => {
  if (emailInput.getAttribute('aria-invalid') === 'true') {
    const result = validateEmail(emailInput.value);
    if (result.valid) {
      clearError(emailInput, emailError);
    }
  }
});

function showError(input, errorElement, message) {
  input.setAttribute('aria-invalid', 'true');
  input.style.border = '2px solid #DC2626';
  input.style.padding = '11px 15px';
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
  input.removeAttribute('aria-invalid');
  input.style.border = '1px solid #D1D5DB';
  input.style.padding = '12px 16px';
  errorElement.style.display = 'none';
}
```

**Form submission validation:**
```javascript
const form = document.getElementById('signup-form');
const inputs = form.querySelectorAll('input[required]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  let firstInvalidInput = null;
  
  inputs.forEach(input => {
    const errorElement = document.getElementById(`${input.id}-error`);
    let result;
    
    // Validate based on input type
    if (input.type === 'email') {
      result = validateEmail(input.value);
    } else if (input.type === 'password') {
      result = validatePassword(input.value);
    } else {
      result = validateRequired(input.value, input.name);
    }
    
    if (!result.valid) {
      showError(input, errorElement, result.message);
      isValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = input;
      }
    } else {
      clearError(input, errorElement);
    }
  });
  
  if (!isValid) {
    firstInvalidInput.focus();
    firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // Form is valid, proceed with submission
    console.log('Form submitted successfully');
    // form.submit(); or handle via AJAX
  }
});
```

### Error Message Best Practices

**Be specific:**
- Bad: "Invalid input"
- Good: "Please enter a valid email address"

**Be actionable:**
- Bad: "Email format incorrect"
- Good: "Email must include @ and domain (e.g., you@example.com)"

**Be polite:**
- Bad: "You didn't enter a valid phone number"
- Good: "Please enter a valid phone number"

**Provide format examples:**
- Bad: "Date format invalid"
- Good: "Please use MM/DD/YYYY format (e.g., 01/15/2024)"

**Show one error at a time per field:**
- Don't show "Email required" and "Email invalid" together
- Priority: required > format > length > custom rules

**Common error messages:**

**Required fields:**
- "Email address is required"
- "Password is required"
- "First name is required"

**Format errors:**
- "Please enter a valid email address"
- "Please use format (555) 123-4567 for phone number"
- "URL must start with http:// or https://"

**Length errors:**
- "Password must be at least 8 characters"
- "Name must be less than 100 characters"
- "Message must be between 10 and 500 characters"

**Range errors:**
- "Age must be between 18 and 120"
- "Quantity must be at least 1"
- "Price must be a positive number"

**Pattern errors:**
- "Username can only contain letters, numbers, and underscores"
- "Zip code must be 5 digits"

### Accessibility Requirements

**Error announcement:**
- Use aria-invalid="true" when field is invalid
- Use aria-describedby to link input to error text
- Error text must have unique ID
- Screen readers announce error when field receives focus

**Focus management:**
- On form submit with errors, focus first invalid field
- Use .focus() method
- Optionally scroll invalid field into view

**Live regions (optional):**
```html
<div aria-live="polite" aria-atomic="true" class="sr-only" id="form-status"></div>
```
- Announce validation status changes
- Use for dynamic error updates
- "polite" doesn't interrupt user
- "assertive" for critical errors only

**Keyboard navigation:**
- All validation states accessible via keyboard
- Tab order logical
- Enter submits form (triggers validation)

### Multi-Field Validation (Optional)

**Password confirmation:**
```javascript
function validatePasswordMatch(password, confirmPassword) {
  if (confirmPassword.trim() === '') {
    return { valid: false, message: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match' };
  }
  return { valid: true };
}
```

**Conditional required fields:**
```javascript
// If "Other" is selected, text input becomes required
function validateConditionalRequired(selectValue, textValue) {
  if (selectValue === 'other' && textValue.trim() === '') {
    return { valid: false, message: 'Please specify other option' };
  }
  return { valid: true };
}
```

**Date range validation:**
```javascript
function validateDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end < start) {
    return { valid: false, message: 'End date must be after start date' };
  }
  return { valid: true };
}
```

### Summary of Validation Rules

**Trigger timing:**
- Primary: on blur (when user leaves field)
- Secondary: on submit (validate entire form)
- Recovery: on input (clear error as user types correction)

**Visual feedback:**
- Invalid: 2px red-600 border, padding 11px/15px, error text shown
- Valid: 1px neutral-300 border, padding 12px/16px, no error text

**Accessibility:**
- aria-invalid="true" when invalid
- aria-describedby links to error text
- Error text has unique ID
- Focus first invalid field on submit

**Error messages:**
- Specific and actionable
- One per field at a time
- Polite tone
- Include examples when helpful

**JavaScript pattern:**
- Validate on blur
- Show/clear errors with consistent functions
- Validate all on submit
- Prevent submission if invalid

Use this validation logic consistently across all form prototypes.
```