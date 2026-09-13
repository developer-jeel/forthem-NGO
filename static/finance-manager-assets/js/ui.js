/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - UI Components JavaScript
   ============================================ */

/**
 * UI Module
 * Handles modals, toasts, and other UI components
 */

const UI = {
  toasts: [],
  
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Modal close buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.modal-close')) {
        const modal = e.target.closest('.modal-overlay');
        this.closeModal(modal);
      }
      
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal(e.target);
      }
    });
    
    // Modal keyboard handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          this.closeModal(activeModal);
        }
        
        const activeSearchModal = document.getElementById('global-search-modal');
        if (activeSearchModal) {
          const overlay = activeSearchModal.querySelector('.modal-overlay');
          if (overlay?.classList.contains('active')) {
            overlay.classList.remove('active');
          }
        }
      }
    });
    
    // Toast close buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.toast-close')) {
        const toast = e.target.closest('.toast');
        this.removeToast(toast);
      }
    });
  },
  
  // Modal Functions
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const overlay = modal.querySelector('.modal-overlay') || modal;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus first input or button
      const firstFocusable = overlay.querySelector('input, button, select, textarea');
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    }
  },
  
  closeModal(overlay) {
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },
  
  // Toast Functions
  showToast(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.toast-container') || this.createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('active');
    });
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast);
      }, duration);
    }
    
    return toast;
  },
  
  removeToast(toast) {
    if (toast) {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 250);
    }
  },
  
  createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  },
  
  // Confirmation Dialog
  confirm(message, onConfirm, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'confirm-modal-temp';
    modal.innerHTML = `
      <div class="modal" style="max-width: 400px;">
        <div class="modal-header">
          <h3 class="modal-title">Confirm Action</h3>
          <button class="modal-close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
          <button class="btn btn-danger" id="confirm-ok">Confirm</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#confirm-cancel');
    const okBtn = modal.querySelector('#confirm-ok');
    
    const cleanup = () => {
      cancelBtn?.removeEventListener('click', handleCancel);
      okBtn?.removeEventListener('click', handleOk);
      modal.remove();
    };
    
    const handleCancel = () => {
      cleanup();
      if (onCancel) onCancel();
    };
    
    const handleOk = () => {
      cleanup();
      if (onConfirm) onConfirm();
    };
    
    cancelBtn?.addEventListener('click', handleCancel);
    okBtn?.addEventListener('click', handleOk);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  // Global Search
  initGlobalSearch() {
    const searchModal = document.getElementById('global-search-modal');
    if (!searchModal) return;
    
    const input = searchModal.querySelector('input');
    const resultsContainer = searchModal.querySelector('.search-results');
    
    if (!input || !resultsContainer) return;
    
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length < 2) {
        resultsContainer.innerHTML = '<p class="text-center text-tertiary" style="padding: 2rem;">Type at least 2 characters to search</p>';
        return;
      }
      
      const results = this.searchContent(query);
      this.renderSearchResults(results, resultsContainer);
    });
    
    // Close on outside click
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        input.value = '';
        resultsContainer.innerHTML = '';
      }
    });
  },
  
  searchContent(query) {
    const results = [];
    
    // Search donations
    document.querySelectorAll('[data-txn-id]').forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        results.push({
          type: 'Transaction',
          title: row.querySelector('.donor-name')?.textContent || 'Unknown',
          subtitle: row.querySelector('.txn-id')?.textContent || '',
          href: '#'
        });
      }
    });
    
    // Search donors
    document.querySelectorAll('[data-donor-id]').forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        results.push({
          type: 'Donor',
          title: row.querySelector('.donor-name')?.textContent || 'Unknown',
          subtitle: row.querySelector('.donor-email')?.textContent || '',
          href: '#'
        });
      }
    });
    
    // Search campaigns
    document.querySelectorAll('[data-campaign-id]').forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        results.push({
          type: 'Campaign',
          title: card.querySelector('.campaign-name')?.textContent || 'Unknown',
          subtitle: card.querySelector('.campaign-pillar')?.textContent || '',
          href: '#'
        });
      }
    });
    
    return results.slice(0, 10);
  },
  
  renderSearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<p class="text-center text-tertiary" style="padding: 2rem;">No results found</p>';
      return;
    }
    
    container.innerHTML = results.map(result => `
      <div class="search-result-item">
        <div class="search-result-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <div class="search-result-content">
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-subtitle">${result.subtitle}</div>
        </div>
        <div class="search-result-type">${result.type}</div>
      </div>
    `).join('');
  }
};

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
  UI.initGlobalSearch();
});
