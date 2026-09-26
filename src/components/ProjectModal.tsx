import React, { useEffect } from 'react';
import { X, CheckCircle2, Cpu, ExternalLink, Sparkles, Layers, Lightbulb, Compass } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071018]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#9AA8B5] hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6338]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs font-bold text-[#FF6338]">
            {project.number}
          </span>
          <span className="w-6 h-[1px] bg-[#FF6338]/40" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#9AA8B5]">
            {project.category}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 id="modal-title" className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-1">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-[#FF6338] mb-4">
          {project.tagline}
        </p>

        {/* Overview Description */}
        <p className="font-body text-[#9AA8B5] text-sm sm:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {/* What it does */}
        <div className="mb-6 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6338] mb-2.5 font-semibold">
            <Compass className="w-4 h-4" />
            <span>What It Does</span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#9AA8B5] leading-relaxed">
            {project.whatItDoes}
          </p>
        </div>

        {/* Main Features */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#687785] mb-3 font-semibold">
            Key Features
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.mainFeatures.map((feat, index) => (
              <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#F5F7FA] bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6338] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Tech Stack Breakdown */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#687785] mb-2.5 font-semibold">
            Technology Stack
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium text-[#F5F7FA] bg-white/[0.08] border border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Detailed Stack breakdown if available */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
            {project.techStackDetails.frontend && (
              <div>
                <span className="text-[#687785]">Frontend: </span>
                <span className="text-[#F5F7FA]">{project.techStackDetails.frontend}</span>
              </div>
            )}
            {project.techStackDetails.backend && (
              <div>
                <span className="text-[#687785]">Backend: </span>
                <span className="text-[#F5F7FA]">{project.techStackDetails.backend}</span>
              </div>
            )}
            {project.techStackDetails.database && (
              <div>
                <span className="text-[#687785]">Database: </span>
                <span className="text-[#F5F7FA]">{project.techStackDetails.database}</span>
              </div>
            )}
            {project.techStackDetails.ai && (
              <div>
                <span className="text-[#687785]">AI: </span>
                <span className="text-[#FF6338]">{project.techStackDetails.ai}</span>
              </div>
            )}
          </div>
        </div>

        {/* Why I built it */}
        <div className="mb-6 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6338] mb-2 font-semibold">
            <Lightbulb className="w-4 h-4" />
            <span>Why I Built It</span>
          </div>
          <p className="font-body text-xs sm:text-sm text-[#9AA8B5] leading-relaxed">
            {project.whyIBuiltIt}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.10]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#F5F7FA] bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 transition-colors"
          >
            Done Viewing
          </button>

          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#FF6338] hover:bg-[#FF8A62] shadow-[0_8px_20px_rgba(255,99,56,0.3)] transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Open Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
