import React, { useState } from 'react';
import {
  ArrowRight,
  Mail,
  GraduationCap,
  Sparkles,
  Camera,
  UploadCloud,
  Check,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

// Custom icons for GitHub, LinkedIn, Instagram
const GithubIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34M7.86 18.5V10.13H5.07v8.37h2.79z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Hero: React.FC = () => {
  const { profile } = portfolioData;
  const [userCustomPhoto, setUserCustomPhoto] = useState<string | null>(
    profile.photoUrl || null
  );
  const [imageError, setImageError] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserCustomPhoto(event.target?.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
      id="home"
      aria-label="Introduction"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 md:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#FF6338] bg-[#FF6338]/10 border border-[#FF6338]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6338] animate-pulse" />
              <span>{profile.eyebrow}</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F7FA] leading-[1.08] mb-4 text-balance">
              <span>{profile.firstName}</span>{' '}
              <span className="text-[#FF6338]">{profile.lastName}</span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-[#9AA8B5] mb-5">
              <span>Full Stack Developer</span>
              <span className="text-[#FF6338] font-light">|</span>
              <span>CSE Student</span>
            </div>

            {/* Description */}
            <p className="font-body text-[#9AA8B5] text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {profile.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-[#FF6338] hover:bg-[#FF8A62] shadow-[0_10px_25px_rgba(255,99,56,0.3)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-[#F5F7FA] bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 hover:border-white/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <Mail className="w-4 h-4 text-[#FF6338]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase tracking-widest text-[#687785] mr-2 font-mono">
                Connect
              </span>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-[#FF6338]/40 transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-[#FF6338]/40 transition-all duration-200"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="p-2.5 rounded-xl text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-[#FF6338]/40 transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Profile Image Area & Floating Cards */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Atmospheric soft orange glow behind profile */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 md:-inset-8 rounded-full blur-[90px] opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,99,56,0.45) 0%, rgba(255,99,56,0) 70%)',
              }}
            />

            {/* Main Portrait Frame Container */}
            <div className="relative animate-float-slow" style={{ ['--rot' as string]: '1.5deg' }}>
              
              {/* Outer Frosted Glass Container (~390px × 475px) */}
              <div
                className="w-[300px] sm:w-[350px] md:w-[380px] h-[400px] sm:h-[450px] md:h-[475px] rounded-[28px] p-3 sm:p-4 glass-panel relative flex flex-col justify-between overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)] border border-white/[0.15]"
                style={{
                  transform: 'rotate(1.5deg)',
                }}
              >
                {/* Inner Canvas / Display Area */}
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#0F1E2E]/90 to-[#071018]/95 border border-white/[0.08] flex flex-col items-center justify-center p-6 text-center select-none group">
                  
                  {/* Subtle technical background grid */}
                  <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {userCustomPhoto && !imageError ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden group/photo">
                      <img
                        src={userCustomPhoto}
                        alt="Raunak Kumar - Full Stack Developer"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover object-center rounded-2xl filter contrast-[1.04] brightness-[0.98] transition-transform duration-500 group-hover/photo:scale-[1.03]"
                      />
                      
                      {/* Subtle Vignette & Bottom Depth Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/90 via-[#071018]/25 to-transparent pointer-events-none" />

                      {/* Floating Name & Role Glass Pill */}
                      <div className="absolute bottom-3 inset-x-3 z-10 glass-pill px-3 py-2 rounded-xl flex items-center justify-between text-left border-white/15 backdrop-blur-md">
                        <div>
                          <div className="font-heading text-xs font-bold text-white tracking-tight">
                            Raunak Kumar
                          </div>
                          <div className="text-[10px] font-mono text-[#FF8A62]">
                            Full Stack Developer
                          </div>
                        </div>

                        <label
                          title="Change photo"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-[#FF6338] text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    /* Clean Bespoke Placeholder (Strictly no fake person) */
                    <div className="flex flex-col items-center justify-center relative z-10 w-full">
                      {/* Monogram emblem */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-5 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/15 shadow-inner">
                        <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter text-white">
                          R<span className="text-[#FF6338]">K</span>
                        </span>
                        
                        {/* Corner markers */}
                        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#FF6338]/70" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#FF6338]/70" />
                      </div>

                      <div className="space-y-1">
                        <div className="font-heading text-lg sm:text-xl font-semibold text-[#F5F7FA]">
                          Raunak Kumar
                        </div>
                        <div className="text-xs font-mono text-[#9AA8B5] tracking-wide">
                          CSE Diploma · Developer
                        </div>
                      </div>

                      {/* Optional Photo Upload Prompt */}
                      <label className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9AA8B5] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 cursor-pointer transition-all">
                        <Camera className="w-3.5 h-3.5 text-[#FF6338]" />
                        <span>Add your photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  )}

                  {/* Corner Accent Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6338]/10 blur-2xl pointer-events-none" />
                </div>
              </div>

              {/* Floating Card 1: Education Card (Diploma in CSE / NSIP Bihta) */}
              <div
                className="absolute -top-4 -left-6 sm:-left-10 z-20 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_16px_35px_rgba(0,0,0,0.35)] animate-float-delay"
                style={{ ['--rot' as string]: '-3deg' }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF6338]/15 border border-[#FF6338]/30 text-[#FF6338]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight text-[#F5F7FA]">
                    {portfolioData.profile.degree}
                  </div>
                  <div className="text-[11px] font-mono text-[#9AA8B5]">
                    {portfolioData.profile.instituteShort}
                  </div>
                </div>
              </div>

              {/* Floating Card 2: CGPA Card (CGPA 8.5) */}
              <div
                className="absolute -bottom-5 -right-4 sm:-right-8 z-20 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3.5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] animate-float-slow"
                style={{ ['--rot' as string]: '2deg' }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#687785]">
                    CGPA
                  </span>
                  <span className="font-heading text-2xl font-bold tracking-tight text-[#F5F7FA]">
                    8.5
                  </span>
                </div>
                <div className="w-1.5 h-7 rounded-full bg-[#FF6338]" />
              </div>

              {/* Handwritten Decoration: "Better Code Bigger Dreams" */}
              <div
                className="absolute -bottom-10 left-2 sm:left-4 z-20 font-handwriting text-xl sm:text-2xl text-[#F5F7FA] select-none pointer-events-none"
                style={{
                  transform: 'rotate(-7deg)',
                }}
              >
                <div className="leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  <div>Better Code,</div>
                  <div className="text-[#FF6338] font-bold">Bigger Dreams ✨</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
