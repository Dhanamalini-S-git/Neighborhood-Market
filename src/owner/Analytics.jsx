import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">Analytics</h1>
            <p className="text-gray-500 mt-1">Track your shop's performance</p>
          </div>
          <select className="input-field py-2 bg-white w-auto shadow-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-nm-text-dark">Revenue Overview</h2>
            </div>
            <div className="flex-1 h-48 flex items-end justify-between gap-2 border-b border-l border-gray-100 pl-4 pb-4">
              {[30, 50, 40, 80, 60, 90, 70].map((height, i) => (
                <div key={i} className="w-full bg-purple-200 rounded-t-md hover:bg-purple-500 transition-colors" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400 pl-4">
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-nm-text-dark">Customer Visits</h2>
            </div>
            <div className="flex-1 h-48 flex items-end justify-between gap-2 border-b border-l border-gray-100 pl-4 pb-4">
              {[60, 40, 70, 50, 80, 65, 95].map((height, i) => (
                <div key={i} className="w-full bg-blue-200 rounded-t-md hover:bg-blue-500 transition-colors" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400 pl-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold text-nm-text-dark mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Premium Basmati Rice 1kg', sales: 145, revenue: '₹8,700' },
              { name: 'Sunflower Oil 1L', sales: 98, revenue: '₹14,210' },
              { name: 'Fresh Apples 1kg', sales: 76, revenue: '₹11,400' }
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-nm-text-dark text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-nm-primary">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
