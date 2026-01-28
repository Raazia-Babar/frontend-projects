// Accounting Management JavaScript

// Sample accounting data
const accountingData = {
    // Chart of Accounts
    chartOfAccounts: [
        { code: '1000', name: 'Assets', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '1100', name: 'Current Assets', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '1101', name: 'Cash in Hand', type: 'asset', category: 'Current Assets', balance: 850000, status: 'active' },
        { code: '1102', name: 'Bank Account', type: 'asset', category: 'Current Assets', balance: 2450000, status: 'active' },
        { code: '1103', name: 'Accounts Receivable', type: 'asset', category: 'Current Assets', balance: 450000, status: 'active' },
        { code: '1200', name: 'Fixed Assets', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '1201', name: 'Property & Buildings', type: 'asset', category: 'Fixed Assets', balance: 3500000, status: 'active' },
        { code: '1202', name: 'Equipment', type: 'asset', category: 'Fixed Assets', balance: 850000, status: 'active' },
        { code: '1203', name: 'Furniture & Fixtures', type: 'asset', category: 'Fixed Assets', balance: 450000, status: 'active' },
        
        { code: '2000', name: 'Liabilities', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '2100', name: 'Current Liabilities', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '2101', name: 'Accounts Payable', type: 'liability', category: 'Current Liabilities', balance: 350000, status: 'active' },
        { code: '2102', name: 'Salaries Payable', type: 'liability', category: 'Current Liabilities', balance: 280000, status: 'active' },
        { code: '2103', name: 'Taxes Payable', type: 'liability', category: 'Current Liabilities', balance: 185000, status: 'active' },
        { code: '2200', name: 'Long-term Liabilities', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '2201', name: 'Bank Loan', type: 'liability', category: 'Long-term Liabilities', balance: 1035300, status: 'active' },
        
        { code: '3000', name: 'Equity', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '3100', name: 'Owner\'s Equity', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '3101', name: 'Capital', type: 'equity', category: 'Owner\'s Equity', balance: 2500000, status: 'active' },
        { code: '3102', name: 'Retained Earnings', type: 'equity', category: 'Owner\'s Equity', balance: 895500, status: 'active' },
        
        { code: '4000', name: 'Income', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '4100', name: 'Operating Income', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '4101', name: 'Membership Fees', type: 'income', category: 'Operating Income', balance: 2450000, status: 'active' },
        { code: '4102', name: 'Facility Fees', type: 'income', category: 'Operating Income', balance: 850000, status: 'active' },
        { code: '4103', name: 'Restaurant Sales', type: 'income', category: 'Operating Income', balance: 1250000, status: 'active' },
        
        { code: '5000', name: 'Expenses', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '5100', name: 'Operating Expenses', type: 'header', category: '', balance: 0, status: 'active' },
        { code: '5101', name: 'Salaries & Wages', type: 'expense', category: 'Operating Expenses', balance: 1800000, status: 'active' },
        { code: '5102', name: 'Utilities', type: 'expense', category: 'Operating Expenses', balance: 450000, status: 'active' },
        { code: '5103', name: 'Maintenance', type: 'expense', category: 'Operating Expenses', balance: 350000, status: 'active' },
        { code: '5104', name: 'Office Supplies', type: 'expense', category: 'Operating Expenses', balance: 85000, status: 'active' },
        { code: '5105', name: 'Marketing', type: 'expense', category: 'Operating Expenses', balance: 120000, status: 'active' }
    ],
    
    // General Ledger Entries
    generalLedger: [
        { id: 'JE-001', date: '2024-12-01', account: '1101', description: 'Cash collection - Membership fees', debit: 245000, credit: 0, balance: 245000 },
        { id: 'JE-001', date: '2024-12-01', account: '4101', description: 'Membership fees revenue', debit: 0, credit: 245000, balance: -245000 },
        { id: 'JE-002', date: '2024-12-02', account: '5101', description: 'December salaries payment', debit: 180000, credit: 0, balance: 180000 },
        { id: 'JE-002', date: '2024-12-02', account: '1102', description: 'Bank payment - Salaries', debit: 0, credit: 180000, balance: -180000 },
        { id: 'JE-003', date: '2024-12-05', account: '5102', description: 'Utility bill payment', debit: 45000, credit: 0, balance: 45000 },
        { id: 'JE-003', date: '2024-12-05', account: '1102', description: 'Bank payment - Utilities', debit: 0, credit: 45000, balance: -45000 },
        { id: 'JE-004', date: '2024-12-10', account: '1102', description: 'Facility booking payment', debit: 85000, credit: 0, balance: 85000 },
        { id: 'JE-004', date: '2024-12-10', account: '4102', description: 'Facility fees revenue', debit: 0, credit: 85000, balance: -85000 },
        { id: 'JE-005', date: '2024-12-15', account: '5103', description: 'Building maintenance', debit: 35000, credit: 0, balance: 35000 },
        { id: 'JE-005', date: '2024-12-15', account: '1101', description: 'Cash payment - Maintenance', debit: 0, credit: 35000, balance: -35000 }
    ],
    
    // Bank Reconciliation Data
    bankReconciliation: {
        statement: [
            { date: '2024-12-01', description: 'Opening Balance', withdrawal: 0, deposit: 0, balance: 2200000 },
            { date: '2024-12-02', description: 'Salary Transfer', withdrawal: 180000, deposit: 0, balance: 2020000 },
            { date: '2024-12-05', description: 'Utility Payment', withdrawal: 45000, deposit: 0, balance: 1975000 },
            { date: '2024-12-10', description: 'Facility Booking Deposit', withdrawal: 0, deposit: 85000, balance: 2060000 },
            { date: '2024-12-15', description: 'Loan Payment', withdrawal: 50000, deposit: 0, balance: 2010000 },
            { date: '2024-12-20', description: 'Membership Fees Deposit', withdrawal: 0, deposit: 245000, balance: 2255000 }
        ],
        accountingRecords: [
            { date: '2024-12-01', description: 'Opening Balance', debit: 0, credit: 0, status: 'reconciled' },
            { date: '2024-12-02', description: 'Salary Payment', debit: 0, credit: 180000, status: 'reconciled' },
            { date: '2024-12-05', description: 'Utility Payment', debit: 0, credit: 45000, status: 'reconciled' },
            { date: '2024-12-10', description: 'Facility Fees Deposit', debit: 85000, credit: 0, status: 'reconciled' },
            { date: '2024-12-12', description: 'Office Supplies', debit: 0, credit: 25000, status: 'unreconciled' },
            { date: '2024-12-18', description: 'Membership Fees', debit: 245000, credit: 0, status: 'unreconciled' },
            { date: '2024-12-20', description: 'Bank Charges', debit: 0, credit: 500, status: 'unreconciled' }
        ]
    }
};

