import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Store, Mail, Phone, MapPin, Tag } from 'lucide-react';

const OwnerRegister = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/owner/location'); // Redirect to set location first
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-nm-mint-green/30 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-nm-orange"
          >
            <Store className="w-8 h-8" />
          </motion.div>
          <h2 className="text-2xl font-bold text-nm-text-dark">Register Your Shop</h2>
          <p className="text-nm-text-light mt-2">Join Neighborhood Market and reach more customers</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-50">
          <form onSubmit={handleRegister} className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-nm-text-dark mb-4 border-b border-gray-100 pb-2">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Owner Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" required className="input-field pl-11" placeholder="Rajesh Kumar" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="email" required className="input-field pl-11" placeholder="rajesh@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="tel" required className="input-field pl-11" placeholder="+91 9876543210" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="password" required className="input-field pl-11" placeholder="••••••••" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-nm-text-dark mb-4 border-b border-gray-100 pb-2">Shop Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Shop Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Store className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" required className="input-field pl-11" placeholder="Sri Lakshmi Stores" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Shop Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select required className="input-field pl-11 bg-white appearance-none">
                      <option value="">Select Category</option>
                      <option value="groceries">Groceries</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Fashion & Clothing</option>
                      <option value="hardware">Hardware & Electrical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-nm-text-dark mb-1">Shop Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 pt-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea required className="input-field pl-11 py-3 h-24 resize-none" placeholder="124 Main Street, Cross Cut Road, Coimbatore"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-6 bg-nm-orange hover:bg-orange-500 shadow-orange-500/20">
              Register Shop & Continue
            </button>
          </form>

          <p className="text-center text-sm text-nm-text-light mt-6">
            Already registered? <Link to="/owner/login" className="text-nm-orange font-semibold hover:underline">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerRegister;
