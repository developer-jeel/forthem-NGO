/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Main Application
   ============================================ */

/**
 * Main Application Module
 * Coordinates all modules and global functionality
 */

const App = {
  version: '1.0.0',
  
  init() {
    console.log('Unke Liye Finance Manager Panel v' + this.version);
    
    // Initialize all modules
    this.initModules();
    
    // Initialize page-specific functionality
    this.initPageSpecific();
    
    // Initialize global features
    this.initGlobalFeatures();
  },
  
  initModules() {
    // Layout and UI modules are auto-initialized via their DOMContentLoaded listeners
  },
  
  initPageSpecific() {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    // Initialize page-specific modules
    if (page === 'donations.html' && typeof Donations !== 'undefined') {
      Donations.init();
    }
    
    if (page === 'donors.html' && typeof Donors !== 'undefined') {
      Donors.init();
    }
    
    if (page === 'campaigns.html' && typeof Campaigns !== 'undefined') {
      Campaigns.init();
    }
    
    if (page === 'expenses.html' && typeof Expenses !== 'undefined') {
      Expenses.init();
    }
    
    if (page === 'receipts.html' && typeof Receipts !== 'undefined') {
      Receipts.init();
    }
    
    if (page === 'reports.html' && typeof Reports !== 'undefined') {
      Reports.init();
    }
    
    if (page === 'audit-log.html' && typeof Audit !== 'undefined') {
      Audit.init();
    }
  },
  
  initGlobalFeatures() {
    // Initialize number formatting
    this.initNumberFormatting();
    
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize print functionality
    this.initPrint();
  },
  
  initNumberFormatting() {
    // Format all elements with data-format="currency"
    document.querySelectorAll('[data-format="currency"]').forEach(el => {
      const value = parseFloat(el.textContent.replace(/[^0-9.-]+/g, ''));
      if (!isNaN(value)) {
        el.textContent = this.formatCurrency(value);
      }
    });
  },
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  },
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  },
  
  formatDateTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },
  
  initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        tooltip.style.cssText = `
          position: absolute;
          background: var(--text-primary);
          color: var(--text-inverse);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
        `;
        document.body.appendChild(tooltip);
        
        const rect = el.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
        
        el._tooltip = tooltip;
      });
      
      el.addEventListener('mouseleave', () => {
        if (el._tooltip) {
          el._tooltip.remove();
          el._tooltip = null;
        }
      });
    });
  },
  
  initPrint() {
    const printBtn = document.querySelector('[data-action="print"]');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },
  
  // Export table to CSV
  exportTableToCSV(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId);
    if (!table) {
      UI.showToast('Table not found', 'error');
      return;
    }
    
    const rows = table.querySelectorAll('tr');
    const csv = [];
    
    rows.forEach(row => {
      const cols = row.querySelectorAll('th, td');
      const rowData = [];
      
      cols.forEach(col => {
        // Skip checkbox columns
        if (col.querySelector('input[type="checkbox"]')) {
          return;
        }
        
        // Skip action buttons
        if (col.querySelector('.table-actions')) {
          return;
        }
        
        let text = col.textContent.trim();
        text = text.replace(/"/g, '""'); // Escape quotes
        rowData.push(`"${text}"`);
      });
      
      if (rowData.length > 0) {
        csv.push(rowData.join(','));
      }
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    UI.showToast('Export successful', 'success');
  },
  
  // Get all rows from a table
  getTableRows(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return [];
    
    return Array.from(table.querySelectorAll('tbody tr'));
  },
  
  // Filter table rows
  filterTableRows(tableId, filters) {
    const rows = this.getTableRows(tableId);
    let visibleCount = 0;
    
    rows.forEach(row => {
      let show = true;
      
      Object.entries(filters).forEach(([key, value]) => {
        if (!value || value === 'all') return;
        
        const rowValue = row.dataset[key];
        if (rowValue && rowValue !== value) {
          show = false;
        }
      });
      
      // Search filter
      if (filters.search) {
        const searchText = row.textContent.toLowerCase();
        if (!searchText.includes(filters.search.toLowerCase())) {
          show = false;
        }
      }
      
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    
    // Show empty state if no results
    this.handleEmptyState(tableId, visibleCount);
    
    return visibleCount;
  },
  
  handleEmptyState(tableId, visibleCount) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    let emptyState = table.parentElement.querySelector('.empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h4 class="empty-state-title">No results found</h4>
          <p class="empty-state-message">Try adjusting your filters or search terms</p>
        `;
        table.parentElement.appendChild(emptyState);
      }
      emptyState.style.display = 'block';
    } else if (emptyState) {
      emptyState.style.display = 'none';
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
