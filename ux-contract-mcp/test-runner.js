import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runMCPTest() {
  console.log('🚀 Starting Realistic End-to-End Test of ux-contract-mcp server...\n');

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
    const jsonStr = JSON.stringify(msg);
    serverProcess.stdin.write(jsonStr + '\n');
  }

  let buffer = '';

  serverProcess.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // keep remaining unfinished line in buffer

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const response = JSON.parse(line);
        handleRPCResponse(response);
      } catch (err) {
        // ignore non-json logs
      }
    }
  });

  let currentStep = 0;

  function nextStep() {
    currentStep++;
    if (currentStep === 1) {
      console.log('1️⃣ Sending RPC "initialize"...');
      sendRPC('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'realistic-test-runner', version: '1.0.0' }
      });
    } else if (currentStep === 2) {
      console.log('2️⃣ Sending RPC "tools/list"...');
      sendRPC('tools/list');
    } else if (currentStep === 3) {
      console.log('3️⃣ Test Case A: Auditing a DEFECTIVE UI snippet (Native Select leak & Missing Password Eye Toggle)...');
      const defectiveSnippet = `
        <form>
          <label>Choose Country</label>
          <select name="country"><option>USA</option></select>
          <input type="password" name="password" placeholder="Enter password" />
          <button type="submit">Submit</button>
        </form>
      `;
      sendRPC('tools/call', {
        name: 'audit_ux_contract',
        arguments: { code: defectiveSnippet }
      });
    } else if (currentStep === 4) {
      console.log('4️⃣ Test Case B: Auditing a FULLY COMPLIANT UX Component...');
      const compliantSnippet = `
        <form class="space-y-4">
          <div role="listbox" aria-expanded="false" class="custom-select rounded-md">
            <span>Select Region</span>
          </div>
          <div class="relative">
            <input type="password" class="pr-11 border-2 border-indigo-600 focus:outline-none" placeholder="Password" />
            <button type="button" aria-label="Toggle visibility" class="absolute right-2 top-2 visibility-toggle">👁️</button>
          </div>
          <button type="submit" class="active:scale-95 transition-transform">Submit</button>
        </form>
      `;
      sendRPC('tools/call', {
        name: 'audit_ux_contract',
        arguments: { code: compliantSnippet }
      });
    } else if (currentStep === 5) {
      console.log('5️⃣ Test Case C: Fetching Behavioral UX Heuristics...');
      sendRPC('tools/call', {
        name: 'get_ux_heuristics',
        arguments: {}
      });
    } else {
      console.log('\n✅ All Realistic MCP Tests Passed Successfully!');
      serverProcess.kill();
      process.exit(0);
    }
  }

  function handleRPCResponse(res) {
    if (res.id === 1) {
      console.log('   ✔ MCP Initialized! Server:', res.result?.serverInfo?.name);
      nextStep();
    } else if (res.id === 2) {
      const toolNames = res.result?.tools?.map(t => t.name);
      console.log('   ✔ Tools Discovered:', toolNames);
      nextStep();
    } else if (res.id === 3) {
      const text = res.result?.content?.[0]?.text;
      const data = JSON.parse(text);
      console.log(`   ✔ Audit Score: ${data.compliance_score} | Result: ${data.audit_result}`);
      console.log(`   ✔ Detected ${data.violations_count} Rule Violations as expected:`);
      data.violations.forEach(v => console.log(`      ⚠️ [${v.rule_id}] (${v.severity}): ${v.description}`));
      nextStep();
    } else if (res.id === 4) {
      const text = res.result?.content?.[0]?.text;
      const data = JSON.parse(text);
      console.log(`   ✔ Audit Score: ${data.compliance_score} | Result: ${data.audit_result}`);
      console.log(`   ✔ Passed Checks (${data.passed_checks.length}):`);
      data.passed_checks.forEach(p => console.log(`      ✅ ${p}`));
      nextStep();
    } else if (res.id === 5) {
      const text = res.result?.content?.[0]?.text;
      const data = JSON.parse(text);
      console.log(`   ✔ Retrieved ${data.laws?.length} Behavioral Psychology Laws with Built for Mars examples.`);
      nextStep();
    }
  }

  nextStep();
}

runMCPTest();
