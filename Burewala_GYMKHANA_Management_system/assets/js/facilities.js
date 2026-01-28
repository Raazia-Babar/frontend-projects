// Facilities Management JavaScript

// Sample facilities data
const facilitiesData = {
    facilities: [
        {
            id: 'FAC-001',
            name: 'Main Gym',
            category: 'gym',
            capacity: 50,
            icon: '🏋️',
            color: '#198754',
            hourlyRate: 500,
            dailyRate: 2000,
            openingTime: '06:00',
            closingTime: '22:00',
            status: 'available',
            features: ['Air Conditioned', 'Wi-Fi', 'Locker Room', 'Training Available'],
            description: 'Fully equipped gym with cardio and weight training equipment',
            bookingsToday: 15,
            revenueThisMonth: 45000,
            occupancyRate: 75
        },
        {
            id: 'FAC-002',
            name: 'Tennis Court 1',
            category: 'sports',
            capacity: 4,
            icon: '🎾',
            color: '#0d6efd',
            hourlyRate: 800,
            dailyRate: 3000,
            openingTime: '07:00',
            closingTime: '21:00',
            status: 'available',
            features: ['Flood Lights', 'Professional Court', 'Equipment Rental'],
            description: 'Professional tennis court with flood lights for evening play',
            bookingsToday: 8,
            revenueThisMonth: 32000,
            occupancyRate: 60
        },
        {
            id: 'FAC-003',
            name: 'Swimming Pool',
            category: 'pool',
            capacity: 30,
            icon: '🏊',
            color: '#0dcaf0',
            hourlyRate: 300,
            dailyRate: 1000,
            openingTime: '08:00',
            closingTime: '20:00',
            status: 'available',
            features: ['Heated Pool', 'Lifeguard', 'Changing Rooms', 'Poolside Cafe'],
            description: 'Olympic-size swimming pool with separate lanes for training',
            bookingsToday: 25,
            revenueThisMonth: 28000,
            occupancyRate: 85
        },
        {
            id: 'FAC-004',
            name: 'Event Hall',
            category: 'event',
            capacity: 200,
            icon: '🎯',
            color: '#6f42c1',
            hourlyRate: 2000,
            dailyRate: 8000,
            openingTime: '08:00',
            closingTime: '23:00',
            status: 'available',
            features: ['Air Conditioned', 'Sound System', 'Projector', 'Catering Kitchen'],
            description: 'Multi-purpose event hall suitable for weddings, conferences, and parties',
            bookingsToday: 1,
            revenueThisMonth: 65000,
            occupancyRate: 40
        },
        {
            id: 'FAC-005',
            name: 'Badminton Court',
            category: 'sports',
            capacity: 6,
            icon: '🏸',
            color: '#fd7e14',
            hourlyRate: 600,
            dailyRate: 2500,
            openingTime: '07:00',
            closingTime: '22:00',
            status: 'maintenance',
            features: ['Air Conditioned', 'Professional Court', 'Equipment Rental'],
            description: 'International standard badminton court',
            bookingsToday: 0,
            revenueThisMonth: 18000,
            occupancyRate: 55
        },
        {
            id: 'FAC-006',
            name: 'Squash Court',
            category: 'sports',
            capacity: 4,
            icon: '🎯',
            color: '#dc3545',
            hourlyRate: 700,
            dailyRate: 2800,
            openingTime: '07:00',
            closingTime: '22:00',
            status: 'available',
            features: ['Air Conditioned', 'Glass Back Wall', 'Equipment Rental'],
            description: 'Professional squash court with glass back wall',
            bookingsToday: 6,
            revenueThisMonth: 21000,
            occupancyRate: 50
        },
        {
            id: 'FAC-007',
            name: 'Restaurant',
            category: 'dining',
            capacity: 100,
            icon: '🍽️',
            color: '#ffc107',
            hourlyRate: 0,
            dailyRate: 0,
            openingTime: '11:00',
            closingTime: '23:00',
            status: 'available',
            features: ['Fine Dining', 'Outdoor Seating', 'Bar', 'Private Rooms'],
            description: 'Fine dining restaurant with indoor and outdoor seating',
            bookingsToday: 12,
            revenueThisMonth: 125000,
            occupancyRate: 65
        },
        {
            id: 'FAC-008',
            name: 'Meeting Room',
            category: 'event',
            capacity: 20,
            icon: '💼',
            color: '#6c757d',
            hourlyRate: 1000,
            dailyRate: 4000,
            openingTime: '08:00',
            closingTime: '20:00',
            status: 'available',
            features: ['Air Conditioned', 'Video Conference', 'Whiteboard', 'Wi-Fi'],
            description: 'Business meeting room with video conferencing facilities',
            bookingsToday: 3,
            revenueThisMonth: 15000,
            occupancyRate: 35
        }
    ],
    
    pricingRules: [
        {
            id: 'PRICE-001',
            facilityId: 'FAC-001',
            facilityName: 'Main Gym',
            type: 'peak',
            standardRate: 500,
            peakRate: 700,
            peakHours: '17:00-21:00',
            weekendRate: 600,
            eventRate: 1000,
            memberDiscount: 20,
            status: 'active'
        },
        {
            id: 'PRICE-002',
            facilityId: 'FAC-002',
            facilityName: 'Tennis Court 1',
            type: 'hourly',
            standardRate: 800,
            peakRate: 1000,
            peakHours: '18:00-21:00',
            weekendRate: 900,
            eventRate: 1500,
            memberDiscount: 15,
            status: 'active'
        },
        {
            id: 'PRICE-003',
            facilityId: 'FAC-003',
            facilityName: 'Swimming Pool',
            type: 'hourly',
            standardRate: 300,
            peakRate: 400,
            peakHours: '16:00-20:00',
            weekendRate: 350,
            eventRate: 800,
            memberDiscount: 25,
            status: 'active'
        }
    ],
    
    bookings: [
        {
            id: 'BOOK-001',
            facilityId: 'FAC-001',
            memberId: 'M001',
            memberName: 'Ahmed Ali',
            date: '2024-12-20',
            startTime: '08:00',
            endTime: '10:00',
            duration: 2,
            type: 'hourly',
            status: 'confirmed',
            amount: 1000,
            people: 1,
            purpose: 'personal'
        },
        {
            id: 'BOOK-002',
            facilityId: 'FAC-002',
            memberId: 'M002',
            memberName: 'Sarah Rahman',
            date: '2024-12-20',
            startTime: '14:00',
            endTime: '15:00',
            duration: 1,
            type: 'hourly',
            status: 'confirmed',
            amount: 800,
            people: 2,
            purpose: 'training'
        },
        {
            id: 'BOOK-003',
            facilityId: 'FAC-003',
            memberId: 'M003',
            memberName: 'Muhammad Khan',
            date: '2024-12-20',
            startTime: '16:00',
            endTime: '18:00',
            duration: 2,
            type: 'hourly',
            status: 'confirmed',
            amount: 600,
            people: 1,
            purpose: 'personal'
        },
        {
            id: 'BOOK-004',
            facilityId: 'FAC-004',
            memberId: 'EVENT-001',
            memberName: 'ABC Corporation',
            date: '2024-12-21',
            startTime: '18:00',
            endTime: '22:00',
            duration: 4,
            type: 'event',
            status: 'confirmed',
            amount: 8000,
            people: 150,
            purpose: 'corporate event'
        }
    ],
    
    maintenance: [
        {
            id: 'MAINT-001',
            facilityId: 'FAC-005',
            facilityName: 'Badminton Court',
            startDate: '2024-12-18',
            endDate: '2024-12-22',
            type: 'repair',
            priority: 'high',
            status: 'in-progress',
            cost: 25000,
            serviceProvider: 'Sports Flooring Inc.',
            description: 'Court floor replacement and net system upgrade'
        },
        {
            id: 'MAINT-002',
            facilityId: 'FAC-001',
            facilityName: 'Main Gym',
            startDate: '2024-12-25',
            endDate: '2024-12-26',
            type: 'cleaning',
            priority: 'medium',
            status: 'scheduled',
            cost: 5000,
            serviceProvider: 'Professional Cleaners',
            description: 'Annual deep cleaning and equipment maintenance'
        }
    ],
    
    bulkBookings: [
        {
            id: 'EVENT-001',
            name: 'Annual Tennis Tournament',
            facilities: ['FAC-002', 'FAC-006'],
            date: '2024-12-21',
            startTime: '08:00',
            endTime: '18:00',
            participants: 50,
            organizer: 'Tennis Association',
            status: 'confirmed',
            revenue: 25000
        },
        {
            id: 'EVENT-002',
            name: 'Corporate Annual Dinner',
            facilities: ['FAC-004', 'FAC-007'],
            date: '2024-12-23',
            startTime: '19:00',
            endTime: '23:00',
            participants: 200,
            organizer: 'XYZ Corporation',
            status: 'pending',
            revenue: 45000
        }
    ]
};

