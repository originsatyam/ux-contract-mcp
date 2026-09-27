# UX Design & Behavioral Psychology Skills

> **Source**: Built for Mars Micro-Interaction & UX Teardowns  
> **Purpose**: Guidelines for creating high-conversion, low-friction, human-centered digital experiences.

---

## 1. Product Psychology & Behavior Patterns

### Default Bias & Smart Defaults
- Pre-select the safest, most beneficial, or most common options.
- Reduces decision fatigue and speeds up completion by up to 40%.

### Hick-Hyman Law & Progressive Disclosure
- Break multi-step forms into manageable steps (max 3-4 inputs per screen).
- Show advanced configurations in expanders or drawers only when requested.

### Miller's Law & Visual Chunking
- Group related items inside visually distinct cards/containers with generous padding (`gap-4`, `p-6`).
- Avoid wall-of-text layouts; use scannable headings and bullet points.

---

## 2. Micro-Interactions & Motion Design

### Response Time Thresholds
- **< 100ms**: Instantaneous feel (button active states, toggle flips).
- **100ms - 300ms**: Noticeable transition (drawer sliding, modal opening, accordion expanding).
- **> 300ms**: Requires loading feedback (skeleton screen or progress indicator).

### Micro-Feedback Matrix

| Trigger | Feedback Mechanism | Motion Curve |
| :--- | :--- | :--- |
| Primary CTA Click | Button scale (0.98x) + loading state | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Field Error | Subtle horizontal shake (4px) + inline text | `ease-in-out` 200ms |
| Successful Save | Inline checkmark icon fade-in | `ease-out` 150ms |
| Milestone Complete | Controlled toast notification / banner | `spring` physics |

---

## 3. Dark Pattern Prevention (Ethical UX)

- **Cancellation Symmetrical Flow**: Canceling a subscription or clearing settings must be as fast as subscribing.
- **Transparent Pricing**: Show all fees, taxes, and recurring cycles upfront before payment authorization.
- **No Hidden Opt-Ins**: Pre-checked checkboxes for newsletters, third-party sharing, or auto-renewals are strictly forbidden.

---

## 4. UX Audit Metrics

1. **Task Completion Rate (TCR)**: Goal ≥ 95% on primary user paths.
2. **System Usability Scale (SUS)**: Target score ≥ 85.
3. **Friction Points Count**: Zero P0 blockers allowed in production release.
