---
name: ux-audit
description: Principal-level UX audit, behavioral psychology, friction reduction, and micro-interaction heuristics derived from Built for Mars research. Use to evaluate, design, or refactor software interfaces.
---

# UX Audit & Behavioral Psychology Skill

> **Derived from**: Built for Mars Case Studies & Micro-Interaction Research  
> **Audience**: Principal Product Designers, UX Engineers, Systems Architects

---

## Core UX Heuristics & Behavioral Laws

### 1. Progressive Disclosure & Choice Calibration
- **Rule**: Never expose >7 primary options simultaneously.
- **Implementation**: Group complex controls under contextual disclosure drawers or collapsible panels. Provide opinionated smart defaults (e.g., pre-select recommended options).
- **Built for Mars Example**: *Dia Browser & Spotify* dynamically preview configuration changes (themes, font zoom) directly inside interactive mockups before committing, reducing trial-and-error clicks.

### 2. Time-To-First-Value (TTFV) & Contextual Onboarding
- **Rule**: Demonstrate value before demanding user setup or authentication.
- **Implementation**: Allow instant interaction in sandbox/preview mode before requiring account creation or payment setup.
- **Built for Mars Example**: *Wispr Flow & Atoms* skip upfront sign-up and demonstrate features in the user's exact chosen context to eliminate Loss Aversion.

### 3. Peak-End Rule & Micro-Feedback Calibration
- **Rule**: Reserve celebratory animations (confetti, badges, haptic effects) strictly for major milestones (e.g., first deployment, payment completion).
- **Implementation**: Use subtle toast/inline checkmarks for routine actions (e.g., saving settings, copying text).
- **Built for Mars Example**: Tooltips and inline guides should auto-hide upon user interaction to save unnecessary dismiss clicks.

### 4. Optimistic UI & Perception Management
- **Rule**: User actions must acknowledge feedback in under **100ms**.
- **Implementation**: Perform optimistic local state updates immediately; revert gracefully with clear error recovery if network requests fail.
- **Loading States**: Use skeleton screens matching exact layout dimensions instead of generic spinners.

### 5. Form Ergonomics & Inline Autocorrect
- **Rule**: Validate fields on `blur` or after a 500ms debounce during typing.
- **Implementation**: Provide clear, descriptive error messaging directly adjacent to the input field, with single-click auto-fix suggestions (e.g., "Did you mean `.com`?").
- **Accessibility**: Associate errors with inputs via `aria-describedby`.

### 6. Symmetrical UX (Zero Dark Patterns) & Churn Reduction
- **Rule**: Reversing an action (canceling, unsubscribing, clearing data, toggling off) must require no more steps than initiating it.
- **Implementation**: Provide clear, equal-weight action buttons without emotional manipulation. Offer flexible alternatives (e.g., *ClearSpace* option swapping or *Uber One* transparent savings summary) rather than hostage paywalls.

---

## Audit Checklist

When performing a UX Audit on a screen or workflow:

1. [ ] **Cognitive Load Check**: Is the primary call-to-action (CTA) visually distinct from secondary actions?
2. [ ] **Friction Audit**: Count the number of clicks/inputs required to complete the main goal. Can any step be automated or defaulted?
3. [ ] **State Feedback Audit**: Are empty states, loading states, error states, and success states explicitly designed and tested?
4. [ ] **Keyboard & Screen Reader Nav**: Can every flow be navigated using only `Tab`, `Enter`, `Space`, and `Escape`?
5. [ ] **Micro-Animation Audit**: Do animations enhance clarity without delaying user interaction?

---

## Integration with Design Contracts

Reference [`contract/ux.md`](file:///f:/Antigravity/solving%20AI%20SLOP/contract/ux.md) for strict compliance checking during automated audits.
