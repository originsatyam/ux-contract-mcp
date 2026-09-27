# Test Protocol: Measuring Extension Value

You are running a controlled comparison to prove or disprove that DS Extensions
reduce correction work.

## Why This Exists

The base system has no measured baseline. Every change to the spec library —
including the extension files — must be judged against a counted metric, not a
feeling.

As of 2026-09-25 there is one real baseline. `tools/check-contrast.mjs` reports
**9 non-exempt WCAG 2.2 AA violations** in the token layer, and `contrast-matrix.md`
holds every measurement. That number exists **before any generation has been tested**,
which is itself the finding: the token layer was failing accessibility independently of
anything an AI produced. Slop is not only what the model invents; it is also what the
spec asserts.

## The Metric

**Manual correction count (MCC):** the number of discrete edits you make to AI
output before it is acceptable. One edit = one conceptual fix (wrong state,
wrong spacing value, wrong overlay type, missing accessibility attribute,
invented pattern). Recoloring the same button twice counts as one fix.

Secondary metrics (record, do not optimize): time to acceptable, tokens
consumed per generation.

## Second Gate: Accessibility (pass/fail, not a score)

Contrast is not a matter of taste and is not captured by MCC. Before any screen counts as
acceptable:

```bash
node tools/check-contrast.mjs        # must exit 0
```

| Gate | Measure | Pass condition |
|---|---|---|
| Correction work | median MCC across 3 runs | lower with extensions than without |
| Accessibility | `check-contrast.mjs` exit code | 0 — no non-exempt failures |

**Both are required.** MCC measures whether the spec was *followed*; the gate measures
whether the spec is *right*. A run that improves MCC but fails the gate is a **failed run**.

## A/B Procedure

1. **Fix the screen set (use both):**
   - Screen A: modal-heavy task (e.g., "delete confirmation + quick edit form")
   - Screen B: widget form on mobile viewport (date field, stepper, PIN)
2. **Write one fixed prompt per screen.** Save the exact prompt text. Do not
   change it between runs.
3. **Run Baseline:** same prompt, base files only as context. Count MCC.
4. **Run Extension:** identical prompt, base files + DS Extensions as context.
   Count MCC.
5. **Repeat each run 3 times** (same prompt, fresh generation each time). Use
   the median, not the best run.
5b. **Run the contrast gate on each produced screen's colours.** Record the exit code.
   Count any pair the screen uses that is not already in `tools/tokens.json` by adding it
   and re-running — an undeclared pair is untested, not passing.
6. **Rest conditions between runs:** no manual edits carried over; regenerate
   from scratch.

## Recording Table (copy per screen)

| Run | Context | MCC | Contrast gate | Time to acceptable | Notes on failures |
|-----|---------|-----|---------------|--------------------|-------------------|
| 1 | Base only | | pass / fail | | |
| 2 | Base only | | pass / fail | | |
| 3 | Base only | | pass / fail | | |
| 1 | Base + Extensions | | pass / fail | | |
| 2 | Base + Extensions | | pass / fail | | |
| 3 | Base + Extensions | | pass / fail | | |

## Decision Rules

- Extension wins if median MCC with extensions < median MCC baseline for the
  same screen **and** the contrast gate exits 0.
- A run that fails the contrast gate **cannot win**, whatever its MCC. Fix the token
  or the usage, re-run, then re-count.
- A contrast failure that traces to a base token is evidence for `token-overrides-a11y.md`
  — record it there rather than hand-patching the generated HTML.
- A specific file underperforms (MCC not reduced, or new errors appear that
  trace to that file): cut or fix that file before adding anything new.
- Failures that trace to the BASE files (not extensions): log them; they are
  the evidence-based to-do list for a future base revision — still without
  modifying base files until you explicitly decide to.
- If both runs converge to similar MCC, the extension layer is not earning its
  context cost: cut it rather than keep it on faith.

## Rules of Evidence

- Never evaluate with the same conversation that wrote the spec; fresh session
  per generation.
- Log every correction with one line naming the violated rule ("used 12px gap,
  spec says 8px"). Untraceable corrections indicate a spec gap — record the
  missing rule instead of silently fixing.
- Do not tune prompts between runs. Prompt tuning invalidates the comparison.
- Three runs minimum before any conclusion. One impressive run is noise.

## After the Test

0. Confirm `node tools/check-contrast.mjs` exits 0 before judging any other result.
1. Keep files that reduce MCC.
2. Fix or cut files that do not.
3. Convert logged spec gaps into extension-file additions (never base edits)
   and re-run the protocol.
4. Only after two passing cycles: consider Phase 2 work (Figma variables token,
   project override conventions) — measured value first, infrastructure after.
