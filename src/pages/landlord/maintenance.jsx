import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, X, AlertTriangle, CheckCircle, Clock, DollarSign, Calendar, Info } from 'lucide-react';

// --- Landlord Context: No unit filter needed. Viewing all data. ---
// The landlord can see and manage all tickets.
// ----------------------------------

// --- Utility Functions ---

const STATUS_COLORS = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
  'Done': 'bg-green-100 text-green-800 border-green-300',
};

const ISSUE_TYPES = [
  'Broken Tap', 'No Electricity', 'Leak', 'Internet Issues', 'HVAC Failure', 'Other'
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// --- Custom Modal Component for Add/Edit Request (Landlord View) ---
const RequestModal = ({ isOpen, onClose, requestData, onSave }) => {
  const isEditing = !!requestData;
  // All fields are editable by the landlord
  const isEditable = true; 
  
  const title = isEditing ? 'Edit Maintenance Ticket' : 'Create New Request';

  const [formData, setFormData] = useState(requestData || {
    ticket: '',
    issueType: ISSUE_TYPES[0],
    description: '',
    unit: '',
    status: 'Pending',
    estimatedCost: 0,
    reportedOn: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(requestData || {
        ticket: '',
        issueType: ISSUE_TYPES[0],
        description: '',
        unit: '',
        status: 'Pending',
        estimatedCost: 0,
        reportedOn: new Date().toISOString().substring(0, 10),
      });
    }
  }, [requestData, isOpen]);

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
        className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <header className="p-5 border-b flex justify-between items-center bg-indigo-600 text-white">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-white hover:text-indigo-200 p-1 rounded-full hover:bg-indigo-700">
            <X size={24} />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="unit">Unit / Property</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="e.g., Sunrise Apts - A4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="issueType">Issue Type</label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white`}
              required
            >
              {ISSUE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="reportedOn">Date Reported</label>
            <input
              type="date"
              name="reportedOn"
              value={formData.reportedOn}
              readOnly={isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm bg-gray-100 cursor-not-allowed"
              required
            />
          </div>
          
          {/* Status and Cost are Landlord-managed fields - now editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Current Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white ${STATUS_COLORS[formData.status].replace('bg-', 'border-').replace('text-', 'bg-').split(' ')[0]}`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="estimatedCost">Est. Cost ($)</label>
            <input
              type="number"
              name="estimatedCost"
              value={formData.estimatedCost}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="1"
            />
          </div>


          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Detailed Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="What exactly is the problem?"
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              required
            />
          </div>

          <div className="pt-2 col-span-full">
            <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white rounded-md p-3 hover:bg-indigo-700 transition-colors shadow-md font-semibold"
            >
                {isEditing ? 'Update Ticket' : 'Create Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main Landlord Maintenance Component ---
const Maintenance = () => {
  // Initial data now includes tickets for multiple units
  const initialRequests = [
    { id: 1, ticket: 'TKT-001', issueType: 'Broken Tap', description: 'Kitchen sink tap is constantly dripping.', unit: 'Sunrise Apts - A4', status: 'In Progress', estimatedCost: 150, reportedOn: '2025-11-20' },
    { id: 2, ticket: 'TKT-002', issueType: 'No Electricity', description: 'Power outage in the living room and master bedroom.', unit: 'Westside Towers - 12', status: 'Pending', estimatedCost: 300, reportedOn: '2025-11-25' },
    { id: 3, ticket: 'TKT-003', issueType: 'Internet Issues', description: 'No internet connection for the last 48 hours.', unit: 'Sunrise Apts - A4', status: 'Done', estimatedCost: 50, reportedOn: '2025-11-15' },
    { id: 4, ticket: 'TKT-004', issueType: 'Leak', description: 'Water spot appearing on the ceiling of the downstairs unit.', unit: 'Valley View - 1A', status: 'Pending', estimatedCost: 500, reportedOn: '2025-11-27' },
    { id: 5, ticket: 'TKT-005', issueType: 'HVAC Failure', description: 'Air conditioning stopped working entirely.', unit: 'Midland Flats - C1', status: 'Pending', estimatedCost: 0, reportedOn: '2025-11-28' },
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [issueTypeFilter, setIssueTypeFilter] = useState('All'); 
  const [unitFilter, setUnitFilter] = useState('All'); 
  const [message, setMessage] = useState(null); 
  const [deleteId, setDeleteId] = useState(null); 

  // Dynamically get all unique units for filtering
  const allUnits = useMemo(() => {
      const units = [...new Set(requests.map(r => r.unit))].sort();
      return units;
  }, [requests]);


  // --- Filtering and Sorting Logic ---
  const filteredRequests = useMemo(() => {
    let list = requests.filter(req => {
     
      if (statusFilter !== 'All' && req.status !== statusFilter) {
        return false;
      }
      
   
      if (unitFilter !== 'All' && req.unit !== unitFilter) {
        return false;
      }
      
   
      if (issueTypeFilter !== 'All' && req.issueType !== issueTypeFilter) {
          return false;
      }

      
      if (searchQuery.trim() === '') {
        return true;
      }

      const query = searchQuery.toLowerCase();
      return (
        req.ticket.toLowerCase().includes(query) ||
        req.unit.toLowerCase().includes(query) ||
        req.description.toLowerCase().includes(query)
      );
    });

    
    const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Done': 3 };
    list.sort((a, b) => {
        if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(b.reportedOn) - new Date(a.reportedOn); 
    });

    return list;
  }, [requests, searchQuery, statusFilter, issueTypeFilter, unitFilter]);


  const handleOpenAddModal = () => {
    setEditingRequest(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (request) => {
    setEditingRequest(request);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingRequest) {
    
      setRequests(requests.map(r => r.id === editingRequest.id ? { ...r, ...formData } : r));
      setMessage({ type: 'success', text: `Ticket ${formData.ticket} updated successfully.` });
    } else {
      
      const newId = Math.max(...requests.map(r => r.id), 0) + 1;
      const newTicket = `TKT-${String(newId).padStart(3, '0')}`;
      const newRequest = { 
        ...formData, 
        id: newId, 
        ticket: newTicket,
      };
      setRequests([newRequest, ...requests]);
      setMessage({ type: 'success', text: `New maintenance request (${newTicket}) created.` });
    }
    setTimeout(() => setMessage(null), 4000);
  };

  
  const handleDelete = (requestId) => {
    setDeleteId(requestId);
  };
  
  const handleDeleteConfirmed = () => {
    if (deleteId) {
      const ticketNumber = requests.find(r => r.id === deleteId)?.ticket;
      setRequests(requests.filter(req => req.id !== deleteId));
      setMessage({ type: 'success', text: `Ticket ${ticketNumber} was successfully deleted.` });
      setDeleteId(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };


  return (
    <motion.div
      className="flex-1 p-4 sm:p-8 bg-gray-50 min-h-screen" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Maintenance Management</h2>
          <p className="text-gray-600 mt-1">View, filter, and manage all maintenance requests across your properties.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAddModal}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <Plus size={20} className="mr-2" /> New Ticket
        </motion.button>
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

      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
        
        {/* Search Bar */}
        <div className="relative flex-grow">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search ticket, unit, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* Unit Filter Dropdown */}
        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="flex-shrink-0 w-full lg:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-indigo-500 transition-colors text-gray-700 focus:ring-indigo-500"
        >
          <option value="All">All Units</option>
          {allUnits.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-shrink-0 w-full lg:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-indigo-500 transition-colors text-gray-700 focus:ring-indigo-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        
        {/* Issue Type Filter Dropdown */}
        <select
          value={issueTypeFilter}
          onChange={(e) => setIssueTypeFilter(e.target.value)}
          className="flex-shrink-0 w-full lg:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-indigo-500 transition-colors text-gray-700 focus:ring-indigo-500"
        >
          <option value="All">All Issues</option>
          {ISSUE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Ticket #
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Unit
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Issue Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Est. Cost
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                  Reported
                </th>
                <th scope="col" className="relative px-4 py-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <AnimatePresence initial={false}>
              <motion.tbody className="bg-white divide-y divide-gray-100">
                {filteredRequests.map((req) => {
                  return (
                  <motion.tr 
                    key={req.id} 
                    className="hover:bg-indigo-50 transition-colors cursor-pointer"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={() => handleOpenEditModal(req)} 
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">
                      {req.ticket}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {req.unit}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                      {req.issueType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${STATUS_COLORS[req.status]}`}>
                        {req.status === 'Pending' && <Clock size={14} className="mr-1 inline" />}
                        {req.status === 'In Progress' && <AlertTriangle size={14} className="mr-1 inline" />}
                        {req.status === 'Done' && <CheckCircle size={14} className="mr-1 inline" />}
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {req.estimatedCost > 0 ? (
                            <>
                                <DollarSign size={14} className="inline mr-1 text-green-600"/>{req.estimatedCost.toLocaleString()}
                            </>
                        ) : (
                            <span className="text-gray-500 italic">TBD</span>
                        )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500 hidden sm:table-cell">
                        <Calendar size={14} className="inline mr-1"/> {req.reportedOn}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                          <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleOpenEditModal(req); }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100"
                          title="Edit Status/Cost"
                          >
                          <Edit size={18} />
                          </motion.button>
                          <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleDelete(req.id); }}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                          title="Delete Ticket"
                          >
                          <Trash2 size={18} />
                          </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
                })}
              </motion.tbody>
            </AnimatePresence>
          </table>
          {filteredRequests.length === 0 && (
            <div className="p-10 text-center text-gray-500 bg-white">
              <AlertTriangle size={32} className="mx-auto text-gray-300 mb-2"/>
              <p className="font-semibold">No maintenance tickets found matching your criteria.</p>
              <p className="text-sm">Try adjusting your filters or create a new ticket.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h4 className="text-lg font-semibold text-red-700">Confirm Deletion</h4>
            <p className="text-gray-600">
              Are you sure you want to permanently delete this ticket from the system? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition-colors"
              >
                Delete Ticket
              </button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <RequestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            requestData={editingRequest}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Maintenance;