import React from 'react';
import { motion } from 'framer-motion';
import { Check, TrendingUp, Briefcase, Zap } from 'lucide-react'; 
import Header from '../../components/header'; 
import Footer from '../../components/footer';

// --- FRAMER MOTION CONFIG ---

// Container for staggered entry
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Item animation (slide up and fade in)
const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 80 } 
  }
};

// Pricing Card Hover Effect
const cardHover = {
    scale: 1.03,
    y: -5,
    boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 300 }
};

// --- Pricing Card Component ---

const PricingCard = ({ plan, price, features, isPopular, icon: Icon }) => (
    <motion.div 
        className={`relative flex flex-col p-8 rounded-xl shadow-2xl transition duration-300 ${isPopular ? 'bg-indigo-600 text-white transform scale-[1.02] border-4 border-indigo-300' : 'bg-white text-gray-800 border border-gray-100'}`}
        variants={fadeInUp}
        whileHover={cardHover}
    >
        {isPopular && (
            <div className="absolute top-0 right-0 -mt-4 -mr-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold uppercase rounded-full tracking-wider shadow-lg">
                Most Popular
            </div>
        )}
        
        <div className="flex items-center space-x-3 mb-4">
            <Icon className={`w-8 h-8 ${isPopular ? 'text-white' : 'text-indigo-600'}`} />
            <h3 className="text-2xl font-bold">{plan}</h3>
        </div>
        
        <p className={`mt-4 ${isPopular ? 'text-indigo-200' : 'text-gray-500'}`}>Perfect for {plan} property owners.</p>
        
        <p className="mt-6">
            <span className={`text-5xl font-extrabold ${isPopular ? 'text-white' : 'text-gray-900'}`}>{price}</span>
            <span className={`text-xl font-medium ${isPopular ? 'text-indigo-200' : 'text-gray-500'}`}>/month</span>
        </p>

        <a href="#" className={`mt-8 block w-full text-center py-3 rounded-lg font-semibold transition duration-300 ${isPopular ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            Start Free Trial
        </a>

        <ul role="list" className={`mt-8 space-y-4 flex-1 ${isPopular ? 'text-indigo-100' : 'text-gray-600'}`}>
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <Check className={`flex-shrink-0 w-5 h-5 mt-1 ${isPopular ? 'text-yellow-300' : 'text-indigo-500'}`} />
                    <span className="ml-3">{feature}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

// --- Pricing Page Component ---

const PricingPage = () => {
    const pricingPlans = [
        {
            plan: 'Starter',
            price: '$29',
            icon: TrendingUp,
            isPopular: false,
            features: [
                'Up to 10 Units',
                'Landlord Dashboard Access',
                'Maintenance Tracking',
                'Basic SMS Reminders',
                'Online Payments (M-PESA/Card)',
            ],
        },
        {
            plan: 'Pro Manager',
            price: '$79',
            icon: Briefcase,
            isPopular: true,
            features: [
                'Up to 50 Units',
                'Agent/Manager Module',
                'Automated WhatsApp/Email',
                'Lease Automation',
                'Priority Support',
                'Advanced Analytics',
            ],
        },
        {
            plan: 'Enterprise',
            price: '$199',
            icon: Zap,
            isPopular: false,
            features: [
                'Unlimited Units',
                'Custom AI Predictions',
                'Dedicated Account Manager',
                'API Access',
                'Custom Integrations',
                'Everything in Pro Manager',
            ],
        },
    ];

    return (
         <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-8">
                {/* Header Section */}
                <motion.header 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Transparent Pricing
                    </h2>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Find the perfect plan for your portfolio.
                    </p>
                </motion.header>

                {/* Pricing Grid */}
                <motion.div 
                    className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </motion.div>
            </div>
            <Footer/>
        </div>
    );
};

export default PricingPage;