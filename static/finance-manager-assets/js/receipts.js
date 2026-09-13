/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Receipts Module
   ============================================ */

/**
 * Receipts Module
 * Handles receipt filtering, preview, and 80G workflow
 */

const Receipts = {
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
    
    // Status filter
    const statusFilter = document.querySelector('[data-filter="status"]');
    if (statusFilter) {
      statusFilter.addEventListener('change', () => {
        this.filter();
      });
    }
    
    // PAN status filter
    const panFilter = document.querySelector('[data-filter="pan-status"]');
    if (panFilter) {
      panFilter.addEventListener('change', () => {
        this.filter();
      });
    }
    
    // Receipt actions
    document.querySelectorAll('[data-action="preview"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.openReceiptPreview(row);
      });
    });
    
    document.querySelectorAll('[data-action="generate"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleGenerate(row);
      });
    });
    
    document.querySelectorAll('[data-action="mark-sent"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleMarkSent(row);
      });
    });
    
    document.querySelectorAll('[data-action="flag"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('tr');
        this.handleFlag(row);
      });
    });
    
    // Export
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        App.exportTableToCSV('receipts-table', 'receipts-export.csv');
      });
    }
    
    // Print receipt
    const printBtn = document.querySelector('[data-action="print-receipt"]');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },
  
  filter() {
    const searchValue = document.querySelector('[data-filter="search"]')?.value?.toLowerCase() || '';
    const statusValue = document.querySelector('[data-filter="status"]')?.value || 'all';
    const panValue = document.querySelector('[data-filter="pan-status"]')?.value || 'all';
    
    const rows = document.querySelectorAll('#receipts-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
      let show = true;
      
      // Status filter
      if (statusValue !== 'all') {
        const rowStatus = row.querySelector('.status-cell .badge')?.textContent?.toLowerCase() || '';
        if (!rowStatus.includes(statusValue.toLowerCase())) {
          show = false;
        }
      }
      
      // PAN status filter
      if (panValue !== 'all' && row.dataset.panStatus !== panValue) {
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
  
  openReceiptPreview(row) {
    const modal = document.getElementById('receipt-preview-modal');
    if (!modal) return;
    
    // Extract data from row
    const receiptId = row.cells[0]?.textContent || '';
    const txnId = row.cells[1]?.textContent || '';
    const donorName = row.querySelector('.donor-name')?.textContent || '';
    const amount = row.querySelector('.amount-cell')?.textContent || '';
    const campaign = row.querySelector('.campaign-pill')?.textContent || '';
    const date = row.querySelector('.date-cell')?.textContent || '';
    const panStatus = row.dataset.panStatus || 'Not Provided';
    
    // Populate preview
    modal.querySelector('[data-field="receipt-number"]')!.textContent = receiptId;
    modal.querySelector('[data-field="txn-id"]')!.textContent = txnId;
    modal.querySelector('[data-field="donor-name"]')!.textContent = donorName;
    modal.querySelector('[data-field="amount"]')!.textContent = amount;
    modal.querySelector('[data-field="campaign"]')!.textContent = campaign;
    modal.querySelector('[data-field="date"]')!.textContent = date;
    modal.querySelector('[data-field="pan-status"]')!.textContent = panStatus;
    
    UI.openModal('receipt-preview-modal');
  },
  
  handleGenerate(row) {
    const panStatus = row.dataset.panStatus;
    
    if (panStatus === 'missing') {
      UI.showToast('PAN information is required for 80G receipt generation', 'warning');
      return;
    }
    
    UI.confirm('Generate receipt for this donation?', () => {
      const statusBadge = row.querySelector('.status-cell .badge');
      if (statusBadge) {
        statusBadge.className = 'badge badge-success';
        statusBadge.textContent = 'Generated';
      }
      
      UI.showToast('Receipt generated successfully', 'success');
    });
  },
  
  handleMarkSent(row) {
    const statusBadge = row.querySelector('.status-cell .badge');
    if (statusBadge) {
      statusBadge.className = 'badge badge-info';
      statusBadge.textContent = 'Sent';
    }
    
    UI.showToast('Receipt marked as sent', 'success');
  },
  
  handleFlag(row) {
    UI.confirm('Flag this receipt for compliance review?', () => {
      const statusBadge = row.querySelector('.status-cell .badge');
      if (statusBadge) {
        statusBadge.className = 'badge badge-warning';
        statusBadge.textContent = 'Needs Review';
      }
      
      UI.showToast('Receipt flagged for review', 'warning');
    });
  },
  
  handleEmptyState(visibleCount) {
    let emptyState = document.querySelector('.receipts-empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state receipts-empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h4 class="empty-state-title">No receipts found</h4>
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
    const visibleRows = document.querySelectorAll('#receipts-table tbody tr[style=""]');
    const counterEl = document.querySelector('[data-counter="receipts"]');
    
    if (counterEl) {
      counterEl.textContent = `${visibleRows.length} receipts`;
    }
  }
};
