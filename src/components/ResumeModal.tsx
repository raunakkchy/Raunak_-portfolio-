import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, MapPin, GraduationCap, Code, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { profile, skillCategories, projects } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
RAUNAK KUMAR
Full Stack Developer | CSE Student
Email: ${profile.email} | Location: ${profile.location}, ${profile.country}

EDUCATION:
${profile.fullDegree}
${profile.institute}
CGPA: ${profile.cgpa}

TECHNICAL SKILLS:
Languages: Python, Java, C, JavaScript
Frontend: HTML5, CSS3, React
Backend & DB: Node.js, Express.js, MongoDB
Tools: GitHub, VS Code, MS Office

PROJECTS:
1. Placement OS (React, TypeScript, Node.js, Express.js, MongoDB, Google Gemini API)
${projects[0]?.tagline}
${projects[0]?.description}
Live Demo: ${projects[0]?.liveDemoUrl}

2. Simple Hisaab (React, Node.js, Express.js, MongoDB)
${projects[1]?.tagline}
${projects[1]?.description}
Live Demo: ${projects[1]?.liveDemoUrl}

3. NSIT AI Chatbot (HTML, CSS, JavaScript, Tailwind CSS, Google Gemini API)
${projects[2]?.tagline}
${projects[2]?.description}
Live Demo: ${projects[2]?.liveDemoUrl}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071018]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-10 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6338]" />
            <span className="font-mono text-xs text-[#9AA8B5]">
              Curriculum Vitae · {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#F5F7FA] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white bg-[#FF6338] hover:bg-[#FF8A62] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-xl text-[#9AA8B5] hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Document Body */}
        <div className="space-y-7 text-[#F5F7FA]">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-5">
            <h2 id="resume-title" className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-1 text-white">
              {profile.name}
            </h2>
            <div className="text-sm font-medium text-[#FF6338] mb-3">
              {profile.subtitle}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9AA8B5]">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FF6338]" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6338]" />
                <span>{profile.location}, {profile.country}</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6338] font-bold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h3>

            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="font-heading text-base font-semibold text-[#F5F7FA]">
                  {profile.fullDegree}
                </span>
                <span className="font-mono text-xs font-bold text-[#FF6338] bg-[#FF6338]/10 px-2 py-0.5 rounded">
                  CGPA: {profile.cgpa}
                </span>
              </div>
              <div className="text-xs text-[#9AA8B5]">
                {profile.institute}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6338] font-bold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Technical Skills</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                  <div className="text-xs font-mono text-[#9AA8B5] mb-2 font-semibold">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-0.5 rounded text-xs bg-white/[0.06] text-[#F5F7FA] border border-white/10"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6338] font-bold mb-3">
              Selected Projects
            </h3>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white/[0.03] p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-heading text-sm font-bold text-[#F5F7FA]">
                      {proj.title} <span className="text-xs font-mono text-[#687785]">({proj.category})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-[#9AA8B5]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#9AA8B5] leading-relaxed mb-2">
                    {proj.description}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FF6338] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Live App: {proj.liveDemoUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
