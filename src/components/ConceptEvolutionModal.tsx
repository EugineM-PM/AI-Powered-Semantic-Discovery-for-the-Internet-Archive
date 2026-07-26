import React, { useState } from 'react';
import { SearchResultItem } from '../types';
import { Sparkles, X, Flame, ShieldCheck, Clock, ExternalLink, ArrowRight, Play, Pause, BookOpen } from 'lucide-react';

interface ConceptEvolutionModalProps {
  query: string;
  results: SearchResultItem[];
  onClose: () => void;
  onOpenSnapshot: (result: SearchResultItem) => void;
}

export const ConceptEvolutionModal: React.FC<ConceptEvolutionModalProps> = ({
  query,
  results,
  onClose,
  onOpenSnapshot,
}) => {
  // Sort results chronologically
  const sortedResults = [...results].sort((a, b) => a.snapshotYear - b.snapshotYear);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeResult = sortedResults[activeIndex] || sortedResults[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="bg-white border border-stone-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-stone-100 p-5 sm:p-6 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Historical Emergence & Concept Trajectory
              </div>
              <h2 className="text-lg sm:text-xl font-serif text-white font-normal">
                Evolution of <span className="text-amber-200 font-semibold">"{query}"</span> Across the Web
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Concept Evolution Stepper Timeline Bar */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
              <span>Chronological Provenance Milestones ({sortedResults.length} Milestones)</span>
              <span>1996 – 2024 Index</span>
            </div>

            <div className="relative flex items-center justify-between gap-2 p-3 bg-stone-50 border border-stone-200 rounded-xl overflow-x-auto">
              {sortedResults.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isEarliest = idx === 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-1 min-w-[120px] p-2.5 rounded-lg text-left transition-all relative border ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-400/50'
                        : isEarliest
                        ? 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100/80'
                        : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isEarliest && (
                      <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded mb-1 inline-block ${
                        isActive ? 'bg-amber-500 text-stone-950' : 'bg-amber-200 text-amber-900'
                      }`}>
                        ★ First Record
                      </span>
                    )}

                    <div className="font-mono text-xs font-bold">
                      {item.snapshotYear}
                    </div>
                    <div className={`text-[11px] font-sans truncate font-medium ${isActive ? 'text-stone-300' : 'text-stone-600'}`}>
                      .{item.tld} · {item.domain}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Active Stage Card */}
          {activeResult && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-stone-900 text-stone-100 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                    Milestone {activeIndex + 1} of {sortedResults.length}
                  </span>
                  <span className="text-xs font-mono text-stone-500 font-semibold uppercase">
                    Captured: {activeResult.archiveDate}
                  </span>
                </div>

                {activeIndex === 0 && (
                  <span className="inline-flex items-center space-x-1 text-xs text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full font-semibold">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Earliest Verified Web Capture</span>
                  </span>
                )}
              </div>

              {/* Title & Link */}
              <div>
                <h3 className="text-xl font-serif text-stone-900 leading-snug mb-1 font-normal">
                  {activeResult.title}
                </h3>
                <div className="text-xs font-mono text-stone-500 flex items-center space-x-1">
                  <span className="text-emerald-700 font-semibold">{activeResult.domain}</span>
                  <span>›</span>
                  <span className="truncate">{activeResult.fullUrl}</span>
                </div>
              </div>

              {/* Verbatim Snippet Quote */}
              <div className="bg-white border border-stone-200 p-4 rounded-xl text-sm text-stone-800 font-sans leading-relaxed shadow-2xs">
                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1 font-semibold flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  <span>Verbatim Archived Excerpt</span>
                </div>
                <p className="italic font-serif text-base text-stone-900 border-l-2 border-amber-400 pl-3 my-2">
                  "{activeResult.snippet}"
                </p>
              </div>

              {/* Why Matched & Provenance Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <div className="text-stone-400 font-mono text-[10px] uppercase font-bold mb-1">
                    Semantic Matching Context
                  </div>
                  <div className="text-stone-800 leading-relaxed">
                    {activeResult.whyMatched}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <div className="text-stone-400 font-mono text-[10px] uppercase font-bold mb-1">
                    Archive Integrity & WARC
                  </div>
                  <div className="text-stone-800 font-mono text-[11px] truncate">
                    SHA-256: {activeResult.sha256Hash}
                  </div>
                  <div className="text-emerald-700 font-medium text-[11px] flex items-center space-x-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Static Payload Verified</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 px-6 border-t border-stone-200 flex items-center justify-between shrink-0 text-xs font-sans">
          
          <div className="flex items-center space-x-2">
            <button
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous Milestone
            </button>
            <button
              disabled={activeIndex === sortedResults.length - 1}
              onClick={() => setActiveIndex(prev => Math.min(sortedResults.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next Milestone →
            </button>
          </div>

          <button
            onClick={() => onOpenSnapshot(activeResult)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <span>Open Snapshot in Wayback Engine</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </div>
  );
};
