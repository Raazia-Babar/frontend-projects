document.addEventListener('DOMContentLoaded', function () {
  // Role switcher logic
  const roleSelect = document.getElementById('roleSelect');
  if (roleSelect) {
    roleSelect.addEventListener('change', applyRole);
    applyRole(); // initial
  }

  function applyRole() {
    const role = roleSelect ? roleSelect.value : 'superadmin';
    const navLinks = document.querySelectorAll('#main-nav a[data-role]');
    navLinks.forEach(a => {
      const allowed = a.getAttribute('data-role');
      if (allowed === 'all' || allowed === role) {
        a.style.display = 'flex';
      } else {
        a.style.display = 'none';
      }
    });
  }

  // Tab switching functionality
  const settingsTabs = document.querySelectorAll('#settingsTab button[data-bs-toggle="tab"]');
  settingsTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function (event) {
      const activeTab = event.target.getAttribute('data-bs-target');
      console.log('Switched to tab:', activeTab);
      // Save last active tab to localStorage
      localStorage.setItem('lastSettingsTab', activeTab);
    });
  });

  // Restore last active tab
  const lastTab = localStorage.getItem('lastSettingsTab');
  if (lastTab) {
    const tabToShow = document.querySelector(`#settingsTab button[data-bs-target="${lastTab}"]`);
    if (tabToShow) {
      const tab = new bootstrap.Tab(tabToShow);
      tab.show();
    }
  }

  // Form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          showAlert('Settings saved successfully!', 'success');
          
          // Restore button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  });

  // Select all functionality for users table
  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('table input[type="checkbox"]:not(#selectAll)');
      checkboxes.forEach(cb => {
        cb.checked = this.checked;
      });
    });
  }

  // Test connection buttons
  const testButtons = document.querySelectorAll('button:contains("Test Connection")');
  testButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Testing...';
      this.disabled = true;
      
      setTimeout(() => {
        showAlert('Connection test successful!', 'success');
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    });
  });

  // Password visibility toggle
  const passwordToggles = document.querySelectorAll('.btn-outline-secondary .bi-eye');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const input = this.closest('.input-group').querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('bi-eye');
      this.classList.toggle('bi-eye-slash');
    });
  });

  // Template preview
  const templateSelect = document.getElementById('templateSelect');
  if (templateSelect) {
    templateSelect.addEventListener('change', function () {
      const templates = {
        welcome: {
          subject: 'Welcome to Burewala Gymkhana!',
          body: 'Dear {{member_name}},\n\nWelcome to Burewala Gymkhana! We\'re excited to have you as a member.\n\nYour membership details:\n- Membership ID: {{member_id}}\n- Plan: {{membership_plan}}\n- Start Date: {{start_date}}\n- Expiry Date: {{expiry_date}}\n\nPlease keep this email for your records.\n\nBest regards,\nBurewala Gymkhana Team'
        },
        invoice: {
          subject: 'Invoice {{invoice_number}} from Burewala Gymkhana',
          body: 'Dear {{member_name}},\n\nPlease find attached invoice {{invoice_number}} for {{amount}}.\n\nDue Date: {{due_date}}\n\nThank you for your prompt payment.\n\nBest regards,\nBurewala Gymkhana Team'
        },
        payment: {
          subject: 'Payment Confirmation - Invoice {{invoice_number}}',
          body: 'Dear {{member_name}},\n\nThank you for your payment of {{amount}} for invoice {{invoice_number}}.\n\nPayment Date: {{payment_date}}\nTransaction ID: {{transaction_id}}\n\nBest regards,\nBurewala Gymkhana Team'
        },
        reminder: {
          subject: 'Payment Reminder - Invoice {{invoice_number}}',
          body: 'Dear {{member_name}},\n\nThis is a reminder that invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.\n\nPlease make payment at your earliest convenience.\n\nBest regards,\nBurewala Gymkhana Team'
        },
        renewal: {
          subject: 'Membership Renewal Reminder',
          body: 'Dear {{member_name}},\n\nYour membership ({{membership_plan}}) is expiring on {{expiry_date}}.\n\nPlease renew your membership to continue enjoying our facilities.\n\nBest regards,\nBurewala Gymkhana Team'
        },
        booking: {
          subject: 'Booking Confirmation - {{facility_name}}',
          body: 'Dear {{member_name}},\n\nYour booking for {{facility_name}} has been confirmed.\n\nBooking Details:\n- Date: {{booking_date}}\n- Time: {{booking_time}}\n- Duration: {{duration}}\n- Reference: {{booking_reference}}\n\nBest regards,\nBurewala Gymkhana Team'
        }
      };

      const template = templates[this.value];
      if (template) {
        const subjectInput = document.querySelector('#email [name="subject"]') || 
                           document.querySelector('#email input[placeholder*="Subject"]');
        const bodyTextarea = document.querySelector('#email textarea');
        
        if (subjectInput) subjectInput.value = template.subject;
        if (bodyTextarea) bodyTextarea.value = template.body;
      }
    });
  }

  // File preview for import
  const fileInput = document.querySelector('#importModal input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      const preview = this.closest('.modal-body').querySelector('.border.rounded');
      if (this.files && this.files[0]) {
        const fileName = this.files[0].name;
        preview.innerHTML = `<strong>File selected:</strong> ${fileName}<br><small class="text-muted">Size: ${formatFileSize(this.files[0].size)}</small>`;
      }
    });
  }

  // Danger zone actions confirmation
  const dangerButtons = document.querySelectorAll('#system .btn-outline-danger, #system .btn-danger');
  dangerButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (!this.hasAttribute('data-bs-toggle')) {
        e.preventDefault();
        const action = this.textContent.trim();
        if (confirm(`Are you sure you want to ${action}? This action cannot be undone.`)) {
          showAlert(`${action} initiated...`, 'warning');
          // Simulate action
          setTimeout(() => {
            showAlert(`${action} completed successfully!`, 'success');
          }, 3000);
        }
      }
    });
  });

  // Helper functions
  function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert alert-${type} alert-dismissible fade show`;
    alertDiv.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});