# Rules — WCAG 2.2

**Source:** `https://www.w3.org/WAI/WCAG22/Understanding/<criterion>.html`
**Fetched:** 2026-09-25 · **Provenance:** `INDEPENDENT` (W3C is normative)
**Extraction route:** plain HTTP — W3C pages are static and extract cleanly.

Why this file exists: it is the only rule set in this folder whose requirements are
**arithmetic and therefore checkable by machine**. Apple, M3 and Uber Base give
judgement rules; WCAG gives numbers that can be tested. `tools/check-contrast.mjs`
enforces the two in §1.1 and §1.2.

---

## 1. Fetched verbatim

### 1.1 SC 1.4.3 Contrast (Minimum) — Level AA

> "The visual presentation of text and images of text has a contrast ratio of at
> least **4.5:1**, except for the following:
> **Large Text** — Large-scale text and images of large-scale text have a contrast
> ratio of at least **3:1**;
> **Incidental** — Text or images of text that are part of an inactive user interface
> component, that are pure decoration, that are not visible to anyone, or that are
> part of a picture that contains significant other visual content, have no contrast
> requirement.
> **Logotypes** — Text that is part of a logo or brand name has no contrast requirement."

Supporting intent text, verbatim: *"18 point text or 14 point bold text is judged to
be large enough to require a lower contrast ratio."* and *"14pt and 18pt are equivalent
to approximately **18.5px and 24px**."*

| Applies to | Base files |
|---|---|
| Every text/background token pair | `design-tokens`, `button`, `input`, `feedback-patterns`, `data-display-patterns`, `card-patterns`, `navigation-patterns` |
| Enforced by | `tools/check-contrast.mjs` |

**Important nuance the earlier audit got right by accident:** the *Incidental* exception
means disabled text has no contrast requirement. Your `neutral-400` is **not** excused —
it is labelled "text muted" and is used for present, readable text, not for disabled
controls.

### 1.2 SC 1.4.11 Non-text Contrast — Level AA

> "The visual information required to identify user interface components and states …
> [must have] a contrast ratio of at least **3:1** against adjacent colors."

Verbatim from the Understanding document, on hover states: *"the grey hover effect does
not itself need to contrast 3:1 with the page background, since the pointer position is
the primary indicator of the hover state."*

| Applies to | Base files |
|---|---|
| Input borders, focus indicators, checkbox/radio boundaries, icon-only buttons | `input`, `button`, `form-field-group`, `interaction-motion-patterns` |

**Scope discipline:** 1.4.11 applies where the boundary **is** the affordance (an input
field's border). It does **not** apply to purely decorative separators (a card's hairline
divider). Your `neutral-300` at 1.47:1 fails as an input border; `neutral-200` at 1.24:1
is acceptable as a decorative hairline — the distinction is the component's role, not
the colour.

### 1.3 SC 1.4.12 Text Spacing — Level AA

> "no loss of content or functionality occurs by setting all of the following and by
> changing no other style property:
> Line height (line spacing) to at least **1.5 times** the font size;
> Spacing following paragraphs to at least **2 times** the font size;
> Letter spacing (tracking) to at least **0.12 times** the font size;
> Word spacing to at least **0.16 times** the font size."

Note verbatim: *"Content is not required to use these text spacing values. The
requirement is to ensure that when a user overrides the authored text spacing, content
or functionality is not lost."*

| Applies to | Base files |
|---|---|
| Fixed-height containers that would clip under wider spacing | `layout-patterns`, `card-patterns`, `data-display-patterns` |

**Action for base:** your `design-tokens.md` line-heights are `1.0 / 1.2 / 1.5`. The
`1.0` tight setting is legitimate for large headings, but any component using it must
not have a fixed height, or SC 1.4.12 fails on override.

### 1.4 SC 2.4.11 Focus Not Obscured (Minimum) — Level AA

> "When a user interface component receives keyboard focus, the component is not
> entirely hidden due to author-created content."

