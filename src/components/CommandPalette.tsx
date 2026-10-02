import React, { useState, useEffect } from 'react';
import { Search, X, Folder, User, Cpu, GraduationCap, Award, Mail, FileText, ArrowRight, Compass, Wrench, Sparkles, Briefcase } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenHire?: (service?: 'web' | 'video' | 'general') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenHire,
}) => {
  const [query, setQuery] = useState('');

  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { name: 'Home', section: 'home', icon: Compass, cat: 'Navigation' },
    { name: '👉 Hire Me / Start a Project', action: 'hire', icon: Sparkles, cat: 'Opportunities' },
    { name: 'View Projects', section: 'projects', icon: Folder, cat: 'Projects' },
    { name: 'About Me', section: 'about', icon: User, cat: 'Profile' },
    { name: 'How I Build', section: 'how-i-build', icon: Wrench, cat: 'Philosophy' },
    { name: 'Technical Skills', section: 'skills', icon: Cpu, cat: 'Capabilities' },
    { name: 'Experience & Internship', section: 'experience', icon: Award, cat: 'Work' },
    { name: 'Education Timeline', section: 'education', icon: GraduationCap, cat: 'Academics' },
    { name: 'Certifications', section: 'certifications', icon: Award, cat: 'Credentials' },
    { name: 'Technical Journey', section: 'journey', icon: Compass, cat: 'Timeline' },
    { name: '📩 Contact Me', section: 'contact', icon: Mail, cat: 'Connect' },
    { name: 'View / Download Resume', section: 'resume-action', action: 'resume', icon: FileText, cat: 'CV' },
  ];

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.cat.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof items[0]) => {
    onClose();
    if (item.action === 'resume') {
      onOpenResume();
      return;
    }
    if (item.action === 'hire') {
      if (onOpenHire) onOpenHire('general');
      return;
    }
    if (item.section) {
      const el = document.getElementById(item.section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050607]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Palette Card */}
      <div
        className="relative w-full max-w-lg liquid-glass rounded-3xl p-4 sm:p-5 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        style={{
          boxShadow:
            'inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.25), inset -1.5px -1.5px 4px rgba(255, 107, 0, 0.2), 0 30px 90px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10 px-2">
          <Search className="w-4 h-4 text-[#FF6B00] shrink-0" />
          <input
            id="cmd-title"
            type="text"
            autoFocus
            placeholder="Type a command or search section... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#F5F5F5] placeholder-[#6F7378] focus:outline-none font-sans"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded-full text-[#A5A5A5] hover:text-white bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Results */}
        <div className="mt-3 max-h-64 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#A5A5A5] font-mono">
              No matching sections found
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-medium text-[#A5A5A5] hover:text-white hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-xl bg-white/[0.05] group-hover:bg-[#FF6B00]/20 group-hover:text-[#FF6B00] flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-heading font-semibold text-[#F5F5F5]">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#6F7378] uppercase">
                      {item.cat}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#6F7378] px-2">
          <span>Navigate quick links</span>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#A5A5A5]">Esc</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
