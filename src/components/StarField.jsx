import { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // 150 particles
      particles = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5, // 0.5 - 2
        speed: Math.random() * 0.3 + 0.1, // 0.1 - 0.4
        opacity: Math.random() * 0.6 + 0.2, // 0.2 - 0.8
        gold: Math.random() < 0.12, // 12% chance to be gold
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        const isLight = document.documentElement.classList.contains('light');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        // Fill style
        if (p.gold) {
          ctx.fillStyle = `rgba(196, 145, 58, ${p.opacity})`;
        } else {
          ctx.fillStyle = isLight 
            ? `rgba(8, 12, 20, ${p.opacity * 0.4})`      // dark stars in light mode
            : `rgba(240, 235, 224, ${p.opacity * 0.5})`; // white stars in dark mode
        }
        
        ctx.fill();

        // Animate upwards
        p.y -= p.speed;
        
        // Reset to bottom if it goes off screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default StarField;
