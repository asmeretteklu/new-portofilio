import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/portfolio';

/* ── Floating Crescent Moons ── */
const FloatingCrescents = () => {
  const crescents = [
    { size: 40, left: '8%', top: '12%', opacity: 0.05, duration: 25 },
    { size: 28, left: '85%', top: '30%', opacity: 0.06, duration: 30 },
    { size: 55, left: '75%', top: '70%', opacity: 0.04, duration: 35 },
    { size: 20, left: '15%', top: '80%', opacity: 0.07, duration: 22 },
  ];

  return (
    <>
      {crescents.map((c, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: c.left,
            top: c.top,
            opacity: c.opacity,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <svg width={c.size} height={c.size} viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--gold)" />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

const LunaFeature = () => {
  const { ref, controls, variants } = useScrollReveal();
  const luna = projects.find(p => p.id === 'luna');

  return (
    <section id="luna" className="py-20 relative overflow-hidden">
      {/* Floating crescent decorations */}
      <FloatingCrescents />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <div className="luna-featured-card">
            <div className="luna-info">
              <span className="luna-badge">✦ PRODUCT · IN DEVELOPMENT</span>
              <h2 className="luna-title">Luna — <em>AI for women's health in Africa</em></h2>
              <blockquote className="luna-quote">"I built Luna because no woman in my family had access to a doctor they could talk to honestly. That has to change."</blockquote>
              <p className="luna-desc" style={{ color: 'var(--text-mid)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                <span className="lead">Luna is Asmeret's own app — a menstrual cycle intelligence product for Ethiopian and African women.</span>
                {' '}Phase-based AI recommendations. English + Amharic language support. Adjusted nutritional AI models for Ethiopian dietary staples like Teff and regional fasting cycles.
              </p>
              <div className="luna-tags flex flex-wrap gap-2 mb-8">
                <span className="pill pill-blush font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--blush-light)] text-[var(--blush-mid)]">React Native</span>
                <span className="pill pill-lavender font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--lavender-light)] text-[var(--lavender)]">Grok AI</span>
                <span className="pill pill-gold font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[var(--gold-light)] text-[var(--gold)]">Supabase</span>
                <span className="pill pill-taupe font-body uppercase rounded-full px-4 py-1.5 text-[0.7rem] font-semibold bg-[#f5e6e8] text-[var(--taupe)]">Expo</span>
              </div>
            </div>
            
            {/* Luna Health App UI Mockup */}
            <div style={{ 
              background: 'var(--card-bg)', 
              borderRadius: '24px', 
              boxShadow: '0 8px 40px rgba(237,147,177,0.18)', 
              border: '0.5px solid var(--border-color)', 
              display: 'flex', 
              flexDirection: 'column', 
              height: '420px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                background: 'var(--blush-light)', 
                padding: '14px 18px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                borderBottom: '0.5px solid var(--border-color)' 
              }}>
                <div style={{ width: '36px', height: '36px', background: 'var(--blush-mid)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🌙</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>Luna Health</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Cycle & Nutrition Intelligence</div>
                </div>
              </div>
              
              <div style={{ 
                padding: '24px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                flex: 1, 
                background: 'var(--bg)',
                overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div style={{ background: 'var(--text)', color: 'var(--bg)', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif" }}>
                    I'm feeling really fatigued today. I'm on day 22 of my cycle and fasting for Lent.
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{ width: '28px', height: '28px', background: 'var(--blush-mid)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, marginTop: '4px' }}>🌙</div>
                  <div style={{ background: 'var(--blush-light)', color: 'var(--text)', padding: '14px 16px', borderRadius: '16px 16px 16px 4px', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif", border: '0.5px solid var(--blush)', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '12px' }}>It's completely normal to feel fatigued right now. You are in your <strong>Luteal Phase</strong>, where progesterone levels naturally rise and lower your energy.</p>
                    <p>Since you are also fasting, I recommend incorporating iron-rich staples like <strong>Teff (Injera)</strong> and leafy greens during your eating window to help rebuild your energy reserves. 💛</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LunaFeature;
