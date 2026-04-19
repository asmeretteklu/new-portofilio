import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* Typewriter effect hook — 15ms per character */
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
        <div className="w-6 h-6 rounded-full bg-paper/10 flex items-center justify-center shrink-0 mr-2 mt-auto mb-1">
          <span className="font-display italic text-gold text-xs">L</span>
        </div>
      )}
      
      {/* CMD-10: Luna message bubbles use --rose-pale bg + left border */}
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-gold text-ink font-mono text-[0.82rem] rounded-br-sm' 
            : 'text-paper font-display text-lg leading-snug rounded-tl-sm'
        }`}
        style={!isUser ? {
          background: 'var(--rose-pale)',
          borderLeft: '2px solid var(--rose)',
        } : undefined}
      >
        {isUser ? (
          content
        ) : (
          <div dangerouslySetInnerHTML={{ 
            __html: displayedContent.replace(/Asmeret/g, '<span class="italic text-gold">Asmeret</span>') 
          }} />
        )}
      </div>
    </motion.div>
  );
};

export default Message;
