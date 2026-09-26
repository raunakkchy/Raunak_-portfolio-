import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    const touchCheck = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, [role="button"], .project-card, .liquid-pill, .interactive-hover')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Outer Ring */}
      <div
        className={`fixed rounded-full border transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-12 h-12 border-[#FF6B00] bg-[#FF6B00]/15 shadow-[0_0_20px_rgba(255,107,0,0.3)] scale-110'
            : 'w-8 h-8 border-[#FF6B00]/40 bg-[#FF6B00]/05'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />

      {/* Tiny Orange Center Dot */}
      <div
        className={`fixed w-1.5 h-1.5 rounded-full bg-[#FF6B00] transition-all duration-75 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#FF6B00] ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
};
