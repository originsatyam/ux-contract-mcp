# Rules — Apple Human Interface Guidelines

**Source:** `https://developer.apple.com/design/human-interface-guidelines/<page>`
**Extraction route:** `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`
(note: **no** `/documentation/` segment — that path 404s)
**Fetched:** 2026-09-25 · **Provenance:** `INDEPENDENT` (see `provenance-ledger.md`)
**Extraction method:** full JSON, all guidance strings deduplicated and quoted verbatim.

Every rule below is a direct quote. Nothing is paraphrased except the **Binds to** column.

Legend for **Binds to**: `base` = a file in `Design System/`; `ext` = a file in this folder.
Apple is a **platform delta**, never the universal base. Where Apple conflicts with
Material 3 or Uber Base, see `reconciliation-breakpoints-density.md`.

---

## 1. Alerts — `…/alerts`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| A1 | "Use alerts sparingly." | ext `modal-dialog-patterns` |
| A2 | "Avoid using an alert merely to provide information." | ext `modal-dialog-patterns` |
| A3 | "Avoid displaying alerts for common, undoable actions, even when they're destructive." | ext `modal-dialog-patterns` |
| A4 | "Avoid showing an alert when your app starts." | ext `modal-dialog-patterns` |
| A5 | "In all platforms, alerts display a title, optional informative text, and **up to three buttons**." | ext `modal-dialog-patterns` — **conflicts with M3, see R4** |
| A6 | "In iOS, iPadOS, macOS, and visionOS, an alert can include a text field." | ext `modal-dialog-patterns` |
| A7 | "In all alert copy, be direct, and use a neutral, approachable tone." | ext `modal-dialog-patterns` |
| A8 | "Write a title that clearly and succinctly describes the situation." | ext `modal-dialog-patterns` |
| A9 | "Include informative text only if it adds value." | ext `modal-dialog-patterns` |
| A10 | "Avoid explaining alert buttons." | ext `modal-dialog-patterns` |
| A11 | "If supported, include a text field only if you need people's input to resolve the situation." | ext `modal-dialog-patterns` |

### Alert buttons (same page)

| # | Rule (verbatim) | Binds to |
|---|---|---|
| A12 | "Create succinct, logical button titles." | ext `modal-dialog-patterns` |
| A13 | "Avoid using OK as the default button title unless the alert is purely informational." | base `button` labels |
| A14 | "Place buttons where people expect." / "place the button people are most likely to choose on the trailing side in a row of buttons or at the top in a stack of buttons" | ext `modal-dialog-patterns` |
| A15 | "Use the destructive style to identify a button that performs a destructive action people didn't deliberately choose." | base `button` variants |
| A16 | "If there's a destructive action, include a Cancel button to give people a clear, safe way to avoid the action." | ext `modal-dialog-patterns` |
| A17 | "Always use the title 'Cancel' for a button that cancels an alert's action." | ext `modal-dialog-patterns` |
| A18 | "Provide alternative ways to cancel an alert when it makes sense." (keyboard shortcuts and other quick ways) | ext `modal-dialog-patterns` |

**Cross-check against Figma (OBSERVED):** the iOS 18 kit's own alert component sets are
`Buttons=1`, `2 (Side by Side)`, `2 Stacked`, `3 Stacked`. This **agrees** with A5 — shape
matches rules. This is genuine triangulation between a component tree and a written
guideline, and it is the only such agreement found in this corpus.

---

## 2. Action sheets — `…/action-sheets`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| AS1 | "Use an action sheet — not an alert — to offer choices related to an intentional action." | ext `modal-dialog-patterns` — **core selection rule** |
| AS2 | "Use action sheets sparingly." | ext `modal-dialog-patterns` |
| AS3 | "Aim to keep titles short enough to display on a single line." | ext `modal-dialog-patterns` |
| AS4 | "Provide a message only if necessary." | ext `modal-dialog-patterns` |
| AS5 | "Place the Cancel button at the bottom of the action sheet (or in the upper-left corner of the sheet in watchOS)." | ext `modal-dialog-patterns` |
| AS6 | "Make destructive choices visually prominent." / "place these buttons at the top of the action sheet where they tend to be most noticeable" | ext `modal-dialog-patterns` |
| AS7 | "Use an action sheet — not a menu — to provide choices related to an action." | ext `modal-dialog-patterns` |
| AS8 | "Avoid letting an action sheet scroll." | ext `modal-dialog-patterns` |
| AS9 | Three system-defined button styles exist: "The button has no special meaning." / "The button destroys user data or performs a destructive action in the app." / "The button dismisses the view without taking any action." | base `button` variants |

