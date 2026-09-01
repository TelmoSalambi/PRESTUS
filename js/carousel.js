/**
 * js/carousel.js
 * Continuous Professional Portfolio Carousel with Endless Autoplay, Drag-to-Swipe, and Fail-Safe Resume.
 */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('portfolio-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  
  if (!track) return;
  
  const slides = Array.from(track.children);
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let autoplayTimer = null;
  let resumeTimer = null;
  const autoplayInterval = 3200; // 3.2 seconds continuous advance
  
  // Drag / Swipe State Variables
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  
  // Create Dots Indicators
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    if (dotsContainer) dotsContainer.appendChild(dot);
    
    dot.addEventListener('click', () => {
      goToSlide(index);
      triggerResumeAutoplay();
    });
  });
  
  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
  
  // Update buttons and dots status
  function updateControls() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }
  
  // Get max width limit of track translation
  function getLimit() {
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.clientWidth;
    return Math.max(0, trackWidth - containerWidth);
  }
  
  // Translate track to a specific slide position
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    const slide = slides[currentIndex];
    const parentPadding = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    
    let targetX = slide.offsetLeft - parentPadding;
    const limit = getLimit();
    
    if (targetX > limit && currentIndex === slides.length - 1) {
      targetX = limit;
    } else if (targetX > limit) {
      currentIndex = 0;
      targetX = 0;
    }
    
    currentTranslate = -targetX;
    prevTranslate = currentTranslate;
    setTrackPosition();
    updateControls();
  }
  
  function setTrackPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  // Next / Prev actions
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      triggerResumeAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      triggerResumeAutoplay();
    });
  }
  
  // Autoplay Logic — Never Permanently Stopped
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoplayInterval);
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  // Immediate restart timer after any touch or manual action
  function triggerResumeAutoplay(delay = 1800) {
    stopAutoplay();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      startAutoplay();
    }, delay);
  }
  
  // Dragging / Touch Handlers
  slides.forEach((slide) => {
    const slideImage = slide.querySelector('.portfolio-slide-img, .slide-img');
    if (slideImage) {
      slideImage.addEventListener('dragstart', (e) => e.preventDefault());
    }
  });
  
  track.addEventListener('touchstart', touchStart, { passive: true });
  track.addEventListener('touchend', touchEnd);
  track.addEventListener('touchmove', touchMove, { passive: true });
  
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('mousemove', dragMove);
  
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }
  
  function dragStart(event) {
    isDragging = true;
    startX = getPositionX(event);
    stopAutoplay();
    track.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
  }
  
  function touchStart(event) {
    isDragging = true;
    startX = getPositionX(event);
    stopAutoplay();
    track.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
  }
  
  function dragMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    
    const limit = -getLimit();
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3;
    } else if (currentTranslate < limit) {
      currentTranslate = limit + (currentTranslate - limit) * 0.3;
    }
  }
  
  function touchMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    
    const limit = -getLimit();
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3;
    } else if (currentTranslate < limit) {
      currentTranslate = limit + (currentTranslate - limit) * 0.3;
    }
  }
  
  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -50) {
      goToSlide(currentIndex + 1);
    } else if (movedBy > 50) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    
    triggerResumeAutoplay();
  }
  
  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -50) {
      goToSlide(currentIndex + 1);
    } else if (movedBy > 50) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    
    triggerResumeAutoplay();
  }
  
  function animation() {
    setTrackPosition();
    if (isDragging) requestAnimationFrame(animation);
  }
  
  // Brief pause on mouse enter, but auto-resumes after 2s even if cursor stays over it
  if (track.parentElement) {
    track.parentElement.addEventListener('mouseenter', () => {
      triggerResumeAutoplay(2000);
    });
    
    track.parentElement.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  }
  
  // Watchdog: Ensure autoplay never dies permanently
  setInterval(() => {
    if (!autoplayTimer && !isDragging) {
      startAutoplay();
    }
  }, 4000);

  // Handle visibility change (tab switch / resume focus)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Resize handler
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    goToSlide(currentIndex);
    track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  // Initial slide setup and autoplay start
  goToSlide(0);
  startAutoplay();
});
