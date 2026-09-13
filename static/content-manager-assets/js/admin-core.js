(function () {
  'use strict';

  /* ── Theme ── */
  function initTheme() {
    const html = document.documentElement;
    const saved = localStorage.getItem('cm-theme');
    if (saved === 'dark' || saved === 'light') {
      html.setAttribute('data-theme', saved);
    }

    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('cm-theme', next);
        updateThemeIcon(next);
      });
    });

    updateThemeIcon(html.getAttribute('data-theme'));
  }

  function updateThemeIcon(theme) {
    var sunPath = 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';
    var moonPath = 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
    document.querySelectorAll('[data-theme-toggle] svg path').forEach(function (path) {
      path.setAttribute('d', theme === 'dark' ? sunPath : moonPath);
    });
  }

  /* ── Sidebar ── */
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main-content');
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    if (!sidebar || !main || !collapseBtn) return;

    const isCollapsed = localStorage.getItem('cm-sidebar-collapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
      main.classList.add('sidebar-collapsed');
    }

    collapseBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('sidebar-collapsed');
      const collapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('cm-sidebar-collapsed', String(collapsed));
    });
  }

  /* ── Mobile menu ── */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar || !overlay) return;

    function open() {
      sidebar.classList.add('mobile-open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', open);
    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
        close();
      }
    });
  }

  /* ── Modals ── */
  function initModals() {
    document.addEventListener('click', function (e) {
      const openTrigger = e.target.closest('[data-modal-open]');
      if (openTrigger) {
        e.preventDefault();
        const id = openTrigger.getAttribute('data-modal-open');
        openModal(id);
      }

      const closeTrigger = e.target.closest('[data-modal-close]');
      if (closeTrigger) {
        e.preventDefault();
        const id = closeTrigger.getAttribute('data-modal-close');
        closeModal(id);
      }

      const closeBtn = e.target.closest('.modal-close');
      if (closeBtn) {
        e.preventDefault();
        const modal = closeBtn.closest('.modal');
        if (modal) closeModal(modal.id);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(function (modal) {
          closeModal(modal.id);
        });
      }
    });

    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
          closeModal(modal.id);
        }
      });
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const focusable = modal.querySelector('input, textarea, select, button, [href], [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Toasts ── */
  function initToasts() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-toast]');
      if (!trigger) return;

      const type = trigger.getAttribute('data-toast');
      const title = trigger.getAttribute('data-toast-title') || defaultTitle(type);
      const msg = trigger.getAttribute('data-toast-msg') || '';
      showToast(type, title, msg);
    });
  }

  function defaultTitle(type) {
    switch (type) {
      case 'success': return 'Success';
      case 'info': return 'Info';
      case 'warning': return 'Warning';
      case 'danger': return 'Error';
      default: return 'Notification';
    }
  }

  function showToast(type, title, msg) {
    const region = document.getElementById('toast-region');
    const tpl = document.getElementById('toast-tpl-' + type);
    if (!region || !tpl) return;

    const toast = tpl.cloneNode(true);
    toast.removeAttribute('id');
    toast.classList.add('toast-' + type);

    const titleEl = toast.querySelector('.toast-title');
    const msgEl = toast.querySelector('.toast-msg');
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = msg || '';

    region.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 5000);
  }

  window.showToast = showToast;
  window.openModal = openModal;
  window.closeModal = closeModal;

  /* ── Dropdowns ── */
  function initDropdowns() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-dropdown]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = trigger.getAttribute('data-dropdown');
        const menu = document.getElementById(targetId);
        if (!menu) return;

        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) menu.classList.add('open');
      } else {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDropdowns();
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.open').forEach(function (menu) {
      menu.classList.remove('open');
    });
  }

  /* ── Initialise ── */
  function init() {
    initTheme();
    initSidebar();
    initMobileMenu();
    initModals();
    initToasts();
    initDropdowns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
