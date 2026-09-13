/* ============================================================
   UNKE LIYE — Enhanced Pages Shared JS  (enhanced-pages.js)
   ============================================================ */
(function () {
  'use strict';

  /* ── Toast helper ──────────────────────────────────────────── */
  window.pgToast = function (msg, type = 'default', dur = 3200) {
    let wrap = document.querySelector('.pg-toast-wrap');
    if (!wrap) {
      wrap = Object.assign(document.createElement('div'), { className: 'pg-toast-wrap' });
      document.body.appendChild(wrap);
    }
    const toast = Object.assign(document.createElement('div'), {
      className: 'pg-toast' + (type !== 'default' ? ` pg-toast--${type}` : ''),
      textContent: msg
    });
    wrap.appendChild(toast);
    setTimeout(() => toast.remove(), dur);
  };

  /* ── Reveal on scroll ──────────────────────────────────────── */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  /* ── Tabs ──────────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.pg-tabs').forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('.pg-tab-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const panel = document.getElementById(btn.dataset.panel);
          if (!panel) return;
          buttons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          // hide siblings
          const allPanels = document.querySelectorAll('.pg-tab-panel');
          allPanels.forEach(p => p.classList.remove('is-active'));
          panel.classList.add('is-active');
        });
      });
    });
  }

  /* ── Accordion ─────────────────────────────────────────────── */
  function initAccordion() {
    document.querySelectorAll('.pg-accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.pg-accordion-item');
        const isOpen = item.classList.contains('is-open');
        item.closest('.pg-accordion').querySelectorAll('.pg-accordion-item').forEach(i => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  /* ── Filter bar ─────────────────────────────────────────────── */
  function initFilters() {
    document.querySelectorAll('.pg-filter-bar[data-filter-group]').forEach(bar => {
      const group = bar.dataset.filterGroup;
      const target = document.getElementById(bar.dataset.filterTarget || (group + '-container'));
      if (!target) return;
      bar.querySelectorAll('.pg-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          bar.querySelectorAll('.pg-filter-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const val = btn.dataset.filter;
          target.querySelectorAll('[data-category]').forEach(card => {
            card.style.display = (val === 'all' || card.dataset.category === val) ? '' : 'none';
          });
        });
      });
    });
  }

  /* ── Progress bars ──────────────────────────────────────────── */
  function initProgressBars() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const pct = parseInt(e.target.dataset.pct || 0, 10);
          e.target.style.width = Math.min(pct, 100) + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.pg-progress-fill[data-pct]').forEach(el => io.observe(el));
  }

  /* ── Counter animation ──────────────────────────────────────── */
  function initCounters() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dur = 1600;
        const start = performance.now();
        function step(now) {
          const t = Math.min((now - start) / dur, 1);
          const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
          const val = target * ease;
          el.textContent = prefix + (Number.isInteger(target) ? Math.round(val).toLocaleString('en-IN') : val.toFixed(1)) + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach(el => io.observe(el));
  }

  /* ── Lightbox ───────────────────────────────────────────────── */
  window.pgLightboxOpen = function (imgUrl, title, category) {
    const lb = document.getElementById('pg-lightbox');
    if (!lb) return;
    lb.querySelector('.pg-lightbox__img').style.backgroundImage = `url('${imgUrl}')`;
    const titleEl = lb.querySelector('.pg-lightbox__title');
    if (titleEl) titleEl.textContent = title || '';
    const catEl = lb.querySelector('.pg-lightbox__cat');
    if (catEl) catEl.textContent = category || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  window.pgLightboxClose = function () {
    const lb = document.getElementById('pg-lightbox');
    if (lb) { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
  };

  /* ── Amount selector buttons ────────────────────────────────── */
  window.pgSetAmount = function (val, inputId, btnClass) {
    const input = document.getElementById(inputId || 'custom-amount');
    if (input) input.value = val;
    document.querySelectorAll(btnClass || '.pg-amount-btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.amount == val);
    });
  };

  /* ── Before/after comparison slider ────────────────────────── */
  function initComparison() {
    document.querySelectorAll('.pg-compare').forEach(el => {
      const after = el.querySelector('.pg-compare__after');
      const divider = el.querySelector('.pg-compare__divider');
      const handle = el.querySelector('.pg-compare__handle');
      if (!after || !divider) return;
      let dragging = false;
      function setSplit(clientX) {
        const rect = el.getBoundingClientRect();
        const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
        after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        divider.style.left = pct + '%';
        if (handle) handle.style.left = pct + '%';
      }
      el.addEventListener('mousedown', e => { dragging = true; setSplit(e.clientX); });
      el.addEventListener('touchstart', e => { dragging = true; setSplit(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mousemove', e => { if (dragging) setSplit(e.clientX); });
      window.addEventListener('touchmove', e => { if (dragging) setSplit(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mouseup', () => { dragging = false; });
      window.addEventListener('touchend', () => { dragging = false; });
    });
  }

  /* ── Sticky header shrink ───────────────────────────────────── */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Mobile nav ─────────────────────────────────────────────── */
  function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const panel = document.querySelector('.nav-mobile-panel');
    const overlay = panel?.querySelector('.nav-mobile-overlay');
    const closeBtn = panel?.querySelector('.nav-mobile-close');
    if (!hamburger || !panel) return;
    const open = () => { panel.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const close = () => { panel.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
    hamburger.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
  }

  /* ── RSVP / Form submissions ────────────────────────────────── */
  function initForms() {
    document.querySelectorAll('[data-pg-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const msg = form.dataset.successMsg || 'Submitted successfully! Our team will be in touch shortly.';
        pgToast(msg, 'success');
        form.reset();
        // scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  /* ── Parallax hero image ────────────────────────────────────── */
  function initParallax() {
    const bgs = document.querySelectorAll('.pg-hero__bg[data-parallax]');
    if (!bgs.length) return;
    window.addEventListener('scroll', () => {
      bgs.forEach(bg => {
        const pct = window.scrollY * 0.25;
        bg.style.transform = `scale(1.04) translateY(${pct}px)`;
      });
    }, { passive: true });
  }

  /* ── Init all ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initTabs();
    initAccordion();
    initFilters();
    initProgressBars();
    initCounters();
    initComparison();
    initStickyHeader();
    initMobileNav();
    initForms();
    initParallax();

    // close lightbox on overlay click / ESC
    document.addEventListener('keydown', e => { if (e.key === 'Escape') pgLightboxClose(); });
    document.getElementById('pg-lightbox')?.addEventListener('click', e => {
      if (e.target === document.getElementById('pg-lightbox')) pgLightboxClose();
    });
  });
})();
