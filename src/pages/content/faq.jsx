import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react'; 
import Header from '../../components/header'; 
import Footer from '../../components/footer';
import { Link } from "react-router-dom";


const MotionLink = motion(Link);
const faqItems = [
  {
    question: 'What is SmartLease?',
    answer: 'SmartLease is an all-in-one digital platform designed to streamline property management tasks for landlords, agents, and tenants. It covers everything from rent collection, lease management, maintenance requests, to automated communication and smart analytics.',
  },
  {
    question: 'How does the online rent payment work?',
    answer: 'Our system integrates with popular payment gateways like M-PESA STK Push, PayPal, and credit/debit card processors. Tenants can securely pay their rent online, and landlords receive instant notifications and automated digital receipts.',
  },
  {
    question: 'Can tenants submit maintenance requests through the platform?',
    answer: 'Absolutely! Tenants can easily raise maintenance issues directly within the platform. Landlords and managers receive immediate notifications, can track the status (pending, in progress, done), and even assign estimated costs to tickets.',
  },
  {
    question: 'What kind of automated reminders are available?',
    answer: 'We offer customizable automated reminders for rent due dates, overdue payments, and payment confirmations. These reminders can be sent via SMS, WhatsApp, and Email, ensuring tenants are always informed.',
  },
  {
    question: 'What are the benefits of Lease Automation?',
    answer: 'Lease Automation allows landlords to generate professional lease agreements from templates, fill in tenant details digitally, facilitate e-signatures, and send PDF copies directly through the system. This saves time, reduces paperwork, and ensures legal compliance.',
  },
  {
    question: 'How does the AI-powered rent prediction feature work?',
    answer: 'Our AI model analyzes historical data, market trends, and property-specific information to provide insights into future rent collections, predict potential payment delays, and help optimize rental pricing strategies.',
  },
  {
    question: 'Is there a mobile app for tenants and landlords?',
    answer: 'Yes, we are developing dedicated mobile applications for both tenants and landlords using React Native, providing convenient on-the-go access to all platform features.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Framer Motion Variants for Staggering and Accordion Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const answerVariants = {
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
     <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* --- Header Section (Animated) --- */}
        <motion.header
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Got Questions?
          </h2>
          <p className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Find quick answers to the most common inquiries about SmartLease.
          </p>
        </motion.header>

        {/* --- FAQ Accordion (Animated & Interactive) --- */}
        <motion.section variants={itemVariants}>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-indigo-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </h4>
                  <motion.span
                    initial={false}
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-indigo-600 flex-shrink-0"
                  >
                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={answerVariants}
                      className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Call to Action / Footer (Animated) --- */}
        <motion.footer
          className="mt-20 text-center p-8"
          variants={itemVariants}
        >
          <p className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-6">
            Still have questions? Don't hesitate to reach out!
          </p>
          <MotionLink
            to="/content/contact" 
            className="inline-flex px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </MotionLink>
        </motion.footer>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default FAQ;