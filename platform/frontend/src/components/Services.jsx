import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../data/services.js';

export default function Services({ onOpenService }) {
  const { t } = useTranslation();
  const serviceItems = t('services.items', { returnObjects: true }) || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const prevTranslateRef = useRef(0);
  const autoplayTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const autoplayInterval = 3200;

  const getLimit = useCallback(() => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const containerWidth = trackRef.current.parentElement.clientWidth;
    return Math.max(0, trackWidth - containerWidth);
  }, []);

  const setTrackPosition = useCallback((translate) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translate}px)`;
    }
  }, []);

  const goToSlide = useCallback(
    (index) => {
      if (!trackRef.current) return;
      const slides = Array.from(trackRef.current.children);
      if (!slides.length) return;

      let nextIndex = index;
      if (index < 0) {
        nextIndex = slides.length - 1;
      } else if (index >= slides.length) {
        nextIndex = 0;
      }

      setCurrentIndex(nextIndex);

      const slide = slides[nextIndex];
      const parentPadding = parseFloat(window.getComputedStyle(trackRef.current).paddingLeft) || 0;
      let targetX = slide.offsetLeft - parentPadding;
      const limit = getLimit();

      if (targetX > limit && nextIndex === slides.length - 1) {
        targetX = limit;
      } else if (targetX > limit) {
        targetX = 0;
        nextIndex = 0;
        setCurrentIndex(0);
      }

      currentTranslateRef.current = -targetX;
      prevTranslateRef.current = -targetX;
      setTrackPosition(-targetX);
    },
    [getLimit, setTrackPosition],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoplayInterval);
  }, [currentIndex, goToSlide, stopAutoplay]);

  const triggerResumeAutoplay = useCallback(() => {
    stopAutoplay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      startAutoplay();
    }, 4500);
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startAutoplay, stopAutoplay]);

  // Handle touch / drag start
  const handleDragStart = (clientX) => {
    stopAutoplay();
    isDraggingRef.current = true;
    startXRef.current = clientX;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const diff = clientX - startXRef.current;
    currentTranslateRef.current = prevTranslateRef.current + diff;
    setTrackPosition(currentTranslateRef.current);
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    const moved = currentTranslateRef.current - prevTranslateRef.current;
    if (moved < -50) {
      goToSlide(currentIndex + 1);
    } else if (moved > 50) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    triggerResumeAutoplay();
  };

  return (
    <section id="servicos" className="portfolio-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">{t('services.label')}</span>
          <h2>
            {t('services.titleA')}
            <em>{t('services.titleEm')}</em>
          </h2>
          <p>{t('services.subtitle')}</p>
        </div>
      </div>

      {/* Full-width Carousel */}
      <div
        className="portfolio-carousel-wrapper"
        role="region"
        aria-label={t('services.regionLabel')}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div
          className="portfolio-track"
          ref={trackRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {SERVICES.map((service) => {
            const data = serviceItems[service.id] || {};
            return (
              <div
                className="portfolio-slide"
                data-service={service.id}
                key={service.id}
                onClick={() => onOpenService(service.id)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className={`slide-img ${service.imgClass}`}
                  role="img"
                  aria-label={data.imgAlt || data.title}
                />
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm btn-service-select"
                  aria-label={`${data.cta || 'Solicitar Proposta'}: ${data.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenService(service.id);
                  }}
                >
                  {data.cta || 'Solicitar Proposta'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="portfolio-controls">
          <button
            type="button"
            className="carousel-btn carousel-prev"
            aria-label={t('services.prev')}
            onClick={() => {
              goToSlide(currentIndex - 1);
              triggerResumeAutoplay();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="carousel-dots" role="tablist" aria-label="Indicadores do carrossel">
            {SERVICES.map((s, idx) => (
              <button
                type="button"
                key={s.id}
                className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                role="tab"
                aria-label={`${t('services.goTo')} ${idx + 1}`}
                aria-selected={idx === currentIndex}
                onClick={() => {
                  goToSlide(idx);
                  triggerResumeAutoplay();
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-btn carousel-next"
            aria-label={t('services.next')}
            onClick={() => {
              goToSlide(currentIndex + 1);
              triggerResumeAutoplay();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
