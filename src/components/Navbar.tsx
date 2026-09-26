import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Zap, Search } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCmd: () => void;
  isLiteMode?: boolean;
  onToggleLiteMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenCmd,
  isLiteMode = false,
  onToggleLiteMode,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'How I Build', href: '#how-i-build' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['home', 'projects', 'about', 'how-i-build', 'skills', 'experience', 'education', 'certifications', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`anim-nav pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between liquid-glass ${
          isScrolled
            ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-white/20 bg-[#0D1013]/90 backdrop-blur-md'
            : 'bg-[#080A0C]/75 border-white/10'
        }`}
      >
        {/* Left: R logo + Raunak Kumar */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2 group focus-visible:outline-none rounded-full"
        >
          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 group-hover:border-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all">
            <span className="font-heading text-xs font-bold tracking-tight text-[#FF6B00]">
              R
            </span>
          </div>
          <span className="font-heading text-xs sm:text-sm font-bold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors truncate">
            {portfolioData.profile.name}
          </span>
        </a>

        {/* Center: Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#FF6B00] bg-white/[0.08] border border-[#FF6B00]/40 shadow-[0_0_12px_rgba(255,107,0,0.15)] font-semibold'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6B00]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right: Cmd+K, Performance Toggle & Resume */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Cmd+K trigger */}
          <button
            type="button"
            onClick={onOpenCmd}
            title="Quick Navigation (Ctrl+K / Cmd+K)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#A5A5A5] bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Search className="w-3 h-3 text-[#FF6B00]" />
            <span className="hidden md:inline">Ctrl K</span>
          </button>

          {/* Performance toggle */}
          {onToggleLiteMode && (
            <button
              type="button"
              onClick={onToggleLiteMode}
              title={isLiteMode ? "Lite Performance Mode Active" : "Switch to Lite Performance Mode"}
              aria-label="Toggle Performance Mode"
              className={`p-1.5 rounded-full border transition-all ${
                isLiteMode
                  ? 'text-[#FF6B00] bg-[#FF6B00]/15 border-[#FF6B00]/40'
                  : 'text-[#A5A5A5] hover:text-[#F5F5F5] bg-white/[0.04] border-white/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Resume button */}
          <button
            type="button"
            onClick={onOpenResume}
            className="anim-primary-button group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium text-[#F5F5F5] bg-white/[0.06] hover:bg-[#FF6B00] border border-white/15 hover:border-[#FF6B00] hover:text-white transition-all duration-200 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6B00] group-hover:text-white transition-colors" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenCmd}
            aria-label="Search"
            className="p-1.5 rounded-full text-[#FF6B00] bg-white/[0.06] border border-white/10"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onOpenResume}
            aria-label="Resume"
            className="sm:hidden p-1.5 rounded-full text-[#FF6B00] bg-white/[0.06] border border-white/10"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-1.5 rounded-full text-[#F5F5F5] hover:text-white bg-white/[0.06] border border-white/15"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#FF6B00]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="anim-menu pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto liquid-glass p-5 rounded-3xl lg:hidden shadow-2xl border border-white/20">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-2 rounded-2xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-[#FF6B00] bg-white/[0.09] border border-[#FF6B00]/30 font-semibold'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />}
                </a>
              );
            })}

            <div className="pt-2 mt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="anim-primary-button w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
