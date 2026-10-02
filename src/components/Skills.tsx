import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data } = useCMS();
  const { skillCategories, currentlyLearning } = data;

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="reveal reveal-scale relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            Technical Capabilities
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            Verified technologies, frameworks, and databases applied in real projects.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="stagger-child liquid-glass droplet-shape-card-1 p-6 flex flex-col justify-between border border-white/10 hover:border-[#FF6B00]/30 transition-all duration-300"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-[#F5F5F5] mb-4 flex items-center justify-between pb-2 border-b border-white/10">
                  <span>{category.title}</span>
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                </h3>

                <div className="space-y-2.5">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#FF6B00]/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                        <span className="font-heading text-xs font-semibold text-[#F5F5F5] group-hover:text-white">
                          {skill.name}
                        </span>
                      </div>

                      {skill.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF852C] border border-[#FF6B00]/20">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        {currentlyLearning && currentlyLearning.length > 0 && (
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]">
            <div className="flex items-center gap-2.5 mb-4 text-[#FF6B00]">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-heading text-lg font-bold text-[#F5F5F5]">
                Currently Learning & Deepening
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {currentlyLearning.map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#F5F5F5] bg-white/[0.05] border border-white/10 hover:border-[#FF6B00]/40 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
