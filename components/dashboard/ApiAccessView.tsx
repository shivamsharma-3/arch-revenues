"use client";

import React, { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, Code2, Cpu, ExternalLink } from 'lucide-react';

export function ApiAccessView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const curlExample = `curl -X POST https://archrevenues.com/api/sdr/generate \\
  -H "Content-Type: application/json" \\
  -H "x-passkey: arch2026" \\
  -d '{
    "url": "https://linear.app",
    "value_prop": "We build AI SDR agents for agencies",
    "tone": "founder-to-founder"
  }'`;

  const pythonExample = `import requests

url = "https://archrevenues.com/api/sdr/generate"
headers = {
    "Content-Type": "application/json",
    "x-passkey": "arch2026"  # Or Authorization: Bearer arch2026
}
payload = {
    "url": "https://linear.app",
    "value_prop": "We build AI SDR agents for agencies",
    "tone": "founder-to-founder"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

print("ICP Score:", data["research"]["icp_fit_score"])
print("Cold Email:\\n", data["sequence"]["email_1"])`;

  const llmToolSpec = `{
  "name": "generate_outbound_sequence",
  "description": "Scrapes a prospect website, scores ICP fit, and drafts a 5-step cold outreach sequence.",
  "parameters": {
    "type": "object",
    "properties": {
      "url": { "type": "string", "description": "Website URL of the target company" },
      "value_prop": { "type": "string", "description": "Your offering or value proposition" },
      "tone": { "type": "string", "enum": ["founder-to-founder", "consultative", "technical"] },
      "passkey": { "type": "string", "description": "Founder passkey for authorization" }
    },
    "required": ["url", "passkey"]
  }
}`;

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 mb-1">
          <Terminal className="h-3.5 w-3.5 text-teal-600" />
          Programmatic & LLM Agent Access
        </span>
        <h2 className="text-2xl font-bold text-zinc-900">API & AI Agent Integration</h2>
        <p className="text-xs text-zinc-500 max-w-2xl">
          Connect your Claude, Cursor, ChatGPT, or Python workflows directly to the ARCH SDR Agent using your founder passkey.
        </p>
      </div>

      {/* Direct AI Browser Agent Access */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">AI Browser Subagent URL</h3>
              <p className="text-xs text-zinc-500">Autonomous browser agents can auto-authenticate via query param</p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(`${typeof window !== 'undefined' ? window.location.origin : 'https://archrevenues.com'}/agent?passkey=arch2026`, 'browser_url')}
            className="text-xs px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedKey === 'browser_url' ? (
              <>
                <Check className="h-3.5 w-3.5 text-teal-600" />
                <span className="text-teal-700">Copied URL</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-500" />
                <span>Copy Direct Access Link</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 font-mono text-xs text-zinc-800 flex items-center justify-between">
          <span>https://archrevenues.com/agent?passkey=arch2026</span>
          <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Auto-Bypasses Lock</span>
        </div>
      </div>

      {/* Curl Snippet */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-zinc-600" />
            <h3 className="text-sm font-bold text-zinc-900">cURL Example (HTTP / Terminal)</h3>
          </div>
          <button
            onClick={() => handleCopy(curlExample, 'curl')}
            className="text-xs px-3 py-1 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold flex items-center gap-1.5"
          >
            {copiedKey === 'curl' ? (
              <>
                <Check className="h-3 w-3 text-teal-600" />
                <span className="text-teal-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-500" />
                <span>Copy cURL</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
          {curlExample}
        </pre>
      </div>

      {/* Python Snippet */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-zinc-600" />
            <h3 className="text-sm font-bold text-zinc-900">Python Client</h3>
          </div>
          <button
            onClick={() => handleCopy(pythonExample, 'python')}
            className="text-xs px-3 py-1 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold flex items-center gap-1.5"
          >
            {copiedKey === 'python' ? (
              <>
                <Check className="h-3 w-3 text-teal-600" />
                <span className="text-teal-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-500" />
                <span>Copy Python</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
          {pythonExample}
        </pre>
      </div>

      {/* LLM Tool Specification */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-zinc-600" />
            <h3 className="text-sm font-bold text-zinc-900">OpenAI / Claude Tool Definition</h3>
          </div>
          <button
            onClick={() => handleCopy(llmToolSpec, 'llm')}
            className="text-xs px-3 py-1 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold flex items-center gap-1.5"
          >
            {copiedKey === 'llm' ? (
              <>
                <Check className="h-3 w-3 text-teal-600" />
                <span className="text-teal-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-500" />
                <span>Copy Tool Schema</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
          {llmToolSpec}
        </pre>
      </div>
    </div>
  );
}
