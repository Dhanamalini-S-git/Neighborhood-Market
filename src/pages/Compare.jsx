import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Navigation, Star, MapPin, TrendingDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { products, shops } from '../data/dummyData';

const Compare = () => {
  const navigate = useNavigate();
  
  // Create a structured comparison data set based on the dummy products and shops
  const comparisonData = products.map(product => {
    const shop = shops.find(s => s.id === product.shopId);
    return { ...product, shop };
  });

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="btn-icon bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-nm-text-dark">Compare Options</h1>
            <p className="text-nm-text-light text-sm mt-1">Make the right choice for Premium Basmati Rice 1kg</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonData.map((item, index) => {
            // Determine facts/badges
            const isLowestPrice = Math.min(...comparisonData.map(d => d.price)) === item.price;
            const isNearest = Math.min(...comparisonData.map(d => d.shop.distance)) === item.shop.distance;
            const isHighestRated = Math.max(...comparisonData.map(d => d.shop.rating)) === item.shop.rating;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-premium border border-gray-100 flex flex-col relative overflow-hidden"
              >
                {/* Background highlight for best option (optional, let's keep it clean) */}
                {(isLowestPrice || isNearest) && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-nm-primary"></div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto bg-gray-50 rounded-2xl p-2 mb-4 border border-gray-100">
                    <img src={item.shop.image} alt={item.shop.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <h3 className="font-bold text-xl text-nm-text-dark">{item.shop.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.shop.category}</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Price</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-lg ${isLowestPrice ? 'text-nm-primary' : 'text-nm-text-dark'}`}>₹{item.price}</span>
                      {isLowestPrice && <span className="badge badge-green"><TrendingDown className="w-3 h-3 inline mr-1"/>Lowest</span>}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Distance</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-nm-text-dark flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400"/> {item.shop.distance} km</span>
                      {isNearest && <span className="badge bg-blue-100 text-blue-700">Nearest</span>}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Travel Time</span>
                    <span className="font-semibold text-nm-text-dark">{item.shop.travelTime} mins</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-medium text-gray-500">Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-nm-text-dark flex items-center"><Star className="w-4 h-4 mr-1 text-nm-orange fill-nm-orange"/> {item.shop.rating}</span>
                      {isHighestRated && <span className="badge bg-yellow-100 text-yellow-800">Highest Rated</span>}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-gray-500">Availability</span>
                    {item.inStock ? (
                      <span className="text-sm font-semibold text-green-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> In Stock</span>
                    ) : (
                      <span className="text-sm font-semibold text-red-500">Out of Stock</span>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 space-y-3">
                  <button 
                    onClick={() => navigate(`/shop/${item.shopId}`)}
                    className="w-full btn-secondary py-3 text-sm"
                  >
                    View Shop Details
                  </button>
                  <button 
                    onClick={() => navigate(`/route/${item.shopId}`)}
                    className="w-full btn-primary py-3 text-sm flex justify-center items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Compare;
