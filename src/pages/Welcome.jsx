import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Store, Mail, Lock, Eye, EyeOff, UserPlus, ShoppingBasket, Carrot, Smartphone, Zap, Armchair, Shirt, Footprints, Home, Heart, Globe } from 'lucide-react';

const categories = [
  { id: 1, name: 'Groceries', icon: ShoppingBasket },
  { id: 2, name: 'Vegetables', icon: Carrot },
  { id: 3, name: 'Electronics', icon: Smartphone },
  { id: 4, name: 'Electrical', icon: Zap },
  { id: 5, name: 'Furniture', icon: Armchair },
  { id: 6, name: 'Fashion', icon: Shirt },
  { id: 7, name: 'Footwear', icon: Footprints },
  { id: 8, name: 'Home', icon: Home },
  { id: 9, name: 'Care', icon: Heart },
];

const Welcome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer'); // 'customer' or 'owner'
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'customer') {
      navigate('/location');
    } else {
      navigate('/owner/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-4 border-b border-gray-50 z-20 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-nm-text-dark leading-none tracking-tight">Neighborhood</h1>
            <h1 className="text-xl font-bold text-nm-primary leading-none tracking-tight">Market</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-100">
            <Globe className="w-4 h-4" />
            English
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            <span>Local Shops</span>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <span>Better Choices</span>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <span>Closer to You</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* Left Side - Illustration & Categories */}
        <div className="hidden lg:flex lg:w-7/12 xl:w-[60%] flex-col relative bg-nm-off-white/50">
          {/* Main Image Area with curved bottom */}
          <div className="flex-1 p-6 pb-0 relative">
            <div className="w-full h-full relative rounded-t-[2.5rem] rounded-b-[4rem] overflow-hidden shadow-sm">
              <img 
                src="/welcome_bg.jpg" 
                alt="Neighborhood Shopping Illustration" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Category Icons Row at the bottom */}
          <div className="h-32 px-10 flex items-center justify-between z-10 relative bg-gradient-to-t from-white via-white/80 to-transparent pt-4 pb-2">
            {categories.slice(0, 8).map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-green-50 flex items-center justify-center text-nm-primary group-hover:scale-110 group-hover:bg-nm-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:text-nm-primary transition-colors">{cat.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Login Flow */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-0 bg-white relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[440px] mx-auto"
          >
            {/* Header / Logo (Mobile only) */}
            <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-nm-text-dark leading-none tracking-tight">Neighborhood</h1>
                <h1 className="text-2xl font-bold text-nm-primary leading-none tracking-tight">Market</h1>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center gap-4 mb-8 justify-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-premium border-2 border-white">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-nm-text-dark leading-none tracking-tight mb-1">Neighborhood</h1>
                <h1 className="text-3xl font-bold text-nm-primary leading-none tracking-tight">Market</h1>
                <p className="text-xs text-gray-500 mt-1 font-medium">Connecting you with the best local shops.</p>
              </div>
            </div>

            {/* Role Toggle */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Choose Your Role</label>
              <div className="flex p-1.5 bg-gray-50 rounded-2xl border border-gray-100 relative">
                <button
                  onClick={() => setRole('customer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all z-10 ${role === 'customer' ? 'text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <User className="w-4 h-4" />
                  Customer
                </button>
                <button
                  onClick={() => setRole('owner')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all z-10 ${role === 'owner' ? 'text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Store className="w-4 h-4" />
                  Shop Owner
                </button>
                
                {/* Sliding Background */}
                <div 
                  className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-nm-primary rounded-xl transition-transform duration-300 ease-out shadow-nm-primary/20"
                  style={{ transform: role === 'customer' ? 'translateX(0)' : 'translateX(100%)' }}
                ></div>
              </div>
            </div>

            {/* Login Form */}
            <h2 className="text-2xl font-bold text-nm-text-dark mb-6 ml-1">Login to Your Account</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nm-primary/20 focus:border-nm-primary outline-none transition-all text-sm font-medium"
                  placeholder="Email or Phone Number"
                  defaultValue={role === 'customer' ? 'customer@example.com' : 'owner@shop.com'}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  className="w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nm-primary/20 focus:border-nm-primary outline-none transition-all text-sm font-medium"
                  placeholder="Password"
                  defaultValue="password123"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button type="button" className="text-sm font-semibold text-nm-primary hover:text-nm-primary-dark transition-colors">
                  Forgot Password?
                </button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full py-4 bg-nm-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-nm-primary-dark transition-colors shadow-lg shadow-nm-primary/30 mt-2"
              >
                Login
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-sm text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/register')}
              className="w-full py-4 bg-white text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Create New Account
            </motion.button>

          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Welcome;
