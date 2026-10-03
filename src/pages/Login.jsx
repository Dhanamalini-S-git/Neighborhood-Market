import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Store } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/location'); // After login, go to choose location
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-[-5%] right-[-10%] w-80 h-80 bg-nm-soft-green/30 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-nm-primary"
          >
            <Store className="w-8 h-8" />
          </motion.div>
          <h2 className="text-2xl font-bold text-nm-text-dark">Welcome back</h2>
          <p className="text-nm-text-light mt-2">Login to your customer account</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-nm-text-dark mb-2">Email or Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  className="input-field pl-11"
                  placeholder="Enter email or phone"
                  defaultValue="customer@example.com"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-nm-text-dark">Password</label>
                <a href="#" className="text-xs text-nm-primary hover:text-nm-primary-dark font-medium">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  className="input-field pl-11"
                  placeholder="••••••••"
                  defaultValue="password123"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-8">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-nm-text-light mt-6">
            Don't have an account? <Link to="/register" className="text-nm-primary font-semibold hover:underline">Create Account</Link>
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/owner/login" className="text-sm font-medium text-gray-500 hover:text-nm-text-dark">
            Are you a Shop Owner? Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