---

## 3. Sheets — `…/sheets`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| SH1 | "A sheet helps people perform a scoped task that's closely related to their current context." | ext `modal-dialog-patterns` |
| SH2 | "Display only one sheet at a time from the main interface." | ext `modal-dialog-patterns` |
| SH3 | "When people close a sheet, they expect to return to the parent view or window." | ext `modal-dialog-patterns` |
| SH4 | "Provide an alternative to the Done button." / "If you provide a Done button, always pair it with a Cancel button" | ext `modal-dialog-patterns` |
| SH5 | "Avoid showing all three buttons — Cancel, Done, and Back — together." | ext `modal-dialog-patterns` |
| SH6 | "Use a nonmodal view when you want to present supplementary items that affect the main task in the parent view." | ext `modal-dialog-patterns` |
| SH7 | "For complex or prolonged user flows, consider alternatives to sheets." | ext `modal-dialog-patterns` |

---

## 4. Popovers — `…/popovers`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| P1 | "Use a popover to expose a small amount of information or functionality." | ext `modal-dialog-patterns` |
| P2 | "Make sure a popover's arrow points as directly as possible to the element that revealed it. Ideally, a popover doesn't cover the element that revealed it" | ext `modal-dialog-patterns` |
| P3 | "Never show a cascade or hierarchy of popovers, in which one emerges from another." | ext `modal-dialog-patterns` |
| P4 | "Don't show another view over a popover." / "Make sure nothing displays on top of a popover, except for an alert." | ext `modal-dialog-patterns` — **z-order law** |
| P5 | "Avoid making a popover too big." | ext `modal-dialog-patterns` |
| P6 | "Avoid using a popover to show a warning." / "If you need to warn people, use an [alert]" | ext `modal-dialog-patterns` |
| P7 | "Avoid displaying popovers in compact views." / "Reserve popovers for wide views" | ext `mobile-touch-patterns` |
| P8 | "Always save work when automatically closing a nonmodal popover." | ext `modal-dialog-patterns` |

---

## 5. Buttons — `…/buttons`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| B1 | "Always include a press state for a custom button." | base `button` states |
| B2 | "In general, use a button that has a prominent visual style for the most likely action in a view." | base `button` variants |
| B3 | "Use style — not size — to visually distinguish the preferred choice among multiple options." | base `button` |
| B4 | "Avoid applying a similar color to button labels and content layer backgrounds." | base `design-tokens` |
| B5 | "Ensure that each button clearly communicates its purpose." | base `button` |
| B6 | "It's essential to include enough space around a button so that people can visually distinguish it from surrounding components and content." | base `button` |
| B7 | "Assign the primary role to the button people are most likely to choose." | base `button` |
| B8 | "Don't assign the primary role to a button that performs a destructive action, even if that action is the most likely choice." | base `button` — **safety rule** |
| B9 | Button roles are a closed set: default / cancel / destructive. | base `button` |
| B10 | "Configure a button to display an activity indicator when you need to provide feedback about an action that doesn't instantly complete." | base `button` loading state |
| B11 | "Append a trailing ellipsis to the title when a push button opens another window, view, or app." | base `button` copy |
| B12 | "Consider using text when a short label communicates more clearly than an icon." | base `button` |

---

