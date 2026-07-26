import React, { useState } from 'react';
import { EngineeringSubject } from '../types';
import { FORMULA_SHEET } from '../data/formulas';
import { UNIT_CATEGORIES, convertUnits } from '../data/conversions';
import { BookOpen, Calculator, Copy, Check, ArrowRightLeft, Sparkles } from 'lucide-react';

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

  // Unit Converter State
  const [selectedCatId, setSelectedCatId] = useState<string>('pressure');
  const [fromValue, setFromValue] = useState<number>(100);
  const [fromUnitId, setFromUnitId] = useState<string>('kPa');
  const [toUnitId, setToUnitId] = useState<string>('psi');

  const selectedCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];

  // Handle category change
  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const convertedValue = convertUnits(fromValue, selectedCategory, fromUnitId, toUnitId);

  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const subjectFormulas = FORMULA_SHEET.filter((f) => f.subject === currentSubject);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
      {/* Tab Selector Bar */}
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
          <span>Formula Sheet ({subjectFormulas.length})</span>
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

      {/* Tab Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {activeTab === 'formulas' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">{currentSubject} Core Equations</span>
              <span className="text-[10px] text-slate-500">Click equation to insert into problem</span>
            </div>

            {subjectFormulas.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No formula cards configured for this subject yet.
              </p>
            ) : (
              subjectFormulas.map((f) => (
                <div
                  key={f.id}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-100">{f.title}</h4>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onInsertFormulaToPrompt(`Governing Eq: ${f.plainText}`)}
                        className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium transition-colors"
                        title="Add to Problem Prompt"
                      >
                        + Prompt
                      </button>
                      <button
                        onClick={() => handleCopyFormula(f.id, f.plainText)}
                        className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                        title="Copy formula text"
                      >
                        {copiedId === f.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Latex / Display Equation */}
                  <div className="bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-amber-300 overflow-x-auto border border-slate-800">
                    {f.plainText}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">{f.description}</p>

                  {/* Variable breakdown */}
                  <div className="pt-1 flex flex-wrap gap-1">
                    {f.variables.map((v, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono"
                      >
                        <strong className="text-slate-300">{v.symbol}</strong>: {v.name} ({v.unit})
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Unit Converter Tool */
          <div className="space-y-4">
            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Engineering Quantity
              </label>
              <select
                value={selectedCatId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
                <span className="text-[10px] text-slate-500 uppercase font-semibold">From Value</span>
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
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
                  >
                    {selectedCategory.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Arrow */}
              <div className="flex justify-center my-1">
                <div className="p-1.5 rounded-full bg-slate-900 text-sky-400 border border-slate-800">
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* To Unit Result */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Converted Result</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 border border-sky-500/40 rounded-lg px-3 py-1.5 text-sm font-mono text-sky-300 font-bold flex items-center overflow-x-auto">
                    {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 })}
                  </div>
                  <select
                    value={toUnitId}
                    onChange={(e) => setToUnitId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
                  >
                    {selectedCategory.units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Copy Conversion Result */}
            <button
              onClick={() => {
                const text = `${fromValue} ${fromUnitId} = ${convertedValue.toFixed(4)} ${toUnitId}`;
                onInsertFormulaToPrompt(`[Converted: ${text}]`);
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Paste Conversion to Problem Input</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
