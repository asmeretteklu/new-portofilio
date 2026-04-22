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
      {!isUser && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-auto mb-1" style={{ background: 'rgba(237,147,177,0.15)' }}>
          <span className="font-display italic text-xs" style={{ color: 'var(--blush-mid)' }}>L</span>
        </div>
      )}
      
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'font-body text-sm rounded-br-sm text-white' 
            : 'font-display text-lg leading-snug rounded-tl-sm'
        }`}
        style={isUser ? {
          background: 'var(--blush-mid)',
        } : {
          background: 'rgba(237,147,177,0.08)',
          borderLeft: '2px solid var(--blush-mid)',
          color: '#f0e8e0',
        }}
      >
        {isUser ? (
          content
        ) : (
          <div dangerouslySetInnerHTML={{ 
            __html: displayedContent.replace(/Asmeret/g, '<span class="italic" style="color:var(--blush-mid)">Asmeret</span>') 
          }} />
        )}
      </div>
    </motion.div>
  );
};

export default Message;
