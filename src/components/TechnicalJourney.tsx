import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Compass, ArrowRight } from 'lucide-react';

export const TechnicalJourney: React.FC = () => {
  const { technicalJourney } = portfolioData;

  return (
    <section
      id="journey"
      aria-label="Technical Journey Timeline"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            Technical Growth Journey
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            My step-by-step evolution from programming basics to deploying full-stack AI applications.
          </p>
        </div>

        {/* Horizontal Scrollable or Grid Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {technicalJourney.map((item, idx) => (
            <div
              key={item.stage}
              className="stagger-child liquid-glass p-5 rounded-3xl border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                    Stage {item.stage}
                  </span>
                  {idx < technicalJourney.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#6F7378] group-hover:text-[#FF6B00] transition-colors" />
                  )}
                </div>

                <h3 className="font-heading text-base font-bold text-[#F5F5F5] group-hover:text-white mb-2">
                  {item.name}
                </h3>

                <p className="font-body text-xs text-[#A5A5A5] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-[#6F7378]">
                Continuous Progression
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
