# Modal and Dialog Patterns

You are building overlays: modals, dialogs, sheets, popovers, and menus for
prototypes.

Use design-tokens.md for values, button.md for button variants, feedback-patterns.md
for banners, interaction-motion-patterns.md for timing, layout-patterns.md for
z-index layers. This file adds overlay logic; it does not redefine them.

Behavioural rules below are cited to their sources. Verbatim quotes live in
`rules-apple-hig.md` (A1–A18, AS1–AS9, SH1–SH7, P1–P8, B7–B8), `rules-material-3.md`
(R1–R9), and `rules-wcag-2.2.md` (§1.4). Where Apple and M3 disagree, the winner is
declared in `reconciliation-breakpoints-density.md` §4 and marked below.

## Scope

`[extends base: interaction-motion-patterns.md, layout-patterns.md, button.md]`
`[overrides base: button.md, design-tokens.md — inside overlay containers only, per the
two declarations below]`

## Overlay Selection Table (decide in this order)

| If you need... | Use | Max actions | Dismissal | Source |
|---|---|---|---|---|
| Confirm or reject an action | **Alert / basic dialog** | **2** — one confirming, one dismissing | Buttons only. NEVER backdrop, NEVER Escape | M3 R4–R6 · Apple A5 |
| Acknowledge a fact | **Alert / basic dialog** | **1**, acknowledgement only | Buttons only | M3 R5 |
| Informational message | **NOT a dialog** — base banner or inline text | 0 | — | Apple A2 · M3 R1 |
| Choose among related actions | **Action sheet / bottom sheet** | 1..n, Cancel last | Cancel button, backdrop, Escape | Apple AS1, AS5 |
| Multi-step task, or needs keyboard input | **Full-screen dialog** — `compact` tier only | per step | Close (X) only, in app bar | M3 R2, R3, R9 |
| Short form (1–3 fields), non-compact | **Modal dialog** | 2 | Cancel/Close, Escape, backdrop click | M3 R4 |
| Large content: long form, list, detail | **Sheet / Drawer** | 2 in header | Close, Escape, backdrop, (touch: swipe down) | Apple SH1, SH2 |
| Brief extra info anchored to a trigger | **Popover** — wide tiers only | 0 | Outside click, Escape; no backdrop dim | Apple P1, P7 |
| Actions for a specific item | **Context menu** | 0 | Outside click, Escape, item select | Apple AS7 |
| Non-blocking confirmation of an action | **Toast** (base `feedback-patterns.md`) | 0 | Auto-dismiss, close button | Apple TB5 |

NEVER use an Alert for forms. NEVER use a Popover for destructive confirmations.
NEVER use a Popover to show a warning — use an alert (Apple P6).
NEVER open a dialog when the app starts (Apple A4).
NEVER chain sheet → sheet (Apple SH2); people lose their place.
NEVER cascade popovers, one emerging from another (Apple P3).
NEVER place anything above a popover except an alert (Apple P4).
NEVER stack more than 2 overlays.

## Sizing (use only these)

- Alert: max-width 400px
- Modal dialog: max-width 480px (small form), 640px (standard)
- Sheet/Drawer: width 480px (side) or full-width bottom sheet
- Popover: min-width 200px, max-width 320px
- Context menu: min-width 180px, max-width 280px

NEVER exceed 640px for modals; larger content belongs in a sheet or page.

## Structure

```
+--------------------------------------+
| Header: title (16px semibold)    [X] |
| Body: content (14px regular)         |
| Footer: [Secondary] [Primary]        |
+--------------------------------------+
```

- Padding: 24px all sides
- Header to body: 16px; body to footer: 24px
- Title: 16px semibold, neutral-900. Body: 14px, neutral-600
- Close (X) button: 40px square hit area, top-right
- Footer buttons: primary right, cancel/secondary to its left (per button.md)
- Footer button gap: 16px per button.md (the Alert variant below declares one scoped exception)

### Alert variant (from live kit extraction: Buttons=1 / 2 side-by-side / 2 stacked / 3 stacked)

