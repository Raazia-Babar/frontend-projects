// Reports Management JavaScript

// Sample report data
const sampleReportData = {
    financial: {
        title: "Financial Summary Report",
        data: [
            { date: "2024-12-01", description: "Monthly Membership Fees", category: "Membership", amount: 245000, balance: 245000, status: "paid" },
            { date: "2024-12-02", description: "Facility Booking Fees", category: "Facilities", amount: 85000, balance: 85000, status: "paid" },
            { date: "2024-12-03", description: "Restaurant Sales", category: "Food & Beverage", amount: 125000, balance: 125000, status: "paid" },
            { date: "2024-12-05", description: "Utility Payments", category: "Utilities", amount: -45000, balance: -45000, status: "paid" },
            { date: "2024-12-10", description: "Staff Salaries", category: "Salaries", amount: -180000, balance: -180000, status: "paid" },
            { date: "2024-12-15", description: "Maintenance Costs", category: "Maintenance", amount: -35000, balance: -35000, status: "paid" },
            { date: "2024-12-20", description: "New Equipment", category: "Equipment", amount: -75000, balance: -75000, status: "paid" }
        ],
        summary: {
            totalRevenue: 455000,
            totalExpenses: -335000,
            netProfit: 120000,
            period: "December 2024"
        }
    },
    membership: {
        title: "Membership Report",
        data: [
            { date: "2024-12-01", description: "New Member Registration", category: "Registration", amount: 5000, balance: 5000, status: "paid" },
            { date: "2024-12-05", description: "Member Renewal", category: "Renewal", amount: 2000, balance: 2000, status: "paid" },
            { date: "2024-12-10", description: "Premium Upgrade", category: "Upgrade", amount: 3000, balance: 3000, status: "paid" },
            { date: "2024-12-15", description: "Family Membership", category: "Family", amount: 4000, balance: 4000, status: "pending" },
            { date: "2024-12-20", description: "Corporate Membership", category: "Corporate", amount: 8000, balance: 8000, status: "paid" }
        ],
        summary: {
            totalMembers: 1245,
            newMembers: 25,
            renewals: 85,
            upgrades: 12,
            period: "December 2024"
        }
    },
    collections: {
        title: "Collections Report",
        data: [
            { date: "2024-12-01", description: "Cash Collection", category: "Cash", amount: 85000, balance: 85000, status: "paid" },
            { date: "2024-12-02", description: "Bank Transfer", category: "Bank", amount: 120000, balance: 120000, status: "paid" },
            { date: "2024-12-03", description: "JazzCash Payment", category: "Digital", amount: 45000, balance: 45000, status: "paid" },
            { date: "2024-12-04", description: "Easypaisa Payment", category: "Digital", amount: 38000, balance: 38000, status: "paid" },
            { date: "2024-12-05", description: "Cheque Payment", category: "Cheque", amount: 25000, balance: 25000, status: "pending" },
            { date: "2024-12-10", description: "Credit Card Payment", category: "Card", amount: 65000, balance: 65000, status: "paid" }
        ],
        summary: {
            totalCollections: 378000,
            cashCollections: 85000,
            digitalCollections: 83000,
            outstanding: 42000,
            period: "December 2024"
        }
    }
};

let currentReportType = 'financial';
let currentReportData = sampleReportData.financial;
let chartInstances = {};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDateRangePicker();
    initializeEventListeners();
    loadReport(currentReportType);
});

// Initialize date range picker
function initializeDateRangePicker() {
    $('#dateRangePicker').daterangepicker({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        // Update report based on new date range
        updateReportWithDateRange(start, end);
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Report type change
    document.getElementById('reportType').addEventListener('change', function(e) {
        currentReportType = e.target.value;
        loadReport(currentReportType);
    });

    // Time period change
    document.getElementById('timePeriod').addEventListener('change', function(e) {
        const period = e.target.value;
        if (period === 'custom') {
            $('#dateRangePicker').click();
        } else {
            updateDateRangeForPeriod(period);
        }
    });

    // Generate report button
    document.getElementById('generateReportBtn').addEventListener('click', function() {
        generateReport();
    });

    // View toggle buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            toggleView(view);
        });
    });

    // Quick report access buttons
    document.querySelectorAll('[data-report]').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.getAttribute('data-report');
            document.getElementById('reportType').value = reportType;
            loadReport(reportType);
        });
    });

    // Export button
    document.getElementById('exportReportBtn').addEventListener('click', exportReport);

    // Print button
    document.getElementById('printReportBtn').addEventListener('click', printReport);

    // Apply advanced filters
    document.getElementById('applyAdvancedFilters').addEventListener('click', applyAdvancedFilters);

    // Reset advanced filters
    document.getElementById('resetAdvancedFilters').addEventListener('click', resetAdvancedFilters);

    // Chart type changes
    document.getElementById('revenueChartType').addEventListener('change', updateRevenueChart);
    document.getElementById('categoryChartType').addEventListener('change', updateCategoryChart);

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
                    sidebar.classList.remove('active');
                }
            });
        });
    }
}

