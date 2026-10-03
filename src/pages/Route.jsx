import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation, MapPin, Footprints, Car } from 'lucide-react';
import Navbar from '../components/Navbar';
import { shops } from '../data/dummyData';
import { MapContainer, TileLayer, Marker, Polyline, ZoomControl, Popup } from 'react-leaflet';
import L from 'leaflet';

const userLocation = [11.0160, 76.9550]; // Dummy user location

const RoutePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = shops.find(s => s.id === id);

  if (!shop) return <div>Shop not found</div>;

  const path = [
    userLocation,
    [shop.lat, shop.lng]
  ];

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row mt-16 pb-16 md:pb-0 h-[calc(100vh-8rem)]">
        {/* Info Sidebar */}
        <div className="flex-none md:w-96 bg-white border-r border-gray-100 flex flex-col h-1/2 md:h-full z-[400] shadow-lg">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="btn-icon">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-nm-text-dark">Directions</h1>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="relative pl-6 pb-6 border-l-2 border-dashed border-gray-200 ml-4 mb-2">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[9px] top-0 border-2 border-white shadow-sm"></div>
              <p className="font-semibold text-nm-text-dark text-sm">Your Location</p>
            </div>
            
            <div className="relative pl-6 ml-4">
              <div className="absolute w-4 h-4 rounded-full bg-nm-primary -left-[9px] top-0 border-2 border-white shadow-sm"></div>
              <p className="font-semibold text-nm-text-dark text-sm">{shop.name}</p>
              <p className="text-xs text-gray-500 mt-1">{shop.address}</p>
            </div>

            <div className="mt-10 bg-nm-off-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-nm-primary" />
                <span className="font-bold text-lg text-nm-text-dark">Distance: {shop.distance} km</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Footprints className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-nm-text-dark">Walking</span>
                  </div>
                  <span className="font-bold text-nm-text-dark">{Math.round(shop.distance * 12)} min</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-nm-light-teal/20 rounded-xl shadow-sm border border-teal-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700">
                      <Car className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-nm-text-dark">Driving</span>
                  </div>
                  <span className="font-bold text-teal-800">{shop.travelTime} min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-50">
            <button className="w-full btn-primary flex items-center justify-center gap-2 py-4">
              <Navigation className="w-5 h-5" />
              Start Navigation
            </button>
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 h-1/2 md:h-full relative bg-gray-200 z-0">
          <MapContainer 
            center={userLocation} 
            zoom={14} 
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />

            <Marker position={userLocation}>
              <Popup>You</Popup>
            </Marker>
            
            <Marker position={[shop.lat, shop.lng]}>
              <Popup>{shop.name}</Popup>
            </Marker>

            <Polyline pathOptions={{ color: '#0ea5e9', weight: 4, opacity: 0.8 }} positions={path} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
