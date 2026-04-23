import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2, Minus } from 'lucide-react';
import Message from './Message';
import TypingDots from './TypingDots';
import StarterChips from './StarterChips';
import { lunaSystemPrompt } from '../../data/portfolio';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: lunaSystemPrompt
});

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
  return "Something went wrong 🌙 Try again in a moment.";
};

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownOpening, setHasShownOpening] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const messagesEndRef = useRef(null);

  // Maintain chat session in a ref to persist across renders but allow resets
  const chatRef = useRef(null);

  const initChat = useCallback(() => {
    chatRef.current = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are Luna, a warm and empathetic digital assistant for Asmeret's portfolio. Your tone is blush-aesthetic, kind, and focused on wellness and growth. Keep responses concise." }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'm Luna. I'm here to help you explore Asmeret's work with a focus on balance and positivity. ✦" }],
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (!chatRef.current) initChat();
  }, [initChat]);

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
    initChat();
  };

  const sendMessage = async (textToSend = input) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) initChat();
      
      const result = await chatRef.current.sendMessage(textToSend);
      const aiText = result.response.text();

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
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMini ? '72px' : '480px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl origin-bottom-right
              sm:bottom-24 sm:right-12 sm:w-[360px] sm:rounded-2xl
              max-sm:inset-0 max-sm:rounded-none"
            style={{
              background: 'var(--card-bg)',
              border: '0.5px solid var(--border-color)',
              color: 'var(--text)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '0.5px solid var(--border-color)', background: 'var(--bg)' }}>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#4ade80' }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4ade80' }}></span>
                  </span>
                  <span className="font-display italic text-2xl leading-none" style={{ color: 'var(--blush-mid)' }}>luna</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {messages.length > 0 && !isMini && (
                  <button 
                    onClick={clearChat} 
                    className="p-1.5 rounded-full transition-colors hover:text-blush-mid"
                    style={{ color: 'var(--text-muted)' }}
                    title="Clear chat"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button 
                  onClick={() => setIsMini(!isMini)} 
                  className="p-1.5 rounded-full transition-colors hover:text-blush-mid"
                  style={{ color: 'var(--text-muted)' }}
                  title={isMini ? "Expand" : "Minimize"}
                >
                  <Minus size={18} />
                </button>
                <button 
                  onClick={onClose} 
                  className="p-1.5 rounded-full transition-colors hover:text-blush-mid"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMini && (
              <div className="luna-chat-dots flex-1 overflow-y-auto p-5 flex flex-col">
                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col justify-end pb-4">
                    <p className="font-display text-xl mb-1" style={{ color: 'var(--text)' }}>
                      Hi, I'm Luna 🌙
                    </p>
                    <p className="font-body text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
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
            )}

            {/* Input */}
            {!isMini && (
              <div className="p-4" style={{ borderTop: '0.5px solid var(--border-color)', background: 'var(--bg)' }}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask something..."
                    disabled={isLoading}
                    className="w-full rounded-full py-3 pl-4 pr-12 font-body text-sm outline-none transition-colors disabled:opacity-50"
                    style={{ background: 'var(--card-bg)', border: '0.5px solid var(--border-color)', color: 'var(--text)' }}
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
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPanel;
