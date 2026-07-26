import React from 'react';
import { EngineeringSubject } from '../types';
import { Sparkles, Trash2, ArrowRight, Loader2, FileText, CheckCircle2 } from 'lucide-react';

interface ProblemInputProps {
  subject: EngineeringSubject;
  value: string;
  onChange: (val: string) => void;
  onSolve: () => void;
  isLoading: boolean;
  onClear: () => void;
}

export const ProblemInput: React.FC<ProblemInputProps> = ({
  subject,
  value,
  onChange,
  onSolve,
  isLoading,
  onClear,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <label htmlFor="problem-input" className="text-sm font-semibold text-slate-100">
            Problem Statement
          </label>
        </div>
        <div className="flex items-center space-x-2">
          {value.trim().length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1 px-2 py-1 rounded bg-slate-800/60"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
          <span className="text-xs text-slate-500 font-mono">
            {value.length} chars
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          id="problem-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste or type a numerical or conceptual ${subject} problem...\n\nExample: "A rigid cylinder contains 0.5 kg of Air initially at P1 = 300 kPa and T1 = 350 K. The air undergoes a polytropic expansion with n = 1.3 to a final pressure P2 = 100 kPa..."`}
          rows={5}
          disabled={isLoading}
          className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl p-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-sans leading-relaxed resize-y min-h-[140px]"
        />
      </div>

      {/* Footer Info & Solve Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Guarantees Badge */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Structures response with Given, Assumptions, Governing Eq, Steps, Units Check & Final Answer</span>
        </div>

        {/* Solve CTA */}
        <button
          type="button"
          onClick={onSolve}
          disabled={isLoading || !value.trim()}
          className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
            isLoading || !value.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 shadow-orange-500/25 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Solving with AI Tutor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Solve Problem Step-by-Step</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
