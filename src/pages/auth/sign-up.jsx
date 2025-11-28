import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle, UserPlus, Mail, Lock, User} from 'lucide-react';

// --- Global Firebase Config & Utility ---
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

// --- UTILITY & FORM COMPONENTS (Merged from auth_forms.jsx) ---

// Form transition variants for Framer Motion
const formVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.3 } },
    out: { opacity: 0, y: -20, transition: { type: "tween", duration: 0.3 } }
};

// Component for form inputs
const InputField = ({ Icon, type = "text", placeholder, value, onChange, required = true }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all"
        />
    </div>
);

// --- Sign Up Form Component ---
const SignUpForm = ({ auth, onModeChange, onLoginSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('tenant'); // Default role
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            // This attempts to create the user account in Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            onLoginSuccess();
            
        } catch (err) {
            console.error("Sign Up Error:", err.message);
            let userMessage = 'Sign up failed.';
            if (err.code === 'auth/email-already-in-use') {
                userMessage = 'This email is already in use. Please log in.';
            } else if (err.code === 'auth/weak-password') {
                userMessage = 'Password should be at least 6 characters.';
            } else {
                userMessage = 'Sign up failed. Please check your details.';
            }
            setError(userMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form 
            key="signup"
            variants={formVariants}
            initial="initial"
            animate="in"
            exit="out"
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <InputField 
                Icon={User} 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <InputField 
                Icon={Mail} 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            
            <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm appearance-none transition-all cursor-pointer"
                >
                    <option value="tenant">Tenant</option>
                    <option value="manager">Property Manager</option>
                </select>
            </div>

            <InputField 
                Icon={Lock} 
                type="password" 
                placeholder="Password (min 6 characters)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <InputField 
                Icon={Lock} 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />

            {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    {error}
                </motion.p>
            )}

            <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
                 {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                    </>
                )}
            </motion.button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button type="button" onClick={() => onModeChange('login')} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    Log In 
                </button>
            </p>
        </motion.form>
    );
};


// --- Standalone Signup Page Component (Container) ---
export default function SignupPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth, setAuth] = useState(null);
    const [initLoading, setInitLoading] = useState(true);

    // 1. Firebase Initialization and Auth State Listener
    useEffect(() => {
        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase configuration is missing.");
            setInitLoading(false);
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const authentication = getAuth(app);
            setAuth(authentication);

            // Listen for auth state changes
            const unsubscribe = onAuthStateChanged(authentication, (user) => {
                setIsAuthenticated(!!user);
                setInitLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error initializing Firebase:", error);
            setInitLoading(false);
        }
    }, []);

    const handleSignupSuccess = () => {
        
        console.log('Sign up successful, checking authentication state.');
    };

    if (initLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                 <div className="text-lg font-semibold text-indigo-600">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500 inline" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Initializing Authentication...
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        // Successful signup/authentication view
        return (
            <div className="flex justify-center items-center h-screen bg-indigo-50">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-sm"
                >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Account Created!</h2>
                    <p className="text-gray-600 mt-2">You are successfully signed in to the system.</p>
                    <p className="text-sm text-gray-400 mt-4">(In a full app, this would redirect you to the dashboard.)</p>
                    <button 
                        onClick={() => auth.signOut()} 
                        className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-colors"
                    >
                        Sign Out
                    </button>
                </motion.div>
            </div>
        );
    }

    // Display the signup form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-8 border-indigo-600"
            >
                <div className="text-center mb-8">
                    <UserPlus className="w-12 h-12 text-indigo-600 mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                        SmartLease Registration
                    </h1>
                    <p className="text-sm text-gray-500">Create Account </p>
                </div>

                <AnimatePresence mode="wait">
                    {/* The SignUpForm component handles all the fields and submission logic */}
                    <SignUpForm 
                        auth={auth}
                        onModeChange={() => {}} 
                        onLoginSuccess={handleSignupSuccess}
                    />
                </AnimatePresence>
            </motion.div>
        </div>
    );
}