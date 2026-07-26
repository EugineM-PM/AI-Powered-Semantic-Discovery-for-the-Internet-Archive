import React from 'react';
import { TimelineDensityItem } from '../types';
import { Calendar, Filter, RotateCcw } from 'lucide-react';

interface TimelineHistogramProps {
  timeline: TimelineDensityItem[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export const TimelineHistogram: React.FC<TimelineHistogramProps> = ({
  timeline,
  selectedYear,
  onSelectYear,
}) => {
  const maxCount = Math.max(...timeline.map((t) => t.count), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-gray-900 font-semibold text-sm font-serif">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Archive Density Timeline</span>
        </div>
        {selectedYear !== null && (
          <button
            onClick={() => onSelectYear(null)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filter</span>
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-4 font-sans">
        Distribution of archived web captures across 1996–2024. Click any year bar to filter results.
      </p>

      {/* Selected Year Badge */}
      {selectedYear !== null && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-blue-900 font-medium">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Isolated to Year: <strong>{selectedYear}</strong></span>
          </div>
          <button
            onClick={() => onSelectYear(null)}
            className="text-blue-600 hover:text-blue-800 font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Histogram Bar Chart */}
      <div className="h-36 flex items-end justify-between gap-[2px] pt-4 pb-1 border-b border-gray-200 px-1">
        {timeline.map((item) => {
          const isSelected = selectedYear === item.year;
          const heightPercent = item.count > 0 ? Math.max(12, (item.count / maxCount) * 100) : 4;

          return (
            <div
              key={item.year}
              onClick={() => onSelectYear(isSelected ? null : item.year)}
              className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end relative"
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] font-mono py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none shadow-md">
                {item.year}: {item.count} snapshots
              </div>

              {/* Bar element */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-xs transition-all ${
                  isSelected
                    ? 'bg-blue-600 ring-2 ring-blue-400'
                    : item.count > 0
                    ? 'bg-blue-500/80 group-hover:bg-blue-600'
                    : 'bg-gray-200 group-hover:bg-gray-300'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* X-Axis Year Labels */}
      <div className="flex justify-between text-[11px] font-mono text-gray-400 pt-2 px-1">
        <span>1996</span>
        <span>2005</span>
        <span>2015</span>
        <span>2024</span>
      </div>

      {/* Decade Quick Filters */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium text-gray-400 font-mono text-[11px]">Decade Range:</span>
        <div className="flex space-x-1">
          <button
            onClick={() => onSelectYear(selectedYear === 1998 ? null : 1998)}
            className="px-2 py-0.5 rounded text-[11px] font-mono border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            '90s
          </button>
          <button
            onClick={() => onSelectYear(selectedYear === 2003 ? null : 2003)}
            className="px-2 py-0.5 rounded text-[11px] font-mono border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            '00s
          </button>
          <button
            onClick={() => onSelectYear(selectedYear === 2015 ? null : 2015)}
            className="px-2 py-0.5 rounded text-[11px] font-mono border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            '10s
          </button>
          <button
            onClick={() => onSelectYear(selectedYear === 2020 ? null : 2020)}
            className="px-2 py-0.5 rounded text-[11px] font-mono border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            '20s
          </button>
        </div>
      </div>
    </div>
  );
};
