let lockCount = 0;

export function lockScroll(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
  }
}

export function forceUnlockScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = 0;
  document.body.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('overflow');
}
