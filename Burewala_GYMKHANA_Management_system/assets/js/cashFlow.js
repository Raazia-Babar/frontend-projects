// assets/js/cashFlow.js

// Global variables
let cashFlowData = {};
let monthlyChart, projectedChart, trendChart;
let currentDateRange = {};

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDatePicker();
    loadCashFlowData();
    initializeCharts();
    loadSampleData();
    setupEventListeners();
    checkCashAlerts();
    setupRoleSwitcher();
    setupMobileMenu();
});

function initializeDatePicker() {
    $('#dateRangePicker').daterangepicker({
        opens: 'left',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), 
                         moment().subtract(1, 'month').endOf('month')],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        }
    }, function(start, end, label) {
        currentDateRange = {
            start: start.format('YYYY-MM-DD'),
            end: end.format('YYYY-MM-DD'),
            label: label
        };
    });
    
    // Set initial date range
    currentDateRange = {
        start: moment().startOf('month').format('YYYY-MM-DD'),
        end: moment().endOf('month').format('YYYY-MM-DD'),
        label: 'This Month'
    };
}

function loadCashFlowData() {
    // Simulate loading data
    showLoading();
    
    // In real implementation, this would be an API call
    setTimeout(() => {
        updateDashboard();
        hideLoading();
    }, 500);
}

