import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { person, projects } from '../data/portfolio';

const LunaFeature = () => {
  const { ref, controls, variants } = useScrollReveal();
  const luna = projects.find(p => p.id === 'luna');

  return (
    <section id="luna" className="py-24 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          {/* Full-width featured card */}
          <div 
            className="rounded-[20px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{ 
              background: 'var(--blush-light)', 
              border: '0.5px solid var(--blush)',
            }}
          >
            {/* Left — Text */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              {/* Featured badge */}
              <span 
                className="w-fit font-body uppercase px-3.5 py-1.5 rounded-full"
                style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--blush-mid)', border: '1px solid var(--blush-mid)', fontWeight: 500 }}
              >
                ✦ Featured project
              </span>

              <h2 className="font-display leading-tight" style={{ fontSize: '2rem', color: 'var(--text)' }}>
                <span style={{ fontWeight: 400 }}>Luna</span> — <span className="italic" style={{ color: 'var(--blush-mid)' }}>AI for women's health in Africa</span>
              </h2>

              <p className="font-body leading-relaxed" style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                {luna?.description || "Women's health & menstrual cycle intelligence app for Ethiopian and African women. Phase-based AI recommendations. Adjusted nutritional AI models for Ethiopian dietary staples like Teff and regional fasting cycles."}
              </p>

              {/* Personal motivation quote */}
              <blockquote 
                className="font-display italic leading-relaxed pl-5"
                style={{ borderLeft: '3px solid var(--blush)', color: 'var(--blush-mid)', fontSize: '0.95rem' }}
              >
                "I built Luna because my mother, my aunts, every woman I grew up around — none of them had access to a doctor they could talk to honestly. That has to change."
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {(luna?.tags || ['React Native', 'Expo', 'Supabase', 'Gemini API', 'Node.js']).map(tech => (
                  <span 
                    key={tech} 
                    className="font-body uppercase rounded-md px-3 py-1.5"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.06em', background: 'var(--card-bg)', border: '0.5px solid var(--taupe)', color: 'var(--text-mid)', fontWeight: 500 }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a 
                href={`mailto:${person.email}?subject=Luna%20AI%20Early%20Access%20Request`} 
                className="btn-primary-blush w-fit mt-2 group"
              >
                <span>Come with me</span> <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Right — Phone Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full flex justify-center lg:justify-end"
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative w-[260px] h-[540px] rounded-[40px] p-[6px] flex flex-col items-center cursor-pointer"
                  style={{ border: '1.5px solid var(--blush)', background: 'var(--card-bg)', boxShadow: '0 20px 60px rgba(237,147,177,0.12)' }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[24px] rounded-b-[16px] z-20" style={{ background: 'var(--card-bg)', borderLeft: '1px solid var(--blush)', borderRight: '1px solid var(--blush)', borderBottom: '1px solid var(--blush)' }} />
                  
                  {/* Screen */}
                  <div className="w-full h-full rounded-[34px] overflow-hidden relative flex flex-col p-5 pt-12 gap-5" style={{ background: 'var(--dark)', border: '0.5px solid rgba(237,147,177,0.2)' }}>
                    
                    <div className="w-full flex justify-between items-center">
                      <span className="font-display italic text-2xl" style={{ color: 'var(--blush-mid)' }}>luna</span>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>AT</span>
                    </div>

                    {/* Cycle Ring */}
                    <div className="relative self-center w-[145px] h-[145px] mt-2 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(237,147,177,0.2)' }} />
                      <div className="absolute inset-0 rounded-full rotate-45" style={{ borderTop: '2px solid var(--blush-mid)', borderRight: '2px solid var(--blush-mid)', borderBottom: '2px solid transparent', borderLeft: '2px solid transparent' }} />
                      <div className="flex flex-col items-center">
                        <span className="font-body uppercase text-xs tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Cycle Day</span>
                        <span className="font-display text-5xl" style={{ color: '#fff' }}>14</span>
                      </div>
                    </div>

                    <div className="w-fit mx-auto px-4 py-1.5 rounded-full font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', background: 'rgba(237,147,177,0.1)', border: '1px solid rgba(237,147,177,0.3)', color: 'var(--blush-mid)' }}>
                      ✦ Ovulation Phase
                    </div>

                    <div className="flex flex-col gap-2.5 mt-2">
                      {[
                        { icon: '🥑', title: 'Nutrition Focus', desc: 'Zinc & Magnesium' },
                        { icon: '🧘', title: 'Movement', desc: 'High Energy Flow' },
                        { icon: '✨', title: 'Mood Expectation', desc: 'Peak Sociability' }
                      ].map((card, i) => (
                        <div key={i} className="w-full rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(237,147,177,0.1)' }}>
                            {card.icon}
                          </div>
                          <div>
                            <h4 className="font-body text-sm" style={{ color: '#fff' }}>{card.title}</h4>
                            <p className="font-body" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>{card.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LunaFeature;
