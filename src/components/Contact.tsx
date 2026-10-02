import React, { useState } from 'react';
import { Mail, ArrowRight, Copy, Check, Sparkles, Code2, Film, Briefcase, Phone, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ContactProps {
  onOpenHire?: (service?: 'web' | 'video' | 'general') => void;
}

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34M7.86 18.5V10.13H5.07v8.37h2.79z" />
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ onOpenHire }) => {
  const { data } = useCMS();
  const profile = data.profile;
  const [copied, setCopied] = useState<boolean>(false);
  const email = profile.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenHire = (service?: 'web' | 'video' | 'general') => {
    if (onOpenHire) {
      onOpenHire(service);
    } else {
      window.location.href = `mailto:${email}?subject=Project%20Inquiry%20from%20Portfolio`;
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration Section"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Main Pitch Card Container */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-10 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background ambient lights */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#FF6B00]/10 blur-[100px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none"
          />

          {/* Top Headline Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🚀 Have a Project in Mind?</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A5]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Internships, Freelance & Full-time</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-tight">
                Turn your ideas into something <span className="text-[#FF852C]">impactful</span>.
              </h2>

              <p className="font-body text-[#A5A5A5] text-sm sm:text-base leading-relaxed max-w-xl">
                Whether you need a modern website or engaging video content, I’m ready to craft digital solutions that stand out.
              </p>

              {/* Service Capabilities Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* 1. Web Development */}
                <div
                  onClick={() => handleOpenHire('web')}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FF6B00]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 text-[#FF6B00] mb-2 font-mono font-bold text-xs uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>💻 Web Development</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    Websites, web apps & full-stack software products built with React, Node.js & modern UI frameworks.
                  </p>
                </div>

                {/* 2. Video Editing */}
                <div
                  onClick={() => handleOpenHire('video')}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 text-cyan-400 mb-2 font-mono font-bold text-xs uppercase tracking-wider">
                    <Film className="w-4 h-4" />
                    <span>🎬 Video Editing</span>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    Reels, YouTube Shorts, social media storytelling & high-retention creative motion content.
                  </p>
                </div>

              </div>

              {/* Status Note */}
              <div className="pt-2 text-xs font-mono text-[#8A8E94]">
                <span>I’m open to </span>
                <span className="text-white font-semibold">internships</span>,{' '}
                <span className="text-white font-semibold">freelance projects</span>, and{' '}
                <span className="text-white font-semibold">job opportunities</span>.
              </div>

              {/* Action Buttons: 👉 Hire Me · 📩 Contact Me */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => handleOpenHire('general')}
                  className="anim-primary-button inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-[0_10px_25px_rgba(255,107,0,0.35)] transition-all"
                >
                  <span>👉 Hire Me</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`mailto:${email}?subject=Let's%20Connect%20-%20Project%20Opportunity`}
                  className="anim-primary-button inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-[#F5F5F5] liquid-glass hover:border-[#FF6B00]/40 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#FF6B00]" />
                  <span>📩 Contact Me</span>
                </a>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="p-3 rounded-full text-[#A5A5A5] hover:text-white liquid-pill transition-colors"
                    title={`Call: ${profile.phone}`}
                    aria-label="Call phone"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>

            {/* Right Side: Glassmorphic Capsule & Quick Connect */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="w-full max-w-sm rounded-3xl p-6 sm:p-7 bg-[#070a0f]/80 backdrop-blur-xl border border-white/15 shadow-xl relative overflow-hidden"
              >
                {/* Specular highlight */}
                <div
                  aria-hidden="true"
                  className="absolute top-2 left-6 w-24 h-6 rounded-full bg-white/10 blur-md pointer-events-none"
                />

                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Photo or Icon */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FF6B00]/50 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {profile.name}
                    </h3>
                    <p className="font-mono text-xs text-[#FF852C]">
                      Full-Stack Dev & Content Creator
                    </p>
                    <p className="font-body text-xs text-[#A5A5A5] mt-1">
                      {profile.location}
                    </p>
                  </div>

                  {/* Email row */}
                  <div className="w-full p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden text-left">
                      <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span className="font-mono text-xs text-[#F5F5F5] truncate">
                        {email}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/15 text-[#A5A5A5] hover:text-white transition-colors shrink-0"
                      title="Copy Email"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2 w-full border-t border-white/10">
                    {profile.socials.linkedin && (
                      <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn Profile"
                        className="p-2 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}

                    {profile.socials.github && (
                      <a
                        href={profile.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Profile"
                        className="p-2 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenHire('general')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-[#FF852C] bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 border border-[#FF6B00]/30 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Quick Pitch</span>
                    </button>
                  </div>

                  {/* Motivational Motto */}
                  <div className="text-[11px] font-mono text-[#6F7378] italic">
                    “Let’s build. Let’s create. Let’s make something that stands out.”
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
