import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, ChevronRight } from 'lucide-react';

const ChooseLocation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const popularCities = ['Virudhunagar', 'Coimbatore', 'Trichy', 'Chennai', 'Madurai'];

  const handleSelectLocation = (location) => {
    localStorage.setItem('userLocation', location);
    navigate('/home');
  };

  const handleCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, reverse geocode this.
          setTimeout(() => {
            handleSelectLocation('Current Location');
          }, 1000);
        },
        (error) => {
          setLoading(false);
          alert('Unable to retrieve your location');
        }
      );
    } else {
      setLoading(false);
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="min-h-screen bg-nm-off-white p-6 md:p-12 flex justify-center items-center relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-nm-yellow/20 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-premium p-8 relative z-10 border border-gray-50"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-nm-light-teal rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
            <MapPin className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-nm-text-dark">Where are you shopping?</h2>
          <p className="text-nm-text-light mt-2">Set your location to find nearby shops</p>
        </div>

        <button 
          onClick={handleCurrentLocation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-nm-soft-blue/30 text-blue-700 rounded-xl mb-6 hover:bg-nm-soft-blue/50 transition-colors duration-200 font-medium"
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full" />
          ) : (
            <Navigation className="w-5 h-5" />
          )}
          <span>{loading ? 'Detecting...' : 'Use Current Location'}</span>
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text"
            className="input-field pl-11 py-4"
            placeholder="Search City or Area"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-nm-text-light uppercase tracking-wider mb-4">Popular Cities</h3>
          <div className="space-y-3">
            {popularCities.map((city, index) => (
              <motion.button
                key={city}
                whileHover={{ x: 5 }}
                onClick={() => handleSelectLocation(city)}
                className="w-full flex items-center justify-between p-4 bg-nm-off-white rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-nm-text-dark">{city}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChooseLocation;