let currentView = 'facilityGrid';
let selectedFacility = null;
let selectedBookingSlots = [];
let calendar = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadFacilitiesGrid();
    loadPricingRules();
    loadMaintenanceData();
    loadBulkBookings();
    loadTodaySchedule();
    loadTopFacilities();
    updateFacilityStats();
    
    // Initialize calendar
    initializeCalendar();
    
    // Set today's date in date filter
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFilter').value = today;
});

// Initialize event listeners
function initializeEventListeners() {
    // Navigation buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            switchView(view);
        });
    });

    // Filter changes
    document.getElementById('facilityCategoryFilter').addEventListener('change', filterFacilities);
    document.getElementById('facilityStatusFilter').addEventListener('change', filterFacilities);
    document.getElementById('filterTodayBtn').addEventListener('click', setFilterToToday);
    
    // Facility modal form
    document.getElementById('addFacilityForm').addEventListener('submit', addNewFacility);
    
    // Booking modal form
    document.getElementById('newBookingForm').addEventListener('submit', createNewBooking);
    document.getElementById('bookingType').addEventListener('change', handleBookingTypeChange);
    document.getElementById('bookingFacility').addEventListener('change', updateBookingSummary);
    document.getElementById('bookingDate').addEventListener('change', updateBookingSummary);
    document.getElementById('checkAvailabilityBtn').addEventListener('click', checkAvailability);
    
    // Pricing rule modal
    document.getElementById('addPricingRuleForm').addEventListener('submit', addPricingRule);
    document.getElementById('pricingType').addEventListener('change', handlePricingTypeChange);
    
    // Maintenance modal
    document.getElementById('scheduleMaintenanceForm').addEventListener('submit', scheduleMaintenance);
    
    // Bulk booking modal
    document.getElementById('createBulkBookingForm').addEventListener('submit', createBulkBooking);
    
    // Report actions
    document.getElementById('exportFacilityReports').addEventListener('click', exportFacilityReports);
    document.getElementById('printFacilityReports').addEventListener('click', printFacilityReports);
    
    // Calendar filter
    document.getElementById('calendarFacilityFilter').addEventListener('change', filterCalendar);
    
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
                    sidebar.classList.remove('active');
                }
            });
        });
    }
}

