import { useEffect, useRef } from 'react';

export const useMagneticTilt = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Calculate rotation. Adjust multiplier for stronger/weaker effect
      el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      // Add transition for smooth return
      el.style.transition = 'transform 0.5s ease';
      
      // Remove transition after it finished so it doesn't lag on mouseenter
      setTimeout(() => {
        el.style.transition = '';
      }, 500);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};
