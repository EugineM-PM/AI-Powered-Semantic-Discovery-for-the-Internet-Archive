import React from 'react';
import { motion } from 'motion/react';
import { TimelineDensityItem } from '../types';
import { Calendar, RotateCcw, Sparkles, Flame, Sliders, ChevronRight, Activity } from 'lucide-react';

interface TopTimelineBarProps {
  timeline: TimelineDensityItem[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  earliestYear?: number | null;
  onOpenEvolutionModal?: () => void;
  isInteractive?: boolean;
}

export const TopTimelineBar: React.FC<TopTimelineBarProps> = ({
  timeline,
  selectedYear,
  onSelectYear,
  earliestYear,
  onOpenEvolutionModal,
  isInteractive = true,
}) => {
  const maxCount = Math.max(...timeline.map((t) => t.count), 1);
  const totalCount = timeline.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white border-b border-stone-200 shadow-2xs py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header line above timeline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-medium text-sm sm:text-base text-stone-900">
                  Historical Record Timeline (1996–2024)
                </span>
                <span className="bg-stone-100 text-stone-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-stone-200">
                  {totalCount} WARC Captures
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-sans hidden sm:block">
                Interactive web capture density across Internet Archive WARC indexes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
            
            {/* Earliest Occurrence Highlight Badge */}
            {earliestYear && (
              <button
                onClick={() => onSelectYear(earliestYear)}
                className="bg-amber-50 hover:bg-amber-100/90 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                title={`Jump to earliest verified record year (${earliestYear})`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
                <span>First Occurrence: <strong className="text-stone-950">{earliestYear}</strong></span>
              </button>
            )}

            {/* Concept Evolution Interactive Map Button */}
            {onOpenEvolutionModal && (
              <button
                onClick={onOpenEvolutionModal}
                className="bg-stone-900 hover:bg-stone-800 text-stone-100 px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Concept Trajectory Map</span>
              </button>
            )}

            {/* Reset Year Filter */}
            {selectedYear !== null && (
              <button
                onClick={() => onSelectYear(null)}
                className="text-stone-600 hover:text-stone-900 border border-stone-200 bg-stone-50 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 flex items-center space-x-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>All Years</span>
              </button>
            )}

          </div>

        </div>

        {/* Timeline Bar Chart Scrubber */}
        <div className="relative pt-2 pb-1">
          
          <div className="h-16 flex items-end justify-between gap-[2px] border-b border-stone-200">
            {timeline.map((item, idx) => {
              const isSelected = selectedYear === item.year;
              const isEarliest = earliestYear === item.year;
              const heightPercent = item.count > 0 ? Math.max(18, (item.count / maxCount) * 100) : 6;

              return (
                <div
                  key={item.year}
                  onClick={() => isInteractive && onSelectYear(isSelected ? null : item.year)}
                  className={`flex-1 flex flex-col items-center group cursor-pointer h-full justify-end relative ${
                    !isInteractive ? 'pointer-events-none opacity-60' : ''
                  }`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[11px] font-mono py-1 px-2.5 rounded-md whitespace-nowrap z-30 pointer-events-none shadow-xl border border-stone-700">
                    <span className="font-bold text-amber-300">{item.year}</span>: {item.count} archived {item.count === 1 ? 'record' : 'records'}
                    {isEarliest && <span className="ml-1.5 text-amber-400 font-bold">★ Earliest</span>}
                  </div>

                  {/* Earliest year star badge above bar */}
                  {isEarliest && (
                    <div className="absolute -top-4 text-[11px] text-amber-600 font-bold font-mono animate-bounce">
                      ★
                    </div>
                  )}

                  {/* Bar element with motion height */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.4, delay: idx * 0.015 }}
                    className={`w-full rounded-t-xs transition-all ${
                      isSelected
                        ? 'bg-blue-600 ring-2 ring-blue-500 shadow-md'
                        : isEarliest
                        ? 'bg-amber-500 group-hover:bg-amber-600 ring-1 ring-amber-400/80'
                        : item.count > 0
                        ? 'bg-blue-500/80 group-hover:bg-blue-600'
                        : 'bg-stone-200 group-hover:bg-stone-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between text-[11px] font-mono text-stone-500 pt-1.5">
            {[1996, 2000, 2005, 2010, 2015, 2020, 2024].map((year) => (
              <span
                key={year}
                onClick={() => isInteractive && onSelectYear(selectedYear === year ? null : year)}
                className={`cursor-pointer hover:text-blue-600 transition-colors ${
                  selectedYear === year ? 'text-blue-600 font-bold underline' : ''
                }`}
              >
                {year}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