// Switch between views
function switchView(view) {
    // Hide all views
    document.querySelectorAll('.facilities-view').forEach(view => {
        view.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(`${view}View`).style.display = 'block';
    
    // Add active class to selected button
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    currentView = view;
    
    // Initialize view-specific components
    switch(view) {
        case 'bookingCalendar':
            if (!calendar) {
                initializeCalendar();
            }
            calendar.render();
            break;
        case 'reports':
            loadFacilityReports();
            break;
    }
}

// Load facilities grid
function loadFacilitiesGrid() {
    const grid = document.getElementById('facilitiesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    facilitiesData.facilities.forEach(facility => {
        const statusClass = getStatusClass(facility.status);
        const statusText = getStatusText(facility.status);
        
        const card = document.createElement('div');
        card.className = 'col-md-3 col-6';
        card.innerHTML = `
            <div class="card facility-card h-100" data-id="${facility.id}">
                <div class="position-relative">
                    <div class="facility-avatar" style="background-color: ${facility.color}">
                        ${facility.icon}
                    </div>
                    <div class="capacity-badge">Capacity: ${facility.capacity}</div>
                    <div class="pricing-badge">PKR ${facility.hourlyRate}/hr</div>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${facility.name}</h5>
                    <p class="card-text text-muted small">${facility.description.substring(0, 60)}...</p>
                    <div class="mb-2">
                        <span class="facility-status ${statusClass}"></span>
                        <span class="small">${statusText}</span>
                    </div>
                    <div class="d-flex justify-content-between small text-muted mb-2">
                        <div><i class="bi bi-clock"></i> ${facility.openingTime} - ${facility.closingTime}</div>
                        <div><i class="bi bi-people"></i> ${facility.bookingsToday} bookings</div>
                    </div>
                    <div class="d-grid gap-1">
                        <button class="btn btn-sm btn-outline-primary book-facility-btn" data-id="${facility.id}">
                            <i class="bi bi-calendar-plus me-1"></i> Book Now
                        </button>
                        <button class="btn btn-sm btn-outline-secondary view-details-btn" data-id="${facility.id}">
                            <i class="bi bi-info-circle me-1"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.book-facility-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const facilityId = this.getAttribute('data-id');
            openBookingModal(facilityId);
        });
    });
    
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const facilityId = this.getAttribute('data-id');
            viewFacilityDetails(facilityId);
        });
    });
}

// Filter facilities
function filterFacilities() {
    const category = document.getElementById('facilityCategoryFilter').value;
    const status = document.getElementById('facilityStatusFilter').value;
    const date = document.getElementById('dateFilter').value;
    
    const filteredFacilities = facilitiesData.facilities.filter(facility => {
        let matches = true;
        
        if (category && facility.category !== category) {
            matches = false;
        }
        
        if (status && facility.status !== status) {
            matches = false;
        }
        
        return matches;
    });
    
    // Update grid with filtered facilities
    const grid = document.getElementById('facilitiesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredFacilities.length === 0) {
        grid.innerHTML = `
            <div class="col-12">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <i class="bi bi-inbox display-4 text-muted mb-3"></i>
                        <h5>No facilities found</h5>
                        <p class="text-muted">Try changing your filters</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    filteredFacilities.forEach(facility => {
        const statusClass = getStatusClass(facility.status);
        const statusText = getStatusText(facility.status);
        
        const card = document.createElement('div');
        card.className = 'col-md-3 col-6';
        card.innerHTML = `
            <div class="card facility-card h-100" data-id="${facility.id}">
                <div class="position-relative">
                    <div class="facility-avatar" style="background-color: ${facility.color}">
                        ${facility.icon}
                    </div>
                    <div class="capacity-badge">Capacity: ${facility.capacity}</div>
                    <div class="pricing-badge">PKR ${facility.hourlyRate}/hr</div>
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${facility.name}</h5>
                    <p class="card-text text-muted small">${facility.description.substring(0, 60)}...</p>
                    <div class="mb-2">
                        <span class="facility-status ${statusClass}"></span>
                        <span class="small">${statusText}</span>
                    </div>
                    <div class="d-flex justify-content-between small text-muted mb-2">
                        <div><i class="bi bi-clock"></i> ${facility.openingTime} - ${facility.closingTime}</div>
                        <div><i class="bi bi-people"></i> ${facility.bookingsToday} bookings</div>
                    </div>
                    <div class="d-grid gap-1">
                        <button class="btn btn-sm btn-outline-primary book-facility-btn" data-id="${facility.id}">
                            <i class="bi bi-calendar-plus me-1"></i> Book Now
                        </button>
                        <button class="btn btn-sm btn-outline-secondary view-details-btn" data-id="${facility.id}">
                            <i class="bi bi-info-circle me-1"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.book-facility-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const facilityId = this.getAttribute('data-id');
            openBookingModal(facilityId);
        });
    });
    
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const facilityId = this.getAttribute('data-id');
            viewFacilityDetails(facilityId);
        });
    });
}

// Set filter to today
function setFilterToToday() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFilter').value = today;
    filterFacilities();
}

// Open booking modal
function openBookingModal(facilityId) {
    const facility = facilitiesData.facilities.find(f => f.id === facilityId);
    if (!facility) return;
    
    selectedFacility = facility;
    
    // Populate facility select
    const facilitySelect = document.getElementById('bookingFacility');
    facilitySelect.innerHTML = `<option value="${facility.id}">${facility.name}</option>`;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('bookingDate').value = tomorrow.toISOString().split('T')[0];
    
    // Generate time slots
    generateTimeSlots(facility);
    
    // Update summary
    updateBookingSummary();
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('newBookingModal'));
    modal.show();
}

// Generate time slots for booking
function generateTimeSlots(facility) {
    const container = document.getElementById('timeSlotsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    selectedBookingSlots = [];
    
    const openingHour = parseInt(facility.openingTime.split(':')[0]);
    const closingHour = parseInt(facility.closingTime.split(':')[0]);
    
    for (let hour = openingHour; hour < closingHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            
            // Check if slot is booked
            const isBooked = facilitiesData.bookings.some(booking => 
                booking.facilityId === facility.id && 
                booking.date === document.getElementById('bookingDate').value &&
                booking.startTime <= time && 
                booking.endTime > time
            );
            
            const slot = document.createElement('div');
            slot.className = `booking-slot ${isBooked ? 'slot-booked' : 'slot-available'}`;
            slot.textContent = time;
            slot.dataset.time = time;
            
            if (!isBooked) {
                slot.addEventListener('click', function() {
                    toggleTimeSlot(this);
                });
            }
            
            container.appendChild(slot);
        }
    }
}

// Toggle time slot selection
function toggleTimeSlot(slot) {
    const time = slot.dataset.time;
    const index = selectedBookingSlots.indexOf(time);
    
    if (index === -1) {
        selectedBookingSlots.push(time);
        slot.classList.remove('slot-available');
        slot.classList.add('slot-selected');
    } else {
        selectedBookingSlots.splice(index, 1);
        slot.classList.remove('slot-selected');
        slot.classList.add('slot-available');
    }
    
    updateBookingSummary();
}

// Handle booking type change
function handleBookingTypeChange() {
    const type = document.getElementById('bookingType').value;
    const timeSection = document.getElementById('timeSelectionSection');
    const durationSection = document.getElementById('durationSelection');
    
    if (type === 'hourly') {
        timeSection.style.display = 'block';
        durationSection.style.display = 'none';
    } else {
        timeSection.style.display = 'none';
        durationSection.style.display = 'block';
    }
    
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const facility = selectedFacility;
    const date = document.getElementById('bookingDate').value;
    const type = document.getElementById('bookingType').value;
    
    if (!facility) return;
    
    // Calculate duration and amount
    let duration = 0;
    let amount = 0;
    
    if (type === 'hourly') {
        duration = selectedBookingSlots.length * 0.5; // 30-minute slots
        amount = duration * facility.hourlyRate;
    } else {
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        
        if (startTime && endTime) {
            const start = new Date(`2000-01-01T${startTime}`);
            const end = new Date(`2000-01-01T${endTime}`);
            duration = (end - start) / (1000 * 60 * 60); // hours
            
            if (type === 'daily') {
                amount = facility.dailyRate;
            } else if (type === 'weekly') {
                amount = facility.dailyRate * 7 * 0.8; // 20% discount for weekly
            } else if (type === 'monthly') {
                amount = facility.dailyRate * 30 * 0.7; // 30% discount for monthly
            }
        }
    }
    
    // Update summary display
    document.getElementById('summaryFacility').textContent = facility.name;
    document.getElementById('summaryDate').textContent = formatDate(date);
    document.getElementById('summaryTime').textContent = type === 'hourly' 
        ? selectedBookingSlots.map(t => t).join(', ') 
        : `${document.getElementById('startTime').value} - ${document.getElementById('endTime').value}`;
    document.getElementById('summaryDuration').textContent = `${duration} hours`;
    document.getElementById('summaryRate').textContent = `PKR ${facility.hourlyRate}/hr`;
    document.getElementById('summaryTotal').textContent = `PKR ${amount}`;
}

// Check availability
function checkAvailability() {
    const facility = selectedFacility;
    const date = document.getElementById('bookingDate').value;
    const type = document.getElementById('bookingType').value;
    
    if (!facility || !date) {
        showNotification('Please select facility and date!', 'warning');
        return;
    }
    
    let message = '';
    
    if (type === 'hourly') {
        // Check each selected slot
        const bookedSlots = [];
        selectedBookingSlots.forEach(slot => {
            const isBooked = facilitiesData.bookings.some(booking => 
                booking.facilityId === facility.id && 
                booking.date === date &&
                booking.startTime <= slot && 
                booking.endTime > slot
            );
            
            if (isBooked) {
                bookedSlots.push(slot);
            }
        });
        
        if (bookedSlots.length > 0) {
            message = `The following slots are already booked: ${bookedSlots.join(', ')}`;
            showNotification(message, 'warning');
        } else {
            message = 'All selected slots are available!';
            showNotification(message, 'success');
        }
    } else {
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        
        if (!startTime || !endTime) {
            showNotification('Please select start and end time!', 'warning');
            return;
        }
        
        // Check for overlapping bookings
        const hasOverlap = facilitiesData.bookings.some(booking => 
            booking.facilityId === facility.id && 
            booking.date === date &&
            ((booking.startTime < endTime && booking.endTime > startTime) ||
             (startTime < booking.endTime && endTime > booking.startTime))
        );
        
        if (hasOverlap) {
            message = 'The selected time slot overlaps with an existing booking!';
            showNotification(message, 'warning');
        } else {
            message = 'The selected time slot is available!';
            showNotification(message, 'success');
        }
    }
}

// Create new booking
function createNewBooking(e) {
    e.preventDefault();
    
    const facility = selectedFacility;
    const date = document.getElementById('bookingDate').value;
    const type = document.getElementById('bookingType').value;
    const member = document.getElementById('bookingMember').value;
    const people = parseInt(document.getElementById('bookingPeople').value) || 1;
    const purpose = document.getElementById('bookingPurpose').value;
    const requirements = document.getElementById('bookingRequirements').value;
    
    if (!facility || !date || !member) {
        showNotification('Please fill all required fields!', 'danger');
        return;
    }
    
    // Generate booking ID
    const bookingId = `BOOK-${String(facilitiesData.bookings.length + 1).padStart(3, '0')}`;
    
    let startTime, endTime, duration, amount;
    
    if (type === 'hourly') {
        if (selectedBookingSlots.length === 0) {
            showNotification('Please select at least one time slot!', 'warning');
            return;
        }
        
        // Sort slots and get start/end
        selectedBookingSlots.sort();
        startTime = selectedBookingSlots[0];
        endTime = selectedBookingSlots[selectedBookingSlots.length - 1];
        
        // Add 30 minutes to end time
        const [hours, minutes] = endTime.split(':').map(Number);
        const endDate = new Date(2000, 0, 1, hours, minutes + 30);
        endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
        
        duration = selectedBookingSlots.length * 0.5;
        amount = duration * facility.hourlyRate;
    } else {
        startTime = document.getElementById('startTime').value;
        endTime = document.getElementById('endTime').value;
        
        if (!startTime || !endTime) {
            showNotification('Please select start and end time!', 'warning');
            return;
        }
        
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        duration = (end - start) / (1000 * 60 * 60);
        
        if (type === 'daily') {
            amount = facility.dailyRate;
        } else if (type === 'weekly') {
            amount = facility.dailyRate * 7 * 0.8;
        } else if (type === 'monthly') {
            amount = facility.dailyRate * 30 * 0.7;
        } else if (type === 'event') {
            amount = facility.hourlyRate * duration * 1.5; // 50% premium for events
        }
    }
    
    // Create booking object
    const newBooking = {
        id: bookingId,
        facilityId: facility.id,
        memberId: member,
        memberName: 'New Member', // In real app, get from member data
        date: date,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        type: type,
        status: 'confirmed',
        amount: amount,
        people: people,
        purpose: purpose,
        requirements: requirements
    };
    
    // Add to bookings
    facilitiesData.bookings.push(newBooking);
    
    // Update facility stats
    facility.bookingsToday++;
    facility.revenueThisMonth += amount;
    
    // Close modal
    const modalElement = document.getElementById('newBookingModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('newBookingForm').reset();
    selectedBookingSlots = [];
    selectedFacility = null;
    
    // Update displays
    loadFacilitiesGrid();
    loadTodaySchedule();
    updateFacilityStats();
    
    // If calendar is active, refresh it
    if (calendar) {
        calendar.refetchEvents();
    }
    
    showNotification(`Booking ${bookingId} created successfully! Amount: PKR ${amount}`, 'success');
}

// Add new facility
function addNewFacility(e) {
    e.preventDefault();
    
    const name = document.getElementById('facilityName').value;
    const category = document.getElementById('facilityCategory').value;
    const capacity = parseInt(document.getElementById('facilityCapacity').value);
    const icon = document.getElementById('facilityIcon').value;
    const color = document.getElementById('facilityColor').value;
    const hourlyRate = parseInt(document.getElementById('defaultRate').value);
    const dailyRate = parseInt(document.getElementById('dailyRate').value) || hourlyRate * 4;
    const openingTime = document.getElementById('openingTime').value;
    const closingTime = document.getElementById('closingTime').value;
    const description = document.getElementById('facilityDescription').value;
    const status = document.getElementById('facilityStatus').value;
    
    // Get features
    const features = [];
    if (document.getElementById('featureAirConditioned').checked) features.push('Air Conditioned');
    if (document.getElementById('featureWiFi').checked) features.push('Wi-Fi Available');
    if (document.getElementById('featureLocker').checked) features.push('Locker Room');
    if (document.getElementById('featureParking').checked) features.push('Parking Available');
    if (document.getElementById('featureTraining').checked) features.push('Training Available');
    if (document.getElementById('featureEquipment').checked) features.push('Equipment Included');
    
    // Generate facility ID
    const facilityId = `FAC-${String(facilitiesData.facilities.length + 1).padStart(3, '0')}`;
    
    // Create facility object
    const newFacility = {
        id: facilityId,
        name: name,
        category: category,
        capacity: capacity,
        icon: icon,
        color: color,
        hourlyRate: hourlyRate,
        dailyRate: dailyRate,
        openingTime: openingTime,
        closingTime: closingTime,
        status: status,
        features: features,
        description: description,
        bookingsToday: 0,
        revenueThisMonth: 0,
        occupancyRate: 0
    };
    
    // Add to facilities
    facilitiesData.facilities.push(newFacility);
    
    // Close modal
    const modalElement = document.getElementById('addFacilityModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('addFacilityForm').reset();
    
    // Update displays
    loadFacilitiesGrid();
    updateFacilityStats();
    
    // Update dropdowns
    updateFacilityDropdowns();
    
    showNotification(`Facility "${name}" added successfully!`, 'success');
}

// View facility details
function viewFacilityDetails(facilityId) {
    const facility = facilitiesData.facilities.find(f => f.id === facilityId);
    if (!facility) return;
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${facility.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-4">
                    <div class="col-md-4 text-center">
                        <div class="facility-avatar mb-3" style="background-color: ${facility.color}; width: 80px; height: 80px; font-size: 32px;">
                            ${facility.icon}
                        </div>
                        <div class="mb-2">
                            <span class="facility-status ${getStatusClass(facility.status)}"></span>
                            <span>${getStatusText(facility.status)}</span>
                        </div>
                        <div class="badge bg-secondary mb-2">Capacity: ${facility.capacity}</div>
                    </div>
                    <div class="col-md-8">
                        <h6>Description</h6>
                        <p>${facility.description}</p>
                        
                        <h6 class="mt-3">Features</h6>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${facility.features.map(feature => `
                                <span class="badge bg-light text-dark">${feature}</span>
                            `).join('')}
                        </div>
                        
                        <h6 class="mt-3">Pricing</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2"><strong>Hourly Rate:</strong> PKR ${facility.hourlyRate}</div>
                                <div class="mb-2"><strong>Daily Rate:</strong> PKR ${facility.dailyRate}</div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-2"><strong>Opening Time:</strong> ${facility.openingTime}</div>
                                <div class="mb-2"><strong>Closing Time:</strong> ${facility.closingTime}</div>
                            </div>
                        </div>
                        
                        <h6 class="mt-3">Performance</h6>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="h4">${facility.bookingsToday}</div>
                                    <div class="small text-muted">Today's Bookings</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="h4">PKR ${facility.revenueThisMonth}</div>
                                    <div class="small text-muted">Monthly Revenue</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="h4">${facility.occupancyRate}%</div>
                                    <div class="small text-muted">Occupancy Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h6>Recent Bookings</h6>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Member</th>
                                <th>Duration</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${facilitiesData.bookings
                                .filter(b => b.facilityId === facilityId)
                                .slice(0, 5)
                                .map(booking => `
                                    <tr>
                                        <td>${formatDate(booking.date)}</td>
                                        <td>${booking.startTime} - ${booking.endTime}</td>
                                        <td>${booking.memberName}</td>
                                        <td>${booking.duration} hours</td>
                                        <td>PKR ${booking.amount}</td>
                                    </tr>
                                `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-gold" onclick="openBookingModal('${facilityId}')">
                    <i class="bi bi-calendar-plus me-1"></i> Book This Facility
                </button>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modalId = 'facilityDetailsModal';
    let modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = modalId;
        modalElement.tabIndex = -1;
        document.body.appendChild(modalElement);
    }
    
    modalElement.innerHTML = modalContent;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Initialize calendar
function initializeCalendar() {
    const calendarEl = document.getElementById('facilityCalendar');
    if (!calendarEl) return;
    
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: generateCalendarEvents(),
        eventClick: function(info) {
            viewBookingDetails(info.event.id);
        },
        dateClick: function(info) {
            openBookingModalForDate(info.dateStr);
        }
    });
    
    calendar.render();
}

// Generate calendar events
function generateCalendarEvents() {
    const events = [];
    
    facilitiesData.bookings.forEach(booking => {
        const facility = facilitiesData.facilities.find(f => f.id === booking.facilityId);
        if (!facility) return;
        
        events.push({
            id: booking.id,
            title: `${facility.name} - ${booking.memberName}`,
            start: `${booking.date}T${booking.startTime}`,
            end: `${booking.date}T${booking.endTime}`,
            backgroundColor: facility.color,
            borderColor: facility.color,
            extendedProps: {
                type: booking.type,
                amount: booking.amount,
                people: booking.people
            }
        });
    });
    
    facilitiesData.maintenance.forEach(maintenance => {
        const facility = facilitiesData.facilities.find(f => f.id === maintenance.facilityId);
        if (!facility) return;
        
        events.push({
            id: maintenance.id,
            title: `${facility.name} - Maintenance`,
            start: maintenance.startDate,
            end: maintenance.endDate,
            backgroundColor: '#ffc107',
            borderColor: '#ffc107',
            allDay: true,
            extendedProps: {
                type: 'maintenance',
                priority: maintenance.priority
            }
        });
    });
    
    return events;
}

// Filter calendar
function filterCalendar() {
    const facilityId = document.getElementById('calendarFacilityFilter').value;
    
    if (!facilityId) {
        calendar.removeAllEvents();
        calendar.addEventSource(generateCalendarEvents());
    } else {
        const filteredEvents = generateCalendarEvents().filter(event => {
            const facility = facilitiesData.facilities.find(f => 
                event.title.includes(f.name) && f.id === facilityId
            );
            return !!facility;
        });
        
        calendar.removeAllEvents();
        calendar.addEventSource(filteredEvents);
    }
}

// View booking details
function viewBookingDetails(bookingId) {
    const booking = facilitiesData.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    const facility = facilitiesData.facilities.find(f => f.id === booking.facilityId);
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Booking Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Booking ID:</strong> ${booking.id}</div>
                        <div class="mb-2"><strong>Facility:</strong> ${facility?.name || 'Unknown'}</div>
                        <div class="mb-2"><strong>Member:</strong> ${booking.memberName}</div>
                        <div class="mb-2"><strong>Date:</strong> ${formatDate(booking.date)}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</div>
                        <div class="mb-2"><strong>Duration:</strong> ${booking.duration} hours</div>
                        <div class="mb-2"><strong>Type:</strong> <span class="badge bg-secondary">${booking.type}</span></div>
                        <div class="mb-2"><strong>Status:</strong> <span class="badge bg-success">${booking.status}</span></div>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Participants:</strong> ${booking.people}</div>
                        <div class="mb-2"><strong>Purpose:</strong> ${booking.purpose}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Amount:</strong> PKR ${booking.amount}</div>
                        <div class="mb-2"><strong>Booking Time:</strong> ${formatDateTime(new Date().toISOString())}</div>
                    </div>
                </div>
                
                ${booking.requirements ? `
                <div class="mb-3">
                    <strong>Special Requirements:</strong>
                    <p class="mt-1">${booking.requirements}</p>
                </div>
                ` : ''}
                
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>Cancellation Policy:</strong> Cancellations must be made at least 24 hours in advance for a full refund.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-primary" onclick="printBooking('${bookingId}')">
                    <i class="bi bi-printer me-1"></i> Print
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="cancelBooking('${bookingId}')">
                    <i class="bi bi-x-circle me-1"></i> Cancel Booking
                </button>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modalId = 'bookingDetailsModal';
    let modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = modalId;
        modalElement.tabIndex = -1;
        document.body.appendChild(modalElement);
    }
    
    modalElement.innerHTML = modalContent;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Open booking modal for specific date
function openBookingModalForDate(date) {
    // Set the date in the booking form
    document.getElementById('bookingDate').value = date;
    
    // Show booking modal
    const modal = new bootstrap.Modal(document.getElementById('newBookingModal'));
    modal.show();
}

// Load pricing rules
function loadPricingRules() {
    const table = document.getElementById('pricingRulesTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    facilitiesData.pricingRules.forEach(rule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rule.facilityName}</td>
            <td><span class="badge bg-secondary">${rule.type}</span></td>
            <td>${rule.peakRate ? `PKR ${rule.peakRate}` : '-'}</td>
            <td>PKR ${rule.standardRate}</td>
            <td>${rule.weekendRate ? `PKR ${rule.weekendRate}` : '-'}</td>
            <td>${rule.eventRate ? `PKR ${rule.eventRate}` : '-'}</td>
            <td><span class="badge bg-${rule.status === 'active' ? 'success' : 'secondary'}">${rule.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editPricingRule('${rule.id}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        
        table.appendChild(row);
    });
}

// Handle pricing type change
function handlePricingTypeChange() {
    const type = document.getElementById('pricingType').value;
    const peakSection = document.getElementById('peakPricingSection');
    
    if (type === 'peak') {
        peakSection.style.display = 'block';
    } else {
        peakSection.style.display = 'none';
    }
}

// Add pricing rule
function addPricingRule(e) {
    e.preventDefault();
    
    const facilityId = document.getElementById('pricingFacility').value;
    const type = document.getElementById('pricingType').value;
    const standardRate = parseInt(document.getElementById('standardRate').value);
    const memberDiscount = parseInt(document.getElementById('memberDiscount').value) || 0;
    const peakRate = parseInt(document.getElementById('peakRate').value) || standardRate;
    const peakHours = document.getElementById('peakHours').value;
    const weekendRate = parseInt(document.getElementById('weekendRate').value) || standardRate * 1.2;
    const holidayRate = parseInt(document.getElementById('holidayRate').value) || standardRate * 1.5;
    const effectiveFrom = document.getElementById('effectiveFrom').value;
    const isActive = document.getElementById('isActivePricing').checked;
    
    const facility = facilitiesData.facilities.find(f => f.id === facilityId);
    if (!facility) {
        showNotification('Please select a valid facility!', 'warning');
        return;
    }
    
    // Generate rule ID
    const ruleId = `PRICE-${String(facilitiesData.pricingRules.length + 1).padStart(3, '0')}`;
    
    // Create rule object
    const newRule = {
        id: ruleId,
        facilityId: facilityId,
        facilityName: facility.name,
        type: type,
        standardRate: standardRate,
        peakRate: type === 'peak' ? peakRate : standardRate,
        peakHours: peakHours,
        weekendRate: weekendRate,
        eventRate: holidayRate,
        memberDiscount: memberDiscount,
        status: isActive ? 'active' : 'inactive'
    };
    
    // Add to pricing rules
    facilitiesData.pricingRules.push(newRule);
    
    // Close modal
    const modalElement = document.getElementById('addPricingRuleModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('addPricingRuleForm').reset();
    
    // Update display
    loadPricingRules();
    
    showNotification(`Pricing rule added for ${facility.name}!`, 'success');
}

// Edit pricing rule
function editPricingRule(ruleId) {
    showNotification('Edit functionality coming soon!', 'info');
}

// Load maintenance data
function loadMaintenanceData() {
    loadMaintenanceSchedule();
    loadMaintenanceDue();
    loadMaintenanceHistory();
}

// Load maintenance schedule
function loadMaintenanceSchedule() {
    const table = document.getElementById('maintenanceScheduleTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    facilitiesData.maintenance.forEach(maintenance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${maintenance.facilityName}</td>
            <td>${formatDate(maintenance.startDate)} - ${formatDate(maintenance.endDate)}</td>
            <td>${calculateDaysBetween(maintenance.startDate, maintenance.endDate)} days</td>
            <td><span class="badge bg-${getMaintenanceStatusClass(maintenance.status)}">${maintenance.status}</span></td>
        `;
        
        table.appendChild(row);
    });
}

// Load maintenance due
function loadMaintenanceDue() {
    const table = document.getElementById('maintenanceDueTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Simulate maintenance due data
    const maintenanceDue = [
        { facility: 'Swimming Pool', lastService: '2024-11-15', nextDue: '2024-12-25', priority: 'medium' },
        { facility: 'Gym Equipment', lastService: '2024-12-01', nextDue: '2024-12-31', priority: 'low' },
        { facility: 'Air Conditioning', lastService: '2024-10-01', nextDue: '2024-12-20', priority: 'high' }
    ];
    
    maintenanceDue.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.facility}</td>
            <td>${formatDate(item.lastService)}</td>
            <td>${formatDate(item.nextDue)}</td>
            <td><span class="badge bg-${getPriorityClass(item.priority)}">${item.priority}</span></td>
        `;
        
        table.appendChild(row);
    });
}

// Load maintenance history
function loadMaintenanceHistory() {
    const table = document.getElementById('maintenanceHistoryTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    // Simulate maintenance history
    const history = [
        { date: '2024-11-15', facility: 'Swimming Pool', type: 'Filter Cleaning', cost: 5000, serviceBy: 'Pool Maintenance Co.', notes: 'Regular filter cleaning and chemical balance' },
        { date: '2024-11-01', facility: 'Main Gym', type: 'Equipment Service', cost: 15000, serviceBy: 'Fitness Equipment Inc.', notes: 'Treadmill and weight machine servicing' },
        { date: '2024-10-20', facility: 'Tennis Court', type: 'Surface Repair', cost: 25000, serviceBy: 'Sports Surfaces Ltd.', notes: 'Court resurfacing and line marking' }
    ];
    
    history.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.facility}</td>
            <td><span class="badge bg-secondary">${item.type}</span></td>
            <td>PKR ${item.cost}</td>
            <td>${item.serviceBy}</td>
            <td>${item.notes}</td>
        `;
        
        table.appendChild(row);
    });
}

// Schedule maintenance
function scheduleMaintenance(e) {
    e.preventDefault();
    
    const facilityId = document.getElementById('maintenanceFacility').value;
    const startDate = document.getElementById('maintenanceStart').value;
    const endDate = document.getElementById('maintenanceEnd').value;
    const type = document.getElementById('maintenanceType').value;
    const priority = document.getElementById('maintenancePriority').value;
    const cost = parseInt(document.getElementById('maintenanceCost').value) || 0;
    const provider = document.getElementById('serviceProvider').value;
    const notes = document.getElementById('maintenanceNotes').value;
    const notifyMembers = document.getElementById('notifyMembers').checked;
    
    const facility = facilitiesData.facilities.find(f => f.id === facilityId);
    if (!facility) {
        showNotification('Please select a valid facility!', 'warning');
        return;
    }
    
    // Generate maintenance ID
    const maintenanceId = `MAINT-${String(facilitiesData.maintenance.length + 1).padStart(3, '0')}`;
    
    // Update facility status
    facility.status = 'maintenance';
    
    // Create maintenance object
    const newMaintenance = {
        id: maintenanceId,
        facilityId: facilityId,
        facilityName: facility.name,
        startDate: startDate,
        endDate: endDate,
        type: type,
        priority: priority,
        status: 'scheduled',
        cost: cost,
        serviceProvider: provider,
        description: notes
    };
    
    // Add to maintenance
    facilitiesData.maintenance.push(newMaintenance);
    
    // Close modal
    const modalElement = document.getElementById('scheduleMaintenanceModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('scheduleMaintenanceForm').reset();
    
    // Update displays
    loadFacilitiesGrid();
    loadMaintenanceSchedule();
    
    // Refresh calendar if active
    if (calendar) {
        calendar.refetchEvents();
    }
    
    showNotification(`Maintenance scheduled for ${facility.name}!${notifyMembers ? ' Members will be notified.' : ''}`, 'success');
}

// Load bulk bookings
function loadBulkBookings() {
    loadBulkBookingsTable();
    loadEventCalendar();
}

// Load bulk bookings table
function loadBulkBookingsTable() {
    const table = document.getElementById('bulkBookingsTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    facilitiesData.bulkBookings.forEach(event => {
        const facilities = event.facilities.map(facId => {
            const facility = facilitiesData.facilities.find(f => f.id === facId);
            return facility ? facility.name : facId;
        }).join(', ');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${facilities}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.startTime} - ${event.endTime}</td>
            <td>${event.participants}</td>
            <td><span class="badge bg-${event.status === 'confirmed' ? 'success' : 'warning'}">${event.status}</span></td>
            <td>PKR ${event.revenue}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewEventDetails('${event.id}')">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        `;
        
        table.appendChild(row);
    });
}

