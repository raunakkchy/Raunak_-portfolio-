import { useState, useEffect, RefObject } from 'react';

interface ParallaxOffset {
  x: number;
  y: number;
}

/**
 * Custom Mouse Parallax Hook for Liquid Hero
 * Generates subtle (3–8px) offset based on mouse position relative to container.
 * Automatically disabled on touch devices and prefers-reduced-motion.
 */
export function useMouseParallax(containerRef: RefObject<HTMLElement | null>): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch / low-pointer capability or reduced motion
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized delta from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp to max 8px shift
      const maxShift = 8;
      const clampedX = Math.max(-1, Math.min(1, deltaX)) * maxShift;
      const clampedY = Math.max(-1, Math.min(1, deltaY)) * maxShift;

      setOffset({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    const container = containerRef.current || document.body;
    container.addEventListener('mousemove', handleMouseMove as EventListener);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove as EventListener);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef]);

  return offset;
}
