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

  return (
    <div className="fixed bottom-6 right-6 sm:right-12 z-[999]">
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {/* Floating trigger button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleOpen}
          className="luna-float-btn"
          title="Ask me about Asmeret ✦"
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#c4856a',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(196,133,106,0.35)',
            position: 'relative',
            zIndex: 1000,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CrescentMoonIcon size={22} />
            </motion.div>
          </AnimatePresence>

          {/* Unread badge — gold dot */}
          {!hasOpened && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#c4913a',
                border: '2px solid rgba(14,18,28,0.9)',
              }}
            />
          )}
        </motion.button>
      )}
    </div>
  );
};

export default LunaChat;
