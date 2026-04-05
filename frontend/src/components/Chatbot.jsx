import  React,{ useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Message from './Message';
import Input from './Input';
import { fetchBotResponse } from '../services/api.js';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Ai bot is now  Online.", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    // 1. Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsTyping(true);

    try {
      // 2. REAL BACKEND CALL (No more setTimeout)
      const botReply = await fetchBotResponse(text);
      
      // 3. Add AI response
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { text: "Error: Check if backend server is running on port 5000.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans"
         style={{ background: 'radial-gradient(circle at center, #1b0a3d 0%, #08060f 100%)' }}>
      
      <div className="w-full max-w-6xl h-full flex flex-col z-10">
        <header className="flex items-center justify-between py-4 border-b border-[#a3b18a]/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a3b18a] animate-pulse" />
            <span className="text-white/70 font-medium tracking-widest text-sm uppercase">AI CHATBOT</span>
          </div>
          <div className="text-[#a3b18a] text-xs font-bold">NODE_ACTIVE</div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 space-y-6 scrollbar-none">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="text-[#a3b18a] text-xs font-mono ml-4 tracking-widest animate-pulse">
              SYNCING_WITH_GEMINI_3...
            </motion.div>
          )}
        </div>

        <div className="w-full max-w-4xl mx-auto pt-6 pb-4">
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;