let currentView = 'generalLedger';
let chartInstances = {};
let journalEntryCounter = 6; // For generating new journal entry IDs

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDateRangePicker();
    initializeEventListeners();
    loadChartOfAccounts();
    loadGeneralLedger();
    loadTrialBalance();
    loadProfitLoss();
    loadBalanceSheet();
    loadBankReconciliation();
    loadRecentJournals();
    updateAccountingStats();
});

// Initialize date range picker
function initializeDateRangePicker() {
    $('#accountingDateRange').daterangepicker({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        ranges: {
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
            'Last Quarter': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
            'This Year': [moment().startOf('year'), moment().endOf('year')],
            'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }
    }, function(start, end, label) {
        console.log('Accounting date range selected:', start.format('YYYY-MM-DD'), 'to', end.format('YYYY-MM-DD'));
        updateAccountingData(start, end);
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Navigation buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            switchView(view);
        });
    });

    // Accounting period change
    document.getElementById('accountingPeriod').addEventListener('change', function(e) {
        const period = e.target.value;
        if (period === 'custom') {
            $('#accountingDateRange').click();
        } else {
            updateDateRangeForPeriod(period);
        }
    });

    // Refresh button
    document.getElementById('refreshAccountingData').addEventListener('click', function() {
        refreshAccountingData();
    });

    // General Ledger actions
    document.getElementById('filterLedgerBtn').addEventListener('click', filterLedger);
    document.getElementById('exportLedgerBtn').addEventListener('click', exportLedger);
    document.getElementById('printLedgerBtn').addEventListener('click', printLedger);

    // Chart of Accounts actions
    document.getElementById('exportChartBtn').addEventListener('click', exportChartOfAccounts);

    // Bank Reconciliation actions
    document.getElementById('reconcileBankBtn').addEventListener('click', reconcileBank);

    // Journal Entry Form
    document.getElementById('addJournalItem').addEventListener('click', addJournalItem);
    document.getElementById('saveAsDraftBtn').addEventListener('click', saveJournalAsDraft);
    document.getElementById('journalEntryForm').addEventListener('submit', postJournalEntry);

    // Account Form
    document.getElementById('addAccountForm').addEventListener('submit', createNewAccount);

    // Close Period Form
    document.getElementById('closePeriodForm').addEventListener('submit', closeAccountingPeriod);

    // Account type change handler
    document.getElementById('accountType').addEventListener('change', updateAccountCategories);

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

