import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { HowIBuild } from '../components/HowIBuild';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Certifications } from '../components/Certifications';
import { TechnicalJourney } from '../components/TechnicalJourney';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { AnimatedSection } from '../components/AnimatedSection';
import { Preloader } from '../components/Preloader';
import { Scene3D } from '../components/Scene3D';
import { HireModal } from '../components/HireModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePerformanceMode } from '../hooks/usePerformanceMode';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Code-split modals
const ResumeModal = lazy(() =>
  import('../components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);
const CommandPalette = lazy(() =>
  import('../components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export const PublicPortfolio: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState<boolean>(false);
  const [hireService, setHireService] = useState<'web' | 'video' | 'general'>('general');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { isLiteMode, toggleLiteMode } = usePerformanceMode();

  // Initialize IntersectionObserver scroll reveals
  useScrollReveal();

  const handleOpenHire = (service: 'web' | 'video' | 'general' = 'general') => {
    setHireService(service);
    setIsHireModalOpen(true);
  };

  useEffect(() => {
    if (!isLoaded) return;

    // GSAP ScrollTrigger Animations for cinematic section transitions
    const ctx = gsap.context(() => {
      // Hero to Projects transition
      gsap.fromTo(
        '#projects',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Contact Form Scale Up
      gsap.fromTo(
        '#contact',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div className="anim-page-enter relative min-h-screen bg-[#070a0f] text-[#F5F5F5] font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      {/* 1. Cinematic Preloader Screen */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Interactive 3D WebGL Background Canvas */}
      {!isLiteMode && <Scene3D />}

      {/* 3. Premium Desktop Custom Cursor */}
      <CustomCursor />

      {/* 4. Floating Centered Liquid-Glass Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenHire={() => handleOpenHire('general')}
        isLiteMode={isLiteMode}
        onToggleLiteMode={toggleLiteMode}
      />

      {/* 5. Main Page Sections with Cinematic Section Transitions */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <AnimatedSection id="about" ariaLabel="About Raunak Kumar" animationType="slide-left">
          <About onOpenResume={() => setIsResumeModalOpen(true)} />
        </AnimatedSection>

        {/* How I Build (Developer Philosophy) */}
        <HowIBuild />

        {/* Technical Skills */}
        <Skills />

        {/* Featured Projects */}
        <Projects />

        {/* Experience & Achievements */}
        <Experience />

        {/* Education Timeline */}
        <Education />

        {/* Verified Certifications Gallery */}
        <Certifications />

        {/* Technical Growth Journey */}
        <TechnicalJourney />

        {/* Contact Section: 🚀 Have a Project in Mind? (Web Dev & Video Editing) */}
        <Contact onOpenHire={handleOpenHire} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Interactive Hire Me / Project Inquiry Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        defaultService={hireService}
      />

      {/* Lazy-loaded Print/PDF-ready Resume Modal */}
      {isResumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Lazy-loaded Command Palette (Ctrl + K) */}
      {isCmdOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            isOpen={isCmdOpen}
            onClose={() => setIsCmdOpen(false)}
            onOpenResume={() => setIsResumeModalOpen(true)}
            onOpenHire={handleOpenHire}
          />
        </Suspense>
      )}
    </div>
  );
};
