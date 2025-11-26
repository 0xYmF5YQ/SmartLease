import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Header = () => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative z-10 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto"
    >
      <div className="text-3xl font-extrabold text-indigo-700">SmartLease</div>
      <div className="flex items-center space-x-6">
        <Link to="/features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Features
        </Link>
        <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Pricing
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Contact
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Login
        </Link>
      </div>
    </motion.nav>
  );
};

export default Header;