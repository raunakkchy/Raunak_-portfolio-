import { useEffect } from 'react';

/**
 * Enhanced Scroll Reveal Hook
 * Animates sections into view with opacity: 0 -> 1, translateY: 30px -> 0, blur: 4px -> 0.
 * Supports staggered children (.stagger-child). Triggers ONCE via IntersectionObserver.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Handle staggered children if present
            const children = entry.target.querySelectorAll('.stagger-child');
            children.forEach((child, index) => {
              (child as HTMLElement).style.animationDelay = `${index * 80 + 100}ms`;
              child.classList.add('active');
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
