import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ShieldCheck, Database, Layers, Search, Clock, Cpu } from 'lucide-react';

interface SearchProgressBannerProps {
  stage: number; // 1 to 8
  query: string;
}

interface StepInfo {
  id: number;
  stageThreshold: number;
  label: string;
  detail: string;
}

const STEPS: StepInfo[] = [
  { id: 1, stageThreshold: 2, label: 'Understanding research intent', detail: 'Parsing semantics & domain constraints' },
  { id: 2, stageThreshold: 3, label: 'Detecting first occurrence', detail: 'Locating earliest WARC primary index' },
  { id: 3, stageThreshold: 4, label: 'Searching archived webpages', detail: 'Querying 1T+ Internet Archive snapshots' },
  { id: 4, stageThreshold: 5, label: 'Ranking semantic relevance', detail: 'Evaluating institutional & source authority' },
  { id: 5, stageThreshold: 6, label: 'Grouping chronologically', detail: 'Constructing 1996–2024 density timeline' },
  { id: 6, stageThreshold: 7, label: 'Verifying archived snapshots', detail: 'Validating SHA-256 cryptographic signatures' },
];

export const SearchProgressBanner: React.FC<SearchProgressBannerProps> = ({ stage, query }) => {
  const isReady = stage >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1C1C1E] text-stone-100 rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-800 my-4"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center space-x-1">
              <span>AI Discovery Pipeline</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-400 font-mono">1996–2024 WARC Index</span>
            </div>
            <div className="text-sm font-serif text-white font-normal">
              Analyzing research query: <span className="text-amber-200 font-mono">"{query}"</span>
            </div>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full text-xs font-mono text-stone-300">
          {isReady ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">100% Provenance Verified</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-200 font-medium">Stage {Math.min(stage, 7)} / 7 Active</span>
            </>
          )}
        </div>
      </div>

      {/* Progress Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {STEPS.map((step) => {
          const isDone = stage >= step.stageThreshold + 1 || isReady;
          const isCurrent = stage === step.stageThreshold;

          return (
            <div
              key={step.id}
              className={`p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                isDone
                  ? 'bg-stone-900/90 border-emerald-500/40 text-stone-200'
                  : isCurrent
                  ? 'bg-stone-800/90 border-amber-500/80 text-white ring-1 ring-amber-500/30 shadow-md'
                  : 'bg-stone-900/30 border-stone-800/60 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] uppercase font-bold text-stone-400">
                  0{step.id}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                )}
              </div>

              <div className={`font-medium text-[11px] mb-0.5 truncate ${isCurrent ? 'text-amber-200 font-semibold' : ''}`}>
                {step.label}
              </div>

              <div className="text-[10px] text-stone-400 font-sans leading-tight truncate">
                {step.detail}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
