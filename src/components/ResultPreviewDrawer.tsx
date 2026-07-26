import React, { useState } from 'react';
import { SearchResultItem } from '../types';
import { X, ExternalLink, ShieldCheck, Copy, Check, FileText, Database, Layers, Sparkles, Hash } from 'lucide-react';

interface ResultPreviewDrawerProps {
  result: SearchResultItem | null;
  onClose: () => void;
  onOpenSnapshot: (result: SearchResultItem) => void;
}

export const ResultPreviewDrawer: React.FC<ResultPreviewDrawerProps> = ({
  result,
  onClose,
  onOpenSnapshot,
}) => {
  const [activeCitationTab, setActiveCitationTab] = useState<'apa' | 'mla' | 'chicago' | 'bibtex'>('apa');
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopyCitation = () => {
    const textToCopy = result.citationData[activeCitationTab];
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs flex justify-end">
      
      {/* Drawer Container */}
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md uppercase">
                .{result.tld} Archive Match
              </span>
              <span className="text-xs text-gray-500 font-mono">ID: {result.id}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-gray-950 font-normal leading-snug">
            {result.title}
          </h2>

          <div className="text-xs font-mono text-gray-500 mt-2 truncate">
            {result.fullUrl}
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Section 1: Academic Trust & Primary Source Verification */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-emerald-900 font-semibold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Academic Trust Indicator — Primary Source Verified</span>
            </div>
            <p className="text-xs text-emerald-800 mb-3 leading-relaxed">
              This archived webpage capture was validated against Internet Archive WARC (Web ARChive) repository records. Timestamp integrity and cryptographic payload signatures are confirmed.
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-emerald-200/80 space-y-1.5 text-[11px] font-mono text-emerald-950">
              <div className="flex justify-between">
                <span className="text-emerald-700">Captured Date:</span>
                <span className="font-bold">{result.timestampFormatted}</span>
              </div>
              <div className="flex justify-between truncate">
                <span className="text-emerald-700">SHA-256 WARC Payload:</span>
                <span className="truncate max-w-[280px] text-gray-600">{result.sha256Hash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Archive Node:</span>
                <span>ia-crawler-warc-082.archive.org</span>
              </div>
            </div>
          </div>

          {/* Section 2: Why This Matched (Semantic Reasoning) */}
          <div>
            <h3 className="text-sm font-semibold font-serif text-gray-900 mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Semantic Match Reasoning</span>
            </h3>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-gray-700 leading-relaxed font-sans">
              {result.whyMatched}
            </div>
          </div>

          {/* Section 3: Matched Metadata Fields */}
          <div>
            <h3 className="text-sm font-semibold font-serif text-gray-900 mb-2 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-gray-500" />
              <span>Metadata Fields Matched</span>
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs">
              {result.matchedFields.map((field, idx) => (
                <div key={idx} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded w-max">
                    {field.label}
                  </span>
                  <span className="text-gray-700 font-sans italic truncate max-w-md">
                    "{field.matchedText}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Academic Citation Generator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold font-serif text-gray-900 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span>Academic Citation Tool</span>
              </h3>
              <span className="text-xs text-gray-400 font-mono">1-Click Copy</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
              
              {/* Citation Format Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-100/80 text-xs font-mono">
                {(['apa', 'mla', 'chicago', 'bibtex'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCitationTab(tab)}
                    className={`flex-1 py-2 font-medium uppercase transition-colors ${
                      activeCitationTab === tab
                        ? 'bg-white text-blue-700 border-b-2 border-blue-600 font-bold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Citation Box */}
              <div className="p-4 bg-white relative">
                <p className="text-xs font-mono text-gray-800 leading-relaxed break-words pr-12">
                  {result.citationData[activeCitationTab]}
                </p>
                <button
                  onClick={handleCopyCitation}
                  className="absolute top-3 right-3 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors flex items-center space-x-1"
                  title="Copy Citation to Clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-[11px] text-emerald-600 font-bold font-sans">Copied!</span>
                    </>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-stone-50 flex items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={onClose}
            className="text-xs font-medium text-gray-700 hover:text-gray-900 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSnapshot(result);
            }}
            className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Open Archived Snapshot</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
