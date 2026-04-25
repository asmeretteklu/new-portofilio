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
    <section id="beyond-code" className="py-24 relative overflow-hidden" style={{ background: 'var(--ink2)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-12"
        >
          <div className="text-center mb-6">
            <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: 'var(--paper)' }}>
              I don't just build — I tell stories ✦
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: 'var(--paper3)' }}>
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(196,145,58,0.2)',
                  borderTop: '2px solid transparent',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = 'var(--gold)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = 'transparent';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl"
                  style={{ background: 'var(--rose)', color: 'var(--paper)' }}
                >
                  {card.icon}
                </div>
                <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--paper)', fontWeight: 600 }}>{card.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--paper3)' }}>
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
