/* ============================================
   UNKE LIYE (FORTHEM) NGO
   Fund Requests & Approvals – JavaScript
   ============================================ */

'use strict';

/* ──────────────────────────────────────────
   1. SHARED UTILITIES
────────────────────────────────────────── */
function showToast(message, type = 'success') {
  if (window.UI && typeof UI.showToast === 'function') {
    UI.showToast(message, type);
    return;
  }
  // Fallback toast
  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-message">${message}</span>`;
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add('active'));
  setTimeout(() => {
    t.classList.remove('active');
    setTimeout(() => t.remove(), 300);
  }, 4000);
}

/* ──────────────────────────────────────────
   2. FUND REQUESTS PAGE  (fund-requests.html)
────────────────────────────────────────── */
const FundRequests = {

  init() {
    if (!document.getElementById('fund-request-form')) return;

    this.bindFormToggle();
    this.bindUrgencySelector();
    this.bindDropzone();
    this.bindFormSubmit();
    this.bindHistoryTabs();
    this.bindRowExpand();
    this.bindTableSearch();
  },

  /* ── Collapsible Form Card ── */
  bindFormToggle() {
    const toggle   = document.getElementById('form-card-toggle');
    const body     = document.getElementById('new-request-form-body');
    const icon     = document.getElementById('form-toggle-icon');
    const btnNew   = document.getElementById('btn-new-request-toggle');

    const open = () => {
      body.classList.add('open');
      icon.classList.add('open');
      body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const close = () => {
      body.classList.remove('open');
      icon.classList.remove('open');
    };

    toggle?.addEventListener('click', () => {
      body.classList.contains('open') ? close() : open();
    });

    // "New Fund Request" button in page header always opens the form
    btnNew?.addEventListener('click', () => {
      open();
      document.getElementById('req-title')?.focus();
    });
  },

  /* ── Urgency Selector ── */
  bindUrgencySelector() {
    const group = document.getElementById('urgency-group');
    if (!group) return;

    const options = group.querySelectorAll('.fr-urgency-option');

    const update = () => {
      options.forEach(opt => {
        const radio = opt.querySelector('input[type="radio"]');
        const val   = opt.dataset.value;
        opt.classList.remove('selected-normal', 'selected-urgent', 'selected-critical');
        if (radio.checked) {
          opt.classList.add(`selected-${val}`);
        }
      });
    };

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const radio = opt.querySelector('input[type="radio"]');
        radio.checked = true;
        update();
      });
    });

    // Set initial state
    const defaultOpt = group.querySelector('#urg-normal');
    if (defaultOpt) defaultOpt.classList.add('selected-normal');
  },

  /* ── Drag & Drop File Upload ── */
  bindDropzone() {
    const zone     = document.getElementById('dropzone');
    const input    = document.getElementById('file-input');
    const list     = document.getElementById('file-list');
    const browse   = document.getElementById('dropzone-browse');
    let files      = [];

    if (!zone || !input) return;

    const renderFiles = () => {
      if (!list) return;
      if (files.length === 0) { list.innerHTML = ''; return; }
      list.innerHTML = files.map((f, i) => `
        <div class="fr-file-item">
          <svg class="fr-file-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span class="fr-file-name">${f.name}</span>
          <span class="fr-file-size">${(f.size / 1024).toFixed(0)} KB</span>
          <button class="fr-file-remove" data-index="${i}" aria-label="Remove file">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      `).join('');

      list.querySelectorAll('.fr-file-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          files.splice(Number(btn.dataset.index), 1);
          renderFiles();
        });
      });
    };

    const addFiles = (newFiles) => {
      const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      Array.from(newFiles).forEach(f => {
        if (!allowed.includes(f.type)) {
          showToast(`"${f.name}" is not a supported file type.`, 'warning');
          return;
        }
        if (f.size > 10 * 1024 * 1024) {
          showToast(`"${f.name}" exceeds the 10 MB limit.`, 'warning');
          return;
        }
        files.push(f);
      });
      renderFiles();
    };

    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      addFiles(e.dataTransfer.files);
    });
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') input.click(); });
    browse?.addEventListener('click', e => { e.stopPropagation(); input.click(); });
    input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });
  },

  /* ── Form Submission ── */
  bindFormSubmit() {
    const form = document.getElementById('fund-request-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--status-danger)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const btn = document.getElementById('btn-submit-request');
      btn.disabled = true;
      btn.textContent = 'Submitting…';

      // Simulate network delay
      setTimeout(() => {
        showToast('Fund request submitted successfully! Finance Manager has been notified.', 'success');
        form.reset();

        // Reset urgency styles
        document.querySelectorAll('.fr-urgency-option').forEach(o =>
          o.classList.remove('selected-normal', 'selected-urgent', 'selected-critical')
        );
        document.querySelector('#urg-normal')?.classList.add('selected-normal');

        // Clear files
        const list = document.getElementById('file-list');
        if (list) list.innerHTML = '';

        btn.disabled = false;
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Submit Request`;

        // Collapse form
        document.getElementById('new-request-form-body')?.classList.remove('open');
        document.getElementById('form-toggle-icon')?.classList.remove('open');
      }, 1200);
    });

    // Save Draft
    document.getElementById('btn-save-draft')?.addEventListener('click', () => {
      showToast('Draft saved. You can submit it later.', 'info');
    });
  },

  /* ── History Tabs ── */
  bindHistoryTabs() {
    const tabGroup = document.getElementById('history-tabs');
    if (!tabGroup) return;
    const tbody    = document.getElementById('requests-tbody');

    tabGroup.addEventListener('click', e => {
      const tab = e.target.closest('.fr-tab');
      if (!tab) return;

      tabGroup.querySelectorAll('.fr-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.tab;

      tbody?.querySelectorAll('tr[data-req-id]').forEach(row => {
        const status = row.dataset.status;
        const show = filter === 'all' || status === filter;
        row.style.display = show ? '' : 'none';

        // Also hide expanded detail rows when parent is hidden
        const detailRow = document.getElementById(`detail-${row.dataset.reqId}`);
        if (detailRow && !show) detailRow.classList.remove('open');
      });
    });
  },

  /* ── Row Expand (inline details) ── */
  bindRowExpand() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-action="expand-row"]');
      if (!btn) return;
      const targetId = btn.dataset.target;
      const target   = document.getElementById(targetId);
      if (!target) return;

      const isOpen = target.classList.contains('open');

      // Close all other open detail rows
      document.querySelectorAll('.fr-detail-row.open').forEach(r => r.classList.remove('open'));

      if (!isOpen) {
        target.classList.add('open');
        btn.textContent = 'Close';
      } else {
        btn.textContent = 'Details';
      }
    });
  },

  /* ── Table Search ── */
  bindTableSearch() {
    const searchInput = document.querySelector('.header .search-input-wrapper input');
    const tbody       = document.getElementById('requests-tbody');
    if (!searchInput || !tbody) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      tbody.querySelectorAll('tr[data-req-id]').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }
};


/* ──────────────────────────────────────────
   3. FUND APPROVALS PAGE  (fund-approvals.html)
────────────────────────────────────────── */

/** Rich data for each request to populate the detail panel */
const REQUEST_DATA = {
  'FR-009': {
    reqId:       'FR-009',
    initials:    'RV',
    avatarClass: 'animal',
    name:        'Riya Verma',
    panel:       'Rescue Panel Manager',
    amount:      '₹45,000',
    title:       'Annual Community Outreach Event',
    category:    'Events & Outreach',
    priority:    'Critical',
    submitted:   '03 Sep 2026',
    requiredBy:  '10 Sep 2026',
    campaign:    'General Operations',
    justification: 'Funds are needed for venue booking, printed banners, catering for 200+ community attendees, and local transport arrangements for the Annual Community Outreach Day planned on 15 Sep 2026.',
    file:        'Venue_Booking_Quote.pdf',
    budgetLabel: 'Events Budget',
    budgetUsed:  62,
    budgetNote:  'Approving this will consume an additional 45% of the remaining Events budget. New total: 107% — over budget.',
    budgetBarOver: true
  },
  'FR-008': {
    reqId:       'FR-008',
    initials:    'RV',
    avatarClass: 'animal',
    name:        'Riya Verma',
    panel:       'Rescue Panel Manager',
    amount:      '₹32,000',
    title:       'Rescue Van Fuel & Maintenance',
    category:    'Equipment & Supplies',
    priority:    'Urgent',
    submitted:   '01 Sep 2026',
    requiredBy:  '07 Sep 2026',
    campaign:    'Save Raju – Animal Rescue',
    justification: 'Monthly fuel budget for 3 active rescue vans operational in Mumbai North, Thane, and Pune zones. Additionally, Van #2 (MH-02-AB-4421) is due for its 10,000 km service on 06 Sep.',
    file:        'Service_Invoice_Sept.pdf',
    budgetLabel: 'Rescue Operations Budget',
    budgetUsed:  48,
    budgetNote:  'Approving this will consume an additional 13% of the remaining Rescue Operations budget. New total: 61% — within limits.',
    budgetBarOver: false
  },
  'FR-007': {
    reqId:       'FR-007',
    initials:    'NK',
    avatarClass: 'disaster',
    name:        'Nikhil Kumar',
    panel:       'Disaster Relief Coordinator',
    amount:      '₹43,000',
    title:       'Medical Supplies – Flood Relief Phase 2',
    category:    'Medical & Healthcare',
    priority:    'Critical',
    submitted:   '28 Aug 2026',
    requiredBy:  '30 Aug 2026',
    campaign:    'Flood Relief – Disaster Response',
    justification: 'Phase 2 of flood relief operations requires restocking ORS packets, bandages, antiseptic solutions, and oral antibiotics for 3 relief camps in Raigad district. These supplies are critically low.',
    file:        'Medical_Requisition_Form.pdf',
    budgetLabel: 'Disaster Relief Budget',
    budgetUsed:  55,
    budgetNote:  'Approving this will consume an additional 17% of the remaining Disaster Relief budget. New total: 72% — within limits.',
    budgetBarOver: false
  },
  'FR-006': {
    reqId:       'FR-006',
    initials:    'SP',
    avatarClass: 'environment',
    name:        'Sunita Patil',
    panel:       'Environment Panel Lead',
    amount:      '₹18,500',
    title:       'Tree Sapling Procurement – Monsoon Drive',
    category:    'Environment Programs',
    priority:    'Normal',
    submitted:   '20 Aug 2026',
    requiredBy:  '25 Aug 2026',
    campaign:    'Adopt-a-Tree – Environment',
    justification: 'Procurement of 500 native species saplings (Neem, Peepal, Banyan) from Green Nursery Pune for the monsoon plantation drive. Planting event is organised in coordination with Pune Municipal Corporation on 28 Aug.',
    file:        'Nursery_Quotation_Aug26.pdf',
    budgetLabel: 'Environment Programs Budget',
    budgetUsed:  30,
    budgetNote:  'Approving this will consume an additional 12% of the remaining Environment budget. New total: 42% — healthy.',
    budgetBarOver: false
  },
  'FR-003': {
    reqId:       'FR-003',
    initials:    'MJ',
    avatarClass: 'sanitation',
    name:        'Meera Joshi',
    panel:       'Sanitation Program Head',
    amount:      '₹28,000',
    title:       'Dharavi Community Toilets – Q3 Chemicals',
    category:    'Sanitation & Hygiene',
    priority:    'Urgent',
    submitted:   '15 Aug 2026',
    requiredBy:  '20 Aug 2026',
    campaign:    'Dharavi Sanitation Drive',
    justification: 'Monthly procurement of bleaching powder, phenyl, and disinfectant solution for 12 community toilet blocks maintained by Unke Liye in Dharavi. Current stock will run out by 19 Aug.',
    file:        'Supplier_Quote_Aug_Q3.pdf',
    budgetLabel: 'Sanitation Budget',
    budgetUsed:  67,
    budgetNote:  'Approving this will consume an additional 11% of the remaining Sanitation budget. New total: 78% — within limits.',
    budgetBarOver: false
  },
  'FR-010': {
    reqId:       'FR-010',
    initials:    'SP',
    avatarClass: 'environment',
    name:        'Sunita Patil',
    panel:       'Environment Panel Lead',
    amount:      '₹18,500',
    title:       'Adopt-a-Tree – Sapling Transport Costs',
    category:    'Operations & Logistics',
    priority:    'Normal',
    submitted:   '29 Aug 2026',
    requiredBy:  '05 Sep 2026',
    campaign:    'Adopt-a-Tree – Environment',
    justification: 'Transport cost for moving 500 saplings from Green Nursery Pune to 3 plantation sites in Lonavala, Mahabaleshwar, and Pune city.',
    file:        'Transport_Quote.pdf',
    budgetLabel: 'Environment Programs Budget',
    budgetUsed:  42,
    budgetNote:  'Approving this will consume an additional 7% of remaining Environment budget. New total: 49%.',
    budgetBarOver: false
  },
  'FR-011': {
    reqId:       'FR-011',
    initials:    'MJ',
    avatarClass: 'sanitation',
    name:        'Meera Joshi',
    panel:       'Sanitation Program Head',
    amount:      '₹62,000',
    title:       'Pune River Cleanup – Equipment Hire',
    category:    'Operations & Logistics',
    priority:    'Urgent',
    submitted:   '27 Aug 2026',
    requiredBy:  '02 Sep 2026',
    campaign:    'Pune River Cleanup',
    justification: 'Hiring of mechanical dredging equipment and 2 waste-collection boats for the 3-day Pune Mula-Mutha River cleanup event on 4–6 Sep.',
    file:        'Equipment_Hire_Quote.pdf',
    budgetLabel: 'Sanitation Budget',
    budgetUsed:  55,
    budgetNote:  'Approving this will consume an additional 24% of remaining Sanitation budget. New total: 79%.',
    budgetBarOver: false
  }
};

const FundApprovals = {
  currentReqId: null,

  init() {
    if (!document.getElementById('fa-workspace')) return;

    this.bindQueueItems();
    this.bindKanbanTabs();
    this.bindActionButtons();
    this.bindSearch();
    this.bindDetailClose();

    // Pre-select the first item
    const firstItem = document.querySelector('.fa-queue-item.selected');
    if (firstItem) {
      this.loadDetail(firstItem.dataset.req);
    }
  },

  /* ── Queue Item Selection ── */
  bindQueueItems() {
    document.addEventListener('click', e => {
      const item = e.target.closest('.fa-queue-item');
      if (!item) return;
      document.querySelectorAll('.fa-queue-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      this.loadDetail(item.dataset.req);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.fa-queue-item');
        if (item) { item.click(); e.preventDefault(); }
      }
    });
  },

  /* ── Kanban Tabs ── */
  bindKanbanTabs() {
    const tabs = document.getElementById('fa-kanban-tabs');
    if (!tabs) return;

    tabs.addEventListener('click', e => {
      const tab = e.target.closest('.fa-ktab');
      if (!tab) return;

      tabs.querySelectorAll('.fa-ktab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const queue = tab.dataset.queue;
      document.getElementById('queue-review')?.style && (document.getElementById('queue-review').style.display   = queue === 'review'   ? 'flex' : 'none');
      document.getElementById('queue-disburse')?.style && (document.getElementById('queue-disburse').style.display = queue === 'disburse' ? 'flex' : 'none');
      document.getElementById('queue-completed')?.style && (document.getElementById('queue-completed').style.display = queue === 'completed' ? 'flex' : 'none');

      // Clear detail panel on tab switch
      this.clearDetail();
    });
  },

  /* ── Load Detail Panel ── */
  loadDetail(reqId) {
    const data    = REQUEST_DATA[reqId];
    const empty   = document.getElementById('fa-detail-empty');
    const content = document.getElementById('fa-detail-content');

    if (!data) { this.clearDetail(); return; }

    this.currentReqId = reqId;

    // Hide empty state, show content
    if (empty)   empty.style.display   = 'none';
    if (content) content.style.display = 'block';

    // Close any open sub-panels
    this.closePanels();

    // Populate fields
    this.setText('detail-panel-req-id', data.reqId);
    this.setText('detail-name', data.name);
    this.setText('detail-panel-name', data.panel);
    this.setText('detail-amount', data.amount);
    this.setText('detail-title', data.title);
    this.setText('detail-category', data.category);
    this.setText('detail-submitted', data.submitted);
    this.setText('detail-required-by', data.requiredBy);
    this.setText('detail-campaign', data.campaign);
    this.setText('detail-justification', data.justification);
    this.setText('detail-file-name', data.file);

    // Avatar
    const avatar = document.getElementById('detail-avatar');
    if (avatar) {
      avatar.textContent = data.initials;
      avatar.className   = `fa-detail-req-avatar ${data.avatarClass}`;
    }

    // Priority badge
    const priorityBadge = document.getElementById('detail-priority');
    if (priorityBadge) {
      const p = data.priority.toLowerCase();
      const cls = p === 'critical' ? 'badge-critical' : p === 'urgent' ? 'badge-urgent' : 'badge-normal';
      priorityBadge.className = `badge ${cls}`;
      priorityBadge.innerHTML = `<span class="badge-dot"></span>${data.priority}`;
    }

    // Budget context
    const bar = document.querySelector('.fa-budget-bar-fill');
    if (bar) {
      bar.style.width = `${data.budgetUsed}%`;
      bar.className   = `fa-budget-bar-fill${data.budgetBarOver ? ' over' : ''}`;
    }
    const budgetTitle = document.querySelector('.fa-budget-context-title');
    if (budgetTitle) budgetTitle.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      Budget Impact – ${data.budgetLabel}`;

    const note = document.querySelector('.fa-budget-context-note');
    if (note) note.innerHTML = data.budgetNote;

    // Show action panel only for "review" queue items
    const actionPanel = document.getElementById('fa-action-panel');
    if (actionPanel) {
      const activeTab = document.querySelector('.fa-ktab.active')?.dataset.queue;
      actionPanel.style.display = activeTab === 'completed' ? 'none' : 'block';
    }
  },

  clearDetail() {
    this.currentReqId = null;
    const empty   = document.getElementById('fa-detail-empty');
    const content = document.getElementById('fa-detail-content');
    if (empty)   empty.style.display   = 'flex';
    if (content) content.style.display = 'none';
    document.querySelectorAll('.fa-queue-item').forEach(i => i.classList.remove('selected'));
    this.closePanels();
  },

  closePanels() {
    ['fa-disburse-panel', 'fa-info-panel', 'fa-reject-panel'].forEach(id => {
      document.getElementById(id)?.classList.remove('open');
    });
    const actions = document.getElementById('fa-primary-actions');
    if (actions) actions.style.display = 'flex';
  },

  /* ── Action Buttons ── */
  bindActionButtons() {
    // Approve → open disburse sub-panel
    document.getElementById('btn-approve-funds')?.addEventListener('click', () => {
      document.getElementById('fa-disburse-panel')?.classList.add('open');
      document.getElementById('fa-info-panel')?.classList.remove('open');
      document.getElementById('fa-reject-panel')?.classList.remove('open');
      document.getElementById('fa-primary-actions').style.display = 'none';
      document.getElementById('fa-disburse-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Request Info → open info sub-panel
    document.getElementById('btn-request-info')?.addEventListener('click', () => {
      document.getElementById('fa-info-panel')?.classList.add('open');
      document.getElementById('fa-disburse-panel')?.classList.remove('open');
      document.getElementById('fa-reject-panel')?.classList.remove('open');
      document.getElementById('fa-primary-actions').style.display = 'none';
    });

    // Reject → open reject sub-panel
    document.getElementById('btn-reject-request')?.addEventListener('click', () => {
      document.getElementById('fa-reject-panel')?.classList.add('open');
      document.getElementById('fa-disburse-panel')?.classList.remove('open');
      document.getElementById('fa-info-panel')?.classList.remove('open');
      document.getElementById('fa-primary-actions').style.display = 'none';
    });

    // Cancel buttons – restore primary actions
    ['btn-cancel-disburse', 'btn-cancel-info', 'btn-cancel-reject'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => {
        this.closePanels();
        const actions = document.getElementById('fa-primary-actions');
        if (actions) actions.style.display = 'flex';
      });
    });

    // Confirm Disburse
    document.getElementById('btn-confirm-disburse')?.addEventListener('click', () => {
      const source = document.getElementById('disburse-source')?.value;
      if (!source) {
        showToast('Please select a funding source.', 'error');
        return;
      }

      const btn = document.getElementById('btn-confirm-disburse');
      btn.disabled = true;
      btn.textContent = 'Processing…';

      setTimeout(() => {
        showToast(`Funds disbursed successfully from selected account. ${this.currentReqId} marked as Disbursed.`, 'success');
        this.removeCurrentFromQueue();
        btn.disabled = false;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>Confirm & Disburse`;
        document.getElementById('disburse-source').value = '';
        document.getElementById('disburse-note').value   = '';
      }, 1500);
    });

    // Send Info Request
    document.getElementById('btn-send-info')?.addEventListener('click', () => {
      const msg = document.getElementById('info-message')?.value.trim();
      if (!msg) {
        showToast('Please enter a message for the requester.', 'error');
        return;
      }
      showToast(`Info request sent to the panel manager for ${this.currentReqId}.`, 'info');
      this.removeCurrentFromQueue();
      document.getElementById('info-message').value = '';
    });

    // Confirm Reject
    document.getElementById('btn-confirm-reject')?.addEventListener('click', () => {
      const reason = document.getElementById('reject-reason')?.value.trim();
      if (!reason) {
        showToast('Please provide a rejection reason.', 'error');
        return;
      }
      showToast(`${this.currentReqId} has been rejected. The requester has been notified.`, 'error');
      this.removeCurrentFromQueue();
      document.getElementById('reject-reason').value = '';
    });
  },

  /** Remove the currently selected item from the queue list and clear the panel */
  removeCurrentFromQueue() {
    const item = document.querySelector(`.fa-queue-item[data-req="${this.currentReqId}"]`);
    if (item) {
      item.style.transition = 'opacity 0.3s, transform 0.3s';
      item.style.opacity    = '0';
      item.style.transform  = 'translateX(20px)';
      setTimeout(() => item.remove(), 350);
    }
    setTimeout(() => this.clearDetail(), 400);
  },

  bindDetailClose() {
    document.getElementById('fa-detail-close-btn')?.addEventListener('click', () => {
      this.clearDetail();
    });
  },

  /* ── Search / Filter Queue ── */
  bindSearch() {
    const input = document.getElementById('approvals-search');
    if (!input) return;

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      document.querySelectorAll('.fa-queue-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  },

  setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
};


/* ──────────────────────────────────────────
   4. BOOT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  FundRequests.init();
  FundApprovals.init();

  // Export buttons
  document.getElementById('btn-export-requests')?.addEventListener('click', () => {
    showToast('Exporting fund request history as CSV…', 'info');
  });
  document.getElementById('btn-export-approvals')?.addEventListener('click', () => {
    showToast('Generating approvals report…', 'info');
  });
});
