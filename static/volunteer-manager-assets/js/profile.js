/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Profile Page
   ============================================ */

(function() {
  'use strict';

  const Profile = {
    currentProfileId: null,
    
    init() {
      this.loadProfile();
      this.bindEvents();
    },
    
    loadProfile() {
      // Get volunteer ID from URL
      const params = new URLSearchParams(window.location.search);
      const volunteerId = params.get('id');
      
      if (!volunteerId) {
        this.showNotFound();
        return;
      }
      
      this.currentProfileId = volunteerId;
      
      // In a real app, this would fetch data
      // For this static prototype, we show the default profile (VOL-001)
      // or show not found for other IDs
      
      // For demo purposes, we'll show the profile for any valid-looking ID
      if (volunteerId.startsWith('VOL-')) {
        this.updateProfileDisplay(volunteerId);
      } else {
        this.showNotFound();
      }
    },
    
    updateProfileDisplay(volunteerId) {
      // Update breadcrumb with volunteer name
      const breadcrumbName = document.getElementById('profile-name-breadcrumb');
      if (breadcrumbName) {
        // Extract name from ID for demo (in real app, would fetch from data)
        const names = {
          'VOL-001': 'Ananya Shah',
          'VOL-002': 'Rohan Patel',
          'VOL-003': 'Priya Mehta',
          'VOL-004': 'Aarav Joshi',
          'VOL-005': 'Mehul Desai',
          'VOL-006': 'Kavya Shah',
          'VOL-007': 'Dev Patel',
          'VOL-008': 'Neha Trivedi',
          'VOL-009': 'Raj Sharma',
          'VOL-010': 'Sneha Kulkarni',
          'VOL-011': 'Vikram Patil',
          'VOL-012': 'Aditya Malhotra'
        };
        breadcrumbName.textContent = names[volunteerId] || 'Volunteer';
      }
      
      // Show profile section
      document.getElementById('profile-vol-001')?.classList.remove('hidden');
      document.getElementById('profile-not-found')?.classList.add('hidden');
    },
    
    showNotFound() {
      document.getElementById('profile-vol-001')?.classList.add('hidden');
      document.getElementById('profile-not-found')?.classList.remove('hidden');
    },
    
    bindEvents() {
      // Assignment form submit
      document.getElementById('assignment-submit')?.addEventListener('click', () => {
        this.handleAssignmentSubmit();
      });
      
      // Note form submit
      document.getElementById('note-submit')?.addEventListener('click', () => {
        this.handleNoteSubmit();
      });
      
      // Profile action buttons
      document.querySelectorAll('.profile-actions [data-action="assign"]').forEach(btn => {
        btn.addEventListener('click', () => {
          Modal.open('assignment-modal');
        });
      });
      
      document.querySelectorAll('.profile-actions [data-action="note"]').forEach(btn => {
        btn.addEventListener('click', () => {
          Modal.open('note-modal');
        });
      });
      
      document.querySelectorAll('.profile-actions [data-action="suspend"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = document.querySelector('.profile-name')?.textContent || 'this volunteer';
          Confirm.show(
            'Suspend Volunteer',
            `Are you sure you want to suspend ${name}? They will not be able to receive assignments until reactivated.`,
            () => {
              const statusBadge = document.querySelector('.profile-header .badge');
              if (statusBadge) {
                statusBadge.className = 'badge badge-critical';
                statusBadge.textContent = 'Suspended';
              }
              Toast.success('Volunteer suspended successfully');
            }
          );
        });
      });
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
      
      // Add to assignments table
      const assignmentsTable = document.querySelector('.profile-section .data-table tbody');
      if (assignmentsTable) {
        const programSelect = document.getElementById('assign-program');
        const locationInput = document.getElementById('assign-location');
        const startDate = document.getElementById('assign-start-date')?.value;
        const endDate = document.getElementById('assign-end-date')?.value;
        
        const programName = programSelect.options[programSelect.selectedIndex]?.text || 'Unknown Program';
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${programName}</td>
          <td>${locationInput?.value || 'TBD'}</td>
          <td>Field Volunteer</td>
          <td>${startDate || 'TBD'} - ${endDate || 'TBD'}</td>
          <td><span class="badge badge-info">Scheduled</span></td>
          <td><button class="btn btn-ghost btn-sm">View</button></td>
        `;
        
        assignmentsTable.insertBefore(newRow, assignmentsTable.firstChild);
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
      
      // Add note to timeline
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
    document.addEventListener('DOMContentLoaded', () => Profile.init());
  } else {
    Profile.init();
  }
  
  window.Profile = Profile;
  
})();
