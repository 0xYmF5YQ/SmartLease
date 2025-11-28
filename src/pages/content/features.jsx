import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Zap, Bell, DollarSign, FileText } from 'lucide-react';
import Header from '../../components/header'; 
import Footer from '../../components/footer'; 

// --- Configuration for Framer Motion Animations ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 
    }
  }
};


const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100 
    } 
  }
};


const hoverEffect = {
  scale: 1.05,
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  transition: { type: "spring", stiffness: 300 }
};

// --- Feature Card Component ---

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 cursor-pointer"
      variants={itemVariants}
      whileHover={hoverEffect}
    >
      
      <div className="p-3 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// --- Main Feature Page Component ---

const FeaturesPage = () => {
  const features = [
    { 
      icon: Home, 
      title: 'Landlord Dashboard', 
      description: 'Get an instant overview of rent collection, pending balances, and maintenance issues. Visualize data with Chart.js analytics.' 
    },
    { 
      icon: DollarSign, 
      title: 'Online Rent Payment', 
      description: 'Seamless integration with M-PESA STK Push, PayPal, and Card payments. Automatic, instant PDF receipt generation.' 
    },
    { 
      icon: Bell, 
      title: 'Automated Reminders', 
      description: 'Send timely reminders via SMS, WhatsApp, and Email. Reduce late payments and improve tenant communication effortlessly.' 
    },
    { 
      icon: Users, 
      title: 'Tenant Management', 
      description: 'Digital KYC, lease tracking, and centralized documents. Manage your entire portfolio from one screen.' 
    },
    { 
      icon: Zap, 
      title: 'Maintenance Requests', 
      description: 'Tenants raise tickets instantly. Track status (Pending, In Progress, Done) and manage estimated repair costs.' 
    },
    { 
      icon: FileText, 
      title: 'Lease Automation', 
      description: 'Generate legally compliant lease forms from templates, fill details, and sign digitally—all within the platform.' 
    },
  ];

  return (
    
    <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
      <div className="max-w-7xl mx-auto">
        
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Your Smart Property Solution
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Features Built for Modern Property Management
          </p>
          <p className="mt-4 text-xl text-gray-500">
            Automate, analyze, and optimize your portfolio with our advance modern powerhouse system.
          </p>
        </motion.header>

        {/* Features Grid with Scroll Animation */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
         
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }} 
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>

        {/* Extra Feature Callout */}
        <div className="mt-20 p-8">
            <motion.div
                className="p-8 bg-indigo-600 rounded-xl text-white text-center shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h3 className="text-3xl font-bold mb-2"> Smart Rent Predictions </h3>
                <p className="text-indigo-200">
                    Go beyond tracking. Predict next month's rent collection and identify high-risk tenants using integrated AI.
                </p>
            </motion.div>
        </div>

      </div>

      <Footer/>
    </div>
  );
};

export default FeaturesPage;