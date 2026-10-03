import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { Search, MapPin, Star, Clock, CheckCircle2, ArrowLeft, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { products, shops } from '../data/dummyData';

const ProductSearch = () => {
  const navigate = useNavigate();
  const location = useRouterLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState('Lowest Price');

  const filters = ['Lowest Price', 'Nearest', 'Highest Rated', 'In Stock'];

  // Combine product and shop info for dummy data display
  const searchResults = products.map(product => {
    const shop = shops.find(s => s.id === product.shopId);
    return { ...product, shop };
  }).sort((a, b) => {
    if (activeFilter === 'Lowest Price') return a.price - b.price;
    if (activeFilter === 'Nearest') return a.shop.distance - b.shop.distance;
    if (activeFilter === 'Highest Rated') return b.shop.rating - a.shop.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-nm-off-white pb-20 md:pb-0">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="btn-icon bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 relative shadow-sm rounded-xl overflow-hidden bg-white border border-gray-100">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text"
              className="w-full pl-11 pr-4 py-3 bg-transparent border-none focus:ring-0 outline-none text-nm-text-dark"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-nm-text-dark mb-1">
              Results for "{searchQuery || 'Products'}"
            </h1>
            <p className="text-sm text-nm-text-light">{searchResults.length} nearby shops found</p>
          </div>
          <button onClick={() => navigate('/compare')} className="text-nm-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            Compare All <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 mb-2 no-scrollbar">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${activeFilter === f ? 'bg-nm-text-dark text-white' : 'bg-white text-nm-text-dark border border-gray-100 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {searchResults.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/shop/${item.shopId}`)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex gap-4 cursor-pointer hover:shadow-soft transition-all group"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100 p-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-nm-text-dark leading-tight">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.shop.name}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="font-bold text-lg text-nm-primary">₹{item.price}</p>
                    {activeFilter === 'Lowest Price' && index === 0 && (
                      <span className="badge badge-green mt-1 inline-block">Best Price</span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-nm-orange fill-nm-orange" />
                      <span>{item.shop.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-nm-primary-dark" />
                      <span>{item.shop.distance} km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.shop.travelTime}m</span>
                    </div>
                  </div>
                  
                  {item.inStock ? (
                    <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      In Stock
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md">Out of Stock</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
