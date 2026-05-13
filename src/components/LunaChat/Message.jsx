import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useTypewriter = (text, speed = 15, enabled = false) => {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }

    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayed;
};

const Message = ({ role, content, typewriter = false }) => {
  const isUser = role === 'user';
  const displayedContent = useTypewriter(content, 18, typewriter && !isUser);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 w-full`}
    >
      <div 
        style={isUser ? {
          maxWidth: '85%',
          padding: '10px 16px',
          background: 'var(--accent)',
          color: 'var(--onyx)',
          borderRadius: '12px 12px 2px 12px',
          fontFamily: "'DM Mono', 'DM Sans', monospace",
          fontSize: '0.78rem',
          lineHeight: 1.6,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        } : {
          maxWidth: '85%',
          padding: '12px 16px',
          background: 'var(--accent-light)',
          borderLeft: '2px solid var(--accent)',
          color: 'var(--text)',
          borderRadius: '12px 12px 12px 2px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1rem',
          lineHeight: 1.6,
        }}
      >
        {isUser ? (
          content
        ) : (
          <div 
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ 
              __html: displayedContent.replace(/Asmeret/g, '<span style="color:var(--accent);font-style:italic;font-weight:500">Asmeret</span>') 
            }} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default Message;
