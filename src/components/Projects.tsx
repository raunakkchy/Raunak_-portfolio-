import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Briefcase,
  MessageSquare,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { ProjectItem } from '../types/cms';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { data } = useCMS();
  const publishedProjects = data.projects.filter((p) => p.published !== false);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverPos({ x: x * 15, y: y * 15 });
  };

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
              Real problems. Practical solutions. Hover/tap to inspect interactive details.
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

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative">
          {publishedProjects.map((project) => {
            const isHovered = hoveredProject?.id === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setHoverPos({ x: 0, y: 0 });
                }}
                onMouseMove={handleCardMouseMove}
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                  setSelectedProject(project);
                }}
                className={`project-card liquid-glass ${project.shapeClass || 'droplet-shape-card-1'} p-7 sm:p-9 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 border ${
                  isHovered ? 'border-[#FF6B00]/60 shadow-[0_20px_60px_rgba(255,107,0,0.25)] -translate-y-2' : 'border-white/10'
                }`}
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${-hoverPos.y * 0.3}deg) rotateY(${hoverPos.x * 0.3}deg) translateY(-6px)`
                    : 'none',
                }}
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
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="project-icon flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                      {project.id === 'placement-os' && <Briefcase className="w-4 h-4" />}
                      {project.id === 'simple-hisaab' && (
                        <span className="font-heading font-bold text-sm leading-none">₹</span>
                      )}
                      {project.id === 'nsit-ai-chatbot' && <MessageSquare className="w-4 h-4" />}
                      {project.id === 'college-complaint-portal' && <FolderGit2 className="w-4 h-4" />}
                      <span className="font-mono text-xs font-bold tracking-tight text-[#FF6B00]">
                        #{project.number || '00'}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase font-bold text-[#FF852C] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F5] group-hover:text-white transition-colors mb-1">
                    {project.title}
                  </h3>

                  <div className="text-xs font-medium text-[#FF852C] mb-4 leading-snug">
                    {project.subtitle}
                  </div>

                  {/* Short Description */}
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

                  {/* Interactive Trigger Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B00] transition-colors group-hover:translate-x-1">
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full liquid-pill hover:bg-[#FF6B00] hover:text-white text-[#A5A5A5] transition-all"
                        title="Open Live Product"
                        aria-label={`Open Live Product for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* EMERGING HOVER DETAIL PANEL (Desktop) */}
                {isHovered && (
                  <div
                    className="hidden lg:flex flex-col justify-between absolute inset-0 z-30 p-7 bg-[#0D1013]/95 backdrop-blur-md rounded-3xl border border-[#FF6B00]/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto overscroll-contain"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                        <div className="flex items-center gap-2 text-[#FF6B00]">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-heading font-bold text-sm text-white">
                            {project.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#FF852C] bg-[#FF6B00]/15 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                          {project.category}
                        </span>
                      </div>

                      <p className="font-body text-xs text-[#A5A5A5] leading-relaxed mb-4">
                        {project.whatItDoes || project.description}
                      </p>

                      {/* Main Features List */}
                      {project.mainFeatures && project.mainFeatures.length > 0 && (
                        <div className="mb-4 space-y-1.5">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#FF6B00] block mb-1">
                            Key Features & Capabilities
                          </span>
                          {project.mainFeatures.slice(0, 4).map((f) => (
                            <div key={f} className="flex items-center gap-2 text-xs text-[#F5F5F5]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links inside Emerging Panel */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-colors"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F5F5F5] bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-[#A5A5A5]">
                        Click card for case study →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Full Project Detail Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
