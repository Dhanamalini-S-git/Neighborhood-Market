import { motion } from 'framer-motion';
import { Package, ShoppingBag, TrendingUp, AlertTriangle, ArrowUp, Users } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';

const OwnerDashboard = () => {
  const stats = [
    { label: 'Total Products', value: '124', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', change: '+12%' },
    { label: 'Total Sales', value: '₹45,230', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', change: '+8%' },
    { label: 'Total Orders', value: '342', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50', change: '+24%' },
    { label: 'Low Stock', value: '8', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', change: '-2' },
  ];

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10">
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Rajesh! Here's what's happening at Sri Lakshmi Stores.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <ArrowUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-nm-text-dark">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-nm-text-dark">Sales Overview</h2>
              <select className="bg-gray-50 border-none rounded-lg text-sm font-medium focus:ring-0">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            
            {/* Dummy Chart Area */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-gray-100 pl-4 pb-4">
              {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                <div key={i} className="w-full bg-nm-soft-green rounded-t-lg relative group transition-all duration-300 hover:bg-nm-primary" style={{ height: `${height}%` }}>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {height * 12}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400 pl-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col"
          >
            <h2 className="text-lg font-bold text-nm-text-dark mb-6">Recent Activity</h2>
            <div className="space-y-6 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-nm-soft-blue flex items-center justify-center text-blue-600 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-nm-text-dark">Customer viewed store</p>
                    <p className="text-xs text-gray-500 mt-0.5">{i * 2} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 mt-4 text-sm font-medium text-nm-primary hover:bg-nm-soft-green rounded-xl transition-colors">
              View All Activity
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
