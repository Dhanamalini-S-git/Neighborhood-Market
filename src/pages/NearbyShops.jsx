import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Navigation, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { shops } from '../data/dummyData';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = [11.0160, 76.9550];

const NearbyShops = () => {
  const navigate = useNavigate();
  const [selectedShop, setSelectedShop] = useState(null);
  const [filter, setFilter] = useState('Nearest');

  const filters = ['Nearest', 'Highest Rated', 'Open Now', 'Lowest Price'];

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row mt-16 mb-16 md:mb-0 h-[calc(100vh-8rem)]">
        {/* Map View */}
        <div className="flex-1 h-1/2 md:h-full relative bg-gray-200 z-0">
          <MapContainer 
            center={center} 
            zoom={14} 
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />

            {/* User Location Marker */}
            <Marker position={center} />

            {shops.map((shop) => (
              <Marker
                key={shop.id}
                position={[shop.lat, shop.lng]}
                eventHandlers={{
                  click: () => setSelectedShop(shop),
                }}
              >
                <Popup>
                  <div className="p-1 max-w-[200px]">
                    <h3 className="font-bold text-sm mb-1">{shop.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <span className="flex items-center"><Star className="w-3 h-3 text-nm-orange mr-1" />{shop.rating}</span>
                      <span>•</span>
                      <span>{shop.distance} km</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/shop/${shop.id}`)}
                      className="text-xs bg-nm-primary text-white px-3 py-1 rounded w-full"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="absolute top-4 left-4 z-[400] flex gap-2 overflow-x-auto max-w-full pr-4 pb-2 no-scrollbar">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${filter === f ? 'bg-nm-primary text-white' : 'bg-white text-nm-text-dark hover:bg-gray-50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List View */}
        <div className="flex-1 md:w-[450px] md:flex-none md:max-w-md bg-white border-l border-gray-100 flex flex-col h-1/2 md:h-full z-10">
          <div className="p-4 border-b border-gray-100 shadow-sm z-10">
            <h2 className="text-xl font-bold text-nm-text-dark">Nearby Shops</h2>
            <p className="text-sm text-nm-text-light">{shops.length} shops found near you</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-nm-off-white">
            {shops.map((shop, index) => (
              <motion.div 
                key={shop.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/shop/${shop.id}`)}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 cursor-pointer hover:shadow-soft transition-all group"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-nm-text-dark leading-tight group-hover:text-nm-primary transition-colors">{shop.name}</h3>
                      <div className="flex items-center gap-1 bg-nm-off-white px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 text-nm-orange fill-nm-orange" />
                        <span className="text-xs font-bold">{shop.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mb-2 block">{shop.category}</span>
                    
                    <div className="flex items-center gap-4 text-xs font-medium mt-auto">
                      <div className="flex items-center gap-1 text-nm-primary-dark">
                        <MapPin className="w-3 h-3" />
                        <span>{shop.distance} km</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{shop.travelTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/route/${shop.id}`); }}
                    className="flex-1 bg-nm-soft-blue/30 text-blue-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-nm-soft-blue/50 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
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

export default NearbyShops;
