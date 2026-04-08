import Chatbot from './components/Chatbot';
import React from 'react';

function App() {
  return (
    <div className="h-screen w-full bg-[#f4f4f0] flex items-center justify-center overflow-hidden">
       {/* Subtle background texture or gradient */}
       <div className="absolute inset-0 bg-gradient-to-tr from-[#e2e2d5] to-[#f4f4f0] z-0" />
       <Chatbot />
    </div>
  );
}

export default App;