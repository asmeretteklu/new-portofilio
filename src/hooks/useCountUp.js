import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const useCountUp = (endValue, duration = 1500, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  // Parse the value
  const parsed = useMemo(() => {
    const str = String(endValue);
    if (str.startsWith('$')) {
      const num = parseFloat(str.replace(/[$k+]/g, ''));
      const sfx = str.includes('k') ? 'k' : str.includes('+') ? '+' : '';
      return { num, prefix: '$', suffix: sfx, decimals: 0 };
    } else if (str.includes('+')) {
      const num = parseFloat(str.replace('+', ''));
      return { num, prefix: '', suffix: '+', decimals: 0 };
    } else if (str.includes('.')) {
      const num = parseFloat(str);
      const decimalPlaces = str.split('.')[1]?.length || 2;
      return { num, prefix: '', suffix: '', decimals: decimalPlaces };
    } else {
      const num = parseFloat(str);
      return { num, prefix: '', suffix: '', decimals: 0 };
    }
  }, [endValue]);

  const animate = useCallback(() => {
    const { num, decimals } = parsed;
    
    let startTime = null;
    const tick = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut curve
      const eased = 1 - Math.pow(1 - Math.max(0, progress), 3);
      const current = eased * num;
      
      setCount(Number(current.toFixed(decimals)));
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    
    requestAnimationFrame(tick);
  }, [duration, parsed]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted, animate]);

  const { prefix, suffix: sfx } = parsed;
  const display = `${prefix || ''}${parsed.decimals > 0 ? count.toFixed(parsed.decimals) : count}${sfx || ''}`;

  return { ref, display };
};
