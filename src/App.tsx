import React, { useState, lazy, Suspense } from 'react';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowIBuild } from './components/HowIBuild';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { TechnicalJourney } from './components/TechnicalJourney';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import { usePerformanceMode } from './hooks/usePerformanceMode';

// Code-split modals so they only load when requested or opened
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const { isLiteMode, toggleLiteMode } = usePerformanceMode();

  // Initialize IntersectionObserver scroll reveals
  useScrollReveal();

  return (
    <div className="anim-page-enter relative min-h-screen bg-[#050607] text-[#F5F5F5] font-sans selection:bg-[#FF6B00]/30 selection:text-white overflow-x-hidden">
      {/* Premium Desktop Custom Cursor */}
      <CustomCursor />

      {/* Dark Futuristic Liquid-Glass Atmosphere Canvas */}
      <AtmosphereBackground />

      {/* Floating Centered Liquid-Glass Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenCmd={() => setIsCmdOpen(true)}
        isLiteMode={isLiteMode}
        onToggleLiteMode={toggleLiteMode}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <section id="about" aria-label="About Raunak Kumar" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10">
          <div className="w-full max-w-6xl mx-auto">
            <About onOpenResume={() => setIsResumeModalOpen(true)} />
          </div>
        </section>

        {/* 3. How I Build (Developer Philosophy) */}
        <HowIBuild />

        {/* 4. Technical Skills */}
        <Skills />

        {/* 5. Featured Projects */}
        <Projects />

        {/* 6. Experience & Achievements */}
        <Experience />

        {/* 7. Education Timeline */}
        <Education />

        {/* 8. Verified Certifications Gallery */}
        <Certifications />

        {/* 9. Technical Growth Journey */}
        <TechnicalJourney />

        {/* 10. Contact Section */}
        <Contact />
      </main>

      {/* 11. Minimal Footer */}
      <Footer />

      {/* 12. Lazy-loaded Print/PDF-ready Resume Modal */}
      {isResumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      )}

      {/* 13. Lazy-loaded Command Palette (Ctrl + K) */}
      {isCmdOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            isOpen={isCmdOpen}
            onClose={() => setIsCmdOpen(false)}
            onOpenResume={() => setIsResumeModalOpen(true)}
          />
        </Suspense>
      )}
    </div>
  );
}
