import React, { useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useMouseParallax } from '../hooks/useMouseParallax';

// Minimal vector icons for social media
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

const XIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Hero: React.FC = () => {
  const { profile } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useMouseParallax(sectionRef);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 md:py-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Hero Info */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            
            {/* 1. Greeting */}
            <div className="hero-enter-greeting inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>{profile.eyebrow}</span>
            </div>

            {/* 2. Main Name */}
            <h1 className="hero-enter-name font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F5F5] leading-[1.08] mb-4">
              {profile.name}
            </h1>

            {/* 3. Subtitle / Headline */}
            <div className="hero-enter-subtitle text-base sm:text-lg md:text-xl font-medium text-[#FF852C] mb-4">
              {profile.headline}
            </div>

            {/* 4. Supporting Text */}
            <p className="hero-enter-description font-body text-[#A5A5A5] text-sm sm:text-base leading-relaxed max-w-xl mb-4">
              {profile.supportingText}
            </p>

            {/* Personal Statement Badge */}
            <div className="hero-enter-description inline-block font-mono text-xs text-[#6F7378] uppercase tracking-wider mb-8 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              {profile.personalStatement}
            </div>

            {/* 5. Buttons */}
            <div className="hero-enter-buttons flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="anim-primary-button group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-[0_10px_25px_rgba(255,107,0,0.35)]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="anim-primary-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-[#F5F5F5] liquid-glass hover:border-[#FF6B00]/40"
              >
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <span>Let's Connect</span>
              </a>
            </div>

            {/* 6. Social Icons */}
            <div className="hero-enter-socials flex items-center gap-3 pt-1">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={profile.socials.email}
                aria-label="Send Email"
                className="p-2.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={profile.socials.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X Profile"
                className="p-2.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] liquid-pill"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: HERO VISUAL */}
          <div className="hero-enter-shape lg:col-span-5 flex justify-center items-center relative">
            
            {/* Ambient glow reacting subtly */}
            <div
              aria-hidden="true"
              className="ambient-glow absolute -inset-6 sm:-inset-10 rounded-full blur-[90px] pointer-events-none transition-transform duration-300 ease-out"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,0,0.4) 0%, rgba(255,107,0,0) 70%)',
                transform: `translate(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px)`,
              }}
            />

            {/* Floating Water Droplets */}
            <div
              aria-hidden="true"
              className="liquid-droplet absolute -top-4 left-4 sm:-left-4 w-9 h-9 rounded-[55%_45%_60%_40%/45%_55%_45%_55%] water-droplet z-20 pointer-events-none"
            />

            <div
              aria-hidden="true"
              className="liquid-float absolute -bottom-6 right-2 sm:-right-2 w-12 h-11 rounded-[60%_40%_52%_48%/50%_60%_40%_50%] water-droplet z-20 pointer-events-none"
            />

            {/* Main Liquid Hero Container */}
            <div
              className="relative liquid-hero transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              }}
            >
              
              {/* Outer Organic Refraction Shell */}
              <div
                className="w-[290px] sm:w-[340px] md:w-[380px] h-[380px] sm:h-[440px] md:h-[480px] droplet-shape-hero liquid-glass p-3 relative overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)] border border-white/20"
                style={{
                  boxShadow:
                    'inset 2px 2px 3px rgba(255, 255, 255, 0.35), inset -2px -2px 6px rgba(255, 107, 0, 0.25), 0 30px 80px rgba(0, 0, 0, 0.9)',
                }}
              >
                {/* Inner Mask with Profile Photo */}
                <div className="relative w-full h-full droplet-shape-hero overflow-hidden bg-gradient-to-b from-[#0D1013] to-[#050607]">
                  
                  {/* Photo with cinematic dark grading */}
                  <img
                    src={profile.photoUrl}
                    alt="Raunak Kumar - Full-Stack Developer"
                    className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.92] select-none"
                  />

                  {/* Dark liquid-glass vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/90 via-[#050607]/20 to-transparent pointer-events-none" />

                  {/* Specular light streak responding to cursor */}
                  <div
                    aria-hidden="true"
                    className="liquid-reflection absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none transition-transform duration-300"
                    style={{
                      transform: `translate(${parallaxOffset.x * 1.2}px, ${parallaxOffset.y * 1.2}px)`,
                    }}
                  />

                  {/* Orange rim reflection light */}
                  <div
                    aria-hidden="true"
                    className="ambient-reflection absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#FF6B00]/20 blur-2xl pointer-events-none"
                  />
                </div>
              </div>

              {/* Floating Personal Tagline Badge: Better Tools. Bigger Dreams. */}
              <div
                className="liquid-float absolute -bottom-8 -left-4 sm:-left-8 z-30 liquid-glass px-4 py-3 rounded-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.7)] select-none pointer-events-none"
              >
                <div className="font-heading text-xs uppercase tracking-widest font-bold leading-tight text-[#F5F5F5] space-y-0.5">
                  <div>Better</div>
                  <div>Tools</div>
                  <div>Bigger</div>
                  <div className="text-[#FF6B00]">Dreams</div>
                </div>
                {/* Small orange line */}
                <div className="w-8 h-[2px] bg-[#FF6B00] rounded-full mt-2" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
