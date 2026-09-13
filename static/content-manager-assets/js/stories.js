(function () {
  'use strict';

  function initFilterChips() {
    const chips = document.querySelectorAll('.filter-chips[data-filter-target="stories-grid"] .filter-chip');
    const grid = document.getElementById('stories-grid');
    if (!grid || chips.length === 0) return;

    const cards = grid.querySelectorAll('.story-card');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const filter = chip.getAttribute('data-filter-val');

        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');

        cards.forEach(function (card) {
          let visible = true;
          if (filter === 'published') visible = card.getAttribute('data-status') === 'published';
          else if (filter === 'draft') visible = card.getAttribute('data-status') === 'draft';
          else if (filter === 'featured') visible = card.querySelector('.star-btn.starred') !== null;

          if (visible) card.classList.remove('hidden');
          else card.classList.add('hidden');
        });
      });
    });
  }

  function initStarToggle() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.star-btn');
      if (!btn) return;
      e.preventDefault();

      const isStarred = btn.classList.toggle('starred');
      btn.setAttribute('aria-pressed', String(isStarred));
      btn.setAttribute('aria-label', isStarred ? 'Unfeature story' : 'Feature story');
      btn.textContent = isStarred ? '★' : '☆';

      if (typeof showToast === 'function') {
        showToast('info', isStarred ? 'Story Featured' : 'Story Unfeatured', 'Homepage feature status updated.');
      }
    });
  }

  function initEditorToolbar() {
    const toolbar = document.querySelector('.editor-toolbar');
    const editor = document.getElementById('story-editor');
    if (!toolbar || !editor) return;

    toolbar.addEventListener('click', function (e) {
      const btn = e.target.closest('.editor-btn');
      if (!btn) return;
      e.preventDefault();

      const cmd = btn.getAttribute('data-cmd');
      if (!cmd) return;

      editor.focus();

      switch (cmd) {
        case 'bold':
        case 'italic':
        case 'underline':
          document.execCommand(cmd, false, null);
          break;
        case 'h2':
          document.execCommand('formatBlock', false, '<h2>');
          break;
        case 'h3':
          document.execCommand('formatBlock', false, '<h3>');
          break;
        case 'insertUnorderedList':
          document.execCommand('insertUnorderedList', false, null);
          break;
        case 'createLink':
          const url = prompt('Enter URL:', 'https://');
          if (url) document.execCommand('createLink', false, url);
          break;
        case 'insertImage':
          const imgUrl = prompt('Enter image URL:', 'https://');
          if (imgUrl) document.execCommand('insertImage', false, imgUrl);
          break;
        case 'formatBlock':
          document.execCommand('formatBlock', false, '<blockquote>');
          break;
      }
    });
  }

  function init() {
    initFilterChips();
    initStarToggle();
    initEditorToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
