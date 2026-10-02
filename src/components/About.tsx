import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { data } = useCMS();
  const about = data.about;

  return (
    <div className="reveal reveal-left flex flex-col justify-between h-full">
      {/* Orange accent line */}
      <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />

      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-4">
        {about.heading}
      </h2>

      <p className="font-body text-[#A5A5A5] text-xs sm:text-sm leading-relaxed mb-6">
        {about.text}
      </p>

      {/* Button & Water-Drop Mantra side by side */}
      <div className="flex flex-wrap items-center gap-6 mt-auto">
        <button
          type="button"
          onClick={onOpenResume}
          className="anim-primary-button group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs text-[#F5F5F5] liquid-glass hover:border-[#FF6B00]/40 transition-all duration-300"
        >
          <span>More About Me</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Priority 2: Liquid Water-Drop Mantra */}
        <div className="relative liquid-droplet">
          <div
            className="w-32 h-32 droplet-shape-mini liquid-glass p-3 flex flex-col justify-center items-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/20 select-none group"
            style={{
              boxShadow:
                'inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.3), inset -1.5px -1.5px 4px rgba(255, 107, 0, 0.25), 0 20px 50px rgba(0, 0, 0, 0.85)',
            }}
          >
            <div className="font-heading text-[11px] font-bold tracking-wider uppercase leading-tight text-[#F5F5F5] space-y-0.5">
              <div className="text-white">Build</div>
              <div className="text-[#A5A5A5]">Learn</div>
              <div className="text-[#FF6B00]">Improve</div>
              <div className="text-white">Repeat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
