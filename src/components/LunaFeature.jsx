import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/portfolio';

const LunaFeature = () => {
  const { ref, controls, variants } = useScrollReveal();
  const luna = projects.find(p => p.id === 'luna');
  
  useEffect(() => {
    (function() {
      // ── API KEY CONFIGURATION ──
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      // ─────────────────────────────────────

      const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

      const LUNA_SYSTEM = "You are Luna, a warm friendly knowledgeable AI assistant for women's health built for Ethiopian and African women by Asmeret Teklu. Answer health questions with empathy warmth and accuracy. You are not a doctor but give clear helpful culturally sensitive information. Be encouraging and kind. Keep responses 2-4 sentences max. End with 🌸";

      let lunaHistory = [];
      let isWaiting = false;

      const messagesEl = document.getElementById("lunaMessages");
      const inputEl = document.getElementById("lunaInput");
      const sendBtn = document.getElementById("lunaSend");
      const typingEl = document.getElementById("lunaTyping");

      if (!messagesEl || !inputEl || !sendBtn) return;
      
      // Clear messages on mount to prevent double init in strict mode
      messagesEl.innerHTML = "";
      lunaHistory = [];

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
          <button class="luna-chip" onclick="chipClick('Period pain 🌸')">Period pain 🌸</button>
          <button class="luna-chip" onclick="chipClick('Irregular cycles')">Irregular cycles</button>
          <button class="luna-chip" onclick="chipClick('Ethiopian diet & health')">Ethiopian diet & health</button>
          <button class="luna-chip" onclick="chipClick('Cycle tracking tips')">Cycle tracking tips</button>
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

      addMsg("Hi! I'm Luna 🌸 I'm here to answer your women's health questions safely and privately. What's on your mind?", "luna");
      addQuickReplies();

      async function sendToLuna(userText) {
        if (isWaiting || !userText.trim()) return;
        isWaiting = true;
        sendBtn.disabled = true;

        lunaHistory.push({ role: "user", parts: [{ text: userText }] });

        typingEl.style.display = "flex";
        messagesEl.scrollTop = messagesEl.scrollHeight;

        try {
          const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: LUNA_SYSTEM }] },
              contents: lunaHistory,
              generationConfig: { maxOutputTokens: 300, temperature: 0.75 }
            })
          });

          if (!response.ok) throw new Error("API error " + response.status);

          const data = await response.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "I'm having a little trouble right now 🌸 Please try again in a moment.";

          lunaHistory.push({ role: "model", parts: [{ text: reply }] });
          typingEl.style.display = "none";
          addMsg(reply, "luna");

        } catch (err) {
          console.error("Luna error:", err);
          typingEl.style.display = "none";
          addMsg("I'm having a little trouble connecting right now 🌸 Please try again in a moment.", "luna");
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
                <span className="pill pill-blush font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--blush-light)] text-[var(--blush-mid)]">Flutter</span>
                <span className="pill pill-lavender font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--lavender-light)] text-[var(--lavender)]">Gemini AI</span>
                <span className="pill pill-gold font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--gold-light)] text-[var(--gold)]">Firebase</span>
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
                <div><div className="luna-chat-name">Luna</div><div className="luna-chat-sub">Women's Health AI</div></div>
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

