import React from 'react';
import { SUBJECTS } from '../data/subjects';
import { EngineeringSubject, SampleProblem } from '../types';
import { Flame, Waves, Thermometer, Cog, Hammer, Calculator, Sparkles, HelpCircle } from 'lucide-react';

interface SubjectPickerProps {
  selectedSubject: EngineeringSubject;
  onSelectSubject: (subject: EngineeringSubject) => void;
  onSelectSampleProblem: (sample: SampleProblem) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-4 h-4" />,
  Waves: <Waves className="w-4 h-4" />,
  Thermometer: <Thermometer className="w-4 h-4" />,
  Cog: <Cog className="w-4 h-4" />,
  Hammer: <Hammer className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
};

export const SubjectPicker: React.FC<SubjectPickerProps> = ({
  selectedSubject,
  onSelectSubject,
  onSelectSampleProblem,
}) => {
  const currentSubjectConfig = SUBJECTS.find((s) => s.id === selectedSubject) || SUBJECTS[0];

  return (
    <div className="space-y-4">
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <span>Select Course Subject</span>
          <span className="text-[10px] text-slate-500 font-normal lowercase">(required for solver context)</span>
        </label>
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SUBJECTS.map((sub) => {
          const isSelected = selectedSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 text-white border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ICON_MAP[sub.iconName] || <Flame className="w-4 h-4" />}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-medium">
                  {sub.code}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-xs leading-snug text-slate-100">{sub.name}</h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sample Problem Quick Launcher Bar */}
      <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium text-slate-200">
            Practice Problems for <span className="text-amber-400 font-bold">{currentSubjectConfig.name}</span>:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {currentSubjectConfig.sampleProblems.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSampleProblem(sample)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-slate-700/70 hover:border-amber-500/40 transition-colors flex items-center space-x-1"
            >
              <span>{sample.title}</span>
              <span className="text-[9px] px-1 rounded bg-slate-900 text-slate-400 font-mono">
                {sample.difficulty}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
