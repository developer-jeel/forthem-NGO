/* ============================================================
   UNKE LIYE — CAMPAIGN MANAGER PORTAL INTERACTION & ANIMATIONS
   JS only operates on DOM elements for CSS animations, toggles,
   modals, tabs, theme switches, and animated counters.
   Strict Static Data — No external APIs or dynamic rendering.
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initSidebar();
    initDropdowns();
    initModals();
    initTabs();
    initToastTriggers();
    initFilterTabs();
    initViewToggles();
    initCounters();
    initChartAnimations();
    initProgressRings();
    initStarToggles();
  });

  /* ── Theme Switcher ─────────────────────────────────────── */
  function initThemeToggle() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      
      // Store preference locally
      try {
        localStorage.setItem('unke_liye_theme', newTheme);
      } catch (e) {}
    });

    // Check pre-saved theme
    try {
      const saved = localStorage.getItem('unke_liye_theme');
      if (saved) html.setAttribute('data-theme', saved);
    } catch (e) {}
  }

  /* ── Sidebar & Mobile Drawer Navigation ──────────────────── */
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const collapseBtn = document.getElementById('sidebar-collapse');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar) return;

    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        if (mainWrapper) mainWrapper.classList.toggle('sidebar-collapsed');
      });
    }

    function openMobile() {
      sidebar.classList.add('mobile-open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
      sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileBtn) mobileBtn.addEventListener('click', openMobile);
    if (overlay) overlay.addEventListener('click', closeMobile);
  }

  /* ── Dropdown Menus ─────────────────────────────────────── */
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(function (trigger) {
      const targetId = trigger.getAttribute('data-dropdown');
      const menu = document.getElementById(targetId);
      if (!menu) return;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) menu.classList.add('open');
      });
    });

    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDropdowns();
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.open').forEach(function (m) {
      m.classList.remove('open');
    });
  }

  /* ── Modal Dialog Controls ──────────────────────────────── */
  function initModals() {
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-modal-open');
        openModal(id);
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-modal-close') || btn.closest('.modal-backdrop')?.id;
        if (id) closeModal(id);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeModal(backdrop.id);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) closeModal(openModal.id);
      }
    });
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Tab Switching Animation ────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tabs-wrap').forEach(function (wrap) {
      const btns = wrap.querySelectorAll('.tab-btn');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          const targetId = btn.getAttribute('data-tab-target');
          if (!targetId) return;

          const container = btn.closest('.tab-container') || document;
          container.querySelectorAll('.tab-panel').forEach(function (panel) {
            panel.classList.remove('active');
          });

          const target = document.getElementById(targetId);
          if (target) target.classList.add('active');
        });
      });
    });
  }

  /* ── Toast Alert System ─────────────────────────────────── */
  function showToast(type, title, msg) {
    const region = document.getElementById('toast-region');
    if (!region) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
      <div class="toast-icon ${type}">${iconSvg}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
      <button class="toast-close-btn" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="toast-progress-bar"></div>
    `;

    toast.querySelector('.toast-close-btn').addEventListener('click', function () {
      dismissToast(toast);
    });

    region.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      dismissToast(toast);
    }, 3800);
  }

  function dismissToast(el) {
    el.classList.remove('show');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 300);
  }

  function initToastTriggers() {
    document.querySelectorAll('[data-toast]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const type = btn.getAttribute('data-toast') || 'success';
        const title = btn.getAttribute('data-toast-title') || 'Notice';
        const msg = btn.getAttribute('data-toast-msg') || 'Action updated successfully.';
        showToast(type, title, msg);
      });
    });
  }

  /* ── Filter Pills & Search Filtering ─────────────────────── */
  function initFilterTabs() {
    document.querySelectorAll('.filter-pills').forEach(function (pillGroup) {
      const pills = pillGroup.querySelectorAll('.filter-pill');
      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          pills.forEach(function (p) { p.classList.remove('active'); });
          pill.classList.add('active');

          const filterVal = pill.getAttribute('data-filter') || 'all';
          const container = document.getElementById(pillGroup.getAttribute('data-target-container'));
          if (!container) return;

          const items = container.querySelectorAll('[data-category], [data-status]');
          items.forEach(function (item) {
            const cat = item.getAttribute('data-category') || item.getAttribute('data-status');
            if (filterVal === 'all' || cat === filterVal) {
              item.style.display = '';
              item.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  }

  /* ── View Toggle (Grid vs Table) ────────────────────────── */
  function initViewToggles() {
    const gridBtn = document.getElementById('view-btn-grid');
    const tableBtn = document.getElementById('view-btn-table');
    const gridView = document.getElementById('view-container-grid');
    const tableView = document.getElementById('view-container-table');

    if (!gridBtn || !tableBtn || !gridView || !tableView) return;

    gridBtn.addEventListener('click', function () {
      gridBtn.classList.add('active');
      tableBtn.classList.remove('active');
      gridView.style.display = 'grid';
      tableView.style.display = 'none';
    });

    tableBtn.addEventListener('click', function () {
      tableBtn.classList.add('active');
      gridBtn.classList.remove('active');
      tableView.style.display = 'block';
      gridView.style.display = 'none';
    });
  }

  /* ── Animated Number Counters ────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.animate-counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseFloat(el.getAttribute('data-count'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (targetNum - start) * easeOutExpo(progress);

            el.textContent = prefix + formatNumber(current, decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              el.textContent = prefix + formatNumber(targetNum, decimals) + suffix;
            }
          }

          requestAnimationFrame(updateNumber);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function formatNumber(val, decimals) {
    return val.toLocaleString('en-IN', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    });
  }

  /* ── SVG Chart Entrance Animations ───────────────────────── */
  function initChartAnimations() {
    const bars = document.querySelectorAll('.animate-bar');
    bars.forEach(function (bar, idx) {
      setTimeout(function () {
        bar.style.transform = 'scaleY(1)';
      }, idx * 100);
    });
  }

  /* ── Radial SVG Progress Rings ───────────────────────────── */
  function initProgressRings() {
    const rings = document.querySelectorAll('.radial-progress-fill');
    rings.forEach(function (ring) {
      const pct = parseFloat(ring.getAttribute('data-pct') || '0');
      const circumference = 283; // 2 * PI * r (r=45)
      const offset = circumference - (pct / 100) * circumference;

      setTimeout(function () {
        ring.style.strokeDashoffset = offset;
      }, 300);
    });
  }

  /* ── Star / Featured Toggle ──────────────────────────────── */
  function initStarToggles() {
    document.querySelectorAll('.star-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('starred');
        if (btn.classList.contains('starred')) {
          btn.textContent = '★';
          showToast('success', 'Campaign Featured', 'Campaign highlighted on home banner.');
        } else {
          btn.textContent = '☆';
          showToast('info', 'Unfeatured', 'Campaign removed from featured spotlight.');
        }
      });
    });
  }

})();
