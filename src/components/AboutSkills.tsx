import React from 'react';
import { MapPin, GraduationCap, Code2, Terminal, Layers, Database, Wrench } from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolio';

export const AboutSkills: React.FC = () => {
  const { about, skillCategories } = portfolioData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Terminal className="w-4 h-4 text-[#FF6338]" />;
      case 'Frontend':
        return <Layers className="w-4 h-4 text-[#FF6338]" />;
      case 'Backend & Database':
        return <Database className="w-4 h-4 text-[#FF6338]" />;
      case 'Tools':
        return <Wrench className="w-4 h-4 text-[#FF6338]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#FF6338]" />;
    }
  };

  return (
    <section
      id="about"
      aria-label="About and Skills"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT: 01 About Me */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Section Index & Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#FF6338]">
                {about.number}
              </span>
              <span className="w-8 h-[1px] bg-[#FF6338]/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#687785]">
                Biography
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-6">
              {about.heading}
            </h2>

            <p className="font-body text-[#9AA8B5] text-base sm:text-lg leading-relaxed mb-8">
              {about.bio}
            </p>

            {/* Three Metadata Blocks with Small Orange Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
              
              {/* Location */}
              <div className="glass-panel p-4 rounded-xl flex items-center gap-3.5 border-white/[0.10] hover:border-white/20 transition-all duration-200">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF6338]/10 border border-[#FF6338]/20 shrink-0 text-[#FF6338]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#687785]">
                    Location
                  </div>
                  <div className="text-sm font-semibold text-[#F5F7FA]">
                    {portfolioData.profile.location}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-panel p-4 rounded-xl flex items-center gap-3.5 border-white/[0.10] hover:border-white/20 transition-all duration-200">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF6338]/10 border border-[#FF6338]/20 shrink-0 text-[#FF6338]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#687785]">
                    Education
                  </div>
                  <div className="text-sm font-semibold text-[#F5F7FA]">
                    {portfolioData.profile.degree}
                  </div>
                </div>
              </div>

              {/* Focus */}
              <div className="glass-panel p-4 rounded-xl flex items-center gap-3.5 border-white/[0.10] hover:border-white/20 transition-all duration-200">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF6338]/10 border border-[#FF6338]/20 shrink-0 text-[#FF6338]">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#687785]">
                    Focus
                  </div>
                  <div className="text-sm font-semibold text-[#F5F7FA]">
                    {portfolioData.profile.focus}
                  </div>
                </div>
              </div>

            </div>

            {/* Additional Academic Note */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] text-xs text-[#687785] flex items-center justify-between">
              <span>{portfolioData.profile.institute}</span>
              <span className="font-mono text-[#FF6338] font-medium">CGPA {portfolioData.profile.cgpa}</span>
            </div>

          </div>

          {/* RIGHT: 02 My Skills */}
          <div id="skills" className="lg:col-span-7 flex flex-col pt-2 lg:pt-0">
            
            {/* Section Index & Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#FF6338]">
                02
              </span>
              <span className="w-8 h-[1px] bg-[#FF6338]/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#687785]">
                Core Competencies
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-6">
              My Skills
            </h2>

            {/* Categorized Skills Grid */}
            <div className="space-y-6">
              {skillCategories.map((category: SkillCategory) => (
                <div
                  key={category.title}
                  className="glass-panel p-5 rounded-2xl border-white/[0.10] hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3.5">
                    {getCategoryIcon(category.title)}
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#9AA8B5] font-semibold">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="glass-pill px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#F5F7FA] transition-all duration-200 cursor-default flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6338]/70" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
