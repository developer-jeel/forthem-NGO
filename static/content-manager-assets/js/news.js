(function () {
  'use strict';

  function initFilterChips() {
    const chips = document.querySelectorAll('.filter-chips[data-filter-target="news-table"] .filter-chip');
    const table = document.getElementById('news-table');
    if (!table || chips.length === 0) return;

    const rows = table.querySelectorAll('tbody tr');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const filter = chip.getAttribute('data-filter-val');

        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');

        rows.forEach(function (row) {
          let visible = true;
          if (filter === 'published') visible = row.getAttribute('data-status') === 'published';
          else if (filter === 'draft') visible = row.getAttribute('data-status') === 'draft';

          if (visible) row.classList.remove('hidden');
          else row.classList.add('hidden');
        });
      });
    });
  }

  function init() {
    initFilterChips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
