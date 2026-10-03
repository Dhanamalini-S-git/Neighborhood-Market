import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Globe, Languages } from 'lucide-react';
import Navbar from '../components/Navbar';
import { shops } from '../data/dummyData';
import { translations, chatHistory } from '../data/chatData';
import { motion } from 'framer-motion';

const Chat = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const shop = shops.find(s => s.id === shopId) || shops[0];
  
  const [messages, setMessages] = useState(chatHistory);
  const [inputValue, setInputValue] = useState('');
  const [customerLang, setCustomerLang] = useState(localStorage.getItem('customerLang') || 'English');
  const [showOriginal, setShowOriginal] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleLangChange = () => {
      setCustomerLang(localStorage.getItem('customerLang') || 'English');
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
      sender: 'customer',
      customText: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-nm-off-white flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <div className="flex-1 max-w-3xl w-full mx-auto md:mt-16 flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] bg-white md:border-x border-gray-100 shadow-sm relative">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn-icon">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-nm-text-dark">{shop.name}</h2>
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
              Translating to {customerLang}
            </button>
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-premium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="py-2">
                <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">Select Language</p>
                {['English', 'Japanese', 'Tamil', 'Spanish', 'Hindi'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => {
                      setCustomerLang(lang);
                      localStorage.setItem('customerLang', lang);
                      window.dispatchEvent(new Event('languageChange'));
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${customerLang === lang ? 'text-nm-primary font-bold bg-nm-soft-green/20' : 'text-gray-600'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
          <div className="text-center text-xs text-gray-400 my-4">
            Messages are automatically translated to your preferred language ({customerLang}).
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'customer';
            // If it's a predefined message, translate it. If it's a custom typed message, just show it.
            let displayMessage = msg.customText || translations[customerLang]?.[msg.messageKey] || translations['English'][msg.messageKey];
            
            // For the owner's messages, determine their original language (mock it as Tamil)
            const ownerLang = localStorage.getItem('ownerLang') || 'Tamil';
            const originalMessage = msg.customText || translations[ownerLang]?.[msg.messageKey] || translations['English'][msg.messageKey];

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${isMe ? 'bg-nm-primary text-white rounded-tr-sm' : 'bg-white text-nm-text-dark rounded-tl-sm border border-gray-100'}`}>
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
                    className="mt-2 p-2 bg-gray-200 rounded-lg text-xs text-gray-600 max-w-[75%] italic border-l-2 border-gray-400"
                  >
                    <span className="font-semibold block mb-1">Original ({ownerLang}):</span>
                    {originalMessage}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100 pb-20 md:pb-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 input-field rounded-full py-3"
              placeholder={`Type a message in ${customerLang}...`}
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

export default Chat;
