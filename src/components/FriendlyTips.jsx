import { motion } from 'framer-motion';

const facts = [
  { icon: '🌍', text: "I'm from Tigray — one of the most ancient regions on earth" },
  { icon: '☕', text: "I write better code after Ethiopian coffee. Always." },
  { icon: '🌙', text: "I named my app Luna because she works even in the dark" },
  { icon: '📶', text: "I build apps that work on slow internet — because that's real life" },
  { icon: '🎓', text: "First in my family to study software engineering" },
  { icon: '💡', text: "I debug by talking to myself. It works every time." },
  { icon: '🌸', text: "I believe the best tech is built with empathy, not just syntax" },
  { icon: '🏔️', text: "Tigray is home. My code carries it everywhere." }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const FriendlyTips = () => {
  return (
    <section className="w-full bg-[var(--blush-light)] py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="font-display italic text-[28px] text-center mb-8"
          style={{ color: 'var(--text)' }}
        >
          A few things about me ✦
        </motion.h2>

        {/* Mobile: Horizontal scroll, Desktop: Flex wrap center */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex md:flex-wrap gap-3 overflow-x-auto md:overflow-visible w-full md:justify-center pb-4 md:pb-0"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {facts.map((fact, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              className="flex-shrink-0 md:flex-shrink rounded-[16px] p-4 px-6 min-w-[200px] flex gap-3 items-start transition-all hover:-translate-y-1 shadow-sm"
              style={{ 
                scrollSnapAlign: 'start', 
                background: 'var(--card-bg)', 
                border: '0.5px solid var(--card-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <span className="text-xl">{fact.icon}</span>
              <span className="font-body text-sm leading-relaxed text-[var(--text-mid)] font-medium">
                {fact.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FriendlyTips;
