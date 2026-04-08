import React,{ useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Message from './Message';
import Input from './Input';
import { fetchBotResponse } from '../services/api.js';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome to Ars Kreedashala. How can I help you today?", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsTyping(true);
    try {
      const botReply = await fetchBotResponse(text);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Connection error. Please try again later.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full md:h-[90vh] md:max-w-5xl flex flex-col z-10 bg-white md:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      {/* Header - Ars Kreedashala Branding */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#707a33] text-white">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          <span className="font-bold tracking-tight text-lg">KREEDASHALA AI</span>
        </div>
        <div className="text-white/80 text-xs font-medium uppercase tracking-widest hidden sm:block">
          Official Support
        </div>
      </header>

      {/* Message Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-[#f9f9f7] scrollbar-thin scrollbar-thumb-gray-300"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                      className="text-[#707a33] text-xs font-semibold ml-4 animate-bounce">
            Kreedashala AI is typing...
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;