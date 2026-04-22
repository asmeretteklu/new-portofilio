import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { testimonials } from '../data/portfolio';

const AVATAR_COLORS = ['var(--blush-mid)', 'var(--lavender)', 'var(--gold)'];

const Testimonials = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: 'var(--blush-light)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-10"
        >
          <div className="text-center">
            <div className="section-label justify-center mb-4">Endorsements</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
              What my <span className="italic" style={{ color: 'var(--blush-mid)' }}>professors say</span> ✦
            </h2>
            <p className="font-display italic text-lg mt-3 max-w-xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Three letters. Three supervisors. All writing without reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative rounded-2xl p-7 flex flex-col transition-all duration-300"
                style={{ 
                  paddingTop: '3.5rem',
                  background: 'var(--card-bg)',
                  border: '0.5px solid var(--blush)',
                }}
              >
                {/* Large decorative quote mark */}
                <span 
                  className="absolute top-3 left-5 font-display pointer-events-none select-none"
                  style={{ fontSize: '4rem', lineHeight: 1, color: 'var(--blush)', opacity: 0.6 }}
                >
                  "
                </span>
                
                <p className="font-display italic text-xl leading-relaxed flex-grow relative z-10" style={{ fontSize: '1.15rem', color: 'var(--text)' }}>
                  "{testimonial.text}"
                </p>

                {testimonial.context && (
                  <p className="font-body text-sm leading-relaxed mt-3 relative z-10" style={{ color: 'var(--text-mid)' }}>
                    {testimonial.context}
                  </p>
                )}

                <div className="mt-6 pt-5 flex items-center gap-3 relative z-10" style={{ borderTop: '0.5px solid var(--blush)' }}>
                  {/* Initials avatar */}
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center font-body text-xs text-white flex-shrink-0"
                    style={{ background: AVATAR_COLORS[idx % 3], fontWeight: 600 }}
                  >
                    {testimonial.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-body" style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{testimonial.author}</span>
                    <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--blush-mid)' }}>{testimonial.role}</span>
                  </div>
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