// Switch between accounting views
function switchView(view) {
    // Hide all views
    document.querySelectorAll('.accounting-view').forEach(view => {
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
    
    // Update view-specific data if needed
    switch(view) {
        case 'trialBalance':
            loadTrialBalance();
            break;
        case 'profitLoss':
            loadProfitLoss();
            updateProfitLossChart();
            break;
        case 'balanceSheet':
            loadBalanceSheet();
            break;
        case 'chartOfAccounts':
            loadChartOfAccounts();
            break;
        case 'bankReconciliation':
            loadBankReconciliation();
            break;
    }
}

// Update date range based on period selection
function updateDateRangeForPeriod(period) {
    let startDate, endDate;
    
    switch(period) {
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
    
    $('#accountingDateRange').data('daterangepicker').setStartDate(startDate);
    $('#accountingDateRange').data('daterangepicker').setEndDate(endDate);
    
    updateAccountingData(startDate, endDate);
}

// Update accounting data based on date range
function updateAccountingData(startDate, endDate) {
    showLoading();
    
    // In a real application, this would fetch data from server
    setTimeout(() => {
        // Update period displays
        const periodText = `${startDate.format('MMM DD, YYYY')} - ${endDate.format('MMM DD, YYYY')}`;
        document.getElementById('trialBalanceDate').textContent = endDate.format('MMMM DD, YYYY');
        document.getElementById('plPeriod').textContent = periodText;
        document.getElementById('balanceSheetDate').textContent = endDate.format('MMMM DD, YYYY');
        
        // Refresh all views
        loadGeneralLedger();
        loadTrialBalance();
        loadProfitLoss();
        loadBalanceSheet();
        updateAccountingStats();
        
        hideLoading();
        showNotification(`Accounting data updated for ${periodText}`, 'success');
    }, 1000);
}

// Refresh all accounting data
function refreshAccountingData() {
    showLoading();
    
    setTimeout(() => {
        loadGeneralLedger();
        loadTrialBalance();
        loadProfitLoss();
        loadBalanceSheet();
        loadChartOfAccounts();
        loadBankReconciliation();
        updateAccountingStats();
        
        hideLoading();
        showNotification('Accounting data refreshed successfully!', 'success');
    }, 1500);
}

// Load General Ledger
function loadGeneralLedger() {
    const tbody = document.getElementById('ledgerTableBody');
    const totalDebit = document.getElementById('totalDebit');
    const totalCredit = document.getElementById('totalCredit');
    const totalBalance = document.getElementById('totalBalance');
    const ledgerDifference = document.getElementById('ledgerDifference');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    let debitSum = 0;
    let creditSum = 0;
    let balanceSum = 0;
    
    accountingData.generalLedger.forEach(entry => {
        const account = accountingData.chartOfAccounts.find(acc => acc.code === entry.account);
        const accountName = account ? account.name : entry.account;
        
        const row = document.createElement('tr');
        row.className = 'journal-item-row';
        row.innerHTML = `
            <td>${formatDate(entry.date)}</td>
            <td><span class="badge bg-secondary">${entry.id}</span></td>
            <td>${accountName}</td>
            <td>${entry.description}</td>
            <td class="text-end debit-amount">${entry.debit > 0 ? formatCurrency(entry.debit) : ''}</td>
            <td class="text-end credit-amount">${entry.credit > 0 ? formatCurrency(entry.credit) : ''}</td>
            <td class="text-end account-balance ${getBalanceClass(entry.balance)}">${formatCurrency(Math.abs(entry.balance))}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewJournalEntry('${entry.id}')">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
        
        debitSum += entry.debit;
        creditSum += entry.credit;
        balanceSum += entry.balance;
    });
    
    totalDebit.textContent = formatCurrency(debitSum);
    totalCredit.textContent = formatCurrency(creditSum);
    totalBalance.textContent = formatCurrency(Math.abs(balanceSum));
    
    const difference = debitSum - creditSum;
    ledgerDifference.textContent = formatCurrency(Math.abs(difference));
    
    if (difference === 0) {
        ledgerDifference.className = 'text-end text-success';
    } else {
        ledgerDifference.className = 'text-end text-danger';
    }
}

// Load Trial Balance
function loadTrialBalance() {
    const tbody = document.getElementById('trialBalanceBody');
    const tbTotalDebit = document.getElementById('tbTotalDebit');
    const tbTotalCredit = document.getElementById('tbTotalCredit');
    const tbDifference = document.getElementById('tbDifference');
    const statusElement = document.getElementById('trialBalanceStatus');
    const messageElement = document.getElementById('trialBalanceMessage');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calculate trial balance from ledger
    const trialBalance = {};
    
    // Initialize with account balances
    accountingData.chartOfAccounts.forEach(account => {
        if (account.type !== 'header') {
            trialBalance[account.code] = {
                name: account.name,
                type: account.type,
                debit: 0,
                credit: 0
            };
        }
    });
    
    // Add ledger entries
    accountingData.generalLedger.forEach(entry => {
        if (trialBalance[entry.account]) {
            trialBalance[entry.account].debit += entry.debit;
            trialBalance[entry.account].credit += entry.credit;
        }
    });
    
    let totalDebit = 0;
    let totalCredit = 0;
    
    // Display trial balance
    Object.keys(trialBalance).sort().forEach(code => {
        const account = trialBalance[code];
        const balance = account.debit - account.credit;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${code}</td>
            <td>${account.name}</td>
            <td class="text-end">${account.debit > 0 ? formatCurrency(account.debit) : ''}</td>
            <td class="text-end">${account.credit > 0 ? formatCurrency(account.credit) : ''}</td>
            <td class="text-end account-balance ${getBalanceClass(balance)}">${formatCurrency(Math.abs(balance))}</td>
        `;
        
        tbody.appendChild(row);
        
        totalDebit += account.debit;
        totalCredit += account.credit;
    });
    
    tbTotalDebit.textContent = formatCurrency(totalDebit);
    tbTotalCredit.textContent = formatCurrency(totalCredit);
    
    const difference = totalDebit - totalCredit;
    tbDifference.textContent = formatCurrency(Math.abs(difference));
    
    if (difference === 0) {
        tbDifference.className = 'text-end text-success';
        statusElement.textContent = 'Balanced';
        statusElement.className = 'fw-bold text-success';
        messageElement.textContent = 'Debits equal credits.';
    } else {
        tbDifference.className = 'text-end text-danger';
        statusElement.textContent = 'Unbalanced';
        statusElement.className = 'fw-bold text-danger';
        messageElement.textContent = `Difference: ${formatCurrency(Math.abs(difference))}`;
    }
}

// Load Profit & Loss
function loadProfitLoss() {
    const incomeItems = document.getElementById('incomeItems');
    const expenseItems = document.getElementById('expenseItems');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpenses = document.getElementById('totalExpenses');
    const netProfitLoss = document.getElementById('netProfitLoss');
    
    if (!incomeItems || !expenseItems) return;
    
    incomeItems.innerHTML = '';
    expenseItems.innerHTML = '';
    
    // Calculate income and expenses
    let totalIncomeAmount = 0;
    let totalExpensesAmount = 0;
    
    // Income accounts
    const incomeAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'income');
    incomeAccounts.forEach(account => {
        // Calculate balance from ledger
        let balance = account.balance;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td class="text-end">${formatCurrency(balance)}</td>
        `;
        
        incomeItems.appendChild(row);
        totalIncomeAmount += balance;
    });
    
    // Expense accounts
    const expenseAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'expense');
    expenseAccounts.forEach(account => {
        // Calculate balance from ledger
        let balance = account.balance;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td class="text-end">${formatCurrency(balance)}</td>
        `;
        
        expenseItems.appendChild(row);
        totalExpensesAmount += balance;
    });
    
    totalIncome.textContent = formatCurrency(totalIncomeAmount);
    totalExpenses.textContent = formatCurrency(totalExpensesAmount);
    
    const netProfit = totalIncomeAmount - totalExpensesAmount;
    netProfitLoss.textContent = formatCurrency(netProfit);
    netProfitLoss.className = netProfit >= 0 ? 'display-6 fw-bold text-success' : 'display-6 fw-bold text-danger';
}

// Load Balance Sheet
function loadBalanceSheet() {
    const assetsItems = document.getElementById('assetsItems');
    const liabilitiesItems = document.getElementById('liabilitiesItems');
    const equityItems = document.getElementById('equityItems');
    const totalAssetsSheet = document.getElementById('totalAssetsSheet');
    const totalLiabilitiesSheet = document.getElementById('totalLiabilitiesSheet');
    const totalEquitySheet = document.getElementById('totalEquitySheet');
    const verificationElement = document.getElementById('balanceSheetVerification');
    const differenceElement = document.getElementById('balanceSheetDifference');
    
    if (!assetsItems || !liabilitiesItems || !equityItems) return;
    
    assetsItems.innerHTML = '';
    liabilitiesItems.innerHTML = '';
    equityItems.innerHTML = '';
    
    // Calculate balances
    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;
    
    // Asset accounts
    const assetAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'asset');
    assetAccounts.forEach(account => {
        totalAssets += account.balance;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td class="text-end">${formatCurrency(account.balance)}</td>
        `;
        
        assetsItems.appendChild(row);
    });
    
    // Liability accounts
    const liabilityAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'liability');
    liabilityAccounts.forEach(account => {
        totalLiabilities += account.balance;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td class="text-end">${formatCurrency(account.balance)}</td>
        `;
        
        liabilitiesItems.appendChild(row);
    });
    
    // Equity accounts
    const equityAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'equity');
    equityAccounts.forEach(account => {
        totalEquity += account.balance;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.name}</td>
            <td class="text-end">${formatCurrency(account.balance)}</td>
        `;
        
        equityItems.appendChild(row);
    });
    
    totalAssetsSheet.textContent = formatCurrency(totalAssets);
    totalLiabilitiesSheet.textContent = formatCurrency(totalLiabilities);
    totalEquitySheet.textContent = formatCurrency(totalEquity);
    
    // Add net profit to equity
    const incomeAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'income');
    const expenseAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'expense');
    const totalIncome = incomeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpenses = expenseAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const netProfit = totalIncome - totalExpenses;
    
    totalEquity += netProfit;
    
    // Verify balance sheet equation
    const assets = totalAssets;
    const liabilitiesEquity = totalLiabilities + totalEquity;
    const difference = Math.abs(assets - liabilitiesEquity);
    
    if (difference < 1) { // Allow for rounding errors
        verificationElement.innerHTML = '<span class="badge bg-success">Balanced</span>';
        differenceElement.textContent = `Assets = Liabilities + Equity`;
    } else {
        verificationElement.innerHTML = '<span class="badge bg-danger">Unbalanced</span>';
        differenceElement.textContent = `Difference: ${formatCurrency(difference)}`;
    }
}

// Load Chart of Accounts
function loadChartOfAccounts() {
    const tbody = document.getElementById('chartOfAccountsBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    accountingData.chartOfAccounts.forEach(account => {
        const typeBadge = getAccountTypeBadge(account.type);
        const statusBadge = account.status === 'active' ? 'success' : 'secondary';
        const balanceClass = getBalanceClass(account.balance);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.code}</td>
            <td>
                ${account.type === 'header' ? '<strong>' : ''}
                ${account.name}
                ${account.type === 'header' ? '</strong>' : ''}
            </td>
            <td>${typeBadge}</td>
            <td>${account.category || '-'}</td>
            <td class="text-end account-balance ${balanceClass}">
                ${account.type !== 'header' ? formatCurrency(account.balance) : '-'}
            </td>
            <td><span class="badge bg-${statusBadge}">${account.status}</span></td>
            <td>
                ${account.type !== 'header' ? `
                <button class="btn btn-sm btn-outline-primary" onclick="editAccount('${account.code}')">
                    <i class="bi bi-pencil"></i>
                </button>
                ` : ''}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Load Bank Reconciliation
function loadBankReconciliation() {
    const statementBody = document.getElementById('bankStatementBody');
    const accountingBody = document.getElementById('accountingRecordsBody');
    const statementBalance = document.getElementById('statementBalance');
    const bookBalance = document.getElementById('bookBalance');
    const reconStatementBalance = document.getElementById('reconStatementBalance');
    const reconBookBalance = document.getElementById('reconBookBalance');
    const depositsInTransit = document.getElementById('depositsInTransit');
    const outstandingChecks = document.getElementById('outstandingChecks');
    const adjustedStatementBalance = document.getElementById('adjustedStatementBalance');
    const reconciliationStatus = document.getElementById('reconciliationStatus');
    
    if (!statementBody || !accountingBody) return;
    
    // Bank Statement
    statementBody.innerHTML = '';
    let lastStatementBalance = 0;
    
    accountingData.bankReconciliation.statement.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(entry.date)}</td>
            <td>${entry.description}</td>
            <td class="text-end">${entry.withdrawal > 0 ? formatCurrency(entry.withdrawal) : ''}</td>
            <td class="text-end">${entry.deposit > 0 ? formatCurrency(entry.deposit) : ''}</td>
            <td class="text-end">${formatCurrency(entry.balance)}</td>
        `;
        
        statementBody.appendChild(row);
        lastStatementBalance = entry.balance;
    });
    
    statementBalance.textContent = formatCurrency(lastStatementBalance);
    reconStatementBalance.textContent = formatCurrency(lastStatementBalance);
    
    // Accounting Records
    accountingBody.innerHTML = '';
    let bookBalanceAmount = 0;
    let unreconciledDeposits = 0;
    let unreconciledChecks = 0;
    
    accountingData.bankReconciliation.accountingRecords.forEach(entry => {
        const statusBadge = entry.status === 'reconciled' ? 'success' : 'warning';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(entry.date)}</td>
            <td>${entry.description}</td>
            <td class="text-end">${entry.debit > 0 ? formatCurrency(entry.debit) : ''}</td>
            <td class="text-end">${entry.credit > 0 ? formatCurrency(entry.credit) : ''}</td>
            <td><span class="badge bg-${statusBadge}">${entry.status}</span></td>
        `;
        
        accountingBody.appendChild(row);
        
        bookBalanceAmount += entry.debit - entry.credit;
        
        if (entry.status === 'unreconciled') {
            if (entry.debit > 0) {
                unreconciledDeposits += entry.debit;
            } else if (entry.credit > 0) {
                unreconciledChecks += entry.credit;
            }
        }
    });
    
    bookBalance.textContent = formatCurrency(bookBalanceAmount);
    reconBookBalance.textContent = formatCurrency(bookBalanceAmount);
    depositsInTransit.textContent = formatCurrency(unreconciledDeposits);
    outstandingChecks.textContent = formatCurrency(unreconciledChecks);
    
    const adjustedStatement = lastStatementBalance + unreconciledDeposits - unreconciledChecks;
    adjustedStatementBalance.textContent = formatCurrency(adjustedStatement);
    
    // Reconciliation status
    const difference = Math.abs(adjustedStatement - bookBalanceAmount);
    
    if (difference < 1) {
        reconciliationStatus.className = 'alert alert-success';
        reconciliationStatus.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            <strong>Reconciliation Complete!</strong> Bank statement and accounting records match.
        `;
    } else {
        reconciliationStatus.className = 'alert alert-warning';
        reconciliationStatus.innerHTML = `
            <i class="bi bi-exclamation-triangle me-2"></i>
            <strong>Reconciliation Required:</strong> Difference of ${formatCurrency(difference)} needs investigation.
        `;
    }
}

