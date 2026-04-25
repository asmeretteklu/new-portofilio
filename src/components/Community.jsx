import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { community } from '../data/portfolio';

const Community = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4">Beyond Code</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
              Giving <span className="italic" style={{ color: 'var(--blush-mid)' }}>back</span> ✦
            </h2>
            <p className="font-display italic text-lg mt-3" style={{ color: 'var(--text-mid)' }}>
              Because someone gave to me first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {community.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300"
                style={{ 
                  background: 'var(--card-bg)', 
                  border: '0.5px solid var(--card-border)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.border = '0.5px solid var(--blush-mid)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(237,147,177,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.border = '0.5px solid var(--card-border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2" style={{ background: 'var(--blush-light)', border: '0.5px solid var(--blush)' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-body text-xl mb-1" style={{ color: 'var(--text)', fontWeight: 500 }}>{item.title}</h3>
                  <p className="font-body uppercase mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--blush-mid)', fontWeight: 500 }}>{item.org}</p>
                </div>
                <p className="font-display text-lg leading-relaxed mt-auto" style={{ color: 'var(--text-mid)' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Community;
