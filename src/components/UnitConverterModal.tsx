import React, { useState } from 'react';
import { UNIT_CATEGORIES, convertUnits } from '../data/conversions';
import { Calculator, X, ArrowRightLeft, Sparkles } from 'lucide-react';

interface UnitConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasteToPrompt?: (text: string) => void;
}

export const UnitConverterModal: React.FC<UnitConverterModalProps> = ({
  isOpen,
  onClose,
  onPasteToPrompt,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('pressure');
  const [fromValue, setFromValue] = useState<number>(100);
  const [fromUnitId, setFromUnitId] = useState<string>('kPa');
  const [toUnitId, setToUnitId] = useState<string>('psi');

  if (!isOpen) return null;

  const selectedCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const convertedValue = convertUnits(fromValue, selectedCategory, fromUnitId, toUnitId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-sky-400" />
            <h2 className="font-bold text-base text-slate-100">Engineering Unit Converter</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Engineering Physical Quantity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {UNIT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-2 rounded-xl text-xs font-semibold text-center transition-all ${
                    selectedCatId === cat.id
                      ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Conversion Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
            {/* From Row */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 font-medium">Input Value</span>
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
                  className="col-span-3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-base font-mono text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <select
                  value={fromUnitId}
                  onChange={(e) => setFromUnitId(e.target.value)}
                  className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  {selectedCategory.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.symbol} - {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const temp = fromUnitId;
                  setFromUnitId(toUnitId);
                  setToUnitId(temp);
                }}
                className="p-2 rounded-full bg-slate-900 text-sky-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                title="Swap From and To units"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To Row */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 font-medium">Converted Value</span>
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-3 bg-slate-900 border border-sky-500/40 rounded-xl px-3 py-2 text-base font-mono text-sky-300 font-bold flex items-center overflow-x-auto">
                  {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <select
                  value={toUnitId}
                  onChange={(e) => setToUnitId(e.target.value)}
                  className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  {selectedCategory.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.symbol} - {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {onPasteToPrompt ? (
            <button
              onClick={() => {
                const text = `${fromValue} ${fromUnitId} = ${convertedValue.toFixed(4)} ${toUnitId}`;
                onPasteToPrompt(`[Converted: ${text}]`);
                onClose();
              }}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Paste Conversion into Problem</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
