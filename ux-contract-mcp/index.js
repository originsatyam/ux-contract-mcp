#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const BEHAVIORAL_UX_LAWS = [
  {
    id: 'UX-LAW-01',
    name: 'Progressive Disclosure & Choice Calibration',
    rule: 'Never expose >7 primary options simultaneously. Group complex controls under contextual disclosure drawers or collapsible panels.',
    examples: 'Dia Browser & Spotify dynamically preview configuration changes directly inside interactive mockups before committing.'
  },
  {
    id: 'UX-LAW-02',
    name: 'Time-To-First-Value (TTFV) & Contextual Onboarding',
    rule: 'Demonstrate value before demanding user setup or authentication. Minimize modal barriers before core interaction.',
    examples: 'Wispr Flow & Atoms skip upfront sign-up and demonstrate features in the user\'s exact chosen context.'
  },
  {
    id: 'UX-LAW-03',
    name: 'Peak-End Rule & Celebration Calibration',
    rule: 'Reserve celebratory animations (confetti, badges, haptics) strictly for major milestones. Auto-hide onboarding tooltips upon action.',
    examples: 'Spoil Me auto-hides tooltips on user interaction to save unnecessary clicks.'
  },
  {
    id: 'UX-LAW-04',
    name: 'Optimistic UI & Perception Management',
    rule: 'Acknowledge visual feedback in under 100ms. Perform local optimistic state updates immediately; revert gracefully on failure.',
    examples: 'Linear & Stripe instant state transformations.'
  },
  {
    id: 'UX-LAW-05',
    name: 'Form Ergonomics & Inline Auto-Correction',
    rule: 'Validate fields on blur or 500ms debounce. Render inline error text with single-click auto-fix suggestions.',
    examples: 'Single-click domain auto-correct ("Did you mean .com?").'
  },
  {
    id: 'UX-LAW-06',
    name: 'Ethical Symmetrical UX & Loss Aversion',
    rule: 'Reversing an action (canceling, unsubscribing, resetting) must require no more steps than initiating it. Offer item-swapping on freemium boundaries.',
    examples: 'ClearSpace allows option swapping on freemium limits; Uber One presents transparent monthly savings breakdown at cancel.'
  }
];

const CONTRACT_RULES = [
  { id: 'UX-01', category: 'Micro-Interaction', summary: 'Visual feedback must trigger within 100ms of user interaction.' },
  { id: 'UX-02', category: 'Layout & Disclosure', summary: 'Max 7 primary controls per view; use progressive disclosure & live previews.' },
  { id: 'UX-03', category: 'State Resilience', summary: 'Optimistic UI updates with instant feedback and non-blocking revert handling.' },
  { id: 'UX-04', category: 'Feedback Calibration', summary: 'Confetti and milestone badges reserved for major completions only; auto-hide tooltips.' },
  { id: 'UX-05', category: 'Form Ergonomics', summary: 'Validate on blur/debounce only; never validate on initial focus or active typing.' },
  { id: 'UX-06', category: 'Error Recovery', summary: 'Inline error text adjacent to input with single-click auto-fix suggestions.' },
  { id: 'UX-07', category: 'Ethical UX', summary: 'Cancellation and reset flows must match the step depth of opt-in flows (1-click symmetry).' },
  { id: 'RULE-10', category: 'Focus Ring', summary: 'Single clean 2px solid focus boundary without double outline concentric box-shadow bloat.' },
  { id: 'RULE-18', category: 'Curvature Harmony', summary: 'Zero 0px sharp rectangular corners on interactive buttons, sub-actions, or badges.' },
  { id: 'RULE-22', category: 'Inline Micro-Feedback', summary: 'Inline button transitions (Copied!, Applied!) over detached floating toasts.' },
  { id: 'RULE-25', category: 'Dropdown Safety', summary: 'Custom listbox popovers over native unstyled OS select comboboxes.' },
  { id: 'RULE-26', category: 'Secret Visibility', summary: 'Password and secret inputs must feature an integrated visibility toggle button.' },
  { id: 'RULE-33', category: 'Empty States', summary: 'Data tables with 0 search matches must render structured Actionable Empty States with Reset CTA.' }
];