// Load report based on type
function loadReport(reportType) {
    currentReportType = reportType;
    currentReportData = sampleReportData[reportType] || sampleReportData.financial;
    
    updateReportSummary();
    updateReportTable();
    updateCharts();
    updateStats();
}

// Update report with date range
function updateReportWithDateRange(startDate, endDate) {
    // In a real application, this would fetch data from server based on date range
    console.log('Fetching report data for:', startDate.format('YYYY-MM-DD'), 'to', endDate.format('YYYY-MM-DD'));
    
    // For demo, just update the period display
    const periodDisplay = `${startDate.format('MMM DD, YYYY')} - ${endDate.format('MMM DD, YYYY')}`;
    document.getElementById('revenuePeriod').textContent = periodDisplay;
    document.getElementById('collectionsPeriod').textContent = periodDisplay;
    
    // Simulate data update with a loading indicator
    showLoading();
    setTimeout(() => {
        loadReport(currentReportType);
        hideLoading();
    }, 500);
}

// Update date range based on period selection
function updateDateRangeForPeriod(period) {
    let startDate, endDate;
    
    switch(period) {
        case 'today':
            startDate = moment();
            endDate = moment();
            break;
        case 'yesterday':
            startDate = moment().subtract(1, 'days');
            endDate = moment().subtract(1, 'days');
            break;
        case 'thisWeek':
            startDate = moment().startOf('week');
            endDate = moment().endOf('week');
            break;
        case 'lastWeek':
            startDate = moment().subtract(1, 'week').startOf('week');
            endDate = moment().subtract(1, 'week').endOf('week');
            break;
        case 'thisMonth':
            startDate = moment().startOf('month');
            endDate = moment().endOf('month');
            break;
        case 'lastMonth':
            startDate = moment().subtract(1, 'month').startOf('month');
            endDate = moment().subtract(1, 'month').endOf('month');
            break;
        case 'thisQuarter':
            startDate = moment().startOf('quarter');
            endDate = moment().endOf('quarter');
            break;
        case 'lastQuarter':
            startDate = moment().subtract(1, 'quarter').startOf('quarter');
            endDate = moment().subtract(1, 'quarter').endOf('quarter');
            break;
        case 'thisYear':
            startDate = moment().startOf('year');
            endDate = moment().endOf('year');
            break;
        case 'lastYear':
            startDate = moment().subtract(1, 'year').startOf('year');
            endDate = moment().subtract(1, 'year').endOf('year');
            break;
        default:
            return;
    }
    
    $('#dateRangePicker').data('daterangepicker').setStartDate(startDate);
    $('#dateRangePicker').data('daterangepicker').setEndDate(endDate);
    
    updateReportWithDateRange(startDate, endDate);
}

// Update report summary
function updateReportSummary() {
    const summary = currentReportData.summary;
    
    // Update stats based on report type
    switch(currentReportType) {
        case 'financial':
            document.getElementById('totalRevenue').textContent = formatCurrency(summary.totalRevenue);
            document.getElementById('totalCollections').textContent = formatCurrency(summary.totalExpenses);
            document.getElementById('totalOutstanding').textContent = formatCurrency(summary.netProfit);
            document.getElementById('totalMembers').textContent = 'N/A';
            break;
        case 'membership':
            document.getElementById('totalRevenue').textContent = summary.totalMembers;
            document.getElementById('totalCollections').textContent = summary.newMembers;
            document.getElementById('totalOutstanding').textContent = summary.renewals;
            document.getElementById('totalMembers').textContent = summary.upgrades;
            break;
        case 'collections':
            document.getElementById('totalRevenue').textContent = formatCurrency(summary.totalCollections);
            document.getElementById('totalCollections').textContent = formatCurrency(summary.cashCollections);
            document.getElementById('totalOutstanding').textContent = formatCurrency(summary.outstanding);
            document.getElementById('totalMembers').textContent = formatCurrency(summary.digitalCollections);
            break;
    }
    
    // Update period display
    document.getElementById('revenuePeriod').textContent = summary.period;
    document.getElementById('collectionsPeriod').textContent = summary.period;
}

