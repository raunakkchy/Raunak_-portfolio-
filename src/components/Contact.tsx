import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, Copy, Check, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const email = portfolioData.profile.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Trigger direct mailto with subject and body
    const subject = encodeURIComponent(`Collaboration Inquiry from ${formState.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Raunak,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSentStatus('Opening email client...');
    setTimeout(() => setSentStatus(null), 4000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Large Glass Panel */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 md:p-16 border border-white/[0.14] shadow-[0_24px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
          
          {/* Subtle Corner Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255,99,56,0.4) 0%, rgba(255,99,56,0) 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#FF6338]">
                    04
                  </span>
                  <span className="w-8 h-[1px] bg-[#FF6338]/40" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#687785]">
                    CONTACT
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F7FA] leading-[1.15] mb-6">
                  Have an idea?
                  <br />
                  <span className="text-[#FF6338]">Let&apos;s build it.</span>
                </h2>

                {/* Description */}
                <p className="font-body text-[#9AA8B5] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                  I&apos;m open to internships, collaborations, freelance work and interesting projects.
                </p>

                {/* Contact Details */}
                <div className="space-y-4 mb-8">
                  
                  {/* Email block with Copy */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#FF6338] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`mailto:${email}`}
                        className="font-mono text-sm sm:text-base text-[#F5F7FA] hover:text-[#FF6338] transition-colors"
                      >
                        {email}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Location block */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#FF6338] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="font-body text-sm sm:text-base text-[#9AA8B5]">
                      Bihar, India
                    </div>
                  </div>

                  {/* Social Profiles */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={portfolioData.profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF6338]/40 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>github/raunakkchy</span>
                    </a>

                    <a
                      href={portfolioData.profile.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF6338]/40 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>@raunakkchy</span>
                    </a>
                  </div>

                </div>
              </div>

              {/* Main CTA */}
              <div className="pt-2">
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-white bg-[#FF6338] hover:bg-[#FF8A62] shadow-[0_12px_30px_rgba(255,99,56,0.35)] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Right: Quick Direct Message Form */}
            <div className="lg:col-span-5 bg-white/[0.03] p-6 sm:p-7 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#F5F7FA] mb-1">
                  Send a Quick Note
                </h3>
                <p className="text-xs font-body text-[#9AA8B5] mb-5">
                  Sends directly to my primary inbox.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-[#687785] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#687785] focus:outline-none focus:border-[#FF6338] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-[#687785] mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#687785] focus:outline-none focus:border-[#FF6338] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-mono uppercase text-[#687785] mb-1.5">
                      Message / Project Brief
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      required
                      placeholder="Tell me about the role, project, or collaboration..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#687785] focus:outline-none focus:border-[#FF6338] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-[#FF6338] border border-white/15 hover:border-[#FF6338] transition-all duration-200"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message via Mail</span>
                  </button>

                  {sentStatus && (
                    <div className="text-center text-xs font-mono text-emerald-400 mt-2">
                      {sentStatus}
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
