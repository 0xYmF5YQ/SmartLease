import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Tenants from './pages/tenants';
import LandingPage from './pages/landing-page';
import { useState } from "react";
import { AnimatePresence } from 'framer-motion'; 

const Payments = () => <div className="p-8 ml-64"><h2 className="text-2xl font-bold">Payments Page</h2></div>;
const Maintenance = () => <div className="p-8 ml-64"><h2 className="text-2xl font-bold">Maintenance Page</h2></div>;
const Settings = () => <div className="p-8 ml-64"><h2 className="text-2xl font-bold">Settings Page</h2></div>;
const Properties = () => <div className="p-8 ml-64"><h2 className="text-2xl font-bold">Properties Page</h2></div>;
const LoginPage = () => <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">Login Page Content Here</div>;
const SignupPage = () => <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">Signup Page Content Here</div>;


function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <AnimatePresence mode="wait"> 
        <Routes>
          {isLoggedIn ? (
            
            <Route path="/" element={<Dashboard />}>
              <Route path="tenants" element={<Tenants />} />
              <Route path="payments" element={<Payments />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="settings" element={<Settings />} />
              <Route path="properties" element={<Properties />} />
              
            </Route>
          ) : (
            
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
             
              <Route path="/features" element={<div>Features Page</div>} />
              <Route path="/pricing" element={<div>Pricing Page</div>} />
              <Route path="/contact" element={<div>Contact Page</div>} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/privacy" element={<div>Privacy Policy</div>} />
              <Route path="/terms" element={<div>Terms of Service</div>} />
              <Route path="/about" element={<div>About Us</div>} />
              <Route path="/faq" element={<div>FAQ Page</div>} />

              
              <Route path="*" element={<LandingPage />} /> 
            </>
          )}
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;