// Load event calendar
function loadEventCalendar() {
    const table = document.getElementById('eventCalendarTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    facilitiesData.bulkBookings.forEach(event => {
        const facilities = event.facilities.map(facId => {
            const facility = facilitiesData.facilities.find(f => f.id === facId);
            return facility ? facility.name : facId;
        }).join(', ');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(event.date)}</td>
            <td>${event.name}</td>
            <td>${facilities}</td>
            <td>${event.startTime} - ${event.endTime}</td>
            <td>${event.organizer}</td>
            <td><span class="badge bg-${event.status === 'confirmed' ? 'success' : 'warning'}">${event.status}</span></td>
        `;
        
        table.appendChild(row);
    });
}

// Create bulk booking
function createBulkBooking(e) {
    e.preventDefault();
    
    const eventName = document.getElementById('eventName').value;
    const organizer = document.getElementById('eventOrganizer').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventType = document.getElementById('eventType').value;
    const startTime = document.getElementById('eventStartTime').value;
    const endTime = document.getElementById('eventEndTime').value;
    const participants = parseInt(document.getElementById('eventParticipants').value) || 50;
    const specialRate = parseInt(document.getElementById('eventSpecialRate').value) || 0;
    const requirements = document.getElementById('eventRequirements').value;
    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    
    // Get selected facilities
    const selectedFacilities = Array.from(document.querySelectorAll('#facilitiesSelection input:checked'))
        .map(cb => cb.value);
    
    if (selectedFacilities.length === 0) {
        showNotification('Please select at least one facility!', 'warning');
        return;
    }
    
    // Calculate revenue
    let revenue = 0;
    selectedFacilities.forEach(facId => {
        const facility = facilitiesData.facilities.find(f => f.id === facId);
        if (facility) {
            const start = new Date(`2000-01-01T${startTime}`);
            const end = new Date(`2000-01-01T${endTime}`);
            const duration = (end - start) / (1000 * 60 * 60);
            
            const rate = specialRate > 0 ? specialRate : facility.hourlyRate * 1.5; // 50% premium for events
            revenue += rate * duration;
        }
    });
    
    // Generate event ID
    const eventId = `EVENT-${String(facilitiesData.bulkBookings.length + 1).padStart(3, '0')}`;
    
    // Create event object
    const newEvent = {
        id: eventId,
        name: eventName,
        facilities: selectedFacilities,
        date: eventDate,
        startTime: startTime,
        endTime: endTime,
        participants: participants,
        organizer: organizer,
        type: eventType,
        status: 'pending',
        revenue: revenue,
        contactName: contactName,
        contactPhone: contactPhone,
        requirements: requirements
    };
    
    // Add to bulk bookings
    facilitiesData.bulkBookings.push(newEvent);
    
    // Close modal
    const modalElement = document.getElementById('createBulkBookingModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('createBulkBookingForm').reset();
    
    // Update displays
    loadBulkBookings();
    
    // Refresh calendar if active
    if (calendar) {
        calendar.refetchEvents();
    }
    
    showNotification(`Event "${eventName}" booking created! Revenue: PKR ${revenue}`, 'success');
}

// View event details
function viewEventDetails(eventId) {
    const event = facilitiesData.bulkBookings.find(e => e.id === eventId);
    if (!event) return;
    
    const facilities = event.facilities.map(facId => {
        const facility = facilitiesData.facilities.find(f => f.id === facId);
        return facility ? facility.name : facId;
    }).join(', ');
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${event.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Event ID:</strong> ${event.id}</div>
                        <div class="mb-2"><strong>Organizer:</strong> ${event.organizer}</div>
                        <div class="mb-2"><strong>Date:</strong> ${formatDate(event.date)}</div>
                        <div class="mb-2"><strong>Time:</strong> ${event.startTime} - ${event.endTime}</div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-2"><strong>Type:</strong> <span class="badge bg-secondary">${event.type}</span></div>
                        <div class="mb-2"><strong>Status:</strong> <span class="badge bg-${event.status === 'confirmed' ? 'success' : 'warning'}">${event.status}</span></div>
                        <div class="mb-2"><strong>Participants:</strong> ${event.participants}</div>
                        <div class="mb-2"><strong>Revenue:</strong> PKR ${event.revenue}</div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <strong>Facilities:</strong>
                    <p>${facilities}</p>
                </div>
                
                ${event.requirements ? `
                <div class="mb-3">
                    <strong>Requirements:</strong>
                    <p class="mt-1">${event.requirements}</p>
                </div>
                ` : ''}
                
                ${event.contactName || event.contactPhone ? `
                <div class="mb-3">
                    <strong>Contact Person:</strong>
                    <div class="mt-1">
                        ${event.contactName ? `<div>Name: ${event.contactName}</div>` : ''}
                        ${event.contactPhone ? `<div>Phone: ${event.contactPhone}</div>` : ''}
                    </div>
                </div>
                ` : ''}
                
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>Event Booking Policy:</strong> A 50% deposit is required to confirm the booking. Full payment must be made 7 days before the event.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                ${event.status === 'pending' ? `
                <button type="button" class="btn btn-outline-success" onclick="confirmEvent('${eventId}')">
                    <i class="bi bi-check-circle me-1"></i> Confirm
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="rejectEvent('${eventId}')">
                    <i class="bi bi-x-circle me-1"></i> Reject
                </button>
                ` : ''}
            </div>
        </div>
    `;
    
    // Create and show modal
    const modalId = 'eventDetailsModal';
    let modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = modalId;
        modalElement.tabIndex = -1;
        document.body.appendChild(modalElement);
    }
    
    modalElement.innerHTML = modalContent;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Confirm event
