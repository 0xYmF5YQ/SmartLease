import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import Header from '../../components/header'; 
import Footer from '../../components/footer'; 
const features = [
  {
    icon: ShieldCheck,
    title: 'Security & Trust',
    description: 'We prioritize data security and ensure every transaction, from rent payment to lease signing, is encrypted and verifiable.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'Leverage our AI-powered rent predictions and detailed reports to maximize your revenue and plan your portfolio growth.',
  },
  {
    icon: Users,
    title: 'Seamless Communication',
    description: 'Automated reminders via SMS, WhatsApp, and Email keep tenants informed, reducing late payments and administrative load.',
  },
  {
    icon: Zap,
    title: 'End-to-End Automation',
    description: 'From generating digital leases to instant payment receipts and maintenance ticketing, we handle the tedious work for you.',
  },
];

// Framer Motion Variants for Staggering the Content
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const About = () => {
  return (
     <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
      <motion.div
        className="max-w-7xl mx-auto"
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
            About Us
          </h2>
          <p className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
            Redefining Property Management.
          </p>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            We build the bridge between landlords, managers, and tenants using modern technology, ensuring transparency and efficiency in every interaction.
          </p>
        </motion.header>

        {/* --- Core Philosophy (Animated Text Block) --- */}
        <motion.section
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 lg:p-12 mb-16"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-indigo-500 pb-2">
            The Vision Behind SmartLease
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            In a market often bogged down by manual processes, late payments, and poor communication, we saw an opportunity to introduce true intelligence. Our Smart Property Management System isn't just a ledger; it's an end-to-end platform that automates reminders, predicts rental trends using (AI), and facilitates seamless digital payments (M-PESA, PayPal, Card). We empower landlords to focus on growth and provide tenants with a modern, transparent rental experience.
          </p>
        </motion.section>

        {/* --- Features Grid (Animated & Interactive) --- */}
        <motion.section variants={itemVariants}>
          <h3 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Why Choose Our Platform?
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 1 }} 
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon className="h-10 w-10 text-indigo-600 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* --- Call to Action (Animated Footer) --- */}
        <motion.footer
          className="mt-20 text-center p-8"
          variants={itemVariants}
        >
          <p className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-6">
            Ready to experience the future of property management?
          </p>
          <motion.button
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.5)' }} // Interactive Button
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.footer>
      </motion.div>
       <Footer/>
    </div>
  );
};

export default About;