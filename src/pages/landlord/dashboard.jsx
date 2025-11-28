import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, FileText, Wallet, Users, AlertCircle, TrendingUp, Calendar, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../../components/sidebar'; 

// --- Animation and Utility Components ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
};

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    variants={statCardVariants}
    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        <p className={`text-xs mt-1 ${color.text}`}>{subtext}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.bg}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </motion.div>
);

// --- Sample Data for Recharts ---
const monthlyRentData = [
  { month: 'Jan', collected: 800000, expected: 1050000 },
  { month: 'Feb', collected: 320000, expected: 350000 },
  { month: 'Mar', collected: 950000, expected: 950000 },
  { month: 'Apr', collected: 345000, expected: 350000 },
  { month: 'May', collected: 3030000, expected: 3050000 },
  { month: 'Jun', collected: 550000, expected: 2050000 },
  { month: 'Jul', collected: 5000000, expected: 5000000 },
  { month: 'Aug', collected: 950000, expected: 1050000 },
  { month: 'Sep', collected: 350000, expected: 3050000 },
  { month: 'Oct', collected: 1250000, expected: 3500000 },
  { month: 'Nov', collected: 850000, expected: 1050000 },
];



const DashboardHome = () => {
  const user = {
    name: "0xYmFYQ==",
    role: "landlord", 
    propertiesManaged: 3,
    tenantsCount: 24,
  };

  const dashboardData = {
    totalRevenue: "KES 450,000",
    revenueChange: { value: "+12%", type: "positive" },
    totalTenants: user.tenantsCount,
    vacantUnits: 2,
    pendingRent: "KES 35,000",
    overdueTenants: 3,
    occupancyRate: "92%",
    occupancyTrend: { value: "Above market avg", type: "positive" },
    recentActivity: [
      { id: 1, type: 'Payment Received', description: 'KES 15,000 from James Kamau (A4)', date: 'Oct 24, 2023', status: 'success' },
      { id: 2, type: 'Maintenance Request', description: 'Broken tap in Sarah Ochieng (B2)', date: 'Oct 23, 2023', status: 'warning' },
      { id: 3, type: 'Lease Renewal Due', description: 'David Mwangi (12) lease ends Nov 30', date: 'Oct 22, 2023', status: 'info' },
      { id: 4, type: 'New Tenant Added', description: 'Fatuma Ali (C1) registered', date: 'Oct 21, 2023', status: 'success' },
    ],
    upcomingTasks: [
      { id: 1, task: 'Collect rent for Sunrise Apts', date: 'Nov 1, 2023' },
      { id: 2, task: 'Inspect vacant unit B3', date: 'Nov 5, 2023' },
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatCardColor = (type) => {
    if (type === 'positive') return { bg: 'bg-green-500', text: 'text-green-600' };
    if (type === 'negative') return { bg: 'bg-red-500', text: 'text-red-600' };
    return { bg: 'bg-indigo-500', text: 'text-indigo-600' };
  };

  return (
    <motion.div
        className="p-8 bg-gray-50 min-h-screen" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="mb-8 pb-4 border-b border-gray-200"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back, <span className="text-indigo-600">{user.name}!</span>
          </h2>
          <p className="text-gray-600 capitalize">
            {user.role === 'landlord' ? `You are managing ${user.propertiesManaged} properties.` : `Managing client properties.`}
          </p>
        </motion.header>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants} 
        >
          <StatCard
            title="Total Revenue"
            value={dashboardData.totalRevenue}
            subtext={`${dashboardData.revenueChange.value} from last month`}
            icon={Wallet}
            color={getStatCardColor(dashboardData.revenueChange.type)}
          />
          <StatCard
            title="Total Tenants"
            value={dashboardData.totalTenants}
            subtext={`${dashboardData.vacantUnits} units vacant`}
            icon={Users}
            color={getStatCardColor('info')}
          />
          <StatCard
            title="Pending Rent"
            value={dashboardData.pendingRent}
            subtext={`${dashboardData.overdueTenants} tenants overdue`}
            icon={AlertCircle}
            color={getStatCardColor('negative')}
          />
          <StatCard
            title="Occupancy Rate"
            value={dashboardData.occupancyRate}
            subtext={dashboardData.occupancyTrend.value}
            icon={TrendingUp}
            color={getStatCardColor(dashboardData.occupancyTrend.type)}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View All</a>
            </div>
            <ul className="divide-y divide-gray-100">
              {dashboardData.recentActivity.map((activity, index) => (
                <motion.li
                  key={activity.id}
                  className="p-4 flex items-center space-x-4 hover:bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                >
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status).split(' ')[1]}`}>
                    {activity.type === 'Payment Received' && <Wallet size={18} className={getStatusColor(activity.status).split(' ')[0]} />}
                    {activity.type === 'Maintenance Request' && <Wrench size={18} className={getStatusColor(activity.status).split(' ')[0]} />}
                    {activity.type === 'Lease Renewal Due' && <FileText size={18} className={getStatusColor(activity.status).split(' ')[0]} />}
                    {activity.type === 'New Tenant Added' && <Users size={18} className={getStatusColor(activity.status).split(' ')[0]} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Upcoming Tasks</h3>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Add Task</a>
            </div>
            <ul className="divide-y divide-gray-100">
              {dashboardData.upcomingTasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  className="p-4 flex items-center space-x-4 hover:bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                >
                  <Calendar size={20} className="text-indigo-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{task.task}</p>
                    <p className="text-sm text-gray-600 flex items-center space-x-1">
                      <Clock size={14} /> <span>{task.date}</span>
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            {dashboardData.upcomingTasks.length === 0 && (
              <p className="p-6 text-gray-500 text-center">No upcoming tasks.</p>
            )}
          </motion.div>
        </div>
        
        {/* Monthly Rent Collection Trend Chart */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
        >
          <h3 className="font-bold text-lg text-gray-800 mb-4">Monthly Rent Collection Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRentData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" unit=" KES" tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'} />
                <Tooltip 
                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} 
                    formatter={(value, name) => [value.toLocaleString('en-US') + ' KES', name === 'collected' ? 'Collected' : 'Expected']}
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }}/>
                <Bar dataKey="expected" fill="#90a7f3ff" name="Expected Rent" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" fill="#150aedff" name="Rent Collected" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
    </motion.div>
  );
};


const Dashboard = () => {
    const user = { name: "0xYmFYQ==", role: "landlord" }; 
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            
            <Sidebar userRole={user.role} /> 
            
            
            <main className="flex-1 ml-64">
                
                <Outlet />
            </main>
        </div>
    );
};


export default Dashboard;
export { DashboardHome };