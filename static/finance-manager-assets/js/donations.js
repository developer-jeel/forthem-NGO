/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Donations Module
   ============================================ */

/**
 * Donations Module
 * Handles donation filtering, sorting, pagination, and modals
 */

const Donations = {
  currentPage: 1,
  rowsPerPage: 10,
  
  init() {
    this.bindEvents();
    this.initPagination();
    this.updateCounter();
  },
  
  bindEvents() {
    // Search
    const searchInput = document.querySelector('[data-filter="search"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filter();
      });
    }
    
    // Filters
    document.querySelectorAll('[data-filter]').forEach(filter => {
      if (filter.dataset.filter !== 'search') {
        filter.addEventListener('change', () => {
          this.filter();
        });
      }
    });
    
    // Sort headers
    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        this.sort(th);
      });
    });
    
    // Row click for modal
    document.querySelectorAll('#donations-table tbody tr').forEach(row => {
      row.addEventListener('click', (e) => {
        if (!e.target.closest('.table-actions') && !e.target.closest('input')) {
          this.openDonationDetail(row);
        }
      });
    });
    
    // Record donation form
    const recordForm = document.getElementById('record-donation-form');
    if (recordForm) {
      recordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRecordDonation(recordForm);
      });
    }
    
    // Export button
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        App.exportTableToCSV('donations-table', 'donations-export.csv');
      });
    }
  },
  
  getFilters() {
    return {
      search: document.querySelector('[data-filter="search"]')?.value || '',
      status: document.querySelector('[data-filter="status"]')?.value || 'all',
      payment: document.querySelector('[data-filter="payment"]')?.value || 'all',
      campaign: document.querySelector('[data-filter="campaign"]')?.value || 'all',
      donorType: document.querySelector('[data-filter="donor-type"]')?.value || 'all'
    };
  },
  
  filter() {
    const filters = this.getFilters();
    const rows = document.querySelectorAll('#donations-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
      let show = true;
      
      // Status filter
      if (filters.status !== 'all' && row.dataset.status !== filters.status) {
        show = false;
      }
      
      // Payment filter
      if (filters.payment !== 'all' && row.dataset.payment !== filters.payment) {
        show = false;
      }
      
      // Campaign filter
      if (filters.campaign !== 'all' && row.dataset.campaign !== filters.campaign) {
        show = false;
      }
      
      // Donor type filter
      if (filters.donorType !== 'all' && row.dataset.donorType !== filters.donorType) {
        show = false;
      }
      
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
    
    this.handleEmptyState(visibleCount);
    this.updateCounter();
    this.currentPage = 1;
    this.updatePagination();
  },
  
  sort(th) {
    const table = document.getElementById('donations-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const index = Array.from(th.parentNode.children).indexOf(th);
    const isAscending = th.classList.contains('asc');
    
    // Remove sort classes from all headers
    table.querySelectorAll('th').forEach(header => {
      header.classList.remove('asc', 'desc', 'sorted');
    });
    
    // Add sort class to clicked header
    th.classList.add(isAscending ? 'desc' : 'asc', 'sorted');
    
    // Sort rows
    rows.sort((a, b) => {
      const aText = a.children[index]?.textContent || '';
      const bText = b.children[index]?.textContent || '';
      
      // Check if numeric (amount)
      const aNum = parseFloat(aText.replace(/[^0-9.-]+/g, ''));
      const bNum = parseFloat(bText.replace(/[^0-9.-]+/g, ''));
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return isAscending ? bNum - aNum : aNum - bNum;
      }
      
      // Date comparison
      if (aText.match(/\d{1,2}\/\d{1,2}\/\d{4}/) && bText.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
        const aDate = new Date(aText.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0]);
        const bDate = new Date(bText.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0]);
        return isAscending ? bDate - aDate : aDate - bDate;
      }
      
      // String comparison
      return isAscending 
        ? bText.localeCompare(aText) 
        : aText.localeCompare(bText);
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
  },
  
  initPagination() {
    const prevBtn = document.querySelector('[data-pagination="prev"]');
    const nextBtn = document.querySelector('[data-pagination="next"]');
    
    prevBtn?.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    });
    
    nextBtn?.addEventListener('click', () => {
      const totalPages = this.getTotalPages();
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.updatePagination();
      }
    });
    
    this.updatePagination();
  },
  
  getTotalPages() {
    const visibleRows = document.querySelectorAll('#donations-table tbody tr[style=""]');
    return Math.max(1, Math.ceil(visibleRows.length / this.rowsPerPage));
  },
  
  updatePagination() {
    const rows = document.querySelectorAll('#donations-table tbody tr');
    const filteredRows = Array.from(rows).filter(row => row.style.display !== 'none');
    
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    
    rows.forEach((row, index) => {
      if (row.style.display === 'none') {
        row.style.display = 'none';
      } else {
        row.style.display = (index >= start && index < end) ? '' : 'none';
      }
    });
    
    const totalPages = Math.ceil(filteredRows.length / this.rowsPerPage);
    const infoEl = document.querySelector('[data-pagination="info"]');
    const prevBtn = document.querySelector('[data-pagination="prev"]');
    const nextBtn = document.querySelector('[data-pagination="next"]');
    
    if (infoEl) {
      infoEl.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }
    
    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = this.currentPage === totalPages;
    }
  },
  
  handleEmptyState(visibleCount) {
    let emptyState = document.querySelector('.donations-empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state donations-empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h4 class="empty-state-title">No transactions match your filters</h4>
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
    const visibleRows = document.querySelectorAll('#donations-table tbody tr[style=""]');
    const counterEl = document.querySelector('[data-counter="donations"]');
    
    if (counterEl) {
      counterEl.textContent = `${visibleRows.length} transactions`;
    }
  },
  
  openDonationDetail(row) {
    const modal = document.getElementById('donation-detail-modal');
    if (!modal) return;
    
    // Populate modal with row data
    const txnId = row.querySelector('.txn-id')?.textContent || '';
    const donorName = row.querySelector('.donor-name')?.textContent || '';
    const donorEmail = row.querySelector('.donor-email')?.textContent || '';
    const amount = row.querySelector('.amount-cell')?.textContent || '';
    const campaign = row.querySelector('.campaign-pill')?.textContent || '';
    const payment = row.querySelector('.payment-method')?.textContent || '';
    const date = row.querySelector('.date-cell')?.textContent || '';
    const status = row.querySelector('.badge')?.textContent || '';
    const panStatus = row.dataset.panStatus || 'Not Provided';
    
    modal.querySelector('[data-field="txn-id"]')!.textContent = txnId;
    modal.querySelector('[data-field="donor-name"]')!.textContent = donorName;
    modal.querySelector('[data-field="donor-email"]')!.textContent = donorEmail;
    modal.querySelector('[data-field="amount"]')!.textContent = amount;
    modal.querySelector('[data-field="campaign"]')!.textContent = campaign;
    modal.querySelector('[data-field="payment"]')!.textContent = payment;
    modal.querySelector('[data-field="date"]')!.textContent = date;
    modal.querySelector('[data-field="status"]')!.className = `badge badge-${status.toLowerCase().replace(' ', '-')}`;
    modal.querySelector('[data-field="status"]')!.textContent = status;
    modal.querySelector('[data-field="pan-status"]')!.textContent = panStatus;
    
    UI.openModal('donation-detail-modal');
  },
  
  handleRecordDonation(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.donorName || !data.amount || !data.campaign || !data.paymentMode) {
      UI.showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Validate amount
    if (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0) {
      UI.showToast('Please enter a valid amount', 'error');
      return;
    }
    
    // Validate email
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      UI.showToast('Please enter a valid email address', 'error');
      return;
    }
    
    // Validate PAN format if provided
    if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan.toUpperCase())) {
      UI.showToast('PAN format should be ABCDE1234F', 'warning');
      return;
    }
    
    // Simulate adding donation
    UI.showToast('Donation recorded successfully', 'success');
    form.reset();
    UI.closeModal(document.querySelector('#record-donation-modal'));
    
    // In a real app, this would add a row to the table
    // For this prototype, we just show success
  }
};
