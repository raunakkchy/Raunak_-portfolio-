import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Lightbulb, Code2, Bug, Repeat } from 'lucide-react';

export const HowIBuild: React.FC = () => {
  const { howIBuild } = portfolioData;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Lightbulb className="w-5 h-5 text-[#FF6B00]" />;
      case 1:
        return <Code2 className="w-5 h-5 text-[#FF6B00]" />;
      case 2:
        return <Bug className="w-5 h-5 text-[#FF6B00]" />;
      default:
        return <Repeat className="w-5 h-5 text-[#FF6B00]" />;
    }
  };

  return (
    <section
      id="how-i-build"
      aria-label="Developer Philosophy"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            How I Build
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            My engineering philosophy and step-by-step approach to practical software development.
          </p>
        </div>

        {/* 4 Steps Horizontal Progression Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howIBuild.map((item, idx) => (
            <div
              key={item.step}
              className="stagger-child liquid-glass droplet-shape-card-1 p-6 sm:p-7 flex flex-col justify-between relative group border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300"
            >
              {/* Glass reflection */}
              <div
                aria-hidden="true"
                className="project-reflection absolute top-2 left-6 w-20 h-6 rounded-full bg-white/10 blur-md pointer-events-none"
              />

              <div>
                {/* Step pill & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/30 shadow-[0_0_12px_rgba(255,107,0,0.15)]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getStepIcon(idx)}
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-[#F5F5F5] group-hover:text-white mb-2">
                  {item.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom connecting accent bar */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#6F7378] uppercase">
                  Phase {idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]/40 group-hover:bg-[#FF6B00] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
