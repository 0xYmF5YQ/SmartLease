import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Home, MapPin, Building, Bed, Users, X, Edit, Trash2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Reusable Modal Component for Add/Edit Property
const PropertyModal = ({ isOpen, onClose, propertyData, onSave }) => {
  const isEditing = !!propertyData;
  const title = isEditing ? 'Edit Property Details' : 'Add New Property';

  const [formData, setFormData] = useState(propertyData || {
    name: '',
    location: '',
    totalUnits: '',
    occupiedUnits: '',
    status: 'Active', // Default status
  });

  // Reset form data if propertyData changes (e.g., when opening for a different property)
  useEffect(() => {
    if (isOpen) {
      setFormData(propertyData || {
        name: '',
        location: '',
        totalUnits: '',
        occupiedUnits: '',
        status: 'Active',
      });
    }
  }, [propertyData, isOpen]);

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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Property Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </label>

          <div className="flex space-x-4">
            <label className="block flex-1">
              <span className="text-sm font-medium text-gray-700">Total Units</span>
              <input
                type="number"
                name="totalUnits"
                value={formData.totalUnits}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </label>
            <label className="block flex-1">
              <span className="text-sm font-medium text-gray-700">Occupied Units</span>
              <input
                type="number"
                name="occupiedUnits"
                value={formData.occupiedUnits}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Archived">Archived</option>
            </select>
          </label>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Add Property'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const Properties = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: 'Sunrise Apartments', location: 'Nairobi CBD', totalUnits: 20, occupiedUnits: 18, status: 'Active' },
    { id: 2, name: 'Westside Towers', location: 'Westlands', totalUnits: 15, occupiedUnits: 10, status: 'Maintenance' },
    { id: 3, name: 'Midland Flats', location: 'Kilimani', totalUnits: 10, occupiedUnits: 10, status: 'Active' },
    { id: 4, name: 'Valley View Homes', location: 'Lavington', totalUnits: 5, occupiedUnits: 3, status: 'Active' },
    { id: 5, name: 'Coastal Breeze Villas', location: 'Mombasa', totalUnits: 8, occupiedUnits: 0, status: 'Upcoming' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null); // null for Add, object for Edit
  const [deleteId, setDeleteId] = useState(null); // For delete confirmation

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Status Filter
      if (statusFilter !== 'All' && property.status !== statusFilter) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() === '') {
        return true;
      }
      const query = searchQuery.toLowerCase();
      return (
        property.name.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query)
      );
    });
  }, [properties, searchQuery, statusFilter]);

  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleSaveProperty = (formData) => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...p, ...formData } : p));
    } else {
      const newId = Math.max(...properties.map(p => p.id), 0) + 1; // Simple ID generation
      setProperties([...properties, { ...formData, id: newId }]);
    }
  };

  const handleDeleteConfirmed = () => {
    if (deleteId) {
      setProperties(properties.filter(property => property.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleCloseDeletePrompt = () => setDeleteId(null);

  return (
    <motion.div
      className="flex-1 p-8 bg-gray-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200"
        variants={itemVariants}
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Properties</h2>
          <p className="text-gray-600">Manage all your properties and their details.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center px-5 py-2 mt-4 md:mt-0 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" /> Add New Property
        </button>
      </motion.header>

      {/* Search and Filter */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        variants={itemVariants}
      >
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Filter by Status:</span>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Archived">Archived</option>
            </select>
        </div>
      </motion.div>

      {/* Property Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'Active' ? 'bg-green-100 text-green-800' :
                      property.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      property.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="text-gray-600 flex items-center text-sm mb-2">
                    <MapPin size={16} className="mr-2 text-indigo-500" /> {property.location}
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mt-4">
                    <div className="flex items-center">
                      <Building size={16} className="mr-2 text-gray-500" /> Total Units: <span className="font-medium ml-1">{property.totalUnits}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-gray-500" /> Occupied: <span className="font-medium ml-1">{property.occupiedUnits}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <Bed size={16} className="mr-2 text-gray-500" /> Vacant: <span className="font-medium ml-1">{property.totalUnits - property.occupiedUnits}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2 border-t pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenEditModal(property)}
                    className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Edit Property"
                  >
                    <Edit size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDeleteId(property.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="md:col-span-2 lg:col-span-3 xl:col-span-4 p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No properties found matching your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add/Edit Property Modal */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyData={editingProperty}
        onSave={handleSaveProperty}
      />

      {/* Delete Confirmation Modal (Inline) */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm space-y-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h4 className="text-lg font-semibold text-red-700">Confirm Deletion</h4>
              <p className="text-gray-600">
                Are you sure you want to delete this property? This action cannot be undone.
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
      </AnimatePresence>
    </motion.div>
  );
};

export default Properties;