`[overrides base: button.md — inside Alert containers only, button gaps are 8px;
every other context follows the base 16px group gap]`

**Ceiling declaration** — Apple and M3 disagree and the earlier version of this file
silently followed Apple without recording it:

| Source | Rule (verbatim) |
|---|---|
| Apple HIG `alerts` | "alerts display a title, optional informative text, and **up to three buttons**" |
| M3 dialogs | "Dialogs should contain a **maximum of two actions**." |

**Resolution: the universal ceiling is 2 actions.** M3 states an explicit maximum plus a
pairing law; Apple's line describes how many the system *can* render rather than how many
to use. Apple's three-button layout is retained as a **declared iOS platform delta**, not
as the default. Full reasoning: `reconciliation-breakpoints-density.md` §4.

| Actions | Layout | Tier |
|---|---|---|
| 1 | Full-width single button; **must be an acknowledgement** (M3 R5) | universal |
| 2 | Side by side, equal width, 8px gap; one confirming + one dismissing (M3 R6) | universal |
| 3 | Stacked vertically, 8px gap; destructive last | **iOS platform delta only** |
| Destructive present | Destructive button separated from others by 8px | universal |

NEVER place destructive as the first or leftmost button.
NEVER assign the primary role to a destructive action, even when it is the most likely
choice (Apple B8).
NEVER label the cancelling button anything other than "Cancel" (Apple A17).
NEVER use "OK" as the default button title unless the alert is purely informational (A13).

**If you need a third action, the pattern is wrong** — escalate to an action sheet, where
n related choices are the intended shape.

## Behavior Rules

| Behavior | Rule | Source |
|---|---|---|
| Focus on open | First interactive element, instant | base |
| Focus trap | Tab cycles within overlay; focus never leaves | base |
| Focus retention | "Dialogs retain focus until dismissed or an action has been taken" | M3 R7 |
| Focus on close | Returns to trigger element, instant | base |
| Focus order in menus | Initial focus on the control that replaced the trigger, then top item downward | M3 F2, F3 |
| Focus not obscured | A focused element must not be **entirely** hidden by a sticky header, sticky footer or toast | WCAG 2.4.11 |
| Dialog placement | Not obscured by other elements, not partially on screen — except full-screen dialogs | M3 R8 |
| Scroll lock | Page behind modal/sheet/alert does not scroll | base |
| Escape | Closes modal, sheet, popover, menu. NEVER closes an Alert | Apple A18 |
| Backdrop click | Closes modal/sheet. NEVER closes Alert. NEVER closes popover-with-form | Apple P8 |
| Auto-close saving | "Always save work when automatically closing a nonmodal popover" | Apple P8 |
| Stacking | Max 2; base z-index layers 30/40, toasts stay at 50 | base |

**Focus-not-obscured is the rule this file was missing.** Your system stacks up to 2
overlays, a toast layer, and sticky navigation. WCAG 2.4.11 explicitly names "sticky
footers, sticky headers, and non-modal dialogs" as the typical offenders. Any modal with a
sticky footer plus an active toast can hide the focused control outright.

## Motion (all from base interaction-motion-patterns.md)

| Element | Open | Close |
|---|---|---|
| Backdrop | opacity, 200ms ease-out | 150ms ease-in |
| Modal/Alert content | opacity + scale 0.95→1, 200ms, 50ms delay | 200ms ease-in |
| Bottom sheet | translateY 100%→0, 400ms ease-out | 200ms ease-in |
| Popover/menu | opacity + translateY(-8px→0), 200ms ease-out | 150ms ease-in |

Focus transitions: instant, never animated. Respect prefers-reduced-motion per base.

**Duration bands** (`reconciliation-breakpoints-density.md` §6): **200 and 400 are
universal** — two-source convergence. 150 and 300 are retained as declared non-universal
values, and 500 is available for full-surface transitions (Uber Base `Timing`). The bottom
sheet was moved 300→400ms open and 250→200ms close so the largest surface here sits on the
universal set rather than on a value only this system uses.

