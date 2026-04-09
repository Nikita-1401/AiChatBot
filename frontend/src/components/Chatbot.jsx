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
  <div className="w-full h-full flex flex-col bg-white">
    {/* Header */}
    <header className="flex items-center justify-between px-6 py-5 bg-[#707a33] text-white flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm">KREEDASHALA AI</span>
      </div>
    </header>

    {/* Message Area */}
    <div 
      ref={scrollRef} 
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-[#f9f9f7] scrollbar-none"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </AnimatePresence>
      
      {isTyping && (
        <div className="text-[#707a33] text-[10px] font-bold ml-4 animate-pulse">
          TYPING...
        </div>
      )}
    </div>

    {/* Input Area */}
    <div className="p-4 border-t border-gray-100 bg-white">
      <Input onSend={handleSend} />
    </div>
  </div>
  );
};

export default Chatbot;