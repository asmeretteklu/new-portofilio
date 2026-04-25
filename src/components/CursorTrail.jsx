import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if ('ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Spawn 3 particles on each move
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          life: 1,
          size: Math.random() * 2.5 + 1,
        });
      }
      // Cap particles
      if (particles.current.length > 60) {
        particles.current = particles.current.slice(-60);
      }
    };

    window.addEventListener('mousemove', handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current = particles.current.filter(p => {
        p.life -= 0.025; // ~400ms fade
        if (p.life <= 0) return false;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 145, 58, ${p.life * 0.6})`;
        ctx.fill();
        
        // Slight upward drift
        p.y -= 0.3;
        
        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CursorTrail;
