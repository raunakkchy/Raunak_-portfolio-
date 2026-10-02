import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = Math.max(prev, Math.round(progress));
        if (target >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsHidden(true);
              if (onComplete) onComplete();
            }, 800);
          }, 400);
          return 100;
        }
        return Math.min(100, prev + 2);
      });
    }, 25);

    return () => clearInterval(timer);
  }, [progress, onComplete]);

  if (isHidden) return null;

  return (
    <div
      aria-label="Loading Experience"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a0f] text-white transition-opacity duration-800 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Volumetric Glows */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none translate-x-32 translate-y-32" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Animated Badge Icon */}
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Title */}
        <h1 className="font-heading text-lg sm:text-xl font-bold tracking-[0.2em] uppercase text-white mb-2">
          Crafting Digital Dimensions
        </h1>
        <p className="font-mono text-xs text-cyan-400/80 mb-8 tracking-widest uppercase">
          3D WebGL Portfolio Experience
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full h-2 p-0.5 mb-4 shadow-inner relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400 transition-all duration-150 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-between w-full font-mono text-xs">
          <span className="text-slate-400 uppercase tracking-wider">Loading Assets...</span>
          <span className="text-cyan-400 font-bold">{displayProgress}%</span>
        </div>
      </div>
    </div>
  );
};
