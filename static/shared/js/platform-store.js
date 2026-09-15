/* ============================================================
   SHARED PLATFORM STORE — UNKE LIYE NGO
   static/shared/js/platform-store.js
   ============================================================ */
(function() {
  'use strict';

  const STORAGE_KEY_FUND_REQS = 'unkeliye_fund_requests_v1';
  const STORAGE_KEY_BUDGETS   = 'unkeliye_budgets_v1';

  const initialFundRequests = [
    {
      id: 'FR-1042',
      title: 'Emergency Veterinary Spine Surgery — Stray Dog Raju',
      department: 'rescue',
      departmentName: 'Emergency Rescue & Medical',
      requestedBy: 'Dr. Ananya Sharma',
      requesterRole: 'Chief Veterinary Officer',
      priority: 'CRITICAL',
      requestType: 'Medical Treatment',
      category: 'Animal Welfare',
      relatedEntity: 'Incident #INC-2026-104',
      dateNeededBy: '2026-09-08',
      dateSubmitted: '2026-08-28T10:15:00Z',
      requestedAmount: 35000,
      approvedAmount: null,
      status: 'SUBMITTED',
      justification: 'Severe pelvic and lower thoracic injury sustained in high-speed vehicle impact at Sion flyover. Urgent spinal decompression surgery and 3-week post-op cage stabilization mandatory.',
      breakdown: [
        { item: 'Decompression Neurosurgery & Implant Screws', amount: 18000 },
        { item: 'Pre-op CT Scan & Anesthesia Suite', amount: 7000 },
        { item: 'Post-op ICU Incubator & Meds', amount: 5000 },
        { item: 'Hydraulic Ambulance Transfer', amount: 5000 }
      ],
      documents: [{ name: 'Dr_Verma_Surgical_Estimate.pdf', size: '1.2 MB', type: 'Invoice Estimate' }]
    },
    {
      id: 'FR-1038',
      title: 'Anti-Venom & Trauma Ringer Lactate Replenishment',
      department: 'rescue',
      departmentName: 'Emergency Rescue & Medical',
      requestedBy: 'Karan Joshi',
      requesterRole: 'Chief Dispatcher',
      priority: 'HIGH',
      requestType: 'Medicine',
      category: 'Medical Inventory',
      relatedEntity: 'Central Parel Station Depot',
      dateNeededBy: '2026-09-02',
      dateSubmitted: '2026-08-25T14:30:00Z',
      requestedAmount: 18500,
      approvedAmount: 18500,
      status: 'DISBURSED',
      justification: 'Depot stock dropped below 15% threshold following flood rescue operations in Kolhapur & Sangvi.',
      breakdown: [
        { item: 'Polyvalent Anti-Venom (10 Vials)', amount: 12500 },
        { item: 'Ringer Lactate Infusion (50 Bags)', amount: 6000 }
      ],
      documents: [{ name: 'Apollo_Pharma_Invoice.pdf', size: '850 KB', type: 'Receipt' }]
    },
    {
      id: 'FR-1029',
      title: 'Inflatable Boat Engine Overhaul & Life Jackets',
      department: 'rescue',
      departmentName: 'Emergency Rescue & Medical',
      requestedBy: 'Amol Patil',
      requesterRole: 'Boat Unit Lead',
      priority: 'NORMAL',
      requestType: 'Equipment',
      category: 'Logistics',
      relatedEntity: 'Rescue Boat A',
      dateNeededBy: '2026-08-30',
      dateSubmitted: '2026-08-20T09:00:00Z',
      requestedAmount: 22000,
      approvedAmount: 22000,
      status: 'APPROVED',
      justification: 'Annual engine servicing and safety gear upgrade prior to peak monsoon season.',
      breakdown: [
        { item: 'Mercury 25HP Motor Servicing', amount: 14000 },
        { item: 'High-Buoyancy Rescue Vests (x6)', amount: 8000 }
      ],
      documents: [{ name: 'Marine_Repair_Quote.pdf', size: '640 KB', type: 'Quotation' }]
    }
  ];

  const initialBudgets = {
    rescue: { pool: 500000, spent: 415000, available: 85000 }
  };

  function loadStorage(key, defaultVal) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultVal;
    } catch (e) {
      console.warn('PlatformStore storage load error:', e);
      return defaultVal;
    }
  }

  function saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('PlatformStore storage save error:', e);
    }
  }

  let fundRequests = loadStorage(STORAGE_KEY_FUND_REQS, initialFundRequests);
  let budgets = loadStorage(STORAGE_KEY_BUDGETS, initialBudgets);

  window.PlatformStore = {
    getFundRequests: function() {
      return [...fundRequests];
    },
    getFundRequestById: function(id) {
      return fundRequests.find(r => r.id === id) || null;
    },
    createFundRequest: function(data) {
      const newId = 'FR-' + (1043 + fundRequests.length);
      const newReq = {
        id: newId,
        dateSubmitted: new Date().toISOString(),
        status: 'SUBMITTED',
        approvedAmount: null,
        ...data
      };
      fundRequests.unshift(newReq);
      saveStorage(STORAGE_KEY_FUND_REQS, fundRequests);
      return newReq;
    },
    getBudgets: function() {
      return { ...budgets };
    },
    updateBudget: function(dept, available) {
      if (budgets[dept]) {
        budgets[dept].available = available;
        saveStorage(STORAGE_KEY_BUDGETS, budgets);
      }
    }
  };
})();
