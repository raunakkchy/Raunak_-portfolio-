import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { portfolioData, ProjectItem } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      aria-label="My Projects"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            {/* Orange horizontal line accent */}
            <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
              My Projects
            </h2>

            <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
              Real problems. Practical solutions.
            </p>
          </div>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FF6B00] hover:text-[#FF852C] transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Projects Cards in a Row (Desktop) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card liquid-glass ${project.shapeClass || 'droplet-shape-card-1'} p-7 sm:p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project glass reflection pass */}
              <div
                aria-hidden="true"
                className="project-reflection absolute top-2 left-6 w-24 h-8 rounded-full bg-white/10 blur-md pointer-events-none"
              />

              {/* Bottom orange rim light reflection */}
              <div
                aria-hidden="true"
                className="project-reflection absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#FF6B00]/20 blur-2xl pointer-events-none"
              />

              <div>
                {/* Header row: project-icon badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="project-icon flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                    {project.id === 'placement-os' && <Briefcase className="w-4 h-4" />}
                    {project.id === 'simple-hisaab' && (
                      <span className="font-heading font-bold text-sm leading-none">₹</span>
                    )}
                    {project.id === 'nsit-ai-chatbot' && <MessageSquare className="w-4 h-4" />}
                    <span className="font-mono text-xs font-bold tracking-tight text-[#FF6B00]">
                      {project.number}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-heading text-2xl font-bold text-[#F5F5F5] transition-colors mb-1">
                  {project.title}
                </h3>

                <div className="text-xs font-medium text-[#A5A5A5] mb-4 leading-snug">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="font-body text-[#A5A5A5] text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom: Tech Pills & View Project Button */}
              <div className="pt-4 border-t border-white/10 space-y-4 relative z-10">
                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[11px] font-mono text-[#F5F5F5] bg-white/[0.06] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B00] transition-colors">
                    <span>View Project</span>
                    <ArrowRight className="project-arrow w-3.5 h-3.5 transition-transform duration-200" />
                  </span>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full liquid-pill hover:bg-[#FF6B00] hover:text-white text-[#A5A5A5] transition-all"
                    title="Open Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
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
