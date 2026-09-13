/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Finance Manager Panel - Campaigns Module
   ============================================ */

/**
 * Campaigns Module
 * Handles campaign filtering and detail views
 */

const Campaigns = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Filter by pillar
    document.querySelectorAll('[data-filter="pillar"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterByPillar(btn.dataset.pillar);
        
        // Update active state
        document.querySelectorAll('[data-filter="pillar"]').forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
    
    // Campaign card clicks
    document.querySelectorAll('.campaign-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const campaignId = card.dataset.campaignId;
          this.openCampaignDetail(campaignId);
        }
      });
    });
    
    // Export
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportCampaigns();
      });
    }
  },
  
  filterByPillar(pillar) {
    const cards = document.querySelectorAll('.campaign-card');
    
    cards.forEach(card => {
      if (pillar === 'all' || card.dataset.pillar === pillar) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  },
  
  openCampaignDetail(campaignId) {
    const modal = document.getElementById('campaign-detail-modal');
    if (!modal) return;
    
    const card = document.querySelector(`[data-campaign-id="${campaignId}"]`);
    if (!card) return;
    
    // Extract data from card
    const name = card.querySelector('.campaign-name')?.textContent || '';
    const pillar = card.querySelector('.campaign-pillar')?.textContent || '';
    const target = card.querySelector('[data-field="target"]')?.textContent || '';
    const raised = card.querySelector('[data-field="raised"]')?.textContent || '';
    const remaining = card.querySelector('[data-field="remaining"]')?.textContent || '';
    const progress = card.querySelector('.progress-fill')?.style.width || '0%';
    const expense = card.querySelector('[data-field="expense"]')?.textContent || '';
    const donors = card.querySelector('[data-field="donors"]')?.textContent || '';
    
    modal.querySelector('[data-field="detail-name"]')!.textContent = name;
    modal.querySelector('[data-field="detail-pillar"]')!.textContent = pillar;
    modal.querySelector('[data-field="detail-target"]')!.textContent = target;
    modal.querySelector('[data-field="detail-raised"]')!.textContent = raised;
    modal.querySelector('[data-field="detail-remaining"]')!.textContent = remaining;
    modal.querySelector('[data-field="detail-expense"]')!.textContent = expense;
    modal.querySelector('[data-field="detail-donors"]')!.textContent = donors;
    
    const progressFill = modal.querySelector('[data-field="detail-progress"]');
    if (progressFill) {
      progressFill.style.width = progress;
    }
    
    UI.openModal('campaign-detail-modal');
  },
  
  exportCampaigns() {
    const cards = document.querySelectorAll('.campaign-card');
    const csv = ['Campaign,Pillar,Target,Raised,Remaining,Progress,Donors'];
    
    cards.forEach(card => {
      const name = card.querySelector('.campaign-name')?.textContent || '';
      const pillar = card.querySelector('.campaign-pillar')?.textContent || '';
      const target = card.querySelector('[data-field="target"]')?.textContent?.replace(/[^0-9]/g, '') || '0';
      const raised = card.querySelector('[data-field="raised"]')?.textContent?.replace(/[^0-9]/g, '') || '0';
      const remaining = card.querySelector('[data-field="remaining"]')?.textContent?.replace(/[^0-9]/g, '') || '0';
      const progress = card.querySelector('.progress-fill')?.style.width || '0%';
      const donors = card.querySelector('[data-field="donors"]')?.textContent || '0';
      
      csv.push(`"${name}","${pillar}",${target},${raised},${remaining},"${progress}",${donors}`);
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'campaigns-export.csv';
    link.click();
    
    UI.showToast('Campaigns exported successfully', 'success');
  }
};
