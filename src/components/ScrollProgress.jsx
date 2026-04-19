import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  // Hook into browser scroll
  const { scrollYProgress } = useScroll();
  
  // Add a smooth spring physics effect so it doesn't just instantly snap to scroll position
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[100] shadow-[0_0_10px_rgba(196,145,58,0.8)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