// Load Recent Journals
function loadRecentJournals() {
    const container = document.getElementById('recentJournals');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get unique journal entries
    const journalIds = [...new Set(accountingData.generalLedger.map(entry => entry.id))].slice(0, 5);
    
    journalIds.forEach(journalId => {
        const entries = accountingData.generalLedger.filter(entry => entry.id === journalId);
        if (entries.length === 0) return;
        
        const firstEntry = entries[0];
        const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
        const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);
        
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action';
        item.href = '#';
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${firstEntry.id}</h6>
                <small class="text-muted">${formatDate(firstEntry.date)}</small>
            </div>
            <p class="mb-1">${firstEntry.description}</p>
            <small class="text-muted">Debit: ${formatCurrency(totalDebit)} | Credit: ${formatCurrency(totalCredit)}</small>
        `;
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            viewJournalEntry(journalId);
        });
        
        container.appendChild(item);
    });
}

// Update accounting statistics
function updateAccountingStats() {
    // Calculate totals from chart of accounts
    const assets = accountingData.chartOfAccounts
        .filter(acc => acc.type === 'asset')
        .reduce((sum, acc) => sum + acc.balance, 0);
    
    const liabilities = accountingData.chartOfAccounts
        .filter(acc => acc.type === 'liability')
        .reduce((sum, acc) => sum + acc.balance, 0);
    
    const equity = accountingData.chartOfAccounts
        .filter(acc => acc.type === 'equity')
        .reduce((sum, acc) => sum + acc.balance, 0);
    
    const income = accountingData.chartOfAccounts
        .filter(acc => acc.type === 'income')
        .reduce((sum, acc) => sum + acc.balance, 0);
    
    const expenses = accountingData.chartOfAccounts
        .filter(acc => acc.type === 'expense')
        .reduce((sum, acc) => sum + acc.balance, 0);
    
    const netProfit = income - expenses;
    
    // Update display
    document.getElementById('totalAssets').textContent = formatCurrency(assets);
    document.getElementById('totalLiabilities').textContent = formatCurrency(liabilities);
    document.getElementById('totalEquity').textContent = formatCurrency(equity + netProfit);
    document.getElementById('netProfit').textContent = formatCurrency(netProfit);
}

// Update Profit & Loss Chart
function updateProfitLossChart() {
    const ctx = document.getElementById('profitLossChart');
    if (!ctx) return;
    
    // Destroy existing chart instance
    if (chartInstances.profitLoss) {
        chartInstances.profitLoss.destroy();
    }
    
    // Calculate data
    const incomeAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'income');
    const expenseAccounts = accountingData.chartOfAccounts.filter(acc => acc.type === 'expense');
    
    const totalIncome = incomeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpenses = expenseAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const netProfit = totalIncome - totalExpenses;
    
    chartInstances.profitLoss = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses', 'Net Profit'],
            datasets: [{
                label: 'Amount (PKR)',
                data: [totalIncome, totalExpenses, netProfit],
                backgroundColor: [
                    '#198754',  // Income - green
                    '#dc3545',  // Expenses - red
                    netProfit >= 0 ? '#198754' : '#dc3545'  // Profit/Loss
                ],
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

// Add journal item
function addJournalItem() {
    const tbody = document.getElementById('journalItemsBody');
    if (!tbody) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <select class="form-select form-select-sm" required>
                <option value="">Select Account</option>
                ${accountingData.chartOfAccounts
                    .filter(acc => acc.type !== 'header')
                    .map(acc => `<option value="${acc.code}">${acc.code} - ${acc.name}</option>`)
                    .join('')}
            </select>
        </td>
        <td><input type="number" class="form-control form-control-sm debit-amount" placeholder="0.00" step="0.01" oninput="calculateJournalTotals()"></td>
        <td><input type="number" class="form-control form-control-sm credit-amount" placeholder="0.00" step="0.01" oninput="calculateJournalTotals()"></td>
        <td><input type="text" class="form-control form-control-sm" placeholder="Item description"></td>
        <td><button type="button" class="btn btn-sm btn-danger remove-item" onclick="removeJournalItem(this)"><i class="bi bi-trash"></i></button></td>
    `;
    
    tbody.appendChild(row);
}

// Remove journal item
function removeJournalItem(button) {
    const row = button.closest('tr');
    row.remove();
    calculateJournalTotals();
}

// Calculate journal totals
function calculateJournalTotals() {
    const debitInputs = document.querySelectorAll('.debit-amount');
    const creditInputs = document.querySelectorAll('.credit-amount');
    const totalDebit = document.getElementById('totalJournalDebit');
    const totalCredit = document.getElementById('totalJournalCredit');
    const difference = document.getElementById('journalDifference');
    const alertElement = document.getElementById('journalBalanceAlert');
    const messageElement = document.getElementById('journalBalanceMessage');
    
    let debitSum = 0;
    let creditSum = 0;
    
    debitInputs.forEach(input => {
        debitSum += parseFloat(input.value) || 0;
    });
    
    creditInputs.forEach(input => {
        creditSum += parseFloat(input.value) || 0;
    });
    
    totalDebit.value = debitSum.toFixed(2);
    totalCredit.value = creditSum.toFixed(2);
    
    const diff = debitSum - creditSum;
    difference.value = Math.abs(diff).toFixed(2);
    
    if (diff === 0) {
        difference.className = 'form-control form-control-sm text-success';
        alertElement.className = 'alert alert-success';
        messageElement.textContent = 'Journal is balanced! Ready to post.';
    } else {
        difference.className = 'form-control form-control-sm text-danger';
        alertElement.className = 'alert alert-danger';
        messageElement.textContent = `Journal is unbalanced! Difference: ${formatCurrency(Math.abs(diff))}`;
    }
}

// Post journal entry
function postJournalEntry(e) {
    e.preventDefault();
    
    // Validate journal balance
    const difference = parseFloat(document.getElementById('journalDifference').value);
    if (difference !== 0) {
        showNotification('Journal must balance before posting!', 'danger');
        return;
    }
    
    // Get form data
    const journalId = `JE-${String(journalEntryCounter).padStart(3, '0')}`;
    const date = document.getElementById('journalDate').value;
    const reference = document.getElementById('journalReference').value || journalId;
    const description = document.getElementById('journalDescription').value;
    const notes = document.getElementById('journalNotes').value;
    
    // Get journal items
    const rows = document.querySelectorAll('#journalItemsBody tr');
    const journalEntries = [];
    
    rows.forEach(row => {
        const accountSelect = row.querySelector('select');
        const debitInput = row.querySelector('.debit-amount');
        const creditInput = row.querySelector('.credit-amount');
        const descInput = row.querySelector('input[type="text"]:last-of-type');
        
        if (accountSelect && accountSelect.value) {
            journalEntries.push({
                id: journalId,
                date: date,
                account: accountSelect.value,
                description: descInput ? descInput.value : description,
                debit: parseFloat(debitInput.value) || 0,
                credit: parseFloat(creditInput.value) || 0,
                balance: (parseFloat(debitInput.value) || 0) - (parseFloat(creditInput.value) || 0)
            });
        }
    });
    
    if (journalEntries.length === 0) {
        showNotification('Please add at least one journal item!', 'danger');
        return;
    }
    
    // Add to accounting data
    journalEntries.forEach(entry => {
        accountingData.generalLedger.push(entry);
        
        // Update account balance in chart of accounts
        const account = accountingData.chartOfAccounts.find(acc => acc.code === entry.account);
        if (account) {
            account.balance += entry.balance;
        }
    });
    
    journalEntryCounter++;
    
    // Close modal
    const modalElement = document.getElementById('addJournalEntryModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('journalEntryForm').reset();
    document.getElementById('journalItemsBody').innerHTML = `
        <tr>
            <td>
                <select class="form-select form-select-sm" required>
                    <option value="">Select Account</option>
                    <!-- Accounts will be populated dynamically -->
                </select>
            </td>
            <td><input type="number" class="form-control form-control-sm debit-amount" placeholder="0.00" step="0.01"></td>
            <td><input type="number" class="form-control form-control-sm credit-amount" placeholder="0.00" step="0.01"></td>
            <td><input type="text" class="form-control form-control-sm" placeholder="Item description"></td>
            <td><button type="button" class="btn btn-sm btn-danger remove-item"><i class="bi bi-trash"></i></button></td>
        </tr>
    `;
    
    // Refresh views
    loadGeneralLedger();
    loadTrialBalance();
    loadProfitLoss();
    loadBalanceSheet();
    loadRecentJournals();
    updateAccountingStats();
    
    showNotification(`Journal entry ${journalId} posted successfully!`, 'success');
}

// Save journal as draft
function saveJournalAsDraft() {
    showNotification('Journal saved as draft!', 'info');
}

// Create new account
function createNewAccount(e) {
    e.preventDefault();
    
    const code = document.getElementById('accountCode').value;
    const name = document.getElementById('accountName').value;
    const type = document.getElementById('accountType').value;
    const category = document.getElementById('accountCategory').value;
    const openingBalance = parseFloat(document.getElementById('openingBalance').value) || 0;
    const isActive = document.getElementById('isActiveAccount').checked;
    
    // Check if account code already exists
    if (accountingData.chartOfAccounts.some(acc => acc.code === code)) {
        showNotification('Account code already exists!', 'danger');
        return;
    }
    
    // Add new account
    const newAccount = {
        code: code,
        name: name,
        type: type,
        category: category,
        balance: openingBalance,
        status: isActive ? 'active' : 'inactive'
    };
    
    accountingData.chartOfAccounts.push(newAccount);
    
    // Close modal
    const modalElement = document.getElementById('addAccountModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('addAccountForm').reset();
    
    // Refresh chart of accounts
    loadChartOfAccounts();
    updateAccountingStats();
    
    showNotification(`Account ${code} - ${name} created successfully!`, 'success');
}

// Update account categories based on type
function updateAccountCategories() {
    const type = document.getElementById('accountType').value;
    const categorySelect = document.getElementById('accountCategory');
    
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    
    const categories = {
        'asset': ['Current Assets', 'Fixed Assets', 'Investments', 'Other Assets'],
        'liability': ['Current Liabilities', 'Long-term Liabilities', 'Other Liabilities'],
        'equity': ['Owner\'s Equity', 'Retained Earnings', 'Other Equity'],
        'income': ['Operating Income', 'Non-operating Income', 'Other Income'],
        'expense': ['Operating Expenses', 'Non-operating Expenses', 'Other Expenses']
    };
    
    if (categories[type]) {
        categories[type].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
}

// Close accounting period
function closeAccountingPeriod(e) {
    e.preventDefault();
    
    const period = document.getElementById('periodToClose').value;
    const closingDate = document.getElementById('closingDate').value;
    const lockPeriod = document.getElementById('lockPeriod').checked;
    
    // Validate
    if (!period || !closingDate) {
        showNotification('Please fill all required fields!', 'danger');
        return;
    }
    
    // Close modal
    const modalElement = document.getElementById('closeAccountingPeriodModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
    
    // Reset form
    document.getElementById('closePeriodForm').reset();
    
    showNotification(`Accounting period ${period} closed successfully!${lockPeriod ? ' Period is now locked.' : ''}`, 'success');
}

// Filter ledger
function filterLedger() {
    // Implementation for filtering ledger
    showNotification('Filter functionality coming soon!', 'info');
}

// Export ledger
function exportLedger() {
    const data = {
        title: 'General Ledger Report',
        date: new Date().toISOString(),
        data: accountingData.generalLedger
    };
    
    downloadJSON(data, 'general-ledger-export.json');
    showNotification('General ledger exported successfully!', 'success');
}

// Print ledger
function printLedger() {
    window.print();
}

// Export chart of accounts
function exportChartOfAccounts() {
    const data = {
        title: 'Chart of Accounts',
        date: new Date().toISOString(),
        data: accountingData.chartOfAccounts
    };
    
    downloadJSON(data, 'chart-of-accounts-export.json');
    showNotification('Chart of accounts exported successfully!', 'success');
}

// Reconcile bank
function reconcileBank() {
    showNotification('Bank reconciliation completed!', 'success');
}

// View journal entry
function viewJournalEntry(journalId) {
    const entries = accountingData.generalLedger.filter(entry => entry.id === journalId);
    if (entries.length === 0) return;
    
    const firstEntry = entries[0];
    const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
    const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Journal Entry: ${journalId}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <strong>Date:</strong> ${formatDate(firstEntry.date)}
                    </div>
                    <div class="col-md-6">
                        <strong>Status:</strong> <span class="badge bg-success">Posted</span>
                    </div>
                </div>
                <div class="mb-3">
                    <strong>Description:</strong><br>
                    ${firstEntry.description}
                </div>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th class="text-end">Debit</th>
                                <th class="text-end">Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${entries.map(entry => {
                                const account = accountingData.chartOfAccounts.find(acc => acc.code === entry.account);
                                const accountName = account ? `${account.code} - ${account.name}` : entry.account;
                                return `
                                    <tr>
                                        <td>${accountName}</td>
                                        <td class="text-end">${entry.debit > 0 ? formatCurrency(entry.debit) : ''}</td>
                                        <td class="text-end">${entry.credit > 0 ? formatCurrency(entry.credit) : ''}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                        <tfoot class="table-light">
                            <tr>
                                <td class="text-end"><strong>Totals:</strong></td>
                                <td class="text-end"><strong>${formatCurrency(totalDebit)}</strong></td>
                                <td class="text-end"><strong>${formatCurrency(totalCredit)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-primary" onclick="printJournal('${journalId}')">
                    <i class="bi bi-printer me-1"></i> Print
                </button>
            </div>
        </div>
    `;
    
    // Create and show modal
    const modalId = 'viewJournalModal';
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

// Edit account
function editAccount(accountCode) {
    const account = accountingData.chartOfAccounts.find(acc => acc.code === accountCode);
    if (!account) return;
    
    showNotification(`Edit account functionality for ${accountCode} coming soon!`, 'info');
}

// Utility functions
function formatCurrency(amount) {
    if (typeof amount !== 'number') return amount;
    return 'PKR ' + Math.abs(amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getBalanceClass(balance) {
    if (balance > 0) return 'balance-positive';
    if (balance < 0) return 'balance-negative';
    return 'balance-zero';
}

function getAccountTypeBadge(type) {
    const badges = {
        'asset': 'badge-asset',
        'liability': 'badge-liability',
        'equity': 'badge-equity',
        'income': 'badge-income',
        'expense': 'badge-expense',
        'header': 'badge-secondary'
    };
    
    const labels = {
        'asset': 'Asset',
        'liability': 'Liability',
        'equity': 'Equity',
        'income': 'Income',
        'expense': 'Expense',
        'header': 'Header'
    };
    
    const badgeClass = badges[type] || 'badge-secondary';
    const label = labels[type] || type;
    
    return `<span class="badge ${badgeClass}">${label}</span>`;
}

function downloadJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
}

function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'accountingLoading';
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
    const loading = document.getElementById('accountingLoading');
    if (loading) {
        loading.remove();
    }
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

// Initialize on window load
window.addEventListener('load', function() {
    setTimeout(() => {
        updateProfitLossChart();
    }, 100);
});