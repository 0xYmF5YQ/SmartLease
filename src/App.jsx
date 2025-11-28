import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; 
import Dashboard, { DashboardHome } from './pages/landlord/dashboard';
import LandingPage from './pages/landing-page';
import FeaturesPage from './pages/content/features';
import PricingPage from './pages/content/pricing';
import ContactPage from './pages/content/contact';
import About from './pages/content/about';
import FAQ from './pages/content/faq';
import PrivacyPolicy from './pages/content/privacy';
import TermsOfService from './pages/content/terms';
import Tenants from './pages/landlord/tenants';
import Properties from './pages/landlord/properties';
import Maintenance from './pages/landlord/maintenance';
import Payments from './pages/landlord/Payments';
import Settings from './pages/Landlord/Settings';
import LoginForm from './pages/auth/login';
import SignUpForm from './pages/auth/sign-up';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>

          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/sign-up" element={<SignUpForm />} />
          
          <Route path="/content/features" element={<FeaturesPage />} />
          <Route path="/content/pricing" element={<PricingPage />} />
          <Route path="/content/contact" element={<ContactPage />} />
          <Route path="/content/privacy" element={<PrivacyPolicy />} />
          <Route path="/content/terms" element={<TermsOfService />} />
          <Route path="/content/about" element={<About />} />
          <Route path="/content/faq" element={<FAQ />} />

          {/* ---------- DASHBOARD PRIVATE ---------- */}
         
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="payments" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="settings" element={<Settings />} />
            <Route path="properties" element={<Properties />} />
            <Route path="tenants" element={<Tenants />} />
          </Route>

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;