/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Donors Module
   ============================================ */

/**
 * Donors Module
 * Handles donor filtering, search, and profile navigation
 */

const Donors = {
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
    
    // Type filter
    const typeFilter = document.querySelector('[data-filter="type"]');
    if (typeFilter) {
      typeFilter.addEventListener('change', () => {
        this.filter();
      });
    }
    
    // Donor profile navigation
    document.querySelectorAll('[data-donor-profile]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const donorId = link.dataset.donorProfile;
        window.location.href = `donor-profile.html?id=${donorId}`;
      });
    });
    
    // Export
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        App.exportTableToCSV('donors-table', 'donors-export.csv');
      });
    }
  },
  
  filter() {
    const searchValue = document.querySelector('[data-filter="search"]')?.value?.toLowerCase() || '';
    const typeValue = document.querySelector('[data-filter="type"]')?.value || 'all';
    
    const rows = document.querySelectorAll('#donors-table tbody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
      let show = true;
      
      // Type filter
      if (typeValue !== 'all' && row.dataset.type !== typeValue) {
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
  
  handleEmptyState(visibleCount) {
    let emptyState = document.querySelector('.donors-empty-state');
    
    if (visibleCount === 0) {
      if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state donors-empty-state';
        emptyState.innerHTML = `
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          <h4 class="empty-state-title">No donors found</h4>
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
    const visibleRows = document.querySelectorAll('#donors-table tbody tr[style=""]');
    const counterEl = document.querySelector('[data-counter="donors"]');
    
    if (counterEl) {
      counterEl.textContent = `${visibleRows.length} donors`;
    }
  }
};
