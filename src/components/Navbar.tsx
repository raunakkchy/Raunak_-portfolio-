import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-4xl transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between glass-panel ${
          isScrolled
            ? 'shadow-[0_16px_40px_rgba(0,0,0,0.5)] border-white/20 bg-white/[0.08]'
            : 'bg-white/[0.05] border-white/[0.12]'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6338] rounded-full"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF6338]/15 border border-[#FF6338]/30 group-hover:border-[#FF6338] transition-colors">
            <span className="font-heading text-xs font-bold tracking-tight text-[#FF6338]">
              RK
            </span>
          </div>
          <span className="font-heading text-sm md:text-base font-semibold tracking-tight text-[#F5F7FA] group-hover:text-white transition-colors">
            {portfolioData.profile.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#F5F7FA] bg-white/[0.12] border border-white/20'
                      : 'text-[#9AA8B5] hover:text-[#F5F7FA] hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6338]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button: Download Resume */}
        <div className="hidden sm:flex items-center">
          <button
            type="button"
            onClick={onOpenResume}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-[#F5F7FA] bg-white/[0.08] hover:bg-[#FF6338] border border-white/15 hover:border-[#FF6338] transition-all duration-200 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6338] group-hover:text-white transition-colors" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            aria-label="Download Resume"
            className="sm:hidden p-2 rounded-full text-xs font-medium text-[#FF6338] bg-white/[0.08] border border-white/15 hover:bg-white/[0.12]"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 rounded-full text-[#F5F7FA] hover:text-white bg-white/[0.06] border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6338]"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#FF6338]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Glass Panel */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 inset-x-4 max-w-sm mx-auto glass-panel p-5 rounded-2xl md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#F5F7FA] bg-white/[0.12] border border-white/20'
                      : 'text-[#9AA8B5] hover:text-[#F5F7FA] hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#FF6338]" />}
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#FF6338] hover:bg-[#FF8A62] transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
