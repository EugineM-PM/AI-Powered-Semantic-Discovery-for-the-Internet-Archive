import React from 'react';
import { Search, Globe, BookOpen, Film, Volume2, HardDrive, Image, Sparkles, User, Upload, Heart, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  currentScreen: 'landing' | 'results' | 'snapshot';
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({ onReset, currentScreen }) => {
  return (
    <header className="select-none font-sans text-xs">
      
      {/* Top Main Dark Navigation Bar (Exact Archive.org styling) */}
      <div className="bg-[#2C2C2C] text-white">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 flex items-center justify-between h-12">
          
          {/* Left: Internet Archive Logo */}
          <button
            onClick={onReset}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors focus:outline-none shrink-0"
          >
            {/* Greek Temple Logo SVG */}
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7v2h20V7L12 2zm-8 8v9h2v-9H4zm5 0v9h2v-9H9zm5 0v9h2v-9h-2zm5 0v9h2v-9h-2zM2 20v2h20v-2H2z"/>
            </svg>
            <div className="text-left font-serif font-bold text-sm sm:text-base tracking-tight leading-none uppercase">
              INTERNET ARCHIVE
            </div>
          </button>

          {/* Center: Media Navigation Bar */}
          <nav className="hidden lg:flex items-center space-x-1 text-[11px] font-medium tracking-wider uppercase text-gray-300">
            <button onClick={onReset} className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>WEB</span>
            </button>
            <div className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>TEXTS</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
              <Film className="w-3.5 h-3.5 text-red-400" />
              <span>VIDEO</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUDIO</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOFTWARE</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
              <Image className="w-3.5 h-3.5 text-purple-400" />
              <span>IMAGES</span>
            </div>

            {/* AI Semantic Search Feature Highlight Badge */}
            <button
              onClick={onReset}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors font-bold ${
                currentScreen !== 'snapshot' ? 'bg-amber-500 text-stone-950 shadow-xs' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI DISCOVERY</span>
            </button>
          </nav>

          {/* Right: Sign Up / Upload */}
          <div className="flex items-center space-x-3 text-[11px] font-medium uppercase tracking-wider text-gray-300">
            <div className="hidden sm:flex items-center space-x-1 hover:text-white cursor-pointer">
              <User className="w-3.5 h-3.5" />
              <span>SIGN UP | LOG IN</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">UPLOAD</span>
            </div>
          </div>

        </div>
      </div>

      {/* Secondary Nav Line (Darker grey bar `#1F1F1F`) */}
      <div className="bg-[#1F1F1F] text-gray-400 border-b border-stone-800">
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center justify-center space-x-4 sm:space-x-6 text-[11px] uppercase tracking-wider font-sans overflow-x-auto whitespace-nowrap">
          <a href="#about" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">ABOUT</a>
          <a href="#blog" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">BLOG</a>
          <a href="#events" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">EVENTS</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">PROJECTS</a>
          <a href="#help" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">HELP</a>
          <a href="#donate" onClick={(e) => { e.preventDefault(); onReset(); }} className="text-red-400 hover:text-red-300 font-semibold flex items-center space-x-1">
            <span>DONATE</span>
            <Heart className="w-3 h-3 fill-current text-red-500 inline" />
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">CONTACT</a>
          <a href="#jobs" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">JOBS</a>
          <a href="#volunteer" onClick={(e) => { e.preventDefault(); onReset(); }} className="hover:text-white transition-colors">VOLUNTEER</a>
        </div>
      </div>

    </header>
  );
};

