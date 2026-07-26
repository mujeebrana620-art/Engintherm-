import React, { useState } from 'react';
import { SolvedProblem, EngineeringSubject } from '../types';
import { SUBJECTS } from '../data/subjects';
import { History, Search, Star, Trash2, X, ChevronRight, BookOpen } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: SolvedProblem[];
  onSelectProblem: (item: SolvedProblem) => void;
  onDeleteProblem: (id: string) => void;
  onClearHistory: () => void;
  onToggleFavorite: (id: string) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onSelectProblem,
  onDeleteProblem,
  onClearHistory,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('ALL');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'ALL' || item.subject === filterSubject;
    const matchesFav = !showFavoritesOnly || item.isFavorite;
    return matchesSearch && matchesSubject && matchesFav;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-slate-100">Saved Solutions</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {history.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Search & Subject Filters */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search problems or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setFilterSubject('ALL')}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
                  filterSubject === 'ALL'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                All Subjects
              </button>
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilterSubject(s.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] whitespace-nowrap ${
                    filterSubject === s.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Favorite Only Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`p-1.5 rounded-lg border text-xs shrink-0 ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Show Starred Only"
            >
              <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-xs">No saved solutions found matching filters.</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition-all group relative cursor-pointer"
                onClick={() => {
                  onSelectProblem(item);
                  onClose();
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.subject}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          item.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProblem(item.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-sans mb-2">
                  {item.problem}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-mono">{item.modelUsed}</span>
                  <span className="text-amber-400 flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Reopen Solution</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Stored in browser localStorage
            </span>
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2.5 py-1 rounded bg-rose-950/40 border border-rose-800/60"
            >
              Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
