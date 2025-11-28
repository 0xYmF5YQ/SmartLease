import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, X, Send } from 'lucide-react'; 

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- SIMULATED MESSAGING SERVICE (Backend Endpoint Placeholder) ---
const MessagingService = {
  /**
   * IMPORTANT: In a real application, this function must call your 
   * custom backend server (e.g., /api/send-sms) via an authenticated 
   * fetch request.
   */
  send: async (tenant, type) => {
    // Note: Messages are adapted to the new simple 'Paid/Not Paid' balance status
    const baseMessage = {
      'RentDue': `Hi ${tenant.name}, your rent for ${tenant.unit} is due in 3 days. Please prepare for payment.`,
      'RentLate': `URGENT: Rent for ${tenant.unit} is marked as Not Paid. Please settle immediately.`,
      'RentReceived': `Thank you ${tenant.name}! Rent for ${tenant.unit} has been received and marked as Paid.`,
    };

    const messageContent = baseMessage[type] || `Default message for ${type}.`;
    
    // Log the action to the console to confirm simulation
    console.log('--- Simulated Message Sent ---');
    console.log(`To: ${tenant.name} (${tenant.contact})`);
    console.log(`Type: ${type}`);
    console.log(`Content: ${messageContent}`);
    console.log('-------------------------------');

    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 500)); 

    return `Reminder sent to ${tenant.name} successfully via simulated backend for type: ${type}.`;
  }
};
// -----------------------------------------------------------------


