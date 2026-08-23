/**
 * js/carousel.js
 * Professional Portfolio Carousel with Autoplay, Drag-to-Swipe, and Responsive calculations.
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
  const autoplayInterval = 5000; // 5 seconds
  
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
    dotsContainer.appendChild(dot);
    
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
  });
  
  const dots = Array.from(dotsContainer.children);
  
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
    // Padding on sides is handled in CSS, so trackWidth - containerWidth is the limit
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
    
    // Calculate slide offset relative to track container
    const slide = slides[currentIndex];
    const parentPadding = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    
    // Slide's position from track beginning
    let targetX = slide.offsetLeft - parentPadding;
    
    // Limit translation so track does not scroll past content
    const limit = getLimit();
    if (targetX > limit) {
      targetX = limit;
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
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });
  
  // Autoplay Logic
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
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
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // Mouse / Touch Dragging Events
  slides.forEach((slide) => {
    const slideImage = slide.querySelector('.portfolio-slide-img');
    if (slideImage) {
      slideImage.addEventListener('dragstart', (e) => e.preventDefault());
    }
  });
  
  // Touch Events
  track.addEventListener('touchstart', touchStart, { passive: true });
  track.addEventListener('touchend', touchEnd);
  track.addEventListener('touchmove', touchMove, { passive: true });
  
  // Mouse Events
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
    
    // Bounce elastic limit
    const limit = -getLimit();
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3; // Elastic bounce at start
    } else if (currentTranslate < limit) {
      currentTranslate = limit + (currentTranslate - limit) * 0.3; // Elastic bounce at end
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
    
    // Snap threshold: if moved more than 50px, change slide
    if (movedBy < -50 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }
    
    goToSlide(currentIndex);
    startAutoplay();
  }
  
  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -50 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }
    
    goToSlide(currentIndex);
    startAutoplay();
  }
  
  function animation() {
    setTrackPosition();
    if (isDragging) requestAnimationFrame(animation);
  }
  
  // Pause on hover
  track.parentElement.addEventListener('mouseenter', stopAutoplay);
  track.parentElement.addEventListener('mouseleave', startAutoplay);
  
  // Resize handler
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    goToSlide(currentIndex);
    track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  // Initial slide setup and autoplay
  goToSlide(0);
  startAutoplay();
});
