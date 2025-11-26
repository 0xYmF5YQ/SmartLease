import React from 'react';
import { LayoutDashboard, Users, CreditCard, Wrench, Settings, LogOut, Home, Building } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const sidebarVariants = {
  hidden: { x: -250 },
  visible: { x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const Sidebar = ({ userRole = 'landlord' }) => { 
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Properties', icon: Building, path: '/properties' }, 
    { name: 'Tenants', icon: Users, path: '/pages/tenants' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Maintenance', icon: Wrench, path: '/maintenance' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <motion.div
      className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 shadow-lg z-20"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-600">SmartLease</h1>
        <span className="text-xs text-gray-500 capitalize">{userRole} Dashboard</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <motion.button 
          className="flex items-center space-x-3 text-red-500 w-full px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
          whileHover={{ x: 5 }} 
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;