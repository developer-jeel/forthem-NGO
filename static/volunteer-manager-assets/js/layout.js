/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Layout & Navigation
   ============================================ */

(function() {
  'use strict';

  const Layout = {
    sidebar: null,
    overlay: null,
    menuToggle: null,
    
    init() {
      this.sidebar = document.getElementById('sidebar');
      this.overlay = document.getElementById('sidebar-overlay');
      this.menuToggle = document.getElementById('menu-toggle');
      
      this.bindEvents();
      this.setActiveNavigation();
    },
    
    openSidebar() {
      if (this.sidebar) {
        this.sidebar.classList.add('open');
      }
      if (this.overlay) {
        this.overlay.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    },
    
    closeSidebar() {
      if (this.sidebar) {
        this.sidebar.classList.remove('open');
      }
      if (this.overlay) {
        this.overlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    },
    
    toggleSidebar() {
      if (this.sidebar?.classList.contains('open')) {
        this.closeSidebar();
      } else {
        this.openSidebar();
      }
    },
    
    setActiveNavigation() {
      const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
      
      document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
          const hrefPage = href.split('#')[0];
          if (hrefPage === currentPage) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    },
    
    bindEvents() {
      // Menu toggle
      if (this.menuToggle) {
        this.menuToggle.addEventListener('click', () => {
          this.toggleSidebar();
        });
      }
      
      // Overlay click
      if (this.overlay) {
        this.overlay.addEventListener('click', () => {
          this.closeSidebar();
        });
      }
      
      // Close sidebar on nav item click (mobile)
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.closeSidebar();
          }
        });
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeSidebar();
        }
      });
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Layout.init());
  } else {
    Layout.init();
  }
  
  window.Layout = Layout;
  
})();
