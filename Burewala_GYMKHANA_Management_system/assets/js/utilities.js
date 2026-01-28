// Utilities Management Module
document.addEventListener('DOMContentLoaded', function () {
    // Sample data - In production, this would come from an API
    let utilityBills = [
        {
            id: 1,
            bill_number: 'ELEC-2024-001',
            utility_type: 'electricity',
            provider: 'WAPDA',
            amount: 12500.00,
            due_date: '2024-11-15',
            payment_date: '2024-11-10',
            period_from: '2024-10-01',
            period_to: '2024-10-31',
            status: 'paid',
            attachment: 'electricity_bill_oct.pdf',
            notes: 'October electricity bill',
            created_at: '2024-10-25'
        },
        {
            id: 2,
            bill_number: 'WATER-2024-001',
            utility_type: 'water',
            provider: 'Water Corporation',
            amount: 8500.00,
            due_date: '2024-11-20',
            payment_date: null,
            period_from: '2024-10-01',
            period_to: '2024-10-31',
            status: 'pending',
            attachment: 'water_bill_oct.pdf',
            notes: '',
            created_at: '2024-10-26'
        },
        {
            id: 3,
            bill_number: 'GAS-2024-001',
            utility_type: 'gas',
            provider: 'SNGPL',
            amount: 6500.00,
            due_date: '2024-11-05',
            payment_date: null,
            period_from: '2024-10-01',
            period_to: '2024-10-31',
            status: 'overdue',
            attachment: 'gas_bill_oct.pdf',
            notes: 'Overdue notice sent',
            created_at: '2024-10-20'
        }
    ];

    let templates = [
        {
            id: 1,
            name: 'Monthly Electricity',
            utility_type: 'electricity',
            provider: 'WAPDA',
            estimated_amount: 12000.00,
            frequency: 'monthly',
            next_due: '2024-12-15',
            auto_reminder: true,
            created_at: '2024-01-15'
        }
    ];

    // Initialize the utilities module
    initUtilitiesModule();

    function initUtilitiesModule() {
        // Load initial data
        loadUtilityBills();
        loadTemplates();
        initCharts();
        initFilters();
        setupEventListeners();
        updateStats();
        initReportGenerators();
    }

    // FR-UTL-01: Record management for all utility bills
    function loadUtilityBills() {
        const tbody = document.querySelector('#utilityBillsTable tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        utilityBills.forEach(bill => {
            const row = createBillRow(bill);
            tbody.appendChild(row);
        });
    }

    function createBillRow(bill) {
        const tr = document.createElement('tr');
        tr.dataset.id = bill.id;
        
        // Format dates
        const dueDate = formatDate(bill.due_date);
        const paymentDate = bill.payment_date ? formatDate(bill.payment_date) : '—';
        const period = bill.period_from ? 
            `${formatDate(bill.period_from, 'short')} - ${formatDate(bill.period_to, 'short')}` : 
            '—';
        
        // Get status badge
        const statusBadge = getStatusBadge(bill.status);
        
        // Get utility type badge
        const utilityBadge = getUtilityBadge(bill.utility_type);
        
        // Attachment link
        const attachmentLink = bill.attachment ? 
            `<a href="#" class="file-preview" title="View attachment">
                <i class="bi bi-file-earmark-text"></i> View
            </a>` : 
            '—';

        tr.innerHTML = `
            <td><input class="form-check-input bill-checkbox" type="checkbox" value="${bill.id}"></td>
            <td>
                <strong>${bill.bill_number}</strong>
                <div class="text-muted small">${period}</div>
            </td>
            <td>${utilityBadge}</td>
            <td>${bill.provider}</td>
            <td><strong>PKR${bill.amount.toLocaleString('en-IN')}</strong></td>
            <td>
                <div>${dueDate}</div>
                <div class="small text-muted">${getDaysRemaining(bill.due_date)}</div>
            </td>
            <td>${paymentDate}</td>
            <td>${statusBadge}</td>
            <td>${attachmentLink}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary view-bill" data-id="${bill.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-secondary edit-bill" data-id="${bill.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger delete-bill" data-id="${bill.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;

        return tr;
    }

    // FR-UTL-02: Bill details capture
    function showBillDetails(billId) {
        const bill = utilityBills.find(b => b.id == billId);
        if (!bill) return;

        const modalContent = document.getElementById('billDetailsContent');
        const period = bill.period_from ? 
            `${formatDate(bill.period_from)} - ${formatDate(bill.period_to)}` : 
            'Not specified';
        
        modalContent.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Bill Information</h6>
                    <table class="table table-sm">
                        <tr>
                            <th>Bill Number:</th>
                            <td>${bill.bill_number}</td>
                        </tr>
                        <tr>
                            <th>Utility Type:</th>
                            <td>${getUtilityBadge(bill.utility_type)}</td>
                        </tr>
                        <tr>
                            <th>Provider:</th>
                            <td>${bill.provider}</td>
                        </tr>
                        <tr>
                            <th>Amount:</th>
                            <td><strong>PKR${bill.amount.toLocaleString('en-IN')}</strong></td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6>Dates</h6>
                    <table class="table table-sm">
                        <tr>
                            <th>Due Date:</th>
                            <td>${formatDate(bill.due_date)}</td>
                        </tr>
                        <tr>
                            <th>Payment Date:</th>
                            <td>${bill.payment_date ? formatDate(bill.payment_date) : '—'}</td>
                        </tr>
                        <tr>
                            <th>Billing Period:</th>
                            <td>${period}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>${getStatusBadge(bill.status)}</td>
                        </tr>
                    </table>
                </div>
            </div>
            ${bill.attachment ? `
            <div class="mt-3">
                <h6>Attachment</h6>
                <div class="alert alert-light">
                    <i class="bi bi-file-earmark-text me-2"></i>
                    ${bill.attachment}
                    <a href="#" class="float-end">Download</a>
                </div>
            </div>
            ` : ''}
            ${bill.notes ? `
            <div class="mt-3">
                <h6>Notes</h6>
                <div class="alert alert-light">${bill.notes}</div>
            </div>
            ` : ''}
        `;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('billDetailsModal'));
        modal.show();
    }

    // FR-UTL-03: Scanned bill attachment handling
    function handleFileUpload(fileInput) {
        return new Promise((resolve, reject) => {
            const file = fileInput.files[0];
            if (!file) {
                resolve(null);
                return;
            }

            // Validate file type
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload PDF or image files only.');
                fileInput.value = '';
                reject('Invalid file type');
                return;
            }

            // Validate file size (5MB max)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                fileInput.value = '';
                reject('File too large');
                return;
            }

            // In a real application, you would upload to server here
            // For demo, just return the file name
            resolve({
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type
            });
        });
    }

    // FR-UTL-04: Payment status tracking
    function updateBillStatus(billId, newStatus) {
        const bill = utilityBills.find(b => b.id == billId);
        if (bill) {
            bill.status = newStatus;
            if (newStatus === 'paid' && !bill.payment_date) {
                bill.payment_date = new Date().toISOString().split('T')[0];
            }
            loadUtilityBills();
            updateStats();
            
            // Show notification
            showNotification(`Bill ${bill.bill_number} marked as ${newStatus}`, 'success');
        }
    }

    // FR-UTL-05: Automated reminders
    function checkForReminders() {
        const today = new Date();
        const reminderDate = new Date();
        reminderDate.setDate(today.getDate() + 5); // 5 days from now
        
        const pendingBills = utilityBills.filter(bill => 
            bill.status === 'pending' && 
            new Date(bill.due_date) <= reminderDate &&
            new Date(bill.due_date) >= today
        );
        
        if (pendingBills.length > 0) {
            // In a real app, this would send emails or show notifications
            console.log(`Reminders needed for ${pendingBills.length} bills`);
            
            // Show visual alert
            const alertCount = document.getElementById('pendingBills');
            if (alertCount && pendingBills.length > parseInt(alertCount.textContent)) {
                showNotification(`${pendingBills.length} bills due within 5 days`, 'warning');
            }
        }
    }

    // FR-UTL-06: Monthly expense summarization
    function generateMonthlySummary(month, year) {
        const monthStart = new Date(year, month - 1, 1);
        const monthEnd = new Date(year, month, 0);
        
        const monthlyBills = utilityBills.filter(bill => {
            const billDate = new Date(bill.due_date);
            return billDate >= monthStart && billDate <= monthEnd;
        });
        
        const summary = {
            total: monthlyBills.reduce((sum, bill) => sum + bill.amount, 0),
            paid: monthlyBills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0),
            pending: monthlyBills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0),
            overdue: monthlyBills.filter(bill => bill.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0),
            byType: {}
        };
        
        monthlyBills.forEach(bill => {
            if (!summary.byType[bill.utility_type]) {
                summary.byType[bill.utility_type] = 0;
            }
            summary.byType[bill.utility_type] += bill.amount;
        });
        
        return summary;
    }

    // FR-UTL-07: Yearly trend analysis
    function generateYearlyTrend(year) {
        const months = Array.from({length: 12}, (_, i) => i);
        
        const trend = months.map(month => {
            const monthBills = utilityBills.filter(bill => {
                const billDate = new Date(bill.due_date);
                return billDate.getFullYear() == year && billDate.getMonth() == month;
            });
            
            return {
                month: month + 1,
                total: monthBills.reduce((sum, bill) => sum + bill.amount, 0),
                count: monthBills.length,
                byType: groupByUtilityType(monthBills)
            };
        });
        
        return trend;
    }

    // FR-UTL-08: Service-wise allocation reporting
    function generateServiceAllocationReport(startDate, endDate) {
        const filteredBills = utilityBills.filter(bill => {
            const billDate = new Date(bill.due_date);
            return billDate >= new Date(startDate) && billDate <= new Date(endDate);
        });
        
        const allocation = {};
        let total = 0;
        
        filteredBills.forEach(bill => {
            if (!allocation[bill.utility_type]) {
                allocation[bill.utility_type] = {
                    amount: 0,
                    count: 0,
                    paid: 0,
                    pending: 0
                };
            }
            
            allocation[bill.utility_type].amount += bill.amount;
            allocation[bill.utility_type].count++;
            allocation[bill.utility_type][bill.status]++;
            total += bill.amount;
        });
        
        // Calculate percentages
        Object.keys(allocation).forEach(type => {
            allocation[type].percentage = ((allocation[type].amount / total) * 100).toFixed(1);
        });
        
        return { allocation, total };
    }

    // FR-UTL-09: Budget vs. actual comparison
    function generateBudgetComparison() {
        // Sample budget data - in real app, this would come from database
        const budgets = {
            electricity: { q1: 35000, q2: 38000, q3: 40000, q4: 42000 },
            water: { q1: 24000, q2: 25000, q3: 26000, q4: 27000 },
            gas: { q1: 18000, q2: 19000, q3: 20000, q4: 21000 },
            internet: { q1: 12000, q2: 12000, q3: 12000, q4: 12000 },
            phone: { q1: 8000, q2: 8000, q3: 8000, q4: 8000 }
        };
        
        const comparison = {};
        
        Object.keys(budgets).forEach(type => {
            const actualQ1 = getQuarterlyActual(type, 1);
            const actualQ2 = getQuarterlyActual(type, 2);
            
            comparison[type] = {
                q1Budget: budgets[type].q1,
                q1Actual: actualQ1,
                q1Variance: actualQ1 - budgets[type].q1,
                q2Budget: budgets[type].q2,
                q2Actual: actualQ2,
                q2Variance: actualQ2 - budgets[type].q2
            };
        });
        
        return comparison;
    }

    // FR-UTL-10: Recurring bill templates
    function loadTemplates() {
        const tbody = document.getElementById('templatesTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        templates.forEach(template => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${template.name}</strong>
                    <div class="small text-muted">Created: ${formatDate(template.created_at, 'short')}</div>
                </td>
                <td>${getUtilityBadge(template.utility_type)}</td>
                <td>${template.provider}</td>
                <td><strong>PKR${template.estimated_amount.toLocaleString('en-IN')}</strong></td>
                <td><span class="badge bg-light text-dark">${template.frequency}</span></td>
                <td>
                    <div>${formatDate(template.next_due)}</div>
                    <div class="small text-muted">${getDaysRemaining(template.next_due)}</div>
                </td>
                <td>
                    ${template.auto_reminder ? 
                        '<span class="text-success"><i class="bi bi-bell-fill"></i> Enabled</span>' : 
                        '<span class="text-muted"><i class="bi bi-bell-slash"></i> Disabled</span>'}
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="createBillFromTemplate(${template.id})">
                        <i class="bi bi-plus-circle"></i> Create Bill
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTemplate(${template.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Helper functions
    function getStatusBadge(status) {
        const badges = {
            pending: '<span class="status-badge status-pending">Pending</span>',
            paid: '<span class="status-badge status-paid">Paid</span>',
            overdue: '<span class="status-badge status-overdue">Overdue</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }

    function getUtilityBadge(type) {
        const badgeClasses = {
            electricity: 'badge-electricity',
            water: 'badge-water',
            gas: 'badge-gas',
            internet: 'badge-internet',
            phone: 'badge-phone',
            maintenance: 'badge-maintenance',
            other: 'badge-other'
        };
        
        const label = type.charAt(0).toUpperCase() + type.slice(1);
        return `<span class="badge ${badgeClasses[type] || 'badge-secondary'}">${label}</span>`;
    }

    function formatDate(dateString, format = 'full') {
        if (!dateString) return '—';
        
        const date = new Date(dateString);
        if (format === 'short') {
            return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        }
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function getDaysRemaining(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `<span class="text-danger">Overdue ${Math.abs(diffDays)} days</span>`;
        } else if (diffDays === 0) {
            return `<span class="text-warning">Due today</span>`;
        } else if (diffDays <= 5) {
            return `<span class="text-warning">Due in ${diffDays} days</span>`;
        } else {
            return `<span class="text-success">${diffDays} days left</span>`;
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function groupByUtilityType(bills) {
        const groups = {};
        bills.forEach(bill => {
            if (!groups[bill.utility_type]) {
                groups[bill.utility_type] = 0;
            }
            groups[bill.utility_type] += bill.amount;
        });
        return groups;
    }

    function getQuarterlyActual(type, quarter) {
        const quarterMonths = {
            1: [0, 1, 2], // Jan-Mar
            2: [3, 4, 5], // Apr-Jun
            3: [6, 7, 8], // Jul-Sep
            4: [9, 10, 11] // Oct-Dec
        };
        
        const months = quarterMonths[quarter];
        const currentYear = new Date().getFullYear();
        
        return utilityBills
            .filter(bill => {
                const billDate = new Date(bill.due_date);
                return bill.utility_type === type &&
                       billDate.getFullYear() === currentYear &&
                       months.includes(billDate.getMonth());
            })
            .reduce((sum, bill) => sum + bill.amount, 0);
    }

    function updateStats() {
        const pendingCount = utilityBills.filter(b => b.status === 'pending').length;
        const overdueCount = utilityBills.filter(b => b.status === 'overdue').length;
        
        // Calculate monthly expense (current month)
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const monthlyExpense = utilityBills
            .filter(bill => {
                const billDate = new Date(bill.due_date);
                return billDate.getMonth() === currentMonth && 
                       billDate.getFullYear() === currentYear;
            })
            .reduce((sum, bill) => sum + bill.amount, 0);
        
        // Update UI
        const pendingBillsEl = document.getElementById('pendingBills');
        const overdueBillsEl = document.getElementById('overdueBills');
        const monthlyExpenseEl = document.getElementById('monthlyExpense');
        
        if (pendingBillsEl) pendingBillsEl.textContent = pendingCount;
        if (overdueBillsEl) overdueBillsEl.textContent = overdueCount;
        if (monthlyExpenseEl) {
            monthlyExpenseEl.textContent = `PKR ${monthlyExpense.toLocaleString('en-IN')}`;
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    function initCharts() {
        // Utility Trend Chart
        const trendCtx = document.getElementById('utilityTrendChart');
        if (trendCtx) {
            const trendData = generateYearlyTrend(2024);
            
            new Chart(trendCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Utility Expenses',
                        data: trendData.map(month => month.total),
                        borderColor: 'rgba(217, 183, 59, 1)',
                        backgroundColor: 'rgba(217, 183, 59, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `PKR${context.raw.toLocaleString('en-IN')}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'PKR' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Utility Distribution Chart
        const distCtx = document.getElementById('utilityDistributionChart');
        if (distCtx) {
            const report = generateServiceAllocationReport('2024-01-01', '2024-12-31');
            
            new Chart(distCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(report.allocation),
                    datasets: [{
                        data: Object.values(report.allocation).map(a => a.amount),
                        backgroundColor: [
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(13, 202, 240, 0.8)',
                            'rgba(220, 53, 69, 0.8)',
                            'rgba(111, 66, 193, 0.8)',
                            'rgba(25, 135, 84, 0.8)',
                            'rgba(253, 126, 20, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const percentage = ((value / report.total) * 100).toFixed(1);
                                    return `PKR${value.toLocaleString('en-IN')} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    function initFilters() {
        const typeFilter = document.getElementById('utilityTypeFilter');
        const statusFilter = document.getElementById('statusFilter');
        const dateFilter = document.getElementById('dateRangeFilter');
        
        if (typeFilter) {
            typeFilter.addEventListener('change', filterBills);
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', filterBills);
        }
        
        if (dateFilter) {
            dateFilter.addEventListener('change', filterBills);
        }
    }

    function filterBills() {
        const typeFilter = document.getElementById('utilityTypeFilter');
        const statusFilter = document.getElementById('statusFilter');
        const dateFilter = document.getElementById('dateRangeFilter');
        
        const selectedType = typeFilter ? typeFilter.value : '';
        const selectedStatus = statusFilter ? statusFilter.value : '';
        const dateRange = dateFilter ? dateFilter.value : '';
        
        let [startDate, endDate] = dateRange.split(' to ');
        
        const filteredBills = utilityBills.filter(bill => {
            // Filter by type
            if (selectedType && bill.utility_type !== selectedType) return false;
            
            // Filter by status
            if (selectedStatus && bill.status !== selectedStatus) return false;
            
            // Filter by date range
            if (startDate && endDate) {
                const billDate = new Date(bill.due_date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (billDate < start || billDate > end) return false;
            }
            
            return true;
        });
        
        // Update table with filtered bills
        const tbody = document.querySelector('#utilityBillsTable tbody');
        if (tbody) {
            tbody.innerHTML = '';
            filteredBills.forEach(bill => {
                tbody.appendChild(createBillRow(bill));
            });
        }
    }

    function initReportGenerators() {
        const reportMonth = document.getElementById('reportMonth');
        const reportYear = document.getElementById('reportYear');
        
        if (reportMonth) {
            // Populate month options
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = `${month} 2024`;
                reportMonth.appendChild(option);
            });
            
            reportMonth.addEventListener('change', generateMonthlyReport);
        }
        
        if (reportYear) {
            reportYear.addEventListener('change', generateYearlyReport);
        }
        
        // Generate initial reports
        generateMonthlyReport();
        generateYearlyReport();
    }

    function generateMonthlyReport() {
        const reportMonth = document.getElementById('reportMonth');
        const content = document.getElementById('monthlyReportContent');
        
        if (!reportMonth || !content) return;
        
        const month = parseInt(reportMonth.value) || new Date().getMonth() + 1;
        const year = 2024;
        const summary = generateMonthlySummary(month, year);
        
        content.innerHTML = `
            <div class="row text-center mb-3">
                <div class="col-4">
                    <div class="fs-4">PKR${summary.total.toLocaleString('en-IN')}</div>
                    <div class="small text-muted">Total</div>
                </div>
                <div class="col-4">
                    <div class="fs-4 text-success">PKR${summary.paid.toLocaleString('en-IN')}</div>
                    <div class="small text-muted">Paid</div>
                </div>
                <div class="col-4">
                    <div class="fs-4 text-danger">PKR${summary.overdue.toLocaleString('en-IN')}</div>
                    <div class="small text-muted">Overdue</div>
                </div>
            </div>
            <div class="mt-3">
                <h6 class="small text-uppercase text-muted mb-2">By Utility Type</h6>
                ${Object.entries(summary.byType).map(([type, amount]) => `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        <span class="fw-bold">PKR${amount.toLocaleString('en-IN')}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function generateYearlyReport() {
        const reportYear = document.getElementById('reportYear');
        const content = document.getElementById('yearlyReportContent');
        
        if (!reportYear || !content) return;
        
        const year = parseInt(reportYear.value) || new Date().getFullYear();
        const trend = generateYearlyTrend(year);
        const totalYearly = trend.reduce((sum, month) => sum + month.total, 0);
        const averageMonthly = totalYearly / 12;
        
        // Find peak month
        const peakMonth = trend.reduce((max, month) => 
            month.total > max.total ? month : max, trend[0]
        );
        
        content.innerHTML = `
            <div class="alert alert-light">
                <div class="d-flex justify-content-between">
                    <div>
                        <div class="fs-5">PKR${totalYearly.toLocaleString('en-IN')}</div>
                        <div class="small text-muted">Total Yearly Expense</div>
                    </div>
                    <div>
                        <div class="fs-5">PKR${averageMonthly.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="small text-muted">Monthly Average</div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <h6 class="small text-uppercase text-muted mb-2">Year at a Glance</h6>
                <div class="mb-2">
                    <div class="small">Peak Month: <strong>${getMonthName(peakMonth.month)}</strong></div>
                    <div class="small">Peak Amount: <strong>PKR${peakMonth.total.toLocaleString('en-IN')}</strong></div>
                </div>
                <div class="progress" style="height: 10px;">
                    ${trend.map(month => `
                        <div class="progress-bar bg-warning" 
                             style="width: ${(month.total / peakMonth.total) * 100}%"
                             title="${getMonthName(month.month)}: PKR${month.total.toLocaleString('en-IN')}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function getMonthName(monthNumber) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1];
    }

    function setupEventListeners() {
        // Save Utility Bill
        const saveBtn = document.getElementById('saveUtilityBill');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveUtilityBill);
        }
        
        // Save Template
        const saveTemplateBtn = document.getElementById('saveTemplate');
        if (saveTemplateBtn) {
            saveTemplateBtn.addEventListener('click', saveTemplate);
        }
        
        // View bill details (delegated)
        document.addEventListener('click', function(e) {
            if (e.target.closest('.view-bill')) {
                const billId = e.target.closest('.view-bill').dataset.id;
                showBillDetails(billId);
            }
            
            if (e.target.closest('.edit-bill')) {
                const billId = e.target.closest('.edit-bill').dataset.id;
                editUtilityBill(billId);
            }
            
            if (e.target.closest('.delete-bill')) {
                const billId = e.target.closest('.delete-bill').dataset.id;
                deleteUtilityBill(billId);
            }
            
            if (e.target.closest('.bill-checkbox')) {
                updateBulkActions();
            }
        });
        
        // Select all checkbox
        const selectAll = document.getElementById('selectAllBills');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.bill-checkbox');
                checkboxes.forEach(cb => cb.checked = this.checked);
                updateBulkActions();
            });
        }
        
        // Generate Report button
        const reportBtn = document.getElementById('generateReportBtn');
        if (reportBtn) {
            reportBtn.addEventListener('click', generatePDFReport);
        }
        
        // Check for reminders periodically
        setInterval(checkForReminders, 5 * 60 * 1000); // Every 5 minutes
        checkForReminders(); // Initial check
    }

    function saveUtilityBill() {
        const form = document.getElementById('utilityBillForm');
        if (!form) return;
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const formData = new FormData(form);
        const billData = {
            id: utilityBills.length > 0 ? Math.max(...utilityBills.map(b => b.id)) + 1 : 1,
            bill_number: formData.get('bill_number'),
            utility_type: formData.get('utility_type'),
            provider: formData.get('provider'),
            amount: parseFloat(formData.get('amount')),
            due_date: formData.get('due_date'),
            payment_date: formData.get('payment_date') || null,
            period_from: formData.get('period_from') || null,
            period_to: formData.get('period_to') || null,
            status: formData.get('payment_date') ? 'paid' : 'pending',
            attachment: null, // In real app, this would be the uploaded file name
            notes: formData.get('notes') || '',
            created_at: new Date().toISOString().split('T')[0]
        };
        
        // Handle file upload
        const fileInput = form.querySelector('input[name="attachment"]');
        if (fileInput && fileInput.files[0]) {
            handleFileUpload(fileInput).then(filename => {
                billData.attachment = filename ? filename.name : null;
                completeSave(billData);
            }).catch(() => {
                // File upload failed, save without attachment
                completeSave(billData);
            });
        } else {
            completeSave(billData);
        }
    }
    
    function completeSave(billData) {
        utilityBills.push(billData);
        loadUtilityBills();
        updateStats();
        
        // Close modal and show success message
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUtilityModal'));
        if (modal) modal.hide();
        
        showNotification('Utility bill saved successfully!', 'success');
        
        // Reset form
        const form = document.getElementById('utilityBillForm');
        if (form) form.reset();
    }

    function saveTemplate() {
        const form = document.getElementById('templateForm');
        if (!form) return;
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const formData = new FormData(form);
        const templateData = {
            id: templates.length > 0 ? Math.max(...templates.map(t => t.id)) + 1 : 1,
            name: formData.get('template_name'),
            utility_type: formData.get('utility_type'),
            provider: formData.get('provider'),
            estimated_amount: parseFloat(formData.get('estimated_amount')),
            frequency: formData.get('frequency'),
            next_due: formData.get('next_due'),
            auto_reminder: formData.get('auto_reminder') === 'on',
            created_at: new Date().toISOString().split('T')[0]
        };
        
        templates.push(templateData);
        loadTemplates();
        
        // Close modal and show success message
        const modal = bootstrap.Modal.getInstance(document.getElementById('templateModal'));
        if (modal) modal.hide();
        
        showNotification('Template saved successfully!', 'success');
        
        // Reset form
        if (form) form.reset();
    }

    function editUtilityBill(billId) {
        const bill = utilityBills.find(b => b.id == billId);
        if (!bill) return;
        
        // Populate form with bill data
        const form = document.getElementById('utilityBillForm');
        Object.keys(bill).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input && bill[key]) {
                input.value = bill[key];
            }
        });
        
        // Change modal title and save button
        const modalTitle = document.querySelector('#addUtilityModal .modal-title');
        const saveBtn = document.getElementById('saveUtilityBill');
        
        if (modalTitle) modalTitle.textContent = 'Edit Utility Bill';
        if (saveBtn) {
            saveBtn.textContent = 'Update Bill';
            saveBtn.onclick = function() { updateUtilityBill(billId); };
        }
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addUtilityModal'));
        modal.show();
    }

    function updateUtilityBill(billId) {
        // Implementation for updating bill
        // Similar to saveUtilityBill but updates existing record
        showNotification('Update functionality coming soon!', 'info');
    }

    function deleteUtilityBill(billId) {
        if (confirm('Are you sure you want to delete this bill?')) {
            utilityBills = utilityBills.filter(b => b.id != billId);
            loadUtilityBills();
            updateStats();
            showNotification('Bill deleted successfully!', 'success');
        }
    }

    function deleteTemplate(templateId) {
        if (confirm('Are you sure you want to delete this template?')) {
            templates = templates.filter(t => t.id != templateId);
            loadTemplates();
            showNotification('Template deleted successfully!', 'success');
        }
    }

    function createBillFromTemplate(templateId) {
        const template = templates.find(t => t.id == templateId);
        if (!template) return;
        
        // Populate form with template data
        const form = document.getElementById('utilityBillForm');
        if (form) {
            form.querySelector('[name="utility_type"]').value = template.utility_type;
            form.querySelector('[name="provider"]').value = template.provider;
            form.querySelector('[name="amount"]').value = template.estimated_amount;
            form.querySelector('[name="due_date"]').value = template.next_due;
            
            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('addUtilityModal'));
            modal.show();
        }
    }

    function updateBulkActions() {
        const selectedCount = document.querySelectorAll('.bill-checkbox:checked').length;
        const bulkActions = document.querySelector('.card-body.py-2 .btn-group');
        
        if (bulkActions) {
            const buttons = bulkActions.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.disabled = selectedCount === 0;
            });
        }
    }

    function generatePDFReport() {
        // In a real application, this would generate and download a PDF report
        // For now, show a notification
        showNotification('PDF report generation started. This may take a moment...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            showNotification('Report generated successfully! Check your downloads.', 'success');
        }, 2000);
    }

    // Make some functions available globally for inline event handlers
    window.createBillFromTemplate = createBillFromTemplate;
    window.deleteTemplate = deleteTemplate;
});