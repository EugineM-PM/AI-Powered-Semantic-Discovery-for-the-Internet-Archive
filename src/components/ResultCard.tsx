import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchResultItem } from '../types';
import { ShieldCheck, ExternalLink, FileSearch, Sparkles, Clock, Globe, Quote, CheckCircle2, Flame, ChevronDown, ChevronUp, Copy, Check, Info } from 'lucide-react';

interface ResultCardProps {
  result: SearchResultItem;
  onInspect: (result: SearchResultItem) => void;
  onOpenSnapshot: (result: SearchResultItem) => void;
  isEarliestRecord?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onInspect,
  onOpenSnapshot,
  isEarliestRecord = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeCitationTab, setActiveCitationTab] = useState<'apa' | 'mla' | 'chicago' | 'bibtex'>('apa');

  const handleCopyCitation = (format: 'apa' | 'mla' | 'chicago' | 'bibtex', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Helper to render snippet with highlighted query matches
  const renderHighlightedSnippet = (snippet: string, highlights: string[]) => {
    if (!highlights || highlights.length === 0) return snippet;

    const escapedTerms = highlights.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (escapedTerms.length === 0) return snippet;

    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const parts = snippet.split(regex);

    return parts.map((part, index) => {
      const isMatch = highlights.some(h => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <mark
            key={index}
            className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded border-b-2 border-amber-400 font-semibold"
          >
            {part}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl transition-all duration-200 group relative ${
        isEarliestRecord
          ? 'border-2 border-amber-400/90 shadow-md ring-1 ring-amber-400/30 p-5 sm:p-6 bg-gradient-to-b from-amber-50/40 via-white to-white'
          : 'border border-stone-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-stone-300'
      }`}
    >
      {/* Earliest Record Hero Banner Tag */}
      {isEarliestRecord && (
        <div className="mb-4 inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 px-3 py-1 rounded-lg text-xs font-mono font-bold shadow-2xs">
          <Flame className="w-4 h-4 fill-current text-stone-950" />
          <span>EARLIEST HISTORICAL OCCURRENCE RECORD ({result.snapshotYear})</span>
        </div>
      )}

      {/* Top Meta Line */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* TLD Badge */}
          <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md uppercase border ${
            result.tld === 'edu' 
              ? 'bg-blue-50 text-blue-800 border-blue-200' 
              : result.tld === 'gov'
              ? 'bg-purple-50 text-purple-800 border-purple-200'
              : result.tld === 'org'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-stone-100 text-stone-700 border-stone-200'
          }`}>
            .{result.tld}
          </span>

          {/* Publishing Institution */}
          {result.authorOrSource && (
            <span className="text-xs text-stone-600 font-medium font-sans truncate max-w-[280px]">
              {result.authorOrSource}
            </span>
          )}

          {/* Primary Source Verification Badge */}
          {result.primarySourceVerified && (
            <span className="inline-flex items-center space-x-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>WARC Verified</span>
            </span>
          )}

        </div>

        {/* Captured Timestamp */}
        <div className="flex items-center space-x-1.5 text-xs text-stone-500 font-mono">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Captured: <strong className="text-stone-900">{result.archiveDate}</strong></span>
        </div>
      </div>

      {/* Title & Link */}
      <h3 className="text-lg sm:text-xl font-serif text-stone-950 font-normal group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
        <button onClick={() => onOpenSnapshot(result)} className="text-left focus:outline-none">
          {result.title}
        </button>
      </h3>

      {/* Domain / URL Path */}
      <div className="flex items-center space-x-1 text-xs font-mono text-stone-500 mb-3 truncate">
        <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="text-emerald-700 font-medium">{result.domain}</span>
        <span className="text-stone-400">›</span>
        <span className="truncate text-stone-500">{result.fullUrl.replace(/^https?:\/\/[^/]+/, '')}</span>
      </div>

      {/* Snippet with term highlights */}
      <div className="text-sm text-stone-800 leading-relaxed font-sans bg-stone-50/90 border border-stone-200/80 p-3.5 rounded-xl mb-3">
        {renderHighlightedSnippet(result.snippet, result.snippetHighlights)}
      </div>

      {/* Matched Metadata Badges & Match Reason Preview */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase text-stone-400 mr-1 font-semibold">Matched:</span>
          {result.matchedFields.map((field, idx) => (
            <span key={idx} className="text-xs bg-stone-100 text-stone-700 border border-stone-200 px-2 py-0.5 rounded font-mono">
              {field.label}
            </span>
          ))}
          {result.matchedTerms.map((term, idx) => (
            <span key={idx} className="text-xs bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded font-mono">
              "{term}"
            </span>
          ))}
        </div>

        {/* Inline Match Intent Micro-Label */}
        <div className="text-xs font-sans text-stone-600 bg-stone-100/80 px-2.5 py-1 rounded-md border border-stone-200/60 truncate max-w-[340px]">
          <span className="font-mono text-[10px] text-stone-400 font-bold uppercase mr-1">Why Matched:</span>
          {result.whyMatched}
        </div>
      </div>

      {/* Progressive Disclosure Section (Expanded via toggle) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-4 bg-stone-50/90 p-4 rounded-xl border border-stone-200">
              
              {/* Section 1: Detailed Match Explanation */}
              <div>
                <div className="text-xs font-mono uppercase text-stone-500 font-bold mb-1 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Semantic Discovery Context</span>
                </div>
                <p className="text-xs font-sans text-stone-700 leading-relaxed bg-white p-3 rounded-lg border border-stone-200">
                  {result.whyMatched} Primary WARC payload cryptographically verified against Internet Archive indexes with SHA-256 hash <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">{result.sha256Hash.substring(0, 16)}...</code>.
                </p>
              </div>

              {/* Section 2: 1-Click Academic Citation Generator */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-mono uppercase text-stone-500 font-bold flex items-center space-x-1">
                    <Quote className="w-3.5 h-3.5 text-stone-600" />
                    <span>Academic Citation Formats</span>
                  </div>
                  
                  <div className="flex space-x-1 bg-stone-200/70 p-0.5 rounded-md">
                    {(['apa', 'mla', 'chicago', 'bibtex'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setActiveCitationTab(fmt)}
                        className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase rounded transition-colors ${
                          activeCitationTab === fmt
                            ? 'bg-white text-stone-900 shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-stone-200 p-3 rounded-lg flex items-center justify-between gap-3 text-xs font-mono text-stone-800">
                  <div className="truncate flex-1">
                    {result.citationData[activeCitationTab]}
                  </div>
                  <button
                    onClick={() => handleCopyCitation(activeCitationTab, result.citationData[activeCitationTab])}
                    className="bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded-md text-xs font-sans font-medium shrink-0 flex items-center space-x-1 transition-colors"
                  >
                    {copiedFormat === activeCitationTab ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-100 gap-3">
        
        {/* Confidence score indicator */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-stone-500 font-sans">Semantic Match:</span>
          <div className="w-16 bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${result.confidenceScore}%` }}
            />
          </div>
          <span className="font-mono font-semibold text-stone-800">{result.confidenceScore}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          
          {/* Progressive Disclosure Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 border border-stone-200/80 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <span>{isExpanded ? 'Hide Details' : 'Details & Citations'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onInspect(result)}
            className="text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <FileSearch className="w-3.5 h-3.5 text-stone-500" />
            <span>Full WARC Payload</span>
          </button>

          <button
            onClick={() => onOpenSnapshot(result)}
            className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <span>Open Snapshot</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </motion.div>
  );
};
