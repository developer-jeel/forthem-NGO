/* ============================================================
   UNKE LIYE — Main JavaScript (shared utilities)
   ============================================================ */

'use strict';

// ============================
// Scroll Reveal (IntersectionObserver)
// ============================
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => observer.observe(el));
}

// ============================
// Animated Number Counters
// ============================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = parseInt(el.dataset.duration || 2000, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = el.dataset.target;
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
}

// ============================
// Progress Bar Animation
// ============================
function initProgressBars() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-progress]').forEach(el => {
      el.style.width = el.dataset.progress + '%';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.progress + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-progress]').forEach(el => observer.observe(el));
}

// ============================
// Sticky Header
// ============================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });
}

// ============================
// Mobile Navigation
// ============================
function initMobileNav() {
  const hamburger  = document.querySelector('.nav-hamburger');
  const panel      = document.querySelector('.nav-mobile-panel');
  const overlay    = document.querySelector('.nav-mobile-overlay');
  const closeBtn   = document.querySelector('.nav-mobile-close');
  const drawer     = document.querySelector('.nav-mobile-drawer');

  if (!hamburger || !panel) return;

  function openNav() {
    panel.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus trap
    const focusable = drawer.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  function closeNav() {
    panel.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openNav);
  if (closeBtn)  closeBtn.addEventListener('click', closeNav);
  if (overlay)   overlay.addEventListener('click', closeNav);

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeNav();
  });
}

// ============================
// Accordion
// ============================
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      // Close all in same group
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-content').style.maxHeight = '0';
          openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        });
      }

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================
// Tabs
// ============================
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]') || btn.closest('section') || btn.parentElement.parentElement;
      const target = btn.dataset.tab;

      // Deactivate all
      btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Find panels
      const container = btn.closest('[data-tabs-container]') || document;
      container.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

      // Activate
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = container.querySelector(`[data-tab-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ============================
// Filter Bar
// ============================
function initFilterBars() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bar = btn.closest('.filter-bar');
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const grid = bar.nextElementSibling;
      if (!grid) return;

      grid.querySelectorAll('[data-category]').forEach(item => {
        if (filter === 'all' || item.dataset.category === filter || item.dataset.category.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ============================
// Carousel
// ============================
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track  = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prev   = carousel.querySelector('.carousel-prev');
    const next   = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    if (!track || !slides.length) return;

    let current = 0;
    let autoplayTimer = null;
    const total = slides.length;

    // Create dots
    let dots = [];
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prev) prev.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    if (next) next.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

    // Touch / swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); resetAutoplay(); }
    });

    // Autoplay
    function startAutoplay() {
      const delay = parseInt(carousel.dataset.autoplay || 0);
      if (!delay) return;
      autoplayTimer = setInterval(() => goTo(current + 1), delay);
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', () => clearInterval(autoplayTimer));
    carousel.addEventListener('focusout', startAutoplay);

    // Keyboard
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoplay(); }
    });

    startAutoplay();
  });
}

// ============================
// Modal System
// ============================
function initModals() {
  // Open
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.modalOpen;
      const modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstFocusable = modal.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    });
  });

  // Close
  document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Click outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });
}

// ============================
// Toast Notifications
// ============================
const toastContainer = (() => {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }
  return container;
})();

function showToast(message, type = '', duration = 4000) {
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ` toast--${type}` : '');
  toast.setAttribute('role', 'alert');

  const icons = { success: '✓', error: '✕', warning: '⚠' };
  const icon = icons[type] || 'ℹ';

  toast.innerHTML = `<span style="font-size:1.1rem">${icon}</span> ${message}`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

// ============================
// Active Nav Link
// ============================
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || href.endsWith('/' + path))) {
      link.classList.add('active');
    }
  });
}

// ============================
// Page Load Fade
// ============================
function initPageTransition() {
  document.body.classList.add('page-transition');
}

// ============================
// Initialize All
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initProgressBars();
  initAccordions();
  initTabs();
  initFilterBars();
  initCarousels();
  initModals();
  setActiveNavLink();
});

document.addEventListener('unke:rendered', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initProgressBars();
  initAccordions();
  initTabs();
  initFilterBars();
  initCarousels();
  initModals();
  setActiveNavLink();
});

// Export utilities for other scripts
window.UnkeLiye = {
  showToast,
  animateCounter,
};
