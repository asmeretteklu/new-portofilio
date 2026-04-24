import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { testimonials } from '../data/portfolio';

const CARD_ACCENTS = [
  { gradient: 'linear-gradient(135deg, rgba(237,147,177,0.08), rgba(237,147,177,0.02))', border: 'var(--blush)', icon: '🌸', dotColor: '#ED93B1' },
  { gradient: 'linear-gradient(135deg, rgba(159,139,189,0.08), rgba(159,139,189,0.02))', border: 'var(--lavender)', icon: '✦', dotColor: '#9F8BBD' },
  { gradient: 'linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))', border: 'var(--gold)', icon: '🌙', dotColor: '#C9A96E' },
];

const Testimonials = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: 'var(--blush-light)' }}>
      {/* Decorative floating elements */}
      <div className="absolute top-8 right-12 opacity-10 pointer-events-none select-none" style={{ fontSize: '4rem', color: 'var(--blush-mid)' }}>✦</div>
      <div className="absolute bottom-12 left-8 opacity-10 pointer-events-none select-none" style={{ fontSize: '3rem', color: 'var(--lavender)' }}>🌙</div>
      <div className="absolute top-1/2 right-1/4 opacity-5 pointer-events-none select-none" style={{ fontSize: '8rem', color: 'var(--blush-mid)' }}>❝</div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-10"
        >
          <div className="text-center">
            <div className="section-label justify-center mb-4">Endorsements ✦</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
              What my <span className="italic" style={{ color: 'var(--blush-mid)' }}>professors say</span> ✦
            </h2>
            <p className="font-display italic text-lg mt-3 max-w-xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Three letters. Three supervisors. All writing without reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 testimonials-grid">
            {testimonials.map((testimonial, idx) => {
              const accent = CARD_ACCENTS[idx % 3];
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="relative rounded-2xl p-7 flex flex-col transition-all duration-300 group"
                  style={{ 
                    paddingTop: '3.5rem',
                    background: accent.gradient,
                    border: `1px solid ${accent.border}`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden rounded-tr-2xl">
                    <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-10" style={{ background: accent.dotColor }} />
                  </div>

                  {/* Decorative emoji */}
                  <span className="absolute top-3 right-4 text-lg opacity-30 pointer-events-none select-none group-hover:opacity-60 transition-opacity">
                    {accent.icon}
                  </span>
                  
                  {/* Large decorative quote mark */}
                  <span 
                    className="absolute top-2 left-5 font-display pointer-events-none select-none"
                    style={{ fontSize: '4.5rem', lineHeight: 1, color: accent.dotColor, opacity: 0.12 }}
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

                  {/* Sparkle divider */}
                  <div className="flex items-center gap-2 mt-5 mb-1">
                    <div className="flex-1 h-px" style={{ background: accent.border, opacity: 0.5 }} />
                    <span style={{ color: accent.dotColor, fontSize: '0.6rem', opacity: 0.6 }}>✦</span>
                    <div className="flex-1 h-px" style={{ background: accent.border, opacity: 0.5 }} />
                  </div>

                  <div className="mt-3 flex items-center gap-3 relative z-10">
                    {/* Initials avatar with gradient */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center font-body text-xs text-white flex-shrink-0 shadow-md"
                      style={{ 
                        background: `linear-gradient(135deg, ${accent.dotColor}, ${accent.dotColor}dd)`, 
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {testimonial.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body" style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{testimonial.author}</span>
                      <span className="font-body uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: accent.dotColor, fontWeight: 500 }}>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
