/* ============================================================
   RESCUE MANAGER — SHARED JAVASCRIPT
   rescue-manager/assets/js/app.js
   ============================================================ */
(function () {
  'use strict';

  /* ── State ────────────────────────────────────────────────── */
  const State = {
    incidents: [
      { id:'INC-001', time:'08:14', reporter:'Suresh Patil', phone:'9876543210', desc:'Injured cow trapped in open drain, cannot move.', location:'Aundh, Pune', pillar:'animal', priority:'high',    status:'open' },
      { id:'INC-002', time:'08:31', reporter:'Meena Deshpande', phone:'9823401234', desc:'Flash flood — building collapse risk, 4 families stranded.', location:'Kolhapur, MH', pillar:'disaster', priority:'critical', status:'dispatched' },
      { id:'INC-003', time:'09:02', reporter:'Ankit Sharma',  phone:'9011223344', desc:'Stray dog with deep laceration on right leg, aggressive.', location:'Kothrud, Pune', pillar:'animal', priority:'high',    status:'open' },
      { id:'INC-004', time:'09:18', reporter:'Priya Kulkarni', phone:'9765432101', desc:'Cat stuck 30 feet up on a construction crane.', location:'Baner, Pune', pillar:'animal', priority:'medium', status:'open' },
      { id:'INC-005', time:'09:45', reporter:'Raj Goswami',  phone:'9988776655', desc:'Water logging — elderly residents trapped on ground floor.', location:'Sangvi, Pune', pillar:'disaster', priority:'high', status:'open' },
      { id:'INC-006', time:'10:07', reporter:'Kavita More',  phone:'9654321098', desc:'Peacock found with broken wing near highway.', location:'Talegaon, Pune', pillar:'animal', priority:'medium', status:'open' },
      { id:'INC-007', time:'10:29', reporter:'Nilesh Kadam', phone:'9000111222', desc:'Snake (possibly cobra) entered a residential apartment.', location:'Hadapsar, Pune', pillar:'animal', priority:'critical', status:'dispatched' },
      { id:'INC-008', time:'10:51', reporter:'Seema Joshi',  phone:'9123456780', desc:'Bridge collapse risk — 20+ stranded after overnight rain.', location:'Nashik Highway', pillar:'disaster', priority:'critical', status:'open' },
    ],
    cases: [
      { id:'CASE-114', name:'Stray Dog (Max)', species:'Canine', injury:'Fractured hind leg + road rash', admitted:'2026-08-20', vet:'Aundh Vet Clinic', status:'icu' },
      { id:'CASE-115', name:'Injured Peacock', species:'Bird', injury:'Broken left wing', admitted:'2026-08-21', vet:'Wildlife SOS Partner', status:'observation' },
      { id:'CASE-116', name:'Street Cat (Luna)', species:'Feline', injury:'Severe malnutrition + mange', admitted:'2026-08-22', vet:'PawCare Clinic', status:'recovery' },
      { id:'CASE-117', name:'Injured Cow',    species:'Bovine', injury:'Open wound on right shoulder', admitted:'2026-08-24', vet:'Govt. Vet Hospital', status:'icu' },
      { id:'CASE-118', name:'Rescued Python', species:'Reptile', injury:'Stress, minor laceration', admitted:'2026-08-25', vet:'Wildlife Rescue Centre', status:'observation' },
      { id:'CASE-119', name:'Labrador (Bruno)', species:'Canine', injury:'Distemper, severe', admitted:'2026-08-26', vet:'City Animal Hospital', status:'icu' },
      { id:'CASE-120', name:'Stray Dog (Moti)', species:'Canine', injury:'Hit-and-run, spinal concern', admitted:'2026-08-27', vet:'Aundh Vet Clinic', status:'recovery' },
      { id:'CASE-121', name:'Kitten (x3)',   species:'Feline', injury:'Neonatal — no mother', admitted:'2026-08-27', vet:'PawCare Clinic', status:'ready' },
    ],
    fleet: [
      { id:'VAN-01', name:'Van 1 — Rescue Alpha', type:'Rescue Van', emoji:'🚐', crew:'Driver: Aarav Joshi · Paramedic: Sana Khan', status:'ready',      location:'Kothrud Station', fuel:82 },
      { id:'VAN-02', name:'Van 2 — Rescue Bravo', type:'Rescue Van', emoji:'🚐', crew:'Driver: Rohit Gupta · Vet: Dr. Megha Singh', status:'dispatched',  location:'En Route: Aundh', fuel:55 },
      { id:'VAN-03', name:'Van 3 — Rapid Response', type:'Heavy Van', emoji:'🚑', crew:'Driver: Kiran More · Paramedic: Dev Patel', status:'dispatched', location:'On-Site: Kolhapur', fuel:41 },
      { id:'VAN-04', name:'Van 4 — Swift',       type:'Rescue Van', emoji:'🚐', crew:'Driver: Neha Sawant · Vet: Dr. Rahul Shah',   status:'ready',    location:'Hadapsar Station', fuel:90 },
      { id:'VAN-05', name:'Van 5 — Guardian',    type:'Rescue Van', emoji:'🚐', crew:'Driver: Suresh Das',                            status:'ready',    location:'Baner Station', fuel:67 },
      { id:'VAN-06', name:'Van 6 — Echo',        type:'Rescue Van', emoji:'🚐', crew:'Unassigned',                                   status:'outofservice', location:'Garage — Maintenance', fuel:20 },
      { id:'BOAT-A', name:'Rescue Boat A',        type:'Inflatable Boat', emoji:'🛥️', crew:'Crew: Amol Patil, Sanjay Rao, Priti Nair', status:'ready', location:'Pune River Dock', fuel:88 },
      { id:'BOAT-B', name:'Rescue Boat B',        type:'Motorboat', emoji:'⛵', crew:'Crew: Vijay Kadam, Sneha Pawar',              status:'dispatched', location:'En Route: Sangvi', fuel:54 },
    ],
    volunteers: [
      { id:'V01', name:'Arjun Desai',   initials:'AD', area:'Kothrud',  phone:'9876541230', skills:['Snake Handler','First Aid Certified'], avail:'on-call' },
      { id:'V02', name:'Sneha Kulkarni', initials:'SK', area:'Hadapsar', phone:'9012341234', skills:['Vet Student','Animal Behaviorist'], avail:'active' },
      { id:'V03', name:'Rohan Pawar',   initials:'RP', area:'Sangvi',   phone:'9988771234', skills:['Swimmer','Disaster Relief'], avail:'on-call' },
      { id:'V04', name:'Ananya Joshi',  initials:'AJ', area:'Baner',    phone:'9765431234', skills:['First Aid Certified','Vet Student'], avail:'unavailable' },
      { id:'V05', name:'Dev Marathe',   initials:'DM', area:'Aundh',    phone:'9112231234', skills:['Swimmer','Rope Rescue'], avail:'on-call' },
      { id:'V06', name:'Pooja Nair',    initials:'PN', area:'Kothrud',  phone:'9800231234', skills:['Wildlife Handler','First Aid Certified'], avail:'active' },
      { id:'V07', name:'Kiran Shah',    initials:'KS', area:'Deccan',   phone:'9900001234', skills:['Driver','Animal Handler'], avail:'on-call' },
      { id:'V08', name:'Maya Gaikwad',  initials:'MG', area:'Hadapsar', phone:'9765009874', skills:['Vet Student','First Aid Certified'], avail:'unavailable' },
    ],
    liveFeeds: [
      { dot:'critical', title:'Flash flood evacuation — Sangvi', meta:'Disaster · 3 boats requested', time:'10:51' },
      { dot:'high',     title:'Injured dog near Kothrud flyover', meta:'Animal Rescue · Van 1 dispatched', time:'10:42' },
      { dot:'medium',   title:'Cat rescue — Baner crane', meta:'Animal Rescue · Pending dispatch', time:'10:29' },
      { dot:'critical', title:'Snake in apartment — Hadapsar', meta:'Wildlife · Van 4 dispatched', time:'10:07' },
      { dot:'high',     title:'Peacock with broken wing', meta:'Wildlife · Assessment needed', time:'09:45' },
    ],
  };

  /* ── Mock live incident messages ────────────────────────────── */
  const mockAlerts = [
    'New hotline report: Stray dogs pack near Wakad school.',
    'Emergency: Water level rising at Erandwane residential complex.',
    'New report: Injured monkey sighted — Sinhagad Road.',
    'Flash flood warning issued for Panshet dam catchment area.',
    'Dog bite case: Victim at KEM Hospital, rescue animal needed.',
    'Turtle found on road — Mulshi ghat — pick-up requested.',
  ];

  /* ── Helpers ─────────────────────────────────────────────────── */
  function el(id) { return document.getElementById(id); }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function getStatusClass(status) {
    const map = { critical:'danger', high:'warning', medium:'info', low:'neutral',
                  icu:'danger', observation:'warning', recovery:'info', ready:'success',
                  open:'warning', dispatched:'info', completed:'success',
                  'on-call':'success', active:'info', unavailable:'neutral' };
    return map[status] || 'neutral';
  }
  function getStatusLabel(status) {
    const map = { critical:'Critical', high:'High', medium:'Medium', low:'Low',
                  icu:'ICU', observation:'Observation', recovery:'Recovery',
                  ready:'Ready for Release', open:'Open', dispatched:'Dispatched',
                  completed:'Completed', 'on-call':'On-Call', active:'Active on Field',
                  unavailable:'Unavailable' };
    return map[status] || status;
  }

  /* ── Theme ───────────────────────────────────────────────────── */
  function initTheme() {
    const html = document.documentElement;
    const saved = localStorage.getItem('rm-theme') || 'light';
    html.setAttribute('data-theme', saved);
    qsa('#theme-toggle, .theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = html.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('rm-theme', nextTheme);
      });
    });
  }

  /* ── Sidebar ─────────────────────────────────────────────────── */
  function initSidebar() {
    const shell      = qs('.app-shell');
    const sidebar    = el('sidebar');
    const collapseBtn= el('sidebar-collapse');
    const menuBtn    = el('mobile-menu-toggle');
    const overlay    = el('sidebar-overlay');
    if (!sidebar) return;

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        shell && shell.classList.toggle('sidebar-collapsed');
      });
    }
    function openSidebar()  { sidebar.classList.add('mobile-open'); overlay && overlay.classList.add('active'); document.body.style.overflow='hidden'; }
    function closeSidebar() { sidebar.classList.remove('mobile-open'); overlay && overlay.classList.remove('active'); document.body.style.overflow=''; }
    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    qsa('.sidebar a').forEach(link => link.addEventListener('click', closeSidebar));
  }

  /* ── Dropdowns ───────────────────────────────────────────────── */
  function initDropdowns() {
    qsa('[data-dropdown]').forEach(trigger => {
      const menu = el(trigger.getAttribute('data-dropdown'));
      if (!menu) return;
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) menu.classList.add('open');
      });
    });
    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllDropdowns(); });
  }
  function closeAllDropdowns() {
    qsa('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }

  /* ── Modals ──────────────────────────────────────────────────── */
  function initModals() {
    qsa('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal-open')));
    });
    qsa('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-modal-close') || btn.closest('.modal-backdrop')?.id;
        closeModal(id);
      });
    });
    qsa('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(backdrop.id); });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const open = qs('.modal-backdrop.open');
        if (open) closeModal(open.id);
      }
    });
  }
  function openModal(id) {
    const b = el(id); if (!b) return;
    b.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = b.querySelector('button,input,select,textarea'); if(f) f.focus(); }, 100);
  }
  function closeModal(id) {
    const b = el(id); if (!b) return;
    b.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.openModal = openModal;
  window.closeModal = closeModal;

  /* ── Toasts ──────────────────────────────────────────────────── */
  function showToast(type, title, msg) {
    const region = el('toast-region'); if (!region) return;
    const icons = {
      success: '<polyline points="20 6 9 17 4 12"/>',
      danger:  '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
      info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
      warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.position = 'relative';
    toast.innerHTML = `
      <div class="toast-icon ${type}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">${icons[type]||icons.info}</svg>
      </div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
      <button class="toast-close" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="toast-bar ${type}"></div>`;
    toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
    region.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    setTimeout(() => dismissToast(toast), 5000);
  }
  function dismissToast(el) {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 350);
  }
  window.showToast = showToast;

  qsa('[data-toast]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast(btn.getAttribute('data-toast')||'info', btn.getAttribute('data-toast-title')||'Done', btn.getAttribute('data-toast-msg')||'');
    });
  });

  /* ── Search ──────────────────────────────────────────────────── */
  function initSearch() {
    qsa('[data-search-table]').forEach(input => {
      const tableId = input.getAttribute('data-search-table');
      const table   = el(tableId);
      if (!table) return;
      input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        let visible = 0;
        qsa('tbody tr', table).forEach(row => {
          const hidden = q !== '' && !row.textContent.toLowerCase().includes(q);
          row.classList.toggle('row-hidden', hidden);
          if (!hidden) visible++;
        });
        const empty = table.closest('.card')?.querySelector('[data-search-empty]');
        if (empty) empty.hidden = visible !== 0;
      });
    });
  }

  /* ── Filter Chips ────────────────────────────────────────────── */
  function initFilterChips() {
    qsa('.filter-chip[data-filter-val]').forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.closest('[data-filter-group]');
        const tableId = chip.getAttribute('data-filter-table') || (group && group.getAttribute('data-filter-table'));
        const attr    = chip.getAttribute('data-filter-attr') || 'data-priority';
        if (group) qsa('.filter-chip', group).forEach(c => c.classList.remove('active', 'active-danger'));
        chip.classList.add('active');
        const table = el(tableId); if (!table) return;
        const val = chip.getAttribute('data-filter-val');
        qsa('tbody tr', table).forEach(row => {
          if (val === 'all') { row.classList.remove('row-hidden'); }
          else { row.classList.toggle('row-hidden', row.getAttribute(attr) !== val); }
        });
      });
    });
  }

  /* ── Bar Chart Animation ─────────────────────────────────────── */
  function initCharts() {
    const bars = qsa('.bar-col-bar');
    if (!bars.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
    }, { threshold: 0.15 });
    bars.forEach(b => obs.observe(b));
  }

  /* ── Mock Live Notifications ─────────────────────────────────── */
  function initLiveNotifications() {
    let idx = 0;
    setInterval(() => {
      const msg = mockAlerts[idx % mockAlerts.length];
      idx++;
      showToast('warning', '🚨 Hotline Alert', msg);
      // Update notif badge count
      qsa('.notif-count').forEach(badge => {
        let n = parseInt(badge.textContent || '0') + 1;
        badge.textContent = n;
      });
    }, 75000 + Math.random() * 15000);
  }

  /* ── Incident Row Click ──────────────────────────────────────── */
  function initIncidentRows() {
    qsa('[data-incident-row]').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        const id = row.getAttribute('data-incident-row');
        const inc = State.incidents.find(i => i.id === id);
        if (!inc) return;
        const modal = el('incident-modal'); if (!modal) return;
        qs('[data-incident-id]', modal) && (qs('[data-incident-id]', modal).textContent = inc.id);
        qs('[data-incident-desc]', modal) && (qs('[data-incident-desc]', modal).textContent = inc.desc);
        qs('[data-incident-location]', modal) && (qs('[data-incident-location]', modal).textContent = inc.location);
        qs('[data-incident-reporter]', modal) && (qs('[data-incident-reporter]', modal).textContent = `${inc.reporter} · ${inc.phone}`);
        qs('[data-incident-time]', modal) && (qs('[data-incident-time]', modal).textContent = `Today, ${inc.time}`);
        qs('[data-incident-pillar]', modal) && (qs('[data-incident-pillar]', modal).textContent = inc.pillar === 'animal' ? '🐾 Animal Rescue' : '🚨 Disaster Relief');
        openModal('incident-modal');
      });
    });
  }

  /* ── Dispatch Action ─────────────────────────────────────────── */
  function initDispatchActions() {
    const dispatchForm = el('dispatch-form');
    if (dispatchForm) {
      dispatchForm.addEventListener('submit', e => {
        e.preventDefault();
        closeModal('dispatch-modal');
        showToast('success', 'Team Dispatched!', 'Unit assigned and crew notified via SMS.');
      });
    }
    // Status change selects on fleet cards
    qsa('.fleet-status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        showToast('info', 'Status Updated', `${sel.getAttribute('data-unit')} status changed to ${sel.value}.`);
      });
    });
  }

  /* ── Case Update ─────────────────────────────────────────────── */
  function initCaseUpdate() {
    const caseForm = el('case-update-form');
    if (caseForm) {
      caseForm.addEventListener('submit', e => {
        e.preventDefault();
        closeModal('case-modal');
        showToast('success', 'Case Updated', 'Treatment notes saved and status updated.');
      });
    }
  }

  /* ── Broadcast Alert ─────────────────────────────────────────── */
  function initBroadcast() {
    const form = el('broadcast-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = (el('broadcast-msg') || {}).value || '';
      if (!msg.trim()) { showToast('warning', 'Empty Message', 'Please write a message before broadcasting.'); return; }
      showToast('success', '📣 Alert Broadcast!', `SMS & WhatsApp sent to filtered volunteers.`);
      form.reset();
    });
  }

  /* ── Volunteer Card Filter ───────────────────────────────────── */
  function initVolunteerFilter() {
    const searchInput = el('vol-search');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      qsa('.vol-card').forEach(card => {
        card.style.display = (q === '' || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
    qsa('.vol-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        qsa('.vol-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.getAttribute('data-avail');
        qsa('.vol-card').forEach(card => {
          card.style.display = (val === 'all' || card.getAttribute('data-avail') === val) ? '' : 'none';
        });
      });
    });
  }

  /* ── Volunteer Task Assignment ────────────────────────────────── */
  function initVolunteerAssignments() {
    qsa('[data-assign-vol]').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-assign-vol');
        const inputName = el('assign-vol-name');
        if (inputName) inputName.value = name;
        openModal('assign-task-modal');
      });
    });

    const assignForm = el('assign-task-form');
    if (assignForm) {
      assignForm.addEventListener('submit', e => {
        e.preventDefault();
        closeModal('assign-task-modal');
        const name = el('assign-vol-name')?.value || 'Volunteer';
        const inc = el('assign-incident')?.value || 'Incident';
        showToast('success', 'Task Assigned!', `Rescue task ${inc} successfully assigned to ${name}.`);
      });
    }
  }

  /* ── Main Init ────────────────────────────────────────────────── */
  function init() {
    initTheme();
    initSidebar();
    initDropdowns();
    initModals();
    initSearch();
    initFilterChips();
    initCharts();
    initLiveNotifications();
    initIncidentRows();
    initDispatchActions();
    initCaseUpdate();
    initBroadcast();
    initVolunteerFilter();
    initVolunteerAssignments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
