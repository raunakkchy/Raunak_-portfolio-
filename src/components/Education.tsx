import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Calendar, School } from 'lucide-react';

export const Education: React.FC = () => {
  const { data } = useCMS();
  const educationTimeline = data.educationTimeline;

  return (
    <section
      id="education"
      aria-label="Academic Education Timeline"
      className="reveal reveal-left relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            Academic Education
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            Formal education timeline and current academic standing.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#FF6B00]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {educationTimeline.map((item) => (
            <div
              key={item.id || item.degree}
              className="stagger-child relative liquid-glass p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-7 w-5 h-5 rounded-full bg-[#050607] border-2 border-[#FF6B00] flex items-center justify-center shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5]">
                  {item.degree}
                </h3>
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/30 w-fit">
                  {item.score}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A5A5A5] mb-3">
                <div className="flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{item.institution}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{item.yearStatus}</span>
                </div>
              </div>

              {item.details && (
                <p className="font-body text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
