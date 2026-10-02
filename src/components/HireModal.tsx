import React, { useEffect, useState } from 'react';
import { X, Send, Sparkles, Code2, Film, CheckCircle2, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { useCMS } from '../context/CMSContext';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'web' | 'video' | 'general';
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'general',
}) => {
  const { data } = useCMS();
  const profile = data.profile;

  const [selectedService, setSelectedService] = useState<'web' | 'video' | 'both'>('web');
  const [projectType, setProjectType] = useState<'internship' | 'freelance' | 'job' | 'other'>('freelance');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    if (defaultService === 'video') {
      setSelectedService('video');
    } else if (defaultService === 'web') {
      setSelectedService('web');
    } else {
      setSelectedService('both');
    }
  }, [defaultService, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel =
      selectedService === 'web'
        ? 'Web Development'
        : selectedService === 'video'
        ? 'Video Editing'
        : 'Web Development & Video Editing';

    const subject = encodeURIComponent(`Project Inquiry: ${serviceLabel} (${projectType.toUpperCase()}) - ${clientName || 'New Client'}`);
    const body = encodeURIComponent(
      `Hi Raunak,\n\nName: ${clientName}\nEmail: ${clientEmail}\nInterested In: ${serviceLabel}\nOpportunity Type: ${projectType}\n\nProject Details:\n${message}\n\nLooking forward to hearing from you!`
    );

    // Open user's email client directly
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-full"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050607]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto overscroll-contain liquid-glass rounded-3xl p-6 sm:p-8 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          boxShadow:
            'inset 2px 2px 3px rgba(255, 255, 255, 0.28), inset -2px -2px 6px rgba(255, 107, 0, 0.25), 0 35px 100px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#A5A5A5] hover:text-white bg-white/[0.06] hover:bg-[#FF6B00] border border-white/10 transition-colors focus-visible:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>🚀 Have a Project in Mind?</span>
        </div>

        <h3 id="hire-modal-title" className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          Let’s Build & Create Together
        </h3>
        <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mb-6 leading-relaxed">
          Whether you need a modern website or engaging video content, I’m ready to turn your ideas into something impactful.
        </p>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-white">Opening Email Client...</h4>
            <p className="font-body text-xs text-[#A5A5A5] max-w-sm">
              Your message draft has been prepared. You can also directly reach out at <span className="text-[#FF852C] font-mono">{profile.email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Selection Pills */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#FF852C] mb-2 tracking-wider">
                Select What You Need:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService('web')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5 ${
                    selectedService === 'web'
                      ? 'border-[#FF6B00] bg-[#FF6B00]/15 shadow-[0_0_15px_rgba(255,107,0,0.25)] text-white'
                      : 'border-white/10 bg-white/[0.03] text-[#A5A5A5] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-[#FF6B00]" />
                  <span className="font-heading text-xs font-bold leading-tight block">Web Dev</span>
                  <span className="text-[10px] text-[#A5A5A5] leading-tight block">Websites & Apps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService('video')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5 ${
                    selectedService === 'video'
                      ? 'border-[#06b6d4] bg-[#06b6d4]/15 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-white'
                      : 'border-white/10 bg-white/[0.03] text-[#A5A5A5] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Film className="w-4 h-4 text-cyan-400" />
                  <span className="font-heading text-xs font-bold leading-tight block">Video Editing</span>
                  <span className="text-[10px] text-[#A5A5A5] leading-tight block">Reels & Shorts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService('both')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5 ${
                    selectedService === 'both'
                      ? 'border-[#a855f7] bg-[#a855f7]/15 shadow-[0_0_15px_rgba(168,85,247,0.25)] text-white'
                      : 'border-white/10 bg-white/[0.03] text-[#A5A5A5] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="font-heading text-xs font-bold leading-tight block">Full Package</span>
                  <span className="text-[10px] text-[#A5A5A5] leading-tight block">Web + Content</span>
                </button>
              </div>
            </div>

            {/* Opportunity Type */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#A5A5A5] mb-2 tracking-wider">
                Opportunity Type:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'internship', label: 'Internship' },
                  { id: 'freelance', label: 'Freelance Project' },
                  { id: 'job', label: 'Job Opportunity' },
                  { id: 'other', label: 'Other Collab' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProjectType(type.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                      projectType === type.id
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                        : 'bg-white/[0.04] text-[#A5A5A5] border-white/10 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A5A5A5] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#6F7378] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A5A5A5] mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#6F7378] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Message Details */}
            <div>
              <label className="block text-[11px] font-mono text-[#A5A5A5] mb-1">Project Details or Scope</label>
              <textarea
                required
                rows={3}
                placeholder="Tell me about what you'd like to build or create..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-[#6F7378] focus:outline-none focus:border-[#FF6B00] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-mono text-[#A5A5A5]">
                <a
                  href={`tel:${profile.phone}`}
                  className="hover:text-[#FF852C] transition-colors inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call / WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-medium text-[#A5A5A5] hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="anim-primary-button inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-[0_8px_20px_rgba(255,107,0,0.35)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Project Inquiry</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
