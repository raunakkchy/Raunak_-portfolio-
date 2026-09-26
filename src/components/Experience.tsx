import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Award, Briefcase, CheckCircle2, Building2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experience, achievements } = portfolioData;

  return (
    <section
      id="experience"
      aria-label="Experience & Achievements"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            Experience & Key Highlights
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            Practical web development internship exposure and factual academic milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Internship Experience */}
          <div className="lg:col-span-6 flex flex-col">
            <h3 className="font-heading text-xl font-bold text-[#F5F5F5] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#FF6B00]" />
              <span>Internship Experience</span>
            </h3>

            {experience.map((exp) => (
              <div
                key={exp.organization}
                className="liquid-glass droplet-shape-card-1 p-6 sm:p-8 border border-white/15 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#FF6B00]" />
                      <span className="font-heading text-base font-bold text-white">
                        {exp.organization}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                      {exp.status}
                    </span>
                  </div>

                  <div className="font-heading text-sm font-semibold text-[#FF852C] mb-3">
                    {exp.role}
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#6F7378] font-mono">
                  <span>Verified Training Program · Practical Exposure</span>
                </div>
              </div>
            ))}
          </div>

          {/* Factual Achievements */}
          <div className="lg:col-span-6 flex flex-col">
            <h3 className="font-heading text-xl font-bold text-[#F5F5F5] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6B00]" />
              <span>Factual Achievements</span>
            </h3>

            <div className="liquid-glass droplet-shape-card-2 p-6 sm:p-8 border border-white/15 h-full flex flex-col justify-between">
              <div className="space-y-4">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span className="font-body text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
                      {ach}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-[#6F7378]">
                <span>Grounded in actual performance and completed projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
