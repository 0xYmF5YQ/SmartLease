import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Home } from 'lucide-react';

// --- Framer Motion Variants ---

// 1. Page Content container for initial load
const pageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// 2. Tenant List container for staggered effect
const listContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05, // Delay between each item appearing
      delayChildren: 0.2, // Delay before the first item appears
    },
  },
};

// 3. Individual Tenant Row appearance
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 4. Modal Pop-Up and Backdrop
const modalBackdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalContainerVariants = {
  hidden: { opacity: 0, scale: 0.7, y: "-50%" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: "0%", 
    transition: { duration: 0.3, type: "spring", stiffness: 100 } 
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};


const Tenants = () => {
  const [showModal, setShowModal] = useState(false);

  // Dummy Data
  const [tenants] = useState([
    { id: 1, name: 'James Kamau', property: 'Sunrise Apts - A4', phone: '0712 345 678', status: 'Active', balance: 0 },
    { id: 2, name: 'Sarah Ochieng', property: 'Sunrise Apts - B2', phone: '0722 111 222', status: 'Late', balance: 15000 },
    { id: 3, name: 'David Mwangi', property: 'Westside Towers - 12', phone: '0733 444 555', status: 'Active', balance: 0 },
    // Adding a few more for the staggered animation to be more visible
    { id: 4, name: 'Fatuma Ali', property: 'Midland Flats - C1', phone: '0744 555 666', status: 'Active', balance: 0 },
    { id: 5, name: 'Mark Njoroge', property: 'Valley View - 1A', phone: '0755 777 888', status: 'Late', balance: 5000 },
  ]);

  return (
    <motion.div 
      className="p-8 ml-64 bg-gray-50 min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tenants</h1>
          <p className="text-gray-500">Manage your tenants and lease details</p>
        </div>
        <motion.button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span>Add New Tenant</span>
        </motion.button>
      </div>

      {/* Filters & Search */}
      <motion.div 
        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      >
        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, house, or phone..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </motion.div>

      {/* Tenants List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="p-4 py-5">Tenant Name</th>
              <th className="p-4">Property / Unit</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          
          <motion.tbody 
            className="divide-y divide-gray-100"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {tenants.map((tenant) => (
              <motion.tr 
                key={tenant.id} 
                className="hover:bg-gray-50 group transition-colors"
                variants={listItemVariants}
                // Optional: Hover effect for row for extra polish
                whileHover={{ backgroundColor: '#f0f4ff' }} 
              >
                <td className="p-4">
                  <div className="font-semibold text-gray-800">{tenant.name}</div>
                  <div className="text-xs text-gray-500">ID: {tenant.id}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center text-gray-600">
                    <Home size={16} className="mr-2 text-gray-400" />
                    {tenant.property}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-2 text-gray-400" />
                      {tenant.phone}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${tenant.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {tenant.balance > 0 ? `- KES ${tenant.balance.toLocaleString()}` : 'Cleared'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    tenant.status === 'Active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <motion.button 
                    className="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreVertical size={20} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Add Tenant Modal (Conditional Rendering with AnimatePresence is needed for smooth exit) */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden" // Exit must be handled by AnimatePresence, which is not included here but assumed.
          onClick={() => setShowModal(false)} // Close modal when clicking backdrop
        >
          {/* Modal Container */}
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
            variants={modalContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Register New Tenant</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* ... (Form inputs unchanged for brevity) ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="07XX XXX XXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Unit</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <option>Select Unit...</option>
                    <option>Sunrise Apts - A1</option>
                    <option>Sunrise Apts - A2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount (KES)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="15000" />
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  type="button" 
                  className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: '#4f46e5', scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Save Tenant
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Tenants;