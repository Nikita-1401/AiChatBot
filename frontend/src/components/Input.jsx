import React, { useState } from 'react';

const Input = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative group">
      {/* Subtle Olive Glow on focus */}
      <div className="absolute -inset-0.5 bg-[#707a33] rounded-[24px] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>
      
      <div className="relative bg-white border-2 border-[#707a33]/20 rounded-[22px] flex items-center pr-2 focus-within:border-[#707a33] transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about classes, coaches, or infrastructure..."
          className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 px-6 py-4 resize-none text-base h-[56px] flex items-center"
          rows={1}
        />

        <button 
          onClick={handleSubmit}
          className="p-2 bg-[#707a33] text-white rounded-xl hover:bg-[#5a6328] transition-all transform active:scale-90 shadow-md"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-330 mb-0.5">
            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87.99l.01 4.61c0 .71.73 1.2 1.39.92z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Input;