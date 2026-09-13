/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Applications Page
   ============================================ */

(function() {
  'use strict';

  const Applications = {
    cards: [],
    filteredCards: [],
    currentAppId: null,
    pendingStats: { pending: 12, review: 4, approved: 18, rejected: 6 },
    
    init() {
      this.cards = Array.from(document.querySelectorAll('.application-card'));
      this.filteredCards = [...this.cards];
      
      this.bindEvents();
      this.updateStats();
    },
    
    bindEvents() {
      // Search
      document.getElementById('app-search')?.addEventListener('input', (e) => {
        this.filterBySearch(e.target.value);
      });
      
      // Filters
      document.getElementById('filter-app-status')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-app-city')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-app-skill')?.addEventListener('change', () => this.applyFilters());
      document.getElementById('filter-app-date')?.addEventListener('change', () => this.applyFilters());
      
      // Clear filters
      document.getElementById('clear-app-filters')?.addEventListener('click', () => this.clearFilters());
      
      // Review buttons
      document.querySelectorAll('[data-action="review"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const appId = btn.dataset.appId;
          this.openReviewModal(appId);
        });
      });
      
      // Approve buttons
      document.querySelectorAll('[data-action="approve"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const appId = btn.dataset.appId;
          this.handleApprove(appId);
        });
      });
      
      // Reject buttons
      document.querySelectorAll('[data-action="reject"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const appId = btn.dataset.appId;
          this.openRejectModal(appId);
        });
      });
      
      // Review modal actions
      document.getElementById('review-approve')?.addEventListener('click', () => {
        if (this.currentAppId) {
          this.handleApprove(this.currentAppId);
        }
      });
      
      document.getElementById('review-reject')?.addEventListener('click', () => {
        if (this.currentAppId) {
          Modal.close();
          this.openRejectModal(this.currentAppId);
        }
      });
      
      // Reject form submit
      document.getElementById('reject-submit')?.addEventListener('click', () => {
        this.handleReject();
      });
    },
    
    filterBySearch(query) {
      const searchTerm = query.toLowerCase().trim();
      
      this.filteredCards = this.cards.filter(card => {
        if (!searchTerm) return true;
        
        const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const email = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const city = card.querySelector('.application-card-body span')?.textContent?.toLowerCase() || '';
        const statement = card.querySelector('.application-statement')?.textContent?.toLowerCase() || '';
        
        return name.includes(searchTerm) || 
               email.includes(searchTerm) || 
               city.includes(searchTerm) || 
               statement.includes(searchTerm);
      });
      
      this.applyFilters();
    },
    
    applyFilters() {
      const status = document.getElementById('filter-app-status')?.value || 'all';
      const city = document.getElementById('filter-app-city')?.value || 'all';
      const skill = document.getElementById('filter-app-skill')?.value || 'all';
      
      const searchQuery = document.getElementById('app-search')?.value.toLowerCase().trim() || '';
      
      this.filteredCards = this.cards.filter(card => {
        // Search filter
        if (searchQuery) {
          const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
          const email = card.querySelector('p')?.textContent?.toLowerCase() || '';
          
          if (!name.includes(searchQuery) && !email.includes(searchQuery)) {
            return false;
          }
        }
        
        // Status filter
        if (status !== 'all' && card.dataset.status !== status) return false;
        
        // City filter
        if (city !== 'all' && card.dataset.city !== city) return false;
        
        // Skill filter
        if (skill !== 'all') {
          const cardSkills = card.dataset.skills || '';
          if (!cardSkills.includes(skill)) return false;
        }
        
        return true;
      });
      
      // Update visibility
      this.cards.forEach(card => {
        if (this.filteredCards.includes(card)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    },
    
    clearFilters() {
      document.getElementById('app-search').value = '';
      document.getElementById('filter-app-status').value = 'all';
      document.getElementById('filter-app-city').value = 'all';
      document.getElementById('filter-app-skill').value = 'all';
      document.getElementById('filter-app-date').value = 'all';
      
      this.filteredCards = [...this.cards];
      this.applyFilters();
      
      Toast.info('Filters cleared');
    },
    
    openReviewModal(appId) {
      const card = document.querySelector(`[data-id="${appId}"]`);
      if (!card) return;
      
      this.currentAppId = appId;
      
      const name = card.querySelector('h3')?.textContent || '';
      const email = card.querySelector('p')?.textContent || '';
      const city = card.querySelector('.application-card-body span')?.textContent || '';
      const date = card.querySelectorAll('.application-card-body span')[1]?.textContent || '';
      const skills = card.querySelectorAll('.skill-chip').map(s => s.textContent).join(', ');
      const availability = card.querySelector('.application-card-body strong')?.nextSibling?.textContent || '';
      const statement = card.querySelector('.application-statement')?.textContent || '';
      const verification = card.querySelector('.verification-badge')?.textContent || 'Not Verified';
      
      const content = document.getElementById('review-content');
      content.innerHTML = `
        <div style="margin-bottom: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
            <div class="avatar avatar-lg">${name.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-1);">${name}</h3>
              <p style="color: var(--text-secondary);">${email}</p>
            </div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); margin-bottom: var(--space-4);">
          <div>
            <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-1);">Location</div>
            <div style="font-weight: var(--font-medium);">${city}</div>
          </div>
          <div>
            <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-1);">Applied</div>
            <div style="font-weight: var(--font-medium);">${date}</div>
          </div>
          <div>
            <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-1);">Verification</div>
            <div>${verification}</div>
          </div>
          <div>
            <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-1);">Availability</div>
            <div style="font-weight: var(--font-medium);">${availability}</div>
          </div>
        </div>
        
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-2);">Skills</div>
          <div>${skills}</div>
        </div>
        
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-2);">Personal Statement</div>
          <div style="background-color: var(--bg-sunken); padding: var(--space-3); border-radius: var(--radius-md); font-style: italic; color: var(--text-secondary);">"${statement}"</div>
        </div>
        
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: var(--text-xs); color: var(--text-tertiary); text-transform: uppercase; margin-bottom: var(--space-2);">Emergency Contact</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">To be collected upon approval</div>
        </div>

        <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end;">
          <a href="application-detail.html?id=${appId}" class="btn btn-primary btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Open Full Application Dossier &amp; ID Verification</span>
            <span>&rarr;</span>
          </a>
        </div>
      `;
      
      Modal.open('review-modal');
    },
    
    handleApprove(appId) {
      const card = document.querySelector(`[data-id="${appId}"]`);
      if (!card) return;
      
      const name = card.querySelector('h3')?.textContent || 'Applicant';
      
      Confirm.show(
        'Approve Application',
        `Are you sure you want to approve ${name}'s application? They will be added to the volunteer roster.`,
        () => {
          // Update card status
          const statusBadge = card.querySelector('.application-card-header .badge');
          if (statusBadge) {
            statusBadge.className = 'badge badge-success';
            statusBadge.textContent = 'Approved';
          }
          
          // Update actions
          const actionsDiv = card.querySelector('.application-actions');
          if (actionsDiv) {
            actionsDiv.innerHTML = `
              <button class="btn btn-secondary btn-sm" disabled>Approved</button>
              <a href="volunteers.html" class="btn btn-primary btn-sm">View in Roster</a>
            `;
          }
          
          // Update dataset
          card.dataset.status = 'approved';
          
          // Update stats
          this.pendingStats.pending--;
          this.pendingStats.approved++;
          this.updateStats();
          
          // Close modals
          Modal.close();
          
          // Show success
          Toast.success(`${name} has been approved successfully`, 'Application Approved');
          
          // Reapply filters
          this.applyFilters();
        }
      );
    },
    
    openRejectModal(appId) {
      this.currentAppId = appId;
      document.getElementById('reject-reason').value = '';
      document.getElementById('reject-notes').value = '';
      Modal.open('reject-modal');
    },
    
    handleReject() {
      const reason = document.getElementById('reject-reason')?.value;
      
      if (!reason) {
        Toast.error('Please select a rejection reason');
        return;
      }
      
      const card = document.querySelector(`[data-id="${this.currentAppId}"]`);
      if (!card) return;
      
      const name = card.querySelector('h3')?.textContent || 'Applicant';
      const reasonText = document.getElementById('reject-reason').options[document.getElementById('reject-reason').selectedIndex]?.text || 'Other';
      const notes = document.getElementById('reject-notes')?.value || '';
      
      Confirm.show(
        'Reject Application',
        `Are you sure you want to reject ${name}'s application? This action cannot be undone.`,
        () => {
          // Update card status
          const statusBadge = card.querySelector('.application-card-header .badge');
          if (statusBadge) {
            statusBadge.className = 'badge badge-neutral';
            statusBadge.textContent = 'Rejected';
          }
          
          // Add rejection reason to card
          const body = card.querySelector('.application-card-body');
          const existingReason = body.querySelector('.application-statement + div');
          if (!existingReason) {
            const reasonDiv = document.createElement('div');
            reasonDiv.style.cssText = 'font-size: var(--text-xs); color: var(--status-critical); margin-top: var(--space-2);';
            reasonDiv.innerHTML = `<strong>Rejection Reason:</strong> ${reasonText}${notes ? ' - ' + notes : ''}`;
            body.appendChild(reasonDiv);
          }
          
          // Update actions
          const actionsDiv = card.querySelector('.application-actions');
          if (actionsDiv) {
            actionsDiv.innerHTML = `<button class="btn btn-secondary btn-sm" disabled>Rejected</button>`;
          }
          
          // Update dataset
          card.dataset.status = 'rejected';
          
          // Update stats
          this.pendingStats.pending--;
          this.pendingStats.rejected++;
          this.updateStats();
          
          // Close modals
          Modal.close();
          
          // Show success
          Toast.success(`Application rejected: ${reasonText}`, 'Application Rejected');
          
          // Reapply filters
          this.applyFilters();
        }
      );
    },
    
    updateStats() {
      document.getElementById('stat-pending').textContent = this.pendingStats.pending;
      document.getElementById('stat-review').textContent = this.pendingStats.review;
      document.getElementById('stat-approved').textContent = this.pendingStats.approved;
      document.getElementById('stat-rejected').textContent = this.pendingStats.rejected;
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Applications.init());
  } else {
    Applications.init();
  }
  
  window.Applications = Applications;
  
})();