// Update report table
function updateReportTable() {
    const tbody = document.getElementById('reportTableBody');
    const totalAmount = document.getElementById('tableTotalAmount');
    const totalBalance = document.getElementById('tableTotalBalance');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let totalAmountSum = 0;
    let totalBalanceSum = 0;
    
    currentReportData.data.forEach(item => {
        const row = document.createElement('tr');
        
        const statusBadge = item.status === 'paid' ? 'success' : 
                           item.status === 'pending' ? 'warning' : 'danger';
        
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.description}</td>
            <td><span class="badge bg-secondary">${item.category}</span></td>
            <td class="text-end ${item.amount >= 0 ? 'text-success' : 'text-danger'}">
                ${formatCurrency(item.amount)}
            </td>
            <td class="text-end">${formatCurrency(item.balance)}</td>
            <td><span class="badge bg-${statusBadge}">${item.status}</span></td>
        `;
        
        tbody.appendChild(row);
        
        totalAmountSum += Math.abs(item.amount);
        totalBalanceSum += item.balance;
    });
    
    totalAmount.textContent = formatCurrency(totalAmountSum);
    totalBalance.textContent = formatCurrency(totalBalanceSum);
}

// Update charts
function updateCharts() {
    updateRevenueTrendChart();
    updateRevenueCategoryChart();
    updateDetailedChart();
}

// Update revenue trend chart
function updateRevenueTrendChart() {
    const ctx = document.getElementById('revenueTrendChart');
    if (!ctx) return;
    
    // Destroy existing chart instance
    if (chartInstances.revenueTrend) {
        chartInstances.revenueTrend.destroy();
    }
    
    // Sample data for trend chart
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = [120000, 135000, 142000, 155000, 168000, 175000, 185000, 195000, 205000, 215000, 225000, 245000];
    const expenseData = [95000, 105000, 110000, 115000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 180000];
    
    chartInstances.revenueTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: PKR ${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'PKR ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update revenue category chart
function updateRevenueCategoryChart() {
    const ctx = document.getElementById('revenueCategoryChart');
    if (!ctx) return;
    
    // Destroy existing chart instance
    if (chartInstances.revenueCategory) {
        chartInstances.revenueCategory.destroy();
    }
    
    const chartType = document.getElementById('categoryChartType').value;
    
    // Sample data for category chart
    const labels = ['Membership', 'Facilities', 'Food & Beverage', 'Events', 'Other'];
    const data = [245000, 85000, 125000, 45000, 35000];
    const colors = ['#198754', '#0dcaf0', '#ffc107', '#6f42c1', '#fd7e14'];
    
    chartInstances.revenueCategory = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
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
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: PKR ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update detailed chart
function updateDetailedChart() {
    const ctx = document.getElementById('detailedChart');
    if (!ctx) return;
    
    // Destroy existing chart instance
    if (chartInstances.detailed) {
        chartInstances.detailed.destroy();
    }
    
    // Prepare data based on current report
    const categories = [...new Set(currentReportData.data.map(item => item.category))];
    const categoryTotals = {};
    
    currentReportData.data.forEach(item => {
        if (!categoryTotals[item.category]) {
            categoryTotals[item.category] = 0;
        }
        categoryTotals[item.category] += Math.abs(item.amount);
    });
    
    const data = categories.map(cat => categoryTotals[cat] || 0);
    
    chartInstances.detailed = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Amount (PKR)',
                data: data,
                backgroundColor: categories.map((_, i) => 
                    `hsl(${i * 40}, 70%, 60%)`
                ),
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
                            return `PKR ${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'PKR ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update stats
function updateStats() {
    // This function would update various statistics based on the report data
    // For now, we'll just update the summary
    updateReportSummary();
}

// Toggle between table and chart view
function toggleView(view) {
    const tableView = document.getElementById('tableView');
    const chartView = document.getElementById('chartView');
    const tableBtn = document.querySelector('[data-view="table"]');
    const chartBtn = document.querySelector('[data-view="chart"]');
    
    if (view === 'table') {
        tableView.style.display = 'block';
        chartView.style.display = 'none';
        tableBtn.classList.add('active');
        chartBtn.classList.remove('active');
    } else {
        tableView.style.display = 'none';
        chartView.style.display = 'block';
        tableBtn.classList.remove('active');
        chartBtn.classList.add('active');
        updateDetailedChart(); // Refresh chart when switching to chart view
    }
}

// Generate report
function generateReport() {
    showLoading();
    
    // Simulate report generation
    setTimeout(() => {
        loadReport(currentReportType);
        showNotification('Report generated successfully!', 'success');
        hideLoading();
    }, 1000);
}

// Export report
function exportReport() {
    const reportType = document.getElementById('reportType').value;
    const reportName = document.querySelector(`#reportType option[value="${reportType}"]`).textContent;
    const dateRange = document.getElementById('dateRangePicker').value;
    
    // Create export data
    const exportData = {
        reportName: reportName,
        dateRange: dateRange,
        generated: new Date().toISOString(),
        data: currentReportData.data,
        summary: currentReportData.summary
    };
    
    // Convert to JSON and create download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bgms-report-${reportType}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Report exported successfully!', 'success');
}

// Print report
function printReport() {
    const printContent = document.createElement('div');
    printContent.className = 'print-only';
    printContent.innerHTML = `
        <div class="container">
            <div class="text-center mb-4">
                <h3>Burewala Gymkhana Management System</h3>
                <h4>${currentReportData.title}</h4>
                <p>${document.getElementById('dateRangePicker').value}</p>
                <p>Generated: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h6>Total Revenue</h6>
                            <h4>${document.getElementById('totalRevenue').textContent}</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h6>Collections</h6>
                            <h4>${document.getElementById('totalCollections').textContent}</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h6>Outstanding</h6>
                            <h4>${document.getElementById('totalOutstanding').textContent}</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h6>Members</h6>
                            <h4>${document.getElementById('totalMembers').textContent}</h4>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="table-responsive">
                ${document.getElementById('tableView').innerHTML}
            </div>
            
            <div class="mt-4 text-center text-muted">
                <hr>
                <p>© ${new Date().getFullYear()} Burewala Gymkhana. All rights reserved.</p>
                <p>This is a computer-generated report. No signature required.</p>
            </div>
        </div>
    `;
    
    // Show in modal
    const previewContent = document.getElementById('printPreviewContent');
    previewContent.innerHTML = '';
    previewContent.appendChild(printContent);
    
    const modal = new bootstrap.Modal(document.getElementById('printPreviewModal'));
    modal.show();
}

// Apply advanced filters
function applyAdvancedFilters() {
    const memberType = document.getElementById('filterMemberType').value;
    const paymentMethod = document.getElementById('filterPaymentMethod').value;
    const status = document.getElementById('filterStatus').value;
    const minAmount = document.getElementById('filterMinAmount').value;
    const maxAmount = document.getElementById('filterMaxAmount').value;
    
    // In a real application, this would filter the data
    console.log('Applying filters:', { memberType, paymentMethod, status, minAmount, maxAmount });
    
    showNotification('Filters applied successfully!', 'success');
}

// Reset advanced filters
function resetAdvancedFilters() {
    document.getElementById('filterMemberType').value = '';
    document.getElementById('filterPaymentMethod').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterMinAmount').value = '';
    document.getElementById('filterMaxAmount').value = '';
    
    showNotification('Filters reset successfully!', 'info');
}

// Update revenue chart based on selection
function updateRevenueChart() {
    updateRevenueTrendChart();
}

// Update category chart based on selection
function updateCategoryChart() {
    updateRevenueCategoryChart();
}

// Utility functions
function formatCurrency(amount) {
    if (typeof amount !== 'number') return amount;
    return 'PKR ' + Math.abs(amount).toLocaleString('en-PK');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showLoading() {
    // Show loading indicator
    const loading = document.createElement('div');
    loading.id = 'reportLoading';
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="spinner-border text-gold" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('reportLoading');
    if (loading) {
        loading.remove();
    }
}

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

// Initialize charts on window load
window.addEventListener('load', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        updateCharts();
    }, 100);
});