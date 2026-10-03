import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Search, ShoppingBag, User, Globe, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/shops', icon: Map, label: 'Map' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/cart', icon: ShoppingBag, label: 'Cart' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const [language, setLanguage] = useState(localStorage.getItem('customerLang') || 'English');

  const languages = ['English', 'Japanese', 'Tamil', 'Spanish', 'Hindi'];

  const handleLangChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('customerLang', lang);
    // In a real app, this would trigger an context update or reload
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/shops' && location.pathname === '/map');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-nm-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'fill-nm-primary/20' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Top/Side Navigation (Optional for Desktop wrapper) */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 px-8 items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 text-xl font-bold text-nm-primary">
          <ShoppingBag className="w-6 h-6" />
          Neighborhood Market
        </Link>
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
              <Languages className="w-4 h-4" />
              Translating to {language}
            </button>
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-premium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {languages.map(lang => (
                <button 
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${language === lang ? 'text-nm-primary font-bold' : 'text-gray-600'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200"></div>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 font-medium ${isActive ? 'text-nm-primary' : 'text-gray-500 hover:text-nm-text-dark'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Spacer for desktop header */}
      <div className="hidden md:block h-16"></div>
    </>
  );
};

export default Navbar;
