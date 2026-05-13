import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPanel from './ChatPanel';

const CrescentMoonIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LunaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
  };

  useEffect(() => {
    window.openLunaChat = () => {
      setIsOpen(true);
      if (!hasOpened) setHasOpened(true);
    };
  }, [hasOpened]);

  return (
    <div className="fixed bottom-6 right-6 sm:right-12 z-[999]">
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {/* Floating trigger button */}
      {!isOpen && (
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group w-16 h-16 rounded-full bg-[var(--midnight)] border border-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(224,163,135,0.3)] overflow-hidden"
        >
          {/* Pulsing Aura */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-[var(--accent)] rounded-full"
          />
          
          {/* Orb Core */}
          <div className="relative z-10 w-8 h-8 flex items-center justify-center">
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="w-full h-full bg-gradient-to-tr from-[var(--accent)] to-[var(--gold)] opacity-80"
            />
          </div>

          {/* Intelligence Signal */}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
          />
        </motion.button>
      )}
    </div>
  );
};

export default LunaChat;
