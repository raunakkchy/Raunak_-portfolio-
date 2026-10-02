import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ExternalLink,
  Compass,
  UserCheck,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { useScrollLock } from '../hooks/useScrollLock';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useScrollLock(!!project);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
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
        className="fixed inset-0 bg-[#050607]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-8 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          boxShadow:
            'inset 2px 2px 3px rgba(255, 255, 255, 0.28), inset -2px -2px 6px rgba(255, 107, 0, 0.2), 0 35px 100px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#A5A5A5] hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
            {project.number}
          </span>
          <span className="w-6 h-[1px] bg-[#FF6B00]/40" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#A5A5A5]">
            {project.category}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 id="modal-title" className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-1">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-[#FF6B00] mb-4">
          {project.subtitle}
        </p>

        {/* Overview Description */}
        <p className="font-body text-[#A5A5A5] text-sm sm:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {/* What it does */}
        {project.whatItDoes && (
          <div className="mb-6 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6B00] mb-2 font-semibold">
              <Compass className="w-4 h-4" />
              <span>What It Does</span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              {project.whatItDoes}
            </p>
          </div>
        )}

        {/* Contribution Highlight Block */}
        {project.myContribution && (
          <div className="mb-6 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-[#FF6B00]/30 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6B00] font-bold">
                <UserCheck className="w-4 h-4" />
                <span>My Contribution</span>
              </div>
            </div>

            {project.contributionSummary && (
              <div className="mb-3 bg-[#FF6B00]/10 p-3 rounded-xl border border-[#FF6B00]/20 text-xs sm:text-sm text-[#F5F5F5] font-medium leading-relaxed">
                <span className="text-[#FF852C] font-semibold">In short: </span>
                {project.contributionSummary}
              </div>
            )}

            <div className="space-y-2 text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              {project.myContribution.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Main Features */}
        {project.mainFeatures && (
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6F7378] mb-3 font-semibold">
              Key Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.mainFeatures.map((feat, index) => (
                <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#F5F5F5] bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6F7378] mb-2 font-semibold">
            Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium text-[#F5F5F5] bg-white/[0.08] border border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-medium text-[#F5F5F5] bg-white/[0.06] hover:bg-white/10 border border-white/15 transition-colors"
          >
            Close
          </button>

          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-[0_8px_20px_rgba(255,107,0,0.35)] transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Open Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
