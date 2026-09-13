/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Layout JavaScript
   ============================================ */

/**
 * Layout Module
 * Handles sidebar, header, and navigation functionality
 */

const Layout = {
  sidebar: null,
  sidebarToggle: null,
  sidebarOverlay: null,
  themeToggle: null,
  
  init() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarToggle = document.querySelector('.sidebar-toggle');
    this.sidebarOverlay = document.querySelector('.sidebar-overlay');
    this.themeToggle = document.querySelector('.theme-toggle');
    
    this.bindEvents();
    this.initTheme();
    this.initMobileNav();
    this.setActiveNavItem();
  },
  
  bindEvents() {
    // Sidebar toggle
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Sidebar overlay click
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    }
    
    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Close sidebar on Escape
      if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
        this.closeSidebar();
      }
      
      // Global search shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openGlobalSearch();
      }
    });
    
    // Window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.closeSidebar();
      }
    });
  },
  
  toggleSidebar() {
    this.sidebar?.classList.toggle('open');
    this.sidebarOverlay?.classList.toggle('active');
    document.body.style.overflow = this.sidebar?.classList.contains('open') ? 'hidden' : '';
  },
  
  closeSidebar() {
    this.sidebar?.classList.remove('open');
    this.sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    this.updateThemeIcon();
  },
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.updateThemeIcon();
  },
  
  updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const icon = this.themeToggle?.querySelector('svg');
    
    if (icon) {
      if (theme === 'dark') {
        icon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="none" stroke="currentColor"/>';
      } else {
        icon.innerHTML = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="none" stroke="currentColor"/>';
      }
    }
  },
  
  initMobileNav() {
    // Handle nav item clicks on mobile
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          this.closeSidebar();
        }
      });
    });
  },
  
  setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },
  
  openGlobalSearch() {
    const searchModal = document.getElementById('global-search-modal');
    if (searchModal) {
      const overlay = searchModal.querySelector('.modal-overlay');
      const input = searchModal.querySelector('input');
      
      overlay?.classList.add('active');
      input?.focus();
    }
  }
};

// Initialize layout when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});
