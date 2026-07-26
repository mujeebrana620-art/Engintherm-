import React from 'react';
import { Sparkles, Calculator, Terminal, History, BookOpen, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenUnitConverter: () => void;
  onOpenPromptInspector: () => void;
  onToggleHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUnitConverter,
  onOpenPromptInspector,
  onToggleHistory,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-white">Engi<span className="text-amber-400">Solve</span></span>
              <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                Engineering AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Structured Study & Problem Solver for Mechanical Engineering
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Unit Converter Button */}
          <button
            onClick={onOpenUnitConverter}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Open SI ↔ Imperial Unit Converter"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Unit Converter</span>
          </button>

          {/* Prompt Inspector */}
          <button
            onClick={onOpenPromptInspector}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Inspect System Prompt & Architecture"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">System Prompt</span>
          </button>

          {/* History Toggle */}
          <button
            onClick={onToggleHistory}
            className="relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors shadow-sm"
            title="View Saved Solutions History"
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-slate-950 text-amber-300 rounded-full font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
