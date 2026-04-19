import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { community } from '../data/portfolio';

const Community = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section className="py-24 bg-ink2 border-t border-border/30 relative overflow-hidden">
      
      {/* Abstract background element */}
      <div className="absolute -top-1/2 -right-1/4 w-full h-full max-w-[800px] bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// BEYOND CODE</span>
            <h2 className="font-display text-4xl md:text-5xl text-paper">
              Giving <span className="italic text-gold">back</span> ✦
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {community.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-ink border border-border/40 p-8 rounded-2xl flex flex-col gap-4 hover:border-gold/60 hover:shadow-[0_10px_30px_rgba(196,145,58,0.05)] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-ink3 border border-border/50 flex items-center justify-center text-2xl mb-2">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-ui text-xl text-paper mb-1">{item.title}</h3>
                  <p className="font-mono text-[0.65rem] text-gold uppercase tracking-wider mb-4">{item.org}</p>
                </div>
                <p className="font-display text-lg text-paper2 leading-relaxed mt-auto">
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
