import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import OwnerSidebar from './OwnerSidebar';

const defaultCenter = [11.0160, 76.9550];

// Component to handle map clicks
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latLng = marker.getLatLng();
          setPosition([latLng.lat, latLng.lng]);
        }
      },
    }),
    [setPosition]
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

const ShopLocation = () => {
  const [markerPos, setMarkerPos] = useState(defaultCenter);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 p-6 lg:p-10 pb-24 md:pb-10 flex flex-col h-screen">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-nm-text-dark">Shop Location</h1>
          <p className="text-gray-500 mt-1">Set your exact shop location so customers can find you</p>
        </div>

        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-50 flex flex-col overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="input-field pl-10 py-2.5 w-full"
                placeholder="Search area or address"
              />
            </div>
            <button className="flex items-center gap-2 text-nm-primary font-medium hover:text-nm-primary-dark transition-colors whitespace-nowrap">
              <Navigation className="w-5 h-5" />
              Locate Me
            </button>
          </div>

          <div className="flex-1 relative p-4 md:p-6 bg-gray-50 z-0">
            <MapContainer 
              center={defaultCenter} 
              zoom={14} 
              style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="bottomright" />
              <LocationMarker position={markerPos} setPosition={(pos) => {
                setMarkerPos(pos);
                setSaved(false);
              }} />
            </MapContainer>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none shadow-md z-[400]">
              Click on the map or drag the marker to set location
            </div>
          </div>

          <div className="p-4 md:p-6 border-t border-gray-50 bg-white flex flex-col md:flex-row justify-between items-center gap-4 z-10">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Latitude</span>
                <span className="font-bold text-nm-text-dark bg-gray-100 px-3 py-1.5 rounded-lg font-mono">{markerPos[0].toFixed(6)}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Longitude</span>
                <span className="font-bold text-nm-text-dark bg-gray-100 px-3 py-1.5 rounded-lg font-mono">{markerPos[1].toFixed(6)}</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center gap-4">
              {saved && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-600 font-medium text-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Saved
                </motion.div>
              )}
              <button 
                onClick={handleSave}
                className="w-full md:w-auto btn-primary bg-nm-primary shadow-nm-primary/20 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Save Shop Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLocation;
