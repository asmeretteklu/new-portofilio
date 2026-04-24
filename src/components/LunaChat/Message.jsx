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
          background: '#c4913a',
          color: '#090b10',
          borderRadius: '12px 12px 2px 12px',
          fontFamily: "'DM Mono', 'DM Sans', monospace",
          fontSize: '0.78rem',
          lineHeight: 1.6,
        } : {
          maxWidth: '85%',
          padding: '12px 16px',
          background: 'rgba(196,133,106,0.08)',
          borderLeft: '2px solid #c4856a',
          color: '#f5efe2',
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
              __html: displayedContent.replace(/Asmeret/g, '<span style="color:#c4856a;font-style:italic">Asmeret</span>') 
            }} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default Message;
