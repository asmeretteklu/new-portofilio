import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const BeyondCode = () => {
  const { ref, controls, variants } = useScrollReveal();

  const cards = [
    {
      icon: '✍️',
      title: 'Digital Storyteller',
      body: 'I write content that makes technology feel human — blogs, copy, narratives, and campaigns for Ethiopian tech brands.',
    },
    {
      icon: '📊',
      title: 'Digital Marketer',
      body: 'Data-driven strategies, Google Analytics dashboards, SEO architecture, and social campaigns that actually move the needle.',
    },
    {
      icon: '🌙',
      title: 'Product Builder',
      body: 'From architecture to deployment — I own the full journey of every product I put my name on.',
    }
  ];

  return (
    <section id="beyond-code" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-12"
        >
          <div className="text-center mb-6">
            <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: 'var(--text)' }}>
              I don't just build — I tell stories ✦
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-mid)' }}>
              Some developers write code. <br/>
              I write code and words. Both matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl relative group transition-all duration-300"
                style={{
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid transparent',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.05)';
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl"
                  style={{ background: 'var(--accent-light)', color: 'var(--text)' }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--text)', fontWeight: 600 }}>{card.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondCode;