## State Matrix (canonical 8)

| State | Overlay container | Trigger button |
|---|---|---|
| default | surface, radius 12px (per tokens Loose), shadow lg | per button.md variant |
| hover | not applicable | per button.md |
| focus-visible | not applicable | visible on inner controls, instant |
| active | not applicable | per button.md |
| disabled | opacity 0.5, pointer-events none on content | per button.md |
| loading | content opacity 0.5 + 32px accent-600 spinner (per feedback-patterns.md); footer buttons disabled | button loading state per feedback-patterns.md |
| error | inline error banner at top of body, margin-bottom 24px (per feedback-patterns.md) | error text under field |
| read-only | not applicable | not applicable |

## Destructive Confirmation Rule

If the action deletes data or is irreversible:
1. Use an Alert (buttons-only dismissal).
2. Title states the consequence: "Delete 5 items?"
3. Body states what is lost in one sentence.
4. Buttons: Cancel (secondary) + destructive (danger variant). Destructive is never first or leftmost.
5. Include a Cancel, always — "If there's a destructive action, include a Cancel button to
   give people a clear, safe way to avoid the action" (Apple A16).
6. Destructive style applies **only if people did not deliberately choose the action**
   (Apple A15).

**And do not ask at all in one case:** "Avoid displaying alerts for common, undoable
actions, even when they're destructive" (Apple A3). Deleting a row that can be undone does
not earn a dialog — it earns a toast with an undo action. Confirmation dialogs are the most
over-used pattern in generated UI; this rule exists to cut them.

## Canonical Example (Alert)

```html
<div role="alertdialog" aria-modal="true" aria-labelledby="al-title" aria-describedby="al-desc"
     style="position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:30;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.5);"></div>
  <div role="document" style="position:relative; width:100%; max-width:400px; background:white;
       border-radius:12px; padding:24px; box-shadow:0 10px 15px rgba(0,0,0,0.1);">
    <h2 id="al-title" style="font-size:16px; font-weight:600; color:#111827; margin:0 0 8px 0;">Delete project?</h2>
    <p id="al-desc" style="font-size:14px; color:#6B7280; margin:0 0 24px 0;">
      This permanently removes the project and its 12 tasks.
    </p>
    <div style="display:flex; gap:8px;">
      <button style="flex:1; height:40px; background:white; color:#374151; border:1px solid #D1D5DB;
              border-radius:6px; font-size:14px; font-weight:500;">Cancel</button>
      <button style="flex:1; height:40px; background:#DC2626; color:white; border:none;
              border-radius:6px; font-size:14px; font-weight:500;">Delete</button>
    </div>
  </div>
</div>
```

Inline hex values above restate base tokens for a self-contained copy-paste
example; the binding source remains design-tokens.md (neutral-900, neutral-600,
neutral-700, neutral-300, red-600, radius 12, shadow lg).

## Accessibility Requirements

- role="dialog" or role="alertdialog", aria-modal="true"
- aria-labelledby → title id; aria-describedby → description id when present
- Escape, close button, and backdrop (where allowed) all work via keyboard
- Popovers/menus: arrow-key navigation between items; keyboard model is **Tab** = next
  interactive element, **Space/Enter** = activate (M3 F4)
- Reduced motion: overlay appears without transform animation
- Focus must not be entirely hidden by a sticky header, footer or toast (WCAG 2.4.11)
- Every interactive control declares **Label / Role / State** — e.g. a toggle is
  "Label: Toggle menu · Role: Button · State: Expanded or collapsed" (M3 F5, F6). This
  format is machine-checkable; a generated overlay either supplies all three or it does not.
- Minimum target size: **24×24 CSS px** is the AA floor (WCAG 2.5.8); **44×44** is the
  practice (Apple HIG; Uber nav bar 44/48). On touch, `mobile-touch-patterns.md` governs.

## If a case is not covered here

Use the nearest pattern above; if none fits, fall back to a modal dialog with the
base feedback patterns. Do not invent a new overlay type.
