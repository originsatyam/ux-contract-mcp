# Overlays, Dialogs, and Navigation Shell Contract

## Overlay Selection Matrix

| Need | Component Pattern | Max Actions | Dismissal Rules |
| :--- | :--- | :---: | :--- |
| Confirm irreversible destructive action | Alert Dialog | 2 | Buttons only. Escape and backdrop click strictly blocked. |
| Acknowledge notice or status | Basic Dialog | 1 | Acknowledgement button only. |
| Short form (1 to 3 fields) | Modal Dialog | 2 | Primary button, Cancel button, Escape, backdrop click. |
| Long form, complex filters, details | Sheet or Drawer | 2 | Close button, Escape, backdrop, downward swipe on touch. |
| Multiple related action choices | Action Sheet | 3 to 6 | Option buttons, Cancel button at bottom, backdrop click. |
| Lightweight non-blocking confirmation | Toast Notification | 0 | Auto-dismiss after 3 to 5 seconds, close button, Undo action. |

---

## Action Ceilings and Ergonomics

### Dialog Action Rules
- Basic dialogs contain a maximum of TWO actions (one confirming, one dismissing).
- Single action must be an acknowledgement only ("Understood", "Dismiss").
- If three or more actions are needed, the pattern is invalid; escalate to an action sheet.
- Primary CTA sits on the bottom-right (confirming); secondary or cancel button sits to its left.
- In desktop dialogs, the destructive button must never be placed first or leftmost.

### Destructive Guard
- Irreversible actions (deletion, permanent loss) must reject backdrop dismissal and keyboard Escape dismissal.
- User must make an explicit button selection.
- Destructive button uses `#DC2626` base with white text. Never assign primary brand accent (`#4F46E5`) to a destructive action.
- Destructive action must never transition into a green success button inside the dialog. Close the dialog immediately and display an external toast confirmation.

---

## Focus Trapping and Restoration

### Trapping and Scroll Lock
- Opening an overlay locks body scroll (`overflow: hidden`).
- Background page content receives `inert` or `aria-hidden="true"`.
- Keyboard Tab key cycles strictly within the overlay boundaries.

### Restoration Defense
- Upon overlay dismissal, verify target existence before restoring focus:
  `if (document.contains(previousActiveElement)) { previousActiveElement.focus(); } else { document.querySelector('main').focus(); }`
- Prevents focus vanishing if the trigger element was removed or re-rendered during the action.

---

## Architectural Z-Index Ladder and Navigation Shell

### Standard Z-Index Hierarchy
- Base Page Canvas: `z-index: 0`
- Sticky App Header: `z-index: 10`
- Dropdown Menus and Popovers: `z-index: 20`
- Modal and Drawer Backdrops: `z-index: 30`
- Modal and Drawer Content Containers: `z-index: 40`
- Toasts and Skip-Links: `z-index: 50`
- Arbitrary values such as `z-9999` or `z-100` are strictly prohibited.

### Mandatory Accessibility Skip Link
- The very first child element inside `<body>` must be a visually hidden skip link:
  `<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50">Skip to content</a>`
- Targets `<main id="main-content">` directly.
