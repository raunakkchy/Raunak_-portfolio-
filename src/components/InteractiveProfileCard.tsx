import React, { useEffect } from 'react';
import { X, GraduationCap, BookOpen, CheckCircle2, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useScrollLock } from '../hooks/useScrollLock';

interface InteractiveProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveProfileCard: React.FC<InteractiveProfileCardProps> = ({ isOpen, onClose }) => {
  const { data } = useCMS();
  const profile = data.profile;
  const topSkills = data.skills.slice(0, 6);

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

  const scrollToSection = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-card-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-8 z-10 border border-white/20 shadow-2xl bg-[#0D1013]/95 animate-in zoom-in-90 duration-300 my-auto"
        style={{
          boxShadow:
            'inset 2px 2px 3px rgba(255, 255, 255, 0.3), inset -2px -2px 6px rgba(255, 107, 0, 0.25), 0 35px 100px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Profile Card"
          className="absolute top-5 right-5 p-2 rounded-full text-[#A5A5A5] hover:text-white bg-white/10 hover:bg-[#FF6B00] border border-white/10 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Row with Photo & Name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10 text-center sm:text-left">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#FF6B00]/40 shadow-[0_0_25px_rgba(255,107,0,0.3)] shrink-0">
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Interactive Profile Reveal</span>
            </div>

            <h2 id="profile-card-title" className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
              {profile.name}
            </h2>

            <div className="text-xs sm:text-sm font-medium text-[#FF852C] mt-1">
              Diploma CSE Student · Aspiring Web Developer
            </div>

            <p className="font-body text-xs text-[#A5A5A5] mt-2 leading-relaxed">
              {profile.supportingText}
            </p>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="py-5 border-b border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00]">
            <GraduationCap className="w-4 h-4" />
            <span className="uppercase tracking-wider">Academic Overview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[#A5A5A5] block text-[10px] font-mono">Course & Branch</span>
              <span className="font-semibold text-white">{profile.degree}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[#A5A5A5] block text-[10px] font-mono">Semester & Year</span>
              <span className="font-semibold text-white">{profile.semesterStatus}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[#A5A5A5] block text-[10px] font-mono">College Institute</span>
              <span className="font-semibold text-white">{profile.institute}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[#A5A5A5] block text-[10px] font-mono">Academic CGPA</span>
              <span className="font-bold text-[#FF6B00] font-mono">{profile.cgpa}</span>
            </div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="py-5 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#FF6B00] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Skills</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {topSkills.map((s) => (
              <div
                key={s.id}
                className="px-3 py-1 rounded-full text-xs font-mono text-white bg-white/5 border border-white/10 flex items-center gap-2"
              >
                <span>{s.name}</span>
                {s.level && <span className="text-[10px] text-[#FF852C] font-bold">({s.level})</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="py-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00]">
            <BookOpen className="w-4 h-4" />
            <span className="uppercase tracking-wider">Current Focus</span>
          </div>
          <div className="text-xs text-[#A5A5A5] font-sans leading-relaxed">
            Full-Stack Web Development · AI-Powered Applications · Real-World Software Engineering
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-[#F5F5F5] liquid-glass hover:border-[#FF6B00]/40 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Let's Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
