import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { person, projects } from '../data/portfolio';
import CrescentDecoration from './CrescentDecoration';

const LunaFeature = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="luna" className="py-32 bg-ink2 border-y border-border/30 relative overflow-hidden z-10">
      {/* CMD-07: Crescent moon decoration */}
      <CrescentDecoration section="luna" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Col - Text */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-8 order-2 lg:order-1"
        >
          {/* CMD-06: Rose badge for Luna */}
          <div className="flex items-center gap-3 w-fit px-4 py-1.5 rounded-full border border-rose/30 bg-rose-pale">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-rose">In the making 🌙</span>
          </div>

          <h2 className="font-display text-5xl md:text-[4.5rem] leading-[0.98] text-paper">
            <span className="italic text-gold">Luna</span> — AI for women's health in Africa
          </h2>

          <p className="font-display text-2xl text-paper2 leading-relaxed">
            A phase-based intelligence app built for Ethiopian and African realities. Tailoring nutrition, exercise, mood, and symptom anticipation natively avoiding Western-centric assumptions.
          </p>

          <div className="flex flex-wrap gap-3">
            {['React Native', 'Expo', 'Supabase', 'Gemini API', 'Node.js'].map(tech => (
              <span key={tech} className="px-4 py-2 border border-border rounded-md font-mono text-[0.75rem] text-paper2 uppercase tracking-wide bg-ink/30 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* CMD-05: Shimmer button */}
          <motion.a 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            href={`mailto:${person.email}?subject=Luna%20AI%20Early%20Access%20Request`} 
            className="btn-primary mt-4 w-fit px-8 py-3 bg-gold hover:bg-gold-light text-ink font-ui font-semibold rounded-full transition-all flex items-center gap-2 group inline-flex shadow-[0_0_15px_rgba(196,145,58,0.2)] hover:shadow-[0_0_25px_rgba(196,145,58,0.4)]"
          >
            <span>Come with me</span> <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </motion.div>


        {/* Right Col - Phone Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          {/* Continuous Float Wrapper */}
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full flex justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-[280px] h-[580px] rounded-[40px] border-[1.5px] border-gold/70 bg-ink p-[6px] shadow-[0_0_40px_rgba(196,145,58,0.15)] flex flex-col items-center cursor-pointer"
            >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-ink rounded-b-[16px] z-20 border-x border-b border-gold/30"></div>
            
            {/* Screen */}
            <div className="w-full h-full rounded-[34px] bg-gradient-to-b from-ink3 to-ink overflow-hidden border border-border/50 relative flex flex-col p-5 pt-12 gap-6">
              
              <div className="w-full flex justify-between items-center">
                <span className="font-display italic text-gold text-2xl">luna</span>
                <span className="w-8 h-8 rounded-full bg-paper/10 flex items-center justify-center font-ui text-xs">AT</span>
              </div>

              {/* Cycle Ring */}
              <div className="relative self-center w-[160px] h-[160px] mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-teal-light/20"></div>
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-teal-light rotate-45"></div>
                
                <div className="flex flex-col items-center">
                  <span className="font-ui text-paper2 text-xs uppercase tracking-wider mb-1">Cycle Day</span>
                  <span className="font-display text-5xl text-paper">14</span>
                </div>
              </div>

              {/* Phase Tag */}
              <div className="w-fit mx-auto px-4 py-1.5 rounded-full bg-teal-light/10 border border-teal-light/30 font-mono text-[0.65rem] text-teal-light uppercase tracking-widest">
                ✦ Ovulation Phase
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { icon: '🥑', title: 'Nutrition Focus', desc: 'Zinc & Magnesium' },
                  { icon: '🧘', title: 'Movement', desc: 'High Energy Flow' },
                  { icon: '✨', title: 'Mood Expectation', desc: 'Peak Sociability' }
                ].map((card, i) => (
                  <div key={i} className="w-full bg-paper/5 border border-paper/10 rounded-xl p-3 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-light/10 flex items-center justify-center text-xl">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-ui text-sm text-paper mb-0.5">{card.title}</h4>
                      <p className="font-mono text-[0.65rem] text-paper2">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default LunaFeature;
