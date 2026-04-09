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
      <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm relative ${
        isUser 
          ? 'bg-[#707a33] text-white rounded-tr-none' 
          : 'bg-[#eeeee4] text-[#2d2d2d] rounded-tl-none border border-gray-200'
      }`}>
        <p className="text-[15px] leading-relaxed tracking-wide">{message.text}</p>
        
        <span className={`text-[10px] mt-1.5 block opacity-60 font-mono ${isUser ? 'text-white' : 'text-gray-500'}`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default Message;