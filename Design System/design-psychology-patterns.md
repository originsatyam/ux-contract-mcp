You are building user interfaces with intentional design psychology principles.

Use design-tokens.md and all pattern specifications for implementation details.

## Design Psychology Pattern Specifications

### Visual Hierarchy Principles

**Size hierarchy (establish importance):**
- Hero/Primary heading: 32px (page title, main message)
- Section heading: 24px (major sections)
- Subsection heading: 20px (content groups)
- Emphasis heading: 16px (card titles, list headers)
- Body text: 14px (default content)
- Secondary text: 12px (metadata, captions, helper text)

**Rule:** Each screen should have ONE dominant size (hero), supported by smaller sizes in clear steps. Avoid too many size variations (max 4 sizes per screen).

**Weight hierarchy (reinforce importance):**
- Critical information: 600 semibold (page titles, primary data, key metrics)
- Important information: 500 medium (section headers, labels, emphasized text)
- Standard information: 400 regular (body text, descriptions, most content)

**Rule:** Use weight to create hierarchy within same font size. Don't make everything bold (destroys hierarchy).

**Color hierarchy (guide attention):**
- Primary action: accent-600 (only 1-2 elements per screen)
- High emphasis text: neutral-900 (titles, key data)
- Medium emphasis text: neutral-700 (body text, labels)
- Low emphasis text: neutral-600 (secondary info, metadata)
- Disabled/subtle: neutral-400 (placeholders, disabled states)

**Rule:** Accent color is RARE. Use on primary CTA and critical interactive elements only. Overuse destroys focus.

**Spacing hierarchy (create relationships):**
- Unrelated sections: 48px (clear separation)
- Related sections: 32px (grouped but distinct)
- Content blocks: 24px (related content)
- Grouped items: 16px (closely related)
- Tight association: 8px (label to input, icon to text)

**Rule:** Spacing shows relationships. Items close together = related. Items far apart = separate. Use consistent spacing values (8/16/24/32/48) to create predictable rhythm.

**Visual weight distribution:**
- Top-heavy: Important info at top (page title, primary actions) — user sees first
- Bottom-anchored: Submit buttons at bottom — completes flow
- Left-aligned: Primary content on left (Western reading pattern)
- Right-aligned: Secondary actions, metadata (less prominent)

**Rule:** Don't center-align everything. Left alignment creates clear reading flow. Center for marketing/promotional content only.

### Cognitive Load Reduction

