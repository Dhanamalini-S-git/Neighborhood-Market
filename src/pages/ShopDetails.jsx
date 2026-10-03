import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Phone, Navigation, ShoppingBag, Plus, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { shops, products } from '../data/dummyData';
import { motion } from 'framer-motion';

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = shops.find(s => s.id === id);
  const shopProducts = products.filter(p => p.shopId === id);

  if (!shop) {
    return <div className="p-8 text-center">Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      {/* Cover Image */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-4 md:left-8 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12">
        {/* Shop Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-premium mb-8 border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="badge badge-green mb-2 inline-block">{shop.category}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-nm-text-dark">{shop.name}</h1>
            </div>
            <div className="bg-nm-off-white px-3 py-2 rounded-xl flex items-center gap-1">
              <Star className="w-5 h-5 text-nm-orange fill-nm-orange" />
              <span className="font-bold text-lg">{shop.rating}</span>
            </div>
          </div>

          <p className="text-gray-500 mb-6">{shop.address}</p>

          <div className="flex flex-wrap gap-4 text-sm font-medium text-nm-text-dark mb-8">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4 text-nm-primary-dark" />
              {shop.distance} km away
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-gray-500" />
              {shop.travelTime} min travel
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <span className={`w-2 h-2 rounded-full ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {shop.isOpen ? 'Open Now' : 'Closed'}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => navigate(`/route/${shop.id}`)}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </button>
            <button 
              onClick={() => navigate(`/chat/${shop.id}`)}
              className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-xl font-bold text-nm-text-dark mb-4 px-2">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shopProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex gap-4"
              >
                <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-nm-text-dark text-sm leading-tight mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-nm-primary">₹{product.price}</span>
                      {product.inStock ? (
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">In Stock</span>
                      ) : (
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <button className="self-end w-8 h-8 bg-nm-off-white hover:bg-nm-soft-green rounded-full flex items-center justify-center text-nm-primary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
