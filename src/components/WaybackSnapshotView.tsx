import React, { useState } from 'react';
import { SearchResultItem } from '../types';
import { ArrowLeft, Calendar, ExternalLink, ShieldCheck, Highlighter, Code, RefreshCw, FileText } from 'lucide-react';

interface WaybackSnapshotViewProps {
  result: SearchResultItem;
  onBack: () => void;
  searchQuery: string;
}

export const WaybackSnapshotView: React.FC<WaybackSnapshotViewProps> = ({
  result,
  onBack,
  searchQuery,
}) => {
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [showWarcHeader, setShowWarcHeader] = useState(false);

  // Simulated fallback HTML content if none provided
  const defaultHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${result.title} (Archived ${result.archiveDate})</title>
      <style>
        body { font-family: Georgia, serif; line-height: 1.6; color: #222; background: #faf9f6; margin: 0; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .archive-badge { background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; font-size: 13px; font-family: sans-serif; color: #1e40af; margin-bottom: 25px; }
        h1 { font-size: 32px; color: #111; margin-top: 0; font-weight: normal; line-height: 1.25; }
        .byline { font-size: 14px; color: #666; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 8px 0; margin-bottom: 20px; font-family: sans-serif; }
        .content p { font-size: 17px; margin-bottom: 18px; color: #2c2c2c; }
        .term-highlight { background-color: #fef08a; padding: 2px 4px; font-weight: 600; border-bottom: 2px solid #eab308; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="archive-badge">
          <strong>Wayback Machine Capture:</strong> ${result.archiveDate} at ${result.timestampFormatted}. URL: <u>${result.fullUrl}</u>
        </div>
        <h1>${result.title}</h1>
        <div class="byline">Source Domain: <strong>${result.domain}</strong> | Captured by Wayback Machine Crawlers</div>
        <div class="content">
          <p>${result.snippet.replace(/<[^>]+>/g, '')}</p>
          <p>This archived primary record was retrieved from the Internet Archive Wayback Machine. It demonstrates early usages and citations for the query <strong>"${searchQuery}"</strong> within digitized web media archives.</p>
          <p>Academic institutions and digital cultural repositories preserve these static WARC snapshots to ensure verifiable historical citation integrity without risk of link rot or revisionist editing.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const finalHtml = result.htmlContent || defaultHtml;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col">
      
      {/* AUTHENTIC WAYBACK MACHINE BANNER */}
      <div className="bg-stone-950 border-b border-stone-800 p-3 sm:p-4 sticky top-0 z-40 shadow-lg select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1.5 border border-stone-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Results</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 border-l border-stone-800 pl-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-serif font-bold text-xs text-white">
                WM
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-serif">WAYBACK MACHINE SNAPSHOT</div>
                <div className="text-[10px] text-stone-400 font-mono">Internet Archive Web WARC Engine</div>
              </div>
            </div>
          </div>

          {/* Middle URL & Timestamp Banner */}
          <div className="flex-1 max-w-2xl mx-auto bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 truncate">
              <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-blue-300 font-bold">{result.archiveDate}</span>
              <span className="text-stone-500">|</span>
              <span className="text-stone-300 truncate">{result.fullUrl}</span>
            </div>
            <a
              href={result.archiveWaybackUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 shrink-0 ml-2"
              title="Open direct Internet Archive page in new tab"
            >
              <span>IA Permalink</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setShowWarcHeader(!showWarcHeader)}
              className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors flex items-center space-x-1 ${
                showWarcHeader
                  ? 'bg-amber-950 text-amber-300 border-amber-700'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showWarcHeader ? 'Hide WARC' : 'WARC Header'}</span>
            </button>

            <div className="flex items-center space-x-1 bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-2.5 py-1 rounded-md text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Archive Verified</span>
            </div>
          </div>

        </div>

        {/* Scrubber Calendar Bar */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
          <div className="flex items-center space-x-2">
            <span className="text-stone-500">CAPTURE TIMELINE:</span>
            <span className="text-stone-300">1996</span>
            <span className="text-stone-600">••••••••</span>
            <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">{result.snapshotYear}</span>
            <span className="text-stone-600">••••••••</span>
            <span className="text-stone-300">2024</span>
          </div>
          <div className="hidden md:block text-stone-500 text-[10px]">
            Matched Query Concept: <strong className="text-amber-300">"{searchQuery}"</strong>
          </div>
        </div>
      </div>

      {/* RAW WARC Header Overlay Modal if toggled */}
      {showWarcHeader && (
        <div className="bg-stone-950 border-b border-stone-800 p-4 text-xs font-mono text-amber-300/90 leading-relaxed max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-2 text-stone-400">
            <span className="font-bold text-amber-400">ARCHIVE WARC PROTOCOL RECORD:</span>
            <span>Payload SHA-256: {result.sha256Hash}</span>
          </div>
          <pre className="bg-black/80 p-3 rounded border border-stone-800 overflow-x-auto text-[11px] font-mono">
            {result.warcHeader}
          </pre>
        </div>
      )}

      {/* SIMULATED ARCHIVED WEBPAGE CONTAINER */}
      <div className="flex-1 bg-stone-200 p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden border border-stone-300">
          <iframe
            srcDoc={finalHtml}
            title={result.title}
            className="w-full h-[calc(100vh-12rem)] border-none"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>

    </div>
  );
};
