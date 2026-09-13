/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Main Application
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // THEME MANAGEMENT
  // ============================================
  
  const ThemeManager = {
    init() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      this.setTheme(savedTheme);
      this.bindEvents();
    },
    
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
    
    toggle() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },
    
    bindEvents() {
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggle());
      }
    }
  };

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  
  const ToastManager = {
    container: null,
    
    init() {
      this.container = document.getElementById('toast-container');
    },
    
    show(message, type = 'info', title = null) {
      if (!this.container) this.init();
      
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const icons = {
        success: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        warning: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
        error: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        info: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      };
      
      toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
          ${title ? `<div class="toast-title">${title}</div>` : ''}
          <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      `;
      
      this.container.appendChild(toast);
      
      // Animate in
      requestAnimationFrame(() => {
        toast.classList.add('active');
      });
      
      // Close button
      toast.querySelector('.toast-close').addEventListener('click', () => {
        this.remove(toast);
      });
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        this.remove(toast);
      }, 5000);
    },
    
    remove(toast) {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 300);
    },
    
    success(message, title = null) {
      this.show(message, 'success', title);
    },
    
    warning(message, title = null) {
      this.show(message, 'warning', title);
    },
    
    error(message, title = null) {
      this.show(message, 'error', title);
    },
    
    info(message, title = null) {
      this.show(message, 'info', title);
    }
  };

  // ============================================
  // MODAL MANAGEMENT
  // ============================================
  
  const ModalManager = {
    activeModal: null,
    
    init() {
      this.bindEvents();
    },
    
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      
      this.activeModal = modal;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus first input
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    },
    
    close(modal = null) {
      const targetModal = modal || this.activeModal;
      if (!targetModal) return;
      
      targetModal.classList.remove('active');
      document.body.style.overflow = '';
      this.activeModal = null;
    },
    
    closeAll() {
      document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
      this.activeModal = null;
    },
    
    bindEvents() {
      // Close button clicks
      document.addEventListener('click', (e) => {
        if (e.target.closest('[data-modal-close]')) {
          const modal = e.target.closest('.modal-backdrop');
          if (modal) this.close(modal);
        }
        
        // Backdrop click
        if (e.target.classList.contains('modal-backdrop')) {
          this.close(e.target);
        }
      });
      
      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close();
        }
      });
    }
  };

  // ============================================
  // CONFIRMATION DIALOG
  // ============================================
  
  const ConfirmDialog = {
    callback: null,
    
    init() {
      this.bindEvents();
    },
    
    show(title, message, callback) {
      const modal = document.getElementById('confirm-modal');
      if (!modal) return;
      
      document.getElementById('confirm-title').textContent = title;
      document.getElementById('confirm-message').textContent = message;
      this.callback = callback;
      
      ModalManager.open('confirm-modal');
    },
    
    bindEvents() {
      document.getElementById('confirm-action')?.addEventListener('click', () => {
        if (this.callback) this.callback();
        ModalManager.close();
      });
    }
  };

  // ============================================
  // DROPDOWN MANAGEMENT
  // ============================================
  
  const DropdownManager = {
    init() {
      this.bindEvents();
    },
    
    bindEvents() {
      document.addEventListener('click', (e) => {
        const toggle = e.target.closest('[data-dropdown-toggle]');
        
        if (toggle) {
          e.stopPropagation();
          const dropdown = toggle.closest('.dropdown');
          const menu = dropdown?.querySelector('.dropdown-menu');
          
          // Close all other dropdowns
          document.querySelectorAll('.dropdown-menu.active').forEach(m => {
            if (m !== menu) m.classList.remove('active');
          });
          
          if (menu) {
            menu.classList.toggle('active');
          }
        } else if (!e.target.closest('.dropdown')) {
          // Close all dropdowns when clicking outside
          document.querySelectorAll('.dropdown-menu.active').forEach(m => {
            m.classList.remove('active');
          });
        }
      });
      
      // Dropdown item clicks
      document.addEventListener('click', (e) => {
        const item = e.target.closest('.dropdown-item');
        if (item && !item.classList.contains('dropdown-divider')) {
          const menu = item.closest('.dropdown-menu');
          if (menu) {
            menu.classList.remove('active');
          }
        }
      });
    }
  };

  // ============================================
  // NOTIFICATION CENTER
  // ============================================
  
  const NotificationCenter = {
    init() {
      this.bindEvents();
    },
    
    bindEvents() {
      const notificationBtn = document.getElementById('notification-btn');
      const dropdown = document.getElementById('notification-dropdown');
      
      if (notificationBtn && dropdown) {
        notificationBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
          if (!e.target.closest('.dropdown') && !e.target.closest('#notification-btn')) {
            dropdown.classList.remove('active');
          }
        });
      }
    }
  };

  // ============================================
  // SEARCH OVERLAY
  // ============================================
  
  const SearchOverlay = {
    init() {
      this.bindEvents();
    },
    
    open() {
      const overlay = document.getElementById('search-overlay');
      if (overlay) {
        overlay.classList.add('active');
        const input = document.getElementById('search-input');
        if (input) setTimeout(() => input.focus(), 100);
        document.body.style.overflow = 'hidden';
      }
    },
    
    close() {
      const overlay = document.getElementById('search-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    },
    
    bindEvents() {
      // Keyboard shortcut
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.open();
        }
        if (e.key === 'Escape') {
          this.close();
        }
      });
      
      // Close button
      document.getElementById('search-close')?.addEventListener('click', () => {
        this.close();
      });
      
      // Backdrop click
      document.getElementById('search-overlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'search-overlay') {
          this.close();
        }
      });
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    ThemeManager.init();
    ToastManager.init();
    ModalManager.init();
    ConfirmDialog.init();
    DropdownManager.init();
    NotificationCenter.init();
    SearchOverlay.init();
    
    console.log('Unke Liye Volunteer Manager initialized');
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose to global scope for other modules
  window.Toast = ToastManager;
  window.Modal = ModalManager;
  window.Confirm = ConfirmDialog;
  
})();
