/**
 * ============================================================================
 * PORTFOLIO CLIENT ARCHITECTURE: AHMED SABRY HAMED ELESNAWY
 * Full-Stack Web Developer | MEAN Stack Specialist
 * Pure Vanilla JavaScript (ES6+) - High Performance & Modular
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // DOM Elements Cache
  // --------------------------------------------------------------------------
  const DOM = {
    html: document.documentElement,
    body: document.body,
    header: document.getElementById('header'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    hamburgerBtn: document.getElementById('hamburger-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    scrollProgress: document.getElementById('scroll-progress'),
    scrollTopBtn: document.getElementById('scroll-top-btn'),
    customCursor: document.getElementById('custom-cursor'),
    customCursorFollower: document.getElementById('custom-cursor-follower'),
    bgCanvas: document.getElementById('bg-canvas'),
    typingText: document.getElementById('typing-text'),
    gpaCircle: document.getElementById('gpa-progress-circle'),
    gpaCounter: document.getElementById('gpa-counter'),
    sliderTrack: document.getElementById('slider-track'),
    sliderSlides: document.querySelectorAll('.testimonial-slide'),
    sliderPrev: document.getElementById('slider-prev'),
    sliderNext: document.getElementById('slider-next'),
    sliderDots: document.querySelectorAll('.dot-btn'),
    sliderContainer: document.getElementById('testimonials-slider-container'),
    viewAllProjectsBtn: document.getElementById('view-all-projects-btn'),
    projectsModal: document.getElementById('projects-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    contactForm: document.getElementById('contact-form'),
    formFeedback: document.getElementById('form-feedback'),
    submitBtn: document.getElementById('submit-btn'),
    currentYear: document.getElementById('current-year'),
    revealElements: document.querySelectorAll('[data-reveal]'),
    tiltCards: document.querySelectorAll('.tilt-card'),
    interactiveElements: document.querySelectorAll('a, button, input, textarea, .tilt-card, .btn')
  };

  // State Management
  const state = {
    currentTheme: 'light',
    typingIndex: 0,
    charIndex: 0,
    isDeleting: false,
    sliderIndex: 0,
    sliderTimer: null,
    gpaAnimated: false,
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    follower: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  // Typing effect phrases
  const typingPhrases = [
    'Full-Stack Developer',
    'MEAN Stack Developer',
    'Problem Solver',
    'Web Developer'
  ];

  // --------------------------------------------------------------------------
  // 1. THEME MANAGER (LIGHT / DARK)
  // --------------------------------------------------------------------------
  const ThemeManager = {
    init() {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        state.currentTheme = savedTheme;
      } else {
        // Default to Light Mode as explicitly requested
        state.currentTheme = 'light';
      }
      this.applyTheme(state.currentTheme);

      if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', () => this.toggleTheme());
      }
    },

    applyTheme(theme) {
      state.currentTheme = theme;
      DOM.html.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);

      // Notify particle canvas of theme color changes
      if (window.ParticleSystemInstance) {
        window.ParticleSystemInstance.updateThemeColors(theme);
      }
    },

    toggleTheme() {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
    }
  };

  // --------------------------------------------------------------------------
  // 2. HERO TYPING EFFECT
  // --------------------------------------------------------------------------
  const TypingEffect = {
    init() {
      if (!DOM.typingText || state.prefersReducedMotion) return;
      this.tick();
    },

    tick() {
      const currentWord = typingPhrases[state.typingIndex];
      let typingSpeed = 120;

      if (state.isDeleting) {
        state.charIndex--;
        typingSpeed = 60;
      } else {
        state.charIndex++;
      }

      DOM.typingText.textContent = currentWord.substring(0, state.charIndex);

      if (!state.isDeleting && state.charIndex === currentWord.length) {
        // Pause at end of word
        typingSpeed = 2000;
        state.isDeleting = true;
      } else if (state.isDeleting && state.charIndex === 0) {
        state.isDeleting = false;
        state.typingIndex = (state.typingIndex + 1) % typingPhrases.length;
        typingSpeed = 400;
      }

      setTimeout(() => this.tick(), typingSpeed);
    }
  };

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE CANVAS PARTICLE SYSTEM
  // --------------------------------------------------------------------------
  class ParticleSystem {
    constructor(canvas) {
      if (!canvas) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.particleCount = window.innerWidth < 768 ? 32 : 65;
      this.maxConnectDistance = 120;
      this.mouseRadius = 140;
      this.mouse = { x: -9999, y: -9999 };

      this.colors = {
        particle: 'rgba(97, 157, 198, 0.45)',
        line: 'rgba(97, 157, 198, 0.12)'
      };

      this.init();
    }

    init() {
      this.resize();
      this.updateThemeColors(state.currentTheme);
      this.createParticles();
      this.bindEvents();
      if (!state.prefersReducedMotion) {
        this.animate();
      }
    }

    updateThemeColors(theme) {
      if (theme === 'dark') {
        this.colors.particle = 'rgba(95, 149, 152, 0.55)';
        this.colors.line = 'rgba(95, 149, 152, 0.14)';
      } else {
        this.colors.particle = 'rgba(97, 157, 198, 0.45)';
        this.colors.line = 'rgba(97, 157, 198, 0.12)';
      }
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1.2
        });
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        this.createParticles();
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      window.addEventListener('mouseout', () => {
        this.mouse.x = -9999;
        this.mouse.y = -9999;
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update & Draw Particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouseRadius) {
          const force = (this.mouseRadius - dist) / this.mouseRadius;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }

        // Draw node
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors.particle;
        this.ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < this.maxConnectDistance) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = this.colors.line;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // --------------------------------------------------------------------------
  // 4. NAVIGATION, SCROLL PROGRESS & ACTIVE LINK OBSERVER
  // --------------------------------------------------------------------------
  const NavigationManager = {
    init() {
      this.bindScrollEvents();
      this.bindMobileMenu();
      this.observeActiveSection();
    },

    bindScrollEvents() {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = DOM.html.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        // Update progress bar
        if (DOM.scrollProgress) {
          DOM.scrollProgress.style.width = `${progress}%`;
        }

        // Sticky header background
        if (DOM.header) {
          if (scrollY > 50) {
            DOM.header.classList.add('scrolled');
          } else {
            DOM.header.classList.remove('scrolled');
          }
        }

        // Scroll to top button visibility
        if (DOM.scrollTopBtn) {
          if (scrollY > 400) {
            DOM.scrollTopBtn.classList.add('visible');
          } else {
            DOM.scrollTopBtn.classList.remove('visible');
          }
        }
      }, { passive: true });

      // Scroll to top click
      if (DOM.scrollTopBtn) {
        DOM.scrollTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    },

    bindMobileMenu() {
      if (!DOM.hamburgerBtn || !DOM.navMenu) return;

      DOM.hamburgerBtn.addEventListener('click', () => {
        const isOpen = DOM.navMenu.classList.toggle('open');
        DOM.hamburgerBtn.classList.toggle('active', isOpen);
        DOM.hamburgerBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close menu when clicking nav links
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          DOM.navMenu.classList.remove('open');
          DOM.hamburgerBtn.classList.remove('active');
          DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!DOM.navMenu.contains(e.target) && !DOM.hamburgerBtn.contains(e.target)) {
          DOM.navMenu.classList.remove('open');
          DOM.hamburgerBtn.classList.remove('active');
          DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    },

    observeActiveSection() {
      const sections = document.querySelectorAll('section[id]');
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            DOM.navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(section => observer.observe(section));
    }
  };

  // --------------------------------------------------------------------------
  // 5. SCROLL REVEAL & GPA VISUALIZATION
  // --------------------------------------------------------------------------
  const RevealManager = {
    init() {
      if (!('IntersectionObserver' in window) || state.prefersReducedMotion) {
        DOM.revealElements.forEach(el => el.classList.add('revealed'));
        this.animateGPA();
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);

            // Trigger GPA animation if entering education
            if (entry.target.closest('#education') && !state.gpaAnimated) {
              this.animateGPA();
            }

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      DOM.revealElements.forEach(el => observer.observe(el));
    },

    animateGPA() {
      state.gpaAnimated = true;
      if (!DOM.gpaCircle) return;

      const perimeter = 502.65; // 2 * PI * 80
      const targetGPA = 3.00;
      const maxGPA = 4.00;
      const targetOffset = perimeter - (targetGPA / maxGPA) * perimeter;

      DOM.gpaCircle.style.strokeDashoffset = targetOffset;

      // Animate numerical counter from 0.00 to 3.00
      if (DOM.gpaCounter) {
        let startVal = 0.0;
        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentNumber = (startVal + easeProgress * (targetGPA - startVal)).toFixed(2);
          DOM.gpaCounter.textContent = currentNumber;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            DOM.gpaCounter.textContent = '3.00';
          }
        };

        requestAnimationFrame(updateCounter);
      }
    }
  };

  // --------------------------------------------------------------------------
  // 6. 3D CARD TILT & MAGNETIC BUTTON EFFECTS
  // --------------------------------------------------------------------------
  const TiltAndMagnetic = {
    init() {
      if (state.prefersReducedMotion || window.innerWidth < 768) return;

      this.initTilt();
      this.initMagnetic();
    },

    initTilt() {
      DOM.tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -7;
          const rotateY = ((x - centerX) / centerX) * 7;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
      });
    },

    initMagnetic() {
      const magneticButtons = document.querySelectorAll('.magnetic-btn');
      magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0px, 0px)';
        });
      });
    }
  };

  // --------------------------------------------------------------------------
  // 7. CUSTOM CURSOR & SMOOTH FOLLOWER
  // --------------------------------------------------------------------------
  const CursorManager = {
    init() {
      if (!DOM.customCursor || !DOM.customCursorFollower || state.prefersReducedMotion) return;
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

      window.addEventListener('mousemove', (e) => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;

        DOM.customCursor.style.left = `${state.mouse.x}px`;
        DOM.customCursor.style.top = `${state.mouse.y}px`;
      });

      // Hover interactions
      DOM.interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => DOM.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => DOM.body.classList.remove('cursor-hover'));
      });

      this.animateFollower();
    },

    animateFollower() {
      // Smooth lerp (linear interpolation)
      state.follower.x += (state.mouse.x - state.follower.x) * 0.18;
      state.follower.y += (state.mouse.y - state.follower.y) * 0.18;

      DOM.customCursorFollower.style.left = `${state.follower.x}px`;
      DOM.customCursorFollower.style.top = `${state.follower.y}px`;

      requestAnimationFrame(() => this.animateFollower());
    }
  };

  // --------------------------------------------------------------------------
  // 8. TESTIMONIAL CAROUSEL / SLIDER
  // --------------------------------------------------------------------------
  const TestimonialSlider = {
    init() {
      if (!DOM.sliderTrack || DOM.sliderSlides.length === 0) return;

      if (DOM.sliderNext) {
        DOM.sliderNext.addEventListener('click', () => {
          this.next();
          this.restartTimer();
        });
      }

      if (DOM.sliderPrev) {
        DOM.sliderPrev.addEventListener('click', () => {
          this.prev();
          this.restartTimer();
        });
      }

      DOM.sliderDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          this.goTo(idx);
          this.restartTimer();
        });
      });

      // Pause on hover
      if (DOM.sliderContainer) {
        DOM.sliderContainer.addEventListener('mouseenter', () => this.stopTimer());
        DOM.sliderContainer.addEventListener('mouseleave', () => this.startTimer());
      }

      // Touch swipe support
      let startX = 0;
      let endX = 0;
      DOM.sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        this.stopTimer();
      }, { passive: true });

      DOM.sliderTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 45) {
          this.next();
        } else if (endX - startX > 45) {
          this.prev();
        }
        this.startTimer();
      }, { passive: true });

      this.startTimer();
    },

    goTo(index) {
      state.sliderIndex = (index + DOM.sliderSlides.length) % DOM.sliderSlides.length;
      DOM.sliderTrack.style.transform = `translateX(-${state.sliderIndex * 100}%)`;

      DOM.sliderDots.forEach((dot, i) => {
        const isActive = i === state.sliderIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    },

    next() {
      this.goTo(state.sliderIndex + 1);
    },

    prev() {
      this.goTo(state.sliderIndex - 1);
    },

    startTimer() {
      if (state.sliderTimer) clearInterval(state.sliderTimer);
      state.sliderTimer = setInterval(() => this.next(), 6000);
    },

    stopTimer() {
      if (state.sliderTimer) clearInterval(state.sliderTimer);
    },

    restartTimer() {
      this.stopTimer();
      this.startTimer();
    }
  };

  // --------------------------------------------------------------------------
  // 9. PROJECTS MODAL MANAGER
  // --------------------------------------------------------------------------
  const ProjectsModal = {
    init() {
      if (!DOM.viewAllProjectsBtn || !DOM.projectsModal) return;

      DOM.viewAllProjectsBtn.addEventListener('click', () => this.open());
      if (DOM.modalCloseBtn) {
        DOM.modalCloseBtn.addEventListener('click', () => this.close());
      }

      DOM.projectsModal.addEventListener('click', (e) => {
        if (e.target === DOM.projectsModal) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.projectsModal.classList.contains('open')) {
          this.close();
        }
      });
    },

    open() {
      DOM.projectsModal.classList.add('open');
      DOM.projectsModal.setAttribute('aria-hidden', 'false');
      DOM.body.style.overflow = 'hidden';
    },

    close() {
      DOM.projectsModal.classList.remove('open');
      DOM.projectsModal.setAttribute('aria-hidden', 'true');
      DOM.body.style.overflow = '';
    }
  };

  // --------------------------------------------------------------------------
  // 10. CONTACT FORM VALIDATION & INTERACTIVE STATE
  // --------------------------------------------------------------------------
  const ContactFormManager = {
    init() {
      if (!DOM.contactForm) return;

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      // Clear field errors on input
      [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
        if (field) {
          field.addEventListener('input', () => {
            field.classList.remove('invalid');
            const errEl = document.getElementById(`${field.name}-error`);
            if (errEl) errEl.textContent = '';
          });
        }
      });

      DOM.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(nameInput, emailInput, subjectInput, messageInput);
      });
    },

    handleSubmit(name, email, subject, message) {
      let isValid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate Name
      if (!name.value.trim() || name.value.trim().length < 2) {
        this.setError(name, 'name-error', 'Please provide your full name (minimum 2 characters).');
        isValid = false;
      }

      // Validate Email
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        this.setError(email, 'email-error', 'Please provide a valid email address.');
        isValid = false;
      }

      // Validate Subject
      if (!subject.value.trim() || subject.value.trim().length < 3) {
        this.setError(subject, 'subject-error', 'Please enter a message subject.');
        isValid = false;
      }

      // Validate Message
      if (!message.value.trim() || message.value.trim().length < 10) {
        this.setError(message, 'message-error', 'Please write a message (at least 10 characters).');
        isValid = false;
      }

      if (!isValid) return;

      // Form is valid: show simulated loading state
      DOM.submitBtn.classList.add('loading');
      DOM.submitBtn.disabled = true;

      setTimeout(() => {
        DOM.submitBtn.classList.remove('loading');
        DOM.submitBtn.disabled = false;

        DOM.formFeedback.className = 'form-feedback success';
        DOM.formFeedback.textContent = `Thank you, ${name.value.trim()}! Your message has been prepared. (Client-side validation passed successfully. You can connect this form directly to an EmailJS or Node.js/Express backend.)`;

        DOM.contactForm.reset();

        setTimeout(() => {
          DOM.formFeedback.style.display = 'none';
        }, 8000);
      }, 1400);
    },

    setError(inputElement, errorElementId, message) {
      inputElement.classList.add('invalid');
      const errEl = document.getElementById(errorElementId);
      if (errEl) {
        errEl.textContent = message;
      }
    }
  };

  // --------------------------------------------------------------------------
  // 11. GENERAL UTILITIES (COPYRIGHT YEAR)
  // --------------------------------------------------------------------------
  const Utilities = {
    init() {
      if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
      }
    }
  };

  // --------------------------------------------------------------------------
  // APPLICATION BOOTSTRAP
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    TypingEffect.init();
    
    // Initialize Canvas Particles
    if (DOM.bgCanvas) {
      window.ParticleSystemInstance = new ParticleSystem(DOM.bgCanvas);
    }

    NavigationManager.init();
    RevealManager.init();
    TiltAndMagnetic.init();
    CursorManager.init();
    TestimonialSlider.init();
    ProjectsModal.init();
    ContactFormManager.init();
    Utilities.init();
  });

})();
