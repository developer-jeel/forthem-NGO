/* ============================================================
   UNKE LIYE ADMIN — SHARED APP BEHAVIOUR
   No content arrays. JS only operates on existing DOM markup.
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme ─────────────────────────────────────────────── */
  function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  }

  /* ── Sidebar ────────────────────────────────────────────── */
  function initSidebar() {
    const sidebar   = document.getElementById('sidebar');
    const mainCont  = document.getElementById('main-content');
    const collapseBtn = document.getElementById('sidebar-collapse');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const overlay   = document.getElementById('sidebar-overlay');
    if (!sidebar) return;

    // Desktop collapse
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        if (mainCont) mainCont.classList.toggle('sidebar-collapsed');
      });
    }

    // Mobile open/close
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
    if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
    if (overlay) overlay.addEventListener('click', closeMobile);
  }

  /* ── Dropdowns ──────────────────────────────────────────── */
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(function (trigger) {
      const menuId = trigger.getAttribute('data-dropdown');
      const menu = document.getElementById(menuId);
      if (!menu) return;

      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          menu.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
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
    document.querySelectorAll('[data-dropdown]').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  /* ── Modals ─────────────────────────────────────────────── */
  function initModals() {
    // Open triggers: data-modal-open="modal-id"
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-modal-open');
        openModal(id);
      });
    });

    // Close triggers: data-modal-close or .modal-close inside backdrop
    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-modal-close') ||
                   btn.closest('.modal-backdrop')?.id;
        closeModal(id);
      });
    });

    // Backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeModal(backdrop.id);
      });
    });

    // Esc key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const open = document.querySelector('.modal-backdrop.open');
        if (open) closeModal(open.id);
      }
    });
  }

  function openModal(id) {
    const backdrop = document.getElementById(id);
    if (!backdrop) return;
    backdrop.classList.add('open');
    backdrop.removeAttribute('hidden');
    // Focus first focusable element
    const focusable = backdrop.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const backdrop = document.getElementById(id);
    if (!backdrop) return;
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Tabs ─────────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabList) {
      const buttons = tabList.querySelectorAll('.tab-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Deactivate all buttons in this tabs group
          buttons.forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          // Hide all panels associated with this tab group
          const groupId = tabList.getAttribute('data-tab-group');
          const panels = groupId
            ? document.querySelectorAll('[data-tab-group-panel="' + groupId + '"]')
            : document.querySelectorAll('.tab-panel');

          panels.forEach(function (p) { p.classList.remove('active'); });

          // Show target panel
          const target = document.getElementById(btn.getAttribute('data-tab'));
          if (target) target.classList.add('active');
        });
      });
    });
  }

  /* ── Toasts ─────────────────────────────────────────────── */
  function showToast(type, title, msg) {
    const region = document.getElementById('toast-region');
    if (!region) return;

    // Find a pre-built template toast or clone the first one
    const template = document.getElementById('toast-tpl-' + type) ||
                     document.getElementById('toast-tpl-success');
    if (!template) return;

    const clone = template.cloneNode(true);
    clone.id = 'toast-' + Date.now();
    clone.removeAttribute('hidden');
    clone.classList.remove('hidden');

    const titleEl = clone.querySelector('.toast-title');
    const msgEl   = clone.querySelector('.toast-msg');
    if (titleEl && title) titleEl.textContent = title;
    if (msgEl && msg)     msgEl.textContent = msg;

    const closeBtn = clone.querySelector('.toast-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { dismissToast(clone); });

    region.appendChild(clone);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { clone.classList.add('show'); });
    });

    setTimeout(function () { dismissToast(clone); }, 5000);
  }

  function dismissToast(el) {
    el.classList.remove('show');
    setTimeout(function () { el.remove(); }, 300);
  }

  // Wire up data-toast-* triggers
  function initToastTriggers() {
    document.querySelectorAll('[data-toast]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const type  = btn.getAttribute('data-toast') || 'success';
        const title = btn.getAttribute('data-toast-title') || 'Done';
        const msg   = btn.getAttribute('data-toast-msg') || '';
        showToast(type, title, msg);
      });
    });
  }

  /* ── Table Search / Filter ──────────────────────────────── */
  function initTableSearch() {
    document.querySelectorAll('[data-search-table]').forEach(function (input) {
      const tableId = input.getAttribute('data-search-table');
      const table   = document.getElementById(tableId);
      if (!table) return;

      input.addEventListener('input', function () {
        const q = input.value.toLowerCase().trim();
        table.querySelectorAll('tbody tr').forEach(function (row) {
          if (row.classList.contains('pagination-row-group')) return;
          const text = row.textContent.toLowerCase();
          row.classList.toggle('row-hidden', q !== '' && !text.includes(q));
        });
      });
    });
  }

  /* ── Filter Chips ───────────────────────────────────────── */
  function initFilterChips() {
    document.querySelectorAll('.filter-chips[data-filter-table]').forEach(function (group) {
      const tableId  = group.getAttribute('data-filter-table');
      const attr     = group.getAttribute('data-filter-attr') || 'data-status';
      const table    = document.getElementById(tableId);
      if (!table) return;

      group.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          group.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');

          const val = chip.getAttribute('data-filter-val');
          table.querySelectorAll('tbody tr').forEach(function (row) {
            if (val === 'all') {
              row.classList.remove('row-hidden');
            } else {
              const rowVal = row.getAttribute(attr) || '';
              row.classList.toggle('row-hidden', rowVal !== val);
            }
          });
        });
      });
    });
  }

  /* ── Select Filter ──────────────────────────────────────── */
  function initSelectFilters() {
    document.querySelectorAll('[data-filter-select]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        const tableId = sel.getAttribute('data-filter-select');
        const attr    = sel.getAttribute('data-filter-attr') || 'data-status';
        const val     = sel.value;
        const table   = document.getElementById(tableId);
        if (!table) return;

        table.querySelectorAll('tbody tr').forEach(function (row) {
          if (!val || val === 'all') {
            row.classList.remove('row-hidden');
          } else {
            const rowVal = row.getAttribute(attr) || '';
            row.classList.toggle('row-hidden', rowVal !== val);
          }
        });
      });
    });
  }

  /* ── Table Sorting ──────────────────────────────────────── */
  function initTableSort() {
    document.querySelectorAll('.data-table').forEach(function (table) {
      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      table.querySelectorAll('th[data-sort]').forEach(function (th) {
        th.addEventListener('click', function () {
          const col  = parseInt(th.getAttribute('data-sort'), 10);
          const dir  = th.classList.contains('sorted-asc') ? -1 : 1;

          table.querySelectorAll('th').forEach(function (h) {
            h.classList.remove('sorted-asc', 'sorted-desc');
          });
          th.classList.add(dir === 1 ? 'sorted-asc' : 'sorted-desc');

          // Collect and sort existing rows (DOM reorder, no data regeneration)
          const rows = Array.from(tbody.querySelectorAll('tr:not(.pagination-row-group)'));
          rows.sort(function (a, b) {
            const aCell = a.cells[col];
            const bCell = b.cells[col];
            if (!aCell || !bCell) return 0;
            const aVal = aCell.textContent.trim();
            const bVal = bCell.textContent.trim();
            const aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
            const bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));
            if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * dir;
            return aVal.localeCompare(bVal) * dir;
          });
          rows.forEach(function (r) { tbody.appendChild(r); });
        });
      });
    });
  }

  /* ── Pagination (show/hide hardcoded row groups) ─────────── */
  function initPagination() {
    document.querySelectorAll('[data-pagination]').forEach(function (wrap) {
      const tableId = wrap.getAttribute('data-pagination');
      const table   = document.getElementById(tableId);
      if (!table) return;

      const pageGroups = table.querySelectorAll('tbody .page-group');
      const pageBtns   = wrap.querySelectorAll('.page-btn[data-page]');

      function showPage(pageNum) {
        pageGroups.forEach(function (g) {
          const gPage = parseInt(g.getAttribute('data-page'), 10);
          if (gPage === pageNum) {
            g.querySelectorAll('tr').forEach(function (r) { r.classList.remove('row-hidden'); });
          } else {
            g.querySelectorAll('tr').forEach(function (r) { r.classList.add('row-hidden'); });
          }
        });
        pageBtns.forEach(function (b) {
          b.classList.toggle('active', parseInt(b.getAttribute('data-page'), 10) === pageNum);
        });
      }

      pageBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          showPage(parseInt(btn.getAttribute('data-page'), 10));
        });
      });

      // Init: show page 1
      if (pageGroups.length) showPage(1);
    });
  }

  /* ── Chart Entrance Animations (IntersectionObserver) ────── */
  function initChartAnimations() {
    // Bar charts
    const bars = document.querySelectorAll('.bar-animate');
    if (bars.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });
      bars.forEach(function (b) { observer.observe(b); });
    }

    // Donut arcs
    const arcs = document.querySelectorAll('.donut-arc.animate');
    if (arcs.length) {
      const observer2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });
      arcs.forEach(function (a) { observer2.observe(a); });
    }

    // Progress rings
    const rings = document.querySelectorAll('.progress-ring-fill');
    if (rings.length) {
      const observer3 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });
      rings.forEach(function (r) { observer3.observe(r); });
    }
  }

  /* ── Skeleton Loader Demo ───────────────────────────────── */
  function initSkeletons() {
    document.querySelectorAll('[data-skeleton-for]').forEach(function (skel) {
      const realId = skel.getAttribute('data-skeleton-for');
      const real   = document.getElementById(realId);
      if (!real) return;
      real.classList.add('hidden');
      setTimeout(function () {
        skel.classList.add('hidden');
        real.classList.remove('hidden');
      }, 700);
    });
  }

  /* ── Message Pane ───────────────────────────────────────── */
  function initMessagePane() {
    const paneItems = document.querySelectorAll('.pane-item[data-detail]');
    if (!paneItems.length) return;

    paneItems.forEach(function (item) {
      item.addEventListener('click', function () {
        paneItems.forEach(function (i) { i.classList.remove('active'); });
        item.classList.add('active');

        // Hide all detail panels, show selected
        const detailId = item.getAttribute('data-detail');
        document.querySelectorAll('.message-detail-panel').forEach(function (p) {
          p.classList.add('hidden');
        });
        const detail = document.getElementById(detailId);
        if (detail) detail.classList.remove('hidden');
      });
    });
  }

  /* ── Confirm-action Buttons ─────────────────────────────── */
  function initConfirmActions() {
    document.querySelectorAll('[data-confirm-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const modalId = btn.getAttribute('data-confirm-modal');
        openModal(modalId);
      });
    });
  }

  /* ── Password Visibility Toggle ─────────────────────────── */
  function initPasswordToggle() {
    document.querySelectorAll('[data-show-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const input = document.getElementById(btn.getAttribute('data-show-password'));
        if (!input) return;
        if (input.type === 'password') {
          input.type = 'text';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          btn.setAttribute('aria-label', 'Show password');
        }
      });
    });
  }

  /* ── Login Simulation ───────────────────────────────────── */
  function initLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Signing in…';
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1400);
    });
  }

  /* ── Star / Featured Toggle ─────────────────────────────── */
  function initStarToggles() {
    document.querySelectorAll('.star-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        btn.classList.toggle('starred');
      });
    });
  }

  /* ── Lightbox ───────────────────────────────────────────── */
  function initLightbox() {
    const lightbox   = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn    = document.getElementById('lightbox-prev');
    const nextBtn    = document.getElementById('lightbox-next');
    if (!lightbox || !lightboxImg) return;

    const thumbs = Array.from(document.querySelectorAll('[data-lightbox]'));
    let current = 0;

    function showIndex(idx) {
      current = (idx + thumbs.length) % thumbs.length;
      const src = thumbs[current].getAttribute('data-lightbox');
      lightboxImg.src = src;
    }

    thumbs.forEach(function (thumb, idx) {
      thumb.addEventListener('click', function () {
        showIndex(idx);
        openModal('lightbox-modal');
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { showIndex(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showIndex(current + 1); });
  }

  /* ── Topbar Mobile Search ───────────────────────────────── */
  function initMobileSearch() {
    const toggleBtn = document.getElementById('mobile-search-toggle');
    const searchWrap = document.querySelector('.topbar-search');
    if (!toggleBtn || !searchWrap) return;
    toggleBtn.addEventListener('click', function () {
      searchWrap.classList.toggle('mobile-expanded');
      if (searchWrap.classList.contains('mobile-expanded')) {
        searchWrap.querySelector('input')?.focus();
      }
    });
  }

  /* ── Checked-in Toggle (Events) ─────────────────────────── */
  function initCheckinToggles() {
    document.querySelectorAll('.checkin-toggle').forEach(function (cb) {
      cb.addEventListener('change', function () {
        const row = cb.closest('tr');
        if (!row) return;
        const badge = row.querySelector('.checkin-badge');
        if (!badge) return;
        if (cb.checked) {
          badge.textContent = 'Checked In';
          badge.className = 'badge badge-success checkin-badge';
        } else {
          badge.textContent = 'Not Yet';
          badge.className = 'badge badge-neutral checkin-badge';
        }
      });
    });
  }

  /* ── Contenteditable simple formatting ──────────────────── */
  function initEditor() {
    document.querySelectorAll('[data-editor-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const cmd = btn.getAttribute('data-editor-cmd');
        document.execCommand(cmd, false, null);
      });
    });
  }

  /* ── Init all ───────────────────────────────────────────── */
  function init() {
    initTheme();
    initSidebar();
    initDropdowns();
    initModals();
    initTabs();
    initToastTriggers();
    initTableSearch();
    initFilterChips();
    initSelectFilters();
    initTableSort();
    initPagination();
    initChartAnimations();
    initSkeletons();
    initMessagePane();
    initConfirmActions();
    initPasswordToggle();
    initLogin();
    initStarToggles();
    initLightbox();
    initMobileSearch();
    initCheckinToggles();
    initEditor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose showToast globally for inline onclick attributes
  window.AdminApp = { showToast: showToast, openModal: openModal, closeModal: closeModal };
})();
