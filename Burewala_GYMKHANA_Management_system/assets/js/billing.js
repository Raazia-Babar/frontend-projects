document.addEventListener('DOMContentLoaded', function() {
  // Initialize billing data storage
  let invoicesData = [
    {
      id: 'INV-2024-001',
      memberId: 'M001',
      memberName: 'Ahmed Ali',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 3000,
      tax: 480,
      total: 3480,
      status: 'paid',
      paymentDate: '2024-12-10',
      paymentMethod: 'bank_transfer',
      items: [
        { description: 'Monthly Membership Fee - Premium', quantity: 1, unitPrice: 3000, total: 3000 }
      ],
      notes: 'Paid on time'
    },
    {
      id: 'INV-2024-002',
      memberId: 'M002',
      memberName: 'Sarah Khan',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 5000,
      tax: 800,
      total: 5800,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Monthly Membership Fee - Family', quantity: 1, unitPrice: 5000, total: 5000 }
      ],
      notes: 'Family membership with 2 dependents'
    },
    {
      id: 'INV-2024-003',
      memberId: 'M003',
      memberName: 'Muhammad Raza',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 10000,
      tax: 1600,
      total: 11600,
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Monthly Membership Fee - Corporate', quantity: 1, unitPrice: 10000, total: 10000 }
      ],
      notes: 'Corporate account, overdue by 5 days'
    },
    {
      id: 'INV-2024-004',
      memberId: 'M004',
      memberName: 'Fatima Noor',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 1500,
      tax: 240,
      total: 1740,
      status: 'paid',
      paymentDate: '2024-12-05',
      paymentMethod: 'easypaisa',
      items: [
        { description: 'Monthly Membership Fee - Student', quantity: 1, unitPrice: 1500, total: 1500 }
      ],
      notes: 'Student discount applied'
    },
    {
      id: 'INV-2024-005',
      memberId: 'M005',
      memberName: 'Zain Malik',
      issueDate: '2024-11-01',
      dueDate: '2024-11-15',
      amount: 2000,
      tax: 320,
      total: 2320,
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Monthly Membership Fee - Regular', quantity: 1, unitPrice: 2000, total: 2000 }
      ],
      notes: 'Overdue by 1 month, late fee added'
    },
    {
      id: 'INV-2024-006',
      memberId: 'M006',
      memberName: 'Ayesha Tariq',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 3000,
      tax: 480,
      total: 3480,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [
        { description: 'Monthly Membership Fee - Premium', quantity: 1, unitPrice: 3000, total: 3000 }
      ],
      notes: ''
    },
    {
      id: 'INV-2024-007',
      memberId: 'M001',
      memberName: 'Ahmed Ali',
      issueDate: '2024-11-01',
      dueDate: '2024-11-15',
      amount: 3000,
      tax: 480,
      total: 3480,
      status: 'paid',
      paymentDate: '2024-11-10',
      paymentMethod: 'cash',
      items: [
        { description: 'Monthly Membership Fee - Premium', quantity: 1, unitPrice: 3000, total: 3000 }
      ],
      notes: ''
    }
  ];

  // Sample members data (would come from members module)
  let membersData = [
    { id: 'M001', name: 'Ahmed Ali', membershipType: 'premium', monthlyFee: 3000, status: 'active' },
    { id: 'M002', name: 'Sarah Khan', membershipType: 'family', monthlyFee: 5000, status: 'active' },
    { id: 'M003', name: 'Muhammad Raza', membershipType: 'corporate', monthlyFee: 10000, status: 'active' },
    { id: 'M004', name: 'Fatima Noor', membershipType: 'student', monthlyFee: 1500, status: 'active' },
    { id: 'M005', name: 'Zain Malik', membershipType: 'regular', monthlyFee: 2000, status: 'suspended' },
    { id: 'M006', name: 'Ayesha Tariq', membershipType: 'premium', monthlyFee: 3000, status: 'active' },
    { id: 'M007', name: 'Bilal Ahmed', membershipType: 'regular', monthlyFee: 2000, status: 'inactive' }
  ];

  // Pagination variables
  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredInvoices = [...invoicesData];
  let currentInvoiceItems = [];
  let viewingInvoiceId = null;

  // Initialize everything when DOM is ready
  init();

  function init() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
      
      document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
          if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
            sidebar.classList.remove('active');
          }
        }
      });
      
      document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            if (sidebar) sidebar.classList.remove('active');
          }
        });
      });
    }

    // Initialize invoices table
    renderInvoicesTable();
    updateStats();
    initializeEventListeners();
    populateMemberSelect();
    setDefaultDates();
  }

  // Render invoices table with pagination
  function renderInvoicesTable() {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageInvoices = filteredInvoices.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    pageInvoices.forEach(invoice => {
      const statusClass = `status-${invoice.status}`;
      const statusText = invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);
      
      // Determine if overdue
      const today = new Date();
      const dueDate = new Date(invoice.dueDate);
      const isOverdue = invoice.status === 'pending' && dueDate < today;
      
      const row = document.createElement('tr');
      row.className = 'invoice-item-row';
      row.innerHTML = `
        <td>
          <div class="d-flex justify-content-center">
            <input class="form-check-input row-checkbox" type="checkbox" data-id="${invoice.id}">
          </div>
        </td>
        <td><strong>${invoice.id}</strong></td>
        <td>
          <div>${invoice.memberName}</div>
          <small class="text-muted">${invoice.memberId}</small>
        </td>
        <td>${formatDate(invoice.issueDate)}</td>
        <td class="${isOverdue ? 'text-danger fw-bold' : ''}">
          ${formatDate(invoice.dueDate)}
          ${isOverdue ? '<br><small class="text-danger">Overdue</small>' : ''}
        </td>
        <td class="fw-bold">PKR ${invoice.total.toLocaleString()}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${invoice.paymentDate ? formatDate(invoice.paymentDate) : '-'}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary view-invoice-btn" title="View" data-id="${invoice.id}">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-success record-payment-btn" title="Record Payment" data-id="${invoice.id}">
              <i class="bi bi-credit-card"></i>
            </button>
            <button class="btn btn-outline-danger delete-invoice-btn" title="Delete" data-id="${invoice.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Update pagination controls
    updatePagination();
    
    // Update showing count
    const showingCount = Math.min(endIndex, filteredInvoices.length);
    document.getElementById('showingCount').textContent = showingCount;

    // Re-attach event listeners
    attachRowEventListeners();
  }

  // Update pagination controls
  function updatePagination() {
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    const paginationEl = document.getElementById('pagination');
    
    if (!paginationEl) return;

    // Clear existing page numbers
    const pageItems = paginationEl.querySelectorAll('.page-item:not(#prevPage):not(#nextPage)');
    pageItems.forEach(item => item.remove());

    // Add page numbers
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      prevPage.after(pageItem);
    }

    // Update Previous/Next button states
    document.getElementById('prevPage').classList.toggle('disabled', currentPage === 1);
    document.getElementById('nextPage').classList.toggle('disabled', currentPage === totalPages);

    // Add click handlers to page links
    paginationEl.querySelectorAll('.page-link[data-page]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = parseInt(this.getAttribute('data-page'));
        if (page !== currentPage) {
          currentPage = page;
          renderInvoicesTable();
        }
      });
    });

    // Previous button handler
    document.getElementById('prevPage').addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        renderInvoicesTable();
      }
    });

    // Next button handler
    document.getElementById('nextPage').addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        renderInvoicesTable();
      }
    });
  }

  // Initialize all event listeners
  function initializeEventListeners() {
    // Quick actions
    const quickGenerateBtn = document.getElementById('quickGenerate');
    const quickFilterBtn = document.getElementById('quickFilter');
    const quickSearchInput = document.getElementById('quickSearch');
    
    if (quickGenerateBtn) quickGenerateBtn.addEventListener('click', quickGenerateBills);
    if (quickFilterBtn) quickFilterBtn.addEventListener('click', filterTable);
    if (quickSearchInput) quickSearchInput.addEventListener('input', filterTable);

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', function(e) {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
      });
    }

    // Bulk actions
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    const bulkMarkPaidBtn = document.getElementById('bulkMarkPaidBtn');
    const bulkSendRemindersBtn = document.getElementById('bulkSendRemindersBtn');
    
    if (bulkDeleteBtn) bulkDeleteBtn.addEventListener('click', bulkDeleteSelected);
    if (bulkMarkPaidBtn) bulkMarkPaidBtn.addEventListener('click', bulkMarkPaid);
    if (bulkSendRemindersBtn) bulkSendRemindersBtn.addEventListener('click', bulkSendReminders);

    // Create invoice form
    const createInvoiceForm = document.getElementById('createInvoiceForm');
    if (createInvoiceForm) {
      createInvoiceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        createInvoice();
      });
    }

    // Generate bulk form
    const generateBulkForm = document.getElementById('generateBulkForm');
    if (generateBulkForm) {
      generateBulkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateBulkBills();
      });
    }

    // Record payment form
    const recordPaymentForm = document.getElementById('recordPaymentForm');
    if (recordPaymentForm) {
      recordPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        recordPayment();
      });
    }

    // Invoice items
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) addItemBtn.addEventListener('click', addInvoiceItem);

    // Invoice type change
    const invoiceTypeSelect = document.getElementById('invoiceType');
    if (invoiceTypeSelect) {
      invoiceTypeSelect.addEventListener('change', handleInvoiceTypeChange);
    }

    // Payment method change
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
      paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
    }

    // Preview invoice button
    const previewInvoiceBtn = document.getElementById('previewInvoiceBtn');
    if (previewInvoiceBtn) previewInvoiceBtn.addEventListener('click', previewInvoice);

    // Print invoice button
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    if (printInvoiceBtn) printInvoiceBtn.addEventListener('click', printInvoice);

    // Record payment button
    const recordPaymentModalBtn = document.getElementById('recordPaymentBtn');
    if (recordPaymentModalBtn) recordPaymentModalBtn.addEventListener('click', showRecordPaymentModal);

    // Modal close handlers
    setupModalHandlers();
  }

  // Attach event listeners to table rows
  function attachRowEventListeners() {
    // View invoice buttons
    document.querySelectorAll('.view-invoice-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-id');
        viewInvoice(invoiceId);
      });
    });

    // Record payment buttons
    document.querySelectorAll('.record-payment-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-id');
        recordPaymentForInvoice(invoiceId);
      });
    });

    // Delete invoice buttons
    document.querySelectorAll('.delete-invoice-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-id');
        deleteInvoice(invoiceId);
      });
    });
  }

  // Setup modal handlers
  function setupModalHandlers() {
    // Create invoice modal
    const createInvoiceModal = document.getElementById('createInvoiceModal');
    if (createInvoiceModal) {
      createInvoiceModal.addEventListener('shown.bs.modal', function() {
        setDefaultInvoiceDates();
      });
      createInvoiceModal.addEventListener('hidden.bs.modal', function() {
        clearInvoiceForm();
      });
    }

    // View invoice modal
    const viewInvoiceModal = document.getElementById('viewInvoiceModal');
    if (viewInvoiceModal) {
      viewInvoiceModal.addEventListener('hidden.bs.modal', function() {
        viewingInvoiceId = null;
      });
    }

    // Record payment modal
    const recordPaymentModal = document.getElementById('recordPaymentModal');
    if (recordPaymentModal) {
      recordPaymentModal.addEventListener('shown.bs.modal', function() {
        setDefaultPaymentDate();
      });
      recordPaymentModal.addEventListener('hidden.bs.modal', function() {
        viewingInvoiceId = null;
      });
    }
  }

  // Filter table based on search and filters
  function filterTable() {
    const searchTerm = document.getElementById('quickSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('quickStatus')?.value || '';

    filteredInvoices = invoicesData.filter(invoice => {
      // Search term filter
      const searchMatch = !searchTerm ||
        invoice.id.toLowerCase().includes(searchTerm) ||
        invoice.memberName.toLowerCase().includes(searchTerm) ||
        invoice.memberId.toLowerCase().includes(searchTerm);

      // Status filter
      let statusMatch = !statusFilter;
      if (statusFilter === 'overdue') {
        const today = new Date();
        const dueDate = new Date(invoice.dueDate);
        statusMatch = invoice.status === 'pending' && dueDate < today;
      } else {
        statusMatch = !statusFilter || invoice.status === statusFilter;
      }

      return searchMatch && statusMatch;
    });

    currentPage = 1;
    renderInvoicesTable();
    updateStats();
  }

  // Update statistics
  function updateStats() {
    const totalDue = invoicesData
      .filter(inv => inv.status === 'pending')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const paidThisMonth = invoicesData
      .filter(inv => inv.status === 'paid' && isThisMonth(inv.paymentDate))
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const overdueCount = invoicesData.filter(inv => {
      const today = new Date();
      const dueDate = new Date(inv.dueDate);
      return inv.status === 'pending' && dueDate < today;
    }).length;
    
    const pendingCount = invoicesData.filter(inv => inv.status === 'pending').length;

    document.getElementById('totalDue').textContent = `PKR ${totalDue.toLocaleString()}`;
    document.getElementById('paidThisMonth').textContent = `PKR ${paidThisMonth.toLocaleString()}`;
    document.getElementById('overdueCount').textContent = overdueCount;
    document.getElementById('pendingInvoices').textContent = pendingCount;
    
    // Update estimated count for bulk generation
    const estimatedCount = membersData.filter(m => m.status === 'active').length;
    const estimatedCountEl = document.getElementById('estimatedCount');
    if (estimatedCountEl) estimatedCountEl.textContent = estimatedCount;
  }

  // Check if date is in current month
  function isThisMonth(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }

  // Populate member select dropdown
  function populateMemberSelect() {
    const select = document.getElementById('invoiceMemberSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select Member</option>';
    membersData.forEach(member => {
      if (member.status === 'active') {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = `${member.name} (${member.id}) - ${member.membershipType} - PKR ${member.monthlyFee}/month`;
        select.appendChild(option);
      }
    });
  }

  // Set default dates
  function setDefaultDates() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Due date is 15 days from now
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 15);
    const dueDateStr = dueDate.toISOString().split('T')[0];
    
    // Set quick date
    const quickDate = document.getElementById('quickDate');
    if (quickDate) quickDate.value = todayStr;
    
    // Set bulk due date
    const bulkDueDate = document.getElementById('bulkDueDate');
    if (bulkDueDate) bulkDueDate.value = dueDateStr;
    
    // Set billing month to current month
    const billingMonth = document.getElementById('billingMonth');
    if (billingMonth) {
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      billingMonth.value = `${year}-${month}`;
    }
  }

  // Set default invoice dates
  function setDefaultInvoiceDates() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Due date is 15 days from now
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 15);
    const dueDateStr = dueDate.toISOString().split('T')[0];
    
    const issueDateInput = document.getElementById('issueDate');
    const dueDateInput = document.getElementById('dueDate');
    
    if (issueDateInput) issueDateInput.value = todayStr;
    if (dueDateInput) dueDateInput.value = dueDateStr;
  }

  // Set default payment date to today
  function setDefaultPaymentDate() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const paymentDateInput = document.getElementById('paymentDate');
    if (paymentDateInput) paymentDateInput.value = todayStr;
  }

  // Format date
  function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  // Generate new invoice ID
  function generateInvoiceId() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    
    // Find highest number for this month
    const prefix = `INV-${year}-${month}-`;
    const existingIds = invoicesData
      .filter(inv => inv.id.startsWith(prefix))
      .map(inv => parseInt(inv.id.split('-').pop()));
    
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const nextId = String(maxId + 1).padStart(3, '0');
    
    return `${prefix}${nextId}`;
  }

  // Handle invoice type change
  function handleInvoiceTypeChange() {
    const type = document.getElementById('invoiceType').value;
    const memberSelect = document.getElementById('invoiceMemberSelect');
    const selectedMemberId = memberSelect.value;
    
    if (type === 'membership' && selectedMemberId) {
      // Pre-fill with membership fee
      const member = membersData.find(m => m.id === selectedMemberId);
      if (member) {
        currentInvoiceItems = [{
          description: `Monthly Membership Fee - ${member.membershipType}`,
          quantity: 1,
          unitPrice: member.monthlyFee,
          total: member.monthlyFee
        }];
        updateInvoiceItemsTable();
      }
    } else if (currentInvoiceItems.length === 1 && currentInvoiceItems[0].description.includes('Membership Fee')) {
      // Clear if switching from membership type
      currentInvoiceItems = [];
      updateInvoiceItemsTable();
    }
  }

  // Add invoice item
  function addInvoiceItem() {
    const newItem = {
      description: 'New Item',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    currentInvoiceItems.push(newItem);
    updateInvoiceItemsTable();
  }

  // Remove invoice item
  function removeInvoiceItem(index) {
    currentInvoiceItems.splice(index, 1);
    updateInvoiceItemsTable();
  }

  // Update invoice item
  function updateInvoiceItem(index, field, value) {
    if (currentInvoiceItems[index]) {
      currentInvoiceItems[index][field] = value;
      
      // Recalculate total if quantity or unit price changed
      if (field === 'quantity' || field === 'unitPrice') {
        const item = currentInvoiceItems[index];
        item.total = item.quantity * item.unitPrice;
      }
      
      updateInvoiceItemsTable();
    }
  }

  // Update invoice items table
  function updateInvoiceItemsTable() {
    const tbody = document.getElementById('invoiceItemsBody');
    const noItemsRow = document.getElementById('noItemsRow');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (currentInvoiceItems.length === 0) {
      noItemsRow.style.display = '';
      tbody.appendChild(noItemsRow);
    } else {
      noItemsRow.style.display = 'none';
      
      currentInvoiceItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <input type="text" class="form-control form-control-sm" 
                   value="${item.description}" 
                   onchange="updateInvoiceItem(${index}, 'description', this.value)">
          </td>
          <td>
            <input type="number" class="form-control form-control-sm" 
                   value="${item.quantity}" min="1"
                   onchange="updateInvoiceItem(${index}, 'quantity', this.value)">
          </td>
          <td>
            <input type="number" class="form-control form-control-sm" 
                   value="${item.unitPrice}" min="0" step="100"
                   onchange="updateInvoiceItem(${index}, 'unitPrice', this.value)">
          </td>
          <td>
            <input type="text" class="form-control form-control-sm" 
                   value="PKR ${item.total.toLocaleString()}" readonly>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-sm btn-outline-danger" 
                    onclick="removeInvoiceItem(${index})">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
    
    // Calculate totals
    calculateInvoiceTotals();
  }

  // Calculate invoice totals
  function calculateInvoiceTotals() {
    const subtotal = currentInvoiceItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.16; // 16% tax
    const total = subtotal + tax;
    
    const subtotalInput = document.getElementById('subtotal');
    const taxInput = document.getElementById('taxAmount');
    const totalInput = document.getElementById('totalAmount');
    
    if (subtotalInput) subtotalInput.value = `PKR ${subtotal.toLocaleString()}`;
    if (taxInput) taxInput.value = `PKR ${tax.toLocaleString()}`;
    if (totalInput) totalInput.value = `PKR ${total.toLocaleString()}`;
  }

  // Clear invoice form
  function clearInvoiceForm() {
    currentInvoiceItems = [];
    updateInvoiceItemsTable();
    
    const form = document.getElementById('createInvoiceForm');
    if (form) form.reset();
    setDefaultInvoiceDates();
  }

  // Create new invoice
  function createInvoice() {
    const memberSelect = document.getElementById('invoiceMemberSelect');
    const invoiceType = document.getElementById('invoiceType').value;
    const issueDate = document.getElementById('issueDate').value;
    const dueDate = document.getElementById('dueDate').value;
    const notes = document.getElementById('invoiceNotes').value;
    
    if (!memberSelect.value) {
      alert('Please select a member!');
      return;
    }
    
    if (currentInvoiceItems.length === 0) {
      alert('Please add at least one invoice item!');
      return;
    }
    
    const member = membersData.find(m => m.id === memberSelect.value);
    if (!member) {
      alert('Selected member not found!');
      return;
    }
    
    const subtotal = currentInvoiceItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.16;
    const total = subtotal + tax;
    
    const newInvoice = {
      id: generateInvoiceId(),
      memberId: member.id,
      memberName: member.name,
      issueDate: issueDate,
      dueDate: dueDate,
      amount: subtotal,
      tax: tax,
      total: total,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      items: [...currentInvoiceItems],
      notes: notes
    };
    
    invoicesData.unshift(newInvoice); // Add to beginning
    filteredInvoices = [...invoicesData];
    currentPage = 1;
    renderInvoicesTable();
    updateStats();
    
    showNotification(`Invoice ${newInvoice.id} created successfully!`, 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('createInvoiceModal'));
    if (modal) modal.hide();
    
    // Clear form
    clearInvoiceForm();
  }

  // Quick generate bills
  function quickGenerateBills() {
    const date = document.getElementById('quickDate').value;
    if (!date) {
      alert('Please select a date!');
      return;
    }
    
    // In a real app, this would generate bills for all active members
    showNotification('Monthly bills generated successfully!', 'success');
    
    // Simulate adding new invoices
    const activeMembers = membersData.filter(m => m.status === 'active');
    activeMembers.forEach(member => {
      const newInvoice = {
        id: generateInvoiceId(),
        memberId: member.id,
        memberName: member.name,
        issueDate: date,
        dueDate: new Date(new Date(date).setDate(new Date(date).getDate() + 15)).toISOString().split('T')[0],
        amount: member.monthlyFee,
        tax: member.monthlyFee * 0.16,
        total: member.monthlyFee * 1.16,
        status: 'pending',
        paymentDate: null,
        paymentMethod: null,
        items: [
          { description: `Monthly Membership Fee - ${member.membershipType}`, quantity: 1, unitPrice: member.monthlyFee, total: member.monthlyFee }
        ],
        notes: 'Automatically generated monthly bill'
      };
      
      // Check if invoice already exists for this month
      const existing = invoicesData.find(inv => 
        inv.memberId === member.id && 
        inv.issueDate.startsWith(date.substring(0, 7))
      );
      
      if (!existing) {
        invoicesData.unshift(newInvoice);
      }
    });
    
    filteredInvoices = [...invoicesData];
    currentPage = 1;
    renderInvoicesTable();
    updateStats();
  }

  // Generate bulk bills
  function generateBulkBills() {
    const billingMonth = document.getElementById('billingMonth').value;
    const dueDate = document.getElementById('bulkDueDate').value;
    const includeLateFee = document.getElementById('includeLateFee').checked;
    
    if (!billingMonth || !dueDate) {
      alert('Please fill all required fields!');
      return;
    }
    
    // In a real app, this would generate bills for all active members
    showNotification(`Bills generated for ${billingMonth}!`, 'success');
    
    // Simulate the process
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('generateBulkModal'));
      if (modal) modal.hide();
    }, 1500);
  }

  // View invoice details
  function viewInvoice(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;
    
    viewingInvoiceId = invoiceId;
    
    // Create invoice details HTML
    const content = document.getElementById('invoiceDetailsContent');
    if (!content) return;
    
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const isOverdue = invoice.status === 'pending' && dueDate < today;
    
    content.innerHTML = `
      <div class="invoice-print">
        <div class="invoice-header">
          <div class="row">
            <div class="col-6">
              <h4>BUREWALA GYMKHANA</h4>
              <p class="mb-0">123 Gymkhana Road, Burewala</p>
              <p class="mb-0">Phone: (067) 1234567</p>
              <p class="mb-0">Email: accounts@gymkhana.com</p>
            </div>
            <div class="col-6 text-end">
              <h3 class="text-gold">INVOICE</h3>
              <p class="mb-0"><strong>Invoice #:</strong> ${invoice.id}</p>
              <p class="mb-0"><strong>Issue Date:</strong> ${formatDate(invoice.issueDate)}</p>
              <p class="mb-0"><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
              <p class="mb-0"><strong>Status:</strong> <span class="status-badge status-${invoice.status}">${invoice.status.toUpperCase()}</span></p>
            </div>
          </div>
        </div>
        
        <div class="invoice-body">
          <div class="row mb-4">
            <div class="col-6">
              <h6>Bill To:</h6>
              <p class="mb-0"><strong>${invoice.memberName}</strong></p>
              <p class="mb-0">Member ID: ${invoice.memberId}</p>
            </div>
            <div class="col-6 text-end">
              <h6>Payment Information:</h6>
              ${invoice.status === 'paid' ? `
                <p class="mb-0">Paid on: ${formatDate(invoice.paymentDate)}</p>
                <p class="mb-0">Method: ${formatPaymentMethod(invoice.paymentMethod)}</p>
              ` : `
                <p class="mb-0 text-danger">Payment Pending</p>
                ${isOverdue ? '<p class="mb-0 text-danger"><strong>INVOICE OVERDUE</strong></p>' : ''}
              `}
            </div>
          </div>
          
          <div class="table-responsive">
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price (PKR)</th>
                  <th>Total (PKR)</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice.toLocaleString()}</td>
                    <td>${item.total.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
                  <td>PKR ${invoice.amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end"><strong>Tax (16%):</strong></td>
                  <td>PKR ${invoice.tax.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total Amount:</strong></td>
                  <td><strong>PKR ${invoice.total.toLocaleString()}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          ${invoice.notes ? `
            <div class="mt-4">
              <h6>Notes:</h6>
              <p>${invoice.notes}</p>
            </div>
          ` : ''}
        </div>
        
        <div class="invoice-footer">
          <div class="row">
            <div class="col-6">
              <h6>Payment Instructions:</h6>
              <p class="mb-1">• Bank Transfer: MCB Bank, Account #: 1234567890</p>
              <p class="mb-1">• Easypaisa: 0300-1234567</p>
              <p class="mb-1">• JazzCash: 0300-7654321</p>
              <p class="mb-1">• Cash payments at Gymkhana office</p>
            </div>
            <div class="col-6 text-end">
              <p class="mb-0">Thank you for your business!</p>
              <p class="mb-0"><strong>Burewala Gymkhana Management</strong></p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('viewInvoiceModal'));
    modal.show();
  }

  // Format payment method
  function formatPaymentMethod(method) {
    const methods = {
      'cash': 'Cash',
      'bank_transfer': 'Bank Transfer',
      'cheque': 'Cheque',
      'credit_card': 'Credit Card',
      'easypaisa': 'Easypaisa',
      'jazzcash': 'JazzCash'
    };
    return methods[method] || method;
  }

  // Preview invoice
  function previewInvoice() {
    // For now, just show a preview alert
    alert('Invoice preview feature coming soon!');
  }

  // Print invoice
  function printInvoice() {
    // Get the invoice print content
    const invoicePrintEl = document.getElementById('invoicePrint');
    const invoiceDetailsContent = document.getElementById('invoiceDetailsContent');
    
    if (invoicePrintEl && invoiceDetailsContent) {
      invoicePrintEl.innerHTML = invoiceDetailsContent.innerHTML;
      window.print();
    }
  }

  // Record payment for invoice
  function recordPaymentForInvoice(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;
    
    viewingInvoiceId = invoiceId;
    
    // Fill payment form
    document.getElementById('paymentInvoiceNo').value = invoice.id;
    document.getElementById('paymentAmountDue').value = invoice.total;
    document.getElementById('paymentAmount').value = invoice.total;
    setDefaultPaymentDate();
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('recordPaymentModal'));
    modal.show();
  }

  // Show record payment modal from view invoice
  function showRecordPaymentModal() {
    if (!viewingInvoiceId) return;
    recordPaymentForInvoice(viewingInvoiceId);
  }

  // Handle payment method change
  function handlePaymentMethodChange() {
    const method = document.getElementById('paymentMethod').value;
    const chequeDetails = document.getElementById('chequeDetails');
    
    if (chequeDetails) {
      chequeDetails.style.display = method === 'cheque' ? 'block' : 'none';
    }
  }

  // Record payment
  function recordPayment() {
    const invoiceId = viewingInvoiceId;
    if (!invoiceId) return;
    
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const method = document.getElementById('paymentMethod').value;
    const date = document.getElementById('paymentDate').value;
    const reference = document.getElementById('paymentReference').value;
    const notes = document.getElementById('paymentNotes').value;
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid payment amount!');
      return;
    }
    
    const invoiceIndex = invoicesData.findIndex(inv => inv.id === invoiceId);
    if (invoiceIndex === -1) return;
    
    const invoice = invoicesData[invoiceIndex];
    
    // Update invoice
    invoice.status = 'paid';
    invoice.paymentDate = date;
    invoice.paymentMethod = method;
    invoice.notes = invoice.notes ? `${invoice.notes}\nPayment recorded: ${formatDate(date)} - PKR ${amount} via ${formatPaymentMethod(method)} ${reference ? `(Ref: ${reference})` : ''}. ${notes}` : 
      `Payment recorded: ${formatDate(date)} - PKR ${amount} via ${formatPaymentMethod(method)} ${reference ? `(Ref: ${reference})` : ''}. ${notes}`;
    
    filteredInvoices = [...invoicesData];
    renderInvoicesTable();
    updateStats();
    
    showNotification(`Payment recorded for invoice ${invoiceId}!`, 'success');
    
    // Close modals
    const recordModal = bootstrap.Modal.getInstance(document.getElementById('recordPaymentModal'));
    if (recordModal) recordModal.hide();
    
    const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewInvoiceModal'));
    if (viewModal) viewModal.hide();
  }

  // Delete single invoice
  function deleteInvoice(invoiceId) {
    if (!confirm(`Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone.`)) {
      return;
    }
    
    const invoiceIndex = invoicesData.findIndex(inv => inv.id === invoiceId);
    if (invoiceIndex === -1) return;
    
    const invoice = invoicesData[invoiceIndex];
    invoicesData.splice(invoiceIndex, 1);
    filteredInvoices = [...invoicesData];
    currentPage = 1;
    renderInvoicesTable();
    updateStats();
    
    showNotification(`Invoice ${invoiceId} deleted successfully!`, 'danger');
  }

  // Bulk delete selected invoices
  function bulkDeleteSelected() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
      alert('Please select at least one invoice to delete.');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected invoice(s)? This action cannot be undone.`)) {
      return;
    }
    
    // Remove selected invoices
    invoicesData = invoicesData.filter(invoice => !selectedIds.includes(invoice.id));
    filteredInvoices = [...invoicesData];
    currentPage = 1;
    renderInvoicesTable();
    updateStats();
    
    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
    
    showNotification(`${selectedIds.length} invoice(s) deleted successfully!`, 'danger');
  }

  // Bulk mark as paid
  function bulkMarkPaid() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
      alert('Please select at least one invoice to mark as paid.');
      return;
    }
    
    if (!confirm(`Are you sure you want to mark ${selectedIds.length} selected invoice(s) as paid?`)) {
      return;
    }
    
    // Update selected invoices
    const today = new Date().toISOString().split('T')[0];
    invoicesData.forEach(invoice => {
      if (selectedIds.includes(invoice.id) && invoice.status !== 'paid') {
        invoice.status = 'paid';
        invoice.paymentDate = today;
        invoice.paymentMethod = 'cash';
        invoice.notes = invoice.notes ? `${invoice.notes}\nBulk marked as paid on ${formatDate(today)}` : 
          `Bulk marked as paid on ${formatDate(today)}`;
      }
    });
    
    filteredInvoices = [...invoicesData];
    renderInvoicesTable();
    updateStats();
    
    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
    
    showNotification(`${selectedIds.length} invoice(s) marked as paid!`, 'success');
  }

  // Bulk send reminders
  function bulkSendReminders() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
      alert('Please select at least one invoice to send reminders for.');
      return;
    }
    
    // Filter to get pending invoices
    const pendingInvoices = selectedIds.filter(id => {
      const invoice = invoicesData.find(inv => inv.id === id);
      return invoice && invoice.status === 'pending';
    });
    
    if (pendingInvoices.length === 0) {
      alert('No pending invoices selected.');
      return;
    }
    
    // In a real app, this would send email/SMS reminders
    showNotification(`Reminders sent for ${pendingInvoices.length} invoice(s)!`, 'info');
    
    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
  
  // Make functions available globally for inline event handlers
  window.updateInvoiceItem = updateInvoiceItem;
  window.removeInvoiceItem = removeInvoiceItem;
});