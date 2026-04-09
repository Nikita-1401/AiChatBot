import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen w-full bg-[#f4f4f0] overflow-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="h-full flex flex-col justify-center px-10 md:px-20 z-0">
        <h1 className="text-6xl font-bold text-[#2d2d2d] mb-4">
          Find out why we're <br /> <span className="text-[#707a33]">best-in-class</span>
        </h1>
        <p className="text-gray-600 max-w-lg text-lg">
          Our team of expert coaches, combined with technology, nurtures future champions by delivering outstanding results.
        </p>
      </section>

      {/* --- FLOATING RECTANGULAR ICON (Right Side) --- */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#707a33] text-white px-4 py-8 rounded-l-2xl shadow-2xl flex flex-col items-center gap-2 hover:bg-[#5a6328] transition-all z-40 group"
      >
        <span className="[writing-mode:vertical-lr] font-bold tracking-widest uppercase text-sm">
          Chat with AI
        </span>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse mt-2" />
      </button>

      {/* --- SLIDE-OUT CHATBOT SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close when clicking outside */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* The Sidebar (20% Width, 90% Height) */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[5%] h-[90vh] w-full sm:w-[350px] md:w-[30%] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 rounded-l-3xl overflow-hidden flex flex-col"
            >
              {/* Close Button inside Sidebar */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-2 text-black font-bold hover:text-black transition z-50"
              >
                ✕
              </button>
              
              <Chatbot />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;