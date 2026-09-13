/* ============================================================
   UNKE LIYE — Shared Form Validation
   ============================================================ */

'use strict';

// ============================
// Validators
// ============================
const Validators = {
  required: (value) => value.trim() !== '' || 'This field is required.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Please enter a valid email address.',
  phone: (value) => /^[6-9]\d{9}$/.test(value.replace(/\s/g, '')) || 'Please enter a valid 10-digit Indian mobile number.',
  minLength: (min) => (value) => value.trim().length >= min || `Must be at least ${min} characters.`,
  maxLength: (max) => (value) => value.trim().length <= max || `Must be no more than ${max} characters.`,
  numeric: (value) => /^\d+$/.test(value.trim()) || 'Must be a number.',
  minAmount: (min) => (value) => parseFloat(value) >= min || `Minimum amount is ₹${min}.`,
  pincode: (value) => /^\d{6}$/.test(value.trim()) || 'Please enter a valid 6-digit PIN code.',
  custom: (fn, msg) => (value) => fn(value) || msg,
};

// ============================
// Field Validation
// ============================
function validateField(field, rules) {
  const value = field.type === 'checkbox' ? String(field.checked) : field.value;
  let error = '';

  for (const rule of rules) {
    const result = rule(value);
    if (result !== true) {
      error = result;
      break;
    }
  }

  setFieldState(field, error);
  return error === '';
}

function setFieldState(field, errorMessage) {
  field.classList.toggle('error', !!errorMessage);
  field.classList.toggle('success', !errorMessage && field.value.trim() !== '');
  field.setAttribute('aria-invalid', !!errorMessage);

  const group  = field.closest('.form-group');
  if (!group) return;

  let errorEl = group.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    group.appendChild(errorEl);
  }

  if (errorMessage) {
    errorEl.innerHTML = `<span aria-hidden="true">⚠</span> ${errorMessage}`;
    errorEl.style.display = 'flex';
  } else {
    errorEl.style.display = 'none';
  }
}

// ============================
// Form Setup
// ============================
function setupForm(formEl, fieldRules, onSubmit) {
  if (!formEl) return;

  // Real-time validation on blur/change
  Object.entries(fieldRules).forEach(([name, rules]) => {
    const field = formEl.querySelector(`[name="${name}"]`);
    if (!field) return;

    field.addEventListener('blur', () => validateField(field, rules));
    field.addEventListener('input', () => {
      // Only show success on input, re-validate on next blur
      if (field.classList.contains('error')) validateField(field, rules);
    });
  });

  // Submit
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    Object.entries(fieldRules).forEach(([name, rules]) => {
      const field = formEl.querySelector(`[name="${name}"]`);
      if (!field) return;
      if (!validateField(field, rules)) valid = false;
    });

    if (valid) {
      onSubmit(formEl);
    } else {
      // Focus first error
      const firstError = formEl.querySelector('.error');
      if (firstError) firstError.focus();
    }
  });
}

// ============================
// File Upload Preview
// ============================
function setupFilePreview(inputEl, previewContainer) {
  if (!inputEl || !previewContainer) return;

  inputEl.addEventListener('change', () => {
    previewContainer.innerHTML = '';
    const files = Array.from(inputEl.files);

    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        img.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid var(--color-border);';
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
}

// ============================
// Expose Globally
// ============================
window.FormUtils = {
  Validators,
  validateField,
  setFieldState,
  setupForm,
  setupFilePreview,
};
