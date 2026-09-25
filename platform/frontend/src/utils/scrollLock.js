/**
 * src/utils/scrollLock.js
 * Ref-counted body scroll lock so multiple components (mobile menu, modals)
 * can open/close without trampling each other's overflow state.
 */
let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
  }
}
