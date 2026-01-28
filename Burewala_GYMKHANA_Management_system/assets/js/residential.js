document.addEventListener('DOMContentLoaded', function () {
  // Check if FullCalendar is loaded
  if (typeof FullCalendar === 'undefined') {
    console.error('FullCalendar is not loaded!');
    return;
  }
  
  // Check if jQuery is loaded for daterangepicker
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded! Date range picker will not work.');
  }
  
  // Initialize residential system
  initializeResidentialSystem();
  

  // Role switcher logic (copied from dashboard.js)
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

  function initializeResidentialSystem() {
    // Load initial data
    loadRooms();
    loadCurrentBookings();
    loadHousekeepingStatus();
    loadCancellations();
    loadMembersForBooking();
    initializeBookingCalendar();
    initializeCharts();
    setupEventListeners();
    
    // Adjust calendar after a short delay to ensure DOM is ready
    setTimeout(() => {
      adjustCalendarView();
      window.bookingCalendar?.updateSize();
    }, 300);
  }

  // FR-RES-01: Member-only room booking access
  // FR-RES-02: Support for multiple room types
  function loadRooms() {
    const roomsContainer = document.getElementById('roomsContainer');
    if (!roomsContainer) return;

    const rooms = [
      { id: 101, type: 'single', name: '101 - Standard Single', price: 5000, status: 'available', capacity: 1, features: ['AC', 'TV', 'WiFi'] },
      { id: 102, type: 'single', name: '102 - Standard Single', price: 5000, status: 'occupied', capacity: 1, features: ['AC', 'TV'] },
      { id: 103, type: 'single', name: '103 - Deluxe Single', price: 6000, status: 'available', capacity: 1, features: ['AC', 'TV', 'WiFi', 'Minibar'] },
      { id: 201, type: 'double', name: '201 - Standard Double', price: 8000, status: 'available', capacity: 2, features: ['AC', 'TV', 'WiFi'] },
      { id: 202, type: 'double', name: '202 - Standard Double', price: 8000, status: 'maintenance', capacity: 2, features: ['AC', 'TV'] },
      { id: 203, type: 'double', name: '203 - Deluxe Double', price: 10000, status: 'occupied', capacity: 2, features: ['AC', 'TV', 'WiFi', 'Minibar', 'Sofa'] },
      { id: 301, type: 'vip', name: '301 - VIP Suite', price: 15000, status: 'available', capacity: 4, features: ['AC', 'TV', 'WiFi', 'Minibar', 'Jacuzzi', 'Balcony'] },
      { id: 302, type: 'vip', name: '302 - VIP Suite', price: 15000, status: 'cleaning', capacity: 4, features: ['AC', 'TV', 'WiFi', 'Minibar', 'Study'] },
    ];

    roomsContainer.innerHTML = '';
    rooms.forEach(room => {
      const roomCard = createRoomCard(room);
      roomsContainer.appendChild(roomCard);
    });

    // Update stats
    updateRoomStats(rooms);

    // Room filter functionality
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', function() {
        document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const allCards = roomsContainer.querySelectorAll('.room-card');
        
        allCards.forEach(card => {
          if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function updateRoomStats(rooms) {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    
    // Update DOM elements if they exist
    const totalRoomsEl = document.getElementById('totalRooms');
    const occupiedRoomsEl = document.getElementById('occupiedRooms');
    
    if (totalRoomsEl) {
      totalRoomsEl.textContent = totalRooms;
      const singleCount = rooms.filter(r => r.type === 'single').length;
      const doubleCount = rooms.filter(r => r.type === 'double').length;
      const vipCount = rooms.filter(r => r.type === 'vip').length;
      
      const detailsEl = totalRoomsEl.nextElementSibling;
      if (detailsEl && detailsEl.classList.contains('text-muted')) {
        detailsEl.textContent = `Single: ${singleCount}, Double: ${doubleCount}, VIP: ${vipCount}`;
      }
    }
    
    if (occupiedRoomsEl) {
      occupiedRoomsEl.textContent = occupiedRooms;
      const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
      const detailsEl = occupiedRoomsEl.nextElementSibling;
      if (detailsEl && detailsEl.classList.contains('text-muted')) {
        detailsEl.textContent = `${occupancyRate}% occupancy`;
      }
    }
  }

  function createRoomCard(room) {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    
    const card = document.createElement('div');
    card.className = `room-card card ${room.status}`;
    card.dataset.id = room.id;
    card.dataset.type = room.type;
    
    const avatarClass = {
      single: 'room-single',
      double: 'room-double',
      vip: 'room-vip'
    }[room.type];
    
    const statusText = {
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      cleaning: 'Cleaning'
    }[room.status];
    
    const statusClass = {
      available: 'bg-success',
      occupied: 'bg-danger',
      maintenance: 'bg-warning',
      cleaning: 'bg-info'
    }[room.status];
    
    const featuresHTML = room.features.map(f => 
      `<span class="badge bg-light text-dark border me-1 mb-1">${f}</span>`
    ).join('');
    
    card.innerHTML = `
      <div class="card-body text-center">
        <div class="room-avatar ${avatarClass} mx-auto mb-3">
          <i class="bi bi-door-closed"></i>
        </div>
        <h6 class="card-title mb-1">${room.name}</h6>
        <div class="mb-2">
          <span class="badge ${statusClass} room-type-badge">${statusText}</span>
          <span class="badge bg-secondary room-type-badge">${room.type.toUpperCase()}</span>
        </div>
        <div class="price-tag mb-2">₨${room.price.toLocaleString()}/day</div>
        <div class="small text-muted mb-2">Capacity: ${room.capacity} person${room.capacity > 1 ? 's' : ''}</div>
        <div class="features-container" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
          ${featuresHTML}
        </div>
        <button class="btn btn-sm btn-link p-0 mt-1 toggle-features" type="button">
          <small>Show features</small>
        </button>
      </div>
    `;
    
    // Add click handler for room selection
    card.addEventListener('click', function(e) {
      if (!e.target.closest('.toggle-features')) {
        selectRoomForBooking(room);
      }
    });
    
    // Add toggle features functionality
    const toggleBtn = card.querySelector('.toggle-features');
    const featuresContainer = card.querySelector('.features-container');
    
    if (toggleBtn && featuresContainer) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = featuresContainer.style.maxHeight !== '0px';
        
        if (isExpanded) {
          featuresContainer.style.maxHeight = '0';
          this.innerHTML = '<small>Show features</small>';
        } else {
          featuresContainer.style.maxHeight = '100px';
          this.innerHTML = '<small>Hide features</small>';
        }
      });
    }
    
    col.appendChild(card);
    return col;
  }

  // FR-RES-03: Booking calendar with availability tracking
  function initializeBookingCalendar() {
  const calendarEl = document.getElementById('bookingCalendar');
  if (!calendarEl) return;

  // Show loading state
  showCalendarLoading(true);

  // Clear any existing calendar - FIXED VERSION
  if (window.bookingCalendar) {
    try {
      // Check if it's a FullCalendar instance and has destroy method
      if (window.bookingCalendar.destroy && typeof window.bookingCalendar.destroy === 'function') {
        window.bookingCalendar.destroy();
      }
      // Clear the reference
      window.bookingCalendar = null;
    } catch (error) {
      console.warn('Error destroying previous calendar:', error);
      // Force clear the element
      calendarEl.innerHTML = '';
      window.bookingCalendar = null;
    }
  } else {
    // Make sure the element is empty
    calendarEl.innerHTML = '';
  }

  // Check if FullCalendar is available
  if (typeof FullCalendar === 'undefined') {
    console.error('FullCalendar library is not loaded!');
    showCalendarLoading(false);
    calendarEl.innerHTML = '<div class="alert alert-warning">Calendar library failed to load. Please refresh the page.</div>';
    return;
  }

  // Detect device type
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  // Determine initial view based on screen size
  let initialView = 'dayGridMonth';
  if (isMobile) initialView = 'timeGridDay';
  if (isTablet) initialView = 'timeGridWeek';

  try {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      // ... rest of your calendar configuration remains the same
    });

    // Render calendar
    calendar.render();
    window.bookingCalendar = calendar;
    
    // Add resize listener for calendar adjustments
    window.addEventListener('resize', debounce(() => {
      adjustCalendarView();
      calendar.updateSize();
    }, 250));
    
    // Hide loading after render
    setTimeout(() => showCalendarLoading(false), 500);
    
  } catch (error) {
    console.error('Error creating calendar:', error);
    showCalendarLoading(false);
    calendarEl.innerHTML = '<div class="alert alert-danger">Failed to initialize calendar. Please check console for details.</div>';
  }
}

  function fetchBookingEvents() {
    // Simulated booking events
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return [
      {
        title: 'John Doe',
        start: today,
        end: tomorrow,
        color: '#198754',
        textColor: 'white',
        extendedProps: {
          bookingId: 'BK-001',
          room: 'Room 101',
          member: 'John Doe (M001)',
          type: 'single',
          status: 'checked_in',
          amount: '₨5,000',
          contact: 'john@example.com'
        }
      },
      {
        title: 'VIP Suite - Jane Smith',
        start: dayAfterTomorrow,
        end: nextWeek,
        color: '#ffc107',
        textColor: 'black',
        extendedProps: {
          bookingId: 'BK-002',
          room: 'Room 203',
          member: 'Jane Smith (M002)',
          type: 'vip',
          status: 'confirmed',
          amount: '₨45,000',
          contact: 'jane@example.com'
        }
      },
      {
        title: 'MAINTENANCE',
        start: tomorrow,
        end: dayAfterTomorrow,
        color: '#dc3545',
        textColor: 'white',
        extendedProps: {
          bookingId: 'MAINT-001',
          room: 'Room 201',
          type: 'maintenance',
          status: 'maintenance',
          notes: 'AC repair required'
        }
      },
      {
        title: 'Robert Johnson',
        start: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        end: today,
        color: '#0dcaf0',
        textColor: 'white',
        extendedProps: {
          bookingId: 'BK-003',
          room: 'Room 103',
          member: 'Robert Johnson (M003)',
          type: 'single',
          status: 'checked_out',
          amount: '₨12,000',
          contact: 'robert@example.com'
        }
      },
      {
        title: 'Sarah Wilson',
        start: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        end: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        color: '#6f42c1',
        textColor: 'white',
        extendedProps: {
          bookingId: 'BK-004',
          room: 'Room 201',
          member: 'Sarah Wilson (M004)',
          type: 'double',
          status: 'confirmed',
          amount: '₨16,000',
          contact: 'sarah@example.com'
        }
      }
    ];
  }

  function handleEventClick(info) {
    const event = info.event;
    const props = event.extendedProps;
    const isMobile = window.innerWidth <= 768;
    
    const modalContent = `
      <div class="booking-details">
        <div class="d-flex align-items-start mb-3">
          <div class="room-avatar ${props.type === 'vip' ? 'room-vip' : props.type === 'double' ? 'room-double' : 'room-single'} me-3">
            <i class="bi bi-door-closed"></i>
          </div>
          <div>
            <h6 class="mb-1">${props.room}</h6>
            <p class="mb-0 text-muted">${props.type ? props.type.toUpperCase() : 'Booking'}</p>
          </div>
        </div>
        
        <table class="table table-sm table-borderless mb-0">
          <tr><td width="120"><strong>Booking ID:</strong></td><td>${props.bookingId}</td></tr>
          ${props.member ? `<tr><td><strong>Member:</strong></td><td>${props.member}</td></tr>` : ''}
          ${props.contact ? `<tr><td><strong>Contact:</strong></td><td>${props.contact}</td></tr>` : ''}
          <tr><td><strong>Status:</strong></td><td><span class="badge ${getStatusBadgeClass(props.status)}">${props.status?.replace('_', ' ') || 'N/A'}</span></td></tr>
          <tr><td><strong>Start:</strong></td><td>${event.start ? formatDateTime(event.start) : 'N/A'}</td></tr>
          <tr><td><strong>End:</strong></td><td>${event.end ? formatDateTime(event.end) : 'N/A'}</td></tr>
          ${props.amount ? `<tr><td><strong>Amount:</strong></td><td>${props.amount}</td></tr>` : ''}
          ${props.notes ? `<tr><td><strong>Notes:</strong></td><td>${props.notes}</td></tr>` : ''}
        </table>
        
        <div class="d-flex gap-2 mt-4 ${isMobile ? 'flex-column' : ''}">
          ${props.status === 'confirmed' ? `
            <button class="btn btn-sm btn-gold flex-fill" onclick="checkInBooking('${props.bookingId}')">
              <i class="bi bi-box-arrow-in-right me-1"></i>Check-in
            </button>
          ` : ''}
          
          ${props.status === 'checked_in' ? `
            <button class="btn btn-sm btn-warning flex-fill" onclick="checkOutBooking('${props.bookingId}')">
              <i class="bi bi-box-arrow-right me-1"></i>Check-out
            </button>
          ` : ''}
          
          <button class="btn btn-sm btn-outline-gold flex-fill" onclick="editBookingEvent('${props.bookingId}')">
            <i class="bi bi-pencil me-1"></i>Edit
          </button>
          
          ${props.status === 'confirmed' ? `
            <button class="btn btn-sm btn-outline-danger flex-fill" onclick="cancelBooking('${props.bookingId}')">
              <i class="bi bi-x-circle me-1"></i>Cancel
            </button>
          ` : ''}
        </div>
      </div>
    `;
    
    showCustomModal('Booking Details', modalContent);
  }

  function showCalendarLoading(show) {
    const calendarEl = document.getElementById('bookingCalendar');
    if (!calendarEl) return;
    
    let loadingEl = calendarEl.querySelector('.calendar-loading');
    
    if (show && !loadingEl) {
      loadingEl = document.createElement('div');
      loadingEl.className = 'calendar-loading';
      loadingEl.innerHTML = `
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading calendar...</span>
        </div>
      `;
      calendarEl.appendChild(loadingEl);
    } else if (!show && loadingEl) {
      loadingEl.remove();
    }
  }

  // FR-RES-06: Member booking history (partial implementation)
  function loadCurrentBookings() {
    const container = document.getElementById('currentBookings');
    if (!container) return;

    const bookings = [
      {
        id: 'BK-001',
        member: 'John Doe',
        room: '101 - Single',
        checkin: '2024-11-08',
        checkout: '2024-11-11',
        status: 'checked_in',
        amount: '₨15,000'
      },
      {
        id: 'BK-002',
        member: 'Jane Smith',
        room: '203 - VIP Suite',
        checkin: '2024-11-10',
        checkout: '2024-11-17',
        status: 'confirmed',
        amount: '₨45,000'
      },
      {
        id: 'BK-003',
        member: 'Robert Johnson',
        room: '201 - Double',
        checkin: '2024-11-09',
        checkout: '2024-11-12',
        status: 'checked_out',
        amount: '₨24,000'
      },
      {
        id: 'BK-004',
        member: 'Sarah Wilson',
        room: '103 - Single',
        checkin: '2024-11-12',
        checkout: '2024-11-15',
        status: 'confirmed',
        amount: '₨12,000'
      }
    ];

    container.innerHTML = '';
    bookings.forEach(booking => {
      const item = document.createElement('div');
      item.className = 'booking-timeline-item';
      
      const statusBadge = getStatusBadge(booking.status);
      
      item.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
          <div style="flex: 1;">
            <strong class="d-block">${booking.room}</strong>
            <small class="d-block text-muted">${booking.member}</small>
            <small class="d-block">
              <i class="bi bi-calendar-event me-1"></i>
              ${booking.checkin} → ${booking.checkout}
            </small>
            <small class="d-block">
              <i class="bi bi-cash-coin me-1"></i>
              ${booking.amount}
            </small>
          </div>
          <div class="text-end">
            ${statusBadge}
            <div class="mt-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="viewBookingDetails('${booking.id}')" title="View Details">
                <i class="bi bi-eye"></i>
              </button>
              ${booking.status === 'confirmed' ? `
                <button class="btn btn-sm btn-outline-success" onclick="checkInBooking('${booking.id}')" title="Check-in">
                  <i class="bi bi-box-arrow-in-right"></i>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
      
      container.appendChild(item);
    });
  }

  // FR-RES-05: Occupancy and revenue reporting
  function initializeCharts() {
    // Occupancy Chart
    const occupancyCtx = document.getElementById('occupancyChart');
    if (occupancyCtx) {
      new Chart(occupancyCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Occupancy Rate',
            data: [65, 70, 75, 80, 85, 90, 95],
            borderColor: 'rgba(217,183,59,0.95)',
            backgroundColor: 'rgba(217,183,59,0.1)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: 'rgba(217,183,59,1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(217,183,59,0.5)',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'nearest'
          }
        }
      });
    }
  }

  // FR-RES-07: Cancellation handling
  // FR-RES-08: Refund processing
  function loadCancellations() {
    const table = document.getElementById('cancellationsTable');
    if (!table) return;

    const cancellations = [
      {
        id: 'BK-045',
        member: 'Michael Brown',
        refund: '₨5,000',
        status: 'refund_processed',
        date: '2024-11-05',
        reason: 'Change of plans'
      },
      {
        id: 'BK-046',
        member: 'Sarah Wilson',
        refund: '₨8,000',
        status: 'pending_approval',
        date: '2024-11-06',
        reason: 'Medical emergency'
      },
      {
        id: 'BK-047',
        member: 'David Miller',
        refund: '₨4,000',
        status: 'approved',
        date: '2024-11-07',
        reason: 'Travel restrictions'
      }
    ];

    table.innerHTML = '';
    cancellations.forEach(item => {
      const row = document.createElement('tr');
      
      let statusBadge;
      switch(item.status) {
        case 'refund_processed':
          statusBadge = '<span class="badge bg-success">Refunded</span>';
          break;
        case 'pending_approval':
          statusBadge = '<span class="badge bg-warning">Pending Approval</span>';
          break;
        case 'approved':
          statusBadge = '<span class="badge bg-info">Approved</span>';
          break;
        default:
          statusBadge = '<span class="badge bg-secondary">Cancelled</span>';
      }
      
      row.innerHTML = `
        <td><strong>${item.id}</strong></td>
        <td>${item.member}</td>
        <td>${item.refund}</td>
        <td>${statusBadge}</td>
      `;
      
      // Add click handler for cancellation details
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        showCancellationDetails(item);
      });
      
      table.appendChild(row);
    });
  }

  // FR-RES-10: Housekeeping status tracking
  function loadHousekeepingStatus() {
    const table = document.getElementById('housekeepingTable');
    if (!table) return;

    const housekeeping = [
      { room: '101', status: 'clean', lastCleaned: '2024-11-08 09:00', assignedTo: 'Staff A' },
      { room: '102', status: 'dirty', lastCleaned: '2024-11-07 15:30', assignedTo: 'Staff B' },
      { room: '103', status: 'clean', lastCleaned: '2024-11-08 10:15', assignedTo: 'Staff A' },
      { room: '201', status: 'maintenance', lastCleaned: '2024-11-06 14:00', assignedTo: 'Technician' },
      { room: '202', status: 'cleaning_in_progress', lastCleaned: '2024-11-08 11:45', assignedTo: 'Staff C' },
      { room: '203', status: 'clean', lastCleaned: '2024-11-08 08:30', assignedTo: 'Staff A' },
      { room: '301', status: 'clean', lastCleaned: '2024-11-08 09:45', assignedTo: 'Staff B' },
      { room: '302', status: 'dirty', lastCleaned: '2024-11-07 16:20', assignedTo: 'Staff C' }
    ];

    table.innerHTML = '';
    housekeeping.forEach(item => {
      const row = document.createElement('tr');
      
      let statusElement;
      switch(item.status) {
        case 'clean':
          statusElement = '<span class="housekeeping-status"><i class="bi bi-check-circle-fill text-success"></i> Clean</span>';
          break;
        case 'dirty':
          statusElement = '<span class="housekeeping-status"><i class="bi bi-x-circle-fill text-danger"></i> Dirty</span>';
          break;
        case 'cleaning_in_progress':
          statusElement = '<span class="housekeeping-status"><i class="bi bi-arrow-clockwise text-info"></i> Cleaning</span>';
          break;
        case 'maintenance':
          statusElement = '<span class="housekeeping-status"><i class="bi bi-tools text-warning"></i> Maintenance</span>';
          break;
      }
      
      row.innerHTML = `
        <td><strong>${item.room}</strong></td>
        <td>${statusElement}</td>
        <td>${item.lastCleaned}</td>
      `;
      
      // Add click handler for housekeeping details
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        showHousekeepingDetails(item);
      });
      
      table.appendChild(row);
    });
  }

  // FR-RES-09: Check-in/check-out management
  function setupEventListeners() {
    // New Booking
    const confirmBookingBtn = document.getElementById('confirmBooking');
    if (confirmBookingBtn) {
      confirmBookingBtn.addEventListener('click', createNewBooking);
    }

    // Check-in
    const confirmCheckinBtn = document.getElementById('confirmCheckin');
    if (confirmCheckinBtn) {
      confirmCheckinBtn.addEventListener('click', processCheckin);
    }

    // Check-out
    const confirmCheckoutBtn = document.getElementById('confirmCheckout');
    if (confirmCheckoutBtn) {
      confirmCheckoutBtn.addEventListener('click', processCheckout);
    }

    // Housekeeping
    const confirmHousekeepingBtn = document.getElementById('confirmHousekeeping');
    if (confirmHousekeepingBtn) {
      confirmHousekeepingBtn.addEventListener('click', updateHousekeeping);
    }

    // Generate Report
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
      generateReportBtn.addEventListener('click', generateReport);
    }

    // View Occupancy
    const viewOccupancyBtn = document.getElementById('viewOccupancyBtn');
    if (viewOccupancyBtn) {
      viewOccupancyBtn.addEventListener('click', viewOccupancyReport);
    }

    // Print Report
    const printReportBtn = document.getElementById('printReportBtn');
    if (printReportBtn) {
      printReportBtn.addEventListener('click', printReport);
    }

    // Export Report
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
      exportReportBtn.addEventListener('click', exportReport);
    }

    // Initialize date range picker for reports
    // Initialize date range picker for reports
const dateRangeInput = document.getElementById('reportDateRange');
if (dateRangeInput && typeof $ !== 'undefined' && $.fn.daterangepicker) {
  $(dateRangeInput).daterangepicker({
    opens: 'left',
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
    locale: {
      format: 'YYYY-MM-DD'
    }
  });
}

    // Add keyboard shortcuts for calendar navigation
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return; // Don't interfere with form inputs
      }
      
      if (window.bookingCalendar) {
        switch(e.key) {
          case 'ArrowLeft':
            if (e.ctrlKey || e.metaKey) {
              window.bookingCalendar.prev();
              e.preventDefault();
            }
            break;
          case 'ArrowRight':
            if (e.ctrlKey || e.metaKey) {
              window.bookingCalendar.next();
              e.preventDefault();
            }
            break;
          case 't':
            if (e.ctrlKey || e.metaKey) {
              window.bookingCalendar.today();
              e.preventDefault();
            }
            break;
        }
      }
    });
  }

  function loadMembersForBooking() {
    const memberSelect = document.getElementById('memberSelect');
    if (!memberSelect) return;

    // Simulated members data - in real app, this would come from API
    const members = [
      { id: 1, name: 'John Doe (M001)', email: 'john@example.com', phone: '+92 300 1234567' },
      { id: 2, name: 'Jane Smith (M002)', email: 'jane@example.com', phone: '+92 300 2345678' },
      { id: 3, name: 'Robert Johnson (M003)', email: 'robert@example.com', phone: '+92 300 3456789' },
      { id: 4, name: 'Sarah Wilson (M004)', email: 'sarah@example.com', phone: '+92 300 4567890' },
      { id: 5, name: 'Michael Brown (M005)', email: 'michael@example.com', phone: '+92 300 5678901' }
    ];

    members.forEach(member => {
      const option = document.createElement('option');
      option.value = member.id;
      option.textContent = member.name;
      option.dataset.email = member.email;
      option.dataset.phone = member.phone;
      memberSelect.appendChild(option);
    });

    // Add change listener to show member details
    memberSelect.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      if (selectedOption.dataset.email) {
        // You could show member details in a separate area
        console.log('Selected member:', {
          email: selectedOption.dataset.email,
          phone: selectedOption.dataset.phone
        });
      }
    });
  }

  function selectRoomForBooking(room) {
    // Highlight selected room
    document.querySelectorAll('.room-card').forEach(card => {
      card.classList.remove('selected');
      card.style.boxShadow = '';
    });
    
    const selectedCard = document.querySelector(`.room-card[data-id="${room.id}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      selectedCard.style.boxShadow = '0 0 0 3px rgba(217,183,59,0.3)';
      
      // Scroll into view on mobile
      if (window.innerWidth <= 768) {
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Update booking form
    const roomTypeSelect = document.getElementById('roomTypeSelect');
    if (roomTypeSelect) {
      roomTypeSelect.value = room.type;
      
      // Update price preview
      const priceDisplay = document.getElementById('pricePreview');
      if (!priceDisplay) {
        const pricePreview = document.createElement('div');
        pricePreview.id = 'pricePreview';
        pricePreview.className = 'alert alert-light mt-2';
        pricePreview.innerHTML = `
          <small>Selected: <strong>${room.name}</strong> | Price: <strong>₨${room.price.toLocaleString()}/day</strong></small>
        `;
        
        const formGroup = roomTypeSelect.closest('.col-md-6');
        if (formGroup) {
          formGroup.appendChild(pricePreview);
        }
      } else {
        pricePreview.innerHTML = `
          <small>Selected: <strong>${room.name}</strong> | Price: <strong>₨${room.price.toLocaleString()}/day</strong></small>
        `;
      }
    }
  }

  function createNewBooking() {
    const memberSelect = document.getElementById('memberSelect');
    const roomTypeSelect = document.getElementById('roomTypeSelect');
    const checkinDate = document.getElementById('checkinDate');
    const checkoutDate = document.getElementById('checkoutDate');
    const numGuests = document.getElementById('numGuests');
    const specialRequests = document.getElementById('specialRequests');
    const autoInvoice = document.getElementById('autoInvoice');

    if (!memberSelect.value || !roomTypeSelect.value || !checkinDate.value || !checkoutDate.value) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    // Validate dates
    const checkin = new Date(checkinDate.value);
    const checkout = new Date(checkoutDate.value);
    
    if (checkin >= checkout) {
      showToast('Check-out date must be after check-in date', 'warning');
      return;
    }
    
    if (checkin < new Date().setHours(0, 0, 0, 0)) {
      showToast('Check-in date cannot be in the past', 'warning');
      return;
    }

    // Calculate total amount
    const prices = {
      single: 5000,
      double: 8000,
      vip: 15000
    };
    
    const days = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    const pricePerDay = prices[roomTypeSelect.value];
    const totalAmount = days * pricePerDay;

    // Create booking object
    const booking = {
      bookingId: 'BK-' + Math.floor(100 + Math.random() * 900),
      memberId: memberSelect.value,
      memberName: memberSelect.options[memberSelect.selectedIndex].text,
      roomType: roomTypeSelect.value,
      checkin: checkinDate.value,
      checkout: checkoutDate.value,
      numGuests: numGuests.value,
      specialRequests: specialRequests.value,
      days: days,
      totalAmount: totalAmount,
      autoInvoice: autoInvoice.checked,
      status: 'confirmed',
      timestamp: new Date().toISOString()
    };

    // FR-RES-04: Automatic integration of room charges to member invoices
    if (booking.autoInvoice) {
      addToMemberInvoice(booking);
    }

    // Show success message
    showToast(`Booking created successfully! Booking ID: ${booking.bookingId}`, 'success');

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('newBookingModal'));
    if (modal) modal.hide();
    
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.reset();
    
    // Remove price preview
    const pricePreview = document.getElementById('pricePreview');
    if (pricePreview) pricePreview.remove();

    // Refresh displays
    setTimeout(() => {
      loadCurrentBookings();
      if (window.bookingCalendar) {
        window.bookingCalendar.addEvent({
          title: `${booking.memberName.split(' ')[0]}`,
          start: booking.checkin,
          end: booking.checkout,
          color: '#198754',
          textColor: 'white',
          extendedProps: {
            bookingId: booking.bookingId,
            member: booking.memberName,
            type: booking.roomType,
            status: 'confirmed'
          }
        });
        window.bookingCalendar.render();
      }
      
      // Update room status
      loadRooms();
    }, 500);
  }

  function addToMemberInvoice(booking) {
    // Simulate adding to member's invoice
    console.log('Adding to member invoice:', booking);
    
    // Show notification
    showToast(`Charges added to ${booking.memberName}'s invoice`, 'info');
    
    // In a real application, this would make an API call to add the charge to the member's invoice
  }

  function processCheckin() {
    const bookingId = document.getElementById('checkinBookingId').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!bookingId) {
      showToast('Please enter a booking ID', 'warning');
      return;
    }

    // Simulate check-in process
    console.log('Processing check-in:', { bookingId, paymentMethod });
    
    showToast(`Check-in processed for booking ${bookingId}`, 'success');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('checkinModal'));
    if (modal) modal.hide();
    
    const checkinForm = document.getElementById('checkinForm');
    if (checkinForm) checkinForm.reset();
    
    // Update booking status in calendar
    if (window.bookingCalendar) {
      const events = window.bookingCalendar.getEvents();
      const event = events.find(e => e.extendedProps.bookingId === bookingId);
      if (event) {
        event.setProp('color', '#198754');
        event.setExtendedProp('status', 'checked_in');
      }
    }
    
    loadCurrentBookings();
    loadRooms();
  }

  function processCheckout() {
    const roomNumber = document.getElementById('checkoutRoom').value;
    const additionalCharges = parseFloat(document.getElementById('additionalCharges').value) || 0;

    if (!roomNumber) {
      showToast('Please enter a room number', 'warning');
      return;
    }

    // Simulate check-out process
    console.log('Processing check-out:', { roomNumber, additionalCharges });
    
    showToast(`Check-out processed for room ${roomNumber}`, 'success');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    if (modal) modal.hide();
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) checkoutForm.reset();
    
    loadRooms();
    loadCurrentBookings();
  }

  function updateHousekeeping() {
    const roomNumber = document.getElementById('hkRoomNumber').value;
    const status = document.getElementById('hkStatus').value;
    const notes = document.getElementById('hkNotes').value;

    if (!roomNumber) {
      showToast('Please enter a room number', 'warning');
      return;
    }

    // Simulate housekeeping update
    console.log('Updating housekeeping:', { roomNumber, status, notes });
    
    showToast(`Housekeeping status updated for room ${roomNumber}`, 'success');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('housekeepingModal'));
    if (modal) modal.hide();
    
    const housekeepingForm = document.getElementById('housekeepingForm');
    if (housekeepingForm) housekeepingForm.reset();
    
    loadHousekeepingStatus();
    loadRooms();
  }

  function generateReport() {
    const dateRange = document.getElementById('reportDateRange')?.value || 'Last 30 days';
    const roomType = document.getElementById('reportRoomType')?.value || 'all';
    const reportType = document.getElementById('reportType')?.value || 'occupancy';
    
    // Show loading state
    showLoadingOverlay(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Show report modal
      const modal = new bootstrap.Modal(document.getElementById('occupancyReportModal'));
      modal.show();
      
      // Generate report content
      const reportContent = document.getElementById('reportContent');
      if (reportContent) {
        reportContent.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Occupancy & Revenue Report</h6>
              <div class="row">
                <div class="col-md-6">
                  <h6>Summary</h6>
                  <table class="table table-sm">
                    <tr><td><strong>Date Range:</strong></td><td>${dateRange}</td></tr>
                    <tr><td><strong>Room Type:</strong></td><td>${roomType === 'all' ? 'All Types' : roomType}</td></tr>
                    <tr><td><strong>Total Bookings:</strong></td><td>24</td></tr>
                    <tr><td><strong>Average Occupancy:</strong></td><td>78%</td></tr>
                    <tr><td><strong>Total Revenue:</strong></td><td>₨2,45,800</td></tr>
                    <tr><td><strong>Total Cancellations:</strong></td><td>3 (12.5%)</td></tr>
                    <tr><td><strong>Refund Amount:</strong></td><td>₨17,000</td></tr>
                  </table>
                </div>
                <div class="col-md-6">
                  <h6>Room Type Breakdown</h6>
                  <canvas id="reportChart" height="150"></canvas>
                </div>
              </div>
              <div class="mt-4">
                <h6>Detailed Booking List</h6>
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Member</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>BK-001</td><td>John Doe</td><td>101</td><td>2024-11-01</td><td>2024-11-03</td><td>₨10,000</td><td><span class="badge bg-success">Checked In</span></td></tr>
                      <tr><td>BK-002</td><td>Jane Smith</td><td>203</td><td>2024-11-02</td><td>2024-11-05</td><td>₨45,000</td><td><span class="badge bg-info">Confirmed</span></td></tr>
                      <tr><td>BK-003</td><td>Robert Johnson</td><td>201</td><td>2024-11-03</td><td>2024-11-06</td><td>₨24,000</td><td><span class="badge bg-secondary">Checked Out</span></td></tr>
                      <tr><td>BK-004</td><td>Sarah Wilson</td><td>103</td><td>2024-11-04</td><td>2024-11-07</td><td>₨12,000</td><td><span class="badge bg-info">Confirmed</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Initialize chart in report
        setTimeout(() => {
          const ctx = document.getElementById('reportChart');
          if (ctx) {
            new Chart(ctx.getContext('2d'), {
              type: 'doughnut',
              data: {
                labels: ['Single', 'Double', 'VIP'],
                datasets: [{
                  data: [12, 8, 4],
                  backgroundColor: ['#198754', '#0dcaf0', '#ffc107'],
                  borderWidth: 1,
                  borderColor: '#fff'
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
                      usePointStyle: true
                    }
                  }
                }
              }
            });
          }
          
          showLoadingOverlay(false);
        }, 100);
      }
    }, 800);
  }

  function viewOccupancyReport() {
    generateReport(); // Reuse the same function
  }

  function printReport() {
    // Add print-specific styles temporarily
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #occupancyReportModal,
        #occupancyReportModal * {
          visibility: visible;
        }
        #occupancyReportModal {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .modal-dialog {
          max-width: 100% !important;
          margin: 0 !important;
        }
        .modal-content {
          border: none !important;
          box-shadow: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Clean up
    setTimeout(() => {
      document.head.removeChild(style);
    }, 100);
  }

  function exportReport() {
    // Simulate export functionality
    showToast('Report exported successfully (CSV format)', 'success');
    
    // In a real application, this would generate and download a CSV file
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Booking ID,Member,Room,Check-in,Check-out,Amount,Status\n"
      + "BK-001,John Doe,101,2024-11-01,2024-11-03,10000,Checked In\n"
      + "BK-002,Jane Smith,203,2024-11-02,2024-11-05,45000,Confirmed\n"
      + "BK-003,Robert Johnson,201,2024-11-03,2024-11-06,24000,Checked Out\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "residential_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ======================
  // UTILITY FUNCTIONS
  // ======================

  function adjustCalendarView() {
    if (!window.bookingCalendar) return;
    
    const calendarEl = document.getElementById('bookingCalendar');
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Adjust view based on screen size
    const currentView = window.bookingCalendar.view.type;
    
    if (isMobile && !currentView.includes('timeGrid')) {
      window.bookingCalendar.changeView('timeGridDay');
    } else if (!isMobile && currentView.includes('timeGrid') && currentView !== 'timeGridWeek') {
      window.bookingCalendar.changeView('dayGridMonth');
    }
    
    // Adjust calendar height based on screen size
    if (calendarEl) {
      const container = calendarEl.closest('.calendar-container');
      if (container) {
        let height;
        if (isSmallMobile) {
          height = '450px';
        } else if (isMobile) {
          height = '500px';
        } else if (window.innerWidth <= 1024) {
          height = '550px';
        } else {
          height = '600px';
        }
        
        container.style.height = height;
      }
    }
    
    // Update calendar size
    setTimeout(() => {
      window.bookingCalendar.updateSize();
    }, 50);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function showCustomModal(title, content) {
    // Create or update custom modal
    let modal = document.getElementById('customBookingModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'customBookingModal';
      modal.className = 'modal fade';
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              ${content}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      modal.querySelector('.modal-title').textContent = title;
      modal.querySelector('.modal-body').innerHTML = content;
    }
    
    // Show modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Remove modal from DOM after hiding
    modal.addEventListener('hidden.bs.modal', function() {
      modal.remove();
    });
  }

  function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      `;
      document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    
    // Remove toast from DOM after hiding
    toast.addEventListener('hidden.bs.toast', function() {
      toast.remove();
    });
  }

  function showLoadingOverlay(show) {
    let overlay = document.getElementById('loadingOverlay');
    
    if (show && !overlay) {
      overlay = document.createElement('div');
      overlay.id = 'loadingOverlay';
      overlay.className = 'loading-overlay';
      overlay.innerHTML = `
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
      document.body.appendChild(overlay);
    } else if (!show && overlay) {
      overlay.remove();
    }
  }

  function formatDateTime(date) {
    if (!date) return 'N/A';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function formatTime(date) {
    if (!date) return '';
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function isDateToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  function getStatusBadgeClass(status) {
    switch(status) {
      case 'confirmed': return 'bg-info';
      case 'checked_in': return 'bg-success';
      case 'checked_out': return 'bg-secondary';
      case 'cancelled': return 'bg-danger';
      case 'pending': return 'bg-warning';
      case 'maintenance': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  function getStatusBadge(status) {
    const text = status.replace('_', ' ').toUpperCase();
    const className = getStatusBadgeClass(status);
    return `<span class="badge ${className}">${text}</span>`;
  }

  function showCancellationDetails(item) {
    const modalContent = `
      <div class="cancellation-details">
        <h6>Cancellation Details</h6>
        <table class="table table-sm table-borderless">
          <tr><td><strong>Booking ID:</strong></td><td>${item.id}</td></tr>
          <tr><td><strong>Member:</strong></td><td>${item.member}</td></tr>
          <tr><td><strong>Refund Amount:</strong></td><td>${item.refund}</td></tr>
          <tr><td><strong>Date:</strong></td><td>${item.date}</td></tr>
          <tr><td><strong>Reason:</strong></td><td>${item.reason}</td></tr>
          <tr><td><strong>Status:</strong></td><td>${getStatusBadge(item.status)}</td></tr>
        </table>
        ${item.status === 'pending_approval' ? `
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-sm btn-success flex-fill" onclick="approveCancellation('${item.id}')">
              <i class="bi bi-check-circle me-1"></i>Approve
            </button>
            <button class="btn btn-sm btn-danger flex-fill" onclick="rejectCancellation('${item.id}')">
              <i class="bi bi-x-circle me-1"></i>Reject
            </button>
          </div>
        ` : ''}
      </div>
    `;
    
    showCustomModal('Cancellation Details', modalContent);
  }

  function showHousekeepingDetails(item) {
    const modalContent = `
      <div class="housekeeping-details">
        <h6>Housekeeping Details</h6>
        <table class="table table-sm table-borderless">
          <tr><td><strong>Room:</strong></td><td>${item.room}</td></tr>
          <tr><td><strong>Status:</strong></td><td>${item.status.replace('_', ' ').toUpperCase()}</td></tr>
          <tr><td><strong>Last Cleaned:</strong></td><td>${item.lastCleaned}</td></tr>
          ${item.assignedTo ? `<tr><td><strong>Assigned To:</strong></td><td>${item.assignedTo}</td></tr>` : ''}
        </table>
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-sm btn-gold flex-fill" onclick="markAsClean('${item.room}')">
            <i class="bi bi-check-circle me-1"></i>Mark as Clean
          </button>
          <button class="btn btn-sm btn-outline-gold flex-fill" onclick="assignHousekeeping('${item.room}')">
            <i class="bi bi-person-plus me-1"></i>Assign Staff
          </button>
        </div>
      </div>
    `;
    
    showCustomModal('Housekeeping Details', modalContent);
  }

  // ======================
  // GLOBAL FUNCTIONS
  // ======================

  window.viewBookingDetails = function(bookingId) {
    showToast(`Viewing details for booking ${bookingId}`, 'info');
    // In real implementation, this would fetch and show booking details
  };

  window.editBookingEvent = function(bookingId) {
    showToast(`Editing booking ${bookingId}`, 'info');
    // In real implementation, this would open edit booking form
  };

  window.checkInBooking = function(bookingId) {
    showToast(`Processing check-in for booking ${bookingId}`, 'info');
    // Open check-in modal with booking data
    const checkinModal = new bootstrap.Modal(document.getElementById('checkinModal'));
    document.getElementById('checkinBookingId').value = bookingId;
    checkinModal.show();
  };

  window.checkOutBooking = function(bookingId) {
    showToast(`Processing check-out for booking ${bookingId}`, 'info');
    // Open check-out modal with booking data
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    // You would pre-fill room number based on bookingId
    checkoutModal.show();
  };

  window.cancelBooking = function(bookingId) {
    if (confirm(`Are you sure you want to cancel booking ${bookingId}? This may involve refund processing.`)) {
      showToast(`Cancelling booking ${bookingId}...`, 'warning');
      // In real implementation, this would open cancellation form
    }
  };

  window.approveCancellation = function(bookingId) {
    showToast(`Approving cancellation for ${bookingId} and processing refund`, 'success');
    // In real implementation, this would call API
  };

  window.rejectCancellation = function(bookingId) {
    showToast(`Rejecting cancellation for ${bookingId}`, 'warning');
    // In real implementation, this would call API
  };

  window.markAsClean = function(roomNumber) {
    showToast(`Marking room ${roomNumber} as clean`, 'success');
    // In real implementation, this would call API
    loadHousekeepingStatus();
    loadRooms();
  };

  window.assignHousekeeping = function(roomNumber) {
    showToast(`Assigning staff to room ${roomNumber}`, 'info');
    // In real implementation, this would open staff assignment modal
  };
});