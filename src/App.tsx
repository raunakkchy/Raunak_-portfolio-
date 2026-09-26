import React, { useState } from 'react';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSkills } from './components/AboutSkills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#071018] text-[#F5F7FA] font-sans selection:bg-[#FF6338]/30 selection:text-white">
      {/* Premium Atmospheric Deep Navy & Subtle Orange Background */}
      <AtmosphereBackground />

      {/* Floating Centered Glass Navbar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* 01 About Me & 02 My Skills */}
        <AboutSkills />

        {/* 03 Selected Work */}
        <Projects />

        {/* 04 Contact */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
