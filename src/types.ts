export type TldFilter = 'all' | 'edu' | 'gov' | 'org' | 'com';
export type SortOption = 'earliest' | 'relevance' | 'snapshots';

export interface CitationData {
  apa: string;
  mla: string;
  chicago: string;
  bibtex: string;
}

export interface MatchedField {
  fieldName: 'h1' | 'title' | 'anchorText' | 'meta' | 'body' | 'url';
  label: string;
  matchedText: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  domain: string;
  fullUrl: string;
  archiveDate: string; // ISO or human readable "March 14, 2015"
  timestampFormatted: string; // "2015-03-14 11:42:05 UTC"
  archiveWaybackUrl: string;
  snapshotYear: number;
  snippet: string;
  snippetHighlights: string[]; // words to highlight
  confidenceScore: number; // e.g. 96
  primarySourceVerified: boolean;
  sha256Hash: string;
  warcHeader: string;
  tld: 'edu' | 'gov' | 'org' | 'com';
  matchedFields: MatchedField[];
  matchedTerms: string[];
  whyMatched: string;
  authorOrSource?: string;
  htmlContent?: string; // Simulated archived page HTML content
  citationData: CitationData;
}

export interface TimelineDensityItem {
  year: number;
  count: number;
  densityPercent: number; // 0-100 relative height for histogram
}

export interface SearchQueryInterpretation {
  rawQuery: string;
  intent: string;
  extractedConcepts: string[];
  temporalRange: string;
  domainConstraint?: string;
  academicContext: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResultItem[];
  timeline: TimelineDensityItem[];
  interpretation: SearchQueryInterpretation;
  totalResults: number;
  searchTimeMs: number;
}
