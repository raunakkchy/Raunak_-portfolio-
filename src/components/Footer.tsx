import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="relative z-10 border-t border-white/[0.08] py-8 px-4 sm:px-6 lg:px-8 bg-[#071018]/60 backdrop-blur-md"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#687785]">
        <div>
          © 2026 {portfolioData.profile.name}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={portfolioData.profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F5F7FA] transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={portfolioData.profile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F5F7FA] transition-colors"
          >
            Instagram
          </a>
          <span>·</span>
          <span className="text-[#9AA8B5]">React · Node.js · MongoDB</span>
        </div>
      </div>
    </footer>
  );
};
