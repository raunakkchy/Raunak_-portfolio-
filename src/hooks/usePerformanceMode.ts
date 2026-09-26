import { useState, useEffect } from 'react';

/**
 * Performance Mode Manager
 * Auto-detects low-spec hardware or saves user preference for '.performance-lite'.
 */
export function usePerformanceMode() {
  const [isLiteMode, setIsLiteMode] = useState<boolean>(() => {
    // Check localStorage
    const saved = localStorage.getItem('raunak_portfolio_perf_lite');
    if (saved !== null) return saved === 'true';

    // Auto-detect low memory or low hardware concurrency
    if (typeof navigator !== 'undefined') {
      const nav = navigator as Navigator & { deviceMemory?: number };
      if (nav.deviceMemory && nav.deviceMemory <= 4) return true;
      if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return true;
    }

    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLiteMode) {
      root.classList.add('performance-lite');
    } else {
      root.classList.remove('performance-lite');
    }
    localStorage.setItem('raunak_portfolio_perf_lite', String(isLiteMode));
  }, [isLiteMode]);

  const toggleLiteMode = () => setIsLiteMode((prev) => !prev);

  return { isLiteMode, toggleLiteMode };
}
