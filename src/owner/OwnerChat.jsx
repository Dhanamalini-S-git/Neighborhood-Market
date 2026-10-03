import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Globe, Languages } from 'lucide-react';
import OwnerSidebar from './OwnerSidebar';
import { translations, chatHistory } from '../data/chatData';
import { motion } from 'framer-motion';

const OwnerChat = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  
  // Dummy customer data
  const customer = { name: 'John Doe (Customer)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' };
  
  const [messages, setMessages] = useState(chatHistory);
  const [inputValue, setInputValue] = useState('');
  const [ownerLang, setOwnerLang] = useState(localStorage.getItem('ownerLang') || 'Tamil');
  const [showOriginal, setShowOriginal] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleLangChange = () => {
      setOwnerLang(localStorage.getItem('ownerLang') || 'Tamil');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOriginal]);

  const toggleOriginal = (id) => {
    setShowOriginal(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'owner',
      customText: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex">
      <OwnerSidebar />
      
      <div className="flex-1 md:ml-64 flex flex-col h-screen relative pb-16 md:pb-0">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-nm-text-dark">{customer.name}</h2>
                <div className="flex items-center gap-1 text-xs text-nm-primary">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white text-nm-text-dark px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 shadow-sm hover:border-nm-primary hover:text-nm-primary transition-colors">
              <Languages className="w-4 h-4" />
              Translating to {ownerLang}
            </button>
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-premium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="py-2">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">Select Language</p>
                {['English', 'Japanese', 'Tamil', 'Spanish', 'Hindi'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => {
                      setOwnerLang(lang);
                      localStorage.setItem('ownerLang', lang);
                      window.dispatchEvent(new Event('languageChange'));
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${ownerLang === lang ? 'text-nm-primary font-bold bg-nm-soft-green/20' : 'text-gray-600'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-gray-50/50">
          <div className="text-center text-xs text-gray-400 my-4">
            Messages are automatically translated to your preferred language ({ownerLang}).
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'owner';
            // Translate predefined messages. Custom ones stay as is.
            let displayMessage = msg.customText || translations[ownerLang]?.[msg.messageKey] || translations['English'][msg.messageKey];
            
            // For customer messages, determine their original language (mock it as Japanese or English)
            const customerLang = localStorage.getItem('customerLang') || 'Japanese';
            const originalMessage = msg.customText || translations[customerLang]?.[msg.messageKey] || translations['English'][msg.messageKey];

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[75%] md:max-w-md rounded-2xl p-4 shadow-sm ${isMe ? 'bg-nm-primary text-white rounded-tr-sm' : 'bg-white text-nm-text-dark rounded-tl-sm border border-gray-100'}`}>
                  <p className="text-sm">{displayMessage}</p>
                </div>
                
                <div className={`flex items-center gap-2 mt-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                  {!isMe && msg.messageKey && (
                    <button 
                      onClick={() => toggleOriginal(msg.id)}
                      className="text-[10px] text-nm-primary hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      {showOriginal[msg.id] ? 'Hide Original' : 'View Original'}
                    </button>
                  )}
                </div>

                {!isMe && showOriginal[msg.id] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 p-3 bg-gray-200 rounded-lg text-xs text-gray-700 max-w-[75%] md:max-w-md italic border-l-2 border-gray-400"
                  >
                    <span className="font-semibold block mb-1">Original ({customerLang}):</span>
                    {originalMessage}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
            <input 
              type="text" 
              className="flex-1 input-field rounded-full py-3 px-6 bg-gray-50 border-gray-100 focus:bg-white"
              placeholder={`Type your reply in ${ownerLang}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit"
              className="w-12 h-12 rounded-full bg-nm-primary text-white flex items-center justify-center hover:bg-nm-primary-dark transition-colors shrink-0 shadow-soft"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default OwnerChat;
