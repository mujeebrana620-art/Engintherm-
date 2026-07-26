import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { SolvedProblem } from '../types';
import { Check, Copy, Download, Star, Share2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SolutionDisplayProps {
  solution: SolvedProblem | null;
  isLoading: boolean;
  onToggleFavorite: (id: string) => void;
  error?: string | null;
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({
  solution,
  isLoading,
  onToggleFavorite,
  error,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!solution) return;
    const fullText = `[EngiSolve Worked Solution - ${solution.subject}]\n\nProblem:\n${solution.problem}\n\nSolution:\n${solution.solution}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!solution) return;
    const content = `# EngiSolve Solution: ${solution.subject}\n\nDate: ${new Date(solution.timestamp).toLocaleString()}\nModel: ${solution.modelUsed}\n\n## Problem Statement\n${solution.problem}\n\n## Solution\n${solution.solution}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `engisolve-${solution.subject.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="bg-rose-950/40 border border-rose-800 rounded-2xl p-6 text-rose-200 space-y-3">
        <div className="flex items-center space-x-2 text-rose-400 font-bold">
          <AlertTriangle className="w-5 h-5" />
          <span>Engineering Solution Error</span>
        </div>
        <p className="text-sm text-rose-300 leading-relaxed">{error}</p>
        <p className="text-xs text-rose-400/80">
          Tip: Ensure the GEMINI_API_KEY is properly set or check if your prompt statement is complete.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-5 animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-slate-100 font-semibold text-base">
            Analyzing Engineering Problem & Governing Equations...
          </h3>
          <p className="text-xs text-slate-400">
            Structuring output into: Given → Assumptions → Governing Equation → Solution Steps → Units Check → Final Answer
          </p>
        </div>
        
        {/* Skeleton lines */}
        <div className="space-y-3 max-w-xl mx-auto pt-4 text-left">
          <div className="h-4 bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-800/60 rounded w-full"></div>
          <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
          <div className="h-4 bg-slate-800 rounded w-1/4 pt-2"></div>
          <div className="h-3 bg-slate-800/60 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-slate-300 font-semibold text-sm sm:text-base">
          No problem solved yet
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Select a subject above or click a practice problem to see a complete, professor-graded step-by-step worked solution.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden space-y-0">
      {/* Solution Header Bar */}
      <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {solution.subject}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Solved on {new Date(solution.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(solution.id)}
            className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center space-x-1 ${
              solution.isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Star as Favorite"
          >
            <Star className={`w-4 h-4 ${solution.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center space-x-1.5"
            title="Copy formatted solution to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download Markdown */}
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center space-x-1.5"
            title="Download Markdown file"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export MD</span>
          </button>
        </div>
      </div>

      {/* Problem Context Banner */}
      <div className="bg-slate-950/60 px-5 py-3 border-b border-slate-800/60 text-xs text-slate-300 font-mono leading-relaxed">
        <span className="text-amber-400 font-semibold font-sans uppercase tracking-wider text-[10px] block mb-1">
          Input Problem:
        </span>
        {solution.problem}
      </div>

      {/* Markdown Solution Body */}
      <div className="p-6 sm:p-8 text-slate-100 text-sm sm:text-base leading-relaxed space-y-4 font-sans prose prose-invert max-w-none prose-headings:text-amber-400 prose-headings:font-bold prose-headings:border-b prose-headings:border-slate-800 prose-headings:pb-2 prose-headings:pt-3 prose-strong:text-amber-300 prose-code:text-amber-300 prose-code:bg-slate-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-800">
        <ReactMarkdown>{solution.solution}</ReactMarkdown>
      </div>

      {/* Footer Meta */}
      <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Structured by EngiSolve AI System Prompt</span>
        </div>
        <span className="font-mono text-[11px] text-slate-600">Model: {solution.modelUsed}</span>
      </div>
    </div>
  );
};
