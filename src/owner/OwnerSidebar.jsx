import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, Package, ShoppingCart, BarChart2, User, LogOut, Globe, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const OwnerSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/owner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/owner/shop', icon: Store, label: 'My Shop' },
    { path: '/owner/products', icon: Package, label: 'Products' },
    { path: '/owner/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/owner/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  const [language, setLanguage] = useState(localStorage.getItem('ownerLang') || 'English');
  const languages = ['English', 'Japanese', 'Tamil', 'Spanish', 'Hindi'];

  const handleLangChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('ownerLang', lang);
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
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

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 flex-col z-50 shadow-soft">
        <div className="p-6">
          <Link to="/owner/dashboard" className="flex items-center gap-2 text-xl font-bold text-nm-primary mb-8">
            <Store className="w-6 h-6" />
            Owner Portal
          </Link>

          {/* Language Selector */}
          <div className="relative group mb-6 z-50">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 hover:text-nm-text-dark border border-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {language}
              </div>
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-premium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-nm-soft-green text-nm-primary-dark' : 'text-gray-500 hover:bg-gray-50 hover:text-nm-text-dark'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Owner" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-nm-text-dark">Rajesh Kumar</p>
              <p className="text-xs text-gray-500">Sri Lakshmi Stores</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OwnerSidebar;
