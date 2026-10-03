import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Settings, LogOut, ChevronRight, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const location = localStorage.getItem('userLocation') || 'Coimbatore';

  const menuItems = [
    { icon: MapPin, label: 'Change Location', action: () => navigate('/location'), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Search, label: 'Recent Searches', action: () => {}, color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Settings, label: 'Settings', action: () => {}, color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="btn-icon bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-nm-text-dark">Profile</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-premium border border-gray-50 mb-8 flex items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-nm-soft-green shrink-0">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-nm-text-dark mb-1">John Customer</h2>
            <p className="text-sm text-gray-500 mb-2">john@example.com</p>
            <div className="flex items-center gap-1 text-sm font-medium text-nm-primary bg-nm-soft-green/30 px-3 py-1 rounded-full w-fit">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <motion.button 
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={item.action}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-nm-text-dark">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-nm-primary transition-colors" />
            </motion.button>
          ))}

          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => { localStorage.removeItem('userLocation'); navigate('/'); }}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-soft transition-all mt-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <span className="font-medium text-red-500">Logout</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
