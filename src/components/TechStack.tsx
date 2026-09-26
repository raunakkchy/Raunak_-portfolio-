import React from 'react';
import { portfolioData } from '../data/portfolio';

const TechIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    case 'react':
    case 'react.js':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'node.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3L12 4.3z" />
        </svg>
      );
    case 'express':
    case 'express.js':
      return (
        <span className="font-heading font-extrabold text-xs tracking-tighter">ex</span>
      );
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22s6.5-4 6.5-10c0-4.5-3.5-8-6.5-10-3 2-6.5 5.5-6.5 10 0 6 6.5 10 6.5 10zm0-18c2 1.5 4.5 4 4.5 8 0 4-4.5 7.5-4.5 7.5s-4.5-3.5-4.5-7.5c0-4 2.5-6.5 4.5-8z" />
        </svg>
      );
    case 'typescript':
      return (
        <span className="font-heading font-bold text-xs tracking-tighter">TS</span>
      );
    case 'tailwind css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case 'gemini':
    case 'gemini api':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
  }
};

export const TechStack: React.FC = () => {
  const topTech = [
    { name: 'React.js' },
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'Express.js' },
    { name: 'MongoDB' },
    { name: 'Python' },
    { name: 'Tailwind CSS' },
    { name: 'Gemini API' },
  ];

  return (
    <div className="reveal reveal-scale">
      {/* Orange accent line */}
      <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />

      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-6">
        Tech Stack
      </h2>

      {/* 4x2 Grid of Circular Pods */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {topTech.map((tech) => (
          <div
            key={tech.name}
            className="stagger-child group flex flex-col items-center justify-center p-1 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Circular Liquid-Glass Pod */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full liquid-glass flex items-center justify-center text-[#A5A5A5] group-hover:text-white group-hover:border-[#FF6B00]/40 group-hover:shadow-[0_0_18px_rgba(255,107,0,0.3)] transition-all duration-300 relative overflow-hidden"
              style={{
                boxShadow:
                  'inset 1px 1px 2px rgba(255, 255, 255, 0.25), inset -1px -1px 3px rgba(255, 107, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Specular Glint */}
              <div
                aria-hidden="true"
                className="project-reflection absolute top-1 left-2 w-3 h-1.5 rounded-full bg-white/30 blur-[1px] pointer-events-none"
              />

              <TechIcon name={tech.name} className="project-icon w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
            </div>

            {/* Label */}
            <span className="font-heading text-[10px] sm:text-xs font-medium text-[#A5A5A5] group-hover:text-[#F5F5F5] mt-1.5 transition-colors text-center">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
