import React, { useState, useMemo } from 'react';
import { EngineeringSubject, FormulaItem } from '../types';
import { FORMULA_SHEET } from '../data/formulas';
import { UNIT_CATEGORIES, convertUnits } from '../data/conversions';
import {
  BookOpen,
  Calculator,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Zap,
} from 'lucide-react';

interface ReferencePanelProps {
  currentSubject: EngineeringSubject;
  onInsertFormulaToPrompt: (formulaText: string) => void;
}

export const ReferencePanel: React.FC<ReferencePanelProps> = ({
  currentSubject,
  onInsertFormulaToPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'converter'>('formulas');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search & Filter state for Formulas
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'subject' | 'all'>('subject');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFormulaId, setExpandedFormulaId] = useState<string | null>(null);

  // Live variable calculation state for expanded evaluator
  const [evaluatorInputs, setEvaluatorInputs] = useState<Record<string, number>>({});

  // Unit Converter State
  const [selectedCatId, setSelectedCatId] = useState<string>('pressure');
  const [fromValue, setFromValue] = useState<number>(100);
  const [fromUnitId, setFromUnitId] = useState<string>('kPa');
  const [toUnitId, setToUnitId] = useState<string>('psi');

  const activeUnitCategory =
    UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    return FORMULA_SHEET.filter((f) => {
      // Subject filter
      if (filterMode === 'subject' && f.subject !== currentSubject) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesPlainText = f.plainText.toLowerCase().includes(q);
        const matchesDesc = f.description.toLowerCase().includes(q);
        const matchesSubject = f.subject.toLowerCase().includes(q);
        const matchesVars = f.variables.some(
          (v) => v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q)
        );
        return matchesTitle || matchesPlainText || matchesDesc || matchesSubject || matchesVars;
      }
      return true;
    });
  }, [currentSubject, filterMode, selectedCategory, searchQuery]);

  // Unique categories for the current view mode
  const availableCategories = useMemo(() => {
    const list = FORMULA_SHEET.filter(
      (f) => filterMode === 'all' || f.subject === currentSubject
    ).map((f) => f.category || 'General');
    return Array.from(new Set(list));
  }, [currentSubject, filterMode]);

  // Handle category change in Unit Converter
  const handleUnitCatChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const convertedValue = convertUnits(fromValue, activeUnitCategory, fromUnitId, toUnitId);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle calculation evaluator
  const handleToggleEvaluator = (formula: FormulaItem) => {
    if (expandedFormulaId === formula.id) {
      setExpandedFormulaId(null);
    } else {
      setExpandedFormulaId(formula.id);
      // Initialize inputs with default values
      const initial: Record<string, number> = {};
      formula.variables.forEach((v) => {
        initial[v.symbol] = v.defaultValue ?? 1.0;
      });
      setEvaluatorInputs(initial);
    }
  };

  const handleInputChange = (symbol: string, value: string) => {
    const num = parseFloat(value);
    setEvaluatorInputs((prev) => ({
      ...prev,
      [symbol]: isNaN(num) ? 0 : num,
    }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
      {/* Top Tab Bar */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950 p-1.5">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'formulas'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Formula Sheet ({filteredFormulas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('converter')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'converter'
              ? 'bg-slate-800 text-sky-400 border border-sky-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Unit Converter</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {activeTab === 'formulas' ? (
          <div className="space-y-3">
            {/* Search and Scope Filter Controls */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search equation, symbol, title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-500 hover:text-slate-300"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Subject vs All Switcher & Category Badges */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setFilterMode('subject')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      filterMode === 'subject'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {currentSubject}
                  </button>
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      filterMode === 'all'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All Subjects
                  </button>
                </div>

                {availableCategories.length > 0 && (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 text-[11px] focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Formulas List */}
            {filteredFormulas.length === 0 ? (
              <div className="text-center py-8 bg-slate-950/50 rounded-xl border border-slate-800/80 p-4 space-y-1">
                <p className="text-xs text-slate-400 font-medium">No formulas matched your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilterMode('all');
                  }}
                  className="text-[11px] text-amber-400 hover:underline font-semibold"
                >
                  Clear filters & view all formulas
                </button>
              </div>
            ) : (
              filteredFormulas.map((f) => {
                const isExpanded = expandedFormulaId === f.id;

                return (
                  <div
                    key={f.id}
                    className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition-all shadow-sm"
                  >
                    {/* Header: Title & Subject Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-xs text-slate-100">{f.title}</h4>
                          {filterMode === 'all' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-semibold">
                              {f.subject}
                            </span>
                          )}
                        </div>
                        {f.category && (
                          <span className="text-[10px] text-slate-500 font-medium">{f.category}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          onClick={() => onInsertFormulaToPrompt(`Governing Eq (${f.title}): ${f.plainText}`)}
                          className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium transition-colors border border-amber-500/20"
                          title="Add Governing Equation to Problem Input"
                        >
                          + Prompt
                        </button>

                        <button
                          onClick={() => handleCopyText(f.id, f.plainText)}
                          className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                          title="Copy Plaintext Formula"
                        >
                          {copiedId === f.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Mathematical Display Box */}
                    <div className="bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto flex items-center justify-between">
                      <span>{f.plainText}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 leading-relaxed">{f.description}</p>

                    {/* Variable Badges */}
                    <div className="pt-1 flex flex-wrap gap-1">
                      {f.variables.map((v, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-slate-400 font-mono"
                        >
                          <strong className="text-amber-300/90">{v.symbol}</strong>: {v.name} ({v.unit})
                        </span>
                      ))}
                    </div>

                    {/* Interactive Equation Evaluator Toggle */}
                    {f.evaluators && f.evaluators.length > 0 && (
                      <div className="pt-2 border-t border-slate-900">
                        <button
                          onClick={() => handleToggleEvaluator(f)}
                          className="w-full text-[11px] py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-sky-400 border border-sky-500/20 font-semibold flex items-center justify-between transition-colors"
                        >
                          <div className="flex items-center space-x-1.5">
                            <Zap className="w-3 h-3 text-sky-400" />
                            <span>Interactive Calculation Evaluator</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Interactive Evaluator Body */}
                        {isExpanded && (
                          <div className="mt-2.5 bg-slate-900/90 border border-sky-500/30 rounded-xl p-3 space-y-3 animate-in fade-in duration-150">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block">
                              Enter Known Parameter Values:
                            </span>

                            {/* Variable Input Grid */}
                            <div className="grid grid-cols-2 gap-2">
                              {f.variables.map((v) => (
                                <div key={v.symbol} className="space-y-1">
                                  <div className="flex justify-between text-[10px] text-slate-400">
                                    <span className="font-mono text-slate-200 font-bold">{v.symbol}</span>
                                    <span className="text-slate-500">({v.unit})</span>
                                  </div>
                                  <input
                                    type="number"
                                    value={evaluatorInputs[v.symbol] ?? v.defaultValue ?? 0}
                                    onChange={(e) => handleInputChange(v.symbol, e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Evaluated Outputs */}
                            <div className="space-y-2 pt-1">
                              {f.evaluators.map((ev, idx) => {
                                const result = ev.calculate(evaluatorInputs);
                                const isResultValid = !isNaN(result) && isFinite(result);

                                return (
                                  <div
                                    key={idx}
                                    className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-bold text-sky-300">{ev.label}</span>
                                      <span className="font-mono text-xs font-bold text-amber-400">
                                        {isResultValid
                                          ? result.toLocaleString(undefined, { maximumFractionDigits: 4 })
                                          : 'Invalid Input'}
                                      </span>
                                    </div>

                                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                                      <span>Formula: {ev.formulaExpr}</span>
                                      {isResultValid && (
                                        <button
                                          onClick={() => {
                                            const pasteText = `[Evaluated ${ev.label}: ${result.toFixed(
                                              4
                                            )} (Formula: ${ev.formulaExpr})]`;
                                            onInsertFormulaToPrompt(pasteText);
                                          }}
                                          className="text-amber-400 hover:underline flex items-center space-x-1 font-sans"
                                        >
                                          <Sparkles className="w-3 h-3" />
                                          <span>Paste Result</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Unit Converter Tool */
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Engineering Quantity
              </label>
              <select
                value={selectedCatId}
                onChange={(e) => handleUnitCatChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
              >
                {UNIT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input & Output Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              {/* From Unit */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Input Value</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <select
                    value={fromUnitId}
                    onChange={(e) => setFromUnitId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none font-mono"
                  >
                    {activeUnitCategory.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.symbol} ({u.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center my-1">
                <button
                  onClick={() => {
                    const temp = fromUnitId;
                    setFromUnitId(toUnitId);
                    setToUnitId(temp);
                  }}
                  className="p-1.5 rounded-full bg-slate-900 text-sky-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                  title="Swap units"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* To Unit Result */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Converted Value</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 border border-sky-500/40 rounded-lg px-3 py-1.5 text-sm font-mono text-sky-300 font-bold flex items-center overflow-x-auto">
                    {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                  </div>
                  <select
                    value={toUnitId}
                    onChange={(e) => setToUnitId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none font-mono"
                  >
                    {activeUnitCategory.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.symbol} ({u.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Copy Conversion Result */}
            <button
              onClick={() => {
                const text = `[Conversion: ${fromValue} ${fromUnitId} = ${convertedValue.toFixed(4)} ${toUnitId}]`;
                onInsertFormulaToPrompt(text);
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Paste Conversion into Problem Input</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
