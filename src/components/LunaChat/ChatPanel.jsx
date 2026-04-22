import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2 } from 'lucide-react';
import Message from './Message';
import TypingDots from './TypingDots';
import StarterChips from './StarterChips';
import { lunaSystemPrompt } from '../../data/portfolio';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GREETINGS = [
  "Hey! I'm Luna 🌙 Ask me anything about Asmeret — her work, her story, or how to reach her.",
  "Hi there ✦ I'm Luna, Asmeret's AI assistant. What would you like to know?",
  "Welcome! 🌙 I'm Luna — I know everything about Asmeret. Ask away!",
  "Hey friend! ✦ I'm Luna. Let me tell you about Asmeret's incredible journey.",
];

const getErrorMessage = (err) => {
  const msg = err.message || err.toString();
  if (msg.includes('429') || msg.toLowerCase().includes('rate')) {
    return "Luna is resting for a moment ✦ Try again in a few seconds.";
  }
  if (msg.includes('API Key') || msg.includes('key') || msg.includes('missing')) {
    return "Luna needs her API key to chat — check the README 🌙";
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('Failed')) {
    return "Luna's connection dropped 🌙 Check your internet and try again.";
  }
  return "Something went wrong 🌙 Try again in a moment.";
};

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownOpening, setHasShownOpening] = useState(false);
  const messagesEndRef = useRef(null);

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
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      const timer = setTimeout(() => {
        setMessages([{ role: 'assistant', content: greeting, isOpening: true }]);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasShownOpening, messages.length]);

  const clearChat = () => {
    setMessages([]);
    setHasShownOpening(false);
  };

  const sendMessage = async (textToSend = input) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payloadMessages = nextMessages
        .filter(m => !m.isOpening)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

      let aiText = '';
      
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payloadMessages, systemPrompt: lunaSystemPrompt })
        });
        
        if (res.ok) {
          const data = await res.json();
          aiText = data.text;
        } else {
          throw new Error('Serverless function not available');
        }
      } catch (serverError) {
        if (!API_KEY) throw new Error('API Key missing');
        
        const fallbackRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: lunaSystemPrompt }] },
            contents: payloadMessages
          })
        });

        const fallbackData = await fallbackRes.json();
        if (fallbackData.error) throw new Error(fallbackData.error.message || 'Fallback API Error');
        
        aiText = fallbackData.candidates[0].content.parts[0].text;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiText, typewriter: true }]);
    } catch (err) {
      console.error("Luna AI error:", err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: getErrorMessage(err),
        typewriter: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 z-[49]"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl origin-bottom-right
              sm:bottom-24 sm:right-12 sm:w-[360px] sm:h-[480px] sm:rounded-2xl
              max-sm:inset-0 max-sm:rounded-none"
            style={{
              background: 'var(--dark)',
              border: '0.5px solid rgba(237,147,177,0.2)',
              color: '#f0e8e0',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '0.5px solid rgba(237,147,177,0.15)', background: 'rgba(30,20,30,0.6)' }}>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#4ade80' }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4ade80' }}></span>
                  </span>
                  <span className="font-display italic text-2xl leading-none" style={{ color: 'var(--blush-mid)' }}>luna</span>
                </div>
                <span className="font-body mt-1" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(240,232,224,0.5)' }}>
                  Ask about Asmeret ✦
                </span>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button 
                    onClick={clearChat} 
                    className="p-1.5 rounded-full transition-colors"
                    style={{ color: 'rgba(240,232,224,0.3)' }}
                    title="Clear chat"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button 
                  onClick={onClose} 
                  className="p-1.5 rounded-full transition-colors"
                  style={{ color: 'rgba(240,232,224,0.6)' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="luna-chat-dots flex-1 overflow-y-auto p-5 flex flex-col">
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col justify-end pb-4">
                  <p className="font-display text-xl mb-1" style={{ color: 'rgba(240,232,224,0.6)' }}>
                    Hi, I'm Luna 🌙
                  </p>
                  <p className="font-body text-sm mb-4" style={{ color: 'rgba(240,232,224,0.35)' }}>
                    I'm trained on Asmeret's portfolio and journey. Ask me anything!
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

            {/* Input */}
            <div className="p-4" style={{ borderTop: '0.5px solid rgba(237,147,177,0.15)', background: 'rgba(30,20,30,0.7)' }}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="w-full rounded-full py-3 pl-4 pr-12 font-body text-sm outline-none transition-colors disabled:opacity-50"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(237,147,177,0.2)', color: '#f0e8e0' }}
                />
                <button 
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all text-white"
                  style={{ background: 'var(--blush-mid)' }}
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
