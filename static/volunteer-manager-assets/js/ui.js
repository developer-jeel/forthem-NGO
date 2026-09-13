/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - UI Components
   ============================================ */

(function() {
  'use strict';

  const UI = {
    init() {
      this.bindEvents();
    },
    
    bindEvents() {
      // Quick action cards
      document.querySelectorAll('.quick-action-card').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          const action = card.dataset.action;
          this.handleQuickAction(action);
        });
      });
      
      // Assign volunteer buttons
      document.querySelectorAll('[data-action="assign"]').forEach(btn => {
        btn.addEventListener('click', () => {
          Modal.open('assignment-modal');
        });
      });
      
      // Add note buttons
      document.querySelectorAll('[data-action="note"]').forEach(btn => {
        btn.addEventListener('click', () => {
          Modal.open('note-modal');
        });
      });
      
      // Suspend buttons
      document.querySelectorAll('[data-action="suspend"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const row = btn.closest('tr');
          const name = row?.querySelector('.table-cell-title')?.textContent || 'this volunteer';
          Confirm.show(
            'Suspend Volunteer',
            `Are you sure you want to suspend ${name}? They will not be able to receive assignments until reactivated.`,
            () => {
              if (row) {
                const statusCell = row.querySelector('td:nth-child(8)');
                if (statusCell) {
                  statusCell.innerHTML = '<span class="badge badge-critical">Suspended</span>';
                }
                row.dataset.status = 'suspended';
              }
              Toast.success('Volunteer suspended successfully');
            }
          );
        });
      });
      
      // Reactivate buttons
      document.querySelectorAll('[data-action="reactivate"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const row = btn.closest('tr');
          const name = row?.querySelector('.table-cell-title')?.textContent || 'this volunteer';
          Confirm.show(
            'Reactivate Volunteer',
            `Are you sure you want to reactivate ${name}?`,
            () => {
              if (row) {
                const statusCell = row.querySelector('td:nth-child(8)');
                if (statusCell) {
                  statusCell.innerHTML = '<span class="badge badge-success">Active</span>';
                }
                row.dataset.status = 'active';
              }
              Toast.success('Volunteer reactivated successfully');
            }
          );
        });
      });
      
      // Assignment form submit
      document.getElementById('assignment-submit')?.addEventListener('click', () => {
        this.handleAssignmentSubmit();
      });
      
      // Add volunteer form submit
      document.getElementById('add-volunteer-submit')?.addEventListener('click', () => {
        this.handleAddVolunteerSubmit();
      });
      
      // Note form submit
      document.getElementById('note-submit')?.addEventListener('click', () => {
        this.handleNoteSubmit();
      });
      
      // Export button
      document.getElementById('export-btn')?.addEventListener('click', () => {
        Toast.info('Export functionality would download CSV file', 'Export Volunteers');
      });
    },
    
    handleQuickAction(action) {
      switch(action) {
        case 'add-volunteer':
          Modal.open('add-volunteer-modal');
          break;
        case 'review-applications':
          window.location.href = 'applications.html';
          break;
        case 'assign-deployment':
          Modal.open('assignment-modal');
          break;
        case 'create-broadcast':
          window.location.href = 'broadcast.html';
          break;
      }
    },
    
    handleAssignmentSubmit() {
      const form = document.getElementById('assignment-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--status-critical)';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        Toast.error('Please fill in all required fields');
        return;
      }
      
      Modal.close();
      Toast.success('Volunteer assigned successfully', 'Assignment Created');
      
      // Simulate adding to deployments table if on dashboard
      const deploymentsTable = document.querySelector('#deployments tbody');
      if (deploymentsTable) {
        const programSelect = document.getElementById('assign-program');
        const locationInput = document.getElementById('assign-location');
        const taskSelect = document.getElementById('assign-task');
        
        const programName = programSelect.options[programSelect.selectedIndex]?.text || 'Unknown Program';
        
        const newRow = document.createElement('tr');
        newRow.dataset.status = 'active';
        newRow.innerHTML = `
          <td>
            <div class="table-cell-primary">
              <div class="avatar">NV</div>
              <div class="table-cell-info">
                <div class="table-cell-title">New Assignment</div>
                <div class="table-cell-subtitle">Just now</div>
              </div>
            </div>
          </td>
          <td>${programName}</td>
          <td>${locationInput?.value || 'TBD'}</td>
          <td>${taskSelect.options[taskSelect.selectedIndex]?.text || 'Unknown'}</td>
          <td>Just started</td>
          <td><span class="badge badge-success">On Field</span></td>
        `;
        
        deploymentsTable.insertBefore(newRow, deploymentsTable.firstChild);
      }
    },
    
    handleAddVolunteerSubmit() {
      const form = document.getElementById('add-volunteer-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--status-critical)';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        Toast.error('Please fill in all required fields');
        return;
      }
      
      const firstName = document.getElementById('vol-first-name')?.value || '';
      const lastName = document.getElementById('vol-last-name')?.value || '';
      const city = document.getElementById('vol-city')?.value || '';
      
      Modal.close();
      Toast.success(`${firstName} ${lastName} has been added successfully`, 'Volunteer Added');
      
      // Simulate adding to volunteers table if on volunteers page
      const volunteersTable = document.querySelector('#volunteers-table tbody');
      if (volunteersTable) {
        const initials = (firstName[0] || '') + (lastName[0] || '');
        const citySelect = document.getElementById('vol-city');
        const cityName = citySelect.options[citySelect.selectedIndex]?.text || city;
        
        const newRow = document.createElement('tr');
        const volId = 'VOL-' + String(Math.floor(Math.random() * 900) + 100);
        newRow.dataset.id = volId;
        newRow.dataset.status = 'active';
        newRow.dataset.city = city;
        newRow.dataset.verification = 'pending';
        newRow.dataset.hours = '0';
        newRow.dataset.lastActive = new Date().toISOString().split('T')[0];
        
        newRow.innerHTML = `
          <td><input type="checkbox" class="vol-checkbox"></td>
          <td>
            <div class="table-cell-primary">
              <div class="avatar">${initials}</div>
              <div class="table-cell-info">
                <div class="table-cell-title">${firstName} ${lastName}</div>
                <div class="table-cell-subtitle">new.volunteer@example.com</div>
              </div>
            </div>
          </td>
          <td>${cityName}</td>
          <td><span class="skill-chip">New</span></td>
          <td>Weekends</td>
          <td><span class="verification-badge pending">⏳ Pending</span></td>
          <td>0</td>
          <td><span class="badge badge-success">Active</span></td>
          <td>Just now</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-ghost btn-sm" data-dropdown-toggle>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
              <div class="dropdown-menu">
                <a href="volunteer-profile.html?id=${volId}" class="dropdown-item">View Profile</a>
                <button class="dropdown-item" data-action="assign">Assign</button>
                <button class="dropdown-item" data-action="note">Add Note</button>
                <button class="dropdown-item danger" data-action="suspend">Suspend</button>
              </div>
            </div>
          </td>
        `;
        
        volunteersTable.insertBefore(newRow, volunteersTable.firstChild);
        
        // Reinitialize dropdowns for new row
        UI.bindEvents();
      }
    },
    
    handleNoteSubmit() {
      const noteContent = document.getElementById('note-content')?.value;
      
      if (!noteContent || !noteContent.trim()) {
        Toast.error('Please enter a note');
        return;
      }
      
      Modal.close();
      Toast.success('Note added successfully');
      
      // Add note to timeline if on profile page
      const notesList = document.querySelector('.notes-list');
      if (notesList) {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
          <div class="note-header">
            <span class="note-author">Aarav Mehta</span>
            <span class="note-date">${dateStr}</span>
          </div>
          <div class="note-content">${noteContent}</div>
        `;
        
        notesList.insertBefore(noteItem, notesList.firstChild);
      }
      
      // Clear form
      const noteForm = document.getElementById('note-form');
      if (noteForm) noteForm.reset();
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UI.init());
  } else {
    UI.init();
  }
  
})();
