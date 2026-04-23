import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const SYSTEM_PROMPT = "You are Luna, a warm, friendly, and knowledgeable AI assistant for women's health, built for Ethiopian and African women by Asmeret Teklu. You answer health questions with empathy, warmth, and accuracy. You are not a doctor but you give clear, helpful, culturally sensitive information. Always be encouraging and kind. Keep responses concise and clear. Sign off warmly.";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const TypingDots = () => (
  <div className="flex space-x-1.5 p-2 px-3 bg-[var(--blush-light)] rounded-2xl w-fit border border-[var(--blush)]">
    <motion.div className="w-1.5 h-1.5 bg-[var(--blush-mid)] rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
    <motion.div className="w-1.5 h-1.5 bg-[var(--blush-mid)] rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
    <motion.div className="w-1.5 h-1.5 bg-[var(--blush-mid)] rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
  </div>
);

const LunaChatWidget = () => {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi! I'm Luna 🌸 I'm here to answer your women's health questions safely and privately. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Format messages for Gemini API
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: conversationHistory,
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text
        || "I'm having a little trouble connecting right now 🌸 Please try again in a moment.";
      
      setMessages(prev => [...prev, { role: 'model', content: aiResponseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm having a little trouble connecting right now 🌸 Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full h-[540px] flex flex-col overflow-hidden relative"
      style={{ 
        background: '#FFFFFF', 
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(237,147,177,0.12)',
        border: '1.5px solid var(--blush)'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-[var(--blush)] shrink-0 relative z-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-display italic text-lg" style={{ background: 'var(--blush-mid)', color: 'white' }}>
          ✦
        </div>
        <div className="flex flex-col">
          <span className="font-display font-semibold text-lg leading-tight" style={{ color: 'var(--dark)' }}>Luna</span>
          <span className="font-body text-xs" style={{ color: 'var(--muted)' }}>Women's Health AI</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ background: '#FFFFFF' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-[0.9rem] leading-relaxed shadow-sm`}
              style={
                msg.role === 'user' 
                  ? { background: 'var(--blush-mid)', color: '#FFFFFF', borderBottomRightRadius: '4px' }
                  : { background: 'var(--blush-light)', color: 'var(--dark)', border: '1px solid var(--blush)', borderBottomLeftRadius: '4px' }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <TypingDots />
          </div>
        )}
        <div ref={messagesEndRef} className="shrink-0 h-1" />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-[var(--blush)] shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
            disabled={isLoading}
            className="w-full rounded-full py-2.5 pl-4 pr-12 font-body text-sm outline-none transition-colors disabled:opacity-50"
            style={{ background: 'var(--bg)', border: '1px solid var(--blush)', color: 'var(--dark)' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 p-2 rounded-full transition-all disabled:opacity-50 hover:scale-105 active:scale-95 flex items-center justify-center text-white"
            style={{ background: 'var(--blush-mid)' }}
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LunaChatWidget;
