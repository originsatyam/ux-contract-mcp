# UX & Behavioral Psychology Contract Specification

> **Status**: Active & Mandatory  
> **Version**: 1.1.0  
> **Source**: Built for Mars Micro-Interaction & Behavioral UX Research  
> **Target Components**: All UI flows, forms, modals, drawers, and feedback systems

---

## 1. Interaction & State Contracts

### Contract UX-01: Instant Feedback (<100ms)
- All interactive controls (`button`, `input`, `select`, `toggle`, `link`) MUST acknowledge user interaction visually within 100ms.
- **Assertion**: Active states (`:active`, `aria-pressed`, loading spinner) MUST be triggered instantly on click/tap.

### Contract UX-02: Progressive Disclosure & Live Previews
- Views MUST NOT render more than 7 primary interactive inputs at the top visual level without grouping.
- **Assertion**: Secondary or advanced configurations MUST be enclosed within accordion toggles, tab panels, or modal drawers. Configuration options (e.g. theme/layout changes) SHOULD render dynamic live previews (as seen in *Dia* and *Spotify* BFM teardowns) before commitment.

### Contract UX-03: Optimistic UI & Error Resilience
- Actions with network dependencies MUST update the visual state immediately.
- **Assertion**: If the server call fails, the state MUST revert smoothly and display an actionable inline notification with a retry option.

### Contract UX-04: Celebration Calibration & Auto-Hiding Guides
- Celebratory feedback (confetti, modal splash, badges) MUST ONLY trigger upon completing a high-value milestone.
- **Assertion**: Routine actions (saving settings, field validation, toggling theme) MUST NOT trigger celebration animations. Onboarding tooltips MUST auto-hide once the user performs the target action.

---

## 2. Form & Field Contracts

### Contract UX-05: Non-Disruptive Validation
- Form field validation MUST NOT trigger on initial keystroke before the user finishes typing.
- **Assertion**: Validate on `blur` or after a 500ms inactivity debounce.

### Contract UX-06: Inline Auto-Fix & Error Clarity
- Errors MUST be rendered inline below or next to the affected input element.
- **Assertion**: Error text MUST explain *why* it failed and provide an auto-correct suggestion where applicable.

---

## 3. Ethical UX & Symmetrical Flow

### Contract UX-07: Symmetrical Action Flow & Loss Aversion
- Destructive, opt-out, or cancellation flows MUST require the same number of interaction steps as opt-in or setup flows.
- **Assertion**: No hidden unsubscribe links, forced phone calls, or multi-page confirm loops. When users reach freemium boundaries, offer item-swapping or clear value summaries rather than abrupt dead-end paywalls.
