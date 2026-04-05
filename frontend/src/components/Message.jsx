import { motion } from 'framer-motion';
import React from 'react';

const Message = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
    >
      <div className={`max-w-[85%] px-6 py-4 rounded-3xl shadow-2xl relative ${
        isUser 
          ? 'bg-[#a3b18a] text-[#1b1b1b] rounded-tr-none font-medium' // Olive green for user
          : 'bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-tl-none' // Glass for bot
      }`}>
        <p className="text-[15px] leading-relaxed tracking-wide">{message.text}</p>
        
        {/* Subtle Timestamp */}
        <span className={`text-[10px] mt-2 block opacity-40 ${isUser ? 'text-black' : 'text-white'}`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default Message;