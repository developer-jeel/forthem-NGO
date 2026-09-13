/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Reports Module
   ============================================ */

/**
 * Reports Module
 * Handles report filtering and generation
 */

const Reports = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Period filter
    const periodFilter = document.querySelector('[data-filter="period"]');
    if (periodFilter) {
      periodFilter.addEventListener('change', () => {
        this.updateReportDates();
      });
    }
    
    // Report type navigation
    document.querySelectorAll('[data-report-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchReport(btn.dataset.reportType);
        
        // Update active state
        document.querySelectorAll('[data-report-type]').forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
    
    // Export report
    const exportBtn = document.querySelector('[data-action="export-report"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportCurrentReport();
      });
    }
    
    // Print report
    const printBtn = document.querySelector('[data-action="print"]');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },
  
  updateReportDates() {
    const period = document.querySelector('[data-filter="period"]')?.value || 'current-month';
    const dateRangeEl = document.querySelector('[data-field="date-range"]');
    
    const dateRanges = {
      'current-month': 'Current Month',
      'last-month': 'Last Month',
      'quarter': 'Current Quarter',
      'half-year': 'Half Year',
      'financial-year': 'Financial Year 2025-26'
    };
    
    if (dateRangeEl) {
      dateRangeEl.textContent = dateRanges[period] || period;
    }
  },
  
  switchReport(type) {
    // Hide all report sections
    document.querySelectorAll('.report-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show selected report
    const selectedSection = document.getElementById(`report-${type}`);
    if (selectedSection) {
      selectedSection.style.display = 'block';
    }
    
    UI.showToast(`${type.replace('-', ' ')} report loaded`, 'info');
  },
  
  exportCurrentReport() {
    const activeReport = document.querySelector('.report-section[style="display: block;"]');
    if (!activeReport) {
      UI.showToast('No active report to export', 'error');
      return;
    }
    
    const reportType = activeReport.id.replace('report-', '');
    const filename = `${reportType}-report.csv`;
    
    // Extract table data if present
    const table = activeReport.querySelector('table');
    if (table) {
      App.exportTableToCSV(table.id, filename);
    } else {
      UI.showToast('Report exported', 'success');
    }
  },
  
  // Generate summary data from HTML tables
  generateSummary(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return null;
    
    const rows = table.querySelectorAll('tbody tr');
    let total = 0;
    let count = 0;
    
    rows.forEach(row => {
      if (row.style.display !== 'none') {
        const amountCell = row.querySelector('.amount-cell');
        if (amountCell) {
          const amount = parseFloat(amountCell.textContent.replace(/[^0-9.-]+/g, ''));
          if (!isNaN(amount)) {
            total += amount;
            count++;
          }
        }
      }
    });
    
    return {
      total,
      count,
      average: count > 0 ? total / count : 0
    };
  }
};
