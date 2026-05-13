import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { wrap } from '@motionone/utils';
import { tickerItems } from '../data/portfolio';

const Ticker = () => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.5 * (delta / 1000); // reduced from -2 to -0.5

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * (velocityFactor.get() * 0.1); // reduced multiplier

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="w-full py-6 overflow-hidden flex relative group cursor-default z-10 bg-[var(--accent-light)] border-y border-[var(--border)]">
      <motion.div className="flex whitespace-nowrap min-w-max" style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-display italic text-2xl uppercase px-4 flex items-center text-[var(--accent)] font-light tracking-widest">
            {tickerItems.map((item, index) => (
              <span key={index} className="flex items-center">
                {item}
                <span className="mx-12 opacity-30">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
