import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData, ProjectItem } from '../data/portfolio';
import {
  PlacementOSPreview,
  SimpleHisaabPreview,
  NSITChatbotPreview,
} from './ProjectPreviews';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects, projectsIntro, projectsReflection } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const renderPreview = (id: string) => {
    switch (id) {
      case 'placement-os':
        return <PlacementOSPreview />;
      case 'simple-hisaab':
        return <SimpleHisaabPreview />;
      case 'nsit-ai-chatbot':
        return <NSITChatbotPreview />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#FF6338]">
                03
              </span>
              <span className="w-8 h-[1px] bg-[#FF6338]/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#687785]">
                SELECTED WORK
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              <span>Projects I&apos;m</span>{' '}
              <span className="text-[#FF6338]">building</span>
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm text-[#9AA8B5] tracking-wide">
            <span className="text-[#FF6338] font-bold">03</span> projects
          </div>
        </div>

        {/* Philosophy / Intent Introduction */}
        <p className="font-body text-[#9AA8B5] text-base sm:text-lg leading-relaxed max-w-3xl mb-12">
          {projectsIntro}
        </p>

        {/* Responsive Grid: 3 cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-2xl p-5 relative flex flex-col justify-between border border-white/[0.12] hover:border-white/30 transition-all duration-250 ease-out hover:-translate-y-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)] overflow-hidden"
              style={{
                transition: 'all 250ms ease',
              }}
            >
              {/* Giant Subtle Background Numbering (01, 02, 03) */}
              <div
                aria-hidden="true"
                className="absolute top-2 right-4 font-heading text-8xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors"
              >
                {project.number}
              </div>

              {/* Top Meta: Number + Category */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF6338]">
                      {project.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9AA8B5] truncate">
                      {project.category}
                    </span>
                  </div>

                  {/* Arrow Action Indicator */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Inspect ${project.title}`}
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.05] group-hover:bg-[#FF6338] border border-white/10 group-hover:border-[#FF6338] text-[#9AA8B5] group-hover:text-white transition-all duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>

                {/* Project Title & Tagline */}
                <h3
                  onClick={() => setSelectedProject(project)}
                  className="font-heading text-xl font-bold text-[#F5F7FA] group-hover:text-white transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <div className="text-xs font-medium text-[#FF6338] mb-2.5">
                  {project.tagline}
                </div>

                {/* Project Description */}
                <p className="font-body text-[#9AA8B5] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Custom Dark Glass Project Preview */}
              <div
                onClick={() => setSelectedProject(project)}
                className="my-1 cursor-pointer"
              >
                {renderPreview(project.id)}
              </div>

              {/* Bottom Actions & Tech Pills */}
              <div className="pt-4 mt-3 border-t border-white/[0.06] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-[#9AA8B5] bg-white/[0.04] border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#687785]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-[#9AA8B5] hover:text-[#F5F7FA] transition-colors"
                  >
                    Details & Features →
                  </button>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#FF6338] hover:bg-[#FF8A62] shadow-sm transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What These Projects Say About Me (Editorial Reflection Card) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.12] bg-white/[0.04]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6338] mb-3 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Developer Reflection</span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F7FA] mb-4">
            {projectsReflection.heading}
          </h3>

          <p className="font-body text-[#9AA8B5] text-sm sm:text-base leading-relaxed mb-6">
            These projects represent different parts of my development journey:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {projectsReflection.points.map((pt) => (
              <div key={pt.project} className="bg-white/[0.03] p-4 rounded-xl border border-white/[0.06]">
                <div className="font-heading font-bold text-sm text-[#F5F7FA] mb-1 text-[#FF8A62]">
                  {pt.project}
                </div>
                <div className="text-xs text-[#9AA8B5] leading-relaxed">
                  {pt.takeaway}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] text-xs sm:text-sm font-medium text-[#F5F7FA] italic">
            &ldquo;{projectsReflection.closing}&rdquo;
          </div>
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