function initializeCharts() {
    // Initialize monthly cash flow chart
    const monthlyCtx = document.getElementById('monthlyCashFlowChart')?.getContext('2d');
    if (monthlyCtx) {
        monthlyChart = new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Receipts',
                        data: [420500, 385200, 512300, 532200],
                        backgroundColor: 'rgba(40, 167, 69, 0.8)'
                    },
                    {
                        label: 'Payments',
                        data: [185200, 152300, 135400, 131800],
                        backgroundColor: 'rgba(220, 53, 69, 0.8)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'PKR' + (value/1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize projected cash flow chart
    const projectedCtx = document.getElementById('projectedCashFlowChart')?.getContext('2d');
    if (projectedCtx) {
        projectedChart = new Chart(projectedCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Projected',
                        data: [450000, 550000, 600000, 550000],
                        borderColor: 'rgba(255, 193, 7, 0.8)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: 'Actual',
                        data: [420500, 512300, 532200, 385200],
                        borderColor: 'rgba(40, 167, 69, 0.8)',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'PKR' + (value/1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize trend analysis chart
    const trendCtx = document.getElementById('trendAnalysisChart')?.getContext('2d');
    if (trendCtx) {
        trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Net Cash Flow',
                        data: [850, 920, 780, 950, 1100, 1250, 1050, 980, 1150, 1300, 1400, 1245],
                        borderColor: 'rgba(217, 183, 59, 0.9)',
                        backgroundColor: 'rgba(217, 183, 59, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return 'PKR' + value + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
}

function loadSampleData() {
    loadDailyTransactions();
    loadMonthlyDetails();
    loadProjectionDetails();
    loadReconciliationItems();
    updateCurrentDate();
}

function loadDailyTransactions() {
    // Sample daily transactions
    const dailyTransactions = [
        {
            time: '09:30 AM',
            type: 'Receipt',
            description: 'Membership Fee - John Doe',
            category: 'Membership',
            amount: 15000,
            method: 'Bank Transfer',
            status: 'Completed'
        },
        {
            time: '10:15 AM',
            type: 'Payment',
            description: 'Utility Bill - Electricity',
            category: 'Utilities',
            amount: 8500,
            method: 'Cheque',
            status: 'Pending'
        },
        {
            time: '11:45 AM',
            type: 'Receipt',
            description: 'Tennis Court Booking',
            category: 'Facility',
            amount: 2500,
            method: 'Cash',
            status: 'Completed'
        },
        {
            time: '02:30 PM',
            type: 'Receipt',
            description: 'Residential Rent - Villa A',
            category: 'Residential',
            amount: 45000,
            method: 'Online',
            status: 'Completed'
        },
        {
            time: '04:15 PM',
            type: 'Payment',
            description: 'Staff Salary - December',
            category: 'Salary',
            amount: 32000,
            method: 'Bank Transfer',
            status: 'Completed'
        }
    ];
    
    // Populate daily transactions table
    const dailyTable = document.getElementById('dailyTransactions');
    if (!dailyTable) return;
    
    dailyTable.innerHTML = '';
    dailyTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.time}</td>
            <td>
                <span class="badge ${transaction.type === 'Receipt' ? 'bg-success' : 'bg-danger'}">
                    ${transaction.type}
                </span>
            </td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type === 'Receipt' ? 'text-success' : 'text-danger'}">
                ${transaction.type === 'Receipt' ? '+' : '-'}PKR ${transaction.amount.toLocaleString()}
            </td>
            <td>${transaction.method}</td>
            <td>
                <span class="badge ${transaction.status === 'Completed' ? 'bg-success' : 'bg-warning'}">
                    ${transaction.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editTransaction(this)">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        dailyTable.appendChild(row);
    });
}

function loadMonthlyDetails() {
    const monthlyDetails = document.getElementById('monthlyDetails');
    if (!monthlyDetails) return;
    
    monthlyDetails.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const date = new Date(2024, 11, i);
        const opening = 2000000 + (i * 10000);
        const receipts = 30000 + (Math.random() * 70000);
        const payments = 15000 + (Math.random() * 40000);
        const net = receipts - payments;
        const closing = opening + net;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date.toLocaleDateString()}</td>
            <td>PKR ${opening.toLocaleString()}</td>
            <td class="text-success">+PKR ${receipts.toLocaleString()}</td>
            <td class="text-danger">-PKR ${payments.toLocaleString()}</td>
            <td class="${net >= 0 ? 'text-success' : 'text-danger'}">
                ${net >= 0 ? '+' : ''}PKR ${net.toLocaleString()}
            </td>
            <td>PKR ${closing.toLocaleString()}</td>
            <td>
                ${net >= 0 ? 
                    '<i class="bi bi-arrow-up-right text-success"></i>' : 
                    '<i class="bi bi-arrow-down-right text-danger"></i>'}
            </td>
        `;
        monthlyDetails.appendChild(row);
    }
}

function loadProjectionDetails() {
    const projectionDetails = document.getElementById('projectionDetails');
    if (!projectionDetails) return;
    
    projectionDetails.innerHTML = '';
    const weeks = ['Week 1 (1-7)', 'Week 2 (8-14)', 'Week 3 (15-21)', 'Week 4 (22-31)'];
    weeks.forEach((week, index) => {
        const expectedIncome = 500000 + (index * 50000);
        const expectedExpense = 150000 + (index * 25000);
        const projectedNet = expectedIncome - expectedExpense;
        const actualNet = projectedNet * (0.85 + Math.random() * 0.3);
        const variance = actualNet - projectedNet;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${week}</td>
            <td>PKR ${expectedIncome.toLocaleString()}</td>
            <td>PKR ${expectedExpense.toLocaleString()}</td>
            <td>PKR ${projectedNet.toLocaleString()}</td>
            <td>PKR ${actualNet.toLocaleString()}</td>
            <td class="${variance >= 0 ? 'variance-positive' : 'variance-negative'}">
                ${variance >= 0 ? '+' : ''}PKR ${variance.toLocaleString()}
            </td>
            <td>
                <span class="badge ${Math.abs(variance/projectedNet) < 0.1 ? 'bg-success' : 
                                    variance < 0 ? 'bg-danger' : 'bg-warning'}">
                    ${Math.abs(variance/projectedNet) < 0.1 ? 'On Track' : 
                     variance < 0 ? 'Below Target' : 'Above Target'}
                </span>
            </td>
        `;
        projectionDetails.appendChild(row);
    });
}

function loadReconciliationItems() {
    const reconciliationItems = document.getElementById('reconciliationItems');
    if (!reconciliationItems) return;
    
    reconciliationItems.innerHTML = '';
    const reconItems = [
        { date: '14 Dec', desc: 'Bank Charges', book: 500, bank: 500, diff: 0, type: 'Bank Charge', status: 'reconciled' },
        { date: '15 Dec', desc: 'Unpresented Cheque', book: 2500, bank: 0, diff: -2500, type: 'Cheque', status: 'pending' },
        { date: '15 Dec', desc: 'EFT Payment', book: 0, bank: 850, diff: 850, type: 'Bank Transfer', status: 'discrepancy' }
    ];
    
    reconItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.desc}</td>
            <td>PKR ${item.book.toLocaleString()}</td>
            <td>PKR ${item.bank.toLocaleString()}</td>
            <td class="${item.diff === 0 ? '' : item.diff > 0 ? 'variance-positive' : 'variance-negative'}">
                ${item.diff === 0 ? '-' : item.diff > 0 ? '+' : ''}PKR ${Math.abs(item.diff).toLocaleString()}
            </td>
            <td>${item.type}</td>
            <td>
                <span class="reconciliation-status status-${item.status}"></span>
                <span class="text-capitalize">${item.status}</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewReconciliationItem(${item.diff})">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        `;
        reconciliationItems.appendChild(row);
    });
}

