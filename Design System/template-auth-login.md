You are building a complete login screen template for a SaaS application.

Use design-tokens.md, button.md, input.md, label.md, form-field-group.md, validation-logic.md, and feedback-patterns.md.

## Login Screen Template

### Layout Structure

**Container:**
- Max-width: 400px
- Centered horizontally and vertically on page
- Background: white
- Border: 1px solid neutral-200 (optional, for card style)
- Border-radius: 8px (if using card)
- Padding: 32px
- Box-shadow: md (optional, for elevation)

**Page background:**
- Background: neutral-50 or neutral-100
- Min-height: 100vh
- Display: flex, align-items: center, justify-content: center

### Component Order (Top to Bottom)

**1. Logo/Brand (optional)**
- Position: top of card
- Margin-bottom: 24px
- Logo height: 32-40px or text-based brand name
- Centered or left-aligned

**2. Page Title**
- Text: "Sign in" or "Welcome back"
- Font-size: 24px
- Font-weight: 600 (semibold)
- Color: neutral-900
- Margin-bottom: 8px

**3. Subtitle (optional)**
- Text: "Enter your credentials to access your account"
- Font-size: 14px
- Color: neutral-600
- Margin-bottom: 32px

**4. Error/Success Banner (conditional)**
- Shows only when there's a message to display
- Margin-bottom: 24px
- Use error banner for failed login
- Use success banner for password reset confirmation

**5. Email Input Group**
- Label: "Email address"
- Required indicator: *
- Input type: email
- Autocomplete: email
- Placeholder: "you@example.com"
- Helper text: optional
- Margin-bottom: 24px

**6. Password Input Group**
- Label: "Password"
- Required indicator: *
- Input type: password
- Autocomplete: current-password
- Min-length: 8
- Visibility toggle: included
- Padding-right: 48px (for toggle button)
- Margin-bottom: 16px

**7. Forgot Password Link**
- Text: "Forgot password?"
- Font-size: 14px
- Font-weight: 500
- Color: accent-600
- Hover color: accent-700
- Position: below password input, left or right aligned
- Margin-bottom: 24px

**8. Submit Button**
- Text: "Sign in"
- Type: submit
- Variant: primary
- Width: 100% (full width)
- Height: 40px
- Margin-bottom: 24px
- Loading state: spinner + "Signing in..." when submitting

**9. Divider (optional, if social login included)**
- Text: "Or continue with"
- Position: centered between lines
- Margin-bottom: 24px

**10. Social Login Buttons (optional)**
- Secondary button style
- Icons: Google, GitHub, etc.
- Full width or side-by-side
- Margin-bottom: 24px

**11. Sign Up Link**
- Text: "Don't have an account? Sign up"
- Font-size: 14px
- Color: neutral-600 for "Don't have an account?", accent-600 for "Sign up"
- Centered
- No margin-bottom (last element)

### Spacing Summary

- Logo to title: 24px
- Title to subtitle: 8px
- Subtitle to form: 32px
- Banner to form: 24px (when shown)
- Between form groups: 24px
- Password to forgot link: 16px
- Forgot link to button: 24px
- Button to divider: 24px
- Divider to social buttons: 24px
- Social buttons to sign up link: 24px

### Validation Behavior

**On blur:**
- Email: validate format
- Password: validate min-length

**On submit:**
- Validate both fields
- Show inline errors if invalid
- Focus first invalid field
- If valid: show loading state, simulate API call

**Loading state:**
- Disable submit button
- Show spinner in button
- Change text to "Signing in..."
- Disable form inputs (opacity 0.5, pointer-events none)

**Success:**
- Show success banner (optional)
- Redirect after 1-2 seconds (or immediate)

**Error:**
- Show error banner at top: "Invalid email or password"
- Re-enable form
- Clear password field (security best practice)
- Focus email field

### Accessibility Requirements

**Form element:**
- Use `<form>` with proper submit handling
- Method: POST (or handled via JavaScript)
- novalidate attribute (custom validation)

**Labels:**
- All inputs have associated labels
- Labels use `for` attribute matching input `id`

**ARIA:**
- aria-invalid on error state
- aria-describedby for helper/error text
- aria-live region for banner announcements (optional)

**Keyboard navigation:**
- Tab order: email → password → forgot link → submit → sign up link
- Enter in input submits form
- Password toggle accessible via keyboard

### Responsive Behavior

**Desktop (≥640px):**
- Card width: 400px
- Padding: 32px
- Centered on page

**Mobile (<640px):**
- Full width with 16px horizontal margins
- Padding: 24px
- Vertical centering maintained

### Security Considerations

**Password field:**
- Type: password (obscured by default)
- Include visibility toggle for UX
- Clear on failed login attempt
- Don't show password in error messages

**Form submission:**
- Use HTTPS only (not enforced in prototype, but note in comments)
- Don't log credentials
- Implement rate limiting on backend (not in prototype)

### HTML Structure Template

```html
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-full bg-neutral-50 flex items-center justify-center p-4">
  
  <div class="w-full max-w-md bg-white rounded-lg border border-neutral-200 shadow-md p-8">
    
    <!-- Logo (optional) -->
    <div class="mb-6">
      <!-- Logo or brand name -->
    </div>
    
    <!-- Title -->
    <h1 class="text-2xl font-semibold text-neutral-900 mb-2">
      Sign in
    </h1>
    
    <!-- Subtitle (optional) -->
    <p class="text-sm text-neutral-600 mb-8">
      Enter your credentials to access your account
    </p>
    
    <!-- Error Banner (hidden by default) -->
    <div id="error-banner" class="hidden mb-6">
      <!-- Error banner from feedback-patterns.md -->
    </div>
    
    <!-- Form -->
    <form id="login-form" novalidate>
      
      <!-- Email Input Group -->
      <div class="form-group mb-6">
        <!-- Email field from form-field-group.md -->
      </div>
      
      <!-- Password Input Group -->
      <div class="form-group mb-4">
        <!-- Password field with toggle from form-field-group.md -->
      </div>
      
      <!-- Forgot Password Link -->
      <div class="mb-6">
        <a href="/forgot-password" class="text-sm font-medium text-accent-600 hover:text-accent-700">
          Forgot password?
        </a>
      </div>
      
      <!-- Submit Button -->
      <button type="submit" id="submit-btn" class="w-full">
        <!-- Primary button from button.md -->
        Sign in
      </button>
      
    </form>
    
    <!-- Sign Up Link -->
    <p class="text-center text-sm text-neutral-600 mt-6">
      Don't have an account? 
      <a href="/signup" class="font-medium text-accent-600 hover:text-accent-700">
        Sign up
      </a>
    </p>
    
  </div>
  
  <script>
    // Validation logic from validation-logic.md
    // Password toggle from input.md
    // Loading state from feedback-patterns.md
    // Form submit handler
  </script>
  
</body>
</html>

JavaScript Requirements
Include:

Email validation on blur
Password validation on blur
Password visibility toggle
Form submit validation
Loading state (button spinner, disabled form)
Error handling (show banner, clear password, focus email)
Success handling (optional banner, redirect simulation)
Usage Notes
This template is for:

SaaS application login
Web app authentication
Dashboard access
Account portal entry
Customize by:

Adding/removing logo
Changing title/subtitle text
Including social login buttons
Adjusting card width (320-480px range)
Modifying color scheme (use design tokens)
Do not:

Store passwords in localStorage/sessionStorage
Log credentials to console
Submit over HTTP in production
Show specific error messages that aid attackers ("Email exists" vs "Invalid credentials")
Generate complete login screen using this template with all components, validation, and interactivity.