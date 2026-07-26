import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchResponse, SearchResultItem, TldFilter, SortOption } from '../types';
import { TopTimelineBar } from './TopTimelineBar';
import { ResultCard } from './ResultCard';
import { SearchProgressBanner } from './SearchProgressBanner';
import { ConceptEvolutionModal } from './ConceptEvolutionModal';
import { Search, ArrowUpDown, Sparkles, BookOpen, AlertCircle, ShieldCheck, Flame, Filter, Command, X, RotateCcw } from 'lucide-react';

interface ResultsScreenProps {
  searchData: SearchResponse;
  onSearch: (query: string, tldFilter?: TldFilter) => void;
  onInspectResult: (result: SearchResultItem) => void;
  onOpenSnapshot: (result: SearchResultItem) => void;
  isLoading: boolean;
  searchStage?: number; // 1 to 8
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  searchData,
  onSearch,
  onInspectResult,
  onOpenSnapshot,
  isLoading,
  searchStage = 8,
}) => {
  const [inputQuery, setInputQuery] = useState(searchData.query);
  const [activeTld, setActiveTld] = useState<TldFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('earliest');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState(false);

  // Sync input query if prop changes
  useEffect(() => {
    setInputQuery(searchData.query);
  }, [searchData.query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim() && !isLoading) {
      onSearch(inputQuery.trim(), activeTld);
    }
  };

  const handleTldChange = (tld: TldFilter) => {
    setActiveTld(tld);
    onSearch(inputQuery.trim(), tld);
  };

  // Find the earliest record overall in searchData.results
  const earliestResult = searchData.results.length > 0
    ? [...searchData.results].sort((a, b) => a.snapshotYear - b.snapshotYear)[0]
    : null;
  const earliestYear = earliestResult ? earliestResult.snapshotYear : null;

  // Filter results by selected year if year is active
  let displayedResults = [...searchData.results];
  if (selectedYear !== null) {
    displayedResults = displayedResults.filter((r) => r.snapshotYear === selectedYear);
  }

  // Sort results
  if (sortBy === 'earliest') {
    displayedResults.sort((a, b) => a.snapshotYear - b.snapshotYear);
  } else if (sortBy === 'relevance') {
    displayedResults.sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  // Determine which results to progressively reveal based on searchStage
  // Stage 1-2: skeletons
  // Stage 3-4: earliestResult / hero
  // Stage 5+: all results
  const showHero = searchStage >= 3;
  const showAllResults = searchStage >= 5;
  const showTimeline = searchStage >= 3;
  const showMetadata = searchStage >= 6;

  return (
    <div className="min-h-screen bg-stone-50/70 pb-20 font-sans select-none">
      
      {/* Top Search Controls Bar (Sticky Hierarchy Item #1) */}
      <div className="bg-white border-b border-stone-200 sticky top-12 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input with Keyboard Shortcut Hint */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="main-search-input"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search historical concepts, WARC phrases or web topics..."
                disabled={isLoading && searchStage < 3}
                className={`w-full pl-10 pr-16 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs ${
                  isLoading && searchStage < 3 ? 'opacity-70 bg-stone-100 cursor-wait' : ''
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-stone-400 bg-stone-200/60 px-1.5 py-0.5 rounded text-[10px] font-mono pointer-events-none">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center space-x-1.5 shadow-2xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span>Discovering...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Update Discovery</span>
                </>
              )}
            </button>
          </form>

          {/* Filters & Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-stone-100 text-xs">
            
            {/* Result Count & Temporal Scope */}
            <div className="text-stone-600 font-sans flex items-center space-x-2">
              <span className="font-semibold text-stone-900 font-mono text-sm">
                {searchData.totalResults.toLocaleString()}
              </span>
              <span>archived records</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500">Temporal Scope: <strong className="text-stone-800 font-mono">1996–2024</strong></span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-400 font-mono">{searchData.searchTimeMs}ms</span>
            </div>

            {/* Right Controls: Domain Filter + Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* TLD Filter Chips */}
              <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-lg border border-stone-200/80">
                <span className="text-stone-400 font-mono text-[10px] px-1.5 font-bold uppercase">Domain:</span>
                {(['all', 'edu', 'gov', 'org', 'com'] as const).map((tld) => (
                  <button
                    key={tld}
                    onClick={() => handleTldChange(tld)}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase transition-colors ${
                      activeTld === tld
                        ? 'bg-white text-blue-700 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tld === 'all' ? 'All' : `.${tld}`}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-1.5 bg-white border border-stone-200 px-2.5 py-1 rounded-lg">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-sans">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-stone-900 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="earliest">Earliest Snapshot (1996–2024)</option>
                  <option value="relevance">Match Relevance Score</option>
                </select>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Promoted Central Interactive Timeline Bar (Hierarchy Item #3) */}
      <TopTimelineBar
        timeline={searchData.timeline}
        selectedYear={selectedYear}
        onSelectYear={(year) => setSelectedYear(year)}
        earliestYear={earliestYear}
        onOpenEvolutionModal={() => setIsEvolutionModalOpen(true)}
        isInteractive={showTimeline}
      />

      {/* Main 12-Column Results Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Active AI Discovery Pipeline Stage Banner (Hierarchy Item #6) */}
        {isLoading && searchStage < 8 && (
          <SearchProgressBanner stage={searchStage} query={inputQuery} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
          
          {/* Left Sidebar (4 Columns): Semantic Interpretation & Provenance Context */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Semantic Query Interpretation Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center space-x-2 text-stone-900 font-semibold text-sm font-serif mb-3.5 pb-2 border-b border-stone-100">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Semantic Interpretation</span>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                <div>
                  <div className="text-stone-400 font-mono text-[10px] uppercase font-bold mb-1">Research Intent</div>
                  <div className="text-stone-800 bg-stone-50 border border-stone-200/80 p-3 rounded-xl leading-relaxed">
                    {searchData.interpretation.intent}
                  </div>
                </div>

                <div>
                  <div className="text-stone-400 font-mono text-[10px] uppercase font-bold mb-1.5">Extracted Concepts</div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchData.interpretation.extractedConcepts.map((concept, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-900 border border-blue-200/80 px-2.5 py-1 rounded-md font-mono text-xs font-medium">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500 font-mono text-[11px]">
                  <span>Scope: {searchData.interpretation.temporalRange}</span>
                  <span className="text-stone-700 font-semibold">{searchData.interpretation.domainConstraint}</span>
                </div>
              </div>
            </div>

            {/* Earliest Concept Emergence Highlight Card */}
            {earliestResult && (
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-5 text-xs font-sans shadow-2xs">
                <div className="flex items-center space-x-2 text-amber-950 font-serif font-bold text-sm mb-2">
                  <Flame className="w-4 h-4 text-amber-600 fill-current" />
                  <span>First Historical Emergence</span>
                </div>
                <p className="text-stone-800 leading-relaxed mb-3">
                  This search concept was first indexed on the public web in <strong className="font-mono text-stone-950">{earliestYear}</strong> on <span className="font-mono text-emerald-800 font-semibold">{earliestResult.domain}</span>.
                </p>
                <button
                  onClick={() => setIsEvolutionModalOpen(true)}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-2.5 px-3 rounded-xl transition-colors text-xs flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore Concept Trajectory</span>
                </button>
              </div>
            )}

            {/* Archive Trust & Provenance Guarantee */}
            <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-4 text-xs text-stone-700 leading-relaxed font-sans">
              <div className="font-semibold text-stone-900 mb-1 flex items-center space-x-1.5 font-serif">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Internet Archive Trust Guarantee</span>
              </div>
              <p className="text-stone-600">
                All records reflect unedited static WARC payloads captured directly from source web servers. Every result includes cryptographic SHA-256 payload integrity signatures and direct Wayback links.
              </p>
            </div>

          </div>

          {/* Right Main Content (8 Columns): Result Cards List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Active Year Filter Pill Indicator */}
            {selectedYear !== null && (
              <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-blue-950 font-medium shadow-2xs">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>Filtering results strictly to year <strong className="font-mono text-sm">{selectedYear}</strong></span>
                </div>
                <button
                  onClick={() => setSelectedYear(null)}
                  className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-300 font-bold px-2.5 py-1 rounded-md transition-colors"
                >
                  Clear Year Filter ✕
                </button>
              </div>
            )}

            {/* Skeleton Card Loaders while progressive search loading is under stage 4 */}
            {isLoading && searchStage < 4 && (
              <div className="space-y-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-stone-200 rounded w-24" />
                      <div className="h-4 bg-stone-200 rounded w-32" />
                    </div>
                    <div className="h-6 bg-stone-200 rounded w-3/4" />
                    <div className="h-4 bg-stone-200 rounded w-1/2" />
                    <div className="h-16 bg-stone-100 rounded-xl" />
                  </div>
                ))}
              </div>
            )}

            {/* Display Results */}
            {(!isLoading || searchStage >= 4) && displayedResults.length > 0 && (
              <div className="space-y-4">
                {displayedResults.map((result, idx) => {
                  const isEarliest = earliestResult && result.id === earliestResult.id;
                  
                  // Hide subsequent non-earliest results if searchStage < 5
                  if (!isEarliest && searchStage < 5) return null;

                  return (
                    <ResultCard
                      key={result.id}
                      result={result}
                      onInspect={onInspectResult}
                      onOpenSnapshot={onOpenSnapshot}
                      isEarliestRecord={isEarliest}
                    />
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {(!isLoading || searchStage >= 5) && displayedResults.length === 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-2xs">
                <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-lg font-serif text-stone-900 mb-1">No Archived Snapshots Match This Filter</h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto mb-5">
                  No records were found for year {selectedYear} under domain filter .{activeTld}.
                </p>
                <button
                  onClick={() => {
                    setSelectedYear(null);
                    setActiveTld('all');
                  }}
                  className="text-xs font-medium bg-stone-900 text-white px-5 py-2.5 rounded-xl hover:bg-stone-800 transition-colors shadow-2xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Concept Evolution Interactive Modal */}
      {isEvolutionModalOpen && (
        <ConceptEvolutionModal
          query={searchData.query}
          results={searchData.results}
          onClose={() => setIsEvolutionModalOpen(false)}
          onOpenSnapshot={onOpenSnapshot}
        />
      )}

    </div>
  );
};
