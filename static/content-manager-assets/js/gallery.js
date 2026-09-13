(function () {
  'use strict';

  function initLightbox() {
    const lightbox = document.getElementById('modal-lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const counterEl = document.getElementById('lightbox-counter');
    if (!lightbox || !imgEl) return;

    const items = Array.from(document.querySelectorAll('.photo-item img'));
    const srcs = items.map(function (img) { return img.getAttribute('data-lightbox-src'); });
    let currentIndex = 0;

    function openAt(index) {
      currentIndex = index;
      if (srcs[currentIndex]) imgEl.setAttribute('src', srcs[currentIndex]);
      if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + srcs.length;
      if (typeof openModal === 'function') openModal('modal-lightbox');
    }

    document.addEventListener('click', function (e) {
      const previewBtn = e.target.closest('.photo-preview-btn');
      if (!previewBtn) return;
      const item = previewBtn.closest('.photo-item');
      const img = item ? item.querySelector('img') : null;
      if (!img) return;
      const src = img.getAttribute('data-lightbox-src');
      const index = srcs.indexOf(src);
      openAt(index >= 0 ? index : 0);
    });

    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
        openAt(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % srcs.length;
        openAt(currentIndex);
      });
    }
  }

  function initUploadZone() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('file-upload-input');
    if (!zone) return;

    ['dragenter', 'dragover'].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('drag-over');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('drag-over');
      });
    });

    zone.addEventListener('drop', function (e) {
      const files = e.dataTransfer ? e.dataTransfer.files : null;
      const count = files ? files.length : 0;
      if (typeof showToast === 'function' && count > 0) {
        showToast('info', 'Upload Started', count + ' photo' + (count === 1 ? '' : 's') + ' queued for upload.');
      }
    });

    if (input) {
      input.addEventListener('change', function () {
        const count = input.files ? input.files.length : 0;
        if (typeof showToast === 'function' && count > 0) {
          showToast('info', 'Upload Started', count + ' photo' + (count === 1 ? '' : 's') + ' selected.');
        }
      });
    }
  }

  function init() {
    initLightbox();
    initUploadZone();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
