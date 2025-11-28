import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react'; 
import Header from '../../components/header'; 
import Footer from '../../components/footer';

// --- FRAMER MOTION CONFIG ---

// Fade in animation for the whole section
const sectionFadeIn = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6 } 
  }
};

// --- Contact Page Component ---

const ContactPage = () => {
    return (
         <div className="font-sans antialiased bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900 overflow-x-hidden relative">
      <Header/>
            
            <motion.div 
                className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12"
                variants={sectionFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                
                {/* Left Column: Info */}
                <div className="p-8">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Get In Touch
                    </h2>
                    <h3 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Ready to Upgrade Your Management?
                    </h3>
                    <p className="mt-4 text-lg text-gray-500">
                        We'd love to discuss how our Smart Property Management System can optimize your operations and increase your revenue. Reach out to our team today.
                    </p>
                    <dl className="mt-10 space-y-6 text-base text-gray-600">
                        <div className="flex items-start">
                            <Mail className="flex-shrink-0 w-6 h-6 text-indigo-600" />
                            <dd className="ml-3">support@Smartlease.com</dd>
                        </div>
                        <div className="flex items-start">
                            <Phone className="flex-shrink-0 w-6 h-6 text-indigo-600" />
                            <dd className="ml-3">+254 791 583 518</dd>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="flex-shrink-0 w-6 h-6 text-indigo-600" />
                            <dd className="ml-3">Nairobi, Kenya</dd>
                        </div>
                    </dl>
                </div>

                {/* Right Column: Contact Form */}
                <div className="mt-12 lg:mt-0 bg-gray-50 p-8 rounded-xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h4>
                    <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                        <input type="text" placeholder="Full Name" className="py-3 px-4 block w-full shadow-sm rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" required />
                        <input type="email" placeholder="Email Address" className="py-3 px-4 block w-full shadow-sm rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" required />
                        <input type="tel" placeholder="Phone Number (Optional)" className="py-3 px-4 block w-full shadow-sm rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                        <textarea rows={4} placeholder="How can we help you?" className="py-3 px-4 block w-full shadow-sm rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" required />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 mt-4"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.div>
           <Footer/>
        </div>
    );
};

export default ContactPage;