**Progressive disclosure (show only what's needed):**
- Default view: Show 3-5 most important options
- Advanced options: Hidden behind "Advanced" or "More options" toggle
- Multi-step forms: Break into 2-4 steps, show progress
- Long lists: Show 5-10 items, "Load more" or pagination for rest
- Complex settings: Categorize into tabs or sections

**Rule:** If screen feels overwhelming, hide secondary options. User can always expand if needed.

**Chunking (group related information):**
- Forms: Group into sections (Personal Info, Account Details, Preferences)
- Lists: Group by category, date, or status
- Navigation: Group related items under section headers
- Settings: Group by feature area
- Max 7±2 items per group before creating new group

**Rule:** Human brain processes 5-9 items comfortably. More than that = create subgroups.

**Consistency (reduce learning curve):**
- Same pattern for same action everywhere (all forms validate on blur, all modals dismiss on escape)
- Same position for same element (primary button always bottom-right, cancel always to its left)
- Same color for same meaning (red = error/danger everywhere, green = success everywhere)
- Same terminology (don't say "Delete" in one place and "Remove" in another for same action)

**Rule:** Every inconsistency = user must think. Thinking = cognitive load. Consistency = familiarity = speed.

**Single primary action per screen:**
- Each screen should have ONE clear primary action (Sign In, Submit Form, Create Project)
- Primary action: accent-600 button, prominent placement, larger size
- Secondary actions: ghost or secondary buttons, less prominent
- Tertiary actions: text links, minimal visual weight

**Rule:** If user asks "what should I do here?" — hierarchy is unclear. Make primary action obvious.

**Reduce decision fatigue:**
- Provide smart defaults (pre-select most common option)
- Limit choices (3-5 options ideal, 10 maximum before overwhelming)
- Progressive disclosure (show basic options first, advanced later)
- Recommendations ("Most popular" badge, "Recommended for you" tag)

**Rule:** Every decision = mental effort. Reduce unnecessary decisions. Guide user to best choice.

### Attention & Focus Patterns

**Contrast usage (limited and intentional):**
- High contrast: Primary CTA only (accent button on neutral background)
- Medium contrast: Interactive elements (links, secondary buttons)
- Low contrast: Background, secondary content, disabled states
- Use contrast to guide eye to most important action

**Rule:** High contrast = attention magnet. Use sparingly. If everything is high contrast, nothing stands out.

**Color psychology (semantic meaning):**
- Red (#DC2626): Danger, error, destructive action, stop, urgency
- Green (#16A34A): Success, confirmation, go, positive change
- Yellow (#F59E0B): Warning, caution, important but not critical
- Blue (#4F46E5): Trust, calm, information, primary actions
- Neutral gray: Professional, stable, non-emotional content

**Rule:** Don't use red for primary action button (feels dangerous). Don't use green for errors. Match color to user expectation.

**White space (breathing room):**
- Crowded layout = anxiety, confusion, overwhelming
- Spacious layout = calm, clarity, focus
- Use 48px gaps between major sections (gives visual rest)
- Use ample padding (24-32px in cards, not 8-12px)
- Don't fill every pixel (empty space is valuable)

**Rule:** White space is not wasted space. It directs focus and reduces stress. Professional designs are spacious, not packed.

**Motion as attention trigger:**
- Loading spinner: draws attention to changing state
- Error shake: highlights mistake
- Success checkmark: confirms completion
- Toast notification: announces new information
- Use motion sparingly (too much = distracting)

**Rule:** Motion = "look here." Use only for important state changes. Decorative animations distract from content.

**Visual weight distribution (F-pattern reading):**
- Top-left: Logo, branding (user starts here)
- Top-right: User menu, notifications, secondary actions
- Top of page: Most important content (hero, title, primary message)
- Left sidebar: Navigation (scanned vertically)
- Bottom-right: Primary action button (completes flow)

**Rule:** Western users scan F-pattern (top-left → right, down left side). Place important elements in this path.

**Focal points (one per screen section):**
- Hero section: One main message or CTA
- Form: One primary submit button
- Card: One key metric or title
- Don't compete for attention (multiple focal points = none)

**Rule:** Eye can only focus on one thing at a time. Create one clear focal point per section.

### Mental Models & Conventions

**Expected positions (don't break conventions):**
- Logo: Top-left, links to home
- Search: Top-right or top-center
- User menu: Top-right corner
- Primary navigation: Top horizontal bar or left sidebar
- Primary action: Bottom-right of form/modal
- Cancel/Back: Left of primary action or top-left
- Close (X): Top-right of modal/dialog

**Rule:** Users have learned these patterns from thousands of websites. Breaking them = confusion.

**Affordances (what looks clickable must be clickable):**
- Buttons: Filled background, rounded corners, shadow (looks pressable)
- Links: Underlined or colored text (looks clickable)
- Inputs: White background, border, looks like fillable field
- Disabled elements: Low opacity, no cursor pointer (looks inactive)
- Cards: Subtle shadow + hover state (if clickable)

**Rule:** If it looks interactive, it must be. If it's not interactive, don't style it like it is.

**Metaphors (use familiar concepts):**
- Trash icon = delete (don't use X or minus)
- Magnifying glass = search (universal symbol)
- Hamburger menu (≡) = navigation drawer
- Gear/cog = settings
- Bell = notifications
- Plus (+) = add/create

**Rule:** Use standard icons. Inventing new metaphors confuses users.

**Feedback loops (confirm every action):**
- Click button → loading state (immediate feedback)
- Submit form → success message (confirmation)
- Delete item → item disappears + undo option (result visible)
- Copy text → "Copied!" message (action confirmed)
- Hover → color/style change (element is interactive)

**Rule:** User should never wonder "did that work?" Provide immediate visual feedback.

**Error recovery (forgiving, not punishing):**
- Undo for destructive actions (or confirmation dialog)
- Save drafts automatically (don't lose work)
- Clear error messages with how to fix ("Email must include @")
- Don't clear entire form on error (only invalid field)
- Validation on blur, not on every keystroke (give user time)

**Rule:** Assume user made honest mistake. Help fix it, don't punish.

### Emotional Design

**Trust signals:**
- Consistent branding (same logo, colors, voice throughout)
- Professional polish (aligned elements, consistent spacing, no typos)
- Clear communication (simple language, helpful labels)
- Security indicators (HTTPS, lock icon, privacy statements)
- Social proof (testimonials, user counts, ratings)

**Rule:** Trust is built through consistency and clarity. One sloppy detail erodes trust.

**Urgency vs calm:**

**Urgency (use sparingly):**
- Tight spacing (16px gaps, compact layout)
- Bright accent colors (red, orange for CTAs)
- Short deadlines visible ("2 hours left")
- Limited availability ("Only 3 left")
- Time-sensitive language ("Act now")

**Calm (default for most interfaces):**
- Spacious layout (24-48px gaps)
- Muted colors (neutral grays, soft accents)
- Ample white space
- Patient language ("Take your time")
- No artificial scarcity

**Rule:** Urgency is manipulative if overused. Reserve for genuinely time-sensitive situations (sale ending, session timeout).

**Delight moments (small, unexpected positives):**
- Smooth animations (button press feels satisfying)
- Success celebrations (checkmark animation, confetti on completion)
- Helpful microcopy ("Almost there!" on step 2 of 3)
- Loading state humor ("Reticulating splines...")
- Empty state encouragement ("Add your first project and watch the magic happen!")

**Rule:** Delight is seasoning, not main course. Subtle moments, not constant animations.

**Tone & voice:**
- Buttons: Action-oriented, confident ("Create Account" not "Submit")
- Errors: Helpful, not blaming ("Email must include @" not "Invalid input")
- Empty states: Encouraging ("Get started by adding..." not "No data")
- Success: Celebratory but brief ("Done!" not paragraph of text)
- Help text: Concise and clear (one sentence, no jargon)

**Rule:** Write like helpful human, not robot. Conversational but professional.

**Error handling psychology:**
- Acknowledge the problem clearly
- Explain what went wrong (specific, not vague)
- Tell user how to fix it (actionable steps)
- Don't use technical jargon ("Server returned 422" → "Please check your email format")
- Reassure it's fixable ("No worries, this is easy to fix")

**Rule:** Errors are frustrating. Reduce frustration with clarity and helpfulness.

### Accessibility Psychology (Inclusive Design)

**Color is not the only indicator:**
- Error state: red border + error icon + error text (not just red)
- Success state: green checkmark + text "Saved" (not just green)
- Required field: asterisk + label "required" (not just red asterisk)
- Disabled state: opacity + cursor change + explicit text (not just gray)

**Rule:** 8% of men are colorblind. Always provide non-color indicators.

**Clear, simple language:**
- No jargon ("authentication failed" → "wrong password")
- Short sentences (one idea per sentence)
- Active voice ("Click here" not "This button should be clicked")
- Avoid idioms (not everyone knows "piece of cake")
- Helpful labels ("Email address" not just "Email")

**Rule:** Write for 8th-grade reading level. Clarity benefits everyone.

**Forgiving interactions:**
- Large touch targets (min 44px × 44px on mobile)
- Ample click area (padding around clickable text)
- Confirmation for destructive actions ("Delete 5 items? [Cancel] [Delete]")
- Undo for non-destructive actions (close banner, dismiss notification)
- Auto-save drafts (don't lose work on accidental close)

**Rule:** Users make mistakes. Design for error tolerance, not perfect execution.

**Predictable behavior:**
- Escape key closes modal (every time)
- Enter submits form (standard behavior)
- Tab moves forward, Shift+Tab moves backward (consistent)
- Clicking outside dropdown closes it (expected)
- No surprises (new window warning, auto-play blocked)

**Rule:** Predictability reduces cognitive load. Unexpected behavior = confusion.

**Focus management:**
- Visible focus indicator on all interactive elements
- Logical tab order (top to bottom, left to right)
- Focus trapped in modal (can't tab outside while open)
- Focus returns to trigger element when modal closes
- Skip links for keyboard users ("Skip to main content")

**Rule:** 15% of users navigate by keyboard. Make tab order logical and focus visible.

### Decision-Making Frameworks

**When to use primary vs secondary vs ghost button:**
- Primary (accent-600, filled): Main action user came to do (1 per screen)
- Secondary (neutral border): Alternate path, cancel, back (2-3 per screen)
- Ghost (text only): Tertiary actions, less important (unlimited, but not prominent)

**Rule:** Too many primary buttons = none are primary. Maintain hierarchy.

**When to use modal vs inline vs new page:**
- Modal: Quick action, needs focus, doesn't change context (delete confirmation, quick form)
- Inline: Edit in place, maintain context (rename, toggle setting)
- New page: Complex task, new context, multiple steps (create project, edit profile)

**Rule:** Modal interrupts, use sparingly. Inline is seamless. New page for significant tasks.

**When to show vs hide complexity:**
- Show by default: Most users need it (basic form fields, primary actions)
- Hide by default, reveal on demand: Minority need it (advanced settings, filters)
- Progressive disclosure: Show summary, expand for details (long descriptions, specs)

**Rule:** Default view should work for 80% of users. Don't hide critical features.

**When to use validation:**
- On blur: Standard (validate after user leaves field)
- On submit: Always (catch anything missed)
- On input: Rarely (only for helpful real-time feedback like password strength, not errors)
- Never: On focus (user just arrived, hasn't typed yet)

**Rule:** Validate too early = annoying. Validate too late = frustration. Blur is sweet spot.

**When to use animation:**
- State changes: Loading → loaded, closed → open (shows transition)
- Feedback: Button press, checkbox check (confirms action)
- Attention: Error shake, new notification (draws eye)
- Never: Decoration, show-off, every hover (distracting)

**Rule:** Animate with purpose. Every animation should communicate state or provide feedback.

### Common Pitfalls to Avoid

**Don't:**
- Use accent color on more than 2 elements per screen (destroys hierarchy)
- Center-align body text (hard to read, no clear starting point)
- Make users think (unclear labels, ambiguous buttons, hidden actions)
- Use more than 3 font sizes on one screen (visual chaos)
- Hide critical actions behind menus (if it's important, show it)
- Use jargon or technical terms users don't know
- Make destructive actions easy to trigger accidentally
- Disable copy/paste in forms (frustrates users, hurts security)
- Use tiny text (below 12px unreadable for many)
- Rely on color alone for meaning (accessibility issue)

**Do:**
- Create clear visual hierarchy (size, weight, color, spacing)
- Group related items, separate unrelated (proximity principle)
- Use consistent patterns throughout (reduce learning curve)
- Provide immediate feedback for every action
- Write clear, helpful error messages
- Use familiar conventions (logo top-left, primary button bottom-right)
- Test with real users (assumptions fail, testing reveals truth)
- Prioritize clarity over cleverness (clear wins every time)

### Hierarchy Example (Form)

**Poor hierarchy (everything equal):**
- All labels same weight
- All buttons same style
- No spacing variation
- User confused about what's important

**Strong hierarchy:**
- Page title: 24px semibold (establishes context)
- Form section headers: 16px medium, 32px margin-top (organizes groups)
- Field labels: 14px medium, 8px above input (clear association)
- Helper text: 12px regular, neutral-600 (supportive, not primary)
- Primary button: accent-600, 40px height, bottom-right (clear action)
- Secondary button: neutral border, left of primary (alternate path)
- Link: 14px, neutral-600, below buttons (tertiary action)

**Result:** User knows what to read first, what to fill out, what to click. No confusion.

### Attention Example (Dashboard)

**Poor attention design:**
- 5 different colors competing
- Every card has accent color
- Everything same size
- No clear entry point

**Strong attention design:**
- Neutral background and cards (calm, professional)
- ONE accent color on primary CTA only (draws eye immediately)
- Size hierarchy: Large stat cards (important) > smaller activity feed (secondary)
- White space between sections (visual breathing room)
- User's eye flows: top stat (biggest) → charts → activity feed → action button

**Result:** User knows what's important, where to look, what to do next.

### Emotional Design Example (Error)

**Poor emotional design:**
- "Error 422: Unprocessable Entity"
- Red background, harsh tone
- No guidance on fix
- User feels blamed and frustrated

**Strong emotional design:**
- "Oops! We couldn't save your changes"
- Calm red accent (not alarming background)
- "It looks like the email address is missing an @ symbol. Try: user@example.com"
- [Try Again] button (clear next step)
- User understands problem, knows how to fix, feels supported

**Result:** Error becomes helpful moment, not frustrating dead-end.

### Application Rules

**Every screen must answer:**
1. Where am I? (clear page title, breadcrumbs if deep)
2. What can I do here? (primary action obvious)
3. What's most important? (visual hierarchy clear)
4. What happens next? (feedback on every action)

**Every interaction must provide:**
1. Affordance (looks interactive)
2. Feedback (something changes on click)
3. Confirmation (result visible)
4. Recovery (undo or fix if mistake)

**Every design decision should:**
1. Reduce cognitive load (simpler is better)
2. Match user expectations (follow conventions)
3. Guide attention intentionally (hierarchy + contrast)
4. Build trust (consistency + clarity)

Use these psychology principles to create interfaces that feel intuitive, professional, and user-centered. Technical correctness is baseline; psychological design is what makes interfaces actually work for humans.