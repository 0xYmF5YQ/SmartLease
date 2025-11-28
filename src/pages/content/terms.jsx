import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/header'; 
import Footer from '../../components/footer';
import { Link } from 'react-router-dom'; 

const TermsOfUse = () => {
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
    { id: 'agreement', title: '1. Your Agreement' },
    { id: 'changes-to-terms', title: '2. Changes to Terms' },
    { id: 'access-and-use', title: '3. Access and Use of the Service' },
    { id: 'user-accounts', title: '4. User Accounts' },
    { id: 'payments-billing', title: '5. Payments and Billing' },
    { id: 'maintenance-requests', title: '6. Maintenance Requests' },
    { id: 'lease-automation', title: '7. Lease Automation' },
    { id: 'third-party-services', title: '8. Third-Party Services' },
    { id: 'prohibited-activities', title: '9. Prohibited Activities' },
    { id: 'intellectual-property', title: '10. Intellectual Property Rights' },
    { id: 'disclaimer-of-warranties', title: '11. Disclaimer of Warranties' },
    { id: 'limitation-of-liability', title: '12. Limitation of Liability' },
    { id: 'indemnification', title: '13. Indemnification' },
    { id: 'governing-law', title: '14. Governing Law and Jurisdiction' },
    { id: 'termination', title: '15. Termination' },
    { id: 'contact', title: '16. Contact Information' },
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
          className="text-center mb-12 border-b-2 border-indigo-200 dark:border-indigo-700 pb-6"
          variants={itemVariants}
        >
          <h1 className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
            Terms of Use
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

        {/* --- 1. Your Agreement --- */}
        {renderSection('agreement', '1. Your Agreement', 
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms of Use govern your access to and use of the SmartLease, provided by SmartLease. By accessing or using our Service, you agree to be bound by these Terms and our <MotionLink to="/content/privacy" className="text-indigo-600 hover:underline font-bold">Privacy Policy</MotionLink>. If you do not agree to these Terms, you may not use the Service.
          </p>
        )}

        {/* --- 2. Changes to Terms --- */}
        {renderSection('changes-to-terms', '2. Changes to Terms',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on the Service and updating the "Last Updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
          </p>
        )}

        {/* --- 3. Access and Use of the Service --- */}
        {renderSection('access-and-use', '3. Access and Use of the Service',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The SmartLease is designed for use by landlords, property managers/agents, and tenants for managing residential and commercial properties. You must be at least 18 years old to use this Service.
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Eligibility:You affirm that you are fully able and competent to enter into these terms, conditions, obligations, affirmations, representations, and warranties.</li>
              <li>Lawful Use: You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Service.</li>
            </ul>
          </>
        )}

        {/* --- 4. User Accounts --- */}
        {renderSection('user-accounts', '4. User Accounts',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You will need to register for an account to access certain features of the SmartLease.
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Account Creation: You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
              <li>Account Security: You are responsible for safeguarding your password and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your password or account.</li>
              <li>Account Types: Specific terms may apply to Landlord, Tenant, and Agent accounts, as detailed within the Service.</li>
            </ul>
          </>
        )}

        {/* --- 5. Payments and Billing --- */}
        {renderSection('payments-billing', '5. Payments and Billing',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The SPMS facilitates online rent payments and other financial transactions.
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Payment Processing:We use third-party payment processors e.g., M-PESA, PayPal, Card Processors for all transactions. Your use of these services is subject to their respective terms and conditions.</li>
              <li>Fees: All fees and charges for using the Service, including any transaction fees, will be clearly disclosed.</li>
              <li>Accuracy: You are responsible for ensuring the accuracy of payment details and confirming successful transactions.</li>
            </ul>
          </>
        )}

        {/* --- 6. Maintenance Requests --- */}
        {renderSection('maintenance-requests', '6. Maintenance Requests',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tenants can submit maintenance requests through the Service.
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Submission: Requests should be detailed and accurate. Misuse of the maintenance request system is prohibited.</li>
              <li>Response: While the SPMS facilitates the submission, response times and resolution are ultimately the responsibility of the respective landlord or property manager.</li>
            </ul>
          </>
        )}

        {/* --- 7. Lease Automation --- */}
        {renderSection('lease-automation', '7. Lease Automation',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our lease automation feature allows for generation and digital signing of lease agreements. While the Service provides templates and facilitates the signing process, it is your responsibility to ensure the legal validity and completeness of any generated lease agreement for your jurisdiction. We recommend seeking independent legal advice for all lease documents.
          </p>
        )}

        {/* --- 8. Third-Party Services --- */}
        {renderSection('third-party-services', '8. Third-Party Services',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The SmartLease may integrate with or link to third-party websites or services e.g., Twilio, Africa's Talking for SMS/WhatsApp, payment gateways. We do not endorse and are not responsible for the content, privacy policies, or practices of any third-party websites or services. You access and use these at your own risk.
          </p>
        )}

        {/* --- 9. Prohibited Activities --- */}
        {renderSection('prohibited-activities', '9. Prohibited Activities',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-3">
              <li>Use the Service for any illegal or unauthorized purpose.</li>
              <li>Impersonate any person or entity.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>Attempt to gain unauthorized access to any portion of the Service.</li>
              <li>Upload or transmit any malicious code, viruses, or other harmful materials.</li>
            </ul>
          </>
        )}

        {/* --- 10. Intellectual Property Rights --- */}
        {renderSection('intellectual-property', '10. Intellectual Property Rights',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            All content, features, and functionality on the SmartLease including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof are owned by SmartLease, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        )}

        {/* --- 11. Disclaimer of Warranties --- */}
        {renderSection('disclaimer-of-warranties', '11. Disclaimer of Warranties',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.
          </p>
        )}

        {/* --- 12. Limitation of Liability --- */}
        {renderSection('limitation-of-liability', '12. Limitation of Liability',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            IN NO EVENT SHALL SMARTLEASE, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY.
          </p>
        )}

        {/* --- 13. Indemnification --- */}
        {renderSection('indemnification', '13. Indemnification',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You agree to defend, indemnify, and hold harmless SMARTLEASE, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
          </p>
        )}

        {/* --- 14. Governing Law and Jurisdiction --- */}
        {renderSection('governing-law', '14. Governing Law and Jurisdiction',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the Republic of Kenya without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Nairobi,Kenya.
          </p>
        )}

        {/* --- 15. Termination --- */}
        {renderSection('termination', '15. Termination',
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        )}

        {/* --- 16. Contact Information --- */}
        {renderSection('contact', '16. Contact Information',
          <>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold">
              Email: support@SmartLease.com
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold">
              Address: Nyumba Towers-Nairobi,Kenya.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You can also visit our{' '}
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
export default TermsOfUse;