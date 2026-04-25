import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Minus, X, Trash2 } from 'lucide-react';
import Message from './Message';
import TypingDots from './TypingDots';
import StarterChips from './StarterChips';
import { lunaSystemPrompt } from '../../data/portfolio';

const API_KEY = import.meta.env.VITE_GROK_KEY || import.meta.env.VITE_GROQ_API_KEY;

const CrescentMoonSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownOpening, setHasShownOpening] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const conversationHistoryRef = useRef([]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && !hasShownOpening && messages.length === 0) {
      setHasShownOpening(true);
      const timer = setTimeout(() => {
        setMessages([{ 
          role: 'assistant', 
          content: "Hey! I'm Asmeret's assistance Luna 2 🌙\nI know everything about her — her work, her story, and how to reach her. What would you like to know? ✦", 
          isOpening: true 
        }]);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasShownOpening, messages.length]);

  const clearChat = () => {
    setMessages([]);
    setHasShownOpening(false);
    conversationHistoryRef.current = [];
  };

  const sendMessage = async (textToSend = input) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Note: Since the API key in .env starts with gsk_ (Groq), we must use the Groq API endpoint.
      // x.ai will reject this key with a 401 Unauthorized.
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 300,
            messages: [
              { role: 'system', content: lunaSystemPrompt },
              ...conversationHistoryRef.current,
              { role: 'user', content: textToSend }
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "I'm resting for a moment 🌙 Try again!";

      setMessages(prev => [...prev, { role: 'assistant', content: reply, typewriter: true }]);

      // Update conversation history
      conversationHistoryRef.current = [
        ...conversationHistoryRef.current,
        { role: 'user', content: textToSend },
        { role: 'assistant', content: reply }
      ];
    } catch (error) {
      console.error("Luna 2 error:", error);
      const errorMsg = 
        error.message.includes('401') 
          ? "I need a valid x.ai API key set up — check Netlify environment variables (you might be using a Groq key!)."
        : error.message.includes('429') 
          ? "I'm resting for a moment ✦ Try again shortly."
        : error.message.includes('network') || error.message.includes('Failed to fetch')
          ? "Lost my connection or CORS error 🌙 Check your console for details."
        : "Had a moment — try again! 🌙";

      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg, typewriter: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          {!isMini && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 z-[49]"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              onClick={onClose}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMini ? '64px' : (isMobile ? '55svh' : '480px')
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
            className="luna-chat-panel fixed z-50 flex flex-col overflow-hidden origin-bottom-right"
            style={{
              ...(isMobile ? {
                bottom: 16,
                left: 16,
                right: 16,
                width: 'auto',
                height: isMini ? '64px' : '55svh',
                borderRadius: 20,
              } : {
                bottom: 80,
                right: 48,
                width: 380,
                borderRadius: 16,
              }),
              background: 'rgba(14,18,28,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(196,133,106,0.25)',
              backgroundImage: 'radial-gradient(circle, rgba(196,133,106,0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderBottom: '1px solid rgba(196,133,106,0.15)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Animated crescent moon */}
                <motion.div
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: '#c4856a', display: 'flex', alignItems: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#c4856a" stroke="#c4856a" strokeWidth="0.5" />
                  </svg>
                </motion.div>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1.4rem',
                  color: '#c4856a',
                  lineHeight: 1,
                }}>
                  luna 2 ✦
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {messages.length > 0 && !isMini && (
                  <button 
                    onClick={clearChat}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#f5efe2', opacity: 0.5, padding: 4,
                      display: 'flex', alignItems: 'center',
                    }}
                    title="Clear chat"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button 
                  onClick={() => setIsMini(!isMini)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#f5efe2', opacity: 0.5, padding: 4,
                    display: 'flex', alignItems: 'center',
                  }}
                  title={isMini ? "Expand" : "Minimize"}
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={onClose}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#f5efe2', opacity: 0.5, padding: 4,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>


            {/* Messages */}
            {!isMini && (
              <div 
                className="flex-1 overflow-y-auto p-5 flex flex-col"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(196,133,106,0.04) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              >
                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col justify-end pb-4">
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.3rem',
                      color: '#f5efe2',
                      marginBottom: 4,
                      lineHeight: 1.3,
                    }}>
                      Hey, I'm Luna 🌙
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.82rem',
                      color: 'rgba(245,239,226,0.55)',
                      marginBottom: 16,
                      lineHeight: 1.6,
                    }}>
                      I know everything about Asmeret — her work, her story,<br />
                      and how to reach her. What would you like to know?
                    </p>
                    <StarterChips onSelect={sendMessage} />
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <Message key={i} role={msg.role} content={msg.content} typewriter={msg.typewriter || msg.isOpening} />
                ))}
                
                {isLoading && <TypingDots />}
                
                <div ref={messagesEndRef} className="h-1 shrink-0" />
              </div>
            )}

            {/* Input */}
            {!isMini && (
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(196,133,106,0.15)',
                flexShrink: 0,
              }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask Luna anything..."
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      borderRadius: 100,
                      padding: '12px 48px 12px 18px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.82rem',
                      outline: 'none',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(196,133,106,0.2)',
                      color: '#f5efe2',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(196,133,106,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(196,133,106,0.2)'}
                  />
                  <button 
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    style={{
                      position: 'absolute',
                      right: 4,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#c4856a',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      opacity: (!input.trim() || isLoading) ? 0.4 : 1,
                    }}
                  >
                    <CrescentMoonSmall />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
