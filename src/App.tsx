import React, { useState, useEffect } from 'react';
import { EngineeringSubject, SolvedProblem, SampleProblem } from './types';
import { SUBJECTS } from './data/subjects';
import { Navbar } from './components/Navbar';
import { SubjectPicker } from './components/SubjectPicker';
import { ProblemInput } from './components/ProblemInput';
import { SolutionDisplay } from './components/SolutionDisplay';
import { ReferencePanel } from './components/ReferencePanel';
import { HistorySidebar } from './components/HistorySidebar';
import { UnitConverterModal } from './components/UnitConverterModal';
import { PromptInspectorModal } from './components/PromptInspectorModal';
import { Sparkles, BookOpen, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'engisolve_solutions_history_v1';

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<EngineeringSubject>('Thermodynamics');
  const [problemText, setProblemText] = useState<string>('');
  const [currentSolution, setCurrentSolution] = useState<SolvedProblem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Persistence: History List
  const [history, setHistory] = useState<SolvedProblem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
    }
    return [];
  });

  // UI Modals / Drawers
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isUnitConverterOpen, setIsUnitConverterOpen] = useState(false);
  const [isPromptInspectorOpen, setIsPromptInspectorOpen] = useState(false);

  // On initial mount, prefill first sample problem for Thermodynamics
  useEffect(() => {
    const defaultSubject = SUBJECTS[0];
    if (defaultSubject && defaultSubject.sampleProblems.length > 0) {
      setProblemText(defaultSubject.sampleProblems[0].prompt);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Handle Subject change
  const handleSelectSubject = (subject: EngineeringSubject) => {
    setSelectedSubject(subject);
    const subConfig = SUBJECTS.find((s) => s.id === subject);
    if (subConfig && subConfig.sampleProblems.length > 0) {
      setProblemText(subConfig.sampleProblems[0].prompt);
    }
  };

  // Handle Sample Problem selection
  const handleSelectSampleProblem = (sample: SampleProblem) => {
    setSelectedSubject(sample.subject);
    setProblemText(sample.prompt);
  };

  // Insert formula text or conversion into problem input
  const handleInsertTextToPrompt = (text: string) => {
    setProblemText((prev) => (prev ? `${prev}\n\n${text}` : text));
  };

  // Solve Problem API Call
  const handleSolveProblem = async () => {
    if (!problemText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: selectedSubject,
          problem: problemText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to solve engineering problem.');
      }

      const newSolved: SolvedProblem = {
        id: `sol-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        subject: selectedSubject,
        problem: problemText.trim(),
        solution: data.solution,
        timestamp: data.timestamp || new Date().toISOString(),
        modelUsed: data.modelUsed || 'gemini-3.6-flash',
        isFavorite: false,
      };

      setCurrentSolution(newSolved);

      // Add to local history (prepended)
      setHistory((prev) => [newSolved, ...prev]);
    } catch (err: any) {
      console.error('Error solving problem:', err);
      setError(err.message || 'An unexpected error occurred while communicating with the AI solver.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
    if (currentSolution && currentSolution.id === id) {
      setCurrentSolution((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  // Delete problem from history
  const handleDeleteProblem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (currentSolution && currentSolution.id === id) {
      setCurrentSolution(null);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved problem solutions?')) {
      setHistory([]);
      setCurrentSolution(null);
    }
  };

  // Load problem from history
  const handleLoadFromHistory = (item: SolvedProblem) => {
    setSelectedSubject(item.subject);
    setProblemText(item.problem);
    setCurrentSolution(item);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        onOpenUnitConverter={() => setIsUnitConverterOpen(true)}
        onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
        onToggleHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Course Subject Selector Bar */}
        <section id="subject-selector">
          <SubjectPicker
            selectedSubject={selectedSubject}
            onSelectSubject={handleSelectSubject}
            onSelectSampleProblem={handleSelectSampleProblem}
          />
        </section>

        {/* Core Workspace Grid: Left = Solver Input & Output | Right = Reference Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Solver Workspace (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Form */}
            <section id="problem-input-section">
              <ProblemInput
                subject={selectedSubject}
                value={problemText}
                onChange={setProblemText}
                onSolve={handleSolveProblem}
                isLoading={isLoading}
                onClear={() => {
                  setProblemText('');
                  setCurrentSolution(null);
                }}
              />
            </section>

            {/* Solution Display Area */}
            <section id="solution-output-section">
              <SolutionDisplay
                solution={currentSolution}
                isLoading={isLoading}
                onToggleFavorite={handleToggleFavorite}
                error={error}
              />
            </section>
          </div>

          {/* Quick Reference Sidebar: Formula Sheet & Unit Converter (4 cols on desktop) */}
          <aside className="lg:col-span-4 sticky top-20">
            <ReferencePanel
              currentSubject={selectedSubject}
              onInsertFormulaToPrompt={handleInsertTextToPrompt}
            />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">EngiSolve</span>
            <span>— Professor-Graded AI Mechanical Engineering Tutor</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPromptInspectorOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              System Prompt
            </button>
            <button
              onClick={() => setIsUnitConverterOpen(true)}
              className="hover:text-sky-400 transition-colors"
            >
              Unit Converter
            </button>
            <span className="text-slate-600">Built for Mechanical Engineering Undergrads</span>
          </div>
        </div>
      </footer>

      {/* Modals & Sidebars */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectProblem={handleLoadFromHistory}
        onDeleteProblem={handleDeleteProblem}
        onClearHistory={handleClearHistory}
        onToggleFavorite={handleToggleFavorite}
      />

      <UnitConverterModal
        isOpen={isUnitConverterOpen}
        onClose={() => setIsUnitConverterOpen(false)}
        onPasteToPrompt={handleInsertTextToPrompt}
      />

      <PromptInspectorModal
        isOpen={isPromptInspectorOpen}
        onClose={() => setIsPromptInspectorOpen(false)}
      />
    </div>
  );
}
