import React from 'react';
import { motion } from 'framer-motion';
import {ShieldCheck,Zap,Wrench,Handshake,ArrowRight,ClipboardList,Users,BarChart,Rocket,Palette,BellRing,} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/header'; 
import Footer from '../components/footer'; 

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};



const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };
const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };
const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 } },
  };
const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
const FloatingImage = () => {

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 opacity-10"
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-100 rounded-full filter blur-3xl opacity-50" />
      <div className="absolute inset-x-10 inset-y-10 bg-gradient-to-tl from-purple-200 to-pink-100 rounded-full filter blur-3xl opacity-50" />
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <FloatingImage /> 

      <Header />

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6"
        >
          Effortless Property Management.
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Maximized Profit.
          </span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Revolutionize how you manage rentals. Automate payments, tenants, and maintenance with PropManager – the smart solution for modern landlords.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleUp}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1"
          >
            <span>Get Started Free</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/tenants"
            className="flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 text-lg font-bold rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
          >
            <span>Watch Demo</span>
          </Link>
        </motion.div>
      </section>

      
      <section className="relative z-10 py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
      
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16"
          >
            Unlock Your Property's Full Potential
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              { icon: ShieldCheck, title: 'Secure Online Payments', description: 'Tenants pay rent directly through M-PESA, PayPal, or Card. Instant receipts.' },
              { icon: BellRing, title: 'Automated Reminders', description: 'Never chase rent again. SMS, WhatsApp, and Email alerts keep everyone on track.' },
              { icon: ClipboardList, title: 'Smart Tenant Management', description: 'Track leases, balances, and communication history in one centralized dashboard.' },
              { icon: Wrench, title: 'Streamlined Maintenance', description: 'Tenants report issues easily. Track status, costs, and resolution from your phone.' },
              { icon: BarChart, title: 'Financial Overview', description: 'Get real-time insights into your income, expenses, and profit margins.' },
              { icon: Handshake, title: 'Digital Lease Agreements', description: 'Generate, sign, and store legal documents securely online.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-start hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     
      <section className="relative z-10 py-20 md:py-32 bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInLeft}
            className="order-2 lg:order-1 relative h-96 lg:h-auto min-h-[300px]"
          >
         
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-2xl flex items-center justify-center">
                <Palette size={80} className="text-white opacity-20" />
                <span className="text-xl font-bold opacity-50">Dashboard Preview Here</span>
            </div>
            <motion.div
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
              initial={{ y: 0, x: 0 }}
              animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-10 -left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
              initial={{ y: 0, x: 0 }}
              animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInRight}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Ready to <span className="text-indigo-200">Transform</span> Your Rentals?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-md">
              Join thousands of smart landlords already saving time, reducing stress, and maximizing their rental income with SmartLease.
            </p>
            <Link
              to="/signup"
              className="flex items-center space-x-2 px-8 py-4 bg-white text-indigo-700 text-lg font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:-translate-y-1"
            >
              <span>Start Your Free Trial</span>
              <Rocket size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials  */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
        
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className="text-lg italic text-gray-700 mb-6">
                "SmartLease has saved me countless hours. The automated reminders are a game-changer!"
              </p>
              <div className="font-bold text-indigo-600">- John D., Landlord of 5 properties</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className="text-lg italic text-gray-700 mb-6">
                "Finally, a system that truly understands landlord needs. Highly recommend!"
              </p>
              <div className="font-bold text-indigo-600">- Sarah K., Property Manager</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className="text-lg italic text-gray-700 mb-6">
                "My occupancy rate went up, and late payments are almost non-existent. Thank you!"
              </p>
              <div className="font-bold text-indigo-600">- David M., Real Estate Investor</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default LandingPage;