function updateCurrentDate() {
    const currentDate = new Date();
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

function setupEventListeners() {
    // Tab change events
    document.querySelectorAll('#cashFlowTabs button').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function() {
            // Update charts when tab changes
            if (this.id === 'monthly-tab' && monthlyChart) {
                monthlyChart.update();
            } else if (this.id === 'projected-tab' && projectedChart) {
                projectedChart.update();
            } else if (this.id === 'trend-tab' && trendChart) {
                trendChart.update();
            }
        });
    });
}

function setupRoleSwitcher() {
    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
        roleSelect.addEventListener('change', applyRole);
        applyRole();
    }
}

function applyRole() {
    const roleSelect = document.getElementById('roleSelect');
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
    
    // Update page heading based on role
    const pageHeading = document.querySelector('h2');
    if (pageHeading && role !== 'superadmin') {
        pageHeading.textContent = capitalize(role) + ' - Cash Flow Management';
    }
}

function capitalize(s) { 
    return s.charAt(0).toUpperCase() + s.slice(1); 
}

function setupMobileMenu() {
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
                    sidebar.classList.remove('active');
                }
            });
        });
    }
}

function checkCashAlerts() {
    const cashPosition = 245850;
    const minThreshold = 100000; // Minimum acceptable balance
    
    const alertCard = document.getElementById('cashAlertCard');
    const alertStatus = document.getElementById('alertStatus');
    const alertMessages = document.getElementById('alertMessages');
    
    if (!alertCard || !alertStatus || !alertMessages) return;
    
    if (cashPosition < minThreshold) {
        // FR-CSH-07: Low balance alert
        alertCard.classList.add('alert-low-balance');
        alertStatus.innerHTML = '<i class="bi bi-exclamation-triangle me-1"></i>Low Balance Alert';
        alertStatus.className = 'text-danger';
        alertMessages.innerHTML = `
            <div class="text-danger">
                <i class="bi bi-exclamation-triangle me-1"></i>
                Cash balance is below minimum threshold (PKR ${minThreshold.toLocaleString()})
            </div>
        `;
    } else if (cashPosition < minThreshold * 1.2) {
        alertStatus.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i>Warning';
        alertStatus.className = 'text-warning';
        alertMessages.innerHTML = `
            <div class="text-warning">
                <i class="bi bi-exclamation-circle me-1"></i>
                Cash balance is approaching minimum threshold
            </div>
        `;
    } else {
        alertStatus.innerHTML = '<i class="bi bi-check-circle me-1"></i>All Good';
        alertStatus.className = 'text-success';
        alertMessages.innerHTML = 'No critical alerts';
    }
}

function updateDashboard() {
    // Update dashboard metrics
    // In real implementation, these would come from API
    const todayCashElement = document.getElementById('todayCashPosition');
    const monthlyNetElement = document.getElementById('monthlyNetFlow');
    const projectedElement = document.getElementById('projectedBalance');
    
    if (todayCashElement) todayCashElement.textContent = 'PKR 245,850';
    if (monthlyNetElement) monthlyNetElement.textContent = 'PKR 1,245,500';
    if (projectedElement) projectedElement.textContent = 'PKR 3,145,200';
}

function saveTransaction() {
    const form = document.getElementById('transactionForm');
    if (!form || !form.checkValidity()) {
        if (form) form.reportValidity();
        return;
    }
    
    const transaction = {
        type: document.getElementById('transactionType').value,
        date: document.getElementById('transactionDate').value,
        description: document.getElementById('transactionDescription').value,
        category: document.getElementById('transactionCategory').value,
        amount: parseFloat(document.getElementById('transactionAmount').value),
        method: document.getElementById('paymentMethod').value,
        reference: document.getElementById('referenceNumber').value,
        notes: document.getElementById('transactionNotes').value,
        reconciled: document.getElementById('isReconciled').checked
    };
    
    // In real implementation, send to API
    console.log('Saving transaction:', transaction);
    
    // Show success message
    alert('Transaction saved successfully!');
    
    // Close modal and refresh data
    const modalElement = document.getElementById('addTransactionModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    loadCashFlowData();
}

function editTransaction(button) {
    // In real implementation, populate modal with existing data
    alert('Edit functionality would populate modal with existing data');
}

function startReconciliation() {
    // Start reconciliation process
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        alert('Reconciliation process started. Please upload bank statement.');
        
        // In real implementation, show upload dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv,.xlsx,.pdf';
        input.onchange = function() {
            if (this.files.length > 0) {
                processBankStatement(this.files[0]);
            }
        };
        input.click();
    }, 1000);
}

