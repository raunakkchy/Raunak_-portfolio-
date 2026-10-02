import React, { useRef, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  animationType?: 'fade-up' | 'scale' | 'slide-left' | 'slide-right';
  children: React.ReactNode;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  ariaLabel,
  className = '',
  animationType = 'fade-up',
  children,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAnimClasses = () => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 scale-100 transition-all duration-700 ease-out';
    }

    switch (animationType) {
      case 'scale':
        return 'opacity-0 scale-95 translate-y-6';
      case 'slide-left':
        return 'opacity-0 -translate-x-10';
      case 'slide-right':
        return 'opacity-0 translate-x-10';
      case 'fade-up':
      default:
        return 'opacity-0 translate-y-10';
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={ariaLabel}
      className={`relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10 ${getAnimClasses()} ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};
