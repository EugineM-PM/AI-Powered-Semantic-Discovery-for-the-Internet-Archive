import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Clock, ChevronRight, Globe, BookOpen, Film, Volume2, Tv, HardDrive, Image, Mic, List, Newspaper } from 'lucide-react';
import { POPULAR_SEARCH_CHIPS, INITIAL_RECENT_SEARCHES } from '../data/mockHistoricalData';

interface LandingScreenProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);
  const [searchMode, setSearchMode] = useState<'ai' | 'url'>('ai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (chip: string) => {
    const fullQuery = chip === 'cancel culture' 
      ? 'First use of "cancel culture" on .edu websites' 
      : chip === 'climate change denial' 
      ? 'early climate change denial op-eds 1998' 
      : chip === 'net neutrality'
      ? 'FCC net neutrality public comments 2003'
      : `Historical emergence of ${chip}`;
    
    setQuery(fullQuery);
    onSearch(fullQuery);
  };

  return (
    <div className="bg-[#EFEFEF] min-h-screen text-gray-900 font-sans pb-16">
      
      {/* SECTION 1: Dark Grey Wayback Machine Hero Section (Matches Screenshot 1 & 2) */}
      <div className="bg-[#5B5B5B] border-b border-stone-700 text-white pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-base sm:text-lg font-sans font-normal text-gray-200 mb-6 tracking-wide">
            Search the history of more than 1 trillion web pages & AI-indexed WARC records on the Internet.
          </h2>

          {/* Iconic Wayback Machine Container Box (Light Cream Background #F5F2EB) */}
          <div className="bg-[#F6F3EB] text-gray-900 rounded-lg p-5 sm:p-7 shadow-xl border border-stone-300 relative text-left max-w-3xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              
              {/* WayBack Machine Styled Branding Logo */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#900000]">
                  WayBack
                </span>
                <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tighter text-gray-900">
                  Machine
                </span>
                <span className="bg-amber-400 text-stone-950 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-500 shadow-2xs">
                  AI DISCOVERY
                </span>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center space-x-1 bg-stone-200 p-1 rounded-md text-xs font-medium font-sans">
                <button
                  type="button"
                  onClick={() => setSearchMode('ai')}
                  className={`px-2.5 py-1 rounded transition-all flex items-center space-x-1 ${
                    searchMode === 'ai' ? 'bg-white text-blue-800 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Concept Search</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('url')}
                  className={`px-2.5 py-1 rounded transition-all ${
                    searchMode === 'url' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Exact URL
                </button>
              </div>

            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-white border border-stone-400 rounded-md overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600">
                <div className="pl-3.5 text-stone-400">
                  <Search className="w-5 h-5 text-stone-500" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    searchMode === 'ai'
                      ? "Search historical concepts (e.g. 'cancel culture', 'climate change denial 1998')..."
                      : "https://www.google.com"
                  }
                  className="w-full px-3 py-3 text-sm sm:text-base text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none font-sans"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium text-sm px-5 py-3 transition-colors flex items-center space-x-1.5 shrink-0"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Search</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Explanation note under input */}
            <div className="text-[11px] text-stone-600 mt-2 font-sans flex justify-between items-center">
              <span>
                {searchMode === 'ai' 
                  ? "✨ Semantic AI indexing turns WARC web captures into searchable knowledge concepts." 
                  : "Enter a direct web address to inspect calendar captures."}
              </span>
              <span className="font-mono text-stone-500 hidden sm:inline">1996–2024 Archive Index</span>
            </div>

          </div>

          {/* Sub-navigation links under Wayback Machine logo box (Matches Screenshot 1) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5 text-xs sm:text-sm font-medium font-sans text-stone-200">
            <span className="hover:text-white cursor-pointer transition-colors">Calendar</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Collections</span>
            <span>·</span>
            <span className="bg-[#B00000] text-white font-bold px-2.5 py-0.5 rounded text-xs tracking-wide shadow-xs flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Discovery</span>
            </span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Changes</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Summary</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Site Map</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">URLs</span>
          </div>

        </div>
      </div>

      {/* SECTION 2: Classic White Internet Archive Info Grid Box (Matches Screenshot 2) */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white border border-stone-300 rounded-md shadow-sm p-6 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left 3 cols: Large Greek Temple Pillar Monument Emblem */}
            <div className="md:col-span-3 flex justify-center md:border-r border-stone-200 md:pr-6">
              <div className="text-center">
                <svg className="w-32 h-32 text-stone-900 fill-current mx-auto" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v2h20V7L12 2zm-8 8v9h2v-9H4zm5 0v9h2v-9H9zm5 0v9h2v-9h-2zm5 0v9h2v-9h-2zM2 20v2h20v-2H2z"/>
                </svg>
                <div className="text-[11px] font-mono text-stone-500 mt-2 uppercase tracking-widest font-bold">
                  NON-PROFIT LIBRARY
                </div>
              </div>
            </div>

            {/* Middle 6 cols: Mission Text + Media Counter Icons + Mini Search */}
            <div className="md:col-span-6 space-y-5">
              
              <h1 className="text-xl sm:text-2xl font-serif text-gray-900 font-normal leading-snug">
                Internet Archive is a non-profit library of millions of free texts, movies, software, music, websites, and AI-indexed historical knowledge.
              </h1>

              {/* Media Category Icons with Counts (Matches Screenshot 2 yellow, orange, red, blue icons) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center pt-2">
                
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">1T</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-amber-500 text-white rounded flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">51M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">16M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">13M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center">
                    <Tv className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">4.1M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded flex items-center justify-center">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">1.4M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded flex items-center justify-center">
                    <Image className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">5.6M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">292K</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center">
                    <List className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700 mt-1">3.5M</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-amber-400 text-stone-950 font-bold rounded flex items-center justify-center shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 mt-1">800B</span>
                </div>

              </div>

              {/* Embedded Search Widget Inside White Box */}
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="flex items-center border border-stone-400 rounded overflow-hidden">
                  <select className="bg-stone-100 text-xs font-mono px-3 py-2 border-r border-stone-300 text-stone-700 focus:outline-none cursor-pointer">
                    <option>All</option>
                    <option>Web & WARC</option>
                    <option>AI Concepts</option>
                    <option>Academic (.edu)</option>
                    <option>Government (.gov)</option>
                  </select>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search archive concepts or topics..."
                    className="w-full px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors border-l border-stone-300"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right mt-1">
                  <button type="button" onClick={() => handleChipClick('climate change denial')} className="text-[11px] text-blue-600 hover:underline">
                    Advanced AI Search
                  </button>
                </div>
              </form>

            </div>

            {/* Right 3 cols: Archive News (Matches Screenshot 2) */}
            <div className="md:col-span-3 md:border-l border-stone-200 md:pl-6 space-y-3 text-xs">
              
              <div className="font-serif font-bold text-sm text-stone-900 flex items-center space-x-1.5 pb-2 border-b border-stone-200">
                <Newspaper className="w-4 h-4 text-stone-600" />
                <span>Archive News</span>
              </div>

              <div className="space-y-3 font-sans text-stone-700">
                <div className="hover:text-blue-600 cursor-pointer transition-colors leading-snug">
                  Bringing Forgotten Music Back to Life with Optical Music Recognition
                </div>
                <div className="hover:text-blue-600 cursor-pointer transition-colors leading-snug">
                  Vanishing Culture Episode #4: Keeping African Folktales Alive with Helen Nde
                </div>
                <div className="text-blue-800 font-medium leading-snug bg-blue-50 p-2 rounded border border-blue-200">
                  ✨ Introducing AI Semantic Discovery: Search Web History by Meaning, Not Just URL
                </div>
              </div>

              <div className="text-right pt-2">
                <a href="#more" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-600 hover:underline font-medium">
                  More posts
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* SECTION 3: "New to the Archive? / Example Research Inquiries" (Matches Screenshot 2 bottom) */}
      <div className="max-w-4xl mx-auto px-4 mt-10 text-center">
        
        <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-normal mb-4">
          New to the Archive AI Discovery Engine?
        </h3>

        <p className="text-sm text-stone-600 max-w-xl mx-auto mb-6">
          Unlike traditional URL lookup, Semantic Discovery allows you to locate archived primary sources by describing what you are looking for.
        </p>

        {/* Quick Sample Search Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {POPULAR_SEARCH_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs px-3 py-1.5 rounded transition-colors font-sans flex items-center space-x-1 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Recent Searches Log */}
        {recentSearches.length > 0 && (
          <div className="bg-white border border-stone-300 rounded p-4 text-left max-w-xl mx-auto text-xs">
            <div className="flex items-center justify-between text-stone-500 font-mono text-[11px] uppercase tracking-wider mb-2">
              <span className="flex items-center space-x-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Recent Research Inquiries</span>
              </span>
              <button 
                onClick={() => setRecentSearches([])}
                className="text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            </div>
            <div className="divide-y divide-stone-100">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item.query);
                    onSearch(item.query);
                  }}
                  className="w-full text-left py-2 flex items-center justify-between hover:text-blue-600 transition-colors"
                >
                  <span className="truncate pr-2 font-mono">"{item.query}"</span>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">{item.timestamp}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

