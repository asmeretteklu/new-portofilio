import { useState, useEffect, useRef, useCallback } from 'react';

export const useCountUp = (endValue, duration = 1500, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [suffix, setSuffix] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  // Parse the value
  const parsed = useRef(null);
  if (!parsed.current) {
    const str = String(endValue);
    if (str.startsWith('$')) {
      // e.g. "$15k" -> count to 15, suffix = "k", prefix = "$"
      const num = parseFloat(str.replace(/[$k+]/g, ''));
      const sfx = str.includes('k') ? 'k' : str.includes('+') ? '+' : '';
      parsed.current = { num, prefix: '$', suffix: sfx, decimals: 0 };
    } else if (str.includes('+')) {
      const num = parseFloat(str.replace('+', ''));
      parsed.current = { num, prefix: '', suffix: '+', decimals: 0 };
    } else if (str.includes('.')) {
      const num = parseFloat(str);
      const decimalPlaces = str.split('.')[1]?.length || 2;
      parsed.current = { num, prefix: '', suffix: '', decimals: decimalPlaces };
    } else {
      const num = parseFloat(str);
      parsed.current = { num, prefix: '', suffix: '', decimals: 0 };
    }
  }

  const animate = useCallback(() => {
    const { num, decimals } = parsed.current;
    const startTime = performance.now();
    
    const tick = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      
      setCount(Number(current.toFixed(decimals)));
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    
    requestAnimationFrame(tick);
  }, [duration]);

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

  const { prefix, suffix: sfx } = parsed.current || {};
  const display = `${prefix || ''}${parsed.current?.decimals > 0 ? count.toFixed(parsed.current.decimals) : count}${sfx || ''}`;

  return { ref, display };
};
