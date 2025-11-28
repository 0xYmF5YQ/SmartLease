import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="text-3xl font-extrabold text-indigo-400 mb-6">SmartLease</div>
          <p className="text-gray-400 leading-relaxed">
            Your trusted partner for modern property management.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/content/features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
            <li><Link to="/content/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
            <li><Link to="/content/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
            <li><Link to="/content/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-lg mb-6">Legal</h4>
          <ul className="space-y-3">
            <li><Link to="/content/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/content/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-lg mb-6">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Mail size={18} className="text-indigo-400" />
              <span>support@Smartlease.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={18} className="text-indigo-400" />
              <span>+254 791 583 518</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={18} className="text-indigo-400" />
              <span>Nairobi, Kenya</span>
            </li>
            <li className="flex items-center space-x-2">
              <MessageSquare size={18} className="text-indigo-400" />
              <span>Chat with us</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-indigo-400 mt-16 border-t border-gray-800 pt-8">
        &copy; {new Date().getFullYear()} SmartLease. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;