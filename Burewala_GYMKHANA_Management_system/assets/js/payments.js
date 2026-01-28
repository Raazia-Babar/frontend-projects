document.addEventListener('DOMContentLoaded', function() {
  // Initialize payments data storage
  let paymentsData = [
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-001',
      memberId: 'M001',
      memberName: 'Ahmed Ali',
      amount: 3480,
      date: '2024-12-10',
      time: '14:30',
      method: 'bank_transfer',
      status: 'completed',
      receivedBy: 'admin',
      reference: 'BTR-123456',
      description: 'Monthly membership fee - Premium',
      notes: 'Paid on time via bank transfer',
      createdAt: '2024-12-10 14:30:00'
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-004',
      memberId: 'M004',
      memberName: 'Fatima Noor',
      amount: 1740,
      date: '2024-12-05',
      time: '11:15',
      method: 'easypaisa',
      status: 'completed',
      receivedBy: 'finance',
      reference: 'EP-789012',
      description: 'Monthly membership fee - Student',
      notes: 'Student discount applied',
      createdAt: '2024-12-05 11:15:00'
    },
    {
      id: 'PAY-2024-003',
      invoiceId: 'INV-2024-007',
      memberId: 'M001',
      memberName: 'Ahmed Ali',
      amount: 3480,
      date: '2024-11-10',
      time: '09:45',
      method: 'cash',
      status: 'completed',
      receivedBy: 'admin',
      reference: '',
      description: 'Monthly membership fee - Premium',
      notes: 'Cash payment at counter',
      createdAt: '2024-11-10 09:45:00'
    },
    {
      id: 'PAY-2024-004',
      invoiceId: null,
      memberId: 'M002',
      memberName: 'Sarah Khan',
      amount: 10000,
      date: '2024-12-12',
      time: '16:20',
      method: 'bank_transfer',
      status: 'pending',
      receivedBy: 'finance',
      reference: 'BTR-789123',
      description: 'Advance payment for 2 months',
      notes: 'Bank transfer confirmation pending',
      createdAt: '2024-12-12 16:20:00'
    },
    {
      id: 'PAY-2024-005',
      invoiceId: null,
      memberId: 'M006',
      memberName: 'Ayesha Tariq',
      amount: 5000,
      date: '2024-12-11',
      time: '13:10',
      method: 'jazzcash',
      status: 'completed',
      receivedBy: 'membership',
      reference: 'JC-456789',
      description: 'Facility booking charges',
      notes: 'Tennis court booking for tournament',
      createdAt: '2024-12-11 13:10:00'
    },
    {
      id: 'PAY-2024-006',
      invoiceId: null,
      memberId: 'M003',
      memberName: 'Muhammad Raza',
      amount: 20000,
      date: '2024-12-09',
      time: '10:30',
      method: 'cheque',
      status: 'pending',
      receivedBy: 'finance',
      reference: 'CHQ-123456',
      description: 'Corporate membership renewal',
      notes: 'Cheque deposit, clearing in 3 days',
      createdAt: '2024-12-09 10:30:00'
    },
    {
      id: 'PAY-2024-007',
      invoiceId: null,
      memberId: 'M005',
      memberName: 'Zain Malik',
      amount: 5000,
      date: '2024-12-08',
      time: '15:45',
      method: 'cash',
      status: 'refunded',
      receivedBy: 'admin',
      reference: '',
      description: 'Security deposit refund',
      notes: 'Refunded as per termination agreement',
      createdAt: '2024-12-08 15:45:00'
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

  // Sample invoices data (would come from billing module)
  let invoicesData = [
    { id: 'INV-2024-001', memberId: 'M001', amount: 3480, status: 'paid', dueDate: '2024-12-15' },
    { id: 'INV-2024-002', memberId: 'M002', amount: 5800, status: 'pending', dueDate: '2024-12-15' },
    { id: 'INV-2024-003', memberId: 'M003', amount: 11600, status: 'pending', dueDate: '2024-12-15' },
    { id: 'INV-2024-004', memberId: 'M004', amount: 1740, status: 'paid', dueDate: '2024-12-15' },
    { id: 'INV-2024-005', memberId: 'M005', amount: 2320, status: 'pending', dueDate: '2024-11-15' },
    { id: 'INV-2024-006', memberId: 'M006', amount: 3480, status: 'pending', dueDate: '2024-12-15' },
    { id: 'INV-2024-007', memberId: 'M001', amount: 3480, status: 'paid', dueDate: '2024-11-15' }
  ];

  // Chart instances
  let paymentMethodsChart = null;
  let dailyCollectionChart = null;

  // Pagination variables
  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredPayments = [...paymentsData];
  let viewingPaymentId = null;
  let editingPaymentId = null;

  // Initialize everything when DOM is ready
  init();

  function init() {
    // Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
      console.error('Bootstrap JS not loaded!');
      return;
    }

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

    // Initialize payments table
    renderPaymentsTable();
    updateStats();
    
    // Initialize charts with delay to ensure DOM is ready
    setTimeout(() => {
      initializeCharts();
    }, 300);
    
    initializeEventListeners();
    populateMemberSelect();
    setDefaultDates();
    
    // Add window resize handler for charts
    window.addEventListener('resize', function() {
      if (paymentMethodsChart) {
        paymentMethodsChart.resize();
      }
      if (dailyCollectionChart) {
        dailyCollectionChart.resize();
      }
    });
  }

  // Render payments table with pagination
  function renderPaymentsTable() {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredPayments.length);
    const pagePayments = filteredPayments.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    pagePayments.forEach(payment => {
      const statusClass = `status-${payment.status}`;
      const statusText = payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
      
      const methodClass = `method-${getMethodType(payment.method)}`;
      const methodText = formatPaymentMethod(payment.method);
      
      const row = document.createElement('tr');
      row.className = 'payment-item-row';
      row.innerHTML = `
        <td>
          <div class="d-flex justify-content-center">
            <input class="form-check-input row-checkbox" type="checkbox" data-id="${payment.id}">
          </div>
        </td>
        <td><strong>${payment.id}</strong></td>
        <td>
          ${payment.invoiceId ? `<div class="fw-bold">${payment.invoiceId}</div>` : '<div class="text-muted">Direct Payment</div>'}
        </td>
        <td>
          <div>${payment.memberName}</div>
          <small class="text-muted">${payment.memberId}</small>
        </td>
        <td>
          <div>${formatDate(payment.date)}</div>
          <small class="text-muted">${payment.time}</small>
        </td>
        <td class="fw-bold text-success">PKR ${payment.amount.toLocaleString()}</td>
        <td><span class="method-badge ${methodClass}">${methodText}</span></td>
        <td><span class="payment-status ${statusClass}">${statusText}</span></td>
        <td>${formatReceivedBy(payment.receivedBy)}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary view-payment-btn" title="View" data-id="${payment.id}">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-warning edit-payment-btn" title="Edit" data-id="${payment.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger delete-payment-btn" title="Delete" data-id="${payment.id}">
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
    const showingCount = pagePayments.length;
    document.getElementById('showingCount').textContent = showingCount;

    // Re-attach event listeners
    attachRowEventListeners();
  }

  // Update pagination controls
  function updatePagination() {
    const totalPages = Math.max(1, Math.ceil(filteredPayments.length / itemsPerPage));
    const paginationEl = document.getElementById('pagination');
    
    if (!paginationEl) return;

    // Save the HTML structure
    const prevPageHtml = '<li class="page-item" id="prevPage"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
    const nextPageHtml = '<li class="page-item" id="nextPage"><a class="page-link" href="#">Next</a></li>';
    
    // Clear and rebuild pagination
    paginationEl.innerHTML = prevPageHtml;
    
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      paginationEl.appendChild(pageItem);
    }
    
    // Add next page
    const nextPageItem = document.createElement('li');
    nextPageItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextPageItem.id = 'nextPage';
    nextPageItem.innerHTML = '<a class="page-link" href="#">Next</a>';
    paginationEl.appendChild(nextPageItem);
    
    // Update Previous button state
    const prevPageItem = paginationEl.querySelector('#prevPage');
    if (prevPageItem) {
      prevPageItem.classList.toggle('disabled', currentPage === 1);
    }
    
    // Add click handlers
    attachPaginationHandlers(totalPages);
  }

  // Attach pagination handlers
  function attachPaginationHandlers(totalPages) {
    // Page number clicks
    document.querySelectorAll('.page-link[data-page]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = parseInt(this.getAttribute('data-page'));
        if (page !== currentPage && page >= 1 && page <= totalPages) {
          currentPage = page;
          renderPaymentsTable();
        }
      });
    });
    
    // Previous button
    const prevBtn = document.getElementById('prevPage');
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          renderPaymentsTable();
        }
      });
    }
    
    // Next button
    const nextBtn = document.getElementById('nextPage');
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          renderPaymentsTable();
        }
      });
    }
  }

  // Initialize charts
  function initializeCharts() {
    // Destroy existing charts if they exist
    if (paymentMethodsChart) {
      paymentMethodsChart.destroy();
    }
    if (dailyCollectionChart) {
      dailyCollectionChart.destroy();
    }
    
    // Payment Methods Distribution Chart
    const methodsCtx = document.getElementById('paymentMethodsChart')?.getContext('2d');
    if (methodsCtx) {
      paymentMethodsChart = new Chart(methodsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Cash', 'Bank Transfer', 'Easypaisa', 'JazzCash', 'Cheque', 'Other'],
          datasets: [{
            data: [48, 25, 15, 8, 4, 0],
            backgroundColor: [
              '#198754', // Cash
              '#0d6efd', // Bank Transfer
              '#20c997', // Easypaisa
              '#6f42c1', // JazzCash
              '#6c757d', // Cheque
              '#fd7e14'  // Others
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                boxWidth: 12,
                font: {
                  size: 11
                }
              }
            }
          }
        }
      });
    }

    // Daily Collection Chart
    const dailyCtx = document.getElementById('dailyCollectionChart')?.getContext('2d');
    if (dailyCtx) {
      dailyCollectionChart = new Chart(dailyCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Collection (PKR)',
            data: [25000, 18000, 32000, 28000, 42000, 15000, 8000],
            backgroundColor: '#daa520',
            borderColor: '#b8860b',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return 'PKR ' + value.toLocaleString();
                },
                maxTicksLimit: 8
              }
            },
            x: {
              ticks: {
                maxTicksLimit: 7
              }
            }
          }
        }
      });
    }
    
    // Ensure charts resize properly
    setTimeout(() => {
      if (paymentMethodsChart) paymentMethodsChart.resize();
      if (dailyCollectionChart) dailyCollectionChart.resize();
    }, 100);
  }

  // Initialize all event listeners
  function initializeEventListeners() {
    // Filter buttons
    const dateFilterBtn = document.getElementById('dateFilterBtn');
    const methodFilterBtn = document.getElementById('methodFilterBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (dateFilterBtn) dateFilterBtn.addEventListener('click', filterTable);
    if (methodFilterBtn) methodFilterBtn.addEventListener('click', filterTable);
    if (searchBtn) searchBtn.addEventListener('click', filterTable);
    if (searchInput) searchInput.addEventListener('input', filterTable);

    // Quick filter checkboxes
    const filterToday = document.getElementById('filterToday');
    const filterThisWeek = document.getElementById('filterThisWeek');
    const filterThisMonth = document.getElementById('filterThisMonth');
    const filterCash = document.getElementById('filterCash');
    const filterDigital = document.getElementById('filterDigital');
    
    if (filterToday) filterToday.addEventListener('change', filterTable);
    if (filterThisWeek) filterThisWeek.addEventListener('change', filterTable);
    if (filterThisMonth) filterThisMonth.addEventListener('change', filterTable);
    if (filterCash) filterCash.addEventListener('change', filterTable);
    if (filterDigital) filterDigital.addEventListener('change', filterTable);

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
    const bulkPrintReceiptsBtn = document.getElementById('bulkPrintReceiptsBtn');
    const exportPaymentsBtn = document.getElementById('exportPaymentsBtn');
    
    if (bulkDeleteBtn) bulkDeleteBtn.addEventListener('click', bulkDeleteSelected);
    if (bulkPrintReceiptsBtn) bulkPrintReceiptsBtn.addEventListener('click', bulkPrintReceipts);
    if (exportPaymentsBtn) exportPaymentsBtn.addEventListener('click', exportPayments);

    // Record payment form
    const recordPaymentForm = document.getElementById('recordPaymentForm');
    if (recordPaymentForm) {
      recordPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        recordPayment();
      });
    }

    // Edit payment form
    const editPaymentForm = document.getElementById('editPaymentForm');
    if (editPaymentForm) {
      editPaymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updatePayment();
      });
    }

    // Payment method change handler
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
      paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
    }

    // Member select change handler
    const memberSelect = document.getElementById('paymentMemberSelect');
    if (memberSelect) {
      memberSelect.addEventListener('change', handleMemberSelectChange);
    }

    // Print receipt button
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    if (printReceiptBtn) printReceiptBtn.addEventListener('click', printReceipt);

    // Void payment button
    const voidPaymentBtn = document.getElementById('voidPaymentBtn');
    if (voidPaymentBtn) voidPaymentBtn.addEventListener('click', voidPayment);

    // Modal close handlers
    setupModalHandlers();
  }

  // Attach event listeners to table rows
  function attachRowEventListeners() {
    // View payment buttons
    document.querySelectorAll('.view-payment-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const paymentId = this.getAttribute('data-id');
        viewPayment(paymentId);
      });
    });

    // Edit payment buttons
    document.querySelectorAll('.edit-payment-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const paymentId = this.getAttribute('data-id');
        editPayment(paymentId);
      });
    });

    // Delete payment buttons
    document.querySelectorAll('.delete-payment-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const paymentId = this.getAttribute('data-id');
        deletePayment(paymentId);
      });
    });

    // Row checkboxes
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateSelectAllCheckbox();
      });
    });
  }

  // Update select all checkbox state
  function updateSelectAllCheckbox() {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    
    if (selectAllCheckbox && checkboxes.length > 0) {
      const allChecked = Array.from(checkboxes).every(cb => cb.checked);
      const someChecked = Array.from(checkboxes).some(cb => cb.checked);
      
      selectAllCheckbox.checked = allChecked;
      selectAllCheckbox.indeterminate = !allChecked && someChecked;
    }
  }

  // Setup modal handlers
  function setupModalHandlers() {
    // Record payment modal
    const recordPaymentModal = document.getElementById('recordPaymentModal');
    if (recordPaymentModal) {
      recordPaymentModal.addEventListener('shown.bs.modal', function() {
        setDefaultPaymentDate();
      });
      recordPaymentModal.addEventListener('hidden.bs.modal', function() {
        clearRecordPaymentForm();
      });
    }

    // View payment modal
    const viewPaymentModal = document.getElementById('viewPaymentModal');
    if (viewPaymentModal) {
      viewPaymentModal.addEventListener('hidden.bs.modal', function() {
        viewingPaymentId = null;
      });
    }

    // Edit payment modal
    const editPaymentModal = document.getElementById('editPaymentModal');
    if (editPaymentModal) {
      editPaymentModal.addEventListener('hidden.bs.modal', function() {
        editingPaymentId = null;
      });
    }
  }

  // Filter table based on search and filters
  function filterTable() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    const methodFilter = document.getElementById('methodFilter')?.value || '';
    
    const filterToday = document.getElementById('filterToday')?.checked || false;
    const filterThisWeek = document.getElementById('filterThisWeek')?.checked || false;
    const filterThisMonth = document.getElementById('filterThisMonth')?.checked || false;
    const filterCash = document.getElementById('filterCash')?.checked || false;
    const filterDigital = document.getElementById('filterDigital')?.checked || false;

    filteredPayments = paymentsData.filter(payment => {
      // Search term filter
      const searchMatch = !searchTerm ||
        payment.id.toLowerCase().includes(searchTerm) ||
        payment.memberName.toLowerCase().includes(searchTerm) ||
        payment.memberId.toLowerCase().includes(searchTerm) ||
        (payment.invoiceId && payment.invoiceId.toLowerCase().includes(searchTerm)) ||
        (payment.reference && payment.reference.toLowerCase().includes(searchTerm)) ||
        (payment.description && payment.description.toLowerCase().includes(searchTerm));

      // Date filter
      let dateMatch = !dateFilter;
      if (dateFilter) {
        dateMatch = payment.date === dateFilter;
      }

      // Method filter
      const methodMatch = !methodFilter || payment.method === methodFilter;

      // Quick date filters
      let quickDateMatch = true;
      if (filterToday || filterThisWeek || filterThisMonth) {
        const paymentDate = new Date(payment.date);
        const today = new Date();
        
        if (filterToday) {
          quickDateMatch = paymentDate.toDateString() === today.toDateString();
        } else if (filterThisWeek) {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          quickDateMatch = paymentDate >= startOfWeek && paymentDate <= today;
        } else if (filterThisMonth) {
          quickDateMatch = paymentDate.getMonth() === today.getMonth() && 
                          paymentDate.getFullYear() === today.getFullYear();
        }
      }

      // Payment type filters
      let typeMatch = true;
      if (filterCash) {
        typeMatch = payment.method === 'cash';
      } else if (filterDigital) {
        typeMatch = ['bank_transfer', 'easypaisa', 'jazzcash', 'credit_card'].includes(payment.method);
      }

      return searchMatch && dateMatch && methodMatch && quickDateMatch && typeMatch;
    });

    currentPage = 1;
    renderPaymentsTable();
    updateStats();
    
    // Resize charts
    setTimeout(() => {
      if (paymentMethodsChart) paymentMethodsChart.resize();
      if (dailyCollectionChart) dailyCollectionChart.resize();
    }, 50);
  }

  // Update statistics
  function updateStats() {
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    let todaysCollection = 0;
    let todayCount = 0;
    let monthlyCollection = 0;
    let monthCount = 0;
    let cashCollection = 0;
    let digitalCollection = 0;
    
    paymentsData.forEach(payment => {
      if (payment.status === 'completed') {
        const paymentDate = new Date(payment.date);
        
        // Today's collection
        if (paymentDate.toDateString() === today) {
          todaysCollection += payment.amount;
          todayCount++;
        }
        
        // This month's collection
        if (paymentDate.getMonth() === thisMonth && paymentDate.getFullYear() === thisYear) {
          monthlyCollection += payment.amount;
          monthCount++;
        }
        
        // Cash vs digital
        if (payment.method === 'cash') {
          cashCollection += payment.amount;
        } else {
          digitalCollection += payment.amount;
        }
      }
    });
    
    document.getElementById('todaysCollection').textContent = `PKR ${todaysCollection.toLocaleString()}`;
    document.getElementById('todayCount').textContent = `${todayCount} payment${todayCount !== 1 ? 's' : ''}`;
    document.getElementById('monthlyCollection').textContent = `PKR ${monthlyCollection.toLocaleString()}`;
    document.getElementById('monthCount').textContent = `${monthCount} payment${monthCount !== 1 ? 's' : ''}`;
    document.getElementById('cashCollection').textContent = `PKR ${cashCollection.toLocaleString()}`;
    document.getElementById('digitalCollection').textContent = `PKR ${digitalCollection.toLocaleString()}`;
  }

  // Populate member select dropdown
  function populateMemberSelect() {
    const select = document.getElementById('paymentMemberSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select Member</option>';
    membersData.forEach(member => {
      if (member.status === 'active') {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = `${member.name} (${member.id}) - ${member.membershipType}`;
        select.appendChild(option);
      }
    });
  }

  // Handle member select change
  function handleMemberSelectChange() {
    const memberId = this.value;
    const invoiceSelect = document.getElementById('paymentInvoiceSelect');
    
    if (!invoiceSelect || !memberId) return;
    
    // Clear existing options except first two
    while (invoiceSelect.options.length > 2) {
      invoiceSelect.remove(2);
    }
    
    // Add pending invoices for this member
    const pendingInvoices = invoicesData.filter(inv => 
      inv.memberId === memberId && inv.status === 'pending'
    );
    
    pendingInvoices.forEach(invoice => {
      const option = document.createElement('option');
      option.value = invoice.id;
      option.textContent = `${invoice.id} - PKR ${invoice.amount.toLocaleString()} (Due: ${formatDate(invoice.dueDate)})`;
      invoiceSelect.appendChild(option);
    });
    
    // If no pending invoices, select "Direct Payment" by default
    if (pendingInvoices.length === 0) {
      invoiceSelect.value = 'direct';
    }
  }

  // Set default dates
  function setDefaultDates() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Set date filter to today
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) dateFilter.value = todayStr;
    
    // Set default payment date to today
    setDefaultPaymentDate();
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

  // Format payment method
  function formatPaymentMethod(method) {
    const methods = {
      'cash': 'Cash',
      'bank_transfer': 'Bank Transfer',
      'cheque': 'Cheque',
      'credit_card': 'Credit Card',
      'easypaisa': 'Easypaisa',
      'jazzcash': 'JazzCash',
      'other': 'Other'
    };
    return methods[method] || method;
  }

  // Get method type (cash/digital)
  function getMethodType(method) {
    return method === 'cash' ? 'cash' : 'digital';
  }

  // Format received by
  function formatReceivedBy(user) {
    const users = {
      'admin': 'Admin',
      'finance': 'Finance Officer',
      'membership': 'Membership Officer'
    };
    return users[user] || user;
  }

  // Handle payment method change
  function handlePaymentMethodChange() {
    const method = this.value;
    const detailsSection = document.getElementById('paymentDetailsSection');
    const bankDetails = document.getElementById('bankDetails');
    const chequeDetails = document.getElementById('chequeDetails');
    const mobileWalletDetails = document.getElementById('mobileWalletDetails');
    const referenceDetails = document.getElementById('referenceDetails');
    
    if (!detailsSection) return;
    
    // Hide all details sections first
    detailsSection.style.display = 'none';
    if (bankDetails) bankDetails.style.display = 'none';
    if (chequeDetails) chequeDetails.style.display = 'none';
    if (mobileWalletDetails) mobileWalletDetails.style.display = 'none';
    if (referenceDetails) referenceDetails.style.display = 'none';
    
    // Show relevant sections based on method
    if (method) {
      detailsSection.style.display = 'flex';
      
      switch(method) {
        case 'bank_transfer':
          if (bankDetails) bankDetails.style.display = 'block';
          if (referenceDetails) referenceDetails.style.display = 'block';
          break;
        case 'cheque':
          if (chequeDetails) chequeDetails.style.display = 'block';
          if (referenceDetails) referenceDetails.style.display = 'block';
          break;
        case 'easypaisa':
        case 'jazzcash':
          if (mobileWalletDetails) mobileWalletDetails.style.display = 'block';
          if (referenceDetails) referenceDetails.style.display = 'block';
          break;
        case 'credit_card':
        case 'other':
          if (referenceDetails) referenceDetails.style.display = 'block';
          break;
      }
    }
  }

  // Generate new payment ID
  function generatePaymentId() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    
    // Find highest number for this month
    const prefix = `PAY-${year}-${month}-`;
    const existingIds = paymentsData
      .filter(p => p.id.startsWith(prefix))
      .map(p => parseInt(p.id.split('-').pop()));
    
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const nextId = String(maxId + 1).padStart(3, '0');
    
    return `${prefix}${nextId}`;
  }

  // Clear record payment form
  function clearRecordPaymentForm() {
    const form = document.getElementById('recordPaymentForm');
    if (form) form.reset();
    setDefaultPaymentDate();
    
    // Hide details section
    const detailsSection = document.getElementById('paymentDetailsSection');
    if (detailsSection) detailsSection.style.display = 'none';
  }

  // Record new payment
  function recordPayment() {
    const memberSelect = document.getElementById('paymentMemberSelect');
    const invoiceSelect = document.getElementById('paymentInvoiceSelect');
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const date = document.getElementById('paymentDate').value;
    const method = document.getElementById('paymentMethod').value;
    const receivedBy = document.getElementById('receivedBy').value;
    const description = document.getElementById('paymentDescription').value;
    const notes = document.getElementById('paymentNotes').value;
    
    if (!memberSelect.value || !amount || !date || !method || !receivedBy) {
      alert('Please fill all required fields!');
      return;
    }
    
    const member = membersData.find(m => m.id === memberSelect.value);
    if (!member) {
      alert('Selected member not found!');
      return;
    }
    
    // Get current time
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const newPayment = {
      id: generatePaymentId(),
      invoiceId: invoiceSelect.value === 'direct' ? null : invoiceSelect.value,
      memberId: member.id,
      memberName: member.name,
      amount: amount,
      date: date,
      time: time,
      method: method,
      status: 'completed',
      receivedBy: receivedBy,
      reference: '',
      description: description || 'Payment received',
      notes: notes,
      createdAt: `${date} ${time}:00`
    };
    
    // Add reference if provided
    const referenceInput = document.querySelector('#paymentDetailsSection input[placeholder*="Reference"]');
    if (referenceInput && referenceInput.value) {
      newPayment.reference = referenceInput.value;
    }
    
    // Update invoice status if applicable
    if (newPayment.invoiceId) {
      const invoiceIndex = invoicesData.findIndex(inv => inv.id === newPayment.invoiceId);
      if (invoiceIndex !== -1) {
        invoicesData[invoiceIndex].status = 'paid';
      }
    }
    
    paymentsData.unshift(newPayment); // Add to beginning
    filteredPayments = [...paymentsData];
    currentPage = 1;
    renderPaymentsTable();
    updateStats();
    
    showNotification(`Payment ${newPayment.id} recorded successfully!`, 'success');
    
    // Close modal
    const modalEl = document.getElementById('recordPaymentModal');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();
    
    // Clear form
    clearRecordPaymentForm();
  }

  // View payment details
  function viewPayment(paymentId) {
    const payment = paymentsData.find(p => p.id === paymentId);
    if (!payment) return;
    
    viewingPaymentId = paymentId;
    
    // Create payment details HTML
    const content = document.getElementById('paymentDetailsContent');
    if (!content) return;
    
    content.innerHTML = `
      <div class="receipt-print">
        <div class="receipt-header">
          <h5 class="mb-1">BUREWALA GYMKHANA</h5>
          <p class="mb-1 small">123 Gymkhana Road, Burewala</p>
          <p class="mb-0 small">Phone: (067) 1234567</p>
          <hr class="my-2">
          <h6 class="mb-0">PAYMENT RECEIPT</h6>
        </div>
        
        <div class="receipt-body">
          <div class="receipt-line">
            <span>Receipt #:</span>
            <span><strong>${payment.id}</strong></span>
          </div>
          <div class="receipt-line">
            <span>Date:</span>
            <span>${formatDate(payment.date)} ${payment.time}</span>
          </div>
          <div class="receipt-line">
            <span>Member:</span>
            <span>${payment.memberName} (${payment.memberId})</span>
          </div>
          ${payment.invoiceId ? `
            <div class="receipt-line">
              <span>Invoice #:</span>
              <span>${payment.invoiceId}</span>
            </div>
          ` : ''}
          <div class="receipt-line">
            <span>Description:</span>
            <span>${payment.description}</span>
          </div>
          <div class="receipt-line">
            <span>Method:</span>
            <span><span class="method-badge method-${getMethodType(payment.method)}">${formatPaymentMethod(payment.method)}</span></span>
          </div>
          ${payment.reference ? `
            <div class="receipt-line">
              <span>Reference:</span>
              <span>${payment.reference}</span>
            </div>
          ` : ''}
          <div class="receipt-line">
            <span>Status:</span>
            <span><span class="payment-status status-${payment.status}">${payment.status.toUpperCase()}</span></span>
          </div>
          <div class="receipt-line">
            <span>Received By:</span>
            <span>${formatReceivedBy(payment.receivedBy)}</span>
          </div>
          
          <div class="receipt-line total">
            <span>TOTAL AMOUNT:</span>
            <span><strong>PKR ${payment.amount.toLocaleString()}</strong></span>
          </div>
        </div>
        
        <div class="receipt-footer">
          <p class="mb-1 small">Thank you for your payment!</p>
          <p class="mb-0 small"><strong>Burewala Gymkhana Management</strong></p>
          <p class="mb-0 small">This is a computer-generated receipt</p>
        </div>
        
        ${payment.notes ? `
          <div class="mt-3 p-2 border rounded">
            <small class="text-muted">Notes: ${payment.notes}</small>
          </div>
        ` : ''}
      </div>
    `;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('viewPaymentModal'));
    modal.show();
  }

  // Edit payment
  function editPayment(paymentId) {
    const payment = paymentsData.find(p => p.id === paymentId);
    if (!payment) return;
    
    editingPaymentId = paymentId;
    
    // Fill edit form
    const form = document.getElementById('editPaymentForm');
    if (!form) return;
    
    form.querySelector('#editPaymentId').value = payment.id;
    form.querySelector('#editPaymentAmount').value = payment.amount;
    form.querySelector('#editPaymentMethod').value = payment.method;
    form.querySelector('#editPaymentDate').value = payment.date;
    form.querySelector('#editPaymentNotes').value = payment.notes || '';
    
    // Show edit modal
    const modal = new bootstrap.Modal(document.getElementById('editPaymentModal'));
    modal.show();
  }

  // Update payment
  function updatePayment() {
    if (!editingPaymentId) return;
    
    const form = document.getElementById('editPaymentForm');
    if (!form) return;
    
    const amount = parseFloat(form.querySelector('#editPaymentAmount').value);
    const method = form.querySelector('#editPaymentMethod').value;
    const date = form.querySelector('#editPaymentDate').value;
    const notes = form.querySelector('#editPaymentNotes').value;
    
    const paymentIndex = paymentsData.findIndex(p => p.id === editingPaymentId);
    if (paymentIndex === -1) return;
    
    // Update payment data
    paymentsData[paymentIndex] = {
      ...paymentsData[paymentIndex],
      amount: amount,
      method: method,
      date: date,
      notes: notes
    };
    
    filteredPayments = [...paymentsData];
    renderPaymentsTable();
    updateStats();
    
    showNotification(`Payment ${editingPaymentId} updated successfully!`, 'success');
    
    // Close modal
    const modalEl = document.getElementById('editPaymentModal');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    if (modal) modal.hide();
    
    editingPaymentId = null;
  }

  // Print receipt
  function printReceipt() {
    if (!viewingPaymentId) return;
    
    // Get the payment
    const payment = paymentsData.find(p => p.id === viewingPaymentId);
    if (!payment) return;
    
    // Get receipt print element
    const receiptPrintEl = document.getElementById('receiptPrint');
    const paymentDetailsContent = document.getElementById('paymentDetailsContent');
    
    if (receiptPrintEl && paymentDetailsContent) {
      receiptPrintEl.innerHTML = paymentDetailsContent.innerHTML;
      
      // Create print styles
      const printStyles = document.createElement('style');
      printStyles.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #receiptPrint, #receiptPrint * {
            visibility: visible;
          }
          #receiptPrint {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(printStyles);
      
      // Print
      window.print();
      
      // Remove print styles after printing
      setTimeout(() => {
        document.head.removeChild(printStyles);
      }, 100);
    }
  }

  // Void payment
  function voidPayment() {
    if (!viewingPaymentId) return;
    
    if (!confirm(`Are you sure you want to void payment ${viewingPaymentId}? This action cannot be undone.`)) {
      return;
    }
    
    const paymentIndex = paymentsData.findIndex(p => p.id === viewingPaymentId);
    if (paymentIndex === -1) return;
    
    // Update payment status
    paymentsData[paymentIndex].status = 'void';
    paymentsData[paymentIndex].notes = paymentsData[paymentIndex].notes ? 
      `${paymentsData[paymentIndex].notes}\n[VOIDED on ${formatDate(new Date())}]` :
      `[VOIDED on ${formatDate(new Date())}]`;
    
    filteredPayments = [...paymentsData];
    renderPaymentsTable();
    updateStats();
    
    showNotification(`Payment ${viewingPaymentId} has been voided!`, 'danger');
    
    // Close modal
    const modalEl = document.getElementById('viewPaymentModal');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    if (modal) modal.hide();
  }

  // Delete single payment
  function deletePayment(paymentId) {
    if (!confirm(`Are you sure you want to delete payment ${paymentId}? This action cannot be undone.`)) {
      return;
    }
    
    const paymentIndex = paymentsData.findIndex(p => p.id === paymentId);
    if (paymentIndex === -1) return;
    
    const payment = paymentsData[paymentIndex];
    paymentsData.splice(paymentIndex, 1);
    filteredPayments = [...paymentsData];
    currentPage = 1;
    renderPaymentsTable();
    updateStats();
    
    showNotification(`Payment ${paymentId} deleted successfully!`, 'danger');
  }

  // Bulk delete selected payments
  function bulkDeleteSelected() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
      alert('Please select at least one payment to delete.');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected payment(s)? This action cannot be undone.`)) {
      return;
    }
    
    // Remove selected payments
    paymentsData = paymentsData.filter(payment => !selectedIds.includes(payment.id));
    filteredPayments = [...paymentsData];
    currentPage = 1;
    renderPaymentsTable();
    updateStats();
    
    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    }
    
    showNotification(`${selectedIds.length} payment(s) deleted successfully!`, 'danger');
  }

  // Bulk print receipts
  function bulkPrintReceipts() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
      alert('Please select at least one payment to print receipts.');
      return;
    }
    
    // For now, just show a message
    // In a real app, this would generate printable receipts for all selected payments
    showNotification(`Printing ${selectedIds.length} receipt(s)...`, 'info');
    
    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    }
  }

  // Export payments
  function exportPayments() {
    // Create CSV content
    const headers = ['Payment ID', 'Invoice #', 'Member ID', 'Member Name', 'Date', 'Time', 'Amount', 'Method', 'Status', 'Received By', 'Reference', 'Description'];
    const csvRows = [headers.join(',')];
    
    filteredPayments.forEach(payment => {
      const row = [
        payment.id,
        payment.invoiceId || '',
        payment.memberId,
        payment.memberName,
        payment.date,
        payment.time,
        payment.amount,
        formatPaymentMethod(payment.method),
        payment.status,
        formatReceivedBy(payment.receivedBy),
        payment.reference || '',
        payment.description
      ].map(field => `"${field}"`).join(',');
      csvRows.push(row);
    });
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_export_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`Exported ${filteredPayments.length} payment(s) to CSV!`, 'success');
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
});