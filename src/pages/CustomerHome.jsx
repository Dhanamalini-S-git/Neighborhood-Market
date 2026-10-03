import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { categories, shops } from '../data/dummyData';
import * as Icons from 'lucide-react';

const CustomerHome = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState('Select Location');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loc = localStorage.getItem('userLocation');
    if (loc) setUserLocation(loc);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs text-nm-text-light font-medium uppercase tracking-wider mb-1">Your Location</p>
            <button onClick={() => navigate('/location')} className="flex items-center gap-1 group">
              <MapPin className="w-5 h-5 text-nm-primary group-hover:text-nm-primary-dark transition-colors" />
              <span className="font-bold text-nm-text-dark text-lg group-hover:text-nm-primary-dark transition-colors">{userLocation}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-icon bg-white shadow-sm border border-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-nm-text-dark mb-4">What are you looking for?</h1>
          <div className="relative shadow-premium rounded-2xl overflow-hidden group border border-gray-100 bg-white">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-nm-primary group-focus-within:text-nm-primary-dark transition-colors" />
            </div>
            <input 
              type="text"
              className="w-full pl-12 pr-4 py-4 md:py-5 bg-transparent border-none focus:ring-0 outline-none text-lg text-nm-text-dark placeholder-gray-400"
              placeholder="Search rice, vegetables, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button 
                onClick={() => searchQuery.trim() && navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
                className="bg-nm-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-nm-primary-dark transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-nm-text-dark">Categories</h2>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat, index) => {
              return (
                <motion.button 
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 flex flex-col items-center gap-3 min-w-[85px] group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 duration-300"></div>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-xs font-medium text-nm-text-dark text-center group-hover:text-nm-primary transition-colors">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Nearby Shops */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-nm-text-dark">Nearby Shops</h2>
            <button onClick={() => navigate('/shops')} className="text-sm font-medium text-nm-primary hover:underline">See Map</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop, index) => (
              <motion.div 
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/shop/${shop.id}`)}
                className="card cursor-pointer group"
              >
                <div className="h-40 relative overflow-hidden">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-nm-orange fill-nm-orange" />
                    <span className="text-xs font-bold">{shop.rating}</span>
                  </div>
                  {!shop.isOpen && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Closed</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-nm-text-dark group-hover:text-nm-primary transition-colors">{shop.name}</h3>
                    <span className="badge badge-green shrink-0">{shop.category}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-nm-text-light mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{shop.distance} km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{shop.travelTime} min</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {shop.reviews} reviews • {shop.address}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