function confirmEvent(eventId) {
    const event = facilitiesData.bulkBookings.find(e => e.id === eventId);
    if (!event) return;
    
    event.status = 'confirmed';
    showNotification(`Event "${event.name}" confirmed!`, 'success');
    
    // Close modal
    const modalElement = document.getElementById('eventDetailsModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Update display
    loadBulkBookings();
}

// Reject event
function rejectEvent(eventId) {
    const event = facilitiesData.bulkBookings.find(e => e.id === eventId);
    if (!event) return;
    
    if (confirm(`Are you sure you want to reject event "${event.name}"?`)) {
        event.status = 'rejected';
        showNotification(`Event "${event.name}" rejected.`, 'info');
        
        // Close modal
        const modalElement = document.getElementById('eventDetailsModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
        
        // Update display
        loadBulkBookings();
    }
}

// Load today's schedule
function loadTodaySchedule() {
    const container = document.getElementById('todaySchedule');
    if (!container) return;
    
    container.innerHTML = '';
    
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = facilitiesData.bookings.filter(b => b.date === today);
    
    if (todayBookings.length === 0) {
        container.innerHTML = `
            <div class="text-center py-3 text-muted">
                <i class="bi bi-calendar-x display-6"></i>
                <p class="mt-2 mb-0">No bookings for today</p>
            </div>
        `;
        return;
    }
    
    todayBookings.forEach(booking => {
        const facility = facilitiesData.facilities.find(f => f.id === booking.facilityId);
        if (!facility) return;
        
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action';
        item.href = '#';
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${facility.name}</h6>
                <small class="text-muted">${booking.startTime}</small>
            </div>
            <p class="mb-1">${booking.memberName}</p>
            <small class="text-muted">${booking.duration} hours • PKR ${booking.amount}</small>
        `;
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            viewBookingDetails(booking.id);
        });
        
        container.appendChild(item);
    });
}

// Load top facilities
function loadTopFacilities() {
    const container = document.getElementById('topFacilities');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort facilities by revenue
    const topFacilities = [...facilitiesData.facilities]
        .sort((a, b) => b.revenueThisMonth - a.revenueThisMonth)
        .slice(0, 5);
    
    topFacilities.forEach(facility => {
        const item = document.createElement('div');
        item.className = 'list-group-item';
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div class="facility-status ${getStatusClass(facility.status)} me-2"></div>
                    <div>
                        <div class="fw-bold">${facility.name}</div>
                        <small class="text-muted">${facility.bookingsToday} bookings today</small>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold">PKR ${facility.revenueThisMonth}</div>
                    <small class="text-muted">revenue</small>
                </div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Load facility reports
function loadFacilityReports() {
    loadFacilityPerformance();
    loadFacilityCharts();
}

// Load facility performance table
function loadFacilityPerformance() {
    const table = document.getElementById('facilityPerformanceTable');
    if (!table) return;
    
    table.innerHTML = '';
    
    facilitiesData.facilities.forEach(facility => {
        // Calculate additional metrics
        const dailyHours = parseInt(facility.closingTime.split(':')[0]) - parseInt(facility.openingTime.split(':')[0]);
        const maxMonthlyHours = dailyHours * 30;
        const estimatedUsage = facility.bookingsToday * 1.5 * 30; // Estimate monthly usage
        const occupancyRate = Math.round((estimatedUsage / maxMonthlyHours) * 100);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${facility.name}</td>
            <td>${facility.bookingsToday * 30}</td>
            <td>${estimatedUsage} hours</td>
            <td>PKR ${facility.revenueThisMonth}</td>
            <td>${occupancyRate}%</td>
            <td>${facility.peakHours || '18:00-20:00'}</td>
            <td>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-success" style="width: ${facility.occupancyRate}%"></div>
                </div>
                <small>${facility.occupancyRate}%</small>
            </td>
        `;
        
        table.appendChild(row);
    });
}

// Load facility charts
function loadFacilityCharts() {
    loadFacilityUsageChart();
    loadFacilityRevenueChart();
}

// Load facility usage chart
function loadFacilityUsageChart() {
    const ctx = document.getElementById('facilityUsageChart');
    if (!ctx) return;
    
    const labels = facilitiesData.facilities.map(f => f.name);
    const usageData = facilitiesData.facilities.map(f => f.bookingsToday * 30); // Estimated monthly usage
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Usage (hours)',
                data: usageData,
                backgroundColor: facilitiesData.facilities.map(f => f.color),
                borderWidth: 1
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
                    callbacks: {
                        label: function(context) {
                            return `Usage: ${context.raw} hours`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                }
            }
        }
    });
}