function processBankStatement(file) {
    alert(`Processing ${file.name}...`);
    // In real implementation, parse and process bank statement
}

function viewReconciliationReport() {
    // Show reconciliation report
    const modalElement = document.getElementById('reconciliationModal');
    const detailsElement = document.getElementById('reconciliationDetails');
    
    if (!modalElement || !detailsElement) return;
    
    detailsElement.innerHTML = `
        <h6>Reconciliation Report - ${new Date().toLocaleDateString()}</h6>
        <div class="table-responsive">
            <table class="table table-sm">
                <tr><th>Book Balance:</th><td>PKR 3,395,500</td></tr>
                <tr><th>Bank Balance:</th><td>PKR 3,392,150</td></tr>
                <tr><th>Difference:</th><td class="text-danger">-PKR 3,350</td></tr>
                <tr><th>Unreconciled Items:</th><td>8 transactions</td></tr>
                <tr><th>Last Reconciliation:</th><td>14 Dec 2024</td></tr>
            </table>
        </div>
        <div class="alert alert-info mt-3">
            <small>
                <i class="bi bi-info-circle me-1"></i>
                Review pending items and adjust journal entries as needed.
            </small>
        </div>
    `;
    
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function viewReconciliationItem(difference) {
    const modalElement = document.getElementById('reconciliationModal');
    const detailsElement = document.getElementById('reconciliationDetails');
    
    if (!modalElement || !detailsElement) return;
    
    detailsElement.innerHTML = `
        <h6>Reconciliation Item Details</h6>
        <div class="table-responsive">
            <table class="table table-sm">
                <tr><th>Date:</th><td>15 Dec 2024</td></tr>
                <tr><th>Description:</th><td>Unpresented Cheque #12345</td></tr>
                <tr><th>Book Amount:</th><td>PKR 2,500</td></tr>
                <tr><th>Bank Amount:</th><td>PKR 0</td></tr>
                <tr><th>Difference:</th><td class="${difference < 0 ? 'text-danger' : 'text-success'}">
                    ${difference < 0 ? '-' : '+'}PKR ${Math.abs(difference).toLocaleString()}
                </td></tr>
                <tr><th>Status:</th><td><span class="badge bg-warning">Pending</span></td></tr>
                <tr><th>Action Required:</th><td>Awaiting cheque clearance</td></tr>
            </table>
        </div>
        <div class="mt-3">
            <button class="btn btn-sm btn-success" onclick="markAsReconciled()">
                <i class="bi bi-check-circle me-1"></i>Mark as Reconciled
            </button>
            <button class="btn btn-sm btn-outline-danger ms-2" onclick="createAdjustment()">
                <i class="bi bi-pencil me-1"></i>Create Adjustment
            </button>
        </div>
    `;
    
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function markAsReconciled() {
    alert('Item marked as reconciled. Journal entry updated.');
    const modalElement = document.getElementById('reconciliationModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    loadCashFlowData();
}

function createAdjustment() {
    alert('Creating adjustment journal entry...');
    // In real implementation, show adjustment form
}

function printCashFlowReport() {
    // Print current tab content
    const activeTab = document.querySelector('#cashFlowTabContent .tab-pane.active');
    if (!activeTab) return;
    
    const printContent = activeTab.innerHTML;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Cash Flow Report - BGMS</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; font-family: Arial, sans-serif; }
                .no-print { display: none !important; }
                .btn { display: none !important; }
                .card { border: 1px solid #000 !important; box-shadow: none !important; }
                .table { font-size: 11pt; }
                h6 { font-size: 14pt; }
                @page { margin: 0.5in; }
            </style>
        </head>
        <body>
            <h4>Burewala Gymkhana - Cash Flow Report</h4>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <hr>
            ${printContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function exportToExcel() {
    // Export data to Excel
    alert('Exporting cash flow data to Excel...');
    // In real implementation, use a library like SheetJS
}

function showLoading() {
    // Show loading indicator
    const overlay = document.createElement('div');
    overlay.className = 'cashflow-loading';
    overlay.innerHTML = `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    overlay.id = 'cashFlowLoading';
    document.body.appendChild(overlay);
}

function hideLoading() {
    // Hide loading indicator
    const overlay = document.getElementById('cashFlowLoading');
    if (overlay) {
        overlay.remove();
    }
}