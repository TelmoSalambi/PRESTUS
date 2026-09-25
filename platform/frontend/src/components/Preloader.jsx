import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setHidden(true);
      setRemoved(true);
      return;
    }

    const fadeTimer = setTimeout(() => {
      setHidden(true);
    }, 650);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 1250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`preloader ${hidden ? 'hidden' : ''}`}
      aria-hidden={hidden}
      role="status"
      aria-label="Carregando PRESTUS..."
    >
      <div className="preloader-inner">
        <img
          src="/Logo.png"
          alt="PRESTUS"
          className="preloader-logo"
          width="160"
          height="54"
        />
        <div className="preloader-bar">
          <span className="preloader-bar-fill"></span>
        </div>
      </div>
    </div>
  );
}
