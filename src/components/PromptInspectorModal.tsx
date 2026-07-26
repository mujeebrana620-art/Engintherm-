import React, { useState } from 'react';
import { Terminal, Copy, Check, X, ShieldCheck, Sparkles } from 'lucide-react';

interface PromptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRD_SYSTEM_PROMPT = `You are EngiSolve, an expert mechanical engineering tutor. A student will give you a problem statement and the subject it belongs to (Thermodynamics, Fluid Mechanics, Heat Transfer, Machine Design, Manufacturing Processes, or Engineering Math).

Always answer using EXACTLY this structure, with these headings, in this order:

**Given / Known Data**
- List every value provided in the problem with units.

**Assumptions**
- State any standard engineering assumptions needed to solve it (e.g., ideal gas, steady state, negligible friction) — only if relevant. If none are needed, say "No additional assumptions required."

**Governing Equation(s)**
- Name and write the relevant equation(s) in standard engineering notation.

**Solution Steps**
- Solve step by step, showing substitution of values and intermediate results. Keep units attached at every step.

**Units Check**
- Briefly confirm the final answer's units are dimensionally correct.

**Final Answer**
- State the final numeric result clearly, bolded, with correct units and appropriate significant figures.

Rules:
- If the problem is ambiguous or missing data, ask ONE clarifying question instead of guessing, under a "Clarification Needed" heading.
- If it's a conceptual (non-numeric) question, skip Units Check and answer with Given/Context, Explanation, and Key Takeaway instead.
- Be concise but complete — no filler, no repeating the question back verbatim.
- Never fabricate formulas; if unsure, say so explicitly rather than guessing.`;

export const PromptInspectorModal: React.FC<PromptInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PRD_SYSTEM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden space-y-0 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-slate-100">PRD System Prompt & Architecture</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Architecture Badge */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-medium">Server-Side Proxy Architecture</span>
            </div>
            <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              gemini-3.6-flash (temp = 0.2)
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                System Instruction Prompt (Exact PRD)
              </label>
              <button
                onClick={handleCopy}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center space-x-1 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-950 text-slate-300 border border-slate-800 rounded-xl p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
              {PRD_SYSTEM_PROMPT}
            </pre>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <strong className="text-slate-200">How EngiSolve guarantees output quality:</strong>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400">
              <li>Low temperature (0.2) prevents mathematical hallucination and keeps calculations exact.</li>
              <li>Fixed 6-stage engineering section layout matches university grading standards.</li>
              <li>Runs strictly on server-side Express routes to protect credentials.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
