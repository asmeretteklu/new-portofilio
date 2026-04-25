import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ 
        scaleX, 
        background: 'linear-gradient(90deg, var(--blush-mid), var(--gold))',
        boxShadow: '0 0 8px rgba(196,145,58,0.4)' 
      }}
    />
  );
};

export default ScrollProgress;
