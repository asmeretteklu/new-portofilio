import { useState, useEffect } from 'react';

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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span
        className="font-body uppercase tracking-[0.25em]"
        style={{ fontSize: '0.58rem', color: 'var(--muted)', opacity: 0.6 }}
      >
        scroll to explore
      </span>
      <span
        style={{
          fontSize: '1rem',
          opacity: 0.5,
          color: 'var(--blush-mid)',
          animation: 'bounce-gentle 1.5s ease-in-out infinite',
        }}
      >
        ∨
      </span>
    </div>
  );
};

export default ScrollIndicator;
