import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('splash_shown')) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('splash_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--ivory)' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-display italic"
            style={{ fontSize: '7rem', lineHeight: 1, color: 'var(--blush-mid)' }}
          >
            AT
          </motion.span>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mt-6 origin-left"
            style={{
              width: '120px',
              height: '1px',
              background: 'var(--blush-mid)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