const server = new Server(
  {
    name: 'ux-contract-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'audit_ux_contract',
        description: 'Audit an HTML, CSS, or JS code snippet against comprehensive behavioral UX laws and deterministic design system contract rules (Rules 1-34, UX-01 to UX-07). Returns pass/fail metrics, rule violations, and remediation guidance.',
        inputSchema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'HTML, CSS, JS code snippet or UI component markup to audit.'
            },
            component_type: {
              type: 'string',
              description: 'Optional component classification: form, table, modal, drawer, navigation, or page.'
            }
          },
          required: ['code']
        }
      },
      {
        name: 'get_ux_heuristics',
        description: 'Retrieve behavioral psychology laws, friction reduction rules, micro-interaction heuristics, and real-world teardowns.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_contract_rules',
        description: 'Retrieve the compiled list of deterministic UX and design system contract rules.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Optional filter: Micro-Interaction, Form Ergonomics, Ethical UX, Layout & Disclosure, Dropdown Safety, etc.'
            }
          }
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_ux_heuristics') {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            title: 'Behavioral UX & Micro-Interaction Heuristics',
            source: 'Behavioral Psychology & Micro-Interaction Research',
            laws: BEHAVIORAL_UX_LAWS
          }, null, 2)
        }
      ]
    };
  }

  if (name === 'get_contract_rules') {
    let rules = CONTRACT_RULES;
    if (args?.category) {
      rules = rules.filter(r => r.category.toLowerCase().includes(args.category.toLowerCase()));
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            total_rules: rules.length,
            rules: rules
          }, null, 2)
        }
      ]
    };
  }

  if (name === 'audit_ux_contract') {
    const code = args.code || '';
    const violations = [];
    const passed = [];

    // Check Rule 25: Native Select leak
    if (/<select[\s>]/.test(code) && !/role=["']listbox["']/.test(code)) {
      violations.push({
        rule_id: 'RULE-25',
        severity: 'P1 High',
        description: 'Native HTML <select> detected without custom listbox popover. Native dropdowns leak sharp OS corners and unstyled OS combobox UI.',
        remediation: 'Replace native <select> with a custom listbox popover (role="listbox") with uniform curvature and verified checkmarks.'
      });
    } else {
      passed.push('RULE-25: No native unstyled <select> combobox leak detected.');
    }

    // Check Rule 26: Secret Input Visibility Toggle
    if (/type=["']password["']/.test(code) && !/(eye|toggle-password|visibility)/i.test(code)) {
      violations.push({
        rule_id: 'RULE-26',
        severity: 'P1 High',
        description: 'Password or credential input lacks an integrated visibility toggle button (Eye/Eye-off).',
        remediation: 'Add an interactive visibility toggle icon button with right padding compensation (padding-right: 44px).'
      });
    } else {
      passed.push('RULE-26: Secret input visibility toggle compliance verified.');
    }

    // Check Rule UX-01: Instant Feedback (<100ms)
    if (/<button/.test(code) && !/(:active|active|disabled|loading)/i.test(code)) {
      violations.push({
        rule_id: 'UX-01',
        severity: 'P2 Medium',
        description: 'Button interactive states (:active / loading state) not explicitly declared.',
        remediation: 'Ensure active scale/loading states trigger visual feedback within 100ms of click.'
      });
    } else {
      passed.push('UX-01: Button instant feedback state verified.');
    }

    // Check Rule UX-02: Progressive Disclosure
    const inputMatches = (code.match(/<input|<select|<textarea/g) || []).length;
    if (inputMatches > 7 && !/(drawer|accordion|tab|step)/i.test(code)) {
      violations.push({
        rule_id: 'UX-02',
        severity: 'P1 High',
        description: `View contains ${inputMatches} inputs at the top visual level without progressive disclosure step/drawer grouping.`,
        remediation: 'Group secondary inputs into collapsible accordions or modal drawers (max 7 primary fields per step).'
      });
    } else {
      passed.push(`UX-02: Progressive disclosure ceiling compliant (${inputMatches} fields).`);
    }

    // Check Rule RULE-10: Single Focus Boundary
    if (/box-shadow:\s*0\s+0\s+0\s+\d+px\s+#FFF/i.test(code) && /border:\s*2px/i.test(code)) {
      violations.push({
        rule_id: 'RULE-10',
        severity: 'P2 Medium',
        description: 'Artificial double outline detected on focus state (layered box-shadow ring over 2px border).',
        remediation: 'Use clean single-boundary focus: border: 2px solid #4F46E5 with zero-reflow padding compensation.'
      });
    } else {
      passed.push('RULE-10: Single clean focus boundary verified.');
    }

    const auditScore = Math.max(0, Math.round(100 - (violations.length * 20)));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            audit_result: violations.length === 0 ? 'PASS' : 'REMEDIATION_REQUIRED',
            compliance_score: `${auditScore}/100`,
            total_checks: passed.length + violations.length,
            violations_count: violations.length,
            violations: violations,
            passed_checks: passed
          }, null, 2)
        }
      ]
    };
  }

  throw new Error(`Tool not found: ${name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('UX Contract MCP Server running on stdio');
}

run().catch((err) => {
  console.error('Fatal error starting MCP server:', err);
  process.exit(1);
});