// Load facility revenue chart
function loadFacilityRevenueChart() {
    const ctx = document.getElementById('facilityRevenueChart');
    if (!ctx) return;
    
    const labels = facilitiesData.facilities.map(f => f.name);
    const revenueData = facilitiesData.facilities.map(f => f.revenueThisMonth);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue (PKR)',
                data: revenueData,
                backgroundColor: facilitiesData.facilities.map(f => f.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = revenueData.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: PKR ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Export facility reports
function exportFacilityReports() {
    const data = {
        title: 'Facility Management Report',
        date: new Date().toISOString(),
        facilities: facilitiesData.facilities,
        bookings: facilitiesData.bookings,
        revenue: facilitiesData.facilities.reduce((sum, f) => sum + f.revenueThisMonth, 0),
        totalBookings: facilitiesData.facilities.reduce((sum, f) => sum + f.bookingsToday, 0)
    };
    
    downloadJSON(data, 'facility-report-export.json');
    showNotification('Facility report exported successfully!', 'success');
}

// Print facility reports
function printFacilityReports() {
    window.print();
}

// Update facility stats
function updateFacilityStats() {
    const totalFacilities = facilitiesData.facilities.length;
    const activeFacilities = facilitiesData.facilities.filter(f => f.status === 'available').length;
    const todayBookings = facilitiesData.facilities.reduce((sum, f) => sum + f.bookingsToday, 0);
    const totalCapacity = facilitiesData.facilities.reduce((sum, f) => sum + f.capacity, 0);
    const usedCapacity = facilitiesData.bookings.reduce((sum, b) => sum + b.people, 0);
    const capacityPercentage = totalCapacity > 0 ? Math.round((usedCapacity / totalCapacity) * 100) : 0;
    const facilityRevenue = facilitiesData.facilities.reduce((sum, f) => sum + f.revenueThisMonth, 0);
    const maintenanceDue = facilitiesData.maintenance.filter(m => m.status === 'scheduled').length;
    
    document.getElementById('totalFacilities').textContent = totalFacilities;
    document.getElementById('activeFacilities').textContent = activeFacilities;
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('todayCapacity').textContent = `${capacityPercentage}%`;
    document.getElementById('facilityRevenue').textContent = `PKR ${facilityRevenue}`;
    document.getElementById('maintenanceDue').textContent = maintenanceDue;
}

// Update facility dropdowns
function updateFacilityDropdowns() {
    // Update booking facility dropdown
    const bookingFacilitySelect = document.getElementById('bookingFacility');
    if (bookingFacilitySelect) {
        bookingFacilitySelect.innerHTML = '<option value="">Select Facility</option>' +
            facilitiesData.facilities.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    }
    
    // Update calendar facility filter
    const calendarFilter = document.getElementById('calendarFacilityFilter');
    if (calendarFilter) {
        calendarFilter.innerHTML = '<option value="">All Facilities</option>' +
            facilitiesData.facilities.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    }
    
    // Update pricing facility dropdown
    const pricingFacilitySelect = document.getElementById('pricingFacility');
    if (pricingFacilitySelect) {
        pricingFacilitySelect.innerHTML = '<option value="">Select Facility</option>' +
            facilitiesData.facilities.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    }
    
    // Update maintenance facility dropdown
    const maintenanceFacilitySelect = document.getElementById('maintenanceFacility');
    if (maintenanceFacilitySelect) {
        maintenanceFacilitySelect.innerHTML = '<option value="">Select Facility</option>' +
            facilitiesData.facilities.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    }
    
    // Update bulk booking facilities selection
    const facilitiesSelection = document.getElementById('facilitiesSelection');
    if (facilitiesSelection) {
        facilitiesSelection.innerHTML = facilitiesData.facilities.map(f => `
            <div class="col-md-6">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${f.id}" id="facility_${f.id}">
                    <label class="form-check-label" for="facility_${f.id}">
                        ${f.name}
                    </label>
                </div>
            </div>
        `).join('');
    }
}

// Utility functions
function getStatusClass(status) {
    const classes = {
        'available': 'status-available',
        'booked': 'status-booked',
        'maintenance': 'status-maintenance',
        'closed': 'status-closed'
    };
    return classes[status] || 'status-closed';
}

function getStatusText(status) {
    const texts = {
        'available': 'Available',
        'booked': 'Booked',
        'maintenance': 'Maintenance',
        'closed': 'Closed'
    };
    return texts[status] || 'Unknown';
}

function getMaintenanceStatusClass(status) {
    const classes = {
        'scheduled': 'warning',
        'in-progress': 'info',
        'completed': 'success',
        'cancelled': 'secondary'
    };
    return classes[status] || 'secondary';
}

function getPriorityClass(priority) {
    const classes = {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger',
        'critical': 'danger'
    };
    return classes[priority] || 'secondary';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateTimeString) {
    return new Date(dateTimeString).toLocaleString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

function downloadJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
}

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

// Initialize facility dropdowns
updateFacilityDropdowns();