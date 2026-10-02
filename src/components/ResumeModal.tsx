import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Mail, MapPin, GraduationCap, Code, ExternalLink, Phone, Download } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useScrollLock } from '../hooks/useScrollLock';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { data } = useCMS();
  const { profile, skillCategories, projects, educationTimeline, experience, certifications } = data;

  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (profile.resumeUrl) {
      const link = document.createElement('a');
      link.href = profile.resumeUrl;
      link.download = profile.resumeFileName || 'Raunak_Kumar_Resume.pdf';
      link.target = '_blank';
      link.click();
    } else {
      window.print();
    }
  };

  const handleCopyText = () => {
    const text = `
${profile.name}
${profile.headline}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}

EDUCATION:
${profile.degree}
${profile.institute}
${profile.semesterStatus} | CGPA: ${profile.cgpa}

INTERNSHIP:
${experience[0]?.role || ''} - ${experience[0]?.organization || ''} (${experience[0]?.status || ''})
${experience[0]?.description || ''}

TECHNICAL SKILLS:
${skillCategories.map((c) => `${c.title}: ${c.items.map((i) => i.name).join(', ')}`).join('\n')}

PROJECTS:
${projects.slice(0, 3).map((p, idx) => `${idx + 1}. ${p.title} — ${p.subtitle}\nStack: ${p.technologies.join(', ')}\nLive Demo: ${p.liveDemoUrl}`).join('\n\n')}
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
        className="fixed inset-0 bg-[#050607]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-10 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          boxShadow:
            'inset 2px 2px 3px rgba(255, 255, 255, 0.28), inset -2px -2px 6px rgba(255, 107, 0, 0.2), 0 35px 100px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
            <span className="font-mono text-xs text-[#A5A5A5]">
              Curriculum Vitae · {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#F5F5F5] liquid-pill transition-colors"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-colors"
            >
              {profile.resumeUrl ? <Download className="w-3.5 h-3.5" /> : <Printer className="w-3.5 h-3.5" />}
              <span>{profile.resumeUrl ? 'Download Resume File' : 'Print / PDF'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full liquid-pill hover:border-[#FF6B00]/40 transition-colors ml-1"
            >
              <X className="w-4 h-4 text-[#A5A5A5] hover:text-white" />
            </button>
          </div>
        </div>

        {/* Resume Document Body */}
        <div className="space-y-7 text-[#F5F5F5]">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-5">
            <h2 id="resume-title" className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-1 text-white">
              {profile.name}
            </h2>
            <div className="text-sm font-medium text-[#FF6B00] mb-3">
              {profile.headline}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A5A5A5]">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] font-bold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education Timeline</span>
            </h3>

            <div className="space-y-2.5">
              {educationTimeline.map((edu) => (
                <div key={edu.id || edu.degree} className="bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-heading text-sm sm:text-base font-semibold text-[#F5F5F5]">
                      {edu.degree}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30 w-fit">
                      {edu.score}
                    </span>
                  </div>
                  <div className="text-xs text-[#A5A5A5]">
                    {edu.institution} · <span className="text-white font-mono">{edu.yearStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] font-bold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Internship Experience</span>
            </h3>

            {experience.map((exp) => (
              <div key={exp.id || exp.organization} className="bg-white/[0.03] p-4 rounded-2xl border border-white/10 mb-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-heading text-sm font-bold text-[#F5F5F5]">
                    {exp.role} — <span className="text-[#FF852C]">{exp.organization}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20">
                    {exp.status}
                  </span>
                </div>
                <p className="text-xs text-[#A5A5A5] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] font-bold mb-3">
              Technical Capabilities
            </h3>

            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="text-xs">
                  <span className="font-semibold text-white font-mono">{cat.title}: </span>
                  <span className="text-[#A5A5A5]">{cat.items.map((i) => i.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] font-bold mb-3">
              Deployed Projects
            </h3>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-heading text-sm font-bold text-[#F5F5F5]">
                      {proj.title} <span className="text-xs font-normal text-[#A5A5A5]">— {proj.subtitle}</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-[#A5A5A5]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed mb-2">
                    {proj.description}
                  </p>
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FF6B00] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Live Product: {proj.liveDemoUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] font-bold mb-3">
              Verified Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-[11px] text-[#A5A5A5]">{c.issuer}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
