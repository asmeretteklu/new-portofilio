import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 transition-opacity duration-500 pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="font-body uppercase tracking-[0.4em] mb-1"
        style={{ fontSize: '0.65rem', color: 'var(--blush-mid)', fontWeight: 700, textShadow: '0 0 10px rgba(255,255,255,0.8)' }}
      >
        scroll
      </span>
      <div 
        style={{
          width: '28px',
          height: '46px',
          border: '2px solid var(--blush-mid)',
          borderRadius: '14px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 15px rgba(237,147,177,0.2)'
        }}
      >
        <motion.div 
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '5px', height: '10px', background: 'var(--blush-mid)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
