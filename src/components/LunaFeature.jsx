import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Shield, Globe, CheckCircle2, Ticket } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const RegisterButton = () => {
  const [step, setStep] = useState('idle'); // 'idle', 'email', 'ticket'
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSending(true);
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(serviceId, templateId, {
            from_name: "Luna Alpha Waitlist",
            from_email: email,
            message: `New Luna Alpha Registration from: ${email}`
          }, publicKey);
        } catch (err) {
          console.error("Registration error:", err);
        }
      }
      
      setStep('ticket');
      setIsSending(false);
    }
  };

  return (
    <div className="relative group">
      {step === 'idle' && (
        <button 
          onClick={() => setStep('email')}
          className="px-6 py-2 rounded-full border border-[var(--accent)] text-[var(--accent)] text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--accent)] hover:text-[var(--onyx)] transition-all flex items-center gap-2 group/cta shadow-[0_0_15px_rgba(224,163,135,0.2)]"
        >
          <Ticket className="w-3 h-3" />
          <span>Get Pre-Access</span>
        </button>
      )}

      {step === 'email' && (
        <motion.form 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleRegister}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[var(--midnight)] border border-[var(--border)] rounded-full px-4 py-2 text-[10px] text-[var(--text)] outline-none focus:border-[var(--accent)] transition-all w-48"
          />
          <button 
            type="submit"
            className="px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--onyx)] text-[10px] uppercase tracking-widest font-bold hover:brightness-110 transition-all"
          >
            Claim
          </button>
        </motion.form>
      )}

      {step === 'ticket' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-[280px] p-6 bg-[var(--midnight)] border border-[var(--accent)] rounded-lg shadow-[0_0_40px_rgba(224,163,135,0.15)] overflow-hidden group"
        >
          {/* Animated Scanline */}
          <div className="absolute inset-0 h-1 bg-[var(--accent)] opacity-20 blur-[2px] -translate-y-full group-hover:animate-scan" />

          {/* Perforated Edge Effect */}
          <div className="absolute top-0 left-0 bottom-0 w-2 flex flex-col justify-around py-1 bg-[var(--onyx)] border-r border-[var(--accent)]/30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[var(--midnight)] rounded-full -ml-[1px]" />
            ))}
          </div>

          <div className="space-y-5 pl-4 relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--accent)] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Luna Protocol
                </span>
                <span className="text-[7px] text-[var(--text-muted)] tracking-widest mt-1">SECURE ACCESS TOKEN</span>
              </div>
              <span className="text-[8px] text-[var(--accent)] font-mono opacity-60">#LN-77</span>
            </div>

            <div className="py-3 border-y border-[var(--accent)]/20 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-50" />
              <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-widest mb-1">Entity Identified:</p>
              <p className="text-[11px] font-mono text-white break-all leading-tight font-bold shadow-sm">
                {email}
              </p>
            </div>

            <div className="flex justify-between items-end pt-1">
              <div className="flex gap-[2px] h-8 opacity-70">
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-0.5 bg-[var(--accent)]" 
                    style={{ height: `${Math.random() * 80 + 20}%` }} 
                  />
                ))}
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-[7px] text-[var(--accent)] uppercase tracking-widest font-bold mb-0.5">Status</p>
                <div className="px-2 py-0.5 border border-[#1DB954] text-[#1DB954] text-[8px] font-bold uppercase tracking-widest rounded bg-[#1DB954]/10">
                  GRANTED
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="flex gap-4 group">
    <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5 text-[var(--accent)]" />
    </div>
    <div className="space-y-1">
      <h4 className="font-display text-lg font-medium">{title}</h4>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
    </div>
  </div>
);

const LunaFeature = () => {
  return (
    <section id="luna" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Product Info */}
        <div className="space-y-10 relative z-10">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--border)]"
            >
              <Sparkles className="w-3 h-3 text-[var(--accent)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-bold">Flagship Product</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-6xl md:text-8xl leading-none font-light"
            >
              Luna <br />
              <span className="italic font-normal text-[var(--accent)]">Intelligence</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-xl text-[var(--text-mid)] max-w-lg leading-relaxed font-light"
            >
              A culturally-adaptive menstrual health ecosystem engineered for African women. Powered by the Gemini API to provide localized nutritional and cycle intelligence.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <FeatureItem 
              icon={Sparkles} 
              title="Gemini Engine" 
              desc="Deeply contextual health insights trained on regional dietary staples." 
            />
            <FeatureItem 
              icon={Globe} 
              title="Linguistic Nuance" 
              desc="Seamless support for Amharic and Tigrinya users." 
            />
            <FeatureItem 
              icon={Shield} 
              title="Resilient" 
              desc="Offline-first synchronization for areas with intermittent connectivity." 
            />
            <FeatureItem 
              icon={Heart} 
              title="Impact" 
              desc="Democratizing health data for women across the continent." 
            />
          </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--onyx)] bg-[var(--midnight)] flex items-center justify-center text-[10px] font-bold text-[var(--accent)]">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-medium">Currently in Private Alpha Testing</p>
              
              <RegisterButton />
            </div>
        </div>

        {/* Product Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group flex justify-center"
        >
          {/* Phone Frame */}
          <div className="relative w-[320px] h-[640px] bg-[var(--card-bg)] rounded-[3rem] border-[8px] border-[var(--border)] shadow-2xl overflow-hidden ring-1 ring-[var(--border)]">
            {/* Screen Content */}
            <div className="h-full w-full bg-[var(--bg)] flex flex-col p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center pt-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center font-bold text-[var(--bg)] text-lg">L</div>
                <div className="px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--border)] text-[9px] uppercase tracking-widest text-[var(--accent)] font-bold">Luteal Phase</div>
              </div>

              {/* Status Card */}
              <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Cycle Day</p>
                    <p className="text-4xl font-display font-light">22</p>
                  </div>
                  <p className="text-[10px] text-[var(--accent)] font-bold">8 days to period</p>
                </div>
                <div className="h-1 w-full bg-[var(--accent-light)] rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-[var(--accent)]" />
                </div>
              </div>

              {/* AI Chat Snippet */}
              <div className="flex-1 space-y-4 overflow-y-auto pt-4 scrollbar-hide">
                <div className="flex justify-end">
                  <div className="max-w-[80%] p-4 rounded-2xl rounded-tr-sm bg-[var(--accent)] text-[var(--onyx)] text-sm leading-relaxed font-medium">
                    I'm feeling fatigued. Fasting for Lent today.
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] border border-[var(--accent)] flex-shrink-0" />
                  <div className="max-w-[80%] p-4 rounded-2xl rounded-tl-sm bg-[var(--card-bg)] border border-[var(--border)] text-sm text-[var(--text-mid)] leading-relaxed">
                    Understood. Since you're fasting, focus on teff-based foods (Injera) during your window to sustain energy. 🌙
                  </div>
                </div>
              </div>

              {/* Nav Mock */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-[var(--border)]">
                {[Sparkles, Globe, Heart, Shield].map((Icon, i) => (
                  <Icon key={i} className={`w-4 h-4 ${i === 0 ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] opacity-50'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Widget */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 md:-right-8 top-1/4 p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)] shadow-xl backdrop-blur-xl z-20 max-w-[200px]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Gemini Active</span>
              </div>
              <p className="font-display text-lg font-light leading-tight">Cultural Intelligence Engine Live</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LunaFeature;


