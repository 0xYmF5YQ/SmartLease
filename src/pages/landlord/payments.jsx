import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, FileText, Home, User, CheckCircle, TrendingUp, X, Download } from 'lucide-react';

// --- Helper Functions ---
// Function to convert an array of objects to a CSV string and trigger download
const exportToCSV = (data, filename) => {
    if (data.length === 0) {
        alert("No data to export for the selected period.");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


// --- Mock Data Setup (Updated with paymentMode) ---
const mockTenants = [
    { id: 1, unit: 'Sunrise Apts - A4', name: 'Alice Johnson', rentDue: 150000, currentBalance: 10000 }, 
    { id: 2, unit: 'Westside Towers - 12', name: 'Bob Smith', rentDue: 180000, currentBalance: 0 },   
    { id: 3, unit: 'Valley View - 1A', name: 'Charlie Brown', rentDue: 130000, currentBalance: 20000 },
    { id: 4, unit: 'Midland Flats - C1', name: 'Dana Lee', rentDue: 500000, currentBalance: 0 },       
    { id: 5, unit: 'East Wing - 3B', name: 'Eve Martinez', rentDue: 110000, currentBalance: 0 },
];

const mockPayments = [
    // October Payments
    { id: 101, unit: 'Sunrise Apts - A4', amount: 150000, date: '2025-10-28', tenant: 'Alice Johnson', type: 'Rent', status: 'Completed', paymentMode: 'M-PESA' },
    { id: 102, unit: 'Valley View - 1A', amount: 120000, date: '2025-10-05', tenant: 'Charlie Brown', type: 'Rent', status: 'Completed', paymentMode: 'Bank Transfer' },
    
    // November Payments
    { id: 103, unit: 'Westside Towers - 12', amount: 180000, date: '2025-11-20', tenant: 'Bob Smith', type: 'Rent', status: 'Completed', paymentMode: 'Credit Card' },
    { id: 104, unit: 'Midland Flats - C1', amount: 100000, date: '2025-11-25', tenant: 'Dana Lee', type: 'Rent', status: 'Completed', paymentMode: 'M-PESA' },
    { id: 105, unit: 'East Wing - 3B', amount: 110000, date: '2025-11-01', tenant: 'Eve Martinez', type: 'Rent', status: 'Completed', paymentMode: 'Bank Transfer' },
    { id: 106, unit: 'Sunrise Apts - A4', amount: 500000, date: '2025-11-15', tenant: 'Alice Johnson', type: 'Late Fee', status: 'Completed', paymentMode: 'M-PESA' },
];

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

// --- Helper Components ---

// Card for displaying key metrics
const MetricCard = ({ icon: Icon, title, value, colorClass }) => (
    <motion.div 
        className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-b-2" 
        style={{ borderColor: colorClass }}
        variants={itemVariants}
    >
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
            <Icon size={24} className={colorClass} />
        </div>
        <p className="mt-1 text-3xl font-extrabold text-gray-900">
            Ksh{value.toLocaleString()}
        </p>
    </motion.div>
);

// --- New Monthly Report Export Component ---
const MonthlyReportExport = ({ payments, tenants }) => {
    const [selectedMonth, setSelectedMonth] = useState('2025-11'); // Default to current mock month

    const reportData = useMemo(() => {
        // Filter payments for the selected month/year
        const monthlyPayments = payments.filter(p => p.date.startsWith(selectedMonth) && p.status === 'Completed');

      
        
        return monthlyPayments.map(p => ({
            ID: p.id,
            Date: p.date,
            Unit: p.unit,
            Tenant_Name: p.tenant,
            Type: p.type,
            Amount_Ksh: p.amount,
            Payment_Mode: p.paymentMode, // Key addition
            Status: p.status,
        }));
    }, [payments, selectedMonth]);

    const handleExport = () => {
        const [year, month] = selectedMonth.split('-');
        const monthName = new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' });
        const filename = `Rent_Report_${monthName}_${year}.csv`;
        exportToCSV(reportData, filename);
    };

    // Simple option generation for demonstration
    const monthOptions = [
        { value: '2025-11', label: 'November 2025' },
        { value: '2025-10', label: 'October 2025' },
    ];

    return (
        <motion.div className="bg-white p-6 rounded-xl shadow-xl mb-10" variants={itemVariants}>
            <h3 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800 flex items-center">
                <FileText size={20} className="mr-2 text-indigo-500"/> Monthly Financial Report Export
            </h3>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label htmlFor="month-select" className="text-gray-700 font-medium">Select Month:</label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                >
                    {monthOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <button
                    onClick={handleExport}
                    className="flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors w-full sm:w-auto"
                    disabled={reportData.length === 0}
                >
                    <Download size={18} className="mr-2" />
                    Export {reportData.length} Transactions
                </button>
            </div>
            {reportData.length === 0 && selectedMonth && (
                <p className="mt-3 text-sm text-red-500">No completed payments found for the selected month.</p>
            )}
        </motion.div>
    );
};
// ----------------------------------------------------


// --- Main Payment Management Component ---
const PaymentManagement = () => {
    const [tenants] = useState(mockTenants);
    const [payments] = useState(mockPayments);

    // --- Financial Calculations ---
    const rentCollectedThisMonth = useMemo(() => {
        const currentMonth = '2025-11'; // Assuming current month is November 2025
        return payments
            .filter(p => p.date.startsWith(currentMonth) && p.status === 'Completed')
            .reduce((sum, p) => sum + p.amount, 0);
    }, [payments]);

    const pendingBalances = useMemo(() => {
        return tenants
            .filter(t => t.currentBalance > 0)
            .reduce((sum, t) => sum + t.currentBalance, 0);
    }, [tenants]);
    // ----------------------------------------

    // --- Payment History Table Sorting ---
    const sortedPayments = useMemo(() => {
        // Sort payments by date descending (newest first)
        return [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [payments]);


    // --- Unit Balance Table Styling Helper ---
    const getBalanceStyle = (balance) => {
        if (balance > 0) return 'text-red-600 bg-red-50 border-red-200';
        if (balance < 0) return 'text-green-600 bg-green-50 border-green-200';
        return 'text-gray-600 bg-gray-50 border-gray-200';
    };


    return (
        <motion.div
            className="flex-1 p-4 sm:p-8 bg-gray-50 min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="mb-8 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-gray-800">Financial Overview</h2>
                <p className="text-gray-600 mt-1">Manage tenant balances and track monthly income.</p>
            </header>

            {/* 1. Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard
                    icon={TrendingUp}
                    title="Rent Collected (November)"
                    value={rentCollectedThisMonth}
                    colorClass="text-green-600 border-green-500"
                />
                <MetricCard
                    icon={Clock}
                    title="Pending Balances"
                    value={pendingBalances}
                    colorClass="text-red-600 border-red-500"
                />
                <MetricCard
                    icon={Home}
                    title="Total Units (Active)"
                    value={tenants.length}
                    colorClass="text-indigo-600 border-indigo-500"
                />
            </div>

            {/* NEW: Monthly Report Export Section */}
            <MonthlyReportExport payments={payments} tenants={tenants} />
            
            {/* 2. Tenant Balances Table */}
            <motion.div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10" variants={itemVariants}>
                <h3 className="text-xl font-bold p-5 border-b text-gray-800 bg-gray-50">Tenant Balances</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tenant Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Monthly Rent</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Current Balance</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <motion.tbody className="bg-white divide-y divide-gray-100" layout>
                            <AnimatePresence>
                                {tenants.map((tenant) => (
                                    <motion.tr 
                                        key={tenant.id} 
                                        className="hover:bg-indigo-50 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">
                                            <Home size={14} className="inline mr-1 text-indigo-400" /> {tenant.unit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <User size={14} className="inline mr-1 text-gray-400" /> {tenant.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            Ksh{tenant.rentDue.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full border Ksh{getBalanceStyle(tenant.currentBalance)}`}>
                                                {tenant.currentBalance > 0 ? (
                                                    <Clock size={14} className="mr-1 inline" />
                                                ) : tenant.currentBalance < 0 ? (
                                                    <CheckCircle size={14} className="mr-1 inline" />
                                                ) : (
                                                    <DollarSign size={14} className="mr-1 inline" />
                                                )}
                                                Ksh{Math.abs(tenant.currentBalance).toLocaleString()}
                                                {tenant.currentBalance > 0 && ' Due'}
                                                {tenant.currentBalance < 0 && ' Credit'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs py-1 px-2 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors">
                                                    Send Reminder
                                                </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                </div>
            </motion.div>

            {/* 3. Payment History (Updated with Payment Mode) */}
            <motion.div className="bg-white rounded-xl shadow-xl overflow-hidden" variants={itemVariants}>
                <h3 className="text-xl font-bold p-5 border-b text-gray-800 bg-gray-50">Payment History (Last 6)</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tenant / Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Mode</th> {/* NEW COLUMN */}
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <motion.tbody className="bg-white divide-y divide-gray-100">
                            {sortedPayments.slice(0, 6).map((payment) => (
                                <motion.tr 
                                    key={payment.id} 
                                    className="hover:bg-green-50 transition-colors"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {payment.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {payment.tenant} ({payment.unit})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                                        +Ksh{payment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                            {payment.type}
                                        </span>
                                    </td>
                                    {/* NEW CELL */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                        {payment.paymentMode} 
                                    </td>
                                    {/* END NEW CELL */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex px-3 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            <CheckCircle size={14} className="mr-1 inline" /> {payment.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                    {sortedPayments.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            <FileText size={32} className="mx-auto text-gray-300 mb-2"/>
                            No payment history recorded yet.
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentManagement;