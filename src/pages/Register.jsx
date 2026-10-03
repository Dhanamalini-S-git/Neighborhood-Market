import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Store, Mail, Phone } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/location'); // After register, go to choose location
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-nm-soft-blue/30 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          <h2 className="text-2xl font-bold text-nm-text-dark">Create Account</h2>
          <p className="text-nm-text-light mt-2">Join Neighborhood Market today</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-50">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-nm-text-dark mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" required className="input-field pl-11" placeholder="John Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nm-text-dark mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" required className="input-field pl-11" placeholder="john@example.com" />
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

            <div>
              <label className="block text-sm font-medium text-nm-text-dark mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" required className="input-field pl-11" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-nm-text-light mt-6">
            Already have an account? <Link to="/login" className="text-nm-primary font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
