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
    // If Enter is pressed without Shift, send the message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative group drop-shadow-[0_0_20px_rgba(138,43,226,0.2)]">
      <div 
        className="relative bg-[#120d1d]/90 backdrop-blur-2xl rounded-[24px] p-1 flex items-center"
        style={{ 
          border: '1.5px solid transparent',
          borderImage: 'linear-gradient(to right, #8a2be2, #d2691e) 1',
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Provide complex widgets to improve..."
          className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 px-6 py-4 resize-none text-base h-[60px] flex items-center"
          rows={1}
        />

        <button 
          onClick={handleSubmit}
          className="mr-4 text-[#a3b18a] hover:text-white transition-all transform hover:scale-110 active:scale-90"
        >
          {/* Paper Plane Icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 rotate-330">
            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87.99l.01 4.61c0 .71.73 1.2 1.39.92z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Input;