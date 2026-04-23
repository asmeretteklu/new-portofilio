import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPanel from './ChatPanel';

const CrescentMoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LunaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:right-12 z-[999]">
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <motion.button
        drag
        dragConstraints={{ left: -window.innerWidth + 100, right: 0, top: -window.innerHeight + 100, bottom: 0 }}
        whileHover={{ scale: 1.1, shadow: '0 0 25px rgba(237,147,177,0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
        className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all relative z-[1000] cursor-grab active:cursor-grabbing"
        style={{
          background: 'var(--blush-mid)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 10px 30px rgba(237,147,177,0.4)',
        }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CrescentMoonIcon />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-display text-[8px] uppercase tracking-tighter opacity-80">Luna</span>
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {!hasOpened && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
            style={{ background: '#4ade80', border: '2px solid var(--bg)', color: 'white' }}
          >
            1
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default LunaChat;
