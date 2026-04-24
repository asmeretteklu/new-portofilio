import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects, lunaSystemPrompt } from '../data/portfolio';

const LunaFeature = () => {
  const { ref, controls, variants } = useScrollReveal();
  const luna = projects.find(p => p.id === 'luna');
  
  useEffect(() => {
    (function() {
      // ── API KEY CONFIGURATION ──
      const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
      // ─────────────────────────────────────

      let conversationHistory = [];
      let isWaiting = false;

      const messagesEl = document.getElementById("lunaMessages");
      const inputEl = document.getElementById("lunaInput");
      const sendBtn = document.getElementById("lunaSend");
      const typingEl = document.getElementById("lunaTyping");

      if (!messagesEl || !inputEl || !sendBtn) return;
      
      // Clear messages on mount to prevent double init in strict mode
      messagesEl.innerHTML = "";
      conversationHistory = [];

      function addMsg(text, sender) {
        const div = document.createElement("div");
        div.className = "luna-msg " + (sender === "luna" ? "assistant-msg" : "user-msg");
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }

      function addQuickReplies() {
        const chipsDiv = document.createElement("div");
        chipsDiv.className = "luna-chips";
        chipsDiv.id = "lunaChips";
        chipsDiv.innerHTML = `
          <button class="luna-chip" onclick="chipClick('What has Asmeret built?')">What has she built? ✦</button>
          <button class="luna-chip" onclick="chipClick('Tell me about Luna AI')">Luna AI 🌙</button>
          <button class="luna-chip" onclick="chipClick('What makes Asmeret different?')">What makes her different? 💛</button>
          <button class="luna-chip" onclick="chipClick('How do I work with Asmeret?')">Work with her 📩</button>
        `;
        messagesEl.appendChild(chipsDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }

      window.chipClick = function(text) {
        const chips = document.getElementById("lunaChips");
        if (chips) chips.remove();
        addMsg(text, "user");
        sendToLuna(text);
      };

      addMsg("Hey, I'm Luna 🌙 I know everything about Asmeret — her work, her story, and how to reach her. What would you like to know?", "luna");
      addQuickReplies();

      async function sendToLuna(userText) {
        if (isWaiting || !userText.trim()) return;
        isWaiting = true;
        sendBtn.disabled = true;

        typingEl.style.display = "flex";
        messagesEl.scrollTop = messagesEl.scrollHeight;

        try {
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
                  ...conversationHistory,
                  { role: 'user', content: userText }
                ],
              }),
            }
          );

          if (!response.ok) throw new Error("API error " + response.status);

          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content || "Luna is resting 🌙 Try again in a moment.";

          conversationHistory.push(
            { role: 'user', content: userText },
            { role: 'assistant', content: reply }
          );
          typingEl.style.display = "none";
          addMsg(reply, "luna");

        } catch (err) {
          console.error("Luna error:", err);
          typingEl.style.display = "none";
          const errorMsg = 
            err.message.includes('401') 
              ? "Luna needs her API key set up — check Netlify environment variables."
            : err.message.includes('429') 
              ? "Luna is resting for a moment ✦ Try again shortly."
            : "Luna had a moment — try again! 🌙";
          addMsg(errorMsg, "luna");
        }

        isWaiting = false;
        sendBtn.disabled = false;
        inputEl.focus();
      }

      // Remove existing event listeners by cloning
      const newSendBtn = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
      const newInputEl = inputEl.cloneNode(true);
      inputEl.parentNode.replaceChild(newInputEl, inputEl);
      
      newSendBtn.addEventListener("click", function() {
        const text = newInputEl.value.trim();
        if (!text) return;
        addMsg(text, "user");
        newInputEl.value = "";
        sendToLuna(text);
      });

      newInputEl.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          newSendBtn.click();
        }
      });
    })();
  }, []);

  return (
    <section id="luna" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <div className="luna-featured-card">
            <div className="luna-info">
              <span className="luna-badge">✦ Featured Project · AI for Women's Health</span>
              <h2 className="luna-title">Luna — <em>AI for women's health in Africa</em></h2>
              <blockquote className="luna-quote">"I built Luna because no woman in my family had access to a doctor they could talk to honestly. That has to change."</blockquote>
              <p className="luna-desc" style={{ color: 'var(--text-mid)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                <span className="lead">Women's health & menstrual cycle intelligence app for Ethiopian and African women.</span>
                Phase-based AI recommendations. Adjusted nutritional AI models for Ethiopian dietary staples like Teff and regional fasting cycles.
              </p>
              <div className="luna-tags flex flex-wrap gap-2 mb-8">
                <span className="pill pill-blush font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--blush-light)] text-[var(--blush-mid)]">React Native</span>
                <span className="pill pill-lavender font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--lavender-light)] text-[var(--lavender)]">Gemini AI</span>
                <span className="pill pill-gold font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--gold-light)] text-[var(--gold)]">Supabase</span>
                <span className="pill pill-taupe font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[#f5e6e8] text-[var(--taupe)]">Amharic NLP</span>
              </div>
              <div className="luna-try-hint">
                Try it live
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <path d="M0 8 Q20 2 38 8" stroke="#ED93B1" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                  <path d="M34 5 L38 8 L34 11" stroke="#ED93B1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="luna-chat-widget">
              <div className="luna-chat-header">
                <div className="luna-avatar">✦</div>
                <div><div className="luna-chat-name">Luna</div><div className="luna-chat-sub">Asmeret's AI Assistant</div></div>
                <div className="luna-online-dot"></div>
              </div>
              <div className="luna-messages-wrap">
                <div className="luna-messages" id="lunaMessages"></div>
              </div>
              <div className="luna-typing" id="lunaTyping" style={{ display: 'none' }}><span></span><span></span><span></span></div>
              <div className="luna-input-bar">
                <input type="text" id="lunaInput" placeholder="Ask Luna anything..." autoComplete="off" />
                <button id="lunaSend" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LunaFeature;