// Custom Modal Component for Add/Edit (UPDATED)
const TenantModal = ({ isOpen, onClose, tenantData, onSave }) => {
  const isEditing = !!tenantData;
  const title = isEditing ? 'Edit Tenant Details' : 'Add New Tenant';

  // Initialize form data with new 'Paid'/'Not Paid' terms
  const [formData, setFormData] = useState(tenantData || {
    name: '', unit: '', contact: '', balance: 'Paid', status: 'Active' // Default to 'Paid'
  });

  // Reset form data when tenantData modifies (i.e., when modal transitions from Add to Edit)
  React.useEffect(() => {
    if (isOpen) {
        // Ensure default new tenant balance is 'Paid'
        setFormData(tenantData || { name: '', unit: '', contact: '', balance: 'Paid', status: 'Active' });
    }
  }, [tenantData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" aria-modal="true">
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <header className="p-5 border-b flex justify-between items-center bg-indigo-50">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-1 rounded-full hover:bg-indigo-100">
            <X size={24} />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Tenant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="unit">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="contact">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="balance">Rent Payment Status</label>
            <select
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            >
              {/* UPDATED OPTIONS */}
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Lease Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end">
            <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition-colors shadow-md"
            >
              {isEditing ? 'Update Tenant' : 'Add Tenant'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const Tenants = () => {
  // UPDATED: Initial data with 'Paid'/'Not Paid' status
  const initialTenants = [
    { id: 1, name: 'James Kamau', unit: 'Sunrise Apts - A4', contact: '0712 345 678', rentDue: 150000, balance: 'Paid', status: 'Active' },
    { id: 2, name: 'Sarah Ochieng', unit: 'Sunrise Apts - B2', contact: '0722 111 222', rentDue: 150000, balance: 'Not Paid', status: 'Inactive' }, 
    { id: 3, name: 'David Mwangi', unit: 'Westside Towers - 12', contact: '0733 444 555', rentDue: 120000, balance: 'Paid', status: 'Active' },
    { id: 4, name: 'Fatuma Ali', unit: 'Midland Flats - C1', contact: '0744 555 666', rentDue: 250000, balance: 'Paid', status: 'Active' },
    { id: 5, name: 'Mark Njoroge', unit: 'Valley View - 1A', contact: '0755 777 888', rentDue: 100000, balance: 'Not Paid', status: 'Inactive' }, 
  ];
  const [tenants, setTenants] = useState(initialTenants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null); 
  const [deleteId, setDeleteId] = useState(null); 
  const [message, setMessage] = useState(null); 

  // --- Filtering State ---
  const [searchQuery, setSearchQuery] = useState('');
  // UPDATED: Filter now checks Rent Payment Status, not Lease Status (which remains 'Active'/'Inactive')
  const [rentStatusFilter, setRentStatusFilter] = useState('All'); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // UPDATED: Renamed handler to be more specific to Rent Payment Status
  const handleFilterChange = (e) => {
    setRentStatusFilter(e.target.value);
  };
  // -------------------------

  // --- Filtering Logic using useMemo for performance (UPDATED) ---
  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      // 1. Rent Status Filter Check
      // Now filtering by 'balance' (which holds 'Paid'/'Not Paid')
      if (rentStatusFilter !== 'All' && tenant.balance !== rentStatusFilter) {
        return false;
      }

      // 2. Search Query Check
      if (searchQuery.trim() === '') {
        return true;
      }

      const query = searchQuery.toLowerCase();
      // Check if query matches name, unit, or contact
      return (
        tenant.name.toLowerCase().includes(query) ||
        tenant.unit.toLowerCase().includes(query) ||
        tenant.contact.includes(query) 
      );
    });
  }, [tenants, searchQuery, rentStatusFilter]);
  // -------------------------


  const handleOpenAddModal = () => {
    setEditingTenant(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tenant) => {
    setEditingTenant(tenant);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingTenant) {
      // Logic for editing existing tenant
      setTenants(tenants.map(t => t.id === editingTenant.id ? { ...t, ...formData } : t));
    } else {
      // Logic for adding new tenant
      const newId = Math.max(...tenants.map(t => t.id), 0) + 1;
      // NOTE: New tenants must have a dummy 'rentDue' value for the table
      setTenants([...tenants, { ...formData, id: newId, rentDue: 150000 }]); 
    }
    setEditingTenant(null);
  };

  const handleDeleteConfirmed = () => {
    if (deleteId) {
      setTenants(tenants.filter(tenant => tenant.id !== deleteId));
      setDeleteId(null);
      setMessage({ type: 'success', text: `Tenant ID ${deleteId} successfully deleted.` });
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  const handleCloseDeletePrompt = () => {
    setDeleteId(null);
  }

  const handleDelete = (tenantId) => {
    setDeleteId(tenantId);
  };

  // --- Messaging Logic ---
  const handleSendReminder = async (tenant, type) => {
    setMessage({ type: 'info', text: `Sending ${type.replace(/([A-Z])/g, ' $1')} reminder to ${tenant.name}...` });
    try {
      const result = await MessagingService.send(tenant, type);
      setMessage({ type: 'success', text: result });
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to send message: ${error.message}` });
    }
    setTimeout(() => setMessage(null), 4000);
  };
  // ----------------------------


  return (
    <motion.div
      className="flex-1 p-8 bg-gray-50 min-h-screen" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Tenants</h2>
          <p className="text-gray-600">Manage your tenants and lease details</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} className="mr-2" /> Add New Tenant
        </button>
      </header>

      {/* Global Message Alert */}
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-3 mb-4 rounded-lg shadow-md font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-800' :
            message.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, property or unit..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* Functional Rent Payment Status Filter Dropdown (UPDATED) */}
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Filter by Rent Status:</span>
            <select
              value={rentStatusFilter}
              onChange={handleFilterChange}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-indigo-500 transition-colors text-gray-700"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
        </div>
      </div>

      {/* Tenants Table (UPDATED) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50 border-b border-indigo-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Property / Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Rent 
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Rent Status
                </th>
                {/* Quick Actions Header */}
                <th scope="col" className="relative px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                  Quick Actions
                </th>
                <th scope="col" className="relative px-6 py-3 text-right">
                  <span className="sr-only">Admin Actions</span>
                  <span className="text-xs font-semibold text-indigo-800 uppercase">Admin</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                    <div className="text-xs text-gray-500">ID: {tenant.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tenant.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tenant.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-700">
                    
                    Ksh{tenant.rentDue.toLocaleString()} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tenant.balance === 'Paid' ? 'bg-green-100 text-green-800' : 
                      tenant.balance === 'Not Paid' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tenant.balance} 
                    </span>
                  </td>
                  
                  {/* Quick Actions for Messaging (UPDATED) */}
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        {tenant.balance === 'Not Paid' ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSendReminder(tenant, 'RentLate')}
                                className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 flex items-center text-xs font-semibold"
                                title="Send Late Rent Reminder"
                            >
                                <Send size={14} className="mr-1"/> Late
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSendReminder(tenant, 'RentDue')}
                                className="text-indigo-600 hover:text-indigo-800 p-1 rounded-lg hover:bg-indigo-50 flex items-center text-xs font-semibold"
                                title="Send Rent Due Reminder"
                            >
                                <Send size={14} className="mr-1"/> Due
                            </motion.button>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSendReminder(tenant, 'RentReceived')}
                            className="text-green-600 hover:text-green-800 p-1 rounded-lg hover:bg-green-50 flex items-center text-xs font-semibold"
                            title="Send Rent Received Confirmation"
                        >
                            <Send size={14} className="mr-1"/> Paid
                        </motion.button>
                    </div>
                  </td>
                  
                  {/* Admin Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOpenEditModal(tenant)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                        title="Edit Tenant"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(tenant.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        title="Delete Tenant"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTenants.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tenants found matching your search and filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal (Inline) */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h4 className="text-lg font-semibold text-red-700">Confirm Deletion</h4>
            <p className="text-gray-600">
              Are you sure you want to delete tenant ID: {deleteId}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseDeletePrompt}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <TenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tenantData={editingTenant}
        onSave={handleSave}
      />
    </motion.div>
  );
};

export default Tenants;