import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPanel from './ChatPanel';

/* CMD-10: Crescent Moon SVG icon for floating button */
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
    <div className="fixed bottom-6 right-6 sm:right-12 z-[90]">
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {/* CMD-10: Rose background instead of gold, crescent moon icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className="w-14 h-14 rounded-full flex items-center justify-center text-ink shadow-[0_0_20px_rgba(196,133,106,0.3)] hover:shadow-[0_0_30px_rgba(196,133,106,0.5)] transition-shadow relative z-50 border-2"
        style={{
          background: 'var(--rose)',
          borderColor: 'rgba(196,133,106,0.5)',
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread indicator popup */}
        {!hasOpened && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-teal-light rounded-full border-2 border-ink"
          />
        )}
      </motion.button>
    </div>
  );
};

export default LunaChat;
