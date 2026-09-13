/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Volunteers Page
   ============================================ */

(function() {
  'use strict';

  const Volunteers = {
    table: null,
    rows: [],
    currentPage: 1,
    rowsPerPage: 10,
    filteredRows: [],
    
    init() {
      this.table = document.getElementById('volunteers-table');
      if (!this.table) return;
      
      this.rows = Array.from(this.table.querySelectorAll('tbody tr'));
      this.filteredRows = [...this.rows];
      
      this.bindEvents();
      this.updatePagination();
    },
    
    bindEvents() {
      // Search
      document.getElementById('vol-search')?.addEventListener('input', (e) => {
        this.filterBySearch(e.target.value);
      });
      
      // Filters
      document.getElementById('filter-status')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-verification')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-city')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-skill')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-availability')?.addEventListener('change', () => this.applyFilters());
      
      // Clear filters
      document.getElementById('clear-filters')?.addEventListener('click', () => this.clearFilters());
      
      // Sorting
      document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
          const sortKey = header.dataset.sort;
          if (sortKey) this.sortBy(sortKey);
        });
      });
      
      // Pagination
      document.getElementById('prev-page')?.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updatePagination();
        }
      });
      
      document.getElementById('next-page')?.addEventListener('click', () => {
        const totalPages = Math.ceil(this.filteredRows.length / this.rowsPerPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.updatePagination();
        }
      });
      
      document.querySelectorAll('.pagination-btn:not(#prev-page):not(#next-page)').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentPage = parseInt(btn.textContent);
          this.updatePagination();
        });
      });
      
      // Select all checkbox
      document.getElementById('select-all')?.addEventListener('change', (e) => {
        const visibleCheckboxes = this.table.querySelectorAll('tbody tr:not(.hidden-row) .vol-checkbox');
        visibleCheckboxes.forEach(cb => {
          cb.checked = e.target.checked;
        });
      });
    },
    
    filterBySearch(query) {
      const searchTerm = query.toLowerCase().trim();
      
      this.filteredRows = this.rows.filter(row => {
        if (!searchTerm) return true;
        
        const name = row.querySelector('.table-cell-title')?.textContent?.toLowerCase() || '';
        const email = row.querySelector('.table-cell-subtitle')?.textContent?.toLowerCase() || '';
        const city = row.cells[2]?.textContent?.toLowerCase() || '';
        const skills = row.cells[3]?.textContent?.toLowerCase() || '';
        
        return name.includes(searchTerm) || 
               email.includes(searchTerm) || 
               city.includes(searchTerm) || 
               skills.includes(searchTerm);
      });
      
      this.applyFilters();
    },
    
    applyFilters() {
      const status = document.getElementById('filter-status')?.value || 'all';
      const verification = document.getElementById('filter-verification')?.value || 'all';
      const city = document.getElementById('filter-city')?.value || 'all';
      const skill = document.getElementById('filter-skill')?.value || 'all';
      const availability = document.getElementById('filter-availability')?.value || 'all';
      
      const searchQuery = document.getElementById('vol-search')?.value.toLowerCase().trim() || '';
      
      this.filteredRows = this.rows.filter(row => {
        // Search filter
        if (searchQuery) {
          const name = row.querySelector('.table-cell-title')?.textContent?.toLowerCase() || '';
          const email = row.querySelector('.table-cell-subtitle')?.textContent?.toLowerCase() || '';
          const rowCity = row.cells[2]?.textContent?.toLowerCase() || '';
          const skills = row.cells[3]?.textContent?.toLowerCase() || '';
          
          if (!name.includes(searchQuery) && 
              !email.includes(searchQuery) && 
              !rowCity.includes(searchQuery) && 
              !skills.includes(searchQuery)) {
            return false;
          }
        }
        
        // Status filter
        if (status !== 'all' && row.dataset.status !== status) return false;
        
        // Verification filter
        if (verification !== 'all' && row.dataset.verification !== verification) return false;
        
        // City filter
        if (city !== 'all' && row.dataset.city !== city) return false;
        
        // Skill filter
        if (skill !== 'all') {
          const rowSkills = row.dataset.skills || '';
          if (!rowSkills.includes(skill)) return false;
        }
        
        // Availability filter
        if (availability !== 'all' && row.dataset.availability !== availability) return false;
        
        return true;
      });
      
      this.currentPage = 1;
      this.updatePagination();
    },
    
    clearFilters() {
      document.getElementById('vol-search').value = '';
      document.getElementById('filter-status').value = 'all';
      document.getElementById('filter-verification').value = 'all';
      document.getElementById('filter-city').value = 'all';
      document.getElementById('filter-skill').value = 'all';
      document.getElementById('filter-availability').value = 'all';
      
      this.filteredRows = [...this.rows];
      this.currentPage = 1;
      this.updatePagination();
      
      Toast.info('Filters cleared');
    },
    
    sortBy(key) {
      const headers = document.querySelectorAll('.sortable');
      const currentHeader = document.querySelector(`[data-sort="${key}"]`);
      
      // Toggle sort direction
      const isAscending = currentHeader.classList.contains('asc');
      
      // Reset all headers
      headers.forEach(h => {
        h.classList.remove('asc', 'desc');
      });
      
      // Set new direction
      currentHeader.classList.add(isAscending ? 'desc' : 'asc');
      
      // Sort rows
      this.filteredRows.sort((a, b) => {
        let aVal, bVal;
        
        switch(key) {
          case 'name':
            aVal = a.querySelector('.table-cell-title')?.textContent || '';
            bVal = b.querySelector('.table-cell-title')?.textContent || '';
            break;
          case 'city':
            aVal = a.cells[2]?.textContent || '';
            bVal = b.cells[2]?.textContent || '';
            break;
          case 'hours':
            aVal = parseInt(a.dataset.hours) || 0;
            bVal = parseInt(b.dataset.hours) || 0;
            break;
          case 'last-active':
            aVal = a.dataset.lastActive || '';
            bVal = b.dataset.lastActive || '';
            break;
          case 'status':
            aVal = a.dataset.status || '';
            bVal = b.dataset.status || '';
            break;
          case 'availability':
            aVal = a.dataset.availability || '';
            bVal = b.dataset.availability || '';
            break;
          default:
            return 0;
        }
        
        if (typeof aVal === 'number') {
          return isAscending ? aVal - bVal : bVal - aVal;
        }
        
        const comparison = aVal.localeCompare(bVal);
        return isAscending ? comparison : -comparison;
      });
      
      this.currentPage = 1;
      this.updatePagination();
    },
    
    updatePagination() {
      const totalPages = Math.ceil(this.filteredRows.length / this.rowsPerPage) || 1;
      
      // Ensure current page is valid
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      if (this.currentPage < 1) this.currentPage = 1;
      
      // Hide all rows
      this.rows.forEach(row => row.classList.add('hidden-row'));
      
      // Show current page rows
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      const pageRows = this.filteredRows.slice(start, end);
      
      pageRows.forEach(row => row.classList.remove('hidden-row'));
      
      // Update info
      const showingStart = pageRows.length > 0 ? start + 1 : 0;
      const showingEnd = Math.min(end, this.filteredRows.length);
      
      document.getElementById('showing-start').textContent = showingStart;
      document.getElementById('showing-end').textContent = showingEnd;
      document.getElementById('total-count').textContent = this.filteredRows.length;
      
      // Update buttons
      document.getElementById('prev-page').disabled = this.currentPage <= 1;
      document.getElementById('next-page').disabled = this.currentPage >= totalPages;
      
      // Update page buttons
      document.querySelectorAll('.pagination-btn:not(#prev-page):not(#next-page)').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === this.currentPage);
      });
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Volunteers.init());
  } else {
    Volunteers.init();
  }
  
  window.Volunteers = Volunteers;
  
})();
