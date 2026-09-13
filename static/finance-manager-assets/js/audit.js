/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Audit Module
   ============================================ */

/**
 * Audit Module
 * Handles audit log filtering and display
 */

const Audit = {
  init() {
    this.bindEvents();
    this.updateCounter();
  },
  
  bindEvents() {
    // Search
    const searchInput = document.querySelector('[data-filter="search"]');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.filter();
      });
    }
    
    // Category filter
    const categoryFilter = document.querySelector('[data-filter="category"]');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => {
        this.filter();
      });
    }
    
    // Status filter
    const statusFilter = document.querySelector('[data-filter="status"]');
    if (statusFilter) {
      statusFilter.addEventListener('change', () => {
        this.filter();
      });
    }
    
    // Export
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportAuditLog();
      });
    }
  },
  
  filter() {
    const searchValue = document.querySelector('[data-filter="search"]')?.value?.toLowerCase() || '';
    const categoryValue = document.querySelector('[data-filter="category"]')?.value || 'all';
    const statusValue = document.querySelector('[data-filter="status"]')?.value || 'all';
    
    const entries = document.querySelectorAll('.audit-entry');
    let visibleCount = 0;
    
    entries.forEach(entry => {
      let show = true;
      
      // Category filter
      if (categoryValue !== 'all') {
        const categoryEl = entry.querySelector('.audit-category');
        const categoryText = categoryEl?.textContent?.toLowerCase() || '';
        if (!categoryText.includes(categoryValue.toLowerCase())) {
          show = false;
        }
      }
      
      // Status filter
      if (statusValue !== 'all') {
        const statusEl = entry.querySelector('.audit-status .badge');
        const statusText = statusEl?.textContent?.toLowerCase() || '';
        if (!statusText.includes(statusValue.toLowerCase())) {
          show = false;
        }
      }
      
      // Search filter
      if (searchValue) {
        const searchText = entry.textContent.toLowerCase();
        if (!searchText.includes(searchValue)) {
          show = false;
        }
      }
      
      entry.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    
    this.handleEmptyState(visibleCount);
    this.updateCounter();
  },
  
  handleEmptyState(visibleCount) {
    let emptyState = document.querySelector('.audit-empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state audit-empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <h4 class="empty-state-title">No audit entries found</h4>
          <p class="empty-state-message">Try adjusting your search or filter criteria</p>
        `;
        document.querySelector('.audit-log-container')?.appendChild(emptyState);
      }
      emptyState.style.display = 'block';
    } else if (emptyState) {
      emptyState.style.display = 'none';
    }
  },
  
  updateCounter() {
    const visibleEntries = document.querySelectorAll('.audit-entry[style=""]');
    const counterEl = document.querySelector('[data-counter="audit"]');
    
    if (counterEl) {
      counterEl.textContent = `${visibleEntries.length} entries`;
    }
  },
  
  exportAuditLog() {
    const entries = document.querySelectorAll('.audit-entry');
    const csv = ['Timestamp,User,Action,Record,Category,Status'];
    
    entries.forEach(entry => {
      if (entry.style.display !== 'none') {
        const timestamp = entry.querySelector('.audit-timestamp')?.textContent?.trim() || '';
        const user = entry.querySelector('.audit-user')?.textContent?.trim() || '';
        const action = entry.querySelector('.audit-action')?.textContent?.trim() || '';
        const record = entry.querySelector('.audit-record')?.textContent?.trim() || '';
        const category = entry.querySelector('.audit-category')?.textContent?.trim() || '';
        const status = entry.querySelector('.audit-status .badge')?.textContent?.trim() || '';
        
        csv.push(`"${timestamp}","${user}","${action}","${record}","${category}","${status}"`);
      }
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'audit-log-export.csv';
    link.click();
    
    UI.showToast('Audit log exported', 'success');
  }
};