## 6. Text fields — `…/text-fields`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| T1 | "Use a text field to request a small amount of information, such as a name or an email address." | base `input` |
| T2 | "Show a hint in a text field to help communicate its purpose." | base `input` placeholder |
| T3 | "Use secure text fields to hide private data." / "Always use a secure text field when your app asks for sensitive data, such as a password." | base `input` password |
| T4 | "To the extent possible, match the size of a text field to the quantity of anticipated text." | base `input` sizing |
| T5 | "Evenly space multiple text fields." | base `form-field-group` |
| T6 | "Ensure that tabbing between multiple fields flows as people expect." | base `validation-logic` / focus order |
| T7 | "Validate fields when it makes sense." | base `validation-logic` |
| T8 | "Consider using an expansion tooltip to show the full version of clipped or truncated text." | base `input` |

---

## 7. Lists and tables — `…/lists-and-tables`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| L1 | "Prefer displaying text in a list or table." | base `data-display-patterns` |
| L2 | "Let people edit a table when it makes sense." | base `data-display-patterns` |
| L3 | "Provide appropriate feedback when people select a list item." | base `feedback-patterns` |
| L4 | "Keep item text succinct so row content is comfortable to read." | base `data-display-patterns` |
| L5 | "Consider ways to preserve readability of text that might otherwise get clipped or truncated." | base `data-display-patterns` |
| L6 | "Use descriptive column headings in a multicolumn table." / "use nouns or short noun phrases… don't add ending punctuation" | base `data-display-patterns` |
| L7 | "Use an info button only to reveal more information about a row's content." | base `data-display-patterns` |

---

## 8. Tab bars — `…/tab-bars`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| TB1 | "Use a tab bar to support navigation, not to provide actions." | ext `mobile-touch-patterns` |
| TB2 | "Make sure the tab bar is visible when people navigate to different sections of your app." | ext `mobile-touch-patterns` |
| TB3 | "Don't disable or hide tab bar buttons, even when their content is unavailable." / "If a section is empty, explain why" | ext `mobile-touch-patterns` + base `feedback-patterns` empty state |
| TB4 | "Include tab labels to help with navigation." / "Use single words whenever possible" | ext `mobile-touch-patterns` |
| TB5 | "Use a badge to indicate that critical information is available." | base `feedback-patterns` |
| TB6 | "Avoid applying a similar color to tab labels and content layer backgrounds." | base `design-tokens` |

---

## 9. Segmented controls — `…/segmented-controls`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| S1 | "Use a segmented control to provide closely related choices that affect an object, state, or view." | ext `advanced-form-widgets` |
| S2 | "Keep control types consistent within a single segmented control." / "Don't assign actions to segments in a control that otherwise represents selection state" | ext `advanced-form-widgets` |
| S3 | "Limit the number of segments in a control." / "Aim for no more than about five to seven segments in a wide interface and no more than about five segments on [compact]" | ext `advanced-form-widgets` — **numeric ceiling** |
| S4 | "In general, keep segment size consistent." | ext `advanced-form-widgets` |
| S5 | "Prefer using either text or images — not a mix of both — in a single segmented control." | ext `advanced-form-widgets` |
| S6 | "Use nouns or noun phrases for segment labels." | ext `advanced-form-widgets` |

---

## 10. Toolbars — `…/toolbars`

| # | Rule (verbatim) | Binds to |
|---|---|---|
| TO1 | "Choose items deliberately to avoid overcrowding." | base `navigation-patterns` |
| TO2 | "Don't add an overflow menu manually" — the system adds it when items no longer fit | base `navigation-patterns` |
| TO3 | "Add a More menu to contain additional actions." / "only add this menu if you really need it" | base `navigation-patterns` |
| TO4 | "Reduce the use of toolbar backgrounds and tinted controls." | base `navigation-patterns` |
| TO5 | "Prefer using standard components in a toolbar." / corner radii should be "concentric with bar corners" | base `navigation-patterns` — **concentric radius rule** |
| TO6 | "As the window narrows, the More menu moves into an overflow menu along with other toolbar items that no longer fit." | base `navigation-patterns` |

---

## 11. Not extracted

| Page | Status |
|---|---|
| `navigation-bars` | **404** — Apple restructured this slug. `UNVERIFIED`. |
| Any page not listed above | Not fetched. `UNVERIFIED`. Do not assume coverage. |

---

**Fallback clause:** if a component or state is not covered by A1–TO6, use the base
system's existing rule for it. Do not invent an Apple rule, and do not assume Apple
has a rule for it.
