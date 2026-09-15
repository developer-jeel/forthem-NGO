/* ============================================================
   SHARED PLATFORM UI — UNKE LIYE NGO
   static/shared/js/platform-ui.js
   ============================================================ */
(function() {
  'use strict';

  function showToast(msg, type = 'info', title = '') {
    if (window.showToast) {
      window.showToast(type, title || (type === 'success' ? 'Success' : 'Notification'), msg);
      return;
    }

    let region = document.getElementById('toast-region') || document.querySelector('.toast-container');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.className = 'toast-region';
      document.body.appendChild(region);
    }

    const toast = document.createElement('div');
    toast.className = `toast show`;
    toast.style.position = 'relative';
    toast.style.animation = 'fadeUp 0.3s ease forwards';
    toast.innerHTML = `
      <div class="toast-body">
        <div class="toast-title" style="font-weight:600;font-size:0.875rem;">${title || (type === 'success' ? 'Success' : 'Notice')}</div>
        <div class="toast-msg" style="font-size:0.8125rem;">${msg}</div>
      </div>
      <div class="toast-bar ${type}" style="position:absolute;bottom:0;left:0;height:3px;background:var(--accent-terracotta,#c0552a);width:100%;"></div>
    `;
    region.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('rm-theme', next); } catch (e) {}
  }

  window.PlatformUI = {
    showToast: showToast,
    toggleTheme: toggleTheme
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });
  });
})();
