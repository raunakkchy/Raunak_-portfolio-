import React, { useState } from 'react';
import { Mail, ArrowRight, Copy, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

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

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = portfolioData.profile.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Get In Touch text & button */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Orange line accent */}
            <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] mb-4">
              Get In Touch
            </h2>

            <p className="font-body text-[#A5A5A5] text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Have a project in mind or just want to say hi? Feel free to reach out.
            </p>

            <div>
              <a
                href={`mailto:${email}`}
                className="anim-primary-button inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#F5F5F5] liquid-glass hover:border-[#FF6B00]/40 transition-all duration-300"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Side: Horizontal Liquid Water-Drop Shape Container */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div
              className="liquid-droplet w-full max-w-md droplet-shape-horizontal liquid-glass p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/20 relative overflow-hidden select-none group"
              style={{
                boxShadow:
                  'inset 2px 2px 3px rgba(255, 255, 255, 0.3), inset -2px -2px 6px rgba(255, 107, 0, 0.2), 0 30px 90px rgba(0, 0, 0, 0.9)',
              }}
            >
              {/* Top specular highlight */}
              <div
                aria-hidden="true"
                className="liquid-reflection absolute top-2 left-10 w-32 h-8 rounded-full bg-white/10 blur-md pointer-events-none"
              />

              {/* Bottom orange glow */}
              <div
                aria-hidden="true"
                className="ambient-glow absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#FF6B00]/20 blur-2xl pointer-events-none"
              />

              {/* Mail Icon + Email display */}
              <div className="flex flex-col items-center gap-2 mb-6 z-10">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00]/15 flex items-center justify-center text-[#FF6B00] border border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                  <Mail className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-sm sm:text-base font-medium text-[#F5F5F5] hover:text-[#FF6B00] transition-colors"
                  >
                    {email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-full liquid-pill text-[#A5A5A5] hover:text-white transition-colors"
                    title="Copy Email"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Minimal LinkedIn & GitHub Icons at bottom of capsule */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10 w-full max-w-[220px] z-10">
                <a
                  href={portfolioData.profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={portfolioData.profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