Verbatim from intent, and directly relevant to this project's modal work:
*"Typical types of content that can overlap focused items are **sticky footers, sticky
headers, and non-modal dialogs**. As a user tabs through the page, these layers of
content can obscure the item receiving focus, along with its focus indicator."*

| Applies to | Base files |
|---|---|
| Modal/sheet overlays, sticky headers, sticky footers, toasts | ext `modal-dialog-patterns`, ext `mobile-touch-patterns`, base `navigation-patterns`, base `feedback-patterns` |

**This is the accessibility criterion your system is most exposed to.** Your base has
sticky navigation (`navigation-patterns`) and a toast layer (`feedback-patterns`), and
`something remain.md` flags modals as the top gap. A scrollable modal with a sticky
footer plus a toast is three overlapping layers, and 2.4.11 is the rule that governs it.
No file in the base system currently states it.

### 1.5 SC 2.5.8 Target Size (Minimum) — Level AA

> "The size of the target for pointer inputs is at least **24 by 24 CSS pixels**, except
> when:
> **Spacing** — Undersized targets … are positioned so that if a 24 CSS pixel diameter
> circle is centered on the bounding box of each, the circles do not intersect another
> target …
> **Equivalent** — The function can be achieved through a different control on the same
> page that meets this criterion;
> **Inline** — The target is in a sentence or its size is otherwise constrained by the
> line-height of non-target text;
> **User Agent Control** — … determined by the user agent and is not modified by the author;
> **Essential** — A particular presentation of the target is essential or is legally required"

Verbatim best practice: *"It is still possible to have very small, and difficult to
activate, targets and meet the requirements … However, using larger target sizes will
help many people use targets more easily."*

### Target-size ladder across the corpus

| Source | Minimum | Provenance |
|---|---|---|
| WCAG 2.2 AA (2.5.8) | **24 × 24 CSS px** | `INDEPENDENT` |
| WCAG 2.2 AAA (2.5.5 Target Size Enhanced) | 44 × 44 CSS px (referenced by W3C; not fetched verbatim) | `UNVERIFIED` verbatim |
| Apple HIG | 44 pt (referenced in your ext `mobile-touch-patterns`) | `UNVERIFIED` — not re-fetched this pass |
| Uber Base (D4) | nav bar height iOS 44 / Android 48 | `INDEPENDENT` |
| M3 (F1) | "minimum target size of 48dp" | `INDEPENDENT` |

**The ladder is the point:** 24 is the legal floor, 44+ is practice. A generator told only
"24×24" will ship 24px targets that pass audit and are miserable to tap. Your ext
`mobile-touch-patterns.md` should state **both**, and say which one governs.

---

## 2. Referenced but NOT fetched — verbatim text pending

Titles and levels below are reliable. **The quoted requirements are not** — they are
listed so the coverage gap is visible rather than hidden. Fetch before quoting.

| SC | Title | Level | Why it binds |
|---|---|---|---|
| 1.3.1 | Info and Relationships | A | Semantic structure for form groups, tables, lists |
| 1.3.5 | Identify Input Purpose | AA | `autocomplete` on identity fields |
| 2.4.7 | Focus Visible | AA | Keyboard focus indicator on every control |
| 3.3.1 | Error Identification | A | Errors described in text, not colour alone |
| 3.3.2 | Labels or Instructions | A | Visible labels for inputs |
| 3.3.3 | Error Suggestion | AA | Suggest a correction when known |

`UNVERIFIED`: none of the six above were fetched this pass. Do not quote them from this
file. `tools/extract.sh` includes them so one run completes the set.

---

## 3. What this file does not claim

- It does not claim your system fails WCAG. It states the criteria; `contrast-matrix.md`
  holds the measurements.
- It does not treat 1.4.11 as applying to decorative elements.
- It does not present 24×24 as sufficient — see the ladder in §1.5.
- It does not cover WCAG 2.2 criteria outside §1 and §2. Unlisted criteria are
  `UNVERIFIED`, not irrelevant.

---

**Fallback clause:** if a requirement is needed that is not quoted in §1, fetch the SC
and add it with its URL and date. Do not paraphrase a success criterion into this file
and claim it is normative.
