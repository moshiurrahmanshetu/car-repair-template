/**
 * ================================================================================
 * Template Name: AutoCare - Premium Car Repair & Auto Service HTML Template
 * Author: Premium Design Studio
 * Version: 1.0.0
 * Description: Main client-side scripts for premium features of AutoCare.
 * ================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Preloader Handling
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 400); // match transition duration
    });
  }

  // 2. Sticky Header Animation on Scroll
  const header = document.querySelector('.header-wrapper');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger on load in case of direct anchor/re-loads
    handleScroll();
  }

  // 3. Back-To-Top Button Controller
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Premium Search Overlay Popup
  const searchTriggers = document.querySelectorAll('.search-trigger');
  const searchPopup = document.querySelector('.search-popup');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');

  if (searchPopup && searchTriggers.length > 0 && searchClose) {
    searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        searchPopup.classList.add('active');
        // Wait for zoom animation to focus input
        setTimeout(() => {
          if (searchInput) searchInput.focus();
        }, 300);
      });
    });

    searchClose.addEventListener('click', () => {
      searchPopup.classList.remove('active');
    });

    // Close on clicking outside search form
    searchPopup.addEventListener('click', (e) => {
      if (e.target === searchPopup) {
        searchPopup.classList.remove('active');
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
        searchPopup.classList.remove('active');
      }
    });
  }

  // 5. Mobile Off-Canvas Sliding Drawer Menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close-btn');

  const openMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // 6. Mobile Dropdown Toggle Sliders
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.parentElement.parentElement; // gets the mobile-nav-item container
      const menu = parent.querySelector('.mobile-dropdown-menu');
      const icon = btn.querySelector('i');

      if (menu) {
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          icon.className = 'bi bi-chevron-down';
        } else {
          // Close other menus if open (optional accordion effect)
          const openMenus = document.querySelectorAll('.mobile-dropdown-menu.active');
          openMenus.forEach(m => {
            m.classList.remove('active');
            const otherBtn = m.parentElement.querySelector('.mobile-dropdown-btn i');
            if (otherBtn) otherBtn.className = 'bi bi-chevron-down';
          });

          menu.classList.add('active');
          icon.className = 'bi bi-chevron-up';
        }
      }
    });
  });

  // 7. Button Ripple Overlay
  const rippleButtons = document.querySelectorAll('.btn-ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 8. Premium Custom Vanilla JS Hero Slider Engine
  const sliderSection = document.getElementById('custom-hero-slider');
  const slides = document.querySelectorAll('.slider-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (sliderSection && slides.length > 0) {
    let currentSlide = 0;
    let progress = 0;
    let progressInterval = null;
    const progressTime = 6000; // 6 seconds per slide
    const stepTime = 30; // 30ms step updates
    const progressBar = document.querySelector('.slider-progress-bar');
    
    // Dynamic Dot Pagination Creation
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
      // Remove active states
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      
      // Calculate correct index boundary loop
      currentSlide = (index + slides.length) % slides.length;
      
      // Apply active states
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      
      // Restart progress tracking
      startProgressBar();
    }
    
    function startProgressBar() {
      if (!progressBar) return;
      clearInterval(progressInterval);
      progress = 0;
      progressBar.style.width = '0%';
      const step = (stepTime / progressTime) * 100;
      
      progressInterval = setInterval(() => {
        progress += step;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          goToSlide(currentSlide + 1);
        }
        progressBar.style.width = `${progress}%`;
      }, stepTime);
    }
    
    // Left/Right Arrow Navigation
    const nextBtn = document.querySelector('.arrow-next');
    const prevBtn = document.querySelector('.arrow-prev');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      });
    }
    
    // Pause on Hover
    sliderSection.addEventListener('mouseenter', () => {
      clearInterval(progressInterval);
    });
    sliderSection.addEventListener('mouseleave', () => {
      startProgressBar();
    });
    
    // Mobile Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped Left -> Next Slide
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped Right -> Previous Slide
        goToSlide(currentSlide - 1);
      }
    }
    
    // Initializer call
    startProgressBar();
  }

  // 9. Interactive Parallax & 3D Tilt on Mouse Move
  const imageWrappers = document.querySelectorAll('.image-composition-wrapper, .about-image-composition');
  imageWrappers.forEach(wrapper => {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = (y / (rect.height / 2)) * -12; // tilt angle max 12deg
      const tiltY = (x / (rect.width / 2)) * 12;
      
      wrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Layered depth translation
      const floatingCards = wrapper.querySelectorAll('.floating-card');
      floatingCards.forEach((card, index) => {
        const factor = (index + 1) * 6;
        const moveX = (x / (rect.width / 2)) * factor;
        const moveY = (y / (rect.height / 2)) * factor;
        card.style.transform = `translate3d(${moveX}px, ${moveY}px, 30px)`;
      });
    });
    
    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      const floatingCards = wrapper.querySelectorAll('.floating-card');
      floatingCards.forEach(card => {
        card.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  });

  // 10. Count-Up Animation with Intersection Observer
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseFloat(target.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const startTime = performance.now();
          
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out-quad function
            const easeProgress = progress * (2 - progress);
            
            const currentVal = easeProgress * targetVal;
            
            // Check if decimal places exist
            if (targetVal % 1 !== 0) {
              target.textContent = currentVal.toFixed(1);
            } else {
              target.textContent = Math.floor(currentVal);
            }
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              if (targetVal % 1 !== 0) {
                target.textContent = targetVal.toFixed(1);
              } else {
                target.textContent = targetVal;
              }
            }
          }
          
          requestAnimationFrame(updateCounter);
          observer.unobserve(target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 11. Before & After Slider Interactive System
  const sliders = document.querySelectorAll('.comparison-slider-container');
  sliders.forEach(slider => {
    const beforeImageWrapper = slider.querySelector('.comparison-image-before');
    const handle = slider.querySelector('.slider-handle');
    
    function updateDimensions() {
      const width = slider.getBoundingClientRect().width;
      slider.style.setProperty('--container-width', width + 'px');
    }
    
    // Initial update and add resize listener
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    let isDragging = false;
    
    function setPosition(clientX) {
      const rect = slider.getBoundingClientRect();
      let shift = clientX - rect.left;
      if (shift < 0) shift = 0;
      if (shift > rect.width) shift = rect.width;
      
      const percentage = (shift / rect.width) * 100;
      beforeImageWrapper.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }
    
    // Mouse interaction
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch interaction
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  // 12. Dynamic Scroll Animation System (AOS Library Hook)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
      mirror: false
    });
  }

  // 13. Testimonials Premium Slider System
  const track = document.getElementById('testimonials-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const indicatorsContainer = document.getElementById('slider-indicators');
  
  if (track && testimonialSlides.length > 0) {
    let currentIndex = 0;
    let autoplayTimer = null;
    let visibleSlides = 3;
    let touchStartX = 0;
    let touchEndX = 0;

    function getVisibleSlidesCount() {
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 992) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, testimonialSlides.length - visibleSlides);
    }

    function createIndicators() {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      const totalIndicators = maxIndex() + 1;
      
      for (let i = 0; i < totalIndicators; i++) {
        const btn = document.createElement('button');
        btn.classList.add('slider-indicator');
        if (i === currentIndex) btn.classList.add('active');
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        btn.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        indicatorsContainer.appendChild(btn);
      }
    }

    function updateSlider() {
      visibleSlides = getVisibleSlidesCount();
      // Ensure index is within bounds
      if (currentIndex > maxIndex()) {
        currentIndex = maxIndex();
      }
      
      const percentShift = currentIndex * (100 / visibleSlides);
      track.style.transform = `translateX(-${percentShift}%)`;
      
      // Update indicators
      if (indicatorsContainer) {
        const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');
        indicators.forEach((ind, idx) => {
          if (idx === currentIndex) {
            ind.classList.add('active');
          } else {
            ind.classList.remove('active');
          }
        });
      }
      
      // Disable arrows at boundary states
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      if (nextBtn) nextBtn.style.opacity = currentIndex === maxIndex() ? '0.5' : '1';
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      updateSlider();
    }

    function nextSlide() {
      if (currentIndex < maxIndex()) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0); // Loop back
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(maxIndex()); // Loop to end
      }
    }

    // Set up controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Swipe Support
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
        resetAutoplay();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
        resetAutoplay();
      }
    }

    // Autoplay Engine
    function startAutoplay() {
      if (autoplayTimer) return;
      autoplayTimer = setInterval(nextSlide, 5000);
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

    // Pause on Hover
    const sliderContainer = document.querySelector('.testimonials-slider-container');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoplay);
      sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const rect = track.getBoundingClientRect();
      const inViewport = (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
      if (inViewport) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
        }
      }
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      const oldVisible = visibleSlides;
      visibleSlides = getVisibleSlidesCount();
      if (oldVisible !== visibleSlides) {
        createIndicators();
        updateSlider();
      }
    });

    // Initialize
    visibleSlides = getVisibleSlidesCount();
    createIndicators();
    updateSlider();
    startAutoplay();
  }

  // 14. Newsletter Verification and Success Animation
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterWrapper = document.getElementById('newsletter-form-wrapper');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailValue = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(emailValue)) {
        newsletterForm.classList.add('was-validated');
        newsletterEmail.classList.add('is-invalid');
      } else {
        newsletterEmail.classList.remove('is-invalid');
        newsletterForm.classList.remove('was-validated');
        
        // Hide form with transition, show success animation
        if (newsletterWrapper && newsletterSuccess) {
          newsletterWrapper.style.opacity = '0';
          setTimeout(() => {
            newsletterWrapper.classList.add('d-none');
            newsletterSuccess.classList.remove('d-none');
            // Trigger layout reflow then add fade class
            void newsletterSuccess.offsetWidth;
            newsletterSuccess.style.opacity = '1';
            newsletterSuccess.classList.add('animate-fade-in');
          }, 400);
        }
      }
    });
    
    if (newsletterEmail) {
      newsletterEmail.addEventListener('input', () => {
        if (newsletterEmail.classList.contains('is-invalid')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(newsletterEmail.value.trim())) {
            newsletterEmail.classList.remove('is-invalid');
          }
        }
      });
    }
  }

  // Footer Newsletter Mini Form Handler
  const footerNewsletterForm = document.getElementById('footer-newsletter-form');
  const footerEmailInput = document.getElementById('footer-email-input');
  const footerNewsletterSuccess = document.getElementById('footer-newsletter-success');

  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailValue = footerEmailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(emailValue)) {
        footerNewsletterForm.classList.add('d-none');
        if (footerNewsletterSuccess) {
          footerNewsletterSuccess.classList.remove('d-none');
        }
      }
    });
  }

  // 15. Refined Back To Top scroll progress circle
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const progressCircle = document.querySelector('.progress-active');
  const circleRadius = 20;
  const circumference = 2 * Math.PI * circleRadius; // ~125.66

  if (backToTopBtn && progressCircle) {
    // Set stroke dash arrays
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    function updateProgress() {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Toggle button visibility
      if (scrollPosition > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      // Update circular indicator progress
      if (totalHeight > 0) {
        const scrollPercentage = Math.min(scrollPosition / totalHeight, 1);
        const dashOffset = circumference - (scrollPercentage * circumference);
        progressCircle.style.strokeDashoffset = dashOffset;
      }
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Run once in case already scrolled

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
