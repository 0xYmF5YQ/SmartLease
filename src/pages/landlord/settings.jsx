import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, FileText, User, Send, Check, Settings, Code, Zap } from 'lucide-react';

// --- Lease Mock Data ---
const leaseTemplates = [
  { id: 'standard', name: 'Standard Residential Lease (1 Year)', file: 'Standard_1Yr_Lease.pdf' },
  { id: 'month_to_month', name: 'Month-to-Month Agreement', file: 'MTM_Agreement.pdf' },
  { id: 'commercial', name: 'Commercial Property Lease', file: 'Commercial_Lease.pdf' },
];

const mockTenants = [
  { id: 1, name: 'Francis Baya', unit: 'A4' },
  { id: 2, name: 'Philip Upuuzi', unit: '12' },
  { id: 3, name: 'Say Yes', unit: '1A' },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// --- Lease Generation Form Component ---
const LeaseForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(leaseTemplates[0].id);
  const [tenantName, setTenantName] = useState(mockTenants[0].name);
  const [tenantEmail, setTenantEmail] = useState('baya@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccessMessage(null);

    // Mock API call to generate, sign, and send the document
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(
        `Lease generated and sent to ${tenantName} (${tenantEmail}) for digital signature!`
      );
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 2000);
  };

  return (
    <motion.div className="mt-4 bg-white p-6 rounded-xl shadow-md border border-gray-100" variants={itemVariants}>
      <h4 className="flex items-center text-lg font-bold text-indigo-700 mb-4 border-b pb-2">
        <FileText size={20} className="mr-2" /> Lease Generation
      </h4>
      <p className="text-gray-600 mb-4 text-sm">Automate the creation, signing, and delivery of lease agreements.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Step 1: Select Template */}
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">1. Select Template</label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
          >
            {leaseTemplates.map(tpl => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Fill in Tenant Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">2. Tenant Name</label>
            <input
              type="text"
              id="tenantName"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              placeholder="e.g., Alice Johnson"
            />
          </div>
          <div>
            <label htmlFor="tenantEmail" className="block text-sm font-medium text-gray-700">Tenant Email (For Signing)</label>
            <input
              type="email"
              id="tenantEmail"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              placeholder="e.g., tenant@example.com"
            />
          </div>
        </div>

        {/*Sign Digitally & Send PDF */}
        <motion.button 
          type="submit"
          className={`w-full flex items-center justify-center p-3 rounded-md font-semibold transition-colors shadow-md mt-6 
            ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
        >
          {isProcessing ? (
            <>
              <Zap size={20} className="mr-2 animate-pulse" /> Processing...
            </>
          ) : (
            <>
              <Send size={20} className="mr-2" /> Generate, Sign & Send PDF
            </>
          )}
        </motion.button>
        
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-teal-100 text-teal-800 rounded-lg flex items-center font-medium"
            >
              <Check size={20} className="mr-2" /> {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

// --- Main Settings Component ---
const SettingsPage = () => {
  // Mock state for Dark Mode (would typically be managed via Context/LocalStorage)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // In a real app, this would update the body class or a global context
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Define dynamic colors based on dark mode state
  const bgClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const headerBg = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-indigo-400' : 'text-indigo-600';

  return (
    <motion.div
      className={`flex-1 p-4 sm:p-8 min-h-screen ${bgClass} transition-colors duration-500`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
          <Settings size={30} className="inline mr-3 align-text-bottom text-indigo-500"/> App Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configure user experience and automate document workflows.</p>
      </header>

      {/* General Settings Section */}
      <motion.div className={`rounded-xl shadow-xl overflow-hidden mb-10 ${cardBg}`} variants={itemVariants}>
        <h3 className={`text-xl font-bold p-5 border-b ${headerBg} text-gray-800 dark:text-gray-200`}>General Preferences</h3>
        
        <div className="p-6 space-y-6">
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm">
            <div className="flex items-center">
              {isDarkMode ? (
                <Sun size={24} className="text-yellow-400 mr-4" />
              ) : (
                <Moon size={24} className="text-gray-700 mr-4" />
              )}
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes for visual comfort.</p>
              </div>
            </div>
            
            <motion.button 
              onClick={toggleDarkMode}
              className={`relative w-16 h-8 rounded-full shadow-inner p-1 transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
              aria-checked={isDarkMode}
              role="switch"
              tabIndex="0"
            >
              <motion.span 
                className="block w-6 h-6 rounded-full bg-white shadow-md"
                initial={false}
                animate={{ x: isDarkMode ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </motion.button>
          </div>
          
          {/* Other Settings Placeholder */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm opacity-50 cursor-not-allowed">
            <div className="flex items-center">
              <Code size={24} className="text-indigo-400 mr-4" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">API Key Management</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage external integration credentials (Coming Soon).</p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Lease Management Section */}
      <motion.div className={`rounded-xl shadow-xl overflow-hidden ${cardBg}`} variants={itemVariants}>
        <h3 className={`text-xl font-bold p-5 border-b ${headerBg} ${textPrimary}`}>Document Workflow Automation</h3>
        
        <div className="p-6">
          <LeaseForm />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;