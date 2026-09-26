import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative z-10 border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#050607]/80 backdrop-blur-md"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6F7378]">
        
        {/* Left: R — Raunak */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[10px] font-bold text-[#FF6B00]">
            R
          </span>
          <span className="font-heading font-semibold text-[#F5F5F5]">
            {portfolioData.profile.name}
          </span>
        </div>

        {/* Center: © 2025 Raunak. Built with passion. */}
        <div>
          © 2025 Raunak. Built with passion.
        </div>

        {/* Right: Back to top arrow */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group inline-flex items-center gap-1.5 p-2 rounded-full liquid-pill hover:border-[#FF6B00]/40 text-[#A5A5A5] hover:text-[#FF6B00] transition-colors"
        >
          <span className="text-[11px] sr-only sm:not-sr-only sm:pr-1">Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
