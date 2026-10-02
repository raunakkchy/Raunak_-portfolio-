import { useEffect } from 'react';
import { lockScroll, unlockScroll, forceUnlockScroll } from '../utils/scrollLock';

export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    lockScroll();

    const handleRouteChange = () => {
      forceUnlockScroll();
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      unlockScroll();
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [isLocked]);
}
