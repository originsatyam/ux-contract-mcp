#!/usr/bin/env node
/**
 * check-contrast.mjs — WCAG 2.2 AA contrast gate for a design-system token set.
 *
 * Reads a tokens JSON file, computes the WCAG 2.x contrast ratio for every declared
 * pair, prints a matrix, and EXITS NON-ZERO if any non-exempt pair fails its threshold.
 *
 * Thresholds (WCAG 2.2):
 *   1.4.3 Contrast (Minimum) AA  — text 4.5:1, large-scale text 3:1
 *   1.4.11 Non-text Contrast AA  — UI components and states 3:1
 *
 * Pairs marked "exempt": true are reported with their ratio but do not fail the run,
 * and MUST carry an "exemptReason".
 *
 * Alpha notation: an fg value of "neutral-400@0.4" means the colour at 40% opacity,
 * composited over its background before measuring. Compositing is done in sRGB
 * (non-linear) space, which matches how browsers rasterise opacity over sRGB content.
 * Approximation noted deliberately: this is a design-time gate, not a conformance audit.
 *
 * Usage:
 *   node check-contrast.mjs [path/to/tokens.json]
 *   node check-contrast.mjs --quiet      # print failures only
 *
 * Exit codes: 0 = all non-exempt pairs pass · 1 = at least one failure · 2 = bad input
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/* ---------- colour maths (WCAG 2.x definition) ---------- */

function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`bad hex: ${hex}`);
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function compositeOver(rgb, bgRgb, alpha) {
  return rgb.map((c, i) => alpha * c + (1 - alpha) * bgRgb[i]);
}

function relativeLuminance([r, g, b]) {
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(rgbA, rgbB) {
  const la = relativeLuminance(rgbA);
  const lb = relativeLuminance(rgbB);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function toHex([r, g, b]) {
  const p = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, '0');
  return `#${p(r)}${p(g)}${p(b)}`.toUpperCase();
}

/* ---------- threshold logic ---------- */

const THRESHOLDS = { text: 4.5, large: 3.0, ui: 3.0 };

function thresholdFor(kind) {
  if (!(kind in THRESHOLDS)) throw new Error(`unknown kind: ${kind}`);
  return THRESHOLDS[kind];
}

/* ---------- main ---------- */

const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const explicit = argv.find((a) => !a.startsWith('--'));
const tokensPath = explicit ? resolve(explicit) : resolve(HERE, 'tokens.json');

let data;
try {
  data = JSON.parse(readFileSync(tokensPath, 'utf8'));
} catch (err) {
  console.error(`Cannot read token file: ${tokensPath}\n  ${err.message}`);
  process.exit(2);
}

if (!data.colors || !Array.isArray(data.pairs)) {
  console.error('Token file must contain "colors" object and "pairs" array.');
  process.exit(2);
}

const resolveColor = (spec) => {
  const [name, alphaRaw] = String(spec).split('@');
  const hex = data.colors[name];
  if (!hex) throw new Error(`colour "${name}" not defined in colors`);
  const alpha = alphaRaw === undefined ? 1 : Number(alphaRaw);
  if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
    throw new Error(`bad alpha in "${spec}"`);
  }
  return { name, hex, alpha };
};

const results = [];

for (const pair of data.pairs) {
  try {
    const bgSpec = resolveColor(pair.bg);
    const fgSpec = resolveColor(pair.fg);

    const bgRgb = hexToRgb(bgSpec.hex);
    let fgRgb = hexToRgb(fgSpec.hex);

    if (!(bgSpec.alpha === 1)) throw new Error(`bg may not carry opacity: ${pair.bg}`);
    if (fgSpec.alpha !== 1) fgRgb = compositeOver(fgRgb, bgRgb, fgSpec.alpha);

    const ratio = contrastRatio(fgRgb, bgRgb);
    const threshold = thresholdFor(pair.kind);
    const pass = ratio >= threshold;
    const exempt = pair.exempt === true;

    if (exempt && !pair.exemptReason) {
      throw new Error(`pair "${pair.id}" is exempt but has no exemptReason`);
    }

    results.push({
      id: pair.id,
      kind: pair.kind,
      fg: pair.fg,
      bg: pair.bg,
      where: pair.where || '',
      ratio,
      threshold,
      pass,
      exempt,
      exemptReason: pair.exemptReason,
      effectiveFg: toHex(fgRgb),
    });
  } catch (err) {
    console.error(`Skipping pair "${pair.id}": ${err.message}`);
  }
}

/* ---------- report ---------- */

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
const width = Math.max(...results.map((r) => r.id.length), 4);

console.log(`\nWCAG 2.2 AA contrast gate`);
console.log(`tokens: ${tokensPath}`);
if (data.meta?.extractedFrom) console.log(`source: ${data.meta.extractedFrom}`);
console.log('');
console.log(`${pad('pair', width)}  ${padL('ratio', 6)}  ${padL('need', 5)}  ${pad('kind', 5)}  verdict`);
console.log(`${'-'.repeat(width)}  ${'-'.repeat(6)}  ${'-'.repeat(5)}  ${'-'.repeat(5)}  ${'-'.repeat(28)}`);

for (const r of results) {
  const show = !quiet || (!r.pass && !r.exempt);
  if (!show) continue;
  const verdict = r.pass
    ? 'PASS'
    : r.exempt
      ? 'FAIL (exempt)'
      : 'FAIL  <<<';
  console.log(
    `${pad(r.id, width)}  ${padL(r.ratio.toFixed(2), 6)}  ${padL(r.threshold.toFixed(1), 5)}  ${pad(r.kind, 5)}  ${verdict}`,
  );
}

const failing = results.filter((r) => !r.pass && !r.exempt);
const exemptFailing = results.filter((r) => !r.pass && r.exempt);
const passing = results.filter((r) => r.pass);

if (!quiet) {
  console.log('');
  const details = [...failing, ...exemptFailing];
  if (details.length) {
    console.log('Details:');
    for (const r of details) {
      console.log(`  ${r.id}`);
      console.log(`    ${r.fg} on ${r.bg}${r.effectiveFg !== undefined && r.fg.includes('@') ? `  (composites to ${r.effectiveFg})` : ''}  =  ${r.ratio.toFixed(2)}:1, needs ${r.threshold.toFixed(1)}:1`);
      if (r.where) console.log(`    where: ${r.where}`);
      if (r.exempt) console.log(`    exempt: ${r.exemptReason}`);
      console.log('');
    }
  }
}

console.log(`checked ${results.length} pairs — ${passing.length} pass, ${failing.length} fail, ${exemptFailing.length} fail-but-exempt`);

if (failing.length) {
  console.log(`\nRESULT: FAIL — ${failing.length} non-exempt violation(s).`);
  for (const r of failing) {
    console.log(`  - ${r.id}: ${r.ratio.toFixed(2)}:1 < ${r.threshold.toFixed(1)}:1 required (${r.fg} on ${r.bg})`);
  }
  process.exit(1);
}

console.log('\nRESULT: PASS — every non-exempt pair meets its WCAG 2.2 AA threshold.');
process.exit(0);
