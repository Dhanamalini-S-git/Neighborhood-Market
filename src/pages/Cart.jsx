import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import { products, shops } from '../data/dummyData';

const Cart = () => {
  const navigate = useNavigate();
  
  // Dummy cart items
  const cartItems = [
    { ...products[0], shop: shops.find(s => s.id === products[0].shopId), quantity: 2 },
    { ...products[1], shop: shops.find(s => s.id === products[1].shopId), quantity: 1 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="btn-icon bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-nm-text-dark">Your Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div 
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex gap-4"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-nm-text-dark text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">From: {item.shop.name}</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                        <button className="text-gray-500 hover:text-nm-text-dark w-6 h-6 flex items-center justify-center font-medium">-</button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button className="text-gray-500 hover:text-nm-text-dark w-6 h-6 flex items-center justify-center font-medium">+</button>
                      </div>
                      <span className="font-bold text-nm-text-dark">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:w-80">
              <div className="bg-white rounded-3xl p-6 shadow-premium border border-gray-50 sticky top-24">
                <h2 className="text-lg font-bold text-nm-text-dark mb-4">Summary</h2>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-nm-text-dark">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span className="font-medium text-nm-text-dark">₹5</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="font-bold text-nm-text-dark">Total</span>
                    <span className="font-bold text-xl text-nm-primary">₹{subtotal + 5}</span>
                  </div>
                </div>

                <button className="w-full btn-primary py-4 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Continue to Shop
                </button>
                <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                  You will pay directly at the shop when you visit.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-50">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-nm-text-dark mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Explore nearby shops to add items</p>
            <button onClick={() => navigate('/home')} className="btn-primary">
              Explore Shops
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
