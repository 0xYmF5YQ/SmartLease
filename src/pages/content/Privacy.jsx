import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../../components/header'; 
import Footer from '../../components/footer';

const PrivacyPolicy = () => {
  // Framer Motion Variants for Staggering the Content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Section IDs for the Table of Contents
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'data-collection', title: '2. Information We Collect' },
    { id: 'data-use', title: '3. How We Use Your Information' },
    { id: 'data-sharing', title: '4. Sharing and Disclosure' },
    { id: 'security', title: '5. Data Security' },
    { id: 'rights', title: '6. Your Privacy Rights' },
    { id: 'changes', title: '7. Policy Updates' },
    { id: 'contact', title: '8. Contact Information' },
  ];

  const renderSection = (id, title, content) => (
    <motion.section id={id} className="mb-10 pt-4" variants={itemVariants}>
      <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 border-b border-indigo-500 pb-2">
        {title}
      </h3>
      {content}
    </motion.section>
  );

  return (
    <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 lg:p-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* --- Header Section (Animated) --- */}
        <motion.header
          className="text-center mb-12 border-b-2 border-indigo-200 dark:border-indigo-700 pb-6 p-8"
          variants={itemVariants}
        >
          <h1 className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            SmartLease
            <br />
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.header>

        {/* --- Table of Contents (TOC) --- */}
        <motion.section className="mb-12 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg" variants={itemVariants}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Table of Contents
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-indigo-700 dark:text-indigo-400">
            {sections.map(section => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`} 
                  className="hover:underline font-medium transition duration-150"
                  onClick={(e) => { // Smooth scroll on click
                    e.preventDefault();
                    document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* --- 1. Introduction --- */}
        {renderSection('introduction', '1. Introduction', 
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to SmartLease. We are deeply committed to protecting your privacy. This policy outlines our practices regarding the collection, use, and disclosure of your information when you use our service. By using the SPMS, you agree to the practices described in this policy.
          </p>
        )}

        {/* --- 2. Information We Collect --- */}
        {renderSection('data-collection', '2. Information We Collect',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We collect information to provide and improve our services. The types of data collected include:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>
                Registration and KYC Data: Your Name, address, email, phone number, and official identification documents (National ID/Passport) required for Landlord, Agent, and Tenant verification.
              </li>
              <li>
                Financial Data: Rental amounts, payment history, and payment credentials (e.g., M-PESA paybill numbers, card tokenization data handled by third-party processors).
              </li>
              <li>
                Property Data: Details of units, lease agreements (start/end dates), and maintenance requests.
              </li>
              <li>
                Communication Data: Content of SMS, WhatsApp, and Email reminders sent or received through our integrated communication services.
              </li>
              <li>
                Technical Data: Your IP address, browser details, device information, and usage patterns within the SPMS platform.
              </li>
            </ul>
          </>
        )}

        {/* --- 3. How We Use Your Information --- */}
        {renderSection('data-use', '3. How We Use Your Information',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Your information is used to provide the core services of the SPMS, specifically:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>
                Service Fulfillment:To process online rent payments, generate receipts, and manage lease automation.
              </li>
              <li>
                Account Management: To verify your identity, maintain your dashboard, and process maintenance tickets.
              </li>
              <li>
                Communication: To send automated reminders and critical security alerts.
              </li>
              <li>
                Analytics and Improvement: To power the Smart Rent Predictions (AI) feature and analyze system performance.
              </li>
              <li>
                Legal Compliance: To prevent fraud and comply with legal obligations.
              </li>
            </ul>
          </>
        )}
        
        {/* --- 4. Sharing and Disclosure --- */}
        {renderSection('data-sharing', '4. Sharing and Disclosure',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We do not sell your personal data. We share data only in the following specific instances to run the service:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>
                Third-Party Providers: With trusted vendors (e.g., M-PESA/PayPal for payments, Twilio/Africa’s Talking for SMS/WhatsApp) necessary to perform functions on our behalf.
              </li>
              <li>
                Inter-Platform Sharing: Tenant data is shared with their specific Landlord/Agent, and vice versa, as required for contract and service performance.
              </li>
              <li>
                Legal Compliance: When required by law or to protect the rights, property, and safety of our company, users, or the public.
              </li>
            </ul>
          </>
        )}
        
        {/* --- 5. Data Security --- */}
        {renderSection('security', '5. Data Security',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement high-level administrative, technical, and physical safeguards to protect your data. All financial transactions are secured using SSL encryption, and sensitive data is stored using MongoDB's built-in security features. However, no system is 100% secure, and you are responsible for maintaining the confidentiality of your password and account information.
          </p>
        )}
        
        {/* --- 6. Your Privacy Rights --- */}
        {renderSection('rights', '6. Your Privacy Rights',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Access: Review the personal data we hold about you.</li>
              <li>Rectification: Request correction of inaccurate data.</li>
              <li>Erasure: Request deletion of your account and personal data, subject to legal requirements.</li>
              <li>Objection: Object to our processing of your data for specific purposes.</li>
            </ul>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              To exercise these rights, please contact us using the details in Section 8.
            </p>
          </>
        )}

        {/* --- 7. Policy Updates --- */}
        {renderSection('changes', '7. Policy Updates',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We will update this policy as necessary to remain compliant with relevant laws and reflect changes to our service. We will notify you of any material changes by posting the updated policy and revising the "Last Updated" date.
          </p>
        )}

        {/* --- 8. Contact Information --- */}
        {renderSection('contact', '8. Contact Information',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For questions or concerns regarding this Privacy Policy, please contact our Data Protection Officer:
            </p>
            <p className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold">
              Email: support@SmartLease.com
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold">
              Address: Nyumba Towers-Nairobi,Kenya.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You can also reach us via our dedicated{' '}
              <MotionLink 
                  to="/content/contact" 
                  className="text-indigo-600 hover:underline font-bold transition duration-150" 
                  whileHover={{ scale: 1.02 }}
              >
                  Contact Page
              </MotionLink>.
            </p>
          </>
        )}
        
      </motion.div>
      <Footer/>
    </div>
  );
};


const MotionLink = motion(Link); 
export default PrivacyPolicy;