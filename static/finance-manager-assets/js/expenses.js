/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Expenses Module
   ============================================ */

/**
 * Expenses Module
 * Handles expense filtering, approval workflow, and allocation monitoring
 */

const Expenses = {
  init() {
    this.bindEvents();
    this.updateCounter();
    this.updateAllocationMonitor();
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
    
    // Expense row actions
    document.querySelectorAll('[data-action="approve"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleApprove(row);
      });
    });
    
    document.querySelectorAll('[data-action="reject"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleReject(row);
      });
    });
    
    document.querySelectorAll('[data-action="mark-paid"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleMarkPaid(row);
      });
    });
    
    // Export
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        App.exportTableToCSV('expenses-table', 'expenses-export.csv');
      });
    }
  },
  
  filter() {
    const searchValue = document.querySelector('[data-filter="search"]')?.value?.toLowerCase() || '';
    const categoryValue = document.querySelector('[data-filter="category"]')?.value || 'all';
    const statusValue = document.querySelector('[data-filter="status"]')?.value || 'all';
    
    const rows = document.querySelectorAll('#expenses-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
      let show = true;
      
      // Category filter
      if (categoryValue !== 'all' && row.dataset.category !== categoryValue) {
        show = false;
      }
      
      // Status filter
      if (statusValue !== 'all' && row.dataset.status !== statusValue) {
        show = false;
      }
      
      // Search filter
      if (searchValue) {
        const searchText = row.textContent.toLowerCase();
        if (!searchText.includes(searchValue)) {
          show = false;
        }
      }
      
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    
    this.handleEmptyState(visibleCount);
    this.updateCounter();
  },
  
  handleApprove(row) {
    UI.confirm('Are you sure you want to approve this expense?', () => {
      const statusBadge = row.querySelector('.status-cell .badge');
      if (statusBadge) {
        statusBadge.className = 'badge badge-success';
        statusBadge.textContent = 'Approved';
      }
      
      row.dataset.status = 'approved';
      
      UI.showToast('Expense approved', 'success');
      this.updateAllocationMonitor();
    });
  },
  
  handleReject(row) {
    UI.confirm('Are you sure you want to reject this expense?', () => {
      const statusBadge = row.querySelector('.status-cell .badge');
      if (statusBadge) {
        statusBadge.className = 'badge badge-danger';
        statusBadge.textContent = 'Rejected';
      }
      
      row.dataset.status = 'rejected';
      
      UI.showToast('Expense rejected', 'warning');
    });
  },
  
  handleMarkPaid(row) {
    const statusBadge = row.querySelector('.status-cell .badge');
    if (statusBadge) {
      statusBadge.className = 'badge badge-success';
      statusBadge.textContent = 'Paid';
    }
    
    row.dataset.paymentStatus = 'paid';
    
    UI.showToast('Expense marked as paid', 'success');
  },
  
  handleEmptyState(visibleCount) {
    let emptyState = document.querySelector('.expenses-empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state expenses-empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 14l4-4-4-4M5 20h14a2 2 0 002-2V8l-7-5-7 5v10a2 2 0 002 2z"/>
          </svg>
          <h4 class="empty-state-title">No expenses found</h4>
          <p class="empty-state-message">Try adjusting your search or filter criteria</p>
        `;
        document.querySelector('.table-container')?.appendChild(emptyState);
      }
      emptyState.style.display = 'block';
    } else if (emptyState) {
      emptyState.style.display = 'none';
    }
  },
  
  updateCounter() {
    const visibleRows = document.querySelectorAll('#expenses-table tbody tr[style=""]');
    const counterEl = document.querySelector('[data-counter="expenses"]');
    
    if (counterEl) {
      counterEl.textContent = `${visibleRows.length} expenses`;
    }
  },
  
  updateAllocationMonitor() {
    // Update allocation monitor based on expense categories
    const programExpenses = document.querySelectorAll('[data-category="program"]');
    const adminExpenses = document.querySelectorAll('[data-category="administration"]');
    const fundraisingExpenses = document.querySelectorAll('[data-category="fundraising"]');
    
    // Calculate totals (in a real app, this would sum actual amounts)
    const programCount = programExpenses.length;
    const adminCount = adminExpenses.length;
    const fundraisingCount = fundraisingExpenses.length;
    const total = programCount + adminCount + fundraisingCount;
    
    if (total === 0) return;
    
    // Update allocation bars
    const programBar = document.querySelector('[data-allocation="program"] .allocation-fill');
    const adminBar = document.querySelector('[data-allocation="administration"] .allocation-fill');
    const fundraisingBar = document.querySelector('[data-allocation="fundraising"] .allocation-fill');
    
    if (programBar) {
      const percent = Math.round((programCount / total) * 100);
      programBar.style.width = `${percent}%`;
      
      const valueEl = programBar.parentElement.parentElement.querySelector('.allocation-value');
      if (valueEl) valueEl.textContent = `${percent}%`;
    }
    
    if (adminBar) {
      const percent = Math.round((adminCount / total) * 100);
      adminBar.style.width = `${percent}%`;
      
      const valueEl = adminBar.parentElement.parentElement.querySelector('.allocation-value');
      if (valueEl) valueEl.textContent = `${percent}%`;
    }
    
    if (fundraisingBar) {
      const percent = Math.round((fundraisingCount / total) * 100);
      fundraisingBar.style.width = `${percent}%`;
      
      const valueEl = fundraisingBar.parentElement.parentElement.querySelector('.allocation-value');
      if (valueEl) valueEl.textContent = `${percent}%`;
    }
  }
};
