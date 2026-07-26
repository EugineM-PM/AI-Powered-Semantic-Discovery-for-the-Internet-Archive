import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ResultPreviewDrawer } from './components/ResultPreviewDrawer';
import { WaybackSnapshotView } from './components/WaybackSnapshotView';
import { SearchResponse, SearchResultItem, TldFilter } from './types';
import { getMockResponseForQuery } from './data/mockHistoricalData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'results' | 'snapshot'>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStage, setSearchStage] = useState<number>(8); // 1 to 8

  // Cache for instant repeated query presentation
  const queryCacheRef = useRef<Map<string, SearchResponse>>(new Map());

  // Drawer & Snapshot state
  const [previewResult, setPreviewResult] = useState<SearchResultItem | null>(null);
  const [snapshotResult, setSnapshotResult] = useState<SearchResultItem | null>(null);

  // Keyboard shortcut listener (⌘K or / to focus search, Esc to close/reset)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K or / to focus main search input
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault();
        const input = document.getElementById('main-search-input') as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.select();
        }
      }

      // Esc key
      if (e.key === 'Escape') {
        if (previewResult) {
          setPreviewResult(null);
        } else if (currentScreen === 'snapshot') {
          setCurrentScreen('results');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewResult, currentScreen]);

  const handleSearch = async (query: string, tldFilter: TldFilter = 'all') => {
    const cacheKey = `${query.trim().toLowerCase()}_${tldFilter}`;
    
    setIsLoading(true);
    setSearchQuery(query);
    setCurrentScreen('results');

    // Check query cache for instant presentation if repeated
    if (queryCacheRef.current.has(cacheKey)) {
      setSearchResponse(queryCacheRef.current.get(cacheKey)!);
      setSearchStage(8);
      setIsLoading(false);
      return;
    }

    // Set initial stage
    setSearchStage(1);

    // Progressive Loading Sequence Timer
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(setTimeout(() => setSearchStage(2), 100));  // ✓ Understanding research intent
    timeouts.push(setTimeout(() => setSearchStage(3), 300));  // ✓ Intent detected & first occurrence
    timeouts.push(setTimeout(() => setSearchStage(4), 600));  // Searching archived pages
    timeouts.push(setTimeout(() => setSearchStage(5), 900));  // Ranking semantic relevance
    timeouts.push(setTimeout(() => setSearchStage(6), 1200)); // Grouping chronologically
    timeouts.push(setTimeout(() => setSearchStage(7), 1600)); // Verifying snapshots
    timeouts.push(setTimeout(() => {
      setSearchStage(8);
      setIsLoading(false);
    }, 2000));

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, tldFilter }),
      });

      if (!res.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResponse = await res.json();
      setSearchResponse(data);
      queryCacheRef.current.set(cacheKey, data);
    } catch (err) {
      console.warn('API fetch error, falling back to curated presentation dataset:', err);
      const fallbackData = getMockResponseForQuery(query, tldFilter);
      setSearchResponse(fallbackData);
      queryCacheRef.current.set(cacheKey, fallbackData);
    }
  };

  const handleReset = () => {
    setCurrentScreen('landing');
    setSearchQuery('');
    setSearchResponse(null);
    setPreviewResult(null);
    setSnapshotResult(null);
    setSearchStage(8);
    setIsLoading(false);
  };

  const handleOpenSnapshot = (result: SearchResultItem) => {
    setSnapshotResult(result);
    setCurrentScreen('snapshot');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Show Header unless in full-screen Snapshot View */}
      {currentScreen !== 'snapshot' && (
        <Header
          onReset={handleReset}
          currentScreen={currentScreen}
          searchQuery={searchQuery}
        />
      )}

      {/* Screen 1: Landing */}
      {currentScreen === 'landing' && (
        <LandingScreen
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      )}

      {/* Screen 2: Results */}
      {currentScreen === 'results' && searchResponse && (
        <ResultsScreen
          searchData={searchResponse}
          onSearch={handleSearch}
          onInspectResult={(result) => setPreviewResult(result)}
          onOpenSnapshot={handleOpenSnapshot}
          isLoading={isLoading}
          searchStage={searchStage}
        />
      )}

      {/* Screen 3: Result Preview Drawer / Modal */}
      {previewResult && (
        <ResultPreviewDrawer
          result={previewResult}
          onClose={() => setPreviewResult(null)}
          onOpenSnapshot={handleOpenSnapshot}
        />
      )}

      {/* Screen 4: Wayback Snapshot View */}
      {currentScreen === 'snapshot' && snapshotResult && (
        <WaybackSnapshotView
          result={snapshotResult}
          onBack={() => setCurrentScreen('results')}
          searchQuery={searchQuery}
        />
      )}

    </div>
  );
}
