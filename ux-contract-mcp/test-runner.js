import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runMCPTest() {
  console.log('🚀 Testing Knowledge-Integrated ux-contract-mcp Server...\n');

  const serverProcess = spawn('node', [path.join(__dirname, 'index.js')], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  let messageId = 1;

  function sendRPC(method, params = {}) {
    const msg = {
      jsonrpc: '2.0',
      id: messageId++,
      method,
      params
    };
    serverProcess.stdin.write(JSON.stringify(msg) + '\n');
  }

  let buffer = '';

  serverProcess.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const response = JSON.parse(line);
        handleRPCResponse(response);
      } catch (err) {}
    }
  });

  let currentStep = 0;

  function nextStep() {
    currentStep++;
    if (currentStep === 1) {
      console.log('1️⃣ Initializing MCP...');
      sendRPC('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'knowledge-test', version: '1.0.0' }
      });
    } else if (currentStep === 2) {
      console.log('2️⃣ Listing available tools...');
      sendRPC('tools/list');
    } else if (currentStep === 3) {
      console.log('3️⃣ Fetching Agent Skill from .agents/skills/ux-audit/SKILL.md...');
      sendRPC('tools/call', { name: 'get_agent_skill' });
    } else if (currentStep === 4) {
      console.log('4️⃣ Fetching Contract files from contract/ directory...');
      sendRPC('tools/call', { name: 'get_contract_rules', arguments: { file: 'ux' } });
    } else if (currentStep === 5) {
      console.log('5️⃣ Fetching Design Skills from design-skills/ directory...');
      sendRPC('tools/call', { name: 'get_design_system_skills', arguments: { type: 'ux' } });
    } else if (currentStep === 6) {
      console.log('6️⃣ Auditing UI snippet against full contract rules...');
      sendRPC('tools/call', {
        name: 'audit_ux_contract',
        arguments: {
          code: `
            <div class="sidebar-layout">
              <nav class="flex-row">
                <a href="#">Item 1</a><a href="#">Item 2</a><a href="#">Item 3</a><a href="#">Item 4</a><a href="#">Item 5</a>
              </nav>
              <form>
                <select><option>Select Option</option></select>
                <input type="password" placeholder="Password" />
              </form>
            </div>
          `
        }
      });
    } else {
      console.log('\n✅ Knowledge Integration Verification Successful!');
      serverProcess.kill();
      process.exit(0);
    }
  }

  function handleRPCResponse(res) {
    if (res.id === 1) {
      console.log('   ✔ Initialized!');
      nextStep();
    } else if (res.id === 2) {
      console.log('   ✔ Tools List:', res.result?.tools?.map(t => t.name));
      nextStep();
    } else if (res.id === 3) {
      const data = JSON.parse(res.result?.content?.[0]?.text);
      console.log(`   ✔ Agent Skill Found! Content Length: ${data.content?.length} bytes (Source: ${data.source})`);
      nextStep();
    } else if (res.id === 4) {
      const data = JSON.parse(res.result?.content?.[0]?.text);
      console.log(`   ✔ Contract files loaded: ${data.loaded_files.join(', ')} (contract/ux.md length: ${data.contract_contents?.ux?.length} bytes)`);
      nextStep();
    } else if (res.id === 5) {
      const data = JSON.parse(res.result?.content?.[0]?.text);
      console.log(`   ✔ Design Skills loaded: ${data.sources.join(', ')} (design-skills/ux-skills.md length: ${data.skills?.ux?.length} bytes)`);
      nextStep();
    } else if (res.id === 6) {
      const data = JSON.parse(res.result?.content?.[0]?.text);
      console.log(`   ✔ Audit Score: ${data.compliance_score} | Violations Caught: ${data.violations_count}`);
      data.violations.forEach(v => console.log(`      ⚠️ [${v.rule_id}]: ${v.description}`));
      nextStep();
    }
  }

  nextStep();
}

runMCPTest();
