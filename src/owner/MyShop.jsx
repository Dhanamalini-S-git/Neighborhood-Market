import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Camera, Edit2 } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';
import { useNavigate } from 'react-router-dom';

const MyShop = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">My Shop</h1>
            <p className="text-gray-500 mt-1">Manage your shop's profile and settings</p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden mb-8">
          <div className="h-48 md:h-64 bg-gray-200 relative">
            <img src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1200" alt="Cover" className="w-full h-full object-cover opacity-80" />
            <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white transition-colors">
              <Camera className="w-4 h-4" /> Change Cover
            </button>
          </div>
          
          <div className="p-6 md:p-8 relative">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white absolute -top-12 left-6 md:left-8 overflow-hidden flex items-center justify-center">
              <span className="text-3xl font-bold text-nm-primary">SL</span>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-nm-text-dark">Sri Lakshmi Stores</h2>
                  <span className="badge badge-green">Groceries</span>
                </div>
                <p className="text-gray-500 flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4" /> 124 Main Street, Cross Cut Road
                </p>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                  <span className="font-bold text-nm-text-dark">{isOpen ? 'Shop is Open' : 'Shop is Closed'}</span>
                </div>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isOpen ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  Mark as {isOpen ? 'Closed' : 'Open'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
            <h3 className="text-lg font-bold text-nm-text-dark mb-4 border-b border-gray-50 pb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Contact Number</label>
                <p className="font-medium text-nm-text-dark">+91 98765 43210</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <p className="font-medium text-nm-text-dark">contact@srilakshmi.com</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Business Hours</label>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="font-medium text-nm-text-dark">09:00 AM - 09:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
            <h3 className="text-lg font-bold text-nm-text-dark mb-4 border-b border-gray-50 pb-4">Location Settings</h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-nm-text-dark mb-1">Store Location Map</h4>
                <p className="text-sm text-gray-500">Your store is currently visible on the customer map at Lat: 11.0168, Lng: 76.9558</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/owner/location')}
              className="w-full btn-secondary py-3 text-sm"
            >
              Update Map Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
