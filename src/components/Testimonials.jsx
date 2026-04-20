import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { testimonials } from '../data/portfolio';
import CrescentDecoration from './CrescentDecoration';

const Testimonials = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="testimonials" className="py-32 bg-ink2 border-y border-border/30 relative overflow-hidden">
      <CrescentDecoration section="testimonials" />
      {/* Ambient rose glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'rgba(196,133,106,0.06)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-12"
        >
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// ENDORSEMENTS</span>
            <h2 className="font-display text-4xl md:text-5xl text-paper">
              What my <span className="italic text-gold">professors say</span> ✦
            </h2>
            <p className="font-display text-lg text-paper2 mt-4 max-w-xl mx-auto italic">
              Three letters. Three supervisors. All writing without reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-ink/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 flex flex-col relative group hover:border-l-2 hover:border-l-rose transition-all duration-300"
                style={{ paddingTop: '3.5rem' }}
              >
                {/* Large decorative quote mark */}
                <span 
                  className="absolute top-4 left-6 font-display text-gold pointer-events-none select-none"
                  style={{ fontSize: '5rem', lineHeight: 1, opacity: 0.12 }}
                >
                  "
                </span>
                
                <p className="font-display italic text-xl leading-relaxed text-paper flex-grow relative z-10" style={{ fontSize: '1.2rem' }}>
                  "{testimonial.text}"
                </p>

                {/* Context paragraph */}
                {testimonial.context && (
                  <p className="font-ui text-sm text-paper2 mt-4 leading-relaxed relative z-10">
                    {testimonial.context}
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-border/30 flex flex-col gap-1 relative z-10">
                  <span className="font-ui font-bold text-gold-light tracking-wide">{testimonial.author}</span>
                  <span className="font-mono text-[0.65rem] text-gold uppercase tracking-widest">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
