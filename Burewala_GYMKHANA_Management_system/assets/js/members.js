document.addEventListener('DOMContentLoaded', function() {
  // Initialize members data storage
  let membersData = [
    {
      id: 'M001',
      fullName: 'Ahmed Ali',
      cnic: '35201-1234567-1',
      dob: '1990-05-15',
      gender: 'male',
      phone: '0300-1234567',
      email: 'ahmed.ali@example.com',
      address: '123 Main Street, Burewala',
      emergencyContact: '0300-7654321',
      membershipType: 'premium',
      joinDate: '2024-01-15',
      expiryDate: '2025-01-15',
      monthlyFee: 3000,
      currentBalance: 0,
      status: 'active',
      notes: 'Regular member, pays on time',
      avatarInitials: 'AA',
      avatarColor: 'primary'
    },
    {
      id: 'M002',
      fullName: 'Sarah Khan',
      cnic: '35202-7654321-2',
      dob: '1985-08-22',
      gender: 'female',
      phone: '0301-9876543',
      email: 'sarah.khan@example.com',
      address: '456 Park Road, Burewala',
      emergencyContact: '0301-1234567',
      membershipType: 'family',
      joinDate: '2023-11-10',
      expiryDate: '2024-11-10',
      monthlyFee: 5000,
      currentBalance: -1500,
      status: 'active',
      notes: 'Family membership with 2 dependents',
      avatarInitials: 'SK',
      avatarColor: 'success'
    },
    {
      id: 'M003',
      fullName: 'Muhammad Raza',
      cnic: '35203-9876543-3',
      dob: '1978-03-30',
      gender: 'male',
      phone: '0302-4567890',
      email: 'm.raza@example.com',
      address: '789 Commercial Area, Burewala',
      emergencyContact: '0302-9876543',
      membershipType: 'corporate',
      joinDate: '2024-02-01',
      expiryDate: '2025-02-01',
      monthlyFee: 10000,
      currentBalance: 5000,
      status: 'active',
      notes: 'Corporate account for XYZ Company',
      avatarInitials: 'MR',
      avatarColor: 'info'
    },
    {
      id: 'M004',
      fullName: 'Fatima Noor',
      cnic: '35204-2345678-4',
      dob: '1995-12-10',
      gender: 'female',
      phone: '0303-3456789',
      email: 'fatima.noor@example.com',
      address: '101 University Road, Burewala',
      emergencyContact: '0303-4567890',
      membershipType: 'student',
      joinDate: '2024-03-15',
      expiryDate: '2024-09-15',
      monthlyFee: 1500,
      currentBalance: 0,
      status: 'pending',
      notes: 'Student ID verification pending',
      avatarInitials: 'FN',
      avatarColor: 'warning'
    },
    {
      id: 'M005',
      fullName: 'Zain Malik',
      cnic: '35205-8765432-5',
      dob: '1982-07-18',
      gender: 'male',
      phone: '0304-5678901',
      email: 'zain.malik@example.com',
      address: '202 Garden Town, Burewala',
      emergencyContact: '0304-6789012',
      membershipType: 'regular',
      joinDate: '2023-09-20',
      expiryDate: '2024-03-20',
      monthlyFee: 2000,
      currentBalance: -3000,
      status: 'suspended',
      notes: 'Payment overdue by 2 months',
      avatarInitials: 'ZM',
      avatarColor: 'danger'
    },
    {
      id: 'M006',
      fullName: 'Ayesha Tariq',
      cnic: '35206-3456789-6',
      dob: '1992-04-25',
      gender: 'female',
      phone: '0305-6789012',
      email: 'ayesha.tariq@example.com',
      address: '303 Model Town, Burewala',
      emergencyContact: '0305-7890123',
      membershipType: 'premium',
      joinDate: '2024-01-05',
      expiryDate: '2025-01-05',
      monthlyFee: 3000,
      currentBalance: 0,
      status: 'active',
      notes: '',
      avatarInitials: 'AT',
      avatarColor: 'purple'
    },
    {
      id: 'M007',
      fullName: 'Bilal Ahmed',
      cnic: '35207-4567890-7',
      dob: '1988-11-30',
      gender: 'male',
      phone: '0306-7890123',
      email: 'bilal.ahmed@example.com',
      address: '404 Civil Lines, Burewala',
      emergencyContact: '0306-8901234',
      membershipType: 'regular',
      joinDate: '2023-12-12',
      expiryDate: '2024-06-12',
      monthlyFee: 2000,
      currentBalance: -1000,
      status: 'inactive',
      notes: 'Traveling abroad',
      avatarInitials: 'BA',
      avatarColor: 'secondary'
    }
  ];

  // Pagination variables
  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredMembers = [...membersData];

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
      
      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
          if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
            sidebar.classList.remove('active');
          }
        }
      });
      
      // Close sidebar when clicking a nav link on mobile
      document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            if (sidebar) sidebar.classList.remove('active');
          }
        });
      });
    }

    // Initialize members table
    renderMembersTable();
    updateStats();
    initializeEventListeners();
  }

  // Render members table with pagination
  function renderMembersTable() {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageMembers = filteredMembers.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    pageMembers.forEach(member => {
      const statusBadgeClass = `status-${member.status}`;
      const statusText = member.status.charAt(0).toUpperCase() + member.status.slice(1);
      
      // Determine balance color
      let balanceClass = 'balance-zero';
      let balanceText = `PKR ${member.currentBalance.toLocaleString()}`;
      
      if (member.currentBalance > 0) {
        balanceClass = 'balance-positive';
        balanceText = `+PKR ${member.currentBalance.toLocaleString()}`;
      } else if (member.currentBalance < 0) {
        balanceClass = 'balance-negative';
        balanceText = `-PKR ${Math.abs(member.currentBalance).toLocaleString()}`;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="d-flex justify-content-center">
            <input class="form-check-input row-checkbox" type="checkbox" data-id="${member.id}">
          </div>
        </td>
        <td><strong>${member.id}</strong></td>
        <td>
          <div class="d-flex align-items-center">
            <div class="avatar-circle bg-${member.avatarColor} me-2">
              <span class="avatar-text">${member.avatarInitials}</span>
            </div>
            <div>
              <div class="fw-bold">${member.fullName}</div>
              <small class="text-muted">${member.cnic}</small>
            </div>
          </div>
        </td>
        <td>
          <div>${member.phone}</div>
          <small class="text-muted">${member.email || 'No email'}</small>
        </td>
        <td><span class="badge bg-light text-dark border">${member.membershipType.toUpperCase()}</span></td>
        <td>${formatDate(member.joinDate)}</td>
        <td>
          <div class="${isExpiringSoon(member.expiryDate) ? 'text-warning fw-bold' : ''}">
            ${formatDate(member.expiryDate)}
          </div>
        </td>
        <td class="${balanceClass} fw-bold">${balanceText}</td>
        <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary view-btn" title="View" data-id="${member.id}">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-warning edit-btn" title="Edit" data-id="${member.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger delete-btn" title="Delete" data-id="${member.id}">
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
    const showingCount = Math.min(endIndex, filteredMembers.length);
    document.getElementById('showingCount').textContent = showingCount;
    document.getElementById('totalCount').textContent = filteredMembers.length;

    // Re-attach event listeners
    attachRowEventListeners();
  }

  // Update pagination controls
  function updatePagination() {
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginationEl = document.getElementById('pagination');
    
    if (!paginationEl) return;

    // Clear existing page numbers (keep Previous and Next)
    const pageItems = paginationEl.querySelectorAll('.page-item:not(#prevPage):not(#nextPage)');
    pageItems.forEach(item => item.remove());

    // Add page numbers
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    // Add page numbers
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
          renderMembersTable();
        }
      });
    });

    // Previous button handler
    document.getElementById('prevPage').addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        renderMembersTable();
      }
    });

    // Next button handler
    document.getElementById('nextPage').addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        renderMembersTable();
      }
    });
  }

  // Initialize all event listeners
  function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', filterTable);
    }

    // Clear search
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        filterTable();
      });
    }

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', function(e) {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
      });
    }

    // Filter by membership type and status
    const typeFilter = document.getElementById('membershipTypeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const dateFromFilter = document.getElementById('dateFromFilter');
    const dateToFilter = document.getElementById('dateToFilter');
    
    if (typeFilter) typeFilter.addEventListener('change', filterTable);
    if (statusFilter) statusFilter.addEventListener('change', filterTable);
    if (dateFromFilter) dateFromFilter.addEventListener('change', filterTable);
    if (dateToFilter) dateToFilter.addEventListener('change', filterTable);

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportData);
    }

    // Bulk actions
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    const bulkActivateBtn = document.getElementById('bulkActivateBtn');
    
    if (bulkDeleteBtn) {
      bulkDeleteBtn.addEventListener('click', bulkDeleteSelected);
    }
    if (bulkActivateBtn) {
      bulkActivateBtn.addEventListener('click', bulkActivateSelected);
    }

    // Add Member form submission
    const addMemberForm = document.getElementById('addMemberForm');
    if (addMemberForm) {
      addMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addMember();
      });
    }

    // Edit Member form submission
    const editMemberForm = document.getElementById('editMemberForm');
    if (editMemberForm) {
      editMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateMember();
      });
    }

    // View payments button
    const viewPaymentsBtn = document.getElementById('viewPaymentsBtn');
    if (viewPaymentsBtn) {
      viewPaymentsBtn.addEventListener('click', function() {
        alert('Payment history feature coming soon!');
      });
    }

    // Modal close handlers
    const addModal = document.getElementById('addMemberModal');
    const editModal = document.getElementById('editMemberModal');
    const viewModal = document.getElementById('viewMemberModal');

    if (addModal) {
      addModal.addEventListener('hidden.bs.modal', function() {
        const form = document.getElementById('addMemberForm');
        if (form) form.reset();
      });
    }

    if (editModal) {
      editModal.addEventListener('hidden.bs.modal', function() {
        editingMemberId = null;
        const form = document.getElementById('editMemberForm');
        if (form) form.reset();
      });
    }

    // Set default dates
    setDefaultDates();
  }

  // Attach event listeners to table rows
  function attachRowEventListeners() {
    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const memberId = this.getAttribute('data-id');
        viewMember(memberId);
      });
    });

    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const memberId = this.getAttribute('data-id');
        editMember(memberId);
      });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const memberId = this.getAttribute('data-id');
        deleteMember(memberId);
      });
    });
  }

  // Filter table based on search and filters
  function filterTable() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('membershipTypeFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const dateFromFilter = document.getElementById('dateFromFilter')?.value || '';
    const dateToFilter = document.getElementById('dateToFilter')?.value || '';

    filteredMembers = membersData.filter(member => {
      // Search term filter
      const searchMatch = !searchTerm ||
        member.id.toLowerCase().includes(searchTerm) ||
        member.fullName.toLowerCase().includes(searchTerm) ||
        member.cnic.toLowerCase().includes(searchTerm) ||
        member.phone.toLowerCase().includes(searchTerm) ||
        (member.email && member.email.toLowerCase().includes(searchTerm));

      // Type filter
      const typeMatch = !typeFilter || member.membershipType === typeFilter;

      // Status filter
      const statusMatch = !statusFilter || member.status === statusFilter;

      // Date range filter (join date)
      let dateMatch = true;
      if (dateFromFilter || dateToFilter) {
        const joinDate = new Date(member.joinDate);
        const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
        const toDate = dateToFilter ? new Date(dateToFilter) : null;
        
        if (fromDate && joinDate < fromDate) dateMatch = false;
        if (toDate && joinDate > toDate) dateMatch = false;
      }

      return searchMatch && typeMatch && statusMatch && dateMatch;
    });

    currentPage = 1; // Reset to first page
    renderMembersTable();
    updateStats();
  }

  // Update statistics
  function updateStats() {
    const total = membersData.length;
    const active = membersData.filter(m => m.status === 'active').length;
    const pending = membersData.filter(m => m.status === 'pending').length;
    
    // Calculate renewals due (expiring in next 30 days)
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    
    const renewalsDue = membersData.filter(m => {
      const expiryDate = new Date(m.expiryDate);
      return expiryDate <= nextMonth && expiryDate >= today && m.status === 'active';
    }).length;

    document.getElementById('totalMembersCount').textContent = total.toLocaleString();
    document.getElementById('activeMembersCount').textContent = active.toLocaleString();
    document.getElementById('renewalsDueCount').textContent = renewalsDue.toLocaleString();
    document.getElementById('pendingCount').textContent = pending.toLocaleString();
  }

  // Generate new member ID
  function generateMemberId() {
    const lastId = membersData.reduce((max, member) => {
      const num = parseInt(member.id.substring(1));
      return num > max ? num : max;
    }, 0);
    return `M${String(lastId + 1).padStart(3, '0')}`;
  }

  // Generate avatar initials
  function generateInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  }

  // Get random avatar color
  function getRandomAvatarColor() {
    const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  }

  // Check if expiry date is within 30 days
  function isExpiringSoon(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }

  // Set default dates in form
  function setDefaultDates() {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const nextYearStr = nextYear.toISOString().split('T')[0];
    
    // Set default join date to today
    const joinDateInput = document.querySelector('#addMemberForm input[name="joinDate"]');
    if (joinDateInput) joinDateInput.value = todayStr;
    
    // Set default expiry date to next year
    const editExpiryInput = document.querySelector('#editMemberForm input[name="expiryDate"]');
    if (editExpiryInput) editExpiryInput.value = nextYearStr;
  }

  // Add new member
  function addMember() {
    const form = document.getElementById('addMemberForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.fullName || !data.cnic || !data.phone || !data.membershipType || !data.joinDate) {
      alert('Please fill all required fields!');
      return;
    }

    // Calculate expiry date (1 year from join date)
    const joinDate = new Date(data.joinDate);
    const expiryDate = new Date(joinDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const newMember = {
      id: generateMemberId(),
      fullName: data.fullName,
      cnic: data.cnic,
      dob: data.dob || '',
      gender: data.gender || 'male',
      phone: data.phone,
      email: data.email || '',
      address: data.address || '',
      emergencyContact: data.emergencyContact || '',
      membershipType: data.membershipType,
      joinDate: data.joinDate,
      expiryDate: expiryDate.toISOString().split('T')[0],
      monthlyFee: parseInt(data.monthlyFee) || 2000,
      currentBalance: parseInt(data.initialPayment) || 0,
      status: 'active',
      notes: '',
      avatarInitials: generateInitials(data.fullName),
      avatarColor: getRandomAvatarColor()
    };

    membersData.push(newMember);
    filteredMembers = [...membersData];
    currentPage = 1;
    renderMembersTable();
    updateStats();

    // Show success message
    showNotification(`Member ${newMember.fullName} added successfully!`, 'success');

    // Close modal
    const modalElement = document.getElementById('addMemberModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }

    // Reset form
    form.reset();
    setDefaultDates();
  }

  // View member details
  let viewingMemberId = null;
  
  function viewMember(memberId) {
    const member = membersData.find(m => m.id === memberId);
    if (!member) return;

    viewingMemberId = memberId;

    // Fill view modal
    document.getElementById('detailAvatar').textContent = member.avatarInitials;
    document.getElementById('detailName').textContent = member.fullName;
    document.getElementById('detailId').textContent = member.id;
    document.getElementById('detailCnic').textContent = member.cnic;
    document.getElementById('detailPhone').textContent = member.phone;
    document.getElementById('detailEmail').textContent = member.email || 'Not provided';
    document.getElementById('detailJoinDate').textContent = formatDate(member.joinDate);
    document.getElementById('detailExpiryDate').textContent = formatDate(member.expiryDate);
    document.getElementById('detailType').textContent = member.membershipType.toUpperCase();
    document.getElementById('detailStatus').innerHTML = `<span class="badge status-${member.status}">${member.status.charAt(0).toUpperCase() + member.status.slice(1)}</span>`;
    
    // Format balance
    let balanceText = `PKR ${member.currentBalance.toLocaleString()}`;
    if (member.currentBalance > 0) {
      balanceText = `+PKR ${member.currentBalance.toLocaleString()}`;
    } else if (member.currentBalance < 0) {
      balanceText = `-PKR ${Math.abs(member.currentBalance).toLocaleString()}`;
    }
    document.getElementById('detailBalance').textContent = balanceText;
    
    document.getElementById('detailAddress').textContent = member.address || 'Not provided';
    document.getElementById('detailEmergency').textContent = member.emergencyContact || 'Not provided';
    document.getElementById('detailNotes').textContent = member.notes || 'No notes';

    // Show view modal
    const viewModalElement = document.getElementById('viewMemberModal');
    if (viewModalElement) {
      const viewModal = new bootstrap.Modal(viewModalElement);
      viewModal.show();
    }
  }

  // Edit member
  let editingMemberId = null;
  
  function editMember(memberId) {
    const member = membersData.find(m => m.id === memberId);
    if (!member) return;

    editingMemberId = memberId;

    // Fill edit form
    const form = document.getElementById('editMemberForm');
    if (!form) return;
    
    form.querySelector('input[name="fullName"]').value = member.fullName;
    form.querySelector('input[name="cnic"]').value = member.cnic;
    form.querySelector('input[name="phone"]').value = member.phone;
    form.querySelector('input[name="email"]').value = member.email || '';
    form.querySelector('select[name="membershipType"]').value = member.membershipType;
    form.querySelector('select[name="status"]').value = member.status;
    form.querySelector('input[name="expiryDate"]').value = member.expiryDate;
    form.querySelector('input[name="monthlyFee"]').value = member.monthlyFee;
    form.querySelector('textarea[name="address"]').value = member.address || '';
    form.querySelector('textarea[name="notes"]').value = member.notes || '';

    // Show edit modal
    const editModalElement = document.getElementById('editMemberModal');
    if (editModalElement) {
      const editModal = new bootstrap.Modal(editModalElement);
      editModal.show();
    }
  }

  // Update member
  function updateMember() {
    if (!editingMemberId) return;

    const form = document.getElementById('editMemberForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const memberIndex = membersData.findIndex(m => m.id === editingMemberId);
    if (memberIndex === -1) return;

    // Update member data
    membersData[memberIndex] = {
      ...membersData[memberIndex],
      fullName: data.fullName,
      cnic: data.cnic,
      phone: data.phone,
      email: data.email,
      membershipType: data.membershipType,
      status: data.status,
      expiryDate: data.expiryDate,
      monthlyFee: parseInt(data.monthlyFee) || membersData[memberIndex].monthlyFee,
      address: data.address,
      notes: data.notes,
      avatarInitials: generateInitials(data.fullName)
    };

    filteredMembers = [...membersData];
    renderMembersTable();
    updateStats();

    // Show success message
    showNotification(`Member ${data.fullName} updated successfully!`, 'success');

    // Close modal
    const modalElement = document.getElementById('editMemberModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }

    editingMemberId = null;
  }

  // Delete single member
  function deleteMember(memberId) {
    if (!confirm(`Are you sure you want to delete member ${memberId}? This action cannot be undone.`)) {
      return;
    }

    const memberIndex = membersData.findIndex(m => m.id === memberId);
    if (memberIndex === -1) return;

    const memberName = membersData[memberIndex].fullName;
    membersData.splice(memberIndex, 1);
    filteredMembers = [...membersData];
    currentPage = 1;
    renderMembersTable();
    updateStats();

    showNotification(`Member ${memberName} deleted successfully!`, 'danger');
  }

  // Bulk delete selected members
  function bulkDeleteSelected() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));

    if (selectedIds.length === 0) {
      alert('Please select at least one member to delete.');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected member(s)? This action cannot be undone.`)) {
      return;
    }

    // Remove selected members
    membersData = membersData.filter(member => !selectedIds.includes(member.id));
    filteredMembers = [...membersData];
    currentPage = 1;
    renderMembersTable();
    updateStats();

    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;

    showNotification(`${selectedIds.length} member(s) deleted successfully!`, 'danger');
  }

  // Bulk activate selected members
  function bulkActivateSelected() {
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));

    if (selectedIds.length === 0) {
      alert('Please select at least one member to activate.');
      return;
    }

    if (!confirm(`Are you sure you want to activate ${selectedIds.length} selected member(s)?`)) {
      return;
    }

    // Activate selected members
    membersData.forEach(member => {
      if (selectedIds.includes(member.id)) {
        member.status = 'active';
      }
    });

    filteredMembers = [...membersData];
    renderMembersTable();
    updateStats();

    // Uncheck select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllHeader');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;

    showNotification(`${selectedIds.length} member(s) activated successfully!`, 'success');
  }

  // Export data
  function exportData() {
    // For now, just show a CSV format alert
    // In a real app, this would generate and download a CSV/Excel file
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Member ID,Name,CNIC,Phone,Email,Type,Join Date,Expiry Date,Status,Balance\n"
      + filteredMembers.map(member => 
          `${member.id},${member.fullName},${member.cnic},${member.phone},${member.email || ''},${member.membershipType},${member.joinDate},${member.expiryDate},${member.status},${member.currentBalance}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `members_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`Exported ${filteredMembers.length} members to CSV file`, 'info');
  }

  // Show notification
  function showNotification(message, type = 'info') {
    // Remove existing notification if any
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

    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
});